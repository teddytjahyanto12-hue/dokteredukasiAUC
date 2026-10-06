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
  RESEARCH_REVIEW: "Research — Review",
  RESEARCH_ORIGINAL: "Research — Original Research",
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
  siteName: "Dokter Edukasi Learning",
  heroTitle: "Belajar kedokteran terarah, dari preklinik sampai riset",
  heroSubtitle:
    "Materi Pre-Clinical, Clinical Practice, dan Medical Research dalam satu platform — lengkap dengan quiz dan bimbingan tutor sesuai bidang.",
  adminWhatsapp: "",
  adminEmail: "",
  tutorFormUrl: "",
  paymentInstructions:
    "Transfer sesuai nominal tagihan ke rekening yang diinformasikan admin, lalu konfirmasi lewat tombol WhatsApp di bawah. Admin akan mengaktifkan akses Anda setelah pembayaran diperiksa.",
  footerNote: "© Dokter Edukasi Learning",
  sendReceiptEmail: "ya",
  reportEmailSchedule: "tidak" as string,
  reportEmailTo: "",
  offerTitle: "Belajar kedokteran lebih terarah, langkah demi langkah",
  offerSubtitle: "Kelas terstruktur, jalur belajar yang jelas, dan bimbingan tutor sesuai bidang — mulai dari materi contoh gratis.",
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
  heroTitle: "Judul utama beranda",
  heroSubtitle: "Subjudul beranda",
  adminWhatsapp: "Nomor WhatsApp admin untuk tombol Chat Admin dan invoice pembayaran manual (mis. 0812xxxx atau 62812xxxx)",
  adminEmail: "Email tambahan penerima notifikasi pelanggan & order baru (pisahkan dengan koma; owner & admin sudah otomatis)",
  tutorFormUrl: "Tautan Google Form pendaftaran tutor",
  paymentInstructions: "Instruksi pembayaran (tampil setelah pesan paket)",
  footerNote: "Teks footer",
  sendReceiptEmail: "Kirim kwitansi otomatis ke email pelanggan setiap pembayaran/cicilan lunas",
  reportEmailSchedule: "Kirim laporan otomatis ke email (mingguan: tiap Senin 07.00 WIB; bulanan: tiap tanggal 1 pukul 07.00 WIB)",
  reportEmailTo: "Email tambahan penerima laporan (pisahkan dengan koma; owner & admin dengan akses Laporan + Angka keuangan sudah otomatis)",
  offerTitle: "Halaman penawaran — judul utama",
  offerSubtitle: "Halaman penawaran — subjudul",
  offerBenefits: "Halaman penawaran — keunggulan (satu baris satu poin, format: Judul | penjelasan)",
  waConfirmTemplate:
    "Template invoice WhatsApp untuk pembayaran manual. Kode yang bisa dipakai: {no_invoice} {situs} {nama} {email} {whatsapp} {kode_order} {paket} {masa_belajar} {addon} {biaya} {cara_bayar} {tagihan} {catatan}",
};
