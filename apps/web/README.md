# Dokter Edukasi Learning — aplikasi web

Website + backend dalam satu aplikasi Next.js (TypeScript). Struktur mengikuti framework pengguna di `../../design/framework-pengguna/` dan rencana di `../../docs/RENCANA_EKSEKUSI_DOKTER_EDUKASI.md`.

## Menjalankan di komputer lokal

Butuh Node.js 20+.

```bash
cd apps/web
npm install
cp .env.example .env        # lalu isi AUTH_SECRET dan sandi admin
npx prisma migrate deploy   # membuat database SQLite lokal (prisma/dev.db)
npm run db:seed             # isi jalur, kategori, topik, paket, akun admin (+ demo bila SEED_DEMO=true)
npm run dev                 # buka http://localhost:3000
```

Masuk sebagai admin memakai `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` dari `.env`. Akun demo (bila `SEED_DEMO=true`): `tutor@dokteredukasi.test` dan `murid@dokteredukasi.test` dengan `SEED_DEMO_PASSWORD`.

## Peran dan hak akses

| Peran | Akses |
|---|---|
| Owner | Semua fitur. Satu-satunya yang membuat akun admin & tutor dan mencentang hak aksesnya di `/admin/tim`. |
| Admin | Hanya fitur yang dicentang owner (lihat `src/lib/permissions.ts`): Ringkasan, Angka keuangan, Order, Bimbingan/proyek, Validasi, Akun murid, Data tutor, Konten, Paket, Payroll, Pengaturan, Activity log. |
| Tutor | Hanya fitur yang dicentang owner: Dashboard klien, Payroll, Pencapaian. Hanya melihat data miliknya. |
| Murid | Mendaftar sendiri; materi, quiz, pembelian, bimbingan. |

Kontrol pekerjaan & fee (Blueprint v3): tutor menandai sesi selesai + bukti → antrean `/admin/validasi` → admin setujui (fee Payable) atau minta revisi. Status fee per sesi selalu tepat satu: Projected / Menunggu validasi / Payable / Paid / No fee (`src/lib/fees.ts`). Proyek ditutup hanya oleh owner/admin dengan alasan "pelanggan tidak aktif" atau "masa waktu habis"; sesi yang belum selesai otomatis tanpa fee. Payroll tidak dihapus, hanya di-void dengan alasan. Semua perubahan penting tercatat di `/admin/audit`.

## Yang bisa diubah tanpa coding (panel admin)

- **Konten materi** (`/admin/konten`): jalur → kategori → topik → materi (slide PDF, PDF, video, tautan, teks) + quiz per topik.
- **Video & slide per topik** (`/admin/konten/topik/[id]`): tombol + Video / + Slide PPTX/PDF / + PDF / + Tautan / + Teks. Video memakai link YouTube (disarankan: Unlisted), Google Drive, Vimeo, atau Bunny Stream dan diputar di dalam halaman (`src/lib/embed.ts`). Slide bisa berupa PDF, link Google Slides/Drive/OneDrive, atau file PPTX yang otomatis dikonversi ke PDF bila LibreOffice terpasang (`src/lib/convert.ts`, atur lokasi lewat `SOFFICE_PATH`). Setiap materi punya pratinjau di panel admin.
- **Layanan** (`/admin/paket`): semua diisi manual — poster (gambar publik), deskripsi, benefit (tambah/hapus per baris), harga dasar, pilihan masa belajar dengan harga masing-masing (bawaan 3 & 6 bulan, bisa ditambah/dihapus/dinonaktifkan), add-on opsional berharga, HPP (hanya akses Angka keuangan), SOP/WI untuk tutor, materi yang terbuka, bimbingan, serta tutor yang berwenang (Primary/Backup) dan fee tutor per layanan. Harga kosong tampil “Harga segera diumumkan”. Total pesanan selalu dihitung ulang di server (`src/lib/services.ts`) dan disalin ke order.
- **Tahap, checklist & cicilan per layanan** (`/admin/paket/[id]` bagian 6–7): tahap bernomor berisi checklist task (disalin ke proyek saat layanan aktif); cicilan 2–3x dengan persen dan tahap yang dibuka. Tahap yang dibuka cicilan berikutnya terkunci sampai cicilan itu dikonfirmasi (dicek di server, `src/lib/installments.ts`).
- **Input penjualan** (`/admin/order/baru`): pelanggan terdaftar atau baru, layanan, masa belajar, add-on, diskon (akses Angka keuangan), bayar penuh/cicil, sumber pelanggan. Konfirmasi pembayaran per cicilan di halaman order.
- **Tombol Chat Admin WhatsApp**: muncul di semua halaman untuk pengunjung, pelanggan, dan tutor bila nomor diisi di Pengaturan situs (format 08xx atau 628xx).
- **Kwitansi & email** : kwitansi otomatis ke email pelanggan setiap pembayaran/cicilan lunas (Pengaturan → bisa dimatikan; kirim ulang di halaman order), halaman kwitansi cetak `/pembelian/[id]/kwitansi`, email ke owner/admin untuk pelanggan & order baru. Email butuh SMTP di `.env` (lihat `.env.example`); status & riwayat di `/admin/email`.
- **Template konfirmasi WhatsApp** (Pengaturan situs): pesan otomatis berisi identitas pelanggan, layanan, dan tagihan untuk tombol konfirmasi di halaman pesanan.
- **Laporan & performa** (`/admin/laporan`): pendapatan diterima, HPP, laba kotor & margin, fee tutor (validated/payable/paid/projected), penjualan, operasional, peringatan, terlaris, performa layanan/kategori/tutor, sumber pelanggan, filter periode, ekspor CSV untuk Excel.
- **Pembayaran online Duitku** (`src/lib/duitku.ts`): tombol "Bayar sekarang" di halaman pesanan (bayar penuh atau cicilan berikutnya), callback `POST /api/duitku/callback`, halaman kembali `/api/duitku/kembali`. Aktif bila `DUITKU_MERCHANT_CODE` dan `DUITKU_API_KEY` terisi. Daftarkan URL callback di dashboard Duitku; callback butuh alamat publik.
- **Laporan berkala ke email** (tanpa AI): jadwal diatur di Pengaturan situs (mingguan Senin 07.00 WIB / bulanan tanggal 1 07.00 WIB / keduanya). Penjadwal bawaan di `src/instrumentation.ts` berjalan selama server menyala; di hosting serverless panggil `GET /api/cron/laporan` dengan `Authorization: Bearer $CRON_SECRET`. Tombol kirim manual ada di `/admin/laporan`.
- **Pengaturan situs** (`/admin/pengaturan`): nama situs, teks beranda, WhatsApp admin, Google Form tutor, instruksi pembayaran, footer.
- **Warna tema**: variabel `--brand` di `src/app/globals.css`.

## Alur bisnis yang sudah berjalan

1. Murid daftar → pesan paket → order `PENDING`, admin mendapat notifikasi.
2. Admin menandai lunas di `/admin/order/[id]` → hak akses aktif otomatis; bila paket berisi bimbingan, bimbingan dibuat dengan status menunggu tutor.
3. Admin memilih tutor sesuai bidang → tutor menjadwalkan sesi Zoom, mengunggah bukti, mencatat progres, chat dengan murid.
4. Admin memverifikasi sesi selesai (fee = rate tutor) → membuat payroll → unggah bukti transfer → paid/unpaid.

`markOrderPaid` di `src/lib/orders.ts` idempoten dan akan dipakai juga oleh callback Duitku.

## Struktur kode

- `prisma/schema.prisma` — model data; `prisma/seed.ts` — data awal sesuai framework.
- `src/lib/` — auth (sesi cookie JWT + bcrypt), aturan akses, order, notifikasi, penyimpanan berkas, pengaturan.
- `src/app/actions/` — server action (backend) per peran.
- `src/app/api/berkas/[id]` — menyajikan berkas unggahan dengan pemeriksaan hak akses.

## Belum dikerjakan (lihat PROJECT_MEMORY.md)

- Pembayaran otomatis Duitku (sekarang konfirmasi manual oleh admin).
- Pengiriman email sungguhan (sekarang notifikasi di website + log server).
- AI Medical Cheatsheet, lupa kata sandi mandiri, pembatasan percobaan login.
- Deploy: ganti `provider` di schema ke `postgresql`, isi `DATABASE_URL`, dan pindahkan `src/lib/storage.ts` ke object storage (Supabase Storage/R2/S3), karena hosting seperti Vercel tidak menyimpan berkas lokal.
