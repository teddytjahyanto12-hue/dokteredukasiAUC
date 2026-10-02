// Daftar hak akses yang bisa dicentang owner per akun.
// Owner selalu punya semua akses. Admin hanya fitur admin yang dicentang.
// Tutor hanya fitur tutor yang dicentang (dashboard klien, payroll, pencapaian).

export const ADMIN_PERMISSIONS = [
  { key: "admin.dashboard", label: "Ringkasan", hint: "Halaman ringkasan order, bimbingan, dan notifikasi" },
  { key: "admin.finance", label: "Angka keuangan", hint: "Melihat harga jual, nominal order, fee tutor, dan rekap keuangan" },
  { key: "admin.orders", label: "Order & pembayaran", hint: "Melihat order, menandai lunas, membatalkan order" },
  { key: "admin.mentoring", label: "Bimbingan / proyek", hint: "Menugaskan tutor, mengatur sesi, menutup proyek" },
  { key: "admin.validation", label: "Validasi pekerjaan tutor", hint: "Menyetujui atau meminta revisi sesi yang ditandai selesai tutor" },
  { key: "admin.students", label: "Akun murid & akses paket", hint: "Melihat/mengubah akun murid, memberi atau mencabut akses paket" },
  { key: "admin.tutors", label: "Data tutor", hint: "Mengubah profil, rate, jenis fee, rekening, dan akses materi tutor" },
  { key: "admin.content", label: "Konten materi & quiz", hint: "Menambah dan mengubah jalur, kategori, topik, materi, quiz" },
  { key: "admin.packages", label: "Layanan & harga", hint: "Membuat dan mengubah layanan: poster, deskripsi, benefit, harga, add-on, masa belajar" },
  { key: "admin.payroll", label: "Payroll tutor", hint: "Membuat payroll, mengunggah bukti transfer, menandai dibayar" },
  { key: "admin.settings", label: "Pengaturan situs", hint: "Teks beranda, kontak WhatsApp, tautan formulir tutor" },
  { key: "admin.audit", label: "Activity log", hint: "Melihat riwayat siapa mengubah apa" },
] as const;

export const TUTOR_PERMISSIONS = [
  { key: "tutor.clients", label: "Dashboard klien", hint: "Klien yang ditugaskan, sesi Zoom, progres, chat, materi bidangnya" },
  { key: "tutor.payroll", label: "Payroll", hint: "Status payroll dan bukti transfer miliknya" },
  { key: "tutor.achievements", label: "Pencapaian", hint: "Jenis fee, sesi tervalidasi, dan status fee miliknya" },
] as const;

export type AdminPermission = (typeof ADMIN_PERMISSIONS)[number]["key"];
export type TutorPermission = (typeof TUTOR_PERMISSIONS)[number]["key"];
export type Permission = AdminPermission | TutorPermission;

export const DEFAULT_TUTOR_PERMISSIONS: TutorPermission[] = ["tutor.clients", "tutor.payroll", "tutor.achievements"];
export const DEFAULT_ADMIN_PERMISSIONS: AdminPermission[] = ["admin.dashboard"];

export function parsePermissions(raw: string | null | undefined): string[] {
  try {
    const v = JSON.parse(raw ?? "[]");
    return Array.isArray(v) ? v.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

// Hanya kunci yang sah untuk peran tersebut yang disimpan.
export function sanitizePermissions(role: string, keys: string[]): string[] {
  const allowed = role === "ADMIN" ? ADMIN_PERMISSIONS : role === "TUTOR" ? TUTOR_PERMISSIONS : [];
  const valid = new Set<string>(allowed.map((p) => p.key));
  return [...new Set(keys.filter((k) => valid.has(k)))];
}

export function hasPermission(user: { role: string; permissions: string[] }, key: Permission) {
  if (user.role === "OWNER") return true;
  if (key.startsWith("admin.")) return user.role === "ADMIN" && user.permissions.includes(key);
  if (key.startsWith("tutor.")) return user.role === "TUTOR" && user.permissions.includes(key);
  return false;
}

// Halaman pertama yang boleh dibuka admin/tutor (dipakai setelah login).
export const ADMIN_PAGES: { key: AdminPermission; href: string; label: string }[] = [
  { key: "admin.dashboard", href: "/admin", label: "Ringkasan" },
  { key: "admin.orders", href: "/admin/order", label: "Order" },
  { key: "admin.validation", href: "/admin/validasi", label: "Validasi" },
  { key: "admin.mentoring", href: "/admin/bimbingan", label: "Bimbingan" },
  { key: "admin.students", href: "/admin/pengguna", label: "Murid" },
  { key: "admin.tutors", href: "/admin/pengguna?role=TUTOR", label: "Data tutor" },
  { key: "admin.content", href: "/admin/konten", label: "Konten materi" },
  { key: "admin.packages", href: "/admin/paket", label: "Layanan" },
  { key: "admin.payroll", href: "/admin/payroll", label: "Payroll tutor" },
  { key: "admin.settings", href: "/admin/pengaturan", label: "Pengaturan situs" },
  { key: "admin.audit", href: "/admin/audit", label: "Activity log" },
];

export const TUTOR_PAGES: { key: TutorPermission; href: string; label: string }[] = [
  { key: "tutor.clients", href: "/tutor-panel", label: "Dashboard klien" },
  { key: "tutor.payroll", href: "/tutor-panel/payroll", label: "Payroll" },
  { key: "tutor.achievements", href: "/tutor-panel/pencapaian", label: "Pencapaian" },
];
