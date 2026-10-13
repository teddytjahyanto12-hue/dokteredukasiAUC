import { incomplete, invalid, num, type CalcDef } from "../engine";

// KPSP: Pedoman Pelaksanaan SDIDTK di Tingkat Pelayanan Kesehatan Dasar (Kemenkes, revisi 2022), hal. 117–121:
// cara menghitung umur dan umur koreksi, pembulatan, pemilihan formulir, dan interpretasi jumlah jawaban "Ya".
export const FORM_KPSP = [3, 6, 9, 12, 15, 18, 21, 24, 30, 36, 42, 48, 54, 60, 66, 72];
const DOMAIN: [string, string][] = [["kasar", "Gerak kasar"], ["halus", "Gerak halus"], ["bicara", "Bicara dan bahasa"], ["sosial", "Sosialisasi dan kemandirian"]];

/** Selisih tanggal cara buku SDIDTK: pinjam 30 hari dan 12 bulan. */
function umur(lahir: string, periksa: string): [number, number, number] | null {
  const [y1, m1, d1] = lahir.split("-").map(Number), [y2, m2, d2] = periksa.split("-").map(Number);
  if (![y1, m1, d1, y2, m2, d2].every(Number.isFinite)) return null;
  let d = d2 - d1, m = m2 - m1, y = y2 - y1;
  if (d < 0) { d += 30; m -= 1; }
  if (m < 0) { m += 12; y -= 1; }
  return y < 0 ? null : [y, m, d];
}

export const kpsp: CalcDef = {
  slug: "kpsp",
  fields: [
    { type: "date", id: "lahir", label: "Tanggal lahir" },
    { type: "date", id: "periksa", label: "Tanggal pemeriksaan" },
    { type: "number", id: "ug", label: "Usia kehamilan saat lahir", unit: "minggu", optional: true, hint: "Diisi bila lahir <38 minggu; koreksi dipakai sampai umur 2 tahun." },
    { type: "number", id: "ya", label: "Jumlah jawaban 'Ya' pada formulir KPSP", unit: "dari 10", optional: true, hint: "Isi setelah memakai formulir KPSP resmi (Buku Bagan SDIDTK) sesuai umur yang ditampilkan." },
    { type: "heading", label: "Jumlah jawaban 'Tidak' per aspek (opsional)" },
    ...DOMAIN.map(([id, label]) => ({ type: "number" as const, id, label, unit: "butir", optional: true })),
  ],
  compute(v) {
    const lahir = v.lahir as string | undefined, periksa = v.periksa as string | undefined;
    if (!lahir || !periksa) return incomplete("Isi tanggal lahir dan tanggal pemeriksaan.");
    const u = umur(lahir, periksa);
    if (!u) return invalid("Tanggal pemeriksaan harus setelah tanggal lahir.");
    const [y, m] = u;
    let d = u[2];
    const steps = [`Umur kronologis: ${y} tahun ${m} bulan ${d} hari (selisih tanggal; meminjam 30 hari dan 12 bulan)`];
    const ug = num(v, "ug");
    let bulan = y * 12 + m;
    if (ug !== null) {
      if (ug < 22 || ug > 44) return invalid("Usia kehamilan harus 22–44 minggu.");
      if (ug < 38 && y < 2) {
        const w = 40 - ug;
        const kb = Math.floor(w / 4), kh = (w % 4) * 7;
        let dd = d - kh, mm = bulan - kb;
        if (dd < 0) { dd += 30; mm -= 1; }
        if (mm < 0) return invalid("Umur koreksi negatif: bayi belum mencapai umur cukup bulan.");
        steps.push(`Prematur: 40 − ${ug} = ${w} minggu = ${kb} bulan ${kh} hari; umur koreksi = ${mm} bulan ${dd} hari`);
        bulan = mm; d = dd;
      }
    }
    const bulat = d >= 16 ? bulan + 1 : bulan;
    steps.push(`Pembulatan: ${bulan} bulan ${d} hari → ${bulat} bulan (sisa ≥16 hari dibulatkan ke atas)`);
    if (bulat < 3) return invalid("KPSP dipakai untuk anak umur 3–72 bulan.");
    if (bulat > 72) return invalid("Umur di atas 72 bulan; KPSP dipakai untuk anak umur 3–72 bulan.");
    const form = [...FORM_KPSP].reverse().find((f) => f <= bulat)!;
    steps.push(`Formulir KPSP: umur ${form} bulan${form !== bulat ? " (kelompok umur lebih muda yang terdekat)" : ""}`);
    const ya = num(v, "ya");
    if (ya === null) {
      return { status: "ok", value: `${form} bulan`, unit: "formulir KPSP", label: "Pakai formulir KPSP ini, lalu isi jumlah jawaban 'Ya'", tone: "info", lines: ["Tanyakan 10 pertanyaan berurutan; jawaban 'Ya' bila anak bisa, pernah, sering, atau kadang-kadang melakukannya; 'Tidak' bila belum pernah, tidak pernah, atau ibu/pengasuh tidak tahu."], steps, copy: `KPSP: umur ${bulat} bulan, gunakan formulir ${form} bulan` };
    }
    if (!Number.isInteger(ya) || ya < 0 || ya > 10) return invalid("Jumlah jawaban 'Ya' harus bilangan bulat 0–10.");
    const tidak = DOMAIN.map(([id, l]) => [l, num(v, id)] as [string, number | null]).filter(([, n]) => n !== null && n > 0);
    const [label, tone, lines]: [string, "ok" | "warn" | "bad", string[]] = ya >= 9
      ? ["Sesuai (S)", "ok", ["Beri pujian, edukasi stimulasi sesuai umur, ikut Posyandu/BKB, pantau dengan buku KIA, skrining ulang tiap 3 bulan (<24 bulan) atau 6 bulan (24–72 bulan)."]]
      : ya >= 7
        ? ["Meragukan (M)", "warn", ["Ajari stimulasi dan intervensi dini pada aspek yang tertinggal, periksa kemungkinan penyakit, evaluasi ulang setelah 2 minggu intervensi intensif di rumah."]]
        : ["Kemungkinan penyimpangan (P)", "bad", ["Rujuk ke rumah sakit dengan menuliskan jenis dan jumlah penyimpangan (gerak kasar, gerak halus, bicara dan bahasa, sosialisasi dan kemandirian)."]];
    steps.push(`Jumlah 'Ya' = ${ya} → ${label}`);
    if (tidak.length) lines.push(`Jawaban 'Tidak': ${tidak.map(([l, n]) => `${l} ${n}`).join("; ")}.`);
    return {
      status: "ok", value: `${ya}/10`, unit: `formulir ${form} bulan`, label, tone, lines, steps,
      copy: `KPSP formulir ${form} bulan (umur ${bulat} bulan): ${ya} jawaban Ya, ${label}${tidak.length ? `; Tidak: ${tidak.map(([l, n]) => `${l} ${n}`).join(", ")}` : ""}`,
    };
  },
};
