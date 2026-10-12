export const SR_SLUG = "review-systematic-review";
export const TOOLKIT_SLUG = "review-toolkit-srma";
export const TOOL_IDS = ["idea", "dedup", "screening", "converter", "templates", "faq"] as const;
export type ToolId = typeof TOOL_IDS[number];
export type ToolConfig = { id: ToolId; title: string; description: string; help: string; published: boolean };
export type LibraryEntry = { title: string; body: string; group: string; url: string };
export type SrmaConfig = { tools: ToolConfig[]; questions: string[]; faq: LibraryEntry[]; templates: LibraryEntry[] };
export const DEFAULT_SRMA: SrmaConfig = {
  tools: [
    { id: "idea", title: "Idea Board", description: "Susun pertanyaan riset dan PICO selangkah demi selangkah.", help: "Mulai dari masalah klinis, cek review yang sudah ada, lalu tulis PICO dan kelayakan riset. Simpan pekerjaan sebelum berpindah halaman.", published: true },
    { id: "dedup", title: "Deduplikasi referensi", description: "Gabungkan RIS dan NBIB, periksa duplikat, lalu unduh hasilnya.", help: "Berkas diproses di browser. DOI yang sama digabungkan; tanpa DOI gunakan judul, tahun, dan penulis. Tinjau pasangan duplikat sebelum screening.", published: true },
    { id: "screening", title: "Screening studi", description: "Baca judul dan abstrak, lalu tentukan keputusan seleksi.", help: "Gunakan I untuk masukkan, M untuk tinjau lagi, E untuk keluarkan. Catat alasan eksklusi. Keputusan ini merupakan seleksi satu penelaah; penelaah kedua dan penyelesaian konflik tetap diperlukan.", published: true },
    { id: "converter", title: "Konverter effect size", description: "Hitung SD, MD, SMD, dan perubahan sebelum-sesudah.", help: "Periksa jenis statistik dan asumsi sebelum memakai hasil. Kalkulator membantu ekstraksi data dan tidak menjalankan meta-analisis. Rumus merujuk Cochrane Handbook Bab 6.", published: true },
    { id: "templates", title: "Template dan panduan", description: "Pilih kerangka naskah, guideline, atau prompt kerja riset.", help: "Kerangka awal ini dibuat untuk Dokter Edukasi Academy. Sesuaikan dengan protokol dan petunjuk jurnal. Prompt AI hanya membantu penyusunan; verifikasi seluruh hasil dan sumber.", published: true },
    { id: "faq", title: "FAQ SR-MA", description: "Cari jawaban singkat tentang langkah dan metode riset.", help: "Gunakan FAQ untuk orientasi, kemudian baca panduan resmi dan diskusikan persoalan khusus bersama pembimbing.", published: true },
  ],
  questions: ["Masalah klinis apa yang ingin dijawab?", "Review terdahulu apa yang ditemukan dan apa celahnya?", "Tuliskan populasi, intervensi atau paparan, pembanding, dan luaran (PICO/PECO).", "Apa desain studi dan kriteria inklusi serta eksklusi?", "Apakah data, tim, waktu, dan metode analisisnya memadai?"],
  faq: [
    { title: "Kapan meta-analisis diperlukan?", body: "Lakukan pooling bila pertanyaan, desain, luaran, dan data cukup sebanding. Bila pooling tidak sesuai, rencanakan sintesis terstruktur dan jelaskan alasannya.", group: "Analisis", url: "https://training.cochrane.org/handbook/current/chapter-10" },
    { title: "Apa yang perlu dicatat saat pencarian?", body: "Catat database, platform, tanggal, strategi lengkap, filter, dan jumlah hasil. Simpan ekspor asli sebelum deduplikasi.", group: "Pencarian", url: "https://www.prisma-statement.org/" },
    { title: "Apakah PRISMA menilai mutu metode?", body: "PRISMA membantu kelengkapan pelaporan. Penilaian metode, risiko bias, dan kepastian bukti memerlukan pendekatan tersendiri.", group: "Pelaporan", url: "https://www.prisma-statement.org/" },
    { title: "Bagaimana memakai AI untuk riset?", body: "Gunakan untuk membantu merancang atau memeriksa pekerjaan. Jangan menganggap jawaban AI sebagai sumber bukti; periksa artikel asli, dokumentasikan penggunaan, dan hindari memasukkan data sensitif.", group: "Alur kerja", url: "" },
  ],
  templates: ["Systematic review tanpa pooling", "Meta-analisis intervensi", "Meta-analisis observasional", "Diagnostic test accuracy", "Network meta-analysis", "Scoping review"].map(title => ({ title, group: "Template naskah", url: "", body: `Judul\nAbstrak terstruktur\nPendahuluan: masalah, celah bukti, tujuan\nMetode: protokol, kelayakan, pencarian, seleksi, ekstraksi, appraisal, sintesis\nHasil: alur seleksi, karakteristik, penilaian, sintesis\nDiskusi: temuan, konteks, keterbatasan, implikasi\nKesimpulan\nReferensi\nLampiran: strategi pencarian, tabel ekstraksi, checklist pelaporan\n\nDesain: ${title}. Sesuaikan ukuran efek, metode, dan checklist dengan desain review ini.` })).concat([
    { title: "Checklist pelaporan PRISMA", group: "Guideline", body: "Pilih checklist pelaporan sesuai desain review. Catat halaman naskah yang menjawab setiap butir dan siapkan diagram alur. Buka sumber resmi untuk versi checklist terkini.", url: "https://www.prisma-statement.org/" },
    { title: "Panduan metode Cochrane", group: "Guideline", body: "Gunakan panduan metode untuk merencanakan kelayakan, pencarian, seleksi, ekstraksi, risiko bias, dan sintesis. Dokumentasikan alasan setiap keputusan metode.", url: "https://training.cochrane.org/handbook/current" },
    { title: "Prompt pemeriksaan PICO", group: "Prompt AI", body: "Bantu saya memeriksa kejelasan pertanyaan berikut: [pertanyaan]. Identifikasi populasi, intervensi/paparan, pembanding, dan luaran. Tunjukkan bagian yang ambigu dan ajukan pertanyaan klarifikasi. Jangan membuat referensi atau mengklaim kebaruan tanpa bukti. Saya akan memeriksa hasil terhadap sumber asli.", url: "" },
    { title: "Prompt pemeriksaan naskah", group: "Prompt AI", body: "Periksa bagian naskah berikut: [teks milik penulis]. Cari ketidaksesuaian antara tujuan, metode, hasil, dan kesimpulan. Berikan usulan perbaikan dengan alasan. Jangan menambahkan data, sitasi, atau hasil analisis yang tidak saya berikan. Tandai informasi yang perlu diverifikasi.", url: "" },
  ]),
};
export function parseSrma(value?: string | null): SrmaConfig {
  if (!value) return structuredClone(DEFAULT_SRMA);
  try { return JSON.parse(value) as SrmaConfig; } catch { return structuredClone(DEFAULT_SRMA); }
}
