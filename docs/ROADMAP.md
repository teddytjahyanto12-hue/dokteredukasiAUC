# Roadmap platform pembelajaran

Dokumen ini adalah rencana kerja setelah audit publik dan audit akun tahap pertama. Status keputusan tetap berada di `PROJECT_MEMORY.md`; kebutuhan dan bukti berada di `docs/REQUIREMENTS.md` serta `research/PLATFORM_AUDIT.md`.

## Jawaban atas cakupan audit

Website Auctus sudah dipelajari pada halaman publik utama, katalog, halaman produk, akun/login/signup/reset, legal, coaching, bootcamp, dan sebagian area akun yang dapat diakses. Dashboard murid, course SR-MA, EKG, UKNPDPD, serta admin coaching sudah diperiksa secara read-only.

Audit belum dapat disebut 100% selesai. Yang belum terverifikasi adalah tutor non-admin, admin penuh, seluruh halaman checkout/payment/refund, isi dan perilaku semua video/player, seluruh soal/kuis/flashcard, alur upload dan penyimpanan file, backend/database asli, pengaturan akun lengkap, serta semua keadaan error dan ukuran layar. Audit juga tidak berarti menyalin kode, konten, merek, video, atau aset Auctus.

## Urutan kerja

### Tahap 0 — Penyelarasan proyek

Tentukan nama dan identitas platform baru, sasaran pengguna, bidang pembelajaran, wilayah operasi, bahasa, sumber konten, serta perbedaan dari Auctus. Putuskan apakah semua domain (course video, ujian, EKG, riset, coaching) diperlukan atau hanya sebagian.

### Tahap 1 — Menutup audit yang diperlukan

Periksa area tutor non-admin dan admin penuh jika akses sah tersedia. Baca checkout sebatas sebelum transaksi. Uji player, resume progres, materi, kuis, planner, flashcard, CBT, milestone, upload, dan error secara terkontrol. Catat fakta, bukan dugaan backend.

### Tahap 2 — Menetapkan scope rilis pertama

Susun matriks `Adopsi / Sesuaikan / Tunda / Baru` untuk setiap fitur. Prioritas usulan: akun dan peran, katalog, course-modul-video, progres, materi, admin konten, lalu pembayaran dan hak akses. Coaching, CBT, planner, flashcard, bootcamp, dan payroll menyusul jika benar-benar diperlukan.

### Tahap 3 — Spesifikasi produk

Tuliskan alur murid, tutor, admin, dan layanan; aturan akses; status konten; aturan video; kuis/ujian; progres; notifikasi; dukungan; kebijakan privasi; retensi; refund; dan kriteria penerimaan. Semua aturan proyek baru harus diputuskan sendiri, bukan dianggap otomatis mengikuti Auctus.

### Tahap 4 — Arsitektur teknis

Pilih framework frontend/backend, database, autentikasi, penyimpanan/streaming video, penyimpanan file, pembayaran, email/notifikasi, hosting, logging, backup, dan kontrol akses. Bentuk model data berdasarkan kebutuhan yang sudah disetujui.

### Tahap 5 — Rancangan pengalaman pengguna

Buat sitemap, user flow, wireframe, design system, dan prototype untuk mobile/desktop. Validasi navigasi dashboard, katalog, course, player, progres, tutor, dan admin sebelum coding besar.

### Tahap 6 — Implementasi fondasi

Bangun repository GitHub, environment, akun/peran, database, API, otorisasi, katalog, CMS konten, course/module/lesson, player video, progres, dan dashboard dasar.

### Tahap 7 — Implementasi fitur lanjutan

Tambahkan pembayaran/entitlement, tutor/coaching, komunikasi, milestone, kuis/CBT, planner, flashcard, bootcamp, sertifikat, dan laporan sesuai prioritas scope.

### Tahap 8 — Pengujian dan keamanan

Uji isolasi data antar murid/tutor, akses kedaluwarsa, progres video, webhook pembayaran, refund/upgrade, timer ujian, status coaching, upload, mobile, keyboard, error, backup, dan audit log.

### Tahap 9 — Pilot dan peluncuran

Jalankan pilot terbatas dengan murid dan tutor, kumpulkan masalah, perbaiki, siapkan kebijakan operasional/support, deploy staging lalu production, dan dokumentasikan prosedur pemeliharaan.

## Aturan perpindahan tahap

Jangan masuk arsitektur sebelum scope rilis pertama disetujui. Jangan masuk implementasi sebelum alur, model data, hak akses, dan kriteria penerimaan utama cukup jelas. Setiap tahap harus meninggalkan bukti di dokumen proyek dan memperbarui `PROJECT_MEMORY.md`.
