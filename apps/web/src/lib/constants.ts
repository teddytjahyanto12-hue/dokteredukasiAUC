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
    "Pembayaran online sedang disiapkan. Setelah memesan, admin akan menghubungi Anda melalui WhatsApp untuk konfirmasi pembayaran dan aktivasi akses.",
  footerNote: "© Dokter Edukasi Learning",
} as const;
export type SettingKey = keyof typeof SETTING_DEFAULTS;
export const SETTING_LABEL: Record<SettingKey, string> = {
  siteName: "Nama situs",
  heroTitle: "Judul utama beranda",
  heroSubtitle: "Subjudul beranda",
  adminWhatsapp: "Nomor WhatsApp admin untuk tombol Chat Admin (mis. 0812xxxx atau 62812xxxx)",
  adminEmail: "Email admin untuk notifikasi",
  tutorFormUrl: "Tautan Google Form pendaftaran tutor",
  paymentInstructions: "Instruksi pembayaran (tampil setelah pesan paket)",
  footerNote: "Teks footer",
};
