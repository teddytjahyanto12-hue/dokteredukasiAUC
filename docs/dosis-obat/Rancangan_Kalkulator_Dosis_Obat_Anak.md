# Kalkulator Dosis Obat Anak

Draf 0.6, 15 Oktober 2026 (28 obat). Materi untuk ditinjau pemilik; belum diterapkan di website.

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

---

### 3.9 Ampisilin

**Kalkulator berat badan** (IDAI hlm. 22, tabel antimikroba; dosis per kg per hari)

| Rute | Infeksi ringan–sedang | Infeksi berat |
|---|---|---|
| IV, IM | 50–200 mg dalam 4 dosis (dosis harian dewasa, 2–4 g) | 300–400 mg dalam 4 dosis (dosis harian dewasa, 6–12 g) |
| PO | 50–100 mg dalam 4 dosis (dosis harian dewasa, 2–4 g) | Tidak cocok |

**Neonatus** (IDAI hlm. 28–29)

- 25–50 mg/kg per dosis, secara intravena.
- Dosis intrakranial 300–400 mg/kg/hari.
- Profilaksis tindakan bedah: 50 mg/kg sebagai dosis tunggal, IV.

| Umur kehamilan (pascakonsepsi), minggu | Umur pascanatal, hari | Interval (jam) |
|---|---|---|
| ≤29 | 0–28 | 12 |
| ≤29 | >28 | 8 |
| 30–36 | 0–14 | 12 |
| 30–36 | >14 | 8 |
| 37–44 | 0–7 | 12 |
| 37–44 | >7 | 8 |
| ≥45 | Semua | 6 |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 77; tertulis "Amplicillin")

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 10–25 mg/kg/dosis q6 jam iv, im, po | D, I | q6 jam | q6–12 jam | q12–24 jam | dosis sesudah dialisis | 50% q 12 jam |

**Sediaan** (FORNAS 2025 hlm. 23)

| Sediaan | Peresepan maksimal |
|---|---|
| Injeksi 250 mg (i.m./i.v.) | 10 hari |
| Injeksi 1.000 mg (i.v.) | 10 hari |

**Aturan penggunaan**

- Dosis harian dibagi 4 dosis (IDAI).
- Neonatus: interval sesuai umur kehamilan dan umur pascanatal (IDAI).

**Manfaat obat** (label ampisilin injeksi; infeksi oleh galur yang peka)

- Infeksi saluran napas.
- Meningitis bakterial.
- Septikemia dan endokarditis.
- Infeksi saluran kemih.
- Infeksi saluran cerna, termasuk demam tifoid dan disentri (Shigella).

**Efek samping** (label ampisilin injeksi)

- Saluran cerna: glositis, stomatitis, lidah hitam berambut, mual, muntah, enterokolitis, kolitis pseudomembranosa, diare (umumnya pada sediaan oral).
- Hipersensitivitas: ruam kulit dan urtikaria sering dilaporkan; dermatitis eksfoliatif dan eritema multiformis pernah dilaporkan; anafilaksis adalah reaksi paling serius, umumnya pada sediaan parenteral.
- Hati: kenaikan SGOT sedang, terutama pada bayi.
- Darah: anemia, trombositopenia, purpura trombositopenik, eosinofilia, leukopenia, agranulositosis.
- Sistem saraf pusat: kejang.

**Peringatan** (label ampisilin injeksi)

- Kontraindikasi: riwayat reaksi hipersensitivitas terhadap penisilin mana pun.
- Reaksi hipersensitivitas (anafilaktoid) serius dan kadang fatal pernah dilaporkan pada terapi penisilin.
- Diare terkait *Clostridioides difficile* dapat terjadi, dari diare ringan sampai kolitis fatal.

**Farmakokinetik** (label ampisilin injeksi)

- Mudah berdifusi ke sebagian besar jaringan dan cairan tubuh; masuk ke cairan serebrospinal dan otak hanya bila meninges meradang.
- Sebagian besar dikeluarkan di urin dalam bentuk tidak berubah; ekskresi dapat diperlambat oleh probenesid.
- Pada bayi dengan umur pascanatal <28 hari, waktu paruh menurun seiring bertambahnya usia pascamenstruasi.
- Kadar di empedu lebih tinggi daripada di serum.
- Ikatan protein serum paling rendah di antara penisilin, rata-rata sekitar 20%.

**Farmakodinamik** (label ampisilin injeksi)

- Penisilin semisintetis dengan aktivitas bakterisidal spektrum luas terhadap organisme Gram-positif yang peka penisilin dan banyak patogen Gram-negatif umum.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Ampicillin for Injection, USP (Sagent), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=9d2aebe8-4f04-49dd-b1e5-80b962868dc3

---

### 3.10 Sefiksim

**Kalkulator berat badan** (IDAI hlm. 13, tabel antimikroba; dosis per kg per hari)

| Rute | Infeksi ringan–sedang | Infeksi berat | Keterangan |
|---|---|---|---|
| PO | 8 mg/kg/hari dalam 1 atau 2 dosis (dosis harian dewasa, 400 mg) | Tidak cocok | Spektrum luas. Tidak cukup bekerja terhadap pneumokokus resisten penisilin. Pengobatan dosis tunggal untuk gonore (400 mg × 1 pada anak-anak ≥45 kg) |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 78)

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 5 mg/kg/dosis q12–24 jam po | D | 100% | 75% | 50% | dosis untuk LFG 10–50 | dosis untuk LFG <10 |

**Sediaan** (FORNAS 2025 hlm. 27)

| Sediaan | Peresepan maksimal |
|---|---|
| Tablet/kapsul 100 mg | 10 hari |
| Tablet/kapsul 200 mg | 10 hari |
| Sirup 100 mg/5 mL | 1 botol/kasus |

Restriksi FORNAS: hanya untuk pasien rawat inap yang sebelumnya mendapatkan antibiotik parenteral sefalosporin generasi tiga atau sesuai hasil uji resistensi.

**Aturan penggunaan**

- Dosis harian diberikan dalam 1 atau 2 dosis (IDAI).
- Tablet tidak boleh menggantikan suspensi oral pada pengobatan otitis media karena tidak bioekuivalen (label sefiksim).

**Manfaat obat** (label sefiksim suspensi oral; dewasa dan anak usia 6 bulan ke atas)

- Infeksi saluran kemih tanpa komplikasi.
- Otitis media.
- Faringitis dan tonsilitis.
- Eksaserbasi akut bronkitis kronik.
- Gonore tanpa komplikasi (serviks/uretra).

**Efek samping** (label sefiksim)

- Paling sering: gangguan saluran cerna, dilaporkan pada 30% pasien dewasa uji klinis tablet: diare 16%, tinja lembek atau sering 6%, nyeri perut 3%, mual 7%, dispepsia 3%, flatulens 4%.
- Insidens efek samping saluran cerna pada anak yang mendapat suspensi sebanding dengan dewasa yang mendapat tablet.
- Pascapemasaran (<2%): kolitis pseudomembranosa; reaksi anafilaktik/anafilaktoid, ruam, urtikaria, demam obat, angioedema, eritema multiformis, sindrom Stevens-Johnson; kenaikan enzim hati, hepatitis, ikterus; kenaikan BUN atau kreatinin, gagal ginjal akut; sakit kepala, pusing, kejang; trombositopenia, leukopenia, neutropenia, eosinofilia.

**Peringatan** (label sefiksim)

- Kontraindikasi: alergi terhadap sefiksim atau sefalosporin lain.
- Reaksi anafilaktik/anafilaktoid (termasuk syok dan kematian) pernah dilaporkan. Hipersensitivitas silang antar-beta-laktam dapat terjadi pada sampai 10% pasien dengan riwayat alergi penisilin.
- Diare terkait *Clostridioides difficile*.
- Dosis perlu disesuaikan pada gangguan ginjal.
- Dapat menurunkan aktivitas protrombin.

**Farmakokinetik** (label sefiksim)

- Tablet dan suspensi diserap sekitar 40–50%, dengan atau tanpa makanan; makanan memperlambat waktu penyerapan maksimal sekitar 0,8 jam.
- Suspensi menghasilkan kadar puncak sekitar 25–50% lebih tinggi daripada tablet.
- Ikatan protein serum sekitar 65%.
- Tidak ada bukti metabolisme in vivo; sekitar 50% dosis yang diserap dikeluarkan di urin dalam bentuk tidak berubah dalam 24 jam.
- Waktu paruh serum rata-rata 3–4 jam, dapat sampai 9 jam pada sebagian sukarelawan sehat.

**Farmakodinamik** (label sefiksim)

- Sefalosporin semisintetis; efek bakterisidal berasal dari hambatan sintesis dinding sel.
- Stabil terhadap beberapa enzim beta-laktamase.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Cefixime for Oral Suspension (Aurobindo), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=068e6edd-a5fe-40d8-8dcf-ac82b78dced4

---

### 3.11 Azitromisin

**Kalkulator berat badan**

IDAI hlm. 19, tabel antimikroba (dosis per kg per hari):

| Rute | Infeksi ringan–sedang | Infeksi berat | Keterangan |
|---|---|---|---|
| PO | 10 mg/kg/hari selama 1 hari, kemudian 5 mg/kg selama 4 hari; atau 10 mg/kg/hari selama 3 hari; atau 30 mg/kg sekali | Tidak cocok | Seluruh dosis sehari sekali. OMA: 10 mg/kg/hari × 3 hari atau 30 mg/kg × 1 hari atau 10 mg/kg/hari × 1 hari, kemudian 5 mg/kg/hari × 4 hari. Faringitis: 12 mg/kg/hari (maksimum 500 mg) hari 1, kemudian 6 mg/kg/hari (maksimum 250 mg) pada hari 2–5. Sinusitis: 10 mg/kg/hari × 3 hari atau 10 mg/kg/hari × 1 hari, kemudian 5 mg/kg/hari × 4 hari. PTK: 10 mg/kg × 1 hari, kemudian 5 mg/kg/hari × 4 hari atau 60 mg/kg × 1 hari suspensi Zmax untuk bayi dan anak-anak berusia >6 bulan. Shigellosis: 12 mg/kg × 1 hari, 6 mg/kg/hari × 4 hari |
| IV | Tidak cocok | 10 mg/kg, sehari sekali | – |

IDAI hlm. 40, daftar dosis obat:

| Keadaan | Dosis |
|---|---|
| Oral | 10 mg/kg/hari pada hari-1, kemudian 5 mg/kg/hari pada hari 2–5 ATAU 15 mg/kg/hari selama 3 hari |
| Profilaksis primer *Mycobacterium avium complex* (MAC) | 20 mg/kg (maks 1200 mg/dosis)/minggu, per oral atau 5 mg/kg (maks 250 mg/dosis), per oral, 24 jam |
| Profilaksis sekunder MAC | 5 mg/kg (maks 250 mg/dosis), per oral, 24 jam ditambah etambutol 15 mg/kg (maks 800 mg), per oral, 24 jam |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 77)

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 15 mg/kg/dosis pada hari pertama (dewasa 500 mg) kmd 7,5 mg/kg/dosis q24 jam pada hari ke 2–5 po (dewasa 250 mg) | D | 100% | 100% | 100% | tak ada | tak ada |

**Sediaan** (FORNAS 2025 hlm. 31)

| Sediaan | Peresepan maksimal |
|---|---|
| Tablet 250 mg | 3 hari |
| Tablet salut selaput 500 mg | – |
| Sirup kering 200 mg/5 mL | – |
| Serbuk injeksi 500 mg | – |

Restriksi FORNAS: diberikan atas persetujuan dokter yang memiliki kompetensi di bidang ilmu penyakit tropik dan/atau infeksi atau DPJP yang ditunjuk oleh KFT/KPRA untuk: a) antibiotik kategori Watch; b) ketika antibiotik kategori Access tidak efektif.

**Aturan penggunaan**

- Seluruh dosis diberikan sehari sekali (IDAI).

**Manfaat obat** (label Zithromax oral; infeksi ringan sampai sedang)

- Anak:
  - otitis media akut (usia 6 bulan ke atas);
  - pneumonia komunitas yang dapat diobati oral (usia 6 bulan ke atas);
  - faringitis/tonsilitis oleh *Streptococcus pyogenes* sebagai alternatif terapi lini pertama (usia 2 tahun ke atas).
- Dewasa: eksaserbasi akut bronkitis kronik, sinusitis bakterial akut, pneumonia komunitas, faringitis/tonsilitis, infeksi kulit tanpa komplikasi, uretritis dan servisitis, ulkus genital (*chancroid*) pada pria.
- Injeksi (label Zithromax IV): pneumonia komunitas dan penyakit radang panggul pada dewasa yang memerlukan terapi intravena awal.

**Efek samping** (label Zithromax oral)

- Otitis media akut (dosis total 30 mg/kg): diare, nyeri perut, muntah, mual, ruam (≥1%). Regimen 1 hari: diare 4,3%, muntah 4,9%.
- Pneumonia komunitas (10 mg/kg hari 1, lalu 5 mg/kg hari 2–5): diare/tinja lembek 5,8%, nyeri perut 1,9%, muntah 1,9%, mual 1,9%, ruam 1,6%.
- Faringitis/tonsilitis (12 mg/kg hari 1–5): diare 5,4%, nyeri perut 3,4%, muntah 5,6%, mual 1,8%, sakit kepala 1,1%.

**Peringatan** (label Zithromax)

- Kontraindikasi: hipersensitivitas terhadap azitromisin, eritromisin, makrolida, atau ketolida; riwayat ikterus kolestatik/gangguan hati akibat azitromisin sebelumnya.
- Reaksi alergi serius (angioedema, anafilaksis, AGEP, sindrom Stevens-Johnson, nekrolisis epidermal toksik, DRESS); kematian pernah dilaporkan.
- Hepatotoksisitas.
- Stenosis pilorus hipertrofik infantil pernah dilaporkan setelah penggunaan pada neonatus (terapi sampai 42 hari kehidupan).
- Pemanjangan interval QT dan torsades de pointes.
- Keamanan dan efektivitas sediaan injeksi pada anak belum ditetapkan (label Zithromax IV).

**Farmakokinetik** (label Zithromax oral)

- Bioavailabilitas absolut kapsul 250 mg 38%.
- Ikatan protein serum bervariasi, turun dari 51% pada 0,02 mcg/mL menjadi 7% pada 2 mcg/mL.
- Tersebar luas ke jaringan, termasuk kulit, paru, tonsil, dan serviks.
- Waktu paruh eliminasi terminal 68 jam; waktu paruh panjang diduga akibat ambilan dan pelepasan obat dari jaringan.
- Ekskresi empedu, terutama dalam bentuk tidak berubah, adalah jalur eliminasi utama; sekitar 6% dosis muncul di urin dalam bentuk tidak berubah selama seminggu.

**Farmakodinamik** (label Zithromax oral)

- Antibakteri makrolida yang berikatan dengan 23S rRNA subunit ribosom 50S, menghambat sintesis protein bakteri dan perakitan subunit 50S.
- Aktivitas antibakteri berkorelasi dengan rasio AUC terhadap KHM untuk patogen tertentu (*S. pneumoniae*, *S. aureus*) pada model hewan.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. ZITHROMAX (azithromycin) tablets and oral suspension (Pfizer), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=db52b91e-79f7-4cc1-9564-f2eee8e31c45
4. ZITHROMAX (azithromycin) for injection (Pfizer), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=8d24bacb-feff-4c6a-b8df-625e1435387a

---

### 3.12 Kotrimoksazol (Trimetoprim–sulfametoksazol)

**Kalkulator berat badan**

IDAI hlm. 26, tabel antimikroba (dosis per kg per hari):

| Rute | Infeksi ringan–sedang | Keterangan |
|---|---|---|
| PO, IV | 8–10 mg/kg/hari komponen TMP dalam 2 dosis (dosis harian dewasa, 320 mg TMP) | 2 mg komponen TMP sehari sekali untuk profilaksis ISK. Kontraindikasi untuk usia < 2 tahun |

IDAI hlm. 59, daftar dosis obat (Trimethoprim 1 mg : sulfametoksazol 5 mg):

| Keadaan | Dosis |
|---|---|
| Terapi *P. jiroveci* | 15–20 mg TMP/kg/hari, per oral, 6–8 jam selama 21 hari |
| Profilaksis *P. jiroveci* | 5 mg TMP/kg, per oral, 24 jam |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 81)

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 18 mg/kg/dosis q12 jam po | I | q12 jam | q18 jam | q24 jam | dosis sesudah dialisis | dosis untuk LFG <10 |

**Sediaan** (FORNAS 2025 hlm. 30)

| Sediaan | Peresepan maksimal |
|---|---|
| Kotrimoksazol (dewasa) tablet 400/80 mg | 4 tab/hari selama 10 hari kecuali pada immunocompromised selama 21 hari |
| Kotrimoksazol forte (dewasa) tablet 800/160 mg | Profilaksis pada pasien HIV: 1 tab/hari sampai CD4 >200 sel/mikroliter. Infeksi yang sensitif terhadap kotrimoksazol: 2 tab/hari selama 10 hari. PCP: 3–6 tab/hari selama 21–28 hari |
| Kotrimoksazol suspensi 200/40 mg per 5 mL | 5 hari |

**Aturan penggunaan**

- Dosis dihitung dari komponen trimetoprim (TMP) (IDAI).
- Dosis harian dibagi 2 dosis (IDAI, tabel antimikroba).

**Manfaat obat** (label sulfametoksazol-trimetoprim suspensi oral)

- Infeksi saluran kemih.
- Otitis media akut pada anak, bila menurut dokter kombinasi ini memberi keuntungan dibanding antimikroba lain; tidak diindikasikan untuk pemberian profilaksis atau jangka panjang pada otitis media.
- Eksaserbasi akut bronkitis kronik pada dewasa.
- Shigelosis (enteritis oleh *Shigella flexneri* dan *S. sonnei*).
- Pengobatan dan profilaksis pneumonia *Pneumocystis jirovecii*.
- Diare pelancong pada dewasa.

**Efek samping** (label sulfametoksazol-trimetoprim)

- Paling sering: gangguan saluran cerna (mual, muntah, anoreksia) dan reaksi alergi kulit (ruam, urtikaria).
- Reaksi serius dan kematian pernah terjadi: reaksi kulit berat (sindrom Stevens-Johnson, nekrolisis epidermal toksik, DRESS, AFND, AGEP), nekrosis hati fulminan, agranulositosis, anemia aplastik dan diskrasia darah lain, cedera paru akut dan lambat, anafilaksis, dan syok sirkulasi.

**Peringatan** (label sulfametoksazol-trimetoprim, kontraindikasi)

- Hipersensitivitas terhadap trimetoprim atau sulfonamida.
- Riwayat trombositopenia imun akibat trimetoprim dan/atau sulfonamida.
- Anemia megaloblastik akibat defisiensi folat.
- **Anak usia kurang dari 2 bulan.**
- Kerusakan hati berat.
- Insufisiensi ginjal berat bila fungsi ginjal tidak dapat dipantau.
- Pemberian bersama dofetilid.

**Farmakokinetik** (label sulfametoksazol-trimetoprim)

- Cepat diserap setelah pemberian oral; kadar puncak 1–4 jam.
- Sekitar 70% sulfametoksazol dan 44% trimetoprim terikat protein plasma.
- Sulfametoksazol dimetabolisme menjadi sedikitnya 5 metabolit (pembentukan metabolit N4-hidroksi melalui CYP2C9); trimetoprim dimetabolisme in vitro menjadi 11 metabolit.
- Waktu paruh serum rata-rata: sulfametoksazol 10 jam, trimetoprim 8–10 jam; memanjang pada gangguan ginjal berat.
- Ekskresi terutama melalui ginjal (filtrasi glomerulus dan sekresi tubulus); dalam 72 jam ditemukan di urin 84,5% sulfonamida total dan 66,8% trimetoprim bebas.

**Farmakodinamik** (label sulfametoksazol-trimetoprim)

- Sulfametoksazol menghambat sintesis asam dihidrofolat bakteri dengan bersaing dengan asam para-aminobenzoat (PABA).
- Trimetoprim menghambat pembentukan asam tetrahidrofolat dengan mengikat secara reversibel enzim dihidrofolat reduktase.
- Kombinasi ini menghambat dua langkah berurutan biosintesis asam nukleat dan protein yang penting bagi banyak bakteri.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Sulfamethoxazole and Trimethoprim Oral Suspension, label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c6171b62-835c-465e-905e-97f70438186e

---

### 3.13 Metronidazol

**Kalkulator berat badan**

IDAI hlm. 20, tabel antimikroba (dosis per kg per hari):

| Rute | Infeksi ringan–sedang | Infeksi berat |
|---|---|---|
| PO | 30–50 mg dalam 3 dosis (dosis harian dewasa, 0,75–2,25 g) | Sama |
| IV | 22,5–40 mg dalam 3 dosis (dosis harian dewasa, 1,5 g) | Sama |

IDAI hlm. 32, neonatus:

- *Loading dose*: 15 mg/kg IV dengan drip 60 menit.
- Dosis rumatan: 7,5 mg/kg per dosis IV dengan drip 60 menit.

| Umur kehamilan (pascakonsepsi), minggu | Umur pascanatal, hari | Interval (jam) |
|---|---|---|
| ≤29 | 0–28 | 48 |
| ≤29 | >28 | 24 |
| 30–36 | 0–14 | 24 |
| 30–36 | >14 | 12 |
| 37–44 | 0–7 | 24 |
| 37–44 | >7 | 12 |
| ≥45 | Semua | 8 |

Meningitis (IDAI hlm. 32):

- Umur pascanatal ≤7 hari dan ≥2 kg: 15–20 mg/kg/hari dibagi tiap 12 jam.
- Umur pascanatal >7 hari dan ≥2 kg: 30 mg/kg/hari dibagi tiap 8 jam.
- Pada berat badan <2 kg menggunakan dosis lebih kecil dan interval yang lebih lama.

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 86)

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 15 mg/kg/dosis stat kmd 7,5 mg/kg/dosis q8–12 jam iv, po, pr | D | 100% | 100% | 100% | Dosis sesudah dialisis | Dosis untuk LFG <10 |

**Sediaan** (FORNAS 2025 hlm. 35)

| Sediaan | Peresepan maksimal |
|---|---|
| Tablet 250 mg | Untuk infeksi akibat bakteri anaerob, dapat diberikan maksimum 2 minggu/kasus, kecuali pada kasus abses paru, otak, hepar dan organ lain disesuaikan dengan kebutuhan pasien |
| Tablet 500 mg | – |
| Suspensi 125 mg/5 mL | – |
| Infus 5 mg/mL | 3 botol/hari |
| Supositoria 500 mg | – |

**Aturan penggunaan**

- Dosis harian dibagi 3 dosis (IDAI, tabel antimikroba).
- Neonatus: IV drip dalam 60 menit; interval sesuai umur kehamilan dan umur pascanatal (IDAI).

**Manfaat obat** (label metronidazol tablet)

- Trikomoniasis.
- Amebiasis: amebiasis usus akut (disentri amuba) dan abses hati amuba.
- Infeksi bakteri anaerob serius: infeksi intraabdomen, kulit dan struktur kulit, ginekologi, septikemia bakterial, tulang dan sendi (sebagai terapi tambahan), sistem saraf pusat (termasuk meningitis dan abses otak), saluran napas bawah, dan endokarditis.
- Label injeksi: keamanan dan efektivitas untuk infeksi intraabdomen telah ditetapkan pada anak sejak lahir sampai kurang dari 4 bulan.

**Efek samping** (label metronidazol tablet)

- Paling sering pada saluran cerna: mual (kadang disertai sakit kepala, anoreksia, muntah), diare, rasa tidak nyaman di epigastrium, kram perut, konstipasi.
- Rasa logam yang tajam dan tidak enak di mulut; lidah berbulu, glositis, stomatitis.
- Paling serius: kejang, ensefalopati, meningitis aseptik, serta neuropati optik dan perifer.

**Peringatan** (label metronidazol tablet)

- Metronidazol terbukti karsinogenik pada mencit dan tikus; penggunaan yang tidak perlu harus dihindari.
- Kontraindikasi: hipersensitivitas terhadap metronidazol atau turunan nitroimidazol lain; penggunaan disulfiram dalam 2 minggu terakhir; konsumsi alkohol; sindrom Cockayne.
- Keamanan dan efektivitas sediaan oral pada anak belum ditetapkan, kecuali untuk pengobatan amebiasis.

**Farmakokinetik** (label metronidazol tablet dan injeksi)

- Diserap baik setelah pemberian oral; kadar puncak plasma 1–2 jam.
- Kurang dari 20% terikat protein plasma.
- Terdapat di cairan serebrospinal, saliva, dan ASI dengan kadar mirip plasma; kadar bakterisidal juga ditemukan di pus abses hati.
- Eliminasi utama melalui urin (60–80% dosis); feses 6–15%.
- Waktu paruh eliminasi pada orang sehat 8 jam.
- Neonatus: kemampuan eliminasi berkurang; waktu paruh berbanding terbalik dengan usia kehamilan, 109 sampai 22,5 jam pada usia kehamilan 28–40 minggu (label injeksi).

**Farmakodinamik** (label metronidazol tablet)

- Nitroimidazol dengan efek antibakteri dalam lingkungan anaerob terhadap sebagian besar anaerob obligat.
- Setelah masuk sel bakteri, metronidazol direduksi menjadi radikal bebas nitroso berumur pendek; bentuk tereduksi dan radikal bebas berinteraksi dengan DNA sehingga sintesis DNA terhambat, DNA terdegradasi, dan bakteri mati.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Metronidazole Tablets, USP (Teva), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=291a45f6-ed27-4dcc-8364-358d08623797
4. Metronidazole Injection (WG Critical Care), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=e4ea0c09-cdd1-4708-962c-6ba28b989df3

---

### 3.14 Salbutamol

**Kalkulator berat badan** (IDAI hlm. 69)

| Rute/keadaan | Dosis |
|---|---|
| Oral | 0,1–0,15 mg/kg, 6 jam, oral |
| Inhalasi | 0,5 mL dilarutkan menjadi 4 mL atau nebulisasi 2,5 mg/2,5 mL, 3–6 jam |
| Serangan sedang | 0,5% larutan 1 mL dilarutkan menjadi 4 mL, atau nebulisasi 5 mg/2,5 mL, 1–2 jam |
| Serangan berat | 0,5% larutan tanpa dilarutkan, diberikan kontinyu |
| Aerosol | 100 mcg/puff, 1–2 uff, 4–6 jam; akut 4–8 uff (>6 thn), 8–12 puff (>6 thn) |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 76; tertulis "Albuterol")

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 0,1 mg/kg/dosis (maks. 2 mg) q8 jam po (>2 tahun) | D | 100% | 75% | 50% | tak ada data | tak ada data |

**Sediaan** (FORNAS 2025 hlm. 200)

| Sediaan | Peresepan maksimal |
|---|---|
| Tablet 2 mg | – |
| Cairan inhalasi 1 mg/mL | Hari pertama maks 8 vial/hari, selanjutnya maks 4 vial/hari. Kasus di ICU maks 10 vial/hari |
| Sirup 2 mg/5 mL | – |
| MDI/aerosol 100 mcg/dosis | Asma persisten ringan–berat, SOPT: 2 tabung/tahun. PPOK: 2 tabung/bulan |

Restriksi FORNAS: hanya untuk serangan asma akut dan/atau bronkospasme yang menyertai PPOK atau SOPT (Sindrom Obstruksi Pasca Tuberkulosis).

**Aturan penggunaan**

- Sesuai tabel IDAI.

**Manfaat obat**

- Sirup: meredakan bronkospasme pada dewasa dan anak usia 2 tahun ke atas dengan penyakit saluran napas obstruktif reversibel (label sirup).
- Larutan inhalasi: meredakan bronkospasme pada pasien usia 2 tahun ke atas dengan penyakit saluran napas obstruktif reversibel dan serangan akut bronkospasme (label larutan inhalasi).
- Inhaler: pengobatan atau pencegahan bronkospasme dan pencegahan bronkospasme akibat latihan fisik pada pasien usia 4 tahun ke atas (label inhaler HFA).

**Efek samping**

- Sirup, dewasa dan anak 6–14 tahun: tremor 10%, gelisah 9%, gemetar 9%, sakit kepala 4%, pusing 3%, nafsu makan meningkat 3%, hiperaktivitas 2%, eksitasi 2%, takikardia 1%, epistaksis 1% (label sirup).
- Sirup, anak 2–6 tahun (lebih sering daripada anak besar dan dewasa): eksitasi 20%, gelisah 15%, hiperkinesia 4%, sulit tidur 2%, takikardia 2%, gejala saluran cerna 2% (label sirup).
- Larutan inhalasi: tremor 20%, pusing 7%, gelisah 4%, sakit kepala 3%, mual 4%, bronkospasme 8%, batuk 4%, bronkitis 4% (label larutan inhalasi).

**Peringatan**

- Kontraindikasi: hipersensitivitas terhadap salbutamol atau komponennya (label sirup dan inhaler).
- Dapat menimbulkan efek kardiovaskular bermakna (denyut nadi, tekanan darah, gejala) dan perubahan EKG; hati-hati pada gangguan kardiovaskular (label sirup).
- Asma dapat memburuk; kebutuhan dosis yang lebih sering dari biasa menandakan asma tidak stabil (label inhaler HFA).
- Bronkospasme paradoksal yang dapat mengancam nyawa; kematian pernah dilaporkan pada penggunaan berlebihan simpatomimetik inhalasi (label larutan inhalasi).

**Farmakokinetik** (label sirup)

- Cepat diserap setelah pemberian oral; kadar puncak sekitar 18 ng/mL dalam 2 jam setelah 4 mg.
- Waktu paruh eliminasi sekitar 5 jam.
- 76% dosis dikeluarkan di urin dalam 3 hari, sebagian besar dalam 24 jam pertama; 60% berupa metabolit. Feses mengandung 4% dosis.

**Farmakodinamik** (label sirup)

- Bekerja lebih selektif pada reseptor beta2-adrenergik dibanding isoproterenol.
- Merangsang adenil siklase intraseluler sehingga kadar cAMP meningkat; cAMP berkaitan dengan relaksasi otot polos bronkus dan hambatan pelepasan mediator hipersensitivitas segera dari sel, terutama sel mast.
- Masa kerja lebih panjang daripada isoproterenol karena bukan substrat proses ambilan katekolamin seluler maupun katekol-O-metil transferase.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Albuterol Sulfate Syrup (Quagen), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=99a490cc-e41d-436b-9cf3-8facb7ac714f
4. Albuterol Sulfate Inhalation Solution (Aurobindo), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=eafa5b05-d692-48e7-a413-30f847547eb2
5. Albuterol Sulfate HFA Inhalation Aerosol (Teva), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7bb5b6dd-9105-4ee7-b205-ed79cf4b371b

---

### 3.15 Setirizin

**Kalkulator berat badan** (IDAI hlm. 44)

| Rute | Dosis |
|---|---|
| Oral | 0,25 mg/kg, per oral, 6 bln–2 thn: 12 jam, >2 thn: 24 jam |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 80)

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 0,25 mg/kg/dosis q12–24 jam po | D | 100% | 50% | 25% | tak ada | tak ada data |

**Sediaan** (FORNAS 2025 hlm. 18)

| Sediaan | Peresepan maksimal |
|---|---|
| Tablet 10 mg | Urtikaria akut: 1 tab/hari, maks 5 hari. Urtikaria kronik: maks 30 tab/bulan |
| Sirup 5 mg/5 mL | 1 botol/kasus |

**Aturan penggunaan** (IDAI)

- Usia 6 bulan–2 tahun: tiap 12 jam.
- Usia >2 tahun: tiap 24 jam.

**Manfaat obat** (label setirizin sirup)

- Meredakan gejala rinitis alergi perenial (akibat alergen seperti tungau debu, bulu hewan, jamur) pada anak usia 6–23 bulan: bersin, rinore, *postnasal drip*, gatal hidung, gatal mata, dan mata berair.
- Mengobati manifestasi kulit urtikaria idiopatik kronik tanpa komplikasi pada dewasa dan anak usia 6 bulan–5 tahun.

**Efek samping** (label setirizin sirup)

- Anak 6–11 tahun: somnolens berkaitan dengan dosis (plasebo 1,3%, 5 mg 1,9%, 10 mg 4,2%); nyeri perut dianggap berkaitan dengan pengobatan.
- Anak 2–5 tahun: efek samping serupa jenis dan frekuensinya dengan anak 6–11 tahun.
- Bayi 6–11 bulan: lebih rewel/iritabel dibanding plasebo.
- Anak 12 bulan ke atas (studi 18 bulan): insomnia lebih sering (9,0% vs 5,3%); pada dosis ≥5 mg/hari, kelelahan (3,6% vs 1,3%) dan malaise (3,6% vs 1,8%).

**Peringatan** (label setirizin sirup)

- Kontraindikasi: hipersensitivitas terhadap setirizin, komponennya, atau hidroksizin.
- Somnolens dilaporkan pada sebagian pasien; hati-hati saat mengemudi atau mengoperasikan mesin. Hindari penggunaan bersama alkohol atau depresan SSP lain.

**Farmakokinetik** (label setirizin sirup)

- Cepat diserap; kadar puncak sekitar 1 jam setelah pemberian tablet atau sirup pada dewasa; bioavailabilitas tablet dan sirup sebanding.
- Makanan tidak memengaruhi jumlah yang diserap, tetapi memperlambat kadar puncak 1,7 jam dan menurunkan kadar puncak 23%.
- Ikatan protein plasma rata-rata 93%.
- 70% dosis ditemukan di urin dan 10% di feses; sekitar 50% di urin dalam bentuk tidak berubah. Metabolisme terbatas.
- Waktu paruh eliminasi rata-rata 8,3 jam pada dewasa.
- Anak 2–5 tahun: waktu paruh 33–41% lebih pendek dari dewasa. Anak 6–23 bulan: waktu paruh 63% lebih pendek dari dewasa.

**Farmakodinamik** (label setirizin sirup)

- Metabolit hidroksizin pada manusia; antihistamin yang efek utamanya melalui hambatan selektif reseptor H1 perifer.
- Aktivitas antikolinergik dan antiserotonergik sangat kecil pada model hewan; pada studi klinis, mulut kering lebih sering dibanding plasebo.
- Penetrasi ke otak sangat kecil pada studi hewan.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Cetirizine Hydrochloride Syrup (Caraco), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=23f3ec1c-bbba-49ef-b7d6-0be6e9424b99

---

### 3.16 Fenobarbital

**Kalkulator berat badan** (IDAI hlm. 30 dan 51)

| Keadaan | Dosis |
|---|---|
| Dosis *loading* | 20 mg/kg IV, pelan dalam 10–15 menit; bila kejang refrakter dapat diberikan tambahan 10 mg/kg hingga total dosis maksimal 40 mg/kg |
| Dosis rumatan | 3–4 mg/kg per hari, diberikan 12–24 jam setelah dosis *loading* |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 88)

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 5 mg/kg/dosis q24 jam iv, im, po | I | q8–12 jam | q8–12 jam | q12–16 jam | Dosis sesudah dialisis | ½ dosis normal |

**Sediaan** (FORNAS 2025 hlm. 20)

| Sediaan | Peresepan maksimal |
|---|---|
| Tablet 30 mg | 120 tab/bulan |
| Tablet 50 mg | 120 tab/bulan |
| Tablet 100 mg | 60 tab/bulan |
| Injeksi 50 mg/mL | 40 mg/kgBB |
| Injeksi 100 mg/mL | – |

**Aturan penggunaan**

- *Loading* IV pelan dalam 10–15 menit; rumatan dimulai 12–24 jam setelah *loading* (IDAI).
- Sediaan injeksi neonatus diberikan dengan infus intravena selama 15 menit ke vena perifer besar (label Sezaby).

**Manfaat obat**

- Pengobatan kejang neonatus pada bayi cukup bulan dan kurang bulan (label Sezaby, injeksi).
- Antikonvulsan sedatif untuk kejang umum dan parsial (label tablet).

**Efek samping**

- Neonatus (≥2%; label Sezaby): pernapasan abnormal 25%, sedasi 16%, gangguan minum 16%, hipotensi 16%, bradikardia 3%, hiponatremia 3%, sepsis 3%.
- Tablet: depresi SSP (sedasi sisa, mengantuk, letargi, vertigo); iritabilitas dan hiperaktivitas dapat terjadi pada anak.

**Peringatan**

- Kontraindikasi: porfiria akut; riwayat hipersensitivitas terhadap fenobarbital atau barbiturat lain (label Sezaby). Label tablet juga menyebut gangguan fungsi hati berat dan penyakit napas dengan sesak atau obstruksi yang nyata.
- Penggunaan bersama opioid dapat menyebabkan sedasi berat, depresi napas, koma, dan kematian (label Sezaby).
- Depresi atau insufisiensi napas: 25% neonatus dalam studi mengalami pernapasan abnormal (label Sezaby).
- Ketergantungan dan reaksi putus obat bila digunakan lebih lama dari yang dianjurkan (label Sezaby).
- Reaksi kulit serius, DRESS, hipersensitivitas, reaksi di tempat suntikan, dan pemanjangan QT (label Sezaby).

**Farmakokinetik**

- Barbiturat kerja panjang bila diminum; mula kerja 1 jam atau lebih, lama kerja 10–12 jam (label tablet).
- Waktu paruh plasma dewasa 53–118 jam (rata-rata 79 jam); anak dan neonatus (<48 jam) 60–180 jam (rata-rata 110 jam) (label tablet).
- Literatur yang dikutip label Sezaby: waktu paruh eliminasi pada neonatus sekitar 1 minggu; dimetabolisme terutama oleh CYP2C9, lebih sedikit oleh CYP2C19, CYP2E1, dan UGT.
- 25–50% dosis dieliminasi di urin dalam bentuk tidak berubah (label tablet).

**Farmakodinamik**

- Mekanisme pasti pada kejang neonatus belum sepenuhnya dipahami; diduga melalui penguatan inhibisi sinaptik pada reseptor GABA-A (label Sezaby).
- Barbiturat dapat menimbulkan semua tingkat perubahan suasana SSP, dari eksitasi, sedasi ringan, hipnosis, sampai koma dalam (label tablet).

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. SEZABY (phenobarbital sodium) for injection (Sun Pharmaceutical), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=8c7d0402-4977-4c25-bc4b-11db91339e9a
4. Phenobarbital Tablets (Sun Pharmaceutical), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=fa09b4f2-edb0-4594-a2d2-b16f7b9686b4

---

### 3.17 Furosemid

**Kalkulator berat badan**

IDAI hlm. 30, neonatus:

| Keadaan | Dosis |
|---|---|
| Dosis inisial | 1 mg/kg IV bolus lambat. Dapat dinaikkan maximum 2 mg/kg per dosis atau 6 mg/kg per dosis oral |
| Interval inisial | Bayi kurang bulan: setiap 24 jam. Bayi aterm: setiap 12 jam. Bayi lebih dari 1 bulan: setiap 6–8 jam |

IDAI hlm. 53, daftar dosis obat:

| Keadaan | Dosis |
|---|---|
| Infus IV | 0,1–1 mg/kg/jam (<20 kg 25 mg/kg dalam NS 50 ml dengan heparin 1u/ml dengan kecepatan 0,2–2 ml/jam; <20 kg 10 mg/ml dengan kecepatan 0,1–1 ml/kg/jam) |
| Hiperkalsemia | 1–2 mg/kg, IV, 6–12 jam |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 83; tertulis "Frusemide")

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 0,5–1 mg/kg/dosis q6–24 jam po, im, iv | D | 100% | 100% | 100% | tak ada | tak ada |

**Sediaan** (FORNAS 2025)

| Sediaan | Halaman FORNAS | Peresepan maksimal |
|---|---|---|
| Tablet 40 mg | hlm. 133 | 90 tab/bulan |
| Tablet 40 mg | hlm. 161 | 120 tab/bulan |
| Injeksi 10 mg/mL (i.v./i.m.) | hlm. 133, 161 | – |

**Aturan penggunaan**

- Neonatus: bolus IV lambat; interval sesuai usia (IDAI).
- Terapi parenteral sebaiknya untuk pasien yang tidak dapat minum obat oral atau dalam keadaan gawat darurat (label injeksi).

**Manfaat obat**

- Edema pada dewasa dan anak yang berkaitan dengan gagal jantung kongestif, sirosis hati, dan penyakit ginjal termasuk sindrom nefrotik (label tablet dan injeksi).
- Terapi tambahan pada edema paru akut; pemberian IV bila diperlukan diuresis cepat (label injeksi).
- Hipertensi pada dewasa (label tablet).

**Efek samping** (label injeksi)

- Saluran cerna: pankreatitis, ikterus kolestatik, kenaikan enzim hati, anoreksia, iritasi mulut dan lambung, kram, diare, konstipasi, mual, muntah.
- Hipersensitivitas sistemik: reaksi anafilaktik/anafilaktoid berat, vaskulitis sistemik, nefritis interstisial.
- Sistem saraf: tinitus dan gangguan pendengaran, parestesia, vertigo, pusing, sakit kepala, penglihatan kabur.
- Darah: anemia aplastik, trombositopenia, agranulositosis, anemia hemolitik, leukopenia, eosinofilia.
- Kulit: dermatitis eksfoliatif, eritema multiformis, fotosensitivitas, urtikaria, ruam, sindrom Stevens-Johnson, nekrolisis epidermal toksik.
- Lain-lain: hipotensi ortostatik, hiperglikemia, hiperurisemia, spasme otot, nyeri sesaat di tempat suntikan IM.

**Peringatan** (label injeksi)

- Diuretik kuat; dosis berlebihan dapat menyebabkan diuresis hebat dengan kehilangan air dan elektrolit. Dosis dan jadwal harus disesuaikan dengan kebutuhan tiap pasien.
- Kontraindikasi: anuria dan riwayat hipersensitivitas terhadap furosemid.
- Bayi prematur dengan sindrom gawat napas: pemberian pada minggu-minggu pertama kehidupan dapat meningkatkan risiko duktus arteriosus paten persisten.
- Bayi prematur dengan usia pascakonsepsi <31 minggu yang mendapat dosis >1 mg/kg/24 jam dapat mencapai kadar plasma yang berpotensi toksik, termasuk ototoksisitas. Gangguan pendengaran pada neonatus pernah dikaitkan dengan furosemid injeksi.

**Farmakokinetik** (label injeksi)

- Terikat luas pada protein plasma, terutama albumin (91–99%); fraksi bebas 2,3–4,1% pada kadar terapeutik.
- Mula diuresis dalam 5 menit setelah IV (lebih lambat setelah IM); efek puncak dalam setengah jam pertama; lama efek diuretik sekitar 2 jam.
- Bioavailabilitas tablet 64% dan larutan oral 60% dibanding injeksi IV.
- Waktu paruh terminal sekitar 2 jam.
- Furosemid glukuronida adalah satu-satunya atau produk biotransformasi utama.

**Farmakodinamik** (label injeksi)

- Menghambat terutama reabsorpsi natrium dan klorida di tubulus proksimal, tubulus distal, dan ansa Henle.
- Kerja pada tubulus distal tidak bergantung pada hambatan karbonat anhidrase maupun aldosteron.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Furosemide Injection, USP (Amneal), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d5b9f12e-d1e9-42de-90f2-c9ba33a86457
4. Furosemide Tablets, label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=571a52ed-5258-46d5-a0d2-9a984cf73895

---

### 3.18 Prednison

**Kalkulator berat badan** (IDAI hlm. 67; tablet, oral)

| Keadaan | Dosis |
|---|---|
| Akut limfoblastik leukemia | 60 mg/m² induksi terapi 6 minggu *tap off*, *maintenance* |
| DRA | 0,5 mg/kg, 6 jam, oral |
| Sindrom nefrotik | 60 mg/m²/hari atau 2 mg/kg/hari dibagi 3 dosis, selama 4 minggu; kemudian 40 mg/m²/hari dosis tunggal, selang-seling, selama 4–8 minggu |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 88)

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 2 mg/kg/dosis q24 jam po | D | 100% | 100% | 100% | Tak ada | Tak ada |

**Sediaan** (FORNAS 2025 hlm. 149, 199)

| Sediaan |
|---|
| Tablet 5 mg |

**Aturan penggunaan**

- Sesuai tabel IDAI.
- Gunakan dosis terendah yang masih efektif (label prednison).

**Manfaat obat** (label prednison tablet)

- Gangguan endokrin, reumatik, penyakit kolagen, kulit, mata, saluran napas, hematologi, neoplastik, dan saluran cerna.
- Keadaan alergi berat yang tidak teratasi dengan terapi konvensional: rinitis alergi musiman atau perenial, asma bronkial, dermatitis kontak, dermatitis atopik, *serum sickness*, reaksi hipersensitivitas obat.
- Keadaan edema: menginduksi diuresis atau remisi proteinuria pada sindrom nefrotik tanpa uremia, tipe idiopatik atau akibat lupus eritematosus.
- Pada anak, bukti efikasi dan keamanan dari studi publikasi tersedia untuk sindrom nefrotik (>2 tahun) serta limfoma dan leukemia agresif (>1 bulan).

**Efek samping** (label prednison tablet; dilaporkan dengan prednison atau kortikosteroid lain)

- Alergi: reaksi anafilaktoid atau hipersensitivitas, anafilaksis, angioedema.
- Kardiovaskular: antara lain hipertensi, edema, takikardia, gagal jantung kongestif, kardiomiopati hipertrofik pada bayi prematur.
- Kulit: antara lain akne, gangguan penyembuhan luka, striae, kulit tipis rapuh, memar.
- Endokrin: antara lain insufisiensi adrenal, keadaan cushingoid, hiperglikemia, *moon face*, supresi pertumbuhan pada anak.
- Cairan dan elektrolit: retensi cairan dan natrium, hipokalemia, alkalosis hipokalemik.
- Saluran cerna: antara lain distensi abdomen, nyeri perut, anoreksia, konstipasi, diare.

**Peringatan** (label prednison tablet)

- Kontraindikasi: infeksi jamur sistemik dan hipersensitivitas terhadap komponen obat.
- Varisela dan campak dapat berjalan berat atau fatal pada pasien yang tidak imun dan sedang mendapat kortikosteroid; hindari pajanan.
- Anak perlu dipantau tekanan darah, berat badan, tinggi badan, dan tekanan intraokular, serta dievaluasi untuk infeksi, gangguan psikososial, tromboemboli, ulkus peptikum, katarak, dan osteoporosis.
- Kortikosteroid lewat rute apa pun dapat menurunkan kecepatan pertumbuhan anak.

**Farmakodinamik** (label prednison tablet)

- Glukokortikoid alami (hidrokortison dan kortison) juga memiliki sifat retensi garam dan dipakai sebagai terapi pengganti pada defisiensi adrenokortikal.
- Analog sintetis seperti prednison terutama dipakai untuk efek antiinflamasinya yang kuat pada gangguan berbagai sistem organ.
- Glukokortikoid menimbulkan efek metabolik yang luas dan beragam serta memodifikasi respons imun tubuh terhadap berbagai rangsangan.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Prednisone Tablets, USP (Mylan), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=fec09050-5ac2-451b-a2b9-5a21b2def212

---

### 3.19 Meropenem

**Kalkulator berat badan**

IDAI hlm. 12, tabel antimikroba (dosis per kg per hari):

| Rute | Infeksi ringan–sedang | Infeksi berat | Keterangan |
|---|---|---|---|
| IV | Tidak cocok | 60 mg dalam 3 dosis. Maksimal 6 g/hari | Dosis yang lebih tinggi (120 mg dalam 3 dosis) digunakan untuk pengobatan meningitis |

IDAI hlm. 31–32, neonatus:

- IV drip dalam 30 menit.
- Sepsis: 20 mg/kg per dosis IV.

| Umur kehamilan (pascakonsepsi), minggu | Umur pascanatal, hari | Dosis (mg/kg) | Interval (jam) |
|---|---|---|---|
| <32 | ≤14 | 20 | 12 |
| <32 | >14 | 20 | 8 |
| >32 | ≤7 | 20 | 12 |
| >32 | >7 | 20 | 8 |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 86)

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 10–20 mg/kg/dosis q8 jam iv | D, I | 100% | 100% q12 jam | 100% q24 jam | Dosis sesudah dialisis | Dosis untuk LFG <10 |

**Sediaan** (FORNAS 2025 hlm. 34)

| Sediaan | Peresepan maksimal |
|---|---|
| Serbuk injeksi 500 mg | a) *Febrile neutropenia*: dosis 1–3 g/hari, sampai ANC >500/mm³. b) Sepsis dan infeksi berat mengancam jiwa: dosis 1–3 g/hari sampai diperoleh hasil kultur, maks 7 hari. Setelah hasil kultur diperoleh, digantikan dengan antibiotik spektrum sempit yang masih efektif. Meropenem hanya dapat dilanjutkan apabila hasil kultur yang diambil dari tempat yang dicurigai sebagai sumber infeksi menunjukkan bahwa bakteri penyebab hanya sensitif terhadap meropenem |
| Serbuk injeksi 1.000 mg | |

Restriksi FORNAS: a) diberikan atas persetujuan KFT/KPRA/pimpinan RS untuk antibiotik lini ketiga (*reserved antibiotic*) pada infeksi oleh kuman penghasil ESBL; b) tidak untuk profilaksis prabedah.

**Aturan penggunaan**

- Dosis harian dibagi 3 dosis (IDAI).
- Neonatus: IV drip dalam 30 menit; interval sesuai umur kehamilan dan umur pascanatal (IDAI).

**Manfaat obat** (label meropenem)

- Infeksi kulit dan struktur kulit dengan komplikasi (dewasa dan anak usia 3 bulan ke atas).
- Infeksi intraabdomen dengan komplikasi: apendisitis dengan komplikasi dan peritonitis (dewasa dan anak).
- Meningitis bakterial (anak usia 3 bulan ke atas).

**Efek samping** (label meropenem)

- Anak (infeksi selain meningitis, 10–20 mg/kg tiap 8 jam): diare 3,5%, ruam 1,6%, mual dan muntah 0,8%.
- Anak dengan meningitis (40 mg/kg tiap 8 jam): diare 4,7%, ruam (terutama kandidiasis area popok) 3,1%, kandidiasis oral 1,9%, glositis 1,0%.
- Neonatus dan bayi <3 bulan: kejang 5,0%, hiperbilirubinemia (terkonjugasi) 4,5%, muntah 2,5%.

**Peringatan** (label meropenem)

- Kontraindikasi: hipersensitivitas terhadap komponen produk atau obat sekelas, atau riwayat reaksi anafilaktik terhadap beta-laktam.
- Reaksi hipersensitivitas (anafilaksis) serius dan kadang fatal.
- Reaksi kulit berat (SJS, TEN, DRESS, eritema multiformis, AGEP).
- Rabdomiolisis.
- Kejang dan efek SSP lain, terutama pada pasien dengan gangguan SSP, meningitis bakterial, dan/atau gangguan fungsi ginjal.

**Farmakokinetik** (label meropenem)

- Ikatan protein plasma sekitar 2%.
- Waktu paruh eliminasi sekitar 1 jam pada fungsi ginjal normal.
- Sekitar 70% (50–75%) dosis dikeluarkan di urin dalam bentuk tidak berubah dalam 12 jam; 28% lagi sebagai metabolit yang tidak aktif secara mikrobiologis; feses sekitar 2%.

**Farmakodinamik** (label meropenem)

- Aktivitas bakterisidal berasal dari hambatan sintesis dinding sel; meropenem menembus dinding sel sebagian besar bakteri Gram-positif dan Gram-negatif dan berikatan dengan *penicillin-binding protein* (PBP).
- Persentase waktu kadar bebas di atas KHM dalam satu interval dosis paling berkorelasi dengan efikasi pada model hewan dan in vitro.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Meropenem for Injection, USP (Sagent), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=e8848f4a-bca9-4978-b0a1-38483fd4d639

---

### 3.20 Vankomisin

**Kalkulator berat badan** (IDAI hlm. 27, tabel antimikroba; dosis per kg per hari)

| Rute | Infeksi ringan–sedang | Infeksi berat | Keterangan |
|---|---|---|---|
| IV | 30–40 mg dalam 3–4 dosis (dosis harian dewasa, 1–2 g) | 60–70 mg dalam 3–4 dosis (dosis harian dewasa, 2–4g)I | Dosis dan frekuensi individual berdasarkan analisis konsentrasi serum |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 91)

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 10 mg/kg/dosis q6 jam po | D, I | 1,0 gm q12–24 jam | 1,0 gm q24–96 jam | 1,0 gm q4–7 hari | dosis untuk LFG <10 | dosis untuk LFG <10 |

**Sediaan** (FORNAS 2025 hlm. 35)

| Sediaan | Peresepan maksimal |
|---|---|
| Injeksi 500 mg | Maks 10 hari/kasus |

Restriksi FORNAS: diberikan atas persetujuan KFT/KPRA/pimpinan RS untuk antibiotik lini ketiga (*reserved antibiotic*) pada infeksi oleh kuman MRSA atau MRSE positif (dibuktikan dengan hasil kultur).

**Aturan penggunaan**

- Dosis harian dibagi 3–4 dosis; dosis dan frekuensi individual berdasarkan analisis konsentrasi serum (IDAI).
- Diberikan dalam larutan encer selama tidak kurang dari 60 menit untuk menghindari reaksi akibat infus cepat (label vankomisin).

**Manfaat obat** (label vankomisin injeksi)

- Infeksi berat oleh stafilokokus yang resisten metisilin (resisten beta-laktam).
- Pasien alergi penisilin, pasien yang tidak dapat menerima atau tidak berespons terhadap obat lain termasuk penisilin atau sefalosporin, dan infeksi oleh organisme peka vankomisin yang resisten terhadap obat lain.
- Endokarditis stafilokokus; juga dilaporkan efektif pada septikemia, infeksi tulang, infeksi saluran napas bawah, serta infeksi kulit dan struktur kulit oleh stafilokokus.

**Efek samping** (label vankomisin injeksi)

- Reaksi infus (terutama bila infus cepat): reaksi anafilaktoid termasuk hipotensi, mengi, sesak, urtikaria, gatal; kemerahan tubuh bagian atas (*red neck*); nyeri dan spasme otot dada dan punggung.
- Nefrotoksisitas: cedera ginjal akut; nefritis interstisial.
- Ototoksisitas: gangguan pendengaran, sebagian besar pada pasien dengan gangguan ginjal atau gangguan pendengaran sebelumnya.
- Neutropenia reversibel, biasanya mulai 1 minggu atau lebih setelah terapi dimulai atau setelah dosis total lebih dari 25 g.
- Kolitis pseudomembranosa.

**Peringatan** (label vankomisin injeksi)

- Kontraindikasi: hipersensitivitas terhadap vankomisin.
- Pemberian bolus cepat dapat disertai hipotensi berat, termasuk syok dan, jarang, henti jantung.
- Pantau fungsi ginjal; risiko cedera ginjal akut meningkat seiring kadar serum.
- Ototoksisitas dapat sementara atau permanen.
- Reaksi kulit berat, diare terkait *Clostridioides difficile*, dan vaskulitis oklusif retina hemoragik.

**Farmakokinetik** (label vankomisin injeksi)

- Diserap buruk setelah pemberian oral.
- Waktu paruh eliminasi rata-rata 4–6 jam pada fungsi ginjal normal; sekitar 7,5 hari pada pasien anefrik.
- Sekitar 75% dosis dikeluarkan di urin melalui filtrasi glomerulus dalam 24 jam pertama; tidak ada metabolisme yang nyata.
- Sekitar 55% terikat protein serum.
- Tidak mudah berdifusi melalui meninges normal ke cairan spinal.

**Farmakodinamik** (label vankomisin injeksi)

- Aksi bakterisidal terutama melalui hambatan biosintesis dinding sel; vankomisin juga mengubah permeabilitas membran sel bakteri dan sintesis RNA.
- Tidak ada resistensi silang dengan antibiotik lain; tidak aktif in vitro terhadap basil Gram-negatif, mikobakteria, atau jamur.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Vancomycin Hydrochloride for Injection, USP (Mylan Institutional), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2dc7b3d6-3874-40ac-b8aa-7bcfe2dc0cdf

---

### 3.21 Seftazidim

**Kalkulator berat badan**

IDAI hlm. 14, tabel antimikroba (dosis per kg per hari):

| Rute | Infeksi ringan–sedang | Infeksi berat | Keterangan |
|---|---|---|---|
| IV, IM | 90–150 mg dalam 3 dosis (dosis harian dewasa, 3 g) | 200–300 mg dalam 3 dosis (maksimal 8–12 g/hari) | Spektrum luas. Bekerja sebagai anti-*Pseudomonas* |

IDAI hlm. 33, neonatus (IV atau IM):

| Berat badan | Umur pascanatal | Dosis |
|---|---|---|
| <1 kg | ≤14 hari | 50 mg/kg/dosis tiap 12 jam |
| <1 kg | 15–28 hari | 50 mg/kg/dosis tiap 8–12 jam |
| 1–2 kg | ≤7 hari | 50 mg/kg/dosis tiap 12 jam |
| 1–2 kg | 8–28 hari | 50 mg/kg/dosis tiap 8–12 jam |
| >2 kg | ≤7 hari | 50 mg/kg/dosis tiap 12 jam |
| >2 kg | 8–28 hari | 50 mg/kg/dosis tiap 8 jam |

Meningitis (IDAI hlm. 33):

- Umur pascanatal ≤7 hari: 100–150 mg/kg/hari dibagi 8–12 jam.
- Umur pascanatal >7 hari: 150 mg/kg/hari dibagi 8 jam.

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 79)

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 15–25 mg/kg/dosis q8 jam iv, im. Infeksi berat: 50 mg/kg/dosis q6 jam | I | q8–12 jam | q24–48 jam | q48 jam | dosis sesudah dialisis | 50% |

**Sediaan** (FORNAS 2025 hlm. 28)

| Sediaan | Peresepan maksimal |
|---|---|
| Serbuk injeksi 1.000 mg | 3 g/hari selama 7 hari |

Restriksi FORNAS: antibiotik lini ketiga (*reserved antibiotic*), untuk infeksi yang terbukti disebabkan oleh *Pseudomonas aeruginosa*. Diberikan atas persetujuan KFT/KPRA/pimpinan RS.

**Aturan penggunaan**

- Dosis harian dibagi 3 dosis (IDAI).
- Neonatus: interval sesuai berat badan dan umur pascanatal (IDAI).

**Manfaat obat** (label Tazicef; infeksi oleh galur yang peka)

- Infeksi saluran napas bawah, termasuk pneumonia.
- Infeksi kulit dan struktur kulit.
- Infeksi saluran kemih, dengan atau tanpa komplikasi.
- Septikemia bakterial.
- Infeksi tulang dan sendi.
- Infeksi ginekologi.
- Infeksi intraabdomen, termasuk peritonitis.
- Infeksi sistem saraf pusat, termasuk meningitis.

**Efek samping** (label Tazicef)

- Paling sering: reaksi lokal setelah injeksi IV, reaksi alergi, dan reaksi saluran cerna.
- Lokal (<2%): flebitis dan inflamasi di tempat suntikan.
- Hipersensitivitas (2%): gatal, ruam, demam.
- Saluran cerna (<2%): diare, mual, muntah, nyeri perut.
- SSP (<1%): sakit kepala, pusing, parestesia. Kejang pernah dilaporkan pada beberapa sefalosporin, termasuk seftazidim; ensefalopati, koma, asteriksis, eksitabilitas neuromuskular, dan mioklonia pernah dilaporkan pada pasien gangguan ginjal dengan dosis yang tidak disesuaikan.

**Peringatan** (label Tazicef)

- Kontraindikasi: hipersensitivitas terhadap seftazidim atau golongan sefalosporin.
- Kadar serum tinggi dan lama dapat terjadi dengan dosis biasa pada penurunan produksi urin akibat insufisiensi ginjal; dosis harian total harus dikurangi.

**Farmakokinetik** (label Tazicef)

- Waktu paruh setelah pemberian IV sekitar 1,9 jam.
- Kurang dari 10% terikat protein; tidak bergantung kadar.
- Sekitar 80–90% dosis IM atau IV dikeluarkan dalam bentuk tidak berubah oleh ginjal dalam 24 jam; sekitar 50% dosis muncul di urin dalam 2 jam pertama.

**Farmakodinamik** (label Tazicef)

- Agen bakterisidal yang bekerja dengan menghambat sintesis dinding sel bakteri.
- Aktif dengan adanya sebagian beta-laktamase (penisilinase dan sefalosporinase) dari bakteri Gram-negatif dan Gram-positif.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. TAZICEF (ceftazidime for injection) (Hospira), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=40d48c5d-650e-461b-a67b-7e65772d1b92

---

### 3.22 Kloramfenikol

**Kalkulator berat badan**

IDAI hlm. 16, tabel antimikroba (dosis per kg per hari):

| Rute | Infeksi ringan–sedang | Infeksi berat | Keterangan |
|---|---|---|---|
| IV | 50–75 mg/kg/hari | 75–100 mg dalam 4 dosis (dosis harian dewasa, 2–4 g) | Dosis dan frekuensi individual berdasarkan analisis konsentrasi serum. Biasanya disediakan untuk infeksi serius karena risiko langka anemia aplastik. HATI-HATI pada: anak usia <1 tahun; anak usia <10 tahun dengan keluhan gastrointestinal; neonatus (prematur dan matur, karena lebih rentan terhadap risiko *gray syndrome*) |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 80)

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 40 mg/kg/dosis stat kmd 25 mg/kg/dosis q6–24 jam iv, im, po | D | 100% | 75% | 50% | tak ada | tak ada |

**Sediaan** (FORNAS 2025 hlm. 29)

| Sediaan | Peresepan maksimal |
|---|---|
| Kapsul 250 mg | 4 kaps/hari selama 5 hari. Untuk meningitis: anak 2 g/hari selama 14 hari; dewasa 4 g/hari selama 14 hari |
| Kapsul 500 mg | (sama dengan kapsul 250 mg) |
| Suspensi 125 mg/5 mL | 5 hari. Untuk meningitis: maks 14 hari |
| Injeksi 1.000 mg | 14 hari |

**Aturan penggunaan**

- Dosis harian dibagi 4 dosis; dosis dan frekuensi individual berdasarkan analisis konsentrasi serum (IDAI).
- Sediaan natrium suksinat hanya untuk intravena; terbukti tidak efektif bila diberikan intramuskular (label kloramfenikol injeksi).

**Manfaat obat** (label kloramfenikol injeksi)

Hanya untuk infeksi serius bila obat yang kurang berbahaya tidak efektif atau dikontraindikasikan:

- Infeksi akut oleh *Salmonella typhi* (tidak dianjurkan untuk pengobatan rutin keadaan karier tifoid).
- Infeksi serius oleh: spesies *Salmonella*; *H. influenzae*, terutama infeksi meningen; *Rickettsia*; kelompok limfogranuloma-psitakosis; berbagai bakteri Gram-negatif penyebab bakteremia, meningitis, atau infeksi Gram-negatif serius lain; organisme peka lain yang terbukti resisten terhadap semua antimikroba lain yang sesuai.
- Regimen fibrosis kistik.

**Efek samping** (label kloramfenikol injeksi)

- Diskrasia darah: depresi sumsum tulang adalah efek samping paling serius; anemia aplastik, anemia hipoplastik, trombositopenia, dan granulositopenia yang serius dan fatal. Tipe reversibel yang bergantung dosis juga dapat terjadi.
- *Gray syndrome*: reaksi toksik termasuk kematian pada bayi prematur dan neonatus; gejala berurutan berupa distensi abdomen dengan atau tanpa muntah, sianosis pucat progresif, kolaps vasomotor yang sering disertai pernapasan tidak teratur, dan kematian.
- Saluran cerna: mual, muntah, glositis, stomatitis, diare, enterokolitis.
- Neurotoksik: sakit kepala, depresi ringan, kebingungan, delirium; neuritis optik dan perifer, biasanya setelah terapi jangka panjang.
- Hipersensitivitas: demam, ruam makular dan vesikular, angioedema, urtikaria.

**Peringatan** (label kloramfenikol injeksi)

- Diskrasia darah serius dan fatal dapat terjadi setelah terapi jangka pendek maupun panjang; anemia aplastik yang kemudian berakhir sebagai leukemia pernah dilaporkan.
- Tidak boleh digunakan untuk infeksi ringan atau bukan indikasinya (misalnya selesma, influenza, infeksi tenggorokan) atau sebagai profilaksis.
- Pemeriksaan darah yang memadai diperlukan selama terapi.
- Kontraindikasi: riwayat hipersensitivitas dan/atau reaksi toksik terhadap kloramfenikol.
- Bayi prematur, neonatus cukup bulan, dan bayi: hati-hati terhadap toksisitas *gray syndrome*; kadar darah berlebih dapat terjadi pada dosis yang dianjurkan karena metabolisme belum matang.

**Farmakokinetik** (label kloramfenikol injeksi)

- Diserap cepat dari saluran cerna bila diberikan oral.
- Ekskresi urin total 68–99% dalam 3 hari; 8–12% berupa kloramfenikol bebas, sisanya metabolit inaktif, terutama konjugat glukuronat.
- Distribusi cepat tetapi tidak merata; kadar tertinggi di hati dan ginjal, terendah di otak dan cairan serebrospinal. Masuk ke cairan serebrospinal walaupun tanpa radang meninges, dengan kadar sekitar setengah kadar darah.

**Farmakodinamik** (label kloramfenikol injeksi)

- Antibiotik spektrum luas yang menghambat sintesis protein bakteri dengan mengganggu transfer asam amino teraktivasi dari RNA terlarut ke ribosom.
- In vitro terutama bersifat bakteriostatik terhadap berbagai bakteri Gram-negatif dan Gram-positif.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Chloramphenicol Sodium Succinate for Injection, USP (Fresenius Kabi), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=aed29594-211d-49ef-813f-131975a8d0e3

---

### 3.23 Klindamisin

**Kalkulator berat badan**

IDAI hlm. 16, tabel antimikroba (dosis per kg per hari):

| Rute | Infeksi ringan–sedang | Infeksi berat | Keterangan |
|---|---|---|---|
| PO | 10–25 mg dalam 3 dosis (dosis harian dewasa, 600 mg–1,8 g) | 30–40 mg dalam 3–4 dosis (dosis harian dewasa, 1,2–1,8 g) | Dosis 30–40 mg dianjurkan untuk OMA, SARM terkait komunitas |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 80)

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 6 mg/kg/dosis q6 jam po atau 10 mg/kg/dosis q8 jam iv, im | D | 100% | 100% | 100% | tak ada | tak ada |

**Sediaan** (FORNAS 2025 hlm. 33)

| Sediaan | Peresepan maksimal |
|---|---|
| Kapsul 150 mg | 4 kaps/hari selama 5 hari kecuali untuk toksoplasmosis selama 6 minggu |
| Kapsul 300 mg | 4 kaps/hari selama 5 hari kecuali untuk toksoplasmosis 8 kaps/hari selama 6 minggu. Untuk abses paru atau empiema: 3–4 kaps/hari selama 14 hari |

**Aturan penggunaan**

- Dosis harian dibagi 3 atau 3–4 dosis (IDAI).

**Manfaat obat** (label Cleocin HCl)

- Infeksi serius oleh bakteri anaerob yang peka: infeksi saluran napas serius (empiema, pneumonitis anaerob, abses paru), infeksi kulit dan jaringan lunak serius, septikemia, infeksi intraabdomen (peritonitis, abses intraabdomen).
- Infeksi serius oleh galur streptokokus, pneumokokus, dan stafilokokus yang peka; penggunaannya disediakan untuk pasien alergi penisilin atau pasien yang menurut dokter tidak sesuai mendapat penisilin.

**Efek samping** (label Cleocin HCl)

- Saluran cerna: kolitis *Clostridioides difficile*, nyeri perut, kolitis pseudomembranosa, mual, muntah, diare; esofagitis dan ulkus esofagus, terutama bila diminum sambil berbaring atau dengan sedikit air; rasa tidak enak atau rasa logam.
- Hipersensitivitas: ruam morbiliformis (makulopapular) ringan–sedang adalah efek samping yang paling sering dilaporkan; ruam vesikulobulosa, urtikaria; reaksi kulit berat seperti nekrolisis epidermal toksik, AGEP, eritema multiformis.

**Peringatan** (label Cleocin HCl)

- Peringatan berbingkai: infeksi *Clostridioides difficile* dapat terjadi, dari diare ringan sampai kolitis fatal; disediakan untuk infeksi serius bila antimikroba yang kurang toksik tidak sesuai; tidak untuk infeksi nonbakteri seperti sebagian besar infeksi saluran napas atas.
- Kontraindikasi: riwayat hipersensitivitas terhadap sediaan yang mengandung klindamisin atau linkomisin.
- Reaksi hipersensitivitas berat dan reaksi kulit berat (TEN, DRESS, SJS), sebagian fatal.
- Berpotensi nefrotoksik; cedera ginjal akut pernah dilaporkan.
- Tidak digunakan untuk meningitis karena tidak berdifusi cukup ke cairan serebrospinal.
- Bila diberikan pada anak (lahir sampai 16 tahun), pemantauan fungsi sistem organ yang sesuai diperlukan.

**Farmakokinetik** (label Cleocin HCl)

- Diserap cepat dan hampir sempurna (90%) setelah pemberian oral; makanan tidak banyak mengubah kadar serum.
- Tersebar luas di cairan dan jaringan tubuh, termasuk tulang; tidak mencapai kadar bermakna di cairan serebrospinal, bahkan pada meninges meradang.
- Dimetabolisme terutama oleh CYP3A4 (sedikit oleh CYP3A5) menjadi klindamisin sulfoksida dan N-desmetilklindamisin.
- Waktu paruh biologis rata-rata 2,4 jam; sekitar 10% bioaktivitas dikeluarkan di urin dan 3,6% di feses.

**Farmakodinamik** (label Cleocin HCl)

- Menghambat sintesis protein bakteri dengan berikatan pada 23S RNA subunit ribosom 50S.
- Bersifat bakteriostatik.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. CLEOCIN HCl (clindamycin hydrochloride) capsules (Pharmacia & Upjohn), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=df9a2a41-b132-4f43-8940-b2d773b1369a

---

### 3.24 Eritromisin

**Kalkulator berat badan**

IDAI hlm. 20, tabel antimikroba (dosis per kg per hari):

| Rute | Infeksi ringan–sedang | Infeksi berat | Keterangan |
|---|---|---|---|
| PO | 50 mg dalam 3–4 dosis (dosis harian dewasa, 1–2 g) | Tidak cocok | Tersedia dalam basa, stearat, dan persiapan etilsuksinat. Profilaksis demam reumatik: 250 mg, oral, 12 jam |
| IV | Tidak cocok | 20 mg dalam 4 dosis (dosis harian dewasa, 2–4 g) | Pengobatan lebih dari setidaknya 60 menit berpotensi untuk mencegah aritmia jantung |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 82)

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 10 mg/kg/dosis q6 jam iv, po | D | 100% | 100% | 100% | tak ada | tak ada |

**Sediaan** (FORNAS 2025 hlm. 31)

| Sediaan | Peresepan maksimal |
|---|---|
| Tablet/kapsul 250 mg | 4 tab/kaps per hari selama 5 hari. Untuk *Streptococcus pyogenes* dan difteri: 10 hari |
| Tablet/kapsul 500 mg | – |
| Sirup kering 200 mg/5 mL | 5 hari. Untuk *Streptococcus pyogenes* dan difteri: 10 hari |

**Aturan penggunaan**

- Oral: dosis harian dibagi 3–4 dosis (IDAI).

**Manfaat obat** (label eritromisin etilsuksinat suspensi oral; infeksi oleh galur yang peka)

- Infeksi saluran napas atas ringan–sedang oleh *S. pyogenes*, *S. pneumoniae*, atau *H. influenzae* (bersama sulfonamida).
- Infeksi saluran napas bawah ringan–sedang oleh *S. pneumoniae* atau *S. pyogenes*.
- Listeriosis.
- Pertusis: mengeliminasi organisme dari nasofaring sehingga penderita tidak menular.
- Infeksi saluran napas oleh *Mycoplasma pneumoniae*.
- Infeksi kulit dan struktur kulit ringan–sedang oleh *S. pyogenes* atau *S. aureus*.
- Difteri: sebagai tambahan antitoksin, untuk mencegah dan mengeradikasi karier.
- Eritrasma.
- Amebiasis usus (eritromisin oral).

**Efek samping** (label eritromisin etilsuksinat)

- Paling sering pada saluran cerna dan bergantung dosis: mual, muntah, nyeri perut, diare, anoreksia.
- Gejala hepatitis, gangguan fungsi hati, dan/atau hasil uji fungsi hati abnormal.
- Kolitis pseudomembranosa.
- Pemanjangan QT dan aritmia ventrikel, termasuk takikardia ventrikel dan torsades de pointes.
- Reaksi alergi dari urtikaria sampai anafilaksis; reaksi kulit dari erupsi ringan sampai eritema multiformis, sindrom Stevens-Johnson, dan nekrolisis epidermal toksik (jarang).
- Nefritis interstisial.

**Peringatan** (label eritromisin etilsuksinat)

- Kontraindikasi: hipersensitivitas terhadap eritromisin; penggunaan bersama terfenadin, astemizol, pimozid, atau cisaprid; penggunaan bersama statin yang banyak dimetabolisme CYP3A4 (lovastatin, simvastatin).
- Stenosis pilorus hipertrofik infantil pernah dilaporkan pada bayi setelah terapi eritromisin. Pada satu kohort 157 bayi baru lahir yang mendapat eritromisin untuk profilaksis pertusis, 7 bayi (5%) mengalami stenosis pilorus yang memerlukan piloromiotomi.
- Pemanjangan interval QT; kasus torsades de pointes dan kematian pernah dilaporkan.

**Farmakokinetik** (label eritromisin etilsuksinat)

- Suspensi etilsuksinat diserap baik pada keadaan puasa maupun tidak puasa.
- Mudah berdifusi ke sebagian besar cairan tubuh; kadar di cairan spinal biasanya rendah, tetapi meningkat pada meningitis.
- Pada fungsi hati normal, dipekatkan di hati dan dikeluarkan di empedu; kurang dari 5% dosis oral dikeluarkan dalam bentuk aktif di urin.
- Melintasi plasenta (kadar plasma janin rendah) dan dikeluarkan di ASI.

**Farmakodinamik** (label eritromisin etilsuksinat)

- Menghambat sintesis protein dengan berikatan pada subunit ribosom 50S organisme yang peka; tidak memengaruhi sintesis asam nukleat.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Erythromycin Ethylsuccinate for Oral Suspension (Amneal), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=581d7430-1a80-42a6-befb-4c3ae8140392

---

### 3.25 Omeprazol

**Kalkulator berat badan** (IDAI hlm. 66)

| Rute | Dosis |
|---|---|
| Oral | 0,4–0,8 mg/kg, 12–24 jam |
| IV | 2 mg/kg, kemudian 1 mg/kg |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 87)

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 0,4–0,8 mg/kg/dosis q12–24 jam po | D | 100% | 100% | 100% | Tak ada data | Tak ada data |

**Sediaan** (FORNAS 2025 hlm. 189)

| Sediaan | Peresepan maksimal | Restriksi |
|---|---|---|
| Kapsul 20 mg | 30 kaps/bulan | a) Untuk terapi jangka pendek pada kasus tukak lambung, tukak duodenum, dan refluks esofagitis. b) Diberikan 1 jam sebelum makan |
| Injeksi 40 mg | 1–3 ampul/hari maks 3 hari | Untuk pasien IGD atau rawat inap dengan riwayat perdarahan saluran cerna |

**Aturan penggunaan**

- Oral: interval 12–24 jam (IDAI).
- Kapsul diberikan 1 jam sebelum makan (FORNAS).

**Manfaat obat** (label Prilosec)

- Pengobatan heartburn dan gejala lain akibat penyakit refluks gastroesofagus (GERD) sampai 4 minggu pada pasien usia 1 tahun ke atas.
- Pengobatan jangka pendek (4–8 minggu) esofagitis erosif akibat GERD yang didiagnosis endoskopi pada pasien usia 1 tahun ke atas, dan pada anak 1 bulan sampai <1 tahun.
- Pemeliharaan penyembuhan esofagitis erosif.
- Pada dewasa: tukak duodenum aktif, eradikasi *H. pylori*, tukak lambung jinak aktif.

**Efek samping** (label Prilosec)

- Dewasa (≥2%): sakit kepala 7%, nyeri perut 5%, mual 4%, diare 4%, muntah 3%, flatulens 3%.
- Profil keamanan pada anak mirip dewasa. Khusus pada anak, efek samping sistem pernapasan sering dilaporkan (usia 1 bulan–<1 tahun 42%, 1–<2 tahun 75%, 2–16 tahun 19%); otitis media sering pada usia 1 bulan–<1 tahun (22%); demam sering pada usia 1–<2 tahun (33%).

**Peringatan** (label Prilosec)

- Kontraindikasi: hipersensitivitas terhadap benzimidazol tersubstitusi atau komponen formulasi; pasien yang mendapat produk yang mengandung rilpivirin.
- Nefritis tubulointerstisial akut.
- Diare terkait *Clostridioides difficile*.
- Fraktur tulang.
- Reaksi kulit berat; lupus eritematosus kutaneus dan sistemik.
- Defisiensi vitamin B12 pada terapi jangka panjang; hipomagnesemia.
- Polip kelenjar fundus.

**Farmakokinetik** (label Prilosec)

- Penyerapan dimulai setelah granul tahan asam lambung meninggalkan lambung; kadar puncak setelah dosis berulang suspensi 1,5–2 jam.
- Waktu paruh plasma 0,5–1 jam pada orang sehat.
- Ikatan protein sekitar 95%.
- Dimetabolisme luas oleh CYP2C19 (membentuk hidroksiomeprazol) dan CYP3A4 (membentuk omeprazol sulfon).
- Sekitar 77% dosis dikeluarkan di urin sebagai metabolit; sisanya di feses.

**Farmakodinamik** (label Prilosec)

- Golongan benzimidazol tersubstitusi yang menekan sekresi asam lambung dengan menghambat secara spesifik sistem enzim H+/K+ ATPase (pompa proton) di permukaan sekretorik sel parietal lambung.
- Memblok langkah akhir produksi asam; efeknya bergantung dosis dan menghambat sekresi asam basal maupun terstimulasi.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. PRILOSEC (omeprazole magnesium) (Covis Pharma), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b6761f84-53ac-4745-a8c8-1e5427d7e179

---

### 3.26 Metoklopramid

**Kalkulator berat badan** (IDAI hlm. 63)

| Rute/keadaan | Dosis |
|---|---|
| IV, IM, oral | 0,1–0,3 mg/kg, 8 jam |
| Perrektal | 0,2–0,4 mg/kg, 8 jam |
| Perioperatif | 0,5 mg/kg, IV, kemudian 0,2 mg/kg, 4–6 jam bila perlu |
| Kemoterapi | maks 1–2 mg/kg, 4 jam, IV |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 86)

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 0,15–0,3 mg/kg/dosis q6 jam iv, im, po | D | 100% | 75% | 50% | Tak ada | Tak ada data |

**Sediaan** (FORNAS 2025 hlm. 190)

| Sediaan |
|---|
| Tablet 5 mg |
| Tablet 10 mg |
| Injeksi 5 mg/mL |

**Aturan penggunaan**

- Sesuai tabel IDAI.
- Gunakan untuk durasi sesingkat mungkin dan nilai ulang kebutuhan terapi secara berkala (label Reglan).

**Manfaat obat**

- Tablet (dewasa): refluks gastroesofagus simtomatik yang tidak berespons terhadap terapi konvensional (4–12 minggu) dan gastroparesis diabetik (label Reglan).
- Injeksi: memudahkan intubasi usus halus pada dewasa dan anak bila selang tidak melewati pilorus dengan cara biasa; pada dewasa juga untuk gastroparesis diabetik, profilaksis muntah akibat kemoterapi emetogenik, profilaksis mual-muntah pascaoperasi, dan pemeriksaan radiologi (label injeksi).

**Efek samping**

- Paling sering (sekitar 10% pasien yang mendapat 10 mg 4 kali sehari): gelisah, mengantuk, lelah, lesu (label Reglan).
- Reaksi distonia akut, jenis gejala ekstrapiramidal tersering: sekitar 0,2% pada dosis 30–40 mg/hari; pada kemoterapi dengan 1–2 mg/kg per dosis, 25% atau lebih pada anak dan dewasa <30 tahun yang tidak mendapat profilaksis difenhidramin (label injeksi).

**Peringatan**

- Peringatan berbingkai: dapat menyebabkan diskinesia tardif, gangguan gerak serius yang dapat permanen; risikonya meningkat dengan lama terapi dan dosis kumulatif. Hentikan segera bila timbul tanda diskinesia tardif (label Reglan).
- Tidak dianjurkan pada anak karena risiko diskinesia tardif dan gejala ekstrapiramidal lain, serta risiko methemoglobinemia pada neonatus. Distonia dan gejala ekstrapiramidal lebih sering pada anak dibanding dewasa (label Reglan).
- Keamanan dan efektivitas injeksi pada anak hanya ditetapkan untuk dosis tunggal guna memudahkan intubasi usus halus (label injeksi).
- Kontraindikasi: riwayat diskinesia tardif atau reaksi distonia terhadap metoklopramid; bila stimulasi motilitas saluran cerna berbahaya (perdarahan, obstruksi mekanik, perforasi); feokromositoma; epilepsi; hipersensitivitas terhadap metoklopramid (label Reglan).

**Farmakokinetik** (label Reglan)

- Bioavailabilitas oral absolut 80% ± 15,5%; kadar puncak 1–2 jam setelah dosis oral tunggal.
- Waktu paruh eliminasi rata-rata 5–6 jam pada fungsi ginjal normal.
- Tidak banyak terikat protein plasma (sekitar 30%); volume distribusi tinggi (sekitar 3,5 L/kg).
- Dimetabolisme di hati melalui oksidasi serta konjugasi glukuronida dan sulfat; metabolit oksidatif utama dibentuk terutama oleh CYP2D6.
- Sekitar 85% radioaktivitas dosis oral muncul di urin dalam 72 jam.

**Farmakodinamik**

- Merangsang motilitas saluran cerna atas tanpa merangsang sekresi lambung, empedu, atau pankreas; meningkatkan tonus dan amplitudo kontraksi lambung, merelaksasi sfingter pilorus dan bulbus duodenum, meningkatkan peristaltik duodenum dan jejunum, serta meningkatkan tonus istirahat sfingter esofagus bawah (label Reglan).
- Memblok stimulasi *chemoreceptor trigger zone* oleh dopamin dan zat mirip dopamin melalui antagonisme reseptor dopamin (label injeksi).

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. REGLAN (metoclopramide) tablets (ANI Pharmaceuticals), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=de55c133-eb08-4a35-91a2-5dc093027397
4. Metoclopramide Injection (Baxter), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f6efdc63-a9df-4bbd-acf8-75fc9d1b0347

---

### 3.27 Fitomenadion (Vitamin K1)

**Kalkulator berat badan**

| Keadaan | Dosis | Sumber |
|---|---|---|
| Perdarahan karena defisiensi vitamin K | 1 mg intravena | IDAI hlm. 30 |
| Profilaksis pada neonatus | 1 mg (0,1 ml) 1 jam setelah lahir | IDAI hlm. 30 dan 72 |
| DKPD/APCD | 1 mg IM selama 3 hari | IDAI hlm. 72 |
| Injeksi 2 mg/mL (i.m.) | Dosis untuk bayi baru lahir 1 mg; dosis untuk bayi prematur 0,5 mg | FORNAS hlm. 114 |

**Sediaan** (FORNAS 2025 hlm. 114)

| Sediaan |
|---|
| Injeksi 2 mg/mL (i.m.) |
| Injeksi 10 mg/mL (i.m.) |

**Aturan penggunaan**

- Sesuai tabel di atas (IDAI, FORNAS).

**Manfaat obat** (label vitamin K1 injeksi)

- Profilaksis dan pengobatan perdarahan akibat defisiensi vitamin K pada neonatus.
- Pengobatan hipoprotrombinemia akibat defisiensi atau gangguan aktivitas vitamin K: akibat antikoagulan kumarin atau indandion, akibat terapi antibakteri, akibat gangguan penyerapan atau sintesis vitamin K (misalnya ikterus obstruktif, fistula bilier, penyakit seliak, fibrosis kistik pankreas), dan akibat obat lain seperti salisilat.

**Efek samping** (label vitamin K1 injeksi)

- Jantung: takikardia, hipotensi.
- Lokal dan umum: kemerahan menyeluruh; nyeri, bengkak, dan nyeri tekan di tempat suntikan.
- Hepatobilier: hiperbilirubinemia.
- Imun: reaksi hipersensitivitas fatal, reaksi anafilaktik.
- Saraf: gangguan pengecapan, pusing. Paru: sesak.
- Kulit: eritema, plak gatal, lesi mirip skleroderma.

**Peringatan** (label vitamin K1 injeksi)

- Peringatan berbingkai: reaksi hipersensitivitas fatal, termasuk anafilaksis, terjadi selama dan segera setelah injeksi intravena dan intramuskular, walaupun sudah diencerkan dan pada dosis pertama.
- Kontraindikasi: hipersensitivitas terhadap fitomenadion atau komponen lain.
- Hiperbilirubinemia pada bayi baru lahir, terutama bayi prematur, dapat terjadi akibat dosis berlebih.
- Reaksi serius termasuk kematian dan *gasping syndrome* terjadi pada bayi prematur di ruang intensif yang mendapat obat dengan pengawet benzil alkohol.

**Farmakokinetik** (label vitamin K1 injeksi)

- Mudah diserap setelah pemberian intramuskular.
- Setelah diserap, mula-mula terkonsentrasi di hati, lalu kadarnya cepat turun; sangat sedikit tertimbun di jaringan.
- Nasib metabolisme belum banyak diketahui; hampir tidak ada vitamin K bebas yang tidak dimetabolisme di empedu atau urin.

**Farmakodinamik** (label vitamin K1 injeksi)

- Memiliki aktivitas yang sama dengan vitamin K alami, yang diperlukan hati untuk memproduksi protrombin (faktor II), faktor VII, IX, dan X.
- Kofaktor enzim mikrosomal yang mengkatalisis karboksilasi residu asam glutamat pada prekursor faktor II, VII, IX, dan X.
- Efek pemberian intravena biasanya terdeteksi dalam 1–2 jam; perdarahan biasanya terkontrol dalam 3–6 jam; INR normal sering tercapai dalam 12–14 jam.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Vitamin K1 (phytonadione) Injectable Emulsion (Hospira), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=e8808230-2c44-44c6-8cab-8f29b6b34051

---

### 3.28 Hidrokortison

**Kalkulator berat badan** (IDAI hlm. 54)

| Keadaan | Dosis |
|---|---|
| – | 5 mg/kg, IV, IM, 12 jam |
| Inflamasi, imunosupresi, insufisiensi adrenal akut | 2–4 mg/kg (maks 100 mg), 6 jam IV |
| Fisiologis, stress | 1 mg/kg 6 jam IV, IM |
| Penggantian kronik, oral | Insufisiensi adrenal 3–4 mg/m² (maks 10 mg) 8 jam; hipoplasia adrenal kongenital 6–8 mg/m² 8 jam (bayi), >12 bulan 3–6 mg/m² (maks 10 mg) 8 jam |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 84)

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 0,5–2 mg/kg/dosis q6–8 jam po | D | 100% | 100% | 100% | tak ada data | tak ada data |

**Sediaan** (FORNAS 2025)

| Sediaan | Halaman FORNAS |
|---|---|
| Tablet 20 mg | hlm. 148 |
| Injeksi 100 mg | hlm. 17, 148 |

**Aturan penggunaan**

- Sesuai tabel IDAI.

**Manfaat obat** (label Solu-Cortef; IV atau IM bila terapi oral tidak memungkinkan)

- Keadaan alergi berat yang tidak teratasi dengan terapi konvensional: asma, dermatitis atopik, dermatitis kontak, reaksi hipersensitivitas obat, *serum sickness*, reaksi transfusi.
- Gangguan endokrin: insufisiensi adrenokortikal primer atau sekunder (hidrokortison atau kortison adalah obat pilihan), hiperplasia adrenal kongenital, hiperkalsemia akibat kanker, tiroiditis nonsupuratif.
- Penyakit kulit, saluran cerna, hematologi, neoplastik (leukemia dan limfoma), sistem saraf (edema serebri), mata, ginjal (sindrom nefrotik idiopatik atau akibat lupus), saluran napas, dan reumatik.

**Efek samping** (label Solu-Cortef; dilaporkan dengan Solu-Cortef atau kortikosteroid lain)

- Alergi: reaksi alergi atau hipersensitivitas, reaksi anafilaktoid, anafilaksis, angioedema.
- Kardiovaskular: antara lain hipertensi, takikardia, gagal jantung kongestif, kardiomiopati hipertrofik pada bayi prematur.
- Kulit: antara lain akne, rasa terbakar atau kesemutan (terutama di perineum setelah injeksi IV), gangguan penyembuhan luka, striae, kulit tipis rapuh.
- Endokrin: antara lain keadaan cushingoid, gangguan toleransi glukosa, **supresi pertumbuhan pada anak**.
- Cairan dan elektrolit: retensi cairan dan natrium, kehilangan kalium, alkalosis hipokalemik.

**Peringatan** (label Solu-Cortef)

- Kontraindikasi: infeksi jamur sistemik; hipersensitivitas terhadap produk; pemberian intratekal. Sediaan kortikosteroid intramuskular dikontraindikasikan pada purpura trombositopenik idiopatik.
- Anak yang mendapat kortikosteroid lewat rute apa pun dapat mengalami penurunan kecepatan pertumbuhan.

**Farmakokinetik** (label Solu-Cortef)

- Setelah injeksi IV hidrokortison natrium suksinat, efek terlihat dalam 1 jam dan bertahan dalam waktu yang bervariasi.
- Ekskresi dosis hampir lengkap dalam 12 jam.
- Diserap cepat bila diberikan intramuskular.

**Farmakodinamik** (label Solu-Cortef)

- Glukokortikoid alami (hidrokortison dan kortison) juga memiliki sifat retensi garam dan dipakai sebagai terapi pengganti pada defisiensi adrenokortikal.
- Hidrokortison natrium suksinat memiliki aksi metabolik dan antiinflamasi yang sama dengan hidrokortison; pada jumlah ekuimolar keduanya setara aktivitas biologisnya.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. SOLU-CORTEF (hydrocortisone sodium succinate) for injection (Pharmacia & Upjohn), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=65eefd58-b166-4d71-ade6-45c8fdf86922
