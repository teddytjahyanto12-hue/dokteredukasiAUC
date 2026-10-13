import { fmt, incomplete, invalid, num, outOfRange, sel, type CalcDef, type Tone } from "../engine";
import { WHO_LMS, type Lms } from "../data/who-lms";

// Status gizi anak 0–60 bulan: z-score WHO Child Growth Standards 2006 (metode LMS, hal. 301–303 laporan metode WHO)
// dengan kategori dan ambang batas Permenkes No. 2 Tahun 2020 (lampiran hal. 14–15).

/** z-score LMS; restricted = penyesuaian WHO di luar ±3 SD untuk indeks berbasis berat. */
export function lmsZ([L, M, S]: Lms, y: number, restricted: boolean): number {
  const z = (Math.pow(y / M, L) - 1) / (L * S);
  if (!restricted || Math.abs(z) <= 3) return z;
  const sd = (k: number) => M * Math.pow(1 + L * S * k, 1 / L);
  if (z > 3) return 3 + (y - sd(3)) / (sd(3) - sd(2));
  return -3 + (y - sd(-3)) / (sd(-2) - sd(-3));
}

type Cat = [label: string, tone: Tone];
export const catBBU = (z: number): Cat => z < -3 ? ["Berat badan sangat kurang", "bad"] : z < -2 ? ["Berat badan kurang", "warn"] : z <= 1 ? ["Berat badan normal", "ok"] : ["Risiko berat badan lebih", "warn"];
export const catPBU = (z: number): Cat => z < -3 ? ["Sangat pendek (severely stunted)", "bad"] : z < -2 ? ["Pendek (stunted)", "warn"] : z <= 3 ? ["Normal", "ok"] : ["Tinggi", "info"];
export const catGizi = (z: number): Cat =>
  z < -3 ? ["Gizi buruk (severely wasted)", "bad"] : z < -2 ? ["Gizi kurang (wasted)", "warn"] : z <= 1 ? ["Gizi baik (normal)", "ok"]
  : z <= 2 ? ["Berisiko gizi lebih", "warn"] : z <= 3 ? ["Gizi lebih (overweight)", "bad"] : ["Obesitas", "bad"];

function byLength(t: { start: number; L: number; M: number[]; S: number[] }, cm: number): Lms | null {
  const i = Math.round((cm - t.start) * 10);
  return i < 0 || i >= t.M.length ? null : [t.L, t.M[i], t.S[i]];
}

export const antropometri: CalcDef = {
  slug: "antropometri-who",
  fields: [
    { type: "select", id: "sex", label: "Jenis kelamin", options: [{ value: "L", label: "Laki-laki" }, { value: "P", label: "Perempuan" }] },
    { type: "number", id: "umur", label: "Umur dalam bulan penuh", unit: "bulan", hint: "Permenkes 2/2020: umur dihitung dalam bulan penuh (2 bulan 29 hari = 2 bulan). Rentang 0–60 bulan." },
    { type: "number", id: "bb", label: "Berat badan", unit: "kg" },
    { type: "number", id: "pb", label: "Panjang atau tinggi badan", unit: "cm" },
    { type: "select", id: "posisi", label: "Posisi pengukuran", options: [{ value: "baring", label: "Terlentang (panjang badan)" }, { value: "berdiri", label: "Berdiri (tinggi badan)" }] },
  ],
  compute(v) {
    const sex = sel(v, "sex") as "L" | "P" | null, umur = num(v, "umur"), bb = num(v, "bb"), pb = num(v, "pb"), pos = sel(v, "posisi");
    if (!sex || umur === null || bb === null || pb === null || !pos) return incomplete("Isi jenis kelamin, umur, berat, panjang/tinggi, dan posisi ukur.");
    if (!Number.isInteger(umur)) return invalid("Umur diisi dalam bulan penuh (bilangan bulat).");
    const e = outOfRange("Umur", umur, 0, 60, "bulan") ?? outOfRange("Berat badan", bb, 0.5, 60, "kg") ?? outOfRange("Panjang/tinggi badan", pb, 40, 130, "cm");
    if (e) return invalid(e);
    const T = WHO_LMS[sex];
    const pakaiPB = umur <= 24;
    // Koreksi 0,7 cm sesuai Permenkes 2/2020.
    const koreksi = pakaiPB && pos === "berdiri" ? 0.7 : !pakaiPB && pos === "baring" ? -0.7 : 0;
    const len = Math.round((pb + koreksi) * 10) / 10;
    const steps: string[] = [];
    if (koreksi) steps.push(`${pakaiPB ? "Umur 0–24 bulan diukur berdiri: +0,7 cm" : "Umur >24 bulan diukur terlentang: −0,7 cm"} → ${fmt(len, 1)} cm`);

    const zBBU = lmsZ(T.wfa[umur], bb, true);
    const zPBU = lmsZ(pakaiPB ? T.lfa[umur] : T.hfa[umur - 24], len, false);
    const imt = bb / (len / 100) ** 2;
    const zIMT = lmsZ(pakaiPB ? T.bmiL[umur] : T.bmiH[umur - 24], imt, true);
    const lmsBBPB = byLength(pakaiPB ? T.wfl : T.wfh, len);
    const zBBPB = lmsBBPB ? lmsZ(lmsBBPB, bb, true) : null;

    const fz = (z: number) => `${z >= 0 ? "+" : ""}${fmt(z, 2)}`;
    const [cBBU] = catBBU(zBBU), [cPBU] = catPBU(zPBU), [cIMT] = catGizi(zIMT);
    const nmBBPB = pakaiPB ? "BB/PB" : "BB/TB", nmPBU = pakaiPB ? "PB/U" : "TB/U";
    steps.push(
      `BB/U: z = ${fz(zBBU)} → ${cBBU}`,
      `${nmPBU}: z = ${fz(zPBU)} → ${cPBU}`,
      zBBPB === null ? `${nmBBPB}: panjang/tinggi ${fmt(len, 1)} cm di luar tabel WHO (${pakaiPB ? "45–110" : "65–120"} cm)` : `${nmBBPB}: z = ${fz(zBBPB)} → ${catGizi(zBBPB)[0]}`,
      `IMT = ${fmt(bb, 2)} ÷ (${fmt(len / 100, 3)})² = ${fmt(imt, 1)} kg/m²; IMT/U: z = ${fz(zIMT)} → ${cIMT}`,
      "z = [(nilai ÷ M)^L − 1] ÷ (L × S); indeks berbasis berat di luar ±3 SD memakai jarak 2–3 SD (metode WHO).",
    );
    const main = zBBPB ?? zIMT;
    const [label, tone] = catGizi(main);
    const lines = [
      `BB/U ${fz(zBBU)}: ${cBBU}.`,
      `${nmPBU} ${fz(zPBU)}: ${cPBU}.`,
      zBBPB === null ? `${nmBBPB}: di luar rentang tabel WHO; status gizi memakai IMT/U.` : `${nmBBPB} ${fz(zBBPB)}: ${catGizi(zBBPB)[0]}.`,
      `IMT/U ${fz(zIMT)}: ${cIMT}.`,
      "Diagnosis gizi buruk dan gizi kurang memakai BB/PB atau BB/TB (Permenkes 2/2020).",
    ];
    return {
      status: "ok", value: fz(main), unit: `SD (${zBBPB === null ? "IMT/U" : nmBBPB})`, label: `${zBBPB === null ? "IMT/U" : nmBBPB}: ${label}`, tone, lines, steps,
      copy: `Antropometri (WHO 2006, Permenkes 2/2020) ${sex === "L" ? "laki-laki" : "perempuan"} ${umur} bulan, BB ${fmt(bb, 1)} kg, ${pakaiPB ? "PB" : "TB"} ${fmt(len, 1)} cm: BB/U ${fz(zBBU)} (${cBBU}); ${nmPBU} ${fz(zPBU)} (${cPBU}); ${zBBPB === null ? "" : `${nmBBPB} ${fz(zBBPB)} (${catGizi(zBBPB)[0]}); `}IMT/U ${fz(zIMT)} (${cIMT})`,
    };
  },
};
