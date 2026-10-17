// Mesin hitung Dosis Obat Anak (dipakai server dan browser).
// Prinsip keamanan: hanya angka yang EKSPLISIT per kg (atau per m² luas permukaan tubuh) yang dihitung.
// Teks sumber selalu ditampilkan; hasil hitung hanyalah perkalian dosis × berat badan (atau × LPT)
// beserta turunan yang tertulis jelas di teks (dibagi n dosis, interval jam, frekuensi per hari, batas maksimal).

export type Range = [number, number];
export type Basis = "kg" | "m2";
export type Per = "hari" | "kali" | "jam" | "menit" | "minggu" | "bulan";

export type DoseMatch = {
  /** Potongan teks yang dikenali, misalnya "15 mg/kg/kali". */
  raw: string;
  dose: Range;
  unit: string;
  basis: Basis;
  per?: Per;
  /** Jumlah dosis per hari bila dosis harian dibagi (misalnya "dalam 3 dosis"). */
  divide?: Range;
  /** Interval jam antar-dosis (misalnya "tiap 6 jam"). */
  intervalH?: Range;
  /** Frekuensi per hari (misalnya "2x/hari", "sehari sekali"). */
  perDayCount?: Range;
  /** Batas maksimal absolut yang tertulis dekat dosis ini. */
  max?: { value: number; unit: string; per?: Per | "dosis"; raw: string };
  /** Dosis tersirat dari judul tabel "dosis per kg per hari". */
  implicit?: boolean;
  /** Dosis awal sekali, misalnya "20 mg/kg, kemudian 15 mg/kg/kali" atau "Loading dose 6–8 mg/kg". */
  first?: boolean;
};

export type DoseResult = {
  match: DoseMatch;
  /** Dosis per pemberian (per kali); undefined bila teks menyatakan dosis per hari tanpa pembagian. */
  perDose?: Range;
  perDay?: Range;
  /** Dosis laju (per jam/menit) atau per minggu/bulan, tanpa konversi lebih lanjut. */
  rate?: { value: Range; per: Per };
  /** Dosis per pemberian tanpa keterangan per kali/per hari ("sesuai teks"). */
  plain?: Range;
  /** Dosis awal (sekali). */
  first?: Range;
  unit: string;
  cappedDose: boolean;
  cappedDay: boolean;
};

const NUM = String.raw`\d+(?:[.,]\d+)*`;
const DASH = String.raw`\s*(?:–|—|-|sampai|s\.d\.?|hingga)\s*`;
const UNIT = String.raw`mg|mcg|µg|μg|g|gram|mEq|meq|mmol|IU|iu|UI|U|unit|mL|ml`;

/** "1.000" → 1000; "1.5" → 1.5; "0,5" → 0.5; "1.000,5" → 1000.5 */
export function parseNum(s: string): number {
  const t = s.trim();
  if (/^\d{1,3}(\.\d{3})+(,\d+)?$/.test(t)) return Number(t.replace(/\./g, "").replace(",", "."));
  if (/^\d+(,\d+)$/.test(t)) return Number(t.replace(",", "."));
  return Number(t);
}

function parseRange(a: string, b?: string): Range {
  const x = parseNum(a);
  const y = b ? parseNum(b) : x;
  return x <= y ? [x, y] : [y, x];
}

export function normUnit(u: string): string {
  const x = u.trim().toLowerCase();
  if (x === "µg" || x === "μg" || x === "mcg") return "mcg";
  if (x === "gram" || x === "g") return "g";
  if (x === "iu" || x === "ui" || x === "u" || x === "unit") return "IU";
  if (x === "meq") return "mEq";
  if (x === "ml") return "mL";
  return x === "mg" ? "mg" : x === "mmol" ? "mmol" : u.trim();
}

/** Faktor konversi ke satuan dasar dalam kelompok yang sama (massa → mg). */
const MASS: Record<string, number> = { mcg: 0.001, mg: 1, g: 1000 };
export function convert(value: number, from: string, to: string): number | null {
  if (from === to) return value;
  if (from in MASS && to in MASS) return (value * MASS[from]) / MASS[to];
  return null;
}

function perOf(s?: string): Per | "dosis" | undefined {
  if (!s) return undefined;
  const x = s.toLowerCase();
  if (x === "hari" || x === "hr" || x === "24 jam") return "hari";
  if (x === "kali" || x === "dosis" || x === "x") return "kali";
  if (x === "jam") return "jam";
  if (x === "mnt" || x === "menit") return "menit";
  if (x === "minggu" || x === "mgg") return "minggu";
  if (x === "bulan") return "bulan";
  return undefined;
}

const PER = String.raw`(?:\s*\/\s*(hari|hr|kali|dosis|jam|mnt|menit|minggu|mgg|bulan))?`;
const DOSE_RE = new RegExp(String.raw`(${NUM})(?:${DASH}(${NUM}))?\s*(${UNIT})\s*\/\s*(kg\s*bb|kgbb|kg|m2|m²)\b${PER}`, "gi");
const MAX_RE = new RegExp(String.raw`maks(?:imal|imum)?\.?\s*(?:dosis\s*)?:?\s*(?:${NUM}${DASH})?(${NUM})\s*(${UNIT})\b(?!\s*\/\s*(?:kg|m2|m²))(?:\s*\/\s*(hari|hr|kali|dosis|24 jam))?`, "i");

/** Ambil konteks setelah dosis sampai dosis berikutnya atau titik koma. */
function clauseAfter(text: string, from: number, until: number): string {
  const seg = text.slice(from, until);
  const stop = seg.search(/;|\bkemudian\b|\blalu\b|\bATAU\b|\batau\s+\d/);
  return stop >= 0 ? seg.slice(0, stop) : seg;
}

/** Frasa durasi/waktu ("dalam 1 jam", "selama 20 jam", "setelah 6 jam") bukan interval pemberian. */
const DURATION_RE = new RegExp(
  String.raw`(?:dalam|selama|lebih dari|kurang dari|>|<|≥|≤|sampai|hingga|setelah|sesudah|sebelum|pada|ulangi(?:\s+dalam)?|diulangi(?:\s+dalam)?)\s*(?:${NUM})(?:${DASH}(?:${NUM}))?\s*(?:jam|menit|mnt|hari|minggu|mgg)\b|(?:${NUM})\s*jam\s+pertama`,
  "gi",
);

function readContext(m: DoseMatch, ctx0: string) {
  const ctx = ctx0.replace(DURATION_RE, " ");
  const div = ctx.match(new RegExp(String.raw`(?:dibagi|terbagi|bagi)\s*(?:dalam|menjadi)?\s*(${NUM})(?:${DASH}(${NUM}))?\s*(?:dosis|kali)?|dalam\s*(${NUM})(?:\s*(?:atau|–|-)\s*(${NUM}))?\s*dosis`, "i"));
  if (div) m.divide = div[1] ? parseRange(div[1], div[2]) : parseRange(div[3], div[4]);
  const iv = ctx.match(new RegExp(String.raw`(?:tiap|setiap|q)\s*(${NUM})(?:${DASH}(${NUM}))?\s*(?:jam\b|j\b|h\b)|(?:^|[,\s])(${NUM})(?:${DASH}(${NUM}))?\s*jam\b(?!\s*(?:pertama|sebelum|setelah|sesudah|bebas))`, "i"));
  if (iv) {
    const r = iv[1] ? parseRange(iv[1], iv[2]) : parseRange(iv[3], iv[4]);
    // Interval <4 jam (misalnya titrasi tiap 2 jam) tidak dikonversi ke dosis harian.
    if (r[0] >= 4 && r[1] <= 48) m.intervalH = r;
  }
  const fq = ctx.match(new RegExp(String.raw`(${NUM})(?:${DASH}(${NUM}))?\s*(?:x|kali)\s*(?:\/\s*hari|sehari|per hari)`, "i"));
  if (fq) m.perDayCount = parseRange(fq[1], fq[2]);
  else if (/sehari sekali|sekali sehari|1x\/hari|dosis tunggal harian/i.test(ctx)) m.perDayCount = [1, 1];
  const mx = ctx0.match(MAX_RE);
  // Batas berupa rentang ("maks 25–50 mg") tidak dipakai untuk memotong hasil; hanya ditampilkan di teks sumber.
  if (mx && !new RegExp(String.raw`${NUM}${DASH}${NUM}\s*(?:${UNIT})`, "i").test(mx[0]))
    m.max = { value: parseNum(mx[1]), unit: normUnit(mx[2]), per: perOf(mx[3]), raw: mx[0] };
}

/** Lama pemberian satu dosis ("dalam 1 jam", "dalam 10–15 menit") tidak berarti dosis diulang. */
const DURATION_SHORT_RE = new RegExp(String.raw`dalam\s*${NUM}(?:${DASH}${NUM})?\s*(?:jam|menit|mnt)\b`, "gi");
/** Tanda dosis diulang sebelum "kemudian". */
const REPEAT_RE = /tiap|setiap|ulang|\bq\s*\d|\d\s*(?:jam|mnt|menit)\b|x\s*\/\s*hari|kali\s*\/\s*hari|sehari|per hari|hari pertama|selama/i;

/** Kenali semua dosis per kg / per m² yang eksplisit di dalam teks. */
export function findDoses(text: string): DoseMatch[] {
  const out: DoseMatch[] = [];
  const all = [...text.matchAll(DOSE_RE)];
  all.forEach((x, i) => {
    const per = perOf(x[5]);
    const m: DoseMatch = {
      raw: x[0],
      dose: parseRange(x[1], x[2]),
      unit: normUnit(x[3]),
      basis: /m/i.test(x[4]) && !/kg/i.test(x[4]) ? "m2" : "kg",
      per: per === "dosis" ? "kali" : per,
    };
    const start = x.index ?? 0;
    const end = start + x[0].length;
    const next = i + 1 < all.length ? all[i + 1].index ?? text.length : text.length;
    readContext(m, clauseAfter(text, end, next));
    // Dosis awal (sekali): dosis pertama yang langsung diikuti "kemudian/lalu/dilanjutkan" tanpa keterangan
    // pengulangan (interval, frekuensi, "ulangi", "selama"), atau dosis yang didahului kata "loading".
    // "Dosis inisial" TIDAK dianggap dosis awal karena di IDAI berarti dosis mulai yang diulang.
    const between = text.slice(end, next).replace(DURATION_SHORT_RE, " ");
    const before = text.slice(i > 0 ? (all[i - 1].index ?? 0) + all[i - 1][0].length : 0, start);
    const followedByNext = i + 1 < all.length && /\b(kemudian|lalu|dilanjutkan)\b/i.test(between) && !REPEAT_RE.test(between);
    if ((i === 0 && followedByNext && m.per !== "hari" && m.per !== "jam" && m.per !== "menit") || /\bloading\b/i.test(before)) m.first = true;
    out.push(m);
  });
  return out;
}

/**
 * Tabel antimikroba IDAI berjudul "dosis per kg per hari": angka mg di awal sel adalah mg/kg/hari.
 * Angka di dalam kurung (misalnya "dosis harian dewasa, 2–4 g") tidak dihitung.
 */
export function findImplicitPerKgDay(text: string): DoseMatch[] {
  const explicit = findDoses(text);
  if (explicit.length) return explicit;
  const noParen = text.replace(/\([^)]*\)/g, (s) => " ".repeat(s.length));
  const re = new RegExp(String.raw`(?:^|:\s*)(${NUM})(?:${DASH}(${NUM}))?\s*mg\b(?!\s*\/)`, "i");
  const x = noParen.match(re);
  if (!x || x.index === undefined) return [];
  const start = x.index + x[0].indexOf(x[1]);
  const m: DoseMatch = { raw: text.slice(start, x.index + x[0].length).trim(), dose: parseRange(x[1], x[2]), unit: "mg", basis: "kg", per: "hari", implicit: true };
  readContext(m, text.slice(x.index + x[0].length));
  return [m];
}

const mul = (r: Range, k: number): Range => [r[0] * k, r[1] * k];

function cap(r: Range, max: DoseMatch["max"], unit: string): { r: Range; capped: boolean } {
  if (!max) return { r, capped: false };
  const limit = convert(max.value, max.unit, unit);
  if (limit === null) return { r, capped: false };
  const capped = r[1] > limit;
  return { r: [Math.min(r[0], limit), Math.min(r[1], limit)], capped };
}

/** Hitung dosis untuk berat badan (kg) atau luas permukaan tubuh (m²). */
export function computeDose(m: DoseMatch, weightKg: number, bsaM2?: number): DoseResult | null {
  const factor = m.basis === "m2" ? bsaM2 : weightKg;
  if (!factor || !(factor > 0)) return null;
  const base = mul(m.dose, factor);
  const res: DoseResult = { match: m, unit: m.unit, cappedDose: false, cappedDay: false };
  const maxPer = m.max?.per;

  if (m.per === "jam" || m.per === "menit" || m.per === "minggu" || m.per === "bulan") {
    res.rate = { value: base, per: m.per };
    return res;
  }
  if (m.per === "hari") {
    let day = base;
    if (m.max && maxPer !== "kali" && maxPer !== "dosis") ({ r: day, capped: res.cappedDay } = cap(day, m.max, m.unit));
    res.perDay = day;
    const n = m.divide ?? m.perDayCount;
    if (n) {
      let dose: Range = [day[0] / n[1], day[1] / n[0]];
      if (m.max && (maxPer === "kali" || maxPer === "dosis")) ({ r: dose, capped: res.cappedDose } = cap(dose, m.max, m.unit));
      res.perDose = dose;
    }
    return res;
  }
  // per kali / per dosis, atau tanpa keterangan
  let dose = base;
  if (m.max && maxPer !== "hari") ({ r: dose, capped: res.cappedDose } = cap(dose, m.max, m.unit));
  if (m.first) {
    // Dosis awal diberikan sekali; tidak dikonversi ke dosis per hari.
    res.first = dose;
    return res;
  }
  if (m.per === "kali") res.perDose = dose;
  else res.plain = dose;
  // Interval >24 jam (misalnya tiap 36/48 jam pada neonatus) tidak dikonversi ke dosis per hari.
  const iv = m.intervalH && m.intervalH[1] <= 24 ? m.intervalH : undefined;
  const times: Range | undefined = iv ? [24 / iv[1], 24 / iv[0]] : m.intervalH ? undefined : m.perDayCount;
  if (times) {
    let day: Range = [dose[0] * times[0], dose[1] * times[1]];
    if (m.max && maxPer === "hari") ({ r: day, capped: res.cappedDay } = cap(day, m.max, m.unit));
    res.perDay = day;
    if (!res.perDose) {
      res.perDose = res.plain;
      res.plain = undefined;
    }
  }
  return res;
}

/** Luas permukaan tubuh (Mosteller): √(TB cm × BB kg / 3600). */
export function bsaMosteller(weightKg: number, heightCm: number): number | null {
  if (!(weightKg > 0) || !(heightCm > 0)) return null;
  return Math.sqrt((weightKg * heightCm) / 3600);
}

/** Pembulatan tampilan: ≥100 → bilangan bulat; ≥10 → 1 desimal; <10 → 2 desimal (tanpa pembulatan ke sediaan). */
export function fmt(n: number): string {
  const d = n >= 100 ? 0 : n >= 10 ? 1 : n >= 1 ? 2 : 3;
  const v = Number(n.toFixed(d));
  return v.toLocaleString("id-ID", { maximumFractionDigits: d });
}
export function fmtRange(r: Range, unit: string): string {
  return r[0] === r[1] ? `${fmt(r[0])} ${unit}` : `${fmt(r[0])}–${fmt(r[1])} ${unit}`;
}

/** Kekuatan sediaan cair/injeksi, misalnya "Sirup 120 mg/5 mL" → 24 mg per mL. */
export type Strength = { label: string; amount: number; unit: string; perMl: number };
export function parseStrength(label: string): Strength | null {
  const x = label.match(new RegExp(String.raw`(${NUM})\s*(${UNIT})\s*\/\s*(?:(${NUM})\s*)?mL\b`, "i"));
  if (!x) return null;
  const unit = normUnit(x[2]);
  if (unit === "mL") return null;
  const amount = parseNum(x[1]);
  const vol = x[3] ? parseNum(x[3]) : 1;
  if (!(amount > 0) || !(vol > 0)) return null;
  return { label, amount, unit, perMl: amount / vol };
}

/** Volume (mL) untuk jumlah obat tertentu dengan sediaan tertentu; null bila satuan tidak sepadan. */
export function toMl(value: number, unit: string, s: Strength): number | null {
  const v = convert(value, unit, s.unit);
  if (v === null) return null;
  return v / s.perMl;
}

/** Rumus FORNAS faktor VIII: unit = BB × (target % − kadar pasien %) × 0,5. */
export function factorVIII(weightKg: number, targetPct: number, currentPct: number): number | null {
  if (!(weightKg > 0) || !(targetPct > currentPct) || currentPct < 0) return null;
  return weightKg * (targetPct - currentPct) * 0.5;
}
