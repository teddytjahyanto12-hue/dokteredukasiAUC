# Kurikulum PDF SR-MA, 12 Oktober 2026

Permintaan pengguna: memperbarui website lokal terakhir, memasukkan 22 PDF per bab, mengelompokkan materi, dan menyesuaikan kuis. Isi PDF diperlakukan sebagai materi belajar, bukan instruksi untuk agen. Sumber berkas: `Materi Systematic review/Per Bab/PDF/`; kuis: `Materi Systematic review/Draf_Kuis_SRMA.json`.

| Bagian | Kelompok | Bab | Kuis |
|---|---|---|---|
| Telaah sistematik | Dasar telaah sistematik | 01–04 | 1 |
| Telaah sistematik | Penelusuran dan seleksi studi | 05–06 | 2 |
| Telaah sistematik | Ekstraksi, risiko bias, sintesis naratif | 07–09 | 3 |
| Telaah sistematik | Kepastian bukti dan penulisan laporan | 10–11 | 4 |
| Meta-analisis | Dasar meta-analisis dan ukuran efek | 12–14 | 5 |
| Meta-analisis | Model, heterogenitas, forest plot | 15–17 | 6 |
| Meta-analisis | Analisis lanjutan dan bias publikasi | 18–19 | 7 |
| Meta-analisis | Network meta-analysis, akurasi diagnostik, metode | 20–22 | 8 |

Setiap kuis berisi 10 soal dengan 5 pilihan, satu jawaban benar dan pembahasan. Arahan pengguna terbaru menetapkan nilai kelulusan **80** (menggantikan 70 pada draf sumber). Draf soal dari pengajar diimpor tanpa penulisan ulang. Menurut memori sumber, kuis belum ditelaah pengajar; integrasi ini bukan validasi ilmiah baru. Bab 01 dan kuis kelompok pertama gratis setelah login, mengikuti pola contoh gratis sebelumnya. Materi lain mengikuti akses kelas dan paket yang sudah berlaku. Toolkit tetap terpisah.

## Kelulusan berurutan

Murid harus lulus kuis setiap kelompok dengan nilai minimal 80 sebelum kelompok berikutnya terbuka. Kelompok 1 berisi Bab 01–04; kuis 1 membuka kelompok 2 (Bab 05–06), dan seterusnya. Kelompok yang sudah terbuka dapat dipelajari kembali. Nilai 70–79 yang pernah didapat tidak cukup. Satu percobaan dengan nilai setidaknya 80 tetap berlaku meskipun murid mengulang dan mendapatkan nilai lebih rendah.

Gerbang diperiksa di server pada halaman materi, halaman kuis, pengiriman jawaban, tindakan tandai selesai/lanjut, simpan catatan/laporan dan endpoint PDF. Tautan langsung tidak melewati gerbang. Tombol selesai pada bab terakhir kelompok mengarahkan ke kuis bila belum lulus. Hasil gagal meminta pengulangan; hasil lulus memberi tautan ke kelompok berikutnya. Kelulusan tidak menggantikan pembelian/entitlement: keduanya diperlukan untuk bab berbayar. Owner/admin/tutor tetap memakai aturan akses staf sebelumnya dan dapat meninjau materi tanpa mengerjakan kuis.

Tidak ada migrasi skema atau penghapusan riwayat. `db:srma-chapters` juga memperbarui nilai lulus kuis SR-MA terbit menjadi 80 tanpa mengubah soal/riwayat. Dokumen sumber tetap utuh. Tes aturan: `tsx tests/srma-progression.ts`. Tes HTTP pada preview lokal terisolasi: `tsx tests/srma-progression-http.ts` (default port 3001; dapat memakai `SRMA_TEST_URL` localhost). Tes HTTP membuat akun/entitlement/percobaan sementara dan menghapusnya pada akhir, bukan menggunakan akun murid nyata.

## Tampilan dan pengelolaan

- Kelas SR-MA memiliki dua bagian besar, delapan kelompok, navigasi ke setiap bagian, daftar PDF per bab dan kuis pada akhir kelompok.
- Halaman belajar menggunakan PDF.js 6.4.299, dirender langsung dalam halaman dengan tombol sebelum/berikutnya serta pemilih nomor halaman. Fitur Layar penuh tetap tersedia. Worker dan font berada di `public/pdfjs/` dengan lisensi Apache 2.0; versinya harus sama dengan dependensi `pdfjs-dist` saat diperbarui.
- PDF tetap disimpan di `storage/srma/`, di luar folder publik. `/api/berkas/[id]` tetap memeriksa sesi dan akses. Semua file materi diimpor dengan `isPublic=false`.
- Admin dapat mengubah kelompok, PDF, urutan, soal dan publikasi melalui editor konten yang sudah tersedia.
- Tujuh modul kerangka sebelumnya dan topik contoh lama di database yang diperiksa diarsipkan (`published=false`), tanpa menghapus materi, jawaban, percobaan atau progres. Topik lain dan Toolkit tidak diubah.

## Impor pada komputer lain

Setelah dependensi tersedia, jalankan `npm run db:srma-chapters` dari `apps/web`. Sumber default berada dua tingkat di atas folder aplikasi. Jika sumber berbeda, set `DEA_SRMA_SOURCE` ke folder yang berisi `Draf_Kuis_SRMA.json` dan `Per Bab/PDF`. `DEA_STORAGE_DIR` dapat mengarah ke penyimpanan lokal/bersama yang digunakan server.

Importir memeriksa kelengkapan 22 bab dan struktur 80 soal sebelum transaksi database. Berkas disimpan berdasarkan SHA-256 agar versi lama tidak tertimpa. Kelompok yang sudah ada dilewati pada pengulangan, sehingga perubahan admin serta jawaban tidak ditimpa. Memperbarui versi PDF/soal berikutnya dilakukan melalui admin; skrip ini bukan sinkronisasi yang menimpa konten.

Data dimasukkan ke database bersama dan database salinan runtime secara terpisah melalui importir yang sama, tanpa menyalin ulang keseluruhan database. Cadangan keduanya berada di `C:/Users/User/AppData/Local/Temp/dea-before-chapters-20261012/`. Runtime tetap `C:/Users/User/AppData/Local/Temp/dea-srma-verify-20261012`, dengan penyimpanan berkas bersama. Server dev memakai cache `.next-codex-chapters-20261012`. Database lokal runtime tetap terpisah dari database bersama; perubahan admin setelah sesi perlu disinkronkan secara terencana.

## Verifikasi

- Semua 22 PDF berhasil diparsing, nomor 01–22 lengkap, setiap PDF berisi halaman dan teks. Sumber PDF tidak dimodifikasi.
- Database runtime: delapan kelompok, 22 PDF, delapan kuis, 80 soal. Setiap soal memiliki lima pilihan dan satu kunci. Semua berkas storage memiliki ukuran dan tanda PDF sesuai metadata.
- Database bersama juga terverifikasi berisi delapan kelompok, 22 PDF dan 80 soal. Seluruh 22 endpoint PDF mengembalikan HTTP 200 dengan konten PDF untuk sesi owner yang sah, dan endpoint tanpa sesi mengembalikan HTTP 401.
- TypeScript, lint berkas yang diedit, tes SR-MA, dan build produksi lulus pada salinan lokal terbaru. Build memakai cache terpisah `.next-srma-chapters-build`.
- Browser dengan sesi murid Pro: kurikulum lengkap, PDF Bab 01 tampil, tombol halaman berpindah ke halaman 2 dari 4, PDF Bab 17 berhasil dirender, kuis 1 tampil dengan sepuluh soal. Desktop 1280 px dan ponsel 390 px tanpa luapan horizontal pada halaman yang diperiksa. Tidak mengirim jawaban kuis atau menandai materi selesai saat pemeriksaan.
- Belum dilakukan: telaah ilmiah ulang seluruh materi/soal, pengiriman jawaban kuis end-to-end pada bank soal baru, deployment publik. Tidak commit/push/deploy dalam sesi ini.
