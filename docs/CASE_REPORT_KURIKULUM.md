# Kurikulum Case Report

Permintaan pengguna 13 Oktober 2026: PDF per bab ditampilkan dalam website; nilai lulus minimal 80/100; gratis sampai kuis kelompok 1.

| Kelompok | Materi | Kuis | Akses |
|---|---|---|---|
| 1. Dasar Laporan Kasus | Bab 01–02 | Kuis 1, 10 soal | Gratis setelah login |
| 2. Pedoman dan Alur Kerja | Bab 03–04 | Kuis 2, 10 soal | Paket + lulus kuis 1 |
| 3. Judul sampai Linimasa | Bab 05–09 | Kuis 3, 10 soal | Paket + lulus kelompok sebelumnya |
| 4. Diagnosis sampai Persetujuan | Bab 10–14 | Kuis 4, 10 soal | Paket + lulus kelompok sebelumnya |
| 5. Etik, Mutu, dan Publikasi | Bab 15–18 | Kuis 5, 10 soal | Paket + lulus kelompok sebelumnya |
| 6. Penerapan | Evaluasi Bab 01–18, tanpa duplikasi PDF | Kuis 6, 10 soal | Paket + lulus kelompok sebelumnya |

Pembagian mengikuti coverage dalam Draf_Kuis_Case_Report.json. Teks 60 soal, 300 pilihan, dan 60 pembahasan dicocokkan dengan DOCX. Nilai sumber 70 diganti menjadi 80 sesuai permintaan; sumber asli tetap. Ini pencocokan isi, bukan telaah ilmiah baru.

## Impor dan penyimpanan

Dari apps/web: jalankan `node node_modules/tsx/dist/cli.mjs prisma/case-report-chapters.ts`. Sumber default ../../Materi case report; dapat ditentukan melalui DEA_CASE_REPORT_SOURCE. DEA_STORAGE_DIR menentukan storage privat. Database menggunakan DATABASE_URL. Jangan reset database.

Importir memvalidasi 18 PDF dan 6 kuis, menyimpan PDF dengan nama SHA-256, mengimpor kelompok sekali, lalu mengarsipkan hanya topik lama cmul9dd9k001cuzzo65kjsqq5. Riwayat/progres tidak dihapus; edit pengajar pada kelompok yang sudah ada dipertahankan. Paket kelas induk tetap membuka kelas anak.

Render halaman: `python prisma/render-case-report-pages.py . prisma/dev.db` (Python dengan PyMuPDF). Argumen database tambahan opsional untuk salinan runtime. Hanya registry Setting material.pdf-pages diperbarui. 18 PDF menghasilkan 49 halaman PNG privat dalam storage/srma-pages (format registry bersama penampil SR-MA). Murid hanya menerima halaman setelah pemeriksaan paket dan urutan kuis; PDF asli ditolak 403, termasuk bila registry rusak/hilang. Layar penuh tetap di website.

## Verifikasi dan runtime

TypeScript dan build produksi selesai. Tes HTTP: `node tests/case-report-http.mjs` pada runtime preview terpisah; TEST_BASE default localhost:3001, dapat diubah. Tes membuat dan membersihkan akun uji; jangan memakai akun murid asli. Menguji 70/79 belum lulus, 80 lulus tetapi paket tetap wajib, 18 PDF dapat dilihat pengguna berhak, PDF asli403, dan 6 kuis dengan nilai80.

Build baru .next-case-report-final-20261013 dibuat terpisah dari build aktif. Launcher Jalankan Website Stabil.bat diperbarui untuk build ini; PC2 harus menjalankan ulang Server Selalu Aktif.bat agar memuat kode baru. Database/storage bersama sudah diisi terarah dan dicadangkan konsisten di mesin alat Temp/dea-before-case-report-20261013. Runtime mesin alat tetap terpisah dari localhost PC2. Sumber materi, database, halaman privat dan build lokal tidak dipublikasikan ke GitHub.
