# Kurikulum Scoping Review

21 PDF asli pengajar dibagi ke enam kelompok. Setiap kuis berisi 10 soal, lima pilihan, satu kunci dan pembahasan dari Draf_Kuis_Scoping_Review.docx/JSON. Isi sumber tidak diubah; batas lulus website 80/100 menggantikan 70 pada draf.

| Kelompok | Materi | Bab |
|---|---|---|
| 1 | Dasar Scoping Review | 01–03 |
| 2 | Topik, Judul, dan Pertanyaan Telaah | 04–06 |
| 3 | Tim, Protokol, dan Kriteria Kelayakan | 07–09 |
| 4 | Penelusuran, Pengelolaan Rujukan, dan Seleksi | 10–12 |
| 5 | Ekstraksi, Penilaian Kritis, Analisis, dan Penyajian | 13–16 |
| 6 | Pelaporan dan Publikasi | 17–21 |

Kelompok1 (semua tiga bab dan kuis1) gratis setelah login. Kelompok2–6 membutuhkan paket dan kelulusan semua kuis sebelumnya. Nilai terbaik minimal80 tetap memenuhi prasyarat. Staf dapat meninjau sesuai izin. PDF ditayangkan sebagai halaman privat, layar penuh tetap di website; endpoint berkas asli ditolak untuk murid. Riwayat topik lama dipertahankan dengan pengarsipan.

## Impor dan verifikasi

Dari apps/web: `node node_modules/tsx/dist/cli.mjs prisma/scoping-chapters.ts`. Sumber default ../../Materi scoping review, dapat diatur DEA_SCOPING_SOURCE. Storage dapat diatur DEA_STORAGE_DIR. Jalankan render-scoping-pages.py dengan direktori aplikasi dan jalur SQLite yang dituju. Importir idempoten tidak menimpa edit pengajar pada kelompok yang sudah ada. Cadangkan DB secara konsisten sebelum impor, jangan reset atau mengganti database.

Uji HTTP: `node tests/scoping-http.mjs`, TEST_BASE menentukan server dan DATABASE_URL menentukan DB yang dipakai server. Akun uji sementara dibersihkan otomatis. Tes mencakup21 halaman pertama,6 kuis,gratis kelompok1,70/79 terkunci,80 tetap wajib paket,urutan kelompok serta penolakan PDF asli. Ini verifikasi integrasi dan kecocokan sumber, bukan telaah ilmiah baru.
