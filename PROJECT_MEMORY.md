# Memori bersama proyek platform pembelajaran

File ini adalah sumber kebenaran tunggal untuk status, keputusan, dan serah terima Codex / Claude Code. Dokumen lain menyimpan detail, bukan salinan status.

## Status terkini
- Pembaruan terakhir: 2026-09-28 (Asia/Jakarta), fondasi website + backend di apps/web oleh Claude Code.
- Tahap: fondasi aplikasi (frontend + backend + panel admin) sudah dibangun dan diuji lokal; belum di-deploy; harga/keterangan paket menunggu pengguna.
- Pekerjaan terakhir oleh: Claude Code (PC 1).
- Pelaksana aktif: tidak ada; kelas/progres/jalur/penawaran/invoice manual selesai dan di-push.
- Auctus Academy telah dipelajari pada 22 halaman publik dan sebagian area akun setelah login manual. Aplikasi proyek: apps/web (lihat bagian "Fondasi aplikasi").

## Tujuan dan kebutuhan yang sudah dinyatakan
- Mempelajari platform referensi secara menyeluruh sesuai akses yang diberikan.
- Membangun platform pembelajaran dengan frontend dan backend.
- Pengguna mencakup murid dan tutor.
- Mendukung pemutaran video pembelajaran.
- Memahami fitur, alur, dan ketentuan platform referensi sebelum menyusun implementasi.
- Pekerjaan dapat dilanjutkan bergantian di Codex dan Claude Code dengan memori serta progres yang sama.
- Bahasa komunikasi utama: Bahasa Indonesia.

## Konteks lokasi
- Folder bersama: \\desktop-ch10vns\data bersama pc 1 pc 2\Project  Framework Auc
- Buka folder yang sama di kedua alat. Jika memakai checkout atau komputer lain, sinkronkan perubahan kode DAN file memori terlebih dahulu.
- Riwayat percakapan tidak otomatis dibagikan. Keputusan penting harus dituliskan di sini.

## Keputusan yang berlaku
- Arahan pengguna 2026-09-23: pelajari Auctus dahulu selengkap akses yang tersedia, kemudian rencanakan fitur yang dapat dibuat dan disesuaikan untuk platform sendiri. Saat ini fokus audit dan perencanaan; implementasi menunggu hasil pembahasan rencana.
- Hasil perencanaan harus memetakan fitur referensi, manfaat untuk murid/tutor, penyesuaian yang diusulkan, kebutuhan data/backend, kompleksitas/dependensi, dan prioritas rilis. Semua prioritas masih usulan sampai dibahas dengan pengguna.
- Gunakan PROJECT_MEMORY.md sebagai satu-satunya pusat status dan serah terima.
- AGENTS.md dan CLAUDE.md hanya berisi aturan kerja yang merujuk pada memori ini.
- Arahan pengguna 2026-09-28: push ke GitHub, bangun frontend + backend yang bisa diedit dahulu sesuai framework; nama paket disusun dari framework, harga & keterangan menyusul.
- Stack yang dipakai: Next.js 15 + TypeScript + Tailwind v4, Prisma 6, SQLite untuk lokal (PostgreSQL saat deploy), sesi cookie JWT (jose) + bcrypt. Video: tautan embed (YouTube/Vimeo/Drive/Bunny) — layanan streaming belum dipilih. Hosting dan pembayaran online (Duitku kandidat) belum dipilih.
- Sinkronisasi kode: GitHub teddytjahyanto12-hue/dokteredukasiAUC (main) adalah sumber kode. Folder PC 2 hanya salinan (tanpa node_modules/database/.git). Codex sebaiknya clone repo di PC 2 dan bekerja via git pull → commit → push.
- Struktur folder awal bersifat persiapan; sesuaikan arsitektur setelah analisis referensi.
- Gunakan implementasi dan konten milik proyek. Untuk aset, video, merek, atau teks referensi yang ingin dipakai, catat sumber dan izin penggunaannya.
- Ketentuan platform referensi dicatat sebagai bukti dan bahan kebutuhan, bukan otomatis dianggap sebagai kebijakan proyek baru.

## Progres
| ID | Pekerjaan | Status | Bukti / hasil |
|---|---|---|---|
| P01 | Struktur folder dan aturan memori bersama | Selesai | README.md, AGENTS.md, CLAUDE.md, PROJECT_MEMORY.md |
| P02 | Pesan serah terima untuk Claude Code | Selesai | AUC-SHARED-001 diterima Claude; isi konfirmasi diperiksa Codex dan sesuai |
| P03 | Mendapatkan URL dan cakupan akses | Sebagian | https://auctus.academy/; pengguna meminta publik dahulu, login manual menyusul |
| P04 | Audit halaman, peran, fitur, dan ketentuan | Sebagian | research/PLATFORM_AUDIT.md: 22 halaman publik + dashboard/course/UKNPDPD/EKG/admin coaching; tutor non-admin/backend belum terverifikasi |
| P05 | Menetapkan kebutuhan dan batas versi pertama | Draf diperluas | docs/REQUIREMENTS.md dan implikasi audit: course, video, quiz, planner, flashcard, coaching; scope final belum dipilih |
| P06 | Menentukan arsitektur dan model data | Selesai (fondasi) | apps/web/prisma/schema.prisma; docs/RENCANA_EKSEKUSI_DOKTER_EDUKASI.md |
| P07 | Implementasi frontend, backend, dan video | Fondasi selesai | apps/web: publik, murid, tutor, admin; video via tautan embed; Duitku/email/AI belum |
| P08 | Pengujian peran, akses, video, dan deployment | Sebagian | Uji manual alur lengkap di browser lokal 2026-09-28; belum ada tes otomatis; belum deploy |

## Masukan yang masih dibutuhkan
1. URL sudah diterima: https://auctus.academy/. Login manual telah dilakukan untuk audit akun pada 23 September; audit lanjutan mengikuti sesi dan izin yang tersedia.
2. Halaman khusus yang harus diikuti dan akses murid / tutor bila diperlukan. Jangan menuliskan sandi atau token di dokumen.
3. Nama / identitas platform baru, prioritas fitur, dan perbedaan yang diinginkan.
4. Ketentuan operasional milik proyek, sumber video, skala awal, serta anggaran hosting jika sudah tersedia.

## Langkah berikutnya
0. (Terbaru, didahulukan) Pengguna mengisi harga/keterangan paket dan konten di panel admin; pilih hosting + PostgreSQL + object storage untuk deploy; integrasi Duitku sandbox; email transaksional; tes otomatis untuk aturan akses & order.
1. Audit lanjutan: tutor non-admin, admin penuh, checkout sebatas baca, dan player/progres dengan pengujian terkontrol.
2. Bahas pilihan fitur hasil bagian implikasi perencanaan dengan pengguna; tandai adopsi, penyesuaian, atau penundaan.
3. Selesaikan konflik informasi publik D01–D09 sebelum merumuskan aturan proyek baru; jangan menganggap harga/ketentuan referensi otomatis menjadi keputusan proyek.
4. Tentukan batas rilis pertama dan arsitektur setelah pilihan fitur dibahas. Update memori dan bukti setelah setiap tahap.
## Hasil verifikasi terakhir
- 22 halaman publik didata beserta URL dan metode audit; browser JavaScript memverifikasi paket dinamis, formulir akun, FAQ EKG, menu, gerbang pembelian coaching/stase, serta jadwal bootcamp.
- Setelah login manual, dashboard, course SR-MA Complete, EKG, UKNPDPD, dan admin coaching diperiksa secara read-only; detail dirangkum di research/PLATFORM_AUDIT.md.
- Tidak ada akun, invoice, pembayaran, pesan, atau aktivasi layanan yang dibuat pada situs referensi.
- 2026-09-28 (Claude Code): apps/web lolos `tsc --noEmit`, `eslint`, dan `next build` (34 route). Uji manual di browser lokal: daftar murid → pesan paket bimbingan → admin tandai lunas → hak akses + bimbingan otomatis → admin assign tutor → tutor jadwalkan sesi (jam WIB benar), unggah bukti PDF, catat progres, chat → murid lain ditolak (404 bimbingan, 403 berkas) → admin tambah slide PDF, tautan, quiz → murid mengerjakan quiz (nilai & pembahasan benar) → admin verifikasi sesi (fee dari rate) → payroll dibuat & ditandai dibayar dengan bukti transfer. Bug yang ditemukan & diperbaiki: status bimbingan tidak berubah saat tutor dipilih; header cache berkas diubah ke no-store.
- Konfirmasi Claude AUC-SHARED-001 dibaca dan sesuai tujuan serta protokol memori bersama; ini pemeriksaan catatan file, bukan percakapan Claude langsung.
## Hambatan / pekerjaan berjalan
- Tutor non-admin, admin penuh, isi video/player lanjutan, backend, dan checkout aktual belum terverifikasi. Seluruh route coaching yang terlihat (klien, detail assignment, chat, grup, lifecycle/admission, lifecycle/commitments, lifecycle/start-adjustment, inbox, payroll) sudah dibaca secara read-only.
- Tidak ada proses aplikasi yang berjalan dari sesi ini.
- Database lokal PC 1 (apps/web/prisma/dev.db, tidak di-commit) masih berisi data uji (akun murid.uji@dokteredukasi.test, 1 order, 1 bimbingan, 1 payroll, materi uji di topik Systematic Review). Berkas unggahan uji sudah terhapus sehingga tautan berkas pada data uji tersebut 404. Reset database (`npm run db:reset` lalu `npm run db:seed`) menunggu persetujuan pengguna.

## Riwayat serah terima
| Tanggal | Alat | Perubahan | Kelanjutan |
|---|---|---|---|
| 2026-09-23 | Codex | Membuat struktur, memori, panduan kerja, dan pesan Claude | Terima URL lalu mulai audit |

| 2026-09-23 | Codex | Memperbarui prompt AUC-SHARED-001 dan menyiapkan kolom konfirmasi Claude | Pengguna menyampaikan prompt; Codex memeriksa catatan setelah Claude selesai |
| 2026-10-02 | Claude Code (PC 1) | Kwitansi email, notifikasi staf, template WhatsApp; Fase D laporan & performa + ekspor CSV | Isi WA & SMTP; Duitku; deploy |
| 2026-10-02 | Claude Code (PC 1) | Fase C: cicilan 2–3x pengunci tahap, tahap & checklist task, validasi task, input penjualan admin, tombol Chat Admin WhatsApp | Isi nomor WA admin; Fase D dashboard |
| 2026-10-02 | Claude Code (PC 1) | Fase B: layanan input manual (poster, deskripsi, benefit, masa belajar, add-on, HPP, SOP), pemesanan dengan total, kelayakan & fee tutor per layanan | Fase C: cicilan & penjualan admin |
| 2026-10-02 | Claude Code (PC 1) | Peran Owner + checklist hak akses; Fase A (validasi, status fee, penutupan, payroll void, activity log, halaman Pencapaian/Payroll tutor) | Fase B: katalog layanan, paket berisi pilihan layanan, kelayakan tutor |
| 2026-09-29 | Claude Code (PC 1) | Menganalisis Blueprint v3 → docs/ANALISIS_BLUEPRINT_V3.md | Pengguna menjawab keputusan; mulai Fase A (fondasi kontrol) |
| 2026-09-28 | Claude Code (PC 1) | Fitur video (YouTube/Drive embed) & slide PPTX/PDF per materi, pratinjau admin | Pengguna putuskan pemasangan LibreOffice; uji dengan link Drive asli |
| 2026-09-28 | Claude Code (PC 1) | Push dokumen ke GitHub; membangun apps/web (frontend + backend + panel admin) dan menguji alur lengkap secara lokal | Pengguna isi harga/konten; pilih hosting; Duitku sandbox |
| 2026-09-28 | Claude Code (PC 1) | Menyimpan diagram framework, menulis docs/RENCANA_EKSEKUSI_DOKTER_EDUKASI.md, memperbarui memori | Pengguna memutuskan Langkah 0 |
| 2026-09-23 12:23 WIB | Claude Code | Membaca dokumen proyek dan mengisi konfirmasi penerimaan AUC-SHARED-001; hanya PROJECT_MEMORY.md yang diubah | Codex memeriksa konfirmasi; pengguna memberikan URL referensi untuk memulai audit |

## Riset pembayaran — 28 September 2026
- Screenshot pengguna mengidentifikasi Duitku untuk transaksi Auctus yang ditunjukkan melalui domain app-prod.duitku.com dan logo Duitku.
- Dokumen: research/PAYMENT_GATEWAY_DUITKU.md; sumber resmi tentang Pop/redirect, tarif, callback, sandbox dan merchant telah dibaca/dicari. Identitas pelanggan dan referensi transaksi tidak disalin.
- Duitku kandidat integrasi, belum keputusan final penyedia proyek. Tidak membuat invoice, membayar, mendaftar merchant, atau mengimplementasikan integrasi.
- Langkah lanjut: tetapkan penyedia dan aturan biaya/paket; lakukan integrasi sandbox setelah scope disepakati. Refund otomatis dan ketentuan merchant aktual perlu verifikasi.

## Framework pengguna dan rencana eksekusi — 28 September 2026
- Pengguna memberikan framework "Dokter Edukasi Learning" (6 diagram, disimpan di design/framework-pengguna/): tiga jalur konten (Pre-Clinical, Clinical Practice + bimbingan, Medical Research + bimbingan), alur seleksi tutor, alur pelanggan-pembayaran, serta peran Admin Master / Tutor / Murid.
- Framework ini menjadi sumber utama scope proyek; audit Auctus tetap referensi pendukung.
- Claude Code menyusun docs/RENCANA_EKSEKUSI_DOKTER_EDUKASI.md: ringkasan framework, 8 celah keputusan, usulan stack (Next.js + Supabase + Duitku + layanan streaming video), model data, dan langkah 0–7 (rilis 1 konten + penjualan, rilis 2 bimbingan, rilis 3 payroll, rilis 4 lanjutan). Semua berlabel USUL; belum disetujui pengguna.
- Keputusan yang ditunggu: paket/harga/masa akses, akses otomatis setelah bayar vs manual, kanal notifikasi order, dasar payroll, pemilik merchant Duitku, stack teknologi, dan konten yang siap.
- Sinkronisasi: folder PC 1 (C:\Users\User\Desktop\Project  Framework Auc) disalin dari PC 2, sudah `git init` dan terhubung ke origin/main GitHub, tetapi belum ada commit/push (menunggu persetujuan pengguna). Folder PC 2 belum repo Git.
- Langkah berikutnya: pengguna memutuskan Langkah 0, lalu Langkah 1 (sitemap, alur, wireframe).

## Fondasi aplikasi — 28 September 2026 (Claude Code)
- Lokasi: apps/web (README di sana berisi cara menjalankan, peran, halaman, dan struktur kode). Konfigurasi preview: .claude/launch.json.
- Publik: beranda, 3 jalur (Pre-Clinical, Clinical Practice, Medical Research) dengan kategori & topik sesuai framework, katalog 10 paket (harga kosong = "Harga segera diumumkan"), halaman alur seleksi tutor (tautan Google Form dari pengaturan).
- Murid: daftar/masuk, pesan paket (order PENDING, admin dinotifikasi), dashboard paket & progres, penampil slide/PDF (iframe), video embed, tautan sumber, quiz per topik + pembahasan, riwayat pembelian, bimbingan + chat, notifikasi, akun.
- Tutor: klien saya, progres, sesi Zoom + bukti, chat, materi sesuai jalur yang diberikan admin, pendapatan & payroll.
- Admin Master: ringkasan, order (tandai lunas → hak akses otomatis + bimbingan), pengguna (buat akun, peran, profil/rate/rekening tutor, beri/cabut akses), konten (jalur/kategori/topik/materi + unggah PDF + quiz), paket, bimbingan (assign tutor, verifikasi sesi), payroll (bukti transfer, paid/unpaid), pengaturan teks situs.
- Belum: pembayaran otomatis Duitku, email sungguhan (sekarang log server), lupa sandi mandiri, rate limit login, AI cheatsheet, tes otomatis, deploy.
- Akun lokal: admin dari SEED_ADMIN_* di apps/web/.env (tidak di-commit); demo tutor@/murid@dokteredukasi.test memakai SEED_DEMO_PASSWORD.

## Video & slide materi — 28 September 2026 (Claude Code)
- Permintaan pengguna: tiap bagian materi bisa berisi video (link YouTube/Drive, diputar tanpa redirect) dan admin bisa menampilkan PPTX serta PDF.
- Dibuat: src/lib/embed.ts (YouTube via youtube-nocookie, Google Drive preview, Google Slides embed, Vimeo, Bunny, OneDrive, .mp4), src/components/material-viewer.tsx (penampil bersama murid + pratinjau admin), src/lib/convert.ts (PPTX→PDF via LibreOffice headless), kolom Item.originalFileId (migrasi item_original_file). Form admin per tipe: + Video, + Slide PPTX/PDF, + PDF, + Tautan, + Teks.
- Diverifikasi di browser lokal: link YouTube tersimpan dan diputar di dalam halaman materi (URL halaman tetap); link tidak dikenal ditolak dengan pesan jelas; unggah PPTX tanpa LibreOffice menampilkan pesan panduan dan tidak meninggalkan berkas sisa; bug deteksi PPTX (browser mengirim application/octet-stream) diperbaiki. Unit cek parser link: 11 format benar.
- Belum diverifikasi: video/slide Google Drive dengan file sungguhan, konversi PPTX sungguhan (LibreOffice belum terpasang di PC 1 — menunggu keputusan pengguna untuk memasang).
- Rekomendasi: video YouTube Unlisted (paling ringan & lancar); Drive bisa tetapi lebih lambat, ada batas kuota tayang, dan tombol pop-out ke Drive; untuk video yang benar-benar terlindungi kelak pakai Bunny Stream.

## Menjalankan website lokal — 29 September 2026
- Server yang dijalankan dari sesi agen ikut mati saat sesi berakhir. Pengguna kini menjalankan website sendiri dengan klik dua kali "Jalankan Website.bat" di akar proyek (jendela harus tetap terbuka); diverifikasi: beranda dan /masuk merespons 200.

## Blueprint v3 (Controlled) — 29 September 2026
- Pengguna memberikan Dokter_Edukasi_Web_Blueprint_v3_Controlled.xlsx (disalin ke design/blueprint/): aplikasi internal Owner/Admin–Tutor — penjualan, proyek, task/sesi, validasi admin, fee tutor Projected/Payable/Paid/No Fee, kelayakan tutor × layanan, pemetaan fee, audit log, dashboard HPP/laba.
- Analisis & pemetaan ke kode: docs/ANALISIS_BLUEPRINT_V3.md (ADA/SEBAGIAN/BELUM, celah kontrol, usulan fase A–D). Belum ada implementasi; menunggu pengguna menjawab 6 keputusan di bagian 5 dokumen tersebut.

## Keputusan pengguna atas Blueprint v3 — 2 Oktober 2026
1. Owner punya semua akses dan satu-satunya yang membuat akun admin dan tutor.
2. Hak akses admin dan tutor berupa checklist yang dipilih owner per akun. Admin bisa mendapat semua fitur bila dicentang owner. Tutor terbatas pada: Dashboard klien, Payroll, Pencapaian.
3. Pelanggan/murid membuat akun sendiri saat mendaftar.
4. Paket berisi pilihan layanan (bermacam paket, isi bisa dipilih) — dikerjakan di fase layanan/paket.
5. Jenis fee diinformasikan ke tutor di halaman Pencapaian.
6. Pembayaran bisa dicicil 2–3 kali; owner mengatur per layanan cicilan mana untuk tahap apa; tahap berikutnya terkunci sampai cicilan terkait dibayar — dikerjakan di fase penjualan.
7. Penutupan proyek hanya dengan dua alasan: pelanggan tidak aktif dalam waktu tertentu, atau masa waktu habis. Hanya owner dan admin yang menutup. (Alasan "tutor gagal"/"dibatalkan pelanggan" tidak dipakai.)

## Fase A blueprint + hak akses Owner — 2 Oktober 2026 (Claude Code)
- Peran: OWNER (semua akses; akun admin awal dimigrasikan jadi Owner), ADMIN, TUTOR, STUDENT. Owner membuat akun admin/tutor dan mencentang hak akses di /admin/tim (src/lib/permissions.ts: 12 izin admin, 3 izin tutor). Menu dan setiap halaman/aksi memeriksa izin di server.
- Fase A: status sesi SCHEDULED → DONE (tutor, wajib catatan + bukti) → divalidasi admin / REVISION (dengan catatan); antrean /admin/validasi; status fee Projected/Menunggu validasi/Payable/Paid/No fee (src/lib/fees.ts); penutupan proyek dengan 2 alasan (sesi belum selesai → batal tanpa fee, chat read-only, bisa dibuka kembali); payroll wajib referensi transfer, void menggantikan hapus; AuditLog di /admin/audit; halaman tutor Payroll dan Pencapaian (jenis fee, nominal, status fee per sesi). Jenis fee (feeBasis) diatur di profil tutor.
- Migrasi: owner_permissions_validation_audit (+ data: ADMIN→OWNER, COMPLETED/CANCELLED→CLOSED) dan default_tutor_permissions.
- Diverifikasi di browser lokal: owner melihat semua menu + angka keuangan; owner membuat "Admin Uji" dan mencentang Bimbingan+Validasi → admin hanya melihat 3 menu, tanpa angka keuangan, halaman lain dialihkan; tutor hanya 3 menu, /admin dialihkan; tandai selesai tanpa catatan/bukti ditolak; revisi → tutor melihat catatan → kirim ulang → owner validasi (fee Rp150.000 payable); tutup proyek → status Paid/Payable/No fee benar, chat read-only; activity log mencatat semua langkah; mencabut izin Payroll tutor langsung menyembunyikan menu & mengalihkan URL (lalu dipulihkan). tsc, eslint, next build lolos.
- Data uji lokal tambahan: akun admin.uji@dokteredukasi.test (Admin; sandi sama dengan SEED_DEMO_PASSWORD), proyek bimbingan murid.uji ditutup (uji penutupan). Nama tampilan Owner masih "Admin Master" (bisa diubah di menu Akun).
- Belum: Fase B (katalog layanan + HPP, paket berisi pilihan layanan, matriks kelayakan tutor × layanan, fee per layanan), Fase C (input penjualan admin, cicilan 2–3x yang mengunci tahap berikutnya, checklist task), Fase D (dashboard HPP/laba/performa). PC 2 sedang offline saat sesi ini; salin ulang ke folder PC 2 setelah online (atau Codex git pull).

## Arahan Fase B — 2 Oktober 2026
- Pengguna akan membuat layanan sendiri secara manual dari panel admin dan layanan muncul di website. Kolom yang diminta: poster layanan, deskripsi, benefit bagi customer, harga, paket add-on, pilihan masa waktu belajar (3 bulan dan 6 bulan). Semua bisa ditambah/dikurangi manual.

## Fase B selesai — 2 Oktober 2026 (Claude Code)
- "Paket" kini tampil sebagai "Layanan" (model DB tetap Package, URL tetap /paket dan /admin/paket). Editor layanan /admin/paket/[id]: (1) data utama + poster publik + HPP + SOP/WI + materi + bimbingan; (2) benefit per baris; (3) pilihan masa belajar (label, bulan, harga, HPP, aktif, urutan; bawaan 3 & 6 bulan); (4) add-on (nama, keterangan, harga, HPP, aktif); (5) matriks tutor Primary/Backup + fee & jenis fee per layanan.
- Model baru: PackageBenefit, PackageDuration, PackageAddon, TutorServiceEligibility, OrderAddon; kolom baru Package.posterFileId/hpp/sopUrl/sopNote, Order.durationLabel/durationMonths/basePrice, FileAsset.isPublic. Migrasi services_durations_addons_eligibility (+ data: tiap layanan lama mendapat opsi 3 & 6 bulan tanpa harga). Cadangan DB lokal sebelum migrasi ada di scratchpad sesi (bukan repo).
- Pemesanan: customer memilih masa belajar + add-on, total tampil langsung; server menghitung ulang dan menolak opsi palsu; order menyimpan salinan pilihan & harga; hak akses berakhir sesuai bulan yang dipilih.
- Penugasan tutor untuk bimbingan dari layanan hanya menampilkan tutor Primary/Backup layanan itu (juga dicek di server); fee validasi = isian admin → fee per layanan → rate umum. Tutor melihat SOP layanan di halaman bimbingan dan tabel fee per layanan di Pencapaian.
- Diverifikasi di browser lokal: owner mengisi poster, deskripsi, 4 benefit lalu hapus 1, harga 3/6 bulan, add-on, tambah lalu hapus opsi 12 bulan; poster terbuka tanpa login (200 image/png); katalog & halaman layanan menampilkan semuanya; total langsung 6 bulan + add-on = Rp2.800.000; opsi palsu ditolak; order tersimpan Rp2.800.000 dengan rincian; owner tandai lunas → akses sampai 2 Apr 2027 (6 bulan), bimbingan dibuat, pilihan tutor hanya tutor Primary, SOP tampil. tsc, eslint, next build lolos.
- Data uji lokal: layanan "Bimbingan Medical Research — Review" berisi poster/benefit/harga uji; order DE-261002-0097B7 (murid demo) lunas. Harga uji bisa diganti owner.
- Berikutnya Fase C: cicilan 2–3x per layanan yang mengunci tahap berikutnya, input penjualan oleh admin, checklist task per layanan. Fase D: dashboard HPP/laba/performa.

## Fase C selesai — 2 Oktober 2026 (Claude Code)
- Layanan: tahap bernomor + checklist task (ServiceStage, ServiceTaskTemplate) dan aturan cicilan 2–3x (InstallmentRule: persen, tahap yang dibuka; cicilan 1 selalu membuka tahap 1; total 100%). Package.allowInstallment.
- Order: paymentPlan FULL/INSTALLMENT, OrderInstallment (salinan jadwal), discount, leadSource, createdById, status baru PARTIAL. Cicilan dikonfirmasi berurutan oleh admin; cicilan 1 mengaktifkan akses + proyek + checklist; cicilan terakhir → PAID. Bayar penuh tetap memakai markOrderPaid.
- Proyek: ProjectTask (TODO → DONE oleh tutor dengan catatan wajib & link bukti opsional → divalidasi admin / REVISION). Tahap terkunci bila ada cicilan belum lunas yang membuka tahap ≤ N (UI & server). Progres proyek = persen task tervalidasi. Antrean /admin/validasi kini berisi task + sesi. Tutup proyek memblokir bila ada task/sesi menunggu validasi; task belum selesai dibatalkan. Tombol "Terapkan checklist dari layanan" untuk proyek lama.
- Input penjualan admin /admin/order/baru (pelanggan terdaftar/baru, layanan, masa, add-on, diskon bila akses keuangan, bayar penuh/cicil, sumber pelanggan, catatan). Form pelanggan di website: pilihan Bayar penuh / Cicil Nx dengan jadwal, dan "Tahu layanan ini dari".
- Tombol mengambang "Chat Admin" WhatsApp (src/components/whatsapp-button.tsx) untuk pengunjung/pelanggan/tutor; nomor dari Pengaturan situs; 08xx otomatis jadi 628xx. Nomor admin BELUM diisi (pengguna perlu mengisinya).
- Migrasi: installments_stages_tasks. Cadangan DB lokal sebelum migrasi di scratchpad sesi.
- Diverifikasi di browser lokal: owner membuat 3 tahap × 2 task pada layanan Review; aturan cicilan salah (110%) ditolak, aturan DP 50% → tahap 1, Pelunasan 50% → tahap 3 tersimpan; admin input penjualan pelanggan baru via WhatsApp, 6 bulan, diskon Rp100.000, cicil 2x → total Rp2.400.000 = 2 × Rp1.200.000; konfirmasi DP → status Cicilan berjalan, proyek + 6 task, tahap 3 terkunci; tutor menyelesaikan task tahap 1, percobaan memalsukan task tahap 3 ditolak server; owner validasi task → progres 17%; konfirmasi pelunasan → Lunas & tahap 3 terbuka; halaman layanan menampilkan Cicil 2x (Rp750.000 × 2) dan tombol Chat Admin (tidak tampil untuk owner), nomor 0812… → wa.me/62812…; nomor uji dikosongkan lagi. tsc, eslint, next build lolos.
- Data uji lokal: layanan Review berisi tahap/cicilan uji; akun cicil.uji@dokteredukasi.test (sandi = SEED_DEMO_PASSWORD) dengan order DE-261002-18C1F1 lunas.
- Berikutnya Fase D: dashboard HPP/laba/margin, performa layanan/kategori/tutor, alert (overdue, akan kedaluwarsa, fee payable), laporan & ekspor. Juga: pembayaran online Duitku, email sungguhan, deploy.

## Arahan pengguna — 2 Oktober 2026 (setelah Fase C)
- Pelanggan yang sudah bayar menerima kwitansi via email (bisa diatur); ada tombol konfirmasi ke admin via WhatsApp dengan template berisi identitas pelanggan dan paket. Owner dan admin menerima email pemberitahuan pelanggan baru. Lalu lanjut Fase D.

## Email, WhatsApp, dan Fase D selesai — 2 Oktober 2026 (Claude Code)
- Email: src/lib/email.ts (nodemailer SMTP dari .env: SMTP_HOST/PORT/USER/PASS/MAIL_FROM/APP_URL; tanpa SMTP email dicatat SKIPPED), model EmailLog, halaman /admin/email (izin Pengaturan situs). Kwitansi otomatis ke pelanggan saat bayar penuh/cicilan lunas (setelan sendReceiptEmail ya/tidak; kirim ulang di halaman order), halaman cetak /pembelian/[id]/kwitansi. Owner + admin (izin Murid atau Order) + email tambahan di Pengaturan menerima email pelanggan baru (daftar & input penjualan) dan order baru.
- WhatsApp: template konfirmasi pembayaran di Pengaturan (placeholder {situs} {nama} {email} {whatsapp} {kode_order} {layanan} {masa_belajar} {addon} {cara_bayar} {total} {tagihan}); tombol hijau di halaman pesanan pelanggan.
- Fase D: izin baru admin.reports "Laporan & performa"; /admin/laporan (filter periode WIB: bulan ini/lalu/tahun ini/semua/rentang) — keuangan (pendapatan = uang diterima, HPP proporsional per cicilan, laba kotor & margin, laba setelah fee, fee validated/payable/paid/projected), penjualan, operasional, peringatan (sesi lewat jadwal, akses berakhir ≤14 hari, menunggu tutor >2 hari, cicilan berikutnya, order belum bayar >3 hari), terlaris, performa layanan/kategori/tutor, sumber pelanggan, rincian pembayaran; ekspor CSV (UTF-8 BOM, pemisah ;) di /api/laporan/[pembayaran|order|layanan|tutor|sumber]. Angka uang tetap butuh admin.finance. Order kini menyimpan salinan HPP (kolom Order.hpp; order lama null).
- Perbaikan tata letak: menu admin membuat halaman admin melebar di layar sempit — diperbaiki di admin/layout.tsx; input editor layanan responsif.
- Diverifikasi di browser lokal dengan server SMTP lokal (smtp-server di scratchpad, bukan bagian repo): pendaftaran pelanggan → email "Pelanggan baru" ke owner (admin tanpa izin terkait tidak menerima); order → email "Order baru" berisi rincian; template WhatsApp terisi identitas, kode order, layanan, total, tagihan (nomor 0812… → wa.me/62812…); owner tandai lunas → kwitansi terkirim ke email pelanggan + tercatat di log; halaman kwitansi tampil & menyembunyikan header/footer saat cetak. Laporan "Semua": pendapatan Rp7.200.000, HPP Rp600.000, laba kotor Rp6.600.000 (91,7%), fee tervalidasi Rp300.000 = dibayar Rp150.000 + payable Rp150.000 — cocok dengan perhitungan manual; Oktober Rp6.700.000 (4 pembayaran), September Rp500.000; CSV 200 text/csv; admin tanpa izin laporan dialihkan & CSV 403; tidak ada overflow horizontal di 375px & 746px. Setelah uji: nomor WA uji dihapus, .env dipulihkan (SMTP kosong), server SMTP lokal dimatikan. tsc, eslint, next build lolos.
- Data uji lokal tambahan: akun email.uji@dokteredukasi.test dengan order DE-261002-8FBCBC lunas.
- Menunggu pengguna: isi nomor WhatsApp admin & (opsional) email tambahan di Pengaturan situs; isi SMTP di apps/web/.env agar email benar-benar terkirim.
- Berikutnya: pembayaran online Duitku (sandbox), deploy (PostgreSQL + object storage + hosting), tes otomatis.

## Protokol pembaruan
- Awal sesi: baca seluruh file ini, periksa berkas aktual dan perubahan lokal, lalu catat pelaksana serta fokus aktif.
- Akhir tahap / sesi: perbarui status, keputusan, berkas berubah, hasil verifikasi, hambatan, dan langkah berikutnya secara konkret.
- Jangan menandai selesai tanpa bukti. Bedakan rencana, pekerjaan sebagian, dan hasil yang telah diuji.
- Hindari dua alat menulis file yang sama bersamaan. Jika sesi lain aktif, koordinasikan pembagian atau tunggu serah terima.
- Pertahankan riwayat ringkas; jangan menyalin percakapan panjang atau menyimpan informasi rahasia.

## Konfirmasi penerimaan Claude
- ID instruksi: AUC-SHARED-001.
- Sumber prompt: handoffs/START_CLAUDE.md.
- Status penerimaan Claude: Diterima oleh Claude Code.
- Waktu penerimaan dan zona waktu: 2026-09-23 12:23 WIB (UTC+07:00, Asia/Jakarta), dari jam sistem komputer DESKTOP-CH10VNS.
- Folder yang berhasil diakses Claude: \\desktop-ch10vns\data bersama pc 1 pc 2\Project  Framework Auc (dibaca melalui jalur UNC). Sesi Claude berjalan di komputer DESKTOP-CH10VNS dengan direktori kerja C:\DATA BERSAMA PC 1 PC 2\Project  Framework Auc; PROJECT_MEMORY.md di kedua jalur identik saat diperiksa (cmp), jadi keduanya folder yang sama, bukan salinan.
- Dokumen yang dibaca Claude: handoffs/START_CLAUDE.md, AGENTS.md, CLAUDE.md, PROJECT_MEMORY.md, research/PLATFORM_AUDIT.md, docs/REQUIREMENTS.md, README.md. Isi folder saat diperiksa hanya 8 file dokumen (termasuk .gitignore); apps/, backend/, design/, assets/, tests/ masih kosong. Folder ini bukan repositori Git.
- Ringkasan pemahaman tujuan: Mempelajari platform referensi (URL dari pengguna) sesuai akses yang diberikan — halaman, alur per peran murid/tutor/pengelola, fitur, video, dan ketentuan — dengan membedakan fakta, asumsi, dan usulan serta menandai bagian yang belum terverifikasi. Hasilnya dipakai untuk menyusun kebutuhan dan kriteria penerimaan, lalu membangun website pembelajaran milik proyek sendiri (frontend, backend, pemutaran video) untuk murid dan tutor. Teknologi dipilih setelah kebutuhan cukup jelas; aset/konten referensi hanya dipakai dengan sumber dan izin yang tercatat.
- Kesepakatan memakai memori bersama: Setuju. PROJECT_MEMORY.md adalah satu-satunya memori/status bersama dengan Codex; Claude tidak membuat memori proyek terpisah, mencatat pelaksana aktif sebelum mengedit, melepas penanda saat selesai, dan memperbarui file ini di setiap akhir tahap/sesi.
- Kendala / perbedaan pemahaman: Tidak ada kendala akses. URL platform referensi belum diberikan sehingga audit (P03–P04) belum bisa dimulai. Tidak ada perbedaan pemahaman terhadap instruksi.
- Langkah berikutnya menurut Claude: Meminta URL platform referensi beserta cakupan akses (akun murid/tutor bila perlu, tanpa menuliskan sandi di dokumen) kepada pengguna; setelah tersedia, memeriksa halaman publik, menyusun inventaris halaman dan alur per peran di research/PLATFORM_AUDIT.md, lalu merumuskan kebutuhan di docs/REQUIREMENTS.md.
- Pemeriksaan Codex: 2026-09-23, konfirmasi AUC-SHARED-001 sudah dibaca. Tujuan murid/tutor, video/backend, audit berbukti, dan memori tunggal sesuai instruksi. Tidak ditemukan perbedaan pemahaman. URL dan hasil audit kini tersedia; catatan Claude sebelumnya tentang menunggu URL adalah riwayat, bukan status terbaru.


## Hasil audit publik dan konteks GitHub
- Referensi: https://auctus.academy/; laporan: research/PLATFORM_AUDIT.md; draf kebutuhan: docs/REQUIREMENTS.md.
- Tiga domain utama: ujian kedokteran, EKG, riset; tambahan coaching, bootcamp, webinar, dan Anki.
- Pisahkan hak konten lifetime dari masa layanan tutor, serta kebijakan berversi dari implementasi. Teknologi backend asli belum diketahui.
- Pengguna memilih audit publik dulu, kemudian login manual di browser Codex.
- GitHub yang diberikan: https://github.com/teddytjahyanto12-hue/dokteredukasiAUC.git. git ls-remote berhasil membaca main pada pemeriksaan sebelumnya; izin push belum diverifikasi.
- Folder lokal belum dihubungkan/dipush ke GitHub oleh Codex. Dokumen audit sesi ini tersimpan lokal; jangan mengklaim Claude cloud sudah menerima hasilnya melalui GitHub.
- Serah terima 2026-09-23 oleh Codex: memperbarui research/PLATFORM_AUDIT.md, docs/REQUIREMENTS.md dan PROJECT_MEMORY.md; menyiapkan halaman login untuk pengguna. Audit seluruh platform masih sebagian.
- Serah terima 2026-09-23 oleh Codex: memeriksa dashboard akun, course SR-MA, EKG, UKNPDPD, dan admin coaching secara read-only; memperbarui audit dan status. Pengguna diminta membahas prioritas fitur sebelum implementasi.
- Serah terima 2026-09-23 oleh Codex: melanjutkan audit seluruh route dashboard coaching dan memperbarui research/PLATFORM_AUDIT.md dengan lifecycle admission, commitments, start adjustment, pipeline milestone, verifikasi, grup, chat, dan payroll. Tidak ada mutasi data.
- Serah terima 2026-09-23 oleh Codex: membuat roadmap terstruktur di docs/ROADMAP.md. Audit dinyatakan tahap pertama, bukan 100% selesai; implementasi menunggu penutupan audit yang diperlukan dan persetujuan scope rilis pertama.

- Serah terima arahan 2026-09-23: Codex memperbarui PROJECT_MEMORY.md saja untuk menegaskan audit menyeluruh sesuai akses → rencana penyesuaian → pembahasan prioritas → implementasi. Tahap akun tetap menunggu login manual pengguna.

- Serah terima 2026-10-06 oleh Claude: membuat AKUN_DAN_ISIAN.md di akar proyek (akun login + daftar isian pengguna; berisi sandi, masuk .gitignore, TIDAK ada di GitHub/PC 2). Laporan dijelaskan ke pengguna sebagai otomatis dari database (tanpa AI). Tidak ada perubahan kode.
- Serah terima 2026-10-06 oleh Claude: LAPORAN BERKALA VIA EMAIL (tanpa AI). File: apps/web/src/lib/report-email.ts (lastCompletedPeriod, reportRecipients, sendPeriodicReport, runReportSchedule), src/instrumentation.ts (penjadwal bawaan, cek tiap 10 menit; impor harus di dalam blok `if (NEXT_RUNTIME === "nodejs")` — bentuk early-return membuat build edge gagal karena node:child_process), src/app/api/cron/laporan (pemicu cadangan, header Bearer CRON_SECRET), sendReportNowAction di actions/admin.ts, panel + tombol kirim manual di /admin/laporan. Pengaturan baru: reportEmailSchedule (tidak/mingguan/bulanan/keduanya) dan reportEmailTo. Mingguan = Senin 07.00 WIB untuk Senin–Minggu sebelumnya; bulanan = tanggal 1 07.00 WIB; susulan bila server mati; anti-ganda lewat kunci Setting `reportSent:<jenis>:<periode>`; tidak jalan bila SMTP kosong. Penerima: owner + admin dengan admin.reports DAN admin.finance + reportEmailTo. Bukti uji (SMTP lokal, 2026-10-06): penjadwal mengirim 2 email (mingguan 28 Sep–4 Okt Rp7,2 jt; bulanan September Rp500 rb), pemicu kedua menjawab "Sudah dikirim", cron tanpa token 403, tombol manual terkirim 1/1. Setelah uji: .env dipulihkan, kunci & log uji dihapus, jadwal di DB lokal dibiarkan "keduanya". Belum diuji: jadwal menunggu sampai Senin/tanggal 1 sungguhan, dan SMTP asli.
- Serah terima 2026-10-06 oleh Claude: PEMBAYARAN ONLINE DUITKU (POP / halaman bayar Duitku). File: apps/web/src/lib/duitku.ts (dueFor, createDuitkuPayment, handleDuitkuCallback, syncOrderPayments, settle idempoten), api/duitku/callback (POST form, verifikasi MD5 merchantCode+amount+merchantOrderId+apiKey + cek jumlah), api/duitku/kembali (tidak percaya parameter URL; tanya transactionStatus), payOnlineAction/checkPaymentAction di actions/student.ts, bagian "Bayar online" di /pembelian/[id], daftar percobaan di /admin/order/[id]. Model baru PaymentAttempt (migrasi payment_attempts). Env: DUITKU_MERCHANT_CODE, DUITKU_API_KEY, DUITKU_ENV (sandbox|production); tombol hanya muncul bila keduanya terisi; DUITKU_BASE_URL hanya untuk server tiruan. Pelunasan memakai markOrderPaid/markInstallmentPaid yang sama (kwitansi, aktivasi, buka tahap), paymentMethod jadi DUITKU, staf dapat email. Bukti uji 2026-10-06 dengan server Duitku TIRUAN lokal: bayar penuh lunas lewat cek status; kembali dengan resultCode=00 palsu tetap "belum dibayar"; cicilan 1 lunas lewat callback (order PARTIAL); callback tanda tangan salah 400; jumlah salah 400; callback ganda tidak dobel (1 kwitansi). BELUM diuji: sandbox Duitku asli (butuh merchant code & API key dari pengguna) — nama field/endpoint ditulis dari dokumentasi yang diingat, wajib diverifikasi di sandbox; callback juga butuh alamat publik (tidak menjangkau localhost; di lokal mengandalkan cek status saat kembali). Data uji dihapus, .env dipulihkan. Rencana berikut yang dibahas: model membership ala Coursera Plus (membership semua kelas, halaman kelas, progres, sertifikat, jalur belajar) — menunggu keputusan pengguna.
- Serah terima 2026-10-06 oleh Claude: MODEL ALA COURSERA (tahap 1) + INVOICE MANUAL. Keputusan: "Kelas" = Category (tidak ada model baru); "Jalur belajar" = LearningPath (BUKAN Track; Track kini disebut "program" di beranda). Migrasi courses_paths_offer_invoice: Category +level/durationText/instructor/outcomes/posterFileId; LearningPath + LearningPathStep; Testimonial; Faq; Order +customerNote/invoiceRequestedAt. File baru: src/lib/courses.ts (loadCourses, courseStats, doneItemIds; item LINK tidak dihitung progres), src/lib/paths.ts, components/course-card.tsx, halaman /kelas, /kelas/[id], /jalur, /jalur/[slug], /penawaran, admin /admin/jalur, /admin/jalur/[id], /admin/penawaran, actions/paths.ts. Diubah: /materi (tombol "Selesai & lanjut" = completeAndNextAction, lintas topik), /belajar ("Kelas saya" + Lanjutkan belajar), form kategori admin (kolom halaman kelas + poster), header (Kelas, Jalur belajar, Penawaran; nav desktop mulai xl), beranda. Materi gratis memakai Item.isFree yang sudah ada (tetap wajib login). Pengaturan baru: offerTitle, offerSubtitle, offerBenefits ("Judul | penjelasan" per baris). INVOICE MANUAL: tombol "Kirim invoice ke WhatsApp admin" di /pembelian/[id] → requestManualInvoiceAction menyimpan catatan, memberi tahu staf (notifikasi+email), lalu redirect ke wa.me dengan template waConfirmTemplate (default baru berformat invoice: {no_invoice} {paket} {biaya} {cara_bayar} {tagihan} {catatan}); nomor invoice = INV-<kode tanpa DE->[-C<seq>]; admin tetap menandai lunas manual. Bukti uji 2026-10-06 (browser, data sementara lalu dihapus): halaman publik 200 untuk tamu; murid tanpa paket melihat 2 materi gratis, "Selesai & lanjut" berpindah materi lalu kembali ke kelas dengan pesan habis; materi berbayar tidak tampil walau id item dipaksa di URL; jalur menampilkan progres 50% dan langkah sekarang; invoice membuka WhatsApp dengan isi lengkap + admin melihat nomor invoice & catatan di halaman order. BELUM diuji: unggah poster kelas, tampilan lebar HP halaman baru, CRUD testimoni/FAQ/jalur lewat form (hanya render yang dicek; data uji dibuat lewat DB). Belum dibuat: membership semua-kelas, sertifikat, ulasan/rating, paket instansi.
