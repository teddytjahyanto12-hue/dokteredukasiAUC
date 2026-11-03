# INDEX Modul Sistem Saraf (Neurologi Preklinik)

## Status
- Lihat tabel status di `peta_bahasan.md` (kolom Status). Urutan BAB = `build.py` SUSUNAN (40 BAB, 9 BAGIAN).

## Struktur folder (`SARAF/materi/neurologi/`)
- `naskah/BAB_xx_*.md` naskah (H2 = BAB, H3 = 7 subjudul wajib).
- `gambar/` potongan gambar sumber (`potong_gambar.py`, SPEK = sumber, halaman PDF, kotak pt) + ilustrasi.
- `ingatan/` INDEX.md, peta_bahasan.md, sumber.ris.
- `_ekstrak/` teks hasil ekstraksi (C/S/D/J.txt) + `hal.py KODE a b` (baca halaman) + `tata.py KODE hal` (posisi keterangan/gambar untuk memotong). JANGAN dipublikasikan (isi buku berlisensi).
- `build.py` (md -> DOCX, sitasi Vancouver otomatis, nomor Gambar #/Tabel #), `isi_daftar_isi.py` (Word COM: isi TOC + PDF), `gaya_referensi.docx` (salinan BRP-18).
- Keluaran: `keluaran/Modul_Sistem_Saraf.docx/.pdf`, `keluaran/DOCX per BAB/`, `keluaran/PDF per BAB/`.

## Kode sumber (halaman = halaman PDF 1-based)
- C = CaKes Edisi 2 (314 hlm). DILARANG disitasi atau disebut (arahan pengguna). Isi hanya dipakai bila juga terverifikasi di S/D/J/PubMed; sitasi ke sumber yang memverifikasi.
- S = Sherwood Bab 4 (S4-50), 5 (S51-103), 6 (S104-159), 7 (S160-180), 8 (S181-228). Font rusak sebagian; angka meragukan dicek visual.
- D = Duus edisi 4 (531 hlm). Bab buku -> PDF: 1:15, 2:31, 3:69, 4:129, 5:253, 6:273, 7:325, 8:343, 9:363, 10:415, 11:431.
- J = DeJong edisi 7 (830 hlm). Section B:17, C:59, D:135 (kranial; I 149, II 155, okulomotor 191, V 239, VII 259, VIII 283, IX-X 315, XI 329, XII 339, batang otak 347), E:369 (motorik; unit motor 377, medula 387, piramidal 401, ekstrapiramidal 411, kekuatan 423, tonus 479, gerak abnormal 497), F:525 (sensorik; lokalisasi 557), G:571 (refleks; patologis 595), H:623 (serebelum, gait 645), I:657 (otonom; saraf perifer 675), J:701, K:729 (vaskular; CSS 749), L:757 (koma), M:781 (diagnosis).

## Aturan
- Hanya isi yang tertulis di sumber + PubMed yang abstraknya dibaca. Tanpa nomor halaman, tanpa nama sumber di naskah, tanpa "--"/em dash, tanpa keterangan AI, tanpa prakata.
- Sitasi `[@kunci]` (kunci = ID sumber.ris). Tabel `**Tabel #. Judul**[@k]`. Gambar `![Gambar #. ...[@k]](gambar/x.png){width=..cm}`.
- Soal aplikasi hanya menguji isi yang ada di naskah (tidak ekstrapolasi klinis tanpa sumber).
- Alur kerja per BAB: hal.py baca -> tata.py posisi -> SPEK potong_gambar.py -> cek visual (lembar kontak di scratchpad) -> tulis naskah -> build.py -> isi_daftar_isi.py -> cek visual PDF.

## Koreksi sumber (jangan dipakai)
- C: istilah terjemahan rusak ("Orang Somalia"=somit, "penyitaan"=kejang, "pemupukan"=fertilisasi). Klaim C hanya dipakai bila terverifikasi.
- S52: kalimat "Neuron eferen juga terutama berada di SST" kontradiktif; tidak dipakai.

## Sumber penunjang terverifikasi (PubMed)
- woolf2011 (sensitisasi sentral: definisi, alodinia, hiperalgesia sekunder, sumasi temporal, sindrom klinis) PMID 20961685, abstrak dibaca 2026-11-03.
- Semua dibaca abstraknya lewat PubMed 2026-11-03; hanya isi abstrak yang dipakai. Rincian DOI di sumber.ris.
  - BAB 26: easton2009 (TIA berbasis jaringan, PMID 19423857), berge2021 (IVT alteplase 4,5 jam, PMID 33817340).
  - BAB 29: fisher2014 (definisi praktis epilepsi, 24730690), fisher2017 (klasifikasi 2017, 28276060), beniczky2025 (klasifikasi 2025, 40264351), trinka2015 (status epileptikus t1/t2, 26336950), sills2020 (mekanisme obat antikejang, 32120063).
  - BAB 30: vandoorn2023 (pedoman EAN/PNS SGB, 37814551), shahrizaila2021 (SGB, mimikri molekular, 33647239).
  - BAB 31: feldman2022 (ALS, 36116464), gonzalez2006 (pascapolio IVIg, 16713921), thompson2007 (eradikasi polio, 17448822).
  - BAB 32: thompson2018 (McDonald 2017, 29275977), montalban2025 (McDonald 2024, 40975101), wingerchuk2015 (NMOSD, 26092914), banwell2023 (MOGAD, 36706773).
  - BAB 33: gilhus2019 (MG, 31048702), narayanaswami2021 (konsensus MG 2020, 33144515).
  - BAB 34: bloem2021 (PP, 33848468), postuma2015 (kriteria MDS, 26474316), bates2015 (Huntington, 27188817), bhatia2018 (klasifikasi tremor, 29193359).
  - BAB 35: jack2024 (kriteria biologis PA, 38934362), mckeith2017 (DBL, 28592453), mckee2016 (ETK, 26667418).
  - BAB 36: louis2021 (WHO CNS5, 34185076).
  - BAB 38: ashina2021 (migren, 33773612), edvinsson2018 (CGRP, 29691490), fraser2019 (aura, depresi korteks menyebar, 31847045).
- Dicek tetapi TIDAK dipakai: kandel2001 (11691980, tanpa klaim spesifik), powers2019 AHA (31662037, abstrak tanpa angka), ESCMID meningitis (27062097) dan ICHD-3 (29368949) tanpa abstrak, Ashina NEJM 2020 (33211930) tanpa abstrak.

## Bagian yang tidak ditulis (butuh sumber yang belum diberikan)
- Rinciannya per BAB ada di kolom Status `peta_bahasan.md`. Ringkasan: Nernst/Goldman; unit neurovaskular; teori gerbang/wind-up; prinsip CT/MRI/EEG/EMG rinci; efek samping spesifik obat antikejang; varian SGB; tropisme poliovirus; jenis leukodistrofi; mekanisme antibodi LEMS; antisipasi Huntington dan farmakologi antiparkinson rinci; kriteria demensia vaskular dan antiamiloid; glioblastoma dan penanda molekuler; neurosistiserkosis, toksoplasmosis, regimen antimikroba; kriteria ICHD-3; mata merah, uveitis, hordeolum, otitis, tata laksana THT-mata; dosis dan farmakokinetik obat.
