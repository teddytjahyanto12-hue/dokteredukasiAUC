# Kebutuhan platform pembelajaran — draf setelah audit publik

Sumber status/keputusan: ../PROJECT_MEMORY.md.
Bukti dan rincian sumber S01–S22: ../research/PLATFORM_AUDIT.md.

## Status dan batas
Kebutuhan eksplisit pengguna: platform murid/tutor, video, frontend/backend, dan memori bersama Codex/Claude. Berikut adalah USUL rancangan untuk dibahas setelah audit akun, bukan pernyataan bahwa backend Auctus menggunakan model ini. Harga, aturan, dan cakupan referensi belum otomatis menjadi keputusan proyek baru. Framework dan vendor belum dipilih.

## Cakupan produk yang perlu diputuskan
Referensi ternyata lebih luas daripada situs video: commerce, LMS, persiapan ujian, coaching, bootcamp, dan tools riset. Tentukan apakah seluruh domain ini diperlukan pada rilis pertama. Usulan urutan: fondasi akun + katalog + video → transaksi/hak akses → tutor/coaching → ujian/bootcamp dan tools tambahan. Jangan membuat implementasi besar sebelum audit akun dan batas rilis cukup jelas.

## Matriks kebutuhan dan penerimaan yang diusulkan
| ID | Modul | Asal | Kriteria penerimaan untuk proyek baru | Tahap usulan |
|---|---|---|---|---|
| R01 | Akun dan peran | Pengguna; UI S06–S08 | Murid, tutor dan admin memiliki izin eksplisit; server menolak akses lintas pengguna/peran | Fondasi |
| R02 | Video pembelajaran | Pengguna; S03–S04 | Pemilik akses dapat memutar pelajaran, melanjutkan posisi dan melihat progres; akses ditolak server ketika tidak berhak | Fondasi |
| R03 | Backend | Pengguna | API mengelola data dan otorisasi; validasi tidak hanya di browser; perubahan penting tercatat | Fondasi |
| R04 | Profil/onboarding | S06 | Field wajib konsisten, error jelas, akun duplikat ditangani; daftar melalui email/Google diputuskan sesuai kebutuhan | Fondasi |
| R05 | Katalog dan paket | S02–S05 | Satu data produk menjadi sumber harga, fitur, diskon, masa akses dan halaman detail | Fondasi |
| R06 | Struktur belajar | S03–S04 | Kursus→modul→pelajaran, materi pendukung dan status publikasi; urutan konten dapat dikelola | Fondasi |
| R07 | Pembayaran dan hak akses | PUB S02–S05 | Notifikasi pembayaran terverifikasi; pengulangan notifikasi tidak menggandakan order/akses; failed/expired tidak membuka konten | Setelah fondasi |
| R08 | Upgrade | PUB S03/S05 | Kelayakan dan selisih dihitung server dari hak yang sah; perubahan bersamaan tidak menyebabkan harga salah | Setelah fondasi |
| R09 | Tutor dan penugasan | Pengguna; S10 | Tutor hanya melihat peserta yang ditugaskan; pergantian tutor tercatat; murid mengetahui tutor aktif | Coaching |
| R10 | Siklus coaching | S10 | Jadwal/status/izin komunikasi deterministik; perubahan aktivasi, jeda, extend dan revisi tercatat serta bisa diuji | Coaching |
| R11 | Komunikasi dan berkas | S09/S10 | Pesan/lampiran hanya untuk pihak berhak; read-only ketika layanan terbatas; retensi dan persetujuan jelas | Coaching |
| R12 | Keluhan/refund | S10/S12 | Hasil perhitungan memiliki rincian dan riwayat keputusan; refund satu order tidak mencabut hak dari order lain | Operasional |
| R13 | CBT dan analitik | S05 | Attempt bertimer, autosave, penilaian konsisten, review sesuai kebijakan; soal dapat ditandai | Ujian |
| R14 | Planner/flashcard/OSCE | S05 | Aturan prioritas/review transparan; checklist, jadwal dan progres tersimpan per murid | Ujian |
| R15 | Bootcamp | S11/S12 | Batch, kapasitas, jadwal dan kepesertaan terpisah dari akses course; pembayaran terakhir tidak menyebabkan kursi berlebih | Bootcamp |
| R16 | Tes dan sertifikat | S11/S12 | Deadline, pengulangan dan batas lulus menjadi konfigurasi konsisten; sertifikat hanya setelah seluruh syarat terpenuhi | Bootcamp |
| R17 | Admin konten | Kebutuhan implementasi | Draft/review/publish; metadata konten dan asset terpusat; tutor/admin memiliki batas edit jelas | Fondasi |
| R18 | Kebijakan berversi | S09/S10/S12 | Versi syarat dan waktu persetujuan terikat pada transaksi; perubahan baru tidak diam-diam mengubah order lama | Transaksi |
| R19 | Pelaporan progres | Pengguna | Ringkasan murid/tutor berasal dari aktivitas nyata dan tidak mencampur data antar peserta | Setelah fondasi |

## Rancangan domain backend awal (USUL)
Ini daftar konseptual untuk membantu audit berikutnya; belum skema final atau teknologi pilihan.
- Identitas: User, Profile, Role, Permission, TutorAssignment.
- Konten: Course, Module, Lesson, VideoAsset, Resource, PublicationVersion.
- Belajar: Enrollment, LessonProgress, Quiz, Question, Attempt, Answer, Bookmark.
- Commerce: Product, Variant, Price, Order, OrderItem, PaymentEvent, Entitlement, Refund.
- Coaching: CoachingEnrollment, Activation, PauseRequest, Extension, ResearchProject, Submission, RevisionWindow, Conversation, Message, Attachment, Meeting.
- Bootcamp: Batch, Seat, Session, AssessmentRule, Completion, Certificate.
- Operasional: PolicyVersion, Consent, SupportCase, AuditEvent.

Pisahkan peran (tutor/murid) dari hak produk, lifetime course dari layanan terbatas, serta status proyek riset dari status layanan coaching. Model hak akses perlu menyimpan asal order agar pencabutan salah satu pembelian tidak menghapus hak lain. Semua ini usulan desain yang perlu ditinjau setelah akses akun.

## Kebutuhan video yang harus dipastikan
- Pilih host/streaming setelah mengetahui skala, biaya dan sumber video; jangan berasumsi vendor referensi.
- Tentukan apakah video tertanam, unggahan sendiri, atau keduanya; siapa yang mengunggah dan menerbitkan.
- Player: play/pause, seek, kecepatan, subtitle jika tersedia, posisi terakhir, navigasi pelajaran dan kondisi jaringan gagal.
- Backend menyimpan metadata dan progres; file video besar tidak disimpan di repository GitHub.
- Aturan akses untuk pelajaran gratis, dibeli, kedaluwarsa, dan materi yang ditarik perlu eksplisit.
- Hindari janji antipembajakan absolut; kebijakan unduh/watermark diputuskan sesuai kebutuhan aktual.

## Pemeriksaan bermakna sebelum rilis (rencana, belum dijalankan)
1. Murid A tidak dapat membaca progres/berkas murid B; tutor tanpa penugasan ditolak.
2. Refresh saat video berlangsung tidak menghapus progres; update terlambat tidak merusak posisi/progres.
3. Webhook pembayaran ganda tidak membuat entitlement ganda; harga checkout cocok data server.
4. Upgrade/refund menjaga akses lain yang masih sah.
5. Transisi waktu coaching diuji pada batas tanggal, jeda, penolakan permintaan dan masa berakhir; waktu memakai satu konvensi.
6. Dua pembayaran pada sisa satu kursi ditangani tanpa overbooking; mekanisme remediasi jelas.
7. Retry tes dan tenggat tidak saling bertentangan; sertifikat tidak terbit sebelum syarat lengkap.
8. Navigasi keyboard, label input, tampilan ponsel/desktop dan kondisi error diperiksa.

## Keputusan tertunda
- Modul mana yang masuk rilis pertama; identitas/merek proyek baru.
- Akun/paket referensi yang tersedia untuk audit; akses tutor/admin tersedia atau tidak.
- Sumber dan hak penggunaan konten, video, ilustrasi, dan soal.
- Aturan coaching/ujian/bootcamp milik proyek, termasuk penyelesaian konflik D01–D09.
- Volume murid/tutor, durasi video, kebutuhan live, anggaran, metode pembayaran dan hosting.
- Kebijakan privasi, retensi dan promosi yang sesuai operasional proyek sendiri.
