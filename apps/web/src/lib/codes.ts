import "server-only";
import { db } from "./db";

// Kode kelas/Blok (mis. "BKV-12") disimpan di Category.code; kode Bab = kode Blok + "." + nomor Bab (BKV-12.1).
// Nomor Bab = urutan Bab yang tampil (topik terbit, tanpa topik petunjuk "Contoh Topik").

export const CODE_PATTERN = /^([A-Za-z]{2,6}-\d{1,3})(?:\.(\d{1,3}))?$/;

export function normalizeCode(raw: string | null | undefined) {
  const v = (raw ?? "").trim().toUpperCase().replace(/\s+/g, "");
  return v || null;
}

export function babCode(categoryCode: string | null | undefined, babNumber: number) {
  return categoryCode ? `${categoryCode}.${babNumber}` : null;
}

const visibleTopics = (categoryId: string) =>
  db.topic.findMany({
    where: { categoryId, published: true, NOT: { title: { startsWith: "Contoh Topik" } } },
    orderBy: { order: "asc" },
    select: { id: true },
  });

// Mencari tujuan untuk kata kunci berbentuk kode. Mengembalikan alamat halaman Blok atau Bab, atau null.
export async function resolveCode(q: string | undefined) {
  const m = q ? CODE_PATTERN.exec(q.trim()) : null;
  if (!m) return null;
  const category = await db.category.findUnique({ where: { code: m[1].toUpperCase() }, select: { id: true, published: true } });
  if (!category?.published) return null;
  if (!m[2]) return `/kelas/${category.id}`;
  const topics = await visibleTopics(category.id);
  const topic = topics[Number(m[2]) - 1];
  return topic ? `/materi/${topic.id}` : `/kelas/${category.id}`;
}

// Nomor Bab untuk sekumpulan topik (dipakai di dashboard "Terakhir dibuka").
export async function babNumbers(categoryIds: string[]) {
  const map = new Map<string, number>();
  for (const id of [...new Set(categoryIds)]) {
    (await visibleTopics(id)).forEach((t, i) => map.set(t.id, i + 1));
  }
  return map;
}
