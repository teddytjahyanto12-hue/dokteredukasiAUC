# Rencana eksekusi — Dokter Edukasi Learning

Disusun: 2026-09-28 oleh Claude Code (PC 1). Status resmi: ../PROJECT_MEMORY.md.
Sumber utama: framework milik pengguna (6 diagram) di ../design/framework-pengguna/.
Referensi pendukung: audit Auctus (../research/PLATFORM_AUDIT.md), draf kebutuhan (REQUIREMENTS.md), roadmap umum (ROADMAP.md), riset Duitku (../research/PAYMENT_GATEWAY_DUITKU.md).

Label: **FW** = tertulis di diagram pengguna; **USUL** = usulan Claude, belum disetujui pengguna.

## 1. Ringkasan framework pengguna (FW)

### 1.1 Tiga jalur konten
| Jalur | Sub-menu | Bentuk tampilan di website | Interaksi |
|---|---|---|---|
| Pre-Clinical | Basic Medical Science | Tampilan slide PPTX seperti LMS untuk paparan materi | Tiap 1 topik ada quiz |
| Pre-Clinical | Medical E-books | Tampilan PDF di website; cadangan: arahkan ke Google Drive | Baca |
| Pre-Clinical | Daftar Pustaka | Daftar tautan sumber, dibagi per section materi | Klik tautan |
| Clinical Practice (+ Bimbingan) | Clinical Guidelines | Merujuk ke sumber asli (tautan) | Klik tautan |
| Clinical Practice | ECG Challenges | Materi → Quiz | Quiz |
| Clinical Practice | Medical Cheatsheet | PDF | Terintegrasi AI (kolom tanya-jawab) |
| Medical Research (+ Bimbingan) | Original Research | Dibagi sub: Univariate, Multivariate | Materi |
| Medical Research | Review | Narrative, Systematic Review, Meta-analysis, Scoping, Bibliometric | Materi |
| Medical Research | Case Report | — | Materi |
| Medical Research | Pengolahan Data | Dibagi per aplikasi: RStudio, SPSS, STATA | Materi |

### 1.2 Alur seleksi tutor
Tiga jalur: Clinical Practice (spesialis), Preklinik, Research (Review / Original Research).
Semua: Google Form → info seleksi via WA → interview Zoom → offering letter → penetapan rate.
Rate berbeda: Clinical = rate bimbingan clinical; Preklinik = rate bimbingan materi preklinik; Research = rate bimbingan Zoom.
Setelah diterima: tutor Preklinik mendapat akses materi Preklinik; tutor Research mendapat akses materi research yang dikuasai.

### 1.3 Alur pelanggan
Instagram / Facebook / LinkedIn → daftar di website → lihat paket → bayar di website →
(a) klien menerima email konfirmasi pembayaran; (b) admin menerima info order ("dicek bisa dari apa" — belum diputuskan) →
admin menghubungi klien via WhatsApp → akses website diberikan.
Jika bimbingan: dijadwalkan dan tutor dipilih admin sesuai bidang. Admin memperbarui progres di website (link Zoom dan bukti Zoom).

### 1.4 Peran di backend
- **Admin Master**: login backend, semua akses, membuat akun, assign klien ke tutor, upload bukti transfer ke rekening tutor → verifikasi paid/unpaid.
- **Tutor (dashboard)**: Klien saya → progres klien → pendapatan → payroll dari laporan yang sudah dijalankan → paid/unpaid; chat.
- **Murid (dashboard)**: akses paket (video, PDF/materi); riwayat pembelian.

## 2. Catatan dan celah yang perlu diputuskan (USUL)
1. **Pemberian akses setelah bayar** — di diagram, akses diberikan setelah admin menghubungi via WA. Usul: akses produk mandiri (materi/quiz) terbuka **otomatis** setelah callback pembayaran terverifikasi; WA admin tetap untuk sambutan dan penjadwalan bimbingan. Admin tetap bisa memberi/mencabut akses manual (misalnya transfer manual, promo).
2. **Notifikasi order ke admin** — usul: (1) notifikasi di dashboard admin + email ke admin sebagai dasar; (2) WhatsApp otomatis ke admin sebagai tambahan setelah dipilih penyedianya (WhatsApp Cloud API resmi atau layanan gateway pihak ketiga — risiko/biaya berbeda, perlu keputusan).
3. **Tampilan PPTX** — browser tidak bisa menampilkan PPTX secara andal. Usul: admin/tutor mengunggah hasil ekspor **PDF** dari PPTX, lalu website menampilkannya dalam mode slide (satu halaman = satu slide). Konversi otomatis PPTX→PDF di server bisa menyusul.
4. **Hak cipta e-book, guideline, cheatsheet** — e-book medis umumnya berhak cipta. Hanya unggah PDF yang dimiliki/berizin; selebihnya cukup tautan ke sumber resmi (sesuai pola Daftar Pustaka dan Clinical Guidelines). Catat sumber dan izin per berkas.
5. **AI pada Medical Cheatsheet** — jawaban harus berdasar isi cheatsheet (retrieval), menampilkan rujukan halaman, memberi disclaimer "bukan pengganti penilaian klinis", dan dibatasi kuota per akun agar biaya terkendali. Tempatkan di rilis akhir.
6. **Rekrutmen tutor** — tahap awal tetap Google Form + WA + Zoom (tidak perlu dibangun). Website cukup menyimpan tutor yang sudah diterima: bidang, rate, rekening (terenkripsi/terbatas), dan akses materi. Pipeline seleksi di dalam website opsional di rilis akhir.
7. **Payroll** — dasar perhitungan perlu disepakati: per sesi Zoom, per milestone terverifikasi, atau per paket. Diagram Auctus memakai milestone terverifikasi → fee; framework pengguna menyebut rate per jenis bimbingan.
8. **Isi paket** — belum ada daftar paket, harga, masa akses, dan apakah bimbingan dijual terpisah atau bundel.

## 3. Arsitektur yang diusulkan (USUL, perlu persetujuan)
| Bagian | Pilihan usulan | Alasan singkat |
|---|---|---|
| Aplikasi web + backend | Next.js (TypeScript) dalam satu repo | Frontend, API, dan panel admin satu bahasa; mudah dikerjakan bergantian oleh Codex dan Claude |
| Database, login, penyimpanan berkas | Supabase (PostgreSQL + Auth + Storage) | Login email/Google siap pakai; aturan akses per baris (RLS) menjaga data antar murid/tutor; ada paket gratis untuk mulai |
| Video | Layanan streaming (mis. Bunny Stream atau Cloudflare Stream) | File video tidak disimpan di server/GitHub; link bertanda tangan untuk murid yang berhak |
| Tampilan PDF/slide | PDF.js di browser | Satu penampil untuk e-book, cheatsheet, dan slide |
| Pembayaran | Duitku (sudah diriset) | Pola redirect + callback server; sandbox tersedia |
| Email | Layanan email transaksional (mis. Resend) | Konfirmasi pembayaran, reset sandi |
| Hosting | Vercel (aplikasi) + Supabase (data) | Deploy otomatis dari GitHub; staging dan production terpisah |
| AI Cheatsheet | Claude API dengan retrieval dari isi PDF | Rilis akhir |

Alternatif yang juga layak jika pengguna lebih nyaman dengan PHP: Laravel + Filament (panel admin cepat). Pilih satu sebelum coding.

## 4. Model data inti (USUL)
- **Pengguna**: User, Profile, Role (admin, tutor, murid), TutorProfile (bidang, rate, status aktif, info rekening terbatas).
- **Konten**: Track (Pre-Clinical / Clinical Practice / Medical Research) → Category (mis. Basic Medical Science, ECG Challenges, Review) → Topic → Item. Item bertipe: SLIDE_PDF, PDF, VIDEO, LINK (daftar pustaka / guideline), QUIZ, CHEATSHEET. Setiap item punya status draft/publish dan sumber/izin.
- **Quiz**: Quiz, Question, Option, Attempt, Answer.
- **Penjualan**: Package (isi = kumpulan Track/Category + opsi bimbingan + masa akses), Order, Payment (callback Duitku), Entitlement (hak akses murid, berasal dari order tertentu).
- **Bimbingan**: MentoringEnrollment (murid, bidang, tutor, status), Session (jadwal, link Zoom, bukti, catatan), Progress/Milestone, Conversation/Message.
- **Tutor ops**: TutorAssignment, FeeEvent (sesi/milestone yang dihitung), Payroll (periode, total, bukti transfer, paid/unpaid).
- **Operasional**: Notification, AuditLog (siapa mengubah apa).

## 5. Langkah eksekusi bertahap (USUL)

### Langkah 0 — Keputusan dasar (pengguna, ±1 minggu)
Nama/merek final "Dokter Edukasi Learning", domain, daftar paket + harga + masa akses, dasar payroll tutor, siapa pemilik merchant Duitku (perorangan/badan usaha), konten mana yang sudah siap, dan stack teknologi (bagian 3).
**Selesai bila**: keputusan tercatat di PROJECT_MEMORY.md.

### Langkah 1 — Spesifikasi dan desain (±1–2 minggu)
Sitemap, alur per peran (murid, tutor, admin), wireframe halaman utama: beranda, katalog paket, checkout, dashboard murid, penampil materi, quiz, dashboard tutor, panel admin. Kriteria penerimaan per fitur rilis 1.
**Selesai bila**: pengguna menyetujui wireframe dan daftar fitur rilis 1.

### Langkah 2 — Fondasi teknis (±1 minggu)
Repo GitHub aktif (alur pull → kerja → commit → push untuk Codex & Claude), proyek Next.js, database + migrasi, login email/Google, tiga peran, halaman terlindungi per peran, environment staging.
**Selesai bila**: murid/tutor/admin uji bisa login dan hanya melihat halaman perannya (dibuktikan tes).

### Langkah 3 — Rilis 1: Konten + penjualan (MVP, ±3–5 minggu)
1. Panel admin: kelola Track/Category/Topic/Item, unggah PDF/slide/video, tautan pustaka, quiz; draft/publish.
2. Sisi murid: katalog tiga jalur, penampil slide/PDF, video, daftar pustaka per section, clinical guidelines, quiz per topik + skor, progres per topik.
3. Paket, checkout Duitku (sandbox dulu), callback terverifikasi → Entitlement otomatis, email konfirmasi, notifikasi order ke admin, riwayat pembelian.
4. Admin: daftar order, beri/cabut akses manual, buat akun.
**Selesai bila**: alur Instagram → daftar → bayar (sandbox) → materi terbuka berjalan ujung ke ujung; murid tanpa hak ditolak server; callback ganda tidak menggandakan akses.

### Langkah 4 — Rilis 2: Bimbingan (±2–3 minggu)
Order bimbingan → admin assign tutor sesuai bidang → jadwal sesi, link Zoom, unggah bukti Zoom, catatan progres. Dashboard tutor: Klien saya, progres klien, chat dengan klien. Tutor hanya melihat klien yang ditugaskan dan materi bidangnya.
**Selesai bila**: tutor A tidak bisa melihat klien tutor B; progres terlihat oleh murid, tutor, dan admin.

### Langkah 5 — Rilis 3: Tutor ops dan payroll (±2 minggu)
Data tutor (bidang, rate), FeeEvent dari sesi/milestone terverifikasi, rekap pendapatan tutor, payroll per periode, admin unggah bukti transfer → paid/unpaid, ekspor laporan.
**Selesai bila**: angka payroll cocok dengan sesi terverifikasi pada data uji.

### Langkah 6 — Rilis 4: Fitur lanjutan
ECG Challenges versi lanjut (bank kasus, timer, rating), Medical Cheatsheet + AI, modul Pengolahan Data (RStudio/SPSS/STATA), pipeline rekrutmen tutor di website (opsional), pemasaran (pixel, kode promo).

### Langkah 7 — Uji, pilot, peluncuran
Uji keamanan akses, pembayaran production dengan nominal kecil, tampilan ponsel, backup database. Pilot dengan beberapa murid dan tutor, perbaiki, lalu buka untuk umum.

Perkiraan waktu di atas kasar untuk satu pengembang dibantu AI dan bergantung kesiapan konten; bukan komitmen.

## 6. Pembagian kerja Codex dan Claude (USUL)
- Satu fitur = satu cabang Git; catat pelaksana di PROJECT_MEMORY.md sebelum mulai.
- Jangan dua agen mengerjakan berkas yang sama bersamaan; PROJECT_MEMORY.md diperbarui di akhir sesi.
- Setiap rilis diakhiri pemeriksaan silang: agen lain mereview kode sebelum digabung ke main.
