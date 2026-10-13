import { fmt, incomplete, invalid, num, outOfRange, scoreCalc, sel, yes, type CalcDef, type Option } from "../engine";

// CHA2DS2-VASc (ESC 2020 AF guideline, Tabel 8 dan rekomendasi pencegahan stroke).
export const chadsvasc = scoreCalc({
  slug: "cha2ds2-vasc",
  title: "CHA₂DS₂-VASc",
  max: 9,
  items: [
    { kind: "select", id: "sex", label: "Jenis kelamin", options: [{ value: "L", label: "Laki-laki", points: 0 }, { value: "P", label: "Perempuan", points: 1 }] },
    { kind: "select", id: "age", label: "Usia", options: [{ value: "<65", label: "<65 tahun", points: 0 }, { value: "65", label: "65–74 tahun", points: 1 }, { value: "75", label: "≥75 tahun", points: 2 }] },
    { kind: "check", id: "c", label: "Gagal jantung kongestif / disfungsi sistolik LV sedang–berat / kardiomiopati hipertrofik", points: 1 },
    { kind: "check", id: "h", label: "Hipertensi (riwayat atau dalam terapi)", points: 1 },
    { kind: "check", id: "d", label: "Diabetes melitus", points: 1 },
    { kind: "check", id: "s", label: "Riwayat stroke, TIA, atau tromboemboli", points: 2 },
    { kind: "check", id: "v", label: "Penyakit vaskular (riwayat IMA, penyakit arteri perifer, plak aorta)", points: 1 },
  ],
  // Rekomendasi bergantung pada jenis kelamin, jadi kategori dihitung di note (skor tanpa poin jenis kelamin).
  bands: [{ min: 0, max: 9, label: "Lihat rekomendasi di bawah", tone: "info" }],
  note: (total, v) => {
    const f = v.sex === "P";
    const male = f ? total - 1 : total; // skor tanpa poin jenis kelamin
    const rec =
      male === 0 ? "Risiko rendah: antitrombotik tidak direkomendasikan (ESC kelas III)." :
      male === 1 ? "Antikoagulan oral perlu dipertimbangkan (ESC kelas IIa)." :
      "Antikoagulan oral direkomendasikan (ESC kelas I).";
    return [rec, "Jenis kelamin perempuan adalah pengubah risiko: ambang terapi bergeser 1 poin. Risiko perdarahan dinilai terpisah (mis. HAS-BLED)."];
  },
});

// Stadium gagal jantung ACC/AHA A–D (AHA/ACC/HFSA 2022).
const HF: { id: string; stage: string; label: string; hint: string }[] = [
  { id: "a", stage: "A", label: "Berisiko gagal jantung tanpa gejala dan tanpa kelainan jantung struktural", hint: "Mis. hipertensi, diabetes, obesitas, penyakit kardiovaskular aterosklerotik, paparan kardiotoksik, riwayat kardiomiopati keluarga." },
  { id: "b", stage: "B", label: "Ada kelainan jantung struktural/fungsional atau penanda, tetapi belum pernah bergejala", hint: "Mis. EF turun, hipertrofi ventrikel, dilatasi ruang, kelainan katup, peningkatan natriuretik peptida." },
  { id: "c", stage: "C", label: "Gejala atau tanda gagal jantung sedang atau pernah ada", hint: "Stadium tidak turun kembali walau gejala membaik dengan terapi." },
  { id: "d", stage: "D", label: "Gejala berat yang mengganggu kehidupan sehari-hari dan berulang dirawat meski terapi optimal", hint: "Pertimbangkan rujukan transplantasi, alat bantu ventrikel, atau paliatif." },
];
export const hfStages: CalcDef = {
  slug: "hf-stages",
  fields: [{ type: "heading", label: "Centang semua yang sesuai", hint: "Stadium = baris paling berat yang terpenuhi." }, ...HF.map((h) => ({ type: "check" as const, id: h.id, label: `Stadium ${h.stage}: ${h.label}`, hint: h.hint }))],
  compute(v) {
    const top = [...HF].reverse().find((h) => yes(v, h.id));
    if (!top) return incomplete("Centang minimal satu baris yang sesuai.");
    const tone = top.stage === "A" ? "info" : top.stage === "B" ? "warn" : "bad";
    return {
      status: "ok", value: top.stage, label: `Stadium ${top.stage}`, tone, lines: [top.hint],
      steps: HF.filter((h) => yes(v, h.id)).map((h) => `Terpenuhi: stadium ${h.stage}`).concat(`Stadium tertinggi: ${top.stage}`),
      copy: `Gagal jantung ACC/AHA stadium ${top.stage}: ${top.label}`,
    };
  },
};

const KILLIP: Option[] = [
  { value: "I", label: "Kelas I: tidak ada gagal jantung", hint: "Tidak terdapat ronki maupun S3." },
  { value: "II", label: "Kelas II: gagal jantung", hint: "S3 dan ronki basah pada setengah lapangan paru." },
  { value: "III", label: "Kelas III: edema paru", hint: "Ronki basah di seluruh lapangan paru." },
  { value: "IV", label: "Kelas IV: syok kardiogenik", hint: "TD sistolik <90 mmHg dan tanda hipoperfusi jaringan." },
];
// Mortalitas 30 hari tanpa / dengan reperfusi: PNPK SKA 2026 Tabel 19.
const KILLIP_MORT: Record<string, string> = { I: "6% tanpa reperfusi; 2,8% dengan reperfusi", II: "17% tanpa reperfusi; 8,8% dengan reperfusi", III: "38% tanpa reperfusi; 14,4% dengan reperfusi", IV: "67% tanpa reperfusi" };
export const killip: CalcDef = {
  slug: "killip",
  fields: [{ type: "select", id: "k", label: "Temuan pemeriksaan fisik pada infark miokard akut", options: KILLIP, columns: 1, hint: "Bila temuan campuran, pilih kelas tertinggi yang terpenuhi." }],
  compute(v) {
    const k = sel(v, "k");
    if (!k) return incomplete("Pilih kelas Killip.");
    const o = KILLIP.find((x) => x.value === k)!;
    return { status: "ok", value: k, label: o.label, tone: k === "I" ? "ok" : k === "II" ? "warn" : "bad", lines: [o.hint!, `Mortalitas 30 hari (PNPK SKA 2026 Tabel 19): ${KILLIP_MORT[k]}.`], steps: [`Temuan: ${o.hint}`, `Kelas Killip ${k}`], copy: `Killip ${k} (${o.hint!.replace(/\.$/, "")})` };
  },
};

const NYHA: Option[] = [
  { value: "I", label: "Kelas I", hint: "Tidak ada keterbatasan aktivitas fisik; aktivitas biasa tidak menimbulkan lelah, berdebar, atau sesak." },
  { value: "II", label: "Kelas II", hint: "Keterbatasan ringan; nyaman saat istirahat, aktivitas biasa menimbulkan keluhan." },
  { value: "III", label: "Kelas III", hint: "Keterbatasan nyata; nyaman saat istirahat, aktivitas lebih ringan dari biasa menimbulkan keluhan." },
  { value: "IV", label: "Kelas IV", hint: "Keluhan saat istirahat; setiap aktivitas memperberat keluhan." },
];
export const nyha: CalcDef = {
  slug: "nyha",
  fields: [{ type: "select", id: "n", label: "Keterbatasan aktivitas yang dilaporkan pasien", options: NYHA, columns: 1 }],
  compute(v) {
    const n = sel(v, "n");
    if (!n) return incomplete("Pilih kelas NYHA.");
    const o = NYHA.find((x) => x.value === n)!;
    return { status: "ok", value: n, label: `NYHA ${n}`, tone: n === "I" ? "ok" : n === "II" ? "warn" : "bad", lines: [o.hint!], steps: [o.hint!], copy: `NYHA kelas ${n}: ${o.hint}` };
  },
};

// Klasifikasi tekanan darah dewasa: PNPK Tata Laksana Hipertensi Dewasa 2026 (KMK HK.01.07/MENKES/303/2026), Tabel 2 = ESC 2024 Tabel 5.
const BP_THRESHOLDS: Record<string, { label: string; elev: [number, number]; ht: [number, number] }> = {
  klinik: { label: "TD klinik (office)", elev: [120, 70], ht: [140, 90] },
  rumah: { label: "TD rumah (HBPM)", elev: [120, 70], ht: [135, 85] },
  siang: { label: "ABPM siang hari", elev: [120, 70], ht: [135, 85] },
  "24jam": { label: "ABPM 24 jam", elev: [115, 65], ht: [130, 80] },
  malam: { label: "ABPM malam hari", elev: [110, 60], ht: [120, 70] },
};
export const hipertensi: CalcDef = {
  slug: "hipertensi",
  fields: [
    { type: "select", id: "cara", label: "Cara pengukuran", columns: 1, options: Object.entries(BP_THRESHOLDS).map(([value, t]) => ({ value, label: t.label, hint: `Hipertensi ≥${t.ht[0]}/${t.ht[1]} mmHg` })) },
    { type: "number", id: "sbp", label: "Tekanan darah sistolik", unit: "mmHg", hint: "Pakai rata-rata beberapa pengukuran, bukan satu kali ukur." },
    { type: "number", id: "dbp", label: "Tekanan darah diastolik", unit: "mmHg" },
  ],
  compute(v) {
    const cara = sel(v, "cara"), s = num(v, "sbp"), d = num(v, "dbp");
    if (!cara || s === null || d === null) return incomplete("Pilih cara pengukuran lalu isi sistolik dan diastolik.");
    const e = outOfRange("Sistolik", s, 50, 300, "mmHg") ?? outOfRange("Diastolik", d, 20, 200, "mmHg");
    if (e) return invalid(e);
    if (d >= s) return invalid("Diastolik harus lebih rendah dari sistolik.");
    const t = BP_THRESHOLDS[cara];
    const ht = s >= t.ht[0] || d >= t.ht[1];
    const el = !ht && (s >= t.elev[0] || d >= t.elev[1]);
    const label = ht ? "Hipertensi" : el ? "TD meningkat (elevated)" : "TD tidak meningkat (non-elevated)";
    return {
      status: "ok", value: `${fmt(s, 0)}/${fmt(d, 0)}`, unit: "mmHg", label, tone: ht ? "bad" : el ? "warn" : "ok",
      lines: [
        `Ambang ${t.label}: tidak meningkat <${t.elev[0]}/${t.elev[1]}; meningkat ${t.elev[0]}/${t.elev[1]} sampai <${t.ht[0]}/${t.ht[1]}; hipertensi ≥${t.ht[0]}/${t.ht[1]} mmHg.`,
        "Kategori ditentukan oleh nilai sistolik ATAU diastolik yang lebih tinggi kategorinya.",
      ],
      steps: [
        `Cara ukur: ${t.label}`,
        `Sistolik ${fmt(s, 0)} vs ambang hipertensi ${t.ht[0]} dan meningkat ${t.elev[0]}`,
        `Diastolik ${fmt(d, 0)} vs ambang hipertensi ${t.ht[1]} dan meningkat ${t.elev[1]}`,
        `Kategori: ${label}`,
      ],
      copy: `TD ${fmt(s, 0)}/${fmt(d, 0)} mmHg (${t.label}): ${label} menurut PNPK Hipertensi Dewasa 2026`,
    };
  },
};
