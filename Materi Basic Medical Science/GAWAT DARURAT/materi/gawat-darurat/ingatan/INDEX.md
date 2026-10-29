# INDEX Modul Gawat Darurat Preklinik

## Status (2026-10-29)
- Selesai dan dirakit: BAB 01, 02, 03, 04, 05 (BAB 04 belum diperiksa visual PDF-nya) (naskah + gambar + DOCX/PDF per BAB + modul gabungan). PDF BAB 01, 02, 03, 05 diperiksa visual.
- Belum ditulis: BAB 06-36. BAB 06 sedang disiapkan: bahan sudah dibaca (EIMED 184-188 jalan napas, 199-206 oksigen + Tabel FiO2 hlm 206, 371-375 gagal napas; ATLS 37-40). Gambar kandidat ATLS hlm 45 xref 384 (chin-lift), 385 (jaw-thrust), 386 (pemasangan OPA) (susunan lengkap di `build.py` SUSUNAN; isi per BAB di `../../MATERI MENTAH/Outline_Gawat_Darurat_Preklinik.md`).
- Urutan kerja berikutnya: BAB 04 (EIMED VI lab 72-101 + ATLS adjunct), 06 (EIMED XIII 184, XIV 199, XV 208, XXVI 371 + ATLS Bab 2 PDF 36-67), 07 (EIMED XXIV + Sepsis-3 + WAO anafilaksis, verifikasi PubMed), 08 (EIMED X 156, XI 166 + ATLS Bab 3), 09 (EIMED XVII-XXIII 268-351), 10 (EIMED VII 102 + `dosis obat emergency.pdf` + Pocket Guide 83-125), 11 (EIMED VIII 119, XXX 405 + AHA ALS), lalu sistem.

## Struktur folder
- `naskah/BAB_xx_*.md` (H2 = BAB, H3 = 7 subjudul wajib). `gambar/` potongan sumber + ilustrasi.
- `ekstrak_teks.py` → `_ekstrak/{C,A,P,D,E}.txt` (penanda `==== Hlm n ====`); `ocr_eimed.py` → `_ekstrak/E_ocr/NNN.txt` (EIMED pindaian, Tesseract eng, sudah lengkap 590 hlm). `hlm.py KODE a b` mencetak rentang halaman. `_ekstrak` tidak di-commit.
- `potong_gambar.py` (SPEK: xref gambar atau kotak pt; sumber E dibersihkan garis tabel + dipangkas), `ilustrasi.py` (matplotlib, Times New Roman, kuning FFD20A).
- `build.py` (md → docx; sitasi `[@kunci]` → Vancouver superskrip; `Gambar #.`/`Tabel #.` dinomori seluruh modul; header tabel berulang) lalu `isi_daftar_isi.py` (Word COM: TOC + PDF). Keluaran: `keluaran/Modul_Gawat_Darurat.docx/.pdf`, `keluaran/DOCX per BAB/`, `keluaran/PDF per BAB/`.

## Aturan
- Kode sumber: C = CaKes Ruang Gawat Darurat (isi boleh dipakai, TIDAK BOLEH disitasi/disebut; klaim hanya-C tidak ditulis bila tak ada sumber bersitasi), A = ATLS 9e [atls], E = EIMED PAPDI Buku I [eimed], P = Pocket Guide 2014 [pocket], D = dosis obat emergency (koreksi dulu; bukan pustaka).
- Pustaka penunjang hanya yang diverifikasi teks/abstraknya (catatan di `catatan_aha2025.md`). Jangan cantumkan halaman, nama sumber di naskah, keterangan AI, "--", em dash.
- Algoritme lama (EIMED AHA 2010: vasopresin, EGDT, SIRS; ATLS 9e) tidak ditulis sebagai rekomendasi terkini; perbarui ke AHA 2025 dan pedoman terverifikasi.
- Koreksi CaKes yang wajib diingat: lihat Outline bagian 8.

## Catatan sumber (hemat token)
- `catatan_atls_bab1.md`, `catatan_aha2025.md`, `catatan_eimed.md` (peta bab EIMED → halaman PDF + ringkasan bab II, III, IV, V, XIV, XXIV).

## Verifikasi pustaka penunjang
- aha_bls2025 PMID 41122888, aha_als2025 PMID 41122884, aha_special2025 PMID 41122889: metadata PubMed + rekomendasi dibaca langsung di cpr.heart.org (browser) 29-10-2026.
- Vincent & De Backer 2013 (PMID 24171518) tidak dipakai: abstrak tidak tersedia, teks penuh berbayar.

## Bagian yang belum dapat ditulis (butuh sumber)
- BAB 1: aspek hukum nasional terkini (UU/Permenkes) belum diberikan.
- BAB 2: homeostasis dan respons hormonal stres rinci (Sherwood tidak dilampirkan di paket ini).
- BAB 5: perbedaan henti jantung dengan sinkop (akan diambil dari EIMED XXVII saat BAB 16).
