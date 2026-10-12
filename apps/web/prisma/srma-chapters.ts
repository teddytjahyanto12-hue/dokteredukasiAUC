import { PrismaClient, type Prisma } from "@prisma/client";
import { readFile, readdir, mkdir, copyFile } from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import { SRMA_PASSING_SCORE } from "../src/lib/srma-progression-rules";

const db = new PrismaClient();
const ranges = [[1, 4], [5, 6], [7, 9], [10, 11], [12, 14], [15, 17], [18, 19], [20, 22]];
type Draft = { title: string; coverage: string; passingScore: number; questions: { order: number; text: string; explanation: string; options: { order: number; text: string; isCorrect: boolean }[] }[] };

async function main() {
  const source = process.env.DEA_SRMA_SOURCE || path.resolve(process.cwd(), "../../Materi Systematic review");
  const storage = process.env.DEA_STORAGE_DIR || path.resolve("storage");
  const drafts: Draft[] = JSON.parse(await readFile(path.join(source, "Draf_Kuis_SRMA.json"), "utf8"));
  const files = (await readdir(path.join(source, "Per Bab/PDF"))).filter(f => /^Bab \d{2} - .+\.pdf$/.test(f)).sort();
  if (files.length !== 22 || drafts.length !== 8) throw Error("Diperlukan 22 PDF dan 8 kuis.");
  for (const [i, q] of drafts.entries()) {
    if (q.questions.length !== 10 || q.questions.some(x => x.options.length !== 5 || x.options.filter(o => o.isCorrect).length !== 1 || !x.explanation)) throw Error(`Kuis ${i + 1} tidak valid.`);
  }
  const category = await db.category.findFirst({ where: { slug: "review-systematic-review" } });
  if (!category) throw Error("Kelas SR-MA belum tersedia.");
  // Validate and copy every PDF before the database transaction. Content-addressed
  // filenames preserve earlier versions and avoid overwriting concurrent uploads.
  await mkdir(path.join(storage, "srma"), { recursive: true });
  const assets: (Prisma.FileAssetCreateInput & { id: string; originalName: string })[] = [];
  for (const [index, name] of files.entries()) {
    if (Number(name.slice(4, 6)) !== index + 1) throw Error("Nomor bab tidak lengkap atau ganda.");
    const full = path.join(source, "Per Bab/PDF", name);
    const bytes = await readFile(full);
    if (!bytes.subarray(0, 5).equals(Buffer.from("%PDF-"))) throw Error(`PDF tidak valid: ${name}`);
    const hash = createHash("sha256").update(bytes).digest("hex");
    const storagePath = `srma/${hash}.pdf`;
    await copyFile(full, path.join(storage, storagePath));
    assets.push({ id: `dea-srma-pdf-${hash}`, storagePath, originalName: name, mimeType: "application/pdf", size: bytes.length, isPublic: false });
  }
  await db.$transaction(async tx => {
    for (let i = 0; i < 8; i++) {
      const topicId = `dea-srma-chapter-group-${i + 1}`;
      const draft = drafts[i];
      const [start, end] = ranges[i];
      // Import once: later edits by instructors and historical attempts survive reruns.
      if (await tx.topic.findUnique({ where: { id: topicId } })) continue;
      await tx.topic.create({ data: { id: topicId, categoryId: category.id, title: draft.title.replace(/^Kuis \d+\. /, ""), order: i + 1, description: `${i < 4 ? "Telaah sistematik" : "Meta-analisis"} · ${draft.coverage}. Baca PDF per bab, lalu kerjakan kuis 10 soal. Nilai kelulusan ${SRMA_PASSING_SCORE}%.` } });
      for (let no = start; no <= end; no++) {
        const asset = assets[no - 1];
        await tx.fileAsset.upsert({ where: { id: asset.id }, create: asset, update: {} });
        await tx.item.create({ data: { id: `dea-srma-chapter-${no}`, topicId, title: asset.originalName.replace(/\.pdf$/, ""), type: "PDF", fileId: asset.id, order: no, isFree: no === 1, sourceNote: "Buku modul SR-MA Dokter Edukasi Academy, berkas per bab dari pengajar (12 Oktober 2026)." } });
      }
      await tx.quiz.create({ data: { id: `dea-srma-chapter-quiz-${i + 1}`, topicId, title: draft.title, passingScore: SRMA_PASSING_SCORE, isFree: i === 0, questions: { create: draft.questions.map(q => ({ ...q, options: { create: q.options } })) } } });
    }
    // Superseded curriculum remains in the admin with all progress and answers.
    await tx.topic.updateMany({ where: { categoryId: category.id, id: { in: ["cmul9dd980012uzzo6h5yse8w", ...Array.from({ length: 7 }, (_, i) => `dea-srma-module-${i + 1}`)] }, published: true }, data: { published: false } });
    await tx.quiz.updateMany({ where: { topic: { categoryId: category.id, published: true } }, data: { passingScore: SRMA_PASSING_SCORE } });
    for (const topic of await tx.topic.findMany({ where: { categoryId: category.id, published: true } })) {
      if (topic.description?.includes("Nilai kelulusan 70%.")) await tx.topic.update({ where: { id: topic.id }, data: { description: topic.description.replace("Nilai kelulusan 70%.", "Nilai kelulusan 80%.") } });
    }
  }, { timeout: 60000 });
  console.log("SR-MA: 8 kelompok, 22 PDF, 8 kuis / 80 soal. Materi sebelumnya diarsipkan tanpa penghapusan; Toolkit dan akses paket dipertahankan.");
}
main().catch(error => { console.error(error); process.exitCode = 1; }).finally(() => db.$disconnect());
