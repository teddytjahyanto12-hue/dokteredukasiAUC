import "server-only";
import { db } from "./db";
import { courseInclude, withBlockTopics } from "./courses";

// Jalur belajar beserta kelasnya (hanya kelas yang ditampilkan di website).
export async function loadPaths(where: { slug?: string; publishedOnly?: boolean } = {}) {
  const paths = await db.learningPath.findMany({
    where: { ...(where.slug ? { slug: where.slug } : {}), ...(where.publishedOnly === false ? {} : { published: true }) },
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    include: { steps: { orderBy: { order: "asc" }, include: { category: { include: courseInclude } } } },
  });
  return paths.map((p) => ({ ...p, steps: p.steps.filter((s) => s.category.published).map((s) => ({ ...s, category: withBlockTopics(s.category) })) }));
}
export type PathWithSteps = Awaited<ReturnType<typeof loadPaths>>[number];
