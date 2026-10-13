import { fmt, incomplete, invalid, num, outOfRange, scoreCalc, yes, type CalcDef } from "../engine";

// CURB-65 (Lim dkk., Thorax 2003; BTS 2009).
export const curb65 = scoreCalc({
  slug: "curb-65",
  title: "CURB-65",
  max: 5,
  items: [
    { kind: "check", id: "c", label: "Confusion: kebingungan/disorientasi baru", points: 1 },
    { kind: "check", id: "u", label: "Urea >7 mmol/L (BUN >19 mg/dL)", points: 1 },
    { kind: "check", id: "r", label: "Laju napas ≥30 kali/menit", points: 1 },
    { kind: "check", id: "b", label: "TD sistolik <90 mmHg atau diastolik ≤60 mmHg", points: 1 },
    { kind: "check", id: "a", label: "Usia ≥65 tahun", points: 1 },
  ],
  bands: [
    { min: 0, max: 1, label: "Risiko rendah (0–1)", tone: "ok", advice: "Umumnya dapat dirawat jalan bila kondisi lain mendukung." },
    { min: 2, max: 2, label: "Risiko sedang (2)", tone: "warn", advice: "Pertimbangkan rawat inap singkat atau rawat jalan dengan pengawasan ketat." },
    { min: 3, max: 5, label: "Risiko tinggi (3–5)", tone: "bad", advice: "Rawat inap sebagai pneumonia berat; nilai kebutuhan ICU terutama skor 4–5." },
  ],
});

// Definisi Berlin ARDS (ARDS Definition Task Force, JAMA 2012).
export const berlin: CalcDef = {
  slug: "berlin-ards",
  fields: [
    { type: "heading", label: "Kriteria", hint: "Semua kriteria harus terpenuhi." },
    { type: "check", id: "timing", label: "Onset ≤1 minggu dari cedera klinis yang diketahui atau gejala napas baru/memburuk" },
    { type: "check", id: "imaging", label: "Opasitas bilateral pada foto toraks/CT, tidak sepenuhnya dijelaskan efusi, kolaps lobus/paru, atau nodul" },
    { type: "check", id: "origin", label: "Gagal napas tidak sepenuhnya dijelaskan gagal jantung atau kelebihan cairan" },
    { type: "check", id: "peep", label: "PEEP atau CPAP ≥5 cmH₂O saat sampel gas darah diambil", hint: "CPAP non-invasif hanya diperbolehkan untuk derajat ringan." },
    { type: "heading", label: "Oksigenasi" },
    { type: "number", id: "pao2", label: "PaO₂", unit: "mmHg" },
    { type: "number", id: "fio2", label: "FiO₂ (fraksi)", hint: "Tulis sebagai fraksi 0,21–1,00 (50% = 0,5)." },
    { type: "number", id: "pb", label: "Tekanan barometrik", unit: "mmHg", optional: true, hint: "Diisi bila ketinggian >1000 m; P/F dikoreksi × (PB/760)." },
  ],
  compute(v) {
    const pao2 = num(v, "pao2"), fio2 = num(v, "fio2"), pb = num(v, "pb");
    if (pao2 === null || fio2 === null) return incomplete("Isi PaO₂ dan FiO₂.");
    const e = outOfRange("PaO₂", pao2, 20, 700, "mmHg") ?? outOfRange("FiO₂", fio2, 0.21, 1, "");
    if (e) return invalid(e + (fio2 > 1 ? " Gunakan fraksi, misalnya 0,5 untuk 50%." : ""));
    let pf = pao2 / fio2;
    const steps = [`P/F = ${fmt(pao2, 0)} ÷ ${fmt(fio2, 2)} = ${fmt(pf, 0)}`];
    if (pb !== null && pb > 300 && pb < 800 && pb !== 760) {
      pf = pf * (pb / 760);
      steps.push(`Koreksi ketinggian: × (${fmt(pb, 0)} ÷ 760) = ${fmt(pf, 0)}`);
    }
    const crit = ["timing", "imaging", "origin", "peep"].every((k) => yes(v, k));
    const sev = pf <= 100 ? "berat" : pf <= 200 ? "sedang" : pf <= 300 ? "ringan" : null;
    steps.push(`Rentang Berlin: ringan 200 < P/F ≤ 300; sedang 100 < P/F ≤ 200; berat ≤ 100`);
    if (!crit) {
      return { status: "ok", value: fmt(pf, 0), unit: "P/F", label: "Kriteria Berlin belum lengkap", tone: "info", lines: ["Centang keempat kriteria untuk menetapkan ARDS."], steps, copy: `P/F ${fmt(pf, 0)}; kriteria Berlin belum lengkap` };
    }
    if (!sev) return { status: "ok", value: fmt(pf, 0), unit: "P/F", label: "Bukan ARDS (P/F >300)", tone: "ok", steps, copy: `P/F ${fmt(pf, 0)}, tidak memenuhi kriteria oksigenasi ARDS Berlin` };
    return {
      status: "ok", value: fmt(pf, 0), unit: "P/F", label: `ARDS ${sev}`, tone: sev === "ringan" ? "warn" : "bad",
      lines: sev === "ringan" ? [] : ["Derajat sedang dan berat mensyaratkan PEEP ≥5 cmH₂O (bukan CPAP non-invasif)."],
      steps, copy: `ARDS ${sev} menurut definisi Berlin (P/F ${fmt(pf, 0)} dengan PEEP/CPAP ≥5 cmH₂O)`,
    };
  },
};

// Kriteria Light untuk cairan pleura.
export const light: CalcDef = {
  slug: "light",
  fields: [
    { type: "number", id: "pp", label: "Protein cairan pleura", unit: "g/dL" },
    { type: "number", id: "sp", label: "Protein total serum", unit: "g/dL" },
    { type: "number", id: "pl", label: "LDH cairan pleura", unit: "U/L" },
    { type: "number", id: "sl", label: "LDH serum", unit: "U/L" },
    { type: "number", id: "uln", label: "Batas atas normal LDH serum (laboratorium)", unit: "U/L" },
  ],
  compute(v) {
    const pp = num(v, "pp"), sp = num(v, "sp"), pl = num(v, "pl"), sl = num(v, "sl"), uln = num(v, "uln");
    if ([pp, sp, pl, sl, uln].some((x) => x === null)) return incomplete("Isi kelima nilai laboratorium.");
    if (sp! <= 0 || sl! <= 0 || uln! <= 0) return invalid("Nilai serum dan batas atas harus lebih dari 0.");
    const r1 = pp! / sp!, r2 = pl! / sl!, lim = (2 / 3) * uln!;
    const c = [r1 > 0.5, r2 > 0.6, pl! > lim];
    const n = c.filter(Boolean).length;
    const steps = [
      `Rasio protein = ${fmt(pp!, 1)} ÷ ${fmt(sp!, 1)} = ${fmt(r1, 2)} ${c[0] ? "> 0,5 (terpenuhi)" : "≤ 0,5"}`,
      `Rasio LDH = ${fmt(pl!, 0)} ÷ ${fmt(sl!, 0)} = ${fmt(r2, 2)} ${c[1] ? "> 0,6 (terpenuhi)" : "≤ 0,6"}`,
      `LDH pleura ${fmt(pl!, 0)} vs ⅔ × ${fmt(uln!, 0)} = ${fmt(lim, 0)} → ${c[2] ? "lebih tinggi (terpenuhi)" : "tidak lebih tinggi"}`,
      `Eksudat bila ≥1 kriteria terpenuhi; terpenuhi ${n} dari 3`,
    ];
    const ex = n > 0;
    return {
      status: "ok", value: ex ? "Eksudat" : "Transudat", label: `${n} dari 3 kriteria terpenuhi`, tone: ex ? "warn" : "ok",
      lines: ex && n === 1 ? ["Hanya satu kriteria yang sedikit melewati batas: pada pasien dengan diuretik, kriteria Light dapat salah menggolongkan transudat sebagai eksudat."] : [],
      steps, copy: `Kriteria Light: ${ex ? "eksudat" : "transudat"} (rasio protein ${fmt(r1, 2)}, rasio LDH ${fmt(r2, 2)}, LDH pleura ${fmt(pl!, 0)} U/L vs ⅔ batas atas ${fmt(lim, 0)})`,
    };
  },
};

// Rasio PaO2/FiO2.
export const pfRatio: CalcDef = {
  slug: "pf-ratio",
  fields: [
    { type: "number", id: "pao2", label: "PaO₂", unit: "mmHg", hint: "Bila laboratorium memakai kPa, kalikan 7,5." },
    { type: "number", id: "fio2", label: "FiO₂", unit: "%", hint: "Persen 21–100 (udara ruangan 21)." },
  ],
  compute(v) {
    const pao2 = num(v, "pao2"), fio2 = num(v, "fio2");
    if (pao2 === null || fio2 === null) return incomplete("Isi PaO₂ dan FiO₂.");
    const e = outOfRange("PaO₂", pao2, 20, 700, "mmHg") ?? outOfRange("FiO₂", fio2, 21, 100, "%");
    if (e) return invalid(e + (fio2 <= 1 ? " Tulis FiO₂ dalam persen, misalnya 40." : ""));
    const pf = pao2 / (fio2 / 100);
    const [label, tone] = pf > 300 ? ["Di atas rentang ARDS (>300)", "ok"] : pf > 200 ? ["Rentang ringan (201–300)", "warn"] : pf > 100 ? ["Rentang sedang (101–200)", "bad"] : ["Rentang berat (≤100)", "bad"];
    return {
      status: "ok", value: fmt(pf, 0), unit: "mmHg", label, tone: tone as "ok" | "warn" | "bad",
      lines: ["Rentang derajat ARDS hanya berlaku bila kriteria Berlin lain terpenuhi. Pada kanul nasal/sungkup sederhana, FiO₂ hanya perkiraan."],
      steps: [`FiO₂ ${fmt(fio2, 0)}% = ${fmt(fio2 / 100, 2)}`, `P/F = ${fmt(pao2, 0)} ÷ ${fmt(fio2 / 100, 2)} = ${fmt(pf, 0)}`],
      copy: `Rasio P/F ${fmt(pf, 0)} (PaO₂ ${fmt(pao2, 0)} mmHg, FiO₂ ${fmt(fio2, 0)}%)`,
    };
  },
};
