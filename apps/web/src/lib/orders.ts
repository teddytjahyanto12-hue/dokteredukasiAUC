import "server-only";
import { randomBytes } from "node:crypto";
import { db } from "./db";
import { notifyAdmins, notifyUser } from "./notify";

export function newOrderCode() {
  const date = new Date().toISOString().slice(2, 10).replaceAll("-", "");
  return `DE-${date}-${randomBytes(3).toString("hex").toUpperCase()}`;
}

export async function createOrder(userId: string, packageId: string) {
  const pkg = await db.package.findUnique({ where: { id: packageId } });
  if (!pkg || !pkg.active) throw new Error("Paket tidak tersedia.");

  const order = await db.order.create({
    data: { code: newOrderCode(), userId, packageId, amount: pkg.price },
    include: { user: true },
  });
  await notifyAdmins({
    title: `Order baru ${order.code}`,
    body: `${order.user.name} memesan ${pkg.name}.`,
    link: `/admin/order/${order.id}`,
  });
  return order;
}

// Menandai order lunas: membuat hak akses, membuat bimbingan bila paket
// termasuk bimbingan, lalu memberi notifikasi ke murid. Aman dipanggil ulang
// (idempoten) — order yang sudah lunas tidak membuat hak akses ganda.
// Dipakai oleh admin (pembayaran manual) dan nanti oleh callback Duitku.
export async function markOrderPaid(orderId: string, opts: { grantedById?: string; paymentRef?: string } = {}) {
  const result = await db.$transaction(async (tx) => {
    const order = await tx.order.findUnique({ where: { id: orderId }, include: { package: true } });
    if (!order) throw new Error("Order tidak ditemukan.");
    if (order.status === "PAID") return { order, alreadyPaid: true };
    if (order.status === "CANCELLED") throw new Error("Order sudah dibatalkan.");

    const now = new Date();
    const paid = await tx.order.update({
      where: { id: order.id },
      data: { status: "PAID", paidAt: now, paymentRef: opts.paymentRef ?? order.paymentRef },
      include: { package: true },
    });
    await tx.entitlement.create({
      data: {
        userId: order.userId,
        packageId: order.packageId,
        orderId: order.id,
        grantedById: opts.grantedById,
        startsAt: now,
        expiresAt: order.package.accessDays ? new Date(now.getTime() + order.package.accessDays * 86400000) : null,
      },
    });
    if (order.package.includesMentoring && order.package.mentoringField) {
      await tx.mentoring.create({
        data: {
          studentId: order.userId,
          packageId: order.packageId,
          orderId: order.id,
          field: order.package.mentoringField,
        },
      });
    }
    return { order: paid, alreadyPaid: false };
  });

  if (!result.alreadyPaid) {
    await notifyUser(result.order.userId, {
      title: "Pembayaran dikonfirmasi",
      body: `Akses ${result.order.package.name} sudah aktif.${
        result.order.package.includesMentoring ? " Admin akan menjadwalkan bimbingan dan memilih tutor sesuai bidang." : ""
      }`,
      link: "/belajar",
      email: true,
    });
  }
  return result;
}
