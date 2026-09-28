// Daftar nilai yang dipakai di database (disimpan sebagai String) beserta labelnya.

export const ROLES = ["ADMIN", "TUTOR", "STUDENT"] as const;
export type Role = (typeof ROLES)[number];
export const ROLE_LABEL: Record<Role, string> = {
  ADMIN: "Admin Master",
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
  PAID: "Lunas",
  CANCELLED: "Dibatalkan",
};

export const MENTORING_STATUS = ["WAITING_ASSIGNMENT", "ACTIVE", "COMPLETED", "CANCELLED"] as const;
export const MENTORING_STATUS_LABEL: Record<string, string> = {
  WAITING_ASSIGNMENT: "Menunggu penjadwalan & tutor",
  ACTIVE: "Berjalan",
  COMPLETED: "Selesai",
  CANCELLED: "Dibatalkan",
};

export const SESSION_STATUS_LABEL: Record<string, string> = {
  SCHEDULED: "Terjadwal",
  DONE: "Selesai",
  CANCELLED: "Dibatalkan",
};

export const PAYROLL_STATUS_LABEL: Record<string, string> = {
  UNPAID: "Belum dibayar",
  PAID: "Sudah dibayar",
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
    "Pembayaran online sedang disiapkan. Setelah memesan, admin akan menghubungi Anda melalui WhatsApp untuk konfirmasi pembayaran dan aktivasi akses.",
  footerNote: "© Dokter Edukasi Learning",
} as const;
export type SettingKey = keyof typeof SETTING_DEFAULTS;
export const SETTING_LABEL: Record<SettingKey, string> = {
  siteName: "Nama situs",
  heroTitle: "Judul utama beranda",
  heroSubtitle: "Subjudul beranda",
  adminWhatsapp: "Nomor WhatsApp admin (format 62812xxxx)",
  adminEmail: "Email admin untuk notifikasi",
  tutorFormUrl: "Tautan Google Form pendaftaran tutor",
  paymentInstructions: "Instruksi pembayaran (tampil setelah pesan paket)",
  footerNote: "Teks footer",
};
