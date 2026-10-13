import { fmt, incomplete, invalid, num, outOfRange, sel, yes, type CalcDef } from "../engine";

// Formula balita gizi buruk: Pedoman Pencegahan dan Tatalaksana Gizi Buruk pada Balita, Kemenkes 2019
// Tabel 3 (hal. 43), Tabel 17 (hal. 60), Tabel 18 (hal. 64), dan teks Fase Transisi (hal. 62).

// Tabel 3: BB (kg) → min/kali, maks/kali (6 kali sehari), min/hari (150 ml/kg), maks/hari (220 ml/kg).
export const F100_TABEL3: [number, number, number, number, number][] = [
  [2.0, 50, 75, 300, 440], [2.2, 55, 80, 330, 485], [2.4, 60, 90, 360, 530], [2.6, 65, 95, 390, 570], [2.8, 70, 105, 420, 615],
  [3.0, 75, 110, 450, 660], [3.2, 80, 115, 480, 705], [3.4, 85, 125, 510, 750], [3.6, 90, 130, 540, 790], [3.8, 95, 140, 570, 835],
  [4.0, 100, 145, 600, 880], [4.2, 105, 155, 630, 925], [4.4, 110, 160, 660, 970], [4.6, 115, 170, 690, 1015], [4.8, 120, 175, 720, 1055],
  [5.0, 125, 185, 750, 1100], [5.2, 130, 190, 780, 1145], [5.4, 135, 200, 810, 1200], [5.6, 140, 205, 840, 1230], [5.8, 145, 215, 870, 1275],
  [6.0, 150, 220, 900, 1320], [6.2, 155, 230, 930, 1365], [6.4, 160, 235, 960, 1410], [6.6, 165, 240, 990, 1450], [6.8, 170, 250, 1020, 1500],
  [7.0, 175, 255, 1050, 1540], [7.2, 180, 265, 1080, 1585], [7.4, 185, 270, 1110, 1630], [7.6, 190, 280, 1140, 1670], [7.8, 195, 285, 1170, 1715],
  [8.0, 200, 295, 1200, 1760], [8.2, 205, 300, 1230, 1805], [8.4, 210, 310, 1260, 1850], [8.6, 215, 315, 1290, 1895], [8.8, 220, 325, 1320, 1935],
  [9.0, 225, 330, 1350, 1980], [9.2, 230, 335, 1380, 2025], [9.4, 235, 345, 1410, 2070], [9.6, 240, 350, 1440, 2110], [9.8, 245, 360, 1470, 2155],
  [10.0, 250, 365, 1500, 2200],
];
// Tabel 17 (tanpa edema): hari rawat → frekuensi, ml/kgBB/kali, kali/hari.
const T17: Record<string, [string, number, number]> = { "1": ["setiap 2 jam (12 kali)", 11, 12], "3": ["setiap 3 jam (8 kali)", 16, 8], "6": ["setiap 4 jam (6 kali)", 22, 6] };
const r5 = (x: number) => Math.round(x / 5) * 5;

export const giziBuruk: CalcDef = {
  slug: "gizi-buruk",
  fields: [
    { type: "number", id: "bb", label: "Berat badan saat ini", unit: "kg" },
    { type: "select", id: "fase", label: "Fase perawatan", columns: 3, options: [
      { value: "stab", label: "Stabilisasi (F-75)" }, { value: "trans", label: "Transisi" }, { value: "rehab", label: "Rehabilitasi (F-100)" },
    ] },
    { type: "select", id: "hari", label: "Hari perawatan fase stabilisasi", optional: true, columns: 3, hint: "Diisi untuk fase stabilisasi.", options: [
      { value: "1", label: "Hari 1–2" }, { value: "3", label: "Hari 3–5" }, { value: "6", label: "Hari 6 dan seterusnya" },
    ] },
    { type: "check", id: "edema", label: "Edema berat", hint: "Fase stabilisasi: cairan 100 ml/kgBB/hari." },
  ],
  compute(v) {
    const bb = num(v, "bb"), fase = sel(v, "fase");
    if (bb === null || !fase) return incomplete("Isi berat badan dan fase perawatan.");
    const e = outOfRange("Berat badan", bb, 1, 30, "kg");
    if (e) return invalid(e);
    if (fase === "stab") {
      if (yes(v, "edema")) {
        const total = 100 * bb;
        return {
          status: "ok", value: fmt(total, 0), unit: "ml/hari", label: "F-75 fase stabilisasi, edema berat", tone: "warn",
          lines: ["Tabel 17 pedoman berlaku untuk balita tanpa edema; volume per kali pada edema berat tidak diatur dalam tabel tersebut.", "Energi 80–100 kkal/kgBB/hari; protein 1–1,5 g/kgBB/hari."],
          steps: [`Cairan edema berat: 100 ml × ${fmt(bb, 1)} kg = ${fmt(total, 0)} ml/hari`],
          copy: `Gizi buruk fase stabilisasi (edema berat), BB ${fmt(bb, 1)} kg: F-75 total ${fmt(total, 0)} ml/hari (100 ml/kgBB/hari)`,
        };
      }
      const h = sel(v, "hari");
      if (!h) return incomplete("Pilih hari perawatan fase stabilisasi.");
      const [frek, perKg, kali] = T17[h];
      const per = perKg * bb;
      return {
        status: "ok", value: fmt(per, 0), unit: "ml/kali", label: `F-75 ${frek}`, tone: "info",
        lines: [
          `Target harian 130 ml/kgBB = ${fmt(130 * bb, 0)} ml/hari.`,
          `Energi 80–100 kkal/kgBB/hari (${fmt(80 * bb, 0)}–${fmt(100 * bb, 0)} kkal); protein 1–1,5 g/kgBB/hari.`,
          "Pakai NGT bila F-75 yang dihabiskan kurang dari 80% dalam dua kali pemberian.",
        ],
        steps: [`Tabel 17: ${perKg} ml/kgBB/kali, ${frek}`, `${perKg} × ${fmt(bb, 1)} kg = ${fmt(per, 0)} ml/kali; × ${kali} kali = ${fmt(per * kali, 0)} ml/hari`],
        copy: `Gizi buruk fase stabilisasi, BB ${fmt(bb, 1)} kg: F-75 ${fmt(per, 0)} ml ${frek} (130 ml/kgBB/hari)`,
      };
    }
    if (fase === "trans") {
      return {
        status: "ok", value: fmt(150 * bb, 0), unit: "ml/hari", label: "Fase transisi: F-75 ke F-100 bertahap 2–3 hari", tone: "info",
        lines: [
          "Hari 1–2: F-75 diganti F-100 dengan volume sama seperti pemberian F-75 terakhir.",
          "Hari 3: F-100 dinaikkan 10 ml per kali pemberian sampai balita tidak mampu menghabiskan (biasanya sekitar 200 ml/kgBB/hari).",
          `Tabel 18 fase transisi: energi 100–150 kkal/kgBB/hari (${fmt(100 * bb, 0)}–${fmt(150 * bb, 0)} kkal), protein 2–3 g/kgBB/hari, cairan 150 ml/kgBB/hari.`,
        ],
        steps: [`Cairan 150 ml × ${fmt(bb, 1)} kg = ${fmt(150 * bb, 0)} ml/hari`, `Batas sekitar 200 ml × ${fmt(bb, 1)} kg = ${fmt(200 * bb, 0)} ml/hari`],
        copy: `Gizi buruk fase transisi, BB ${fmt(bb, 1)} kg: cairan 150 ml/kgBB/hari (${fmt(150 * bb, 0)} ml); F-100 naik 10 ml/kali mulai hari ke-3`,
      };
    }
    const row = F100_TABEL3.find((r) => Math.abs(r[0] - bb) < 1e-9);
    const [mn, mx, dmn, dmx] = row ? row.slice(1) : [r5((150 * bb) / 6), r5((220 * bb) / 6), 150 * bb, 220 * bb];
    return {
      status: "ok", value: `${fmt(mn, 0)}–${fmt(mx, 0)}`, unit: "ml/kali (6 kali/hari)", label: `F-100 ${fmt(dmn, 0)}–${fmt(dmx, 0)} ml/hari`, tone: "info",
      lines: [
        row ? "Nilai sesuai Tabel 3 pedoman (BB 2,0–10,0 kg per 0,2 kg)." : "BB tidak tercantum di Tabel 3: dihitung 150–220 ml/kgBB/hari dibagi 6, dibulatkan ke kelipatan 5 ml.",
        "Tabel 18 fase rehabilitasi: energi 150–220 kkal/kgBB/hari, protein 4–6 g/kgBB/hari, cairan 150–200 ml/kgBB/hari. F-100 mengandung 100 kkal/100 ml.",
      ],
      steps: [`Harian: 150–220 ml × ${fmt(bb, 1)} kg = ${fmt(150 * bb, 0)}–${fmt(220 * bb, 0)} ml/hari`, `Per kali (6 kali sehari): ÷ 6, dibulatkan ke kelipatan 5 ml = ${fmt(mn, 0)}–${fmt(mx, 0)} ml`],
      copy: `Gizi buruk fase rehabilitasi, BB ${fmt(bb, 1)} kg: F-100 ${fmt(mn, 0)}–${fmt(mx, 0)} ml/kali, 6 kali/hari (${fmt(dmn, 0)}–${fmt(dmx, 0)} ml/hari)`,
    };
  },
};
