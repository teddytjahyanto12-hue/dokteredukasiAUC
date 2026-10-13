import { incomplete, sel, scoreCalc, yes, type CalcDef, type Option } from "../engine";

// Modified Centor / McIsaac (McIsaac dkk., CMAJ 1998).
export const centor = scoreCalc({
  slug: "centor",
  title: "Centor Score",
  min: -1,
  max: 5,
  items: [
    { kind: "select", id: "age", label: "Usia", options: [{ value: "a", label: "3–14 tahun", points: 1 }, { value: "b", label: "15–44 tahun", points: 0 }, { value: "c", label: "≥45 tahun", points: -1 }] },
    { kind: "check", id: "fever", label: "Demam >38 °C", points: 1 },
    { kind: "check", id: "cough", label: "Tidak ada batuk", points: 1 },
    { kind: "check", id: "node", label: "Pembesaran/nyeri tekan KGB servikal anterior", points: 1 },
    { kind: "check", id: "tonsil", label: "Pembengkakan atau eksudat tonsil", points: 1 },
  ],
  bands: [
    { min: -1, max: 0, label: "Risiko GAS sekitar 1–2,5%", tone: "ok", advice: "Tidak perlu tes maupun antibiotik." },
    { min: 1, max: 1, label: "Risiko GAS sekitar 5–10%", tone: "ok", advice: "Tidak perlu tes maupun antibiotik." },
    { min: 2, max: 2, label: "Risiko GAS sekitar 11–17%", tone: "warn", advice: "Lakukan kultur/tes antigen cepat; antibiotik hanya bila positif." },
    { min: 3, max: 3, label: "Risiko GAS sekitar 28–35%", tone: "warn", advice: "Lakukan kultur/tes antigen cepat; antibiotik hanya bila positif." },
    { min: 4, max: 5, label: "Risiko GAS sekitar 51–53%", tone: "bad", advice: "Kultur/tes antigen cepat dan pertimbangkan antibiotik empiris." },
  ],
});

// NOSE (Stewart 2004) dengan kelas keparahan Lipan & Most 2013.
const NOSE_ITEMS = ["Hidung tersumbat atau terasa penuh", "Hidung buntu atau obstruksi", "Sulit bernapas lewat hidung", "Sulit tidur karena hidung", "Tidak cukup udara lewat hidung saat beraktivitas/olahraga"];
const scale = (n: number): Option[] => Array.from({ length: n + 1 }, (_, i) => ({ value: String(i), label: String(i), points: i }));
export const nose: CalcDef = {
  slug: "nose",
  fields: [
    { type: "heading", label: "Nilai keluhan 1 bulan terakhir", hint: "0 = tidak masalah, 1 = sangat ringan, 2 = sedang, 3 = cukup berat, 4 = berat." },
    ...NOSE_ITEMS.map((label, i) => ({ type: "select" as const, id: `q${i}`, label, options: scale(4), columns: 3 as const })),
  ],
  compute(v) {
    let raw = 0;
    for (let i = 0; i < NOSE_ITEMS.length; i++) {
      const s = sel(v, `q${i}`);
      if (s === null) return incomplete("Nilai kelima butir.");
      raw += Number(s);
    }
    const score = raw * 5;
    const [label, tone] = score === 0 ? ["Tanpa keluhan obstruksi", "ok"] : score <= 25 ? ["Ringan (5–25)", "ok"] : score <= 50 ? ["Sedang (30–50)", "warn"] : score <= 75 ? ["Berat (55–75)", "bad"] : ["Ekstrem (80–100)", "bad"];
    return {
      status: "ok", value: String(score), unit: "/ 100", label, tone: tone as "ok" | "warn" | "bad",
      lines: ["Skor ≥30 paling baik membedakan pasien dengan dan tanpa obstruksi hidung (Lipan & Most 2013)."],
      steps: [`Jumlah butir = ${raw}`, `Skor NOSE = ${raw} × 5 = ${score}`],
      copy: `Skor NOSE ${score}/100, ${label.toLowerCase()}`,
    };
  },
};

// Reflux Symptom Index (Belafsky dkk., J Voice 2002).
const RSI_ITEMS = [
  "Suara serak atau gangguan suara", "Sering berdeham", "Lendir tenggorok berlebih atau post-nasal drip", "Sulit menelan makanan, cairan, atau tablet",
  "Batuk setelah makan atau berbaring", "Sulit bernapas atau episode tersedak", "Batuk yang mengganggu", "Rasa mengganjal di tenggorok", "Rasa terbakar di dada, nyeri dada, atau asam naik",
];
export const rsi: CalcDef = {
  slug: "rsi",
  fields: [
    { type: "heading", label: "Nilai keluhan 1 bulan terakhir", hint: "0 = tidak ada, 5 = sangat berat." },
    ...RSI_ITEMS.map((label, i) => ({ type: "select" as const, id: `q${i}`, label, options: scale(5), columns: 3 as const })),
  ],
  compute(v) {
    let total = 0;
    for (let i = 0; i < RSI_ITEMS.length; i++) {
      const s = sel(v, `q${i}`);
      if (s === null) return incomplete("Nilai kesembilan butir.");
      total += Number(s);
    }
    const abn = total > 13;
    return {
      status: "ok", value: String(total), unit: "/ 45", label: abn ? "Mengarah refluks laringofaring (>13)" : "Tidak mengarah (≤13)", tone: abn ? "warn" : "ok",
      lines: ["RSI adalah kuesioner gejala; konfirmasi dengan pemeriksaan laring (mis. Reflux Finding Score)."],
      steps: [`Jumlah 9 butir = ${total}`, `Ambang abnormal: >13`],
      copy: `Reflux Symptom Index ${total}/45, ${abn ? "mengarah refluks laringofaring" : "tidak mengarah refluks laringofaring"}`,
    };
  },
};

// Kriteria Paradise untuk tonsilektomi (Paradise 1984; AAO-HNS 2019).
const FREQ: Option[] = [
  { value: "none", label: "Di bawah ambang" },
  { value: "7", label: "≥7 episode dalam 1 tahun terakhir" },
  { value: "5", label: "≥5 episode per tahun selama 2 tahun" },
  { value: "3", label: "≥3 episode per tahun selama 3 tahun" },
];
export const paradise: CalcDef = {
  slug: "paradise",
  fields: [
    { type: "select", id: "freq", label: "Frekuensi episode nyeri tenggorok", options: FREQ, columns: 1 },
    { type: "check", id: "doc", label: "Setiap episode tercatat dengan minimal satu: suhu >38,3 °C, adenopati servikal, eksudat tonsil, atau tes GAS positif" },
  ],
  compute(v) {
    const f = sel(v, "freq");
    if (!f) return incomplete("Pilih frekuensi episode.");
    const meet = f !== "none" && yes(v, "doc");
    return {
      status: "ok", value: meet ? "Memenuhi" : "Belum", label: meet ? "Memenuhi kriteria Paradise" : "Belum memenuhi kriteria Paradise", tone: meet ? "warn" : "ok",
      lines: [meet ? "Pasien dapat dipertimbangkan tonsilektomi; observasi (watchful waiting) tetap merupakan pilihan." : f === "none" ? "Frekuensi di bawah ambang." : "Frekuensi memenuhi, tetapi dokumentasi tiap episode belum lengkap."],
      steps: [`Frekuensi: ${FREQ.find((x) => x.value === f)!.label}`, `Dokumentasi tiap episode: ${yes(v, "doc") ? "ya" : "tidak"}`],
      copy: `Kriteria Paradise ${meet ? "terpenuhi" : "belum terpenuhi"} (${FREQ.find((x) => x.value === f)!.label.toLowerCase()})`,
    };
  },
};

// STOP-BANG (Chung dkk., Anesthesiology 2008).
export const stopbang = scoreCalc({
  slug: "stop-bang",
  title: "STOP-BANG",
  max: 8,
  items: [
    { kind: "check", id: "s", label: "Snoring: mendengkur keras", points: 1 },
    { kind: "check", id: "t", label: "Tired: sering lelah/mengantuk siang hari", points: 1 },
    { kind: "check", id: "o", label: "Observed: henti napas/tersedak saat tidur yang disaksikan", points: 1 },
    { kind: "check", id: "p", label: "Pressure: hipertensi (atau dalam terapi)", points: 1 },
    { kind: "check", id: "b", label: "BMI >35 kg/m²", points: 1 },
    { kind: "check", id: "a", label: "Age: usia >50 tahun", points: 1 },
    { kind: "check", id: "n", label: "Neck: lingkar leher >40 cm", points: 1 },
    { kind: "check", id: "g", label: "Gender: laki-laki", points: 1 },
  ],
  bands: [
    { min: 0, max: 2, label: "Risiko OSA rendah (0–2)", tone: "ok" },
    { min: 3, max: 4, label: "Risiko OSA sedang (3–4)", tone: "warn" },
    { min: 5, max: 8, label: "Risiko OSA tinggi (5–8)", tone: "bad", advice: "Pertimbangkan polisomnografi dan antisipasi jalan napas sulit pada anestesi." },
  ],
});

