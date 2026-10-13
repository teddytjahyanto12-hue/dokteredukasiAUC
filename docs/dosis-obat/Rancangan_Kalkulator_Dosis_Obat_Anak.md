# Kalkulator Dosis Obat Anak

Draf 0.4, 13 Oktober 2026. Materi untuk ditinjau pemilik; belum diterapkan di website.

---

## 1. Kerangka fitur

### 1.1 Navigasi

- Tombol **"Dosis Obat"** di header, di sebelah "Kalkulator Medis".
- Pilihan di dalamnya:
  1. Kalkulator Dosis Obat Anak
  2. Kalkulator Dosis Obat Dewasa
  3. Kalkulator Dosis Obat Kegawatdaruratan

### 1.2 Halaman daftar obat anak

- Pencarian nama generik.
- Daftar abjad dengan label rute yang tersedia (Oral, Injeksi, Topikal, Rektal).
- Filter kelas terapi sesuai FORNAS 2025.

### 1.3 Halaman satu obat

1. Isian **berat badan (kg)**. Umur kehamilan dan umur pascanatal diminta bila regimen memakai tabel neonatus.
2. Tab rute dalam satu halaman: **Oral | Injeksi | Topikal | Rektal**. Hanya rute yang punya dosis yang ditampilkan.
3. Kartu hasil untuk setiap regimen:
   - indikasi atau keadaan, sesuai tulisan sumber;
   - **dosis per kali** dan **dosis per hari**;
   - dosis berupa rentang ditampilkan sebagai rentang; dokter yang memilih;
   - interval dan lama pemberian;
   - batas maksimal bila tertulis di sumber;
   - konversi ke mL untuk sediaan cair dan injeksi berkekuatan mg/mL;
   - sumber dan halaman.
4. Bagian berikut: Sediaan, Aturan penggunaan, Manfaat obat, Efek samping, Peringatan, Farmakokinetik, Farmakodinamik, Daftar pustaka.

## 2. Aturan perhitungan

| Jenis dosis di sumber | Cara hitung |
|---|---|
| mg/kg per kali, dengan interval | per kali = dosis × BB; per hari = per kali × (24 ÷ interval) |
| mg/kg per hari dibagi n dosis | per hari = dosis × BB; per kali = per hari ÷ n |
| mg/kg sekali sehari | per kali = per hari = dosis × BB |
| Dosis pertama lalu dosis lanjutan | dua hasil: dosis pertama dan dosis berikutnya |
| Tabel neonatus | baris dipilih menurut umur kehamilan dan umur pascanatal, lalu dosis × BB |

- Batas maksimal dipakai bila tertulis di sumber. Bila hasil hitung melebihi batas, yang ditampilkan adalah angka batas.
- Konversi: mL = mg ÷ kekuatan sediaan (mg/mL). Contoh kekuatan: sirup 120 mg/5 mL = 24 mg/mL.

---

## 3. Monografi obat

### 3.1 Parasetamol (Acetaminofen)

**Kalkulator berat badan**

| Rute | Dosis | Sumber |
|---|---|---|
| Oral | 20 mg/kg, kemudian 15 mg/kg/kali, po, tiap 4 jam (maks 90 mg/kg/hari) | IDAI hlm. 35 |
| Rektal | 40 mg/kg, kemudian 30 mg/kg/kali, rektal, tiap 6 jam (maks 5 g/hari) | IDAI hlm. 35 |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 76)

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 10–15 mg/kg/dosis q4–6 jam po | I | q4 jam | q6 jam | q8 jam | tak ada | tak ada |

**Sediaan** (FORNAS 2025 hlm. 13)

| Sediaan | Peresepan maksimal |
|---|---|
| Tablet 500 mg | 180 tab/bulan |
| Sirup 120 mg/5 mL | 2 botol/kasus |
| Drops 100 mg/mL | 1 botol/kasus |

**Aturan penggunaan**

- Oral: 20 mg/kg, kemudian 15 mg/kg/kali tiap 4 jam; maks 90 mg/kg/hari (IDAI).
- Rektal: 40 mg/kg, kemudian 30 mg/kg/kali tiap 6 jam; maks 5 g/hari (IDAI).
- Dosis maksimal harian dihitung dari semua rute (intravena, oral, rektal) dan semua produk yang mengandung parasetamol (label Ofirmev).

**Manfaat obat** (label Ofirmev)

- Nyeri ringan sampai sedang pada dewasa dan anak usia 2 tahun ke atas.
- Nyeri sedang sampai berat bersama analgesik opioid pada dewasa dan anak usia 2 tahun ke atas.
- Menurunkan demam pada dewasa dan anak.

**Efek samping** (label Ofirmev)

- Anak (≥5%): mual, muntah, konstipasi, pruritus.
- Dewasa (≥5% dan lebih sering daripada plasebo): mual, muntah, sakit kepala, insomnia.

**Peringatan** (label Ofirmev)

- Melebihi dosis maksimal harian per kg dapat menyebabkan cedera hati, termasuk gagal hati dan kematian.
- Reaksi kulit serius.
- Alergi dan hipersensitivitas.

**Farmakokinetik** (label Ofirmev)

- Ikatan protein plasma pada kadar terapeutik rendah (10–25%).
- Tersebar luas di sebagian besar jaringan tubuh kecuali lemak.
- Dimetabolisme terutama di hati melalui konjugasi glukuronida, konjugasi sulfat, dan oksidasi oleh sitokrom P450 (terutama CYP2E1) menjadi metabolit reaktif NAPQI. Pada dosis terapeutik, NAPQI cepat dikonjugasi dengan glutation.
- Metabolit dikeluarkan terutama lewat urin. Kurang dari 5% keluar di urin sebagai parasetamol bebas; lebih dari 90% dosis dikeluarkan dalam 24 jam.

**Farmakodinamik** (label Ofirmev)

- Mekanisme pasti efek analgesik dan antipiretik belum diketahui; diduga terutama melalui kerja sentral.
- Memiliki aktivitas analgesik dan antipiretik pada studi hewan dan manusia.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. OFIRMEV (acetaminophen) injection, label FDA. DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=9a38f63a-8852-6dab-e053-2a95a90a90d6

---

### 3.2 Ibuprofen

**Kalkulator berat badan**

| Rute | Dosis | Sumber |
|---|---|---|
| Oral | 5–10 mg/kg/dosis q4–8 jam po | IDAI hlm. 84 |
| Neonatus (duktus arteriosus paten) | Hari pertama: 10 mg/kg sekali sehari; hari kedua dan ketiga 5 mg/kg sekali sehari | IDAI hlm. 54 |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 84)

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 5–10 mg/kg/dosis q4–8 jam po | D | 100% | 100% | 100% | tak ada | tak ada |

**Sediaan** (FORNAS 2025 hlm. 12)

| Sediaan | Peresepan maksimal |
|---|---|
| Tablet 200 mg | 30 tab/bulan |
| Tablet 400 mg | Nyeri akut: 14 tab/kasus. Nyeri kronis: 60 tab/bulan |
| Suspensi 100 mg/5 mL | 1 botol/kasus |
| Suspensi 200 mg/5 mL | 1 botol/kasus |

**Aturan penggunaan**

- Oral: 5–10 mg/kg/dosis tiap 4–8 jam (IDAI).
- Duktus arteriosus paten: hari pertama 10 mg/kg sekali sehari, hari kedua dan ketiga 5 mg/kg sekali sehari (IDAI).
- Gunakan dosis efektif terendah dalam waktu sesingkat mungkin sesuai tujuan terapi tiap pasien (label Caldolor).

**Manfaat obat**

- Dewasa dan anak usia 3 bulan ke atas (label Caldolor):
  - nyeri ringan sampai sedang, termasuk nyeri pascaoperasi;
  - nyeri sedang sampai berat, termasuk nyeri pascaoperasi, sebagai tambahan analgesik opioid;
  - menurunkan demam.
- Penutupan duktus arteriosus paten yang bermakna secara klinis pada bayi prematur (label NeoProfen).

**Efek samping** (label Caldolor)

- Anak (≥2%): nyeri di tempat infus, muntah, mual, anemia, sakit kepala.

**Peringatan** (label Caldolor)

- OAINS meningkatkan risiko kejadian trombotik kardiovaskular serius, termasuk infark miokard dan stroke, yang dapat fatal. Risiko dapat muncul sejak awal pengobatan dan dapat meningkat dengan lamanya penggunaan.
- Kontraindikasi pada operasi bypass arteri koroner (CABG).
- OAINS meningkatkan risiko efek samping gastrointestinal serius, termasuk perdarahan, ulserasi, dan perforasi.

**Farmakokinetik** (label Caldolor)

- Waktu paruh eliminasi pada anak lebih pendek dibanding dewasa.
- Dewasa: waktu paruh rata-rata 2,22 jam (400 mg) dan 2,44 jam (800 mg).
- Ikatan protein tinggi (>99% pada 20 mcg/mL); ikatan dapat jenuh dan tidak linear pada kadar >20 mcg/mL.
- Berdasarkan data pemberian oral, volume distribusi berubah menurut usia atau demam.

**Farmakodinamik** (label Caldolor)

- Memiliki sifat analgesik, antiinflamasi, dan antipiretik.
- Mekanisme kerja, seperti OAINS lain, belum sepenuhnya dipahami; melibatkan hambatan siklooksigenase (COX-1 dan COX-2).
- Penghambat kuat sintesis prostaglandin in vitro.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. CALDOLOR (ibuprofen injection), label FDA. DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=1eaa7790-f1a1-4f51-b10a-cbbaf033f684
4. NEOPROFEN (ibuprofen lysine) injection, label FDA. DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=6f5ede6f-b0b7-4fc8-969e-652f60ead047

---

### 3.3 Amoksisilin

**Kalkulator berat badan** (IDAI hlm. 21, tabel antimikroba; dosis per kg per hari)

| Rute | Infeksi ringan–sedang | Infeksi berat | Keterangan |
|---|---|---|---|
| PO | 40–45 mg dalam 3 dosis (dosis harian dewasa, 750 mg–2 g) | Dosis tinggi untuk terapi menurun oral invasif, infeksi non-OMA: 80–90 mg dalam 3 dosis | 150 mg/kg/hari untuk penisilin resisten *S. pneumoniae*. Maksimal 4 g/hari. Profilaksis endokarditis bakterialis pada pasien PJB: 50 mg/kg oral dosis tunggal, diberikan 30 menit–1 jam sebelum tindakan |

**Sediaan** (FORNAS 2025 hlm. 23)

| Sediaan | Peresepan maksimal |
|---|---|
| Tablet 250 mg | 10 hari |
| Tablet 500 mg | 10 hari |
| Drops 100 mg/mL | 1 botol/kasus |
| Sirup kering 125 mg/5 mL | 1 botol/kasus |
| Sirup kering 250 mg/5 mL | 1 botol/kasus |

**Aturan penggunaan** (IDAI)

- Dosis harian dibagi 3 dosis.
- Profilaksis endokarditis: dosis tunggal 30 menit–1 jam sebelum tindakan.

**Manfaat obat** (label amoksisilin)

- Infeksi telinga, hidung, dan tenggorokan.
- Infeksi saluran genitourinaria.
- Infeksi kulit dan struktur kulit.
- Infeksi saluran napas bawah.
- Terapi eradikasi *H. pylori* (dewasa).

**Efek samping** (label amoksisilin)

- Paling sering (>1%): diare, ruam, muntah, mual.

**Peringatan** (label amoksisilin)

- Kontraindikasi: riwayat reaksi hipersensitivitas serius (misalnya anafilaksis atau sindrom Stevens-Johnson) terhadap amoksisilin atau beta-laktam lain (penisilin, sefalosporin).
- Reaksi anafilaksis, reaksi kulit berat (SCAR), dan *drug-induced enterocolitis syndrome*.

**Farmakokinetik** (label amoksisilin)

- Stabil dalam asam lambung dan cepat diserap setelah pemberian oral.
- Kadar puncak dalam darah 1–2 jam setelah kapsul 250 mg dan 500 mg.
- Sekitar 20% terikat protein serum.
- Waktu paruh 61,3 menit.
- Sekitar 60% dosis oral dikeluarkan di urin dalam 6–8 jam, sebagian besar dalam bentuk tidak berubah; ekskresi dapat diperlambat oleh probenesid.

**Farmakodinamik** (label amoksisilin)

- Bakterisidal seperti penisilin terhadap bakteri peka selama fase multiplikasi aktif.
- Bekerja melalui hambatan biosintesis dinding sel yang menyebabkan kematian bakteri.
- Resistensi terutama diperantarai enzim beta-laktamase.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Amoxicillin tablets, for oral suspension, chewable tablets and capsules, label FDA. DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b07b5ac4-253e-4c83-91c3-3fdc46e91a0f

---

### 3.4 Seftriakson

**Kalkulator berat badan** (IDAI hlm. 15, tabel antimikroba; dosis per kg per hari)

| Rute | Infeksi ringan–sedang | Infeksi berat | Keterangan |
|---|---|---|---|
| IV, IM | 50–75 mg sehari sekali (maksimal 2 g/hari) | 100 mg/kg/hari dalam 2 dosis (maksimal 4 g) | Spektrum luas. Dosis yang lebih besar (sampai dengan yang digunakan untuk meningitis) cocok untuk pneumokokus pneumonia resisten penisilin. 50 mg/kg, IM, × 1–3 hari untuk OMA (sampai 1 g) |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 79)

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 25–50 mg/kg/dosis q12–24 jam iv, im | D | 100% | 100% | 100% | dosis sesudah dialisis | 100% |

**Sediaan** (FORNAS 2025 hlm. 29)

| Sediaan | Peresepan maksimal |
|---|---|
| Injeksi 1.000 mg | 2 g/hari selama 7 hari. Untuk meningitis 4 g/hari selama 14 hari |

**Aturan penggunaan**

- Infeksi ringan–sedang: sehari sekali. Infeksi berat: dibagi 2 dosis. OMA: IM selama 1–3 hari (IDAI).
- Pada neonatus, dosis IV diberikan selama 60 menit untuk mengurangi risiko ensefalopati bilirubin (label seftriakson).

**Manfaat obat** (label seftriakson; infeksi oleh organisme yang peka)

- Infeksi saluran napas bawah.
- Otitis media akut bakterial.
- Infeksi kulit dan struktur kulit.
- Infeksi saluran kemih (dengan atau tanpa komplikasi).
- Gonore tanpa komplikasi.
- Penyakit radang panggul.
- Septikemia bakterial.
- Infeksi tulang dan sendi.
- Infeksi intraabdomen.
- Meningitis.
- Profilaksis bedah: dosis tunggal 1 g praoperasi pada tindakan tertentu.

**Efek samping** (label seftriakson)

- Reaksi lokal: nyeri di tempat suntikan (0,6%).
- Hipersensitivitas: ruam (1,7%).
- Hematologi: eosinofilia (6%), trombositosis (5,1%), leukopenia (2,1%).

**Peringatan** (label seftriakson, kontraindikasi)

- Hipersensitivitas terhadap seftriakson, eksipiennya, atau sefalosporin lain.
- Neonatus prematur sampai usia pascamenstruasi 41 minggu (usia kehamilan + usia kronologis).
- Neonatus dengan hiperbilirubinemia: seftriakson dapat menggeser bilirubin dari albumin sehingga berisiko ensefalopati bilirubin.
- Neonatus (≤28 hari) yang memerlukan larutan IV mengandung kalsium, termasuk infus kalsium kontinu seperti nutrisi parenteral, karena risiko presipitasi seftriakson-kalsium.

**Farmakokinetik** (label seftriakson)

- Dewasa sehat: waktu paruh eliminasi 5,8–8,7 jam.
- Terikat reversibel pada protein plasma: 95% pada kadar <25 mcg/mL, turun menjadi 85% pada 300 mcg/mL.
- 33–67% dosis dikeluarkan di urin dalam bentuk tidak berubah; sisanya disekresi ke empedu dan ditemukan di feses sebagai senyawa yang tidak aktif secara mikrobiologis.
- Anak dengan meningitis: waktu paruh 4,6 jam (50 mg/kg IV) dan 4,3 jam (75 mg/kg IV); kadar cairan serebrospinal dengan meninges meradang 5,6 dan 6,4 mcg/mL.

**Farmakodinamik** (label seftriakson)

- Bakterisidal dengan menghambat sintesis dinding sel bakteri.
- Aktif dengan adanya sebagian beta-laktamase (penisilinase dan sefalosporinase) dari bakteri Gram-negatif dan Gram-positif.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Ceftriaxone for Injection, USP, label FDA. DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=8351aa37-552d-471d-b293-c564dcb6ec29

---

### 3.5 Gentamisin

**Kalkulator berat badan**

| Rute | Dosis | Sumber |
|---|---|---|
| IV, IM: infeksi ringan–sedang | Tidak cocok | IDAI hlm. 11 |
| IV, IM: infeksi berat | 3–7,5 mg/kg/hari dalam 3 dosis | IDAI hlm. 11 |
| IV: neonatus | IV drip dalam 30 menit; dosis dan interval menurut tabel neonatus | IDAI hlm. 30–31 |

Keterangan golongan aminoglikosida (IDAI hlm. 11): dosis dan frekuensi individual berdasarkan analisis konsentrasi serum.

**Tabel neonatus** (IDAI hlm. 31)

| Umur kehamilan (pascakonsepsi), minggu | Umur pascanatal, hari | Dosis (mg/kg) | Interval (jam) |
|---|---|---|---|
| ≤29 | 0–7 | 5 | 48 |
| ≤29 | 8–28 | 4 | 36 |
| ≤29 | ≥29 | 4 | 24 |
| 30–34 | 0–7 | 4,5 | 36 |
| 30–34 | ≥8 | 4 | 24 |
| ≥35 | Semua | 4 | 24 |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 83)

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 2–2,5 mg/kg/dosis q8 jam iv | D, I | 60–90% | 30–70% | 20–30% | ½ dosis penuh sesudah dialisis | 3–4 mg/L/hari |

**Sediaan** (FORNAS 2025 hlm. 32)

| Sediaan |
|---|
| Injeksi 40 mg/mL |

**Aturan penggunaan**

- Anak: dosis harian dibagi 3 dosis (IDAI).
- Neonatus: IV drip dalam 30 menit dengan interval sesuai tabel (IDAI).
- Dosis dan frekuensi individual berdasarkan analisis konsentrasi serum (IDAI).
- Hindari kadar puncak yang lama di atas 12 mcg/mL dan kadar lembah di atas 2 mcg/mL (label gentamisin).

**Manfaat obat** (label gentamisin)

- Sepsis neonatal bakterial dan septikemia bakterial.
- Infeksi bakteri serius pada susunan saraf pusat (meningitis).
- Infeksi saluran kemih, saluran napas, dan saluran cerna (termasuk peritonitis).
- Infeksi kulit, tulang, dan jaringan lunak (termasuk luka bakar).
- Aminoglikosida tidak diindikasikan untuk episode awal infeksi saluran kemih tanpa komplikasi, kecuali kuman penyebab peka dan tidak peka terhadap antibiotik lain yang potensi toksisitasnya lebih rendah.

**Efek samping dan peringatan** (label gentamisin, peringatan berbingkai)

- Pasien yang mendapat aminoglikosida perlu diawasi ketat karena potensi toksisitasnya.
- Berpotensi nefrotoksik; risiko lebih besar pada gangguan fungsi ginjal, dosis tinggi, atau terapi lama.
- Neurotoksisitas berupa ototoksisitas vestibular maupun auditori, terutama pada kerusakan ginjal sebelumnya, dan pada fungsi ginjal normal dengan dosis lebih tinggi atau lebih lama dari anjuran.

**Farmakokinetik** (label gentamisin)

- Setelah injeksi IM, kadar puncak serum biasanya dalam 30–60 menit dan masih terukur selama 6–8 jam.
- Ikatan protein rendah (0–30%, tergantung metode).
- Pada fungsi ginjal normal, umumnya ≥70% dosis ditemukan di urin dalam 24 jam.
- Hampir tidak mengalami metabolisme; dikeluarkan terutama melalui filtrasi glomerulus.

**Farmakodinamik** (label gentamisin)

- Aminoglikosida yang berikatan dengan ribosom prokariot dan menghambat sintesis protein bakteri yang peka.
- Bakterisidal in vitro terhadap bakteri Gram-positif dan Gram-negatif.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Gentamicin Sulfate Injection, USP, label FDA. DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=977180b3-a222-4282-d485-4a3217674305

---

### 3.6 Ondansetron

**Kalkulator berat badan** (IDAI hlm. 66)

| Rute/keadaan | Dosis |
|---|---|
| Profilaksis | 0,15 mg/kg IV |
| Terapi | 0,2 mg/kg IV dalam 5 menit |
| Kemoterapi | 0,15 mg/kg (maks 16 mg), 4 jam, 3 dosis |
| Oral | 0,1–0,2 mg/kg, 6–12 jam |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 87)

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 0,1–0,2 mg/kg/dosis q6–12 jam po | D | 100% | 100% | 100% | Tak ada data | Tak ada data |

**Sediaan** (FORNAS 2025 hlm. 190–191)

| Sediaan | Peresepan maksimal |
|---|---|
| Tablet 4 mg | Maks 3 tab/hari pascakemoterapi atau pascaradioterapi, maks 5 hari |
| Tablet 8 mg | – |
| Sirup 4 mg/5 mL | Maks 1 botol pascakemoterapi atau pascaradioterapi |
| Injeksi 2 mg/mL | Diberikan 1 ampul sebelum kemoterapi |

Restriksi FORNAS:

- Tablet dan sirup: pencegahan mual dan muntah pada kemoterapi dan radioterapi; tidak untuk dispepsia.
- Injeksi: mencegah muntah pada kemoterapi yang *highly emetogenic*; pencegahan dan pengobatan mual muntah pascaoperasi.

**Aturan penggunaan**

- Sesuai tabel IDAI; dosis terapi diberikan IV dalam 5 menit (IDAI).
- Untuk kemoterapi, injeksi diencerkan dan diinfuskan selama 15 menit (label ondansetron injeksi).

**Manfaat obat** (label ondansetron tablet dan injeksi)

- Pencegahan mual dan muntah akibat kemoterapi kanker (*highly* dan *moderately emetogenic*).
- Pencegahan mual dan muntah akibat radioterapi (label tablet).
- Pencegahan mual dan/atau muntah pascaoperasi.

**Efek samping**

- Dewasa dengan kemoterapi (≥5%): sakit kepala, malaise/kelelahan, konstipasi, diare (label tablet).
- Anak pascaoperasi (dosis tunggal 0,1 mg/kg): angka efek samping serupa dengan plasebo; diare lebih sering pada umur 1–24 bulan (2% vs <1%) (label injeksi).

**Peringatan** (label ondansetron)

- Reaksi hipersensitivitas.
- Pemanjangan interval QT.
- Sindrom serotonin.
- Iskemia miokard.
- Dapat menutupi ileus progresif dan distensi lambung.
- Klirens pada bayi 1–4 bulan lebih lambat dan waktu paruh sekitar 2,5 kali lebih panjang dibanding bayi >4–24 bulan; pasien <4 bulan dianjurkan dipantau ketat (label injeksi).

**Farmakokinetik** (label ondansetron tablet)

- Diserap dari saluran cerna dan mengalami sebagian metabolisme lintas pertama.
- Bioavailabilitas rata-rata tablet 8 mg sekitar 56%; sedikit meningkat dengan adanya makanan.
- Ikatan protein plasma 70–76%; juga tersebar ke eritrosit.
- Dimetabolisme secara luas; sekitar 5% dosis ditemukan di urin dalam bentuk asal.

**Farmakodinamik** (label ondansetron tablet)

- Antagonis selektif reseptor 5-HT3; bukan antagonis reseptor dopamin.
- Reseptor 5-HT3 terdapat di perifer (ujung saraf vagus) dan di sentral (*chemoreceptor trigger zone* area postrema). Belum pasti apakah efek antiemetik bekerja di sentral, perifer, atau keduanya.
- Kemoterapi sitotoksik tampaknya berkaitan dengan pelepasan serotonin dari sel enterokromafin usus halus; serotonin dapat merangsang aferen vagus melalui reseptor 5-HT3 dan memicu refleks muntah.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Ondansetron tablets, label FDA. DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=14276805-4e99-4bbe-ad76-ffc06eddb38a
4. Ondansetron Injection, USP, label FDA. DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=6a11f61b-2318-4382-2b91-4366e4bb53fa

---

### 3.7 Deksametason

**Kalkulator berat badan** (IDAI hlm. 46)

| Rute/keadaan | Dosis |
|---|---|
| IV / per oral | 0,1–0,25 mg/kg/kali, 6 jam |
| Leukemia akut | 60 mg/m²/hari terbagi dalam dosis oral: fase induksi 6 minggu *tap off*; reinduksi 4 minggu *tap off* |

Keterangan IDAI: deksametason tidak memiliki efek mineralokortikoid; 1 mg = 25 mg hidrokortison dalam efek glukokortikoid.

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 81)

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 0,1–0,25 mg/kg/dosis q6 jam iv, po | D | 100% | 100% | 100% | tak ada data | tak ada data |

**Sediaan** (FORNAS 2025)

| Sediaan | Halaman FORNAS | Peresepan maksimal/restriksi |
|---|---|---|
| Injeksi 5 mg/mL | hlm. 17 | 20 mg/hari |
| Injeksi 5 mg/mL | hlm. 189 | Hanya untuk menyertai terapi antineoplastik |
| Tablet 0,5 mg | hlm. 109, 148 | – |

**Aturan penggunaan**

- Tiap 6 jam, IV atau per oral (IDAI).
- Kebutuhan dosis bervariasi dan disesuaikan dengan penyakit dan respons pasien. Setelah respons baik, dosis diturunkan bertahap sampai dosis terendah yang masih efektif (label tablet).

**Manfaat obat** (label deksametason tablet dan injeksi)

- Keadaan alergi berat yang tidak teratasi dengan terapi konvensional: asma, dermatitis atopik, dermatitis kontak, reaksi hipersensitivitas obat, rinitis alergi, *serum sickness*.
- Gangguan endokrin, reumatik, penyakit kolagen, kulit, mata, saluran cerna, saluran napas, hematologi, neoplastik, keadaan edema, dan sistem saraf (misalnya edema serebri).
- Pada anak, bukti efikasi dan keamanan dari studi publikasi tersedia untuk sindrom nefrotik (>2 tahun) serta limfoma dan leukemia agresif (>1 bulan) (label tablet).

**Efek samping** (label deksametason tablet; dilaporkan dengan deksametason atau kortikosteroid lain)

- Alergi: reaksi anafilaktoid, anafilaksis, angioedema.
- Kardiovaskular: antara lain hipertensi, edema, takikardia, gagal jantung kongestif, kardiomiopati hipertrofik pada bayi prematur.
- Kulit: antara lain akne, gangguan penyembuhan luka, striae, kulit tipis rapuh.
- Endokrin: antara lain hiperglikemia, keadaan cushingoid, supresi pertumbuhan pada anak.
- Cairan dan elektrolit: retensi cairan dan natrium, kehilangan kalium, alkalosis hipokalemik.
- Saluran cerna: antara lain ulkus peptikum dengan kemungkinan perforasi dan perdarahan, pankreatitis, nafsu makan meningkat.
- Muskuloskeletal: antara lain osteoporosis, miopati steroid, kelemahan otot.
- Neurologis/psikiatris: antara lain kejang, depresi, euforia, insomnia, peningkatan tekanan intrakranial (pseudotumor serebri).
- Mata: antara lain glaukoma, peningkatan tekanan intraokular, katarak subkapsular posterior.
- Lain-lain: antara lain penurunan daya tahan terhadap infeksi, *moon face*, kenaikan berat badan.

**Peringatan** (label deksametason tablet)

- Anak perlu dipantau tekanan darah, berat badan, tinggi badan, dan tekanan intraokular, serta dievaluasi klinis untuk infeksi, gangguan psikososial, tromboemboli, ulkus peptikum, katarak, dan osteoporosis.
- Kortikosteroid lewat rute apa pun dapat menurunkan kecepatan pertumbuhan anak.

**Farmakokinetik** (label deksametason tablet)

- Glukokortikoid mudah diserap dari saluran cerna.

**Farmakodinamik** (label deksametason tablet)

- Glukokortikoid menimbulkan berbagai efek metabolik dan memodifikasi respons imun tubuh terhadap berbagai rangsangan.
- Analog sintetis seperti deksametason terutama dipakai untuk efek antiinflamasinya.
- Pada dosis antiinflamasi yang setara, deksametason hampir tidak memiliki sifat retensi natrium seperti hidrokortison.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Dexamethasone Tablets, USP, label FDA. DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=8c5375a7-7a0d-4af0-8b86-bc87698ac3d1
4. Dexamethasone Sodium Phosphate Injection, USP, label FDA. DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=11f10a47-1c42-40e4-89d8-bb000fef497c

---

### 3.8 Asiklovir

**Kalkulator berat badan**

| Rute/keadaan | Dosis | Sumber |
|---|---|---|
| Varicella zoster (chicken pox) | IV 10–15 mg/kg/dosis tiap 8 jam selama 5–10 hari | IDAI hlm. 29 dan 37 |
| HSV | IV 20 mg/kg/dosis tiap 8 jam selama 14–21 hari | IDAI hlm. 29 dan 37 |
| HSV gingivostomatitis pada HIV | 20 mg/kg, per oral, 8 jam atau 5–10 mg/kg, IV, 8 jam selama 7–14 hari | IDAI hlm. 37 |
| HSV diseminata atau ensefalitis pada HIV | 10 mg/kg, IV, 8 jam atau 500 mg/m², 8 jam selama 21 hari | IDAI hlm. 37 |
| Varisela pada HIV | 10 mg/kg, IV, 8 jam atau 500 mg/m², IV, 8 jam selama 7 hari; per oral hanya pada imunosupresi ringan | IDAI hlm. 37 |
| Herpes zoster pada HIV | 20 mg/kg (maks 800 mg/dosis), per oral, tiap 6 jam selama 7 hari | IDAI hlm. 37 |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 76)

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 10 mg/kg/dosis q8 jam iv (ensefalitis, varisela, immunocompromised) | D, I | 5 mg/kg q8 jam | 5 mg/kg q12–24 jam | 2,5 mg/kg q24 jam | dosis sesudah dialisis | dosis untuk FG <10 |

**Sediaan** (FORNAS 2025 hlm. 53)

| Sediaan |
|---|
| Tablet 200 mg |
| Tablet 400 mg |
| Serbuk injeksi 250 mg |

**Aturan penggunaan**

- Interval dan lama pemberian sesuai tabel IDAI.
- Injeksi IV cepat atau bolus harus dihindari; injeksi IM dan subkutan juga harus dihindari (label injeksi).
- Infus diberikan dengan kecepatan tetap selama 1 jam (label injeksi).
- Dosis setara 20 mg/kg tiap 8 jam tidak boleh dilampaui pada pasien mana pun (label injeksi).

**Manfaat obat** (label asiklovir)

- Tablet: pengobatan akut herpes zoster; episode awal dan episode berulang herpes genitalis; cacar air (varisela).
- Injeksi:
  - herpes simpleks mukosa dan kulit (HSV-1, HSV-2), awal maupun berulang, pada pasien imunokompromais;
  - episode awal berat herpes genitalis pada pasien imunokompeten;
  - ensefalitis herpes simpleks;
  - infeksi herpes neonatal;
  - infeksi varicella-zoster pada pasien imunokompromais.

**Efek samping** (label asiklovir)

- Oral, cacar air (10–20 mg/kg 4 kali sehari selama 5–7 hari, atau 800 mg 4 kali sehari selama 5 hari): tersering diare (3,2%).
- Oral, herpes genitalis jangka pendek: mual dan/atau muntah (2,7%).
- Injeksi: inflamasi atau flebitis di tempat suntikan pada sekitar 9% pasien; kenaikan sementara kreatinin serum atau BUN pada 5–10% pasien, lebih sering setelah infus cepat (kurang dari 10 menit).

**Peringatan** (label asiklovir)

- Kontraindikasi: hipersensitivitas terhadap asiklovir atau valasiklovir.

**Farmakokinetik** (label asiklovir)

- Oral: ikatan protein plasma 9–33%; waktu paruh 2,5–3,3 jam; bioavailabilitas oral rata-rata 10–20% dan menurun pada dosis lebih tinggi; makanan tidak memengaruhi penyerapan.
- Anak 7 bulan–7 tahun: waktu paruh rata-rata 2,6 jam (1,59–3,74 jam) setelah dosis oral 300–600 mg/m²; farmakokinetik anak secara umum mirip dewasa.
- Injeksi: waktu paruh 2,36 ± 0,97 jam pada anak 3 bulan–12 tahun dan 3,8 ± 1,19 jam pada bayi lahir–3 bulan; kadar plasma sebanding dengan dosis.
- Waktu paruh dan klirens bergantung pada fungsi ginjal.

**Farmakodinamik** (label asiklovir)

- Analog nukleosida purin sintetis dengan aktivitas hambat terhadap HSV-1, HSV-2, dan VZV.
- Selektif karena afinitasnya terhadap enzim timidin kinase virus, yang mengubah asiklovir menjadi monofosfat; enzim sel kemudian mengubahnya menjadi difosfat dan trifosfat.
- Asiklovir trifosfat menghentikan replikasi DNA virus herpes dengan 3 cara:
  1. hambatan kompetitif DNA polimerase virus;
  2. inkorporasi dan terminasi rantai DNA virus;
  3. inaktivasi DNA polimerase virus.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Acyclovir Tablets, USP, label FDA. DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=05f42300-2a06-45f1-a9b9-6e5c84ae58ec
4. Acyclovir Sodium Injection, label FDA. DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ae921e4e-b8ae-4a45-acc1-32e5e719812b
