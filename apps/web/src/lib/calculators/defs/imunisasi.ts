import { incomplete, sel, type CalcDef } from "../engine";

// Jadwal Imunisasi Anak Usia 0–18 Tahun Rekomendasi IDAI 2024 (Kaswandani dkk., Sari Pediatri 2025;26(5):328-36, tabel hal. 335).
// Kolom usia sesuai tabel; setiap sel disalin dari tabel: p = primer, k = kejar (catch-up), b = booster, e = daerah endemis, r = anak risiko tinggi.
export const KOLOM = ["Lahir", "1 bulan", "2 bulan", "3 bulan", "4 bulan", "5 bulan", "6 bulan", "9 bulan", "12 bulan", "15 bulan", "18 bulan", "24 bulan",
  "3 tahun", "4 tahun", "5 tahun", "6 tahun", "7 tahun", "8 tahun", "9 tahun", "10 tahun", "11 tahun", "12 tahun", "13 tahun", "14 tahun", "15 tahun", "16 tahun", "17 tahun", "18 tahun"];
type Sel = [jenis: "p" | "k" | "b" | "e" | "r", label?: string];
const N = KOLOM.length;
const isi = (spec: [from: number, to: number, cell: Sel][]): (Sel | null)[] => {
  const row: (Sel | null)[] = Array(N).fill(null);
  for (const [a, b, c] of spec) for (let i = a; i <= b; i++) row[i] = c;
  return row;
};
// Indeks kolom: 0 Lahir, 1–6 = 1–6 bulan, 7 = 9 bln, 8 = 12, 9 = 15, 10 = 18, 11 = 24 bln, 12 = 3 th ... 27 = 18 th.
export const JADWAL: [string, (Sel | null)[]][] = [
  ["Hepatitis B", isi([[0, 0, ["p", "dosis 0"]], [1, 1, ["k"]], [2, 2, ["p", "dosis 1"]], [3, 3, ["p", "dosis 2"]], [4, 4, ["p", "dosis 3"]], [5, 9, ["k"]], [10, 10, ["b", "dosis 4"]], [11, 27, ["k"]]])],
  ["Polio", isi([[0, 1, ["p", "dosis 0"]], [2, 2, ["p", "dosis 1"]], [3, 3, ["p", "dosis 2"]], [4, 4, ["p", "dosis 3"]], [5, 9, ["k"]], [10, 10, ["b", "dosis 4"]], [11, 27, ["k"]]])],
  ["BCG", isi([[0, 0, ["p", "dosis 1"]], [1, 8, ["k"]]])],
  ["DTP", isi([[2, 2, ["p", "dosis 1"]], [3, 3, ["p", "dosis 2"]], [4, 4, ["p", "dosis 3"]], [5, 9, ["k"]], [10, 10, ["b", "dosis 4"]], [11, 13, ["k"]], [14, 16, ["b", "dosis 5"]], [17, 18, ["k"]], [19, 27, ["b", "Td/Tdap"]]])],
  ["Hib", isi([[2, 2, ["p", "dosis 1"]], [3, 3, ["p", "dosis 2"]], [4, 4, ["p", "dosis 3"]], [5, 9, ["k"]], [10, 10, ["b", "dosis 4"]], [11, 14, ["k"]]])],
  ["PCV", isi([[2, 2, ["p", "dosis 1"]], [3, 3, ["k"]], [4, 4, ["p", "dosis 2"]], [5, 5, ["k"]], [6, 6, ["p", "dosis 3"]], [7, 7, ["k"]], [8, 9, ["b", "dosis 4"]], [10, 14, ["k"]], [15, 27, ["r"]]])],
  ["Rotavirus", isi([[2, 2, ["p", "dosis 1, RV1/RV5"]], [3, 3, ["k"]], [4, 4, ["p", "dosis 2, RV1/RV5"]], [5, 5, ["k"]], [6, 6, ["p", "dosis 3, RV5"]]])],
  ["Influenza", isi([[6, 27, ["p", "diulang setiap tahun 1 dosis"]]])],
  ["MR/MMR", isi([[7, 7, ["p", "MR"]], [8, 8, ["k"]], [9, 10, ["b", "MR/MMR"]], [11, 13, ["k"]], [14, 16, ["b", "MR/MMR"]], [17, 27, ["k"]]])],
  ["Japanese encephalitis (JE)", isi([[7, 7, ["e", "dosis 1"]], [8, 10, ["k"]], [11, 11, ["e", "dosis 2"]], [12, 27, ["k"]]])],
  ["Varisela", isi([[8, 10, ["p", "2 dosis"]], [11, 27, ["k"]]])],
  ["Hepatitis A", isi([[8, 11, ["p", "2 dosis"]], [12, 27, ["k"]]])],
  ["Tifoid", isi([[11, 11, ["p", "dosis 1"]], [12, 13, ["k"]], [14, 27, ["b", "diulang setiap 3 tahun 1 dosis"]]])],
  ["Dengue", isi([[15, 27, ["p", "2 dosis"]]])],
  ["HPV", isi([[18, 23, ["p", "2 dosis"]], [24, 27, ["p", "3 dosis"]]])],
];

export const imunisasi: CalcDef = {
  slug: "imunisasi",
  fields: [
    { type: "select", id: "kolom", label: "Kolom usia pada tabel IDAI 2024", columns: 3, hint: "Cara membaca kolom: kolom '2 bulan' berarti mulai usia 2 bulan (60 hari) sampai 2 bulan 29 hari (89 hari).", options: KOLOM.map((label, i) => ({ value: String(i), label })) },
  ],
  compute(v) {
    const k = sel(v, "kolom");
    if (k === null) return incomplete("Pilih kolom usia.");
    const i = +k;
    const ambil = (j: string) => JADWAL.filter(([, row]) => row[i]?.[0] === j).map(([nama, row]) => `${nama}${row[i]![1] ? ` (${row[i]![1]})` : ""}`);
    const primer = ambil("p"), booster = ambil("b"), kejar = ambil("k"), endemis = ambil("e"), risiko = ambil("r");
    const utama = [...primer, ...booster];
    const lines = [
      ...(primer.length ? [`Primer: ${primer.join("; ")}.`] : []),
      ...(booster.length ? [`Booster: ${booster.join("; ")}.`] : []),
      ...(kejar.length ? [`Kejar (catch-up) bila belum diberikan: ${kejar.join("; ")}.`] : []),
      ...(endemis.length ? [`Di daerah endemis: ${endemis.join("; ")}.`] : []),
      ...(risiko.length ? [`Untuk anak dengan risiko tinggi: ${risiko.join("; ")}.`] : []),
    ];
    return {
      status: "ok", value: String(utama.length), unit: "vaksin primer/booster", label: `Kolom usia ${KOLOM[i]}`, tone: "info",
      lines: lines.length ? lines : ["Tidak ada imunisasi yang tercantum pada kolom ini."],
      steps: [`Tabel IDAI 2024, kolom ${KOLOM[i]}`, ...JADWAL.filter(([, row]) => row[i]).map(([nama, row]) => `${nama}: ${({ p: "primer", k: "kejar", b: "booster", e: "daerah endemis", r: "risiko tinggi" } as const)[row[i]![0]]}${row[i]![1] ? `, ${row[i]![1]}` : ""}`)],
      copy: `Imunisasi IDAI 2024 kolom ${KOLOM[i]}: ${utama.join("; ") || "tidak ada primer/booster"}${kejar.length ? `; kejar: ${kejar.join(", ")}` : ""}`,
    };
  },
};
