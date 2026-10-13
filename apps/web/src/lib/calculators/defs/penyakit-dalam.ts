import { fmt, incomplete, invalid, num, outOfRange, scoreCalc, sel, type CalcDef, type Tone } from "../engine";

// qSOFA (Sepsis-3; Singer dkk., JAMA 2016).
export const qsofa = scoreCalc({
  slug: "qsofa",
  title: "qSOFA",
  max: 3,
  items: [
    { kind: "check", id: "rr", label: "Laju napas ≥22 kali/menit", points: 1 },
    { kind: "check", id: "mental", label: "Perubahan status mental (GCS <15)", points: 1 },
    { kind: "check", id: "sbp", label: "Tekanan darah sistolik ≤100 mmHg", points: 1 },
  ],
  bands: [
    { min: 0, max: 1, label: "Risiko rendah (<2)", tone: "ok", advice: "Skor rendah tidak menyingkirkan sepsis; nilai ulang bila klinis memburuk." },
    { min: 2, max: 3, label: "Risiko tinggi luaran buruk (≥2)", tone: "bad", advice: "Pada dugaan infeksi, evaluasi disfungsi organ (SOFA) dan tata laksana sepsis." },
  ],
});

// Kriteria SIRS (ACCP/SCCM 1992).
export const sirs = scoreCalc({
  slug: "sirs",
  title: "SIRS",
  max: 4,
  items: [
    { kind: "check", id: "temp", label: "Suhu >38 °C atau <36 °C", points: 1 },
    { kind: "check", id: "hr", label: "Denyut jantung >90 kali/menit", points: 1 },
    { kind: "check", id: "rr", label: "Laju napas >20 kali/menit atau PaCO₂ <32 mmHg", points: 1 },
    { kind: "check", id: "wbc", label: "Leukosit >12.000/mm³, <4.000/mm³, atau batang >10%", points: 1 },
  ],
  bands: [
    { min: 0, max: 1, label: "Kriteria SIRS tidak terpenuhi", tone: "ok" },
    { min: 2, max: 4, label: "Memenuhi SIRS (≥2 kriteria)", tone: "warn", advice: "SIRS dengan infeksi terbukti/diduga = sepsis menurut definisi 1992; Sepsis-3 memakai disfungsi organ (SOFA)." },
  ],
});

// Analisis gas darah: gangguan primer, kompensasi, anion gap, rasio delta (Berend dkk., NEJM 2014).
export const agd: CalcDef = {
  slug: "agd",
  fields: [
    { type: "heading", label: "Gas darah arteri" },
    { type: "number", id: "ph", label: "pH" },
    { type: "number", id: "pco2", label: "pCO₂", unit: "mmHg" },
    { type: "number", id: "hco3", label: "HCO₃⁻", unit: "mEq/L" },
    { type: "heading", label: "Anion gap (opsional)", hint: "Diisi untuk menilai asidosis metabolik dengan anion gap tinggi." },
    { type: "number", id: "na", label: "Na⁺", unit: "mEq/L", optional: true },
    { type: "number", id: "cl", label: "Cl⁻", unit: "mEq/L", optional: true },
    { type: "number", id: "alb", label: "Albumin", unit: "g/dL", optional: true, hint: "Untuk koreksi anion gap: setiap turun 1 g/dL dari 4, AG ditambah 2,5." },
  ],
  compute(v) {
    const ph = num(v, "ph"), pco2 = num(v, "pco2"), hco3 = num(v, "hco3");
    if (ph === null || pco2 === null || hco3 === null) return incomplete("Isi pH, pCO₂, dan HCO₃⁻.");
    const e = outOfRange("pH", ph, 6.5, 8, "") ?? outOfRange("pCO₂", pco2, 5, 150, "mmHg") ?? outOfRange("HCO₃⁻", hco3, 2, 60, "mEq/L");
    if (e) return invalid(e);
    const steps: string[] = [];
    const lines: string[] = [];
    // Konsistensi Henderson–Hasselbalch
    const phCalc = 6.1 + Math.log10(hco3 / (0.03 * pco2));
    steps.push(`Cek konsistensi: pH hitung = 6,1 + log(${fmt(hco3, 1)} ÷ (0,03 × ${fmt(pco2, 0)})) = ${fmt(phCalc, 2)}`);
    if (Math.abs(phCalc - ph) > 0.05) lines.push(`Perhatian: pH terukur ${fmt(ph, 2)} tidak sesuai pH hitung ${fmt(phCalc, 2)}; periksa ulang sampel/data.`);

    const acid = ph < 7.35, alk = ph > 7.45;
    const lowH = hco3 < 22, highH = hco3 > 26, highC = pco2 > 45, lowC = pco2 < 35;
    let primary = "";
    let tone: Tone = "warn";
    const disorders: string[] = [];
    if (acid) {
      if (lowH && highC) { primary = "Asidosis campuran (metabolik dan respiratorik)"; tone = "bad"; }
      else if (lowH) primary = "Asidosis metabolik";
      else if (highC) primary = "Asidosis respiratorik";
      else primary = "Asidemia tanpa pola jelas";
    } else if (alk) {
      if (highH && lowC) { primary = "Alkalosis campuran (metabolik dan respiratorik)"; tone = "bad"; }
      else if (highH) primary = "Alkalosis metabolik";
      else if (lowC) primary = "Alkalosis respiratorik";
      else primary = "Alkalemia tanpa pola jelas";
    } else {
      if (lowH && lowC) primary = "pH normal dengan HCO₃⁻ dan pCO₂ rendah: kemungkinan gangguan campuran (asidosis metabolik + alkalosis respiratorik)";
      else if (highH && highC) primary = "pH normal dengan HCO₃⁻ dan pCO₂ tinggi: kemungkinan gangguan campuran (alkalosis metabolik + asidosis respiratorik)";
      else { primary = "Dalam batas normal"; tone = "ok"; }
    }
    steps.push(`pH ${fmt(ph, 2)} → ${acid ? "asidemia (<7,35)" : alk ? "alkalemia (>7,45)" : "normal (7,35–7,45)"}; pCO₂ ${fmt(pco2, 0)} (35–45), HCO₃⁻ ${fmt(hco3, 1)} (22–26)`);
    disorders.push(primary);

    // Kompensasi
    if (primary === "Asidosis metabolik" || primary.startsWith("pH normal dengan HCO₃⁻ dan pCO₂ rendah")) {
      const exp = 1.5 * hco3 + 8;
      steps.push(`Winter: pCO₂ harapan = 1,5 × ${fmt(hco3, 1)} + 8 = ${fmt(exp, 1)} ± 2 mmHg`);
      if (pco2 > exp + 2) disorders.push("disertai asidosis respiratorik (pCO₂ di atas harapan)");
      else if (pco2 < exp - 2) disorders.push("disertai alkalosis respiratorik (pCO₂ di bawah harapan)");
      else disorders.push("kompensasi respiratorik sesuai");
    } else if (primary === "Alkalosis metabolik") {
      const exp = 40 + 0.7 * (hco3 - 24);
      steps.push(`pCO₂ harapan = 40 + 0,7 × (${fmt(hco3, 1)} − 24) = ${fmt(exp, 1)} ± 2 mmHg`);
      if (pco2 > exp + 2) disorders.push("disertai asidosis respiratorik");
      else if (pco2 < exp - 2) disorders.push("disertai alkalosis respiratorik");
      else disorders.push("kompensasi respiratorik sesuai");
    } else if (primary === "Asidosis respiratorik") {
      const a = 24 + 0.1 * (pco2 - 40), c = 24 + 0.4 * (pco2 - 40);
      steps.push(`HCO₃⁻ harapan: akut 24 + 0,1 × (${fmt(pco2, 0)} − 40) = ${fmt(a, 1)}; kronik 24 + 0,4 × (${fmt(pco2, 0)} − 40) = ${fmt(c, 1)}`);
      if (hco3 < a - 2) disorders.push("disertai asidosis metabolik (HCO₃⁻ di bawah harapan akut)");
      else if (hco3 > c + 2) disorders.push("disertai alkalosis metabolik (HCO₃⁻ di atas harapan kronik)");
      else disorders.push(hco3 <= (a + c) / 2 ? "pola lebih sesuai akut" : "pola lebih sesuai kronik");
    } else if (primary === "Alkalosis respiratorik") {
      const a = 24 - 0.2 * (40 - pco2), c = 24 - 0.4 * (40 - pco2);
      steps.push(`HCO₃⁻ harapan: akut 24 − 0,2 × (40 − ${fmt(pco2, 0)}) = ${fmt(a, 1)}; kronik 24 − 0,4 × (40 − ${fmt(pco2, 0)}) = ${fmt(c, 1)}`);
      if (hco3 > a + 2) disorders.push("disertai alkalosis metabolik (HCO₃⁻ di atas harapan akut)");
      else if (hco3 < c - 2) disorders.push("disertai asidosis metabolik (HCO₃⁻ di bawah harapan kronik)");
      else disorders.push(hco3 >= (a + c) / 2 ? "pola lebih sesuai akut" : "pola lebih sesuai kronik");
    }

    // Anion gap
    const na = num(v, "na"), cl = num(v, "cl"), alb = num(v, "alb");
    if (na !== null && cl !== null) {
      const ag = na - (cl + hco3);
      const agc = alb !== null ? ag + 2.5 * (4 - alb) : ag;
      steps.push(`Anion gap = ${fmt(na, 0)} − (${fmt(cl, 0)} + ${fmt(hco3, 1)}) = ${fmt(ag, 1)}${alb !== null ? `; terkoreksi albumin = ${fmt(ag, 1)} + 2,5 × (4 − ${fmt(alb, 1)}) = ${fmt(agc, 1)}` : ""}`);
      const high = agc > 12;
      lines.push(`Anion gap${alb !== null ? " terkoreksi" : ""} ${fmt(agc, 1)} mEq/L (${high ? "meningkat" : "tidak meningkat"}; nilai rujukan sekitar 8–12, sesuaikan laboratorium).`);
      if (high && hco3 < 24) {
        const ratio = (agc - 12) / (24 - hco3);
        steps.push(`Rasio delta = (${fmt(agc, 1)} − 12) ÷ (24 − ${fmt(hco3, 1)}) = ${fmt(ratio, 2)}`);
        lines.push(ratio < 1 ? `Rasio delta ${fmt(ratio, 2)} (<1): ada asidosis metabolik anion gap normal bersamaan.` : ratio > 2 ? `Rasio delta ${fmt(ratio, 2)} (>2): ada alkalosis metabolik bersamaan.` : `Rasio delta ${fmt(ratio, 2)} (1–2): asidosis anion gap tinggi murni.`);
      }
    }
    const summary = disorders.join(", ");
    return {
      status: "ok", value: fmt(ph, 2), unit: "pH", label: primary, tone, lines: [summary === primary ? "" : summary, ...lines].filter(Boolean), steps,
      copy: `AGD: pH ${fmt(ph, 2)}, pCO₂ ${fmt(pco2, 0)} mmHg, HCO₃⁻ ${fmt(hco3, 1)} mEq/L. Kesan: ${summary}${lines.length ? `. ${lines.join(" ")}` : ""}`,
    };
  },
};

// eGFR CKD-EPI 2021 (tanpa ras), CrCl Cockcroft-Gault, dan kategori KDIGO.
const KDIGO_RISK: Record<string, string[]> = {
  G1: ["Risiko rendah", "Risiko sedang", "Risiko tinggi"],
  G2: ["Risiko rendah", "Risiko sedang", "Risiko tinggi"],
  G3a: ["Risiko sedang", "Risiko tinggi", "Risiko sangat tinggi"],
  G3b: ["Risiko tinggi", "Risiko sangat tinggi", "Risiko sangat tinggi"],
  G4: ["Risiko sangat tinggi", "Risiko sangat tinggi", "Risiko sangat tinggi"],
  G5: ["Risiko sangat tinggi", "Risiko sangat tinggi", "Risiko sangat tinggi"],
};
export function ckdEpi2021(scrMgDl: number, age: number, female: boolean) {
  const k = female ? 0.7 : 0.9, a = female ? -0.241 : -0.302;
  return 142 * Math.min(scrMgDl / k, 1) ** a * Math.max(scrMgDl / k, 1) ** -1.2 * 0.9938 ** age * (female ? 1.012 : 1);
}
export const egfr: CalcDef = {
  slug: "egfr",
  fields: [
    { type: "select", id: "sex", label: "Jenis kelamin", options: [{ value: "L", label: "Laki-laki" }, { value: "P", label: "Perempuan" }] },
    { type: "number", id: "age", label: "Usia", unit: "tahun", hint: "Persamaan CKD-EPI untuk usia ≥18 tahun." },
    { type: "select", id: "unit", label: "Satuan kreatinin", options: [{ value: "mg", label: "mg/dL" }, { value: "umol", label: "µmol/L" }] },
    { type: "number", id: "scr", label: "Kreatinin serum" },
    { type: "number", id: "bb", label: "Berat badan (untuk CrCl)", unit: "kg", optional: true },
    { type: "number", id: "acr", label: "Rasio albumin-kreatinin urine (ACR)", unit: "mg/g", optional: true },
  ],
  compute(v) {
    const sex = sel(v, "sex"), unit = sel(v, "unit"), age = num(v, "age"), scr0 = num(v, "scr");
    if (!sex || !unit || age === null || scr0 === null) return incomplete("Isi jenis kelamin, usia, satuan, dan kreatinin.");
    const e = outOfRange("Usia", age, 18, 110, "tahun");
    if (e) return invalid(e);
    const scr = unit === "umol" ? scr0 / 88.4 : scr0;
    if (scr < 0.1 || scr > 25) return invalid("Kreatinin di luar rentang wajar (0,1–25 mg/dL).");
    const f = sex === "P";
    const g = ckdEpi2021(scr, age, f);
    const G = g >= 90 ? "G1" : g >= 60 ? "G2" : g >= 45 ? "G3a" : g >= 30 ? "G3b" : g >= 15 ? "G4" : "G5";
    const gLabel: Record<string, string> = { G1: "normal atau tinggi", G2: "turun ringan", G3a: "turun ringan–sedang", G3b: "turun sedang–berat", G4: "turun berat", G5: "gagal ginjal" };
    const steps = [
      unit === "umol" ? `Kreatinin ${fmt(scr0, 0)} µmol/L ÷ 88,4 = ${fmt(scr, 2)} mg/dL` : `Kreatinin ${fmt(scr, 2)} mg/dL`,
      `CKD-EPI 2021: 142 × min(Scr/κ,1)^α × max(Scr/κ,1)^−1,200 × 0,9938^usia${f ? " × 1,012" : ""}; κ = ${f ? "0,7" : "0,9"}, α = ${f ? "−0,241" : "−0,302"}`,
      `eGFR = ${fmt(g, 0)} mL/menit/1,73 m² → ${G} (${gLabel[G]})`,
    ];
    const lines: string[] = [];
    const bb = num(v, "bb");
    if (bb !== null && bb >= 20 && bb <= 300) {
      const crcl = ((140 - age) * bb) / (72 * scr) * (f ? 0.85 : 1);
      steps.push(`CrCl Cockcroft-Gault = (140 − ${fmt(age, 0)}) × ${fmt(bb, 0)} ÷ (72 × ${fmt(scr, 2)})${f ? " × 0,85" : ""} = ${fmt(crcl, 0)} mL/menit`);
      lines.push(`CrCl Cockcroft-Gault ${fmt(crcl, 0)} mL/menit (lazim dipakai untuk penyesuaian dosis obat).`);
    }
    const acr = num(v, "acr");
    let A = "";
    if (acr !== null && acr >= 0) {
      A = acr < 30 ? "A1" : acr <= 300 ? "A2" : "A3";
      const risk = KDIGO_RISK[G][Number(A[1]) - 1];
      steps.push(`ACR ${fmt(acr, 0)} mg/g → ${A}; matriks KDIGO ${G}${A}: ${risk.toLowerCase()}`);
      lines.push(`Kategori KDIGO ${G}${A}: ${risk.toLowerCase()} progresivitas.`);
    }
    lines.push("Diagnosis PGK memerlukan kelainan yang menetap >3 bulan; satu kali pemeriksaan tidak cukup.");
    const tone: Tone = g >= 60 ? "ok" : g >= 30 ? "warn" : "bad";
    return {
      status: "ok", value: fmt(g, 0), unit: "mL/menit/1,73 m²", label: `${G}: ${gLabel[G]}`, tone, lines, steps,
      copy: `eGFR (CKD-EPI 2021) ${fmt(g, 0)} mL/menit/1,73 m², kategori ${G}${A ? A : ""}${lines.length > 1 ? `. ${lines.slice(0, -1).join(" ")}` : ""}`,
    };
  },
};
