import { PrismaClient, type Prisma } from "@prisma/client";
import { readFile, readdir, mkdir, copyFile } from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import { SRMA_PASSING_SCORE } from "../src/lib/srma-progression-rules";

const db = new PrismaClient();
const ranges = [[1, 3], [4, 7], [8, 12], [13, 19], [0, -1]];
type Draft = { title: string; coverage: string; passingScore: number; questions: { order: number; text: string; explanation: string; options: { order: number; text: string; isCorrect: boolean }[] }[] };

async function main() {
  const source = process.env.DEA_NLR_SOURCE || path.resolve(process.cwd(), "../../Materi narrative review");
  const storage = process.env.DEA_STORAGE_DIR || path.resolve("storage");
  const drafts: Draft[] = JSON.parse(await readFile(path.join(source, "Draf_Kuis_NLR.json"), "utf8"));
  const files = (await readdir(path.join(source, "Per Bab/PDF"))).filter(f => /^Bab \d{2} - .+\.pdf$/.test(f)).sort();
  files.push("../../Contoh_Naskah_NLR_Beranotasi.pdf");
  if (files.length !== 20 || drafts.length !== 5) throw Error("Diperlukan 19 PDF dan 5 kuis.");
  for (const [i, q] of drafts.entries()) {
    if (q.questions.length !== 10 || q.questions.some(x => x.options.length !== 5 || x.options.filter(o => o.isCorrect).length !== 1 || !x.explanation)) throw Error(`Kuis ${i + 1} tidak valid.`);
  }
  const category = await db.category.findFirst({ where: { slug: "review-narrative-literature-review" } });
  if (!category) throw Error("Kelas NLR belum tersedia.");
  // Validate and copy every PDF before the database transaction. Content-addressed
  // filenames preserve earlier versions and avoid overwriting concurrent uploads.
  await mkdir(path.join(storage, "nlr"), { recursive: true });
  const assets: (Prisma.FileAssetCreateInput & { id: string; originalName: string })[] = [];
  for (const [index, name] of files.entries()) {
    if (index < 19 && Number(name.slice(4, 6)) !== index + 1) throw Error("Nomor bab tidak lengkap atau ganda.");
    const full = path.join(source, "Per Bab/PDF", name);
    const bytes = await readFile(full);
    if (!bytes.subarray(0, 5).equals(Buffer.from("%PDF-"))) throw Error(`PDF tidak valid: ${name}`);
    const hash = createHash("sha256").update(bytes).digest("hex");
    const storagePath = `nlr/${hash}.pdf`;
    await copyFile(full, path.join(storage, storagePath));
    assets.push({ id: `dea-nlr-pdf-${hash}`, storagePath, originalName: name, mimeType: "application/pdf", size: bytes.length, isPublic: false });
  }
  await db.$transaction(async tx => {
    const firstImport = await tx.topic.count({ where: { categoryId: category.id, id: { startsWith: "dea-nlr-chapter-group-" } } }) === 0;
    for (let i = 0; i < 5; i++) {
      const topicId = `dea-nlr-chapter-group-${i + 1}`;
      const draft = drafts[i];
      const [start, end] = ranges[i];
      // Import once: later edits by instructors and historical attempts survive reruns.
      if (await tx.topic.findUnique({ where: { id: topicId } })) continue;
      await tx.topic.create({ data: { id: topicId, categoryId: category.id, title: draft.title.replace(/^Kuis \d+\. /, ""), order: i + 1, description: `Narrative Literature Review - ${draft.coverage}. ${i === 4 ? "Baca contoh naskah beranotasi, tinjau kembali bab terkait, lalu kerjakan kuis 10 soal." : "Baca PDF per bab, lalu kerjakan kuis 10 soal."} Nilai kelulusan ${SRMA_PASSING_SCORE}%.` } });
      for (let no = start; no <= end; no++) {
        const asset = assets[no - 1];
        await tx.fileAsset.upsert({ where: { id: asset.id }, create: asset, update: {} });
        await tx.item.create({ data: { id: `dea-nlr-chapter-${no}`, topicId, title: asset.originalName.replace(/\.pdf$/, ""), type: "PDF", fileId: asset.id, order: no, isFree: i === 0, sourceNote: "Modul Narrative Literature Review Dokter Edukasi Academy, PDF asli per bab dari pengajar." } });
      }
      await tx.quiz.create({ data: { id: `dea-nlr-chapter-quiz-${i + 1}`, topicId, title: draft.title, passingScore: SRMA_PASSING_SCORE, isFree: i === 0, questions: { create: draft.questions.map(q => ({ ...q, options: { create: q.options } })) } } });
    }
    const example = assets[19];
    await tx.fileAsset.upsert({ where: { id: example.id }, create: example, update: {} });
    await tx.item.upsert({ where: { id: "dea-nlr-annotated-example" }, update: {}, create: { id: "dea-nlr-annotated-example", topicId: "dea-nlr-chapter-group-5", title: "Contoh Naskah NLR Beranotasi", type: "PDF", fileId: example.id, order: 20, isFree: false, sourceNote: "Contoh naskah beranotasi dari pengajar untuk evaluasi penerapan." } });
    // Archive only the superseded NLR topics; preserve history and admin edits.
    if (firstImport) await tx.topic.updateMany({ where: { categoryId: category.id, published: true, id: { notIn: Array.from({ length: 5 }, (_, i) => `dea-nlr-chapter-group-${i + 1}`) } }, data: { published: false } });
    await tx.quiz.updateMany({ where: { topic: { categoryId: category.id, published: true } }, data: { passingScore: SRMA_PASSING_SCORE } });
    for (const topic of await tx.topic.findMany({ where: { categoryId: category.id, published: true } })) {
      if (topic.description?.includes("Nilai kelulusan 70%.")) await tx.topic.update({ where: { id: topic.id }, data: { description: topic.description.replace("Nilai kelulusan 70%.", "Nilai kelulusan 80%.") } });
    }
  }, { timeout: 60000 });
  console.log("NLR: 5 kelompok, 19 PDF bab + contoh beranotasi, 5 kuis / 50 soal; kelompok 1 gratis, lulus 80.");
}
main().catch(error => { console.error(error); process.exitCode = 1; }).finally(() => db.$disconnect());
