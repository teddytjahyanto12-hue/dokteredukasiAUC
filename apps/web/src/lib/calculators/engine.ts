// Mesin kalkulator generik: setiap kalkulator ditulis sebagai data (input) + fungsi hitung murni.
// Aman untuk browser (tidak berisi pembahasan Premium). Pembahasan ada di content*.ts (khusus server).

export type Option = { value: string; label: string; hint?: string; points?: number };

export type Field =
  | { type: "heading"; label: string; hint?: string }
  | { type: "number"; id: string; label: string; unit?: string; min?: number; max?: number; step?: number; hint?: string; optional?: boolean; placeholder?: string }
  | { type: "select"; id: string; label: string; options: Option[]; hint?: string; optional?: boolean; columns?: 1 | 2 | 3 }
  | { type: "check"; id: string; label: string; hint?: string; points?: number }
  | { type: "date"; id: string; label: string; hint?: string };

export type Values = Record<string, string | boolean | undefined>;
export type Tone = "ok" | "warn" | "bad" | "info";

export type Result =
  | { status: "incomplete"; message: string }
  | { status: "error"; message: string }
  | {
      status: "ok";
      /** Angka atau label utama, mis. "12" atau "Eksudat". */
      value: string;
      unit?: string;
      /** Kategori/interpretasi singkat. */
      label: string;
      tone: Tone;
      lines?: string[];
      /** Langkah perhitungan (tampil untuk Premium). */
      steps: string[];
      /** Teks siap salin untuk catatan klinis. */
      copy: string;
    };

export type CalcDef = {
  slug: string;
  fields: Field[];
  compute: (v: Values) => Result;
};

// ---------- utilitas ----------
/** Baca angka dari input (koma atau titik desimal). null bila kosong/tidak valid. */
export function num(v: Values, id: string): number | null {
  const raw = v[id];
  if (typeof raw !== "string" || raw.trim() === "") return null;
  const n = Number(raw.replace(",", "."));
  return Number.isFinite(n) ? n : null;
}
export const sel = (v: Values, id: string) => (typeof v[id] === "string" && v[id] !== "" ? (v[id] as string) : null);
export const yes = (v: Values, id: string) => v[id] === true;

export const fmt = (n: number, d = 1) => {
  const r = Math.round(n * 10 ** d) / 10 ** d;
  return r.toLocaleString("id-ID", { maximumFractionDigits: d, minimumFractionDigits: 0 });
};

export const incomplete = (message = "Lengkapi isian untuk melihat hasil."): Result => ({ status: "incomplete", message });
export const invalid = (message: string): Result => ({ status: "error", message });

/** Cek rentang angka; mengembalikan pesan galat atau null. */
export function outOfRange(label: string, n: number, min: number, max: number, unit = ""): string | null {
  return n < min || n > max ? `${label} harus ${fmt(min, 2)}–${fmt(max, 2)}${unit ? " " + unit : ""}.` : null;
}

// ---------- pembangun skor ----------
export type ScoreItem =
  | { kind: "check"; id: string; label: string; points: number; hint?: string }
  | { kind: "select"; id: string; label: string; options: Option[]; hint?: string };

export type Band = { min: number; max: number; label: string; tone: Tone; advice?: string };

/** Kalkulator skor penjumlahan: semua butir pilihan wajib diisi, butir centang opsional. */
export function scoreCalc(opts: {
  slug: string;
  title: string; // dipakai di teks salin, mis. "CURB-65"
  items: ScoreItem[];
  bands: Band[];
  max: number;
  min?: number;
  extraFields?: Field[];
  note?: (total: number, v: Values) => string[];
}): CalcDef {
  const fields: Field[] = [
    ...(opts.extraFields ?? []),
    ...opts.items.map((it): Field =>
      it.kind === "check"
        ? { type: "check", id: it.id, label: it.label, hint: it.hint, points: it.points }
        : { type: "select", id: it.id, label: it.label, options: it.options, hint: it.hint },
    ),
  ];
  return {
    slug: opts.slug,
    fields,
    compute(v) {
      let total = 0;
      const steps: string[] = [];
      for (const it of opts.items) {
        if (it.kind === "check") {
          const p = yes(v, it.id) ? it.points : 0;
          total += p;
          if (p) steps.push(`${it.label}: +${fmt(p, 1)}`);
        } else {
          const s = sel(v, it.id);
          if (s === null) return incomplete(`Pilih: ${it.label}.`);
          const o = it.options.find((x) => x.value === s)!;
          total += o.points ?? 0;
          steps.push(`${it.label}: ${o.label} (${(o.points ?? 0) >= 0 ? "+" : ""}${fmt(o.points ?? 0, 1)})`);
        }
      }
      const band = opts.bands.find((b) => total >= b.min && total <= b.max) ?? opts.bands[opts.bands.length - 1];
      steps.push(`Total = ${fmt(total, 1)} (rentang ${fmt(opts.min ?? 0, 1)}–${fmt(opts.max, 1)})`);
      const lines = [...(band.advice ? [band.advice] : []), ...(opts.note?.(total, v) ?? [])];
      return {
        status: "ok",
        value: fmt(total, 1),
        unit: `/ ${fmt(opts.max, 1)}`,
        label: band.label,
        tone: band.tone,
        lines,
        steps,
        copy: `${opts.title}: ${fmt(total, 1)}/${fmt(opts.max, 1)}, ${band.label}${band.advice ? `. ${band.advice}` : ""}`,
      };
    },
  };
}

/** Opsi ya/tidak untuk butir yang wajib dijawab. */
export const yesNo = (points: number): Option[] => [
  { value: "0", label: "Tidak", points: 0 },
  { value: "1", label: "Ya", points },
];
