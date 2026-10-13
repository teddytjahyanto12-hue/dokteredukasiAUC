// Penyusun dokumen validasi kalkulator (DOCX).
// Jalankan dari folder ini: npm install (sekali), lalu
//   npx --prefix ../../../apps/web tsx build.ts ../Validasi_Kalkulator_GCS_HPL_v0.1.docx
// Tabel uji kasus memanggil langsung fungsi rumus di apps/web/src/lib/calculators, jadi selalu sama dengan aplikasi.
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { computeGcs, gcsCopyText, GCS_COMPONENTS, type GcsInput } from "../../../apps/web/src/lib/calculators/gcs";
import { computeHpl, hplCopyText, tanggalIndo, type HplInput } from "../../../apps/web/src/lib/calculators/hpl";
import { CALCULATORS, DISCLAIMER } from "../../../apps/web/src/lib/calculators/registry";
import { CONTENT } from "../../../apps/web/src/lib/calculators/content";

const require = createRequire(import.meta.url);
const H = require("./helpers.js");
const { p, h1, h2, h3, bullets, numbered, note, gap, link, table, image, caption, cover, makeDoc } = H;
const { Packer } = H.docx;

const OUT = process.argv[2] ?? "../Validasi_Kalkulator_GCS_HPL_v0.1.docx";
const SHOTS = path.join(path.dirname(fileURLToPath(import.meta.url)), "shots");
const TANGGAL = "12 Oktober 2026";

function shot(file: string) {
  const buf = fs.readFileSync(path.join(SHOTS, file));
  const w = buf.readUInt32BE(16), h = buf.readUInt32BE(20);
  return image(buf, w / 1.5, h / 1.5); // ditangkap dengan skala 1,5
}
function evidence(file: string, judul: string, url: string, dipakai: string) {
  return [h3(judul), shot(file), caption(`Sumber: ${url} (diakses ${TANGGAL})`), p(`**Dipakai untuk:** ${dipakai}`)];
}
const yn = (ok: boolean) => (ok ? "Cocok" : "TIDAK COCOK");

function approval(nama: string) {
  return [
    h2("Lembar persetujuan validator"),
    p(`Kalkulator: **${nama}**. Dokumen versi 0.1 (${TANGGAL}).`),
    table(["Butir", "Isian validator"], [
      ["Nama dokter validator", ""],
      ["Bidang / spesialisasi", ""],
      ["Nomor STR (opsional)", ""],
      ["Sumber sudah diperiksa sesuai (Ya/Tidak)", ""],
      ["Uji kasus sudah diperiksa sesuai (Ya/Tidak)", ""],
      ["Teks yang tampil di situs sudah sesuai (Ya/Tidak)", ""],
      ["Keputusan (Setuju terbit / Revisi / Tolak)", ""],
      ["Catatan / revisi yang diminta", "\n\n\n"],
      ["Tanggal", ""],
      ["Tanda tangan", "\n\n"],
    ], [38, 62]),
  ];
}

function contentSection(slug: string) {
  const c = CONTENT[slug];
  return [
    h2("Teks yang tampil di situs (untuk diperiksa)"),
    h3("Interpretasi"), ...bullets(c.interpretation),
    h3("Materi ringkas"), ...c.material.flatMap((m) => [p(`**${m.heading}.** ${m.body}`)]),
    h3("Jebakan ujian & catatan klinis"), ...bullets(c.pitfalls),
    h3("Latihan kasus"),
    table(["Kasus", "Skenario", "Jawaban", "Pembahasan"], c.cases.map((k) => [k.title, k.scenario, k.answer, k.explanation]), [14, 34, 18, 34]),
    gap(),
    h3("Disclaimer"), note(DISCLAIMER),
  ];
}

const C: unknown[] = [];
C.push(...cover("DOKUMEN VALIDASI KALKULATOR", "Kalkulator Medis", "Bukti sumber, logika perhitungan, dan uji kasus untuk ditinjau dokter sebelum terbit", [
  ["Kalkulator", "1. Glasgow Coma Scale (GCS)  ·  2. HPL & Usia Kehamilan"],
  ["Versi dokumen", `0.1, ${TANGGAL}`],
  ["Status", "DRAF, menunggu validasi dokter. Belum boleh ditandai Tervalidasi di situs."],
  ["Disusun oleh", "Claude Code (penyusun); validator: dokter yang ditunjuk pemilik"],
  ["Kode aplikasi", "apps/web/src/lib/calculators/ (gcs.ts, hpl.ts, registry.ts, content.ts, calculators.test.ts)"],
]));

// Petunjuk
C.push(h1("Petunjuk Pemakaian Dokumen"));
C.push(p("Dokumen ini adalah bukti dasar setiap kalkulator: **berdasarkan apa** rumus dan kategorinya dibuat. Validator cukup memeriksa empat hal untuk tiap kalkulator:"));
C.push(...numbered([
  "**Sumber**: apakah sumber primer tepat dan masih berlaku. Tautan dan cuplikan layar disertakan.",
  "**Logika**: apakah terjemahan sumber menjadi rumus dan kategori di aplikasi sudah benar, termasuk butir \"Keputusan penyusun yang perlu dikonfirmasi\".",
  "**Uji kasus**: apakah hasil aplikasi sama dengan hasil yang diharapkan menurut sumber.",
  "**Teks situs**: interpretasi, jebakan ujian, latihan kasus, dan disclaimer.",
]));
C.push(p("Setelah disetujui, isi lembar persetujuan di akhir bab. Nama validator dan tanggal kemudian ditampilkan di halaman kalkulator, dan statusnya diubah dari Draf menjadi Tervalidasi."));
C.push(note("Kolom \"Hasil aplikasi\" pada tabel uji kasus diisi otomatis oleh penyusun dokumen dengan memanggil fungsi rumus yang sama dengan yang dipakai situs. Rumus yang sama juga dijalankan oleh tes otomatis (calculators.test.ts) dan dicek manual di browser pada " + TANGGAL + ".", "EAF2FB", "2E75B6"));
C.push(note("SPARK Medical hanya dipakai sebagai catatan pembanding. Teks dan kode SPARK tidak disalin; sumber isi adalah guideline dan jurnal primer yang tercantum."));

// ===== GCS =====
const gcsMeta = CALCULATORS.find((c) => c.slug === "gcs")!;
C.push(h1("1. Glasgow Coma Scale (GCS)"));
C.push(h2("1.1 Identitas"));
C.push(table(["Butir", "Keterangan"], [
  ["Nama", gcsMeta.title],
  ["Alamat di situs", "/kalkulator/gcs (gratis: kalkulator standar; Premium: pembahasan & materi)"],
  ["Versi kalkulator", gcsMeta.version ?? "-"],
  ["Berkas rumus", "apps/web/src/lib/calculators/gcs.ts"],
  ["Fungsi", "Menjumlahkan respons mata (E 1–4), verbal (V 1–5), dan motorik (M 1–6); mendukung NT (tidak dapat dinilai); menentukan derajat"],
], [25, 75]));
C.push(h2("1.2 Sumber primer"));
C.push(table(["No", "Sumber", "Bagian yang dipakai"], CONTENT.gcs.sources.map((s, i) => [String(i + 1), s.url ? `${s.label}\n${s.url}` : s.label, s.note ?? "-"]), [6, 64, 30]));
C.push(gap());
C.push(h2("1.3 Cuplikan sumber dan penjelasan"));
C.push(...evidence("gcs-1-komponen.png", "a. Komponen dan istilah skala", "https://www.glasgowcomascale.org/what-is-gcs/", "Daftar tiga komponen dan istilah resmi terbaru: Eyes (Spontaneous, To sound, To pressure, None), Verbal (Orientated, Confused, Words, Sounds, None), Motor (Obey commands, Localising, Normal flexion, Abnormal flexion, Extension, None). Aplikasi memakai istilah ini, diterjemahkan ke bahasa Indonesia."));
C.push(...evidence("gcs-5-istilah.png", "b. Pembaruan istilah dan skala motorik enam langkah", "https://www.glasgowcomascale.org/gcs-aid/", "Dasar memakai \"terhadap tekanan\" (bukan \"terhadap nyeri\"), \"kata-kata\" dan \"suara\" (bukan \"kata tidak sesuai\" dan \"suara tidak dimengerti\"), serta skala motorik enam langkah untuk semua keperluan."));
C.push(...evidence("gcs-2-nt.png", "c. Aturan NT (not testable)", "https://www.glasgowcomascale.org/faq/ (pertanyaan 1)", "Komponen yang tidak dapat dinilai ditulis NT, bukan angka 1, dan total tidak dilaporkan bila ada komponen NT. Aplikasi mengikuti aturan ini."));
C.push(...evidence("gcs-3-derajat.png", "d. Total skor dan klasifikasi derajat", "https://www.glasgowcomascale.org/faq/ (pertanyaan 7)", "Total = E + V + M (3–15) dan klasifikasi derajat cedera kepala ringan 13–15, sedang 9–12, berat. Lihat butir 1.4 tentang batas berat."));
C.push(...evidence("gcs-4-pediatrik.png", "e. Paediatric GCS", "https://www.glasgowcomascale.org/faq/ (pertanyaan 2)", "Dasar peringatan di situs bahwa skala dewasa dipakai tanpa modifikasi untuk anak di atas 5 tahun; anak lebih kecil memakai Paediatric GCS (belum tersedia di aplikasi)."));
C.push(...evidence("gcs-6-rangsang.png", "f. Teknik rangsang", "https://www.glasgowcomascale.org/gcs-aid/", "Dasar catatan jebakan: rangsang ujung jari, trapezius, atau supraorbita; menggosok sternum tidak dianjurkan."));

C.push(h2("1.4 Logika di aplikasi"));
C.push(table(["Komponen", "Nilai", "Istilah di aplikasi", "Keterangan bantuan di aplikasi"],
  GCS_COMPONENTS.flatMap((c) => [...c.options.map((o) => [c.code, String(o.value), o.label, o.hint]), [c.code, "NT", "Tidak dapat dinilai", c.ntHint]]), [12, 9, 24, 55]));
C.push(gap());
C.push(...bullets([
  "Total = E + V + M bila ketiga komponen terisi dan tidak ada NT.",
  "Bila ada komponen NT, total tidak dihitung dan hasil ditulis per komponen, mis. E4 V(NT) M6.",
  "Derajat: total 13–15 ringan, 9–12 sedang, 3–8 berat.",
  "Teks siap salin: \"GCS 12 (E3V4M5), derajat sedang (9–12)\".",
]));
C.push(h3("Keputusan penyusun yang perlu dikonfirmasi validator"));
C.push(table(["No", "Butir", "Pilihan penyusun", "Alasan"], [
  ["1", "Batas derajat berat", "3–8 (berat bila total ≤ 8)", "Halaman FAQ menulis \"severe (sum score < 8)\", sehingga total 8 tidak masuk kategori mana pun bila dibaca harfiah. Klasifikasi cedera kepala yang lazim dipakai menempatkan 8 sebagai berat. Mohon konfirmasi."],
  ["2", "Keterangan bantuan tiap respons", "Ditulis penyusun (kolom kanan tabel 1.4)", "Diringkas dari pendekatan terstruktur (Teasdale dkk., 2014). Teks rinci lembar \"GCS Aid / Do it this way\" belum dibuka langsung; mohon periksa kesesuaiannya."],
  ["3", "Notasi NT", "E4 V(NT) M6", "Sumber menganjurkan menulis NT. Tanda kurung dipakai agar \"ENT\" tidak terbaca sebagai singkatan THT."],
  ["4", "Paediatric GCS", "Belum dibuat", "Hanya peringatan di bagian jebakan; usulan masuk fase berikutnya."],
], [6, 22, 26, 46]));
C.push(gap());

C.push(h2("1.5 Uji kasus"));
const gcsCases: { input: GcsInput; expect: string; dasar: string }[] = [
  { input: { eye: 4, verbal: 5, motor: 6 }, expect: "15, ringan", dasar: "Skor maksimal 15 = kesadaran normal (FAQ 7)" },
  { input: { eye: 1, verbal: 1, motor: 1 }, expect: "3, berat", dasar: "Skor minimal 3 = koma dalam (FAQ 7)" },
  { input: { eye: 3, verbal: 4, motor: 5 }, expect: "12, sedang", dasar: "Contoh sumber: E3, V4, M5 = Score 12 (FAQ 7)" },
  { input: { eye: 4, verbal: 4, motor: 5 }, expect: "13, ringan", dasar: "Batas bawah ringan 13" },
  { input: { eye: 2, verbal: 3, motor: 4 }, expect: "9, sedang", dasar: "Batas bawah sedang 9" },
  { input: { eye: 2, verbal: 2, motor: 4 }, expect: "8, berat", dasar: "Batas berat (lihat keputusan no. 1)" },
  { input: { eye: 1, verbal: 2, motor: 2 }, expect: "5, berat", dasar: "Kasus latihan 3" },
  { input: { eye: 4, verbal: "NT", motor: 6 }, expect: "Total tidak dilaporkan", dasar: "Aturan NT (FAQ 1)" },
];
const gcsRows = gcsCases.map(({ input, expect, dasar }) => {
  const r = computeGcs(input);
  const got = r.total === null ? "Total tidak dilaporkan" : `${r.total}, ${r.severity}`;
  return [r.notation, expect, dasar, got, gcsCopyText(r), yn(got === expect)];
});
C.push(table(["Input", "Harapan menurut sumber", "Dasar", "Hasil aplikasi", "Teks salin aplikasi", "Status"], gcsRows, [11, 15, 22, 14, 26, 12]));
C.push(gap());
C.push(h2("1.6 Tangkapan layar aplikasi"));
C.push(shot("app-gcs.png"), caption("Hasil aplikasi untuk E3 V4 M5 (localhost, " + TANGGAL + ")"));
C.push(shot("app-gcs-nt.png"), caption("Hasil aplikasi untuk E4 V(NT) M6: total tidak dilaporkan"));
C.push(h2("1.7 Pembanding SPARK (catatan)"));
C.push(table(["Aspek", "SPARK Medical (diamati 12 Okt 2026)", "Dokter Edukasi"], [
  ["Istilah respons", "Istilah lama: \"To pain\", \"Inappropriate words\", \"Incomprehensible sounds\"", "Istilah terbaru situs resmi GCS: terhadap tekanan, kata-kata, suara"],
  ["Komponen tidak dapat dinilai", "Tidak terlihat opsi NT", "Ada opsi NT; total tidak dilaporkan"],
  ["Hasil", "\"GCS 15 (E4V5M6)\", kategori, tombol Copy", "Sama, ditambah langkah hitung yang memakai angka isian"],
  ["Penjelasan", "Rumus singkat; versi IM menambah panduan AEIOU-TIPS", "Interpretasi, jebakan ujian, latihan kasus, sumber, status validasi"],
], [22, 39, 39]));
C.push(gap());
C.push(...contentSection("gcs"));
C.push(...approval("Glasgow Coma Scale (GCS)"));

// ===== HPL =====
const hplMeta = CALCULATORS.find((c) => c.slug === "hpl")!;
C.push(h1("2. HPL & Usia Kehamilan"));
C.push(h2("2.1 Identitas"));
C.push(table(["Butir", "Keterangan"], [
  ["Nama", hplMeta.title],
  ["Alamat di situs", "/kalkulator/hpl (gratis: kalkulator standar; Premium: pembahasan & materi)"],
  ["Versi kalkulator", hplMeta.version ?? "-"],
  ["Berkas rumus", "apps/web/src/lib/calculators/hpl.ts"],
  ["Fungsi", "HPL dari HPHT (+280 hari), dari USG (tanggal USG + 280 − UK saat USG), atau dari transfer embrio (+261/+263 hari); usia kehamilan pada tanggal tertentu; trimester; kategori term; pembanding aturan Naegele manual"],
], [25, 75]));
C.push(h2("2.2 Sumber primer"));
C.push(table(["No", "Sumber", "Bagian yang dipakai"], CONTENT.hpl.sources.map((s, i) => [String(i + 1), s.url ? `${s.label}\n${s.url}` : s.label, s.note ?? "-"]), [6, 64, 30]));
C.push(gap());
C.push(h2("2.3 Cuplikan sumber dan penjelasan"));
const ACOG700 = "https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2017/05/methods-for-estimating-the-due-date";
C.push(...evidence("hpl-1-280hari.png", "a. HPL = HPHT + 280 hari", ACOG700 + " (Background)", "Rumus utama HPL dari HPHT dan asumsi siklus 28 hari. Dasar catatan bahwa HPHT sering tidak diingat dengan tepat."));
C.push(...evidence("hpl-2-trimester1-ivf.png", "b. USG trimester pertama, batas revisi, dan IVF", ACOG700 + " (Clinical Considerations in the First Trimester)", "USG trimester pertama (sampai 13 6/7 minggu) paling akurat; HPL diubah bila selisih lebih dari 7 hari (sebelum 9 0/7 minggu: lebih dari 5 hari); IVF embrio hari ke-5 = transfer + 261 hari, hari ke-3 = transfer + 263 hari."));
C.push(...evidence("hpl-3-trimester2.png", "c. Rentang trimester kedua", ACOG700 + " (Clinical Considerations in the Second Trimester)", "Batas trimester kedua 14 0/7 sampai 27 6/7 minggu."));
C.push(...evidence("hpl-4-trimester3.png", "d. Trimester ketiga", ACOG700 + " (Clinical Considerations in the Third Trimester)", "Trimester ketiga mulai 28 0/7 minggu; USG trimester ketiga paling tidak akurat."));
C.push(...evidence("hpl-5-term.png", "e. Kategori term", "https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2013/11/definition-of-term-pregnancy (Box 1)", "Early term 37 0/7–38 6/7, full term 39 0/7–40 6/7, late term 41 0/7–41 6/7, postterm mulai 42 0/7 minggu."));

C.push(h2("2.4 Logika di aplikasi"));
C.push(...bullets([
  "Metode HPHT: HPL = HPHT + 280 hari.",
  "Metode USG: HPL = tanggal USG + (280 − usia kehamilan saat USG dalam hari). Input 4–42 minggu dan 0–6 hari.",
  "Metode transfer embrio: HPL = tanggal transfer + 261 hari (embrio hari ke-5) atau + 263 hari (hari ke-3).",
  "Usia kehamilan = tanggal penghitungan − (HPL − 280 hari), ditampilkan dalam minggu dan hari. Tanggal penghitungan bawaan adalah hari ini dan dapat diubah.",
  "Trimester: 1 bila ≤ 13 minggu 6 hari, 2 bila 14 0/7–27 6/7, 3 bila ≥ 28 0/7.",
  "Kategori: preterm < 37 minggu, early term, full term, late term, postterm (ACOG CO 579).",
  "Aturan Naegele manual (+7 hari, −3 bulan, +1 tahun) ditampilkan sebagai pembanding bersama selisihnya terhadap HPHT + 280 hari.",
  "Semua tanggal dihitung sebagai tanggal kalender (tanpa jam) sehingga tidak bergeser karena zona waktu; tahun kabisat ikut dihitung.",
]));
C.push(h3("Keputusan penyusun yang perlu dikonfirmasi validator"));
C.push(table(["No", "Butir", "Pilihan penyusun", "Alasan"], [
  ["1", "Hasil utama", "HPHT + 280 hari; Naegele sebagai pembanding", "ACOG CO 700 menyebut 280 hari sebagai konvensi. Naegele dapat berbeda 1–3 hari karena panjang bulan tidak sama."],
  ["2", "Naegele pada tanggal akhir bulan", "Dibulatkan ke hari terakhir bulan tujuan (mis. 31 Mei + 9 bulan = 28/29 Februari)", "Aturan Naegele tidak mengatur tanggal yang tidak ada di bulan tujuan."],
  ["3", "Penyesuaian panjang siklus", "Tidak dibuat", "Tidak diatur di sumber yang dipakai; siklus tidak teratur diarahkan ke USG."],
  ["4", "Label preterm", "< 37 minggu", "Box 1 ACOG CO 579 hanya mengatur ≥ 37 minggu; batas < 37 minggu mengikuti definisi preterm yang umum. Mohon konfirmasi."],
  ["5", "Rentang input USG", "4–42 minggu, 0–6 hari", "Batas teknis penyusun untuk mencegah salah ketik."],
  ["6", "Sumber Indonesia", "Belum dicantumkan", "Mohon validator menambahkan rujukan nasional (mis. PPK/Buku KIA) bila diperlukan."],
], [6, 22, 30, 42]));
C.push(gap());

C.push(h2("2.5 Uji kasus"));
const hplCases: { label: string; input: HplInput; expect: string; dasar: string; get: (r: ReturnType<typeof computeHpl>) => string }[] = [
  { label: "HPHT 10 Jan 2026", input: { method: "hpht", hpht: "2026-01-10", today: "2026-01-10" }, expect: "HPL 17 Oktober 2026", dasar: "HPHT + 280 hari; Naegele sama", get: (r) => `HPL ${tanggalIndo(r.hpl)}` },
  { label: "HPHT 1 Mar 2026", input: { method: "hpht", hpht: "2026-03-01", today: "2026-03-01" }, expect: "HPL 6 Desember 2026; Naegele 8 Desember 2026", dasar: "280 hari vs Naegele", get: (r) => `HPL ${tanggalIndo(r.hpl)}; Naegele ${tanggalIndo(r.naegele!)}` },
  { label: "HPHT 20 Mei 2026, dihitung 12 Okt 2026", input: { method: "hpht", hpht: "2026-05-20", today: "2026-10-12" }, expect: "HPL 24 Februari 2027; UK 20 mgg 5 hr; trimester 2", dasar: "280 hari, selisih 145 hari", get: (r) => `HPL ${tanggalIndo(r.hpl)}; UK ${r.gaWeeks} mgg ${r.gaRemDays} hr; trimester ${r.trimester}` },
  { label: "HPHT 1 Jun 2027 (lewat Feb kabisat)", input: { method: "hpht", hpht: "2027-06-01", today: "2027-06-01" }, expect: "HPL 7 Maret 2028", dasar: "280 hari melewati 29 Feb 2028", get: (r) => `HPL ${tanggalIndo(r.hpl)}` },
  { label: "USG 1 Jun 2026, UK 10 mgg 2 hr", input: { method: "usg", usgDate: "2026-06-01", usgWeeks: 10, usgDays: 2, today: "2026-06-01" }, expect: "HPL 26 Desember 2026", dasar: "1 Jun + (280 − 72) hari", get: (r) => `HPL ${tanggalIndo(r.hpl)}` },
  { label: "Transfer embrio hari ke-5, 1 Mar 2026", input: { method: "embrio", transferDate: "2026-03-01", embryoDay: 5, today: "2026-03-01" }, expect: "HPL 17 November 2026", dasar: "Transfer + 261 hari (ACOG CO 700)", get: (r) => `HPL ${tanggalIndo(r.hpl)}` },
  { label: "Transfer embrio hari ke-3, 1 Mar 2026", input: { method: "embrio", transferDate: "2026-03-01", embryoDay: 3, today: "2026-03-01" }, expect: "HPL 19 November 2026", dasar: "Transfer + 263 hari (ACOG CO 700)", get: (r) => `HPL ${tanggalIndo(r.hpl)}` },
  { label: "UK tepat 37 0/7 minggu", input: { method: "hpht", hpht: "2026-01-01", today: "2026-09-17" }, expect: "Early term", dasar: "Box 1 ACOG CO 579", get: (r) => (r.termLabel.startsWith("Early term") ? "Early term" : r.termLabel) },
  { label: "UK tepat 28 0/7 minggu", input: { method: "hpht", hpht: "2026-01-01", today: "2026-07-16" }, expect: "Trimester 3", dasar: "Trimester ketiga mulai 28 0/7", get: (r) => `Trimester ${r.trimester}` },
];
const hplRows = hplCases.map((k) => {
  const r = computeHpl(k.input);
  const got = k.get(r);
  return [k.label, k.expect, k.dasar, got, hplCopyText(r, k.input.method), yn(got === k.expect)];
});
C.push(table(["Input", "Harapan menurut sumber", "Dasar", "Hasil aplikasi", "Teks salin aplikasi", "Status"], hplRows, [17, 17, 16, 18, 20, 12]));
C.push(gap());
C.push(h2("2.6 Tangkapan layar aplikasi"));
C.push(shot("app-hpl.png"), caption("Hasil aplikasi untuk HPHT 20 Mei 2026, dihitung 12 Oktober 2026 (localhost, " + TANGGAL + ")"));
C.push(h2("2.7 Pembanding SPARK (catatan)"));
C.push(table(["Aspek", "SPARK Medical (diamati 12 Okt 2026)", "Dokter Edukasi"], [
  ["Dasar perhitungan", "HPHT saja, aturan Naegele", "HPHT (280 hari), USG, atau transfer embrio"],
  ["Hasil", "HPL dan usia kehamilan", "HPL, usia kehamilan pada tanggal pilihan, trimester, kategori term, hari menuju HPL, pembanding Naegele"],
  ["Sumber", "Naegele's rule", "ACOG CO 700 dan CO 579"],
  ["Penjelasan", "Rumus singkat dan asumsi siklus 28 hari", "Interpretasi, jebakan ujian, latihan kasus, sumber, status validasi"],
], [22, 39, 39]));
C.push(gap());
C.push(...contentSection("hpl"));
C.push(...approval("HPL & Usia Kehamilan"));

// Lampiran
C.push(h1("Lampiran: Cara Memeriksa Ulang"));
C.push(...bullets([
  "Tes otomatis rumus: dari folder apps/web jalankan  npx tsx src/lib/calculators/calculators.test.ts",
  "Membuat ulang dokumen ini: dari folder docs/validasi-kalkulator/src jalankan  npm install  lalu  npx --prefix ../../../apps/web tsx build.ts ../Validasi_Kalkulator_GCS_HPL_v0.1.docx",
  "Memotret ulang cuplikan sumber: python shots.py shots  (memakai Microsoft Edge dan paket Python playwright).",
  "Halaman sumber dapat berubah. Tanggal akses tercantum pada setiap cuplikan.",
]));
C.push(h3("Tautan sumber"));
for (const s of [...CONTENT.gcs.sources, ...CONTENT.hpl.sources]) if (s.url) C.push(link(s.label, s.url));

Packer.toBuffer(makeDoc("Validasi Kalkulator GCS dan HPL", "Validasi Kalkulator Medis · Dokter Edukasi Academy", C)).then((b: Buffer) => {
  fs.writeFileSync(OUT, b);
  const all = [...gcsRows, ...hplRows];
  console.log("written", OUT, b.length, "bytes; uji kasus cocok", all.filter((r) => r[5] === "Cocok").length, "/", all.length);
});
