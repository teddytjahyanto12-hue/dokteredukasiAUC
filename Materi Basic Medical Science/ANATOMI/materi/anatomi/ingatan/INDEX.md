# INDEX Modul Anatomi Preklinik

## Status (2026-11-02)
- Lima modul SELESAI, dirakit, TOC terisi, PDF per BAB, lembar kontak dicek visual:
  - Tulang dan Sendi T01-T10 (96 hlm, commit 0c8f95b).
  - Otot O01-O06 (65 hlm, commit 87f912f).
  - Saraf S01-S08 (63 hlm, commit c6b52a3). Rencana S09 digabung ke S07-S08.
  - Pembuluh Darah P01-P08 (Bab 1, 4-10).
  - Organ V01-V11 (Bab 2, 3, 4 non-koroner, 18-24); diminta pengguna sebagai modul kelima.
- Perakitan: `python build.py tulang|otot|saraf|pembuluh|organ` lalu `python isi_daftar_isi.py <Nama_Modul>` (Word COM, >2 menit, jalankan di latar belakang). Keluaran di `keluaran/<Nama_Modul>/`.
- Modul organ tidak mengulang isi yang sudah ada di modul lain: diaphragma dan otot dinding (Otot), pendarahan koroner (Pembuluh), limfe regional (P08).
- `teks.py KODE a b` membaca teks isi halaman tanpa label gambar; `lembar_gambar.py awalan` lembar kontak hasil potong.

## Arahan pengguna
- Pisah empat modul: Tulang (dan sendi), Otot, Saraf, Pembuluh darah. Bahas lengkap. PDF per BAB untuk diunduh, tidak diunggah ke cloud. Outline_Anatomi_Preklinik.md (pengguna, regional 32 BAB) dipakai sebagai inspirasi cakupan; susunan tetap per sistem sesuai arahan.
- Aturan: tujuan, konsep dasar, gambar, sebab-akibat (→), korelasi klinis, rangkuman, soal + kunci; sitasi Vancouver [@kunci]; tanpa nama sumber/halaman di naskah (keterangan gambar tanpa "Sumber: ..."), tanpa "--"/em dash, tanpa keterangan AI. Hanya sumber yang tercantum di sumber.ris yang boleh disebut.
- Outline pengguna meminta caption memuat nama buku dan halaman; ini BERTENTANGAN dengan aturan prompt utama sehingga caption hanya memakai superskrip sitasi.

## Alat
- `ekstrak_teks.py` → _ekstrak/B01..B24.txt, S1.txt, S2.txt. `hlm.py KODE a b` cetak halaman.
- `blok.py KODE hlm...` koordinat blok teks (pt) untuk menentukan kotak potong.
- `potong_gambar.py [awalan]` SPEK nama → (kode, hlm, kotak[, kotak diputihkan]); paragraf buku (>80 karakter) dalam kotak otomatis diputihkan; hasil dipangkas.
- `cek_angka.py KODE "frasa"...` render blok teks untuk mencocokkan angka OCR dengan gambar halaman (_lihat/angka.png).
- `lembar.py berkas.pdf awal jumlah kolom` lembar kontak PDF (_lihat/lembar.png).
- Halaman dua kolom yang tercampur saat ekstraksi (mis. B10 hlm 10) dibaca dari render gambar halaman.

## Verifikasi
- Angka yang dicocokkan ke gambar halaman: fonticulus 18 bulan, antrum 3 mm/15 mm, angulus sterni T IV-V, sumsum 7 tahun, pterion 4 cm, mastoid 2 tahun, coccyx 2,5 cm, hiatus sacralis 5 cm, tuberculum Chassaignac C6 (OCR salah "C5"), carrying angle 170°/167°, ROM bahu (90/45/40-45/55/45), rasio abduksi 3:2:1, vena saphena magna 4 cm di bawah-lateral tuberculum pubicum, costa IX-XI di belakang lien.
- Kesalahan buku yang dikoreksi: Tabel 11-2 "fissura occipitalis superior" → orbitalis; Tabel 13-14 "flexor carpi radialis longus" → extensor; Tabel 13-20 "adductor longus (bagian hamstring)" → adductor magnus; Tabel 13-23 tibialis posterior "L4, S5" tidak dipakai; usia fusi sacrum tidak konsisten (18 vs 13 tahun) → hanya "mulai sekitar 18 tahun".
- Pustaka penunjang (PubMed, metadata+abstrak dibaca): nih_osteoporosis2001 PMID 11176917; shao2005 PMID 16326879.
- Terjemahan Snell ini hampir tanpa kotak "catatan klinis"; korelasi klinis diambil dari teks, anatomi permukaan, dan soal-jawaban buku, plus pustaka PubMed terverifikasi.

## Halaman sumber yang tidak ada di PDF (bagian terkait tidak ditulis)
- Bab 7 hlm buku 194 (perjalanan arteria ulnaris).
- Bab 9 hlm buku 237-238 (cabang arteria femoralis rinci, termasuk profunda femoris; hanya daftar cabang yang ditulis).
- Bab 13 Tabel 13-3 (otot leher).
- Bab 15 teks teknik blok nervus trigeminus dan Bab 17 teknik blok nervus spinalis (hanya judul).
- Bab 3: kalimat lanjutan mekanisme diaphragma setelah hepar menjadi penyangga tidak ada (halaman terpotong); tidak ditulis.
- Bab 19: anulus inguinalis profundus "0.5 inci (3 cm)" tidak konsisten, angka tidak dipakai; ligamentum lacunare disebut lantai canalis inguinalis di teks tetapi kunci jawaban menyatakan bukan, jadi tidak ditulis.
- Tabel otot Bab 2 (lidah, palatum, pharynx, larynx), Tabel 18-1 (otot mata), dan tabel otot ossicula tidak ter-OCR; isi ditulis dari teks naratif saja.
- Gambar dibuang karena rusak oleh pemutihan teks atau dobel: kelenjar liur (B02), potongan sagital pelvis laki-laki (B21), testis (B22, sama dengan v05_testis), suprarenalis (B24, sama dengan v07_pancreas_posterior).
