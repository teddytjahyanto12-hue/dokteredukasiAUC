# Evaluasi server PC2 dan bantuan PC1 — 13 Oktober 2026

Kesimpulan: PC2 dapat menjadi server awal untuk website pendidikan ini, bersyarat. Belum ada bukti kapasitas maksimum murid maupun kelayakan operasi 24 jam. Tidak ada konfigurasi server yang diubah dalam audit ini.

## Fakta dan batas pemeriksaan
- Pengguna menyampaikan spesifikasi DESKTOP-CH10VNS: Core i3-7130U 2,70GHz, RAM16GB, Windows10 Pro64-bit. SSD/HDD, suhu, kesehatan disk, upload internet, UPS, ESU dan jumlah murid bersamaan belum diverifikasi. Pembacaan CIM remote ditolak Windows. Tidak menyimpan identitas aktivasi Windows.
- PC2 melayani produksi .next-pdf-pages-v2-20261013; folder kerja berada pada host DESKTOP-CH10VNS, dengan jalur lokal yang telah dicatat C:/DATA BERSAMA PC 1 PC 2/Project  Framework Auc. Host alat DESKTOP-U6E6HFM berbeda; angka RAM lokal alat sebelumnya bukan spesifikasi PC2.
- Aplikasi memakai SQLite dan penyimpanan privat lokal, belum memiliki pembagi trafik dua server. GitHub menyinkronkan kode, bukan database/storage maupun server otomatis.
- Sampel read-only dari mesin alat ke PC2, 1 batch per tingkat paralel, bukan tes kapasitas berkelanjutan: katalog 1 permintaan168ms,5 paralel344–346ms,10 paralel588–661ms; gambar halaman Bab01 257865byte,1 permintaan394ms,5 paralel775–1016ms,10 paralel730–1500ms. Semua HTTP200. Sampel menggunakan sesi owner sah tanpa mencetak identitas/token. Tidak menguji submit kuis serentak, pengunjung internet, CPU/suhu atau soak test.

## Usulan bertahap
1. Jadikan PC2 mandiri: runtime, database dan storage pada disk lokal PC2, produksi terpisah dari edit/build. PC1 untuk pengembangan/build/render dokumen dan cadangan. Ini mengurangi persaingan pekerjaan berat, tanpa menggandakan server.
2. Sebelum publik: pastikan SSD sehat, pendinginan, koneksi LAN, upload cukup, listrik/router terlindungi UPS, sleep mati, auto-start tanpa login, pemulihan proses dan jadwal update; OS dengan pembaruan keamanan aktif. Terapkan domain/HTTPS melalui reverse proxy/tunnel sesuai jaringan; jangan membuka share SMB/database ke internet. Cadangan database konsisten dan storage ke lokasi lain dengan uji pemulihan.
3. Uji beban bertahap sesuai target murid: login, baca halaman, submit kuis, admin; ukur p95/error/CPU/RAM/disk/upload dan operasi berkelanjutan. Baru tetapkan kapasitas. Tidak menganggap10 permintaan paralel sama dengan10 murid maksimum.
4. Bila CPU aplikasi terbukti menjadi hambatan, PC1 dapat menjadi instance tambahan saat jam kerja di belakang pembagi trafik dengan health check dan graceful drain. PC2 tetap menangani database/storage dan trafik saat PC1 mati. Kedua instance memakai artefak build sama, rahasia autentikasi konsisten, koordinasi Server Actions/cache/deployment. Pindahkan akses data bersama ke database client/server (misalnya PostgreSQL) dan mekanisme storage terpusat privat sebelum melayani dari dua PC; jangan membuka satu berkas SQLite bersama lewat SMB dari dua server.
5. Kapasitas gabungan tidak otomatis2x; database, upload internet dan beban desktop bisa tetap membatasi. PC1 bukan pengganti 24jam saat PC2 mati. Untuk trafik malam, PC2 sendiri harus memenuhi kebutuhan.

## Sumber primer
- Intel i3-7130U: https://www.intel.com/content/www/us/en/products/sku/124977/intel-core-i37130u-processor-3m-cache-2-70-ghz/specifications.html
- Next.js self-hosting/multiple instances: https://nextjs.org/docs/app/guides/self-hosting
- SQLite network filesystem: https://www.sqlite.org/useovernet.html
- Windows10 akhir dukungan umum14 Oktober2025: https://learn.microsoft.com/en-us/lifecycle/announcements/windows-10-end-of-support
- Windows10 ESU: https://www.microsoft.com/en-us/windows/extended-security-updates
- Cloudflare Tunnel: https://developers.cloudflare.com/tunnel/concepts/routing/
