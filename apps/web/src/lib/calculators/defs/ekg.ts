import { fmt, incomplete, invalid, num, outOfRange, sel, yes, type CalcDef } from "../engine";

// QTc dan laju jantung: AHA/ACCF/HRS Part IV (Rautaharju dkk., Circulation 2009) untuk koreksi QT dan batas QT memanjang/memendek;
// rumus linear Framingham (Sagie dkk., Am J Cardiol 1992); kecepatan kertas 25 mm/detik (Kligfield dkk., Circulation 2007).
export const ekg: CalcDef = {
  slug: "ekg",
  fields: [
    { type: "select", id: "sex", label: "Jenis kelamin", options: [{ value: "L", label: "Laki-laki" }, { value: "P", label: "Perempuan" }] },
    { type: "number", id: "qt", label: "Interval QT terukur", unit: "ms" },
    { type: "heading", label: "Laju jantung (isi salah satu)", hint: "Prioritas: interval RR, lalu laju jantung, lalu jumlah kotak kecil antar-R pada kertas 25 mm/detik." },
    { type: "number", id: "rr", label: "Interval RR", unit: "ms", optional: true },
    { type: "number", id: "hr", label: "Laju jantung", unit: "kali/menit", optional: true },
    { type: "number", id: "kotak", label: "Jumlah kotak kecil (1 mm) antar-R", unit: "kotak", optional: true },
    { type: "check", id: "af", label: "Variabilitas RR besar (mis. fibrilasi atrium) atau akhir gelombang T tidak jelas" },
  ],
  compute(v) {
    const sex = sel(v, "sex"), qt = num(v, "qt"), rrIn = num(v, "rr"), hrIn = num(v, "hr"), kotak = num(v, "kotak");
    if (!sex || qt === null) return incomplete("Isi jenis kelamin dan interval QT.");
    if (rrIn === null && hrIn === null && kotak === null) return incomplete("Isi interval RR, laju jantung, atau jumlah kotak kecil.");
    const e = outOfRange("QT", qt, 200, 700, "ms")
      ?? (rrIn !== null ? outOfRange("Interval RR", rrIn, 250, 2500, "ms") : null)
      ?? (rrIn === null && hrIn !== null ? outOfRange("Laju jantung", hrIn, 25, 250, "kali/menit") : null)
      ?? (rrIn === null && hrIn === null && kotak !== null ? outOfRange("Jumlah kotak kecil", kotak, 5, 60, "kotak") : null);
    if (e) return invalid(e);
    const steps: string[] = [];
    let rr: number;
    if (rrIn !== null) { rr = rrIn / 1000; steps.push(`RR = ${fmt(rrIn, 0)} ms = ${fmt(rr, 3)} detik`); }
    else if (hrIn !== null) { rr = 60 / hrIn; steps.push(`RR = 60 ÷ ${fmt(hrIn, 0)} = ${fmt(rr, 3)} detik`); }
    else { rr = kotak! * 0.04; steps.push(`Kertas 25 mm/detik: 1 kotak kecil = 0,04 detik; RR = ${fmt(kotak!, 1)} × 0,04 = ${fmt(rr, 3)} detik (laju = 1500 ÷ ${fmt(kotak!, 1)})`); }
    const hr = 60 / rr;
    const q = qt / 1000;
    const bazett = (q / Math.sqrt(rr)) * 1000, frid = (q / Math.cbrt(rr)) * 1000, fram = (q + 0.154 * (1 - rr)) * 1000;
    steps.push(
      `Laju jantung = 60 ÷ ${fmt(rr, 3)} = ${fmt(hr, 0)} kali/menit`,
      `Bazett: QT ÷ √RR = ${fmt(q, 3)} ÷ ${fmt(Math.sqrt(rr), 3)} = ${fmt(bazett, 0)} ms`,
      `Fridericia: QT ÷ ∛RR = ${fmt(q, 3)} ÷ ${fmt(Math.cbrt(rr), 3)} = ${fmt(frid, 0)} ms`,
      `Linear Framingham: QT + 0,154 × (1 − RR) = ${fmt(q, 3)} + 0,154 × (1 − ${fmt(rr, 3)}) = ${fmt(fram, 0)} ms`,
    );
    const batas = sex === "P" ? 460 : 450;
    const label = fram >= batas ? `QTc memanjang (≥${batas} ms)` : fram <= 390 ? "QTc memendek (≤390 ms)" : "QTc dalam batas normal";
    const lines = [
      `QTc Bazett ${fmt(bazett, 0)} ms; Fridericia ${fmt(frid, 0)} ms; linear Framingham ${fmt(fram, 0)} ms; laju ${fmt(hr, 0)} kali/menit.`,
      "AHA/ACCF/HRS 2009 menganjurkan koreksi dengan fungsi regresi linear, bukan Bazett; batas praktis: memanjang ≥460 ms (perempuan) atau ≥450 ms (laki-laki), memendek ≤390 ms.",
      ...(yes(v, "af") ? ["AHA/ACCF/HRS 2009: koreksi QT tidak dianjurkan bila variabilitas RR besar (mis. fibrilasi atrium) atau akhir gelombang T tidak dapat ditentukan dengan andal."] : []),
    ];
    return {
      status: "ok", value: fmt(fram, 0), unit: "ms (QTc linear)", label, tone: fram >= batas || fram <= 390 ? "warn" : "ok", lines, steps,
      copy: `QT ${fmt(qt, 0)} ms, laju ${fmt(hr, 0)}/menit: QTc linear (Framingham) ${fmt(fram, 0)} ms, Bazett ${fmt(bazett, 0)} ms, Fridericia ${fmt(frid, 0)} ms; ${label}`,
    };
  },
};
