# Audit publik Auctus Academy

Tanggal observasi: 23 September 2026 (WIB). Peneliti: Codex.
Referensi: https://auctus.academy/
Status proyek dan serah terima: ../PROJECT_MEMORY.md.

## Batas dan metode
Audit ini mencakup halaman publik yang ditemukan melalui beranda, katalog, footer, menu, serta tautan di halaman tersebut. Membaca teks web dan memeriksa browser JavaScript; halaman login, pendaftaran, FAQ, menu, dan dua gerbang pembelian diperiksa secara langsung. Tidak membuat akun, mengirim formulir, membeli, mengirim pesan, atau memasuki konten berbayar.

22 halaman publik dicatat di bawah. Ini bukan klaim seluruh halaman situs sudah ditemukan: sitemap/robots tidak dapat dibaca oleh alat web, pencarian domain tidak memberi hasil tambahan, dan area akun belum diperiksa. Form eksternal, seluruh gambar promosi, semua kombinasi interaksi, serta seluruh ukuran layar belum diaudit. User meminta tahap publik dahulu; login manual menyusul.

Label: OBS = perilaku/UI diamati; PUB = pernyataan publik platform, belum diuji sebagai kemampuan; USUL = rancangan untuk proyek baru. Harga/jadwal adalah snapshot observasi, bukan harga yang dijamin tetap.

## Inventaris sumber
Semua URL diakses pada tanggal observasi. W = halaman dibaca dengan alat web; B = browser langsung.

| ID | Halaman / URL | Metode | Cakupan yang diperiksa |
|---|---|---|---|
| S01 | https://auctus.academy/ | W+B | Beranda, kategori, CTA, footer, tampilan visual |
| S02 | https://auctus.academy/produk | W | Katalog utama dan seluruh tautan produk tambahan |
| S03 | https://auctus.academy/systematic-review | W+B | Deskripsi, paket dinamis, FAQ, gerbang beli coaching |
| S04 | https://auctus.academy/ekg | W+B | Paket gratis/pro dan membuka FAQ lifetime |
| S05 | https://auctus.academy/ukmppd | W+B | Paket, FAQ, fitur yang diiklankan, menu |
| S06 | https://auctus.academy/signup | W+B | Formulir pendaftaran tanpa submit |
| S07 | https://auctus.academy/login | W+B | Formulir login tanpa submit |
| S08 | https://auctus.academy/forgot-password | B | Formulir reset tanpa submit |
| S09 | https://auctus.academy/kebijakan-privasi | W | Kebijakan privasi versi 2026-09-07-coaching-v1 |
| S10 | https://auctus.academy/syarat-ketentuan/coaching | B | S&K aktif versi 4, 19 September 2026 pukul 15.24 WIB; /syarat-ketentuan mengarah ke sini |
| S11 | https://auctus.academy/systematic-review/bootcamp | W+B | Paket, batch aktual, aturan tes dan gerbang login |
| S12 | https://auctus.academy/systematic-review/bootcamp/syarat-ketentuan | W | Ketentuan versi bootcamp-srma-2026-09-12-v7 |
| S13 | https://auctus.academy/produk/record-webinar-jurus-cari-ide | W | Detail rekaman webinar |
| S14 | https://auctus.academy/produk/record-webinar-alur-menulis-srma | W | Detail rekaman webinar |
| S15 | https://auctus.academy/produk/record-webinar-meta-analisis-kilat | W | Detail rekaman webinar |
| S16 | https://auctus.academy/produk/anki-cardio-plus | W | Detail flashcard |
| S17 | https://auctus.academy/produk/anki-respi-plus | W | Detail flashcard |
| S18 | https://auctus.academy/produk/anki-preklinik-bms | W | Detail flashcard |
| S19 | https://auctus.academy/produk/flashcard-anki-per-stase-koas | W+B | Detail dan gerbang pilih varian |
| S20 | https://auctus.academy/produk/free-webinar-optimalkan-ai-sysrev-meta-analysis-31-agustus | W | Webinar gratis, tautan formulir eksternal |
| S21 | https://auctus.academy/produk/free-platform-belajar-kedokteran-publikasi | W | Akses gratis, tautan signup |
| S22 | https://auctus.academy/produk/free-tryout-uknpdpd-september | W+B | Detail, jadwal, tautan pendaftaran eksternal |

Tambahan: /dashboard diperiksa dan mengarah ke /login?next=/dashboard (OBS). Menu menautkan /ukmppd/dashboard, /riset, /ekg/modul; ketiganya juga diperiksa di browser dan mengarah ke login dengan parameter next yang sesuai (OBS). S&K menautkan /riset/systematic-review/coaching. Isi keempat area akun ini belum diaudit. Kegagalan alat web membaca tiga tujuan menu bukan bukti halaman rusak.

## Peta produk dan akses
### Platform umum — S01, S02
PUB: satu akun menghubungkan tiga jalur pembelajaran (ujian kedokteran, EKG, riset). Model akses gratis lalu upgrade. Katalog juga mencakup bootcamp, rekaman webinar, dan Anki. Ada dukungan WhatsApp, email, Instagram, testimoni, dan tautan legal. Klaim alumni/rating adalah pemasaran yang belum diverifikasi independen.

### SR-MA — S03
PUB: Free Rp0 (modul pengenalan); Video Only Rp349.000 (18 modul, >9 jam, sertifikat, komunitas); Complete Rp499.000 (tambahan materi teks, kuis, template, prompt dan kode analisis); Private Coaching Rp949.000 (pendampingan, alat bantu referensi/konversi effect size). Course diklaim lifetime; bimbingan dibatasi masa layanan. Upgrade membayar selisih. OBS: memilih coaching membuka dialog login dengan nama produk, email/password, Google, serta opsi daftar; checkout sesudah login belum diperiksa.

### EKG — S04
PUB: Free menyediakan 20 kasus, pengantar algoritma, kuis per bab. Pro Lifetime Rp349.000 menawarkan video >8 jam, 600+ kasus, latihan 60 detik, dan pembaruan kasus. OBS: FAQ lifetime dapat dibuka dan menjelaskan pembayaran sekali. Pemutar, timer, skor, serta jumlah kasus sebenarnya belum diperiksa.

### UKNPDPD — S05
PUB: Free menawarkan tryout bulanan, planner, materi/mindmap dan OSCE. Bundle 5 Rp149.000: lima tryout (~750 soal); Bundle 10 Rp249.000: sepuluh tryout (~1.500 soal); Ultimate Rp549.000: tambahan latihan, flashcard dan OSCE. Paket berbayar berlaku enam bulan; FAQ menyebut riwayat tryout tetap tersedia setelah masa akses. Fitur yang dipromosikan: analitik topik, soal tersimpan, planner adaptif, latihan berdasarkan sistem/topik/kesulitan. Angka konten berbeda antarbagiannya; jangan jadikan jumlah tersebut spesifikasi pasti. Implementasi adaptif dan spaced repetition belum diuji.

### Bootcamp — S11
OBS: browser menampilkan early bird; pendaftaran 14 September, akhir early bird 29 September, penutupan 13 Oktober 2026 (00.00 WIB). Rentang pelaksanaan 17 Oktober–12 Desember 2026. Halaman menawarkan sembilan sesi, pre/post-test, Zoom, rekaman/PDF, sertifikat. Harga early/reguler: baru 699/799 ribu; Video Only 350/450 ribu; Complete 200/300 ribu; coaching/alumni 100/100 ribu. Login diperlukan untuk harga sesuai akun dan pendaftaran. Tautan menuju /login?next=%2Fcheckout%3Fbootcamp%3Dsysrev-b1-2026. Hasil ekstraksi web sempat mengatakan status tidak tersedia, sementara browser berhasil memuat jadwal; gunakan observasi browser untuk kondisi saat audit.

### Produk tambahan — S13–S22
| Sumber | Jenis | Harga yang ditampilkan | Catatan |
|---|---|---|---|
| S13–S15 | Tiga rekaman webinar riset | Rp99.000 per produk | Materi dan rekaman; akses aktual belum diperiksa |
| S16 | Anki Cardio | Rp249.000 | Detail produk publik |
| S17 | Anki Respi | Rp199.000 | Detail produk publik |
| S18 | Anki preklinik BMS | Rp199.000 | Detail produk publik |
| S19 | Anki per stase | Mulai Rp75.000 | Tombol pilihan membuka login; varian belum terlihat |
| S20 | Webinar gratis | Gratis | Jadwal 18 September 2026; tautan forms.gle, belum dibuka |
| S21 | Platform gratis | Gratis | Mengarahkan ke signup |
| S22 | Tryout gratis September | Gratis | 150 soal; daftar via bit.ly; belum dibuka |

S22: pendaftaran berakhir 21 September 23.59 WIB; pengerjaan 22–26 September. Pengumuman di deskripsi tertulis 27 September, tetapi bagian timeline menyebut 27 Agustus. Pendaftaran masih ditautkan meski tanggal batas sudah lewat pada hari audit; belum diperiksa apakah form eksternal menolak pendaftaran terlambat.

## Akun dan alur publik
OBS (S06–S08): login memakai email/password atau Google, tersedia tampilkan password dan lupa password. Pendaftaran meminta nama lengkap, WhatsApp, instansi/universitas (pilihan), batch UKNPDPD opsional, email, password, konfirmasi password; Google juga tersedia. Reset meminta email. Tidak ada formulir yang dikirim, sehingga validasi server, verifikasi email, maupun alur OAuth belum diuji.

Alur yang terbukti: beranda → katalog/detail → pilihan paket → gerbang login. Dashboard langsung juga mengarah ke login dengan tujuan kembali. Alur lanjutan pembayaran → entitlement → belajar adalah PUB/dugaan rancangan, belum diuji.

## Ketentuan coaching — S10
Observasi dokumen aktif, bukan kebijakan proyek baru atau pendapat hukum.

| Aspek | Ringkasan |
|---|---|
| Aktivasi | Batas 180 hari setelah pembayaran; layanan berjalan 180 hari sejak aktivasi |
| Course | Akses lifetime terpisah dari durasi bimbingan |
| Upgrade | Complete→Coaching Rp450.000; Video→Coaching Rp600.000 |
| Extend | Rp75.000/bulan; 1–6 bulan/transaksi; tanpa tambahan kuota dormant/revisi |
| Dormant | Sekali, tepat 30 hari; persetujuan maksimal dua hari kerja; tidak retroaktif/diperpendek; course/riwayat chat tetap terbaca |
| Pengajuan dormant | Tanggal mulai maksimal 30 hari mendatang ketika aktif; menunggu keputusan tetap mendapat layanan |
| Bimbingan | Satu judul aktif; tutor membimbing, tidak mengerjakan naskah; tanpa jaminan publikasi |
| Revisi | Submit saat masa layanan: tiga periode ×14 hari; permintaan maksimal 180 hari setelah layanan berakhir |
| Respons | Jadwal tutor tiga jam/hari kerja; tanggapan maksimal 24 jam sejak pesan terakhir |
| Persetujuan | Rekaman dan pemasaran memerlukan persetujuan terpisah |
| Refund | Kegagalan belum diperbaiki tujuh hari kerja; baru: max(0,dibayar−499.000)×sisa/180; upgrade: dibayar×sisa/180 |
| Batas refund | Sisa maksimal 180; dormant bukan hari terpakai; Complete dipertahankan; keputusan/pembayaran masing-masing maksimal tujuh hari kerja setelah persyaratan lengkap |

Status mencakup menunggu aktivasi, aktif, dormant, kedaluwarsa, naskah dikirim, revisi aktif, selesai. Rumus refund extend perlu klarifikasi. Baca dokumen asli untuk pengecualian dan definisi lengkap sebelum implementasi.
## Ketentuan bootcamp — S12
PUB: versi syarat dan waktu persetujuan melekat pada pesanan. Seat untuk satu batch, kapasitas 100 peserta terbayar; invoice pending tidak mengamankan kursi. Invoice maksimal 48 jam atau lebih singkat menurut metode. Minimum pelaksanaan sepuluh peserta. NMA dan bimbingan proyek pribadi tidak termasuk.
Sertifikat membutuhkan semua pre/post-test dan post-test minimal 75 per sesi; post-test boleh diulang. Tenggat post-test H+1 dan sertifikat H+7 setelah sesi terakhir kecuali pengumuman lain. Rekaman untuk peserta, persetujuan promosi terpisah. Remediasi melalui admin: transfer batch/refund; bundle boleh mempertahankan Complete dengan potongan Rp499.000. Refund penuh mencabut akses dari bundle terkait, tetapi akses hasil pembelian terpisah harus tetap dilindungi.

## Privasi — S09
PUB: data akun, transaksi, progres, latihan, serta komunikasi/dokumen coaching diproses untuk layanan. Meta Pixel dan advanced matching disebutkan; data komunikasi operasional dapat dipertahankan sampai satu tahun setelah layanan, sedangkan bukti transaksi/persetujuan/audit dapat lebih lama. Pengguna dapat meminta akses, koreksi, atau penghapusan lewat admin dengan verifikasi identitas. Ini pernyataan kebijakan; perilaku pelacakan/cookies tidak diuji. Kebijakan proyek baru harus mencerminkan praktik yang benar-benar diterapkan.

## Tampilan dan pola interaksi
OBS: beranda pada viewport browser saat audit memakai latar putih/krem, teks hitam tebal besar, aksen kuning pada judul, logo di header, menu hamburger, tombol gelap membulat, kartu program bergambar dan tombol WhatsApp mengambang. Detail program memakai paket bertingkat, harga promo, FAQ accordion, testimoni, serta CTA pembelian. Modal autentikasi menjaga konteks produk.
Tidak mengukur font/warna CSS persis, breakpoint, atau kontras. Screenshot beranda dilihat saat audit, bukan file aset desain yang disalin. Ilustrasi, merek, testimoni, materi, dan video referensi bukan aset proyek baru.

## Ketidaksesuaian dan risiko spesifikasi
| ID | Bukti | Implikasi untuk proyek baru |
|---|---|---|
| D01 | S05: flashcard 8.000 vs 10.000+, OSCE 185 vs 150+ | Angka pemasaran harus berasal dari inventaris konten yang konsisten |
| D02 | S11: satu pengumpulan tes vs post-test dapat diulang; S12 mengizinkan ulang | Definisikan attempt, retry, deadline dan nilai kelulusan secara eksplisit |
| D03 | S22: pengumuman 27 September vs 27 Agustus | Jadwal berasal dari satu sumber data dan harus divalidasi |
| D04 | S03: hero 799K→349K tetapi penghematan 350K; kartu Video Only 699K→349K | Hitung diskon dari harga terstruktur; jangan simpan teks terpisah |
| D05 | S01 alumni 1.300+, S02/S03 1.500+ | Bedakan cakupan metrik atau samakan sumber |
| D06 | S04: label gambar 400+ kasus vs teks 600+ | Materi promosi perlu versi dan pembaruan |
| D07 | S11 hasil web statis gagal memuat ketersediaan, browser berhasil | Jangan menyimpulkan gangguan layanan dari ekstraksi statis saja |
| D08 | S20 slug menyebut 31 Agustus, isi acara 18 September | Slug/metadata/isi perlu konsistensi dan arsip acara |
| D09 | S03 ringkasan pause hingga 30 hari vs S10 tepat 30 hari | Checkout harus menampilkan aturan operasional yang tegas dan berversi |

## Yang belum dapat disimpulkan
Belum diketahui: dashboard murid/tutor/admin, navigasi setelah login, player/hosting video, watermark/unduhan, progres resume, isi kelas, kuis sebenarnya, penilaian CBT, kalender coaching, chat/upload/Zoom, pengelolaan tutor, mekanisme pembayaran/refund aktual, teknologi backend/database, dan algoritma belajar. Pernyataan adanya fitur bukan pembuktian bahwa semua alurnya berjalan.

## Audit area akun dan coaching — 23 September 2026

Audit ini dilakukan setelah pengguna login manual pada browser Codex. Data pribadi peserta, nomor kontak, alamat email, dan isi percakapan tidak disalin ke laporan; temuan hanya merangkum struktur fungsi.

### Dashboard murid — OBS
- Dashboard menampilkan sapaan, akses produk/pembelian, tiga modul utama (UKNPDPD, Riset, EKG), pengumuman, webinar, grup WhatsApp, dan kontak admin.
- Menu akun menyediakan profil, dashboard, tiga modul, serta menu Admin/Coaching pada akun yang berwenang. Ini menunjukkan izin berbasis peran/akses, tetapi skema role backend belum diketahui.

### Riset / course SR-MA — OBS
- Akun memiliki tier `Complete`; halaman course menampilkan status aktif, `0/25 modul`, persentase selesai, sidebar modul, tools riset, dan tombol Tandai Selesai.
- Kurikulum terbagi Day 1–7 dan Bonus Resources: pengantar/ide, protokol & skrining, ekstraksi/analisis, RoB/publication bias/GRADE, penulisan, abstrak/sitasi, submission, dan kumpulan prompt/kode/template. Item memiliki tipe VIDEO, QUIZ, VIDEOS, atau BACAAN dan estimasi durasi per kelompok.
- Lesson video menampilkan player dengan play, scrubber waktu, pin video, laporkan materi, tandai selesai, serta materi pendukung (PPT, PDF, template, tabel, checklist). Terlihat tautan Google Drive dan API PDF; hosting video internal belum dapat disimpulkan.
- Tools riset yang tersedia: deduplikasi RIS/NBIB privat di browser, screening artikel, effect size converter, dan FAQ library bersumber. Ini mendukung pola mini-app terpisah dari LMS.

### EKG — OBS
- Kurikulum menampilkan Meeting 1 gratis dan lima meeting lain terkunci/upgrade. Progres tampil sebagai jumlah pelajaran dan persentase.
- Flashcard membatasi akses ke EKG Pro. Halaman latihan kasus dapat dibuka dengan 599 kasus, satu sudah dikerjakan; navigasi keyboard, reveal jawaban, rating mudah/sedang/sulit, dan tutup gambar dijelaskan. Ini memperlihatkan pola latihan berbasis kasus dan rating kesulitan.

### UKNPDPD — OBS
- Dashboard memiliki onboarding 4 langkah: buat planner, kerjakan tryout, pelajari materi yang kurang, dan kerjakan flashcard. Flashcard terkunci untuk akun non-Ultimate.
- Planner dibuat dari tanggal ujian dan jam belajar per hari, lalu topik disebar sampai tujuh hari sebelum ujian.
- Tryout gratis berisi satu paket 150 soal/200 menit; paket premium menampilkan 10 tryout dengan ukuran serupa. Riwayat menyimpan nama, tanggal, jumlah soal, skor, dan status.
- Notebook materi berisi 667 artikel pada 18 sistem, hierarki sistem→topik→subtopik, pencarian, filter stase, tipe Clinical Script/Algorithm & Tabel/Mindmap, serta ringkasan jumlah artikel. Struktur ini dapat dipakai sebagai pola katalog konten terstruktur.

### Admin coaching / tutor — OBS
- Navigasi coaching berisi Klien Saya, Chat, Grup WA, Lifecycle, Payroll Saya, dan Inbox Milestone.
- Daftar klien menyediakan pencarian, pengurutan nama/join date, pagination, filter bulan, milestone, status grup, dan shortcut Aktif/Accepted Abstrak/Accepted Full Paper.
- Halaman assignment memisahkan paket/status/mulai/berakhir, judul/topik/target venue/deadline/catatan, grup, sesi Zoom, dan milestones. Setiap milestone membutuhkan bukti (link, gambar, catatan); tombol selesai tetap disabled sampai bukti diberikan. Ada checkbox informed consent untuk testimoni pada milestone tertentu.
- Milestone mengikuti perjalanan riset: konsultasi awal, judul fix, Methods/Prospero, PRISMA & included studies, karakteristik studi, outcome/forest plot, analisis tambahan, risk of bias, penulisan, presentasi, submit konferensi, diterima, submit full paper, revisi, diterima full paper.
- Grup WA memiliki tabel klien/tutor/pembuat/tanggal/link dan status join tutor/klien. Chat menyediakan pencarian percakapan/pesan serta filter milestone; inbox milestone memisahkan Menunggu, Ditolak, dan Terverifikasi.
- Lifecycle memiliki layanan Penerimaan Murid Baru, Komitmen Operasional, dan Ajukan Perubahan Start. Payroll menyediakan rincian fee per milestone, status dibayar/belum, ekspor, slip, dan ringkasan bulanan.
- Assignment legacy dapat memiliki status legacy dan tanpa riwayat periode baru; model baru sebaiknya memisahkan data legacy dari periode layanan modern.

### Detail lifecycle coaching — OBS
- Penerimaan Murid Baru memiliki satu toggle `Menerima assignment baru` dan tombol simpan; tidak ada jadwal layanan yang wajib diisi pada halaman ini.
- Komitmen Operasional menyediakan pencarian, pagination, pilihan assignment, tipe `Zoom terjadwal` atau `Deliverable sedang direview`, label, mulai/selesai lokal, catatan, dan tombol catat. Halaman menjelaskan bahwa komitmen yang beririsan dengan dormant ditolak secara transactional.
- Ajukan Perubahan Start menampilkan assignment, start/expiry, batas waktu start WIB, input start baru dan alasan. Aturan yang terlihat: maksimal satu adjustment dan ditolak otomatis bila layanan substantif sudah dimulai.
- Daftar lifecycle memperlihatkan status layanan modern seperti active/scheduled dan legacy_active; status tersebut perlu dimodelkan sebagai state transition yang diaudit.

### Model peran dan operasional yang terlihat — OBS
- Area coaching menggabungkan pekerjaan tutor/admin: penerimaan assignment, komitmen waktu, penugasan klien, komunikasi, milestone, grup, lifecycle, dan fee.
- Filter milestone di daftar klien berfungsi sebagai dashboard pipeline riset; milestone yang sama dipakai untuk inbox verifikasi dan payroll setelah terverifikasi.
- Assignment menyimpan bukti dan status verifikasi, sedangkan payroll hanya menghitung milestone yang telah diverifikasi. Ini menyiratkan relasi: deliverable → verification → fee event.
- Sesi Zoom memiliki link recording, bahasan, dan status fee; model baru perlu membedakan jadwal, pelaksanaan, rekaman, persetujuan, dan pembayaran.

### Batas audit akun
- Akun ini memperlihatkan area murid dan admin coaching; belum membuktikan tampilan tutor non-admin, akun tanpa akses premium, atau admin penuh.
- Tidak mengirim chat, mengunggah deliverable, menandai selesai, mengubah assignment, membuka link WhatsApp, memulai coaching, membuat invoice, atau membayar.
- Isi video penuh, pengaturan player lanjutan, upload/storage backend, event progres jaringan, dan validasi server masih perlu pengujian terkontrol.

## Implikasi perencanaan untuk platform baru
| Pola Auctus | Nilai yang dapat diadopsi | Penyesuaian yang perlu diputuskan | Backend/domain |
|---|---|---|---|
| Course + modul + progres | Jalur belajar jelas dan resume | Sesuaikan kurikulum/topik proyek | Course, Module, Lesson, Progress |
| Video + bahan unduh | Belajar mandiri dengan bukti materi | Host video dan hak unduh milik proyek | VideoAsset, Resource, Access |
| Quiz/CBT/tryout | Latihan dan hasil terukur | Aturan attempt, timer, feedback | Question, Attempt, Answer, Score |
| Planner adaptif | Rencana belajar personal | Input target/jam dan algoritma transparan | StudyPlan, Task, Activity |
| Flashcard/rating | Spaced repetition dan review cepat | Pilih algoritma dan sumber kartu | Card, Review, Schedule |
| Milestone berbukti | Coaching dapat diawasi | Definisi milestone dan consent | Milestone, Deliverable, Verification |
| Chat/grup/Zoom | Pendampingan terhubung | Kanal, retensi, moderasi, rekaman | Conversation, Message, Meeting |
| Lifecycle/coaching | Masa layanan dan pause dapat ditelusuri | Status dan kalender proyek sendiri | ServicePeriod, Pause, Extension |
| Tutor payroll | Operasional tutor terukur | Formula fee dan approval | TutorAssignment, Fee, Payroll |

## Agenda tahap login manual
1. Pengguna login sendiri di browser; jangan menyimpan sandi/token dalam laporan.
2. Catat peran dan paket akun tanpa menyimpan identitas pribadi yang tidak perlu.
3. Inventaris menu, dashboard, kelas, player, progres, kuis, planner, CBT, OSCE dan flashcard yang diizinkan akun.
4. Periksa coaching: status, aktivasi, dormant, chat, milestone, revisi, jadwal. Hindari menekan aktivasi yang memulai masa layanan hanya untuk audit.
5. Buka rincian checkout/upgrade sebatas membaca; jangan membuat invoice atau transaksi tanpa instruksi.
6. Audit tutor/admin hanya bila pengguna memiliki akses peran tersebut. Akun murid tidak membuktikan alur tutor.
7. Tambahkan temuan ke laporan ini dan perbarui memori. Baru kemudian finalisasi scope serta arsitektur.


