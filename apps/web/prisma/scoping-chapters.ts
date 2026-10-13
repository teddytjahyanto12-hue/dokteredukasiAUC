import { PrismaClient, type Prisma } from "@prisma/client";
import { readFile, readdir, mkdir, copyFile } from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import { SRMA_PASSING_SCORE } from "../src/lib/srma-progression-rules";

const db = new PrismaClient();
const ranges = [[1, 3], [4, 6], [7, 9], [10, 12], [13, 16], [17, 21]];
type Draft = { title: string; coverage: string; passingScore: number; questions: { order: number; text: string; explanation: string; options: { order: number; text: string; isCorrect: boolean }[] }[] };

async function main() {
  const source = process.env.DEA_SCOPING_SOURCE || path.resolve(process.cwd(), "../../Materi scoping review");
  const storage = process.env.DEA_STORAGE_DIR || path.resolve("storage");
  const drafts: Draft[] = JSON.parse(await readFile(path.join(source, "Draf_Kuis_Scoping_Review.json"), "utf8"));
  const files = (await readdir(path.join(source, "Per Bab/PDF"))).filter(f => /^Bab \d{2} - .+\.pdf$/.test(f)).sort();
  if (files.length !== 21 || drafts.length !== 6) throw Error("Diperlukan 21 PDF dan 6 kuis.");
  for (const [i, q] of drafts.entries()) {
    if (q.questions.length !== 10 || q.questions.some(x => x.options.length !== 5 || x.options.filter(o => o.isCorrect).length !== 1 || !x.explanation)) throw Error(`Kuis ${i + 1} tidak valid.`);
  }
  const category = await db.category.findFirst({ where: { slug: "review-scoping-review" } });
  if (!category) throw Error("Kelas Scoping Review belum tersedia.");
  // Validate and copy every PDF before the database transaction. Content-addressed
  // filenames preserve earlier versions and avoid overwriting concurrent uploads.
  await mkdir(path.join(storage, "scoping"), { recursive: true });
  const assets: (Prisma.FileAssetCreateInput & { id: string; originalName: string })[] = [];
  for (const [index, name] of files.entries()) {
    if (Number(name.slice(4, 6)) !== index + 1) throw Error("Nomor bab tidak lengkap atau ganda.");
    const full = path.join(source, "Per Bab/PDF", name);
    const bytes = await readFile(full);
    if (!bytes.subarray(0, 5).equals(Buffer.from("%PDF-"))) throw Error(`PDF tidak valid: ${name}`);
    const hash = createHash("sha256").update(bytes).digest("hex");
    const storagePath = `scoping/${hash}.pdf`;
    await copyFile(full, path.join(storage, storagePath));
    assets.push({ id: `dea-scoping-pdf-${hash}`, storagePath, originalName: name, mimeType: "application/pdf", size: bytes.length, isPublic: false });
  }
  await db.$transaction(async tx => {
    const firstImport = await tx.topic.count({ where: { categoryId: category.id, id: { startsWith: "dea-scoping-chapter-group-" } } }) === 0;
    for (let i = 0; i < 6; i++) {
      const topicId = `dea-scoping-chapter-group-${i + 1}`;
      const draft = drafts[i];
      const [start, end] = ranges[i];
      // Import once: later edits by instructors and historical attempts survive reruns.
      if (await tx.topic.findUnique({ where: { id: topicId } })) continue;
      await tx.topic.create({ data: { id: topicId, categoryId: category.id, title: draft.title.replace(/^Kuis \d+\. /, ""), order: i + 1, description: `Scoping Review - ${draft.coverage}. Baca PDF per bab, lalu kerjakan kuis 10 soal. Nilai kelulusan ${SRMA_PASSING_SCORE}%.` } });
      for (let no = start; no <= end; no++) {
        const asset = assets[no - 1];
        await tx.fileAsset.upsert({ where: { id: asset.id }, create: asset, update: {} });
        await tx.item.create({ data: { id: `dea-scoping-chapter-${no}`, topicId, title: asset.originalName.replace(/\.pdf$/, ""), type: "PDF", fileId: asset.id, order: no, isFree: i === 0, sourceNote: "Modul Scoping Review Dokter Edukasi Academy, PDF asli per bab dari pengajar." } });
      }
      await tx.quiz.create({ data: { id: `dea-scoping-chapter-quiz-${i + 1}`, topicId, title: draft.title, passingScore: SRMA_PASSING_SCORE, isFree: i === 0, questions: { create: draft.questions.map(q => ({ ...q, options: { create: q.options } })) } } });
    }
    // Archive only the superseded Scoping Review topics; preserve history and admin edits.
    if (firstImport) await tx.topic.updateMany({ where: { categoryId: category.id, published: true, id: { notIn: Array.from({ length: 6 }, (_, i) => `dea-scoping-chapter-group-${i + 1}`) } }, data: { published: false } });
    await tx.quiz.updateMany({ where: { topic: { categoryId: category.id, published: true } }, data: { passingScore: SRMA_PASSING_SCORE } });
    for (const topic of await tx.topic.findMany({ where: { categoryId: category.id, published: true } })) {
      if (topic.description?.includes("Nilai kelulusan 70%.")) await tx.topic.update({ where: { id: topic.id }, data: { description: topic.description.replace("Nilai kelulusan 70%.", "Nilai kelulusan 80%.") } });
    }
  }, { timeout: 60000 });
  console.log("Scoping Review: 6 kelompok, 21 PDF bab, 6 kuis / 60 soal; kelompok 1 gratis, lulus 80.");
}
main().catch(error => { console.error(error); process.exitCode = 1; }).finally(() => db.$disconnect());
