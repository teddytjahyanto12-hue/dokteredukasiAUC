# Katalog UKMPPD — 13 Oktober 2026

PPDS dibatalkan oleh pemilik. Program: Preclinical, UKMPPD, Clinical Practice, Medical Research.

UKMPPD berisi 18 kelas sesuai daftar pemilik. Original Research berurutan Univariate → Bivariat → Multivariate. Kelompok Publikasi Jurnal berisi Publikasi Jurnal SINTA dan Publikasi Jurnal Scopus. Katalog Quiz Preclinical berisi 22 subkelas sesuai judul/urutan blok BMS terbit saat impor.

Daftar Pustaka/Clinical Guidelines dinonaktifkan dari publik tanpa menghapus materi, percobaan, hak akses atau relasi paket. Tes Rekomendasi dihapus dari beranda, header/footer, dashboard kosong dan pencarian; URL lama mengembalikan 404. Struktur kelas baru dapat diisi admin; belum ada materi/soal baru, kuis BMS tidak disalin otomatis.

## Penerapan pada checkout lain

Periksa memori, perubahan lokal, dan commit remote. Setelah cadangan SQLite konsisten dan Prisma client sesuai schema, jalankan `npx tsx prisma/revisi-katalog-20261013.ts` dari apps/web dengan DATABASE_URL database tujuan. Aman berulang, transaksi terarah; seed juga memanggil pembaruan katalog. Jangan reset database pengguna.

Jalankan ulang importir bila blok BMS baru perlu ditambahkan ke Quiz. Blok lama tidak dihapus otomatis. Buat build terpisah dengan DEA_BUILD_DIR=.next-katalog-20261013. Verifikasi `tests/catalog-http.mjs` dengan DATABASE_URL yang sama dan TEST_BASE alamat server tujuan. Jangan membangun ulang build aktif. Runtime folder bersama memerlukan restart melalui Server Selalu Aktif.bat setelah build baru tersedia.
