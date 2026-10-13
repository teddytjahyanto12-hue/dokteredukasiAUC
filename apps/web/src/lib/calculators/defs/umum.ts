import { fmt, incomplete, invalid, num, outOfRange, type CalcDef } from "../engine";

// IMT dewasa dengan batas Asia-Pasifik (WHO WPRO 2000).
export const imt: CalcDef = {
  slug: "imt",
  fields: [
    { type: "number", id: "bb", label: "Berat badan", unit: "kg" },
    { type: "number", id: "tb", label: "Tinggi badan", unit: "cm" },
  ],
  compute(v) {
    const bb = num(v, "bb"), tb = num(v, "tb");
    if (bb === null || tb === null) return incomplete("Isi berat dan tinggi badan.");
    const e = outOfRange("Berat badan", bb, 10, 400, "kg") ?? outOfRange("Tinggi badan", tb, 100, 250, "cm");
    if (e) return invalid(e);
    const m = tb / 100, imt = bb / (m * m);
    const [label, tone] =
      imt < 18.5 ? ["Berat badan kurang (<18,5)", "warn"] :
      imt < 23 ? ["Normal (18,5–22,9)", "ok"] :
      imt < 25 ? ["Berat badan lebih, berisiko (23–24,9)", "warn"] :
      imt < 30 ? ["Obesitas I (25–29,9)", "bad"] : ["Obesitas II (≥30)", "bad"];
    return {
      status: "ok", value: fmt(imt, 1), unit: "kg/m²", label, tone: tone as "ok" | "warn" | "bad",
      lines: ["Batas Asia-Pasifik untuk dewasa; tidak dipakai untuk anak, ibu hamil, atau atlet bermassa otot besar."],
      steps: [`Tinggi = ${fmt(tb, 1)} cm = ${fmt(m, 2)} m`, `IMT = ${fmt(bb, 1)} ÷ (${fmt(m, 2)} × ${fmt(m, 2)}) = ${fmt(imt, 1)} kg/m²`, `Kategori Asia-Pasifik: ${label}`],
      copy: `IMT ${fmt(imt, 1)} kg/m² (BB ${fmt(bb, 1)} kg, TB ${fmt(tb, 1)} cm), ${label}`,
    };
  },
};

// Mean arterial pressure dan target perfusi.
export const map: CalcDef = {
  slug: "map",
  fields: [
    { type: "number", id: "sbp", label: "Tekanan darah sistolik", unit: "mmHg" },
    { type: "number", id: "dbp", label: "Tekanan darah diastolik", unit: "mmHg" },
  ],
  compute(v) {
    const s = num(v, "sbp"), d = num(v, "dbp");
    if (s === null || d === null) return incomplete("Isi tekanan sistolik dan diastolik.");
    const e = outOfRange("Sistolik", s, 30, 300, "mmHg") ?? outOfRange("Diastolik", d, 10, 200, "mmHg");
    if (e) return invalid(e);
    if (d >= s) return invalid("Diastolik harus lebih rendah dari sistolik.");
    const mapv = d + (s - d) / 3;
    const low = mapv < 65;
    return {
      status: "ok", value: fmt(mapv, 0), unit: "mmHg",
      label: low ? "Di bawah target 65 mmHg" : "Mencapai target ≥65 mmHg", tone: low ? "bad" : "ok",
      lines: ["Target awal MAP ≥65 mmHg pada syok septik yang memerlukan vasopresor."],
      steps: [`Tekanan nadi = ${fmt(s, 0)} − ${fmt(d, 0)} = ${fmt(s - d, 0)} mmHg`, `MAP = ${fmt(d, 0)} + ⅓ × ${fmt(s - d, 0)} = ${fmt(mapv, 1)} mmHg`],
      copy: `MAP ${fmt(mapv, 0)} mmHg (TD ${fmt(s, 0)}/${fmt(d, 0)} mmHg)${low ? ", di bawah target 65 mmHg" : ""}`,
    };
  },
};
