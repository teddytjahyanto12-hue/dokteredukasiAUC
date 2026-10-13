import { fmt, incomplete, invalid, num, outOfRange, sel, type CalcDef } from "../engine";

// Tinggi fundus uteri: PPK FKTP KMK HK.01.07/MENKES/1186/2022 Tabel 14.1 (hal. 709–710).
// Taksiran berat janin rumus Johnson-Toshach seperti dikutip Torloni dkk., Sao Paulo Med J 2008 (presentasi kepala).
const PALPASI: [number, string][] = [[12, "teraba di atas simfisis pubis"], [16, "di antara simfisis pubis dan umbilikus"], [20, "setinggi umbilikus"], [28, "antara umbilikus dan prosesus xifoideus"], [36, "pada prosesus xifoideus"]];
const K: Record<string, [number, string]> = { minus: [13, "kepala di station minus (belum masuk panggul)"], nol: [12, "kepala di station 0"], plus: [11, "kepala di station plus"] };

export const tfu: CalcDef = {
  slug: "tfu",
  fields: [
    { type: "number", id: "tfu", label: "Tinggi fundus uteri (pita ukur)", unit: "cm" },
    { type: "number", id: "ug", label: "Usia kehamilan", unit: "minggu", optional: true, hint: "Untuk membandingkan TFU dengan Tabel 14.1 (20–36 minggu)." },
    { type: "select", id: "station", label: "Posisi kepala janin (untuk taksiran berat janin)", columns: 1, optional: true, hint: "Rumus Johnson-Toshach dipakai pada presentasi kepala.", options: [
      { value: "minus", label: "Station minus (kepala belum masuk panggul), K = 13" },
      { value: "nol", label: "Station 0, K = 12" },
      { value: "plus", label: "Station plus, K = 11" },
    ] },
  ],
  compute(v) {
    const t = num(v, "tfu"), ug = num(v, "ug"), st = sel(v, "station");
    if (t === null) return incomplete("Isi tinggi fundus uteri dalam cm.");
    const e = outOfRange("Tinggi fundus uteri", t, 10, 50, "cm") ?? (ug !== null ? outOfRange("Usia kehamilan", ug, 8, 44, "minggu") : null);
    if (e) return invalid(e);
    if (ug !== null && !Number.isInteger(ug)) return invalid("Usia kehamilan diisi dalam minggu penuh (bilangan bulat).");
    if (ug === null && !st) return incomplete("Isi usia kehamilan dan/atau pilih posisi kepala janin.");
    const steps: string[] = [];
    const lines: string[] = [];
    let label = "Tinggi fundus uteri", tone: "ok" | "warn" | "info" = "info", value = fmt(t, 1), unit = "cm";
    if (ug !== null) {
      const pal = PALPASI.find(([w]) => w === ug);
      // Tabel 14.1 mencantumkan 20, 22–27, 28, 29–35, dan 36 minggu (21 minggu tidak tercantum).
      if (ug >= 20 && ug <= 36 && ug !== 21) {
        const lo = ug - 2, hi = ug + 2;
        steps.push(`Tabel 14.1: usia ${fmt(ug, 0)} minggu → TFU harapan (${fmt(ug, 0)} ± 2) = ${fmt(lo, 0)}–${fmt(hi, 0)} cm`);
        if (t < lo) { label = "TFU lebih kecil dari usia kehamilan"; tone = "warn"; }
        else if (t > hi) { label = "TFU lebih besar dari usia kehamilan"; tone = "warn"; }
        else { label = "TFU sesuai usia kehamilan"; tone = "ok"; }
        steps.push(`TFU terukur ${fmt(t, 1)} cm → ${label.toLowerCase()}`);
        if (tone === "warn") lines.push("TFU di luar rentang harapan Tabel 14.1; evaluasi lebih lanjut sesuai penilaian klinis.");
      } else {
        steps.push(`Tabel 14.1 memuat ukuran sentimeter untuk 20, 22–27, 28, 29–35, dan 36 minggu; usia ${fmt(ug, 0)} minggu tidak tercantum`);
        lines.push("Perbandingan sentimeter tidak dilakukan untuk usia yang tidak tercantum di Tabel 14.1.");
      }
      if (pal) lines.push(`Palpasi pada ${pal[0]} minggu: fundus ${pal[1]} (Tabel 14.1).`);
    }
    if (st) {
      const [k, ket] = K[st];
      const tbj = 155 * (t - k);
      steps.push(`Johnson-Toshach: TBJ = 155 × (TFU − K) = 155 × (${fmt(t, 1)} − ${k}) = ${fmt(tbj, 0)} g (${ket})`);
      lines.unshift(`Taksiran berat janin (Johnson-Toshach): ${fmt(tbj, 0)} g.`);
      lines.push("Pada studi asal (1954), taksiran berada dalam ±353 g dari berat lahir pada 68% kasus; ketepatan menurun antara lain pada obesitas ibu.");
      if (ug === null) { value = fmt(tbj, 0); unit = "g (taksiran berat janin)"; label = "Taksiran berat janin (Johnson-Toshach)"; }
    }
    return {
      status: "ok", value, unit, label, tone, lines, steps,
      copy: `TFU ${fmt(t, 1)} cm${ug !== null ? ` pada ${fmt(ug, 0)} minggu: ${label}` : ""}${st ? `; TBJ Johnson-Toshach ${fmt(155 * (t - K[st][0]), 0)} g` : ""}`,
    };
  },
};
