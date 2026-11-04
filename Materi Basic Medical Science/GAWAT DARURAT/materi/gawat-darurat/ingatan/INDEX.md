# INDEX Modul Gawat Darurat Preklinik

## Status (2026-11-04)
- Selesai, dirakit, dan PDF diperiksa visual: BAB 01-15 (modul gabungan 15 BAB + DOCX/PDF per BAB).
- Belum ditulis: BAB 16-36. Berikutnya BAB 16 (EIMED XXV kesadaran 366, XXVII sinkop 380, XLIX lemah otot 572, XLI nyeri pinggang 510; ATLS Bab 6-7), 17 (ATLS Bab 6; pedoman stroke perlu verifikasi), 18 (EIMED XLVII kejang 556; pedoman meningitis), 19 (mata merah: belum ada sumber bersitasi selain CaKes, perlu buku/pedoman mata).
- Tertunda dari BAB 12-15: rincian terapi SKA terkini (hanya prinsip; algoritme MONA/EIMED lama tidak dipakai), definisi universal infark (abstrak tidak tersedia), eksaserbasi asma/PPOK rinci dan target SpO2 (teks GINA/GOLD tidak terbaca utuh), COVID-19/SARS dan bronkiolitis (belum ada sumber bersitasi), detail pneumonia (EIMED Buku I tidak punya bab pneumonia).
- Belum dapat ditulis di BAB 01-11 (butuh sumber): aspek hukum nasional (BAB 1), homeostasis/respons hormonal stres rinci (BAB 2, Sherwood tidak dilampirkan), henti jantung vs sinkop (BAB 5, tunggu EIMED XXVII di BAB 16), NIV/ventilasi mekanik rinci (BAB 6), lokasi suntik/interval epinefrin IM, antihistamin/steroid, reaksi bifasik anafilaksis (BAB 7, teks WAO tidak terbaca utuh), fosfat (BAB 9), tabel pengenceran obat (BAB 10; berkas dosis tidak berpengarang dan sediaan norepinefrin tidak konsisten, hanya dipakai sebagai latihan hitung di soal).
- Koreksi sumber yang sengaja tidak dipakai: EIMED dobutamin disebut agonis beta-2 (ditulis netral "reseptor beta"); EIMED hipermagnesemia definisi <2,5 (OCR/typo, tidak dipakai); rekomendasi lama EGDT, SIRS, vasopresin.

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
