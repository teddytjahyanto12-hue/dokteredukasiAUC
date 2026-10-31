# INDEX Modul Anatomi Preklinik

## Status (2026-10-31)
- Modul Tulang dan Sendi SELESAI: T01-T10 ditulis, gambar dipotong dan dicek visual, dirakit `python build.py tulang` + `python isi_daftar_isi.py Modul_Anatomi_Tulang_dan_Sendi` → keluaran/Modul_Anatomi_Tulang_dan_Sendi/ (DOCX+PDF gabungan 96 hlm, TOC terisi; DOCX/PDF per BAB). Lembar kontak seluruh halaman dicek visual.
- Berikutnya: modul Otot (O01-O06, Bab 13), lalu Saraf (S01-S09, Bab 1/14-17), lalu Pembuluh darah (P01-P08, Bab 1/4-10). Susunan di `build.py` MODUL.
- Catatan Bab 13: tabel otot (Tabel 13-1 s.d. 13-24: origo, insersi, persarafan, kerja) TIDAK ter-OCR (halaman tabel kosong di _ekstrak/B13.txt). Harus dibaca dari gambar halaman (render lalu baca visual) sebelum ditulis.

## Arahan pengguna
- Pisah empat modul: Tulang (dan sendi), Otot, Saraf, Pembuluh darah. Bahas lengkap. PDF per BAB untuk diunduh. Outline_Anatomi_Preklinik.md (pengguna, regional 32 BAB) dipakai sebagai inspirasi cakupan; susunan tetap per sistem sesuai arahan.
- Aturan: tujuan, konsep dasar, gambar, sebab-akibat (→), korelasi klinis, rangkuman, soal + kunci; sitasi Vancouver [@kunci]; tanpa nama sumber/halaman di naskah (keterangan gambar tanpa "Sumber: ..."), tanpa "--"/em dash, tanpa keterangan AI; CaKes/catatansiswa tidak disebut.
- Outline pengguna meminta caption memuat nama buku dan halaman; ini BERTENTANGAN dengan aturan prompt utama (tanpa nama sumber dan halaman di naskah) sehingga caption hanya memakai superskrip sitasi.

## Alat
- `ekstrak_teks.py` → _ekstrak/B01..B24.txt, S1.txt, S2.txt. `hlm.py KODE a b` cetak halaman.
- `blok.py KODE hlm...` koordinat blok teks (pt) untuk menentukan kotak potong.
- `potong_gambar.py [awalan]` SPEK nama → (kode, hlm, kotak[, kotak diputihkan]); paragraf buku (>80 karakter) dalam kotak otomatis diputihkan; hasil dipangkas.
- `cek_angka.py KODE "frasa"...` render blok teks untuk mencocokkan angka OCR dengan gambar halaman (_lihat/angka.png).
- `lembar.py berkas.pdf awal jumlah kolom` lembar kontak PDF (_lihat/lembar.png).

## Verifikasi
- Angka yang dicocokkan ke gambar halaman: fonticulus 18 bulan, antrum 3 mm/15 mm, angulus sterni T IV-V, sumsum 7 tahun, pterion 4 cm, mastoid 2 tahun, coccyx 2,5 cm, hiatus sacralis 5 cm, tuberculum Chassaignac C6 (OCR salah "C5"), carrying angle 170°/167°, ROM bahu (90/45/40-45/55/45), rasio abduksi 3:2:1.
- Tabel 11-2 buku menulis "Fissura occipitalis superior" (salah terjemah); naskah memakai "fissura orbitalis superior" sesuai label Gambar 11-3.
- Pustaka penunjang (PubMed, metadata+abstrak dibaca): nih_osteoporosis2001 PMID 11176917; shao2005 PMID 16326879.
- Terjemahan Snell ini hampir tanpa kotak "catatan klinis"; korelasi klinis diambil dari teks, anatomi permukaan, dan soal-jawaban buku, plus pustaka PubMed terverifikasi.

## Belum dapat ditulis / di luar cakupan
- Bab organ (2, 3, 18-24) tidak masuk empat modul yang diminta; bisa menjadi modul kelima bila pengguna meminta.
