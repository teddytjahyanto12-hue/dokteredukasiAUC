import { fmt, incomplete, invalid, num, outOfRange, scoreCalc, sel, yes, type CalcDef, type Option, type Tone } from "../engine";

// Tinggi potensi genetik / mid-parental height (Tanner dkk., Arch Dis Child 1970).
export const midParental: CalcDef = {
  slug: "mid-parental",
  fields: [
    { type: "select", id: "sex", label: "Jenis kelamin anak", options: [{ value: "L", label: "Laki-laki" }, { value: "P", label: "Perempuan" }] },
    { type: "number", id: "ayah", label: "Tinggi badan ayah", unit: "cm" },
    { type: "number", id: "ibu", label: "Tinggi badan ibu", unit: "cm" },
  ],
  compute(v) {
    const sex = sel(v, "sex"), a = num(v, "ayah"), i = num(v, "ibu");
    if (!sex || a === null || i === null) return incomplete("Isi jenis kelamin dan tinggi kedua orang tua.");
    const e = outOfRange("Tinggi ayah", a, 120, 220, "cm") ?? outOfRange("Tinggi ibu", i, 120, 220, "cm");
    if (e) return invalid(e);
    const male = sex === "L";
    const mph = (a + i + (male ? 13 : -13)) / 2;
    return {
      status: "ok", value: fmt(mph, 1), unit: "cm", label: `Rentang potensi genetik ${fmt(mph - 8.5, 1)}–${fmt(mph + 8.5, 1)} cm`, tone: "info",
      lines: ["Rentang ±8,5 cm sekitar persentil 3–97 tinggi target. Anak yang jauh di luar rentang ini perlu evaluasi pertumbuhan."],
      steps: [`${male ? "Laki-laki" : "Perempuan"}: (ayah + ibu ${male ? "+" : "−"} 13) ÷ 2`, `(${fmt(a, 1)} + ${fmt(i, 1)} ${male ? "+" : "−"} 13) ÷ 2 = ${fmt(mph, 1)} cm`, `Rentang = ${fmt(mph, 1)} ± 8,5 cm`],
      copy: `Tinggi potensi genetik ${fmt(mph, 1)} cm (rentang ${fmt(mph - 8.5, 1)}–${fmt(mph + 8.5, 1)} cm)`,
    };
  },
};

// Pediatric Assessment Triangle (Dieckmann dkk., Pediatr Emerg Care 2010).
const PAT = {
  app: [["tone", "Tonus abnormal"], ["inter", "Interaksi menurun"], ["consol", "Tidak dapat ditenangkan"], ["look", "Tatapan kosong/tidak fokus"], ["speech", "Tangis/suara abnormal"]],
  wob: [["sound", "Suara napas abnormal (stridor, mengi, merintih)"], ["pos", "Posisi abnormal (tripod, sniffing)"], ["retr", "Retraksi"], ["flare", "Napas cuping hidung"]],
  circ: [["pallor", "Pucat"], ["mottle", "Mottling (kulit belang)"], ["cyan", "Sianosis"]],
} as const;
const IMPRESSION: Record<string, [string, Tone]> = {
  "000": ["Stabil", "ok"],
  "100": ["Disfungsi SSP primer atau masalah sistemik/metabolik", "warn"],
  "010": ["Distres napas", "warn"],
  "001": ["Syok terkompensasi", "warn"],
  "110": ["Gagal napas", "bad"],
  "101": ["Syok dekompensasi", "bad"],
  "111": ["Gagal kardiopulmoner", "bad"],
  "011": ["Gangguan napas dan sirkulasi tanpa gangguan penampilan: nilai ulang segera", "warn"],
};
export const pat: CalcDef = {
  slug: "pat",
  fields: [
    { type: "heading", label: "Penampilan (Appearance)", hint: "TICLS: tonus, interaksi, dapat ditenangkan, tatapan, suara/tangis." },
    ...PAT.app.map(([id, label]) => ({ type: "check" as const, id, label })),
    { type: "heading", label: "Usaha napas (Work of Breathing)", hint: "Lihat dan dengar tanpa stetoskop." },
    ...PAT.wob.map(([id, label]) => ({ type: "check" as const, id, label })),
    { type: "heading", label: "Sirkulasi kulit (Circulation to Skin)" },
    ...PAT.circ.map(([id, label]) => ({ type: "check" as const, id, label })),
  ],
  compute(v) {
    const a = PAT.app.some(([id]) => yes(v, id)), w = PAT.wob.some(([id]) => yes(v, id)), c = PAT.circ.some(([id]) => yes(v, id));
    const key = `${+a}${+w}${+c}`;
    const [label, tone] = IMPRESSION[key];
    const st = (x: boolean) => (x ? "abnormal" : "normal");
    return {
      status: "ok", value: `${+a + +w + +c}/3`, unit: "sisi abnormal", label, tone,
      lines: ["PAT adalah kesan awal dari pintu (sekitar 30–60 detik); lanjutkan dengan penilaian ABCDE."],
      steps: [`Penampilan: ${st(a)}`, `Usaha napas: ${st(w)}`, `Sirkulasi kulit: ${st(c)}`, `Kesan umum: ${label}`],
      copy: `PAT: penampilan ${st(a)}, usaha napas ${st(w)}, sirkulasi ${st(c)}. Kesan umum: ${label}`,
    };
  },
};

// New Ballard Score (Ballard dkk., J Pediatr 1991). UK = (2 × skor + 120) ÷ 5.
const opt = (pairs: [number, string][]): Option[] => pairs.map(([p, label]) => ({ value: String(p), label: `${p > 0 ? "+" : ""}${p}: ${label}`, points: p }));
const BALLARD_NM: [string, string, [number, string][]][] = [
  ["posture", "Postur", [[0, "Lengan dan tungkai ekstensi"], [1, "Mulai fleksi panggul dan lutut"], [2, "Tungkai fleksi lebih kuat, lengan ekstensi"], [3, "Lengan sedikit fleksi, tungkai fleksi dan abduksi"], [4, "Fleksi penuh lengan dan tungkai"]]],
  ["square", "Square window (pergelangan tangan)", [[-1, ">90°"], [0, "90°"], [1, "60°"], [2, "45°"], [3, "30°"], [4, "0°"]]],
  ["recoil", "Arm recoil", [[0, "180°"], [1, "140–180°"], [2, "110–140°"], [3, "90–110°"], [4, "<90°"]]],
  ["popliteal", "Sudut popliteal", [[-1, "180°"], [0, "160°"], [1, "140°"], [2, "120°"], [3, "100°"], [4, "90°"], [5, "<90°"]]],
  ["scarf", "Scarf sign", [[-1, "Siku melewati garis aksila kontralateral"], [0, "Siku di garis aksila kontralateral"], [1, "Siku di antara aksila kontralateral dan garis tengah"], [2, "Siku di garis tengah"], [3, "Siku belum mencapai garis tengah"], [4, "Siku tidak melewati aksila ipsilateral"]]],
  ["heel", "Heel to ear", [[-1, "Tumit mencapai telinga"], [0, "Tumit hampir mencapai telinga"], [1, "Tahanan ringan"], [2, "Tahanan sedang"], [3, "Tahanan kuat"], [4, "Sangat terbatas"]]],
];
const BALLARD_PH: [string, string, [number, string][]][] = [
  ["skin", "Kulit", [[-1, "Lengket, rapuh, transparan"], [0, "Gelatinosa, merah, tembus pandang"], [1, "Halus, merah muda, vena tampak"], [2, "Mengelupas superfisial dan/atau ruam, vena sedikit"], [3, "Pecah-pecah, area pucat, vena jarang"], [4, "Seperti perkamen, pecah dalam, tanpa pembuluh"], [5, "Seperti kulit samak, pecah, keriput"]]],
  ["lanugo", "Lanugo", [[-1, "Tidak ada"], [0, "Jarang"], [1, "Banyak"], [2, "Menipis"], [3, "Area botak"], [4, "Sebagian besar botak"]]],
  ["plantar", "Permukaan plantar", [[-2, "Tumit–jari <40 mm"], [-1, "Tumit–jari 40–50 mm"], [0, ">50 mm, tanpa garis"], [1, "Garis merah samar"], [2, "Garis transversal anterior saja"], [3, "Garis pada ⅔ anterior"], [4, "Garis di seluruh telapak"]]],
  ["breast", "Payudara", [[-1, "Tidak teraba"], [0, "Hampir tidak teraba"], [1, "Areola datar, tanpa tonjolan"], [2, "Areola berbintik, tonjolan 1–2 mm"], [3, "Areola menonjol, tonjolan 3–4 mm"], [4, "Areola penuh, tonjolan 5–10 mm"]]],
  ["eye", "Mata/telinga", [[-2, "Kelopak menyatu erat"], [-1, "Kelopak menyatu longgar"], [0, "Kelopak terbuka; pinna datar, tetap terlipat"], [1, "Pinna sedikit melengkung, lunak, rekoil lambat"], [2, "Pinna melengkung baik, lunak, rekoil cepat"], [3, "Terbentuk dan keras, rekoil segera"], [4, "Kartilago tebal, telinga kaku"]]],
];
const GEN_M: [number, string][] = [[-1, "Skrotum datar, licin"], [0, "Skrotum kosong, rugae samar"], [1, "Testis di kanal atas, rugae jarang"], [2, "Testis turun, rugae sedikit"], [3, "Testis di bawah, rugae baik"], [4, "Testis menggantung, rugae dalam"]];
const GEN_F: [number, string][] = [[-1, "Klitoris menonjol, labia datar"], [0, "Klitoris menonjol, labia minora kecil"], [1, "Klitoris menonjol, labia minora membesar"], [2, "Labia mayora dan minora sama menonjol"], [3, "Labia mayora besar, minora kecil"], [4, "Labia mayora menutupi klitoris dan minora"]];
export const ballard: CalcDef = {
  slug: "ballard",
  fields: [
    { type: "select", id: "sex", label: "Jenis kelamin bayi", options: [{ value: "L", label: "Laki-laki" }, { value: "P", label: "Perempuan" }] },
    { type: "heading", label: "Maturitas neuromuskular" },
    ...BALLARD_NM.map(([id, label, p]) => ({ type: "select" as const, id, label, options: opt(p), columns: 1 as const })),
    { type: "heading", label: "Maturitas fisik" },
    ...BALLARD_PH.map(([id, label, p]) => ({ type: "select" as const, id, label, options: opt(p), columns: 1 as const })),
    { type: "select", id: "gen", label: "Genitalia (sesuai jenis kelamin di atas)", options: opt(GEN_M.map(([p], i) => [p, `${GEN_M[i][1]} / ${GEN_F[i][1]}`])), columns: 1, hint: "Keterangan: laki-laki / perempuan." },
  ],
  compute(v) {
    if (!sel(v, "sex")) return incomplete("Pilih jenis kelamin bayi.");
    let nm = 0, ph = 0;
    for (const [id, label] of BALLARD_NM) { const s = sel(v, id); if (s === null) return incomplete(`Nilai: ${label}.`); nm += +s; }
    for (const [id, label] of BALLARD_PH) { const s = sel(v, id); if (s === null) return incomplete(`Nilai: ${label}.`); ph += +s; }
    const g = sel(v, "gen"); if (g === null) return incomplete("Nilai: genitalia."); ph += +g;
    const total = nm + ph;
    const below = total < -10;
    const ga = below ? 20 : (2 * total + 120) / 5;
    const [label, tone]: [string, Tone] = ga < 37 ? ["Kurang bulan (<37 minggu)", "warn"] : ga < 42 ? ["Cukup bulan (37–41 minggu)", "ok"] : ["Lebih bulan (≥42 minggu)", "warn"];
    return {
      status: "ok", value: below ? "≤20" : fmt(ga, 1), unit: "minggu", label, tone,
      lines: [`Skor total ${total} (neuromuskular ${nm} + fisik ${ph}).`, ...(below ? ["Skor di bawah −10 berada di luar tabel maturitas Ballard (−10 = 20 minggu); tidak diekstrapolasi."] : []), "Paling akurat bila diperiksa dalam 12 jam pertama untuk bayi <26 minggu; tetap valid sampai 96 jam."],
      steps: [`Neuromuskular = ${nm}; fisik = ${ph}; total = ${total} (tabel maturitas −10 s.d. 50)`, below ? `Skor <−10: di luar tabel, usia gestasi ≤20 minggu` : `Usia gestasi = (2 × ${total} + 120) ÷ 5 = ${fmt(ga, 1)} minggu`],
      copy: `New Ballard Score ${total} (NM ${nm} + fisik ${ph}), taksiran usia gestasi ${below ? "≤20" : fmt(ga, 1)} minggu, ${label.toLowerCase()}`,
    };
  },
};

// Skor Downes untuk distres napas neonatus (Downes dkk., Clin Pediatr 1970).
export const downes = scoreCalc({
  slug: "downes",
  title: "Skor Downes",
  max: 10,
  items: [
    { kind: "select", id: "rr", label: "Frekuensi napas", options: [{ value: "0", label: "<60 kali/menit", points: 0 }, { value: "1", label: "60–80 kali/menit", points: 1 }, { value: "2", label: ">80 kali/menit", points: 2 }] },
    { kind: "select", id: "ret", label: "Retraksi", options: [{ value: "0", label: "Tidak ada", points: 0 }, { value: "1", label: "Ringan", points: 1 }, { value: "2", label: "Berat", points: 2 }] },
    { kind: "select", id: "cya", label: "Sianosis", options: [{ value: "0", label: "Tidak ada", points: 0 }, { value: "1", label: "Hilang dengan O₂", points: 1 }, { value: "2", label: "Menetap walau diberi O₂", points: 2 }] },
    { kind: "select", id: "air", label: "Udara masuk (auskultasi)", options: [{ value: "0", label: "Baik", points: 0 }, { value: "1", label: "Menurun ringan", points: 1 }, { value: "2", label: "Tidak ada udara masuk", points: 2 }] },
    { kind: "select", id: "gr", label: "Merintih (grunting)", options: [{ value: "0", label: "Tidak ada", points: 0 }, { value: "1", label: "Terdengar dengan stetoskop", points: 1 }, { value: "2", label: "Terdengar tanpa alat", points: 2 }] },
  ],
  bands: [
    { min: 0, max: 3, label: "Distres napas ringan (<4)", tone: "warn", advice: "Observasi; berikan oksigen bila perlu." },
    { min: 4, max: 5, label: "Distres napas sedang (4–5)", tone: "bad", advice: "Butuh dukungan napas (mis. CPAP) dan pemantauan ketat." },
    { min: 6, max: 10, label: "Distres napas berat (≥6)", tone: "bad", advice: "Ancaman gagal napas: periksa analisis gas darah dan siapkan ventilasi." },
  ],
});

// Glucose infusion rate.
export const gir: CalcDef = {
  slug: "gir",
  fields: [
    { type: "number", id: "dex", label: "Konsentrasi dekstrosa", unit: "%" },
    { type: "number", id: "rate", label: "Laju infus", unit: "mL/jam" },
    { type: "number", id: "bb", label: "Berat badan", unit: "kg" },
  ],
  compute(v) {
    const d = num(v, "dex"), r = num(v, "rate"), w = num(v, "bb");
    if (d === null || r === null || w === null) return incomplete("Isi konsentrasi, laju, dan berat badan.");
    const e = outOfRange("Dekstrosa", d, 1, 50, "%") ?? outOfRange("Laju", r, 0.1, 500, "mL/jam") ?? outOfRange("Berat badan", w, 0.3, 100, "kg");
    if (e) return invalid(e);
    const g = (d * r) / (6 * w);
    return {
      status: "ok", value: fmt(g, 1), unit: "mg/kg/menit", label: "Laju infus glukosa", tone: "info",
      lines: ["GIR normal neonatus 4–6 mg/kg/menit; GIR >8 mg/kg/menit mengarah ke hiperinsulinisme kongenital. Dekstrosa >12,5% tidak dianjurkan lewat vena perifer."],
      steps: [`GIR = (% dekstrosa × mL/jam) ÷ (6 × kg)`, `= (${fmt(d, 1)} × ${fmt(r, 1)}) ÷ (6 × ${fmt(w, 2)}) = ${fmt(g, 2)} mg/kg/menit`],
      copy: `GIR ${fmt(g, 1)} mg/kg/menit (D${fmt(d, 1)}% ${fmt(r, 1)} mL/jam, BB ${fmt(w, 2)} kg)`,
    };
  },
};

// Cairan rumatan Holliday-Segar (Pediatrics 1957).
export const hollidaySegar: CalcDef = {
  slug: "holliday-segar",
  fields: [
    { type: "number", id: "bb", label: "Berat badan anak", unit: "kg" },
    { type: "select", id: "set", label: "Infus set (opsional, untuk tetesan)", optional: true, options: [{ value: "20", label: "Makro 20 tetes/mL" }, { value: "15", label: "Makro 15 tetes/mL" }, { value: "60", label: "Mikro 60 tetes/mL" }], columns: 3 },
  ],
  compute(v) {
    const w = num(v, "bb");
    if (w === null) return incomplete("Isi berat badan.");
    const e = outOfRange("Berat badan", w, 1, 100, "kg");
    if (e) return invalid(e);
    const day = w <= 10 ? 100 * w : w <= 20 ? 1000 + 50 * (w - 10) : 1500 + 20 * (w - 20);
    const hr = w <= 10 ? 4 * w : w <= 20 ? 40 + 2 * (w - 10) : 60 + (w - 20);
    const steps = [
      w <= 10 ? `Harian: ${fmt(w, 1)} kg × 100 mL = ${fmt(day, 0)} mL/hari` : w <= 20 ? `Harian: 1000 + 50 × (${fmt(w, 1)} − 10) = ${fmt(day, 0)} mL/hari` : `Harian: 1500 + 20 × (${fmt(w, 1)} − 20) = ${fmt(day, 0)} mL/hari`,
      w <= 10 ? `Per jam (4-2-1): 4 × ${fmt(w, 1)} = ${fmt(hr, 1)} mL/jam` : w <= 20 ? `Per jam (4-2-1): 40 + 2 × (${fmt(w, 1)} − 10) = ${fmt(hr, 1)} mL/jam` : `Per jam (4-2-1): 60 + 1 × (${fmt(w, 1)} − 20) = ${fmt(hr, 1)} mL/jam`,
      `Catatan: harian ÷ 24 = ${fmt(day / 24, 1)} mL/jam; selisih kecil dengan 4-2-1 karena pembulatan aturan`,
    ];
    const lines = ["Kebutuhan rumatan saja; belum termasuk defisit, kehilangan berkelanjutan, atau kondisi yang membatasi cairan."];
    const s = sel(v, "set");
    let tpm = "";
    if (s) {
      const t = (hr * +s) / 60;
      steps.push(`Tetesan = ${fmt(hr, 1)} × ${s} ÷ 60 = ${fmt(t, 0)} tetes/menit`);
      tpm = `, ${fmt(t, 0)} tetes/menit (set ${s})`;
      lines.unshift(`${fmt(t, 0)} tetes/menit dengan infus set ${s} tetes/mL.`);
    }
    return { status: "ok", value: fmt(hr, 1), unit: "mL/jam", label: `${fmt(day, 0)} mL/hari`, tone: "info", lines, steps, copy: `Cairan rumatan Holliday-Segar BB ${fmt(w, 1)} kg: ${fmt(day, 0)} mL/hari; ${fmt(hr, 1)} mL/jam (4-2-1)${tpm}` };
  },
};

// Sistem skoring TB anak: Juknis Penatalaksanaan TBC Sensitif Obat 2025, Tabel 14 (hal. 113) dan Gambar 8 (hal. 111).
export const skorTbAnak: CalcDef = {
  slug: "skor-tb-anak",
  fields: [
    { type: "heading", label: "Parameter skoring", hint: "Dipakai bila TCM negatif atau tidak dapat dilakukan, dan tersedia rontgen toraks dan/atau uji tuberkulin/IGRA." },
    { type: "select", id: "kontak", label: "Kontak TB", columns: 1, options: [
      { value: "0", label: "Tidak jelas", points: 0 },
      { value: "2", label: "Laporan keluarga, tidak terkonfirmasi bakteriologis, atau tidak jelas/tidak tahu", points: 2 },
      { value: "3", label: "Terkonfirmasi bakteriologis (+)", points: 3 },
    ] },
    { type: "select", id: "tst", label: "Uji kulit tuberkulin (Mantoux) atau IGRA", columns: 1, options: [
      { value: "0", label: "Negatif atau tidak dilakukan", points: 0 },
      { value: "3", label: "Positif (Mantoux ≥10 mm, atau ≥5 mm pada imunokompromais)", points: 3 },
    ] },
    { type: "select", id: "gizi", label: "Berat badan / status gizi", columns: 1, options: [
      { value: "0", label: "Tidak memenuhi kriteria di bawah", points: 0 },
      { value: "1", label: "BB/TB <90% atau BB/U <80%", points: 1 },
      { value: "2", label: "Klinis gizi buruk atau BB/TB <70% atau BB/U <60%", points: 2 },
    ] },
    { type: "check", id: "demam", label: "Demam yang tidak diketahui penyebabnya ≥2 pekan", points: 1 },
    { type: "check", id: "batuk", label: "Batuk kronik ≥2 pekan", points: 1 },
    { type: "check", id: "kgb", label: "Pembesaran kelenjar limfe kolli, aksila, inguinal (≥1 cm, lebih dari 1 KGB, tidak nyeri)", points: 1 },
    { type: "check", id: "sendi", label: "Pembengkakan tulang/sendi panggul atau lutut", points: 1 },
    { type: "select", id: "cxr", label: "Pemeriksaan radiografi toraks", columns: 1, options: [
      { value: "0", label: "Normal / kelainan tidak jelas / tidak dilakukan", points: 0 },
      { value: "1", label: "Gambaran sugestif (mendukung) TB", points: 1 },
    ] },
  ],
  compute(v) {
    const sels = ["kontak", "tst", "gizi", "cxr"] as const;
    for (const id of sels) if (sel(v, id) === null) return incomplete("Lengkapi semua parameter pilihan.");
    const checks = ["demam", "batuk", "kgb", "sendi"].filter((k) => yes(v, k)).length;
    const total = sels.reduce((s, id) => s + Number(sel(v, id)), 0) + checks;
    const kontakAda = Number(sel(v, "kontak")) >= 2;
    const tstPos = sel(v, "tst") === "3";
    const cxrSug = sel(v, "cxr") === "1";
    const steps = [
      `Kontak ${sel(v, "kontak")} + tuberkulin/IGRA ${sel(v, "tst")} + gizi ${sel(v, "gizi")} + gejala ${checks} + rontgen ${sel(v, "cxr")} = ${total} (maksimal 13)`,
    ];
    let label: string, tone: "bad" | "warn" | "ok", advice: string;
    if (total >= 6) {
      label = "TBC klinis (skor ≥6)"; tone = "bad"; advice = "Tegakkan diagnosis TBC anak terdiagnosis klinis dan mulai tata laksana sesuai Juknis.";
      steps.push("Skor ≥6 → TBC klinis (Gambar 8)");
    } else if ((kontakAda || tstPos) && cxrSug) {
      label = "TBC klinis (skor <6 dengan kontak/uji infeksi positif dan rontgen sugestif)"; tone = "bad"; advice = "Gambar 8: skor <6 tetapi ada kontak ATAU tuberkulin/IGRA positif DAN rontgen sugestif → TBC klinis.";
      steps.push("Skor <6; ada kontak atau uji infeksi positif, dan rontgen sugestif → TBC klinis");
    } else {
      label = "Bukan TBC atau perlu observasi (skor <6)"; tone = "warn"; advice = "Gambar 8: skor <6 tanpa kombinasi kontak/uji infeksi positif dan rontgen sugestif → evaluasi diagnosis banding; observasi dan tata laksana 2 minggu–2 bulan sesuai kondisi.";
      steps.push("Skor <6 tanpa kombinasi kontak/uji positif dan rontgen sugestif");
    }
    return {
      status: "ok", value: String(total), unit: "/ 13", label, tone, lines: [advice, "Diagnosis ditegakkan dokter; skoring dipakai bila TCM negatif atau tidak dapat dilakukan."], steps,
      copy: `Skor TB anak ${total}/13 (Juknis TBC SO 2025): ${label}`,
    };
  },
};
