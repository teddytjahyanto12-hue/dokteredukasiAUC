// Laporan perbedaan SPARK vs sumber primer untuk keputusan pemilik.
// Jalankan: ../../../apps/web/node_modules/.bin/tsx build_perbedaan.ts ../Laporan_Perbedaan_SPARK_vs_Sumber_2026-10-12.docx
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const H = require("./helpers.js");
const { p, h1, h2, bullets, note, gap, table, image, caption, cover, makeDoc } = H;
const { Packer } = H.docx;
const OUT = process.argv[2] ?? "../Laporan_Perbedaan_SPARK_vs_Sumber_2026-10-12.docx";
const SHOTS = path.join(path.dirname(fileURLToPath(import.meta.url)), "shots");
const img = (f: string, w: number) => {
  const buf = fs.readFileSync(path.join(SHOTS, f));
  const iw = buf.readUInt32BE(16), ih = buf.readUInt32BE(20);
  return image(buf, w, (ih * w) / iw);
};

type Item = { id: string; tool: string; spark: string; sumber: string; usul: string; level: "Besar" | "Sedang" | "Kecil" };
const ITEMS: Item[] = [
  { id: "P1", tool: "Klasifikasi Hipertensi", level: "Besar",
    spark: "Mengutip PNPK Tata Laksana Hipertensi Dewasa 2021 (KMK HK.01.07/MENKES/4634/2021).",
    sumber: "PNPK 2021 sudah DIGANTI oleh KMK HK.01.07/MENKES/303/2026 (ditetapkan 17 April 2026). Tabel 2 PNPK 2026 memakai ESC 2024: TD klinik tidak meningkat <120/70, meningkat 120/70–<140/90, hipertensi ≥140/90 mmHg; ada ambang terpisah untuk TD rumah, ABPM siang, 24 jam, dan malam. Catatan: Tabel 1 PNPK 2026 masih menyebut kategori lama (optimal s.d. derajat 3), tidak konsisten dengan Tabel 2.",
    usul: "Memakai PNPK 2026 (Tabel 2, ESC 2024) lengkap dengan pilihan cara ukur (klinik/rumah/ABPM), dan menampilkan kategori lama sebagai catatan riwayat." },
  { id: "P2", tool: "Skor TB Anak", level: "Besar",
    spark: "Batuk kronik ≥3 minggu; mengutip Juknis TB Anak lama.",
    sumber: "Juknis Penatalaksanaan TBC Sensitif Obat 2025 (Tabel 14, hal. 113): batuk kronik ≥2 pekan; poin lain sama. Alur Gambar 8 (hal. 111): skoring dipakai bila TCM negatif/tidak bisa dan ada akses rontgen dan/atau uji tuberkulin/IGRA; skor ≥6 = TBC klinis; skor <6 = TBC klinis bila ada kontak ATAU tuberkulin/IGRA positif DAN rontgen sugestif.",
    usul: "Mengikuti Juknis 2025: batuk ≥2 pekan, IGRA setara uji tuberkulin, serta alur lanjutan untuk skor <6." },
  { id: "P3", tool: "Hasanuddin Stroke Score", level: "Besar",
    spark: "Lima variabel berbobot (TD, aktivitas saat onset, nyeri kepala, penurunan kesadaran, muntah proyektil), rentang 2–44, batas ≥15 = hemoragik.",
    sumber: "Publikasi FK Unhas yang ditemukan memakai batas berbeda: Sistem Skor Stroke Dave dan Djoenaidi/SSSDD (Umbas, CDK 2015;42(9); n=185) batas ≥17; Skor Stroke Dave Unhas (Gunawan dkk., Neurona 2014;32(1):20-7) batas ≥10. Tabel bobot asli tidak dapat diunduh (CDK 404, Neliti 403). Belum ditemukan publikasi dengan batas 15.",
    usul: "Ditunda sampai PDF artikel asli (CDK 2015 atau Neurona 2014) didapat. Mohon bantuan mengirim PDF atau menentukan versi yang dipakai." },
  { id: "P4", tool: "Bishop Score", level: "Sedang",
    spark: "Label \"tidak favorabel (<5)\" dan ≥8 mendukung keberhasilan induksi.",
    sumber: "Rujukan umum (ACOG Practice Bulletin 107; kini ACOG Clinical Practice Guideline No. 9, 2025) memakai ≤6 tidak favorabel dan ≥8 favorabel; skor 7 di antaranya. Teks pedoman ACOG 2025 belum dapat dibaca langsung.",
    usul: "Memakai ≤6 tidak favorabel, 7 peralihan, ≥8 favorabel, dengan catatan untuk dikonfirmasi validator obsgyn." },
  { id: "P5", tool: "Koreksi Natrium", level: "Besar",
    spark: "Defisit = (140 − Na) × faktor × BB, koreksi NaCl 3% (512 mEq/L), laju 0,5 mEq/L/jam (sadar) atau 1 mEq/L/jam (penurunan kesadaran); disebut rumus Adrogué–Madias.",
    sumber: "Rumus Adrogué–Madias sebenarnya menghitung perubahan Na per liter infus = (Na infus − Na serum) ÷ (TBW + 1), bukan defisit (140 − Na). Pedoman Eropa 2014 (ESE/ESICM/ERA-EDTA) menganjurkan bolus NaCl 3% 150 mL untuk gejala berat dan batas koreksi harian (sekitar 10 mmol/L/24 jam, 8 pada risiko tinggi). Teks lengkap pedoman belum dibaca langsung.",
    usul: "Membuat ulang memakai rumus Adrogué–Madias yang benar, batas koreksi 24 jam, dan langkah bolus untuk gejala berat; menunggu konfirmasi validator penyakit dalam." },
  { id: "P6", tool: "Cairan Rumatan Dewasa", level: "Sedang",
    spark: "Memakai aturan 4-2-1 (pediatri) untuk dewasa pada dashboard Penyakit Dalam.",
    sumber: "Aturan 4-2-1 berasal dari Holliday-Segar untuk anak. Pedoman cairan dewasa (mis. NICE CG174) memakai 25–30 mL/kg/hari.",
    usul: "4-2-1 tetap untuk anak (sudah tersedia); kalkulator dewasa terpisah memakai 25–30 mL/kg/hari plus tetesan." },
  { id: "P7", tool: "Kebutuhan Kalori", level: "Kecil",
    spark: "Dinamai \"Broca–Lorentz\".",
    sumber: "Rumus yang dipakai adalah Broca modifikasi PERKENI (BBI = 90% × (TB − 100); kalori basal 30/25 kkal/kg; aktivitas +10–50%; usia −5/−10/−20%). Rumus Lorentz berbeda (TB − 100 − (TB − 150)/4). Dokumen PERKENI 2021 belum dibaca langsung.",
    usul: "Menamai \"Kebutuhan Kalori (Broca modifikasi, PERKENI)\" dan mengikuti tabel PERKENI setelah dokumen dikonfirmasi." },
  { id: "P8", tool: "Indeks Fletcher / Ambang Dengar", level: "Sedang",
    spark: "Rerata 4 frekuensi (500, 1000, 2000, 4000 Hz) dinamai indeks Fletcher; derajat tidak terlihat.",
    sumber: "Indeks Fletcher klasik memakai 3 frekuensi (500, 1000, 2000 Hz); rerata 4 frekuensi dipakai WHO dengan derajat terbaru (2021). Praktik THT Indonesia juga memakai rerata 4 frekuensi.",
    usul: "Menampilkan keduanya (Fletcher 3 frekuensi dan rerata 4 frekuensi) serta derajat ketulian; menunggu pilihan validator THT." },
  { id: "P9", tool: "Klasifikasi ARIA", level: "Kecil",
    spark: "Dampak hanya: gangguan tidur dan gangguan aktivitas/kerja/sekolah/rekreasi.",
    sumber: "ARIA 2008 memakai empat butir dampak: gangguan tidur; gangguan aktivitas harian/rekreasi/olahraga; gangguan sekolah/kerja; gejala yang mengganggu (troublesome).",
    usul: "Memakai keempat butir ARIA." },
  { id: "P10", tool: "Derajat Dehidrasi", level: "Kecil",
    spark: "Memakai tanda air mata dan mulut/lidah selain keadaan umum, mata, haus, turgor.",
    sumber: "Tabel WHO/MTBS terkini memakai empat tanda: letargis/tidak sadar (atau gelisah), mata cekung, minum (malas/tidak bisa atau haus), turgor kembali lambat/sangat lambat; ≥2 tanda pada satu kolom menentukan derajat.",
    usul: "Memakai empat tanda MTBS/Buku Saku Pelayanan Kesehatan Anak, dengan rencana terapi A/B/C." },
  { id: "P11", tool: "Skor Alvarado", level: "Kecil",
    spark: "Leukositosis ≥10.000.",
    sumber: "Alvarado 1986 umumnya dikutip leukositosis >10.000/mm³ (tabel artikel asli belum dibaca langsung).",
    usul: "Mengikuti tabel artikel asli setelah dikonfirmasi validator bedah." },
  { id: "P12", tool: "Cairan Luka Bakar", level: "Sedang",
    spark: "Termal 2 mL/kg/%TBSA dan listrik 4 mL/kg/%TBSA untuk semua usia.",
    sumber: "ATLS edisi 10 dikutip memakai 2 mL (dewasa), 3 mL (anak), 4 mL (listrik); pedoman ABA menyebut rentang 2–4 mL dan cairan rumatan tambahan untuk anak. Buku ATLS berbayar, belum dibaca langsung.",
    usul: "Luas luka bakar sudah tersedia; kalkulator cairan ditambahkan setelah validator bedah/luka bakar memilih skema." },
  { id: "P13", tool: "Koreksi Kalium", level: "Sedang",
    spark: "Defisit = (4 − K) × 0,3 × BB; KCl maks 10 mEq/jam dan 60 mEq/1000 cc.",
    sumber: "Batas laju 10 mEq/jam pada vena perifer sesuai rujukan praktik. Rumus defisit (faktor 0,3) belum ditemukan pada sumber primer yang dapat diverifikasi.",
    usul: "Ditunda sampai ada sumber primer/pedoman nasional untuk rumus defisit." },
];

const C: unknown[] = [];
C.push(...cover("LAPORAN UNTUK KEPUTUSAN PEMILIK", "Perbedaan SPARK vs Sumber Primer", "Kalkulator yang ditunda karena logikanya berbeda dari sumber resmi atau sumbernya belum terverifikasi", [
  ["Tanggal", "12 Oktober 2026"],
  ["Disusun oleh", "Claude Code"],
  ["Dasar", "Arahan pemilik: SPARK dijadikan acuan, tetapi bila berbeda dari ketentuan, laporkan dulu sebelum dibuat."],
  ["Status kalkulator terkait", "\"Segera hadir\" di situs; belum dibuat sampai ada keputusan."],
], "1-1"));

C.push(h1("Ringkasan"));
C.push(p("Dari sekitar 65 tool dashboard SPARK, **31 kalkulator Tahap 1 sudah dibuat** karena logikanya sesuai sumber (ditambah GCS dan HPL yang sudah ada). Butir di bawah ini **belum dibuat** dan menunggu keputusan."));
C.push(table(["ID", "Kalkulator", "Tingkat", "Usulan singkat"], ITEMS.map((i) => [i.id, i.tool, i.level, i.usul]), [7, 22, 11, 60]));
C.push(gap());
C.push(note("Asma (dibuat sendiri dari PPK FKTP) dan KPSP (pengganti Denver) sudah disetujui pemilik dan masuk tahap berikutnya bersama antropometri WHO/CDC, tekanan darah anak, ikterus, nomogram berat bayi, EKG, imunisasi, dan gizi buruk."));

C.push(h1("Rincian per Kalkulator"));
for (const i of ITEMS) {
  C.push(h2(`${i.id}. ${i.tool} (perbedaan ${i.level.toLowerCase()})`));
  C.push(table(["Aspek", "Isi"], [["Di SPARK", i.spark], ["Menurut sumber", i.sumber], ["Usulan", i.usul], ["Keputusan pemilik", "☐ Setuju usulan   ☐ Ikuti SPARK   ☐ Lainnya: ..........."]], [20, 80]));
  if (i.id === "P1") { C.push(img("src-pnpk-ht-2026-hal9.png", 420), caption("PNPK Tata Laksana Hipertensi Dewasa 2026, hal. 9 (KMK HK.01.07/MENKES/303/2026, jdih.kemkes.go.id)")); }
  if (i.id === "P2") { C.push(img("src-juknis-tb-2025-hal113.png", 380), caption("Juknis Penatalaksanaan TBC Sensitif Obat 2025, Tabel 14, hal. 113 (p2.kemkes.go.id)")); C.push(img("src-juknis-tb-2025-hal111.png", 380), caption("Gambar 8 alur diagnosis TBC anak, hal. 111")); }
}

C.push(h1("Catatan Tambahan"));
C.push(...bullets([
  "Rincian bukti dan sitasi ada di docs/validasi-kalkulator/VERIFIKASI_SUMBER.md.",
  "Butir yang ditandai \"belum dibaca langsung\" berarti sumbernya berbayar atau tidak dapat diunduh; validator dokter diminta mencocokkan dengan dokumen asli.",
  "Akses ke SPARK dibatasi pada membaca; tidak ada pengaturan atau data yang diubah.",
]));

Packer.toBuffer(makeDoc("Perbedaan SPARK vs Sumber", "Laporan Perbedaan SPARK vs Sumber · Dokter Edukasi Academy", C)).then((b: Buffer) => { fs.writeFileSync(OUT, b); console.log("written", OUT, b.length); });
