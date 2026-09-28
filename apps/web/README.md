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

## Peran dan halaman

| Peran | Halaman utama | Isi |
|---|---|---|
| Publik | `/`, `/program/[jalur]`, `/paket`, `/gabung-tutor` | Beranda, tiga jalur, katalog paket, alur seleksi tutor |
| Murid | `/belajar`, `/materi/[topik]`, `/quiz/[topik]`, `/pembelian`, `/bimbingan/[id]` | Paket aktif, slide/PDF/video/tautan, quiz per topik, riwayat pembelian, bimbingan + chat |
| Tutor | `/tutor-panel`, `/tutor-panel/pendapatan` | Klien saya, progres, sesi Zoom + bukti, chat, pendapatan & payroll |
| Admin Master | `/admin/...` | Order, bimbingan (assign tutor, verifikasi sesi), pengguna & tutor, konten, paket, payroll, pengaturan situs |

## Yang bisa diubah tanpa coding (panel admin)

- **Konten materi** (`/admin/konten`): jalur → kategori → topik → materi (slide PDF, PDF, video, tautan, teks) + quiz per topik.
- **Paket** (`/admin/paket`): nama, harga, masa akses, isi kategori, bimbingan. Harga kosong tampil “Harga segera diumumkan”.
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
