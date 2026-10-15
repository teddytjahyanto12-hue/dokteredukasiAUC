# Catatan Verifikasi Sumber: Kalkulator Dosis Obat Anak (berkas kerja internal)

> Berkas kerja penyusun. Berisi pencocokan dosis IDAI dengan sumber pendukung, temuan, dan indeks buku IDAI (salinan draf 0.3). **Bukan materi yang ditampilkan di website**; materi bersih ada di Rancangan_Kalkulator_Dosis_Obat_Anak.md (draf 0.4).

- Versi: draf 0.3, 13 Oktober 2026 (draf 0.2 ditambah verifikasi artikel yang diunggah pemilik)
- Status: **belum diimplementasikan di website.** Dokumen ini hanya berisi kerangka tampilan dan isi materi untuk ditinjau.
- Penyusun: Claude Code (PC 2).
- Cakupan: kerangka fitur, aturan perhitungan, kebijakan sumber, dan **8 monografi contoh (pilot)**: parasetamol, ibuprofen, amoksisilin, seftriakson, gentamisin, ondansetron, deksametason, asiklovir.

### Perubahan dari draf 0.1 (arahan pemilik, 13 Oktober 2026)

1. **Dosis hanya dari IDAI atau FORNAS.** Rute atau sediaan yang tidak punya dosis di kedua sumber itu **dikeluarkan**. Setiap baris dosis diberi label asal: **IDAI** atau **FORNAS**. Daftar yang dikeluarkan ada di Lampiran C.
2. **Dosis rentang tetap ditampilkan sebagai rentang** (batas bawah sampai batas atas). Dokter yang memilih angka.
3. **Parasetamol rektal "maks 5 g/hari"** disalin apa adanya. Pemilik mengonfirmasi bahwa ini batas per hari untuk rute rektal.
4. **Tabel penyesuaian ginjal asiklovir** sudah dicek ulang pada gambar halaman buku dan pada label resmi. Hasilnya di bagian 5.
5. **Setiap dosis IDAI dicocokkan dengan sumber pendukung** (label resmi FDA, WHO Model Formulary for Children 2010, WHO Pocket Book 2013, jurnal di PubMed). Hasil pencocokan ada di bagian "Pendukung" tiap obat dan di Lampiran B.
6. Sumber yang **tidak bisa saya akses** (situs penerbit menolak akses otomatis) saya daftarkan di **Lampiran D** beserta link, untuk diunduh pemilik.
7. **Draf 0.3:** delapan berkas yang diunggah pemilik ke folder `dosis obat/Sumber jurnal luar/` sudah dibaca teks lengkapnya dan dipakai untuk verifikasi: AAP 2013 (otitis media akut), IDSA 2011 (pneumonia anak), AHA 2021 (profilaksis endokarditis), IDSA 2004 (meningitis bakterial), Daschner 2005 (dosis pada gangguan ginjal), Freedman 2006 (ondansetron oral), dan pedoman NIH infeksi oportunistik anak dengan HIV (bagian HSV dan VZV; dua berkas pedoman yang diunggah isinya identik). Status pendukung tiap dosis diperbarui.

---

## 1. Kerangka fitur

### 1.1 Navigasi

- Tombol baru **"Dosis Obat"** di header, di sebelah "Kalkulator Medis".
- Isi halaman Dosis Obat berupa tiga pilihan:
  1. **Kalkulator Dosis Obat Anak**: dibangun pertama (isi draf ini).
  2. **Kalkulator Dosis Obat Dewasa**: ditandai "Segera hadir".
  3. **Kalkulator Dosis Obat Kegawatdaruratan**: ditandai "Segera hadir".
- Perubahan header dikoordinasikan dengan Codex (desain situs), sesuai catatan di PROJECT_MEMORY.md.

### 1.2 Halaman daftar obat anak

- Kolom pencarian nama generik.
- Daftar abjad, dengan label rute yang tersedia pada tiap obat (misalnya **Oral · Injeksi**).
- Filter kelas terapi mengikuti pengelompokan FORNAS 2025.

### 1.3 Halaman satu obat

Urutan dari atas ke bawah:

1. **Kotak berat badan (kg)**: satu kali isi, dipakai oleh semua rute di halaman itu.
   - Usia atau umur kehamilan diminta hanya bila regimen sumber membedakan berdasarkan usia, misalnya tabel neonatus gentamisin.
2. **Pilihan rute** dalam satu halaman, berupa tab: **Oral | Injeksi | Topikal | Rektal**.
   - **Hanya rute yang punya dosis di IDAI atau FORNAS yang ditampilkan.**
3. **Kartu hasil per regimen**. Setiap indikasi atau keadaan dari sumber menjadi satu kartu berisi:
   - nama indikasi atau keadaan, persis seperti di sumber;
   - **dosis per kali** dan **dosis per hari**, selalu keduanya dan berlabel tegas;
   - bila sumber memberi rentang, hasil juga berupa **rentang**; dokter yang memilih;
   - interval dan lama pemberian bila tercantum;
   - batas maksimal bila tercantum. Bila hasil hitung melebihi batas, yang ditampilkan adalah angka batas, disertai keterangan "dibatasi sesuai dosis maksimal sumber";
   - konversi ke **mL** untuk sediaan cair dan injeksi berkekuatan mg/mL (rentang mg menjadi rentang mL);
   - label asal dosis (**IDAI** atau **FORNAS**) dan halaman sumber.
4. Bagian berikut, dalam bentuk daftar yang bisa dibuka-tutup:
   - **Sediaan**: dari FORNAS 2025, hanya untuk rute yang punya dosis.
   - **Aturan penggunaan**.
   - **Manfaat obat**.
   - **Efek samping**.
   - **Peringatan penting** (usulan tambahan; aplikasi acuan juga menampilkan kontraindikasi).
   - **Farmakokinetik**.
   - **Farmakodinamik**.
   - **Daftar pustaka**, lengkap dengan tautan.
5. Penafian tetap di bawah halaman: *"Alat bantu hitung untuk tenaga kesehatan. Keputusan dosis tetap berdasarkan penilaian klinis, kondisi pasien, dan sumber terbaru."*

### 1.4 Acuan dari aplikasi "Dosis Obat Anak" (Play Store, com.dosisobatanak)

Hal yang diambil sebagai konsep, bukan disalin:

- dosis dihitung dari berat badan;
- satu basis data mencakup obat oral, injeksi, dan topikal;
- dosis dibatasi pada dosis maksimal anak;
- informasi sediaan dan indikasi ditampilkan.

Masukan pengguna aplikasi tersebut di halaman Play Store menyebut kekeliruan **"per kali" vs "per hari"**. Karena itu, setiap regimen menyimpan jenis dosisnya dengan tegas (lihat 2.1), dan kartu hasil selalu menampilkan kedua angka.

---

## 2. Aturan perhitungan

### 2.1 Jenis dosis yang disimpan per regimen

| Jenis | Contoh tulisan di sumber | Cara hitung |
|---|---|---|
| mg/kg **per kali** | "15 mg/kg/kali, tiap 4 jam" | per kali = dosis × BB; per hari = per kali × (24 ÷ interval) |
| mg/kg **per hari dibagi n dosis** | "40–45 mg dalam 3 dosis" (kolom "Dosis per kg per hari") | per hari = dosis × BB; per kali = per hari ÷ n |
| mg/kg **sekali sehari** | "50–75 mg sehari sekali" | per kali = per hari = dosis × BB |
| **Dosis awal lalu lanjutan** | "20 mg/kg, kemudian 15 mg/kg/kali" | dua baris hasil: dosis pertama dan dosis berikutnya |
| **Tabel neonatus** | dosis dan interval menurut umur kehamilan dan umur pascanatal | memilih baris tabel dari input umur, lalu dosis × BB |
| **mg/m²** | "500 mg/m², 8 jam" | memerlukan luas permukaan tubuh; lihat 2.4 |

Bila interval berupa rentang (misalnya tiap 4–8 jam), dosis per hari juga ditampilkan sebagai rentang.

### 2.2 Batas maksimal

- Batas maksimal per kali dan per hari diterapkan hanya bila tertulis di sumber.
- Bila tidak tertulis, kartu menampilkan "Dosis maksimal tidak tercantum di sumber". Kalkulator tidak mengarang batas.

### 2.3 Konversi ke mL

- mL = mg ÷ kekuatan sediaan (mg/mL).
  - Sirup 120 mg/5 mL = 24 mg/mL.
  - Drops 100 mg/mL.
  - Injeksi 40 mg/mL.
- Serbuk injeksi tidak dikonversi ke mL karena volume pelarut mengikuti petunjuk produk, misalnya seftriakson 1.000 mg dan asiklovir 250 mg. Kartu hanya menampilkan mg.
- Untuk tablet, kalkulator menampilkan "setara ... tablet" sebagai informasi saja.

### 2.4 Keputusan pemilik dan hal yang masih perlu diputuskan

1. **Rentang dosis: SUDAH DIPUTUSKAN.** Hasil ditampilkan sebagai rentang; dokter yang memilih.
2. **Pembulatan (belum diputuskan).** Usulan: mg ditampilkan 1 desimal dan mL 1 desimal, tanpa membulatkan ke pecahan tablet. Sumber tidak mengatur pembulatan.
3. **Regimen mg/m² (belum diputuskan).** Usulan: versi pertama tidak menghitung luas permukaan tubuh; regimen mg/m² hanya ditampilkan sebagai teks.

---

## 3. Kebijakan sumber

1. **Dosis: hanya IDAI atau FORNAS.**
   - IDAI: *Buku Saku Dosis Obat Pediatri IDAI 2016*, sumber milik pemilik. Halaman ditulis sebagai **nomor cetak di buku** (contoh: "IDAI hlm. 35" = halaman ke-36 berkas PDF).
   - FORNAS: *Formularium Nasional 2025* (KMK HK.01.07/MENKES/1199/2025). Pada 8 obat pilot, FORNAS tidak memuat dosis per kg; FORNAS hanya memuat sediaan, restriksi, dan **peresepan maksimal** (jumlah obat per resep). Peresepan maksimal ditampilkan dengan label "FORNAS, peresepan maksimal", bukan sebagai dosis anak.
   - Rute atau sediaan tanpa dosis di IDAI maupun FORNAS **tidak dimasukkan** (Lampiran C).
2. **Sediaan**: dari FORNAS 2025, hanya untuk rute yang punya dosis.
3. **Manfaat, efek samping, peringatan, farmakokinetik, farmakodinamik**: dari label resmi obat yang disetujui FDA, dibaca di DailyMed (U.S. National Library of Medicine, NIH).
   - Isi label diterjemahkan apa adanya, tanpa tambahan.
   - Indikasi pada label adalah indikasi yang disetujui di Amerika Serikat, sehingga dapat berbeda dari registrasi BPOM.
4. **Pendukung dosis** (untuk verifikasi, bukan pengganti dosis IDAI):
   - label resmi FDA (DailyMed);
   - WHO Model Formulary for Children 2010 (disingkat **WHO-MFC**);
   - WHO Pocket Book of Hospital Care for Children, edisi 2, 2013 (disingkat **WHO-PB**);
   - jurnal dan guideline di PubMed.
   - Status pencocokan: **Sejalan** (angka sama), **Sebagian sejalan** (sebagian angka sama atau interval berbeda), **Berbeda**, atau **Belum terverifikasi** (sumber belum bisa diakses; link di Lampiran D).
5. Bila suatu informasi tidak ada di sumber yang dipakai, tulisannya **"Tidak tercantum pada sumber yang dipakai"**.
6. Situs yang menolak akses otomatis (NCBI Bookshelf/StatPearls, clinicalinfo.hiv.gov, situs penerbit AHA) tidak dibuka paksa. Situs PIONAS BPOM sebelumnya tidak dapat diakses (HTTP 503).

---

## 4. Monografi pilot

> Contoh hitung memakai **BB 10 kg** agar mudah dicek. Angka hanya hasil aritmetika dari dosis sumber. Kolom "Asal" menunjukkan asal dosis.

### 4.1 Parasetamol (Acetaminofen)

**Kalkulator BB**

| Rute | Regimen | Asal | Contoh BB 10 kg |
|---|---|---|---|
| Oral | 20 mg/kg (dosis pertama), kemudian 15 mg/kg/kali tiap 4 jam; maks 90 mg/kg/hari | IDAI hlm. 35 | Dosis pertama 200 mg; berikutnya 150 mg/kali tiap 4 jam; maks 900 mg/hari |
| Rektal | 40 mg/kg (dosis pertama), kemudian 30 mg/kg/kali tiap 6 jam; maks 5 g/hari | IDAI hlm. 35 | Dosis pertama 400 mg; berikutnya 300 mg/kali tiap 6 jam |

Konversi mL untuk contoh oral 10 kg:

- Sirup 120 mg/5 mL: 200 mg = 8,3 mL; 150 mg = 6,3 mL.
- Drops 100 mg/mL: 200 mg = 2,0 mL; 150 mg = 1,5 mL.
- Sediaan rektal (supositoria) tidak tercantum di FORNAS 2025, sehingga tidak ada konversi.

Penyesuaian pada gangguan ginjal (IDAI hlm. 76; dosis normal 10–15 mg/kg/dosis tiap 4–6 jam po), dengan mengubah interval:

- LFG >50: tiap 4 jam. LFG 10–50: tiap 6 jam. LFG <10: tiap 8 jam.
- Hemodialisis dan dialisis peritoneal: "tak ada".

**Pendukung**

- 15 mg/kg/kali tiap 4 jam dan maks 90 mg/kg/hari: **Sejalan**.
  - WHO-PB hlm. 366: 10–15 mg/kg, sampai enam kali sehari (15 mg/kg × 6 kali = 90 mg/kg/hari).
  - WHO-MFC hlm. 20: anak 15 mg/kg tiap 4–6 jam bila perlu, maksimal 4 dosis atau 4 g per 24 jam (jumlah dosis per hari lebih sedikit).
- Dosis pertama oral 20 mg/kg: **Belum terverifikasi** (tidak tercantum di WHO-PB, WHO-MFC, label yang dipakai, maupun artikel yang diunggah pemilik).
- Rektal 40 mg/kg dosis pertama: **Sejalan** dengan Birmingham dkk. 2001 (abstrak PubMed): dosis awal rektal 40 mg/kg. Dosis lanjutan pada studi itu 20 mg/kg tiap 6 jam, sedangkan IDAI 30 mg/kg, jadi dosis lanjutan rektal **Berbeda**.
- Tabel ginjal: **Sebagian sejalan**. Daschner 2005 hlm. 1677 (Tabel 2): parasetamol 10–20 mg/kg per kali (maks 4 kali/hari, maks 4 g/hari); dosis normal pada LFG 40, dan 50% dengan memperpanjang interval pada LFG 10 dan anuria. Arahnya sama dengan IDAI (interval diperpanjang bila fungsi ginjal turun), tetapi Daschner memakai batas LFG 40/10/anuria, bukan >50/10–50/<10.

**Sediaan** (FORNAS 2025 hlm. 13)

- Tablet 500 mg.
- Sirup 120 mg/5 mL.
- Drops 100 mg/mL.
- FORNAS, peresepan maksimal: tablet 180 tab/bulan; sirup 2 botol/kasus; drops 1 botol/kasus.

**Aturan penggunaan**

- Oral: dosis pertama 20 mg/kg, lalu 15 mg/kg/kali tiap 4 jam; jumlah per hari tidak melebihi 90 mg/kg (IDAI hlm. 35).
- Rektal: dosis pertama 40 mg/kg, lalu 30 mg/kg/kali tiap 6 jam; maks 5 g/hari (IDAI hlm. 35).
- Label menyatakan bahwa dosis maksimal harian dihitung dari semua rute (intravena, oral, rektal) dan semua produk yang mengandung parasetamol (label Ofirmev).

**Manfaat obat** (label Ofirmev)

- Penanganan nyeri ringan sampai sedang pada dewasa dan anak usia 2 tahun ke atas.
- Penanganan nyeri sedang sampai berat bersama analgesik opioid pada dewasa dan anak usia 2 tahun ke atas.
- Menurunkan demam pada dewasa dan anak.

**Efek samping** (label Ofirmev)

- Pada anak, efek samping yang paling sering (≥5%): mual, muntah, konstipasi, dan pruritus.
- Pada dewasa (≥5% dan lebih sering daripada plasebo): mual, muntah, sakit kepala, dan insomnia.

**Peringatan penting** (label Ofirmev)

- Melebihi dosis maksimal harian per kg dapat menyebabkan cedera hati, termasuk risiko gagal hati dan kematian.
- Reaksi kulit serius.
- Alergi dan hipersensitivitas.

**Farmakokinetik** (label Ofirmev)

- Ikatan protein plasma pada kadar terapeutik rendah (10–25%).
- Tersebar luas di sebagian besar jaringan tubuh kecuali lemak.
- Dimetabolisme terutama di hati melalui konjugasi glukuronida, konjugasi sulfat, dan oksidasi lewat sitokrom P450 (terutama CYP2E1) yang membentuk metabolit reaktif NAPQI. Pada dosis terapeutik, NAPQI cepat dikonjugasi dengan glutation.
- Metabolit dikeluarkan terutama lewat urin. Kurang dari 5% keluar di urin sebagai parasetamol bebas, dan lebih dari 90% dosis dikeluarkan dalam 24 jam.

**Farmakodinamik** (label Ofirmev)

- Mekanisme pasti efek analgesik dan antipiretik belum diketahui; diduga terutama melalui kerja sentral.
- Terbukti memiliki aktivitas analgesik dan antipiretik pada studi hewan dan manusia.

**Daftar pustaka**: [P1], [P2], [L1], [W1], [W2], [J6], [J9]

---

### 4.2 Ibuprofen

**Kalkulator BB**

| Rute | Regimen | Asal | Contoh BB 10 kg |
|---|---|---|---|
| Oral | 5–10 mg/kg/dosis tiap 4–8 jam po ("dosis normal" pada tabel penyesuaian ginjal). Dosis maksimal tidak tercantum. | IDAI hlm. 84 | 50–100 mg/kali; 150–600 mg/hari (tergantung interval) |
| Neonatus, duktus arteriosus paten | Hari pertama 10 mg/kg sekali sehari; hari kedua dan ketiga 5 mg/kg sekali sehari. Rute tidak disebutkan. | IDAI hlm. 54 | Tidak dihitung (contoh neonatus) |

Konversi mL untuk contoh oral 10 kg:

- Suspensi 100 mg/5 mL: 50–100 mg = 2,5–5,0 mL.
- Suspensi 200 mg/5 mL: 50–100 mg = 1,3–2,5 mL.

Penyesuaian pada gangguan ginjal (IDAI hlm. 84): dosis 100% pada LFG >50, 10–50, dan <10. HD dan PD: "tak ada".

**Pendukung**

- Oral 5–10 mg/kg: **Sebagian sejalan**.
  - WHO-MFC hlm. 18: anak >3 bulan 5–10 mg/kg tiga atau empat kali sehari, bersama atau sesudah makan; maksimal 40 mg/kg/hari.
  - WHO-PB hlm. 364: 5–10 mg/kg tiap 6–8 jam; dosis total harian maksimal 40 mg/kg.
  - Perbedaannya: IDAI menulis interval tiap 4–8 jam dan tidak menulis dosis maksimal. **Perlu keputusan pemilik** apakah batas 40 mg/kg/hari dari WHO ditampilkan sebagai catatan pendukung.
- Duktus arteriosus paten 10–5–5 mg/kg: **Sejalan** dengan label NeoProfen (ibuprofen lisin): dosis awal 10 mg/kg diikuti dua dosis 5 mg/kg setelah 24 dan 48 jam, intravena, berdasarkan berat lahir.
- Tanpa penyesuaian pada gangguan ginjal: **Sejalan** dengan Daschner 2005 hlm. 1677: ibuprofen 20–30 mg/kg/hari dalam 3–4 dosis, dosis normal pada LFG 40, 10, dan anuria; dosis harian maksimal 1,2 g.

**Sediaan** (FORNAS 2025 hlm. 12)

| Sediaan | FORNAS, peresepan maksimal |
|---|---|
| Tablet 200 mg | 30 tab/bulan |
| Tablet 400 mg | nyeri akut 14 tab/kasus; nyeri kronis 60 tab/bulan |
| Suspensi 100 mg/5 mL | 1 botol/kasus |
| Suspensi 200 mg/5 mL | 1 botol/kasus |

**Aturan penggunaan**

- Oral: 5–10 mg/kg/dosis dengan interval tiap 4–8 jam (IDAI hlm. 84).
- Duktus arteriosus paten pada neonatus: 3 hari pemberian sesuai tabel di atas (IDAI hlm. 54).
- Label: pakai dosis efektif terendah dalam waktu sesingkat mungkin sesuai tujuan terapi tiap pasien.

**Manfaat obat**

- Label Caldolor (ibuprofen injeksi), untuk dewasa dan anak usia 3 bulan ke atas:
  - penanganan nyeri ringan sampai sedang, termasuk nyeri pascaoperasi;
  - penanganan nyeri sedang sampai berat, termasuk nyeri pascaoperasi, sebagai tambahan analgesik opioid;
  - menurunkan demam.
- Label NeoProfen: penutupan duktus arteriosus paten yang bermakna secara klinis pada bayi prematur.

**Efek samping** (label Caldolor)

- Pada anak, efek samping yang paling sering (≥2%): nyeri di tempat infus, muntah, mual, anemia, dan sakit kepala.

**Peringatan penting** (label Caldolor, peringatan berbingkai)

- OAINS meningkatkan risiko kejadian trombotik kardiovaskular yang serius, termasuk infark miokard dan stroke, yang dapat fatal. Risiko dapat muncul sejak awal pengobatan dan dapat meningkat dengan lamanya penggunaan.
- Dikontraindikasikan pada operasi bypass arteri koroner (CABG).
- OAINS meningkatkan risiko efek samping gastrointestinal yang serius, termasuk perdarahan, ulserasi, dan perforasi.

**Farmakokinetik** (label Caldolor)

- Waktu paruh eliminasi pada anak lebih pendek dibanding dewasa.
- Pada dewasa, waktu paruh rata-rata 2,22 jam (dosis 400 mg) dan 2,44 jam (dosis 800 mg).
- Ikatan protein tinggi (>99% pada 20 mcg/mL). Ikatan dapat jenuh dan menjadi tidak linear pada kadar >20 mcg/mL.
- Berdasarkan data pemberian oral, terdapat perubahan volume distribusi yang berkaitan dengan usia atau demam.

**Farmakodinamik** (label Caldolor)

- Memiliki sifat analgesik, antiinflamasi, dan antipiretik.
- Mekanisme kerjanya, seperti OAINS lain, belum sepenuhnya dipahami; melibatkan hambatan siklooksigenase (COX-1 dan COX-2).
- Ibuprofen adalah penghambat kuat sintesis prostaglandin in vitro.

**Daftar pustaka**: [P1], [P2], [L2], [L12], [W1], [W2], [J6]

---

### 4.3 Amoksisilin

**Kalkulator BB** (tabel antimikroba IDAI, kolom "Dosis per kg per hari")

| Rute | Regimen | Asal | Contoh BB 10 kg |
|---|---|---|---|
| Oral, infeksi ringan–sedang | 40–45 mg/kg/hari dalam 3 dosis (dosis harian dewasa 750 mg–2 g) | IDAI hlm. 21 | 400–450 mg/hari = 133–150 mg/kali tiap 8 jam |
| Oral, dosis tinggi | Dosis tinggi untuk terapi menurun oral invasif, infeksi non-OMA: 80–90 mg/kg/hari dalam 3 dosis | IDAI hlm. 21 | 800–900 mg/hari = 267–300 mg/kali |
| Oral, keterangan | 150 mg/kg/hari untuk *S. pneumoniae* resisten penisilin; maksimal 4 g/hari | IDAI hlm. 21 | 1.500 mg/hari |
| Oral, profilaksis endokarditis | Pasien PJB: 50 mg/kg oral dosis tunggal, 30 menit–1 jam sebelum tindakan | IDAI hlm. 21 | 500 mg sekali |

Konversi mL untuk 133–150 mg/kali:

- Sirup kering 125 mg/5 mL: 5,3–6,0 mL.
- Sirup kering 250 mg/5 mL: 2,7–3,0 mL.
- Drops 100 mg/mL: 1,3–1,5 mL.

Catatan tata letak: pada tabel IDAI, "Maksimal 4g/hari" tertulis di kolom keterangan setelah kalimat dosis 150 mg/kg/hari. Draf ini menempelkan batas itu pada baris tersebut. **Perlu konfirmasi pemilik** apakah batas itu berlaku untuk semua regimen.

**Pendukung**

- 40–45 mg/kg/hari dalam 3 dosis: **Sejalan**.
  - IDSA 2011 hlm. e31: amoksisilin 45 mg/kg/hari dalam 3 dosis (atau 90 mg/kg/hari dalam 2 dosis).
  - Label amoksisilin, Tabel 1 (anak ≥3 bulan, BB <40 kg): infeksi berat 40 mg/kg/hari dibagi tiap 8 jam atau 45 mg/kg/hari dibagi tiap 12 jam.
  - WHO-MFC hlm. 80: otitis media 40 mg/kg/hari dalam tiga dosis (maksimal 3 g/hari).
- 80–90 mg/kg/hari: **Sebagian sejalan**. Dosisnya sama, tetapi jumlah pembagian berbeda: IDAI menulis 3 dosis, sedangkan AAP 2013 hlm. e983 (Tabel 5, otitis media akut) menulis 80–90 mg/kg/hari dalam 2 dosis dan IDSA 2011 hlm. e34 (pneumonia, rawat jalan) menulis 90 mg/kg/hari dalam 2 dosis.
- Batas 4 g/hari: **Sejalan** dengan IDSA 2011 hlm. e34 (amoksisilin oral 90 mg/kg/hari dalam 2 dosis sampai maksimal 4 g/hari).
- 150 mg/kg/hari: **Belum terverifikasi**. Tidak ditemukan di AAP 2013, IDSA 2011, maupun sumber lain yang sudah dibaca.
- Profilaksis endokarditis 50 mg/kg: **Sejalan** dengan AHA 2021 hlm. e973 (Tabel 5): anak, amoksisilin oral 50 mg/kg dosis tunggal 30–60 menit sebelum tindakan (dewasa 2 g).
- Catatan label: untuk bayi <3 bulan, label menganjurkan dosis atas 30 mg/kg/hari dibagi tiap 12 jam. IDAI tidak memisahkan kelompok umur ini.

**Sediaan** (FORNAS 2025 hlm. 23)

- Tablet 250 mg dan tablet 500 mg (FORNAS, peresepan maksimal: 10 hari).
- Drops 100 mg/mL (1 botol/kasus).
- Sirup kering 125 mg/5 mL dan sirup kering 250 mg/5 mL (1 botol/kasus).

**Aturan penggunaan**

- Dosis harian dibagi 3 (IDAI hlm. 21).
- Profilaksis endokarditis: dosis tunggal 30 menit–1 jam sebelum tindakan (IDAI hlm. 21).

**Manfaat obat** (label amoksisilin)

- Infeksi telinga, hidung, dan tenggorokan.
- Infeksi saluran genitourinaria.
- Infeksi kulit dan struktur kulit.
- Infeksi saluran napas bawah.
- Bagian dari terapi eradikasi *H. pylori* (dewasa).

**Efek samping** (label amoksisilin)

- Paling sering (>1%): diare, ruam, muntah, dan mual.

**Peringatan penting** (label amoksisilin)

- Kontraindikasi: riwayat reaksi hipersensitivitas serius, misalnya anafilaksis atau sindrom Stevens-Johnson, terhadap amoksisilin atau beta-laktam lain (penisilin, sefalosporin).
- Peringatan: reaksi anafilaksis, reaksi kulit berat (SCAR), dan *drug-induced enterocolitis syndrome*.

**Farmakokinetik** (label amoksisilin)

- Stabil dalam asam lambung dan cepat diserap setelah pemberian oral.
- Kadar puncak dalam darah tercapai 1–2 jam setelah pemberian kapsul 250 mg dan 500 mg.
- Di serum, sekitar 20% terikat protein.
- Waktu paruh 61,3 menit.
- Sekitar 60% dosis oral dikeluarkan di urin dalam 6–8 jam, sebagian besar dalam bentuk tidak berubah. Ekskresinya dapat diperlambat oleh probenesid.

**Farmakodinamik** (label amoksisilin)

- Bekerja bakterisidal seperti penisilin terhadap bakteri yang peka selama fase multiplikasi aktif.
- Bekerja melalui hambatan biosintesis dinding sel yang menyebabkan kematian bakteri.
- Resistensi terutama diperantarai enzim beta-laktamase.

**Daftar pustaka**: [P1], [P2], [L3], [W1], [J1], [J2], [J3]

---

### 4.4 Seftriakson

**Kalkulator BB**

| Rute | Regimen | Asal | Contoh BB 10 kg |
|---|---|---|---|
| IV, IM: infeksi ringan–sedang | 50–75 mg/kg sehari sekali (maksimal 2 g/hari) | IDAI hlm. 15 | 500–750 mg sekali sehari |
| IV, IM: infeksi berat | 100 mg/kg/hari dalam 2 dosis (maksimal 4 g) | IDAI hlm. 15 | 1.000 mg/hari = 500 mg/kali tiap 12 jam |
| IM: otitis media akut | 50 mg/kg IM, 1–3 hari (sampai 1 g) | IDAI hlm. 15 | 500 mg/hari |

Keterangan IDAI: spektrum luas; dosis yang lebih besar (sampai dosis untuk meningitis) cocok untuk pneumonia pneumokokus yang resisten penisilin.

Tabel penyesuaian dosis penyakit ginjal (IDAI hlm. 79): dosis normal tertulis 25–50 mg/kg/dosis tiap 12–24 jam iv, im; dosis 100% pada LFG >50, 10–50, dan <10. HD: dosis sesudah dialisis. PD: 100%.

Serbuk injeksi tidak dikonversi ke mL (lihat 2.3).

**Pendukung**

- 50–75 mg/kg/hari, maks 2 g/hari: **Sejalan** dengan label seftriakson (infeksi kulit: 50–75 mg/kg/hari sekali sehari atau dibagi dua; total tidak melebihi 2 g).
- 100 mg/kg/hari, maks 4 g: **Sejalan** dengan label untuk meningitis (100 mg/kg/hari, tidak melebihi 4 g, sekali sehari atau dibagi tiap 12 jam). WHO-PB hlm. 358: meningitis 50 mg/kg tiap 12 jam atau 100 mg/kg sekali sehari. IDSA 2004 hlm. 1277 (Tabel 6, meningitis): bayi dan anak 80–100 mg/kg/hari dengan interval 12–24 jam. IDSA 2011 hlm. e31: *S. pneumoniae* resisten penisilin, seftriakson 100 mg/kg/hari tiap 12–24 jam.
- OMA 50 mg/kg IM, sampai 1 g: **Sejalan** dengan label (dosis tunggal IM 50 mg/kg, tidak melebihi 1 g). Pemberian 1–3 hari: **Sejalan** dengan AAP 2013 hlm. e983: seftriakson 50 mg/kg IM sebagai alternatif awal, dan pada Tabel 5 diberikan IM atau IV selama 1 atau 3 hari (di tabel tertulis "50 mg" tanpa "/kg"; teks di halaman yang sama menulis 50 mg/kg).
- Tanpa penyesuaian pada gangguan ginjal: **Sejalan** dengan label (penyesuaian dosis tidak diperlukan pada gangguan ginjal untuk dosis sampai 2 g/hari). **Berbeda** dari Daschner 2005 hlm. 1678: dosis normal pada LFG 40, 80% pada LFG 10, 50% pada anuria (maks 2 g/hari).
- Catatan: WHO-MFC hlm. 89 memberi batas lebih rendah untuk anak <50 kg (50–100 mg/kg/hari, maksimal 1 g). **Berbeda** dari IDAI dan label.

**Sediaan** (FORNAS 2025 hlm. 29)

- Injeksi 1.000 mg.
- FORNAS, peresepan maksimal: 2 g/hari selama 7 hari; untuk meningitis 4 g/hari selama 14 hari.

**Aturan penggunaan**

- Sekali sehari (infeksi ringan–sedang) atau dibagi 2 dosis (infeksi berat) (IDAI hlm. 15).
- Otitis media akut: IM selama 1–3 hari (IDAI hlm. 15).
- Label: dosis IV pada neonatus diberikan selama 60 menit untuk mengurangi risiko ensefalopati bilirubin.

**Manfaat obat**

- IDAI hlm. 15: antibiotik spektrum luas; dosis tinggi cocok untuk pneumonia pneumokokus resisten penisilin; dipakai IM untuk OMA.
- Label: infeksi kulit dan struktur kulit, otitis media akut bakterial, meningitis, dan infeksi berat lain. Daftar lengkap indikasi label akan diterjemahkan pada versi berikut bila format disetujui.

**Efek samping** (label seftriakson)

- Reaksi lokal: nyeri di tempat suntikan (0,6%).
- Hipersensitivitas: ruam (1,7%).
- Hematologi: eosinofilia (6%), trombositosis (5,1%), dan leukopenia (2,1%).

**Peringatan penting** (label seftriakson, kontraindikasi)

- Hipersensitivitas terhadap seftriakson, eksipiennya, atau sefalosporin lain.
- **Neonatus prematur** sampai usia pascamenstruasi 41 minggu (usia kehamilan + usia kronologis).
- **Neonatus hiperbilirubinemia**: seftriakson dapat menggeser bilirubin dari albumin sehingga berisiko ensefalopati bilirubin.
- **Neonatus (≤28 hari) yang memerlukan larutan IV mengandung kalsium**, termasuk infus kalsium kontinu seperti nutrisi parenteral, karena risiko presipitasi seftriakson-kalsium.

**Farmakokinetik** (label seftriakson)

- Pada dewasa sehat, waktu paruh eliminasi 5,8–8,7 jam.
- Terikat reversibel pada protein plasma: 95% pada kadar <25 mcg/mL, turun menjadi 85% pada 300 mcg/mL.
- 33–67% dosis dikeluarkan di urin dalam bentuk tidak berubah; sisanya disekresi ke empedu dan ditemukan di feses sebagai senyawa yang tidak aktif secara mikrobiologis.
- Pada anak dengan meningitis, waktu paruh 4,6 jam (50 mg/kg IV) dan 4,3 jam (75 mg/kg IV); kadar di cairan serebrospinal dengan meninges meradang 5,6 dan 6,4 mcg/mL.

**Farmakodinamik** (label seftriakson)

- Agen bakterisidal yang bekerja dengan menghambat sintesis dinding sel bakteri.
- Tetap aktif dengan adanya sebagian beta-laktamase (penisilinase dan sefalosporinase) dari bakteri Gram-negatif dan Gram-positif.

**Daftar pustaka**: [P1], [P2], [L4], [W1], [W2], [J1], [J2], [J5], [J6]

---

### 4.5 Gentamisin

**Kalkulator BB**

| Rute | Regimen | Asal | Contoh |
|---|---|---|---|
| IV, IM: anak, infeksi berat | 3–7,5 mg/kg/hari dalam 3 dosis. Kolom infeksi ringan–sedang: "Tidak cocok". | IDAI hlm. 11 | BB 10 kg: 30–75 mg/hari = 10–25 mg/kali tiap 8 jam |
| IV: neonatus | IV drip dalam 30 menit; dosis dan interval menurut tabel di bawah | IDAI hlm. 30–31 | BB 3 kg, UK ≥35 minggu: 4 mg/kg = 12 mg tiap 24 jam |

Keterangan IDAI untuk golongan aminoglikosida: "dosis dan frekuensi individual berdasarkan analisis konsentrasi serum".

Tabel neonatus (IDAI hlm. 31; kolom pertama tertulis "Umur kehamilan (pascakonsepsi) dalam minggu"):

| Umur kehamilan (minggu) | Umur pascanatal (hari) | Dosis (mg/kg) | Interval (jam) |
|---|---|---|---|
| ≤29 | 0–7 | 5 | 48 |
| ≤29 | 8–28 | 4 | 36 |
| ≤29 | ≥29 | 4 | 24 |
| 30–34 | 0–7 | 4,5 | 36 |
| 30–34 | ≥8 | 4 | 24 |
| ≥35 | semua | 4 | 24 |

Konversi mL dengan injeksi 40 mg/mL: 10–25 mg = 0,25–0,63 mL; 12 mg = 0,3 mL.

Tabel penyesuaian dosis penyakit ginjal (IDAI hlm. 83): dosis normal tertulis 2–2,5 mg/kg/dosis tiap 8 jam iv; penyesuaian dengan dosis dan interval. LFG >50: 60–90%. LFG 10–50: 30–70%. LFG <10: 20–30%. HD: ½ dosis penuh sesudah dialisis. PD: 3–4 mg/L/hari.

**Pendukung**

- Anak 3–7,5 mg/kg/hari dalam 3 dosis: **Sebagian sejalan**.
  - Label gentamisin: anak 6–7,5 mg/kg/hari (2–2,5 mg/kg tiap 8 jam). Batas atas sama; batas bawah IDAI (3 mg/kg/hari) lebih rendah dari label.
  - Daschner 2005 hlm. 1677: 3–5 mg/kg/hari dalam 3 dosis (batas bawah sama dengan IDAI); kadar puncak 5–10 mg/L, lembah 0,5–2 mg/L.
  - IDSA 2004 hlm. 1277 (Tabel 6, meningitis): bayi dan anak 7,5 mg/kg/hari tiap 8 jam (batas atas sama dengan IDAI).
  - WHO-MFC hlm. 107 dan WHO-PB hlm. 363: 7,5 mg/kg **sekali sehari** (interval berbeda).
- Dosis normal 2–2,5 mg/kg tiap 8 jam di tabel ginjal: **Sejalan** dengan label.
- Tabel neonatus: **Belum terverifikasi** pada sumber terbuka.
  - Label gentamisin hanya memuat "neonatus prematur atau cukup bulan usia ≤1 minggu: 5 mg/kg/hari (2,5 mg/kg tiap 12 jam)".
  - WHO-PB hlm. 71 memakai skema lain: minggu pertama, BBLR 3 mg/kg dan berat lahir normal 5 mg/kg sekali sehari; minggu 2–4, 7,5 mg/kg sekali sehari.
  - IDSA 2004 hlm. 1277 (Tabel 6, meningitis): neonatus umur 0–7 hari 5 mg/kg/hari tiap 12 jam; 8–28 hari 7,5 mg/kg/hari tiap 8 jam. Skema ini juga **berbeda** dari tabel IDAI.
  - Tabel IDAI tampaknya mengikuti referensi neonatal komersial (Lampiran D).
- Tabel ginjal: **Berbeda**. Daschner 2005 hlm. 1677: 60% pada LFG 40, 10% pada LFG 10, 5% pada anuria; IDAI 60–90%, 30–70%, 20–30% dengan batas LFG yang berbeda.
- Pemantauan kadar: label menganjurkan menghindari kadar puncak yang lama di atas 12 mcg/mL dan kadar lembah di atas 2 mcg/mL; WHO-MFC hlm. 107: kadar lembah sebaiknya <1 mg/L. **Sejalan** dengan keterangan IDAI bahwa dosis disesuaikan dengan kadar serum.

**Sediaan** (FORNAS 2025 hlm. 32)

- Injeksi 40 mg/mL.

**Aturan penggunaan**

- Anak: dosis harian dibagi 3 (IDAI hlm. 11).
- Neonatus: IV drip dalam 30 menit dengan interval sesuai tabel (IDAI hlm. 30–31).
- Dosis dan frekuensi disesuaikan dengan kadar serum (IDAI hlm. 11).

**Manfaat obat** (label gentamisin injeksi)

Efektif pada:

- sepsis neonatal bakterial dan septikemia bakterial;
- infeksi bakteri serius pada susunan saraf pusat (meningitis);
- infeksi saluran kemih, saluran napas, dan saluran cerna (termasuk peritonitis);
- infeksi kulit, tulang, dan jaringan lunak (termasuk luka bakar).

Aminoglikosida tidak diindikasikan untuk episode awal infeksi saluran kemih tanpa komplikasi, kecuali kuman penyebab peka dan tidak peka terhadap antibiotik lain yang kurang toksik.

**Efek samping dan peringatan penting** (label gentamisin, peringatan berbingkai)

- Pasien yang mendapat aminoglikosida perlu diawasi ketat karena potensi toksisitasnya.
- Berpotensi nefrotoksik; risikonya lebih besar pada gangguan fungsi ginjal, dosis tinggi, atau terapi lama.
- Neurotoksisitas berupa ototoksisitas vestibular maupun auditori, terutama pada pasien dengan kerusakan ginjal sebelumnya; juga dapat terjadi pada fungsi ginjal normal dengan dosis lebih tinggi atau lebih lama dari anjuran.

**Farmakokinetik** (label gentamisin)

- Setelah injeksi IM, kadar puncak serum biasanya tercapai dalam 30–60 menit dan masih terukur selama 6–8 jam.
- Ikatan protein rendah (0–30%, tergantung metode).
- Pada fungsi ginjal normal, umumnya ≥70% dosis ditemukan di urin dalam 24 jam.
- Hampir tidak mengalami metabolisme; dikeluarkan terutama melalui filtrasi glomerulus.

**Farmakodinamik** (label gentamisin)

- Aminoglikosida yang berikatan dengan ribosom prokariot dan menghambat sintesis protein bakteri yang peka.
- Bakterisidal in vitro terhadap bakteri Gram-positif dan Gram-negatif.

**Daftar pustaka**: [P1], [P2], [L5], [W1], [W2], [J5], [J6]

---

### 4.6 Ondansetron

**Kalkulator BB**

| Rute | Regimen | Asal | Contoh BB 10 kg |
|---|---|---|---|
| IV: profilaksis | 0,15 mg/kg IV | IDAI hlm. 66 | 1,5 mg |
| IV: terapi | 0,2 mg/kg IV dalam 5 menit | IDAI hlm. 66 | 2 mg |
| Kemoterapi | 0,15 mg/kg (maks 16 mg), tiap 4 jam, 3 dosis. Rute tidak disebutkan. | IDAI hlm. 66 | 1,5 mg/kali × 3 |
| Oral | 0,1–0,2 mg/kg, tiap 6–12 jam | IDAI hlm. 66 | 1–2 mg/kali |

Konversi mL:

- Injeksi 2 mg/mL: 1,5 mg = 0,75 mL; 2 mg = 1,0 mL.
- Sirup 4 mg/5 mL (0,8 mg/mL): 1–2 mg = 1,3–2,5 mL.

Penyesuaian pada gangguan ginjal (IDAI hlm. 87): dosis 100% pada semua tingkat LFG. HD dan PD: "Tak ada data".

**Pendukung**

- Kemoterapi 0,15 mg/kg, maks 16 mg, 3 dosis: **Sejalan** dengan label ondansetron injeksi (anak ≥6 bulan: 0,15 mg/kg per dosis untuk 3 dosis, maksimal 16 mg per dosis; dosis pertama 30 menit sebelum kemoterapi, diulang 4 dan 8 jam kemudian).
- Profilaksis 0,15 mg/kg IV: **Berbeda**. Untuk mual-muntah pascaoperasi, label injeksi memakai 0,1 mg/kg (anak 1 bulan–12 tahun, BB ≤40 kg) dan WHO-MFC hlm. 368 memakai 100 mcg/kg (maks 4 mg). Angka 0,15 mg/kg di label dipakai untuk kemoterapi.
- Terapi 0,2 mg/kg IV: **Belum terverifikasi** (tidak ditemukan di sumber yang sudah dibaca).
- Oral 0,1–0,2 mg/kg tiap 6–12 jam: **Sebagian sejalan**. Label tablet untuk anak memakai dosis tetap menurut umur pada kemoterapi (4–11 tahun: 4 mg; 12–17 tahun: 8 mg). Freedman 2006 hlm. 1700 (gastroenteritis, dosis tunggal oral menurut berat badan): 2 mg untuk BB 8–15 kg, 4 mg untuk BB >15–30 kg, 8 mg untuk BB >30 kg. Pada BB 8–15 kg, 2 mg setara sekitar 0,13–0,25 mg/kg (hitungan penyusun). Studi ini memakai dosis tunggal, bukan dosis berulang tiap 6–12 jam.
- Profilaksis: Daschner 2005 hlm. 1682 juga memakai 0,1 mg/kg per kali (maks 3 kali/hari, maks 24 mg/hari).
- Tanpa penyesuaian pada gangguan ginjal: **Berbeda** dari Daschner 2005 hlm. 1682: dosis normal pada LFG 40, 75% pada LFG 10, 60% pada anuria.

**Sediaan** (FORNAS 2025 hlm. 190–191)

| Sediaan | FORNAS, peresepan maksimal |
|---|---|
| Tablet 4 mg | maks 3 tab/hari pascakemoterapi atau pascaradioterapi, maks 5 hari |
| Tablet 8 mg | – |
| Sirup 4 mg/5 mL | maks 1 botol pascakemoterapi atau pascaradioterapi |
| Injeksi 2 mg/mL | 1 ampul sebelum kemoterapi |

Restriksi FORNAS:

- Tablet dan sirup: pencegahan mual dan muntah pada kemoterapi dan radioterapi; tidak untuk dispepsia.
- Injeksi: mencegah muntah pada kemoterapi yang *highly emetogenic*, serta pencegahan dan pengobatan mual-muntah pascaoperasi.

**Aturan penggunaan**

- Sesuai tabel IDAI di atas; pemberian terapi IV dalam 5 menit (IDAI hlm. 66).
- Label injeksi: untuk kemoterapi, ondansetron harus diencerkan dan diinfuskan selama 15 menit.

**Manfaat obat** (label ondansetron tablet dan injeksi)

- Pencegahan mual dan muntah yang berkaitan dengan kemoterapi kanker (*highly* dan *moderately emetogenic*).
- Pencegahan mual dan muntah yang berkaitan dengan radioterapi (label tablet).
- Pencegahan mual dan/atau muntah pascaoperasi.

**Efek samping**

- Label tablet, dewasa yang mendapat kemoterapi (≥5%): sakit kepala, malaise/kelelahan, konstipasi, dan diare.
- Label injeksi, anak pascaoperasi (dosis tunggal 0,1 mg/kg): angka efek samping serupa dengan plasebo; diare lebih sering pada kelompok umur 1–24 bulan (2% vs <1%).

**Peringatan penting** (label ondansetron)

- Reaksi hipersensitivitas.
- Pemanjangan interval QT.
- Sindrom serotonin.
- Iskemia miokard.
- Dapat menutupi ileus progresif dan distensi lambung.
- Label injeksi: klirens pada bayi 1–4 bulan lebih lambat dan waktu paruh sekitar 2,5 kali lebih panjang dibanding bayi >4–24 bulan; pasien <4 bulan dianjurkan dipantau ketat.

**Farmakokinetik** (label ondansetron tablet)

- Diserap dari saluran cerna dan mengalami sebagian metabolisme lintas pertama.
- Bioavailabilitas rata-rata tablet 8 mg sekitar 56%; sedikit meningkat dengan adanya makanan.
- Ikatan protein plasma 70–76%; juga tersebar ke eritrosit.
- Dimetabolisme secara luas; sekitar 5% dosis ditemukan di urin dalam bentuk asal.

**Farmakodinamik** (label ondansetron tablet)

- Antagonis selektif reseptor 5-HT3 dan bukan antagonis reseptor dopamin.
- Reseptor 5-HT3 terdapat di perifer (ujung saraf vagus) dan di sentral (*chemoreceptor trigger zone* area postrema). Belum pasti apakah efek antiemetiknya bekerja di sentral, perifer, atau keduanya.
- Kemoterapi sitotoksik tampaknya berkaitan dengan pelepasan serotonin dari sel enterokromafin usus halus; serotonin itu dapat merangsang aferen vagus melalui reseptor 5-HT3 dan memicu refleks muntah.

**Daftar pustaka**: [P1], [P2], [L6], [L13], [W1], [J6], [J7]

---

### 4.7 Deksametason

**Kalkulator BB**

| Rute | Regimen | Asal | Contoh BB 10 kg |
|---|---|---|---|
| IV / oral | 0,1–0,25 mg/kg/kali, tiap 6 jam | IDAI hlm. 46 | 1–2,5 mg/kali; 4–10 mg/hari |
| Oral: leukemia akut | 60 mg/m²/hari terbagi dalam beberapa dosis oral; fase induksi 6 minggu *tap off*, reinduksi 4 minggu *tap off* | IDAI hlm. 46 | Tidak dihitung (mg/m², lihat 2.4) |

Konversi:

- Injeksi 5 mg/mL: 1–2,5 mg = 0,2–0,5 mL.
- Tablet 0,5 mg: 1–2,5 mg setara 2–5 tablet (informasi saja).

Keterangan IDAI: deksametason tidak memiliki efek mineralokortikoid; 1 mg setara 25 mg hidrokortison dalam efek glukokortikoid.

Penyesuaian pada gangguan ginjal (IDAI hlm. 81): dosis 100% pada semua tingkat LFG. HD dan PD: "tak ada data".

**Pendukung**

- 0,1–0,25 mg/kg/kali tiap 6 jam (0,4–1 mg/kg/hari): **Sebagian sejalan**.
  - WHO-MFC hlm. 29: gangguan inflamasi dan alergi, IM atau IV lambat, 100–400 mcg/kg dalam 1–2 dosis terbagi (maksimal 24 mg/hari). Rentang per dosis mirip, tetapi frekuensi lebih jarang.
  - Label injeksi (edema serebri): pada anak dipakai dosis efektif terkecil, sebaiknya oral, kira-kira 0,2 mg/kg/24 jam dalam dosis terbagi (lebih rendah dari IDAI).
  - IDSA 2004 hlm. 1277 (meningitis bakterial): **Sejalan**. Deksametason 0,15 mg/kg tiap 6 jam selama 2–4 hari, dimulai 10–20 menit sebelum atau bersamaan dengan dosis antibiotik pertama (meningitis H. influenzae tipe b pada bayi dan anak). Angka ini berada di dalam rentang IDAI dengan interval yang sama.
- Kesetaraan 1 mg = 25 mg hidrokortison: **Sebagian sejalan**. Label tablet mencantumkan kesetaraan 0,75 mg deksametason = 20 mg hidrokortison, yaitu sekitar 1 mg = 26,7 mg.

**Sediaan** (FORNAS 2025)

- Injeksi 5 mg/mL (hlm. 17, 189).
- Tablet 0,5 mg (hlm. 109 dan hlm. 148 pada kelas kortikosteroid).
- Pada hlm. 189 (kelas antiemetik), FORNAS menulis restriksi "hanya untuk menyertai terapi antineoplastik".
- FORNAS hlm. 17 (injeksi 5 mg/mL), peresepan maksimal: 20 mg/hari.

**Aturan penggunaan**

- Tiap 6 jam, IV atau per oral (IDAI hlm. 46).
- Label tablet: kebutuhan dosis bervariasi dan harus disesuaikan dengan penyakit dan respons pasien. Setelah respons baik, dosis diturunkan bertahap sampai dosis terendah yang masih efektif.

**Manfaat obat** (label deksametason tablet dan injeksi)

- Keadaan alergi berat yang tidak teratasi dengan terapi konvensional, seperti asma, dermatitis atopik, dermatitis kontak, reaksi hipersensitivitas obat, rinitis alergi, dan *serum sickness*.
- Gangguan endokrin, reumatik, penyakit kolagen, kulit, mata, saluran cerna, saluran napas, hematologi, neoplastik, keadaan edema, dan sistem saraf (misalnya edema serebri), sesuai pengelompokan label injeksi.
- Label tablet: bukti efikasi dan keamanan pada anak tersedia dari studi publikasi untuk sindrom nefrotik (>2 tahun) serta limfoma dan leukemia agresif (>1 bulan).

**Efek samping** (label deksametason tablet; dilaporkan dengan deksametason atau kortikosteroid lain)

- Alergi: reaksi anafilaktoid, anafilaksis, angioedema.
- Kardiovaskular: antara lain hipertensi, edema, takikardia, gagal jantung kongestif, dan kardiomiopati hipertrofik pada bayi prematur.
- Kulit: antara lain akne, gangguan penyembuhan luka, striae, dan kulit tipis rapuh.
- Endokrin: antara lain hiperglikemia, keadaan cushingoid, dan **supresi pertumbuhan pada anak**.
- Cairan dan elektrolit: retensi cairan dan natrium, kehilangan kalium, alkalosis hipokalemik.
- Saluran cerna: antara lain ulkus peptikum dengan kemungkinan perforasi dan perdarahan, pankreatitis, dan nafsu makan meningkat.
- Muskuloskeletal: antara lain osteoporosis, miopati steroid, dan kelemahan otot.
- Neurologis/psikiatris: antara lain kejang, depresi, euforia, insomnia, dan peningkatan tekanan intrakranial (pseudotumor serebri).
- Mata: antara lain glaukoma, peningkatan tekanan intraokular, dan katarak subkapsular posterior.
- Lain-lain: antara lain penurunan daya tahan terhadap infeksi, *moon face*, dan kenaikan berat badan.

**Peringatan penting** (label deksametason tablet, penggunaan pada anak)

- Anak perlu dipantau tekanan darah, berat badan, tinggi badan, dan tekanan intraokular, serta dievaluasi klinis untuk infeksi, gangguan psikososial, tromboemboli, ulkus peptikum, katarak, dan osteoporosis.
- Kortikosteroid lewat rute apa pun dapat menurunkan kecepatan pertumbuhan anak.

**Farmakokinetik**

- Label tablet: glukokortikoid mudah diserap dari saluran cerna.
- Data kuantitatif (waktu paruh, ikatan protein, eliminasi) **tidak tercantum pada label yang dipakai** dan belum ditemukan di sumber terbuka yang bisa diakses.

**Farmakodinamik** (label deksametason tablet)

- Glukokortikoid menimbulkan berbagai efek metabolik dan memodifikasi respons imun tubuh terhadap berbagai rangsangan.
- Analog sintetis seperti deksametason terutama dipakai untuk efek antiinflamasinya.
- Pada dosis antiinflamasi yang setara, deksametason hampir tidak memiliki sifat retensi natrium seperti hidrokortison.

**Daftar pustaka**: [P1], [P2], [L7], [L8], [W1], [J5]

---

### 4.8 Asiklovir

**Kalkulator BB**

| Rute | Regimen | Asal | Contoh BB 10 kg |
|---|---|---|---|
| IV: varicella zoster (cacar air) | 10–15 mg/kg/dosis tiap 8 jam selama 5–10 hari | IDAI hlm. 29 dan 37 | 100–150 mg/kali; 300–450 mg/hari |
| IV: HSV | 20 mg/kg/dosis tiap 8 jam selama 14–21 hari | IDAI hlm. 29 dan 37 | 200 mg/kali; 600 mg/hari |
| Oral / IV: HSV gingivostomatitis pada HIV | 20 mg/kg per oral tiap 8 jam, atau 5–10 mg/kg IV tiap 8 jam, selama 7–14 hari | IDAI hlm. 37 | Oral 200 mg/kali; IV 50–100 mg/kali |
| IV: HSV diseminata atau ensefalitis pada HIV | 10 mg/kg IV tiap 8 jam, atau 500 mg/m² tiap 8 jam, selama 21 hari | IDAI hlm. 37 | 100 mg/kali |
| IV: varisela pada HIV | 10 mg/kg IV tiap 8 jam, atau 500 mg/m² IV tiap 8 jam, selama 7 hari. Per oral hanya pada imunosupresi ringan. | IDAI hlm. 37 | 100 mg/kali |
| Oral: herpes zoster pada HIV | 20 mg/kg (maks 800 mg/dosis) tiap 6 jam selama 7 hari | IDAI hlm. 37 | 200 mg/kali; 800 mg/hari |

Untuk regimen oral 200 mg/kali, tablet 200 mg setara 1 tablet (informasi saja). Serbuk injeksi 250 mg tidak dikonversi ke mL.

Tabel penyesuaian dosis penyakit ginjal (IDAI hlm. 76), dosis normal tertulis 10 mg/kg/dosis tiap 8 jam iv (ensefalitis, varisela, imunokompromais):

- LFG >50: 5 mg/kg tiap 8 jam.
- LFG 10–50: 5 mg/kg tiap 12–24 jam.
- LFG <10: 2,5 mg/kg tiap 24 jam.
- HD: dosis sesudah dialisis. PD: dosis untuk FG <10.
- Lihat bagian 5 untuk hasil pengecekan baris ini.

**Pendukung**

- HSV IV 20 mg/kg tiap 8 jam selama 14–21 hari: **Sejalan**.
  - WHO-MFC hlm. 149: neonatus–bayi <3 bulan, herpes simpleks diseminata, 20 mg/kg tiap 8 jam selama 10–14 hari (21 hari bila melibatkan SSP).
  - Kimberlin dkk. 2001 (abstrak PubMed): 60 mg/kg/hari dalam 3 dosis selama 21 hari untuk HSV neonatal SSP dan diseminata.
  - Label injeksi: ensefalitis herpes simpleks anak 3 bulan–12 tahun 20 mg/kg tiap 8 jam selama 10 hari; neonatus 10 mg/kg tiap 8 jam selama 10 hari (label menyebut dosis 15–20 mg/kg pernah dipakai, tetapi keamanan dan efikasinya belum diketahui).
- Varicella zoster IV 10–15 mg/kg tiap 8 jam: **Sebagian sejalan**.
  - WHO-MFC hlm. 149: neonatus–bayi <3 bulan imunokompeten 10–20 mg/kg tiap 8 jam minimal 7 hari; anak 3 bulan–12 tahun memakai mg/m².
  - Label injeksi (zoster pada imunokompromais, anak <12 tahun): 20 mg/kg tiap 8 jam selama 7 hari.
- Varisela/zoster pada HIV 500 mg/m² IV tiap 8 jam selama 7 hari: **Sejalan** dengan WHO-MFC hlm. 149 (imunokompromais, 500 mg/m² tiap 8 jam) dan studi pada label injeksi (500 mg/m² tiap 8 jam selama 7 hari).
- Oral 20 mg/kg (maks 800 mg/dosis): **Sejalan** dengan label tablet untuk cacar air (anak ≥2 tahun 20 mg/kg per dosis 4 kali sehari selama 5 hari; anak >40 kg 800 mg 4 kali sehari).
- Regimen pada HIV, dicocokkan dengan pedoman NIH infeksi oportunistik anak (bagian HSV hlm. M-11 s.d. M-12; bagian VZV hlm. X-11 s.d. X-13):
  - Gingivostomatitis IV 5–10 mg/kg tiap 8 jam: **Sejalan** (NIH: gingivostomatitis sedang–berat 5–10 mg/kg per dosis IV tiap 8 jam).
  - Gingivostomatitis oral 20 mg/kg tiap 8 jam selama 7–14 hari: **Sebagian sejalan** (NIH, gejala ringan: 20 mg/kg per dosis, maksimal 400 mg/dosis, 4 kali sehari selama 7–10 hari).
  - HSV diseminata atau ensefalitis 10 mg/kg IV tiap 8 jam selama 21 hari: **Sejalan** (NIH: di luar periode neonatal 10 mg/kg, sampai 15 mg/kg per dosis pada anak <12 tahun, IV tiap 8 jam selama 21 hari). Alternatif 500 mg/m² tidak tercantum di bagian HSV NIH.
  - Varisela 10 mg/kg atau 500 mg/m² IV tiap 8 jam selama 7 hari: **Sejalan** (NIH: imunosupresi berat atau varisela berat, 10 mg/kg atau 500 mg/m² per dosis IV tiap 8 jam minimal 7 hari dan sampai tidak ada lesi baru selama 48 jam).
  - Herpes zoster oral 20 mg/kg (maks 800 mg/dosis) tiap 6 jam selama 7 hari: **Sejalan** (NIH: 20 mg/kg per dosis, maksimal 800 mg/dosis, 4 kali sehari selama 7–14 hari).
- HSV neonatal: NIH hlm. M-11 menulis 20 mg/kg IV tiap 8 jam, minimal 21 hari untuk penyakit SSP atau diseminata dan 14 hari untuk penyakit terbatas kulit, mata, dan mulut (**Sejalan** dengan IDAI 14–21 hari).
- Batas atas label injeksi: dosis setara 20 mg/kg tiap 8 jam tidak boleh dilampaui pada pasien mana pun.

**Sediaan** (FORNAS 2025 hlm. 53)

- Tablet 200 mg dan tablet 400 mg.
- Serbuk injeksi 250 mg.

**Aturan penggunaan**

- Interval dan lama pemberian sesuai tabel IDAI di atas.
- Label injeksi:
  - hindari injeksi IV cepat atau bolus; IM dan subkutan juga harus dihindari;
  - infus dengan kecepatan tetap selama 1 jam;
  - kenaikan kreatinin atau BUN lebih sering setelah infus IV cepat (kurang dari 10 menit).

**Manfaat obat** (label asiklovir)

- Tablet: pengobatan akut herpes zoster; episode awal dan penanganan episode berulang herpes genitalis; pengobatan cacar air (varisela).
- Injeksi:
  - herpes simpleks mukosa dan kulit (HSV-1, HSV-2), awal maupun berulang, pada pasien imunokompromais;
  - episode awal berat herpes genitalis pada pasien imunokompeten;
  - ensefalitis herpes simpleks;
  - infeksi herpes neonatal;
  - infeksi varicella-zoster pada pasien imunokompromais.

**Efek samping** (label asiklovir)

- Oral, cacar air (10–20 mg/kg 4 kali sehari selama 5–7 hari, atau 800 mg 4 kali sehari selama 5 hari): tersering diare (3,2%).
- Oral, herpes genitalis jangka pendek: mual dan/atau muntah (2,7%).
- Injeksi: inflamasi atau flebitis di tempat suntikan pada sekitar 9% pasien; kenaikan sementara kreatinin serum atau BUN pada 5–10% pasien, lebih sering setelah infus cepat.

**Peringatan penting** (label asiklovir)

- Kontraindikasi: hipersensitivitas terhadap asiklovir atau valasiklovir.

**Farmakokinetik** (label asiklovir)

- Oral: ikatan protein plasma 9–33%; waktu paruh 2,5–3,3 jam; bioavailabilitas oral rata-rata 10–20%, makin rendah pada dosis lebih tinggi; makanan tidak memengaruhi penyerapan.
- Pada anak umur 7 bulan–7 tahun, waktu paruh rata-rata setelah dosis oral 300–600 mg/m² adalah 2,6 jam (rentang 1,59–3,74 jam); secara umum farmakokinetik pada anak mirip dewasa.
- Injeksi: pada anak 3 bulan–12 tahun waktu paruh 2,36 ± 0,97 jam; pada bayi lahir–3 bulan 3,8 ± 1,19 jam. Kadar plasma sebanding dengan dosis.
- Waktu paruh dan klirens bergantung pada fungsi ginjal.

**Farmakodinamik** (label asiklovir)

- Analog nukleosida purin sintetis dengan aktivitas hambat terhadap HSV-1, HSV-2, dan VZV.
- Selektif karena afinitasnya terhadap enzim timidin kinase virus. Enzim ini mengubah asiklovir menjadi monofosfat, lalu enzim sel mengubahnya menjadi difosfat dan trifosfat.
- Asiklovir trifosfat menghentikan replikasi DNA virus herpes dengan 3 cara:
  1. hambatan kompetitif DNA polimerase virus;
  2. inkorporasi dan terminasi rantai DNA virus;
  3. inaktivasi DNA polimerase virus.

**Daftar pustaka**: [P1], [P2], [L9], [L10], [W1], [J4], [J6], [J8]

---

## 5. Hasil pengecekan tabel penyesuaian ginjal asiklovir (IDAI hlm. 76)

**1. Apakah salah baca dari PDF?** Tidak. Gambar halaman 76 sudah saya lihat langsung. Buku memang mencetak: dosis normal 10 mg/kg/dosis tiap 8 jam; kolom LFG >50 = 5 mg/kg tiap 8 jam; LFG 10–50 = 5 mg/kg tiap 12–24 jam; LFG <10 = 2,5 mg/kg tiap 24 jam.

**2. Apakah kolomnya bergeser (angka LFG >50 sebenarnya untuk LFG <50)?** Tidak cocok dengan pola itu. Label asiklovir injeksi (Tabel 5) memberi penyesuaian berdasarkan klirens kreatinin (mL/menit/1,73 m²):

| Klirens kreatinin | Persen dosis anjuran | Interval |
|---|---|---|
| >50 | 100% | tiap 8 jam |
| 25–50 | 100% | tiap 12 jam |
| 10–25 | 100% | tiap 24 jam |
| 0–10 | 50% | tiap 24 jam |

Bila dosis normal 10 mg/kg, label menghasilkan 10 mg/kg tiap 8 jam (>50), 10 mg/kg tiap 12–24 jam (10–50), dan 5 mg/kg tiap 24 jam (<10). **Semua angka IDAI tepat setengah dari hasil itu**, dengan interval yang sama. Pola IDAI cocok dengan label bila dosis dasarnya 5 mg/kg (dosis dewasa untuk HSV mukokutan), bukan 10 mg/kg.

**Kesimpulan sementara:** kemungkinan tabel IDAI menyalin dosis dasar 5 mg/kg dari referensi asal, sementara kolom "dosis normal" ditulis 10 mg/kg. Ini dugaan saya dari perbandingan, bukan pernyataan sumber. **Perlu keputusan pemilik atau dokter:**

- a. tetap menampilkan angka IDAI apa adanya, dengan catatan perbandingan ini; atau
- b. menampilkan penyesuaian ginjal dalam bentuk persen dosis dan interval (pola label), dengan label asal "label FDA". Opsi ini melanggar aturan "dosis hanya IDAI/FORNAS", jadi perlu izin khusus.

**3. Pengecekan dengan artikel yang diunggah pemilik (draf 0.3).**

- Pedoman NIH infeksi oportunistik anak (bagian VZV, hlm. X-11) memberi penyesuaian ginjal asiklovir IV dengan pola yang sama dengan label:
  - klirens kreatinin >50: tanpa penyesuaian dosis;
  - 25–50: dosis biasa tiap 12 jam;
  - 10 sampai <25: dosis biasa tiap 24 jam;
  - <10: 50% dosis biasa tiap 24 jam. NIH memberi contoh: bila dosis biasa 10 mg/kg tiap 8 jam, maka 5 mg/kg tiap 24 jam;
  - hemodialisis intermiten: 5 mg/kg IV tiap 24 jam, diberikan sesudah dialisis.
- Jadi, untuk dosis normal 10 mg/kg, NIH dan label sama-sama memberi **10 mg/kg tiap 8 jam pada LFG >50** dan **5 mg/kg tiap 24 jam pada LFG <10**. IDAI menulis 5 mg/kg dan 2,5 mg/kg. Dugaan bahwa angka IDAI bergeser satu kolom (angka LFG >50 sebenarnya untuk LFG <50) tidak cocok: pada LFG 10–50, NIH dan label tetap memberi dosis penuh dengan interval lebih panjang, bukan 5 mg/kg tiap 8 jam.
- Daschner 2005 hlm. 1680 memakai sistem lain (dosis per m² dan batas LFG 40/10/anuria): asiklovir VZV 1.500 mg/m²/hari dalam 3 dosis, HSV 750 mg/m²/hari dalam 3 dosis; 60% dalam 2 dosis pada LFG 40, 20% dalam 1 dosis pada LFG 10, 15% dalam 1 dosis pada anuria. Daschner bukan sumber asal tabel IDAI, karena batas LFG-nya berbeda.

**Kesimpulan setelah verifikasi:** angka penyesuaian ginjal asiklovir di IDAI hlm. 76 tidak didukung oleh label FDA maupun pedoman NIH; keduanya memberi angka dua kali lipat dari IDAI. Opsi a/b di atas tetap memerlukan keputusan pemilik atau dokter. Bila pemilik memilih opsi b, sumber yang dipakai sebaiknya pedoman NIH, karena pedoman itu khusus untuk anak.

---

## 6. Temuan lain yang perlu dicek pemilik atau dokter

1. **Amoksisilin** (IDAI hlm. 21): perlu dipastikan apakah "maksimal 4 g/hari" berlaku untuk semua regimen.
2. **Ibuprofen oral**: IDAI tidak menulis dosis maksimal; WHO menulis maksimal 40 mg/kg/hari. IDAI menulis interval tiap 4–8 jam; WHO tiga–empat kali sehari atau tiap 6–8 jam.
3. **Ondansetron profilaksis 0,15 mg/kg IV**: label dan WHO memakai 0,1 mg/kg untuk mual-muntah pascaoperasi.
4. **Gentamisin anak**: batas bawah IDAI 3 mg/kg/hari lebih rendah dari label (6 mg/kg/hari). WHO memakai 7,5 mg/kg sekali sehari.
5. **Parasetamol rektal**: dosis lanjutan IDAI 30 mg/kg tiap 6 jam; studi Birmingham 2001 memakai 20 mg/kg tiap 6 jam.
6. **Seftriakson**: WHO-MFC memakai batas 1 g/hari untuk anak <50 kg, berbeda dari IDAI dan label (2 g dan 4 g).
7. **Amoksisilin 80–90 mg/kg/hari**: IDAI membagi dalam 3 dosis; AAP 2013 dan IDSA 2011 membagi dalam 2 dosis.
8. **Gentamisin neonatus**: tabel IDAI berbeda dari label (2,5 mg/kg tiap 12 jam pada usia ≤1 minggu), WHO-PB, dan IDSA 2004 (5 mg/kg/hari tiap 12 jam pada usia 0–7 hari; 7,5 mg/kg/hari tiap 8 jam pada usia 8–28 hari).
9. **Penyesuaian ginjal seftriakson dan ondansetron**: IDAI menulis 100% di semua tingkat LFG, sedangkan Daschner 2005 menurunkan dosis pada LFG 10 dan anuria. Label seftriakson mendukung tanpa penyesuaian sampai 2 g/hari.
10. **FORNAS ibuprofen injeksi 100 mg/mL** mencantumkan "2.400 mg/hari selama 3 hari". Draf ini menganggapnya peresepan maksimal (bukan dosis anak per kg), sehingga rute injeksi ibuprofen dikeluarkan. Mohon konfirmasi.

---

## 7. Daftar pustaka

**Sumber dosis**

- **[P1]** Satuan Tugas Farmasi Pediatri Ikatan Dokter Anak Indonesia. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. Berkas milik pemilik: `dosis obat/Buku Dosis Obat IDAI.pdf`. Situs IDAI: https://www.idai.or.id
- **[P2]** Kementerian Kesehatan RI. *Keputusan Menteri Kesehatan Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* Jakarta: Kemenkes; 2025. Unduhan resmi (Direktorat Jenderal Farmasi dan Alat Kesehatan): https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/ ; JDIH Kemenkes: https://jdih.kemkes.go.id. Halaman yang dikutip adalah nomor halaman pada berkas KMK.

**Label obat (DailyMed, U.S. National Library of Medicine)**

- **[L1]** OFIRMEV (acetaminophen) injection. Versi 2, efektif 22 Feb 2020. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=9a38f63a-8852-6dab-e053-2a95a90a90d6
- **[L2]** CALDOLOR (ibuprofen injection). Versi 17, efektif 29 Jan 2026. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=1eaa7790-f1a1-4f51-b10a-cbbaf033f684
- **[L3]** Amoxicillin tablets, for oral suspension, chewable tablets and capsules. Versi 4, efektif 6 Okt 2026. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b07b5ac4-253e-4c83-91c3-3fdc46e91a0f
- **[L4]** Ceftriaxone for Injection, USP. Versi 18, efektif 30 Sep 2026. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=8351aa37-552d-471d-b293-c564dcb6ec29
- **[L5]** Gentamicin Sulfate Injection, USP. Versi 22, efektif 20 Mei 2026. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=977180b3-a222-4282-d485-4a3217674305
- **[L6]** Ondansetron tablets. Versi 15, efektif 9 Okt 2026. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=14276805-4e99-4bbe-ad76-ffc06eddb38a
- **[L7]** Dexamethasone Tablets, USP. Versi 3, efektif 4 Sep 2026. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=8c5375a7-7a0d-4af0-8b86-bc87698ac3d1
- **[L8]** Dexamethasone Sodium Phosphate Injection, USP. Versi 3, efektif 9 Sep 2026. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=11f10a47-1c42-40e4-89d8-bb000fef497c
- **[L9]** Acyclovir Tablets, USP. Versi 7, efektif 29 Sep 2026. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=05f42300-2a06-45f1-a9b9-6e5c84ae58ec
- **[L10]** Acyclovir Sodium Injection. Versi 7, efektif 5 Jul 2023. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ae921e4e-b8ae-4a45-acc1-32e5e719812b
- **[L12]** NEOPROFEN (ibuprofen lysine) injection. Versi 17. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=6f5ede6f-b0b7-4fc8-969e-652f60ead047
- **[L13]** Ondansetron Injection, USP (Hospira). Versi 34, efektif 22 Mei 2026. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=6a11f61b-2318-4382-2b91-4366e4bb53fa

(Label krim asiklovir [L11] pada draf 0.1 tidak dipakai lagi karena rute krim dikeluarkan.)

**WHO (akses terbuka, sudah diunduh dan dibaca)**

- **[W1]** World Health Organization. *WHO Model Formulary for Children 2010.* Geneva: WHO; 2010. https://iris.who.int/handle/10665/44309
- **[W2]** World Health Organization. *Pocket Book of Hospital Care for Children: Guidelines for the Management of Common Childhood Illnesses.* 2nd ed. Geneva: WHO; 2013. https://iris.who.int/handle/10665/81170

**Jurnal (dibaca dari abstrak PubMed)**

- **[J4]** Kimberlin DW, Lin CY, Jacobs RF, dkk. Safety and efficacy of high-dose intravenous acyclovir in the management of neonatal herpes simplex virus infections. *Pediatrics.* 2001;108(2):230-8. https://doi.org/10.1542/peds.108.2.230
- **[J9]** Birmingham PK, Tobin MJ, Fisher DM, dkk. Initial and subsequent dosing of rectal acetaminophen in children: a 24-hour pharmacokinetic study of new dose recommendations. *Anesthesiology.* 2001;94(3):385-9. https://doi.org/10.1097/00000542-200103000-00005

**Artikel dan pedoman yang diunggah pemilik (teks lengkap sudah dibaca)**

- **[J1]** Lieberthal AS, Carroll AE, Chonmaitree T, dkk. The diagnosis and management of acute otitis media. *Pediatrics.* 2013;131(3):e964-99. https://doi.org/10.1542/peds.2012-3488
- **[J2]** Bradley JS, Byington CL, Shah SS, dkk. The management of community-acquired pneumonia in infants and children older than 3 months of age: clinical practice guidelines by PIDS and IDSA. *Clin Infect Dis.* 2011;53(7):e25-76. https://doi.org/10.1093/cid/cir531
- **[J3]** Wilson WR, Gewitz M, Lockhart PB, dkk. Prevention of viridans group streptococcal infective endocarditis: a scientific statement from the American Heart Association. *Circulation.* 2021;143(20):e963-78. https://doi.org/10.1161/CIR.0000000000000969
- **[J5]** Tunkel AR, Hartman BJ, Kaplan SL, dkk. Practice guidelines for the management of bacterial meningitis. *Clin Infect Dis.* 2004;39(9):1267-84. https://doi.org/10.1086/425368
- **[J6]** Daschner M. Drug dosage in children with reduced renal function. *Pediatr Nephrol.* 2005;20(12):1675-86. https://doi.org/10.1007/s00467-005-1922-9
- **[J7]** Freedman SB, Adler M, Seshadri R, Powell EC. Oral ondansetron for gastroenteritis in a pediatric emergency department. *N Engl J Med.* 2006;354(16):1698-705. https://doi.org/10.1056/NEJMoa055119
- **[J8]** Panel on Opportunistic Infections in Children With and Exposed to HIV. *Guidelines for the Prevention and Treatment of Opportunistic Infections in Children With and Exposed to HIV.* Department of Health and Human Services. Pembaruan 23 April 2026 (bagian HSV diperbarui 27 Juni 2018; bagian VZV 23 April 2026). https://clinicalinfo.hiv.gov/en/guidelines/pediatric-opportunistic-infection

**Acuan konsep tampilan (tidak disalin)**

- Aplikasi "Dosis Obat Anak" (Steven Tiro), Google Play: https://play.google.com/store/apps/details?id=com.dosisobatanak

---

## Lampiran A. Indeks isi Buku Saku Dosis Obat Pediatri IDAI 2016 (untuk rencana batch berikutnya)

> Indeks disusun otomatis dari teks PDF, lalu dibersihkan manual. **Kemungkinan ada entri yang terlewat**, misalnya entri yang judulnya memuat angka seperti "Kotrimoksazol (Trimethoprim 1 mg : sulfametoksazol 5 mg)" (hlm. 59). Angka dalam kurung adalah halaman cetak.

**A.1 Tabel Antimikroba (hlm. 11–27)**: dosis per kg per hari untuk infeksi ringan–sedang dan berat.

- Aminoglikosida: amikasin, gentamisin, kanamisin, neomisin, tobramisin.
- Karbapenem: doripenem, imipenem-silastatin, meropenem, ertapenem.
- Sefalosporin: sefaklor, sefadroksil, sefazolin, sefdinir, sefditoren, sefepim, sefiksim, sefotetan, sefoksitin, sefpodoksim, sefprozil, seftarolin, seftazidim, seftibuten, seftizoksim, seftriakson, sefuroksim (IV/IM dan PO), sefaleksin.
- Lain-lain: kloramfenikol, klindamisin, daptomisin, siprofloksasin, levofloksasin, azitromisin, klaritromisin, eritromisin, metronidazol, aztreonam, nitrofurantoin, linezolid.
- Penisilin: amoksisilin, amoksisilin-asam klavulanat, ampisilin, golongan penisilin lain (hlm. 22–24), oksasilin, nafsilin, dikloksasilin.
- Lain-lain: rifampin, rifaksimin, sulfadiazin, sulfisoksazol, tetrasiklin, doksisiklin, vankomisin.

**A.2 Dosis Obat Perinatologi (hlm. 28–33)**

Amfoterisin B (konvensional), amikasin, aminofilin, ampisilin, ampisilin sulbaktam, asiklovir, beractant (surfaktan), dekstrosa, fenobarbital, fitomenadion (vitamin K1), furosemid, gentamisin, imunoglobulin hepatitis B (HBIG), imunoglobulin, isoniazid, meropenem, metronidazol, seftazidim, vankomisin.

**A.3 Daftar Dosis Obat (hlm. 34–72), 275 entri**

5-Fluorouracil (tertulis "5 – Flurouracil") (34), 5-hidroksi triptofan (34), Abacavir (34), Abatacept (34), Aceclofenac (34), Acemetacin (34), Acetaminofen (35), Adrenalin (35), Acrivastine (35), Adalimumab (35), Adriamisin (35), Alclometason (35), Alitretinoin (35), Alopurinol (36), Amcinonide (36), Amfoterisin B (36), Amfoterisin B (konvensional) (36), Aminofilin (36), Amlodipin (36), Asam folat (36), Asam folinat (36), Asam Traneksamat (36), Asam mefenamat (37), Asam ursodeoksikolat (37), Asiklovir (37), Asetilsistein (37), Asparaginase (37), Aspirin (38), Atazanavir (38), Atazinavir + ritonavir (39), Atenolol (39), Atovakuon (39), Atropin (40), Auranofin (40), Aurotioglukosa (40), Azatadine (40), Azatioprin (40), Azelastin (40), Azelastin + flutikason (40), Azitromisin (40), Bambuterol (40), Beklometason dipropionat (41), Belatacept (41), Belimumab (41), Betametason (41), Bikarbonat (42), Biotin (42), Bleomisin sulfat (42), Bromfeniramin (42), Budesonid (42), Budesonid + eformoterol (43), Buklizin (43), Calcipotriol (43), Captopril (43), Carbinoksamin (43), Carvedilol (44), Celecoxib (44), Cetirizin (44), Cisapride (44), Cisplatin (44), Clemastine (44), Clobetasol (44), Clobetason (44), Clocortolon (44), Clonidin (44), Cytarabin (45), Daktinomisin (45), Dapson (45), Daunorubisin (45), Deferasiroks (45), Deferioksamin (45), Deferipron (45), Deflazakort (45), Dekstrosa (45), Deksametason (46), Deksklorfeniramin maleat (46), Deksmetilfenidat (46), Dekspantenol (46), Desloratadin (46), Desmopresin (46), Desonid (47), Desoksimetason (47), Diazoksid (47), Digoksin (47), Diklofenak (47), Dikloksasilin (47), Didanosin (47), Difenhidramin hidroklorida (47), Diflorason (47), Diflunisal (48), Dimetinden (48), Ditranol (48), Dolutegravir (Tivicay/DTG) (48), Dobutamin (48), Doksorubisin (48), Domperidon (48), Dopamin (48), Efalizumab (psoriasis) (48), Efavirenz (49), Eformoterol (49), Elaprase (49), Elosulfase alfa (49), Emtricitabin (49), Enalapril (49), Enfuvirtide (49), Eritropoeitin Alfa (49), Eritropoeitin Beta (49), Estrogen terkonjugasi + medroksiprogesteron (50), Etambutol hidroklorida (50), Etanercept (50), Etanol (50), Etinilestradiol (50), Etoposid (50), Etravirin (50), Faktor Von Willebrand (50), Faktor VIIa rekombinan (51), Faktor IX komplek (51), Famotidin (51), Famsiklovir (51), Fenilefrin (51), Fenobarbital (51), Filgastrim (51), Fisostigmin (51), Flukonazol (52), Flumazenil (52), Flunisolid (52), Fludrokortison asetat (52), Fluosinosid (52), Flutikason (52), Flutikason + formoterol (52), Flutikason + salmeterol (52), Formoterol (52), Formoterol + mometason (52), Fosamprenavir (FPV) (52), Fosamprenavir + ritonavir (53), Furosemid (53), Gansiklovir (53), Garam ferrous (53), Glukagon (53), Hidralazin (53), Hidroklorotiazid (53), Hidrokortison (54), Hidroksi Urea (54), Hidroksiklorokuin sulfat (54), Hidroksikobalamin (vitamin B12) (54), Hormon pertumbuhan (54), Human chorionic gonadotropin (54), Ibuprofen (54), Imatinib Mesilate (54), Imiglucerase alfa (54), Imipramin (55), Imunoglobulin (55), Imunoglobulin antilimfosit (55), Imunoglobulin, CMV (55), Imunoglobulin, difteri (55), Imunoglobulin, hepatitis B (55), Imunoglobulin rabies (56), Imunoglobulin, tetanus (56), Indometasin (56), Infliximab (56), Insulin, reguler (56), Ipratropium bromida (56), Irbesartan (57), Isoniazid (57), Kalium (57), Karboplatin (57), Kalsitriol (1.25-OH vitamin D3) (57), Kalsium glukonat (57), Kalsium klorida (57), Karbon aktif (57), Karnitin (57), Ketamine (57), Kloralhidrat (58), Klorokuin (58), Klorfeniramin (58), Kolestiramin (58), Kolekalsiferol ( Vitamin D3) (58), Kolkisin (59), Konsentrat trombosit (59), Kortison asetat (59), Kriopresipitat (59), Kromoglikat (59), L-arginin (60), L-glisin (60), L-isoleucine (60), L-metionin (60), L-valine (60), Labetalol (60), Laktulosa (61), Lamivudine (61), Lansoprazol (61), Leukovorin (Kalsium Folinat) (61), Lisinopril (61), Lopinavir +ritonavir (61), Loratadine (61), Losartan (61), Magnesium hidroksida (61), Manitol (62), Melfalan (62), Merkaptopurin (62), Mesna (62), Metimazol (62), Metilen biru (62), Metilfenidat (62), Metformin (62), Metilprednisolon (62), Metoklopramid (63), Metoprolol (63), Metotreksat (63), Mikofenolat mofetil (63), Milrinon (64), Mineral mix (64), Minoksidil (64), Mometason (64), Montelukast (64), Morfin sulfat (64), Nalokson (65), Natrium (65), Natrium tiosulfat (65), Natrium benzoate (65), Natrium-fenilbutirat (65), Natrium nitroprusid (65), Nevirapin (65), Nifedipin (65), Nitisinon (NTBC) (66), Nitrofurantoin (66), Noradrenalin (66), Octreotide (66), Omalizumab (66), Omeprazole (66), Omnipaque 300 (66), Ondansetron (66), Orlistat (66), Pantoprazole (67), Packed red cell (67), Plasma beku segar (67), Pirazinamid (67), Piridoksin-HCl (vitamin B6) (67), Polietilen glikol (67), Prazosin (antagonis alfa perifer) (67), Prednison (67), Prometazin (67), Propranolol (67), Propiltiourasil (68), Ranitidin (68), Rituximab (68), Salbutamol (69), Sapropterin hidroklorida (69), Seng sulfat (69), Sildenafil (69), Siklofosfamid (69), Siklosporin (70), Siklosporin oftalmik (70), Siproheptadin (70), Siproteron (70), Spironolakton (70), Sorbitol (70), Sukralfat (70), Stavudin (70), Takrolimus (70), Testosteron (71), Tiamin (71), Tikarsilin (71), Tiroksin (71), Triamsinolon (71), Trietilentetramin (71), Valgansiklovir (71), Vinblastin (71), Vinkristin (71), Vitamin A (71), Vitamin C (72), Vitamin E (72), Vitamin K1 (72), Vitamin mix (72), Zidovudin (72)

**A.4 Obat-obatan dan dosis penyesuaian pada penyakit ginjal (hlm. 76–91)**: tabel dosis normal dan penyesuaian menurut LFG, HD, dan PD.

---

## Lampiran B. Ringkasan verifikasi

Setiap dosis IDAI dan sediaan FORNAS di draf ini sudah dicocokkan ulang secara otomatis dengan teks sumber (skrip pencocokan kalimat), dan untuk tabel dengan gambar halaman buku. Hasil skrip: 46 dari 46 kutipan IDAI dan FORNAS cocok dengan teks sumber pada halaman yang dikutip, dan 47 dari 47 kutipan pendukung (WHO-MFC, WHO-PB, label FDA) cocok dengan teks sumbernya. Dua kutipan label/WHO awalnya tidak cocok hanya karena karakter tak terlihat (zero-width joiner dan tanda kutip lengkung); setelah dicek manual, isinya sama. Pada draf 0.3, 31 dari 31 kutipan dari artikel yang diunggah pemilik (AAP 2013, IDSA 2011, AHA 2021, IDSA 2004, Daschner 2005, Freedman 2006, pedoman NIH) juga cocok dengan teks lengkapnya; dua di antaranya awalnya tidak cocok hanya karena karakter kontrol pengganti tanda "×" di PDF Daschner.

| Obat | Regimen IDAI | Status pendukung | Sumber pendukung |
|---|---|---|---|
| Parasetamol | Oral 15 mg/kg tiap 4 jam, maks 90 mg/kg/hari | Sejalan | WHO-PB hlm. 366; WHO-MFC hlm. 20 (sebagian) |
| Parasetamol | Oral dosis pertama 20 mg/kg | Belum terverifikasi | – |
| Parasetamol | Rektal 40 mg/kg lalu 30 mg/kg tiap 6 jam | Sebagian sejalan | Birmingham 2001 (40 lalu 20 mg/kg) |
| Parasetamol | Tabel ginjal (interval diperpanjang) | Sebagian sejalan | Daschner 2005 hlm. 1677 |
| Ibuprofen | Oral 5–10 mg/kg tiap 4–8 jam | Sebagian sejalan | WHO-MFC hlm. 18; WHO-PB hlm. 364 |
| Ibuprofen | DAP 10–5–5 mg/kg | Sejalan | Label NeoProfen |
| Ibuprofen | Tanpa penyesuaian ginjal | Sejalan | Daschner 2005 hlm. 1677 |
| Amoksisilin | 40–45 mg/kg/hari dalam 3 dosis | Sejalan | Label amoksisilin; WHO-MFC hlm. 80; IDSA 2011 hlm. e31 |
| Amoksisilin | 80–90 mg/kg/hari dalam 3 dosis | Sebagian sejalan (sumber: 2 dosis) | AAP 2013 hlm. e983; IDSA 2011 hlm. e34 |
| Amoksisilin | Maksimal 4 g/hari | Sejalan | IDSA 2011 hlm. e34 |
| Amoksisilin | 150 mg/kg/hari | Belum terverifikasi | Tidak ditemukan |
| Amoksisilin | Profilaksis endokarditis 50 mg/kg | Sejalan | AHA 2021 hlm. e973 |
| Seftriakson | 50–75 mg/kg/hari (maks 2 g); 100 mg/kg/hari (maks 4 g); OMA 50 mg/kg (maks 1 g) | Sejalan | Label seftriakson; WHO-PB hlm. 358 |
| Seftriakson | 100 mg/kg/hari (meningitis/pneumokokus resisten) | Sejalan | IDSA 2004 hlm. 1277; IDSA 2011 hlm. e31 |
| Seftriakson | OMA 1–3 hari | Sejalan | AAP 2013 hlm. e983 |
| Seftriakson | Tanpa penyesuaian ginjal | Sejalan dengan label; berbeda dari Daschner | Label; Daschner 2005 hlm. 1678 |
| Gentamisin | Anak 3–7,5 mg/kg/hari dalam 3 dosis | Sejalan (batas bawah dan atas didukung sumber berbeda) | Daschner 2005 hlm. 1677 (3–5); IDSA 2004 hlm. 1277 dan label (7,5) |
| Gentamisin | Tabel neonatus | Berbeda / belum terverifikasi | Label, WHO-PB, IDSA 2004 memakai skema lain; referensi neonatal komersial belum tersedia |
| Gentamisin | Tabel ginjal | Berbeda | Daschner 2005 hlm. 1677 |
| Ondansetron | Kemoterapi 0,15 mg/kg maks 16 mg × 3 | Sejalan | Label ondansetron injeksi |
| Ondansetron | Profilaksis 0,15 mg/kg IV | Berbeda | Label injeksi dan WHO-MFC: 0,1 mg/kg |
| Ondansetron | Terapi 0,2 mg/kg IV | Belum terverifikasi | Tidak ditemukan |
| Ondansetron | Oral 0,1–0,2 mg/kg tiap 6–12 jam | Sebagian sejalan (dosis tunggal) | Freedman 2006 hlm. 1700 |
| Ondansetron | Tanpa penyesuaian ginjal | Berbeda | Daschner 2005 hlm. 1682 |
| Deksametason | 0,1–0,25 mg/kg tiap 6 jam | Sejalan untuk meningitis (0,15 mg/kg tiap 6 jam); sebagian sejalan untuk indikasi lain | IDSA 2004 hlm. 1277; WHO-MFC hlm. 29; label injeksi |
| Asiklovir | HSV IV 20 mg/kg tiap 8 jam 14–21 hari | Sejalan | WHO-MFC hlm. 149; Kimberlin 2001 |
| Asiklovir | VZV IV 10–15 mg/kg tiap 8 jam | Sebagian sejalan | WHO-MFC hlm. 149; label injeksi |
| Asiklovir | Oral 20 mg/kg (maks 800 mg/dosis) | Sejalan | Label tablet |
| Asiklovir | HIV: gingivostomatitis IV, diseminata/ensefalitis, varisela, herpes zoster oral | Sejalan | Pedoman NIH hlm. M-11 s.d. M-12, X-11 s.d. X-13 |
| Asiklovir | HIV: gingivostomatitis oral 20 mg/kg tiap 8 jam | Sebagian sejalan | NIH: 4 kali sehari, maks 400 mg/dosis |
| Asiklovir | Tabel ginjal | Berbeda (lihat bagian 5) | Label injeksi Tabel 5; pedoman NIH hlm. X-11 |

---

## Lampiran C. Rute dan sediaan yang dikeluarkan (tidak ada dosis di IDAI maupun FORNAS)

| Obat | Rute/sediaan | Ada di FORNAS? | Alasan dikeluarkan |
|---|---|---|---|
| Parasetamol | Injeksi | Tidak | Tidak ada dosis di IDAI dan tidak ada sediaan di FORNAS |
| Ibuprofen | Injeksi 100 mg/mL | Ya (hlm. 12) | IDAI tidak memuat dosis; FORNAS hanya peresepan maksimal (lihat temuan 6.7) |
| Gentamisin | Salep mata 0,3%; tetes mata 0,3% dan 1% | Ya (hlm. 172–173) | Tidak ada dosis di IDAI maupun FORNAS |
| Asiklovir | Krim 5% | Ya (hlm. 168) | Tidak ada dosis di IDAI maupun FORNAS |
| Asiklovir | Salep mata 3% | Ya (hlm. 172) | Tidak ada dosis di IDAI maupun FORNAS |

---

## Lampiran D. Status sumber pendukung yang diminta

Draf 0.2 meminta pemilik mengunduh 9 sumber. Pada draf 0.3, delapan berkas sudah diunggah ke `dosis obat/Sumber jurnal luar/` dan teks lengkapnya sudah dibaca.

| No | Sumber | Status |
|---|---|---|
| 1 | AAP 2013, otitis media akut | Diterima dan dibaca (36 halaman) |
| 2 | IDSA 2011, pneumonia komunitas anak | Diterima dan dibaca (52 halaman) |
| 3 | AHA 2021, profilaksis endokarditis | Diterima dan dibaca (16 halaman) |
| 4 | IDSA 2004, meningitis bakterial | Diterima dan dibaca (18 halaman) |
| 5 | Daschner 2005, dosis pada gangguan ginjal anak | Diterima dan dibaca (12 halaman) |
| 6 | Freedman 2006, ondansetron oral | Diterima dan dibaca (8 halaman) |
| 7–8 | Pedoman NIH infeksi oportunistik anak dengan HIV (HSV dan VZV) | Diterima dan dibaca. Kedua berkas yang diunggah identik dan berisi pedoman lengkap (693 halaman, pembaruan 23 April 2026) yang sudah mencakup bagian HSV dan VZV. |
| 9 | Referensi neonatal (NeoFax/Lexicomp atau AAP Red Book) | Belum ada. Diperlukan untuk memverifikasi tabel gentamisin neonatus. |

Dosis yang masih belum ditemukan pendukungnya pada semua sumber yang sudah dibaca:

- parasetamol oral dosis pertama 20 mg/kg;
- amoksisilin 150 mg/kg/hari;
- ondansetron terapi 0,2 mg/kg IV;
- tabel gentamisin neonatus (nomor 9).

---

## Batch 2 (draf 0.5, 13 Oktober 2026)

Obat: ampisilin, sefiksim, azitromisin, kotrimoksazol, metronidazol, salbutamol, setirizin, fenobarbital, furosemid, prednison.

- Kutipan IDAI dan FORNAS: 45 dari 45 cocok dengan teks sumber (skrip pencocokan urutan kata). Tabel IDAI (antimikroba, perinatologi, penyesuaian ginjal) juga dicek pada gambar halaman.
- Penulisan buku yang disalin apa adanya:
  - salbutamol, aerosol (IDAI hlm. 69): buku mencetak "1-2 uff" dan "akut 4-8 uff";
  - tabel ginjal (IDAI hlm. 77): ampisilin tercetak "Amplicillin";
  - tabel ginjal (IDAI hlm. 83): furosemid tercetak "Frusemide";
  - kotrimoksazol (IDAI hlm. 26): keterangan tercetak "Kontraindikasi untuk usia < 2 tahun", sedangkan label sulfametoksazol-trimetoprim menulis kontraindikasi pada anak kurang dari 2 bulan.
- Satu kalimat dosis dari label inhaler HFA (dua inhalasi tiap 4–6 jam) tidak dimasukkan karena dosis hanya boleh dari IDAI atau FORNAS.
- Sediaan FORNAS yang tidak dimasukkan karena tidak ada dosisnya: metronidazol ovula 500 mg; salbutamol kombinasi dengan ipratropium (cairan inhalasi).
- Label fenobarbital tablet di DailyMed berasal dari produk yang beredar di AS; label Sezaby adalah produk injeksi yang disetujui FDA untuk kejang neonatus.

---

## Batch 3 (draf 0.6, 15 Oktober 2026)

Obat: meropenem, vankomisin, seftazidim, kloramfenikol, klindamisin, eritromisin, omeprazol, metoklopramid, fitomenadion (vitamin K1), hidrokortison.

- Kutipan IDAI dan FORNAS: 36 dari 36 cocok dengan teks sumber; tabel juga dicek pada gambar halaman.
- Penulisan buku yang disalin apa adanya:
  - vankomisin (IDAI hlm. 27): kolom infeksi berat tercetak "(dosis harian dewasa, 2–4g)I";
  - tabel ginjal vankomisin (IDAI hlm. 91): dosis normal tertulis "10 mg/kg/dosis q6 jam po", kolom LFG berisi dosis dewasa "1,0 gm".
- Baris tanpa nama obat di tabel antimikroba IDAI hlm. 16 (rute IM, IV: 20 mg dalam 3 dosis / 40 mg dalam 3–4 dosis; keterangan tentang anaerob, Bacteroides, pneumokokus resisten multiobat, dan SARM) terletak di antara baris kloramfenikol dan klindamisin. Isinya tampak sesuai klindamisin, tetapi karena tidak bernama, baris ini **tidak dimasukkan** ke kloramfenikol maupun klindamisin. Dosis IV/IM klindamisin diambil dari kolom dosis normal tabel ginjal (IDAI hlm. 80). **Mohon konfirmasi pemilik.**
- Dosis FORNAS dipakai untuk fitomenadion injeksi 2 mg/mL (bayi baru lahir 1 mg; bayi prematur 0,5 mg), dengan label asal FORNAS.
- Sediaan FORNAS yang tidak dimasukkan karena tidak ada dosisnya: fitomenadion tablet 10 mg; kloramfenikol salep/tetes mata dan tetes telinga; hidrokortison krim 1% dan 2,5%.
- Kalimat dari label yang menyangkut interval atau rute dosis (hidrokortison tiap 4–6 jam; vitamin K1 sebaiknya subkutan) tidak dimasukkan ke Aturan penggunaan karena dosis hanya dari IDAI atau FORNAS. Peringatan berbingkai vitamin K1 tentang reaksi hipersensitivitas pada pemberian IV/IM tetap dicantumkan di bagian Peringatan.
- Eritromisin IV ada dosisnya di IDAI tetapi FORNAS tidak mencantumkan sediaan injeksi; baris dosis tetap dimasukkan (sumber IDAI), sediaan hanya yang ada di FORNAS.

---

## Batch 4 (draf 0.7, 15 Oktober 2026)

Obat: isoniazid, aminofilin, epinefrin (adrenalin), asam traneksamat, difenhidramin, kaptopril, kalsium glukonat, manitol, metilprednisolon, spironolakton.

- Prometazin semula direncanakan, tetapi tidak tercantum di FORNAS 2025, sehingga diganti kaptopril.
- Kutipan IDAI dan FORNAS: 38 dari 38 cocok dengan teks sumber.
- Penulisan buku yang disalin apa adanya:
  - tabel ginjal spironolakton (IDAI hlm. 90): nama tercetak "Spironolactione" dan dosis normal tertulis "6,25–25 mg/dosis" (dicek pada gambar halaman);
  - tabel ginjal asam traneksamat (IDAI hlm. 90): LFG >50 tertulis 50%, sedangkan LFG 10–50 dan <10 tertulis 100%.
- Dosis FORNAS dipakai untuk isoniazid tablet 100 mg (10 mg/kgBB, maks 6 bulan setiap hari; profilaksis TB pada anak).
- Tabel ginjal "Theophyllne" (IDAI hlm. 90) tidak dimasukkan ke aminofilin karena nama obatnya berbeda.
- Sediaan FORNAS yang tidak dimasukkan: isoniazid dalam kombinasi KDT/FDC (produk berbeda); epinefrin 1:80.000 (kombinasi untuk kedokteran gigi); metilprednisolon tablet di kelas onkologi hlm. 110 (sediaan sama dengan hlm. 148/199).
- Baris dalam kolom "Keadaan" yang di buku tidak berjudul ditandai "–" (bukan judul buatan penyusun).

---

## Batch 5 (draf 0.8, 15 Oktober 2026)

Obat: morfin, ketamin, nalokson, digoksin, dobutamin, dopamin, natrium bikarbonat, flukonazol, alopurinol, asam folat.

- Kutipan IDAI dan FORNAS: 27 dari 27 cocok dengan teks sumber.
- Morfin oral: IDAI hlm. 64 hanya memuat IM dan IV; baris PO diambil dari kolom dosis normal tabel ginjal (IDAI hlm. 86), sama seperti pola klindamisin.
- Penulisan buku yang disalin apa adanya: tabel ginjal alopurinol (IDAI hlm. 76) kolom HD tertulis "dosis".
- FORNAS morfin injeksi 10 mg/mL: kolom peresepan maksimal tertulis "infus per 24 jam", disalin apa adanya.
- Sediaan FORNAS yang tidak dimasukkan: asam folat dalam kombinasi dengan zat besi (produk berbeda).
- Label DailyMed: dobutamin mengandung natrium metabisulfit (bukan bisulfit); kontraindikasi flukonazol mencantumkan eritromisin, pimozid, dan kuinidin.
