// Daftar Kalkulator Medis beserta pembahasan dan materinya (satu halaman dengan kalkulator).
// Akses: tiap bidang punya 1 kalkulator Gratis (kalkulator standar tanpa pembahasan);
// kalkulator lain serta seluruh pembahasan & materi khusus pelanggan Kalkulator Medis Premium.
// Fase 1 disimpan di kode agar terkontrol versi dan mudah diuji; fase 2 dipindah ke database.

export type CalcField = "Umum" | "Anak" | "Penyakit Dalam" | "Bedah" | "Obstetri & Ginekologi" | "THT" | "Neurologi" | "Paru" | "Kardiologi";

export type CalcSource = { label: string; url?: string; note?: string };
export type CalcCase = { title: string; scenario: string; answer: string; explanation: string };

export type CalcStatus = "draft" | "validated" | "soon";
export type CalcAccess = "free" | "premium";

export type CalcMeta = {
  slug: string;
  title: string;
  short: string; // nama pendek di kartu/pencarian
  field: CalcField;
  summary: string;
  keywords: string[];
  status: CalcStatus;
  /** free = kalkulator standar bisa dipakai tanpa berlangganan (1 per bidang). */
  access: CalcAccess;
  /** Diisi setelah dokumen validasi ditandatangani dokter. */
  validation?: { doctor: string; date: string; docVersion: string };
  version?: string;
};

export type CalcContent = {
  interpretation: string[];
  pitfalls: string[];
  cases: CalcCase[];
  sources: CalcSource[];
  /** Materi ringkas yang tampil di halaman yang sama (khusus Premium). */
  material: { heading: string; body: string }[];
};

export const DISCLAIMER =
  "Fitur ini dibuat untuk membantu belajar. Keputusan klinis tetap di tangan dokter yang menangani pasien. Hasil perhitungan dapat salah, sehingga perlu diverifikasi dengan sumber guideline terlebih dahulu sebelum digunakan.";

// Kalkulator aktif ditulis lengkap; status "soon" = belum tersedia (menunggu keputusan perbedaan sumber atau Tahap 2).
type Row = [slug: string, access: CalcAccess, title: string, short: string, field: CalcField, summary: string, keywords: string[]];
const ACTIVE: Row[] = [
  ["imt", "free", "IMT Dewasa (Asia-Pasifik)", "IMT", "Umum", "Indeks massa tubuh dengan batas Asia-Pasifik.", ["bmi", "imt", "obesitas", "berat badan", "gizi"]],
  ["map", "premium", "Mean Arterial Pressure", "MAP", "Umum", "Tekanan arteri rata-rata dan target perfusi.", ["map", "tekanan darah", "perfusi", "syok", "sepsis"]],
  ["qsofa", "free", "qSOFA", "qSOFA", "Penyakit Dalam", "Skrining risiko luaran buruk pada dugaan sepsis.", ["qsofa", "sepsis", "infeksi"]],
  ["sirs", "premium", "Kriteria SIRS", "SIRS", "Penyakit Dalam", "Respons inflamasi sistemik.", ["sirs", "sepsis", "inflamasi", "infeksi"]],
  ["agd", "premium", "Analisis Gas Darah", "AGD", "Penyakit Dalam", "Gangguan asam-basa primer, kompensasi, anion gap, dan rasio delta.", ["agd", "gas darah", "asidosis", "alkalosis", "anion gap", "winter", "bga"]],
  ["egfr", "premium", "eGFR, CrCl & KDIGO", "eGFR", "Penyakit Dalam", "eGFR CKD-EPI 2021, CrCl Cockcroft-Gault, dan kategori risiko KDIGO.", ["egfr", "ginjal", "kreatinin", "ckd", "pgk", "lfg", "crcl", "kdigo"]],
  ["luka-bakar", "free", "Luas Luka Bakar (Rule of Nines)", "Luka bakar", "Bedah", "Persentase luas permukaan tubuh yang terbakar pada dewasa.", ["luka bakar", "rule of nine", "tbsa", "combustio"]],
  ["vbac", "premium", "Skor VBAC (Flamm-Geiger)", "VBAC", "Obstetri & Ginekologi", "Peluang persalinan pervaginam setelah seksio sesarea.", ["vbac", "tolac", "bekas sesar", "seksio", "persalinan"]],
  ["centor", "free", "Centor Score", "Centor", "THT", "Kemungkinan faringitis streptokokus grup A.", ["centor", "mcisaac", "faringitis", "tonsilitis", "radang tenggorokan", "strep"]],
  ["nose", "premium", "Skor NOSE", "NOSE", "THT", "Derajat keluhan sumbatan hidung.", ["nose", "hidung tersumbat", "obstruksi nasal", "septum"]],
  ["rsi", "premium", "Reflux Symptom Index", "RSI", "THT", "Gejala refluks laringofaring.", ["rsi", "refluks", "lpr", "serak", "laringofaring"]],
  ["paradise", "premium", "Kriteria Paradise", "Paradise", "THT", "Indikasi tonsilektomi pada infeksi tenggorok berulang.", ["paradise", "tonsilektomi", "tonsilitis berulang"]],
  ["stop-bang", "premium", "STOP-BANG", "STOP-BANG", "THT", "Skrining obstructive sleep apnea.", ["stop-bang", "osa", "apnea tidur", "mendengkur"]],
  ["siriraj", "premium", "Siriraj Stroke Score", "Siriraj", "Neurologi", "Membedakan stroke perdarahan dan infark secara klinis.", ["siriraj", "stroke", "perdarahan", "infark", "hemoragik"]],
  ["nihss", "premium", "NIH Stroke Scale (NIHSS)", "NIHSS", "Neurologi", "Derajat defisit neurologis pada stroke.", ["nihss", "stroke", "defisit neurologis", "trombolisis"]],
  ["abcd2", "premium", "Skor ABCD²", "ABCD²", "Neurologi", "Risiko stroke dini setelah TIA.", ["abcd2", "tia", "transient ischemic attack", "stroke"]],
  ["four", "premium", "FOUR Score", "FOUR", "Neurologi", "Penilaian kesadaran termasuk pasien terintubasi.", ["four", "koma", "kesadaran", "intubasi", "batang otak"]],
  ["curb-65", "free", "CURB-65", "CURB-65", "Paru", "Derajat pneumonia komunitas dan tempat rawat.", ["curb", "pneumonia", "cap", "pneumonia komunitas"]],
  ["berlin-ards", "premium", "Definisi Berlin ARDS", "ARDS", "Paru", "Kriteria dan derajat ARDS.", ["ards", "berlin", "gagal napas", "p/f"]],
  ["light", "premium", "Kriteria Light", "Light", "Paru", "Eksudat atau transudat cairan pleura.", ["light", "efusi pleura", "eksudat", "transudat", "ldh"]],
  ["pf-ratio", "premium", "Rasio PaO₂/FiO₂", "P/F", "Paru", "Rasio oksigenasi PaO₂/FiO₂.", ["p/f", "pf ratio", "oksigenasi", "fio2", "pao2"]],
  ["nyha", "free", "Klasifikasi NYHA", "NYHA", "Kardiologi", "Kelas fungsional gagal jantung.", ["nyha", "gagal jantung", "sesak"]],
  ["cha2ds2-vasc", "premium", "CHA₂DS₂-VASc", "CHA₂DS₂-VASc", "Kardiologi", "Risiko stroke pada fibrilasi atrium.", ["chadsvasc", "cha2ds2", "fibrilasi atrium", "af", "antikoagulan"]],
  ["hf-stages", "premium", "Stadium Gagal Jantung ACC/AHA", "Stadium HF", "Kardiologi", "Stadium A–D gagal jantung.", ["gagal jantung", "heart failure", "stadium", "acc aha"]],
  ["hipertensi", "premium", "Klasifikasi Hipertensi (PNPK 2026)", "Hipertensi", "Kardiologi", "Kategori tekanan darah dewasa menurut PNPK 2026 untuk TD klinik, rumah, dan ABPM.", ["hipertensi", "tekanan darah", "tensi", "pnpk", "esc 2024", "abpm"]],
  ["killip", "premium", "Klasifikasi Killip", "Killip", "Kardiologi", "Derajat gagal jantung pada infark miokard akut.", ["killip", "infark", "ima", "sindrom koroner", "acs"]],
  ["mid-parental", "free", "Tinggi Potensi Genetik", "Mid-parental", "Anak", "Tinggi target anak dari tinggi orang tua.", ["mid parental", "tinggi badan", "potensi genetik", "perawakan pendek"]],
  ["pat", "premium", "Pediatric Assessment Triangle", "PAT", "Anak", "Kesan awal kegawatan anak dari pintu.", ["pat", "triangle", "kegawatan anak", "emergensi anak"]],
  ["ballard", "premium", "New Ballard Score", "Ballard", "Anak", "Taksiran usia gestasi bayi baru lahir.", ["ballard", "usia gestasi", "neonatus", "prematur"]],
  ["downes", "premium", "Skor Downes", "Downes", "Anak", "Derajat distres napas neonatus.", ["downe", "downes", "distres napas", "neonatus", "sesak bayi"]],
  ["gir", "premium", "Glucose Infusion Rate", "GIR", "Anak", "Laju infus glukosa neonatus.", ["gir", "glukosa", "dekstrosa", "hipoglikemia", "neonatus"]],
  ["skor-tb-anak", "premium", "Skor TB Anak (Juknis TBC 2025)", "Skor TB", "Anak", "Sistem skoring diagnosis TBC anak dan alur lanjutan Juknis 2025.", ["tb", "tbc", "tuberkulosis", "anak", "skoring", "juknis"]],
  ["holliday-segar", "premium", "Cairan Rumatan Anak (Holliday-Segar)", "Rumatan", "Anak", "Kebutuhan cairan rumatan anak dan tetesan infus.", ["cairan", "maintenance", "rumatan", "holliday", "4-2-1", "tetesan"]],
  ["cairan-dewasa", "premium", "Cairan Rumatan IV Dewasa (NICE)", "Cairan dewasa", "Penyakit Dalam", "Resep awal cairan rumatan IV dewasa, elektrolit, dan glukosa menurut NICE CG174.", ["cairan", "rumatan dewasa", "maintenance", "infus", "tetesan", "nice"]],
  ["alvarado", "premium", "Skor Alvarado", "Alvarado", "Bedah", "Stratifikasi probabilitas apendisitis akut.", ["alvarado", "apendisitis", "usus buntu", "mantrels", "appendicitis"]],
  ["bishop", "premium", "Bishop Score", "Bishop", "Obstetri & Ginekologi", "Kesiapan serviks sebelum induksi persalinan.", ["bishop", "induksi", "serviks", "pematangan serviks"]],
  ["dehidrasi", "premium", "Derajat Dehidrasi Anak (MTBS 2022)", "Dehidrasi", "Anak", "Klasifikasi dehidrasi pada diare anak 2 bulan–5 tahun dan Rencana Terapi A/B/C.", ["dehidrasi", "diare", "mtbs", "oralit", "rencana terapi"]],
  ["kalori", "premium", "Kebutuhan Energi Pasien DM (PNPK 2026)", "Kalori DM", "Penyakit Dalam", "Berat badan ideal Broca dan kebutuhan energi harian pasien DM tipe 2 dewasa menurut PNPK 2026.", ["kalori", "energi", "diet", "diabetes", "dm", "broca", "bbi", "gizi", "perkeni", "pnpk"]],
  ["gangguan-dengar", "premium", "Derajat Gangguan Dengar (WHO 2021)", "Gangguan dengar", "THT", "Derajat gangguan dengar dewasa dari audiogram nada murni menurut WHO.", ["fletcher", "audiometri", "tuli", "ambang dengar", "gangguan dengar", "hearing loss", "who"]],
  ["antropometri-who", "premium", "Status Gizi Anak 0–60 Bulan (WHO, Permenkes 2/2020)", "Antropometri", "Anak", "Z-score BB/U, PB/U atau TB/U, BB/PB atau BB/TB, dan IMT/U dengan kategori Permenkes 2/2020.", ["antropometri", "z-score", "stunting", "wasting", "gizi buruk", "gizi anak", "who", "bb/u", "tb/u", "bb/tb", "imt/u", "permenkes"]],
  ["gizi-buruk", "premium", "Formula Balita Gizi Buruk (F-75/F-100)", "F-75/F-100", "Anak", "Volume F-75 dan F-100 per fase perawatan balita gizi buruk menurut pedoman Kemenkes 2019.", ["gizi buruk", "f-75", "f75", "f-100", "f100", "marasmus", "kwashiorkor", "sam", "stabilisasi", "rehabilitasi"]],
  ["tekanan-darah-anak", "premium", "Tekanan Darah Anak (AAP 2017)", "TD anak", "Anak", "Kategori tekanan darah anak 1–17 tahun menurut umur, jenis kelamin, dan tinggi badan.", ["tekanan darah anak", "hipertensi anak", "aap", "tensi anak", "elevated"]],
  ["ikterus", "premium", "Ikterus Neonatus ≥35 Minggu (AAP 2022)", "Ikterus", "Anak", "Ambang fototerapi, eskalasi perawatan, dan transfusi tukar menurut usia gestasi, umur dalam jam, dan faktor risiko.", ["ikterus", "bilirubin", "fototerapi", "jaundice", "hiperbilirubinemia", "transfusi tukar", "kuning"]],
  ["koreksi-natrium", "premium", "Hiponatremia: Tata Laksana Awal (Pedoman Eropa 2014)", "Natrium", "Penyakit Dalam", "Derajat hiponatremia, tata laksana NaCl 3% menurut gejala, batas kenaikan, dan estimasi Adrogué–Madias.", ["natrium", "hiponatremia", "nacl 3%", "hipertonik", "adrogue", "sodium"]],
  ["koreksi-kalium", "premium", "Hipokalemia: Derajat dan Penggantian Kalium", "Kalium", "Penyakit Dalam", "Derajat hipokalemia, jalur, dan dosis penggantian kalium menurut ulasan Kardalas 2018.", ["kalium", "hipokalemia", "kcl", "potassium"]],
  ["ekg", "premium", "QTc dan Laju Jantung (AHA/ACCF/HRS)", "QTc", "Kardiologi", "Laju jantung dari RR atau kotak kecil, QTc Bazett, Fridericia, dan linear Framingham dengan batas AHA/ACCF/HRS 2009.", ["ekg", "ecg", "qt", "qtc", "bazett", "fridericia", "laju jantung", "elektrokardiogram"]],
  ["asma", "premium", "Klasifikasi Derajat Asma (PPK FKTP 2022)", "Derajat asma", "Paru", "Derajat asma bronkial dewasa: intermiten sampai persisten berat menurut PPK FKTP 2022.", ["asma", "ppk fktp", "asma bronkial", "intermiten", "persisten", "ape"]],
  ["asma-kontrol", "premium", "Derajat Kontrol Asma (PPK FKTP 2022)", "Kontrol asma", "Paru", "Terkontrol, terkontrol sebagian, atau tidak terkontrol dari penilaian 4 minggu terakhir.", ["asma", "kontrol asma", "ppk fktp", "terkontrol"]],
  ["aria", "premium", "Klasifikasi Rinitis Alergi (ARIA 2008)", "ARIA", "THT", "Intermiten/persisten dan ringan/sedang-berat menurut ARIA 2008.", ["aria", "rinitis alergi", "alergi hidung", "bersin"]],
  ["kpsp", "premium", "KPSP: Pemilihan Formulir dan Interpretasi (SDIDTK 2022)", "KPSP", "Anak", "Umur dan umur koreksi, formulir KPSP yang dipakai, dan interpretasi jumlah jawaban Ya.", ["kpsp", "perkembangan", "sdidtk", "denver", "tumbuh kembang", "skrining perkembangan"]],
  ["imunisasi", "premium", "Jadwal Imunisasi Anak (IDAI 2024)", "Imunisasi", "Anak", "Imunisasi primer, booster, kejar, daerah endemis, dan risiko tinggi per kolom usia jadwal IDAI 2024.", ["imunisasi", "vaksin", "idai", "jadwal imunisasi", "catch-up", "booster"]],
];
const SOON: Row[] = [
  ["tfu", "premium", "Tinggi Fundus Uteri", "TFU", "Obstetri & Ginekologi", "Segera hadir.", ["tfu", "fundus", "mcdonald", "taksiran berat janin"]],
];
const toMeta = (status: CalcStatus) => ([slug, access, title, short, field, summary, keywords]: Row): CalcMeta => ({ slug, access, title, short, field, summary, keywords, status, version: status === "soon" ? undefined : "0.1" });

export const CALCULATORS: CalcMeta[] = [
  {
    slug: "gcs",
    title: "Glasgow Coma Scale (GCS)",
    short: "GCS",
    field: "Neurologi",
    summary: "Menilai tingkat kesadaran dari respons mata, verbal, dan motorik.",
    keywords: ["gcs", "glasgow", "kesadaran", "koma", "cedera kepala", "penurunan kesadaran", "trauma"],
    status: "draft",
    access: "free",
    version: "0.1",
  },
  {
    slug: "hpl",
    title: "HPL & Usia Kehamilan",
    short: "HPL",
    field: "Obstetri & Ginekologi",
    summary: "Menghitung hari perkiraan lahir dan usia kehamilan dari HPHT, USG, atau transfer embrio.",
    keywords: ["hpl", "hpht", "naegele", "usia kehamilan", "uk", "hamil", "edd", "taksiran persalinan", "due date"],
    status: "draft",
    access: "free",
    version: "0.1",
  },
  ...ACTIVE.map(toMeta("draft")),
  ...SOON.map(toMeta("soon")),
];

export const FIELDS: CalcField[] = Array.from(new Set(CALCULATORS.map((c) => c.field)));
export const findCalculator = (slug: string) => CALCULATORS.find((c) => c.slug === slug);
