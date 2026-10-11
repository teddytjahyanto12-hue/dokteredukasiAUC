import "server-only";
import { randomBytes } from "node:crypto";
import type { Prisma } from "@prisma/client";
import { db } from "./db";
import { notifyStaff, notifyUser } from "./notify";
import { addMonths, quote, QuoteError } from "./services";
import { LEAD_SOURCES, rulesValid, splitInstallments } from "./installments";
import { sendReceipt } from "./receipts";

export function newOrderCode() {
  const date = new Date().toISOString().slice(2, 10).replaceAll("-", "");
  return `DE-${date}-${randomBytes(3).toString("hex").toUpperCase()}`;
}

export type OrderChoice = {
  durationId: string | null;
  addonIds: string[];
  plan?: "FULL" | "INSTALLMENT";
  discount?: number | null; // hanya dari admin
  leadSource?: string | null;
  note?: string | null;
  createdById?: string | null; // diisi bila penjualan diinput admin
};

// Membuat order dari pilihan customer/admin. Harga, nama, dan jadwal cicilan
// disalin ke order agar perubahan layanan kemudian tidak mengubah order lama.
export async function createOrder(userId: string, packageId: string, choice: OrderChoice) {
  const pkg = await db.package.findUnique({
    where: { id: packageId },
    include: { durations: true, addons: true, installmentRules: true },
  });
  if (!pkg || (!pkg.active && !choice.createdById)) throw new QuoteError("Layanan tidak tersedia.");
  const q = quote(pkg, choice.durationId, choice.addonIds);

  const discount = choice.discount && choice.discount > 0 ? choice.discount : null;
  if (discount && q.total !== null && discount > q.total) throw new QuoteError("Diskon melebihi total.");
  const total = q.total === null ? null : q.total - (discount ?? 0);

  const plan = choice.plan === "INSTALLMENT" ? "INSTALLMENT" : "FULL";
  let schedule: ReturnType<typeof splitInstallments> = [];
  if (plan === "INSTALLMENT") {
    if (!pkg.allowInstallment) throw new QuoteError("Layanan ini tidak bisa dicicil.");
    const err = rulesValid(pkg.installmentRules);
    if (err) throw new QuoteError(`Aturan cicilan layanan belum lengkap: ${err}`);
    schedule = splitInstallments(total, pkg.installmentRules);
  }
  const leadSource = choice.leadSource && (LEAD_SOURCES as readonly string[]).includes(choice.leadSource) ? choice.leadSource : null;
  // Salinan HPP saat ini (masa belajar/layanan + add-on) untuk laporan laba; null bila belum diisi sama sekali.
  const hppParts = [q.duration ? q.duration.hpp ?? pkg.hpp : pkg.hpp, ...q.addons.map((a) => a.hpp)];
  const hpp = hppParts.every((h) => h === null) ? null : hppParts.reduce<number>((s, h) => s + (h ?? 0), 0);

  const order = await db.order.create({
    data: {
      code: newOrderCode(),
      userId,
      packageId,
      durationLabel: q.duration?.label ?? null,
      durationMonths: q.duration?.months ?? null,
      basePrice: q.basePrice,
      discount,
      hpp,
      amount: total,
      paymentPlan: plan,
      leadSource,
      note: choice.note ?? null,
      createdById: choice.createdById ?? null,
      addons: { create: q.addons.map((a) => ({ addonId: a.id, name: a.name, price: a.price })) },
      installments: {
        create: schedule.map((s) => ({ seq: s.seq, label: s.label, percent: s.percent, amount: s.amount, unlocksStage: s.unlocksStage })),
      },
    },
    include: { user: true },
  });
  await notifyStaff("admin.orders", {
    title: `Order baru ${order.code}`,
    body: `${order.user.name} memesan ${pkg.name}${choice.createdById ? " (diinput admin)" : " di website"}.`,
    rows: [
      ["Pelanggan", order.user.name],
      ["Email", order.user.email],
      ["WhatsApp", order.user.phone ?? "-"],
      ["Layanan", pkg.name],
      ["Masa belajar", q.duration?.label ?? "-"],
      ["Add-on", q.addons.map((a) => a.name).join(", ") || "-"],
      ["Total", total === null ? "Harga menyusul" : `Rp${total.toLocaleString("id-ID")}`],
      ["Cara bayar", plan === "INSTALLMENT" ? `Cicilan ${schedule.length}x` : "Bayar penuh"],
    ],
    link: `/admin/order/${order.id}`,
    kind: "NEW_ORDER",
    orderId: order.id,
  });
  return order;
}

type Tx = Prisma.TransactionClient;
type OrderWithPackage = Prisma.OrderGetPayload<{ include: { package: true } }>;

// Mengaktifkan layanan saat pembayaran pertama diterima: hak akses materi +
// proyek bimbingan beserta checklist task dari tahap layanan.
async function activateOrder(tx: Tx, order: OrderWithPackage, grantedById?: string) {
  const now = new Date();
  await tx.entitlement.create({
    data: {
      userId: order.userId,
      packageId: order.packageId,
      orderId: order.id,
      grantedById,
      startsAt: now,
      // Masa belajar yang dipilih customer; bila layanan tanpa pilihan, pakai masa akses bawaan.
      expiresAt: order.durationMonths
        ? addMonths(now, order.durationMonths)
        : order.package.accessDays
          ? new Date(now.getTime() + order.package.accessDays * 86400000)
          : null,
    },
  });
  if (order.package.includesMentoring && order.package.mentoringField) {
    const m = await tx.mentoring.create({
      data: {
        studentId: order.userId,
        packageId: order.packageId,
        orderId: order.id,
        field: order.package.mentoringField,
        // Zoom & bimbingan berlaku sekian bulan sejak aktif (materi tetap seumur hidup bila paketnya demikian).
        serviceEndsAt: order.package.serviceMonths ? addMonths(now, order.package.serviceMonths) : null,
      },
    });
    await copyServiceTasks(tx, m.id, order.packageId);
  }
}

// Menyalin tahap & checklist layanan ke proyek (dipakai juga oleh admin untuk proyek lama).
export async function copyServiceTasks(tx: Tx, mentoringId: string, packageId: string) {
  const stages = await tx.serviceStage.findMany({
    where: { packageId },
    orderBy: { number: "asc" },
    include: { tasks: { orderBy: { order: "asc" } } },
  });
  const rows = stages.flatMap((s) =>
    s.tasks.map((t, i) => ({
      mentoringId,
      stageNumber: s.number,
      stageTitle: s.title,
      title: t.title,
      description: t.description,
      order: i,
      fee: t.fee,
    })),
  );
  if (rows.length) await tx.projectTask.createMany({ data: rows });
  return rows.length;
}

async function notifyActivated(order: OrderWithPackage, partial: boolean) {
  await notifyUser(order.userId, {
    title: partial ? "Cicilan pertama dikonfirmasi" : "Pembayaran dikonfirmasi",
    body: `Akses ${order.package.name} sudah aktif.${
      order.package.includesMentoring ? " Admin akan menjadwalkan bimbingan dan memilih tutor sesuai bidang." : ""
    }`,
    link: "/belajar",
  });
}

// Menandai order bayar penuh lunas. Aman dipanggil ulang (idempoten).
// Dipakai oleh admin (pembayaran manual) dan nanti oleh callback Duitku.
export async function markOrderPaid(orderId: string, opts: { grantedById?: string; paymentRef?: string } = {}) {
  const result = await db.$transaction(async (tx) => {
    const order = await tx.order.findUnique({ where: { id: orderId }, include: { package: true } });
    if (!order) throw new Error("Order tidak ditemukan.");
    if (order.status === "PAID") return { order, alreadyPaid: true };
    if (order.status === "CANCELLED") throw new Error("Order sudah dibatalkan.");
    if (order.paymentPlan === "INSTALLMENT") throw new Error("Order ini dicicil; konfirmasi per cicilan.");

    const paid = await tx.order.update({
      where: { id: order.id },
      data: { status: "PAID", paidAt: new Date(), paymentRef: opts.paymentRef ?? order.paymentRef },
      include: { package: true },
    });
    await activateOrder(tx, paid, opts.grantedById);
    return { order: paid, alreadyPaid: false };
  });
  if (!result.alreadyPaid) {
    await notifyActivated(result.order, false);
    await sendReceipt(result.order.id);
  }
  return result;
}

// Menandai satu cicilan lunas (harus berurutan). Cicilan pertama mengaktifkan layanan;
// cicilan berikutnya membuka tahap yang dikunci; cicilan terakhir membuat order lunas.
export async function markInstallmentPaid(orderId: string, seq: number, opts: { grantedById?: string; paymentRef?: string | null } = {}) {
  const result = await db.$transaction(async (tx) => {
    const order = await tx.order.findUnique({
      where: { id: orderId },
      include: { package: true, installments: { orderBy: { seq: "asc" } } },
    });
    if (!order) throw new Error("Order tidak ditemukan.");
    if (order.status === "CANCELLED") throw new Error("Order sudah dibatalkan.");
    const next = order.installments.find((i) => i.status !== "PAID");
    if (!next) throw new Error("Semua cicilan sudah lunas.");
    if (next.seq !== seq) throw new Error(`Konfirmasi berurutan: cicilan berikutnya adalah ${next.label}.`);

    const now = new Date();
    const res = await tx.orderInstallment.updateMany({
      where: { id: next.id, status: "PENDING" },
      data: { status: "PAID", paidAt: now, paymentRef: opts.paymentRef ?? null },
    });
    if (res.count === 0) throw new Error("Cicilan sudah dikonfirmasi admin lain.");

    const isFirst = order.installments.every((i) => i.status !== "PAID");
    const isLast = order.installments.filter((i) => i.status !== "PAID").length === 1;
    const updated = await tx.order.update({
      where: { id: order.id },
      data: { status: isLast ? "PAID" : "PARTIAL", paidAt: isLast ? now : order.paidAt },
      include: { package: true },
    });
    if (isFirst) await activateOrder(tx, updated, opts.grantedById);
    return { order: updated, installment: next, isFirst, isLast };
  });

  await sendReceipt(result.order.id, { seq: result.installment.seq });
  if (result.isFirst) await notifyActivated(result.order, !result.isLast);
  else {
    await notifyUser(result.order.userId, {
      title: `${result.installment.label} dikonfirmasi`,
      body: `Tahap ${result.installment.unlocksStage} dan seterusnya kini terbuka.`,
      link: "/belajar",
      email: true,
    });
    const m = await db.mentoring.findFirst({ where: { orderId: result.order.id }, select: { id: true, tutorId: true } });
    if (m?.tutorId) {
      await notifyUser(m.tutorId, { title: "Tahap baru terbuka", body: `${result.installment.label} lunas.`, link: `/bimbingan/${m.id}` });
    }
  }
  return result;
}
