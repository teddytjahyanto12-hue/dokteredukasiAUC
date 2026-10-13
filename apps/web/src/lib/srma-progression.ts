import "server-only";
import { cache } from "react";
import { db } from "./db";
import type { CurrentUser } from "./auth";
import { srmaProgression } from "./srma-progression-rules";

export const getSrmaProgression = cache(async (user: CurrentUser | null, categoryId: string) => {
  if (user && user.role !== "STUDENT") return null;
  const category = await db.category.findUnique({ where: { id: categoryId }, select: { slug: true } });
  if (!["review-systematic-review", "case-report-case-report", "review-narrative-literature-review", "review-scoping-review"].includes(category?.slug ?? "")) return null;
  const topics = await db.topic.findMany({ where: { categoryId, published: true }, orderBy: [{ order: "asc" }, { id: "asc" }], select: { id: true, title: true, quiz: { select: { id: true, title: true, published: true } } } });
  const attempts = user ? await db.quizAttempt.groupBy({ by: ["quizId"], where: { userId: user.id, quizId: { in: topics.flatMap(t => t.quiz ? [t.quiz.id] : []) } }, _max: { score: true } }) : [];
  return srmaProgression(topics, new Map(attempts.map(a => [a.quizId, a._max.score ?? -1])));
});

export async function canAccessSrmaTopic(user: CurrentUser | null, topicId: string, categoryId: string) {
  return !(await getSrmaProgression(user, categoryId))?.locked.has(topicId);
}
