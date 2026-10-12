# Ruang belajar dan Toolkit SR-MA

Implementasi 12 Oktober 2026 mengikuti enam jenis alat yang terlihat di halaman Auctus SR-MA pada pemeriksaan terbaru. Referensi: https://auctus.academy/riset/systematic-review. Detail audit sebelumnya ada di `research/Laporan_Audit_SRMA_Auctus_2026-10-12.docx`. Konten awal ditulis untuk Dokter Edukasi Academy; video, bank soal, naskah terbit, dan kode berlisensi referensi tidak disalin.

## Navigasi dan pengelolaan

- Kurikulum: kelas `review-systematic-review`, materi tetap melalui `/materi/[topicId]`. Daftar Modul dapat dibuka dan ditutup di ponsel; sidebar tetap terlihat di desktop. Progres, tandai selesai, lanjut, video/PDF/teks, dan kuis menggunakan fungsi aplikasi yang sudah tersedia.
- Toolkit: `/toolkit-srma`, terpisah dari kurikulum. Tautan kategori `review-toolkit-srma` mengarah ke halaman ini.
- Admin: **Konten materi > Kelola pembelajaran dan Toolkit SR-MA**, atau `/admin/srma`. Modul, materi, video, sumber, urutan, dan soal dikelola melalui editor kategori/topik yang sudah tersedia. Nama alat, deskripsi, petunjuk, publikasi, pertanyaan Idea Board, FAQ, template, guideline, dan prompt bisa diubah tanpa mengedit kode. Entri pustaka memakai form, bukan editor JSON.
- Kerangka awal baru: 7 modul kurikulum, 17 materi teks, 7 kuis latihan dengan satu soal contoh per kuis; 1 panduan bonus berada di kategori Toolkit. Materi lama tetap dipertahankan sehingga jumlah total kategori bisa lebih besar. Ini kerangka awal, bukan rekaman video atau paket pelajaran yang sudah lengkap.
- Dokumen panduan pengajar buatan Claude PC 1 di `research/Panduan_Modul_SRMA_2026-10-12.docx` tetap dipertahankan; isinya tidak otomatis diterbitkan oleh fitur ini.

## Alat yang tersedia

| Alat | Perilaku |
|---|---|
| Idea Board | Pertanyaan bertahap yang dapat diubah admin, maksimal 5 proyek per pengguna, penyimpanan otomatis setelah nama diisi, muat ulang, ekspor rangkuman |
| Deduplikasi | Impor beberapa RIS/NBIB, normalisasi DOI, pencocokan konservatif judul/tahun/penulis, pertahankan abstrak, tinjau pasangan, ekspor RIS, lanjut screening tanpa unggah ulang |
| Screening | Judul/abstrak, keputusan include/maybe/exclude, catatan alasan, keyboard I/M/E, navigasi ulang, proyek, ekspor keputusan CSV dan RIS included |
| Konverter | MD/Cohen d/Hedges g, SE ke SD, CI mean ke SD dengan nilai kritis yang dimasukkan, pendekatan median/IQR normal, rekonstruksi SD kelompok independen, perubahan sebelum-sesudah dengan korelasi eksplisit |
| Template/panduan | 6 kerangka naskah, guideline, prompt awal, pencarian dan kelompok, tautan sumber/berkas pengajar, DOCX dihasilkan dari isi yang diubah admin |
| FAQ | Pencarian, filter kelompok, jawaban dan tautan resmi yang bisa diubah admin |

Kalkulator mengikuti rumus dasar [Cochrane Handbook Bab 6](https://training.cochrane.org/handbook/current/chapter-06). Pendekatan median/IQR yang tersedia secara eksplisit memakai asumsi normal; belum merupakan pilihan metode Wan/Luo/Hozo. CI sampel kecil membutuhkan nilai t kritis yang tepat. Konversi p-value, pemisahan comparator multi-arm, dan rekonstruksi pasangan selain SD perubahan belum tersedia. Rating AI untuk screening tidak aktif karena belum ada layanan AI yang dikonfigurasi. Screening saat ini satu penelaah, bukan sistem penyelesaian konflik dua penelaah. DOCX adalah kerangka sendiri, bukan salinan manuskrip yang telah terbit.

## Akses dan penyimpanan

- Basic membuka kelas SR-MA; mapping Toolkit terdapat pada Intermediate dan Pro. Akses tetap mengikuti entitlement aktif dan pemetaan kategori yang bisa dikelola admin. Owner/admin/tutor mengikuti aturan akses aplikasi yang sudah ada. Paket induk yang memuat kategori Toolkit juga mengikuti aturan pewarisan kategori aplikasi.
- Halaman dan tindakan simpan proyek memeriksa akses di server. Isi Toolkit/proyek tidak dimuat untuk pengguna tanpa akses.
- Deduplikasi diproses di browser; batas impor 10.000 referensi atau total 50 MB. Screening baru dikirim ke server pada penyimpanan otomatis/manual. Data proyek tersimpan maksimal 2 juta karakter per proyek; ekspor data bila batas tercapai.
- Menggunakan tabel `Setting` yang sudah ada dengan namespace `srma.config`, `srma.project.{userId}.{tool}.{id}`, `srma.note.{userId}.{itemId}`, dan `srma.report.{userId}.{itemId}.{tanggal}`. Pengguna hanya memperoleh proyek/catatan dari sesi sendiri. Pembacaan pengaturan umum dibatasi pada daftar key situs, sehingga data proyek tidak ikut dimuat.
- Update proyek memakai revisi terakhir sebagai pembanding agar perubahan dari tab lain tidak tertimpa. Kegagalan penyimpanan menghentikan autosave sampai pengguna menyimpan ulang.
- Catatan pribadi disimpan melalui tombol Simpan catatan. Laporan masalah dikirim secara terpisah dan tampil pada admin; admin dapat menandai ditangani. Satu laporan per pengguna/materi/tanggal diperbarui jika dikirim ulang.
- Tidak ada migrasi/reset database. Namespace ini tidak memiliki relasi cascade database; penghapusan akun pada pengembangan berikutnya perlu menghapus proyek/catatan/laporan dengan prefix pengguna tersebut. Pertimbangkan model relasional khusus jika volume proyek meningkat.

## Menyiapkan komputer lain

Jalankan `npm run db:srma-workspace` setelah dependensi dan database aplikasi tersedia. Skrip menambahkan mapping Intermediate/Pro, konfigurasi awal, serta modul dengan ID tetap; tidak menimpa isi modul yang sudah ada. Migrasi kecil template hanya mengganti versi kerangka awal yang cocok persis dan belum diedit. Panduan bonus awal dipindah ke kategori Toolkit. Jalankan `npm run test:srma` untuk tes algoritme dan ekspor; `tsx tests/srma-access.ts` memeriksa mapping paket pada database lokal yang sudah disiapkan.

Untuk verifikasi di folder bersama Windows, cache dapat dipisahkan lewat `DEA_BUILD_DIR=.next-srma-dev` atau `.next-srma-build`. Drive jaringan sementara menghindari masalah resolusi path UNC pada webpack. Jangan mengganti cache server komputer lain atau mereset database untuk mengatasi masalah tersebut.

Pada sesi ini, drive jaringan tetap mengalami hasil route/watcher yang tidak konsisten. Build dan uji browser akhirnya dijalankan pada salinan kode lokal `C:\Users\User\AppData\Local\Temp\dea-srma-verify-20261012`. Salinan menjalankan database asli melalui `DATABASE_URL=file:R:/apps/web/prisma/dev.db` dan storage asli melalui `DEA_STORAGE_DIR=R:\apps\web\storage`. R: adalah pemetaan sementara ke akar proyek bersama, bukan salinan database. Salinan runtime tidak otomatis mengikuti perubahan kode di folder bersama; perubahan konten lewat admin langsung memakai database bersama. Jangan menggunakan salinan runtime ini untuk menyunting kode sumber.

## Hasil verifikasi sesi

- `tsc --noEmit`, lint berkas SR-MA, dan build produksi lulus pada salinan lokal. Kode fitur dibandingkan dengan sumber bersama sebelum serah terima. Build mencakup snapshot aplikasi saat salinan dibuat; pekerjaan Medical Cheatsheet & Calculator yang sedang berjalan di sesi Claude lain tidak termasuk klaim verifikasi ini.
- Tes RIS/NBIB, DOI konflik, pelestarian abstrak, ekspor CSV/RIS, MD/SMD, batas input, SD perubahan, dan paket DOCX lulus. Mapping Basic tanpa Toolkit serta Intermediate/Pro dengan Toolkit lulus pada database asli.
- Uji browser: Idea Board autosave dan muat ulang, deduplikasi 3 referensi menjadi 2, lanjut screening tanpa unggah ulang, shortcut I, perhitungan MD=2 dan SE(MD)=0,4, pencarian FAQ, unduh DOCX, simpan catatan, laporan muncul dan ditangani admin, simpan konfigurasi admin.
- Akun murid Pro benar-benar membuka Toolkit. Proyek admin tidak terlihat pada akun murid. Uji ponsel memakai lebar 390 px; lebar halaman dan viewport sama sehingga tidak ada overflow horizontal. Daftar Modul dapat dibuka dan ditutup.
- DOCX hasil unduh browser diperiksa CRC ZIP dan parsing seluruh XML, semuanya valid. Tata letak Word belum dirender pada sesi implementasi ini.
- Dua proyek contoh, satu catatan contoh, dan satu laporan contoh penguji telah dibersihkan. Paket, pembayaran, data murid, dan materi lama tidak dihapus.
- Belum commit, push, atau deploy. Cache percobaan di folder bersama dibiarkan di luar Git dan tidak ikut pemeriksaan tipe. Cache `.next` yang sudah ada tidak dihapus. Pratinjau lokal berada di http://127.0.0.1:3000/toolkit-srma; editor di http://127.0.0.1:3000/admin/srma.
