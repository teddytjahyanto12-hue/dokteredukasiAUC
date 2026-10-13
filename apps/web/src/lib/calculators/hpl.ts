// HPL (hari perkiraan lahir) dan usia kehamilan. Sumber: ACOG Committee Opinion 700 (2017)
// "Methods for Estimating the Due Date" dan ACOG Committee Opinion 579 (2013) "Definition of Term Pregnancy".
// Semua tanggal diproses sebagai tanggal kalender UTC (format YYYY-MM-DD) agar bebas zona waktu.

export type HplMethod = "hpht" | "usg" | "embrio";

export type HplInput =
  | { method: "hpht"; hpht: string; today: string }
  | { method: "usg"; usgDate: string; usgWeeks: number; usgDays: number; today: string }
  | { method: "embrio"; transferDate: string; embryoDay: 3 | 5; today: string };

export type HplResult = {
  hpl: string; // YYYY-MM-DD
  conception: string; // tanggal acuan setara HPHT (HPL − 280 hari)
  gaDays: number; // usia kehamilan pada tanggal "today", dalam hari
  gaWeeks: number;
  gaRemDays: number;
  trimester: 1 | 2 | 3 | null; // null bila belum hamil (< 0 hari)
  termLabel: string;
  daysToHpl: number; // negatif bila HPL sudah lewat
  naegele: string | null; // hanya untuk metode HPHT: aturan Naegele manual
  naegeleDiff: number | null; // selisih Naegele − (HPHT + 280 hari), dalam hari
};

const DAY = 86_400_000;

export function parseDate(s: string): number {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) throw new Error("Format tanggal harus YYYY-MM-DD");
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const t = Date.UTC(y, mo - 1, d);
  const back = new Date(t);
  if (back.getUTCFullYear() !== y || back.getUTCMonth() !== mo - 1 || back.getUTCDate() !== d) throw new Error("Tanggal tidak valid");
  return t;
}
export const fmtDate = (t: number) => new Date(t).toISOString().slice(0, 10);
const addDays = (t: number, n: number) => t + n * DAY;
const diffDays = (a: number, b: number) => Math.round((a - b) / DAY);

/** Aturan Naegele manual: HPHT + 7 hari, − 3 bulan, + 1 tahun. */
export function naegele(hpht: string): string {
  const t = parseDate(hpht);
  const d = new Date(t);
  const plus7 = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + 7));
  // −3 bulan +1 tahun sama dengan +9 bulan; tanggal di akhir bulan disesuaikan ke hari terakhir bulan tujuan.
  const y = plus7.getUTCFullYear() + (plus7.getUTCMonth() >= 3 ? 1 : 0);
  const mo = (plus7.getUTCMonth() + 9) % 12;
  const last = new Date(Date.UTC(y, mo + 1, 0)).getUTCDate();
  return fmtDate(Date.UTC(y, mo, Math.min(plus7.getUTCDate(), last)));
}

/** Kategori usia kehamilan (ACOG CO 579 untuk ≥37 minggu; trimester menurut ACOG CO 700). */
export function termLabel(gaDays: number): string {
  const w = Math.floor(gaDays / 7);
  if (gaDays < 0) return "Tanggal acuan berada setelah tanggal hari ini";
  if (w < 37) return "Preterm (kurang dari 37 minggu)";
  if (w < 39) return "Early term (37 0/7 – 38 6/7 minggu)";
  if (w < 41) return "Full term (39 0/7 – 40 6/7 minggu)";
  if (w < 42) return "Late term (41 0/7 – 41 6/7 minggu)";
  return "Postterm (42 0/7 minggu atau lebih)";
}

export function trimesterOf(gaDays: number): 1 | 2 | 3 | null {
  if (gaDays < 0) return null;
  if (gaDays <= 13 * 7 + 6) return 1;
  if (gaDays <= 27 * 7 + 6) return 2;
  return 3;
}

export function computeHpl(input: HplInput): HplResult {
  const today = parseDate(input.today);
  let hpl: number;
  if (input.method === "hpht") {
    hpl = addDays(parseDate(input.hpht), 280);
  } else if (input.method === "usg") {
    const { usgWeeks: w, usgDays: d } = input;
    if (!Number.isInteger(w) || !Number.isInteger(d) || w < 4 || w > 42 || d < 0 || d > 6) throw new Error("Usia kehamilan saat USG harus 4–42 minggu dan 0–6 hari");
    hpl = addDays(parseDate(input.usgDate), 280 - (w * 7 + d));
  } else {
    if (input.embryoDay !== 3 && input.embryoDay !== 5) throw new Error("Umur embrio harus hari ke-3 atau ke-5");
    hpl = addDays(parseDate(input.transferDate), input.embryoDay === 5 ? 261 : 263);
  }
  const conception = addDays(hpl, -280);
  const gaDays = diffDays(today, conception);
  const nae = input.method === "hpht" ? naegele(input.hpht) : null;
  return {
    hpl: fmtDate(hpl),
    conception: fmtDate(conception),
    gaDays,
    gaWeeks: Math.floor(gaDays / 7),
    gaRemDays: ((gaDays % 7) + 7) % 7,
    trimester: trimesterOf(gaDays),
    termLabel: termLabel(gaDays),
    daysToHpl: diffDays(hpl, today),
    naegele: nae,
    naegeleDiff: nae ? diffDays(parseDate(nae), hpl) : null,
  };
}

const BULAN = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
export function tanggalIndo(iso: string): string {
  const d = new Date(parseDate(iso));
  return `${d.getUTCDate()} ${BULAN[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

export function hplCopyText(r: HplResult, method: HplMethod): string {
  const dasar = method === "hpht" ? "berdasarkan HPHT" : method === "usg" ? "berdasarkan USG" : "berdasarkan tanggal transfer embrio";
  const uk = r.gaDays >= 0 ? `UK ${r.gaWeeks} minggu ${r.gaRemDays} hari` : "UK belum dapat dihitung";
  return `${uk}, HPL ${tanggalIndo(r.hpl)} (${dasar})`;
}
