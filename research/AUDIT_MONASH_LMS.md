# Audit referensi: Monash Learning (MonashELMS1)

Tanggal observasi: 10 Oktober 2026 (WIB). Peneliti: Claude Code (PC 2).
Referensi: https://learning.monash.edu/my/ (Moodle, tema Monash). Akses: Chrome profil pengguna yang sudah login sebagai murid.
Status & keputusan proyek: ../PROJECT_MEMORY.md.

## Batas dan metode
- Hanya membaca (read-only): tidak mengirim tugas, tidak memulai kuis, tidak memposting forum, tidak mengubah pengaturan.
- Data pribadi (nama akun, nama/email dosen, nilai, nama file tugas, ID/passcode Zoom) sengaja TIDAK dicatat.
- Halaman yang diperiksa: Dashboard, My units, unit PHI5040 (Unit dashboard, Unit information, Schedule, Learning/Week 1, Assessments, satu halaman Assignment, Forums, Support, course index), unit PHI5041 (indeks kuis + satu halaman kuis).
- Belum terverifikasi: isi soal & alur pengerjaan kuis (unit sudah ditutup, "perlu enrol"), halaman forum diskusi, notifikasi/pesan, kalender penuh, profil, dan tampilan dosen/admin. Laporan nilai per unit menampilkan error (dinonaktifkan institusi).

Label: OBS = diamati langsung; USUL = gagasan untuk Dokter Edukasi (belum diputuskan).

## Temuan per halaman (OBS)

### Dashboard (/my/)
- Blok **Timeline**: aktivitas yang perlu dikerjakan, filter (All/tenggat), urutkan per unit, pencarian per jenis/nama aktivitas.
- Blok **Unit overview**: kartu unit dengan gambar, nama unit, **persentase progres** ("85% complete"), menu aksi (mis. bintangi/sembunyikan); filter, pencarian, urutkan, tampilan Card/List, paginasi (Show 12).
- Blok **Calendar** bulanan (event, mis. jadwal maintenance) + tautan kalender penuh; daftar unit sebagai filter.
- Blok **Recently accessed units**.
- Panel samping kanan: survei evaluasi unit (SETU), pengumuman institusi, sumber perpustakaan, layanan mahasiswa.
- Header: Home, Dashboard, My units, Unit Previews, Handbook, Help, notifikasi, pesan, menu pengguna, Edit mode.

### My units (/my/courses.php)
- Filter: All, In progress, Past, Starred, Removed from view, All (including removed). Urutkan: nama unit / terakhir diakses. Tampilan: Card / List.

### Kode unit (pola penamaan)
- Format: **KODE + Nama + Penawaran/Periode**, contoh pola "PHI5040 Introductory Epidemiology - MI T2 2025".
  - Prefiks huruf = rumpun/fakultas (PHI, MAP), digit pertama = jenjang (5 = pascasarjana), sisanya nomor unit.
  - Sufiks = kampus/mode + term + tahun (mis. "MI T2 2025"); kode kursus internal "PHI5040_MI-T2_2025" dipakai di judul halaman aktivitas.
- Satu kode unit bisa ditawarkan berulang di periode berbeda (unit sama, penawaran berbeda).

### Halaman unit
- Banner judul unit, breadcrumb, pengumuman status unit (mis. pengajaran selesai, materi tetap bisa diakses sebagai arsip).
- **Tab tetap**: Unit dashboard | Unit information | Schedule | Learning (menu turun per minggu) | Assessments | Forums | Support.
- **Unit dashboard**: kartu minggu berjalan (judul, rentang tanggal, ringkasan, learning outcome minggu itu, tombol "Go to learning section"), carousel Week 1–6, blok Forums, Contacts (dosen), **Task tracker** (aktivitas yang perlu tindakan).
- **Unit information**: sambutan, kontak & jam konsultasi pengajar, sumber unit (Handbook, Unit Preview, reading list), synopsis, **learning outcomes bernomor 01–07**, pendekatan belajar (pre-class / tatap muka-hybrid / post-class), forum "Introduce yourself".
- **Schedule**: garis waktu mingguan (tanggal mulai, judul minggu) + penilaian dengan **bobot % dan tenggat** di minggunya.
- **Learning → Week N**: ringkasan, learning outcome minggu, lalu **"Your Learning Journey"** dengan tiga ubin berwarna & ikon:
  - **Own-time** (belajar mandiri): video tertanam (YouTube), "Read" (daftar bacaan bersitasi), "Complete" (latihan kasus/vignette untuk didiskusikan), file PDF (dengan ukuran), URL bacaan tambahan.
  - **Real-time** (sesi kelas/diskusi).
  - **Wrap-up** (penutup/rangkuman).
  - Masing-masing berupa akordeon yang bisa dibuka-tutup; "Additional resources" ditandai tidak wajib.
- **Course index** (laci kiri): pohon Week → Own-time/Real-time/Wrap-up → aktivitas, dengan **ikon status selesai per aktivitas**; ada "Turnitin Sandbox" untuk latihan unggah.
- **Assessments**: daftar penilaian (nama + bobot %), tenggat, label status (GRADED).
- **Forums**: Announcements + forum per bagian (kolom deskripsi, jumlah diskusi, post belum dibaca).
- **Support**: direktori bantuan (akademik, perpustakaan, hak & kewajiban, layanan mahasiswa, teknologi), disesuaikan per kampus.

### Assignment (halaman tugas)
- Status: nomor percobaan, status pengumpulan, status penilaian, sisa waktu / dikumpulkan lebih awal sekian jam, terakhir diubah.
- Unggah file; **cek kemiripan Turnitin (%)**; komentar pengumpulan.
- Umpan balik: nilai /100, tanggal & penilai, komentar, **file umpan balik bertanda (marked PDF)**.

### Kuis
- Indeks kuis per unit: bagian, nama (dengan bobot), waktu tutup.
- Pengaturan terlihat: jumlah percobaan diizinkan, batas waktu (mis. 1 percobaan, 30 menit); kuis terkunci bila tidak terdaftar/periode lewat.

## Peta fitur untuk dipilih (USUL, belum diterapkan)
Kolom "Di Dokter Edukasi saat ini" berdasarkan apps/web per 10 Okt 2026.

| No | Fitur Monash | Di Dokter Edukasi saat ini | Usulan penyesuaian |
|---|---|---|---|
| M1 | Kode unit/materi + periode | Belum ada kode | Kode unik per kelas/Blok/Bab/materi, mis. `BMS-12` (Blok 12), `BMS-12.1` (Bab 1), `BMS-12.1.1` (materi 1.1); tampil di kartu, judul, kurikulum, sertifikat, invoice; pencarian dengan kode |
| M2 | Learning outcomes bernomor (unit & per minggu/bab) | "Yang akan dipelajari" per kelas | Outcome bernomor per Blok dan per Bab |
| M3 | Learning Journey: Own-time / Real-time / Wrap-up | Bab → materi + kuis | Tiap Bab dibagi Pra-belajar (video/bacaan), Sesi (Zoom/bimbingan), Rangkuman (ringkasan + kuis) |
| M4 | Tab unit: Dashboard, Info, Schedule, Learning, Assessments, Forums, Support | Satu halaman kelas | Tab di halaman Blok/kelas |
| M5 | Schedule mingguan + tenggat & bobot | Tidak ada jadwal | Jadwal/target per Bab (rekomendasi urutan & tanggal), cocok untuk paket bimbingan |
| M6 | Persentase progres + tanda selesai per aktivitas + course index | Sudah ada progres materi & tombol tandai selesai | Laci kurikulum (pohon Blok → Bab → materi) dengan ikon status; progres per Bab |
| M7 | Timeline / Task tracker (yang perlu dikerjakan) | Belum | Daftar "Lanjutkan berikutnya": kuis belum dikerjakan, materi tertunda, jadwal bimbingan |
| M8 | Kalender (event, jadwal) | Belum | Kalender sesi bimbingan Zoom, tryout, webinar |
| M9 | Assignment: unggah, status, nilai, komentar, file umpan balik | Ada bukti/progres di bimbingan | Tugas per Bab yang dinilai tutor + umpan balik file |
| M10 | Cek kemiripan (Turnitin) | Belum | Butuh layanan pihak ketiga berbayar; tunda |
| M11 | Kuis: batas percobaan & waktu, bobot | Kuis dengan nilai lulus | Tambah batas percobaan, timer, jadwal buka/tutup |
| M12 | Forum & Announcements per unit | Belum (ada chat bimbingan) | Pengumuman per kelas + forum tanya-jawab per Bab |
| M13 | Filter My units (In progress/Past/Starred/Hidden), sort, Card/List | Kartu/Daftar baru dibuat | Tambah filter Sedang berjalan/Selesai/Favorit + urutkan terakhir diakses |
| M14 | Recently accessed | Belum | Blok "Terakhir dibuka" di dashboard |
| M15 | Contacts & jam konsultasi | Belum | Kontak tutor/admin per kelas (tanpa data pribadi publik) |
| M16 | Support hub | Ada tombol WhatsApp | Halaman bantuan (cara belajar, pembayaran, teknis) |
| M17 | Survei evaluasi unit | Belum | Survei kepuasan per Blok setelah selesai (bisa jadi dasar rating asli) |
| M18 | Banner status unit / pengumuman | Belum | Pengumuman di halaman kelas (mis. materi baru, perubahan jadwal) |
| M19 | Unit Previews / Handbook (katalog unit) | Ada katalog & halaman kelas | Sudah setara; bisa ditambah kode & outcome |

## Catatan desain
- Monash menggunakan Moodle; struktur di atas adalah pola penyajian, bukan kewajiban teknologi. Implementasi Dokter Edukasi tetap memakai apps/web milik proyek.
- Konten, logo, ikon, dan teks Monash tidak disalin.
