import { fmt, incomplete, invalid, num, outOfRange, scoreCalc, sel, type CalcDef, type Option } from "../engine";

// Siriraj Stroke Score (Poungvarin dkk., BMJ 1991).
export const siriraj: CalcDef = {
  slug: "siriraj",
  fields: [
    { type: "select", id: "c", label: "Kesadaran", options: [{ value: "0", label: "Sadar", points: 0 }, { value: "1", label: "Somnolen atau stupor", points: 1 }, { value: "2", label: "Semikoma atau koma", points: 2 }], columns: 3 },
    { type: "select", id: "v", label: "Muntah", options: [{ value: "0", label: "Tidak", points: 0 }, { value: "1", label: "Ya", points: 1 }] },
    { type: "select", id: "h", label: "Nyeri kepala dalam 2 jam sejak onset", options: [{ value: "0", label: "Tidak", points: 0 }, { value: "1", label: "Ya", points: 1 }] },
    { type: "number", id: "dbp", label: "Tekanan darah diastolik", unit: "mmHg" },
    { type: "select", id: "a", label: "Penanda ateroma (diabetes, angina, atau klaudikasio intermiten)", options: [{ value: "0", label: "Tidak ada", points: 0 }, { value: "1", label: "Ada (satu atau lebih)", points: 1 }] },
  ],
  compute(v) {
    const c = sel(v, "c"), vo = sel(v, "v"), h = sel(v, "h"), a = sel(v, "a"), d = num(v, "dbp");
    if (c === null || vo === null || h === null || a === null || d === null) return incomplete("Lengkapi kelima variabel.");
    const e = outOfRange("Diastolik", d, 20, 200, "mmHg");
    if (e) return invalid(e);
    const s = 2.5 * +c + 2 * +vo + 2 * +h + 0.1 * d - 3 * +a - 12;
    const [label, tone] = s > 1 ? ["Mengarah perdarahan intraserebral supratentorial (>1)", "bad"] : s < -1 ? ["Mengarah infark serebral (<−1)", "warn"] : ["Meragukan (−1 sampai 1): perlu CT scan", "info"];
    return {
      status: "ok", value: fmt(s, 1), label, tone: tone as "bad" | "warn" | "info",
      lines: ["Skor klinis tidak menggantikan CT/MRI; jangan memulai trombolisis atau antikoagulan hanya berdasarkan skor."],
      steps: [`(2,5 × ${c}) + (2 × ${vo}) + (2 × ${h}) + (0,1 × ${fmt(d, 0)}) − (3 × ${a}) − 12 = ${fmt(s, 1)}`, ">1 perdarahan; <−1 infark; −1 s.d. 1 meragukan"],
      copy: `Siriraj Stroke Score ${fmt(s, 1)}: ${label.toLowerCase()}`,
    };
  },
};

// NIHSS (NINDS; Brott dkk., Stroke 1989).
const un = { value: "UN", label: "Tidak dapat diuji (UN)", hint: "Mis. amputasi/fusi sendi; tidak dijumlahkan.", points: 0 };
const motor = (sec: number): Option[] => [
  { value: "0", label: "Tidak ada drift", hint: `Bertahan ${sec} detik.`, points: 0 },
  { value: "1", label: "Drift", hint: `Turun sebelum ${sec} detik tanpa menyentuh tempat tidur.`, points: 1 },
  { value: "2", label: "Ada usaha melawan gravitasi", hint: "Jatuh ke tempat tidur sebelum waktunya.", points: 2 },
  { value: "3", label: "Tidak ada usaha melawan gravitasi", hint: "Langsung jatuh.", points: 3 },
  { value: "4", label: "Tidak ada gerakan", points: 4 },
  un,
];
const NIHSS: { id: string; label: string; options: Option[] }[] = [
  { id: "1a", label: "1a. Tingkat kesadaran", options: [
    { value: "0", label: "Sadar penuh", points: 0 }, { value: "1", label: "Tidak sadar penuh, bangun dengan rangsang ringan", points: 1 },
    { value: "2", label: "Perlu rangsang berulang/nyeri untuk bergerak", points: 2 }, { value: "3", label: "Hanya refleks atau tidak berespons", points: 3 }] },
  { id: "1b", label: "1b. Pertanyaan (bulan dan usia)", options: [{ value: "0", label: "Keduanya benar", points: 0 }, { value: "1", label: "Satu benar", points: 1 }, { value: "2", label: "Tidak ada yang benar", points: 2 }] },
  { id: "1c", label: "1c. Perintah (buka-tutup mata, genggam-lepas)", options: [{ value: "0", label: "Keduanya benar", points: 0 }, { value: "1", label: "Satu benar", points: 1 }, { value: "2", label: "Tidak ada yang benar", points: 2 }] },
  { id: "2", label: "2. Gerak mata horizontal terbaik", options: [{ value: "0", label: "Normal", points: 0 }, { value: "1", label: "Paresis gaze parsial", points: 1 }, { value: "2", label: "Deviasi paksa / paresis gaze total", points: 2 }] },
  { id: "3", label: "3. Lapang pandang", options: [{ value: "0", label: "Normal", points: 0 }, { value: "1", label: "Hemianopia parsial", points: 1 }, { value: "2", label: "Hemianopia komplet", points: 2 }, { value: "3", label: "Hemianopia bilateral (termasuk buta kortikal)", points: 3 }] },
  { id: "4", label: "4. Paresis wajah", options: [{ value: "0", label: "Normal", points: 0 }, { value: "1", label: "Ringan (lipatan nasolabial datar, senyum asimetris)", points: 1 }, { value: "2", label: "Parsial (wajah bawah)", points: 2 }, { value: "3", label: "Komplet (wajah atas dan bawah)", points: 3 }] },
  { id: "5a", label: "5a. Motorik lengan kiri (10 detik)", options: motor(10) },
  { id: "5b", label: "5b. Motorik lengan kanan (10 detik)", options: motor(10) },
  { id: "6a", label: "6a. Motorik tungkai kiri (5 detik)", options: motor(5) },
  { id: "6b", label: "6b. Motorik tungkai kanan (5 detik)", options: motor(5) },
  { id: "7", label: "7. Ataksia anggota gerak", options: [{ value: "0", label: "Tidak ada", points: 0 }, { value: "1", label: "Pada satu anggota gerak", points: 1 }, { value: "2", label: "Pada dua anggota gerak", points: 2 }, un] },
  { id: "8", label: "8. Sensorik", options: [{ value: "0", label: "Normal", points: 0 }, { value: "1", label: "Gangguan ringan–sedang", points: 1 }, { value: "2", label: "Gangguan berat atau total", points: 2 }] },
  { id: "9", label: "9. Bahasa terbaik", options: [{ value: "0", label: "Tidak afasia", points: 0 }, { value: "1", label: "Afasia ringan–sedang", points: 1 }, { value: "2", label: "Afasia berat", points: 2 }, { value: "3", label: "Mutisme / afasia global", points: 3 }] },
  { id: "10", label: "10. Disartria", options: [{ value: "0", label: "Normal", points: 0 }, { value: "1", label: "Ringan–sedang", points: 1 }, { value: "2", label: "Berat / tidak dapat dimengerti", points: 2 }, { ...un, hint: "Mis. terintubasi; tidak dijumlahkan." }] },
  { id: "11", label: "11. Ekstinsi dan inatensi (neglect)", options: [{ value: "0", label: "Tidak ada", points: 0 }, { value: "1", label: "Pada satu modalitas", points: 1 }, { value: "2", label: "Berat atau lebih dari satu modalitas", points: 2 }] },
];
export const nihss = scoreCalc({
  slug: "nihss",
  title: "NIHSS",
  max: 42,
  items: NIHSS.map((n) => ({ kind: "select" as const, id: n.id, label: n.label, options: n.options })),
  bands: [
    { min: 0, max: 0, label: "Tidak ada defisit terukur (0)", tone: "ok" },
    { min: 1, max: 4, label: "Stroke ringan (1–4)", tone: "warn" },
    { min: 5, max: 15, label: "Stroke sedang (5–15)", tone: "bad" },
    { min: 16, max: 20, label: "Stroke sedang–berat (16–20)", tone: "bad" },
    { min: 21, max: 42, label: "Stroke berat (21–42)", tone: "bad" },
  ],
  note: (_t, v) => (NIHSS.some((n) => v[n.id] === "UN") ? ["Ada butir UN (tidak dapat diuji) yang tidak dijumlahkan; catat alasannya."] : []),
});

// ABCD² (Johnston dkk., Lancet 2007).
export const abcd2 = scoreCalc({
  slug: "abcd2",
  title: "ABCD²",
  max: 7,
  items: [
    { kind: "check", id: "a", label: "Age: usia ≥60 tahun", points: 1 },
    { kind: "check", id: "b", label: "Blood pressure: TD ≥140/90 mmHg saat pemeriksaan pertama", points: 1 },
    { kind: "select", id: "c", label: "Clinical features", options: [{ value: "0", label: "Lainnya", points: 0 }, { value: "1", label: "Gangguan bicara tanpa kelemahan", points: 1 }, { value: "2", label: "Kelemahan satu sisi", points: 2 }] },
    { kind: "select", id: "d", label: "Duration: lama gejala", options: [{ value: "0", label: "<10 menit", points: 0 }, { value: "1", label: "10–59 menit", points: 1 }, { value: "2", label: "≥60 menit", points: 2 }], },
    { kind: "check", id: "dm", label: "Diabetes", points: 1 },
  ],
  bands: [
    { min: 0, max: 3, label: "Risiko rendah (0–3)", tone: "ok", advice: "Risiko stroke 2 hari sekitar 1,0%." },
    { min: 4, max: 5, label: "Risiko sedang (4–5)", tone: "warn", advice: "Risiko stroke 2 hari sekitar 4,1%." },
    { min: 6, max: 7, label: "Risiko tinggi (6–7)", tone: "bad", advice: "Risiko stroke 2 hari sekitar 8,1%." },
  ],
  note: () => ["Pedoman terkini menganjurkan evaluasi segera untuk semua TIA, tidak hanya berdasarkan skor."],
});

// FOUR score (Wijdicks dkk., Ann Neurol 2005).
const four = (id: string, label: string, opts: string[]) => ({ kind: "select" as const, id, label, options: opts.map((t, i) => ({ value: String(4 - i), label: `${4 - i}: ${t}`, points: 4 - i })) });
export const fourScore = scoreCalc({
  slug: "four",
  title: "FOUR",
  max: 16,
  items: [
    four("e", "Respons mata (E)", ["Kelopak terbuka/dibuka, mengikuti, atau berkedip sesuai perintah", "Kelopak terbuka, tidak mengikuti", "Kelopak tertutup, terbuka dengan suara keras", "Kelopak tertutup, terbuka dengan rangsang nyeri", "Kelopak tetap tertutup dengan nyeri"]),
    four("m", "Respons motorik (M)", ["Jempol ke atas, kepal, atau tanda 'peace' sesuai perintah", "Melokalisasi nyeri", "Fleksi terhadap nyeri", "Ekstensi terhadap nyeri", "Tidak ada respons atau status mioklonik umum"]),
    four("b", "Refleks batang otak (B)", ["Refleks pupil dan kornea ada", "Satu pupil lebar dan terfiksasi", "Refleks pupil atau kornea tidak ada", "Refleks pupil dan kornea tidak ada", "Refleks pupil, kornea, dan batuk tidak ada"]),
    four("r", "Pernapasan (R)", ["Tidak diintubasi, pola teratur", "Tidak diintubasi, pola Cheyne-Stokes", "Tidak diintubasi, pola tidak teratur", "Bernapas di atas laju ventilator", "Bernapas sesuai laju ventilator atau apnea"]),
  ],
  bands: [{ min: 0, max: 16, label: "Skor FOUR (tanpa kategori baku)", tone: "info" }],
  note: (_t, v) => [`Rincian: E${v.e} M${v.m} B${v.b} R${v.r}.`, "Makin rendah makin buruk; FOUR tetap dapat dinilai pada pasien terintubasi. Skor 0 memerlukan evaluasi kematian batang otak."],
});

