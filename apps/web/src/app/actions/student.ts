"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { activeEntitlementWhere, canAccessCategory } from "@/lib/access";
import { createOrder } from "@/lib/orders";
import { QuoteError } from "@/lib/services";
import { back, str } from "@/lib/flash";

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
