# Analisis Blueprint v3 (Controlled) terhadap aplikasi saat ini

Disusun: 2026-09-29 oleh Claude Code. Status resmi: ../PROJECT_MEMORY.md.
Sumber: `design/blueprint/Dokter_Edukasi_Web_Blueprint_v3_Controlled.xlsx` (8 sheet, dari pengguna).
Pembanding: kode `apps/web` pada commit f2c9a86.

Label status: **ADA** = sudah berjalan; **SEBAGIAN** = ada dasar, perlu diperluas; **BELUM** = perlu dibangun.

## 1. Inti blueprint

Blueprint mendefinisikan **aplikasi internal operasional** untuk Owner/Admin dan Tutor (bukan tampilan murid):

- Alur: Penjualan → Penugasan tutor → Proyek → Task/Sesi → Fee tutor → Laporan.
- Prinsip kontrol utama:
  1. **Tutor Done ≠ Completed.** Klik Done dari tutor hanya menjadi *Pending Admin Validation*; hanya admin yang memvalidasi.
  2. **Status fee saling eksklusif:** Projected / Payable (Unpaid) / Paid / No Fee. Satu task/sesi hanya punya satu status fee.
  3. **Bimbingan parsial:** fee hanya untuk sesi yang divalidasi selesai; sesi tidak terpakai = tanpa fee.
  4. **Satu task/sesi tidak boleh dibayar dua kali.**
  5. **Stuck / Failed / Cancelled / Expired = No Fee**, wajib alasan.
  6. **Kelayakan tutor per layanan** (Primary / Backup / Not Eligible); hanya Primary/Backup muncul saat penugasan.
  7. **Fee dari pemetaan tutor × layanan** yang dikunci owner; tutor tidak bisa mengubah.
  8. **Tutor hanya melihat miliknya:** proyek yang ditugaskan, SOP/WI, checklist, materi, Zoom, status bayar proyek, fee sendiri. Tidak melihat penjualan, HPP, laba, tutor lain.
  9. **Activity log** dan **tanpa hapus permanen** untuk data keuangan/task (void + alasan).

Blueprint melengkapi (bukan menggantikan) framework sebelumnya: framework mengatur sisi murid (materi, quiz, paket), blueprint mengatur sisi operasional owner–tutor.

## 2. Pemetaan fitur V1 (sheet 05) terhadap aplikasi saat ini

| Fitur V1 (Must Have) | Status | Kondisi sekarang | Yang perlu dibangun |
|---|---|---|---|
| Login + izin per peran | ADA | Admin/Tutor/Murid, dicek di server | Pisahkan Owner vs Admin bila diperlukan |
| Manajemen akun tutor | ADA | Admin membuat/menonaktifkan akun, reset sandi | — |
| Matriks kelayakan layanan | BELUM | Tutor hanya punya satu "bidang"; semua tutor aktif muncul saat assign | Tabel TutorEligibility (tutor × layanan: Primary/Backup/Not Eligible); filter daftar assign |
| Fee tutor per layanan | SEBAGIAN | Satu rate per tutor | Tabel TutorFeeMapping (tutor × layanan, jenis fee, nominal, milestone); fee dikunci saat assign |
| Katalog produk/layanan | SEBAGIAN | Paket punya nama, harga, masa akses, isi materi | Tambah kategori, HPP, SOP/WI, durasi, jumlah sesi, fee standar, foto; Bundle = gabungan layanan + template task |
| Input penjualan oleh admin | BELUM | Order hanya dibuat murid dari website; admin menandai lunas | Form "Penjualan baru" (pelanggan, layanan/bundle, qty, harga jual, diskon, status bayar, sumber lead); order online otomatis juga jadi penjualan |
| Proyek + penugasan tutor | SEBAGIAN | "Bimbingan" = proyek; admin assign tutor | Perluas jadi Proyek (ID proyek, jenis layanan, start, target date, end period, status); hanya tutor eligible |
| Checklist task/sesi | SEBAGIAN | Ada sesi Zoom + catatan progres; tidak ada checklist task | Model Task (checklist per proyek, dari template layanan) dengan target date & status |
| Antrean validasi admin | SEBAGIAN | Admin "verifikasi sesi" per sesi | Status Tutor Marked Done → Pending Validation → Validated / Revision Needed / Failed, untuk task dan sesi; halaman antrean |
| Target date + end period | SEBAGIAN | Ada masa akses paket | Kolom pada proyek + alert kedaluwarsa |
| SOP/WI + materi proyek | SEBAGIAN | Materi murid ada; SOP/WI belum | SOP/WI per layanan; materi per proyek; tutor hanya melihat yang ditugaskan |
| Link Zoom + rekaman | SEBAGIAN | Link Zoom + bukti | Tambah link rekaman dan kehadiran |
| Status bayar proyek (tutor lihat) | BELUM | Tutor tidak melihat status bayar | Tampilkan Paid/Unpaid proyek di panel tutor (tanpa harga/HPP) |
| Pelacakan fee tutor | SEBAGIAN | Sesi terverifikasi → payroll → paid | Ledger TutorFee satu baris per task/sesi dengan status tunggal Projected/Payable/Paid/No Fee |
| Blok pembayaran ganda | SEBAGIAN | Sesi hanya bisa masuk satu payroll | Constraint unik fee per task/sesi + referensi & tanggal bayar wajib |
| Penutupan admin + alasan | BELUM | Status bimbingan bisa diubah tanpa alasan | Close/Stuck/Failed/Cancelled/Expired dengan kode alasan wajib; otomatis No Fee |
| Activity log | BELUM | Tidak ada | AuditLog (waktu, user, aksi, entitas, status lama/baru) untuk Done, validasi, fee, pembayaran, harga |
| Dashboard KPI | SEBAGIAN | Ringkasan order/bimbingan/sesi | Dashboard finansial (Sales, HPP, Gross Profit, Margin, fee payable/paid/projected), operasional, top selling, alert |

Should Have: kapasitas tutor (BELUM), bukti validasi wajib (SEBAGIAN — bukti sesi sudah ada), performa bisnis/kategori/tutor (BELUM).
V2: kanal penjualan, ekspor Excel/PDF, monitoring kategori dinamis (BELUM).

## 3. Celah kontrol pada kode saat ini (perlu diperbaiki bila blueprint diadopsi)

1. Tutor menandai sesi "Selesai" dan admin "Verifikasi" — sudah mendekati prinsip "Done ≠ Completed", tetapi status fee belum eksplisit dan belum ada alur *Revision Needed*.
2. Fee diambil dari rate tutor saat verifikasi, bukan dikunci dari pemetaan tutor × layanan saat penugasan.
3. Admin dapat membatalkan verifikasi dan mengubah fee tanpa jejak (tidak ada audit log).
4. Semua tutor aktif muncul di pilihan tutor, termasuk yang tidak berwenang untuk layanan tersebut.
5. Beberapa aksi admin menghapus data permanen (paket tanpa order, payroll belum dibayar, materi). Untuk data keuangan/task perlu diganti void + alasan.
6. Tutor melihat nomor WA dan email murid pada proyek yang ditugaskan — sesuai blueprint (pelanggan proyek sendiri), tetapi perlu dipastikan tidak ada jalur ke data pelanggan lain.

## 4. Usulan urutan penerapan

| Fase | Isi | Alasan urutan |
|---|---|---|
| A. Fondasi kontrol | Activity log; status task/sesi sesuai sheet 04; antrean validasi; ledger TutorFee (Projected/Payable/Paid/No Fee, unik per task/sesi); penutupan dengan alasan; void pengganti hapus | Semua fitur keuangan bergantung pada ini; mencegah angka ganda sejak data pertama |
| B. Layanan & tutor | Katalog layanan (HPP, SOP/WI, jumlah sesi, fee standar, template task); bundle; matriks kelayakan; pemetaan fee; kapasitas tutor | Penugasan dan fee membutuhkan data ini |
| C. Penjualan & proyek | Input penjualan admin (termasuk parsial/refund, diskon, sumber lead); order online → penjualan; proyek dengan ID, target & end period; checklist dari template; sesi + rekaman + kehadiran; status bayar proyek untuk tutor | Menyatukan penjualan offline (WA) dan online |
| D. Dashboard & performa | KPI finansial & operasional, alert (overdue, akan kedaluwarsa, fee payable, penugasan gagal), top selling, performa kategori/layanan/tutor; dashboard pribadi tutor | Butuh data dari fase A–C |
| V2 | Kanal penjualan, ekspor Excel/PDF, monitoring kategori dinamis (webinar, materi/royalti) | Sesuai prioritas blueprint |

Perkiraan kasar: Fase A 3–4 hari kerja, B 3–4 hari, C 4–6 hari, D 3–4 hari (satu pengembang dibantu AI, tanpa perubahan desain besar). Bukan komitmen.

## 5. Keputusan yang perlu dari pengguna

1. **Owner vs Admin:** apakah ada staf admin selain owner yang tidak boleh melihat HPP/laba/fee? Jika ya, perlu peran terpisah Owner dan Admin.
2. **Paket murid vs layanan:** usul — "Paket" yang dijual di website menjadi "Layanan/Bundle" di katalog blueprint (satu sumber harga, HPP, fee). Setuju?
3. **Jenis fee per layanan:** per sesi (bimbingan), per proyek/milestone (SR), per event (webinar), royalti per produk (materi). Nominal diisi owner.
4. **Milestone bimbingan riset:** gunakan daftar task standar per layanan (mis. judul fix, protokol, PRISMA, analisis, naskah)? Mohon daftar task per layanan bila sudah ada.
5. **Status bayar parsial:** apakah pelanggan boleh mencicil? Jika ya, akses/proyek dimulai saat Partial atau menunggu Paid?
6. **Kode alasan penutupan:** daftar awal usulan — Pelanggan tidak aktif, Masa layanan habis, Tutor gagal, Dibatalkan pelanggan, Duplikat, Lainnya (wajib catatan).
