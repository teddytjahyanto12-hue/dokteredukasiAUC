import { fmt, incomplete, invalid, num, outOfRange, sel, type CalcDef, type Tone } from "../engine";
import { AAP_BP } from "../data/aap-bp-2017";

// Tekanan darah anak 1–17 tahun: AAP 2017 (Flynn dkk., Pediatrics 2017) Tabel 3 (kategori), Tabel 4–5 (nilai per umur dan tinggi).
const CAT: [string, Tone][] = [["TD normal", "ok"], ["TD meningkat (elevated)", "warn"], ["Hipertensi derajat 1", "bad"], ["Hipertensi derajat 2", "bad"]];
const PCT = ["5", "10", "25", "50", "75", "90", "95"];

/** Kategori 0–3 untuk satu nilai dengan ambang [meningkat, derajat 1, derajat 2]. */
const level = (v: number, [e, s1, s2]: number[]) => (v >= s2 ? 3 : v >= s1 ? 2 : v >= e ? 1 : 0);

export const tdAnak: CalcDef = {
  slug: "tekanan-darah-anak",
  fields: [
    { type: "select", id: "sex", label: "Jenis kelamin", options: [{ value: "L", label: "Laki-laki" }, { value: "P", label: "Perempuan" }] },
    { type: "number", id: "umur", label: "Umur dalam tahun penuh", unit: "tahun", hint: "1–17 tahun. Bayi <1 tahun tidak memakai tabel ini." },
    { type: "number", id: "tb", label: "Tinggi badan", unit: "cm", hint: "Dipakai untuk memilih kolom tinggi terdekat pada tabel AAP (umur 1–12 tahun)." },
    { type: "number", id: "sbp", label: "Tekanan darah sistolik", unit: "mmHg" },
    { type: "number", id: "dbp", label: "Tekanan darah diastolik", unit: "mmHg" },
  ],
  compute(v) {
    const sex = sel(v, "sex") as "L" | "P" | null, umur = num(v, "umur"), tb = num(v, "tb"), s = num(v, "sbp"), d = num(v, "dbp");
    if (!sex || umur === null || tb === null || s === null || d === null) return incomplete("Isi jenis kelamin, umur, tinggi, dan tekanan darah.");
    if (!Number.isInteger(umur)) return invalid("Umur diisi dalam tahun penuh (bilangan bulat).");
    const e = outOfRange("Umur", umur, 1, 17, "tahun") ?? outOfRange("Tinggi badan", tb, 60, 200, "cm") ?? outOfRange("Sistolik", s, 50, 260, "mmHg") ?? outOfRange("Diastolik", d, 20, 160, "mmHg");
    if (e) return invalid(e);
    const steps: string[] = [];
    let ls: number, ld: number;
    if (umur >= 13) {
      // Tabel 3, umur ≥13 tahun: ambang sama dengan dewasa.
      ls = s >= 140 ? 3 : s >= 130 ? 2 : s >= 120 ? 1 : 0;
      ld = d >= 90 ? 3 : d >= 80 ? 2 : 0;
      steps.push("Umur ≥13 tahun: normal <120/<80; meningkat 120–129/<80; derajat 1 130/80–139/89; derajat 2 ≥140/90 mmHg");
    } else {
      const row = AAP_BP[sex][umur];
      let j = 0;
      row.h.forEach((h, i) => { if (Math.abs(h - tb) < Math.abs(row.h[j] - tb)) j = i; });
      const ts = [Math.min(row.s90[j], 120), Math.min(row.s95[j], 130), Math.min(row.s95[j] + 12, 140)];
      const td = [Math.min(row.d90[j], 80), Math.min(row.d95[j], 80), Math.min(row.d95[j] + 12, 90)];
      ls = level(s, ts); ld = level(d, td);
      steps.push(
        `Tabel ${sex === "L" ? "4 (laki-laki)" : "5 (perempuan)"}, umur ${umur} tahun: kolom tinggi terdekat ${fmt(row.h[j], 1)} cm (persentil tinggi ${PCT[j]})`,
        `Sistolik: P90 ${row.s90[j]}, P95 ${row.s95[j]}, P95+12 ${row.s95[j] + 12} → ambang dipakai (yang lebih rendah dari ambang dewasa) ${ts.join(" / ")} mmHg`,
        `Diastolik: P90 ${row.d90[j]}, P95 ${row.d95[j]}, P95+12 ${row.d95[j] + 12} → ambang dipakai ${td.join(" / ")} mmHg`,
      );
    }
    steps.push(`Sistolik ${fmt(s, 0)} → ${CAT[ls][0]}; diastolik ${fmt(d, 0)} → ${CAT[ld][0]}; kategori akhir mengikuti yang lebih tinggi`);
    const k = Math.max(ls, ld);
    const [label, tone] = CAT[k];
    return {
      status: "ok", value: `${fmt(s, 0)}/${fmt(d, 0)}`, unit: "mmHg", label, tone,
      lines: [
        "Diagnosis hipertensi memerlukan pengukuran auskultasi pada 3 kunjungan berbeda; hasil osilometri yang tinggi dikonfirmasi dengan auskultasi.",
        ...(k >= 1 ? ["AAP 2017 merekomendasikan ABPM bila TD meningkat menetap 1 tahun atau hipertensi derajat 1 pada 3 kunjungan."] : []),
      ],
      steps,
      copy: `TD anak (AAP 2017) ${sex === "L" ? "laki-laki" : "perempuan"} ${umur} tahun, TB ${fmt(tb, 1)} cm: ${fmt(s, 0)}/${fmt(d, 0)} mmHg, ${label}`,
    };
  },
};
