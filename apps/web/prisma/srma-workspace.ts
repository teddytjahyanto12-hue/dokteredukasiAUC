import { PrismaClient } from "@prisma/client";
import { DEFAULT_SRMA, SR_SLUG, TOOLKIT_SLUG } from "../src/lib/srma-config";
const db = new PrismaClient();
const modules = [
  { title: "1. Fondasi dan pertanyaan riset", lessons: ["Memahami systematic review dan meta-analisis", "Menilai ide dan menyusun PICO", "Peta kerja dari protokol sampai publikasi"], goal: "Susun pertanyaan yang terfokus, identifikasi celah bukti, dan tentukan ruang lingkup review.", question: "Apa fungsi PICO dalam perencanaan review?", options: ["Membantu merumuskan pertanyaan dan kriteria kelayakan", "Menggantikan pencarian literatur", "Menjamin hasil pooling signifikan"] },
  { title: "2. Protokol, pencarian, dan seleksi", lessons: ["Strategi pencarian dan alur PRISMA", "Protokol dan registrasi review", "Ekspor referensi dan deduplikasi"], goal: "Dokumentasikan strategi yang dapat direproduksi, rencanakan seleksi oleh dua penelaah, dan simpan alasan eksklusi.", question: "Apa yang perlu disimpan agar pencarian bisa direproduksi?", options: ["Strategi lengkap, platform, tanggal, dan jumlah hasil", "Hanya nama database", "Hanya artikel yang hasilnya signifikan"] },
  { title: "3. Ekstraksi dan sintesis data", lessons: ["Tabel ekstraksi dan sintesis naratif", "Data untuk meta-analisis dan RevMan", "Konsep network meta-analysis", "Memeriksa jaringan dan asumsi NMA", "Alur analisis menggunakan R"], goal: "Rancang tabel ekstraksi, tentukan ukuran efek, dan pilih sintesis yang sesuai dengan desain serta keterbandingan studi.", question: "Kapan pooling layak dipertimbangkan?", options: ["Saat pertanyaan, desain, dan data cukup sebanding", "Untuk setiap kumpulan artikel", "Hanya ketika semua studi signifikan"] },
  { title: "4. Bias dan kepastian bukti", lessons: ["Penilaian risiko bias", "Bias publikasi dan efek studi kecil", "Kepastian bukti dengan GRADE"], goal: "Pilih alat appraisal sesuai desain, dokumentasikan pertimbangan, dan pisahkan risiko bias studi dari kepastian keseluruhan bukti.", question: "Apa yang dinilai pada kepastian bukti?", options: ["Keyakinan terhadap estimasi pada kumpulan bukti", "Jumlah halaman artikel", "Reputasi penulis saja"] },
  { title: "5. Menulis interpretasi", lessons: ["Pendahuluan, diskusi, dan kesimpulan"], goal: "Hubungkan hasil dengan pertanyaan riset, jelaskan keterbatasan, dan hindari kesimpulan yang melampaui data.", question: "Apa yang perlu muncul dalam diskusi?", options: ["Interpretasi hasil, keterbatasan, dan implikasi", "Klaim kausal untuk setiap studi observasional", "Hanya pengulangan angka hasil"] },
  { title: "6. Abstrak dan referensi", lessons: ["Abstrak terstruktur dan pengelolaan referensi"], goal: "Pastikan abstrak sesuai naskah, metadata referensi benar, dan format mengikuti jurnal tujuan.", question: "Bagaimana menulis abstrak yang konsisten?", options: ["Selaraskan metode dan temuan dengan naskah akhir", "Tambahkan hasil baru yang tidak ada di naskah", "Hilangkan keterbatasan karena ruang terbatas"] },
  { title: "7. Publikasi", lessons: ["Pemilihan jurnal dan pengiriman manuskrip"], goal: "Periksa ruang lingkup jurnal, persyaratan pelaporan, pernyataan etik, dan berkas pengiriman.", question: "Apa langkah sebelum mengirim manuskrip?", options: ["Periksa petunjuk penulis dan kelengkapan berkas", "Kirim ke banyak jurnal secara bersamaan", "Lewati checklist pelaporan"] },
  { title: "8. Bonus: panduan kerja riset", lessons: ["Template, guideline, dan prompt AI"], goal: "Gunakan kerangka sendiri, periksa sumber asli, dan dokumentasikan pemakaian alat bantu secara transparan.", question: null, options: [] },
];
async function main() {
  const sr = await db.category.findFirst({ where: { slug: SR_SLUG } });
  const toolkit = await db.category.findFirst({ where: { slug: TOOLKIT_SLUG } });
  if (!sr || !toolkit) throw Error("Kategori SR-MA dan Toolkit harus tersedia terlebih dahulu.");
  await db.setting.upsert({ where: { key: "srma.config" }, create: { key: "srma.config", value: JSON.stringify(DEFAULT_SRMA) }, update: {} });
  // Upgrade only the exact untouched starter templates from the first scaffold.
  const row = await db.setting.findUnique({ where: { key: "srma.config" } });
  if (row) {
    const config = JSON.parse(row.value);
    const oldTemplates = DEFAULT_SRMA.templates.slice(0, 6).map(t => ({ ...t, body: "Judul\nAbstrak terstruktur\nPendahuluan: masalah, celah bukti, tujuan\nMetode: protokol, kelayakan, pencarian, seleksi, ekstraksi, appraisal, sintesis\nHasil: alur seleksi, karakteristik, penilaian, sintesis\nDiskusi: temuan, konteks, keterbatasan, implikasi\nKesimpulan\nReferensi\nLampiran: strategi pencarian, tabel ekstraksi, checklist pelaporan\n\nSesuaikan metode dan checklist dengan desain review yang dipilih." }));
    if (JSON.stringify(config.templates) === JSON.stringify(oldTemplates)) await db.setting.updateMany({ where: { key: row.key, value: row.value }, data: { value: JSON.stringify({ ...config, templates: DEFAULT_SRMA.templates }) } });
  }
  await db.item.updateMany({ where: { id: { startsWith: "dea-srma-lesson-" }, sourceNote: "Kerangka awal milik Dokter Edukasi Academy, bukan salinan materi Auctus." }, data: { sourceNote: "Kerangka awal Dokter Edukasi Academy." } });
  for (const slug of ["paket-srma-intermediate", "paket-srma-pro"]) {
    const pkg = await db.package.findUnique({ where: { slug } });
    if (pkg) await db.packageCategory.upsert({ where: { packageId_categoryId: { packageId: pkg.id, categoryId: toolkit.id } }, create: { packageId: pkg.id, categoryId: toolkit.id }, update: {} });
  }
  for (const [index, m] of modules.entries()) {
    const id = `dea-srma-module-${index + 1}`;
    const existing = await db.topic.findUnique({ where: { id } });
    if (existing) {
      if (index === 7 && existing.categoryId === sr.id) await db.topic.update({ where: { id }, data: { categoryId: toolkit.id } });
      continue;
    }
    await db.topic.create({ data: { id, categoryId: index === 7 ? toolkit.id : sr.id, title: m.title, order: 10 + index, description: m.goal, items: { create: m.lessons.map((title, i) => ({ id: `dea-srma-lesson-${index + 1}-${i + 1}`, title, type: "TEXT", order: i, isFree: index === 0 && i === 0, body: `${title}\n\nTujuan belajar\n${m.goal}\n\nLatihan mandiri\nTerapkan langkah ini pada topik riset yang sedang disusun. Catat keputusan, sumber, dan hal yang masih perlu didiskusikan.\n\nCatatan pengajar\nIni kerangka awal Dokter Edukasi Academy. Materi rinci, video, dan sumber pendamping akan dilengkapi pengajar melalui admin.`, sourceNote: "Kerangka awal Dokter Edukasi Academy." })) }, ...(m.question ? { quiz: { create: { title: `Latihan modul ${index + 1}`, isFree: index === 0, questions: { create: { text: m.question, explanation: m.goal, options: { create: m.options.map((text, i) => ({ text, order: i, isCorrect: i === 0 })) } } } } } } : {}) } });
  }
  console.log("Kerangka SR-MA dan konfigurasi Toolkit tersedia. Materi lama dan perubahan admin dipertahankan.");
}
main().finally(() => db.$disconnect());

