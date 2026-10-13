# Rancangan Kalkulator Dosis Obat Anak (DRAF untuk dicek pemilik)

- Versi: draf 0.1, 13 Oktober 2026
- Status: **belum diimplementasikan di website.** Dokumen ini hanya berisi kerangka tampilan dan isi materi untuk ditinjau.
- Penyusun: Claude Code (PC 2), dari sumber milik pemilik (Buku Saku Dosis Obat Pediatri IDAI 2016) ditambah sumber resmi yang tercantum di Daftar Pustaka.
- Cakupan draf ini: kerangka fitur, aturan perhitungan, kebijakan sumber, dan **8 monografi contoh (pilot)**: parasetamol, ibuprofen, amoksisilin, seftriakson, gentamisin, ondansetron, deksametason, asiklovir. Obat lain menunggu persetujuan format ini.

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
- Daftar abjad, dengan label rute yang tersedia pada tiap obat (misalnya **Oral · Injeksi · Topikal**).
- Filter kelas terapi mengikuti pengelompokan FORNAS 2025, misalnya analgesik, antibakteri, antivirus, antiemetik, kortikosteroid.

### 1.3 Halaman satu obat

Urutan dari atas ke bawah:

1. **Kotak berat badan (kg)**: satu kali isi, dipakai oleh semua rute di halaman itu.
   - Usia atau umur kehamilan diminta hanya bila regimen sumber membedakan berdasarkan usia, misalnya tabel neonatus gentamisin.
2. **Pilihan rute** dalam satu halaman, berupa tab: **Oral | Injeksi | Topikal | Rektal**.
   - Hanya rute yang tercantum di sumber yang ditampilkan.
   - Rute tanpa dosis di sumber tetap ditampilkan bila sediaannya ada di FORNAS. Tab tersebut diberi tulisan "Dosis belum tersedia dari sumber."
3. **Kartu hasil per regimen**. Setiap indikasi atau keadaan dari sumber menjadi satu kartu berisi:
   - nama indikasi atau keadaan, persis seperti di sumber;
   - **dosis per kali** dan **dosis per hari**, selalu keduanya dan berlabel tegas;
   - interval dan lama pemberian bila tercantum;
   - batas maksimal bila tercantum. Bila hasil hitung melebihi batas, yang ditampilkan adalah angka batas, disertai keterangan "dibatasi sesuai dosis maksimal sumber";
   - konversi ke **mL** untuk sediaan cair dan injeksi berkekuatan mg/mL;
   - rujukan halaman sumber di bawah kartu.
4. Bagian berikut, dalam bentuk daftar yang bisa dibuka-tutup:
   - **Sediaan**: dari FORNAS 2025.
   - **Aturan penggunaan**: interval, lama, dan cara pemberian dari sumber, serta restriksi FORNAS.
   - **Manfaat obat**: indikasi menurut sumber.
   - **Efek samping**.
   - **Peringatan penting**: kontraindikasi dan peringatan berbingkai dari label. Bagian ini usulan tambahan, karena aplikasi acuan juga menampilkan kontraindikasi.
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

Masukan pengguna aplikasi tersebut di halaman Play Store menyebut kekeliruan **"per kali" vs "per hari"**. Karena itu, rancangan ini mewajibkan setiap regimen menyimpan jenis dosisnya dengan tegas (lihat 2.1). Kartu hasil juga selalu menampilkan kedua angka.

---

## 2. Aturan perhitungan

### 2.1 Jenis dosis yang disimpan per regimen

| Jenis | Contoh tulisan di sumber | Cara hitung |
|---|---|---|
| mg/kg **per kali** | "15 mg/kg/kali, tiap 4 jam" | per kali = dosis × BB; per hari = per kali × (24 ÷ interval) |
| mg/kg **per hari dibagi n dosis** | "40–45 mg dalam 3 dosis" (kolom "Dosis per kg per hari") | per hari = dosis × BB; per kali = per hari ÷ n |
| mg/kg **sekali sehari** | "50–75 mg sehari sekali" | per kali = per hari = dosis × BB |
| **Dosis awal (loading) lalu lanjutan** | "20 mg/kg, kemudian 15 mg/kg/kali" | dua baris hasil: dosis pertama dan dosis berikutnya |
| **Tabel neonatus** | dosis dan interval menurut umur kehamilan dan umur pascanatal | memilih baris tabel dari input umur, lalu dosis × BB |
| **mg/m²** | "500 mg/m², 8 jam" | memerlukan luas permukaan tubuh; lihat 2.4 |
| **Topikal** | "krim 5%, oles ..." | tidak dihitung dari BB; hanya frekuensi dan lama |

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

### 2.4 Hal yang perlu keputusan pemilik (aturan penyusun, tidak ada di sumber)

1. **Pembulatan.** Usulan: mg ditampilkan 1 desimal dan mL 1 desimal, tanpa membulatkan ke pecahan tablet. Sumber tidak mengatur pembulatan.
2. **Regimen mg/m².** Usulan: versi pertama tidak menghitung luas permukaan tubuh. Regimen mg/m² hanya ditampilkan sebagai teks. Bila ingin dihitung, perlu dipilih rumus luas permukaan tubuh dari sumber resmi.
3. **Rentang dosis**, misalnya 10–15 mg/kg. Usulan: tampilkan batas bawah dan batas atas, tanpa memilih satu angka.

---

## 3. Kebijakan sumber

1. **Dosis**: hanya dari *Buku Saku Dosis Obat Pediatri IDAI 2016*, sumber milik pemilik.
   - Halaman ditulis sebagai **nomor cetak di buku**. Contoh: "IDAI hlm. 35" adalah halaman yang tercetak 35, yaitu halaman ke-36 pada berkas PDF.
   - Bila IDAI tidak memuat dosis untuk suatu rute, kolom dosis dibiarkan **kosong dan ditandai**. Dosis tidak diisi dari sumber lain sebelum pemilik memutuskan.
2. **Sediaan**: dari *Formularium Nasional 2025* (KMK HK.01.07/MENKES/1199/2025).
   - Bila suatu sediaan tidak ada di FORNAS, tidak dicantumkan.
   - Sediaan non-FORNAS yang beredar di Indonesia bisa ditambahkan kemudian dari data BPOM, bila pemilik menghendaki.
3. **Manfaat, efek samping, peringatan, farmakokinetik, farmakodinamik**: dari label resmi obat yang disetujui FDA, dibaca di DailyMed (U.S. National Library of Medicine, NIH).
   - Isi label diterjemahkan apa adanya, tanpa tambahan.
   - Catatan: indikasi pada label adalah indikasi yang disetujui di Amerika Serikat, sehingga dapat berbeda dari registrasi BPOM.
4. Bila suatu informasi tidak ada di sumber yang dipakai, tulisannya **"Tidak tercantum pada sumber yang dipakai"**. Tidak ada isian dari pengetahuan umum.
5. Sumber tambahan yang dicoba tetapi belum bisa dipakai:
   - **NCBI Bookshelf (StatPearls)** meminta verifikasi reCAPTCHA saat diakses otomatis. Verifikasi itu tidak dilewati, sehingga isinya belum dipakai.
   - **PIONAS BPOM** sedang tidak dapat diakses (HTTP 503).
   - Keduanya dapat dicek ulang secara manual bila pemilik ingin melengkapi bagian yang masih kosong, misalnya farmakokinetik deksametason.

---

## 4. Monografi pilot

> Contoh hitung memakai **BB 10 kg** agar mudah dicek. Angka hanya hasil aritmetika dari dosis sumber.

### 4.1 Parasetamol (Acetaminofen)

**Kalkulator BB**

| Rute | Regimen menurut IDAI | Contoh BB 10 kg | Sumber |
|---|---|---|---|
| Oral | 20 mg/kg (dosis pertama), kemudian 15 mg/kg/kali tiap 4 jam; maks 90 mg/kg/hari | Dosis pertama 200 mg; berikutnya 150 mg/kali tiap 4 jam; maks 900 mg/hari | IDAI hlm. 35 |
| Rektal | 40 mg/kg (dosis pertama), kemudian 30 mg/kg/kali tiap 6 jam; maks 5 g/hari (tertulis demikian) | Dosis pertama 400 mg; berikutnya 300 mg/kali tiap 6 jam | IDAI hlm. 35 |
| Injeksi | Dosis belum tersedia dari sumber (IDAI 2016 tidak memuat; FORNAS 2025 tidak memuat sediaan injeksi) | – | – |

Konversi mL untuk contoh oral 10 kg:

- Sirup 120 mg/5 mL: 200 mg = 8,3 mL; 150 mg = 6,3 mL.
- Drops 100 mg/mL: 200 mg = 2,0 mL; 150 mg = 1,5 mL.

Penyesuaian pada gangguan ginjal (IDAI hlm. 76; dosis normal 10–15 mg/kg/dosis tiap 4–6 jam po):

- Penyesuaian dilakukan dengan mengubah interval.
- LFG >50: tiap 4 jam.
- LFG 10–50: tiap 6 jam.
- LFG <10: tiap 8 jam.
- Hemodialisis dan dialisis peritoneal: "tak ada".

**Sediaan** (FORNAS 2025 hlm. 13)

- Tablet 500 mg
- Sirup 120 mg/5 mL
- Drops 100 mg/mL
- Peresepan maksimal FORNAS: tablet 180 tab/bulan; sirup 2 botol/kasus; drops 1 botol/kasus.

**Aturan penggunaan**

- Oral: dosis pertama 20 mg/kg, lalu 15 mg/kg/kali tiap 4 jam. Jumlah per hari tidak melebihi 90 mg/kg (IDAI hlm. 35).
- Rektal: dosis pertama 40 mg/kg, lalu 30 mg/kg/kali tiap 6 jam (IDAI hlm. 35).
- Label menyatakan bahwa dosis maksimal harian dihitung dari semua rute (intravena, oral, rektal) dan semua produk yang mengandung parasetamol (label Ofirmev).

**Manfaat obat** (label Ofirmev, sediaan injeksi)

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
- Dimetabolisme terutama di hati melalui:
  - konjugasi glukuronida;
  - konjugasi sulfat;
  - oksidasi lewat sitokrom P450, terutama CYP2E1, membentuk metabolit reaktif NAPQI. Pada dosis terapeutik, NAPQI cepat dikonjugasi dengan glutation.
- Metabolit dikeluarkan terutama lewat urin.
- Kurang dari 5% keluar di urin sebagai parasetamol bebas, dan lebih dari 90% dosis dikeluarkan dalam 24 jam.

**Farmakodinamik** (label Ofirmev)

- Mekanisme pasti efek analgesik dan antipiretik belum diketahui. Diduga terutama melalui kerja sentral.
- Terbukti memiliki aktivitas analgesik dan antipiretik pada studi hewan dan manusia.

**Daftar pustaka**: [P1], [P2], [L1]

---

### 4.2 Ibuprofen

**Kalkulator BB**

| Rute | Regimen menurut IDAI | Contoh BB 10 kg | Sumber |
|---|---|---|---|
| Oral | 5–10 mg/kg/dosis tiap 4–8 jam po. Tercantum sebagai "dosis normal" pada tabel penyesuaian dosis penyakit ginjal. Dosis maksimal tidak tercantum. | 50–100 mg/kali | IDAI hlm. 84 |
| Neonatus (duktus arteriosus paten) | Hari pertama 10 mg/kg sekali sehari; hari kedua dan ketiga 5 mg/kg sekali sehari. Rute tidak disebutkan. | – (contoh neonatus tidak dihitung) | IDAI hlm. 54 |
| Injeksi | Dosis belum tersedia dari sumber (IDAI 2016 tidak memuat dosis injeksi analgesik/antipiretik) | – | – |

Konversi mL untuk contoh oral 10 kg:

- Suspensi 100 mg/5 mL: 50–100 mg = 2,5–5,0 mL.
- Suspensi 200 mg/5 mL: 50–100 mg = 1,3–2,5 mL.

Penyesuaian pada gangguan ginjal (IDAI hlm. 84): dosis 100% pada LFG >50, 10–50, dan <10. HD dan PD: "tak ada".

**Sediaan** (FORNAS 2025 hlm. 12)

| Sediaan | Peresepan maksimal |
|---|---|
| Tablet 200 mg | 30 tab/bulan |
| Tablet 400 mg | nyeri akut 14 tab/kasus; nyeri kronis 60 tab/bulan |
| Suspensi 100 mg/5 mL | 1 botol/kasus |
| Suspensi 200 mg/5 mL | 1 botol/kasus |
| Injeksi 100 mg/mL | 2.400 mg/hari selama 3 hari |

**Aturan penggunaan**

- Oral: 5–10 mg/kg/dosis dengan interval tiap 4–8 jam (IDAI hlm. 84).
- Duktus arteriosus paten pada neonatus: 3 hari pemberian sesuai tabel di atas (IDAI hlm. 54).
- Label: pakai dosis efektif terendah dalam waktu sesingkat mungkin sesuai tujuan terapi tiap pasien.
- Label: vial injeksi harus diencerkan sebelum diberikan.

**Manfaat obat** (label Caldolor, ibuprofen injeksi)

Untuk dewasa dan anak usia 3 bulan ke atas:

- penanganan nyeri ringan sampai sedang, termasuk nyeri pascaoperasi;
- penanganan nyeri sedang sampai berat, termasuk nyeri pascaoperasi, sebagai tambahan analgesik opioid;
- menurunkan demam.

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
- Mekanisme kerjanya, seperti OAINS lain, belum sepenuhnya dipahami. Mekanismenya melibatkan hambatan siklooksigenase (COX-1 dan COX-2).
- Ibuprofen adalah penghambat kuat sintesis prostaglandin in vitro.

**Daftar pustaka**: [P1], [P2], [L2]

---

### 4.3 Amoksisilin

**Kalkulator BB** (tabel antimikroba IDAI, kolom "Dosis per kg per hari")

| Rute | Regimen menurut IDAI | Contoh BB 10 kg | Sumber |
|---|---|---|---|
| Oral, infeksi ringan–sedang | 40–45 mg/kg/hari dalam 3 dosis (dosis harian dewasa 750 mg–2 g) | 400–450 mg/hari, yaitu 133–150 mg/kali tiap 8 jam | IDAI hlm. 21 |
| Oral, dosis tinggi | Dosis tinggi untuk terapi menurun oral invasif, infeksi non-OMA: 80–90 mg/kg/hari dalam 3 dosis | 800–900 mg/hari, yaitu 267–300 mg/kali | IDAI hlm. 21 |
| Oral, keterangan | 150 mg/kg/hari untuk *S. pneumoniae* resisten penisilin; maksimal 4 g/hari | 1.500 mg/hari | IDAI hlm. 21 |
| Oral, profilaksis endokarditis | Pasien PJB: 50 mg/kg oral dosis tunggal, 30 menit–1 jam sebelum tindakan | 500 mg sekali | IDAI hlm. 21 |
| Injeksi / topikal | Tidak tercantum (IDAI hanya mencantumkan rute PO) | – | – |

Konversi mL untuk 133–150 mg/kali:

- Sirup kering 125 mg/5 mL: 5,3–6,0 mL.
- Sirup kering 250 mg/5 mL: 2,7–3,0 mL.
- Drops 100 mg/mL: 1,3–1,5 mL.

Catatan tata letak: pada tabel IDAI, "Maksimal 4g/hari" tertulis di kolom keterangan setelah kalimat dosis 150 mg/kg/hari. Draf ini menempelkan batas itu pada baris tersebut. **Perlu konfirmasi pemilik** apakah batas itu berlaku untuk semua regimen.

**Sediaan** (FORNAS 2025 hlm. 23)

- Tablet 250 mg dan tablet 500 mg (peresepan maksimal 10 hari).
- Drops 100 mg/mL (1 botol/kasus).
- Sirup kering 125 mg/5 mL dan sirup kering 250 mg/5 mL (1 botol/kasus).

**Aturan penggunaan**

- Dosis harian dibagi 3 (IDAI hlm. 21).
- Profilaksis endokarditis: dosis tunggal 30 menit–1 jam sebelum tindakan (IDAI hlm. 21).

**Manfaat obat** (label amoksisilin, DailyMed)

- Infeksi telinga, hidung, dan tenggorokan.
- Infeksi saluran genitourinaria.
- Infeksi kulit dan struktur kulit.
- Infeksi saluran napas bawah.
- Bagian dari terapi eradikasi *H. pylori*.

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

**Daftar pustaka**: [P1], [P2], [L3]

---

### 4.4 Seftriakson

**Kalkulator BB**

| Rute | Regimen menurut IDAI | Contoh BB 10 kg | Sumber |
|---|---|---|---|
| IV, IM: infeksi ringan–sedang | 50–75 mg/kg sehari sekali (maksimal 2 g/hari) | 500–750 mg sekali sehari | IDAI hlm. 15 |
| IV, IM: infeksi berat | 100 mg/kg/hari dalam 2 dosis (maksimal 4 g) | 1.000 mg/hari, yaitu 500 mg/kali tiap 12 jam | IDAI hlm. 15 |
| IM: otitis media akut | 50 mg/kg IM, 1–3 hari (sampai 1 g) | 500 mg/hari | IDAI hlm. 15 |

Keterangan IDAI:

- Spektrum luas.
- Dosis yang lebih besar (sampai dosis untuk meningitis) cocok untuk pneumonia pneumokokus yang resisten penisilin.

Tabel penyesuaian dosis penyakit ginjal (IDAI hlm. 79):

- Dosis normal tertulis 25–50 mg/kg/dosis tiap 12–24 jam iv, im.
- Dosis 100% pada LFG >50, 10–50, dan <10.
- HD: dosis sesudah dialisis. PD: 100%.

Serbuk injeksi tidak dikonversi ke mL (lihat 2.3).

**Sediaan** (FORNAS 2025 hlm. 29)

- Injeksi 1.000 mg.
- Peresepan maksimal: 2 g/hari selama 7 hari; untuk meningitis 4 g/hari selama 14 hari.

**Aturan penggunaan**

- Sekali sehari (infeksi ringan–sedang) atau dibagi 2 dosis (infeksi berat) (IDAI hlm. 15).
- Otitis media akut: IM selama 1–3 hari (IDAI hlm. 15).

**Manfaat obat**

- IDAI hlm. 15: antibiotik spektrum luas; dosis tinggi cocok untuk pneumonia pneumokokus resisten penisilin; dipakai IM untuk OMA.
- Daftar indikasi label FDA belum diterjemahkan dalam draf ini. Akan dilengkapi pada versi berikut bila format disetujui.

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
- 33–67% dosis dikeluarkan di urin dalam bentuk tidak berubah. Sisanya disekresi ke empedu dan akhirnya ditemukan di feses sebagai senyawa yang tidak aktif secara mikrobiologis.
- Pada anak dengan meningitis, waktu paruh 4,6 jam (50 mg/kg IV) dan 4,3 jam (75 mg/kg IV).
- Pada anak dengan meningitis, kadar di cairan serebrospinal dengan meninges meradang adalah 5,6 dan 6,4 mcg/mL.

**Farmakodinamik** (label seftriakson)

- Agen bakterisidal yang bekerja dengan menghambat sintesis dinding sel bakteri.
- Tetap aktif dengan adanya sebagian beta-laktamase (penisilinase dan sefalosporinase) dari bakteri Gram-negatif dan Gram-positif.

**Daftar pustaka**: [P1], [P2], [L4]

---

### 4.5 Gentamisin

**Kalkulator BB**

| Rute | Regimen menurut IDAI | Contoh | Sumber |
|---|---|---|---|
| IV, IM: anak, infeksi berat | 3–7,5 mg/kg/hari dalam 3 dosis. Kolom infeksi ringan–sedang: "Tidak cocok". | BB 10 kg: 30–75 mg/hari, yaitu 10–25 mg/kali tiap 8 jam | IDAI hlm. 11 |
| IV: neonatus | IV drip dalam 30 menit; dosis dan interval menurut tabel di bawah | BB 3 kg, UK ≥35 minggu: 4 mg/kg = 12 mg tiap 24 jam | IDAI hlm. 30–31 |
| Topikal (mata) | Sediaan ada di FORNAS; dosis belum tersedia dari sumber | – | – |

Keterangan IDAI untuk golongan aminoglikosida: "dosis dan frekuensi individual berdasarkan analisis konsentrasi serum".

Tabel neonatus (IDAI hlm. 31):

| Umur kehamilan (minggu) | Umur pascanatal (hari) | Dosis (mg/kg) | Interval (jam) |
|---|---|---|---|
| ≤29 | 0–7 | 5 | 48 |
| ≤29 | 8–28 | 4 | 36 |
| ≤29 | ≥29 | 4 | 24 |
| 30–34 | 0–7 | 4,5 | 36 |
| 30–34 | ≥8 | 4 | 24 |
| ≥35 | semua | 4 | 24 |

Konversi mL dengan injeksi 40 mg/mL:

- 10–25 mg = 0,25–0,63 mL.
- 12 mg = 0,3 mL.

Tabel penyesuaian dosis penyakit ginjal (IDAI hlm. 83):

- Dosis normal tertulis 2–2,5 mg/kg/dosis tiap 8 jam iv. Penyesuaian dengan dosis dan interval.
- LFG >50: 60–90%. LFG 10–50: 30–70%. LFG <10: 20–30%.
- HD: ½ dosis penuh sesudah dialisis. PD: 3–4 mg/L/hari.

**Sediaan** (FORNAS 2025)

- Injeksi 40 mg/mL (hlm. 32).
- Salep mata 0,3% (hlm. 172).
- Tetes mata 0,3% dan tetes mata 1% (hlm. 173).

**Aturan penggunaan**

- Anak: dosis harian dibagi 3 (IDAI hlm. 11).
- Neonatus: IV drip dalam 30 menit dengan interval sesuai tabel (IDAI hlm. 30–31).
- Dosis dan frekuensi disesuaikan dengan kadar serum (IDAI hlm. 11).
- Label: hindari kadar puncak yang lama di atas 12 mcg/mL dan kadar lembah di atas 2 mcg/mL.

**Manfaat obat** (label gentamisin injeksi)

Efektif pada:

- sepsis neonatal bakterial dan septikemia bakterial;
- infeksi bakteri serius pada susunan saraf pusat (meningitis);
- infeksi saluran kemih, saluran napas, dan saluran cerna (termasuk peritonitis);
- infeksi kulit, tulang, dan jaringan lunak (termasuk luka bakar).

Aminoglikosida tidak diindikasikan untuk episode awal infeksi saluran kemih tanpa komplikasi, kecuali kuman penyebab peka dan tidak peka terhadap antibiotik lain yang kurang toksik.

**Efek samping dan peringatan penting** (label gentamisin, peringatan berbingkai)

- Pasien yang mendapat aminoglikosida perlu diawasi ketat karena potensi toksisitasnya.
- Berpotensi nefrotoksik. Risikonya lebih besar pada gangguan fungsi ginjal, dosis tinggi, atau terapi lama.
- Neurotoksisitas berupa ototoksisitas vestibular maupun auditori, terutama pada pasien dengan kerusakan ginjal sebelumnya. Juga dapat terjadi pada fungsi ginjal normal dengan dosis lebih tinggi atau lebih lama dari anjuran.

**Farmakokinetik** (label gentamisin)

- Setelah injeksi IM, kadar puncak serum biasanya tercapai dalam 30–60 menit dan masih terukur selama 6–8 jam.
- Ikatan protein rendah (0–30%, tergantung metode).
- Pada fungsi ginjal normal, umumnya ≥70% dosis ditemukan di urin dalam 24 jam.
- Hampir tidak mengalami metabolisme dan dikeluarkan terutama melalui filtrasi glomerulus.

**Farmakodinamik** (label gentamisin)

- Aminoglikosida yang berikatan dengan ribosom prokariot dan menghambat sintesis protein bakteri yang peka.
- Bakterisidal in vitro terhadap bakteri Gram-positif dan Gram-negatif.

**Daftar pustaka**: [P1], [P2], [L5]

---

### 4.6 Ondansetron

**Kalkulator BB**

| Rute | Regimen menurut IDAI | Contoh BB 10 kg | Sumber |
|---|---|---|---|
| IV: profilaksis | 0,15 mg/kg IV | 1,5 mg | IDAI hlm. 66 |
| IV: terapi | 0,2 mg/kg IV dalam 5 menit | 2 mg | IDAI hlm. 66 |
| Kemoterapi | 0,15 mg/kg (maks 16 mg), tiap 4 jam, 3 dosis. Rute tidak disebutkan. | 1,5 mg/kali × 3 | IDAI hlm. 66 |
| Oral | 0,1–0,2 mg/kg, tiap 6–12 jam | 1–2 mg/kali | IDAI hlm. 66 |

Konversi mL:

- Injeksi 2 mg/mL: 1,5 mg = 0,75 mL; 2 mg = 1,0 mL.
- Sirup 4 mg/5 mL (0,8 mg/mL): 1–2 mg = 1,3–2,5 mL.

Penyesuaian pada gangguan ginjal (IDAI hlm. 87): dosis 100% pada semua tingkat LFG. HD dan PD: "Tak ada data".

**Sediaan** (FORNAS 2025 hlm. 190–191)

| Sediaan | Peresepan maksimal |
|---|---|
| Tablet 4 mg | maks 3 tab/hari pascakemoterapi atau pascaradioterapi, maks 5 hari |
| Tablet 8 mg | – |
| Sirup 4 mg/5 mL | maks 1 botol pascakemoterapi atau pascaradioterapi |
| Injeksi 2 mg/mL | 1 ampul sebelum kemoterapi |

Restriksi FORNAS:

- Tablet dan sirup: pencegahan mual dan muntah pada kemoterapi dan radioterapi; tidak untuk dispepsia.
- Injeksi: mencegah muntah pada kemoterapi yang *highly emetogenic*, serta pencegahan dan pengobatan mual-muntah pascaoperasi.

**Aturan penggunaan**

- Sesuai tabel IDAI di atas.
- Pemberian terapi IV dalam 5 menit (IDAI hlm. 66).

**Manfaat obat** (label ondansetron tablet)

Pencegahan mual dan muntah yang berkaitan dengan:

- kemoterapi kanker *highly emetogenic*, termasuk sisplatin ≥50 mg/m²;
- kemoterapi *moderately emetogenic*, baik pemberian awal maupun ulang;
- radioterapi: iradiasi seluruh tubuh, fraksi tunggal dosis tinggi ke abdomen, atau fraksi harian ke abdomen;
- pascaoperasi.

**Efek samping** (label ondansetron tablet)

- Pada dewasa yang mendapat kemoterapi, efek samping paling sering (≥5%): sakit kepala, malaise/kelelahan, konstipasi, dan diare.
- Data efek samping khusus anak tidak tercantum pada label tablet yang dipakai.

**Peringatan penting** (label ondansetron)

- Reaksi hipersensitivitas.
- Pemanjangan interval QT.
- Sindrom serotonin.
- Iskemia miokard.
- Dapat menutupi ileus progresif dan distensi lambung.

**Farmakokinetik** (label ondansetron tablet)

- Diserap dari saluran cerna dan mengalami sebagian metabolisme lintas pertama.
- Bioavailabilitas rata-rata tablet 8 mg sekitar 56%. Bioavailabilitas sedikit meningkat dengan adanya makanan.
- Ikatan protein plasma 70–76% dan juga tersebar ke eritrosit.
- Dimetabolisme secara luas. Sekitar 5% dosis ditemukan di urin dalam bentuk asal.

**Farmakodinamik** (label ondansetron tablet)

- Antagonis selektif reseptor 5-HT3 dan bukan antagonis reseptor dopamin.
- Reseptor 5-HT3 terdapat di perifer (ujung saraf vagus) dan di sentral (*chemoreceptor trigger zone* area postrema). Belum pasti apakah efek antiemetiknya bekerja di sentral, perifer, atau keduanya.
- Kemoterapi sitotoksik tampaknya berkaitan dengan pelepasan serotonin dari sel enterokromafin usus halus. Serotonin itu dapat merangsang aferen vagus melalui reseptor 5-HT3 dan memicu refleks muntah.

**Daftar pustaka**: [P1], [P2], [L6]

---

### 4.7 Deksametason

**Kalkulator BB**

| Rute | Regimen menurut IDAI | Contoh BB 10 kg | Sumber |
|---|---|---|---|
| IV / oral | 0,1–0,25 mg/kg/kali, tiap 6 jam | 1–2,5 mg/kali; 4–10 mg/hari | IDAI hlm. 46 |
| Oral: leukemia akut | 60 mg/m²/hari terbagi dalam beberapa dosis oral; fase induksi 6 minggu *tap off*, reinduksi 4 minggu *tap off* | Tidak dihitung (mg/m², lihat 2.4) | IDAI hlm. 46 |

Konversi:

- Injeksi 5 mg/mL: 1–2,5 mg = 0,2–0,5 mL.
- Tablet 0,5 mg: 1–2,5 mg setara 2–5 tablet (informasi saja).

Keterangan IDAI:

- Deksametason tidak memiliki efek mineralokortikoid.
- 1 mg setara 25 mg hidrokortison dalam efek glukokortikoid.

Penyesuaian pada gangguan ginjal (IDAI hlm. 81): dosis 100% pada semua tingkat LFG. HD dan PD: "tak ada data".

**Sediaan** (FORNAS 2025)

- Injeksi 5 mg/mL (hlm. 17, 189).
- Tablet 0,5 mg (hlm. 109 dan hlm. 148 pada kelas kortikosteroid).
- Pada hlm. 189 (kelas antiemetik), FORNAS menulis restriksi "hanya untuk menyertai terapi antineoplastik".

**Aturan penggunaan**

- Tiap 6 jam, IV atau per oral (IDAI hlm. 46).
- Label tablet: kebutuhan dosis bervariasi dan harus disesuaikan dengan penyakit dan respons pasien. Setelah respons baik, dosis diturunkan bertahap sampai dosis terendah yang masih efektif.

**Manfaat obat** (label deksametason tablet dan injeksi)

Kelompok indikasi pada label:

- keadaan alergi berat yang tidak teratasi dengan terapi konvensional, seperti asma, dermatitis atopik, dermatitis kontak, reaksi hipersensitivitas obat, rinitis alergi, dan *serum sickness*;
- gangguan endokrin, reumatik, penyakit kolagen, kulit, mata, saluran cerna, saluran napas, hematologi, neoplastik, keadaan edema, dan sistem saraf (misalnya edema serebri), sesuai pengelompokan label injeksi.

Label tablet: bukti efikasi dan keamanan pada anak tersedia dari studi publikasi untuk sindrom nefrotik (>2 tahun) serta limfoma dan leukemia agresif (>1 bulan).

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

- Anak perlu dipantau tekanan darah, berat badan, tinggi badan, dan tekanan intraokular.
- Anak juga perlu dievaluasi klinis untuk infeksi, gangguan psikososial, tromboemboli, ulkus peptikum, katarak, dan osteoporosis.
- Kortikosteroid lewat rute apa pun dapat menurunkan kecepatan pertumbuhan anak.

**Farmakokinetik**

- Label tablet: glukokortikoid mudah diserap dari saluran cerna.
- Data kuantitatif (waktu paruh, ikatan protein, eliminasi) **tidak tercantum pada label yang dipakai**. Perlu sumber tambahan; lihat 3.5.

**Farmakodinamik** (label deksametason tablet)

- Glukokortikoid menimbulkan berbagai efek metabolik dan memodifikasi respons imun tubuh terhadap berbagai rangsangan.
- Analog sintetis seperti deksametason terutama dipakai untuk efek antiinflamasinya.
- Pada dosis antiinflamasi yang setara, deksametason hampir tidak memiliki sifat retensi natrium seperti hidrokortison.

**Daftar pustaka**: [P1], [P2], [L7], [L8]

---

### 4.8 Asiklovir

**Kalkulator BB**

| Rute | Regimen menurut IDAI | Contoh BB 10 kg | Sumber |
|---|---|---|---|
| IV: varicella zoster (cacar air) | 10–15 mg/kg/dosis tiap 8 jam selama 5–10 hari | 100–150 mg/kali; 300–450 mg/hari | IDAI hlm. 29 dan 37 |
| IV: HSV | 20 mg/kg/dosis tiap 8 jam selama 14–21 hari | 200 mg/kali; 600 mg/hari | IDAI hlm. 29 dan 37 |
| Oral / IV: HSV gingivostomatitis pada HIV | 20 mg/kg per oral tiap 8 jam, atau 5–10 mg/kg IV tiap 8 jam, selama 7–14 hari | Oral 200 mg/kali; IV 50–100 mg/kali | IDAI hlm. 37 |
| IV: HSV diseminata atau ensefalitis pada HIV | 10 mg/kg IV tiap 8 jam, atau 500 mg/m² tiap 8 jam, selama 21 hari | 100 mg/kali | IDAI hlm. 37 |
| IV: varisela pada HIV | 10 mg/kg IV tiap 8 jam, atau 500 mg/m² IV tiap 8 jam, selama 7 hari. Per oral hanya pada imunosupresi ringan. | 100 mg/kali | IDAI hlm. 37 |
| Oral: herpes zoster pada HIV | 20 mg/kg (maks 800 mg/dosis) tiap 6 jam selama 7 hari | 200 mg/kali; 800 mg/hari | IDAI hlm. 37 |
| Topikal (krim 5%) | Dosis belum tersedia dari IDAI. Label Zovirax: oles 5 kali sehari selama 4 hari, untuk usia ≥12 tahun. | – | Label [L11] |

Untuk regimen oral 200 mg/kali, tablet 200 mg setara 1 tablet (informasi saja). Serbuk injeksi 250 mg tidak dikonversi ke mL.

Tabel penyesuaian dosis penyakit ginjal (IDAI hlm. 76), dosis normal tertulis 10 mg/kg/dosis tiap 8 jam iv (ensefalitis, varisela, imunokompromais):

- LFG >50: 5 mg/kg tiap 8 jam.
- LFG 10–50: 5 mg/kg tiap 12–24 jam.
- LFG <10: 2,5 mg/kg tiap 24 jam.
- HD: dosis sesudah dialisis. PD: dosis untuk FG <10.
- **Perlu konfirmasi pemilik:** baris LFG >50 tertulis 5 mg/kg, lebih rendah dari dosis normal 10 mg/kg. Draf menyalin apa adanya.

**Sediaan** (FORNAS 2025)

- Tablet 200 mg, tablet 400 mg, dan serbuk injeksi 250 mg (hlm. 53).
- Krim 5% (hlm. 168).
- Salep mata 3%, hanya untuk kasus keratitis herpetiformis (hlm. 172).

**Aturan penggunaan**

- Interval dan lama pemberian sesuai tabel IDAI di atas.
- Label injeksi: kenaikan kreatinin atau BUN lebih sering terjadi setelah infus IV cepat (kurang dari 10 menit).

**Manfaat obat** (label asiklovir)

- Tablet:
  - pengobatan akut herpes zoster;
  - pengobatan episode awal dan penanganan episode berulang herpes genitalis;
  - pengobatan cacar air (varisela).
- Injeksi:
  - herpes simpleks mukosa dan kulit (HSV-1, HSV-2), awal maupun berulang, pada pasien imunokompromais;
  - episode awal berat herpes genitalis pada pasien imunokompeten;
  - ensefalitis herpes simpleks;
  - infeksi herpes neonatal;
  - infeksi varicella-zoster pada pasien imunokompromais.
- Krim: herpes labialis berulang pada dewasa dan remaja usia ≥12 tahun yang imunokompeten.

**Efek samping** (label asiklovir)

- Oral, cacar air (dosis 10–20 mg/kg 4 kali sehari selama 5–7 hari, atau 800 mg 4 kali sehari selama 5 hari): efek samping tersering adalah diare (3,2%).
- Oral, herpes genitalis jangka pendek: mual dan/atau muntah (2,7%).
- Injeksi:
  - inflamasi atau flebitis di tempat suntikan pada sekitar 9% pasien;
  - kenaikan sementara kreatinin serum atau BUN pada 5–10% pasien, lebih sering setelah infus cepat.
- Krim:
  - tersering adalah reaksi kulit lokal di tempat pengolesan;
  - angioedema, anafilaksis, dermatitis kontak, dan eksim pernah dilaporkan.

**Peringatan penting** (label asiklovir)

- Kontraindikasi: hipersensitivitas terhadap asiklovir atau valasiklovir.

**Farmakokinetik** (label asiklovir)

- Oral:
  - ikatan protein plasma 9–33%;
  - waktu paruh 2,5–3,3 jam;
  - bioavailabilitas oral rata-rata 10–20%, makin rendah pada dosis lebih tinggi;
  - makanan tidak memengaruhi penyerapan.
- Pada anak umur 7 bulan–7 tahun, waktu paruh rata-rata setelah dosis oral 300–600 mg/m² adalah 2,6 jam (rentang 1,59–3,74 jam). Secara umum, farmakokinetik pada anak mirip dewasa.
- Waktu paruh dan klirens bergantung pada fungsi ginjal.
- Injeksi: kadar plasma sebanding dengan dosis.
- Krim: penyerapan sistemik pada dewasa minimal. Belum dievaluasi pada usia <18 tahun.

**Farmakodinamik** (label asiklovir)

- Analog nukleosida purin sintetis dengan aktivitas hambat terhadap HSV-1, HSV-2, dan VZV.
- Selektif karena afinitasnya terhadap enzim timidin kinase virus. Enzim ini mengubah asiklovir menjadi monofosfat, lalu enzim sel mengubahnya menjadi difosfat dan trifosfat.
- Asiklovir trifosfat menghentikan replikasi DNA virus herpes dengan 3 cara:
  1. hambatan kompetitif DNA polimerase virus;
  2. inkorporasi dan terminasi rantai DNA virus;
  3. inaktivasi DNA polimerase virus.

**Daftar pustaka**: [P1], [P2], [L9], [L10], [L11]

---

## 5. Temuan pada sumber yang perlu dicek pemilik atau dokter

1. **Parasetamol rektal** (IDAI hlm. 35): batas tertulis "maks 5 g/hari", bukan dalam mg/kg. Draf menyalin apa adanya.
2. **Parasetamol** di tabel penyesuaian ginjal (IDAI hlm. 76): kolom LFG >50 tertulis "q4 jam", padahal dosis normal tertulis tiap 4–6 jam.
3. **Asiklovir** di tabel penyesuaian ginjal (IDAI hlm. 76): kolom LFG >50 tertulis 5 mg/kg, lebih rendah dari dosis normal 10 mg/kg.
4. **Amoksisilin** (IDAI hlm. 21): perlu dipastikan apakah "maksimal 4 g/hari" berlaku untuk semua regimen.
5. **Ibuprofen**: IDAI tidak memuat dosis analgesik/antipiretik di "Daftar Dosis Obat"; hanya dosis duktus arteriosus paten (hlm. 54). Dosis oral diambil dari kolom "dosis normal" pada tabel penyesuaian ginjal (hlm. 84). Dosis maksimal tidak tercantum.
6. **Rute tanpa dosis IDAI**, padahal sediaannya ada di FORNAS:
   - ibuprofen injeksi;
   - gentamisin tetes atau salep mata;
   - asiklovir krim dan salep mata.
   - Perlu keputusan: dibiarkan kosong, atau diisi dari label resmi atau sumber lain dengan tanda khusus.
7. **Parasetamol injeksi** tidak ada di IDAI 2016 maupun FORNAS 2025, sehingga tidak dicantumkan.

---

## 6. Daftar pustaka

**Sumber primer**

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
- **[L11]** ZOVIRAX (acyclovir) cream 5%. Versi 10, efektif 1 Feb 2021. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=125dbe4e-94ba-45bd-a714-f9c4b8e8b5c2

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
