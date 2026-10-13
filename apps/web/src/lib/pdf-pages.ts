import "server-only";
import { db } from "./db";
export type PdfPages = { pages: string[] };
export async function isSrmaPdf(fileId: string) {
  return !!await db.item.findFirst({ where: { fileId, topic: { category: { slug: { in: ["review-systematic-review", "case-report-case-report"] } } } }, select: { id: true } });
}
export async function getPdfPages(fileId: string): Promise<PdfPages | null> {
  const row = await db.setting.findUnique({ where: { key: `material.pdf-pages.${fileId}` } });
  if (!row) return null;
  try {
    const data: unknown = JSON.parse(row.value);
    if (!data || typeof data !== "object" || !("pages" in data) || !Array.isArray(data.pages) || !data.pages.length || data.pages.length > 500 || data.pages.some(p => typeof p !== "string" || !/^srma-pages\/[a-f0-9]{64}\/page-\d{3}\.png$/.test(p))) return null;
    return { pages: data.pages };
  } catch { return null; }
}
