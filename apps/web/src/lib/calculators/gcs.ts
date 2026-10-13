// Glasgow Coma Scale. Sumber: Teasdale & Jennett, Lancet 1974; pendekatan terstruktur
// glasgowcomascale.org (Teasdale dkk., Nursing Times 2014). Rumus murni tanpa React agar bisa diuji.

export type GcsKey = "eye" | "verbal" | "motor";
/** Nilai komponen, atau "NT" bila tidak dapat dinilai (mis. terintubasi). */
export type GcsValue = number | "NT";
export type GcsInput = Record<GcsKey, GcsValue | null>;

export type GcsOption = { value: number; label: string; hint: string };

export const GCS_COMPONENTS: { key: GcsKey; code: "E" | "V" | "M"; title: string; options: GcsOption[]; ntHint: string }[] = [
  {
    key: "eye",
    code: "E",
    title: "Membuka mata (Eye)",
    ntHint: "Mata tertutup karena faktor lokal, mis. edema atau bebat.",
    options: [
      { value: 4, label: "Spontan", hint: "Mata sudah terbuka sebelum diberi rangsang." },
      { value: 3, label: "Terhadap suara", hint: "Terbuka setelah dipanggil atau diperintah." },
      { value: 2, label: "Terhadap tekanan", hint: "Terbuka setelah tekanan pada ujung jari." },
      { value: 1, label: "Tidak ada", hint: "Tidak membuka mata walau tanpa faktor penghalang." },
    ],
  },
  {
    key: "verbal",
    code: "V",
    title: "Respons verbal (Verbal)",
    ntHint: "Ada faktor yang menghalangi bicara, mis. intubasi atau trakeostomi.",
    options: [
      { value: 5, label: "Orientasi baik", hint: "Menyebut nama, tempat, dan bulan dengan benar." },
      { value: 4, label: "Bingung", hint: "Kalimat utuh, tetapi orientasi tidak benar." },
      { value: 3, label: "Kata-kata", hint: "Kata yang dapat dimengerti, bukan kalimat." },
      { value: 2, label: "Suara", hint: "Hanya erangan atau gumaman." },
      { value: 1, label: "Tidak ada", hint: "Tidak bersuara walau tanpa faktor penghalang." },
    ],
  },
  {
    key: "motor",
    code: "M",
    title: "Respons motorik terbaik (Motor)",
    ntHint: "Ada faktor yang membatasi gerak, mis. paralisis atau obat pelumpuh otot.",
    options: [
      { value: 6, label: "Mengikuti perintah", hint: "Melakukan perintah dua langkah dengan benar." },
      { value: 5, label: "Melokalisasi", hint: "Tangan bergerak melewati klavikula ke arah rangsang di kepala/leher." },
      { value: 4, label: "Fleksi normal", hint: "Siku menekuk cepat, gerakan tidak stereotipik." },
      { value: 3, label: "Fleksi abnormal", hint: "Siku menekuk lambat dan stereotipik (dekortikasi)." },
      { value: 2, label: "Ekstensi", hint: "Siku meluruskan (deserebrasi)." },
      { value: 1, label: "Tidak ada", hint: "Tidak ada gerakan walau tanpa faktor penghalang." },
    ],
  },
];

export type GcsSeverity = "ringan" | "sedang" | "berat";

export type GcsResult = {
  complete: boolean; // semua komponen sudah diisi
  notation: string; // contoh: "E3 V4 M5" atau "E3 VNT M5"
  total: number | null; // null bila ada komponen NT
  severity: GcsSeverity | null;
  hasNT: boolean;
};

/** Klasifikasi derajat cedera kepala yang lazim dipakai (mild 13–15, moderate 9–12, severe 3–8). */
export function gcsSeverity(total: number): GcsSeverity {
  if (total >= 13) return "ringan";
  if (total >= 9) return "sedang";
  return "berat";
}

export function computeGcs(input: GcsInput): GcsResult {
  const parts = GCS_COMPONENTS.map((c) => ({ c, v: input[c.key] }));
  const complete = parts.every((p) => p.v !== null);
  const hasNT = parts.some((p) => p.v === "NT");
  const notation = parts.map((p) => `${p.c.code}${p.v === null ? "?" : p.v === "NT" ? "(NT)" : p.v}`).join(" ");
  if (!complete) return { complete, notation, total: null, severity: null, hasNT };
  for (const p of parts) {
    if (p.v === "NT") continue;
    const max = p.c.options[0].value;
    if (!Number.isInteger(p.v) || (p.v as number) < 1 || (p.v as number) > max) throw new Error(`Nilai ${p.c.code} di luar rentang 1-${max}`);
  }
  // Sesuai anjuran pemilik skala: jangan laporkan total bila ada komponen NT.
  if (hasNT) return { complete, notation, total: null, severity: null, hasNT };
  const total = parts.reduce((s, p) => s + (p.v as number), 0);
  return { complete, notation, total, severity: gcsSeverity(total), hasNT };
}

export const GCS_SEVERITY_LABEL: Record<GcsSeverity, string> = {
  ringan: "Ringan (13–15)",
  sedang: "Sedang (9–12)",
  berat: "Berat (3–8)",
};

/** Teks ringkas siap salin untuk catatan klinis. */
export function gcsCopyText(r: GcsResult): string {
  if (!r.complete) return "";
  if (r.total === null) return `GCS ${r.notation} (total tidak dilaporkan karena ada komponen NT)`;
  return `GCS ${r.total} (${r.notation.replace(/ /g, "")}), derajat ${GCS_SEVERITY_LABEL[r.severity!].toLowerCase()}`;
}
