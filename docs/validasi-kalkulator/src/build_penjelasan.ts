// Dokumen penjelasan seluruh Kalkulator Medis (satu bab per kalkulator), disusun langsung dari kode situs.
// Jalankan dari folder ini: ../../../apps/web/node_modules/.bin/tsx build_penjelasan.ts ../Penjelasan_Kalkulator_Medis_v0.2.docx
import { createRequire } from "node:module";
import fs from "node:fs";
import { DEFS } from "../../../apps/web/src/lib/calculators/defs";
import { CASES } from "../../../apps/web/src/lib/calculators/cases";
import { CALCULATORS, DISCLAIMER, FIELDS } from "../../../apps/web/src/lib/calculators/registry";
import { CONTENT } from "../../../apps/web/src/lib/calculators/content";
import type { Field } from "../../../apps/web/src/lib/calculators/engine";
import { EVIDENCE } from "./evidence";

const require = createRequire(import.meta.url);
const H = require("./helpers.js");
const { p, h1, h2, h3, bullets, numbered, note, gap, link, table, image, caption, cover, makeDoc } = H;
const { Packer } = H.docx;
const OUT = process.argv[2] ?? "../Penjelasan_Kalkulator_Medis_v0.2.docx";
const TGL = "12 Oktober 2026";
const SHOTS = "shots";

function png(file: string): [Buffer, number, number] | null {
  const f = `${SHOTS}/${file}`;
  if (!fs.existsSync(f)) return null;
  const b = fs.readFileSync(f);
  return [b, b.readUInt32BE(16), b.readUInt32BE(20)];
}
function pic(file: string, cap: string, maxW = 600) {
  const x = png(file);
  if (!x) return [p(`(Gambar ${file} tidak ditemukan)`)];
  const [b, w, h] = x;
  const s = Math.min(1, maxW / w);
  return [image(b, Math.round(w * s), Math.round(h * s)), caption(cap)];
}

function describeFields(fields: Field[]): string[][] {
  const rows: string[][] = [];
  let n = 0;
  for (const f of fields) {
    if (f.type === "heading") { rows.push(["", `**${f.label}**`, "", f.hint ?? ""]); continue; }
    n += 1;
    if (f.type === "number") rows.push([String(n), f.label, `Angka${f.unit ? ` (${f.unit})` : ""}${f.optional ? ", opsional" : ""}`, f.hint ?? ""]);
    else if (f.type === "check") rows.push([String(n), f.label, "Centang", f.points !== undefined ? `+${f.points} poin` : ""]);
    else if (f.type === "date") rows.push([String(n), f.label, "Tanggal", f.hint ?? ""]);
    else rows.push([String(n), f.label, `Pilihan${f.optional ? ", opsional" : ""}`, f.options.map((o) => `${o.label}${o.points !== undefined ? ` (${o.points})` : ""}`).join("; ")]);
  }
  return rows;
}

// GCS dan HPL memakai komponen khusus; ringkasan cara hitungnya ditulis manual sesuai gcs.ts dan hpl.ts.
const CUSTOM: Record<string, { inputs: string[][]; steps: string[] }> = {
  gcs: {
    inputs: [["1", "Membuka mata (E)", "Pilihan", "4 spontan; 3 terhadap suara; 2 terhadap tekanan; 1 tidak ada; NT tidak dapat dinilai"], ["2", "Respons verbal (V)", "Pilihan", "5 orientasi baik; 4 bingung; 3 kata-kata; 2 suara; 1 tidak ada; NT"], ["3", "Respons motorik (M)", "Pilihan", "6 mengikuti perintah; 5 melokalisasi; 4 fleksi normal; 3 fleksi abnormal; 2 ekstensi; 1 tidak ada; NT"]],
    steps: ["Total = E + V + M (rentang 3–15).", "Bila ada komponen NT, total tidak dijumlahkan; notasi ditulis, mis. E4 V(NT) M6.", "Derajat: ringan 13–15, sedang 9–12, berat 3–8.", "Contoh: E3 + V4 + M5 = 12 → derajat sedang."],
  },
  hpl: {
    inputs: [["1", "Metode", "Pilihan", "HPHT; USG (usia kehamilan saat USG); transfer embrio (hari ke-3 atau ke-5)"], ["2", "Tanggal sesuai metode", "Tanggal", "HPHT, tanggal USG, atau tanggal transfer"], ["3", "Tanggal hari ini", "Tanggal", "Untuk menghitung usia kehamilan saat ini"]],
    steps: ["HPHT: HPL = HPHT + 280 hari; usia kehamilan = hari ini − HPHT.", "USG: HPL = tanggal USG + (280 − usia kehamilan saat USG dalam hari).", "Transfer embrio: HPL = tanggal transfer + 266 − usia embrio (hari ke-3: +263; hari ke-5: +261).", "Aturan Naegele (HPHT + 7 hari − 3 bulan + 1 tahun) ditampilkan sebagai pembanding beserta selisih harinya.", "Contoh: HPHT 10 Januari 2026 → HPL 17 Oktober 2026."],
  },
};

// Penomoran langkah ditulis manual agar mulai dari 1 di setiap bab.
const steps = (arr: string[]) => arr.map((t, i) => p(`${i + 1}. ${t}`, { indent: { left: 360 } }));
const FIELD_ORDER = ["Umum", "Penyakit Dalam", "Paru", "Kardiologi", "Neurologi", "THT", "Bedah", "Obstetri & Ginekologi", "Anak"];
const order = (slug: string) => CALCULATORS.findIndex((c) => c.slug === slug);
const active = CALCULATORS.filter((c) => c.status !== "soon").sort((a, b) => FIELD_ORDER.indexOf(a.field) - FIELD_ORDER.indexOf(b.field) || order(a.slug) - order(b.slug));
const soon = CALCULATORS.filter((c) => c.status === "soon");

const caseRows = (slug: string) => CASES.filter((t) => t.slug === slug).map((t) => {
  const r = DEFS[slug].compute(t.input);
  const got = r.status === "ok" ? `${r.value}${r.unit ? " " + r.unit : ""}` : `(${r.status})`;
  const lab = r.status === "ok" ? r.label : r.message;
  const okv = r.status === "ok" && r.value === t.value && (!t.label || r.label.includes(t.label) || (r.lines ?? []).some((l) => l.includes(t.label!)));
  return { row: [t.note, `${t.value}${t.label ? ` (${t.label})` : ""}`, got, lab, okv ? "Cocok" : "TIDAK COCOK"], ok: okv };
});

const C: unknown[] = [];
C.push(...cover("PENJELASAN FITUR · UNTUK DIPERIKSA PEMILIK", "Kalkulator Medis", "Apa yang dibuat, cara perhitungan, materi, uji kasus, dan sumber bertautan untuk setiap kalkulator", [
  ["Cakupan", `${active.length} kalkulator aktif di ${FIELDS.length} bidang; ${soon.length} kalkulator berstatus segera hadir`],
  ["Versi dokumen", `0.2, ${TGL}`],
  ["Status di situs", "Semua berlabel Draf. Label dihapus setelah pemilik menyetujui bab terkait."],
  ["Sumber data", "Dihasilkan otomatis dari kode situs: registry.ts, defs/*.ts, content*.ts, cases.ts. Isi dokumen = isi situs."],
  ["Log verifikasi", "docs/validasi-kalkulator/VERIFIKASI_SUMBER.md"],
], "1-1"));

C.push(h1("Cara Membaca Dokumen Ini"));
C.push(p("Setiap bab membahas satu kalkulator dengan urutan tetap:"));
C.push(...numbered([
  "**Ringkasan**: bidang, akses (Gratis atau Premium), alamat halaman.",
  "**Apa yang dibuat**: daftar isian formulir persis seperti di situs, beserta pilihan dan poinnya.",
  "**Cara perhitungan**: aturan/rumus dan contoh langkah hitung yang dihasilkan fungsi kalkulator itu sendiri.",
  "**Tampilan di situs**: cuplikan panel hasil saat diisi kasus contoh (diambil dari localhost dengan akun owner uji).",
  "**Materi dan pembahasan** (bagian Premium): interpretasi, materi ringkas, jebakan ujian, latihan kasus.",
  "**Uji kasus**: hasil fungsi kalkulator dibandingkan jawaban yang diharapkan. Kasus yang sama dijalankan tes otomatis.",
  "**Sumber**: setiap sumber dengan tautan, status verifikasi isi, dan cuplikan sumber bila tersedia.",
  "**Persetujuan pemilik**: kotak isian untuk menyetujui penghapusan label Draf.",
]));
C.push(note("Status verifikasi \"Terverifikasi\" berarti isi yang dipakai kalkulator (butir, poin, ambang, rumus) sudah dibaca langsung dari sumber bertautan. \"Sebagian perlu konfirmasi\" berarti ada bagian yang sumber primernya berbayar atau tidak tersedia daring, sehingga perlu dicocokkan dokter sebelum label Draf dihapus.", "EAF2FB", "2E75B6"));
C.push(note(DISCLAIMER));

C.push(h2("Ringkasan seluruh kalkulator"));
C.push(table(["No", "Kalkulator", "Bidang", "Akses", "Uji kasus", "Verifikasi sumber"], active.map((c, i) => {
  const cs = DEFS[c.slug] ? caseRows(c.slug) : [];
  return [String(i + 1), c.title, c.field, c.access === "free" ? "Gratis" : "Premium", DEFS[c.slug] ? `${cs.filter((x) => x.ok).length}/${cs.length} cocok` : "Tes GCS/HPL lulus", EVIDENCE[c.slug]?.status === "ok" ? "Terverifikasi" : "Sebagian perlu konfirmasi"];
}), [5, 31, 17, 11, 15, 21]));
C.push(h3("Segera hadir (belum aktif)"));
C.push(table(["Kalkulator", "Bidang", "Catatan"], soon.map((c) => [c.title, c.field, c.slug === "koreksi-natrium" ? "PAPDI tidak tersedia daring; menunggu sumber dari pemilik" : c.slug === "koreksi-kalium" ? "Menunggu sumber primer" : c.slug === "imunisasi" ? "Pedoman Imunisasi IDAI 2024 tidak tersedia di situs resmi IDAI" : c.slug === "ekg" ? "Naskah AHA/ACCF/HRS 2009 tidak dapat dibuka otomatis (verifikasi bot)" : c.slug === "asma" ? "Naskah resmi PPK FKTP 2022 belum dapat diakses" : c.slug === "aria" ? "Naskah ARIA 2008 berbayar; PPK FKTP belum dapat diakses" : "Tahap berikutnya"]), [40, 22, 38]));

active.forEach((c, idx) => {
  const k = CONTENT[c.slug];
  const def = DEFS[c.slug];
  const ev = EVIDENCE[c.slug];
  C.push(h1(`${idx + 1}. ${c.title}`));
  C.push(h2("Ringkasan"));
  C.push(table(["Butir", "Keterangan"], [
    ["Bidang", c.field],
    ["Akses", c.access === "free" ? "Gratis (kalkulator standar bidang ini, tanpa pembahasan)" : "Premium (Rp50.000/bulan)"],
    ["Alamat", `/kalkulator/${c.slug}`],
    ["Kegunaan", c.summary],
    ["Kata kunci pencarian", c.keywords.join(", ")],
  ], [26, 74]));

  C.push(h2("Apa yang dibuat"));
  C.push(p("Isian formulir sesuai urutan di situs:"));
  C.push(table(["No", "Isian", "Jenis", "Pilihan / poin / keterangan"], def ? describeFields(def.fields) : CUSTOM[c.slug].inputs, [6, 30, 16, 48]));

  C.push(h2("Cara perhitungan"));
  C.push(h3("Aturan yang dipakai"));
  C.push(...bullets(k.interpretation));
  C.push(h3("Contoh langkah hitung"));
  if (def) {
    const t = CASES.find((x) => x.slug === c.slug)!;
    const r = def.compute(t.input);
    if (r.status === "ok") {
      C.push(p(`Kasus contoh: ${t.note}.`));
      C.push(...steps(r.steps));
      C.push(p(`**Hasil:** ${r.value}${r.unit ? " " + r.unit : ""}, ${r.label}.`));
      if (r.lines?.length) C.push(...bullets(r.lines));
      C.push(p(`**Teks salin:** ${r.copy}`));
    }
  } else C.push(...steps(CUSTOM[c.slug].steps));

  C.push(h2("Tampilan di situs"));
  C.push(...pic(`semua/app-${c.slug}.png`, `Panel hasil ${c.title} dengan kasus contoh (localhost, akun owner uji)`, 300));

  C.push(h2("Materi dan pembahasan (Premium)"));
  C.push(h3("Materi ringkas"), ...k.material.map((m) => p(`**${m.heading}.** ${m.body}`)));
  C.push(h3("Jebakan ujian & catatan klinis"), ...bullets(k.pitfalls));
  C.push(h3("Latihan kasus"), table(["Kasus", "Skenario", "Jawaban", "Pembahasan"], k.cases.map((x) => [x.title, x.scenario, x.answer, x.explanation]), [11, 37, 20, 32]));

  C.push(h2("Uji kasus"));
  if (def) C.push(table(["Dasar", "Harapan", "Hasil aplikasi", "Kategori aplikasi", "Status"], caseRows(c.slug).map((x) => x.row), [28, 18, 15, 27, 12]));
  else C.push(p("Diuji oleh calculators.test.ts (GCS: total, notasi NT, derajat, validasi; HPL: HPHT, USG per trimester, transfer embrio, Naegele, label aterm). Semua lulus."));

  C.push(h2("Sumber"));
  C.push(table(["No", "Sumber", "Tautan"], k.sources.map((s, i) => [String(i + 1), `${s.label}${s.note ? `\n(${s.note})` : ""}`, s.url ?? "-"]), [6, 58, 36]));
  C.push(...k.sources.filter((s) => s.url).map((s) => link(`Buka: ${s.label.slice(0, 90)}${s.label.length > 90 ? "…" : ""}`, s.url!)));
  C.push(h3(`Status verifikasi: ${ev?.status === "ok" ? "Terverifikasi" : "Sebagian perlu konfirmasi"}`));
  C.push(...bullets(ev?.notes ?? ["Belum dicatat."]));
  for (const [file, cap] of ev?.images ?? []) C.push(...pic(file, cap));

  C.push(h2("Persetujuan pemilik"));
  C.push(table(["Butir", "Isian"], [["Isi dan perhitungan sesuai (Ya/Tidak)", ""], ["Label Draf boleh dihapus (Ya/Tidak)", ""], ["Catatan revisi", "\n\n"], ["Tanggal", ""]], [42, 58]));
});

C.push(h1("Lampiran: Pemeriksaan Ulang"));
C.push(...numbered([
  "Tes rumus generik: dari apps/web jalankan npx tsx src/lib/calculators/defs.test.ts",
  "Tes GCS, HPL, konten, akses, dan tautan sumber: npx tsx src/lib/calculators/calculators.test.ts (gagal bila ada sumber tanpa tautan).",
  "Cuplikan situs: dari docs/validasi-kalkulator/src jalankan tsx dump_plan.ts plan.json lalu python shots_semua.py plan.json shots/semua (server dev harus aktif).",
  "Dokumen ini: tsx build_penjelasan.ts ../Penjelasan_Kalkulator_Medis_v0.2.docx",
], "n2"));

Packer.toBuffer(makeDoc("Penjelasan Kalkulator Medis", "Penjelasan Kalkulator Medis · Dokter Edukasi Academy", C)).then((b: Buffer) => {
  fs.writeFileSync(OUT, b);
  const all = Object.keys(DEFS).flatMap((s) => caseRows(s));
  console.log("written", OUT, b.length, "bytes; kalkulator aktif", active.length, "; uji cocok", all.filter((x) => x.ok).length, "/", all.length);
});
