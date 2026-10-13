import { fmt, incomplete, scoreCalc, sel, type CalcDef, type Option } from "../engine";

// Skor VBAC saat masuk (Flamm & Geiger, Obstet Gynecol 1997).
export const vbac = scoreCalc({
  slug: "vbac",
  title: "Skor VBAC Flamm-Geiger",
  max: 10,
  items: [
    { kind: "check", id: "age", label: "Usia ibu <40 tahun", points: 2 },
    { kind: "select", id: "vag", label: "Riwayat persalinan pervaginam", options: [
      { value: "0", label: "Tidak ada", points: 0 },
      { value: "1", label: "Hanya sebelum seksio sesarea", points: 1 },
      { value: "2", label: "Hanya setelah seksio sesarea", points: 2 },
      { value: "4", label: "Sebelum dan setelah seksio sesarea", points: 4 },
    ] },
    { kind: "check", id: "ind", label: "Indikasi seksio sebelumnya bukan gagal kemajuan persalinan", points: 1 },
    { kind: "select", id: "eff", label: "Pendataran serviks saat masuk", options: [{ value: "0", label: "<25%", points: 0 }, { value: "1", label: "25–75%", points: 1 }, { value: "2", label: ">75%", points: 2 }], },
    { kind: "check", id: "dil", label: "Pembukaan serviks ≥4 cm saat masuk", points: 1 },
  ],
  bands: [
    { min: 0, max: 2, label: "Peluang VBAC terendah (skor 0–2)", tone: "warn", advice: "Pada studi asal, keberhasilan VBAC sekitar 49% pada skor 0–2." },
    { min: 3, max: 7, label: "Peluang VBAC menengah (skor 3–7)", tone: "info", advice: "Peluang keberhasilan meningkat seiring kenaikan skor." },
    { min: 8, max: 10, label: "Peluang VBAC tertinggi (skor 8–10)", tone: "ok", advice: "Pada studi asal, keberhasilan VBAC sekitar 95% pada skor 8–10." },
  ],
  note: () => ["Skor membantu konseling, bukan penentu tunggal; pertimbangkan riwayat insisi uterus dan fasilitas operasi segera."],
});

// Luas luka bakar dewasa dengan Rule of Nines (Wallace).
const FRAC: Option[] = [
  { value: "0", label: "0" }, { value: "0.25", label: "¼" }, { value: "0.5", label: "½" }, { value: "0.75", label: "¾" }, { value: "1", label: "Penuh" },
];
const REGIONS: [string, string, number][] = [
  ["kepala", "Kepala dan leher", 9], ["dada", "Badan depan (dada dan perut)", 18], ["punggung", "Badan belakang (punggung dan bokong)", 18],
  ["lka", "Lengan kanan", 9], ["lki", "Lengan kiri", 9], ["tka", "Tungkai kanan", 18], ["tki", "Tungkai kiri", 18], ["genital", "Genitalia/perineum", 1],
];
export const lukaBakar: CalcDef = {
  slug: "luka-bakar",
  fields: [
    { type: "heading", label: "Bagian tubuh yang terbakar (dewasa)", hint: "Hitung hanya luka bakar derajat dua (partial thickness) dan tiga; luka bakar superfisial (derajat satu) tidak dihitung." },
    ...REGIONS.map(([id, label, pct]) => ({ type: "select" as const, id, label: `${label} (${pct}%)`, options: FRAC, columns: 3 as const, optional: true })),
  ],
  compute(v) {
    let total = 0;
    const steps: string[] = [];
    for (const [id, label, pct] of REGIONS) {
      const f = sel(v, id);
      if (f && +f > 0) {
        total += pct * +f;
        steps.push(`${label}: ${FRAC.find((x) => x.value === f)!.label} × ${pct}% = ${fmt(pct * +f, 2)}%`);
      }
    }
    if (!steps.length) return incomplete("Pilih bagian tubuh yang terbakar.");
    steps.push(`Total luas luka bakar = ${fmt(total, 2)}% TBSA`);
    const tone = total >= 20 ? "bad" : total >= 10 ? "warn" : "info";
    return {
      status: "ok", value: fmt(total, 1), unit: "% TBSA", label: total >= 20 ? "Luka bakar luas (≥20% TBSA dewasa)" : "Luas luka bakar", tone,
      lines: [
        "Untuk luka bakar kecil atau tersebar, telapak tangan pasien termasuk jari sekitar 1% TBSA.",
        "Rule of Nines tidak akurat untuk anak karena proporsi kepala lebih besar; gunakan bagan Lund-Browder.",
      ],
      steps, copy: `Luas luka bakar ${fmt(total, 1)}% TBSA (Rule of Nines dewasa)`,
    };
  },
};
