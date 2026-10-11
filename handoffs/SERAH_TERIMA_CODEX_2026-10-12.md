# Serah terima Claude Code (PC 2) → Codex — 12 Oktober 2026

Status resmi dan riwayat lengkap tetap di `../PROJECT_MEMORY.md` (bagian bertanggal 2026-10-07 s.d. 2026-10-12). Dokumen ini ringkasan operan agar Codex bisa langsung melanjutkan.

## 1. Kondisi kode & lingkungan

- Folder kerja: folder bersama `\\desktop-ch10vns\data bersama pc 1 pc 2\Project  Framework Auc` (di PC 2 = `C:\DATA BERSAMA PC 1 PC 2\Project  Framework Auc`). Repo Git `main`, commit terakhir `09b6578` (6 Okt).
- **Semua pekerjaan 7–12 Okt BELUM di-commit dan BELUM di-push** (PC 2 belum login GitHub). `git status`: ±100 berkas berubah/baru. Folder milik pengguna yang tidak dilacak: `contoh dari google studio/`, `IDE MANUAL/`, `PAKET/`, `Formulir Isian Data Website.xlsx`.
- Server lokal PC 2 selalu aktif: `Server Selalu Aktif.bat` (akar proyek) + shortcut Startup Windows `Dokter Edukasi Academy - Server.lnk`. Server menyala ulang otomatis bila berhenti. **Sebelum `prisma migrate`, matikan jendela server** (file engine Prisma terkunci di Windows), lalu nyalakan lagi lewat shortcut.
- `prisma migrate dev` menolak lingkungan non-interaktif bila ada perubahan berisiko; pola yang dipakai: buat folder migrasi → `npx prisma migrate diff --from-schema-datasource prisma/schema.prisma --to-schema-datamodel prisma/schema.prisma --script > migration.sql` → `npx prisma migrate deploy` → `npx prisma generate`.
- Verifikasi terakhir: `npx tsc --noEmit` dan `npx eslint src prisma` lolos (12 Okt). `next build` belum dijalankan ulang sejak 28 Sep.

## 2. Menyiapkan database di komputer lain (database tidak ikut Git)

Jalankan di `apps/web`, berurutan:

```
npx prisma migrate deploy
npm run db:revisi-2026-10-07        # nama Academy, 22 Blok, paket Blok, add-on bimbingan, hapus em-dash & kata "Anda"
npm run db:kode-blok                # kode Blok BAT-1 … BKV-12 … BEH-22 (hanya mengisi yang kosong)
npm run db:revisi-2026-10-11-riset  # section Medical Research (topik → kelas pilihan)
npm run db:paket-srma               # paket SR-MA Basic/Intermediate/Pro + gabung SR & MA
npm run db:revisi-2026-10-12        # WA admin 085174121270, hapus/nonaktifkan paket lama
```

Semua skrip idempoten (aman dijalankan ulang).

## 3. Arahan pengguna yang berlaku permanen

- Nama **Dokter Edukasi Academy**, tagline **Pusat Pembelajaran & Riset Medis**.
- **Tidak boleh ada em-dash (—)** dan **tidak memakai kata "Anda"** di seluruh website.
- Warna mengikuti **maskot** (kuning #ffd20a, hitam #141414, krem #faf8f2; teks aksen emas tua #7a5a00).
- Yang tidak disebut dalam revisi pengguna **dipertahankan**, jangan diubah.
- 1 paket = 1 outcome (untuk data paket ke depan).
- Pembayaran di website **hanya manual (WhatsApp)** untuk sementara; Duitku disembunyikan lewat setting `onlinePayment` = "tidak".
- Riset Monash: **jangan terapkan fitur sebelum dipilih pengguna** (sudah dipilih: M1 kode, M14 Terakhir dibuka, M18 banner pengumuman).

## 4. Fitur yang dikerjakan Claude 7–12 Okt (semua sudah diuji di browser lokal)

| Tanggal | Fitur | Berkas utama |
|---|---|---|
| 7 Okt | Revisi beranda/katalog, 22 Blok Basic Medical Science dengan animasi organ, Bab 1 (1.1 gratis, 1.2 terkunci, kuis gratis), paket 1 Blok Rp150.000 & Blok Komplit Rp2.200.000 seumur hidup, add-on bimbingan Rp150.000 | `components/block-art.tsx`, `lib/courses.ts` (withBlockTopics), `lib/access.ts` (withChildCategories), `prisma/revisi-2026-10-07.ts` |
| 7 Okt | Palet maskot, hapus em-dash & kata "Anda", daftar murid (instansi wajib, sandi min. 6), sumber info wajib | `app/globals.css`, banyak halaman |
| 7 Okt | Bayar manual saja; admin menyetujui pembayaran **wajib unggah bukti**; rekap bukti di laporan & CSV | `app/actions/admin.ts`, `app/pembelian/[id]`, `lib/reports.ts` |
| 8 Okt | Kartu kelas model baru di dashboard murid (Kartu/Daftar), total **menit** materi (`Item.durationMinutes`) | `components/learning-card.tsx`, `app/belajar/page.tsx` |
| 10 Okt | Audit Monash LMS (read-only) | `research/AUDIT_MONASH_LMS.md` |
| 11 Okt | Kode Blok/Bab (`BKV-12`, `BKV-12.1`) + pencarian kode langsung membuka Blok/Bab; **Terakhir dibuka**; **banner pengumuman** beranda (menu Owner → Pengumuman) | `lib/codes.ts`, `components/announcement-banner.tsx`, `app/admin/pengumuman` |
| 11 Okt | Katalog Medical Research dibagi **section** (Original Research, Review, Case Report, Pengolahan Data) | `components/catalog-section.tsx`, `prisma/revisi-2026-10-11-riset.ts` |
| 12 Okt | **Paket SR-MA** Basic/Intermediate/Pro; **alur Zoom** murid → WhatsApp admin → admin konfirmasi (atau batalkan) → tutor lampirkan link rekaman Drive → admin verifikasi → fee payroll; **pencapaian Pro** berbayar dengan bukti (gambar/PDF/DOCX/XLSX) + verifikasi/revisi + notifikasi; murid melihat progres pencapaian | `lib/zoom.ts`, `app/actions/mentoring.ts`, `app/bimbingan/[id]/page.tsx`, `prisma/paket-srma.ts` |
| 12 Okt | Systematic Review digabung jadi **"Systematic Review and Meta-Analysis"**, kelas Meta-analysis dihapus; **laporan Fee tutor terutang** (+CSV `/api/laporan/fee-terutang`); payroll memuat sesi + pencapaian; WA admin 085174121270; paket lama dibersihkan | `lib/reports.ts`, `app/admin/laporan`, `prisma/revisi-2026-10-12.ts` |

## 5. Keputusan desain yang perlu diketahui

- Kelas induk & sub-kelas: `Category.parentId`. Akses ke induk membuka semua sub-kelas. `childLabel` ("Blok"/"Pilihan") dan `showChildrenInCatalog` (induk tampil sebagai section) diatur di form kelas admin.
- SR-MA: Intermediate = **3 Zoom** (dokumen menulis "4x" di satu kalimat, tetapi tabel, tombol, dan modal Rp120.000 menunjukkan 3). Pro: 12 pencapaian dibayar per pencapaian, 3 Zoom dibayar lewat alur Zoom Rp35.000/sesi (total modal 525.000 sesuai dokumen). Zoom tambahan (add-on Rp100.000, `zoomCredits` 1) dibayar ke tutor sesuai HPP add-on Rp40.000.
- Paket yang sudah punya order tidak dihapus, hanya dinonaktifkan ("Bimbingan Medical Research: Review" punya 4 order uji).
- Pembayaran manual: tombol "Bayar manual via WhatsApp" memakai template `waConfirmTemplate`; admin menyetujui di `/admin/order/[id]` dengan bukti wajib.

## 6. Data uji di database lokal PC 2

- Akun: Owner, Tutor Demo, Murid Demo (lihat `AKUN_DAN_ISIAN.md`, jangan disalin ke Git/memori).
- Order uji: `DE-261007-8A7BE0` (Blok 12 + add-on, lunas dengan bukti uji), `DE-261011-6A132F` (SR-MA Pro, lunas) beserta bimbingannya (Zoom 1 tervalidasi, Zoom 2 dibatalkan, 1 pencapaian tervalidasi).
- Payroll "Uji Oktober 2026" Rp85.000 (belum dibayar). Tutor Demo = PRIMARY untuk paket Pro.
- Satu pengumuman uji aktif di beranda. Materi 1.1/1.2 Blok 12 diisi 15 & 20 menit (placeholder).

## 7. Belum selesai / menunggu pengguna

1. Commit + push ke GitHub (butuh login GitHub di PC 2 atau dilakukan dari komputer yang sudah login).
2. Isi materi nyata: 22 Blok (Bab, materi, kuis), Toolkit SR-MA, kelas Medical Research lain; soal kuis Bab 1 masih 0.
3. SMTP (email kwitansi/notifikasi) dan kunci Duitku belum diisi; Duitku memang disembunyikan sementara.
4. Integrasi Google Drive untuk bukti pembayaran/rekap: belum dipilih pengguna (opsi Drive for desktop vs service account).
5. Paket lain belum punya harga: Pre-Clinical Lengkap, Medical E-books, Clinical Practice, Medical Research Materi Lengkap, Bimbingan Clinical Practice, Bimbingan Original Research.
6. Fitur Monash lain (M2–M13, M15–M17) menunggu pilihan pengguna; rating/ulasan belum ada (jangan pakai angka palsu).
7. Deploy (PostgreSQL + hosting + object storage) belum dimulai.
8. Disarankan: jalankan `npm run build` sekali untuk memastikan build produksi masih lolos setelah semua perubahan.
