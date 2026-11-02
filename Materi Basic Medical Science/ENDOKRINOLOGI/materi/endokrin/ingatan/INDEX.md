# Modul Endokrin Preklinik: status kerja

Status 31 Okt 2026: SEMUA 32 BAB ditulis dan dirakit (build.py -> keluaran/DOCX per BAB, isi_daftar_isi.py -> PDF). Gambar dipotong ulang dengan potong_gambar.py.
ATURAN BARU PENGGUNA (31 Okt): Catatan Siswa/CaKes (catatansiswa.com) TIDAK BOLEH disebut atau masuk pustaka/sitasi.
CaKes hanya daftar periksa cakupan. Semua klaim harus bersumber Sherwood [@sherwood], jurnal terverifikasi, atau
OpenStax [@openstax] (khusus gambar OpenStax yang tersemat di PDF bahan; keterangan aslinya menyebut OpenStax CC BY).


## Struktur
- build.py, isi_daftar_isi.py, gaya_referensi.docx: disalin dari pola BRP-18 (belum disesuaikan: JUDUL, SUBJUDUL, SUSUNAN, nama berkas keluaran).
- naskah/ (kosong), gambar/ (kosong), keluaran/ (kosong), ingatan/.
- Urutan BAB mengikuti `../../MATERI MENTAH/Outline_Endokrin_Preklinik.md` (32 BAB).

## Ekstraksi sumber (scratchpad sesi, bisa diulang)
- Teks: PyMuPDF get_text per halaman; CaKes 143 hlm, Sherwood 86 hlm. PDF tidak disalin.
- Gambar CaKes: gambar tersemat besar per halaman (xref), mis. 4:728 kelas hormon, 15:742 hipotalamus, 19:746 hipofisis, 20:748 neurohipofisis, 30:757 oksitosin, 37:767 sintesis TH, 44:772 adrenal, 51:783 pankreas, 63:810 vit D, 69:816 aldosteron, 79:824-825 stres, 96:842 Hashimoto, 99:844 Graves, 120:862 CAH, 130:871 DKA. Sherwood: gambar dipotong per wilayah halaman (200 dpi).
- Sudah dibaca: CaKes 1-143; Sherwood hlm 1-31 (Bab 18 penuh). Lanjut Sherwood hlm 35-86 (Bab 19). Teks Sherwood terbungkus di scratchpad sh_w.txt (baris ##H<n> = halaman).

## Koreksi CaKes yang wajib diterapkan
Lihat bagian "Koreksi awal" di Outline (hipoglikemia <6,0 mmol/L salah; aturan 7-11 tidak lengkap; HONC -> HHS; Somogyi vs dawn; aldosteron "semua/tidak ada Na" terlalu absolut; rakhitis tidak hiperkalsemia; MEN bukan "PRIA", MEN2 = proto-onkogen RET; "Gondok" pada hipogonadisme = parotitis/mumps; judul Waterhouse-Friderichsen).

## Sumber penunjang TERVERIFIKASI (abstrak PubMed, 29 Okt 2026)
- Tomkins 2022 PMID 35771962: DI sentral = hilang/gangguan neuron vasopresinergik -> AVP kurang -> tidak mampu memekatkan urine, poliuria hipotonik + haus kompensasi; penyebab neoplastik, trauma, autoimun; assay copeptin.
- Bornstein 2016 PMID 26760044: uji kortikotropin singkat 250 ug standar emas; skrining ACTH+kortisol pagi; autoantibodi 21-hidroksilase; edukasi dosis stres.
- Lenders 2014 PMID 24893135: tes awal metanefrin plasma bebas/urine terfraksinasi; pertimbangkan uji genetik semua pasien; blokade praoperasi.
- Nieman 2008 PMID 18334580: singkirkan glukokortikoid eksogen; tes awal kortisol urine, kortisol saliva larut malam, supresi deksametason 1 mg/2 mg 48 jam.
- Funder 2016 PMID 26934393: deteksi PA dengan rasio aldosteron-renin pada hipertensi risiko tinggi/hipokalemia, tes konfirmasi, CT adrenal, AVS, adrenalektomi unilateral, antagonis MR untuk bilateral.
- Thakker 2012 PMID 22723327: MEN1 dominan autosomal, gen penekan tumor MEN1 (menin), kerabat derajat 1 risiko 50%, tumor paratiroid, pulau pankreas, hipofisis anterior.
- Jonklaas 2014 PMID 25266247: levotiroksin tetap standar terapi hipotiroidisme.
- Umpierrez 2024 PMID 39052901: istilah DKA dan hyperglycemic hyperosmolar state (HHS).
- Duong 2023 PMID 36760402: HbA1c >=6,5%, GDP >=126 mg/dL, TTGO >=200 mg/dL sebagai uji diagnosis DM.
- Abstrak TANPA isi spesifik (jangan dipakai untuk klaim isi): Katznelson 2014, Speiser 2018, Bilezikian 2022, Ross 2016, Wells 2015, Petersen 2018 (abstrak kosong), ADA 2026 Sec.2 (teks lengkap diblokir penerbit).
- BELUM terverifikasi: tingkat hipoglikemia ADA (level 1-3); kriteria GDS+gejala dan konfirmasi dua hasil; RET pada MEN2 (cari abstrak lain).

## Alat
- scratchpad pm.py: `python -I pm.py search "q" n` dan `pm.py abs id,id` (abstrak ringkas via eutils; set PYTHONIOENCODING=utf-8).

## Bahasan tertunda / tidak ditulis (sumber belum ada atau tidak terverifikasi)
- Tingkat hipoglikemia ADA level 1-3 dan ambang angka hipoglikemia (teks lengkap ADA diblokir; abstrak tanpa angka).
- Kriteria glukosa sewaktu + gejala dan syarat konfirmasi dua hasil (ADA/PNPK tidak dapat diverifikasi via PubMed/PMC).
- Somogyi vs fenomena fajar; jalur poliol/AGE secara spesifik (Brownlee hanya menyebut 4 mekanisme + superoksida).
- DI nefrogenik, uji deprivasi air; hiperparatiroidisme sekunder/tersier (CKD); FGF23, magnesium.
- Embriologi rinci (kantong Rathke, migrasi tiroid), vaskularisasi organ; histologi sel paratiroid (chief/oksifil).
- Hipopituitarisme, prolaktinoma/hiperprolaktinemia, akromegali (diagnosis IGF-1), siklus ovarium rinci, insufisiensi ovarium.
- Kriteria biokimia KAD/HHS (Umpierrez hanya abstrak umum).
