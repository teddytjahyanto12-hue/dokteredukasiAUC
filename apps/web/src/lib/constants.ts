// Daftar nilai yang dipakai di database (disimpan sebagai String) beserta labelnya.

export const ROLES = ["OWNER", "ADMIN", "TUTOR", "STUDENT"] as const;
export type Role = (typeof ROLES)[number];
export const ROLE_LABEL: Record<Role, string> = {
  OWNER: "Owner",
  ADMIN: "Admin",
  TUTOR: "Tutor",
  STUDENT: "Murid",
};

export const MENTORING_FIELDS = ["CLINICAL", "PRECLINICAL", "RESEARCH_REVIEW", "RESEARCH_ORIGINAL"] as const;
export type MentoringField = (typeof MENTORING_FIELDS)[number];
export const FIELD_LABEL: Record<MentoringField, string> = {
  CLINICAL: "Clinical Practice (spesialis)",
  PRECLINICAL: "Preklinik",
  RESEARCH_REVIEW: "Research: Review",
  RESEARCH_ORIGINAL: "Research: Original Research",
};

export const DISPLAY_TYPES = ["SLIDES", "PDF", "LINKS", "MATERIAL_QUIZ", "CHEATSHEET", "MATERIAL"] as const;
export const DISPLAY_TYPE_LABEL: Record<(typeof DISPLAY_TYPES)[number], string> = {
  SLIDES: "Slide materi + quiz per topik",
  PDF: "Tampilan PDF",
  LINKS: "Daftar tautan sumber",
  MATERIAL_QUIZ: "Materi lalu quiz",
  CHEATSHEET: "PDF cheatsheet (+ AI menyusul)",
  MATERIAL: "Materi umum",
};

export const ITEM_TYPES = ["SLIDES", "PDF", "VIDEO", "LINK", "TEXT"] as const;
export type ItemType = (typeof ITEM_TYPES)[number];
export const ITEM_TYPE_LABEL: Record<ItemType, string> = {
  SLIDES: "Slide (PPTX / PDF / Google Slides)",
  PDF: "PDF / e-book",
  VIDEO: "Video (YouTube / Google Drive)",
  LINK: "Tautan sumber",
  TEXT: "Teks",
};

export const ORDER_STATUS_LABEL: Record<string, string> = {
  PENDING: "Menunggu pembayaran",
  PARTIAL: "Cicilan berjalan",
  PAID: "Lunas",
  CANCELLED: "Dibatalkan",
};

export const MENTORING_STATUS = ["WAITING_ASSIGNMENT", "ACTIVE", "CLOSED"] as const;
export const MENTORING_STATUS_LABEL: Record<string, string> = {
  WAITING_ASSIGNMENT: "Menunggu penjadwalan & tutor",
  ACTIVE: "Berjalan",
  CLOSED: "Ditutup",
};

// Penutupan proyek hanya oleh owner/admin, dengan salah satu alasan ini.
export const CLOSE_REASONS = ["INACTIVE_CUSTOMER", "PERIOD_ENDED"] as const;
export const CLOSE_REASON_LABEL: Record<string, string> = {
  INACTIVE_CUSTOMER: "Pelanggan tidak aktif dalam waktu tertentu",
  PERIOD_ENDED: "Masa waktu layanan habis",
};

export const FEE_BASIS = ["PER_SESSION", "PER_PROJECT", "PER_MILESTONE", "PER_EVENT", "ROYALTY"] as const;
export const FEE_BASIS_LABEL: Record<string, string> = {
  PER_SESSION: "Per sesi bimbingan tervalidasi",
  PER_PROJECT: "Per proyek",
  PER_MILESTONE: "Per milestone tervalidasi",
  PER_EVENT: "Per sesi / event (webinar)",
  ROYALTY: "Royalti per produk terjual",
};

// Status fee per sesi (saling eksklusif, lihat src/lib/fees.ts).
export const FEE_STATUS_LABEL: Record<string, string> = {
  PROJECTED: "Projected (belum tervalidasi)",
  PENDING_VALIDATION: "Menunggu validasi admin",
  PAYABLE: "Payable (terutang, belum dibayar)",
  PAID: "Paid (sudah dibayar)",
  NO_FEE: "No fee",
};

export const SESSION_STATUS_LABEL: Record<string, string> = {
  REQUESTED: "Menunggu konfirmasi jadwal",
  SCHEDULED: "Terjadwal",
  DONE: "Ditandai selesai tutor",
  REVISION: "Perlu revisi",
  CANCELLED: "Dibatalkan",
};

export const PAYROLL_STATUS_LABEL: Record<string, string> = {
  UNPAID: "Belum dibayar",
  PAID: "Sudah dibayar",
  VOID: "Dibatalkan (void)",
};

// Pengaturan situs yang bisa diubah admin di /admin/pengaturan.
export const SETTING_DEFAULTS = {
  siteName: "Dokter Edukasi Academy",
  siteTagline: "Pusat Pembelajaran & Riset Medis",
  heroTitle: "Kuasai Ilmu Kedokteran & Riset Ilmiah dalam Satu Platform",
  heroSubtitle:
    "Panduan Belajar Terstruktur mulai dari jenjang Pre-Clinical, Clinical Practice, hingga Medical Research.\nDilengkapi Kuis, Catatan, Video Pembelajaran, dan Mentor Professional",
  homeJourneyEyebrow: "Ruang untuk berkembang",
  homeJourneyTitle: "Di setiap tahap perjalanan belajar.",
  homeProgramNotes: "pre-clinical | Fondasi ilmu kedokteran\nclinical-practice | Pembelajaran praktik klinis\nmedical-research | Riset dan penulisan ilmiah",
  homeStepsEyebrow: "Langkah berikutnya",
  homeStepsTitle: "Mulai dari kelas yang dibutuhkan.",
  homeSteps: "Temukan kelas | Jelajahi katalog atau gunakan rekomendasi kelas.\nLihat kurikulum | Periksa topik dan ketersediaan materi gratis.\nPilih akses | Pelajari pilihan layanan dan ketentuannya.\nMulai belajar | Buka materi dan pantau progres dari akun.",
  catalogEyebrow: "Pilihan pembelajaran",
  catalogTitle: "Temukan Kelas",
  catalogSubtitle: "Pilih program, lihat kurikulum dan temukan materi yang ingin dipelajari.",
  catalogSearchPlaceholder: "Cari judul kelas, topik, atau kode (mis. BKV-12 / BKV-12.1)…",
  catalogEmptyText: "Belum ada kelas untuk pilihan ini.",
  recommendationEyebrow: "Panduan memilih kelas",
  recommendationTitle: "Temukan kelas yang sesuai",
  recommendationSubtitle: "Pilih jenjang, tujuan, waktu, dan format belajar. Kami bantu menemukan kelas dari katalog yang tersedia.",
  recommendationDisclaimer: "Skor dihitung dari pilihan dan informasi kelas; bukan jaminan hasil belajar.",
  recommendationEmptyText: "Lengkapi empat pilihan di formulir. Rekomendasi akan muncul otomatis.",
  adminWhatsapp: "",
  adminEmail: "",
  tutorFormUrl: "",
  paymentInstructions:
    "Transfer sesuai nominal tagihan ke rekening yang diinformasikan admin, lalu konfirmasi lewat tombol WhatsApp di bawah. Admin akan mengaktifkan akses setelah pembayaran diperiksa.",
  footerNote: "© Dokter Edukasi Academy",
  sendReceiptEmail: "ya",
  onlinePayment: "tidak",
  reportEmailSchedule: "tidak" as string,
  reportEmailTo: "",
  offerTitle: "Belajar kedokteran lebih terarah, langkah demi langkah",
  offerSubtitle: "Kelas terstruktur, jalur belajar yang jelas, dan bimbingan tutor sesuai bidang: mulai dari materi contoh gratis.",
  offerBenefits: [
    "Kelas terstruktur | Materi disusun per topik: video, slide, PDF, dan quiz.",
    "Progres belajar | Tandai materi selesai dan lanjutkan dari titik terakhir.",
    "Jalur belajar | Rangkaian kelas berurutan sehingga jelas langkah berikutnya.",
    "Bimbingan tutor | Pendampingan tutor sesuai bidang pada layanan tertentu.",
  ].join("\n") as string,
  waConfirmTemplate: [
    "*INVOICE {no_invoice}*",
    "{situs}",
    "",
    "Nama: {nama}",
    "Email: {email}",
    "WhatsApp: {whatsapp}",
    "",
    "Paket: {paket}",
    "Masa belajar: {masa_belajar}",
    "Add-on: {addon}",
    "Biaya: {biaya}",
    "Pembayaran: {cara_bayar}",
    "Tagihan saat ini: {tagihan}",
    "Catatan: {catatan}",
    "",
    "Mohon info nomor rekening untuk pembayaran. Terima kasih.",
  ].join("\n") as string,
} as const;
export type SettingKey = keyof typeof SETTING_DEFAULTS;
export const SETTING_LABEL: Record<SettingKey, string> = {
  siteName: "Nama situs",
  siteTagline: "Tagline di bawah nama situs (header)",
  heroTitle: "Judul utama beranda",
  heroSubtitle: "Subjudul beranda",
  homeJourneyEyebrow: "Beranda: label bagian program",
  homeJourneyTitle: "Beranda: judul bagian program",
  homeProgramNotes: "Beranda: keterangan program (satu baris: slug | keterangan)",
  homeStepsEyebrow: "Beranda: label langkah berikutnya",
  homeStepsTitle: "Beranda: judul langkah berikutnya",
  homeSteps: "Beranda: langkah berikutnya (satu baris: judul | keterangan)",
  catalogEyebrow: "Katalog: label bagian",
  catalogTitle: "Katalog: judul bagian",
  catalogSubtitle: "Katalog: keterangan bagian",
  catalogSearchPlaceholder: "Katalog: placeholder pencarian",
  catalogEmptyText: "Katalog: pesan saat belum ada kelas",
  recommendationEyebrow: "Rekomendasi: label halaman",
  recommendationTitle: "Rekomendasi: judul halaman",
  recommendationSubtitle: "Rekomendasi: keterangan halaman",
  recommendationDisclaimer: "Rekomendasi: catatan skor",
  recommendationEmptyText: "Rekomendasi: pesan sebelum pilihan lengkap",
  adminWhatsapp: "Nomor WhatsApp admin untuk tombol Chat Admin dan invoice pembayaran manual (mis. 0812xxxx atau 62812xxxx)",
  adminEmail: "Email tambahan penerima notifikasi pelanggan & order baru (pisahkan dengan koma; owner & admin sudah otomatis)",
  tutorFormUrl: "Tautan Google Form pendaftaran tutor",
  paymentInstructions: "Instruksi pembayaran (tampil setelah pesan paket)",
  footerNote: "Teks footer",
  onlinePayment: "Tampilkan pembayaran online Duitku di website (butuh Merchant Code & API Key di .env). Tidak = hanya pembayaran manual via WhatsApp",
  sendReceiptEmail: "Kirim kwitansi otomatis ke email pelanggan setiap pembayaran/cicilan lunas",
  reportEmailSchedule: "Kirim laporan otomatis ke email (mingguan: tiap Senin 07.00 WIB; bulanan: tiap tanggal 1 pukul 07.00 WIB)",
  reportEmailTo: "Email tambahan penerima laporan (pisahkan dengan koma; owner & admin dengan akses Laporan + Angka keuangan sudah otomatis)",
  offerTitle: "Halaman penawaran: judul utama",
  offerSubtitle: "Halaman penawaran: subjudul",
  offerBenefits: "Halaman penawaran: keunggulan (satu baris satu poin, format: Judul | penjelasan)",
  waConfirmTemplate:
    "Template invoice WhatsApp untuk pembayaran manual. Kode yang bisa dipakai: {no_invoice} {situs} {nama} {email} {whatsapp} {kode_order} {paket} {masa_belajar} {addon} {biaya} {cara_bayar} {tagihan} {catatan}",
};
