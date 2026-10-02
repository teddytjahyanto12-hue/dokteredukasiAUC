# Memori bersama proyek platform pembelajaran

File ini adalah sumber kebenaran tunggal untuk status, keputusan, dan serah terima Codex / Claude Code. Dokumen lain menyimpan detail, bukan salinan status.

## Status terkini
- Pembaruan terakhir: 2026-09-28 (Asia/Jakarta), fondasi website + backend di apps/web oleh Claude Code.
- Tahap: fondasi aplikasi (frontend + backend + panel admin) sudah dibangun dan diuji lokal; belum di-deploy; harga/keterangan paket menunggu pengguna.
- Pekerjaan terakhir oleh: Claude Code (PC 1).
- Pelaksana aktif: tidak ada; Fase A blueprint + hak akses Owner selesai dan di-push.
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


