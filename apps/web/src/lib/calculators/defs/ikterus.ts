import { fmt, incomplete, invalid, num, outOfRange, yes, type CalcDef } from "../engine";
import { AAP_BILI } from "../data/aap-bili-2022";

// Ikterus neonatus ≥35 minggu: AAP 2022 (Kemper dkk., Pediatrics 2022) Gambar 2–6 dan Tabel Suplemen 1–4.
const FR: [id: string, label: string][] = [
  ["alb", "Albumin <3,0 g/dL"],
  ["hemo", "Penyakit hemolitik isoimun, defisiensi G6PD, atau kondisi hemolitik lain"],
  ["sepsis", "Sepsis"],
  ["instab", "Ketidakstabilan klinis bermakna dalam 24 jam terakhir"],
];

function threshold(kind: "photo" | "exch", rf: boolean, ga: number, hour: number): number {
  const t = AAP_BILI[kind][rf ? "rf" : "no"];
  const keys = Object.keys(t).map(Number).sort((a, b) => a - b);
  const g = Math.min(Math.max(ga, keys[0]), keys[keys.length - 1]);
  const arr = t[g];
  return arr[Math.min(hour, arr.length) - 1];
}

export const ikterus: CalcDef = {
  slug: "ikterus",
  fields: [
    { type: "number", id: "ga", label: "Usia gestasi saat lahir", unit: "minggu", hint: "Untuk bayi ≥35 minggu. Isi minggu penuh." },
    { type: "number", id: "jam", label: "Umur bayi", unit: "jam", hint: "1–359 jam (sampai hari ke-14)." },
    { type: "number", id: "tsb", label: "Bilirubin serum total (TSB)", unit: "mg/dL", hint: "Jangan kurangi dengan bilirubin direk/terkonjugasi." },
    { type: "heading", label: "Faktor risiko neurotoksisitas hiperbilirubinemia (selain usia gestasi)" },
    ...FR.map(([id, label]) => ({ type: "check" as const, id, label })),
  ],
  compute(v) {
    const ga = num(v, "ga"), jam = num(v, "jam"), tsb = num(v, "tsb");
    if (ga === null || jam === null || tsb === null) return incomplete("Isi usia gestasi, umur dalam jam, dan TSB.");
    if (!Number.isInteger(ga) || !Number.isInteger(jam)) return invalid("Usia gestasi (minggu) dan umur (jam) diisi bilangan bulat.");
    const e = outOfRange("Usia gestasi", ga, 35, 44, "minggu") ?? outOfRange("Umur", jam, 1, 359, "jam") ?? outOfRange("TSB", tsb, 0.1, 50, "mg/dL");
    if (e) return invalid(e);
    const rf = FR.some(([id]) => yes(v, id));
    const foto = threshold("photo", rf, ga, jam);
    const tukar = threshold("exch", rf, ga, jam);
    const eskalasi = Math.round((tukar - 2) * 10) / 10;
    const hari = Math.floor(jam / 24), sisa = jam % 24;
    const steps = [
      `Umur ${jam} jam = hari ke-${hari} jam ke-${sisa}; usia gestasi ${ga} minggu; faktor risiko ${rf ? "ada" : "tidak ada"}`,
      `Ambang fototerapi (Tabel Suplemen ${rf ? "2" : "1"}): ${fmt(foto, 1)} mg/dL`,
      `Ambang transfusi tukar (Tabel Suplemen ${rf ? "4" : "3"}): ${fmt(tukar, 1)} mg/dL; ambang eskalasi perawatan = ${fmt(tukar, 1)} − 2 = ${fmt(eskalasi, 1)} mg/dL`,
    ];
    let label: string, tone: "ok" | "warn" | "bad";
    if (tsb >= tukar) { label = "Di atas ambang transfusi tukar"; tone = "bad"; }
    else if (tsb >= eskalasi) { label = "Di atas ambang eskalasi perawatan"; tone = "bad"; }
    else if (tsb >= foto) { label = "Di atas ambang fototerapi"; tone = "warn"; }
    else { label = `Di bawah ambang fototerapi (selisih ${fmt(foto - tsb, 1)} mg/dL)`; tone = "ok"; }
    const lines = [
      `Ambang fototerapi ${fmt(foto, 1)}; eskalasi ${fmt(eskalasi, 1)}; transfusi tukar ${fmt(tukar, 1)} mg/dL.`,
      ...(jam < 24 && tsb >= foto ? ["Bayi <24 jam dengan TSB ≥ ambang fototerapi kemungkinan mengalami proses hemolitik dan perlu dievaluasi (AAP 2022)."] : []),
      "Ambang AAP 2022 berbasis opini ahli dan tidak disusun untuk negara berpendapatan rendah-menengah; sesuaikan dengan pedoman dan fasilitas setempat.",
    ];
    return {
      status: "ok", value: fmt(tsb, 1), unit: "mg/dL", label, tone, lines, steps,
      copy: `Ikterus (AAP 2022) UG ${ga} mgg, ${jam} jam, faktor risiko ${rf ? "ada" : "tidak ada"}: TSB ${fmt(tsb, 1)} mg/dL; ambang fototerapi ${fmt(foto, 1)}, eskalasi ${fmt(eskalasi, 1)}, transfusi tukar ${fmt(tukar, 1)} mg/dL. ${label}`,
    };
  },
};
