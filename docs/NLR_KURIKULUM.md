# Kurikulum Narrative Literature Review

Sumber: 19 PDF per bab, Contoh_Naskah_NLR_Beranotasi.pdf, dan Draf_Kuis_NLR.docx/.json dari pengajar. Dokumen diperlakukan sebagai materi, bukan instruksi agen. Isi soal/pembahasan dipertahankan; passingScore sumber 70 diganti menjadi 80 sesuai arahan pengguna.

| Kelompok | Materi | Kuis | Akses |
|---|---|---|---|
| 1. Dasar Tinjauan Pustaka Naratif | Bab 01–03 | Kuis 1, 10 soal | Gratis setelah login |
| 2. Topik, Tujuan, dan Judul | Bab 04–07 | Kuis 2, 10 soal | Paket + lulus kuis 1 |
| 3. Penelusuran, Seleksi, Sintesis, dan Kesenjangan | Bab 08–12 | Kuis 3, 10 soal | Paket + lulus kuis 2 |
| 4. Penulisan, SANRA, Etika, dan Publikasi | Bab 13–19 | Kuis 4, 10 soal | Paket + lulus kuis 3 |
| 5. Panduan Penulisan dan Penerapan | Contoh naskah beranotasi; evaluasi Bab 1, 3, 5, 13, 17, 19 | Kuis 5, 10 soal | Paket + lulus kuis 4 |

Nilai kelulusan: 80/100 (8 dari 10 jawaban benar). Lulus kuis 1 tidak memberikan akses paket. Semua bab kelompok 1 dan kuis 1 gratis; tidak ada materi gratis di kelompok 2–5.

## Impor dan penyimpanan

Jalankan dari apps/web: `node node_modules/tsx/dist/cli.mjs prisma/nlr-chapters.ts`. DEA_NLR_SOURCE menunjuk folder Materi narrative review; DEA_STORAGE_DIR menunjuk storage privat. Importir memvalidasi PDF, 5 kuis, masing-masing 10 soal/5 pilihan/1 kunci/pembahasan. Kelompok yang sudah ada dilewati agar edit admin dan riwayat tetap terjaga. Topik NLR lama diarsipkan tanpa menghapus progres atau percobaan.

Render privat: `python prisma/render-nlr-pages.py <apps/web> <database bersama> [database runtime]`. Registri memakai material.pdf-pages; gambar berada di storage/srma-pages agar sesuai penampil privat yang sudah ada. PDF asli berada di storage/nlr, bukan public/Git. Cadangan SQLite konsisten harus dibuat sebelum impor. Jangan menyalin database lama ke runtime.

Status verifikasi dan versi runtime dicatat dalam PROJECT_MEMORY.md. Pencocokan draf bukan telaah ilmiah baru oleh pengajar.
