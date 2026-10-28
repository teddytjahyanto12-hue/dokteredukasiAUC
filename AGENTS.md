# Panduan kerja agen

## Folder kerja tunggal (arahan pengguna 27 Oktober 2026)

Semua pekerjaan, pembaruan, dan file baru proyek Dokter Edukasi Academy dibuat di SATU folder ini saja:
`\\192.168.88.10\DE\Dokter Edukasi Academy` (NAS Synology; di PC pengguna biasanya drive `W:\Dokter Edukasi Academy`).

- SERVER UTAMA website (sejak 27 Okt 2026): NAS Synology, Container Manager Project `dokter-edukasi` dari `deploy/nas/docker-compose.yml`, alamat LAN `http://192.168.88.10:3100`. Data live: `_server/data/dev.db` + `_server/data/storage`; rahasia: `_server/web.env` (`_server/` tidak masuk Git). Jangan mengedit/menyalin-timpa database live; jangan menjalankan server lain terhadap file itu.
- Cara rilis: commit + push perubahan `apps/web` ke `main` -> GitHub Actions membangun image `ghcr.io/teddytjahyanto12-hue/dokteredukasi-web:latest` -> tunggu run Actions sukses -> `python deploy/nas/unduh-image.py "_server/images/dokteredukasi-web-<commit>.tar"` (menyimpan image ke folder NAS) -> DSM Container Manager > Image > Action > Import > Add From File > From this DSM (pilih tar itu; tag `latest` berpindah ke image baru) -> Project `dokter-edukasi` > Stop > Action > Build (container dibuat ulang; migrasi Prisma otomatis saat start, salinan `dev.db.sebelum-start` dibuat) -> cek website live -> WAJIB bersihkan yang lama (arahan pengguna 28 Okt 2026): pastikan di halaman Container semua container memakai image `latest` yang baru, lalu Image > Remove Unused Images dan baca daftar di dialog konfirmasi (hanya image `<none>`/tidak dipakai yang boleh terhapus; batalkan bila ada image yang masih dibutuhkan). Arsip tar lama di `_server/images` dihapus otomatis oleh skrip setelah arsip baru lolos verifikasi. Catatan 28 Okt 2026: Build TIDAK menarik image baru sendiri, dan "Add From URL" menolak ghcr.io. Jangan membangun image di NAS.
- Mini PC = CADANGAN. Folder `Project  Framework Auc` di mini PC disamakan otomatis dari NAS setiap 15 menit (perubahan di sana akan tertimpa). Website mini PC dimatikan; peluncurnya meminta konfirmasi CADANGAN. Backup harian data server NAS ada di mini PC: `data bersama pc 1 pc 2\Backup Server NAS\<tanggal>` (14 terakhir).
- Folder `Desktop\Project  Framework Auc` di PC Teddy adalah salinan lama (tertinggal). Jangan dipakai untuk bekerja.
- Konfigurasi server/hosting, dokumen, materi, dan desain baru juga disimpan di folder NAS ini, bukan di folder lain.

## Aturan umum

1. Sebelum bekerja, baca PROJECT_MEMORY.md di akar proyek. Itulah sumber status dan keputusan bersama dengan Claude Code.
2. Baca dokumen detail yang dirujuk memori sesuai tugas. Periksa kondisi berkas aktual sebelum mengedit; jangan menimpa pekerjaan pengguna atau alat lain.
3. Komunikasikan pekerjaan dalam Bahasa Indonesia. Ikuti permintaan terbaru pengguna, dan catat perubahan arah penting dalam memori.
4. Sebelum memulai perubahan, catat pelaksana dan fokus aktif di PROJECT_MEMORY.md. Jangan mengedit berkas yang sedang dikerjakan sesi lain tanpa koordinasi.
5. Pisahkan fakta hasil audit, asumsi, dan usulan. Halaman yang belum diakses harus ditandai belum diverifikasi.
6. Jangan menyimpan kata sandi, token, data pribadi murid, atau isi video berlisensi di dokumen memori. Gunakan konfigurasi lokal yang diabaikan Git untuk rahasia jika diperlukan.
7. Jalankan pemeriksaan yang sesuai perubahan dan laporkan hasil aktual. Jangan mengklaim build, tes, atau deployment berhasil tanpa menjalankannya.
8. Setelah perubahan penting dan sebelum mengakhiri sesi, perbarui PROJECT_MEMORY.md: progres, keputusan, berkas terkait, verifikasi, hambatan, dan langkah lanjut. Lepaskan penanda pelaksana aktif saat serah terima.
9. Jangan membuat file memori terpisah khusus alat. Dokumen detail boleh dibuat di docs/ atau research/, lalu ditautkan dari memori bersama.

## Pemeriksaan versi dan koordinasi wajib untuk semua AI

Arahan pengguna 12 Oktober 2026: setiap pekerjaan harus memakai pembaruan terbaru dari folder bersama dan GitHub. Berlaku untuk Codex, Claude Code, serta agen lain yang bekerja di proyek ini.

1. Pada awal setiap perintah pengguna, baca ulang status terbaru PROJECT_MEMORY.md, penanda pelaksana aktif, dan aturan ini. Jangan mengandalkan ingatan percakapan atau status sesi sebelumnya.
2. Periksa direktori kerja, branch, HEAD, `git status --short`, dan `git diff` berkas terkait. Jalankan `git fetch origin`, lalu bandingkan HEAD dengan branch remote yang dipakai. Fetch tidak mengganti berkas kerja. Bila akses GitHub gagal, laporkan bahwa versi remote belum dapat diverifikasi; jangan menyatakan sudah mutakhir.
3. Jika remote lebih baru, integrasikan sebelum mengedit. Gunakan fast-forward hanya bila aman; bila ada pekerjaan lokal/konflik, pertahankan seluruh perubahan dan koordinasikan berkas yang bertabrakan. Jangan menjalankan reset keras, clean, force push, atau pull yang menimpa pekerjaan untuk mengejar versi terbaru.
4. Folder bersama merupakan sumber pekerjaan lokal yang belum dipublikasikan; GitHub merupakan sumber commit bersama. Keduanya harus diperiksa karena GitHub tidak memuat perubahan yang belum di-commit. Catat fokus dan daftar berkas yang akan diedit sebelum mulai; hindari berkas yang diklaim sesi aktif lain. Koordinasi melalui memori/serah terima tidak berarti AI membaca percakapan AI lain secara otomatis.
5. Tepat sebelum menulis setiap berkas, baca kondisi aktual dan cek apakah isi/hash berubah sejak dibaca. Jika berubah, baca ulang dan gabungkan perubahan terbaru; jangan menulis ulang dari snapshot lama. Periksa kembali memori dan status Git sebelum commit/push agar perubahan sesi lain tidak ikut tanpa peninjauan.
6. Setelah satu perubahan selesai dan pemeriksaan terkait lulus, commit dan push perubahan yang sudah ditinjau beserta catatan serah terima ke branch yang disepakati. Pengguna mengizinkan sinkronisasi GitHub ini. Jangan memasukkan rahasia, database lokal, unggahan privat, data pribadi, dokumen berlisensi, atau pekerjaan sesi lain yang masih berjalan. Jika sebagian perubahan belum siap dipublikasikan, laporkan bagian yang belum tersinkron dan alasannya.
7. Periksa sumber runtime website, lokasi database/storage, serta versi build yang sedang dipakai. Salinan runtime atau checkout Desktop tidak otomatis mengikuti folder bersama. Sinkronkan kode/aset terbaru yang sudah siap dan buat build baru terpisah sebelum mengganti server produksi; jangan membangun ulang folder build aktif. Jangan mengganti database dengan salinan lama: gunakan migrasi/impor terarah dan cadangan konsisten. Perubahan admin pada database runtime terpisah harus dicatat untuk rekonsiliasi.
8. Sebelum selesai, fetch lagi bila ada commit/push, verifikasi SHA remote terhadap commit yang dipublikasikan, catat berkas/commit, hasil pemeriksaan aktual, versi runtime, pekerjaan belum tersinkron, dan langkah berikutnya. Lepaskan hanya penanda pelaksana milik sesi sendiri. Jangan mengklaim semua komputer/AI tersinkron tanpa memeriksanya.
