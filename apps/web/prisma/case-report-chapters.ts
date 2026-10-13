import { PrismaClient, type Prisma } from "@prisma/client";
import { readFile, readdir, mkdir, copyFile } from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import { SRMA_PASSING_SCORE } from "../src/lib/srma-progression-rules";

const db = new PrismaClient();
const ranges = [[1, 2], [3, 4], [5, 9], [10, 14], [15, 18], [0, -1]];
type Draft = { title: string; coverage: string; passingScore: number; questions: { order: number; text: string; explanation: string; options: { order: number; text: string; isCorrect: boolean }[] }[] };

async function main() {
  const source = process.env.DEA_CASE_REPORT_SOURCE || path.resolve(process.cwd(), "../../Materi case report");
  const storage = process.env.DEA_STORAGE_DIR || path.resolve("storage");
  const drafts: Draft[] = JSON.parse(await readFile(path.join(source, "Draf_Kuis_Case_Report.json"), "utf8"));
  const files = (await readdir(path.join(source, "Per Bab/PDF"))).filter(f => /^Bab \d{2} - .+\.pdf$/.test(f)).sort();
  if (files.length !== 18 || drafts.length !== 6) throw Error("Diperlukan 18 PDF dan 6 kuis.");
  for (const [i, q] of drafts.entries()) {
    if (q.questions.length !== 10 || q.questions.some(x => x.options.length !== 5 || x.options.filter(o => o.isCorrect).length !== 1 || !x.explanation)) throw Error(`Kuis ${i + 1} tidak valid.`);
  }
  const category = await db.category.findFirst({ where: { slug: "case-report-case-report" } });
  if (!category) throw Error("Kelas Case Report belum tersedia.");
  // Validate and copy every PDF before the database transaction. Content-addressed
  // filenames preserve earlier versions and avoid overwriting concurrent uploads.
  await mkdir(path.join(storage, "case-report"), { recursive: true });
  const assets: (Prisma.FileAssetCreateInput & { id: string; originalName: string })[] = [];
  for (const [index, name] of files.entries()) {
    if (Number(name.slice(4, 6)) !== index + 1) throw Error("Nomor bab tidak lengkap atau ganda.");
    const full = path.join(source, "Per Bab/PDF", name);
    const bytes = await readFile(full);
    if (!bytes.subarray(0, 5).equals(Buffer.from("%PDF-"))) throw Error(`PDF tidak valid: ${name}`);
    const hash = createHash("sha256").update(bytes).digest("hex");
    const storagePath = `case-report/${hash}.pdf`;
    await copyFile(full, path.join(storage, storagePath));
    assets.push({ id: `dea-case-report-pdf-${hash}`, storagePath, originalName: name, mimeType: "application/pdf", size: bytes.length, isPublic: false });
  }
  await db.$transaction(async tx => {
    for (let i = 0; i < 6; i++) {
      const topicId = `dea-case-report-group-${i + 1}`;
      const draft = drafts[i];
      const [start, end] = ranges[i];
      // Import once: later edits by instructors and historical attempts survive reruns.
      if (await tx.topic.findUnique({ where: { id: topicId } })) continue;
      await tx.topic.create({ data: { id: topicId, categoryId: category.id, title: draft.title.replace(/^Kuis \d+\. /, ""), order: i + 1, description: `${i === 5 ? "Evaluasi penerapan" : "Kelompok materi"} · ${draft.coverage}. Baca PDF per bab, lalu kerjakan kuis 10 soal. Nilai kelulusan ${SRMA_PASSING_SCORE}%.` } });
      for (let no = start; no <= end; no++) {
        const asset = assets[no - 1];
        await tx.fileAsset.upsert({ where: { id: asset.id }, create: asset, update: {} });
        await tx.item.create({ data: { id: `dea-case-report-chapter-${no}`, topicId, title: asset.originalName.replace(/\.pdf$/, ""), type: "PDF", fileId: asset.id, order: no, isFree: i === 0, sourceNote: "Buku modul Case Report Dokter Edukasi Academy, berkas per bab dari pengajar (13 Oktober 2026)." } });
      }
      if (i === 5) await tx.item.create({ data: { id: "dea-case-report-evaluation", topicId, title: "Persiapan evaluasi penerapan", type: "TEXT", order: 1, isFree: false, body: "Tinjau kembali Bab 01–18 sebelum mengerjakan evaluasi ini. Sepuluh soal menguji penerapan konsep laporan kasus. Nilai lulus minimal 80/100." } });
      await tx.quiz.create({ data: { id: `dea-case-report-quiz-${i + 1}`, topicId, title: draft.title, passingScore: SRMA_PASSING_SCORE, isFree: i === 0, questions: { create: draft.questions.map(q => ({ ...q, options: { create: q.options } })) } } });
    }
    await tx.topic.updateMany({ where: { categoryId: category.id, id: "cmul9dd9k001cuzzo65kjsqq5", published: true }, data: { published: false } });
  }, { timeout: 60000 });
  console.log("Case Report: 18 PDF, 6 kuis / 60 soal; gratis kelompok1; nilai lulus80.");
}
main().catch(error => { console.error(error); process.exitCode = 1; }).finally(() => db.$disconnect());
