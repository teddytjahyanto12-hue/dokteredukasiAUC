import { fmt, incomplete, invalid, num, outOfRange, sel, yes, type CalcDef } from "../engine";

// Hiponatremia dewasa: Clinical practice guideline on diagnosis and treatment of hyponatraemia (Spasovski dkk.,
// Eur J Endocrinol 2014;170:G1-47): klasifikasi 6.1 (hal. G17), gejala Tabel 5 (G10), rekomendasi 7.1–7.4 (G27–G33),
// rumus Adrogué–Madias dan fraksi cairan tubuh (G28).
const TBW: Record<string, number> = { L: 0.6, P: 0.5, Lt: 0.5, Pt: 0.45 };

export const natrium: CalcDef = {
  slug: "koreksi-natrium",
  fields: [
    { type: "number", id: "na", label: "Natrium serum", unit: "mmol/L" },
    { type: "number", id: "bb", label: "Berat badan", unit: "kg" },
    { type: "select", id: "sex", label: "Jenis kelamin", options: [{ value: "L", label: "Laki-laki" }, { value: "P", label: "Perempuan" }] },
    { type: "check", id: "lansia", label: "Lansia", hint: "Fraksi cairan tubuh 0,5 (laki-laki) atau 0,45 (perempuan)." },
    { type: "select", id: "gejala", label: "Gejala yang dapat disebabkan hiponatremia (Tabel 5)", columns: 1, options: [
      { value: "berat", label: "Berat", hint: "Muntah, distres kardiorespirasi, somnolen dalam yang abnormal, kejang, koma (GCS ≤8)." },
      { value: "sedang", label: "Sedang", hint: "Mual tanpa muntah, bingung, nyeri kepala." },
      { value: "tidak", label: "Tidak ada gejala berat atau sedang" },
    ] },
  ],
  compute(v) {
    const na = num(v, "na"), bb = num(v, "bb"), sex = sel(v, "sex"), g = sel(v, "gejala");
    if (na === null || bb === null || !sex || !g) return incomplete("Isi natrium, berat badan, jenis kelamin, dan gejala.");
    const e = outOfRange("Natrium", na, 90, 160, "mmol/L") ?? outOfRange("Berat badan", bb, 20, 250, "kg");
    if (e) return invalid(e);
    if (na >= 135) return { status: "ok", value: fmt(na, 0), unit: "mmol/L", label: "Bukan hiponatremia (≥135 mmol/L)", tone: "ok", lines: ["Pedoman Eropa 2014: hiponatremia bila natrium serum <135 mmol/L."], steps: [`Natrium ${fmt(na, 0)} ≥135 mmol/L`], copy: `Natrium ${fmt(na, 0)} mmol/L: bukan hiponatremia` };
    const derajat = na >= 130 ? "ringan (130–135)" : na >= 125 ? "sedang (125–129)" : "berat/profound (<125)";
    const f = TBW[sex + (yes(v, "lansia") ? "t" : "")];
    const tbw = f * bb;
    const d3 = (513 - na) / (tbw + 1), d09 = (154 - na) / (tbw + 1);
    const steps = [
      `Derajat biokimia: ${derajat} mmol/L`,
      `Cairan tubuh total = ${fmt(f, 2)} × ${fmt(bb, 1)} kg = ${fmt(tbw, 1)} L`,
      `Adrogué–Madias, perubahan Na per 1 L infus = (Na infus − Na serum) ÷ (cairan tubuh + 1)`,
      `NaCl 3% (Na 513 mmol/L): (513 − ${fmt(na, 0)}) ÷ ${fmt(tbw + 1, 1)} = ${fmt(d3, 1)} mmol/L per liter`,
      `NaCl 0,9% (Na 154 mmol/L): (154 − ${fmt(na, 0)}) ÷ ${fmt(tbw + 1, 1)} = ${fmt(d09, 1)} mmol/L per liter`,
    ];
    const batas = "Batas kenaikan: total 10 mmol/L pada 24 jam pertama dan tambahan 8 mmol/L tiap 24 jam berikutnya sampai natrium 130 mmol/L.";
    const est = `Estimasi: NaCl 3% sekitar ${fmt(1000 / d3, 0)} mL untuk menaikkan 1 mmol/L (perkiraan linear; kenaikan nyata dapat lebih besar dari hitungan).`;
    if (g === "berat") {
      return {
        status: "ok", value: "150 mL", unit: "NaCl 3% dalam 20 menit", label: `Hiponatremia ${derajat} dengan gejala berat`, tone: "bad",
        lines: [
          "Jam pertama: NaCl 3% 150 mL IV dalam 20 menit; periksa natrium setelah 20 menit sambil memberi 150 mL berikutnya dalam 20 menit. Ulangi dua kali atau sampai natrium naik 5 mmol/L.",
          `Pada komposisi tubuh yang sangat menyimpang, pertimbangkan dosis berbasis berat 2 mL/kg (${fmt(2 * bb, 0)} mL).`,
          "Bila gejala membaik setelah kenaikan 5 mmol/L: hentikan NaCl 3%, pertahankan jalur IV dengan NaCl 0,9% volume sekecil mungkin, mulai terapi sesuai penyebab.",
          "Bila gejala tidak membaik: lanjutkan NaCl 3% untuk kenaikan tambahan 1 mmol/L per jam; hentikan bila gejala membaik, natrium naik total 10 mmol/L, atau mencapai 130 mmol/L.",
          batas, est,
        ],
        steps, copy: `Hiponatremia ${derajat} (Na ${fmt(na, 0)}) gejala berat: NaCl 3% 150 mL/20 menit, ulang sampai Na naik 5 mmol/L; batas 10 mmol/L/24 jam pertama (Pedoman Eropa 2014)`,
      };
    }
    if (g === "sedang") {
      return {
        status: "ok", value: "150 mL", unit: "NaCl 3% sekali dalam 20 menit", label: `Hiponatremia ${derajat} dengan gejala sedang`, tone: "warn",
        lines: [
          "NaCl 3% 150 mL IV sekali dalam 20 menit; target kenaikan 5 mmol/L per 24 jam; periksa natrium setelah 1, 6, dan 12 jam.",
          "Mulai penilaian diagnostik segera, hentikan obat/faktor pemicu bila mungkin, dan beri terapi sesuai penyebab.",
          batas, est,
        ],
        steps, copy: `Hiponatremia ${derajat} (Na ${fmt(na, 0)}) gejala sedang: NaCl 3% 150 mL sekali/20 menit, target +5 mmol/L/24 jam (Pedoman Eropa 2014)`,
      };
    }
    return {
      status: "ok", value: fmt(na, 0), unit: "mmol/L", label: `Hiponatremia ${derajat} tanpa gejala berat/sedang`, tone: na < 130 ? "warn" : "info",
      lines: [
        "Tidak ada rekomendasi NaCl 3% rutin: hentikan cairan/obat pemicu yang tidak esensial dan beri terapi sesuai penyebab (rekomendasi 7.4).",
        na >= 130 ? "Hiponatremia ringan: tidak dianjurkan terapi yang semata-mata bertujuan menaikkan natrium." : "Derajat sedang atau berat: hindari kenaikan >10 mmol/L pada 24 jam pertama dan >8 mmol/L tiap 24 jam berikutnya; periksa natrium tiap 6 jam sampai stabil.",
      ],
      steps, copy: `Hiponatremia ${derajat} (Na ${fmt(na, 0)}) tanpa gejala berat/sedang: terapi sesuai penyebab; batas kenaikan 10 mmol/L/24 jam pertama (Pedoman Eropa 2014)`,
    };
  },
};

// Hipokalemia dewasa: Kardalas dkk., Endocr Connect 2018;7:R135-46 (ulasan), Tabel 3 dan teks bagian terapi.
export const kalium: CalcDef = {
  slug: "koreksi-kalium",
  fields: [
    { type: "number", id: "k", label: "Kalium serum", unit: "mEq/L" },
    { type: "heading", label: "Kondisi yang mengarahkan ke pemberian intravena" },
    { type: "check", id: "gejala", label: "Bergejala atau ada perubahan EKG akibat hipokalemia" },
    { type: "check", id: "gi", label: "Mual/muntah berat atau gangguan abdomen sehingga tidak dapat per oral" },
    { type: "check", id: "ginjal", label: "Gangguan ginjal berat atau dialisis" },
  ],
  compute(v) {
    const k = num(v, "k");
    if (k === null) return incomplete("Isi kadar kalium serum.");
    const e = outOfRange("Kalium", k, 1, 8, "mEq/L");
    if (e) return invalid(e);
    if (k >= 3.5) return { status: "ok", value: fmt(k, 1), unit: "mEq/L", label: k <= 5 ? "Kalium normal (3,5–5,0)" : "Kalium di atas normal (>5,0)", tone: k <= 5 ? "ok" : "warn", lines: ["Rentang normal kalium 3,5–5,0 mEq/L (Kardalas 2018)."], steps: [`Kalium ${fmt(k, 1)} mEq/L`], copy: `Kalium ${fmt(k, 1)} mEq/L` };
    const berat = k < 2.5 || yes(v, "gejala");
    const derajat = berat ? "berat (<2,5 mEq/L atau bergejala)" : k < 3 ? "sedang (2,5–2,9 mEq/L)" : "ringan (3,0–3,4 mEq/L)";
    const iv = berat || yes(v, "gi");
    const steps = [`Kalium ${fmt(k, 1)} mEq/L${yes(v, "gejala") ? " dengan gejala/perubahan EKG" : ""} → hipokalemia ${derajat}`, `Jalur: ${iv ? "intravena" : "oral"}`];
    const lines: string[] = [];
    let value: string, unit: string;
    if (berat) {
      value = "40 mmol"; unit = "KCl dalam 1 L NaCl 0,9%";
      lines.push("Kecepatan standar 10 mmol/jam (sekitar 4 jam per 40 mmol); kecepatan maksimum 20 mmol/jam.", "Pantau EKG kontinu dan ukur kalium berkala.", "Periksa magnesium; bila hipomagnesemia, beri MgSO4 50% 4 mL (8 mmol) dalam 10 mL NaCl 0,9% selama 20 menit sebelum infus KCl pertama, lalu lanjutkan penggantian magnesium.");
    } else if (k < 3) {
      value = iv ? "100 mmol/hari" : "96 mmol/hari"; unit = iv ? "kalium IV" : "kalium oral";
      lines.push("Tabel 3: kalium oral 96 mmol/hari atau infus IV 100 mmol/hari; pantau kalium harian dan sesuaikan.");
    } else {
      value = iv ? "75 mmol/hari" : "72 mmol/hari"; unit = iv ? "kalium IV" : "kalium oral";
      lines.push("Tabel 3: kalium oral 72 mmol/hari atau infus IV 75 mmol/hari; pantau kalium harian dan sesuaikan.");
    }
    lines.push("Setiap penurunan kalium 1 mEq/L mencerminkan defisit sekitar 200–400 mEq; perkiraan ini dapat lebih atau kurang dari defisit sebenarnya.", "EKG dianjurkan untuk semua pasien hipokalemia.");
    if (yes(v, "ginjal")) lines.push("Gangguan ginjal: ganti kalium dengan sangat hati-hati dan libatkan tim ginjal bila pasien dialisis atau gangguan ginjal berat.");
    return {
      status: "ok", value, unit, label: `Hipokalemia ${derajat}`, tone: berat ? "bad" : "warn", lines, steps,
      copy: `Hipokalemia ${derajat} (K ${fmt(k, 1)} mEq/L): ${value} ${unit} (Kardalas 2018)`,
    };
  },
};
