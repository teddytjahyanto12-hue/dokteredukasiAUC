"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { activeEntitlementWhere, canAccessCategory } from "@/lib/access";
import { createOrder } from "@/lib/orders";
import { QuoteError } from "@/lib/services";
import { back, str } from "@/lib/flash";
import { getSettings, whatsappLink } from "@/lib/settings";
import { fillWaTemplate, invoiceNo, loadOrderForReceipt, orderSummary } from "@/lib/receipts";
import { notifyStaff } from "@/lib/notify";
import { createDuitkuPayment, DuitkuError, syncOrderPayments } from "@/lib/duitku";

export async function orderPackageAction(form: FormData) {
  const user = await requireUser(["STUDENT"]);
  const packageId = str(form, "packageId");
  const pkg = await db.package.findUnique({ where: { id: packageId } });
  if (!pkg || !pkg.active) back("/paket", "Layanan tidak tersedia.", "error");
  const path = `/paket/${pkg.slug}`;

  const owned = await db.entitlement.findFirst({ where: { ...activeEntitlementWhere(user.id), packageId } });
  if (owned) back(path, "Anda sudah memiliki layanan ini.", "error");
  const pending = await db.order.findFirst({ where: { userId: user.id, packageId, status: "PENDING" } });
  if (pending) redirect(`/pembelian/${pending.id}`);

  let orderId: string;
  try {
    const order = await createOrder(user.id, packageId, {
      durationId: str(form, "durationId") || null,
      addonIds: form.getAll("addonIds").map(String),
      plan: str(form, "plan") === "INSTALLMENT" ? "INSTALLMENT" : "FULL",
      leadSource: str(form, "leadSource") || null,
    });
    orderId = order.id;
  } catch (e) {
    if (e instanceof QuoteError) back(path, e.message, "error");
    throw e;
  }
  redirect(`/pembelian/${orderId}?baru=1`);
}

export async function toggleItemDoneAction(form: FormData) {
  const user = await requireUser();
  const itemId = str(form, "itemId");
  const item = await db.item.findUnique({ where: { id: itemId }, include: { topic: true } });
  if (!item) return;
  if (!item.isFree && !(await canAccessCategory(user, item.topic.categoryId))) return;

  const existing = await db.itemProgress.findUnique({ where: { userId_itemId: { userId: user.id, itemId } } });
  if (existing) await db.itemProgress.delete({ where: { id: existing.id } });
  else await db.itemProgress.create({ data: { userId: user.id, itemId } });
  revalidatePath(`/materi/${item.topicId}`);
}

// Tandai selesai lalu buka materi berikutnya di kelas yang sama (lintas topik).
export async function completeAndNextAction(form: FormData) {
  const user = await requireUser();
  const itemId = str(form, "itemId");
  const item = await db.item.findUnique({ where: { id: itemId }, include: { topic: true } });
  if (!item) return;
  const open = await canAccessCategory(user, item.topic.categoryId);
  if (!item.isFree && !open) return;
  await db.itemProgress.upsert({ where: { userId_itemId: { userId: user.id, itemId } }, update: {}, create: { userId: user.id, itemId } });

  const topics = await db.topic.findMany({
    where: { categoryId: item.topic.categoryId, published: true },
    orderBy: { order: "asc" },
    select: { id: true, items: { where: { published: true }, orderBy: { order: "asc" }, select: { id: true, type: true, isFree: true } } },
  });
  const lessons = topics.flatMap((t) => t.items.filter((i) => i.type !== "LINK" && (open || i.isFree)).map((i) => ({ id: i.id, topicId: t.id })));
  const next = lessons[lessons.findIndex((l) => l.id === itemId) + 1];
  revalidatePath(`/materi/${item.topicId}`);
  redirect(next ? `/materi/${next.topicId}?item=${next.id}` : `/kelas/${item.topic.categoryId}?selesai=1`);
}

export async function submitQuizAction(form: FormData) {
  const user = await requireUser();
  const quizId = str(form, "quizId");
  const quiz = await db.quiz.findUnique({
    where: { id: quizId },
    include: { topic: true, questions: { include: { options: true } } },
  });
  if (!quiz || !quiz.published) back("/belajar", "Quiz tidak ditemukan.", "error");
  if (!(await canAccessCategory(user, quiz.topic.categoryId))) back(`/materi/${quiz.topicId}`, "Anda belum memiliki akses ke quiz ini.", "error");
  if (quiz.questions.length === 0) back(`/quiz/${quiz.topicId}`, "Quiz belum memiliki soal.", "error");

  const answers = quiz.questions.map((q) => {
    const optionId = str(form, `q_${q.id}`) || null;
    const option = q.options.find((o) => o.id === optionId);
    return { questionId: q.id, optionId: option?.id ?? null, isCorrect: option?.isCorrect ?? false };
  });
  const correct = answers.filter((a) => a.isCorrect).length;
  const attempt = await db.quizAttempt.create({
    data: {
      userId: user.id,
      quizId: quiz.id,
      correct,
      total: answers.length,
      score: Math.round((correct / answers.length) * 100),
      answers: { create: answers },
    },
  });
  redirect(`/quiz/${quiz.topicId}?hasil=${attempt.id}`);
}

export async function markNotificationsReadAction() {
  const user = await requireUser();
  await db.notification.updateMany({ where: { userId: user.id, readAt: null }, data: { readAt: new Date() } });
  revalidatePath("/notifikasi");
}

// ---------- Pembayaran online (Duitku) ----------

export async function payOnlineAction(orderId: string) {
  const user = await requireUser();
  const order = await db.order.findFirst({ where: { id: orderId, userId: user.id }, select: { id: true } });
  if (!order) back("/pembelian", "Pesanan tidak ditemukan.", "error");
  let url: string;
  try {
    url = await createDuitkuPayment(orderId);
  } catch (e) {
    back(`/pembelian/${orderId}`, e instanceof DuitkuError ? e.message : "Pembayaran online gagal dibuat.", "error");
  }
  redirect(url);
}

export async function checkPaymentAction(orderId: string) {
  const user = await requireUser();
  const order = await db.order.findFirst({ where: { id: orderId, userId: user.id }, select: { id: true } });
  if (!order) back("/pembelian", "Pesanan tidak ditemukan.", "error");
  await syncOrderPayments(orderId);
  revalidatePath(`/pembelian/${orderId}`);
  redirect(`/pembelian/${orderId}?bayar=cek`);
}

// ---------- Pembayaran manual: invoice lewat WhatsApp admin ----------

// Menyimpan catatan pelanggan, memberi tahu staf, lalu membuka WhatsApp admin dengan invoice
// yang sudah terisi (nomor invoice, paket, biaya, cara bayar, catatan). Admin memproses manual.
export async function requestManualInvoiceAction(orderId: string, form: FormData) {
  const user = await requireUser();
  const owned = await db.order.findFirst({ where: { id: orderId, userId: user.id }, select: { id: true, status: true } });
  if (!owned) back("/pembelian", "Pesanan tidak ditemukan.", "error");
  if (owned.status !== "PENDING" && owned.status !== "PARTIAL") back(`/pembelian/${orderId}`, "Pesanan ini tidak memiliki tagihan.", "error");
  const s = await getSettings();
  if (!whatsappLink(s.adminWhatsapp)) back(`/pembelian/${orderId}`, "Nomor WhatsApp admin belum diatur. Hubungi admin melalui kontak yang tersedia.", "error");

  await db.order.update({ where: { id: orderId }, data: { customerNote: str(form, "catatan").slice(0, 500) || null, invoiceRequestedAt: new Date() } });
  const o = (await loadOrderForReceipt(orderId))!;
  const sum = orderSummary(o);
  const inv = invoiceNo(o, sum.nextDue?.seq);
  await notifyStaff("admin.orders", {
    title: `Invoice manual ${inv}`,
    body: `${sum.customer} meminta pembayaran manual. Kirim nomor rekening lewat WhatsApp, lalu tandai lunas setelah transfer diterima.`,
    rows: [
      ["No. invoice", inv],
      ["Paket", sum.service],
      ["Biaya", sum.total],
      ["Pembayaran", sum.plan],
      ["Tagihan saat ini", sum.due],
      ["Catatan", o.customerNote ?? "-"],
      ["WhatsApp pelanggan", sum.phone],
    ],
    link: `/admin/order/${orderId}`,
    orderId,
  });
  revalidatePath(`/pembelian/${orderId}`);
  redirect(whatsappLink(s.adminWhatsapp, fillWaTemplate(s.waConfirmTemplate, s.siteName, o))!);
}
