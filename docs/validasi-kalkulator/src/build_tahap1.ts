// Penyusun dokumen validasi Tahap 1 (31 kalkulator generik).
// Jalankan dari folder ini: ../../../apps/web/node_modules/.bin/tsx build_tahap1.ts ../Validasi_Kalkulator_Tahap1_v0.1.docx
import { createRequire } from "node:module";
import fs from "node:fs";
import { DEFS } from "../../../apps/web/src/lib/calculators/defs";
import { CASES } from "../../../apps/web/src/lib/calculators/cases";
import { CALCULATORS, DISCLAIMER } from "../../../apps/web/src/lib/calculators/registry";
import { CONTENT } from "../../../apps/web/src/lib/calculators/content";
import type { Field } from "../../../apps/web/src/lib/calculators/engine";

const require = createRequire(import.meta.url);
const H = require("./helpers.js");
const { p, h1, h2, h3, bullets, numbered, note, gap, link, table, cover, makeDoc } = H;
const { Packer } = H.docx;
const OUT = process.argv[2] ?? "../Validasi_Kalkulator_Tahap1_v0.1.docx";
const TGL = "12 Oktober 2026";

// Bukti isi sumber yang dibaca langsung (abstrak PubMed / dokumen resmi) atau status bila belum dapat diakses.
const EVIDENCE: Record<string, string[]> = {
  imt: ["Batas Asia-Pasifik (kurang <18,5; normal 18,5–22,9; berisiko 23–24,9; obesitas I 25–29,9; obesitas II ≥30) berasal dari laporan WHO WPRO 2000. Status: tabel laporan belum dipotret; PERLU KONFIRMASI VALIDATOR terhadap dokumen."],
  map: ["Rumus MAP adalah fisiologi standar. Target MAP 65 mmHg pada syok septik: Surviving Sepsis Campaign 2021 (PMID 34605781, DOI 10.1097/CCM.0000000000005337; sitasi dikonfirmasi PubMed)."],
  qsofa: ["Kriteria qSOFA dan ambang ≥2: Singer dkk. JAMA 2016 (PMID 26903338, sitasi dikonfirmasi). Catatan SSC 2021 tentang qSOFA sebagai skrining: PMID 34605781."],
  sirs: ["Empat kriteria SIRS dan ambang ≥2: Bone dkk. Chest 1992 (PMID 1303622, sitasi dikonfirmasi). Isi kriteria adalah definisi baku konsensus."],
  agd: ["Pendekatan langkah demi langkah, rumus Winter, anion gap, dan rasio delta: Berend dkk. NEJM 2014 (PMID 25295502, sitasi dikonfirmasi). Koefisien kompensasi respiratorik (0,1/0,4 dan 0,2/0,4) dan koreksi albumin 2,5: PERLU KONFIRMASI VALIDATOR terhadap tabel artikel."],
  egfr: ["Persamaan CKD-EPI 2021: Inker dkk. NEJM 2021 (PMID 34554658). Cockcroft-Gault 1976 (PMID 1244564). Kategori G/A dan matriks risiko: KDIGO 2024. Kasus uji 60 tahun/1,5 mg/dL = 53 dihitung ulang manual."],
  "curb-65": ["Lima kriteria dan stratifikasi: Lim dkk. Thorax 2003 (PMID 12728155) dan BTS 2009 (PMID 19783532, DOI 10.1136/thx.2009.121434); sitasi dikonfirmasi PubMed."],
  "berlin-ards": ["Tabel 3 definisi Berlin (kriteria, PEEP ≥5, rentang P/F, koreksi ketinggian PB/760): JAMA 2012 (PMID 22797452). Tabel diperiksa saat studi SPARK; sitasi dikonfirmasi PubMed."],
  light: ["Tiga kriteria Light: Light dkk. Ann Intern Med 1972 (PMID 4642731); BTS 2023 (DOI 10.1136/thorax-2022-219784)."],
  "pf-ratio": ["Rentang P/F mengikuti definisi Berlin (PMID 22797452). Konversi kPa × 7,5 adalah konversi satuan baku."],
  nyha: ["Deskripsi kelas NYHA I–IV dari AHA (diadaptasi dari NYHA Criteria Committee 1994) dan pedoman AHA/ACC/HFSA 2022 (PMID 35363499, sitasi dikonfirmasi)."],
  "cha2ds2-vasc": ["Komponen dan ambang rekomendasi: ESC 2020 AF (PMID 32860505, DOI 10.1093/eurheartj/ehaa612). Perubahan ke CHA₂DS₂-VA: ESC 2024 (PMID 39210723). Sitasi dikonfirmasi PubMed; teks rekomendasi PERLU KONFIRMASI VALIDATOR terhadap tabel ESC."],
  "hf-stages": ["Definisi stadium A–D: AHA/ACC/HFSA 2022 (PMID 35363499, DOI 10.1161/CIR.0000000000001063)."],
  killip: ["Klasifikasi asli Killip & Kimball 1967 (PMID 6059183, sitasi dikonfirmasi) dan PNPK SKA Kemenkes 2019 (dokumen belum dibuka pada sesi ini)."],
  centor: ["Skor 0–4 dengan koreksi usia (3–76 tahun): abstrak McIsaac dkk. CMAJ 1998 (PMID 9475915). Persentase risiko GAS per skor dan rekomendasi: PERLU KONFIRMASI VALIDATOR terhadap tabel artikel."],
  nose: ["Instrumen: Stewart dkk. 2004 (PMID 14990910). Kelas keparahan dari abstrak Lipan & Most 2013 (PMID 23846399, DOI 10.1001/jamafacial.2013.344): ringan 5–25, sedang 30–50, berat 55–75, ekstrem 80–100; skor 30 paling baik membedakan."],
  rsi: ["Instrumen 9 butir dan ambang >13: Belafsky dkk. J Voice 2002 (PMID 12150380, sitasi dikonfirmasi)."],
  paradise: ["Kriteria frekuensi dan dokumentasi: Paradise dkk. NEJM 1984 (PMID 6700642) dan pedoman AAO-HNS 2019 (PMID 30798778); sitasi dikonfirmasi PubMed."],
  "stop-bang": ["Kuesioner: Chung dkk. Anesthesiology 2008 (PMID 18431116). Ambang 0–2/3–4/5–8: Chung dkk. BJA 2012 (PMID 22401881). Sitasi dikonfirmasi PubMed."],
  siriraj: ["Rumus dan ambang dikutip langsung dari abstrak Poungvarin dkk. BMJ 1991 (PMID 1855041, DOI 10.1136/bmj.302.6792.1565): (2,5 × kesadaran) + (2 × muntah) + (2 × nyeri kepala) + (0,1 × diastolik) − (3 × ateroma) − 12; >1 perdarahan, <−1 infark, −1 sampai 1 meragukan."],
  nihss: ["Butir dan skor: Brott dkk. Stroke 1989 (PMID 2749846) dan formulir NINDS. Kategori derajat yang lazim: Kwah & Diong 2014 (PMID 24856948). Isi kategori artikel Kwah belum dibaca penuh; PERLU KONFIRMASI VALIDATOR."],
  abcd2: ["Seluruh komponen, poin, dan risiko 2 hari (1,0% / 4,1% / 8,1%) dikutip dari abstrak Johnston dkk. Lancet 2007 (PMID 17258668, DOI 10.1016/S0140-6736(07)60150-0)."],
  four: ["Empat komponen 0–4: Wijdicks dkk. Ann Neurol 2005 (PMID 16178024). Deskripsi tiap tingkat diterjemahkan penyusun; PERLU KONFIRMASI VALIDATOR terhadap tabel artikel. Tidak ada kategori derajat baku sehingga tidak dibuat."],
  vbac: ["Lima variabel dan rentang keberhasilan 49% (0–2) sampai 95% (8–10) dari abstrak Flamm & Geiger 1997 (PMID 9397100, DOI 10.1016/s0029-7844(97)00531-0). Bobot tiap variabel PERLU KONFIRMASI VALIDATOR terhadap tabel artikel. Pengelompokan 3–7 'menengah' adalah penyajian penyusun."],
  "luka-bakar": ["Rule of Nines: Wallace, Lancet 1951 (PMID 14805109). Rujukan praktik: ISBI 2016 (PMID 27542292). Kalkulator cairan sengaja belum disertakan (lihat laporan perbedaan)."],
  "mid-parental": ["Konsep tinggi rata-rata orang tua: Tanner dkk. Arch Dis Child 1970 (PMID 5491878, DOI 10.1136/adc.45.244.755). Koreksi ±13 cm dan rentang ±8,5 cm adalah konvensi yang dipakai luas; PERLU KONFIRMASI VALIDATOR terhadap sumber pediatri."],
  pat: ["Tiga komponen PAT: Dieckmann dkk. 2010 (PMID 20386420, DOI 10.1097/PEC.0b013e3181d6db37). Tabel kesan umum per kombinasi PERLU KONFIRMASI VALIDATOR terhadap artikel/PEPP; kombinasi napas + sirkulasi tanpa penampilan tidak ada di tabel klasik."],
  ballard: ["Rentang usia gestasi 20–44 minggu dan validitas waktu pemeriksaan dari abstrak Ballard dkk. 1991 (PMID 1880657, DOI 10.1016/s0022-3476(05)82056-6). Deskripsi tiap kriteria diterjemahkan penyusun dari bagan NBS; PERLU KONFIRMASI VALIDATOR."],
  downes: ["Skor asli: Downes dkk. Clin Pediatr 1970 (PMID 5419441, DOI 10.1177/000992287000900607; abstrak tidak tersedia). Kategori <4/4–5/≥6 mengikuti praktik neonatologi Indonesia; PERLU KONFIRMASI VALIDATOR."],
  gir: ["Rumus GIR diturunkan dari konsentrasi dekstrosa (x% = 10x mg/mL). Target GIR sengaja tidak ditampilkan karena sumber belum dikonfirmasi."],
  "holliday-segar": ["100/50/20 mL/kg/hari: Holliday & Segar 1957 (PMID 13431307). Rekomendasi cairan isotonik: Feld dkk. AAP 2018 (PMID 30478247). Sitasi dikonfirmasi PubMed."],
};

const DECISIONS: Record<string, string[]> = {
  agd: ["Nilai rujukan pH 7,35–7,45; pCO₂ 35–45; HCO₃⁻ 22–26; AG dianggap meningkat bila >12 (setelah koreksi albumin).", "Peringatan konsistensi muncul bila selisih pH hitung >0,05."],
  egfr: ["Validasi kreatinin 0,1–25 mg/dL dan usia 18–110 tahun adalah batas teknis penyusun."],
  imt: ["Berat 10–400 kg dan tinggi 100–250 cm adalah batas teknis penyusun."],
  nihss: ["Butir UN tidak dijumlahkan dan diberi catatan."],
  "luka-bakar": ["Hanya proporsi dewasa; anak diarahkan ke Lund-Browder."],
  ballard: ["Skor < −10 ditampilkan ≤20 minggu tanpa ekstrapolasi."],
  "cha2ds2-vasc": ["Rekomendasi dihitung dari skor tanpa poin jenis kelamin (ambang bergeser 1 poin pada perempuan)."],
};

function describeFields(fields: Field[]): string[][] {
  const rows: string[][] = [];
  for (const f of fields) {
    if (f.type === "heading") rows.push([`(${f.label})`, "", ""]);
    else if (f.type === "number") rows.push([f.label, `Angka${f.unit ? ` (${f.unit})` : ""}${f.optional ? ", opsional" : ""}`, f.hint ?? ""]);
    else if (f.type === "check") rows.push([f.label, "Centang", f.points !== undefined ? `+${f.points}` : ""]);
    else if (f.type === "date") rows.push([f.label, "Tanggal", ""]);
    else rows.push([f.label, "Pilihan", f.options.map((o) => `${o.label}${o.points !== undefined ? ` (${o.points})` : ""}`).join("; ")]);
  }
  return rows;
}

const active = CALCULATORS.filter((c) => c.status !== "soon" && DEFS[c.slug]);
const C: unknown[] = [];
C.push(...cover("DOKUMEN VALIDASI KALKULATOR · TAHAP 1", "Kalkulator Medis", "Bukti sumber, logika, dan uji kasus 31 kalkulator untuk ditinjau dokter sebelum terbit", [
  ["Cakupan", `${active.length} kalkulator Tahap 1 (GCS dan HPL ada di dokumen validasi tersendiri)`],
  ["Versi dokumen", `0.1, ${TGL}`],
  ["Status", "DRAF, menunggu validasi dokter per bidang."],
  ["Kode aplikasi", "apps/web/src/lib/calculators/defs/*.ts (rumus), content-*.ts (pembahasan), cases.ts (uji kasus)"],
  ["Log verifikasi", "docs/validasi-kalkulator/VERIFIKASI_SUMBER.md"],
], "1-1"));

C.push(h1("Petunjuk"));
C.push(p("Setiap bab berisi satu kalkulator: sumber dan tautan, bukti isi sumber, logika input dan poin (dibuat otomatis dari kode), keputusan penyusun, uji kasus, teks yang tampil di situs, dan lembar persetujuan."));
C.push(note("Kolom \"Hasil aplikasi\" diisi otomatis dengan menjalankan fungsi rumus yang sama dengan situs. Kasus yang sama dijalankan tes otomatis (defs.test.ts). Butir bertanda PERLU KONFIRMASI VALIDATOR berarti sumber primer belum dapat dibaca penuh secara daring (berbayar atau tidak tersedia) sehingga perlu dicocokkan dokter.", "EAF2FB", "2E75B6"));
C.push(note("Cuplikan layar halaman PubMed tidak dapat diambil otomatis (situs menolak browser otomatis). Sebagai gantinya dicantumkan kutipan isi abstrak yang dibaca melalui layanan PubMed beserta PMID dan DOI. SPARK hanya dipakai sebagai acuan daftar tool."));
C.push(h2("Ringkasan"));
C.push(table(["No", "Kalkulator", "Bidang", "Akses", "Uji kasus", "Status verifikasi"], active.map((c, i) => {
  const cs = CASES.filter((k) => k.slug === c.slug);
  const pass = cs.filter((k) => { const r = DEFS[k.slug].compute(k.input); return r.status === "ok" && r.value === k.value; }).length;
  const ev = (EVIDENCE[c.slug] ?? []).join(" ");
  return [String(i + 1), c.title, c.field, c.access === "free" ? "Gratis" : "Premium", `${pass}/${cs.length} cocok`, ev.includes("PERLU KONFIRMASI") ? "Sebagian perlu konfirmasi" : "Sumber terkonfirmasi"];
}), [5, 30, 18, 11, 14, 22]));

active.forEach((c, idx) => {
  const def = DEFS[c.slug];
  const k = CONTENT[c.slug];
  C.push(h1(`${idx + 1}. ${c.title}`));
  C.push(table(["Butir", "Keterangan"], [
    ["Bidang / akses", `${c.field} · ${c.access === "free" ? "Gratis (kalkulator standar)" : "Premium"}`],
    ["Alamat", `/kalkulator/${c.slug}`],
    ["Versi", c.version ?? "0.1"],
    ["Ringkasan", c.summary],
  ], [25, 75]));
  C.push(h2("Sumber primer"));
  C.push(table(["No", "Sumber", "Catatan"], k.sources.map((s, i) => [String(i + 1), s.url ? `${s.label}\n${s.url}` : s.label, s.note ?? "-"]), [6, 70, 24]));
  C.push(h2("Bukti isi sumber"));
  C.push(...bullets(EVIDENCE[c.slug] ?? ["Belum dicatat."]));
  C.push(h2("Logika di aplikasi"));
  C.push(table(["Input", "Jenis", "Pilihan / poin / keterangan"], describeFields(def.fields), [34, 16, 50]));
  if (DECISIONS[c.slug]) { C.push(h3("Keputusan penyusun yang perlu dikonfirmasi")); C.push(...bullets(DECISIONS[c.slug])); }
  C.push(h2("Uji kasus"));
  C.push(table(["Dasar", "Harapan", "Hasil aplikasi", "Kategori aplikasi", "Status"], CASES.filter((t) => t.slug === c.slug).map((t) => {
    const r = def.compute(t.input);
    const got = r.status === "ok" ? r.value : `(${r.status})`;
    const lab = r.status === "ok" ? r.label : r.message;
    const okv = r.status === "ok" && r.value === t.value && (!t.label || r.label.includes(t.label) || (r.lines ?? []).some((l) => l.includes(t.label!)));
    return [t.note, `${t.value}${t.label ? ` (${t.label})` : ""}`, got, lab, okv ? "Cocok" : "TIDAK COCOK"];
  }), [30, 18, 14, 26, 12]));
  C.push(h2("Teks yang tampil di situs"));
  C.push(h3("Interpretasi"), ...bullets(k.interpretation));
  C.push(h3("Materi ringkas"), ...k.material.map((m) => p(`**${m.heading}.** ${m.body}`)));
  C.push(h3("Jebakan ujian & catatan klinis"), ...bullets(k.pitfalls));
  C.push(h3("Latihan kasus"), table(["Kasus", "Skenario", "Jawaban", "Pembahasan"], k.cases.map((x) => [x.title, x.scenario, x.answer, x.explanation]), [12, 36, 18, 34]));
  C.push(gap(), note(DISCLAIMER));
  C.push(h2("Lembar persetujuan validator"));
  C.push(table(["Butir", "Isian validator"], [["Nama dokter / bidang", ""], ["Sumber sesuai (Ya/Tidak)", ""], ["Logika & uji kasus sesuai (Ya/Tidak)", ""], ["Teks situs sesuai (Ya/Tidak)", ""], ["Keputusan (Setuju / Revisi / Tolak)", ""], ["Catatan", "\n\n"], ["Tanggal & tanda tangan", "\n"]], [38, 62]));
});

C.push(h1("Lampiran: Pemeriksaan Ulang"));
C.push(...numbered(["Tes rumus: dari apps/web jalankan npx tsx src/lib/calculators/defs.test.ts", "Dokumen ini: dari docs/validasi-kalkulator/src jalankan ../../../apps/web/node_modules/.bin/tsx build_tahap1.ts ../Validasi_Kalkulator_Tahap1_v0.1.docx"], "n2"));
C.push(h3("Tautan sumber"));
const seen = new Set<string>();
for (const c of active) for (const s of CONTENT[c.slug].sources) if (s.url && !seen.has(s.url)) { seen.add(s.url); C.push(link(s.label, s.url)); }

Packer.toBuffer(makeDoc("Validasi Kalkulator Medis Tahap 1", "Validasi Kalkulator Medis · Tahap 1 · Dokter Edukasi Academy", C)).then((b: Buffer) => {
  fs.writeFileSync(OUT, b);
  const all = CASES.map((t) => { const r = DEFS[t.slug].compute(t.input); return r.status === "ok" && r.value === t.value; });
  console.log("written", OUT, b.length, "bytes; kalkulator", active.length, "; uji cocok", all.filter(Boolean).length, "/", all.length);
});
