import "server-only";
import { db } from "./db";

// "Kelas" = Category beserta topik dan materinya. Dipakai halaman /kelas, /jalur, /penawaran, /belajar.

export const courseInclude = {
  track: { select: { slug: true, title: true } },
  topics: {
    where: { published: true },
    orderBy: { order: "asc" as const },
    include: {
      items: { where: { published: true }, orderBy: { order: "asc" as const }, select: { id: true, title: true, type: true, isFree: true } },
      quiz: { select: { id: true, title: true, published: true } },
    },
  },
};

export async function loadCourses(where: { trackSlug?: string; ids?: string[] } = {}) {
  return db.category.findMany({
    where: {
      published: true,
      track: { published: true, ...(where.trackSlug ? { slug: where.trackSlug } : {}) },
      ...(where.ids ? { id: { in: where.ids } } : {}),
    },
    orderBy: [{ track: { order: "asc" } }, { order: "asc" }],
    include: courseInclude,
  });
}
export type Course = Awaited<ReturnType<typeof loadCourses>>[number];

export async function doneItemIds(userId: string | undefined) {
  if (!userId) return new Set<string>();
  return new Set((await db.itemProgress.findMany({ where: { userId }, select: { itemId: true } })).map((p) => p.itemId));
}

// Ringkasan sebuah kelas untuk seorang pengguna. open = kelas terbuka penuh untuk pengguna ini.
export function courseStats(course: Course, done: Set<string>, open: boolean) {
  // Tautan sumber (LINK) tidak dihitung sebagai pelajaran yang harus diselesaikan.
  const lessons = course.topics.flatMap((t) => t.items.filter((i) => i.type !== "LINK").map((i) => ({ ...i, topicId: t.id })));
  const doneCount = lessons.filter((i) => done.has(i.id)).length;
  const reachable = lessons.filter((i) => open || i.isFree);
  const next = reachable.find((i) => !done.has(i.id)) ?? null;
  return {
    total: lessons.length,
    done: doneCount,
    pct: lessons.length ? Math.round((doneCount / lessons.length) * 100) : 0,
    free: lessons.filter((i) => i.isFree).length,
    quizzes: course.topics.filter((t) => t.quiz?.published).length,
    next,
    first: reachable[0] ?? null,
    started: doneCount > 0,
    completed: lessons.length > 0 && doneCount === lessons.length,
  };
}

export const lessonHref = (l: { topicId: string; id: string }) => `/materi/${l.topicId}?item=${l.id}`;

// Jumlah murid per kelas = angka awal yang diisi admin (studentBase) + murid yang benar-benar
// memiliki akses lewat pembelian/pemberian layanan yang memuat kelas itu (dihitung per orang, sekali).
export async function studentCounts(courses: { id: string; studentBase: number }[]) {
  const ids = courses.map((c) => c.id);
  const ents = ids.length
    ? await db.entitlement.findMany({
        where: { revokedAt: null, user: { role: "STUDENT" }, package: { categories: { some: { categoryId: { in: ids } } } } },
        select: { userId: true, package: { select: { categories: { select: { categoryId: true } } } } },
      })
    : [];
  const buyers = new Map<string, Set<string>>();
  for (const e of ents) {
    for (const pc of e.package.categories) {
      if (!buyers.has(pc.categoryId)) buyers.set(pc.categoryId, new Set());
      buyers.get(pc.categoryId)!.add(e.userId);
    }
  }
  return new Map(courses.map((c) => [c.id, { base: c.studentBase, auto: buyers.get(c.id)?.size ?? 0, total: c.studentBase + (buyers.get(c.id)?.size ?? 0) }]));
}

export const muridLabel = (n: number) => `${n.toLocaleString("id-ID")} murid`;
