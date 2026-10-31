# INDEX Modul Imunologi (folder imunologi/materi/imunologi)

## Status (2026-10-31)
- 30 BAB selesai ditulis di `naskah/` (struktur 7 subjudul wajib), lolos `cek_naskah.py` (tanpa --/em dash, tanpa nama sumber/CaKes/AI di naskah, semua bagian wajib bersitasi, gambar lengkap).
- Keluaran: `keluaran/Modul_Imunologi.docx/.pdf`, `keluaran/DOCX per BAB/`, `keluaran/PDF per BAB/` (dibuat `build.py` lalu `isi_daftar_isi.py`).

## Struktur folder
- `naskah/BAB_xx_*.md`, `gambar/` (potongan buku + 2 ilustrasi sendiri), `ingatan/` (INDEX, peta_bahasan, sumber.ris, indeks_gambar_abbas.json).
- Skrip: `build.py` (md → docx, Vancouver otomatis), `isi_daftar_isi.py` (Word COM: TOC + PDF), `potong_gambar.py` + `spek_gambar.py` (potong gambar dari PDF sumber), `montase.py`, `grid.py`/`gridr.py` (kalibrasi koordinat), `ilustrasi.py`, `cek_naskah.py`.

## Aturan khusus (arahan pengguna 2026-10-30)
- JANGAN mencantumkan CaKes / Catatan Siswa (catatansiswa.com) sama sekali: tidak di sumber.ris, sitasi, daftar pustaka, naskah, atau gambar. CaKes hanya daftar cakupan.
- Tanpa nomor halaman, tanpa nama sumber di naskah, tanpa "--"/em dash, tanpa keterangan AI, tanpa prakata.

## Gambar
- Mode spek: ("A", "FIGURE x.y") potong otomatis Abbas; ("AC", hal, kotak) clip absolut Abbas; ("S", hal, kotak) Sherwood (koordinat render penuh, cek dengan grid.py).
- Gagal otomatis dan dilewati: Abbas 17.4, 17.7, 19.1, 21.3.

## Sumber penunjang (diverifikasi PubMed 2026-10-31, abstrak)
- netea2020 PMID 32132681 (imunitas terlatih); pollard2021 PMID 33353987 (imunisasi pilar kesehatan masyarakat, hemat biaya); ander2019 PMID 30635356 (desidua-plasenta: toleransi + imunitas bawaan; beda manusia-tikus); cardona2020 PMID 33204386 (WAO 2020: epinefrin IM lini pertama; rujuk spesialis).

## Catatan verifikasi
- Abbas PDF 277-300 duplikat Bab 12; Bab 13 tidak ada. Komplemen/efektor antibodi dari Bab 4, 5, 12, 19, Lampiran Abbas dan Sherwood.
- Teks Sherwood hasil ekstraksi sebagian rusak (judul huruf kapital, angka di kotak olahraga); angka yang rusak tidak dipakai.

## Bagian outline yang belum ditulis (butuh sumber yang belum diberikan/diverifikasi)
- Tiroiditis Hashimoto (tidak ada di Abbas 9e maupun Sherwood).
- Kriteria Jones dan pencegahan demam rematik (perlu pedoman WHO 2024/AHA yang diverifikasi).
- Kriteria klasifikasi SLE/RA, anti-Sm, ANA positif tanpa penyakit (perlu pedoman ACR/EULAR).
- Platform vaksin baru (mRNA, vektor modern) dan jadwal imunisasi Indonesia (perlu teks penuh Pollard 2021 / pedoman nasional).
- Prinsip uji tusuk kulit, IgE spesifik, dan triptase serum untuk diagnosis alergi (perlu pedoman WAO/EAACI teks penuh).
- Konsep imunoediting (eliminasi-keseimbangan-lolos) hanya ada di daftar bacaan Abbas.
- Pemeriksaan HIV (serologi, viral load) dan pedoman ART nasional.
- Psikoneuroimunologi stres kronik (Glaser 2005 belum terverifikasi aksesnya).
