# Kalkulator Dosis Obat Anak

Draf 0.15, 16 Oktober 2026 (118 obat). Materi untuk ditinjau pemilik; belum diterapkan di website.

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
| PO, IV | 8–10 mg/kg/hari komponen TMP dalam 2 dosis (dosis harian dewasa, 320 mg TMP) | 2 mg komponen TMP sehari sekali untuk profilaksis ISK |

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
| IV | 30–40 mg dalam 3–4 dosis (dosis harian dewasa, 1–2 g) | 60–70 mg dalam 3–4 dosis | Dosis dan frekuensi individual berdasarkan analisis konsentrasi serum |

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

---

### 3.29 Isoniazid

**Kalkulator berat badan**

| Keadaan | Dosis | Sumber |
|---|---|---|
| – | 10 mg/kgBB/hari, diberikan dalam dosis tunggal | IDAI hlm. 31 dan 57 |
| Intermiten | 15 mg/kg, 3x/mgg | IDAI hlm. 57 |
| Meningitis TB | 15–20 mg/kg (maks 500 mg/hari) | IDAI hlm. 57 |
| Tablet 100 mg (profilaksis TB pada anak) | 10 mg/kgBB, maks 6 bulan setiap hari | FORNAS hlm. 43 |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 84)

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 10 mg/kg/dosis q24 jam iv, im, po | D | 100% | 100% | 100% | Dosis sesudah dialisis | Dosis untuk LFG <10 |

**Sediaan** (FORNAS 2025 hlm. 43)

| Sediaan | Peresepan maksimal | Keterangan FORNAS |
|---|---|---|
| Tablet 100 mg | 10 mg/kgBB, maks 6 bulan setiap hari | Dapat digunakan untuk profilaksis TB pada anak |
| Tablet 300 mg | 1 tab (300 mg)/hari, maks 6 bulan | Dapat digunakan untuk profilaksis TB pada ODHA dewasa |

**Aturan penggunaan**

- Diberikan dalam dosis tunggal (IDAI).
- TB aktif harus diobati dengan beberapa obat anti-TB bersamaan untuk mencegah resistensi; pengobatan TB aktif dengan isoniazid saja tidak memadai (label isoniazid).

**Manfaat obat** (label isoniazid)

- Semua bentuk tuberkulosis yang organismenya peka (bersama obat anti-TB lain).
- Terapi pencegahan, antara lain pada orang dengan infeksi HIV, kontak erat penderita TB menular yang baru didiagnosis, serta anak dan remaja dengan tuberkulin negatif yang menjadi kontak erat penderita menular dalam 3 bulan terakhir.

**Efek samping** (label isoniazid)

- Paling sering mengenai sistem saraf dan hati.
- Neuropati perifer adalah efek toksik tersering; bergantung dosis, lebih sering pada gizi kurang dan pada asetilator lambat; biasanya didahului parestesia kaki dan tangan.
- Efek neurotoksik lain (jarang pada dosis biasa): kejang, ensefalopati toksik, neuritis dan atrofi optik, gangguan memori, psikosis toksik; sindrom serebelar.
- Hati: kenaikan transaminase, bilirubinemia, ikterus, kadang hepatitis berat dan fatal. Gangguan fungsi hati ringan dan sementara terjadi pada 10–20% pasien.

**Peringatan** (label isoniazid)

- Peringatan berbingkai: hepatitis berat dan kadang fatal dapat terjadi, bahkan setelah berbulan-bulan terapi. Risiko berkaitan dengan usia: kurang dari 1 per 1.000 pada usia di bawah 20 tahun.
- Kontraindikasi: reaksi hipersensitivitas berat termasuk hepatitis akibat obat; riwayat cedera hati akibat isoniazid; reaksi berat seperti demam obat, menggigil, artritis; penyakit hati akut apa pun.
- Reaksi kulit berat (TEN, SJS, DRESS).
- Sindrom serebelar.

**Farmakokinetik** (label isoniazid)

- Kadar puncak darah 1–2 jam setelah pemberian oral, turun menjadi 50% atau kurang dalam 6 jam.
- Mudah berdifusi ke semua cairan tubuh (cairan serebrospinal, pleura, asites), jaringan, organ, dan ekskreta; melintasi plasenta dan masuk ke ASI.
- 50–70% dosis dikeluarkan di urin dalam 24 jam.
- Dimetabolisme terutama melalui asetilasi dan dehidrazinasi; kecepatan asetilasi ditentukan secara genetik. Asetilasi lambat dapat menyebabkan kadar darah lebih tinggi dan reaksi toksik meningkat.

**Farmakodinamik** (label isoniazid)

- Menghambat sintesis asam mikolat, komponen penting dinding sel bakteri.
- Pada kadar terapeutik bersifat bakterisidal terhadap *Mycobacterium tuberculosis* yang sedang tumbuh aktif, baik intrasel maupun ekstrasel.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Isoniazid Tablets, USP, label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=6dab7b7b-a3a9-47ef-b423-134bc6970d8b

---

### 3.30 Aminofilin

**Kalkulator berat badan**

IDAI hlm. 28, neonatus:

| Keadaan | Dosis |
|---|---|
| Dosis *loading* | 8 mg/kg IV infus dalam 30 menit |
| Dosis rumatan | 1,5–3 mg/kg per dosis oral, atau IV pelan tiap 8–12 jam |

IDAI hlm. 36, daftar dosis obat (100 mg = 80 mg teofilin):

| Keadaan | Dosis |
|---|---|
| *Loading* | 10 mg/kg (maks 500 mg) IV dalam 1 jam |
| Bila belum pernah dapat aminofilin sebelumnya | *Loading dose* 6–8 mg/kg (maksimal 500 mg) IV diencerkan dalam 20 ml NaCl 0,9% diberikan selama 30 menit; rumatan: 0,5 mg/kg/jam |
| Bila telah mendapat aminofilin (8 jam) | *Loading dose* 3–4 mg/kg IV dan rumatan 0,25–0,5 mg/kg/jam |

**Sediaan** (FORNAS 2025 hlm. 195)

| Sediaan |
|---|
| Tablet 150 mg |
| Tablet 200 mg |
| Injeksi 24 mg/mL |

**Aturan penggunaan**

- *Loading* IV dalam 30 menit sampai 1 jam sesuai tabel; rumatan per jam atau tiap 8–12 jam (IDAI).
- Kadar teofilin serum dianjurkan diukur sering pada pasien sakit akut yang mendapat teofilin intravena (label aminofilin injeksi).

**Manfaat obat** (label aminofilin injeksi)

- Tambahan agonis beta-2 selektif inhalasi dan kortikosteroid sistemik untuk eksaserbasi akut gejala dan obstruksi aliran napas reversibel pada asma dan penyakit paru kronik lain.

**Efek samping** (label aminofilin injeksi)

- Pada kadar teofilin serum puncak <20 mcg/mL umumnya ringan, terutama efek mirip kafein yang sementara: mual, muntah, sakit kepala, insomnia; juga diare, iritabilitas, gelisah, tremor otot halus, diuresis sementara.
- Pada kadar >20 mcg/mL: muntah persisten, aritmia jantung, dan kejang yang sulit diatasi, yang dapat fatal.

**Peringatan** (label aminofilin injeksi)

- Kontraindikasi: riwayat hipersensitivitas terhadap teofilin atau komponen lain, termasuk etilendiamin.
- Pemilihan kecepatan infus pada anak harus hati-hati karena klirens teofilin sangat bervariasi dari neonatus sampai remaja; pada anak di bawah 1 tahun, jalur metabolisme belum matang sehingga pemilihan dosis dan pemantauan kadar perlu diperhatikan.

**Farmakokinetik** (label aminofilin injeksi)

- Farmakokinetik sangat bervariasi antarpasien dan tidak dapat diprediksi dari usia, jenis kelamin, atau berat badan.
- Sekitar 40% terikat protein plasma (terutama albumin); volume distribusi sekitar 0,45 L/kg; melintasi plasenta, masuk ke ASI dan cairan serebrospinal.
- Pada dewasa dan anak di atas 1 tahun, sekitar 90% dosis dimetabolisme di hati (antara lain oleh CYP1A2); sekitar 6% diubah menjadi kafein.
- Pada neonatus, sekitar 50% dosis dikeluarkan di urin dalam bentuk tidak berubah; setelah usia 3 bulan sekitar 10%.

**Farmakodinamik** (label aminofilin injeksi)

- Aminofilin adalah kompleks 2:1 teofilin dan etilendiamin; teofilin termasuk metilxantin.
- Teofilin merelaksasi otot polos saluran napas (bronkodilatasi) dan menekan respons saluran napas terhadap rangsangan. Pada studi hewan, bronkodilatasi diduga diperantarai hambatan fosfodiesterase (PDE III dan, lebih sedikit, PDE IV).

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Aminophylline Injection, USP (Hospira), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=9a663ef3-881f-48bd-2689-3713b24545c2

---

### 3.31 Epinefrin (Adrenalin)

**Kalkulator berat badan** (IDAI hlm. 35)

| Keadaan | Dosis |
|---|---|
| Henti jantung | 0,1 ml/kg 1/10000, IV atau intrakardiak, via ETT 0,1 ml/kg 1/1000 |
| Anafilaksis | 0,05–0,1 ml/kg larutan 1/10000, IV ATAU IM ke paha 0,01 mg/kg hingga 0,1 mg/kg, ulangi bila perlu dengan jarak 20 menit, maks 3x |
| Infus IV | 0,15 mg/kg dalam 50 ml, kecepatan 1–10 ml/jam (0,05–0,5 mcg/kg/mnt) |
| Anafilaksis | 0,01 ml/kg (maks 0,3 ml/dosis) larutan 1/1000, IM antero lateral paha, dapat diulang 2–3 kali dengan jarak 5–15 menit |

**Sediaan** (FORNAS 2025 hlm. 17, 163, 195)

| Sediaan |
|---|
| Injeksi 1 mg/mL |

**Aturan penggunaan**

- Sesuai tabel IDAI.
- Untuk anafilaksis, suntikan di sisi anterolateral paha (otot vastus lateralis); hindari otot kecil seperti deltoid, bokong, jari, tangan, atau kaki; jangan mengulang suntikan di tempat yang sama (label Adrenalin).

**Manfaat obat** (label Adrenalin)

- Penanganan darurat reaksi alergi (tipe I), termasuk anafilaksis akibat sengatan atau gigitan serangga, makanan, obat, serum, bahan uji diagnostik, dan alergen lain, serta anafilaksis idiopatik atau akibat latihan fisik.
- Meningkatkan tekanan arteri rata-rata pada dewasa dengan hipotensi akibat syok septik.

**Efek samping** (label Adrenalin)

- Umum pada pemberian sistemik: cemas, gelisah, tremor, lemah, pusing, berkeringat, berdebar, pucat, mual dan muntah, sakit kepala, gangguan napas; lebih mungkin pada penyakit jantung, hipertensi, atau hipertiroidisme.
- Kardiovaskular: angina, aritmia, hipertensi, takikardia, vasokonstriksi, ektopi ventrikel, kardiomiopati stres.

**Peringatan** (label Adrenalin)

- Kontraindikasi: tidak ada.
- Suntikan tidak sengaja ke jari, tangan, atau kaki dapat menghilangkan aliran darah dan menyebabkan nekrosis jaringan; suntikan ke bokong dikaitkan dengan infeksi *Clostridium* (gangren gas).
- Infeksi kulit dan jaringan lunak serius di tempat suntikan pernah dilaporkan.

**Farmakokinetik** (label Adrenalin)

- Setelah injeksi IV, cepat dibersihkan dari plasma dengan waktu paruh efektif <5 menit; keadaan tunak infus kontinu tercapai dalam 10–15 menit.
- Dimetabolisme luas oleh monoamin oksidase dan katekol-O-metiltransferase menjadi asam vanililmandelat yang tidak aktif; hanya sedikit yang dikeluarkan dalam bentuk tidak berubah.

**Farmakodinamik** (label Adrenalin)

- Bekerja pada reseptor alfa dan beta adrenergik; kenaikan tekanan darah melalui stimulasi miokard langsung (inotropik positif), peningkatan denyut jantung (kronotropik positif), dan vasokonstriksi perifer.
- Pada anafilaksis: efek alfa mengurangi vasodilatasi dan peningkatan permeabilitas pembuluh darah; efek beta merelaksasi otot polos bronkus sehingga meredakan bronkospasme, mengi, dan sesak.
- Meningkatkan glikogenolisis, mengurangi ambilan glukosa jaringan, dan menghambat pelepasan insulin, sehingga terjadi hiperglikemia dan peningkatan asam laktat darah.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. ADRENALIN (epinephrine injection) (Par Health), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=3b7a4364-668d-4eb2-a20c-04adc35aabe4

---

### 3.32 Asam traneksamat

**Kalkulator berat badan** (IDAI hlm. 36)

| Rute | Dosis |
|---|---|
| Oral | 15–25 mg/kg, 8 jam, selama <5 hari |
| IV | 10–15 mg/kg, 8 jam |

**Sediaan** (FORNAS 2025 hlm. 113)

| Sediaan | Peresepan maksimal |
|---|---|
| Kapsul 250 mg | – |
| Tablet salut selaput 500 mg | – |
| Injeksi 50 mg/mL | Untuk FPKTP (PP): 4 ampul/hari, maks 3 hari |
| Injeksi 100 mg/mL | – |

Restriksi FORNAS: untuk perdarahan masif atau berpotensi perdarahan >600 cc.

**Aturan penggunaan**

- Tiap 8 jam; oral selama <5 hari (IDAI).
- Hanya untuk penggunaan intravena; reaksi serius termasuk kejang dan aritmia jantung, sebagian fatal, terjadi bila tidak sengaja diberikan lewat jalur neuraksial (label Cyklokapron).

**Manfaat obat** (label Cyklokapron)

- Pasien hemofilia, penggunaan jangka pendek (2–8 hari) untuk mengurangi atau mencegah perdarahan dan mengurangi kebutuhan terapi pengganti selama dan setelah cabut gigi.

**Efek samping** (label Cyklokapron)

- Gangguan saluran cerna (mual, muntah, diare) yang dapat membaik dengan penurunan dosis.
- Dermatitis alergi dan pusing (*giddiness*).
- Hipotensi bila injeksi IV terlalu cepat.
- Kejadian tromboemboli (trombosis vena dalam, emboli paru, trombosis serebral, nekrosis korteks ginjal akut, oklusi arteri dan vena retina sentral).

**Peringatan** (label Cyklokapron)

- Kontraindikasi: pemberian neuraksial (intratekal, epidural); perdarahan subaraknoid; pembekuan intravaskular aktif; hipersensitivitas terhadap asam traneksamat atau komponennya.
- Risiko tromboemboli; hindari penggunaan bersama produk protrombotik.
- Dapat menyebabkan kejang, terutama pada operasi kardiovaskular dan pada pemberian neuraksial yang tidak disengaja.
- Gangguan penglihatan dan pusing.
- Data penggunaan pada anak hemofilia yang menjalani cabut gigi terbatas; data terbatas menunjukkan tidak ada perbedaan farmakokinetik bermakna antara dewasa dan anak.

**Farmakokinetik** (label Cyklokapron)

- Volume distribusi awal sekitar 9–12 liter.
- Ikatan protein plasma sekitar 3% (pada plasminogen); tidak terikat albumin.
- Waktu paruh fase eliminasi terminal sekitar 2 jam setelah dosis IV 1 g.
- Ekskresi utama lewat urin melalui filtrasi glomerulus; lebih dari 95% dosis dikeluarkan dalam bentuk tidak berubah; sekitar 90% dikeluarkan dalam 24 jam setelah 10 mg/kg IV. Kadar darah meningkat pada insufisiensi ginjal.

**Farmakodinamik** (label Cyklokapron)

- Turunan sintetis asam amino lisin yang mengurangi pelarutan fibrin hemostatik oleh plasmin.
- Menempati tempat ikatan lisin pada plasmin sehingga plasmin tidak dapat berikatan dengan monomer fibrin; struktur matriks fibrin dipertahankan dan distabilkan.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. CYKLOKAPRON (tranexamic acid) injection (Pfizer), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=6e89a7d9-4da4-42aa-b7f8-c602c24eefe5

---

### 3.33 Difenhidramin

**Kalkulator berat badan**

| Rute | Dosis | Sumber |
|---|---|---|
| Oral | 1–2 mg/kg, 6–8 jam, oral | IDAI hlm. 47 |
| IM/IV | 1–2 mg/kg (maks 50 mg/hari), IM/IV, 6–8 jam | IDAI hlm. 48 |

**Sediaan** (FORNAS 2025 hlm. 17)

| Sediaan | Peresepan maksimal |
|---|---|
| Injeksi 10 mg/mL (i.v./i.m.) | 30 mg/hari |

**Aturan penggunaan**

- Tiap 6–8 jam (IDAI).

**Manfaat obat** (label difenhidramin injeksi; dewasa dan anak, kecuali bayi prematur dan neonatus, bila sediaan oral tidak praktis)

- Antihistamin: reaksi alergi terhadap darah atau plasma; anafilaksis sebagai tambahan epinefrin dan tindakan standar lain setelah gejala akut terkontrol; reaksi alergi tipe segera tanpa komplikasi lain bila terapi oral tidak memungkinkan.
- Mabuk perjalanan.
- Parkinsonisme bila terapi oral tidak memungkinkan.

**Efek samping** (label difenhidramin injeksi)

- Umum: urtikaria, ruam, syok anafilaktik, fotosensitivitas, keringat berlebih, menggigil, kering mulut, hidung, dan tenggorokan.
- Kardiovaskular: hipotensi, sakit kepala, berdebar, takikardia, ekstrasistol.
- Darah: anemia hemolitik, trombositopenia, agranulositosis.
- Saraf: sedasi, mengantuk, pusing, gangguan koordinasi, lelah, bingung, gelisah, eksitasi, tremor, iritabilitas, insomnia, penglihatan kabur, tinitus, kejang.
- Saluran cerna: rasa tidak nyaman epigastrium, anoreksia, mual, muntah, diare, konstipasi.
- Saluran kemih: sering berkemih, sulit berkemih, retensi urin.

**Peringatan** (label difenhidramin injeksi)

- Kontraindikasi: neonatus dan bayi prematur; ibu menyusui; penggunaan sebagai anestetik lokal (risiko nekrosis lokal).
- Pada anak, overdosis antihistamin dapat menyebabkan halusinasi, kejang, atau kematian. Antihistamin dapat menurunkan kewaspadaan; pada anak kecil dapat menimbulkan eksitasi.

**Farmakokinetik** (label difenhidramin injeksi)

- Bentuk injeksi mulai bekerja cepat.
- Tersebar luas di seluruh tubuh, termasuk SSP.
- Sebagian dikeluarkan di urin dalam bentuk tidak berubah; sisanya dimetabolisme di hati.

**Farmakodinamik** (label difenhidramin injeksi)

- Antihistamin dengan efek samping antikolinergik (mengeringkan) dan sedatif.
- Antihistamin tampaknya bersaing dengan histamin untuk tempat reseptor pada sel efektor.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Diphenhydramine Hydrochloride Injection, USP, label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d32d074a-f1b6-4a9a-8e10-e19f0e67c61b

---

### 3.34 Kaptopril

**Kalkulator berat badan** (IDAI hlm. 43)

| Keadaan | Dosis |
|---|---|
| – | 0,1–1 mg/kg, oral, 8 jam, tingkatkan bila perlu menjadi maks 2 mg/kg |
| Neonatus | 0,03 mg/kg/hari; maksimal dosis neonatus: 2 mg/kg/hari |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 78)

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 0,1–1 mg/kg/dosis q8 jam po | D, I | 100% | 75% | 50% | 20–30% | tak ada |

**Sediaan** (FORNAS 2025 hlm. 153, 162)

| Sediaan | Peresepan maksimal |
|---|---|
| Tablet 12,5 mg | 90 tab/bulan |
| Tablet 25 mg | 90 tab/bulan |
| Tablet 50 mg | 90 tab/bulan |

**Aturan penggunaan**

- Tiap 8 jam (IDAI).
- Makanan di saluran cerna mengurangi penyerapan 30–40%; diberikan 1 jam sebelum makan (label kaptopril).

**Manfaat obat** (label kaptopril)

- Hipertensi.
- Gagal jantung kongestif (biasanya bersama diuretik dan digitalis).
- Disfungsi ventrikel kiri setelah infark miokard; nefropati diabetik (dewasa).

**Efek samping** (label kaptopril)

- Ginjal: proteinuria pada sekitar 1 dari 100 pasien.
- Darah: neutropenia/agranulositosis; anemia, trombositopenia, pansitopenia.
- Kulit: ruam (sering disertai gatal) pada sekitar 4–7 dari 100 pasien, biasanya dalam 4 minggu pertama; gatal tanpa ruam sekitar 2 dari 100 pasien.
- Kardiovaskular: hipotensi.
- Batuk kering persisten, seperti pada semua penghambat ACE.

**Peringatan** (label kaptopril)

- Peringatan berbingkai: toksisitas janin; hentikan segera bila terjadi kehamilan.
- Kontraindikasi: hipersensitivitas terhadap kaptopril atau penghambat ACE lain (misalnya riwayat angioedema).
- Neutropenia (<1.000/mm³) dengan hipoplasia mieloid.
- Keamanan dan efektivitas pada anak belum ditetapkan. Bayi, terutama bayi baru lahir, mungkin lebih rentan terhadap efek hemodinamik merugikan; penurunan tekanan darah yang berlebihan, lama, dan tidak terduga beserta komplikasinya pernah dilaporkan.

**Farmakokinetik** (label kaptopril)

- Diserap cepat; kadar puncak darah sekitar 1 jam; penyerapan minimal rata-rata sekitar 75%.
- 25–30% obat dalam sirkulasi terikat protein plasma.
- Lebih dari 95% dosis yang diserap dikeluarkan di urin dalam 24 jam; 40–50% dalam bentuk tidak berubah.
- Waktu paruh eliminasi radioaktivitas total dalam darah kemungkinan kurang dari 3 jam.

**Farmakodinamik** (label kaptopril)

- Penghambat kompetitif spesifik enzim pengubah angiotensin (ACE), enzim yang mengubah angiotensin I menjadi angiotensin II.
- Efek pada hipertensi dan gagal jantung tampaknya terutama akibat supresi sistem renin-angiotensin-aldosteron.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Captopril Tablets, USP (Solco Healthcare), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2d3779b0-83d9-4b6f-a043-f7768cd7fce6

---

### 3.35 Kalsium glukonat

**Kalkulator berat badan** (IDAI hlm. 57)

| Keadaan | Dosis |
|---|---|
| Larutan 10% | 0,5 ml/kg (maks 20 ml) IV perlahan |
| Kebutuhan <16 thn | 5 ml/kg/hari IV |
| Inotropik | 0,1–0,4 ml/kg/jam via kateter vena sentral |

**Sediaan** (FORNAS 2025 hlm. 18, 214)

| Sediaan |
|---|
| Injeksi 10% |

**Aturan penggunaan**

- IV perlahan; inotropik melalui kateter vena sentral (IDAI).

**Manfaat obat** (label kalsium glukonat injeksi)

- Pengobatan hipokalsemia simtomatik akut pada anak dan dewasa.
- Keamanan penggunaan jangka panjang belum ditetapkan.

**Efek samping** (label kalsium glukonat injeksi)

- Kardiovaskular: vasodilatasi, penurunan tekanan darah, bradikardia, aritmia jantung, sinkop, henti jantung.
- Tempat pemberian: inflamasi jaringan lunak lokal, nekrosis lokal, kalsinosis kutis dan kalsifikasi akibat ekstravasasi.

**Peringatan** (label kalsium glukonat injeksi)

- Kontraindikasi: hiperkalsemia; neonatus (usia 28 hari atau kurang) yang mendapat seftriakson.
- Penggunaan bersama seftriakson pada neonatus dapat membentuk endapan seftriakson-kalsium yang fatal di paru dan ginjal.
- Aritmia bila diberikan bersama glikosida jantung.
- Nekrosis jaringan dan kalsinosis kutis, dengan atau tanpa ekstravasasi.

**Farmakokinetik** (label kalsium glukonat injeksi)

- Bioavailabilitas 100% setelah injeksi intravena.
- 99% kalsium tubuh berada di tulang; sekitar 50% kalsium serum dalam bentuk terionisasi yang aktif secara biologis.
- Ekskresi kalsium urin meningkat bermakna setelah pemberian intravena.

**Farmakodinamik** (label kalsium glukonat injeksi)

- Pemberian intravena meningkatkan kadar kalsium terionisasi serum; kalsium glukonat terdisosiasi menjadi kalsium terionisasi di plasma.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Calcium Gluconate Injection (WG Critical Care), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=16307c00-d0d5-4e05-821f-17b0c1a29fc9

---

### 3.36 Manitol

**Kalkulator berat badan** (IDAI hlm. 62)

| Rute | Dosis |
|---|---|
| IV | 1–2 g/kg |

**Sediaan** (FORNAS 2025 hlm. 133, 172)

| Sediaan | Peresepan maksimal | Keterangan FORNAS |
|---|---|---|
| Infus 20% | 2 botol/hari (hlm. 133) | Hlm. 172: untuk glaukoma |

**Aturan penggunaan**

- Intravena (IDAI).
- Diberikan sebagai infus intravena, sebaiknya melalui vena sentral besar; status ginjal, jantung, dan paru dinilai sebelum pemberian (label Osmitrol).

**Manfaat obat** (label Osmitrol)

- Menurunkan tekanan intrakranial dan mengobati edema serebri.
- Menurunkan tekanan intraokular yang meningkat.

**Efek samping** (label Osmitrol)

- Hipersensitivitas: henti jantung, anafilaksis, hipotensi, sesak, hipertensi, demam, menggigil, urtikaria/ruam, mual, muntah, sakit kepala.
- Ginjal: cedera ginjal akut, nefrosis osmotik, azotemia, anuria, hematuria, oliguria, poliuria.
- SSP: koma, kejang, bingung, letargi, kenaikan tekanan intrakranial *rebound*, pusing.

**Peringatan** (label Osmitrol)

- Kontraindikasi: hipersensitivitas terhadap manitol; anuria; hipovolemia berat; kongesti vaskular paru berat atau edema paru; perdarahan intrakranial aktif kecuali saat kraniotomi.
- Komplikasi ginjal termasuk gagal ginjal ireversibel; pantau fungsi ginjal dan produksi urin.
- Toksisitas SSP (bingung, letargi, koma), terutama pada gangguan fungsi ginjal.
- Anak di bawah 2 tahun, terutama neonatus kurang bulan dan cukup bulan, mungkin berisiko lebih tinggi mengalami gangguan cairan dan elektrolit.

**Farmakokinetik** (label Osmitrol)

- Tersebar terutama di ruang ekstrasel dalam 20–40 menit setelah pemberian intravena.
- Waktu paruh eliminasi 0,5–2,5 jam.
- Hanya sedikit yang dimetabolisme; dikeluarkan terutama oleh ginjal dalam bentuk tidak berubah.

**Farmakodinamik** (label Osmitrol)

- Diuretik osmotik yang sebagian besar tetap di ruang ekstrasel; menghambat reabsorpsi air di tubulus dan meningkatkan ekskresi natrium dan klorida dengan menaikkan osmolaritas filtrat glomerulus.
- Kenaikan osmolaritas ekstrasel menarik air dari intrasel ke ruang ekstrasel dan vaskular; hal ini mendasari penurunan tekanan intrakranial, edema intrakranial, dan tekanan intraokular.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. OSMITROL (mannitol) injection (Baxter), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0d914965-7001-45cb-ba51-d7c5964b05bc

---

### 3.37 Metilprednisolon

**Kalkulator berat badan** (IDAI hlm. 62–63)

| Keadaan | Dosis |
|---|---|
| – | 1,3 mg/kg, IM, IV |
| Asma | 0,5–1 mg/kg, 6 jam, oral, IV, atau IM hari pertama, 12 jam hari kedua, kemudian 1 mg/kg/hari |
| Croup berat | 4 mg/kg/hari selama 3 hari, IV |
| Krisis lupus | 30 mg/kg, IV |
| Lupus sistemik | 2 mg/kg/hari, dosis maksimal 80 mg/hari |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 86)

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 0,5–1 mg/kg/dosis q6–24 jam iv, im, po | D | 100% | 100% | 100% | ya | Tak ada |

**Sediaan** (FORNAS 2025 hlm. 148, 199)

| Sediaan | Peresepan maksimal/restriksi |
|---|---|
| Tablet 4 mg | Hlm. 199: maks 10 tab/kasus |
| Tablet 8 mg | – |
| Tablet 16 mg | – |
| Injeksi 125 mg | Hlm. 148: hanya digunakan untuk kasus spesialistik, digunakan dalam waktu relatif singkat. Hlm. 199: pemberian di FPKTP hanya untuk serangan asma akut |
| Injeksi 500 mg | Hlm. 148: hanya digunakan untuk kasus spesialistik, digunakan dalam waktu relatif singkat |

**Aturan penggunaan**

- Sesuai tabel IDAI.

**Manfaat obat** (label Solu-Medrol; IV atau IM bila terapi oral tidak memungkinkan)

- Keadaan alergi, penyakit kulit, gangguan endokrin, penyakit saluran cerna, gangguan hematologi, penyakit neoplastik, sistem saraf, penyakit mata, penyakit ginjal (menginduksi diuresis atau remisi proteinuria pada sindrom nefrotik idiopatik atau akibat lupus eritematosus), penyakit saluran napas, dan gangguan reumatik.
- Pada anak, bukti efikasi dan keamanan dari studi publikasi tersedia untuk sindrom nefrotik (>2 tahun) serta limfoma dan leukemia agresif (>1 bulan).

**Efek samping** (label Solu-Medrol; dilaporkan dengan Solu-Medrol atau kortikosteroid lain)

- Alergi: reaksi alergi atau hipersensitivitas, reaksi anafilaktoid, anafilaksis, angioedema.
- Kardiovaskular: antara lain hipertensi, takikardia, gagal jantung kongestif, kardiomiopati hipertrofik pada bayi prematur.
- Endokrin: antara lain keadaan cushingoid, gangguan toleransi glukosa, supresi pertumbuhan pada anak.
- Cairan dan elektrolit: retensi garam dan air, peningkatan ekskresi kalium.

**Peringatan** (label Solu-Medrol)

- Kontraindikasi: infeksi jamur sistemik; hipersensitivitas terhadap produk; pemberian intratekal. Sediaan 40 mg mengandung laktosa dari susu sapi sehingga dikontraindikasikan pada hipersensitivitas susu sapi.
- *Gasping syndrome* (depresi SSP, asidosis metabolik, napas megap-megap) dikaitkan dengan benzil alkohol >99 mg/kg/hari pada neonatus dan neonatus berat lahir rendah.
- Anak yang mendapat kortikosteroid lewat rute apa pun dapat mengalami penurunan kecepatan pertumbuhan.

**Farmakodinamik** (label Solu-Medrol)

- Steroid antiinflamasi kuat dengan potensi antiinflamasi lebih besar daripada prednisolon dan kecenderungan retensi natrium dan air yang lebih kecil daripada prednisolon.
- Metilprednisolon natrium suksinat memiliki aksi metabolik dan antiinflamasi yang sama dengan metilprednisolon.
- Glukokortikoid menimbulkan efek metabolik yang luas dan memodifikasi respons imun tubuh terhadap berbagai rangsangan.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. SOLU-MEDROL (methylprednisolone sodium succinate) for injection (Pharmacia & Upjohn), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7271310c-7764-4812-aa30-a5e90987c7a9

---

### 3.38 Spironolakton

**Kalkulator berat badan** (IDAI hlm. 70)

| Rute | Dosis |
|---|---|
| IV, oral | 1–2 mg/kg, 12–24 jam |

**Sediaan** (FORNAS 2025 hlm. 133, 162)

| Sediaan | Peresepan maksimal |
|---|---|
| Tablet 25 mg | 30 tab/bulan |
| Tablet 100 mg | 30 tab/bulan |

**Aturan penggunaan**

- Tiap 12–24 jam (IDAI).
- Makanan meningkatkan bioavailabilitas; pasien sebaiknya membiasakan pola minum obat yang tetap terhadap waktu makan (label Aldactone).

**Manfaat obat** (label Aldactone)

- Gagal jantung NYHA kelas III–IV dengan fraksi ejeksi menurun.
- Hipertensi, sebagai terapi tambahan.
- Edema pada sirosis hati yang tidak berespons terhadap pembatasan cairan dan natrium, dan pada sindrom nefrotik bila terapi penyakit dasar, pembatasan cairan dan natrium, serta diuretik lain tidak memadai.
- Hiperaldosteronisme primer.

**Efek samping** (label Aldactone)

- Hiperkalemia; hipotensi dan perburukan fungsi ginjal; gangguan elektrolit dan metabolik (hiponatremia, hipomagnesemia, hipokalsemia, alkalosis hipokloremik, hiperglikemia); ginekomastia.
- Saluran cerna: perdarahan lambung, ulserasi, gastritis, diare dan kram, mual, muntah.
- Reproduksi: menstruasi tidak teratur atau amenore, nyeri payudara dan puting, antara lain.

**Peringatan** (label Aldactone)

- Kontraindikasi: hiperkalemia, penyakit Addison, penggunaan bersama eplerenon.
- Pantau kalium serum dalam 1 minggu setelah mulai atau mengubah dosis, lalu secara berkala.
- Keamanan dan efektivitas pada anak belum ditetapkan.

**Farmakokinetik** (label Aldactone)

- Waktu kadar puncak spironolakton dan metabolit aktif kanrenon masing-masing 2,6 dan 4,3 jam.
- Makanan meningkatkan bioavailabilitas sekitar 95,4%.
- Lebih dari 90% terikat protein plasma.
- Waktu paruh spironolakton rata-rata 1,4 jam; metabolitnya (kanrenon, TMS, HTMS) 16,5; 13,8; dan 15 jam.
- Dimetabolisme cepat dan luas; metabolit dikeluarkan terutama di urin dan sebagian di empedu.

**Farmakodinamik** (label Aldactone)

- Antagonis aldosteron spesifik; bekerja terutama melalui ikatan kompetitif pada reseptor di tempat pertukaran natrium-kalium yang bergantung aldosteron di tubulus kontortus distal.
- Meningkatkan ekskresi natrium dan air sementara kalium ditahan; bekerja sebagai diuretik dan antihipertensi.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. ALDACTONE (spironolactone) tablets (Pfizer), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0fed2822-3a03-4b64-9857-c682fcd462bc

---

### 3.39 Morfin

**Kalkulator berat badan**

| Rute | Dosis | Sumber |
|---|---|---|
| IM | Neonatus 0,1 mg/kg, anak 0,1–0,2 mg/kg | IDAI hlm. 64 |
| IV | 0,1–0,2 mg/kg/dosis | IDAI hlm. 64 |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 86)

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 0,1–0,2 mg/kg/dosis q4 jam po | D | 100% | 75% | 50% | Tak ada | Tak ada data |

**Sediaan** (FORNAS 2025 hlm. 10)

| Sediaan | Peresepan maksimal |
|---|---|
| Tablet 10 mg | 120–180 tab/bulan |
| Tablet lepas lambat 10 mg | 60 tab/bulan |
| Tablet lepas lambat 15 mg | 60 tab/bulan |
| Tablet lepas lambat 30 mg | 60 tab/bulan |
| Sirup 10 mg/5 mL | 15 botol/bulan. Untuk pasien yang tidak dapat mengkonsumsi sediaan tablet |
| Injeksi 10 mg/mL (i.m./s.k./i.v.) | – |

Restriksi FORNAS: diberikan pada salah satu atau lebih kondisi berikut: a) untuk pemakaian pada tindakan anestesi atau perawatan di rumah sakit; b) untuk mengatasi nyeri kanker yang tidak respons terhadap analgesik non narkotik; c) untuk nyeri pada sindrom koroner akut.

**Aturan penggunaan**

- Sesuai tabel IDAI.

**Manfaat obat**

- Injeksi: nyeri yang cukup berat sehingga memerlukan analgesik opioid dan terapi alternatif tidak memadai (label morfin injeksi).
- Larutan oral: nyeri akut yang cukup berat sehingga memerlukan analgesik opioid pada anak usia 2 tahun ke atas, bila terapi alternatif tidak memadai; keamanan dan efektivitasnya telah ditetapkan untuk anak 2–17 tahun (label morfin larutan oral).

**Efek samping** (label morfin injeksi)

- Paling sering: sedasi, kepala terasa ringan, pusing, mual, muntah, konstipasi, berkeringat.
- SSP: euforia, disforia, lemah, sakit kepala, agitasi, tremor, gangguan penglihatan, halusinasi sementara, disorientasi.
- Saluran cerna: konstipasi, spasme saluran empedu.
- Kardiovaskular: takikardia, bradikardia, berdebar, pingsan, hipotensi ortostatik.
- Saluran kemih: oliguria, retensi urin.
- Alergi: gatal, urtikaria, ruam.

**Peringatan** (label morfin injeksi)

- Peringatan berbingkai: risiko adiksi, penyalahgunaan, dan penyalahgunaan yang dapat menyebabkan overdosis dan kematian; depresi napas serius yang mengancam nyawa, terutama saat awal terapi atau setelah kenaikan dosis; sedasi berat, depresi napas, koma, dan kematian bila digunakan bersama benzodiazepin atau depresan SSP lain.
- Kontraindikasi: depresi napas bermakna; asma bronkial akut atau berat tanpa pemantauan atau peralatan resusitasi; penggunaan penghambat MAO dalam 14 hari terakhir; obstruksi saluran cerna yang diketahui atau dicurigai.
- Keamanan dan efektivitas morfin injeksi pada pasien di bawah 18 tahun belum ditetapkan.

**Farmakokinetik** (label morfin injeksi)

- Kadar puncak plasma sekitar 5–30 menit setelah injeksi IM 10 mg.
- Volume distribusi 1,0–4,7 L/kg; ikatan protein rendah (sekitar 36%).
- Waktu paruh eliminasi pada orang normal 1,5–2 jam.
- Jalur utama adalah glukuronidasi di hati menjadi morfin-3-glukuronida yang tidak aktif; konjugat dikeluarkan terutama lewat ginjal, sekitar 10% di feses; 2–12% dikeluarkan di urin dalam bentuk tidak berubah.

**Farmakodinamik** (label morfin injeksi)

- Agonis opioid penuh yang relatif selektif terhadap reseptor mu-opioid; efek terapi utama adalah analgesia.
- Seperti agonis opioid penuh lainnya, tidak ada efek plafon untuk analgesia; dosis dibatasi oleh efek samping, termasuk depresi napas dan SSP.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Morphine Sulfate Injection (Fresenius Kabi), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=1f53de80-efc8-4930-b3e3-fba0d026af05
4. Morphine Sulfate Oral Solution (Precision Dose), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=6654b91e-3b3f-4062-ac65-a2a70f942da4

---

### 3.40 Ketamin

**Kalkulator berat badan** (IDAI hlm. 57)

| Keadaan | Dosis |
|---|---|
| Sedasi, analgetik | 1–1,5 mg/kg IV, 3–4 mg/kg IM (dapat diulang setelah 10 menit) |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 85)

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 1–2 mg/kg/dosis iv | D | 100% | 100% | 100% | Tak ada data | Tak ada data |

**Sediaan** (FORNAS 2025 hlm. 16)

| Sediaan |
|---|
| Injeksi 50 mg/mL (i.v.) |
| Injeksi 100 mg/mL (i.v.) |

**Aturan penggunaan**

- Sesuai tabel IDAI.
- Diberikan oleh atau di bawah arahan dokter yang berpengalaman dalam anestesi umum, menjaga jalan napas, dan oksigenasi (label Ketalar).

**Manfaat obat** (label Ketalar)

- Anestetik tunggal untuk prosedur diagnostik dan bedah yang tidak memerlukan relaksasi otot rangka.
- Induksi anestesi sebelum pemberian anestetik umum lain.
- Tambahan untuk anestetik lain.

**Efek samping** (label Ketalar)

- Kardiovaskular: kenaikan tekanan darah, denyut jantung, dan indeks jantung; penurunan tekanan darah dan denyut jantung; aritmia.
- Reaksi saat pulih (*emergence*): delirium pada sekitar 12% pasien, berupa keadaan seperti mimpi, gambaran jelas, halusinasi, kebingungan, dan perilaku tidak rasional; biasanya berlangsung beberapa jam.
- Depresi napas pada overdosis atau pemberian terlalu cepat.

**Peringatan** (label Ketalar)

- Kontraindikasi: pasien yang berisiko serius bila tekanan darah naik bermakna; hipersensitivitas terhadap ketamin atau eksipiennya.
- Tidak menekan refleks faring dan laring; hindari sebagai anestetik tunggal pada prosedur faring, laring, atau bronkus.
- Neurotoksisitas pada anak: studi hewan menunjukkan obat anestesi dan sedasi yang menghambat reseptor NMDA dan/atau memperkuat GABA meningkatkan apoptosis neuron pada otak yang berkembang bila dipakai lebih dari 3 jam; makna klinisnya belum jelas.
- Keamanan dan efektivitas pada anak di bawah 16 tahun belum ditetapkan.

**Farmakokinetik** (label Ketalar)

- Setelah pemberian IV, fase awal (alfa) berlangsung sekitar 45 menit dengan waktu paruh 10–15 menit; fase ini sesuai dengan efek anestesi.
- Dimetabolisme melalui N-dealkilasi menjadi metabolit aktif norketamin, terutama oleh CYP2B6 dan CYP3A4.
- Waktu paruh redistribusi dari SSP ke jaringan perifer (fase beta) 2,5 jam.

**Farmakodinamik** (label Ketalar)

- Campuran rasemik ketamin; antagonis nonkompetitif dan nonselektif reseptor N-metil-D-aspartat (NMDA), reseptor glutamat ionotropik.
- Metabolit utama norketamin juga aktif pada reseptor yang sama dengan afinitas lebih rendah.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. KETALAR (ketamine hydrochloride) injection (Par Health), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=14e8f864-8b8a-4e7e-8439-e510d3107063

---

### 3.41 Nalokson

**Kalkulator berat badan** (IDAI hlm. 65)

| Keadaan | Dosis |
|---|---|
| Sedasi post-op | 0,002 mg/kg/dosis, ulangi setiap 2 menit jika perlu; kemudian 0,3 mg/kg dalam 30 ml dengan laju 1 ml/jam |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 87)

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 0,1 mg/kg/dosis iv | D | 100% | 100% | 100% | Tak ada data | Tak ada data |

**Sediaan** (FORNAS 2025 hlm. 19)

| Sediaan |
|---|
| Injeksi 0,4 mg/mL |

Restriksi FORNAS: hanya untuk mengatasi depresi pernapasan akibat morfin atau opioid.

**Aturan penggunaan**

- Sesuai tabel IDAI.
- Dapat diberikan IV, IM, atau subkutan pada anak dan neonatus untuk membalik efek opiat; American Academy of Pediatrics tidak menganjurkan pemberian subkutan atau IM pada intoksikasi opiat karena penyerapan dapat tidak menentu atau tertunda (label nalokson).

**Manfaat obat** (label nalokson injeksi)

- Membalik sebagian atau seluruh depresi akibat opioid, termasuk depresi napas, oleh opioid alami dan sintetis.
- Diagnosis dugaan overdosis opioid akut.
- Dapat berguna sebagai tambahan untuk menaikkan tekanan darah pada syok septik.

**Efek samping** (label nalokson injeksi)

- Pascaoperasi: hipotensi, hipertensi, takikardia dan fibrilasi ventrikel, sesak, edema paru, henti jantung; dosis berlebihan dapat membalik analgesia secara bermakna dan menyebabkan agitasi.
- Pembalikan mendadak depresi opioid: mual, muntah, berkeringat, takikardia, kenaikan tekanan darah, gemetar, kejang, takikardia dan fibrilasi ventrikel, edema paru, henti jantung.
- Pembalikan mendadak pada ketergantungan opioid dapat mencetuskan sindrom putus obat akut.

**Peringatan** (label nalokson injeksi)

- Kontraindikasi: hipersensitivitas terhadap nalokson atau bahan lain dalam sediaan.
- Anak yang mengalami intoksikasi opiat berespons dramatis terhadap nalokson, tetapi harus dipantau ketat minimal 24 jam.
- Keamanan dan efektivitas untuk hipotensi pada anak dan neonatus dengan syok septik belum ditetapkan.

**Farmakokinetik** (label nalokson injeksi)

- Bila diberikan IV, mula kerja umumnya tampak dalam 2 menit; sedikit lebih lambat bila diberikan subkutan atau IM.
- Lama kerja bergantung dosis dan rute; pemberian IM menghasilkan efek lebih lama daripada IV.
- Lama kerja nalokson dapat lebih pendek daripada beberapa opiat, sehingga efek opiat dapat kembali saat efek nalokson hilang.

**Farmakodinamik** (label nalokson injeksi)

- Antagonis opioid yang pada dasarnya murni; mencegah atau membalik efek opioid termasuk depresi napas, sedasi, dan hipotensi.
- Tanpa adanya opioid, pada dosis biasa praktis tidak memiliki aktivitas farmakologis; tidak menimbulkan toleransi maupun ketergantungan.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Naloxone Hydrochloride Injection, USP (Dr. Reddy's), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b1303f15-c48b-a44d-b28a-72f370094e02

---

### 3.42 Digoksin

**Kalkulator berat badan** (IDAI hlm. 47)

| Rute | Dosis |
|---|---|
| IV perlahan atau oral | 15 mcg/kg, 5 mcg/kg setelah 6 jam, kemudian 3–5 mcg/kg (maks dosis 200 mcg IV atau 250 mcg oral), 12 jam |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 82)

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 15 mcg/kg/dosis stat dan 5 mcg/kg/dosis 6 jam kmd, dilanjutkan 3–5 mcg/kg/dosis q12 jam po | D, I | 100% | 75% | 50% | tak ada | tak ada |

**Sediaan** (FORNAS 2025)

| Sediaan | Halaman FORNAS | Peresepan maksimal/restriksi |
|---|---|---|
| Tablet 0,25 mg | hlm. 151 | 30 tab/bulan |
| Tablet 0,25 mg | hlm. 161 | 30 tab/bulan. Hanya untuk gagal jantung dengan atrial fibrilasi atau sinus takikardia |
| Injeksi 0,25 mg/mL | hlm. 151, 161 | – |

**Aturan penggunaan**

- Sesuai tabel IDAI; IV diberikan perlahan.

**Manfaat obat** (label Lanoxin)

- Gagal jantung ringan sampai sedang pada dewasa.
- Pada anak dengan gagal jantung, meningkatkan kontraktilitas miokard.
- Pengendalian laju ventrikel pada fibrilasi atrium kronik pada dewasa.

**Efek samping** (label Lanoxin)

- Efek samping umumnya bergantung dosis dan terjadi pada dosis di atas dosis terapeutik; insidens keseluruhan 5–20%, sekitar separuhnya toksisitas jantung, seperempat gangguan saluran cerna, dan seperempat SSP dan lainnya.
- Saluran cerna: mual, muntah, nyeri perut, iskemia usus, nekrosis hemoragik usus.
- SSP: sakit kepala, lemah, pusing, apatis, kebingungan, gangguan mental.
- Pada anak, digoksin dapat menimbulkan aritmia apa pun; tersering gangguan konduksi atau takiaritmia supraventrikular. Bradikardia sinus dapat menjadi tanda intoksikasi, terutama pada bayi.

**Peringatan** (label Lanoxin)

- Kontraindikasi: fibrilasi ventrikel; hipersensitivitas terhadap digoksin.
- Sindrom Wolff-Parkinson-White dengan fibrilasi atrium berisiko tinggi fibrilasi ventrikel.
- Bradikardia sinus berat atau blok sinoatrial.
- Toksisitas digoksin: anoreksia, mual, muntah, gangguan penglihatan, aritmia; biasanya pada kadar >2 ng/mL. Berat badan rendah, usia lanjut, gangguan ginjal, hipokalemia, hiperkalsemia, atau hipomagnesemia meningkatkan risiko.
- Bayi baru lahir sangat bervariasi toleransinya; bayi prematur dan imatur sangat sensitif sehingga dosis harus dikurangi dan disesuaikan dengan tingkat kematangan.

**Farmakokinetik** (label Lanoxin; data dewasa kecuali disebutkan lain)

- Kadar puncak serum 1–3 jam setelah pemberian oral; penyerapan tablet 60–80% dibanding dosis IV.
- Fase distribusi jaringan 6–8 jam; terkonsentrasi di jaringan dengan volume distribusi besar (sekitar 475–500 L); melintasi sawar darah-otak dan plasenta.
- 50–70% dosis IV dikeluarkan di urin dalam bentuk tidak berubah; ekskresi ginjal sebanding dengan klirens kreatinin.
- Waktu paruh 1,5–2 hari pada fungsi ginjal normal; 3,5–5 hari pada pasien anuria. Tidak efektif dikeluarkan dengan dialisis atau transfusi tukar.

**Farmakodinamik** (label Lanoxin)

- Semua efek digoksin diperantarai hambatan Na-K ATPase (pompa natrium).
- Hambatan ini meningkatkan ketersediaan kalsium intrasel di miokard dan sistem konduksi, sehingga inotropi dan automatisitas meningkat serta kecepatan konduksi menurun.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. LANOXIN (digoxin) tablets (Advanz Pharma), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d91e3646-4c63-4512-ab22-db39c085c4dc

---

### 3.43 Dobutamin

**Kalkulator berat badan** (IDAI hlm. 48)

| Berat badan | Dosis |
|---|---|
| <30 kg | 15 mg/kg dalam 50 ml NS dengan kecepatan 1–3 ml/jam (5–15 mcg/kg/mnt) |
| >30 kg | 6 mg/kg dalam 100 ml NS dengan kecepatan 5–15 ml/jam (5–15 mcg/kg/mnt) |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 82)

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 1–20 mcg/kg/menit iv | D | 100% | 75% | 50% | tak ada data | tak ada data |

**Sediaan** (FORNAS 2025 hlm. 163)

| Sediaan | Restriksi |
|---|---|
| Injeksi 12,5 mg/mL | Hanya untuk infark miokard akut dan syok kardiogenik |
| Injeksi 25 mg/mL | – |
| Injeksi 50 mg/mL | – |

**Aturan penggunaan**

- Infus kontinu sesuai tabel IDAI.

**Manfaat obat** (label dobutamin)

- Dukungan inotropik jangka pendek pada dewasa dengan dekompensasi jantung akibat penurunan kontraktilitas, baik karena penyakit jantung organik maupun prosedur bedah jantung, bila terapi parenteral diperlukan.

**Efek samping** (label dobutamin)

- Kenaikan tekanan sistolik 10–20 mmHg dan denyut jantung 5–15 kali/menit pada sebagian besar pasien; sekitar 5% mengalami peningkatan denyut ventrikel prematur. Efek ini bergantung dosis.
- Penurunan tekanan darah yang tiba-tiba kadang dilaporkan.
- Flebitis dan perubahan inflamasi lokal di tempat infus.

**Peringatan** (label dobutamin)

- Kontraindikasi: stenosis subaorta hipertrofik idiopatik; hipersensitivitas terhadap dobutamin.
- Dapat meningkatkan denyut jantung atau tekanan darah secara nyata; sekitar 10% pasien mengalami kenaikan denyut ≥30 kali/menit dan sekitar 7,5% kenaikan tekanan sistolik ≥50 mmHg.
- Memudahkan konduksi atrioventrikular sehingga pasien fibrilasi atrium berisiko respons ventrikel cepat.
- Mengandung natrium metabisulfit, suatu sulfit yang dapat menyebabkan reaksi tipe alergi termasuk gejala anafilaksis dan serangan asma pada orang yang rentan.
- Keamanan dan efektivitas pada anak belum diteliti.

**Farmakokinetik** (label dobutamin)

- Mula kerja 1–2 menit; efek puncak suatu kecepatan infus dapat memerlukan sampai 10 menit.
- Waktu paruh plasma 2 menit.
- Metabolisme utama melalui metilasi katekol dan konjugasi; produk ekskresi di urin berupa konjugat dobutamin dan 3-O-metil dobutamin yang tidak aktif.

**Farmakodinamik** (label dobutamin)

- Agen inotropik kerja langsung yang terutama merangsang reseptor beta jantung, dengan efek kronotropik, hipertensif, aritmogenik, dan vasodilatasi yang relatif ringan.
- Tidak menyebabkan pelepasan norepinefrin endogen seperti dopamin.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Dobutamine Injection, USP (Hospira), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=89becb0c-da60-4f43-0a98-29ff7a9eca58

---

### 3.44 Dopamin

**Kalkulator berat badan** (IDAI hlm. 48; via CVC)

| Berat badan | Dosis |
|---|---|
| <30 kg | 15 mg/kg dalam 50 ml NS dengan kecepatan 1–3 ml/jam (5–15 mcg/kg/mnt) |
| >30 kg | 6 mg/kg dalam 100 ml NS dengan kecepatan 5–15 ml/jam (5–15 mcg/kg/mnt) |

**Sediaan** (FORNAS 2025 hlm. 163)

| Sediaan |
|---|
| Injeksi 40 mg/mL |

Restriksi FORNAS: a) hanya untuk syok kardiogenik, dekompensasi kordis akut, dan syok septik; b) tidak untuk syok hipovolemik.

**Aturan penggunaan**

- Melalui kateter vena sentral (CVC) (IDAI).
- Hipovolemia, asidosis, dan hipoksia diatasi sebelum memulai dopamin; penghentian infus dilakukan bertahap (label dopamin).

**Manfaat obat** (label dopamin)

- Memperbaiki status hemodinamik pada syok distributif atau syok akibat penurunan curah jantung.

**Efek samping** (label dopamin)

- Iskemia jaringan, aritmia jantung, hipotensi setelah penghentian mendadak, reaksi hipersensitivitas berat.
- Pascapemasaran: nyeri angina, berdebar, mual, muntah, azotemia, sakit kepala, cemas, sesak, piloereksi, hipertensi.

**Peringatan** (label dopamin)

- Kontraindikasi: feokromositoma.
- Pemberian pada pasien hipotensi akibat hipovolemia dapat menyebabkan vasokonstriksi perifer dan viseral berat, penurunan perfusi ginjal, hipoksia jaringan, dan asidosis laktat; gangren ekstremitas pernah terjadi pada penyakit vaskular oklusif.
- Penghentian infus mendadak dapat menyebabkan hipotensi berat.
- Pada anak, digunakan sejak lahir sampai remaja dengan dosis serupa dewasa (dalam mcg/kg/menit); efek samping khas anak hanya vasokonstriksi akibat infus tidak sengaja ke arteri umbilikalis.

**Farmakokinetik** (label dopamin)

- Tersebar luas di tubuh tetapi tidak banyak melintasi sawar darah-otak.
- Waktu paruh pada dewasa kurang dari 2 menit.
- Sekitar 75% dimetabolisme oleh MAO dan COMT di hati, ginjal, dan plasma menjadi senyawa tidak aktif; sekitar 25% dimetabolisme menjadi norepinefrin di ujung saraf adrenergik.

**Farmakodinamik** (label dopamin)

- Katekolamin alami, prekursor norepinefrin; bekerja melalui reseptor dopamin D1 dan D2, beta-1, dan alfa-1, bergantung dosis.
- Mula kerja dalam 5 menit setelah IV; lama kerja kurang dari sekitar 10 menit.
- Pada <5 mcg/kg/menit mengaktifkan reseptor D1 dan D2 di pembuluh ginjal, mesenterik, dan koroner (vasodilatasi); pada 5–10 mcg/kg/menit mengaktifkan beta-1 (denyut dan kontraktilitas meningkat); pada >10 mcg/kg/menit mengaktifkan alfa-1 (vasokonstriksi dan kenaikan tekanan darah).

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Dopamine Hydrochloride Injection, USP (Hospira), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=1f306ad2-3606-4525-5a8a-ce78f426c1a2

---

### 3.45 Natrium bikarbonat

**Kalkulator berat badan** (IDAI hlm. 42; tertulis "Bikarbonat")

| Keadaan | Dosis |
|---|---|
| IV pelan | Dosis (mEq) = BE x BB/4 (<5 kg), BE x BB/6 (anak), BE x BB/10 (dewasa). Dosis ini mengkoreksi setengah defisit basa |
| Urin alkalinisasi | 0,25 mEq/kg, 6–12 jam, oral atau 35–45 mEq/m²/24 jam |
| Asidosis tubular renal | 10–15 mEq/kg/hari dalam dosis terbagi |
| Type 1 RTA | Infants: 5–8 mEq/kg/hari; anak: 3–4 mEq/kg/hari; dewasa: 1–2 mEq/kg/hari |
| Type 2 RTA | 10–20 mEq/kg/hari (infan membutuhkan dosis lebih besar) |

**Sediaan** (FORNAS 2025)

| Sediaan | Halaman FORNAS | Peresepan maksimal/keterangan |
|---|---|---|
| Tablet 500 mg | hlm. 19, 171 | Hlm. 171: 90 tab/bulan |
| Injeksi 8,4% (i.v.) | hlm. 19 | *High alert medicine* |

**Aturan penggunaan**

- Sesuai tabel IDAI; IV diberikan pelan.

**Manfaat obat** (label natrium bikarbonat injeksi)

- Asidosis metabolik pada penyakit ginjal berat, diabetes tidak terkontrol, insufisiensi sirkulasi akibat syok atau dehidrasi berat, sirkulasi darah ekstrakorporeal, henti jantung, dan asidosis laktat primer berat.
- Intoksikasi obat tertentu (barbiturat, salisilat, metil alkohol) dan reaksi hemolitik yang memerlukan alkalinisasi urin.
- Diare berat yang sering disertai kehilangan bikarbonat bermakna.

**Efek samping** (label natrium bikarbonat injeksi)

- Terapi yang terlalu agresif dapat menyebabkan alkalosis metabolik (disertai kedutan otot, iritabilitas, dan tetani) serta hipernatremia.
- Ekstravasasi larutan hipertonik dapat menyebabkan selulitis kimia dengan nekrosis jaringan, ulserasi, atau pengelupasan di tempat infiltrasi.

**Peringatan** (label natrium bikarbonat injeksi)

- Kontraindikasi: pasien yang kehilangan klorida karena muntah atau penyedotan saluran cerna terus-menerus, dan pasien yang mendapat diuretik yang menimbulkan alkalosis hipokloremik.
- Larutan mengandung natrium harus digunakan sangat hati-hati pada gagal jantung kongestif, insufisiensi ginjal berat, dan keadaan edema dengan retensi natrium.

**Farmakokinetik** (label natrium bikarbonat injeksi)

- Kadar bikarbonat plasma normal 24–31 mEq/liter dan diatur ginjal melalui pengasaman atau alkalinisasi urin.
- Bikarbonat dapat diubah menjadi asam karbonat lalu karbon dioksida yang dikeluarkan melalui paru; pada orang dewasa sehat hampir semua bikarbonat yang tersaring direabsorpsi, kurang dari 1% dikeluarkan di urin.

**Farmakodinamik** (label natrium bikarbonat injeksi)

- Meningkatkan bikarbonat plasma, menyangga kelebihan ion hidrogen, menaikkan pH darah, dan membalik manifestasi klinis asidosis.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Sodium Bicarbonate Injection, USP (Hospira), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=8664c7ce-707b-4c6c-9ce4-7160b5f877f8

---

### 3.46 Flukonazol

**Kalkulator berat badan** (IDAI hlm. 52)

| Keadaan | Dosis |
|---|---|
| – | 12 mg/kg/hari IV |
| Koinfeksi HIV–*Candida albicans*: infeksi superfisial | 6 mg/kg, kemudian 3 mg/kg/hari oral atau IV |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 83)

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 6 mg/kg/dosis stat kmd 3 mg/kg/dosis q24 jam iv, po | D | 100% | 100% | 100% | Dosis sesudah dialisis | Dosis untuk LFG <10 |

**Sediaan** (FORNAS 2025 hlm. 50)

| Sediaan |
|---|
| Kapsul 50 mg |
| Kapsul 150 mg |
| Infus 2 mg/mL |

Restriksi FORNAS: a) digunakan untuk kandidiasis sistemik/pada pasien *immunocompromised*; b) digunakan untuk berbagai bentuk kriptokokosis.

**Aturan penggunaan**

- Sesuai tabel IDAI.
- Dapat diminum tanpa memperhatikan waktu makan (label Diflucan).

**Manfaat obat** (label Diflucan)

- Kandidiasis vagina.
- Kandidiasis orofaring dan esofagus; juga efektif pada infeksi saluran kemih, peritonitis, dan infeksi *Candida* sistemik termasuk kandidemia, kandidiasis diseminata, dan pneumonia (studi terbuka kecil).
- Meningitis kriptokokus.
- Profilaksis: menurunkan insidens kandidiasis pada pasien transplantasi sumsum tulang yang mendapat kemoterapi sitotoksik dan/atau radioterapi.

**Efek samping** (label Diflucan)

- Anak (577 pasien usia 1 hari–17 tahun, dosis sampai 15 mg/kg/hari): 13% mengalami efek samping terkait pengobatan; tersering muntah 5%, nyeri perut 3%, mual 2%, diare 2%.
- Pola dan insidens efek samping pada anak sebanding dengan dewasa.

**Peringatan** (label Diflucan)

- Kontraindikasi: hipersensitivitas terhadap flukonazol atau eksipiennya; pemberian bersama obat tertentu yang memperpanjang QT dan dimetabolisme CYP3A4 (misalnya eritromisin, pimozid, dan kuinidin).
- Cedera hati: jarang terjadi toksisitas hati serius termasuk kematian, terutama pada pasien dengan kondisi dasar serius.
- Anafilaksis (jarang); reaksi kulit eksfoliatif termasuk sindrom Stevens-Johnson, nekrolisis epidermal toksik, dan DRESS.
- Pemanjangan QT dan torsade de pointes (jarang), terutama pada pasien sakit berat dengan banyak faktor risiko.

**Farmakokinetik** (label Diflucan)

- Bioavailabilitas oral lebih dari 90% dibanding IV; kadar puncak 1–2 jam; waktu paruh eliminasi plasma sekitar 30 jam (20–50 jam) pada dewasa.
- Ikatan protein plasma rendah (11–12%); menembus semua cairan tubuh yang diteliti.
- Sekitar 80% dosis muncul di urin dalam bentuk tidak berubah dan 11% sebagai metabolit; farmakokinetik sangat dipengaruhi penurunan fungsi ginjal.
- Anak: waktu paruh sekitar 54,2 jam pada bayi 2–60 hari (IV) dan sekitar 19,5–25 jam pada anak 9 bulan–13 tahun (oral).

**Farmakodinamik** (label Diflucan)

- Penghambat sangat selektif enzim jamur lanosterol 14-alfa-demetilase yang bergantung sitokrom P450; enzim ini mengubah lanosterol menjadi ergosterol.
- Hilangnya sterol normal dan penumpukan 14-alfa-metil sterol pada jamur diduga mendasari aktivitas fungistatik flukonazol.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. DIFLUCAN (fluconazole) tablets and oral suspension (Roerig/Pfizer), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f694c617-3383-416c-91b6-b94fda371204

---

### 3.47 Alopurinol

**Kalkulator berat badan** (IDAI hlm. 36)

| Keadaan | Dosis |
|---|---|
| – | 10–20 mg/kg (maks 600 mg), 8 jam, oral |
| Pencegahan lisis tumor | 100–150 mg/m², IV, oral, 12 jam |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 76)

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 10 mg/kg/dosis q12–24 jam po | D | 75% | 50% | 25% | – | tak ada data |

**Sediaan** (FORNAS 2025 hlm. 14)

| Sediaan | Peresepan maksimal |
|---|---|
| Tablet 100 mg | 30 tab/bulan |
| Tablet 300 mg | 60 tab/bulan |

Restriksi FORNAS: tidak diberikan pada saat nyeri akut.

**Aturan penggunaan**

- Sesuai tabel IDAI.
- Dihentikan pada tanda pertama ruam kulit atau tanda lain reaksi alergi (label Zyloprim).

**Manfaat obat** (label Zyloprim)

- Gout primer atau sekunder (serangan akut, tofi, kerusakan sendi, batu asam urat, dan/atau nefropati).
- Pasien leukemia, limfoma, dan keganasan lain yang mendapat terapi kanker yang meningkatkan kadar asam urat serum dan urin.
- Batu kalsium oksalat berulang dengan ekskresi asam urat harian tinggi.
- Pada anak jarang diindikasikan, kecuali hiperurisemia akibat keganasan atau kelainan bawaan metabolisme purin tertentu.

**Efek samping** (label Zyloprim)

- Efek samping tersering adalah ruam kulit; reaksi kulit dapat berat dan kadang fatal.
- Peningkatan serangan gout akut pada awal terapi.

**Peringatan** (label Zyloprim)

- Kontraindikasi: pasien yang pernah mengalami reaksi berat terhadap alopurinol tidak boleh diberi obat ini lagi.
- Ruam kulit dapat diikuti reaksi hipersensitivitas lebih berat (lesi eksfoliatif, urtikaria, purpura, sindrom Stevens-Johnson, vaskulitis menyeluruh, hepatotoksisitas ireversibel), jarang sampai kematian.
- Pemberian bersama merkaptopurin atau azatioprin memerlukan pengurangan dosis obat tersebut.

**Farmakokinetik** (label Zyloprim)

- Sekitar 90% diserap dari saluran cerna; kadar puncak alopurinol 1,5 jam dan oksipurinol 4,5 jam.
- Sekitar 20% dosis dikeluarkan di feses.
- Waktu paruh plasma alopurinol sekitar 1–2 jam; metabolit aktif oksipurinol sekitar 15 jam.

**Farmakodinamik** (label Zyloprim)

- Analog struktural basa purin hipoksantin; menghambat xantin oksidase, enzim yang mengubah hipoksantin menjadi xantin dan xantin menjadi asam urat.
- Metabolitnya, oksipurinol, juga menghambat xantin oksidase.
- Menurunkan produksi asam urat tanpa mengganggu biosintesis purin.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. ZYLOPRIM (allopurinol) tablets (Prometheus Laboratories), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=342832b5-1a32-4bea-bc49-ab0fd152154e

---

### 3.48 Asam folat

**Kalkulator berat badan** (IDAI hlm. 36)

| Keadaan | Dosis |
|---|---|
| Talasemia | 1 mg/hari, 12 jam, oral |

**Sediaan** (FORNAS 2025 hlm. 112)

| Sediaan |
|---|
| Tablet 0,4 mg |
| Tablet 1 mg |
| Tablet 5 mg |

**Aturan penggunaan**

- Sesuai tabel IDAI.

**Manfaat obat** (label asam folat tablet)

- Anemia megaloblastik akibat defisiensi asam folat (seperti pada sprue tropis maupun nontropis).
- Anemia akibat gizi, kehamilan, masa bayi, atau masa kanak-kanak.

**Efek samping** (label asam folat tablet)

- Sensitisasi alergi pernah dilaporkan pada pemberian oral maupun parenteral; asam folat relatif tidak toksik.
- Reaksi alergi jarang: eritema, ruam kulit, gatal, malaise, dan sesak akibat bronkospasme.

**Peringatan** (label asam folat tablet)

- Kontraindikasi: riwayat intoleransi terhadap obat ini.
- Pemberian asam folat saja tidak tepat untuk anemia pernisiosa dan anemia megaloblastik lain akibat defisiensi vitamin B12.
- Dosis di atas 0,1 mg/hari dapat menutupi anemia pernisiosa: remisi hematologis dapat terjadi sementara gangguan neurologis tetap berlanjut.

**Farmakokinetik** (label asam folat tablet)

- Diserap cepat dari usus halus, terutama bagian proksimal; muncul di plasma 15–30 menit setelah dosis oral dan kadar puncak dalam 1 jam.
- Kadar di cairan serebrospinal beberapa kali lebih tinggi daripada di serum.
- Dimetabolisme di hati menjadi asam 7,8-dihidrofolat lalu asam 5,6,7,8-tetrahidrofolat.

**Farmakodinamik** (label asam folat tablet)

- Bekerja pada sumsum tulang megaloblastik sehingga menjadi normoblastik.
- Prekursor asam tetrahidrofolat, kofaktor reaksi transformilasi dalam biosintesis purin dan timidilat asam nukleat; gangguan sintesis timidilat pada defisiensi folat diduga menyebabkan sintesis DNA terganggu dan pembentukan megaloblas.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Folic Acid Tablets, USP (Rising Pharma), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0baa10dd-6d1d-4946-8236-566451132da3

---

### 3.49 Amikasin

**Kalkulator berat badan**

| Rute | Dosis | Sumber |
|---|---|---|
| IV, IM: infeksi ringan–sedang | Tidak cocok | IDAI hlm. 11 |
| IV, IM: infeksi berat | 15–22,5 mg/kg/hari dalam 3 dosis | IDAI hlm. 11 |
| IV: neonatus | IV drip dalam 30 menit; dosis dan interval menurut tabel neonatus | IDAI hlm. 28 |

Keterangan golongan aminoglikosida (IDAI hlm. 11): dosis dan frekuensi individual berdasarkan analisis konsentrasi serum.

**Tabel neonatus** (IDAI hlm. 28)

| Umur kehamilan (pascakonsepsi), minggu | Umur pascanatal, hari | Dosis (mg/kg) | Interval (jam) |
|---|---|---|---|
| ≤29 | 0–7 | 18 | 48 |
| ≤29 | 8–28 | 15 | 36 |
| ≤29 | ≥29 | 15 | 24 |
| 30–34 | 0–7 | 18 | 36 |
| 30–34 | ≥8 | 15 | 24 |
| ≥35 | Semua | 15 | 24 |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 76)

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 5–7,5 mg/kg/dosis q8 jam iv | D, I | 60–90% | 30–70% | 20–30% | – | 15–20 mg/L/hari |

**Sediaan** (FORNAS 2025)

| Sediaan | Halaman FORNAS | Restriksi |
|---|---|---|
| Injeksi 250 mg/mL | hlm. 32 | Hanya digunakan untuk infeksi oleh bakteri gram negatif yang resistan terhadap gentamisin |
| Injeksi 500 mg (program) | hlm. 42 | Digunakan untuk paduan pengobatan pasien TB resistan obat (TB-RO); disediakan oleh Program Kemenkes |

**Aturan penggunaan**

- Neonatus: IV drip dalam 30 menit (IDAI).
- Dosis dan frekuensi disesuaikan dengan kadar obat dalam serum (IDAI).
- Fungsi ginjal perlu dipantau ketat dan dosis disesuaikan (label amikasin).

**Manfaat obat** (label amikasin)

- Pengobatan jangka pendek infeksi berat oleh bakteri gram negatif yang peka, termasuk *Pseudomonas*, *E. coli*, *Proteus*, *Providencia*, *Klebsiella-Enterobacter-Serratia*, dan *Acinetobacter*.
- Efektif pada septikemia bakteri (termasuk sepsis neonatus), infeksi berat saluran napas, tulang dan sendi, sistem saraf pusat (termasuk meningitis), kulit dan jaringan lunak, intra-abdomen (termasuk peritonitis), luka bakar, infeksi pascaoperasi, serta infeksi saluran kemih berat, berkomplikasi, dan berulang.
- Tidak diindikasikan untuk episode awal infeksi saluran kemih tanpa komplikasi, kecuali kuman tidak peka terhadap antibiotik yang kurang toksik.

**Efek samping** (label amikasin)

- Ototoksisitas: kehilangan pendengaran, gangguan keseimbangan, atau keduanya; amikasin terutama mengenai fungsi pendengaran. Tuli frekuensi tinggi biasanya muncul lebih dulu sebelum gangguan pendengaran klinis terdeteksi.
- Nefrotoksisitas: kenaikan kreatinin serum, albuminuria, sel darah merah dan putih serta silinder di urin, azotemia, oliguria; biasanya pulih bila obat dihentikan.
- Blokade neuromuskular: paralisis otot akut dan apnea.
- Jarang: ruam kulit, demam obat, sakit kepala, parestesia, tremor, mual, muntah, eosinofilia, artralgia, anemia, hipotensi, hipomagnesemia.

**Peringatan** (label amikasin)

- Peringatan berbingkai: pasien yang menerima aminoglikosida parenteral harus diawasi ketat karena potensi ototoksisitas dan nefrotoksisitas. Keamanan pemberian lebih dari 14 hari belum diketahui. Ototoksisitas akibat aminoglikosida biasanya menetap.
- Risiko ototoksisitas dan nefrotoksisitas lebih besar pada gangguan fungsi ginjal, dosis tinggi, atau terapi lama.
- Blokade neuromuskular dan paralisis napas dapat terjadi, terutama pada pasien yang menerima anestesi, obat penghambat neuromuskular, atau transfusi masif darah bersitrat.
- Ototoksisitas pernah terjadi pada pasien dengan varian DNA mitokondria tertentu (gen MT-RNR1, terutama m.1555A>G), meskipun kadar serum dalam rentang anjuran.
- Kontraindikasi: riwayat hipersensitivitas terhadap amikasin; riwayat hipersensitivitas atau reaksi toksik berat terhadap aminoglikosida lain dapat menjadi kontraindikasi karena sensitivitas silang.
- Mengandung natrium metabisulfit, suatu sulfit yang dapat menyebabkan reaksi tipe alergi termasuk gejala anafilaksis dan serangan asma pada orang yang rentan.
- Gunakan dengan hati-hati pada bayi prematur dan neonatus karena ginjal belum matang sehingga waktu paruh serum memanjang.

**Farmakokinetik** (label amikasin; data dewasa kecuali disebutkan lain)

- Diserap cepat setelah pemberian IM; kadar puncak serum sekitar 1 jam setelah suntikan.
- Waktu paruh serum rata-rata sedikit di atas 2 jam; ikatan protein serum 0–11%.
- Diekskresikan terutama melalui filtrasi glomerulus; sekitar 94–98% dosis keluar di urin dalam 24 jam. Pada gangguan fungsi ginjal, ekskresi jauh lebih lambat sehingga waktu paruh memanjang.
- Kadar terapeutik tercapai di tulang, jantung, kandung empedu, dan paru, serta di urin, empedu, sputum, sekret bronkus, cairan interstisial, pleura, dan sinovial.
- Kadar di cairan serebrospinal bayi normal sekitar 10–20% kadar serum dan dapat mencapai 50% bila meninges meradang. Melintasi sawar plasenta.

**Farmakodinamik** (label amikasin)

- Aminoglikosida yang berikatan dengan ribosom prokariot sehingga menghambat sintesis protein bakteri yang peka.
- Bersifat bakterisidal in vitro terhadap bakteri gram positif dan gram negatif.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Amikacin Sulfate Injection, USP (Sagent Pharmaceuticals), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f260ff2a-76a0-4672-9516-91c344b67890

---

### 3.50 Siprofloksasin

**Kalkulator berat badan** (IDAI hlm. 18, tabel antimikroba, dosis per kg per hari)

| Rute | Infeksi ringan–sedang | Infeksi berat |
|---|---|---|
| PO | 20–40 mg dalam 2 dosis (maksimal 1,5 g) | 30–40 mg dalam 2 dosis (dosis harian dewasa, 1–1,5 g) |
| IV | Tidak cocok | 20–30 mg dalam 2 dosis |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 80)

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 4–7 mg/kg/dosis q12 jam iv | D, I | 100% | 75% | 50% | tak ada | tak ada |

**Sediaan** (FORNAS 2025 hlm. 33)

Restriksi FORNAS: tidak digunakan untuk pasien usia <18 tahun, ibu hamil, atau ibu menyusui.

| Sediaan | Peresepan maksimal |
|---|---|
| Tablet 500 mg | – |
| Infus 2 mg/mL | 4 btl/hari |

**Aturan penggunaan**

- Berikan sedikitnya 2 jam sebelum atau 6 jam sesudah antasida magnesium/aluminium, sukralfat, pengikat fosfat polimer, atau produk yang mengandung kalsium, besi, atau seng (label Cipro).
- Hindari pemberian bersama produk susu (susu, yoghurt) atau jus yang diperkaya kalsium saja; boleh diminum bersama makanan yang mengandung produk tersebut (label Cipro).
- Pastikan hidrasi cukup untuk mencegah urin yang sangat pekat (label Cipro).

**Manfaat obat** (label Cipro)

- Pada anak usia 1–17 tahun: infeksi saluran kemih berkomplikasi dan pielonefritis akibat *Escherichia coli*. Bukan obat pilihan pertama pada anak karena insidens efek samping, termasuk reaksi pada sendi dan jaringan sekitarnya, lebih tinggi dibanding pembanding.
- Pada anak sejak lahir sampai 17 tahun: antraks inhalasi pascapajanan dan pengobatan serta profilaksis plague (pes).
- Pada dewasa: infeksi kulit, tulang dan sendi, intra-abdomen berkomplikasi, diare infeksius, demam tifoid, gonore tanpa komplikasi, saluran napas bawah, saluran kemih, prostatitis bakteri kronik, dan sinusitis akut.

**Efek samping** (label Cipro)

- Tersering pada uji klinis semua formulasi: mual (2,5%), diare (1,6%), kelainan uji fungsi hati (1,3%), muntah (1%), ruam (1%).
- Pada uji klinis anak usia 1–17 tahun dengan infeksi saluran kemih berkomplikasi, efek samping muskuloskeletal dalam 6 minggu terjadi pada 9,3% kelompok siprofloksasin dibanding 6% kelompok sefalosporin; semuanya pulih, biasanya dalam 30 hari setelah terapi selesai.

**Peringatan** (label Cipro)

- Peringatan berbingkai: fluorokuinolon berkaitan dengan efek samping serius yang dapat menetap dan melumpuhkan, yaitu tendinitis dan ruptur tendon, neuropati perifer, dan efek pada sistem saraf pusat. Hentikan segera bila terjadi. Fluorokuinolon dapat memperberat kelemahan otot pada miastenia gravis.
- Kontraindikasi: riwayat hipersensitivitas terhadap siprofloksasin, golongan kuinolon, atau komponen produk; pemberian bersama tizanidin.
- Gangguan muskuloskeletal pada anak: pada anak (<18 tahun) hanya diindikasikan untuk infeksi saluran kemih berkomplikasi, antraks inhalasi pascapajanan, dan plague. Pada hewan muda, kuinolon menyebabkan artropati pada sendi penopang berat badan.
- Peringatan lain: reaksi hipersensitivitas, hepatotoksisitas, aneurisma dan diseksi aorta, diare terkait *Clostridioides difficile*, pemanjangan interval QT, fotosensitivitas, kristaluria, gangguan gula darah, serta interaksi dengan teofilin dan obat yang dimetabolisme CYP1A2.

**Farmakokinetik** (label Cipro; data dewasa)

- Bioavailabilitas absolut tablet oral sekitar 70%; kadar puncak serum 1–2 jam setelah pemberian oral.
- Ikatan protein serum 20–40%; tersebar luas ke jaringan dan cairan tubuh. Kadar di cairan serebrospinal umumnya kurang dari 10% kadar puncak serum.
- Empat metabolit di urin mencakup sekitar 15% dosis oral; siprofloksasin menghambat metabolisme yang diperantarai CYP1A2.
- Waktu paruh eliminasi sekitar 4 jam pada fungsi ginjal normal; 40–50% dosis oral dikeluarkan di urin dalam bentuk tidak berubah.

**Farmakodinamik** (label Cipro)

- Golongan fluorokuinolon. Efek bakterisidal berasal dari hambatan enzim topoisomerase II (DNA girase) dan topoisomerase IV, yang diperlukan untuk replikasi, transkripsi, perbaikan, dan rekombinasi DNA bakteri.
- Mekanisme kerjanya berbeda dari penisilin, sefalosporin, aminoglikosida, makrolida, dan tetrasiklin, sehingga kuman yang resisten terhadap golongan tersebut dapat masih peka.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. CIPRO (ciprofloxacin hydrochloride) tablets and oral suspension (Bayer HealthCare Pharmaceuticals), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=888dc7f9-ad9c-4c00-8d50-8ddfd9bd27c0

---

### 3.51 Sefadroksil

**Kalkulator berat badan** (IDAI hlm. 13, tabel antimikroba, dosis per kg per hari)

| Rute | Infeksi ringan–sedang | Infeksi berat | Keterangan |
|---|---|---|---|
| PO | 30 mg dalam 2 dosis (dosis harian dewasa, 1–2 g) | Tidak cocok | Generasi pertama |

**Sediaan** (FORNAS 2025 hlm. 26)

| Sediaan | Peresepan maksimal |
|---|---|
| Kapsul 250 mg | 5 hari |
| Kapsul 500 mg | 5 hari |
| Drops 150 mg/mL | 1 btl/kasus |
| Sirup kering 125 mg/5 mL | 1 btl/kasus |
| Sirup kering 250 mg/5 mL | 1 btl/kasus |

**Aturan penggunaan**

- Diberikan dalam 2 dosis per hari (IDAI).
- Pemberian bersama makanan dapat membantu mengurangi keluhan saluran cerna (label sefadroksil).

**Manfaat obat** (label sefadroksil)

- Infeksi saluran kemih oleh *E. coli*, *P. mirabilis*, dan *Klebsiella*.
- Infeksi kulit dan struktur kulit oleh stafilokokus dan/atau streptokokus.
- Faringitis dan/atau tonsilitis oleh *Streptococcus pyogenes* (streptokokus beta-hemolitik grup A). Data efektivitas untuk profilaksis demam rematik berikutnya belum tersedia.

**Efek samping** (label sefadroksil)

- Saluran cerna: kolitis pseudomembran (dapat muncul selama atau sesudah terapi); dispepsia, mual, dan muntah (jarang); diare.
- Hipersensitivitas: ruam, urtikaria, angioedema, pruritus; anafilaksis pernah dilaporkan.
- Lainnya: gangguan fungsi hati termasuk kolestasis dan kenaikan transaminase, pruritus genital, moniliasis genital, vaginitis, neutropenia sementara, demam. Jarang: agranulositosis, trombositopenia, gagal hati idiosinkratik, eritema multiformis, sindrom Stevens-Johnson, serum sickness, artralgia.
- Beberapa sefalosporin dapat memicu kejang, terutama pada gangguan ginjal bila dosis tidak dikurangi.

**Peringatan** (label sefadroksil)

- Kontraindikasi: alergi terhadap golongan sefalosporin.
- Tanyakan riwayat hipersensitivitas terhadap sefadroksil, sefalosporin, penisilin, atau obat lain sebelum terapi. Sensitivitas silang antarbeta-laktam dapat terjadi pada hingga 10% pasien dengan riwayat alergi penisilin.
- Diare terkait *Clostridium difficile* dapat terjadi, dari diare ringan sampai kolitis fatal.

**Farmakokinetik** (label sefadroksil; data dewasa)

- Diserap cepat setelah pemberian oral; kadar terukur masih ada 12 jam setelah pemberian.
- Lebih dari 90% obat dikeluarkan di urin dalam bentuk tidak berubah dalam 24 jam.

**Farmakodinamik** (label sefadroksil)

- Sefalosporin semisintetik oral; bersifat bakterisidal dengan menghambat sintesis dinding sel bakteri.
- Aktif terhadap streptokokus beta-hemolitik, stafilokokus (termasuk galur penghasil penisilinase), *Streptococcus pneumoniae*, *E. coli*, *P. mirabilis*, *Klebsiella*, dan *Moraxella catarrhalis*.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Cefadroxil Capsules USP (Lupin Pharmaceuticals), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=5fe066ce-2f97-49d7-81bd-a672be1ebecd

---

### 3.52 Amoksisilin–asam klavulanat

**Kalkulator berat badan** (IDAI hlm. 22, tabel antimikroba, dosis per kg per hari)

| Rute | Infeksi ringan–sedang | Infeksi berat |
|---|---|---|
| PO | Formulasi 14:1: 90 mg komponen amoksisilin dalam 2 dosis (<40 kg) untuk OMA berulang, kegagalan terapi | Tidak cocok |
| PO | Formulasi 7:1: 25–45 mg komponen amoksisilin dalam 2 dosis (dosis harian dewasa, 1750 mg) | Tidak cocok |
| PO | Formulasi 4:1: 20–40 mg komponen amoksisilin dalam 3 dosis (dosis harian dewasa, 1500 mg) | Tidak cocok |

**Sediaan** (FORNAS 2025 hlm. 24–25; kombinasi KDT/FDC)

| Kandungan | Sediaan | Halaman FORNAS |
|---|---|---|
| Amoksisilin 500 mg + asam klavulanat 125 mg | Tablet 625 mg | hlm. 24 |
| Amoksisilin 125 mg + asam klavulanat 31,25 mg | Sirup kering | hlm. 24 |
| Amoksisilin 250 mg + asam klavulanat 62,50 mg | Sirup kering | hlm. 25 |
| Amoksisilin 1.000 mg + asam klavulanat 200 mg | Injeksi 1.200 mg | hlm. 25 |

Restriksi FORNAS untuk tablet 625 mg dan kedua sirup kering: hanya untuk terapi lanjutan untuk pasien yang sebelumnya mendapatkan antibiotik parenteral amoksisilin-asam klavulanat atau sesuai hasil uji resistensi.

**Aturan penggunaan**

- Dosis dihitung dari komponen amoksisilin (IDAI).
- Sebaiknya diminum pada awal makan untuk mengurangi gangguan saluran cerna; penyerapan klavulanat lebih baik bila diberikan pada awal makan (label Augmentin).

**Manfaat obat** (label Augmentin)

- Infeksi oleh isolat penghasil beta-laktamase yang peka: infeksi saluran napas bawah, otitis media akut, dan sinusitis (*H. influenzae*, *M. catarrhalis*); infeksi kulit dan struktur kulit (*S. aureus*, *E. coli*, *Klebsiella*); infeksi saluran kemih (*E. coli*, *Klebsiella*, *Enterobacter*).
- Bila uji kepekaan menunjukkan kuman peka terhadap amoksisilin (tidak menghasilkan beta-laktamase), kombinasi ini tidak perlu digunakan.

**Efek samping** (label Augmentin)

- Tersering: diare/tinja lembek (9%), mual (3%), ruam kulit dan urtikaria (3%), muntah (1%), vaginitis (1%).
- Kurang dari 1%: rasa tidak nyaman di perut, flatulens, sakit kepala.
- Insidens efek samping, terutama diare, meningkat pada dosis anjuran yang lebih tinggi.

**Peringatan** (label Augmentin)

- Kontraindikasi: riwayat reaksi hipersensitivitas serius (misalnya anafilaksis atau sindrom Stevens-Johnson) terhadap amoksisilin, klavulanat, atau beta-laktam lain; riwayat ikterus kolestatik/gangguan fungsi hati akibat amoksisilin-klavulanat.
- Reaksi hipersensitivitas (anafilaksis) serius dan kadang fatal dapat terjadi.
- Gangguan fungsi hati termasuk hepatitis dan ikterus kolestatik; biasanya pulih, tetapi kematian pernah dilaporkan.
- Diare terkait *Clostridium difficile*.
- Pasien mononukleosis sering mengalami ruam eritematosa dengan amoksisilin; jangan diberikan pada mononukleosis.
- Tablet kunyah dan suspensi 200 mg/5 mL dan 400 mg/5 mL mengandung aspartam (fenilalanin); tidak untuk penderita fenilketonuria.
- Pada neonatus dan bayi muda, eliminasi amoksisilin dapat lebih lambat karena fungsi ginjal belum matang.

**Farmakokinetik** (label Augmentin; data dewasa kecuali disebutkan lain)

- Kadar puncak sekitar 1,5 jam setelah pemberian.
- Ikatan protein: klavulanat sekitar 25%, amoksisilin sekitar 18%. Amoksisilin mudah berdifusi ke sebagian besar jaringan dan cairan tubuh, kecuali otak dan cairan spinal.
- Pada anak, 2 jam setelah dosis tunggal suspensi 35 mg/kg, amoksisilin dan klavulanat terdeteksi di cairan efusi telinga tengah.
- Waktu paruh amoksisilin 1,3 jam dan asam klavulanat 1 jam; 50–70% amoksisilin dan 25–40% klavulanat dikeluarkan di urin dalam bentuk tidak berubah dalam 6 jam pertama.

**Farmakodinamik** (label Augmentin)

- Amoksisilin: antibiotik semisintetik yang bersifat bakterisidal terhadap bakteri gram positif dan gram negatif, tetapi dapat dirusak oleh beta-laktamase.
- Asam klavulanat: beta-laktam yang dapat menonaktifkan sebagian enzim beta-laktamase, sehingga melindungi amoksisilin dan memperluas spektrumnya ke banyak bakteri yang biasanya resisten terhadap amoksisilin.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. AUGMENTIN (amoxicillin/clavulanate potassium) tablets, powder for oral suspension, and chewable tablets (Dr. Reddy's Laboratories), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=174cc098-fe49-4f1a-87e2-601c7573f0db

---

### 3.53 Rifampisin

**Kalkulator berat badan** (IDAI hlm. 25, tabel antimikroba, dosis per kg per hari)

| Rute | Infeksi ringan–sedang | Infeksi berat | Keterangan |
|---|---|---|---|
| IV, PO | 10–20 mg dalam 1–2 dosis (dosis harian dewasa, 600 mg) | 20 mg dalam 2 dosis (dosis harian dewasa, 600 mg) | Seharusnya tidak digunakan secara rutin sebagai monoterapi karena cepatnya muncul resisten |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 89)

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 10–15 mg/kg/dosis q24 jam iv, po | D | 100% | 50–100% | 50–100% | Tak ada | Dosis untuk LFG <10 |

**Sediaan** (FORNAS 2025 hlm. 41; disediakan oleh Program Kemenkes)

| Sediaan | Peresepan maksimal |
|---|---|
| Kapsul 300 mg | – |
| Tablet 450 mg | – |
| Tablet 600 mg | – |

**Aturan penggunaan**

- Tidak digunakan rutin sebagai monoterapi (IDAI).
- Diminum 1 jam sebelum atau 2 jam sesudah makan dengan segelas penuh air (label rifampin).

**Manfaat obat** (label rifampin)

- Semua bentuk tuberkulosis, sebagai bagian dari paduan obat anti-TB.
- Pengobatan karier *Neisseria meningitidis* tanpa gejala untuk mengeradikasi meningokokus dari nasofaring. Tidak diindikasikan untuk mengobati infeksi meningokokus karena resistansi dapat muncul cepat.

**Efek samping** (label rifampin)

- Saluran cerna: nyeri ulu hati, rasa tidak nyaman di epigastrium, anoreksia, mual, muntah, ikterus, flatulens, kram, diare; kolitis pseudomembran; perubahan warna gigi (dapat menetap).
- Hati: kelainan uji fungsi hati sementara, hepatitis, sindrom mirip syok dengan keterlibatan hati, kolestasis.
- Darah: mikroangiopati trombotik, trombositopenia (terutama pada terapi intermiten dosis tinggi), leukopenia, anemia hemolitik, gangguan koagulasi yang bergantung vitamin K.
- SSP: sakit kepala, demam, mengantuk, lelah, ataksia, pusing, sulit berkonsentrasi, kebingungan.
- Kulit dan hipersensitivitas: kemerahan dan gatal; pruritus, urtikaria, ruam, sindrom Stevens-Johnson, nekrolisis epidermal toksik, DRESS, vaskulitis; anafilaksis jarang.

**Peringatan** (label rifampin)

- Hepatotoksisitas, dari kenaikan enzim hati tanpa gejala sampai gagal hati fulminan dan kematian. Pantau tanda cedera hati, terutama pada terapi lama atau bersama obat hepatotoksik lain (misalnya isoniazid).
- Kontraindikasi: hipersensitivitas terhadap rifampin atau golongan rifamisin; pemberian bersama saquinavir yang di-boost ritonavir; bersama atazanavir, darunavir, fosamprenavir, saquinavir, tipranavir, cabotegravir, fostemsavir, atau lenacapavir; bersama praziquantel.
- Reaksi kulit berat (termasuk DRESS): hentikan segera bila muncul tanda atau gejala.
- Gangguan koagulasi yang bergantung vitamin K dan perdarahan; pantau uji koagulasi pada pasien berisiko.
- Rifampin dapat menyebabkan perubahan warna (kuning, oranye, merah, cokelat) pada gigi, urin, keringat, sputum, dan air mata; lensa kontak lunak dapat ternoda permanen.
- Penginduksi kuat enzim metabolisme obat dan transporter, sehingga banyak berinteraksi dengan obat lain; efektivitas kontrasepsi hormonal dapat berkurang.

**Farmakokinetik** (label rifampin)

- Diserap baik dari saluran cerna; penyerapan berkurang sekitar 30% bila diminum bersama makanan.
- Tersebar luas ke berbagai organ dan cairan tubuh, termasuk cairan serebrospinal; ikatan protein sekitar 80%.
- Waktu paruh rata-rata 3,35 jam setelah dosis 600 mg pada dewasa dan turun menjadi sekitar 2–3 jam pada pemberian berulang. Pada anak usia 6–58 bulan dengan dosis 10 mg/kg, waktu paruh rata-rata 2,9 jam.
- Dieliminasi cepat ke empedu dan mengalami sirkulasi enterohepatik; mengalami deasetilasi menjadi metabolit aktif. Hingga 30% dosis dikeluarkan di urin.

**Farmakodinamik** (label rifampin)

- Menghambat aktivitas RNA polimerase yang bergantung DNA pada *Mycobacterium tuberculosis*; berinteraksi dengan RNA polimerase bakteri tanpa menghambat enzim mamalia.
- Kuman yang resisten terhadap rifampin kemungkinan juga resisten terhadap rifamisin lain.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Rifampin Capsules USP (Lupin Pharmaceuticals), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b56004f0-f23d-47f6-80c7-39884fccbccc

---

### 3.54 Pirazinamid

**Kalkulator berat badan** (IDAI hlm. 67)

| Keadaan | Dosis |
|---|---|
| – | 30–40 mg/kg/hari (maksimal 2 gr/hari) |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 89)

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 20–35 mg/kg/dosis q24 jam po | D | 100% | 100% | 50–100% | 40 mg/kg 24 jam sblmnya tiap 3x/minggu dialisis | 100% |

**Sediaan** (FORNAS 2025 hlm. 48; disediakan oleh Program Kemenkes)

| Sediaan | Restriksi |
|---|---|
| Tablet 500 mg | a) Hanya dapat diberikan di FPKTL, sesuai dengan SK Penetapan Rumah Sakit dan Balai Kesehatan Pelaksana Layanan Tuberkulosis Resistan Obat (Kepmenkes No. HK.01.07/MENKES/350/2017). b) Hanya digunakan untuk paduan pada TB Resistan Obat. |

**Aturan penggunaan**

- Hanya digunakan bersama obat anti-TB lain yang efektif (label pirazinamid).
- Periksa asam urat serum dan fungsi hati sebelum memulai terapi (label pirazinamid).

**Manfaat obat** (label pirazinamid)

- Terapi awal tuberkulosis aktif pada dewasa dan anak, dikombinasikan dengan obat anti-TB lain.
- Tuberkulosis aktif setelah kegagalan terapi dengan obat primer lain.

**Efek samping** (label pirazinamid)

- Efek samping utama adalah reaksi hati; hepatotoksisitas tampak bergantung dosis dan dapat muncul kapan saja selama terapi.
- Saluran cerna: mual, muntah, anoreksia.
- Artralgia dan mialgia ringan sering dilaporkan; gout.
- Hipersensitivitas: ruam, urtikaria, pruritus.
- Jarang: demam, akne, fotosensitivitas, porfiria, disuria, nefritis interstisial, trombositopenia, anemia sideroblastik, gangguan pembekuan darah.

**Peringatan** (label pirazinamid)

- Kontraindikasi: kerusakan hati berat; hipersensitivitas terhadap pirazinamid; gout akut.
- Hentikan dan jangan diberikan lagi bila muncul tanda kerusakan hepatoseluler atau hiperurisemia disertai artritis gout akut.
- Menghambat ekskresi urat di ginjal sehingga sering menimbulkan hiperurisemia, biasanya tanpa gejala.
- Hati-hati pada riwayat diabetes melitus karena pengelolaannya dapat menjadi lebih sulit.
- Pasien dengan penyakit hati atau berisiko tinggi hepatitis akibat obat perlu dipantau ketat.

**Farmakokinetik** (label pirazinamid)

- Diserap baik dari saluran cerna; kadar puncak plasma dalam 2 jam.
- Tersebar luas ke jaringan dan cairan tubuh termasuk hati, paru, dan cairan serebrospinal; kadar di cairan serebrospinal kira-kira sama dengan kadar plasma pada meninges yang meradang. Ikatan protein sekitar 10%.
- Waktu paruh 9–10 jam pada fungsi ginjal dan hati normal; dapat memanjang pada gangguan ginjal atau hati.
- Dihidrolisis di hati menjadi metabolit aktif asam pirazinoat; sekitar 70% dosis oral dikeluarkan di urin dalam 24 jam, terutama melalui filtrasi glomerulus.

**Farmakodinamik** (label pirazinamid)

- Dapat bersifat bakteriostatik atau bakterisidal terhadap *Mycobacterium tuberculosis*, bergantung kadar obat di tempat infeksi.
- Mekanisme kerjanya belum diketahui; in vitro dan in vivo hanya aktif pada pH sedikit asam.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Pyrazinamide Tablets USP (ANI Pharmaceuticals), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=262d8829-728c-48db-b89b-88d13b87e684

---

### 3.55 Etambutol

**Kalkulator berat badan** (IDAI hlm. 50)

| Keadaan | Dosis |
|---|---|
| – | 15–25 mg/kg/hari (maksimal 2,5 gr/hari) |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 82)

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 25 mg/kg/dosis q24 jam po | I | q24 jam | q24–36 jam | q48 jam | dosis sesudah dialisis | – |

**Sediaan** (FORNAS 2025 hlm. 43; disediakan oleh Program Kemenkes)

Restriksi FORNAS: tidak boleh digunakan sebagai *single agent* untuk TB.

| Sediaan | Peresepan maksimal |
|---|---|
| Tablet 250 mg | – |
| Tablet 400 mg | – |
| Tablet 500 mg | – |

**Aturan penggunaan**

- Tidak digunakan sebagai obat anti-TB tunggal (FORNAS; label etambutol).
- Periksa ketajaman penglihatan sebelum terapi dan secara berkala selama terapi; tiap mata diperiksa terpisah dan bersama. Pemeriksaan dilakukan setiap bulan bila dosis lebih dari 15 mg/kg/hari (label etambutol).

**Manfaat obat** (label etambutol)

- Tuberkulosis paru, bersama sedikitnya satu obat anti-TB lain.

**Efek samping** (label etambutol)

- Penurunan ketajaman penglihatan, termasuk kebutaan yang menetap, akibat neuritis optik: penurunan visus, skotoma, buta warna, dan/atau defek lapang pandang.
- Lainnya: hipersensitivitas, reaksi anafilaksis/anafilaktoid, dermatitis, eritema multiformis, pruritus, nyeri sendi; anoreksia, mual, muntah, gangguan saluran cerna, nyeri perut; demam, malaise, sakit kepala, pusing; kebingungan, disorientasi, kemungkinan halusinasi; trombositopenia, leukopenia, neutropenia.
- Kesemutan dan baal di ekstremitas akibat neuritis perifer; kenaikan asam urat serum dan serangan gout akut; infiltrat paru; toksisitas hati termasuk kematian.

**Peringatan** (label etambutol)

- Kontraindikasi: hipersensitivitas terhadap etambutol; neuritis optik yang diketahui, kecuali pertimbangan klinis memungkinkan; pasien yang tidak mampu menilai dan melaporkan efek samping penglihatan atau perubahan penglihatan (misalnya anak kecil dan pasien tidak sadar).
- Tidak dianjurkan pada anak di bawah 13 tahun karena kondisi penggunaan yang aman belum ditetapkan.
- Penurunan visus akibat neuritis optik dapat berkaitan dengan dosis dan lama terapi; biasanya pulih bila obat segera dihentikan, tetapi kebutaan menetap pernah dilaporkan.
- Pada penurunan fungsi ginjal, dosis perlu dikurangi berdasarkan kadar serum karena ekskresi utamanya melalui ginjal.
- Toksisitas hati termasuk kematian pernah dilaporkan; lakukan penilaian fungsi hati awal dan berkala.

**Farmakokinetik** (label etambutol)

- Setelah dosis oral tunggal 25 mg/kg, kadar puncak serum 2–5 mcg/mL tercapai 2–4 jam setelah pemberian; tidak terdeteksi lagi 24 jam setelah dosis terakhir, kecuali pada sebagian pasien dengan gangguan ginjal.
- Dalam 24 jam, sekitar 50% dosis dikeluarkan di urin dalam bentuk tidak berubah dan 8–15% sebagai metabolit; 20–22% dikeluarkan di feses dalam bentuk tidak berubah.
- Tidak terjadi akumulasi pada fungsi ginjal normal, tetapi akumulasi nyata terjadi pada insufisiensi ginjal.

**Farmakodinamik** (label etambutol)

- Berdifusi ke dalam sel mikobakteri yang sedang tumbuh aktif dan tampaknya menghambat sintesis satu atau lebih metabolit, sehingga metabolisme sel terganggu, multiplikasi berhenti, dan sel mati.
- Tidak menunjukkan resistansi silang dengan obat antimikobakteri lain; resistansi dapat muncul bila digunakan sebagai obat tunggal.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Ethambutol Hydrochloride Tablets USP (Lupin Pharmaceuticals), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c732b415-e1f9-478f-896d-1dc8b6362da4

---

### 3.56 Ranitidin

**Kalkulator berat badan** (IDAI hlm. 68)

| Rute | Dosis |
|---|---|
| IV | 1 mg/kg, 6–8 jam |
| Oral | 2–5 mg/kg, 8–12 jam |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 89, tertulis "Raniditidine")

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 2–4 mg/kg/dosis q8–12 jam po | D | 75% | 50% | 25% | ½ dosis | Tak ada |

**Sediaan** (FORNAS 2025 hlm. 189)

| Sediaan | Peresepan maksimal |
|---|---|
| Tablet 150 mg | 30 tab/bulan |
| Injeksi 25 mg/mL | 2 amp/hari |

**Aturan penggunaan**

- Sesuai tabel IDAI.
- Penyerapan tidak terganggu secara bermakna oleh makanan atau antasida (label ranitidin).

**Manfaat obat** (label ranitidin)

- Pada anak usia 1 bulan–16 tahun, keamanan dan efektivitas telah ditetapkan untuk ulkus duodenum dan lambung, penyakit refluks gastroesofagus (GERD), esofagitis erosif, serta pemeliharaan ulkus duodenum dan lambung yang sudah sembuh.
- Pada dewasa juga: kondisi hipersekresi patologis (misalnya sindrom Zollinger-Ellison dan mastositosis sistemik).

**Efek samping** (label ranitidin)

- Sakit kepala, kadang berat.
- SSP (jarang): malaise, pusing, mengantuk, insomnia, vertigo; kebingungan, agitasi, depresi, dan halusinasi yang pulih, terutama pada pasien lanjut usia yang sakit berat.
- Kardiovaskular (jarang): aritmia seperti takikardia, bradikardia, blok atrioventrikular.
- Saluran cerna: konstipasi, diare, mual/muntah, nyeri perut; pankreatitis jarang.
- Hati: hepatitis hepatoseluler, kolestatik, atau campuran; hentikan segera bila terjadi.
- Darah: leukopenia, granulositopenia, trombositopenia (biasanya pulih); jarang agranulositosis, pansitopenia, anemia aplastik.
- Kulit: ruam termasuk eritema multiformis (jarang); alopesia dan vaskulitis jarang.

**Peringatan** (label ranitidin)

- Kontraindikasi: hipersensitivitas terhadap ranitidin atau bahan produk.
- Respons gejala tidak menyingkirkan keganasan lambung.
- Dosis perlu disesuaikan pada gangguan fungsi ginjal karena ranitidin terutama dikeluarkan lewat ginjal; hati-hati pada gangguan fungsi hati.
- Hindari pada riwayat porfiria akut karena dapat memicu serangan porfiria.
- Dapat memberi hasil positif palsu pada uji protein urin dengan Multistix.

**Farmakokinetik** (label ranitidin)

- Bioavailabilitas oral sekitar 50%; kadar puncak 2–3 jam setelah dosis 150 mg. Pada anak, bioavailabilitas oral rata-rata 48%, sebanding dengan dewasa.
- Volume distribusi sekitar 1,4 L/kg; ikatan protein serum rata-rata 15%.
- Ekskresi utama melalui urin: sekitar 30% dosis oral dikeluarkan dalam bentuk tidak berubah dalam 24 jam, dengan sekresi tubulus aktif. Waktu paruh eliminasi 2,5–3 jam.
- Pada anak usia 1 bulan–16 tahun, parameter farmakokinetik tidak berbeda bermakna dengan dewasa setelah dikoreksi berat badan.

**Farmakodinamik** (label ranitidin)

- Penghambat kompetitif dan reversibel kerja histamin pada reseptor H2, termasuk reseptor di sel lambung.
- Menghambat sekresi asam lambung basal siang dan malam hari serta sekresi asam yang dirangsang. Bukan obat antikolinergik.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Ranitidine Tablets, USP (Amneal Pharmaceuticals of New York), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b38a3332-5c54-453f-aeb7-070f830955c2

---

### 3.57 Diazepam

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 81)

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 0,1–0,4 mg/kg/dosis iv, pr | D | 100% | 100% | 100% | tak ada | tak ada |

**Sediaan** (FORNAS 2025)

| Sediaan | Halaman FORNAS | Peresepan maksimal/restriksi |
|---|---|---|
| Injeksi 5 mg/mL (prosedur pre operatif) | hlm. 17 | – |
| Injeksi 5 mg/mL (antiepilepsi–antikonvulsi) | hlm. 19 | 10 amp/kasus, kecuali untuk kasus di ICU dan pada pasien kejang pada tetanus. Tidak untuk i.m. |
| Enema 5 mg/2,5 mL | hlm. 19 | 2 tube/hari, bila kejang |
| Enema 10 mg/2,5 mL | hlm. 19–20 | 2 tube/hari, bila kejang |
| Tablet 2 mg (antiansietas) | hlm. 179 | 30 tab/bulan |
| Tablet 5 mg (antiansietas) | hlm. 179 | 30 tab/bulan |
| Injeksi 5 mg/mL (antiansietas) | hlm. 179 | – |

**Aturan penggunaan**

- Injeksi antikonvulsi tidak untuk i.m. (FORNAS).
- Injeksi: jangan dicampur atau diencerkan dengan larutan atau obat lain dalam spuit atau wadah infus; jangan memakai vena kecil (punggung tangan atau pergelangan); hindari pemberian intra-arteri dan ekstravasasi (label diazepam injeksi).

**Manfaat obat** (label diazepam injeksi; label Valium)

- Tambahan pada status epileptikus dan kejang berulang berat (injeksi).
- Tambahan untuk spasme otot rangka, spastisitas akibat gangguan neuron motorik atas (misalnya palsi serebral), atetosis, sindrom stiff-man, dan tetanus.
- Ansietas, premedikasi sebelum tindakan bedah, sebelum tindakan endoskopi atau kardioversi, dan putus alkohol akut.
- Oral dapat digunakan sebagai tambahan pada gangguan kejang, tetapi tidak terbukti efektif sebagai terapi tunggal.

**Efek samping** (label diazepam injeksi; label Valium)

- Tersering: mengantuk, lelah, ataksia, kelemahan otot; trombosis vena dan flebitis di tempat suntikan.
- SSP: kebingungan, depresi termasuk depresi napas, disartria, sakit kepala, bicara pelo, tremor, vertigo.
- Kardiovaskular: bradikardia, hipotensi, kolaps kardiovaskular.
- Lainnya: penglihatan kabur, diplopia, nistagmus; konstipasi, mual; inkontinensia, retensi urin; urtikaria, ruam; cegukan; neutropenia; ikterus.
- Reaksi paradoksal (hipereksitasi, ansietas, halusinasi, peningkatan spastisitas otot, insomnia, amarah); lebih mungkin terjadi pada anak dan lanjut usia. Hentikan obat bila terjadi.

**Peringatan** (label diazepam injeksi; label Valium)

- Peringatan berbingkai: penggunaan bersama opioid dapat menyebabkan sedasi berat, depresi napas, koma, dan kematian. Benzodiazepin berisiko penyalahgunaan, adiksi, dan ketergantungan fisik; penghentian mendadak atau penurunan dosis cepat dapat memicu reaksi putus obat.
- Pada uji acak 162 anak usia 3 bulan–17 tahun yang menerima diazepam IV untuk status epileptikus, 16% mengalami depresi napas berat atau mengancam jiwa.
- Efikasi dan keamanan diazepam parenteral belum ditetapkan pada neonatus (≤30 hari); depresi SSP berkepanjangan pernah terjadi pada neonatus. Benzil alkohol (pengawet dalam injeksi) dikaitkan dengan sindrom *gasping* fatal pada bayi prematur.
- Kontraindikasi injeksi: hipersensitivitas terhadap diazepam; glaukoma sudut sempit akut; glaukoma sudut terbuka kecuali mendapat terapi yang sesuai.
- Kontraindikasi oral (Valium): hipersensitivitas; anak di bawah 6 bulan; miastenia gravis; insufisiensi napas berat; insufisiensi hati berat; sindrom apnea tidur; glaukoma sudut sempit akut.

**Farmakokinetik** (label Valium; label diazepam injeksi)

- Oral: lebih dari 90% diserap; kadar puncak plasma rata-rata 1–1,5 jam. Makanan memperlambat dan mengurangi penyerapan.
- Ikatan protein plasma tinggi (98%); melintasi sawar darah-otak dan plasenta, serta masuk ke ASI.
- Dimetabolisme oleh CYP3A4 dan CYP2C19 menjadi metabolit aktif N-desmetildiazepam dan temazepam, lalu oksazepam; dikeluarkan terutama di urin sebagai konjugat glukuronida.
- Waktu paruh eliminasi terminal hingga 48 jam; metabolit aktif N-desmetildiazepam hingga 100 jam. Pada anak usia 3–8 tahun, waktu paruh rata-rata 18 jam; pada bayi cukup bulan sekitar 30 jam dan bayi prematur rata-rata 54 jam.

**Farmakodinamik** (label Valium)

- Benzodiazepin dengan efek ansiolitik, sedatif, relaksan otot, antikonvulsan, dan amnestik.
- Sebagian besar efeknya diduga berasal dari fasilitasi kerja GABA, neurotransmiter penghambat di sistem saraf pusat.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Diazepam Injection, USP (Hospira), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7e7dd743-a87b-4ab3-b6ae-f116cd0c8b0f
4. VALIUM (diazepam) tablets (Roche), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=554baee5-b171-4452-a50a-41a0946f956c

---

### 3.58 Atropin

**Kalkulator berat badan** (IDAI hlm. 40)

| Rute | Dosis |
|---|---|
| IV atau IM | 0,02 mg/kg (maks 0,6 mg), kemudian 0,01 mg/kg, 4–6 jam |

**Sediaan** (FORNAS 2025)

| Sediaan | Halaman FORNAS | Kelas terapi |
|---|---|---|
| Injeksi 0,25 mg/mL (i.v./s.k.) | hlm. 17 | Obat untuk prosedur pre operatif |
| Tablet 0,5 mg | hlm. 18 | Antidot dan obat lain untuk keracunan (khusus) |
| Injeksi 0,25 mg/mL (i.v.) | hlm. 18 | Antidot dan obat lain untuk keracunan (khusus) |
| Tablet 0,5 mg | hlm. 191 | Antispasmodik |
| Injeksi 0,25 mg/mL (i.v./s.k.) | hlm. 191 | Antispasmodik |

**Aturan penggunaan**

- Titrasi berdasarkan denyut jantung, interval PR, tekanan darah, dan gejala (label atropin).

**Manfaat obat** (label atropin)

- Blokade sementara efek muskarinik yang berat atau mengancam jiwa, misalnya sebagai antisialagog, antivagal, antidot keracunan organofosfat atau jamur muskarinik, dan untuk henti jantung bradiasistol.

**Efek samping** (label atropin)

- Sebagian besar berkaitan langsung dengan efek antimuskarinik: mulut kering, penglihatan kabur, fotofobia, dan takikardia sering terjadi.
- Anhidrosis dapat menyebabkan intoleransi panas.
- Kadang reaksi hipersensitivitas, terutama ruam kulit yang pada sebagian kasus berlanjut menjadi eksfoliasi.

**Peringatan** (label atropin)

- Kontraindikasi: tidak ada.
- Takikardia: hati-hati pada penyakit jantung koroner karena takikardia meningkatkan kebutuhan oksigen miokard.
- Dapat mencetuskan glaukoma akut; mengubah stenosis pilorus parsial menjadi obstruksi total; menyebabkan retensi urin total pada hipertrofi prostat; mengentalkan sekret bronkus dan membentuk sumbatan pada penyakit paru kronik.
- Rekomendasi penggunaan pada anak tidak berdasarkan uji klinis.

**Farmakokinetik** (label atropin)

- Cepat menghilang dari darah setelah suntikan dan tersebar ke seluruh tubuh; farmakokinetik nonlinier setelah pemberian IV.
- Ikatan protein plasma sekitar 44%; melintasi sawar plasenta.
- Sebagian besar dirusak melalui hidrolisis enzimatik, terutama di hati; 13–50% dikeluarkan di urin dalam bentuk tidak berubah. Metabolismenya dihambat oleh pestisida organofosfat.
- Waktu paruh eliminasi lebih dari dua kali lipat pada anak di bawah 2 tahun dan lansia dibanding kelompok usia lain.

**Farmakodinamik** (label atropin)

- Antimuskarinik: melawan secara kompetitif kerja asetilkolin dan ester kolin lain pada reseptor muskarinik di kelenjar eksokrin serta otot polos dan otot jantung.
- Menghilangkan berbagai bentuk perlambatan jantung atau asistol akibat refleks vagal; dapat didahului fase perlambatan denyut jantung sesaat sebelum takikardia.
- Pada dosis klinis tidak menekan SSP tetapi dapat merangsang medula dan pusat otak yang lebih tinggi. Bukan stimulan napas yang andal; dosis besar atau berulang dapat menekan napas.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Atropine Sulfate Injection, USP (Hospira), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ad8916e7-206e-409e-2582-30d072845dd4

---

### 3.59 Propranolol

**Kalkulator berat badan** (IDAI hlm. 67–68)

| Rute | Dosis |
|---|---|
| Oral | 0,2–0,5 mg/kg, 6–8 jam, tingkatkan menjadi maks 1,5 mg/kg, 6–8 jam bila perlu |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 88)

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 0,2–0,5 mg/kg/dosis q6–12 jam po | D | 100% | 100% | 100% | Tak ada | Tak ada |

**Sediaan** (FORNAS 2025)

| Sediaan | Halaman FORNAS | Peresepan maksimal/restriksi |
|---|---|---|
| Tablet 10 mg (antimigren, profilaksis) | hlm. 70 | – |
| Tablet 40 mg (antimigren, profilaksis) | hlm. 70 | – |
| Tablet 10 mg (antiaritmia) | hlm. 151 | 90 tab/bulan. a) Untuk kasus-kasus dengan gangguan tiroid. b) Untuk tremor esensial, tremor distonia, dan tremor holmes. |

**Aturan penggunaan**

- Sesuai tabel IDAI.
- Bila akan dihentikan, dosis diturunkan bertahap selama sedikitnya beberapa minggu; penghentian mendadak dapat memperberat angina dan pernah diikuti infark miokard (label propranolol).

**Manfaat obat** (label propranolol)

- Hipertensi (tidak untuk kedaruratan hipertensi).
- Angina pektoris akibat aterosklerosis koroner; kendali laju ventrikel pada fibrilasi atrium; menurunkan mortalitas kardiovaskular pascainfark miokard.
- Profilaksis migren (bukan untuk mengobati serangan yang sudah berlangsung).
- Tremor esensial familial atau herediter; stenosis subaorta hipertrofik; tambahan pada blokade alfa untuk feokromositoma.

**Efek samping** (label propranolol)

- Kardiovaskular: bradikardia, gagal jantung kongestif, blok AV yang memberat, hipotensi, parestesia tangan, insufisiensi arteri tipe Raynaud.
- SSP: kepala terasa ringan, depresi (insomnia, lesu, lemah, lelah), gangguan penglihatan, halusinasi, mimpi yang jelas; sindrom disorientasi akut yang pulih.
- Saluran cerna: mual, muntah, rasa tidak nyaman di epigastrium, kram perut, diare, konstipasi.
- Alergi dan kulit: reaksi hipersensitivitas termasuk anafilaksis, ruam, laringospasme; sindrom Stevens-Johnson, nekrolisis epidermal toksik, dermatitis eksfoliatif, eritema multiformis, urtikaria.
- Pernapasan: bronkospasme. Darah: agranulositosis, purpura.

**Peringatan** (label propranolol)

- Kontraindikasi: syok kardiogenik; bradikardia sinus dan blok lebih dari derajat satu; asma bronkial; hipersensitivitas terhadap propranolol.
- Keamanan dan efektivitas pada anak belum ditetapkan; bronkospasme dan gagal jantung kongestif pernah dilaporkan saat pemberian pada anak.
- Hipoglikemia: propranolol, terutama pada bayi dan anak (diabetes maupun tidak), dikaitkan dengan hipoglikemia, khususnya saat puasa seperti persiapan operasi. Blokade beta dapat menutupi tanda awal hipoglikemia.
- Pasien dengan penyakit paru bronkospastik umumnya tidak boleh menerima penyekat beta.
- Dapat mencetuskan gagal jantung yang lebih berat; dapat menutupi tanda hipertiroidisme, dan penghentian mendadak dapat memicu badai tiroid.

**Farmakokinetik** (label propranolol; data dewasa)

- Hampir seluruhnya diserap setelah pemberian oral, tetapi mengalami metabolisme lintas pertama tinggi di hati sehingga rata-rata hanya sekitar 25% mencapai sirkulasi sistemik. Kadar puncak plasma 1–4 jam setelah dosis oral.
- Sekitar 90% terikat protein plasma; volume distribusi sekitar 4 L/kg; melintasi sawar darah-otak dan plasenta serta masuk ke ASI.
- Dimetabolisme luas (terutama CYP2D6 dan CYP1A2, juga CYP2C19); sebagian besar metabolit keluar di urin. Waktu paruh plasma 3–6 jam.

**Farmakodinamik** (label propranolol)

- Penyekat reseptor beta-adrenergik nonselektif tanpa aktivitas otonom lain; menurunkan respons kronotropik, inotropik, dan vasodilator terhadap rangsangan beta.
- Efek antiaritmia terutama melalui blokade beta; pada dosis lebih tinggi juga memiliki efek membran mirip kuinidin.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Propranolol Hydrochloride Tablets, USP (Par Health), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0d74bb04-8227-4afa-b523-ce1556150e07

---

### 3.60 Nifedipin

**Kalkulator berat badan** (IDAI hlm. 65)

| Keadaan | Dosis |
|---|---|
| – | Cap 0,25–0,5 mg/kg, 12 jam, tab 0,5 mg/kg, 12 jam |
| Oral atau sublingual untuk krisis hipertensi | Mulai dosis 0,1 mg/kg, tingkatkan bertahap tiap 5 menit sampai 3x jika diperlukan menjadi maks 10 mg/kali pemberian. Dosis maksimal 0,5 mg/kg; 6–8 jam |

**Sediaan** (FORNAS 2025 hlm. 154)

| Sediaan | Peresepan maksimal |
|---|---|
| Tablet 10 mg | 90 tab/bulan |
| Tablet lepas lambat 20 mg | 30 tab/bulan |
| Tablet lepas lambat 30 mg | 60 tab/bulan |

**Aturan penggunaan**

- Sesuai tabel IDAI.

**Manfaat obat** (label nifedipin kapsul)

- Angina vasospastik (Prinzmetal atau varian).
- Angina stabil kronik yang tetap bergejala meskipun sudah mendapat penyekat beta dan/atau nitrat dengan dosis memadai.

**Efek samping** (label nifedipin kapsul)

- Pada uji terkontrol: pusing atau kepala terasa ringan (27%), kemerahan dan rasa panas (25%), sakit kepala (23%), lemah (12%), mual atau nyeri ulu hati (11%), kram otot atau tremor (8%), edema perifer (7%), gugup atau perubahan suasana hati (7%), palpitasi (7%), sesak, batuk, atau mengi (6%).
- Sebagian besar merupakan akibat efek vasodilatasi; umumnya tidak serius.

**Peringatan** (label nifedipin kapsul)

- Kontraindikasi: hipersensitivitas terhadap nifedipin.
- Hipotensi berlebihan, terutama saat titrasi awal atau kenaikan dosis, dan lebih sering bila bersama penyekat beta.
- Nifedipin kapsul pernah digunakan (oral dan sublingual) untuk menurunkan tekanan darah secara akut, meskipun tidak disetujui untuk tujuan ini. Terdapat laporan hipotensi berat, infark miokard, dan kematian pada penggunaan nifedipin lepas cepat dengan cara tersebut. Label menyatakan nifedipin kapsul tidak boleh digunakan untuk penurunan tekanan darah akut.
- Angina yang meningkat atau infark miokard akut pernah terjadi saat memulai atau menaikkan dosis, terutama pada penyakit koroner obstruktif berat; gagal jantung pernah terjadi, terutama pada pasien yang menerima penyekat beta.
- Keamanan dan efektivitas pada anak belum ditetapkan; penggunaan pada anak tidak dianjurkan.

**Farmakokinetik** (label nifedipin kapsul; data dewasa)

- Diserap cepat dan sempurna setelah pemberian oral; terdeteksi di serum 10 menit setelah pemberian dan kadar puncak sekitar 30 menit.
- Terikat kuat pada protein serum; diubah luas menjadi metabolit tidak aktif, dan sekitar 80% nifedipin beserta metabolitnya dikeluarkan lewat ginjal.
- Waktu paruh eliminasi sekitar 2 jam; farmakokinetik dapat berubah pada penyakit hati kronik.

**Farmakodinamik** (label nifedipin kapsul)

- Penghambat masuknya ion kalsium (penyekat kanal lambat) ke otot jantung dan otot polos pembuluh darah tanpa mengubah kadar kalsium serum.
- Menurunkan resistensi pembuluh perifer dan tekanan darah sistolik serta diastolik, biasanya disertai sedikit peningkatan denyut jantung akibat refleks vasodilatasi; melebarkan arteri koroner dan menghambat spasme koroner.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Nifedipine Capsules, USP (Heritage Pharmaceuticals d/b/a Avet Pharmaceuticals), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b8b8cfee-ea71-44c2-81af-675efecfdf15

---

### 3.61 Amlodipin

**Kalkulator berat badan** (IDAI hlm. 36)

| Rute | Dosis |
|---|---|
| Oral | 0,05–0,2 mg/kg, 1x/hari |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 77)

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 0,05–0,2 mg/kg q24 jam po | D | 100% | 100% | 100% | tak ada | tak ada |

**Sediaan** (FORNAS 2025)

| Sediaan | Halaman FORNAS | Peresepan maksimal/restriksi |
|---|---|---|
| Tablet 5 mg (antiangina) | hlm. 150 | 30 tab/bulan. Untuk angina dengan bradiaritmia |
| Tablet 5 mg (antihipertensi) | hlm. 152 | 30 tab/bulan |
| Tablet 10 mg (antihipertensi) | hlm. 152 | 30 tab/bulan |

**Aturan penggunaan**

- Diberikan 1 kali sehari (IDAI).
- Bioavailabilitas tidak dipengaruhi makanan (label Norvasc).

**Manfaat obat** (label Norvasc)

- Hipertensi, untuk menurunkan tekanan darah. Pada pasien usia 6–17 tahun, amlodipin efektif menurunkan tekanan darah; efek pada anak di bawah 6 tahun belum diketahui.
- Angina stabil kronik, angina vasospastik, dan penyakit arteri koroner yang terdokumentasi angiografi (tanpa gagal jantung atau fraksi ejeksi <40%).

**Efek samping** (label Norvasc)

- Bergantung dosis: edema, pusing, kemerahan, palpitasi; edema paling sering pada dosis tertinggi.
- Lainnya (>1%): lelah, mual, nyeri perut, mengantuk.
- Pascapemasaran: ginekomastia; ikterus dan kenaikan enzim hati (sebagian berat); kemungkinan gangguan ekstrapiramidal.

**Peringatan** (label Norvasc)

- Kontraindikasi: sensitivitas terhadap amlodipin.
- Hipotensi bergejala mungkin terjadi, terutama pada stenosis aorta berat; hipotensi akut jarang karena awitan kerja bertahap.
- Angina yang memburuk dan infark miokard akut dapat terjadi saat memulai atau menaikkan dosis, terutama pada penyakit koroner obstruktif berat.
- Pada gangguan hati berat, waktu paruh memanjang (56 jam), sehingga titrasi dilakukan perlahan.

**Farmakokinetik** (label Norvasc)

- Kadar puncak plasma 6–12 jam setelah pemberian oral; bioavailabilitas absolut 64–90%.
- Sekitar 93% terikat protein plasma; sekitar 90% diubah di hati menjadi metabolit tidak aktif; 10% obat asal dan 60% metabolit dikeluarkan di urin.
- Waktu paruh eliminasi terminal 30–50 jam; kadar tunak tercapai setelah 7–8 hari pemberian harian. Tidak dipengaruhi bermakna oleh gangguan ginjal.
- Pada pasien hipertensi usia 6–17 tahun, klirens dan volume distribusi setelah disesuaikan berat badan serupa dengan dewasa.

**Farmakodinamik** (label Norvasc)

- Antagonis kalsium golongan dihidropiridin yang menghambat masuknya ion kalsium ke otot polos pembuluh darah dan otot jantung, dengan efek lebih besar pada otot polos pembuluh darah.
- Ikatan dengan reseptor kanal kalsium terjadi dan lepas secara bertahap, sehingga awitan kerjanya bertahap.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. NORVASC (amlodipine besylate) tablets (Pfizer), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=abd6a2ca-40c2-485c-bc53-db1c652505ed

---

### 3.62 Hidroklorotiazid

**Kalkulator berat badan** (IDAI hlm. 53)

| Keadaan | Dosis |
|---|---|
| – | 1–1,5 mg/kg, 12–24 jam |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 84)

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 1–1,5 mg/kg/dosis q12–24 jam po | D | 100% | 100% | hindari | tak ada data | tak ada data |

**Sediaan** (FORNAS 2025)

| Sediaan | Halaman FORNAS | Peresepan maksimal |
|---|---|---|
| Tablet 25 mg (diuretik) | hlm. 133 | 30 tab/bulan |
| Tablet 25 mg (antihipertensi) | hlm. 153 | 30 tab/bulan |

**Aturan penggunaan**

- Sesuai tabel IDAI.
- Pantau tanda gangguan cairan dan elektrolit (hiponatremia, alkalosis hipokloremik, hipokalemia), terutama bila muntah berlebihan atau mendapat cairan parenteral (label hidroklorotiazid).

**Manfaat obat** (label hidroklorotiazid)

- Terapi tambahan untuk edema akibat gagal jantung kongestif, sirosis hati, dan terapi kortikosteroid atau estrogen; juga edema akibat gangguan ginjal seperti sindrom nefrotik, glomerulonefritis akut, dan gagal ginjal kronik.
- Hipertensi, sebagai obat tunggal atau untuk meningkatkan efektivitas antihipertensi lain.

**Efek samping** (label hidroklorotiazid)

- Kardiovaskular: hipotensi termasuk hipotensi ortostatik.
- Saluran cerna: pankreatitis, ikterus kolestatik intrahepatik, diare, muntah, sialadenitis, kram, konstipasi, iritasi lambung, mual, anoreksia.
- Darah: anemia aplastik, agranulositosis, leukopenia, anemia hemolitik, trombositopenia.
- Metabolik: gangguan elektrolit, hiperglikemia, glikosuria, hiperurisemia.
- Hipersensitivitas dan kulit: anafilaksis, vaskulitis, fotosensitivitas, urtikaria, ruam, purpura; eritema multiformis termasuk sindrom Stevens-Johnson, nekrolisis epidermal toksik.
- Lainnya: lemah, spasme otot, vertigo, parestesia, pusing, sakit kepala, gagal ginjal, nefritis interstisial, penglihatan kabur sementara, xantopsia.
- Pascapemasaran: peningkatan risiko kanker kulit nonmelanoma, terutama karsinoma sel skuamosa pada dosis kumulatif besar.

**Peringatan** (label hidroklorotiazid)

- Kontraindikasi: anuria; hipersensitivitas terhadap produk ini atau obat turunan sulfonamida lain.
- Hati-hati pada penyakit ginjal berat (dapat mencetuskan azotemia) dan pada gangguan fungsi hati (perubahan kecil cairan dan elektrolit dapat mencetuskan koma hepatikum).
- Miopia akut sementara dan glaukoma sudut tertutup akut; hentikan obat secepatnya bila terjadi.
- Dapat memicu atau memperberat lupus eritematosus sistemik.
- Tidak ada uji klinis terkontrol yang baik pada anak; informasi dosis anak berasal dari penggunaan empiris dan literatur.

**Farmakokinetik** (label hidroklorotiazid)

- Diuresis mulai dalam 2 jam setelah pemberian oral, puncak sekitar 4 jam, dan berlangsung 6–12 jam.
- Tidak dimetabolisme dan dieliminasi cepat oleh ginjal; sedikitnya 61% dosis oral dikeluarkan utuh dalam 24 jam. Waktu paruh plasma 5,6–14,8 jam.
- Melintasi plasenta tetapi tidak melintasi sawar darah-otak; masuk ke ASI.

**Farmakodinamik** (label hidroklorotiazid)

- Memengaruhi mekanisme reabsorpsi elektrolit di tubulus distal ginjal; meningkatkan ekskresi natrium dan klorida dalam jumlah yang kira-kira setara, dapat disertai kehilangan kalium dan bikarbonat.
- Mekanisme efek antihipertensi tiazid belum diketahui; biasanya tidak memengaruhi tekanan darah normal.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Hydrochlorothiazide Tablets USP (Teva Pharmaceuticals USA), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=e2270db4-2930-4ec5-ac96-2b4542aed367

---

### 3.63 Laktulosa

**Kalkulator berat badan** (IDAI hlm. 61)

| Keadaan | Dosis |
|---|---|
| Laksatif (larutan 3,3 g/5 ml) | 0,5 ml/kg, 12 jam, oral |

**Sediaan** (FORNAS 2025 hlm. 192)

| Sediaan | Peresepan maksimal |
|---|---|
| Sirup 3,335 g/5 mL | – |

**Aturan penggunaan**

- Sesuai tabel IDAI.
- Efek baru muncul setelah obat mencapai kolon; dapat diperlukan 24–48 jam untuk menghasilkan buang air besar (label laktulosa).

**Manfaat obat** (label laktulosa)

- Pengobatan konstipasi; pada konstipasi kronik meningkatkan jumlah buang air besar per hari dan jumlah hari dengan buang air besar.

**Efek samping** (label laktulosa)

- Pada awal pemberian dapat timbul flatulens dan kram usus, biasanya sementara.
- Dosis berlebihan dapat menyebabkan diare dengan komplikasi kehilangan cairan, hipokalemia, dan hipernatremia.
- Mual dan muntah pernah dilaporkan.

**Peringatan** (label laktulosa)

- Kontraindikasi: pasien yang memerlukan diet rendah galaktosa (larutan mengandung galaktosa).
- Hati-hati pada diabetes karena mengandung galaktosa dan laktosa.
- Secara teoretis, akumulasi gas H2 dapat menimbulkan ledakan pada tindakan elektrokauter saat proktoskopi atau kolonoskopi; lakukan pembersihan usus dengan larutan yang tidak difermentasi.
- Pasien lanjut usia atau lemah yang menerima laktulosa lebih dari 6 bulan perlu pemeriksaan elektrolit serum berkala.
- Antasida yang tidak diserap dapat menghambat penurunan pH kolon yang diharapkan.
- Keamanan dan efektivitas pada anak belum ditetapkan.

**Farmakokinetik** (label laktulosa)

- Sangat sedikit diserap dari saluran cerna dan tidak ada enzim di saluran cerna manusia yang dapat menghidrolisisnya, sehingga mencapai kolon hampir tanpa perubahan.
- Hanya sedikit yang mencapai darah; ekskresi di urin 3% atau kurang dan selesai dalam 24 jam.

**Farmakodinamik** (label laktulosa)

- Di kolon, bakteri memecah laktulosa terutama menjadi asam laktat dan sedikit asam format dan asetat, sehingga tekanan osmotik meningkat dan isi kolon sedikit lebih asam.
- Akibatnya kadar air tinja meningkat dan tinja menjadi lebih lunak.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Lactulose Solution USP (Chartwell RX), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d6975cd8-80e0-43e2-809a-175ea7e40715

---

### 3.64 Ipratropium bromida

**Kalkulator berat badan** (IDAI hlm. 56–57)

| Sediaan/rute | Dosis |
|---|---|
| Larutan pernapasan (250 mcg/ml) | 0,25–1 ml dilarutkan menjadi 4 ml, 4–8 jam |
| Larutan pernapasan, serangan berat | Tiap 20 menit, 3 dosis, kemudian 4–6 jam |
| Aerosol 20 mcg/puff | 2–4 semprot, 6–8 jam |
| Nasal | 84 mcg/lubang hidung, 6–12 jam |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 84)

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 0,25–1 ml/dosis q4–8 jam inhalasi | D | 100% | 100% | 100% | tak ada | tak ada |

**Sediaan** (FORNAS 2025)

Restriksi FORNAS: a) untuk pasien PPOK dengan eksaserbasi akut; b) tidak untuk jangka panjang.

| Sediaan | Halaman FORNAS | Peresepan maksimal |
|---|---|---|
| Aerosol 0,02 mg/dosis | hlm. 196, 202 | 1 canister/bulan |
| Cairan inhalasi 0,025% | hlm. 202 | – |

**Aturan penggunaan**

- Larutan pernapasan dilarutkan menjadi 4 ml sebelum diberikan (IDAI).
- Hindari menyemprotkan aerosol ke mata (label Atrovent HFA).

**Manfaat obat** (label ipratropium larutan inhalasi; label Atrovent HFA)

- Bronkodilator untuk terapi rumatan bronkospasme pada penyakit paru obstruktif kronik (PPOK), termasuk bronkitis kronik dan emfisema, sendiri atau bersama bronkodilator lain, terutama agonis beta.

**Efek samping** (label ipratropium larutan inhalasi)

- Kurang dari 3%: takikardia, palpitasi, nyeri mata, retensi urin, infeksi saluran kemih, urtikaria.
- Pencetusan atau perburukan glaukoma sudut sempit, midriasis, dan nyeri mata akut pernah dilaporkan.
- Efek samping saluran napas bawah (bronkitis, sesak, bronkospasme) paling sering menjadi alasan penghentian obat.
- Sakit kepala, mulut kering, dan perburukan gejala PPOK lebih sering pada dosis total harian 2.000 mcg atau lebih.
- Reaksi alergi: ruam, angioedema lidah, bibir, dan wajah, urtikaria, laringospasme, reaksi anafilaksis.

**Peringatan** (label ipratropium larutan inhalasi; label Atrovent HFA)

- Kontraindikasi: hipersensitivitas terhadap ipratropium bromida atau terhadap atropin dan turunannya.
- Penggunaan tunggal untuk meredakan bronkospasme pada eksaserbasi akut PPOK belum cukup diteliti; obat dengan awitan lebih cepat mungkin lebih baik sebagai terapi awal. Atrovent HFA tidak diindikasikan untuk terapi awal episode bronkospasme akut yang memerlukan pertolongan cepat.
- Bronkospasme paradoksal yang dapat mengancam jiwa (Atrovent HFA).
- Hati-hati pada glaukoma sudut sempit, hipertrofi prostat, atau obstruksi leher kandung kemih.
- Keamanan dan efektivitas larutan inhalasi pada anak di bawah 12 tahun belum ditetapkan; Atrovent HFA belum ditetapkan pada anak.

**Farmakokinetik** (label ipratropium larutan inhalasi)

- Sebagian besar dosis tertelan tetapi tidak diserap; setelah nebulisasi 2 mg, rata-rata 7% dosis masuk ke sirkulasi sistemik.
- Ikatan dengan albumin dan glikoprotein asam alfa-1 minimal (0–9% in vitro); dimetabolisme sebagian.
- Waktu paruh eliminasi sekitar 1,6 jam setelah pemberian IV.

**Farmakodinamik** (label ipratropium larutan inhalasi)

- Antikolinergik (parasimpatolitik) yang menghambat refleks yang diperantarai vagus dengan melawan kerja asetilkolin.
- Mencegah peningkatan siklik GMP intrasel pada otot polos bronkus; bronkodilatasi setelah inhalasi terutama bersifat lokal, bukan sistemik.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Ipratropium Bromide Inhalation Solution (Ritedose Pharmaceuticals), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=22479633-624a-4251-ad3c-1dcba5d503fb
4. ATROVENT HFA (ipratropium bromide) inhalation aerosol (Boehringer Ingelheim), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=170e98ef-5560-4068-be7d-e649068eb884

---

### 3.65 Insulin reguler

**Kalkulator berat badan** (IDAI hlm. 56)

| Rute | Dosis |
|---|---|
| IV | 0,025–0,1 u/kg ATAU 0,025–0,1 u/kg/jam (2–5 u/kg dalam 50 ml NS, kecepatan 0,5–2 ml/jam) |
| SK | 0,7–1 u/kg/hari |

Keterangan IDAI (hlm. 56):

- SK (onset/puncak/durasi): glulisin, lispro 10–15 menit/1 jam/2–5 jam; aspartate 15–20 mnt/1 jam/3–5 jam; detemir 1–2 jam/datar/24 jam; glargin 1–2 jam/datar/24 jam; isofan (NPH) 2–4 jam/4–12 jam/18–20 jam; zinc lente 2–3 jam/7–15 jam/24 jam; kristalin zinc (ultralente) 4–6 jam/10–30 jam/24–36 jam; protamine zinc 4–8 jam/15–20 jam/24–36 jam.
- Bila diberikan 2x/hari: 2/3 dosis sebelum sarapan, 1/3 sebelum makan malam; 2/3 kerja panjang, 1/3 kerja pendek.
- Bila pemberian multipel: 20% kerja pendek sebelum makan dan 40% kerja panjang dalam 1–2 dosis terbagi.

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 84)

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 0,05–0,2 IU/kg/dosis sc prn | D | 100% | 75% | 50% | tak ada | tak ada |

**Sediaan** (FORNAS 2025 hlm. 137)

| Sediaan | Peresepan maksimal |
|---|---|
| Insulin regular, injeksi 100 IU/mL (kemasan vial, *disposable cartridge*, *penfill cartridge*) | – |

Catatan FORNAS untuk antidiabetes parenteral (hlm. 136):

- a) Dapat digunakan untuk pasien DM tipe 1 atau DM tipe 2.
- b) Untuk DM tipe 1 dapat dimulai dengan Human Insulin atau Analog Insulin.
- c) Wanita hamil yang memerlukan insulin maka diutamakan menggunakan *human* insulin.
- d) Diperlukan kehati-hatian terhadap risiko terjadinya hipoglikemia yang penanganannya merujuk pada penatalaksanaan hipoglikemia.

**Aturan penggunaan**

- Sesuai tabel IDAI.
- SK: disuntikkan sekitar 30 menit sebelum makan di paha, lengan atas, perut, atau bokong; lokasi suntikan dirotasi dalam area yang sama untuk mengurangi risiko lipodistrofi dan amiloidosis kutan lokal (label Humulin R).
- IV hanya di bawah pengawasan medis dengan pemantauan ketat gula darah dan kalium (label Humulin R).
- Jarum dan spuit tidak boleh dipakai bergantian antarpasien; periksa label insulin sebelum setiap suntikan untuk mencegah tertukar (label Humulin R).

**Manfaat obat** (label Humulin R)

- Memperbaiki kendali glikemik pada pasien dewasa dan anak dengan diabetes melitus. Pada anak, dosis harus disesuaikan secara individual berdasarkan kebutuhan metabolik dan pemantauan gula darah yang sering.

**Efek samping** (label Humulin R)

- Hipoglikemia adalah efek samping tersering semua insulin; hipoglikemia berat dapat menyebabkan kejang, tidak sadar, dan kematian.
- Hipokalemia akibat perpindahan kalium ke dalam sel.
- Reaksi alergi generalisata berat termasuk anafilaksis; reaksi di tempat suntikan (hematoma, nyeri, kemerahan, nodul, bengkak, gatal).
- Lipodistrofi (lipoatrofi atau lipohipertrofi) dan amiloidosis kutan lokal di tempat suntikan; edema perifer dan kenaikan berat badan.

**Peringatan** (label Humulin R)

- Kontraindikasi: saat episode hipoglikemia; hipersensitivitas terhadap Humulin R atau eksipiennya.
- Perubahan regimen insulin (kekuatan, produsen, jenis, lokasi atau cara suntikan) dapat memengaruhi kendali glikemik; lakukan di bawah pengawasan medis dengan pemantauan gula darah lebih sering.
- Kesadaran terhadap gejala hipoglikemia dapat berkurang, misalnya pada penggunaan penyekat beta atau hipoglikemia berulang.
- Hipokalemia yang tidak diobati dapat menyebabkan paralisis napas, aritmia ventrikel, dan kematian; pantau kalium pada pasien berisiko.

**Farmakokinetik** (label Humulin R)

- SK: kadar puncak serum 36–150 menit setelah dosis 0,05–0,4 unit/kg; bioavailabilitas absolut 48–89%.
- Volume distribusi 0,32–0,67 L/kg setelah pemberian IV.
- Diambil dan didegradasi terutama di hati, ginjal, otot, dan jaringan lemak; hati merupakan organ utama klirens.
- Waktu paruh tampak setelah pemberian SK sekitar 1,5 jam (rentang 40 menit–7 jam).

**Farmakodinamik** (label Humulin R)

- Mengatur metabolisme glukosa: menurunkan gula darah dengan merangsang ambilan glukosa perifer (terutama otot rangka dan lemak) dan menghambat produksi glukosa hati; menghambat lipolisis dan proteolisis serta meningkatkan sintesis protein.
- SK: efek mulai sekitar 30 menit, maksimal sekitar 3 jam, dan berakhir sekitar 8 jam; bervariasi antarindividu. IV: efek mulai sekitar 10–15 menit dan berakhir sekitar 4 jam.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. HUMULIN R (insulin human) injection (Eli Lilly), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b519bd83-038c-4ec5-a231-a51ec5cc291f

---

### 3.66 Sukralfat

**Kalkulator berat badan** (IDAI hlm. 70)

| Keadaan | Dosis |
|---|---|
| – | 40–80 mg/kg/hari terbagi 4 dosis |

**Sediaan** (FORNAS 2025 hlm. 189)

| Sediaan | Peresepan maksimal |
|---|---|
| Tablet 500 mg | 60 tab/bulan |
| Suspensi 500 mg/5 mL | – |

**Aturan penggunaan**

- Dibagi 4 dosis per hari (IDAI).
- Sukralfat dapat mengurangi penyerapan obat lain (misalnya simetidin, digoksin, fluorokuinolon, ketokonazol, levotiroksin, fenitoin, kuinidin, ranitidin, tetrasiklin, teofilin); pemberian obat tersebut 2 jam sebelum sukralfat menghilangkan interaksi pada kasus yang diteliti (label Carafate).

**Manfaat obat** (label Carafate)

- Pengobatan jangka pendek (sampai 8 minggu) ulkus duodenum aktif.
- Terapi pemeliharaan setelah ulkus duodenum sembuh.

**Efek samping** (label Carafate)

- Umumnya ringan; dilaporkan pada 4,7% pasien. Tersering konstipasi (2%).
- Kurang dari 0,5%: diare, mual, muntah, rasa tidak nyaman di lambung, gangguan pencernaan, flatulens, mulut kering; gatal, ruam; pusing, insomnia, mengantuk, vertigo; nyeri punggung, sakit kepala.
- Pascapemasaran: reaksi hipersensitivitas (sesak, bibir bengkak, gatal, ruam, urtikaria); bezoar, terutama pada pasien dengan pengosongan lambung lambat atau yang menerima makanan lewat selang.

**Peringatan** (label Carafate)

- Kontraindikasi: hipersensitivitas terhadap zat aktif atau eksipien.
- Aspirasi tablet dengan komplikasi napas pernah dilaporkan; hati-hati pada kondisi yang mengganggu menelan atau refleks muntah dan batuk.
- Sedikit aluminium diserap; pada gagal ginjal kronik atau dialisis dapat terjadi akumulasi dan toksisitas aluminium (osteodistrofi, osteomalasia, ensefalopati). Gunakan dengan hati-hati pada gagal ginjal kronik.
- Keamanan dan efektivitas pada anak belum ditetapkan.

**Farmakokinetik** (label Carafate)

- Hanya sedikit diserap dari saluran cerna; bagian kecil yang diserap dikeluarkan terutama di urin.
- Bekerja secara lokal, bukan sistemik.

**Farmakodinamik** (label Carafate)

- Membentuk kompleks yang melekat pada ulkus dengan eksudat protein di dasar ulkus, sehingga menutupi ulkus dan melindunginya dari asam, pepsin, dan garam empedu.
- Menghambat aktivitas pepsin dalam cairan lambung dan menyerap garam empedu in vitro.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. CARAFATE (sucralfate) tablets (Allergan), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c87c6b50-6977-4fa7-ae98-40c0753f7aee

---

### 3.67 Midazolam

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 86)

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 0,1–0,2 mg/kg/dosis iv, im | D | 100% | 100% | 50% | Tak ada data | Tak ada data |

**Sediaan** (FORNAS 2025 hlm. 17; obat untuk prosedur pre operatif)

Restriksi FORNAS: dapat digunakan untuk premedikasi sebelum induksi anestesi dan rumatan untuk sedasi di ruang perawatan intensif.

| Sediaan | Peresepan maksimal/restriksi |
|---|---|
| Injeksi 1 mg/mL (i.v.) | Dosis rumatan: 1 mg/jam (24 mg/hari). Dosis premedikasi: 8 vial/kasus |
| Injeksi 5 mg/mL (i.v.) | Dosis rumatan: 1 mg/jam (24 mg/hari). Dosis premedikasi: 8 vial/kasus. Hanya digunakan untuk sedasi pada pasien di ruang perawatan intensif |

**Aturan penggunaan**

- Sebelum pemberian IV dalam dosis berapa pun, pastikan tersedia oksigen, obat resusitasi, alat bantu napas (bag-valve-mask dan intubasi) sesuai usia dan ukuran, serta tenaga terampil; pantau terus tanda hipoventilasi, sumbatan jalan napas, atau apnea (misalnya dengan oksimetri nadi). Flumazenil sebaiknya tersedia (label midazolam).
- Pada anak, dosis dihitung per kg; pada anak obesitas dihitung berdasarkan berat badan ideal (label midazolam).
- Tidak boleh diberikan dengan suntikan cepat pada neonatus; hipotensi berat dan kejang pernah dilaporkan, terutama bila bersama fentanil (label midazolam).

**Manfaat obat** (label midazolam)

- Sedasi, ansiolisis, dan amnesia praoperasi (IM atau IV).
- Sedasi, ansiolisis, dan amnesia sebelum atau selama prosedur diagnostik, terapeutik, atau endoskopi (IV).
- Induksi anestesi umum (IV) dan komponen anestesi seimbang.
- Infus IV kontinu untuk sedasi pasien yang diintubasi dan diberi ventilasi mekanik di ruang perawatan kritis.
- Keamanan dan efikasi untuk sedasi telah ditetapkan pada pasien anak dan neonatus.

**Efek samping** (label midazolam)

- Tersering: fluktuasi tanda vital, termasuk penurunan volume tidal dan/atau laju napas (23,3% setelah IV; 10,8% setelah IM) dan apnea (15,4% setelah IV), serta perubahan tekanan darah dan nadi.
- Sebagian besar efek samping serius, terutama terkait oksigenasi dan ventilasi, terjadi bila diberikan bersama obat lain yang menekan SSP.
- IM: sakit kepala; nyeri, indurasi, dan kemerahan di tempat suntikan.

**Peringatan** (label midazolam)

- Penggunaan bersama opioid dapat menyebabkan sedasi berat, depresi napas, koma, dan kematian.
- Hanya digunakan bila ada tenaga yang terampil mendeteksi hipoventilasi dan menangani jalan napas; titrasi selalu perlahan pada dewasa maupun anak.
- Kontraindikasi: hipersensitivitas terhadap midazolam; glaukoma sudut sempit akut; glaukoma sudut terbuka kecuali mendapat terapi yang sesuai.
- Neurotoksisitas pada anak: studi hewan menunjukkan obat anestesi dan sedasi yang diberikan lebih dari 3 jam dapat meningkatkan apoptosis neuron di otak yang sedang berkembang; signifikansi klinisnya belum jelas.
- Penggunaan pada akhir kehamilan dapat menyebabkan sedasi atau gejala putus obat pada neonatus.

**Farmakokinetik** (label midazolam)

- Dewasa: volume distribusi 1,0–3,1 L/kg; waktu paruh eliminasi 1,8–6,4 jam (rata-rata sekitar 3 jam); sekitar 97% terikat protein plasma, terutama albumin.
- Dieliminasi melalui metabolisme hati (CYP3A4) menjadi metabolit terhidroksilasi yang dikonjugasi dan dikeluarkan di urin.
- Anak usia 1 tahun ke atas: klirens per berat badan serupa atau lebih tinggi daripada dewasa, dan waktu paruh terminal 0,78–3,3 jam.
- Neonatus sakit berat: waktu paruh terminal jauh memanjang (6,5–12,0 jam) dan klirens menurun.

**Farmakodinamik** (label midazolam)

- Benzodiazepin kerja singkat yang menekan SSP; efeknya bergantung dosis, rute, dan obat lain yang diberikan.
- Pada anak, efek sedasi setelah IM mulai dalam 5 menit dan puncak 15–30 menit; setelah IV, sedasi tercapai dalam 3–5 menit pada dewasa dan anak.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Midazolam Injection, USP (Hospira), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=1abda8b8-48a8-4995-af86-39220d1aa240

---

### 3.68 Lansoprazol

**Kalkulator berat badan** (IDAI hlm. 61)

| Berat badan | Dosis |
|---|---|
| 1 thn–30 kg | 15 mg |
| >30 kg | 30 mg |

**Sediaan** (FORNAS 2025 hlm. 188)

| Sediaan | Peresepan maksimal | Restriksi |
|---|---|---|
| Kapsul 30 mg | 30 kaps/bulan | a) Untuk terapi jangka pendek pada kasus tukak lambung, tukak duodenum dan refluks esofagitis. b) Diberikan 1 jam sebelum makan. |

**Aturan penggunaan**

- Diberikan 1 jam sebelum makan (FORNAS).
- Kapsul tidak boleh dihancurkan atau dikunyah; diberikan sedikitnya 30 menit sebelum sukralfat; antasida boleh diberikan bersamaan (label Prevacid).

**Manfaat obat** (label Prevacid)

- Pada anak usia 1–17 tahun: terapi jangka pendek GERD simtomatik dan esofagitis erosif. Tidak efektif pada bayi usia 1 bulan sampai kurang dari 1 tahun dengan GERD simtomatik.
- Pada dewasa: ulkus duodenum dan lambung aktif, eradikasi *H. pylori*, ulkus terkait OAINS, GERD, esofagitis erosif, dan kondisi hipersekresi patologis termasuk sindrom Zollinger-Ellison.

**Efek samping** (label Prevacid)

- Pada uji terkontrol plasebo: diare (3,8%), nyeri perut (2,1%), mual (1,3%), konstipasi (1,0%). Diare lebih sering pada dosis 60 mg.

**Peringatan** (label Prevacid)

- Kontraindikasi: hipersensitivitas terhadap komponen formulasi; pemberian bersama produk yang mengandung rilpivirin.
- Tidak disetujui pada anak di bawah 1 tahun; studi pada tikus muda menunjukkan penebalan katup jantung. Pada anak 1–11 tahun, lansoprazol tidak diberikan lebih dari 12 minggu dalam uji klinis; jangan melebihi dosis dan lama penggunaan yang dianjurkan.
- Nefritis tubulointerstisial akut; diare terkait *Clostridium difficile*; fraktur terkait osteoporosis pada dosis tinggi dan terapi lama; reaksi kulit berat (SJS, TEN, DRESS, AGEP); lupus eritematosus kutan dan sistemik.
- Penggunaan lama: defisiensi vitamin B12, hipomagnesemia, dan polip kelenjar fundus.
- Dapat meningkatkan kadar kromogranin A sehingga mengganggu pemeriksaan tumor neuroendokrin; interaksi dengan metotreksat dosis tinggi.

**Farmakokinetik** (label Prevacid)

- Granul bersalut enterik; penyerapan dimulai setelah granul keluar dari lambung. Kadar puncak plasma sekitar 1,7 jam; bioavailabilitas absolut lebih dari 80%.
- Cmax dan AUC turun 50–70% bila diberikan 30 menit setelah makan; tidak ada pengaruh makanan bermakna bila diberikan sebelum makan.
- 97% terikat protein plasma; dimetabolisme luas di hati. Waktu paruh plasma rata-rata 1,5 jam.
- Hampir tidak ada obat utuh di urin; sekitar sepertiga dikeluarkan di urin dan dua pertiga di feses sebagai metabolit.

**Farmakodinamik** (label Prevacid)

- Golongan benzimidazol tersubstitusi yang menekan sekresi asam lambung dengan menghambat secara spesifik sistem enzim (H+, K+)-ATPase (pompa proton) di permukaan sekretori sel parietal lambung.
- Menghambat tahap akhir pembentukan asam.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. PREVACID (lansoprazole) delayed-release capsules and SoluTab (Takeda Pharmaceuticals America), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=71ba78cb-7e46-43eb-9425-fa130f537f84

---

### 3.69 Deferoksamin

**Kalkulator berat badan**

| Keadaan | Dosis | Sumber |
|---|---|---|
| SK | 30–50 mg/kg/hari, 5–7x/minggu, 8–12 jam SK | IDAI hlm. 45 (tertulis "Deferioksamin") |
| Injeksi 500 mg, anak usia <3 tahun | 20–30 mg/kgBB/hari, maks 5–7 hari | FORNAS hlm. 117–118 |
| Injeksi 500 mg, usia >3 tahun | 40–60 mg/kgBB/hari, maks 5–7 hari | FORNAS hlm. 118 |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 81, tertulis "Desferoxamine")

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 10–15 mg/kg/jam iv utk 12–24 jam | D | 100% | 75% | 50% | tak ada data | tak ada data |

**Sediaan** (FORNAS 2025 hlm. 117–118; obat untuk kelebihan besi)

| Sediaan | Peresepan maksimal |
|---|---|
| Injeksi 500 mg | Dosis anak usia <3 tahun: 20–30 mg/kgBB/hari, maks 5–7 hari. Dosis usia >3 tahun: 40–60 mg/kgBB/hari, maks 5–7 hari |

**Aturan penggunaan**

- Sesuai tabel IDAI dan FORNAS.
- Diberikan IM, atau infus SK atau IV perlahan; reaksi hipersensitivitas biasanya terjadi pada suntikan IV cepat (label Desferal).

**Manfaat obat** (label Desferal)

- Tambahan pada tata laksana standar keracunan besi akut.
- Kelebihan besi akibat transfusi pada pasien anemia kronik.
- Tidak diindikasikan untuk hemokromatosis primer.

**Efek samping** (label Desferal)

- Reaksi di tempat suntikan: iritasi, nyeri, rasa terbakar, bengkak, indurasi, gatal, kemerahan, bintul; dapat disertai reaksi sistemik (artralgia, demam, sakit kepala, mialgia, mual).
- Reaksi alergi: ruam menyeluruh, urtikaria, anafilaksis dengan atau tanpa syok, angioedema.
- Gangguan penglihatan dan pendengaran (lihat Peringatan); gangguan ginjal; gangguan pertumbuhan pada anak.

**Peringatan** (label Desferal)

- Kontraindikasi: riwayat hipersensitivitas terhadap deferoksamin; penyakit ginjal berat atau anuria.
- Keamanan dan efektivitas pada anak di bawah 3 tahun belum ditetapkan; mobilisasi besi relatif buruk pada usia ini dan penggunaannya tidak dianjurkan kecuali mobilisasi besi yang bermakna dapat dibuktikan.
- Toksisitas mata (penglihatan kabur, katarak, penurunan visus, gangguan lapang pandang dan penglihatan warna) dan telinga (tinitus, gangguan pendengaran frekuensi tinggi); risiko meningkat pada terapi lama, dosis tinggi, atau feritin rendah. Lakukan pemeriksaan mata dan audiometri berkala.
- Dosis tinggi dengan feritin rendah dikaitkan dengan gangguan pertumbuhan pada anak; pantau berat dan tinggi badan setiap 3 bulan.
- Sindrom distres napas akut pada dosis IV yang terlalu tinggi; dosis harian anjuran tidak boleh dilampaui.
- Meningkatkan risiko infeksi *Yersinia* dan mukormikosis.
- Disfungsi jantung pada kelebihan besi berat bila bersama vitamin C dosis tinggi.

**Farmakokinetik** (label Desferal)

- Dimetabolisme terutama oleh enzim plasma.
- Kelat besi mudah larut dalam air dan mudah melewati ginjal sehingga urin berwarna kemerahan; sebagian juga dikeluarkan di feses melalui empedu.

**Farmakodinamik** (label Desferal)

- Mengikat besi membentuk kompleks stabil sehingga besi tidak ikut dalam reaksi kimia lebih lanjut.
- Mudah mengikat besi dari feritin dan hemosiderin, tetapi tidak mudah dari transferin, dan tidak mengikat besi dari sitokrom dan hemoglobin.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. DESFERAL (deferoxamine mesylate) for injection (Novartis), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a7174843-5965-49fc-b842-f7eff7b48bbc

---

### 3.70 Deferipron

**Kalkulator berat badan**

| Keadaan | Dosis | Sumber |
|---|---|---|
| Oral | 25 mg/kg 8 jam (maks 100 mg/kg/hari) | IDAI hlm. 45 |
| Tablet salut selaput 500 mg, tablet salut enterik pelepasan lambat 1.000 mg, sirup 100 mg/mL | 50–75 mg/kgBB/hari | FORNAS hlm. 116–117 |

**Sediaan** (FORNAS 2025 hlm. 116–117; obat untuk kelebihan besi)

| Sediaan | Peresepan maksimal | Restriksi |
|---|---|---|
| Tablet salut selaput 500 mg | 50–75 mg/kgBB/hari | a) Untuk terapi kelasi besi. b) Terapi awal harus ditentukan oleh dokter yang memiliki kompetensi di bidang ilmu hematologi onkologi anak atau hematologi onkologi medik dewasa. |
| Tablet salut enterik pelepasan lambat 1.000 mg | 50–75 mg/kgBB/hari | a) Untuk terapi kelasi besi. b) Terapi awal harus ditentukan oleh dokter yang memiliki kompetensi di bidang ilmu hematologi onkologi anak atau hematologi onkologi medik dewasa. |
| Sirup 100 mg/mL | 50–75 mg/kgBB/hari, maks 1 btl/bulan | Terapi awal harus ditentukan oleh dokter yang memiliki kompetensi di bidang ilmu hematologi onkologi anak atau hematologi onkologi medik dewasa. |

**Aturan penggunaan**

- Sesuai tabel IDAI dan FORNAS.
- Periksa hitung neutrofil absolut sebelum memulai dan pantau secara teratur selama terapi (label Ferriprox).

**Manfaat obat** (label Ferriprox)

- Kelebihan besi akibat transfusi pada pasien dewasa dan anak usia 8 tahun ke atas dengan sindrom talasemia, penyakit sel sabit, atau anemia lain.

**Efek samping** (label Ferriprox)

- Tersering (≥6%): mual, muntah, nyeri perut, artralgia, kenaikan ALT, neutropenia.
- Kenaikan ALT pada 7,5% pasien talasemia dalam uji klinis.
- Urin berwarna kemerahan/cokelat akibat ekskresi besi.
- Penurunan kadar seng plasma.

**Peringatan** (label Ferriprox)

- Peringatan berbingkai: dapat menyebabkan agranulositosis yang berujung infeksi serius dan kematian; neutropenia dapat mendahuluinya. Hentikan sementara bila timbul neutropenia atau infeksi, dan pantau hitung neutrofil lebih sering.
- Agranulositosis terjadi pada 1% pasien talasemia dalam uji klinis gabungan.
- Kontraindikasi: hipersensitivitas terhadap deferipron atau eksipien (pernah dilaporkan purpura Henoch-Schönlein, urtikaria, dan edema periorbital dengan ruam).
- Pantau kadar seng plasma setiap tahun.
- Toksisitas embrio-janin; diperlukan kontrasepsi efektif.
- Pada talasemia, keamanan dan efektivitas pada anak telah ditetapkan untuk usia 8 tahun ke atas; pada penyakit sel sabit atau anemia lain telah ditetapkan untuk usia 3–16 tahun.

**Farmakokinetik** (label Ferriprox)

- Kadar puncak serum sekitar 2 jam setelah dosis tunggal (tablet dua kali sehari, kondisi puasa); makanan tinggi lemak tidak mengubah Cmax dan AUC.
- Waktu paruh eliminasi rata-rata 1,8 jam.
- Dimetabolisme terutama oleh UGT1A6 menjadi 3-O-glukuronida yang tidak mengikat besi; 75–90% dosis keluar di urin (terutama sebagai metabolit) dalam 24 jam pertama.

**Farmakodinamik** (label Ferriprox)

- Pengkelat dengan afinitas terhadap ion feri (besi III); membentuk kompleks netral 3:1 (deferipron:besi) yang stabil pada pH fisiologis.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. FERRIPROX (deferiprone) tablets (Chiesi USA), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=946718ff-df43-1baa-74d1-e5bcfbe8ad86

---

### 3.71 Levotiroksin

**Kalkulator** (IDAI hlm. 71, tertulis "Tiroksin"; dosis per luas permukaan tubuh)

| Rute | Dosis |
|---|---|
| Oral | 500 mcg tab. 100 mcg/m2 dibulatkan ke perempat tab terdekatk, 1x/hari |
| IV | 50 mcg/m2/hari |

**Sediaan** (FORNAS 2025 hlm. 147–148)

| Sediaan | Peresepan maksimal |
|---|---|
| Tablet 25 mcg | – |
| Tablet 50 mcg | Untuk substitusi 150–200 mcg/hari. 90 tab/bulan |
| Tablet 100 mcg | 60 tab/bulan |
| Tablet 150 mcg | 60 tab/bulan |

**Aturan penggunaan**

- Diberikan 1 kali sehari (IDAI).
- Diminum saat perut kosong, setengah sampai satu jam sebelum sarapan; beri jarak sedikitnya 4 jam dari obat yang mengganggu penyerapannya (label Synthroid).
- Untuk anak yang tidak dapat menelan tablet utuh: tablet dihancurkan, disuspensikan dalam 5–10 mL air, dan segera diberikan dengan sendok atau pipet; suspensi tidak boleh disimpan (label Synthroid).

**Manfaat obat** (label Synthroid)

- Terapi pengganti pada hipotiroidisme primer, sekunder, dan tersier, kongenital maupun didapat, pada dewasa dan anak termasuk neonatus.
- Tambahan pada pembedahan dan terapi radioiodin untuk kanker tiroid berdiferensiasi baik yang bergantung TSH.
- Pada hipotiroidisme kongenital, terapi dimulai segera setelah diagnosis untuk mencegah dampak pada perkembangan kognitif dan pertumbuhan.

**Efek samping** (label Synthroid)

- Terutama gejala hipertiroidisme akibat dosis berlebih: lelah, nafsu makan meningkat, berat badan turun, intoleransi panas, demam, berkeringat; sakit kepala, hiperaktivitas, gelisah, cemas, mudah marah, insomnia; tremor, kelemahan otot; palpitasi, takikardia, aritmia; sesak; diare, muntah; rambut rontok; gangguan haid.
- Pada anak: pseudotumor serebri dan pergeseran epifisis kaput femoris pernah dilaporkan. Dosis berlebih dapat menyebabkan kraniosinostosis pada bayi dan penutupan epifisis dini.

**Peringatan** (label Synthroid)

- Peringatan berbingkai: tidak untuk mengobati obesitas atau menurunkan berat badan; dosis besar dapat menimbulkan toksisitas serius.
- Kontraindikasi: insufisiensi adrenal yang belum dikoreksi.
- Indeks terapi sempit. Pada anak, dosis kurang dapat mengganggu perkembangan kognitif dan pertumbuhan linear, dan dosis berlebih berkaitan dengan kraniosinostosis dan percepatan usia tulang.
- Pantau bayi dengan ketat pada 2 minggu pertama terapi untuk beban jantung berlebih dan aritmia.
- Dapat mencetuskan krisis adrenal pada insufisiensi adrenal; dapat memperburuk kendali gula darah pada diabetes.

**Farmakokinetik** (label Synthroid)

- Penyerapan T4 oral 40–80%, terutama di jejunum dan ileum atas; meningkat saat puasa dan menurun oleh makanan tertentu (misalnya kedelai) serta serat.
- Lebih dari 99% hormon tiroid dalam sirkulasi terikat protein plasma; hanya hormon bebas yang aktif.
- T4 dieliminasi lambat, terutama melalui deiodinasi bertahap; sekitar 80% T3 dalam sirkulasi berasal dari T4 di jaringan perifer.

**Farmakodinamik** (label Synthroid)

- Hormon tiroid bekerja melalui pengaturan transkripsi DNA dan sintesis protein: T3 dan T4 masuk ke inti sel dan berikatan dengan reseptor tiroid pada DNA, mengaktifkan transkripsi gen.
- Efek fisiologis terutama diperantarai T3.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. SYNTHROID (levothyroxine sodium) tablets (AbbVie), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=1e11ad30-1041-4520-10b0-8f9d30d30fcc

---

### 3.72 Propiltiourasil

**Kalkulator** (IDAI hlm. 68)

| Usia | Dosis |
|---|---|
| Bayi | 5–10 mg/kg |
| 6–10 thn | 150–300 mg |
| >10 thn | 150 mg/m2 |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 88, tertulis "Propythiouracil")

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 50 mg/m2/dosis q8 jam po | D | 100% | 100% | 100% | Tak ada data | Tak ada data |

**Sediaan** (FORNAS 2025 hlm. 148)

| Sediaan | Peresepan maksimal |
|---|---|
| Tablet 100 mg | Untuk bulan pertama maks 180 tab/bulan |

**Aturan penggunaan**

- Sesuai tabel IDAI.
- Pasien atau orang tua perlu diberi tahu risiko gagal hati; hentikan segera dan periksa hitung leukosit serta fungsi hati bila timbul lelah, mual, anoreksia, demam, faringitis, atau malaise (label propiltiourasil).

**Manfaat obat** (label propiltiourasil)

- Hipertiroidisme pada penyakit Graves atau struma multinodular toksik pada pasien yang tidak dapat menoleransi metimazol dan tidak sesuai untuk pembedahan atau terapi radioiodin.
- Meredakan gejala hipertiroidisme sebagai persiapan tiroidektomi atau terapi radioiodin pada pasien yang tidak dapat menoleransi metimazol.

**Efek samping** (label propiltiourasil)

- Berat: cedera hati (hepatitis, gagal hati yang memerlukan transplantasi atau berakibat kematian).
- Hambatan mielopoiesis (agranulositosis, granulopenia, anemia aplastik, trombositopenia), demam obat, sindrom mirip lupus, periarteritis, hipoprotrombinemia dan perdarahan.
- Nefritis, glomerulonefritis, pneumonitis interstisial, dermatitis eksfoliatif, eritema nodosum; vaskulitis terkait ANCA.

**Peringatan** (label propiltiourasil)

- Peringatan berbingkai: cedera hati berat dan gagal hati akut, kadang fatal, termasuk kasus yang memerlukan transplantasi hati pada dewasa dan anak. Propiltiourasil disimpan untuk pasien yang tidak dapat menoleransi metimazol dan tidak sesuai untuk radioiodin atau pembedahan.
- Tidak dianjurkan pada anak kecuali dalam keadaan jarang ketika metimazol tidak dapat ditoleransi dan pembedahan atau radioiodin tidak sesuai; tidak ada laporan gagal hati serupa dengan metimazol pada anak.
- Agranulositosis pada sekitar 0,2–0,5% pasien, biasanya dalam 3 bulan pertama; minta pasien segera melapor bila demam atau nyeri tenggorok.
- Vaskulitis dengan komplikasi berat dan kematian; hipotiroidisme.
- Kontraindikasi: hipersensitivitas terhadap obat atau komponen produk.

**Farmakokinetik** (label propiltiourasil)

- Mudah diserap dan dimetabolisme luas; sekitar 35% dosis dikeluarkan di urin dalam bentuk utuh dan terkonjugasi dalam 24 jam.

**Farmakodinamik** (label propiltiourasil)

- Menghambat sintesis hormon tiroid; tidak menonaktifkan tiroksin dan triiodotironin yang sudah tersimpan atau beredar.
- Menghambat konversi tiroksin menjadi triiodotironin di jaringan perifer.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Propylthiouracil Tablets, USP (Par Health), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b0c23a2c-b250-4c0d-9b2a-c1483faa2ca0

---

### 3.73 Tiamazol (metimazol)

**Kalkulator berat badan** (IDAI hlm. 62, tertulis "Metimazol")

| Rute | Dosis |
|---|---|
| Oral | 0,3–1 mg/kg/hari, turunkan menjadi 0,1–0,5 mg/kg/hari |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 86, tertulis "Methimazole")

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 0,3–1 mg/kg/dosis q24 jam po | D | 100% | 100% | 100% | Tak ada data | Tak ada data |

**Sediaan** (FORNAS 2025 hlm. 148)

| Sediaan | Peresepan maksimal |
|---|---|
| Tablet 5 mg | 120 tab/bulan |
| Tablet 10 mg | Untuk bulan pertama maks 90 tab/bulan |

**Aturan penggunaan**

- Sesuai tabel IDAI.
- Pasien perlu segera melapor bila nyeri tenggorok, ruam kulit, demam, sakit kepala, atau malaise; periksa hitung leukosit dan hitung jenis (label metimazol).

**Manfaat obat** (label metimazol)

- Hipertiroidisme pada penyakit Graves atau struma multinodular toksik yang tidak sesuai untuk pembedahan atau terapi radioiodin.
- Meredakan gejala hipertiroidisme sebagai persiapan tiroidektomi atau terapi radioiodin.
- Pilihan utama bila obat antitiroid diperlukan pada anak, karena laporan cedera hati berat pada anak yang menerima propiltiourasil.

**Efek samping** (label metimazol)

- Berat (jauh lebih jarang): hambatan mielopoiesis (agranulositosis, granulositopenia, trombositopenia, anemia aplastik), demam obat, sindrom mirip lupus, sindrom autoimun insulin (dapat menyebabkan koma hipoglikemia), hepatitis, periarteritis, hipoprotrombinemia; nefritis sangat jarang; pankreatitis akut.
- Ringan: ruam, urtikaria, mual, muntah, nyeri epigastrium, artralgia, parestesia, hilangnya pengecapan, rambut rontok, mialgia, sakit kepala, gatal, mengantuk, edema, vertigo, pigmentasi kulit, ikterus, pembesaran kelenjar ludah dan getah bening.
- Vaskulitis terkait ANCA dengan komplikasi berat.

**Peringatan** (label metimazol)

- Kontraindikasi: hipersensitivitas terhadap obat atau komponen produk.
- Agranulositosis berpotensi mengancam jiwa.
- Hepatotoksisitas termasuk gagal hati akut pernah dilaporkan, tetapi risikonya tampak lebih rendah daripada propiltiourasil, terutama pada anak.
- Melintasi plasenta dan dapat menyebabkan kelainan bawaan bila diberikan pada trimester pertama kehamilan.

**Farmakokinetik** (label metimazol)

- Mudah diserap dari saluran cerna, dimetabolisme di hati, dan dikeluarkan di urin.

**Farmakodinamik** (label metimazol)

- Menghambat sintesis hormon tiroid; tidak menonaktifkan tiroksin dan triiodotironin yang sudah tersimpan atau beredar, dan tidak mengganggu efektivitas hormon tiroid yang diberikan.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Methimazole Tablets, USP (Chartwell RX), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=5b25e346-11b6-44ed-89f9-ab927232ac19

---

### 3.74 Kalium klorida

**Kalkulator berat badan** (IDAI hlm. 57, tertulis "Kalium")

| Keadaan | Dosis |
|---|---|
| – | 5 mEq/kg/hari, diberikan dalam larutan 20–40 mEq/L, dengan laju maks 0,5 mEq/kg/jam |

**Sediaan** (FORNAS 2025 hlm. 171)

| Sediaan | Peresepan maksimal |
|---|---|
| Tablet lepas lambat 600 mg | 180 tab/bulan |

**Aturan penggunaan**

- Sesuai tabel IDAI.
- Bila kalium serum kurang dari 2,5 mEq/L, gunakan kalium intravena, bukan suplementasi oral (label Klor-Con).
- Tablet lepas lambat tidak diminum saat perut kosong karena dapat mengiritasi lambung (label Klor-Con).

**Manfaat obat** (label Klor-Con)

- Pengobatan dan pencegahan hipokalemia, dengan atau tanpa alkalosis metabolik, bila pengaturan diet kaya kalium atau pengurangan dosis diuretik tidak mencukupi.

**Efek samping** (label Klor-Con)

- Tersering: mual, muntah, flatulens, nyeri atau rasa tidak nyaman di perut, diare.
- Hiperkalemia; sumbatan, perdarahan, ulserasi, atau perforasi saluran cerna atas dan bawah; ruam kulit jarang.

**Peringatan** (label Klor-Con)

- Kontraindikasi: pasien yang mendapat triamteren atau amilorid.
- Sediaan oral padat dapat menimbulkan lesi ulseratif atau stenosis saluran cerna; pertimbangkan sediaan cair pada pasien dengan gangguan menelan atau motilitas berat. Hentikan bila muntah berat, nyeri perut, distensi, atau perdarahan saluran cerna.
- Gangguan ginjal meningkatkan risiko hiperkalemia, terutama bila bersama penghambat sistem renin-angiotensin-aldosteron atau OAINS; pantau kalium serum sering.
- Keamanan dan efektivitas pada anak belum ditetapkan.

**Farmakokinetik** (label Klor-Con)

- Diserap sempurna sebelum meninggalkan usus halus; matriks lilin tidak diserap dan keluar bersama feses.
- Ekskresi kalium urin mulai meningkat 1 jam setelah pemberian, puncak sekitar 4 jam, dan berlangsung hingga 8 jam.

**Farmakodinamik** (label Klor-Con)

- Kalium adalah kation intrasel utama; berperan dalam tonisitas intrasel, transmisi impuls saraf, kontraksi otot jantung, rangka, dan polos, serta fungsi ginjal normal.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. KLOR-CON (potassium chloride) extended-release tablets (Upsher-Smith), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4340c3f2-ecf8-44cd-9b69-217f543e24e2

---

### 3.75 Lisinopril

**Kalkulator berat badan** (IDAI hlm. 61)

| Rute | Dosis |
|---|---|
| Oral | 0,1 mg/kg/hari, dapat ditingkatkan dalam 4–6 mgg menjadi 0,2–1 mg/kg/hari |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 85)

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 0,1–1 mg/kg q24 jam po | D | 100% | 50–75% | 25–50% | Dosis sesudah dialisis | Tak ada |

**Sediaan** (FORNAS 2025 hlm. 153–154)

| Sediaan | Peresepan maksimal |
|---|---|
| Tablet 5 mg | 30 tab/bulan |
| Tablet 10 mg | 30 tab/bulan |

**Aturan penggunaan**

- Sesuai tabel IDAI.
- Makanan tidak mengubah bioavailabilitas (label Qbrelis).

**Manfaat obat** (label Qbrelis)

- Hipertensi pada dewasa dan anak usia 6 tahun ke atas.
- Gagal jantung sistolik; menurunkan mortalitas pada infark miokard akut yang hemodinamik stabil (dewasa).

**Efek samping** (label Qbrelis)

- Pada uji hipertensi (lebih sering daripada plasebo): sakit kepala, pusing, batuk.
- Profil efek samping pada anak usia 6–16 tahun tidak berbeda bermakna dengan dewasa.

**Peringatan** (label Qbrelis)

- Peringatan berbingkai: toksisitas janin; hentikan segera bila hamil.
- Kontraindikasi: riwayat angioedema atau hipersensitivitas terkait penghambat ACE; angioedema herediter atau idiopatik; kombinasi dengan aliskiren pada diabetes; kombinasi dengan penghambat neprilisin (misalnya sakubitril).
- Angioedema wajah, lidah, glotis, atau laring, termasuk yang fatal.
- Gangguan fungsi ginjal termasuk gagal ginjal akut; hipotensi simtomatik; hiperkalemia; sindrom yang diawali ikterus kolestatik hingga nekrosis hati fulminan.
- Keamanan dan efektivitas belum ditetapkan pada anak di bawah 6 tahun atau anak dengan LFG <30 mL/menit/1,73 m².

**Farmakokinetik** (label Qbrelis; data dewasa)

- Kadar puncak serum sekitar 7 jam setelah pemberian oral; penyerapan rata-rata sekitar 25% (bervariasi 6–60%).
- Tidak terikat protein serum selain ACE; tidak dimetabolisme dan dikeluarkan utuh seluruhnya di urin.
- Waktu paruh efektif 12 jam pada pemberian berulang; gangguan ginjal menurunkan eliminasi.

**Farmakodinamik** (label Qbrelis)

- Menghambat enzim pengubah angiotensin (ACE) sehingga angiotensin II plasma menurun, aktivitas vasopresor berkurang, dan sekresi aldosteron menurun (dapat sedikit meningkatkan kalium serum).

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. QBRELIS (lisinopril) oral solution (Azurity Pharmaceuticals), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=9f6e4e57-a489-4b36-b093-b93865d3717c

---

### 3.76 Metformin

**Kalkulator** (IDAI hlm. 62)

| Usia | Dosis |
|---|---|
| Anak ≥10 tahun | 500 mg, oral, dua kali sehari, dikonsumsi bersama makanan. Dosis dapat ditingkatkan sesuai kadar gula darah |

Keterangan IDAI: bukan ditujukan untuk mengobati obesitas, melainkan untuk mengatasi resistensi insulin yang merupakan komplikasi obesitas.

**Sediaan** (FORNAS 2025 hlm. 134–135)

| Sediaan | Peresepan maksimal |
|---|---|
| Tablet 500 mg | 120 tab/bulan |
| Tablet 850 mg | 60 tab/bulan |

**Aturan penggunaan**

- Dikonsumsi bersama makanan (IDAI).

**Manfaat obat** (label metformin)

- Tambahan diet dan olahraga untuk memperbaiki kendali glikemik pada dewasa dan anak usia 10 tahun ke atas dengan diabetes melitus tipe 2. Keamanan dan efektivitas pada anak di bawah 10 tahun belum ditetapkan.

**Efek samping** (label metformin)

- Pada uji klinis (lebih sering daripada plasebo): diare (53%), mual/muntah (26%), flatulens (12%), astenia (9%), gangguan pencernaan (7%), rasa tidak nyaman di perut (6%), sakit kepala (6%).
- Penurunan kadar vitamin B12 serum hingga di bawah normal pada sekitar 7% pasien.

**Peringatan** (label metformin)

- Peringatan berbingkai: asidosis laktat terkait metformin dapat berakibat kematian, hipotermia, hipotensi, dan bradiaritmia resisten; awitannya samar dengan gejala tidak khas (malaise, mialgia, gangguan napas, mengantuk, nyeri perut). Faktor risiko antara lain gangguan ginjal dan obat tertentu.
- Kontraindikasi: gangguan ginjal berat (eGFR <30 mL/menit/1,73 m²); hipersensitivitas terhadap metformin; asidosis metabolik akut atau kronik termasuk ketoasidosis diabetik.
- Risiko hipoglikemia meningkat bila dikombinasikan dengan insulin atau sekretagog insulin.
- Perhatian pada pemeriksaan dengan kontras iodin pada kelompok berisiko.

**Farmakokinetik** (label metformin)

- Bioavailabilitas absolut tablet 500 mg saat puasa sekitar 50–60%; makanan menurunkan dan sedikit memperlambat penyerapan.
- Hampir tidak terikat protein plasma; tidak dimetabolisme di hati dan dikeluarkan utuh di urin.

**Farmakodinamik** (label metformin)

- Antihiperglikemik yang menurunkan glukosa plasma basal dan setelah makan: menurunkan produksi glukosa hati, menurunkan penyerapan glukosa di usus, dan meningkatkan sensitivitas insulin melalui peningkatan ambilan dan penggunaan glukosa perifer.
- Sekresi insulin tidak berubah.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Metformin Hydrochloride Tablets, USP (Zydus Pharmaceuticals USA), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c82a10fa-1e8e-46b6-890a-737de3f34ee1

---

### 3.77 Asetilsistein

**Kalkulator berat badan** (IDAI hlm. 37)

| Keadaan | Dosis |
|---|---|
| Gagal hati, keracunan parasetamol (IV) | 150 mg/kg dalam D5% IV dalam 1 jam, dilanjutkan 10 mg/kg/jam selama 20 jam (bila terlambat <10 jam), selama 32 jam (bila terlambat 10–16 jam), selama 72 jam (bila terlambat >16 jam), dan lebih lama bila os masih ensefalopati |
| Keracunan parasetamol (oral) | 140 mg/kg oral segera, kemudian 70 mg/kg tiap 4 jam selama 72 jam |

Keterangan IDAI: monitor kadar kalium darah. Berikan jika parasetamol >150 mg/L pada 4 jam, >75 mg/L pada 8 jam.

**Sediaan** (FORNAS 2025)

| Sediaan | Halaman FORNAS | Peresepan maksimal/restriksi |
|---|---|---|
| Infus 200 mg/mL (antidot) | hlm. 18–19 | Maks 3 hari. Untuk keracunan parasetamol yang disengaja atau tiba-tiba |
| Cairan inhalasi 100 mg/mL (ekspektoran) | hlm. 201–202 | 3 amp/hari paling lama 10 hari |
| Kapsul 200 mg (ekspektoran) | hlm. 202 | Maks 10 kaps/kasus |
| Granula 200 mg (ekspektoran) | hlm. 202 | 3 x sehari (600 mg/hari) |
| Sirup 100 mg/5 mL (ekspektoran) | hlm. 202 | 2 btl/kasus, paling lama 10 hari. Hanya untuk pasien anak <12 tahun |

**Aturan penggunaan**

- Sesuai tabel IDAI; pantau kadar kalium darah (IDAI).
- Volume total infus perlu disesuaikan pada anak <40 kg dan pasien yang memerlukan restriksi cairan untuk mencegah kelebihan cairan (label Acetadote).
- Bila sekret bronkus menjadi lebih banyak dan cair sementara batuk tidak memadai, jalan napas dijaga dengan pengisapan (label asetilsistein larutan).

**Manfaat obat** (label Acetadote; label asetilsistein larutan)

- Mencegah atau mengurangi cedera hati setelah tertelan parasetamol dalam jumlah yang berpotensi hepatotoksik, pada dewasa dan anak dengan berat badan 5 kg atau lebih.
- Terapi tambahan pada sekret mukus yang abnormal, kental, atau lengket (inhalasi), misalnya pada penyakit bronkopulmoner akut dan kronik, komplikasi paru fibrosis kistik, perawatan trakeostomi, dan atelektasis akibat sumbatan mukus.

**Efek samping** (label Acetadote; label asetilsistein larutan)

- IV: tersering ruam, urtikaria, dan gatal; frekuensi 0,2–21%, terutama saat dosis muatan. Kemerahan kulit dapat muncul 30–60 menit setelah infus dimulai.
- Inhalasi: stomatitis, mual, muntah, demam, rinore, mengantuk, kulit lembap, dada terasa sesak, dan bronkokonstriksi.

**Peringatan** (label Acetadote; label asetilsistein larutan)

- Reaksi hipersensitivitas akut serius, termasuk anafilaksis fatal, hipotensi, mengi, dan sesak, biasanya segera setelah infus dimulai; pasien asma dipantau ketat.
- Kelebihan cairan akibat pemberian IV dapat menyebabkan hiponatremia, kejang, dan kematian.
- Pada inhalasi, pasien asma diawasi ketat; hentikan bila bronkospasme berlanjut.
- Kontraindikasi: hipersensitivitas terhadap asetilsistein.
- Keamanan dan efektivitas Acetadote pada anak belum ditetapkan melalui uji terkontrol; penggunaan pada anak 5 kg atau lebih berdasarkan praktik klinis.

**Farmakokinetik** (label Acetadote)

- Setelah dosis IV tunggal, kadar total asetilsistein plasma turun secara poli-eksponensial dengan waktu paruh terminal rata-rata 5,6 jam.
- Klirens rata-rata 0,11 L/jam/kg; klirens ginjal sekitar 30% dari klirens total.

**Farmakodinamik** (label Acetadote; label asetilsistein larutan)

- Melindungi hati kemungkinan dengan mempertahankan atau memulihkan kadar glutation, atau sebagai substrat alternatif untuk konjugasi dan detoksifikasi metabolit reaktif parasetamol.
- Efek mukolitik berasal dari gugus sulfhidril yang kemungkinan membuka ikatan disulfida pada mukus sehingga viskositasnya menurun.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. ACETADOTE (acetylcysteine) injection (Cumberland Pharmaceuticals), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=472f158a-5ab9-4308-8e49-1116e6ea3d39
4. Acetylcysteine Solution, USP (Hospira), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=5558a5f5-e821-473b-7d8a-5d33d09f0586

---

### 3.78 Tiamin (vitamin B1)

**Kalkulator** (IDAI hlm. 71)

| Sediaan/rute | Dosis |
|---|---|
| Oral | 10–15 mg/hari, satu kali sehari |
| Ampul 50 mg/ml, IV, usia 0–3 tahun | 150 mg/hari, intravena, dibagi 3 dosis |
| Ampul 50 mg/ml, IV, usia >3 tahun | 300 mg/hari, intravena, dibagi 3 dosis |

**Sediaan** (FORNAS 2025 hlm. 215)

| Sediaan | Peresepan maksimal |
|---|---|
| Tablet 50 mg | 30 tab/bulan |

**Aturan penggunaan**

- Sesuai tabel IDAI.
- Lakukan uji kulit pada pasien yang dicurigai alergi obat atau pernah bereaksi terhadap tiamin; yang positif tidak boleh menerima tiamin suntik (label tiamin injeksi).

**Manfaat obat** (label tiamin injeksi)

- Defisiensi tiamin atau beri-beri, kering (gejala saraf) maupun basah (gejala kardiovaskular).
- Bila diperlukan pemulihan cepat, misalnya ensefalopati Wernicke, beri-beri infantil dengan kolaps akut, penyakit kardiovaskular akibat defisiensi tiamin, atau neuritis kehamilan dengan muntah berat.
- Saat memberikan dekstrosa IV pada individu dengan status tiamin marginal, untuk mencegah gagal jantung.

**Efek samping** (label tiamin injeksi)

- Hipersensitivitas atau reaksi anafilaksis yang mengancam jiwa, terutama setelah suntikan berulang; kolaps dan kematian pernah dilaporkan.
- Rasa hangat, gatal, urtikaria, lemah, berkeringat, mual, gelisah, rasa tercekik, angioedema, sianosis, edema paru, perdarahan saluran cerna; nyeri tekan dan indurasi setelah IM.

**Peringatan** (label tiamin injeksi)

- Kontraindikasi: riwayat sensitivitas terhadap tiamin atau bahan produk.
- Reaksi hipersensitivitas/anafilaksis serius dapat terjadi; kematian pernah terjadi setelah pemberian IV atau IM.
- Mengandung aluminium yang dapat toksik pada pemberian parenteral lama bila fungsi ginjal terganggu; bayi prematur sangat berisiko.

**Farmakokinetik** (label tiamin injeksi)

- Penyerapan setelah IM cepat dan sempurna; tersebar ke semua jaringan dengan kadar tertinggi di hati, otak, ginjal, dan jantung.
- Metabolisme cepat; kelebihan dikeluarkan di urin. Deplesi tubuh dapat terjadi setelah sekitar 3 minggu tanpa asupan tiamin.

**Farmakodinamik** (label tiamin injeksi)

- Bergabung dengan ATP membentuk tiamin pirofosfat (kokarboksilase), koenzim dalam metabolisme karbohidrat untuk dekarboksilasi asam piruvat dan asam alfa-keto.
- Kebutuhan tiamin meningkat bila kandungan karbohidrat diet bertambah.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Thiamine Hydrochloride Injection, USP (Meitheal Pharmaceuticals), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=3bfe8ac7-9294-4980-9635-90f8e6f6dd8e

---

### 3.79 Deferasiroks

**Kalkulator berat badan**

| Keadaan | Dosis | Sumber |
|---|---|---|
| Oral | 20 mg/kg (10–40 mg/kg), 1x/hari | IDAI hlm. 45 |
| Batas FORNAS (tablet dispersible dan tablet salut selaput) | Maks 40 mg/kgBB/hari | FORNAS hlm. 116 |

Keterangan IDAI: monitor ferritin serum.

**Sediaan** (FORNAS 2025 hlm. 116; obat untuk kelebihan besi)

Restriksi FORNAS: a) untuk terapi kelasi besi; b) tidak diberikan untuk anak usia <2 tahun; c) terapi awal harus ditentukan oleh dokter yang memiliki kompetensi di bidang ilmu hematologi onkologi anak atau hematologi onkologi medik dewasa.

| Sediaan | Peresepan maksimal |
|---|---|
| Tablet dispersible 250 mg | Maks 40 mg/kgBB/hari |
| Tablet dispersible 500 mg | Maks 40 mg/kgBB/hari |
| Tablet salut selaput 180 mg | Maks 40 mg/kgBB/hari |
| Tablet salut selaput 360 mg | Maks 40 mg/kgBB/hari |

**Aturan penggunaan**

- Diberikan 1 kali sehari; monitor ferritin serum (IDAI).
- Tablet dispersible diminum saat perut kosong, sedikitnya 30 menit sebelum makan, sebaiknya pada jam yang sama setiap hari; tablet didispersikan sempurna dalam air, jus jeruk, atau jus apel (label Exjade).

**Manfaat obat** (label Exjade)

- Kelebihan besi kronik akibat transfusi darah (hemosiderosis transfusional) pada pasien usia 2 tahun ke atas.
- Kelebihan besi kronik pada sindrom talasemia yang tidak bergantung transfusi pada pasien usia 10 tahun ke atas (dengan kriteria kadar besi hati dan ferritin tertentu).

**Efek samping** (label Exjade)

- Efek samping yang paling sering menyebabkan penghentian obat: kenaikan kreatinin serum, diare, mual, ruam, muntah.
- Iritasi, ulserasi, dan perdarahan saluran cerna atas (termasuk pada anak dan remaja); ruam; gangguan pendengaran dan penglihatan (kurang dari 1%).

**Peringatan** (label Exjade)

- Peringatan berbingkai: dapat menyebabkan gagal ginjal akut, gagal hati, dan perdarahan saluran cerna, termasuk yang fatal. Periksa fungsi ginjal sebelum memulai dan sedikitnya setiap bulan.
- Kontraindikasi: eGFR <40 mL/menit/1,73 m²; status performa buruk; sindrom mielodisplastik risiko tinggi; keganasan lanjut; trombosit <50 x 10⁹/L; hipersensitivitas terhadap deferasiroks.
- Pada anak, efek samping serius dan fatal sering berkaitan dengan deplesi volume atau dosis 20–40 mg/kg/hari yang dilanjutkan saat beban besi mendekati normal. Hentikan sementara saat deplesi volume.
- Kelasi berlebihan: ukur ferritin serum setiap bulan; pada anak, efek samping ginjal lebih sering bila dosis >25 mg/kg/hari saat ferritin <1.000 mcg/L.
- Supresi sumsum tulang; hipersensitivitas berat; reaksi kulit berat (SJS, TEN, DRESS). Lakukan pemeriksaan pendengaran dan mata sebelum terapi dan setiap 12 bulan.

**Farmakokinetik** (label Exjade)

- Kadar puncak plasma 1,5–4 jam setelah pemberian oral; bioavailabilitas absolut tablet untuk suspensi 70%; bioavailabilitas meningkat bervariasi bila diminum bersama makanan.
- Sekitar 99% terikat protein, hampir seluruhnya albumin.
- Dimetabolisme terutama melalui glukuronidasi (UGT1A1, sebagian UGT1A3); 84% dosis dikeluarkan di feses dan 8% di urin. Waktu paruh eliminasi 8–16 jam.

**Farmakodinamik** (label Exjade)

- Pengkelat oral yang selektif untuk besi (Fe³⁺); ligan tridentat yang mengikat besi dengan afinitas tinggi dalam rasio 2:1.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. EXJADE (deferasirox) tablets for oral suspension (Novartis), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=3495a70c-870c-4968-940e-8baea152cf85

---

### 3.80 Kalsitriol

**Kalkulator berat badan** (IDAI hlm. 57)

| Rute | Dosis |
|---|---|
| Oral, IV | 0,02 mcg/kg (maks 0,25 mcg/kg) per hari, sesuaikan tiap 2–4 mgg berdasarkan hasil Ca, P, PTH, alkalin fosfatase |

**Sediaan** (FORNAS 2025 hlm. 214)

Restriksi FORNAS: hanya untuk penyakit ginjal kronis *grade* 5 atau pasien hipoparatiroid, pemeriksaan kadar kalsium ion 1,1–2,5 mmol.

| Sediaan | Peresepan maksimal |
|---|---|
| Kapsul lunak 0,25 mcg | 90 kaps/bulan |
| Kapsul lunak 0,5 mcg | 90 kaps/bulan |

**Aturan penggunaan**

- Dosis disesuaikan tiap 2–4 minggu berdasarkan hasil Ca, P, PTH, dan alkalin fosfatase (IDAI).
- Selama terapi, vitamin D dosis farmakologis dan turunannya tidak diberikan untuk mencegah efek aditif dan hiperkalsemia (label kalsitriol).

**Manfaat obat** (label kalsitriol)

- Hiperparatiroidisme sekunder dan penyakit tulang metabolik pada gagal ginjal kronik sedang–berat yang belum dialisis.
- Hipokalsemia dan penyakit tulang metabolik pada pasien dialisis kronik.
- Hipokalsemia pada hipoparatiroidisme pascabedah, idiopatik, dan pseudohipoparatiroidisme.

**Efek samping** (label kalsitriol)

- Umumnya serupa dengan kelebihan vitamin D, yaitu sindrom hiperkalsemia.
- Gejala awal: lemah, sakit kepala, mengantuk, mual, muntah, mulut kering, konstipasi, nyeri otot dan tulang, rasa logam, anoreksia, nyeri perut.
- Gejala lanjut antara lain poliuria, polidipsia, anoreksia, penurunan berat badan, nokturia.

**Peringatan** (label kalsitriol)

- Kontraindikasi: hiperkalsemia atau tanda toksisitas vitamin D; hipersensitivitas terhadap kalsitriol atau obat segolongan.
- Kelebihan dosis vitamin D berbahaya; hiperkalsemia kronik dapat menyebabkan kalsifikasi pembuluh darah, nefrokalsinosis, dan kalsifikasi jaringan lunak. Hasil kali Ca x P tidak boleh melebihi 70 mg²/dL².
- Kalsitriol adalah metabolit vitamin D yang paling poten; pemberian melebihi kebutuhan dapat menyebabkan hiperkalsemia, hiperkalsiuria, dan hiperfosfatemia.
- Keamanan dan efektivitas pada anak yang menjalani dialisis belum ditetapkan.

**Farmakokinetik** (label kalsitriol)

- Diserap cepat dari usus; kadar puncak serum 3–6 jam setelah dosis oral; kadar tunak tercapai dalam 7 hari pada pemberian berulang.
- Sekitar 99,9% terikat dalam darah (protein pengikat vitamin D); dapat masuk ke sirkulasi janin dan ASI.
- Waktu paruh serum sekitar 5–8 jam setelah dosis oral tunggal pada orang sehat.

**Farmakodinamik** (label kalsitriol)

- Bentuk aktif vitamin D3; tempat kerja utama di usus dan tulang, dan kemungkinan juga di ginjal dan kelenjar paratiroid.
- Bentuk vitamin D3 yang paling aktif dalam merangsang transpor kalsium usus.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Calcitriol Capsules (Hikma Pharmaceuticals USA), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=cdcaffc6-e14e-4607-b77b-fc78a8382f60

---

### 3.81 Metilfenidat

**Kalkulator** (IDAI hlm. 62)

| Usia/sediaan | Dosis |
|---|---|
| <12 thn | 5 mg, pagi dan siang hari serta pada jam 4 sore; tingkatkan per minggu jika perlu menjadi maks 0,4 mg/kg/dosis |
| >12 thn | 10 mg, pagi dan siang hari serta pada jam 4 sore; tingkatkan per minggu jika perlu menjadi maks 0,4 mg/kg/dosis |
| Kerja panjang | 10–60 mg, pagi hari |

**Sediaan** (FORNAS 2025 hlm. 185; obat untuk ADHD)

| Sediaan | Peresepan maksimal |
|---|---|
| Tablet 10 mg | 90 tab/bulan |
| Tablet lepas lambat 18 mg | 30 tab/bulan |
| Tablet lepas lambat 36 mg | 30 tab/bulan |

**Aturan penggunaan**

- Sesuai tabel IDAI.
- Makanan tidak berpengaruh bermakna pada penyerapan (label Ritalin).
- Pantau pertumbuhan (berat dan tinggi badan) selama terapi (label Ritalin).

**Manfaat obat** (label Ritalin)

- Gangguan pemusatan perhatian dan hiperaktivitas (ADHD) pada anak usia 6 tahun ke atas dan dewasa.
- Narkolepsi.

**Efek samping** (label Ritalin)

- Metabolisme: nafsu makan menurun, kenaikan berat badan berkurang, dan hambatan pertumbuhan pada penggunaan lama pada anak.
- Psikiatri: insomnia, cemas, gelisah, agitasi, psikosis, suasana hati depresif.
- Saraf: sakit kepala, pusing, tremor, diskinesia, mengantuk, kejang.
- Jantung: takikardia, palpitasi, peningkatan tekanan darah, aritmia.
- Saluran cerna: mulut kering, mual, muntah, nyeri perut, dispepsia.
- Lainnya: leukopenia, trombositopenia, anemia; reaksi hipersensitivitas; hiperhidrosis, rambut rontok; fenomena Raynaud.

**Peringatan** (label Ritalin)

- Peringatan berbingkai: potensi tinggi penyalahgunaan dan adiksi; nilai risiko sebelum dan selama terapi.
- Kontraindikasi: hipersensitivitas terhadap metilfenidat; pemberian bersama atau dalam 14 hari setelah penghambat MAO.
- Kematian mendadak pernah dilaporkan pada pasien dengan kelainan struktural jantung atau penyakit jantung serius.
- Peningkatan tekanan darah dan denyut jantung; reaksi psikiatri (perburukan psikosis, episode manik); priapismus; vaskulopati perifer termasuk fenomena Raynaud; glaukoma sudut tertutup dan peningkatan tekanan intraokular; tik motorik dan verbal.
- Hambatan pertumbuhan jangka panjang pada anak: rata-rata sekitar 2 cm lebih pendek dan 2,7 kg lebih ringan dalam 3 tahun pada penggunaan terus-menerus.
- Keamanan dan efektivitas pada anak di bawah 6 tahun belum ditetapkan.

**Farmakokinetik** (label Ritalin)

- Bioavailabilitas absolut 22% (enansiomer d) dan 5% (enansiomer l); kadar puncak sekitar 2 jam setelah tablet 10 mg (pada anak 1,9 jam).
- Ikatan protein plasma rendah (10–33%).
- Dimetabolisme terutama melalui de-esterifikasi menjadi asam ritalinat yang hampir tidak aktif; 78–97% dosis keluar di urin sebagai metabolit dalam 48–96 jam.

**Farmakodinamik** (label Ritalin)

- Stimulan sistem saraf pusat; mekanisme terapeutik pada ADHD dan narkolepsi belum diketahui.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. RITALIN (methylphenidate hydrochloride) tablets (Sandoz), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d6fb2750-cdab-4749-ba0d-7534840a5892

---

### 3.82 Irbesartan

**Kalkulator berat badan** (IDAI hlm. 57)

| Rute | Dosis |
|---|---|
| Oral | 3 mg/kg/hari, ditingkakan hingga 6 mg/kg/hari bila perlu |

**Sediaan** (FORNAS 2025 hlm. 153)

Restriksi FORNAS: untuk pasien yang telah mendapat ACE inhibitor sebelumnya sekurang-kurangnya 1 bulan dan mengalami intoleransi terhadap ACE inhibitor yang dibuktikan dengan melampirkan resep sebelumnya.

| Sediaan | Peresepan maksimal |
|---|---|
| Tablet 150 mg | 30 tab/bulan |
| Tablet 300 mg | 30 tab/bulan |

**Aturan penggunaan**

- Sesuai tabel IDAI.
- Makanan tidak memengaruhi bioavailabilitas (label Avapro).

**Manfaat obat** (label Avapro)

- Hipertensi (dewasa).
- Nefropati diabetik pada pasien diabetes tipe 2 dengan hipertensi.
- Pada studi anak usia 6–16 tahun dengan dosis hingga 4,5 mg/kg/hari, irbesartan tampak tidak menurunkan tekanan darah secara efektif; belum diteliti pada anak di bawah 6 tahun.

**Efek samping** (label Avapro)

- Pada uji terkontrol plasebo: diare (3%), dispepsia/nyeri ulu hati (2%), lelah (4%).
- Pada nefropati diabetik: pusing, pusing ortostatik, dan hipotensi ortostatik lebih sering daripada plasebo.

**Peringatan** (label Avapro)

- Peringatan berbingkai: toksisitas janin; hentikan segera bila hamil.
- Kontraindikasi: hipersensitivitas terhadap komponen produk; pemberian bersama aliskiren pada pasien diabetes.
- Hipotensi pada pasien dengan deplesi volume atau garam; gangguan fungsi ginjal termasuk gagal ginjal akut.

**Farmakokinetik** (label Avapro)

- Penyerapan oral cepat dan lengkap; bioavailabilitas absolut 60–80%; kadar puncak 1,5–2 jam.
- 90% terikat protein serum.
- Dimetabolisme melalui konjugasi glukuronida dan oksidasi; waktu paruh eliminasi terminal 11–15 jam; kadar tunak tercapai dalam 3 hari.

**Farmakodinamik** (label Avapro)

- Menghambat efek vasokonstriksi dan sekresi aldosteron dari angiotensin II dengan berikatan secara selektif pada reseptor AT1.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. AVAPRO (irbesartan) tablets (Sanofi-Aventis U.S.), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7885b2a8-be4e-48ab-8113-4e6ab791eb98

---

### 3.83 Hidroksiklorokuin

**Kalkulator berat badan** (IDAI hlm. 54)

| Keadaan | Dosis |
|---|---|
| Malaria | 10 mg/kg/hari selama 3 hari |
| Profilaksis | 5 mg/kg, 1x/minggu, oral |
| Artritis, SLE | 3–6,5 mg/kg/hari, oral |

**Sediaan** (FORNAS 2025 hlm. 103–104)

Restriksi FORNAS: a) untuk kasus SLE (*Systemic Lupus Erythematosus*) atau b) untuk kasus RA (*Rheumatoid Arthritis*).

| Sediaan | Peresepan maksimal |
|---|---|
| Tablet 200 mg | 60 tab/bulan |

**Aturan penggunaan**

- Sesuai tabel IDAI.
- Pemeriksaan mata awal dianjurkan pada tahun pertama terapi (label Plaquenil).

**Manfaat obat** (label Plaquenil)

- Pada dewasa dan anak: pengobatan malaria tanpa komplikasi akibat *P. falciparum*, *P. malariae*, *P. vivax*, dan *P. ovale*, serta profilaksis malaria di daerah tanpa resistansi klorokuin.
- Pada dewasa: artritis reumatoid, lupus eritematosus sistemik, dan lupus eritematosus diskoid kronik.

**Efek samping** (label Plaquenil)

- Saluran cerna: mual, muntah, diare, nyeri perut; lelah.
- Hati: kelainan uji fungsi hati, gagal hati fulminan.
- Alergi: urtikaria, angioedema, bronkospasme.
- Kardiomiopati, toksisitas retina, reaksi kulit berat, gangguan darah, miopati, reaksi neuropsikiatri, hipoglikemia (lihat Peringatan).

**Peringatan** (label Plaquenil)

- Kontraindikasi: hipersensitivitas terhadap senyawa 4-aminokuinolin.
- Kardiomiopati dan aritmia ventrikel yang fatal; dapat memperpanjang interval QT.
- Kerusakan retina yang menetap, berkaitan dengan dosis kumulatif dan lama terapi; risiko meningkat pada dosis harian ≥5 mg/kg berat badan aktual dan penggunaan lebih dari 5 tahun.
- Reaksi kulit berat (SJS, TEN, DRESS, AGEP); perburukan psoriasis dan porfiria; supresi sumsum tulang; hemolisis pada defisiensi G6PD; miopati atau neuropati; reaksi neuropsikiatri termasuk perilaku bunuh diri; hipoglikemia berat; toksisitas ginjal.
- Tablet salut selaput tidak dapat dihancurkan atau dibagi sehingga tidak dapat langsung diberikan pada anak dengan berat badan <31 kg.

**Farmakokinetik** (label Plaquenil)

- Bioavailabilitas oral absolut rata-rata 79% saat puasa; kadar puncak darah sekitar 3,3 jam setelah dosis 200 mg.
- Waktu paruh absorpsi 3–4 jam dan waktu paruh terminal 40–50 hari dalam darah utuh.
- Diekskresikan terutama melalui ginjal; risiko toksisitas dapat lebih besar pada gangguan fungsi ginjal.

**Farmakodinamik** (label Plaquenil)

- Antimalaria golongan 4-aminokuinolin dan antireumatik.
- Mekanisme efek antiinflamasi dan imunomodulator pada artritis reumatoid dan lupus belum sepenuhnya diketahui.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. PLAQUENIL (hydroxychloroquine sulfate) tablets (Advanz Pharma), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=34496b43-05a2-45fb-a769-52b12e099341

---

### 3.84 Asam ursodeoksikolat

**Kalkulator berat badan** (IDAI hlm. 37)

| Rute | Dosis |
|---|---|
| Oral | 5–10 mg/kg, 12 jam |

**Sediaan** (FORNAS 2025 hlm. 194)

| Sediaan | Peresepan maksimal |
|---|---|
| Kapsul 250 mg | 90 kaps/bulan |

**Aturan penggunaan**

- Sesuai tabel IDAI.
- Obat pengikat asam empedu (kolestiramin, kolestipol) dan antasida berbasis aluminium dapat mengurangi penyerapan ursodiol (label ursodiol).

**Manfaat obat** (label ursodiol)

- Batu kandung empedu radiolusen dan tidak berkalsifikasi berukuran <20 mm pada pasien yang tidak dapat atau tidak mau menjalani kolesistektomi.
- Pencegahan pembentukan batu empedu pada pasien obesitas yang mengalami penurunan berat badan cepat.

**Efek samping** (label ursodiol)

- Pada uji klinis disolusi batu empedu, jenis dan frekuensi efek samping serupa dengan plasebo; yang dilaporkan antara lain nyeri perut, diare, dispepsia, mual, muntah, konstipasi, flatulens, dan artralgia.

**Peringatan** (label ursodiol)

- Kontraindikasi: alergi terhadap asam empedu; tidak dapat melarutkan batu kolesterol berkalsifikasi, batu radiopak, atau batu pigmen empedu radiolusen; pasien yang memerlukan kolesistektomi (misalnya kolesistitis akut, kolangitis, obstruksi bilier, pankreatitis akibat batu empedu).
- Enterolit (bezoar) yang menyebabkan obstruksi pernah dilaporkan pada pasien dengan stenosis atau stasis usus.
- Keamanan dan efektivitas pada anak belum ditetapkan.

**Farmakokinetik** (label ursodiol)

- Sekitar 90% dosis diserap di usus halus; mengalami ekstraksi lintas pertama yang besar di hati, dikonjugasi dengan glisin atau taurin, lalu disekresikan ke empedu.
- Hanya sedikit yang masuk sirkulasi sistemik dan sangat sedikit yang dikeluarkan di urin; sebagian kecil didegradasi bakteri pada setiap siklus enterohepatik.

**Farmakodinamik** (label ursodiol)

- Menekan sintesis dan sekresi kolesterol oleh hati serta menghambat penyerapan kolesterol di usus.
- Kadar asam ursodeoksikolat empedu mencapai kondisi tunak dalam sekitar 3 minggu pada pemberian berulang.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Ursodiol Capsules, USP (Actavis Pharma), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a061bb07-a85d-4b08-877f-ce02156f0de7

---

### 3.85 Asam mefenamat

**Kalkulator berat badan** (IDAI hlm. 37)

| Keadaan | Dosis |
|---|---|
| Penghilang nyeri pada keganasan (skala 3–7) | 10 mg/kg, per oral |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 85, tertulis "Mefenamic acid")

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 10 mg/kg/dosis q8 jam po | D | 100% | 100% | 100% | Tak ada | Tak ada |

**Sediaan** (FORNAS 2025 hlm. 12; analgesik non narkotik)

| Sediaan | Peresepan maksimal |
|---|---|
| Kapsul 250 mg | 30 kaps/bulan |
| Tablet 500 mg | 30 tab/bulan |

**Aturan penggunaan**

- Sesuai tabel IDAI.

**Manfaat obat** (label asam mefenamat)

- Nyeri ringan sampai sedang pada dewasa dan anak usia 14 tahun ke atas, bila terapi tidak lebih dari 7 hari.
- Dismenore primer.
- Keamanan dan efektivitas untuk nyeri ringan–sedang pada anak di bawah 14 tahun belum ditetapkan.

**Efek samping** (label asam mefenamat)

- Sekitar 1–10%: nyeri perut, konstipasi, diare, dispepsia, flatulens, perdarahan/perforasi, nyeri ulu hati, mual, tukak lambung/duodenum, muntah; tinitus; gangguan fungsi ginjal; kenaikan enzim hati; gatal, ruam; anemia, edema; pusing, sakit kepala; pemanjangan waktu perdarahan.

**Peringatan** (label asam mefenamat)

- Peringatan berbingkai: risiko kejadian trombotik kardiovaskular serius (infark miokard, stroke) dan perdarahan, ulserasi, serta perforasi saluran cerna yang dapat fatal.
- Kontraindikasi: hipersensitivitas terhadap asam mefenamat; riwayat asma, urtikaria, atau reaksi alergi setelah aspirin atau OAINS lain; pada operasi CABG.
- Hepatotoksisitas: kenaikan ALT/AST tiga kali atau lebih batas atas normal pada sekitar 1% pasien yang menerima OAINS dalam uji klinis.

**Farmakokinetik** (label asam mefenamat)

- Diserap cepat setelah pemberian oral; kadar puncak plasma 2–4 jam.
- Lebih dari 90% terikat albumin; volume distribusi sekitar 1,06 L/kg.
- Dimetabolisme oleh CYP2C9 menjadi metabolit 3-hidroksimetil, lalu dapat dioksidasi lebih lanjut dan mengalami glukuronidasi.

**Farmakodinamik** (label asam mefenamat)

- OAINS dengan sifat analgesik, antiinflamasi, dan antipiretik; menghambat siklooksigenase (COX-1 dan COX-2) dan sintesis prostaglandin.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Mefenamic Acid Capsules (Lupin Pharmaceuticals), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d15733a9-d5fd-4d5f-86ce-e7ed8c706c7f

---

### 3.86 Azatioprin

**Kalkulator berat badan** (IDAI hlm. 40)

| Rute | Dosis |
|---|---|
| Oral | 1–1,5 mg/kg, per oral, 24 jam; bila toleransi baik dapat ditingkatkan 2–2,5 mg/kg, per oral, 24 jam (maks 150 mg/dosis) |

**Sediaan** (FORNAS 2025 hlm. 102; imunosupresan)

| Sediaan | Peresepan maksimal |
|---|---|
| Tablet 50 mg | 120 tab/bulan |

**Aturan penggunaan**

- Sesuai tabel IDAI.
- Periksa darah lengkap termasuk trombosit setiap minggu pada bulan pertama, dua kali sebulan pada bulan kedua dan ketiga, kemudian setiap bulan atau lebih sering bila dosis atau terapi lain berubah (label Imuran).

**Manfaat obat** (label Imuran)

- Tambahan untuk mencegah penolakan pada transplantasi ginjal.
- Artritis reumatoid aktif.

**Efek samping** (label Imuran)

- Efek toksik utama bersifat hematologik dan gastrointestinal; risiko infeksi sekunder dan keganasan juga bermakna.
- Leukopenia dan/atau trombositopenia yang bergantung dosis dan dapat muncul lambat.
- Mual dan muntah, kadang disertai diare, ruam, demam, malaise, mialgia, kenaikan enzim hati, dan hipotensi; biasanya dalam beberapa minggu pertama dan pulih bila obat dihentikan. Pankreatitis hipersensitivitas jarang.

**Peringatan** (label Imuran)

- Peringatan berbingkai: imunosupresi kronik meningkatkan risiko keganasan, termasuk limfoma pascatransplantasi dan limfoma sel T hepatosplenik pada penyakit radang usus.
- Kontraindikasi: hipersensitivitas terhadap azatioprin; artritis reumatoid pada wanita hamil; artritis reumatoid yang sebelumnya diobati agen alkilasi.
- Sitopenia berat dan supresi sumsum tulang; risiko mielotoksisitas berat pada defisiensi TPMT atau NUDT15.
- Infeksi serius termasuk infeksi oportunistik.
- Keamanan dan efektivitas pada anak belum ditetapkan.

**Farmakokinetik** (label Imuran)

- Diserap baik setelah pemberian oral; dimetabolisme menjadi 6-merkaptopurin.
- Azatioprin dan merkaptopurin terikat protein serum sekitar 30% dan sebagian dapat didialisis; keduanya cepat dieliminasi dari darah dan tidak terdeteksi di urin setelah 8 jam.
- Efek klinis berkorelasi dengan kadar nukleotida tiopurin di jaringan, bukan kadar plasma.

**Farmakodinamik** (label Imuran)

- Antimetabolit purin; sitotoksisitas sebagian berasal dari penggabungan nukleotida 6-tioguanin ke dalam DNA.
- Mekanisme pada penyakit autoimun belum diketahui.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. IMURAN (azathioprine) tablets (Sebela Pharmaceuticals), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=606101a0-6244-7eff-e053-2a91aa0acadd

---

### 3.87 Dapson

**Kalkulator berat badan** (IDAI hlm. 45)

| Keadaan | Dosis |
|---|---|
| Profilaksis *P. jiroveci* | 2 mg/kg, per oral, 24 jam atau 4 mg/kg/minggu, per oral |

**Sediaan** (FORNAS 2025 hlm. 36; antilepra)

| Sediaan | Peresepan maksimal |
|---|---|
| Tablet 100 mg | – |

**Aturan penggunaan**

- Sesuai tabel IDAI.
- Periksa darah lengkap secara berkala: bila memungkinkan setiap minggu pada bulan pertama, setiap bulan selama 6 bulan, lalu setiap 6 bulan (label dapson).

**Manfaat obat** (label dapson)

- Dermatitis herpetiformis.
- Semua bentuk kusta, kecuali kasus resistan dapson yang terbukti.

**Efek samping** (label dapson)

- Hemolisis yang bergantung dosis adalah efek samping tersering, dengan atau tanpa defisiensi G6PD; hampir semua pasien mengalami penurunan hemoglobin 1–2 g, kenaikan retikulosit, dan kenaikan methemoglobin.
- Neuropati perifer (terutama motorik).
- Lainnya: mual, muntah, nyeri perut, pankreatitis, vertigo, penglihatan kabur, tinitus, insomnia, demam, sakit kepala, psikosis, fototoksisitas, eosinofilia paru, takikardia, sindrom nefrotik, lupus akibat obat, sindrom mirip mononukleosis infeksiosa.

**Peringatan** (label dapson)

- Kontraindikasi: hipersensitivitas terhadap dapson atau turunannya.
- Kematian akibat agranulositosis, anemia aplastik, dan diskrasia darah lain pernah dilaporkan; pasien perlu segera melapor bila nyeri tenggorok, demam, pucat, purpura, atau ikterus.
- Hemolisis lebih berat pada defisiensi G6PD, defisiensi methemoglobin reduktase, atau hemoglobin M.
- Hepatitis toksik dan ikterus kolestatik pernah dilaporkan pada awal terapi.
- Anak diobati dengan jadwal yang sama seperti dewasa, dengan dosis yang lebih kecil.

**Farmakokinetik** (label dapson)

- Diserap cepat dan hampir sempurna setelah pemberian oral; kadar puncak 4–8 jam.
- Sekitar 85% dosis harian ditemukan di urin, terutama sebagai metabolit larut air; ekskresi lambat.
- Waktu paruh plasma 10–50 jam (rata-rata 28 jam).

**Farmakodinamik** (label dapson)

- Bersifat bakterisidal dan bakteriostatik terhadap *Mycobacterium leprae* (pada model tikus).
- Mekanisme pada dermatitis herpetiformis belum diketahui.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Dapsone Tablets, USP (Sun Pharmaceutical Industries), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=cb312185-b9f1-4fa4-9481-bcf5d9bb3edf

---

### 3.88 Kolkisin

**Kalkulator berat badan** (IDAI hlm. 59)

| Keadaan | Dosis |
|---|---|
| Gout akut | 0,02 mg/kg, per oral, 2 jam |
| Penggunaan kronik | 0,01–0,04 mg/kg/hari, per oral |
| Familial mediteranean fever | 0,5–2 mg/hari, per oral |

**Sediaan** (FORNAS 2025 hlm. 15)

| Sediaan | Peresepan maksimal |
|---|---|
| Tablet 500 mcg | 30 tab/bulan |

**Aturan penggunaan**

- Sesuai tabel IDAI.
- Simpan jauh dari jangkauan anak; overdosis fatal pernah dilaporkan pada anak (label kolkisin).

**Manfaat obat** (label kolkisin)

- Profilaksis dan pengobatan serangan gout akut (dewasa).
- Familial Mediterranean fever (FMF) pada dewasa dan anak usia 4 tahun ke atas. Keamanan dan efektivitas pada anak dengan gout belum ditetapkan.

**Efek samping** (label kolkisin)

- Gangguan saluran cerna paling sering; pada FMF muncul dalam 24 jam pada hingga 20% pasien dengan dosis terapeutik. Diare adalah efek samping saluran cerna tersering.
- Mielosupresi, leukopenia, granulositopenia, trombositopenia, pansitopenia, dan anemia aplastik.
- Toksisitas neuromuskular dan rabdomiolisis pada penggunaan kronik.

**Peringatan** (label kolkisin)

- Kontraindikasi: pada gangguan ginjal atau hati, kolkisin tidak boleh diberikan bersama penghambat P-gp atau penghambat kuat CYP3A4 (termasuk semua penghambat protease kecuali fosamprenavir); toksisitas fatal pernah dilaporkan.
- Overdosis fatal, baik tidak disengaja maupun disengaja, pernah dilaporkan pada dewasa dan anak.
- Interaksi obat yang mengancam jiwa dengan penghambat P-gp dan CYP3A4 kuat; risiko miopati meningkat bila bersama statin, fibrat, atau siklosporin.
- Pada anak dengan FMF yang diobati jangka panjang, tampaknya tidak ada efek buruk pada pertumbuhan.

**Farmakokinetik** (label kolkisin)

- Diserap setelah pemberian oral; kadar puncak 1–2 jam setelah dosis tunggal saat puasa.
- Volume distribusi 5–8 L/kg; ikatan protein serum rendah (sekitar 39%); melintasi plasenta dan masuk ke ASI.
- Substrat P-gp dan CYP3A4; diekskresikan bermakna di urin.

**Farmakodinamik** (label kolkisin)

- Diduga mengganggu perakitan kompleks inflamasom di neutrofil dan monosit yang mengaktifkan interleukin-1β.
- Menghambat polimerisasi β-tubulin menjadi mikrotubulus sehingga mencegah aktivasi, degranulasi, dan migrasi neutrofil.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Colchicine Tablets, USP (Par Health), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=72984aa2-6df9-4460-9926-399ffed30e36

---

### 3.89 Zidovudin

**Kalkulator** (IDAI hlm. 72–73)

| Keadaan | Dosis |
|---|---|
| Aterm | 1,5 mg/kg, 6 jam IV, 2 mg/kg 6 jam oral |
| Anak | 180 mg/m2, 12 jam, oral |

**Sediaan** (FORNAS 2025 hlm. 57–58)

Restriksi FORNAS: dapat diberikan oleh FPKTP yang memiliki kemampuan pengobatan antiretroviral dengan persyaratan memiliki SK Penunjukan sebagai unit pelayanan yang berhak memberikan obat ARV dari Dinas Kesehatan setempat.

| Sediaan | Peresepan maksimal/restriksi |
|---|---|
| Kapsul 100 mg | – |
| Sirup 50 mg/5 mL | Maks 6 minggu. Dapat digunakan untuk terapi profilaksis pada bayi baru lahir dari ibu ODHIV selama 6 minggu |

**Aturan penggunaan**

- Sesuai tabel IDAI.
- Diberikan dalam kombinasi dengan antiretroviral lain untuk pengobatan HIV-1 (label Retrovir).

**Manfaat obat** (label Retrovir)

- Pengobatan infeksi HIV-1, dikombinasikan dengan antiretroviral lain.
- Pencegahan penularan HIV-1 dari ibu ke janin (terapi ibu antepartum dan intrapartum serta terapi bayi pascapersalinan).

**Efek samping** (label Retrovir)

- Pada dewasa: sakit kepala, malaise, mual, anoreksia, muntah, astenia.
- Pada neonatus yang terpapar perinatal: anemia pada 22% (plasebo 12%); neutropenia dengan frekuensi serupa plasebo.
- Efek samping pada dewasa juga dapat terjadi pada anak.

**Peringatan** (label Retrovir)

- Peringatan berbingkai: toksisitas hematologi (neutropenia dan anemia berat), miopati simtomatik pada penggunaan lama, serta asidosis laktat dan hepatomegali berat dengan steatosis termasuk yang fatal.
- Kontraindikasi: riwayat reaksi hipersensitivitas yang mengancam jiwa (misalnya anafilaksis, sindrom Stevens-Johnson) terhadap komponen sediaan.
- Hati-hati pada gangguan sumsum tulang (granulosit <1.000/mm³ atau hemoglobin <9,5 g/dL).
- Sindrom rekonstitusi imun; lipoatrofi yang berkaitan dengan paparan kumulatif.

**Farmakokinetik** (label Retrovir; data dewasa)

- Diserap cepat setelah pemberian oral; kadar puncak 0,5–1,5 jam; bioavailabilitas oral sekitar 64%.
- Volume distribusi sekitar 1,6 L/kg; ikatan protein plasma rendah (<38%).
- Dieliminasi terutama melalui metabolisme hati menjadi GZDV; di urin ditemukan 14% sebagai zidovudin dan 74% sebagai GZDV setelah pemberian oral. Waktu paruh eliminasi 0,5–3 jam.

**Farmakodinamik** (label Retrovir)

- Analog nukleosida sintetis; di dalam sel difosforilasi menjadi zidovudin trifosfat yang menghambat reverse transcriptase HIV-1 melalui terminasi rantai DNA.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. RETROVIR (zidovudine) capsules, oral solution, and injection (ViiV Healthcare), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=6df09f15-b102-431c-adde-d7aeef6f5d84

---

### 3.90 Lamivudin

**Kalkulator berat badan** (IDAI hlm. 61)

| Usia | Dosis |
|---|---|
| Neonatus <30 hari | 2 mg/kg, 12 jam, oral |
| Anak ≥30 hari | 4 mg/kg/dosis, 12 jam, maximum 150 mg/dosis, oral |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 85)

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 4 mg/kg/dosis q12 jam po (atau 3 mg/kg/dosis q24 jam) | D, I | 100% | 50% q24 jam | 25% q24 jam | Dosis sesudah dialisis | Tak ada data |

**Sediaan** (FORNAS 2025 hlm. 57)

Restriksi FORNAS: dapat diberikan oleh FPKTP yang memiliki kemampuan pengobatan antiretroviral dengan persyaratan memiliki SK Penunjukan sebagai unit pelayanan yang berhak memberikan obat ARV dari Dinas Kesehatan setempat.

| Sediaan | Peresepan maksimal |
|---|---|
| Tablet 150 mg | – |

**Aturan penggunaan**

- Sesuai tabel IDAI.
- Diberikan dalam kombinasi dengan antiretroviral lain (label Epivir).

**Manfaat obat** (label Epivir)

- Pengobatan infeksi HIV-1 dalam kombinasi dengan antiretroviral lain. Dosis produk ini untuk HIV-1, bukan untuk hepatitis B.
- Keamanan dan efektivitas pada anak telah ditetapkan untuk usia 3 bulan ke atas.

**Efek samping** (label Epivir)

- Tersering pada dewasa: sakit kepala, mual, malaise, lelah, gejala hidung, diare, batuk.
- Pankreatitis pada 0,3% dewasa dalam uji klinis.

**Peringatan** (label Epivir)

- Peringatan berbingkai: eksaserbasi akut berat hepatitis B setelah penghentian lamivudin pada pasien koinfeksi HIV-1 dan HBV; sediaan lamivudin untuk HIV berbeda kadarnya dengan sediaan untuk HBV.
- Kontraindikasi: riwayat reaksi hipersensitivitas terhadap lamivudin.
- Asidosis laktat dan hepatomegali berat dengan steatosis.
- Pada anak dengan riwayat paparan nukleosida, riwayat pankreatitis, atau faktor risiko lain, gunakan dengan hati-hati; hentikan segera bila ada tanda pankreatitis.
- Pada uji ARROW, anak yang menerima larutan oral bersama larutan antiretroviral lain memiliki angka supresi virus lebih rendah dan resistansi lebih sering; tablet bergaris lebih disukai untuk anak ≥14 kg.

**Farmakokinetik** (label Epivir)

- Bioavailabilitas absolut sekitar 86–87% pada dewasa; lebih rendah pada anak.
- Ikatan protein plasma kurang dari 36%.
- Sebagian besar dieliminasi dalam bentuk utuh di urin melalui sekresi kation organik aktif; waktu paruh eliminasi 5–7 jam.

**Farmakodinamik** (label Epivir)

- Di dalam sel difosforilasi menjadi lamivudin trifosfat yang menghambat reverse transcriptase HIV-1 melalui terminasi rantai DNA.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. EPIVIR (lamivudine) tablets and oral solution (ViiV Healthcare), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=89226149-47fa-4f7d-bb1f-1aa7034486b8

---

### 3.91 Nevirapin

**Kalkulator** (IDAI hlm. 65; dosis per luas permukaan tubuh)

| Usia | Dosis |
|---|---|
| <8 thn | 200 mg/m2/dosis, 2 kali/hari (maks 200 mg), oral, 1 kali/hari selama 2 minggu, kemudian 12 jam jika tidak ada ruam |
| >8 thn | 120–150 mg/m2/dosis, 2 kali/hari (maks 200 mg) selama 2 minggu, kemudian per 12 jam jika tidak ada ruam |

**Sediaan** (FORNAS 2025 hlm. 58–59; disediakan oleh Program Kemenkes)

Restriksi FORNAS: dapat diberikan oleh FPKTP yang memiliki kemampuan pengobatan antiretroviral dengan persyaratan memiliki SK Penunjukan sebagai unit pelayanan yang berhak memberikan obat ARV dari Dinas Kesehatan setempat.

| Sediaan | Restriksi |
|---|---|
| Tablet 200 mg | – |
| Sirup 10 mg/mL | a) Dapat digunakan untuk profilaksis pada bayi baru lahir yang diberikan ASI dari ibu ODHIV yang menjalani terapi ARV kombinasi, selama 6 minggu. b) Diberikan bersama dengan Zidovudin. |

**Aturan penggunaan**

- Dimulai dengan dosis sekali sehari selama 2 minggu, lalu tiap 12 jam bila tidak ada ruam (IDAI).
- Periode awal 14 hari dengan dosis sekali sehari terbukti menurunkan kejadian ruam dan harus diikuti; jangan menaikkan dosis selama masih ada ruam. Lama periode awal tidak boleh lebih dari 28 hari (label nevirapin).

**Manfaat obat** (label nevirapin)

- Pengobatan infeksi HIV-1 dalam kombinasi dengan antiretroviral lain pada dewasa dan anak usia 15 hari ke atas.

**Efek samping** (label nevirapin)

- Paling serius: hepatitis dan gagal hati, sindrom Stevens-Johnson, nekrolisis epidermal toksik, reaksi hipersensitivitas.
- Pada anak, efek samping serupa dengan dewasa, kecuali granulositopenia yang lebih sering pada anak yang menerima zidovudin bersama nevirapin.

**Peringatan** (label nevirapin)

- Peringatan berbingkai: hepatotoksisitas yang mengancam jiwa (termasuk fatal), terutama pada 18 minggu pertama, serta reaksi kulit berat dan fatal, terutama pada 6 minggu pertama.
- Kontraindikasi: gangguan hati sedang atau berat (Child-Pugh B atau C); penggunaan sebagai profilaksis pascapajanan.
- Tidak boleh digunakan sebagai obat tunggal; resistansi cepat muncul pada monoterapi.
- Interaksi obat (antara lain St. John's wort); sindrom rekonstitusi imun; redistribusi lemak.

**Farmakokinetik** (label nevirapin)

- Diserap baik (>90%); bioavailabilitas absolut sekitar 91–93%; kadar puncak sekitar 4 jam setelah dosis tunggal 200 mg; makanan dan antasida tidak mengubah penyerapan.
- Kadar di cairan serebrospinal sekitar 45% kadar plasma.
- Dimetabolisme luas oleh sitokrom P450 menjadi metabolit terhidroksilasi; metabolit terutama dikeluarkan lewat ginjal sebagai konjugat glukuronida. Autoinduksi menurunkan waktu paruh dari sekitar 45 jam (dosis tunggal) menjadi 25–30 jam pada dosis berulang.

**Farmakodinamik** (label nevirapin)

- Berikatan langsung dengan reverse transcriptase dan menghambat aktivitas DNA polimerase yang bergantung RNA dan DNA dengan mengganggu situs katalitik enzim.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Nevirapine Tablets USP (Aurobindo Pharma), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=5f6c3eed-2a5d-46ed-9a7c-59715f338a15

---

### 3.92 Efavirenz

**Kalkulator berdasarkan berat badan** (IDAI hlm. 49; oral, per hari)

| Berat badan | Dosis |
|---|---|
| 10–<15 kg | 200 mg |
| 15–<20 kg | 250 mg |
| 20–<25 kg | 300 mg |
| 25–<32 kg | 350 mg |
| 33–<40 kg | 400 mg |
| ≥40 kg | 600 mg |

**Sediaan** (FORNAS 2025 hlm. 58; disediakan oleh Program Kemenkes)

Restriksi FORNAS: dapat diberikan oleh FPKTP yang memiliki kemampuan pengobatan antiretroviral dengan persyaratan memiliki SK Penunjukan sebagai unit pelayanan yang berhak memberikan obat ARV dari Dinas Kesehatan setempat.

| Sediaan | Peresepan maksimal |
|---|---|
| Tablet/kapsul 200 mg | – |
| Tablet/kapsul 600 mg | – |

**Aturan penggunaan**

- Sesuai tabel IDAI.
- Dianjurkan diminum saat perut kosong, sebaiknya menjelang tidur; pemberian menjelang tidur dapat memperbaiki toleransi gejala saraf (label efavirenz).

**Manfaat obat** (label efavirenz)

- Pengobatan infeksi HIV-1 dalam kombinasi dengan antiretroviral lain pada dewasa dan anak usia sedikitnya 3 bulan dengan berat badan sedikitnya 3,5 kg.

**Efek samping** (label efavirenz)

- Tersering pada dewasa: ruam, pusing, mual, sakit kepala, lelah, insomnia, muntah.
- Gejala sistem saraf pusat pada 53% pasien dalam uji terkontrol; ruam baru pada 26% dewasa.
- Pada anak, ruam (termasuk ruam derajat 3–4) lebih sering daripada dewasa.

**Peringatan** (label efavirenz)

- Kontraindikasi: hipersensitivitas bermakna (misalnya sindrom Stevens-Johnson, eritema multiformis, erupsi kulit toksik) terhadap komponen produk; pemberian bersama elbasvir dan grazoprevir.
- Interaksi obat (penginduksi CYP3A dan CYP2B6); pemanjangan QTc; tidak boleh digunakan sebagai obat tunggal.
- Gejala psikiatri serius; gejala sistem saraf; kejang, terutama pada riwayat kejang; hepatotoksisitas; kenaikan kolesterol dan trigliserida.
- Toksisitas embrio-janin pada trimester pertama; sindrom rekonstitusi imun; redistribusi lemak.

**Farmakokinetik** (label efavirenz)

- Kadar puncak plasma dicapai dalam 5 jam setelah dosis oral tunggal.
- Sangat terikat protein plasma (sekitar 99%).
- Dimetabolisme terutama oleh sitokrom P450 (CYP3A dan CYP2B6) menjadi metabolit terhidroksilasi yang kemudian diglukuronidasi; menginduksi enzim metabolismenya sendiri. Waktu paruh terminal 40–55 jam pada dosis berulang (52–76 jam pada dosis tunggal).

**Farmakodinamik** (label efavirenz)

- Penghambat reverse transcriptase non-nukleosida (NNRTI) HIV-1; aktivitasnya terutama melalui hambatan nonkompetitif reverse transcriptase HIV-1.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Efavirenz Tablets USP (Aurobindo Pharma), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c5eedb5d-4cab-4056-a14a-ffdf67701355

---

### 3.93 Siklosporin

**Kalkulator berat badan** (IDAI hlm. 70)

| Keadaan | Dosis |
|---|---|
| Anemia aplastik (imunosupresif), kapsul 100 mg per oral | 3–5 mg/kg, per oral, 12–24 jam |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 81, tertulis "Cyclosporine A")

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 1,5–2,5 mg/kg/dosis q12 jam po | D | 100% | 100% | 50% | tak ada | tak ada |

**Sediaan** (FORNAS 2025 hlm. 106)

| Sediaan | Peresepan maksimal |
|---|---|
| Kapsul lunak 25 mg | 90 kaps per bulan |

**Aturan penggunaan**

- Sesuai tabel IDAI.
- Neoral dan Sandimmune tidak bioekuivalen dan tidak dapat saling menggantikan tanpa pengawasan dokter; hindari grapefruit dan jusnya (label Neoral).
- Fungsi ginjal (kreatinin serum) perlu dipantau sering (label Neoral).

**Manfaat obat** (label Neoral)

- Profilaksis penolakan organ pada transplantasi ginjal, hati, dan jantung.
- Artritis reumatoid aktif berat dan psoriasis plak berat yang tidak responsif (dewasa).
- Resipien transplantasi semuda 1 tahun pernah menerima Neoral tanpa efek samping yang tidak biasa; keamanan pada artritis reumatoid juvenil dan psoriasis di bawah 18 tahun belum ditetapkan.

**Efek samping** (label Neoral)

- Efek samping utama pada transplantasi: gangguan fungsi ginjal, tremor, hirsutisme, hipertensi, hiperplasia gusi.
- Hipertensi ringan–sedang pada sekitar 50% pasien setelah transplantasi ginjal.

**Peringatan** (label Neoral)

- Peringatan berbingkai: hanya diresepkan oleh dokter yang berpengalaman dengan terapi imunosupresif sistemik; dapat meningkatkan kerentanan terhadap infeksi dan neoplasia termasuk limfoma.
- Nefrotoksisitas dan hepatotoksisitas yang meningkat dengan dosis.
- Kontraindikasi: hipersensitivitas terhadap siklosporin atau bahan formulasi; pada artritis reumatoid atau psoriasis dengan gangguan fungsi ginjal, hipertensi tidak terkontrol, atau keganasan.

**Farmakokinetik** (label Neoral)

- Bioavailabilitas Neoral lebih tinggi daripada Sandimmune, juga pada anak.
- Volume distribusi 3–5 L/kg pada resipien transplantasi; dalam plasma sekitar 90% terikat protein, terutama lipoprotein; masuk ke ASI.
- Dimetabolisme luas oleh sistem sitokrom P450 3A di hati; eliminasi terutama melalui empedu, hanya 6% dosis (obat dan metabolit) di urin. Dialisis dan gagal ginjal tidak mengubah klirens secara bermakna.

**Farmakodinamik** (label Neoral)

- Menghambat secara spesifik dan reversibel limfosit imunokompeten pada fase G0 dan G1, terutama limfosit T (sel T-helper sebagai target utama).
- Menghambat produksi dan pelepasan limfokin, termasuk interleukin-2.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. NEORAL (cyclosporine) soft gelatin capsules and oral solution (Novartis), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=94461af3-11f1-4670-95d4-2965b9538ae3

---

### 3.94 Merkaptopurin

**Kalkulator** (IDAI hlm. 62; dosis per luas permukaan tubuh)

| Rute | Dosis |
|---|---|
| Oral | 75–100 mg/m2/hari |

**Sediaan** (FORNAS 2025 hlm. 76; antikanker)

| Sediaan | Peresepan maksimal |
|---|---|
| Tablet 50 mg | – |

**Aturan penggunaan**

- Sesuai tabel IDAI.
- Makanan menurunkan paparan merkaptopurin (label merkaptopurin).
- Pada defisiensi homozigot TPMT atau NUDT15, dosis awal perlu dikurangi; umumnya hanya membutuhkan 10% atau kurang dari dosis anjuran (label merkaptopurin).

**Manfaat obat** (label merkaptopurin)

- Leukemia limfoblastik akut (LLA) pada dewasa dan anak sebagai bagian dari regimen kemoterapi kombinasi fase pemeliharaan.

**Efek samping** (label merkaptopurin)

- Tersering (>20%): mielosupresi (anemia, neutropenia, limfopenia, trombositopenia).
- 5–20%: anoreksia, mual, muntah, diare, malaise, ruam.
- <5%: urtikaria, hiperurisemia, lesi mulut, kenaikan transaminase, hiperbilirubinemia, hiperpigmentasi, infeksi, pankreatitis.
- Hipoglikemia simtomatik pernah dilaporkan pada anak dengan LLA, terutama usia <6 tahun atau indeks massa tubuh rendah.

**Peringatan** (label merkaptopurin)

- Kontraindikasi: tidak ada.
- Mielosupresi yang bergantung dosis; pantau darah lengkap.
- Hepatotoksisitas, termasuk kematian akibat nekrosis hati.
- Imunosupresi (respons vaksin dapat menurun); keganasan terkait terapi; sindrom aktivasi makrofag; toksisitas embrio-janin.

**Farmakokinetik** (label merkaptopurin)

- Volume distribusi melebihi volume air tubuh total; masuk ke cairan serebrospinal sangat sedikit; ikatan protein plasma rata-rata 19%.
- Waktu paruh eliminasi kurang dari 2 jam setelah dosis oral tunggal.
- Diinaktivasi melalui metilasi tiol oleh TPMT dan oksidasi oleh xantin oksidase.

**Farmakodinamik** (label merkaptopurin)

- Analog purin yang diaktifkan di dalam sel menjadi nukleotida tioguanin; penggabungannya ke DNA atau RNA menghentikan siklus sel dan menyebabkan kematian sel.
- Metabolitnya juga menghambat sintesis purin de novo.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Mercaptopurine Tablets USP (Hikma Pharmaceuticals USA), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c3b5b8b0-bc5c-4ce9-bbdc-febba60c2658

---

### 3.95 Metotreksat

**Kalkulator** (IDAI hlm. 63; sebagian dosis per luas permukaan tubuh)

| Keadaan | Dosis |
|---|---|
| Artritis, psoriasis, penyakit Crohn | 10–15 mg/m2/mgg (maks 25 mg), oral, IV, IM, atau SK sampai respon; kemudian turunkan dosis |
| Leukemia | 3,3 mg/m2/hari IV selama 4–6 minggu; kemudian 2,5 mg/kg IV setiap 2 minggu atau 30 mg/m2 oral atau IM, 2x/minggu |
| Intratekal | 12 mg/m2/minggu selama 2 minggu, kemudian setiap bulan |

**Sediaan** (FORNAS 2025)

| Sediaan | Halaman FORNAS | Peresepan maksimal/restriksi |
|---|---|---|
| Tablet 2,5 mg (imunosupresan) | hlm. 104 | a) Untuk imunosupresi. b) Untuk pasien dengan luas psoriasis di atas 10% |
| Injeksi 2,5 mg/mL (i.t.) (imunosupresan) | hlm. 104–105 | a) Untuk penggunaan intratekal, hanya boleh digunakan sediaan *preservative free*. b) Diresepkan oleh dokter yang memiliki kompetensi di bidang ilmu hematologi onkologi medik dewasa, atau hematologi onkologi anak, atau neurologi |
| Tablet 2,5 mg (antikanker) | hlm. 76 | Untuk trofoblastik ganas: 30 mg/hari selama 5 hari |
| Injeksi 2,5 mg/mL (antikanker) | hlm. 76 | a) Untuk penggunaan intratekal, hanya boleh digunakan sediaan *preservative free*. b) Jika diperlukan dapat diberikan bersama kalsium folinat (leukovorin, Ca) sebagai *rescue medication* |
| Injeksi 5 mg (i.v./i.m./i.t.) (antikanker) | hlm. 76–77 | 15 mg/minggu. Untuk penggunaan intratekal, hanya boleh digunakan sediaan *preservative free* |
| Injeksi 10 mg/mL (antikanker) | hlm. 77 | a) Untuk penggunaan intratekal, hanya boleh digunakan sediaan *preservative free*. b) Jika diperlukan dapat diberikan bersama kalsium folinat (leukovorin, Ca) sebagai *rescue medication* |
| Injeksi 25 mg/mL (antikanker) | hlm. 77 | a) Untuk penggunaan intratekal, hanya boleh digunakan sediaan *preservative free*. b) Jika diperlukan dapat diberikan bersama kalsium folinat (leukovorin, Ca) sebagai *rescue medication* |

**Aturan penggunaan**

- Sesuai tabel IDAI; perhatikan regimen mingguan dan harian.
- Kematian pernah terjadi akibat kesalahan pengobatan, terutama ketika obat diminum setiap hari padahal diresepkan mingguan; pastikan pasien memahami jadwal mingguan (label metotreksat).
- Pada penyakit neoplastik, produk yang mengandung asam folat atau turunannya dapat menurunkan efektivitas metotreksat (label metotreksat).

**Manfaat obat** (label metotreksat)

- Pada anak: leukemia limfoblastik akut sebagai bagian dari regimen kemoterapi kombinasi fase pemeliharaan; artritis idiopatik juvenil poliartikular.
- Pada dewasa juga: mikosis fungoides, limfoma non-Hodgkin relaps/refrakter, artritis reumatoid, psoriasis berat.

**Efek samping** (label metotreksat)

- Sering: stomatitis ulseratif, leukopenia, mual, rasa tidak nyaman di perut.
- Lainnya: infeksi, malaise, lelah, menggigil, demam, pusing.

**Peringatan** (label metotreksat)

- Peringatan berbingkai: toksisitas embrio-janin; reaksi hipersensitivitas; kematian akibat pemberian sekali sehari yang tidak disengaja; efek samping serius pada sumsum tulang, saluran cerna, hati, paru, kulit, dan ginjal.
- Kontraindikasi: kehamilan pada penyakit non-neoplastik; riwayat hipersensitivitas berat terhadap metotreksat.
- Mielosupresi berat; toksisitas saluran cerna; hepatotoksisitas; toksisitas paru; reaksi kulit berat; toksisitas ginjal; infeksi serius; neurotoksisitas; keganasan sekunder; sindrom lisis tumor; vaksin hidup tidak dianjurkan.

**Farmakokinetik** (label metotreksat)

- Pada dosis ≤30 mg/m², bioavailabilitas rata-rata sekitar 60%; kadar puncak 0,75–6 jam; makanan memperlambat penyerapan.
- Sekitar 50% terikat protein serum; pada dosis anjuran tidak menembus sawar darah–cairan serebrospinal.
- Waktu paruh eliminasi sekitar 3–10 jam; poliglutamat metotreksat dapat tertahan lama di jaringan.

**Farmakodinamik** (label metotreksat)

- Menghambat dihidrofolat reduktase sehingga mengganggu sintesis, perbaikan, dan replikasi DNA; jaringan yang berproliferasi aktif lebih sensitif.
- Mekanisme pada artritis reumatoid dan psoriasis belum diketahui.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Methotrexate Tablets, USP (Alembic Pharmaceuticals), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=04a95db9-a124-4b97-bd71-1c37a6b3b0c8

---

### 3.96 Vitamin A

**Kalkulator berdasarkan usia** (IDAI hlm. 71–72)

| Usia | Dosis |
|---|---|
| <6 bulan | 50.000 IU |
| 6–12 bulan | 100.000 IU |

Keterangan IDAI: bila terdapat tanda klinis defisiensi vitamin A (rabun senja, xerosis konjungtiva dengan bercak Bitot, xerosis kornea atau ulserasi kornea, keratomalasia), maka dosis di atas harus diulang lagi pada hari ke-2 dan sekurangnya 2 minggu setelahnya.

**Sediaan** (FORNAS 2025 hlm. 215; tertulis "retinol (vitamin A)")

| Sediaan | Peresepan maksimal |
|---|---|
| Kapsul lunak 100.000 IU | – |
| Kapsul lunak 200.000 IU | – |

**Aturan penggunaan**

- Sesuai tabel IDAI; diulang pada hari ke-2 dan sekurangnya 2 minggu kemudian bila ada tanda klinis defisiensi (IDAI).
- Hindari dosis berlebih dan simpan jauh dari jangkauan anak (label Aquasol A).

**Manfaat obat** (label Aquasol A)

- Pengobatan defisiensi vitamin A; terapi vitamin A untuk keadaan defisiensi diakui sangat efektif dan penting pada anak.

**Efek samping** (label Aquasol A)

- Hipervitaminosis A: lelah, malaise, letargi, rasa tidak nyaman di perut, anoreksia, muntah.
- Reaksi alergi jarang.

**Peringatan** (label Aquasol A)

- Kontraindikasi (sediaan injeksi): pemberian intravena; hipervitaminosis A; sensitivitas terhadap bahan sediaan.
- Toksisitas oral akut dosis tunggal pada bayi tercatat pada 350.000 unit (25.000 unit/kg berat badan); toksisitas kronik pada bayi usia 3–6 bulan pada 18.500 unit/hari selama 1–3 bulan.
- Vitamin A melebihi kecukupan harian yang dianjurkan dikontraindikasikan pada wanita yang hamil atau mungkin hamil.

**Farmakokinetik** (label Aquasol A)

- Mudah diserap dari saluran cerna; penyerapan memerlukan garam empedu, lipase pankreas, dan lemak makanan.
- Diangkut ke hati melalui kilomikron dan disimpan di sel Kupffer hati, terutama sebagai palmitat.

**Farmakodinamik** (label Aquasol A)

- Retinal bergabung dengan opsin di retina membentuk rodopsin yang diperlukan untuk adaptasi gelap.
- Mencegah hambatan pertumbuhan dan menjaga integritas sel epitel.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. AQUASOL A Parenteral (retinyl palmitate) injection (Rising Pharma Holdings), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=1abd66eb-6ac8-4a9e-a609-251e46ea1a27

---

### 3.97 Budesonid

**Kalkulator** (IDAI hlm. 42–43)

| Sediaan/keadaan | Dosis |
|---|---|
| MDI, <12 thn | 50–200 mcg 6–12 jam |
| MDI, >12 thn | 100–600 mcg, 6–12 jam, turunkan menjadi 100–400 mcg, 12 jam |
| Nebulisasi, <12 thn | 0,5–1 mg, 12 jam, turunkan menjadi 0,25–0,5 mg, 12 jam |
| Nebulisasi, >12 thn | 1–2 mg, 12 jam, turunkan menjadi 0,5–1 mg, 12 jam |
| Croup | 2 mg, 12 jam, nebulisasi |

**Sediaan** (FORNAS 2025)

| Sediaan | Halaman FORNAS | Peresepan maksimal/restriksi |
|---|---|---|
| Serbuk inhalasi 200 mcg/dosis | hlm. 195 | Asma persisten berat: 2 tbg/bulan. Untuk rumatan asma (tidak untuk serangan asma akut) |
| Cairan inhalasi 0,5 mg/mL | hlm. 202 | Maks selama 10 hari. Hanya untuk eksaserbasi akut PPOK |

**Aturan penggunaan**

- Sesuai tabel IDAI.
- Bilas mulut setelah inhalasi (label Pulmicort Respules).

**Manfaat obat** (label Pulmicort Respules; label Pulmicort Flexhaler)

- Terapi rumatan dan profilaksis asma pada anak usia 12 bulan–8 tahun (suspensi nebulisasi) dan pasien usia 6 tahun ke atas (serbuk inhalasi).
- Tidak diindikasikan untuk meredakan bronkospasme akut.

**Efek samping** (label Pulmicort Respules)

- Pada uji anak usia 12 bulan–8 tahun, insidens efek samping sebanding dengan plasebo; yang dilaporkan antara lain infeksi saluran napas, rinitis, batuk, otitis media, infeksi virus, kandidiasis, gastroenteritis, dan muntah.
- Infeksi *Candida albicans* lokal di mulut dan faring.

**Peringatan** (label Pulmicort Respules; label Pulmicort Flexhaler)

- Kontraindikasi: terapi utama status asmatikus atau episode asma akut yang memerlukan tindakan intensif; hipersensitivitas terhadap budesonid atau bahan sediaan (serbuk inhalasi: hipersensitivitas berat terhadap protein susu).
- Bukan bronkodilator; tidak untuk meredakan serangan asma akut.
- Imunosupresi (cacar air dan campak dapat lebih berat); kematian akibat insufisiensi adrenal saat peralihan dari kortikosteroid sistemik; hiperkortisisme dan supresi adrenal.
- Penurunan kecepatan pertumbuhan pada anak, pantau pertumbuhan secara rutin; penurunan densitas mineral tulang; glaukoma dan katarak; bronkospasme paradoksal; interaksi dengan penghambat kuat CYP3A4.

**Farmakokinetik** (label Pulmicort Respules)

- Pada anak usia 4–6 tahun, bioavailabilitas absolut total (paru dan oral) setelah nebulisasi sekitar 6% dari dosis label; kadar puncak sekitar 20 menit setelah nebulisasi.
- 85–90% terikat protein plasma; volume distribusi pada anak sekitar 3 L/kg.
- Dimetabolisme cepat dan luas oleh CYP3A4 menjadi metabolit dengan aktivitas kortikosteroid rendah; waktu paruh terminal pada anak 4–6 tahun sekitar 2,3 jam.

**Farmakodinamik** (label Pulmicort Respules)

- Kortikosteroid antiinflamasi dengan aktivitas glukokortikoid kuat dan mineralokortikoid lemah; afinitas terhadap reseptor glukokortikoid sekitar 200 kali kortisol.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. PULMICORT RESPULES (budesonide) inhalation suspension (AstraZeneca), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=33cd9834-76df-4f26-3fa2-aab6b9eee8f2
4. PULMICORT FLEXHALER (budesonide) inhalation powder (H2-Pharma), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=10f2ae5b-a6fb-4804-9111-0cd067c2b1b2

---

### 3.98 Flutikason

**Kalkulator** (IDAI hlm. 52)

| Sediaan/rute | Dosis |
|---|---|
| Inhalasi | 50–100 mcg, 12 jam |
| Larutan 0,05% (hidung) | 1–4 spray/lubang hidung |

**Sediaan** (FORNAS 2025 hlm. 196; tertulis "flutikason propionat")

| Sediaan | Peresepan maksimal/restriksi |
|---|---|
| Cairan inhalasi 0,5 mg/dosis | Hari pertama maks 5 vial/hari, selanjutnya 2 vial/hari paling lama 5 hari. Hanya untuk serangan asma akut |
| MDI/aerosol 50 mcg/dosis | 2 canister/bulan. Untuk rumatan asma (tidak untuk serangan asma akut) |

**Aturan penggunaan**

- Sesuai tabel IDAI.

**Manfaat obat** (label fluticasone propionate HFA)

- Terapi rumatan asma sebagai profilaksis pada dewasa dan anak usia 4 tahun ke atas.
- Tidak diindikasikan untuk meredakan bronkospasme akut.

**Efek samping** (label fluticasone propionate HFA)

- Pada uji keamanan 12 minggu pada anak usia 1 sampai kurang dari 4 tahun, yang lebih sering daripada plasebo: demam, nasofaringitis, infeksi saluran napas atas, muntah, otitis media, diare, bronkitis, faringitis, dan infeksi virus.
- Kandidiasis orofaring.

**Peringatan** (label fluticasone propionate HFA)

- Kontraindikasi: terapi utama status asmatikus atau episode asma akut yang memerlukan tindakan intensif; hipersensitivitas terhadap bahan sediaan.
- Bukan bronkodilator; tidak untuk meredakan serangan akut.
- Imunosupresi dan risiko infeksi; supresi adrenal saat peralihan dari kortikosteroid sistemik; hiperkortisisme.
- Penurunan kecepatan pertumbuhan pada anak, pantau pertumbuhan secara rutin; penurunan densitas mineral tulang; glaukoma dan katarak; bronkospasme paradoksal; tidak dianjurkan bersama penghambat kuat CYP3A4 (misalnya ritonavir).

**Farmakokinetik** (label fluticasone propionate HFA)

- Bekerja lokal di paru; bioavailabilitas sistemik oral dapat diabaikan (<1%), tetapi sebagian besar dosis yang mencapai paru diserap secara sistemik.
- Volume distribusi rata-rata 4,2 L/kg; rata-rata 99% terikat protein plasma.
- Dimetabolisme melalui CYP3A4 menjadi turunan asam 17β-karboksilat yang hampir tidak aktif; waktu paruh eliminasi terminal sekitar 7,8 jam setelah pemberian IV.

**Farmakodinamik** (label fluticasone propionate HFA)

- Kortikosteroid trifluorinasi sintetis dengan aktivitas antiinflamasi; afinitas terhadap reseptor glukokortikoid manusia sekitar 18 kali deksametason.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Fluticasone Propionate HFA inhalation aerosol (Prasco Laboratories), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=99249b31-bf0a-464f-8335-845279350dbe

---

### 3.99 Amfoterisin B

**Kalkulator berat badan** (IDAI hlm. 28 dan 36, tertulis "Amfoterisin B (konvensional)")

| Keadaan | Dosis |
|---|---|
| Dosis inisial | 0,5 mg/kg/dosis sekali sehari, dosis bisa ditingkatkan 0,25 mg/kg sampai dosis maksimal 1,5 mg/kg/hari |
| Dosis rumatan | 0,25–1 mg/kg/dosis sekali sehari |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 77, tertulis "Amphotericin B")

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 0,5–1,5 mg/kg/hari iv dalam 6–24 jam | I | q24 jam | q24 jam | q24–36 jam | tak ada | dosis untuk LFG <10 |

**Sediaan** (FORNAS 2025 hlm. 49–50; antifungi sistemik)

| Sediaan | Peresepan maksimal/restriksi |
|---|---|
| Injeksi 5 mg/mL (i.v.) | – |
| Injeksi 50 mg (program) | 1 x 1 vial selama 14 hari. a) Disediakan oleh Program Kemenkes. b) Digunakan oleh ODHIV yang mengalami infeksi oportunistik jenis meningitis karena cryptococcus. c) Digunakan untuk kondisi sub akut cryptococcus. |

**Aturan penggunaan**

- Sesuai tabel IDAI.
- Diberikan IV di bawah pengawasan ketat; infus cepat dikaitkan dengan hipotensi, hipokalemia, aritmia, dan syok sehingga harus dihindari (label amfoterisin B).
- Verifikasi nama produk dan dosis sebelum pemberian, terutama bila dosis melebihi 1,5 mg/kg (label amfoterisin B).

**Manfaat obat** (label amfoterisin B)

- Infeksi jamur progresif yang berpotensi mengancam jiwa: aspergilosis, kriptokokosis, blastomikosis, kandidiasis sistemik, koksidioidomikosis, histoplasmosis, zigomikosis termasuk mukormikosis, dan sporotrikosis.
- Tidak digunakan untuk infeksi jamur noninvasif (misalnya kandidiasis oral, vagina, atau esofagus) pada pasien dengan hitung neutrofil normal.

**Efek samping** (label amfoterisin B)

- Reaksi akut 1–3 jam setelah infus dimulai: demam, menggigil, hipotensi, anoreksia, mual, muntah, sakit kepala, takipnea; biasanya lebih berat pada beberapa dosis pertama.
- Ginjal: penurunan fungsi ginjal, azotemia, hipokalemia, hipostenuria, asidosis tubulus ginjal, nefrokalsinosis; biasanya membaik bila terapi dihentikan, tetapi sebagian dapat menetap.
- Anemia normokromik normositik; nyeri di tempat suntikan dengan atau tanpa flebitis; nyeri otot dan sendi; penurunan berat badan.

**Peringatan** (label amfoterisin B)

- Peringatan berbingkai: tidak boleh diberikan dalam dosis lebih dari 1,5 mg/kg; overdosis dapat menyebabkan henti jantung atau kardiopulmoner yang fatal.
- Kontraindikasi: hipersensitivitas terhadap amfoterisin B atau komponen formulasi, kecuali kondisi yang mengancam jiwa hanya dapat diobati dengan amfoterisin B.
- Hati-hati pada gangguan fungsi ginjal; fungsi ginjal perlu dipantau sering.
- Keamanan dan efektivitas pada anak belum ditetapkan melalui studi terkontrol; pada anak, gunakan dosis terkecil yang efektif.

**Farmakokinetik** (label amfoterisin B)

- Lebih dari 90% terikat protein plasma dan sulit didialisis.
- Kadar di cairan pleura, peritoneum, sinovium, dan aqueous humor yang meradang sekitar dua pertiga kadar plasma; kadar di cairan serebrospinal jarang melebihi 2,5% kadar plasma.
- Waktu paruh plasma awal sekitar 24 jam, diikuti waktu paruh eliminasi sekitar 15 hari; diekskresikan sangat lambat oleh ginjal (berminggu-minggu sampai berbulan-bulan).

**Farmakodinamik** (label amfoterisin B)

- Fungistatik atau fungisidal bergantung kadar obat dan kepekaan jamur.
- Berikatan dengan sterol pada membran sel jamur sehingga permeabilitas membran berubah dan komponen intrasel bocor.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Amphotericin B for Injection, USP (X-Gen Pharmaceuticals), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a0a54943-9ce4-4f3e-b681-a1a9144c16ce

---

### 3.100 Asam asetilsalisilat (aspirin)

**Kalkulator berat badan** (IDAI hlm. 38)

| Keadaan | Dosis |
|---|---|
| Antiplatelet | 5 mg/kg (maks 100 mg) per hari |
| Artritis | 25 mg/kg (maks 2 gram), per oral, 6 jam selama 3 hari, kemudian 15–20 mg/kg, per oral, 6 jam |
| Demam rematik akut dengan karditis ringan sampai sedang | 90–100 mg/kgBB/hari dibagi dalam 4–6 dosis, diberikan selama 4–8 minggu tergantung respons klinis. Setelah tampak perbaikan gejala klinis, dosis diturunkan secara bertahap selama 4–6 minggu |
| Demam rematik akut dengan artritis | 90–100 mg/kgBB/hari dibagi dalam 4–6 dosis, diberikan selama 2 minggu dan secara perlahan dosis diturunkan dalam 2–3 minggu |
| Kawasaki | 80–100 mg/kgBB/hari dibagi dalam 4 dosis, diberikan sampai 48–72 jam bebas demam. Dosis diturunkan menjadi 3–5 mg/kgBB/hari sekali sehari, diberikan selama 6–8 minggu |

**Sediaan** (FORNAS 2025 hlm. 156; tertulis "asam asetilsalisilat (asetosal)")

| Sediaan | Peresepan maksimal |
|---|---|
| Tablet 80 mg | 30 tab/bulan |
| Tablet salut enterik 100 mg | 30 tab/bulan |

**Aturan penggunaan**

- Sesuai tabel IDAI.

**Manfaat obat** (label Durlaza; produk aspirin lepas lambat)

- Pada dewasa: menurunkan risiko kematian dan infark miokard pada penyakit arteri koroner kronik, serta risiko kematian dan stroke berulang setelah stroke iskemik atau serangan iskemik sementara.

**Efek samping** (label Durlaza; efek samping yang dilaporkan pada produk aspirin dosis rendah)

- SSP: agitasi, edema serebral, koma, kebingungan, pusing, sakit kepala, letargi, kejang.
- Cairan dan elektrolit: hiperkalemia, asidosis metabolik, alkalosis respiratorik.
- Saluran cerna: dispepsia, kenaikan enzim hati, hepatitis, sindrom Reye.
- Ginjal: nefritis interstisial, nekrosis papila, proteinuria, insufisiensi dan gagal ginjal.

**Peringatan** (label Durlaza)

- Kontraindikasi: hipersensitivitas terhadap OAINS; sindrom asma, rinitis, dan polip hidung (dapat menyebabkan urtikaria berat, angioedema, atau bronkospasme).
- Meningkatkan risiko perdarahan; dapat menyebabkan ulkus dan perdarahan lambung; hindari pada tukak peptik aktif.
- Toksisitas janin pada kehamilan lanjut.
- Keamanan dan efektivitas pada anak belum ditetapkan.

**Farmakokinetik** (label Durlaza)

- Aspirin cepat dihidrolisis dalam plasma menjadi asam salisilat; volume distribusi dosis lazim rata-rata sekitar 170 mL/kg.
- Asam salisilat terutama dikonjugasi di hati menjadi asam salisilurat dan glukuronida.
- Waktu paruh plasma aspirin 20–60 menit.

**Farmakodinamik** (label Durlaza)

- Gugus asetil aspirin berikatan dengan residu serin siklooksigenase-1 (COX-1) sehingga enzim tidak aktif secara ireversibel.
- Hambatan COX-1 mencegah pembentukan tromboksan A2 sehingga agregasi trombosit terhambat selama masa hidup trombosit (sekitar 7–10 hari).

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. DURLAZA (aspirin) extended-release capsules (New Haven Pharmaceuticals), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4c2a1403-3862-1efd-0a91-444989222b37

---

### 3.101 Atenolol

**Kalkulator berat badan** (IDAI hlm. 39)

| Rute | Dosis |
|---|---|
| Oral | 0,5–1 mg/kg (maks 25–50 mg), 12–24 jam |
| IV | 0,05 mg/kg (maks 2,5 mg) tiap 5 mnt bila perlu (maks 4 dosis), kemudian 0,1–0,2 mg/kg (maks 5–10 mg) dalam 10 mnt, 12–24 jam |

**Sediaan** (FORNAS 2025)

| Sediaan | Halaman FORNAS | Peresepan maksimal |
|---|---|---|
| Tablet 50 mg (antiangina) | hlm. 150 | 30 tab/bulan |
| Tablet 50 mg (antihipertensi) | hlm. 152 | 30 tab/bulan |
| Tablet 100 mg (antihipertensi) | hlm. 152 | 30 tab/bulan |

**Aturan penggunaan**

- Sesuai tabel IDAI.
- Jangan dihentikan mendadak pada penyakit arteri koroner; eksaserbasi angina berat, infark miokard, dan aritmia ventrikel pernah dilaporkan setelah penghentian mendadak penyekat beta (label Tenormin).

**Manfaat obat** (label Tenormin)

- Hipertensi, angina pektoris akibat aterosklerosis koroner, dan infark miokard akut (dewasa).

**Efek samping** (label Tenormin)

- Umumnya ringan dan sementara: bradikardia, ekstremitas dingin, hipotensi postural, nyeri tungkai, pusing, vertigo, lelah, letargi, mengantuk, depresi, mimpi, diare, mual.

**Peringatan** (label Tenormin)

- Kontraindikasi: bradikardia sinus, blok jantung lebih dari derajat satu, syok kardiogenik, gagal jantung nyata; hipersensitivitas terhadap atenolol.
- Dapat mencetuskan gagal jantung; pasien dengan penyakit bronkospastik umumnya tidak boleh menerima penyekat beta.
- Penyekat beta dapat menutupi tanda awal hipoglikemia dan meningkatkan risiko hipoglikemia berat, terutama pada pasien diabetes, anak, dan pasien yang berpuasa.
- Dapat menutupi tanda hipertiroidisme; penghentian mendadak dapat memicu badai tiroid.
- Keamanan dan efektivitas pada anak belum ditetapkan.

**Farmakokinetik** (label Tenormin)

- Sekitar 50% dosis oral diserap; kadar puncak 2–4 jam setelah pemberian.
- Hampir tidak dimetabolisme hati; bagian yang diserap dieliminasi terutama melalui ginjal. Ikatan protein plasma kecil (6–16%).
- Waktu paruh eliminasi oral sekitar 6–7 jam.

**Farmakodinamik** (label Tenormin)

- Penyekat reseptor beta1 yang selektif (kardioselektif) tanpa aktivitas stabilisasi membran atau simpatomimetik intrinsik; pada dosis lebih tinggi juga menghambat reseptor beta2.
- Menurunkan denyut jantung, curah jantung, dan tekanan darah saat istirahat maupun aktivitas.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. TENORMIN (atenolol) tablets (Upsher-Smith Laboratories), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=6e850b1e-28a4-4ff8-8ed7-bb0b29faa28a

---

### 3.102 Desmopresin

**Kalkulator** (IDAI hlm. 46)

| Keadaan | Dosis |
|---|---|
| Enuresis (malam hari), >6 thn | 200–400 mcg oral, 10–40 mcg nasal |

**Sediaan** (FORNAS 2025 hlm. 134)

| Sediaan | Peresepan maksimal |
|---|---|
| Tablet 0,1 mg | – |
| Tablet 0,2 mg | – |
| Nasal spray 10 mcg/puff | 3 btl spray/bulan |

**Aturan penggunaan**

- Sesuai tabel IDAI.
- Asupan cairan perlu dibatasi, terutama pada anak, untuk mencegah intoksikasi air dan hiponatremia (label DDAVP).

**Manfaat obat** (label DDAVP)

- Enuresis nokturnal primer, sendiri atau sebagai tambahan terapi perilaku; telah digunakan dengan aman pada anak usia 6 tahun ke atas hingga 6 bulan.
- Terapi pengganti antidiuretik pada diabetes insipidus sentral dan poliuria-polidipsia sementara setelah trauma kepala atau pembedahan daerah hipofisis; tidak efektif untuk diabetes insipidus nefrogenik.

**Efek samping** (label DDAVP)

- Pada uji enuresis nokturnal, satu-satunya efek samping ≥3% adalah sakit kepala (4% vs plasebo 3%).
- Dosis tinggi sediaan intranasal dan injeksi kadang menimbulkan sakit kepala, mual, kemerahan, dan kram perut ringan sementara.

**Peringatan** (label DDAVP)

- Kontraindikasi: hipersensitivitas terhadap desmopresin; gangguan ginjal sedang sampai berat (klirens kreatinin <50 mL/menit); hiponatremia atau riwayat hiponatremia.
- Hiponatremia dan intoksikasi air yang dapat fatal; diperlukan pembatasan cairan dan pengawasan medis ketat.
- Hati-hati pada insufisiensi koroner, penyakit kardiovaskular hipertensif, dan kondisi dengan gangguan cairan dan elektrolit (misalnya fibrosis kistik, gagal jantung, gangguan ginjal).

**Farmakokinetik** (label DDAVP)

- Bioavailabilitas tablet oral sekitar 5% dibanding intranasal dan sekitar 0,16% dibanding IV.
- Waktu paruh plasma 1,5–2,5 jam, tidak bergantung dosis.

**Farmakodinamik** (label DDAVP)

- Analog sintetis hormon arginin vasopresin dengan efek antidiuretik; pada diabetes insipidus, dosis oral 0,1–0,2 mg menghasilkan efek antidiuretik hingga 8 jam.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. DDAVP (desmopressin acetate) tablets (Ferring Pharmaceuticals), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=6d55baa9-2b62-469c-93ae-3909ab249332

---

### 3.103 Fludrokortison

**Kalkulator** (IDAI hlm. 52, tertulis "Fludrokortison asetat")

| Rute | Dosis |
|---|---|
| Oral | 150 mcg/m2/hari, oral ATAU 0,1–0,2 mg/hari |

**Sediaan** (FORNAS 2025 hlm. 148)

Restriksi FORNAS: sebagai pengobatan pengganti parsial untuk insufisiensi korteks adrenal primer yang terjadi pada penyakit Addison dan kehilangan garam (*salt losing*) pada sindrom adrenogenital.

| Sediaan | Peresepan maksimal |
|---|---|
| Tablet 0,102 mg | – |

**Aturan penggunaan**

- Sesuai tabel IDAI.
- Dosis pendukung mungkin diperlukan saat stres (trauma, pembedahan, penyakit berat) selama terapi dan hingga satu tahun sesudahnya (label fludrokortison).

**Manfaat obat** (label fludrokortison)

- Terapi pengganti parsial untuk insufisiensi adrenokortikal primer dan sekunder pada penyakit Addison, serta sindrom adrenogenital dengan kehilangan garam.

**Efek samping** (label fludrokortison)

- Sebagian besar akibat aktivitas mineralokortikoid (retensi natrium dan air): hipertensi, edema, pembesaran jantung, gagal jantung kongestif, kehilangan kalium, alkalosis hipokalemik.
- Pada penggunaan lama atau bersama glukokortikoid: kelemahan otot, miopati steroid, osteoporosis, dan efek glukokortikoid lain.

**Peringatan** (label fludrokortison)

- Kontraindikasi: infeksi jamur sistemik; hipersensitivitas terhadap kortikosteroid.
- Karena efek retensi natrium yang kuat, tidak dianjurkan untuk kondisi di luar indikasi.
- Dapat menutupi tanda infeksi; penggunaan lama dapat menyebabkan katarak, glaukoma, dan infeksi mata sekunder.
- Keamanan dan efektivitas pada anak belum ditetapkan; pertumbuhan dan perkembangan anak yang menerima kortikosteroid jangka panjang perlu diamati.

**Farmakokinetik** (label fludrokortison)

- Waktu paruh plasma sekitar 3,5 jam atau lebih; waktu paruh biologis 18–36 jam.

**Farmakodinamik** (label fludrokortison)

- Kerja fisiologis serupa hidrokortison, tetapi efek terhadap keseimbangan elektrolit jauh lebih kuat dan lama.
- Bekerja pada tubulus distal ginjal meningkatkan reabsorpsi natrium serta meningkatkan ekskresi kalium dan ion hidrogen di urin.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Fludrocortisone Acetate Tablets, USP (Eywa Pharma), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=eff2eae8-94ce-46ca-a027-6b1d08e7b96b

---

### 3.104 Gansiklovir

**Kalkulator berat badan** (IDAI hlm. 53)

| Keadaan | Dosis |
|---|---|
| CMV kongenital | 7,5 mg/kg, 12 jam, IV dalam 2 jam |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 83, tertulis "Ganciclovir")

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 5 mg/kg/dosis q12 jam iv utk 2–3 minggu, kmd 5 mg/kg q24 jam iv | I | q12 jam | q24–48 jam | q48–96 jam | dosis sesudah dialisis | Dosis untuk LFG <10 |

**Sediaan** (FORNAS 2025 hlm. 53; anti sitomegalovirus)

Restriksi FORNAS: untuk pengobatan infeksi CMV yang mengancam jiwa atau penglihatan pada pasien *immunocompromised*, termasuk HIV/AIDS dengan CD4 <100, atau untuk transplantasi organ dari donor yang menderita CMV.

| Sediaan | Peresepan maksimal |
|---|---|
| Serbuk injeksi 500 mg | – |

**Aturan penggunaan**

- Sesuai tabel IDAI.
- Gunakan dengan hati-hati pada gangguan fungsi ginjal karena waktu paruh dan kadar gansiklovir meningkat (label gansiklovir).

**Manfaat obat** (label gansiklovir)

- Pengobatan retinitis CMV pada pasien imunokompromais dewasa, termasuk AIDS.
- Pencegahan penyakit CMV pada resipien transplantasi dewasa yang berisiko.

**Efek samping** (label gansiklovir)

- Tersering (≥20% dewasa): demam, diare, leukopenia, mual, anemia, astenia, sakit kepala, batuk, nafsu makan menurun, sesak, nyeri perut, sepsis, hiperhidrosis, kenaikan kreatinin.
- Pada uji klinis anak dengan infeksi CMV berat, efek samping tersering adalah granulositopenia dan trombositopenia.

**Peringatan** (label gansiklovir)

- Peringatan berbingkai: toksisitas hematologi (granulositopenia, anemia, trombositopenia, pansitopenia), gangguan fertilitas, toksisitas janin, serta potensi mutagenik dan karsinogenik.
- Kontraindikasi: hipersensitivitas bermakna (misalnya anafilaksis) terhadap gansiklovir, valgansiklovir, atau komponen formulasi.
- Keamanan dan efikasi pada anak belum ditetapkan.

**Farmakokinetik** (label gansiklovir)

- Ikatan protein plasma 1–2%; masuk ke cairan serebrospinal.
- Eliminasi utama melalui ekskresi ginjal dalam bentuk utuh (filtrasi glomerulus dan sekresi tubulus aktif); waktu paruh sekitar 3,5 jam setelah pemberian IV pada dewasa.
- Pada neonatus usia 2–49 hari, waktu paruh sekitar 2,4 jam.

**Farmakodinamik** (label gansiklovir)

- Di sel yang terinfeksi CMV, difosforilasi oleh kinase virus pUL97 lalu oleh kinase sel menjadi gansiklovir trifosfat.
- Gansiklovir trifosfat menghambat DNA polimerase virus (pUL54) sehingga replikasi CMV terhambat.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Ganciclovir for Injection, USP (Par Health), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=87afd103-6e64-444f-971d-0e732e9ae995

---

### 3.105 Valgansiklovir

**Kalkulator** (IDAI hlm. 71)

| Usia | Dosis |
|---|---|
| Neonatus | 15 mg/kg, 12 jam |
| >4 mgg | 520 mg/m2, 12 jam, oral bersama makanan selama 21 hari |

**Sediaan** (FORNAS 2025 hlm. 53–54; anti sitomegalovirus)

Restriksi FORNAS: a) hanya untuk pasien HIV/AIDS dengan CD4 <100, serta dibuktikan ada kelainan organik (retinitis CMV) atau untuk profilaksis CMV pada pasien CMV negatif yang menerima transplantasi organ dari donor yang CMV positif; b) kadar transaminase serum dalam batas normal.

| Sediaan | Peresepan maksimal |
|---|---|
| Tablet salut 450 mg | – |

**Aturan penggunaan**

- Diberikan bersama makanan (IDAI; label Valcyte).

**Manfaat obat** (label Valcyte)

- Pengobatan retinitis CMV pada AIDS (dewasa).
- Pencegahan penyakit CMV pada transplantasi ginjal, jantung, dan ginjal-pankreas risiko tinggi; pada anak, untuk transplantasi ginjal usia 4 bulan–16 tahun dan transplantasi jantung usia 1 bulan–16 tahun. Tidak diindikasikan untuk profilaksis pada neonatus.

**Efek samping** (label Valcyte)

- Tersering (≥20% dewasa pada sedikitnya satu indikasi): diare, demam, lelah, mual, tremor, neutropenia, anemia, leukopenia, trombositopenia, sakit kepala, insomnia, infeksi saluran kemih, muntah.
- Efek samping gansiklovir dapat terjadi karena valgansiklovir cepat diubah menjadi gansiklovir.

**Peringatan** (label Valcyte)

- Peringatan berbingkai: toksisitas hematologi (leukopenia, neutropenia, anemia, trombositopenia, pansitopenia, kegagalan sumsum tulang termasuk anemia aplastik), gangguan fertilitas, toksisitas janin, serta potensi mutagenik dan karsinogenik.
- Kontraindikasi: hipersensitivitas bermakna terhadap valgansiklovir, gansiklovir, atau komponen formulasi.
- Gagal ginjal akut; dosis perlu dikurangi pada gangguan fungsi ginjal.

**Farmakokinetik** (label Valcyte)

- Prodrug gansiklovir yang cepat diubah menjadi gansiklovir setelah pemberian oral; Cmax dan AUC valgansiklovir hanya sekitar 1% dan 3% dari gansiklovir.

**Farmakodinamik** (label Valcyte)

- Antivirus dengan aktivitas terhadap CMV melalui gansiklovir (lihat gansiklovir).

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. VALCYTE (valganciclovir) tablets and oral solution (H2-Pharma), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4c517a39-2ded-4c5a-8d56-276853414b31

---

### 3.106 Takrolimus

**Kalkulator berat badan**

| Keadaan | Dosis | Sumber |
|---|---|---|
| Transplantasi ginjal dan hati (IV) | 0,03–0,05 mg/kg/hari iv | IDAI hlm. 70 |
| Transplantasi jantung (IV) | 0,01 mg/kg/hari iv | IDAI hlm. 70 |
| Oral | 0,15–0,2 mg/kg/hari bagi 2 dosis tiap 12 jam | IDAI hlm. 70 |
| Kapsul lepas lambat, dosis awal transplantasi ginjal | 0,2–0,3 mg/kg/hari | FORNAS hlm. 107 |
| Kapsul lepas lambat, dosis awal transplantasi hati | 0,1–0,2 mg/kg/hari | FORNAS hlm. 107 |

Keterangan IDAI (sediaan topikal, hlm. 70): usia 2–15 tahun salep 0,03%, 2 kali sehari; usia >15 tahun salep 0,03% atau 0,1%, 2 kali sehari; dilanjutkan sampai 1 minggu setelah gejala menghilang. FORNAS tidak mencantumkan sediaan salep takrolimus.

**Sediaan** (FORNAS 2025 hlm. 106–107)

Restriksi FORNAS: a) untuk pasien pascatransplantasi hati atau ginjal yang telah mendapat imunosupresan lainnya, tetapi tidak respons; atau b) untuk pencegahan rejeksi pada transplantasi hati atau ginjal.

| Sediaan | Peresepan maksimal |
|---|---|
| Kapsul 0,5 mg | – |
| Kapsul 1 mg | – |
| Kapsul lepas lambat 0,5 mg | Dosis awal transplantasi ginjal: 0,2–0,3 mg/kg/hari. Dosis awal transplantasi hati: 0,1–0,2 mg/kg/hari. Dosis rumatan disesuaikan dengan kebutuhan pasien berdasarkan pemantauan kadar obat dalam darah |
| Kapsul lepas lambat 1 mg | sama seperti di atas |
| Kapsul lepas lambat 3 mg | sama seperti di atas |

**Aturan penggunaan**

- Sesuai tabel IDAI dan FORNAS.
- Sediaan lepas segera dan lepas lambat tidak dapat saling menggantikan; kesalahan penggantian pernah menyebabkan rejeksi graft (label Prograf).
- Diminum secara konsisten setiap hari, selalu bersama atau selalu tanpa makanan; hindari grapefruit dan jusnya (label Prograf).

**Manfaat obat** (label Prograf)

- Profilaksis rejeksi organ pada transplantasi ginjal, hati, jantung, atau paru pada dewasa dan anak, dikombinasikan dengan imunosupresan lain.

**Efek samping** (label Prograf)

- Tersering pada transplantasi ginjal (≥30%): infeksi, tremor, hipertensi, gangguan fungsi ginjal, konstipasi, diare, sakit kepala, nyeri perut, insomnia, mual, hipomagnesemia, infeksi saluran kemih, hipofosfatemia, edema perifer.
- Nefrotoksisitas pada sekitar 52% pasien transplantasi ginjal.

**Peringatan** (label Prograf)

- Peringatan berbingkai: peningkatan risiko infeksi serius dan keganasan.
- Kontraindikasi: hipersensitivitas terhadap takrolimus; injeksi pada hipersensitivitas terhadap HCO-60 (minyak jarak terhidrogenasi).
- Diabetes awitan baru pascatransplantasi; nefrotoksisitas; neurotoksisitas (termasuk PRES, kejang); hiperkalemia; hipertensi; pemanjangan QT; hipertrofi miokard (termasuk pada bayi dan anak); interaksi dengan penghambat dan penginduksi CYP3A4; hindari vaksin hidup.

**Farmakokinetik** (label Prograf)

- Bioavailabilitas absolut 17–23% pada dewasa; makanan menurunkan bioavailabilitas.
- Ikatan protein plasma sekitar 99%.
- Dimetabolisme luas oleh sistem sitokrom P450 (CYP3A4 dan CYP3A5); kurang dari 1% dosis dikeluarkan utuh di urin.
- Anak umumnya membutuhkan dosis lebih tinggi untuk mencapai kadar lembah serupa dengan dewasa.

**Farmakodinamik** (label Prograf)

- Berikatan dengan protein intrasel FKBP-12; kompleks ini menghambat aktivitas fosfatase kalsineurin sehingga aktivasi limfosit T dan produksi berbagai sitokin (termasuk IL-2) terhambat.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. PROGRAF (tacrolimus) capsules, injection, and granules (Astellas Pharma US), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=7f667de1-9dfa-4bd6-8ba0-15ee2d78873b

---

### 3.107 Siklofosfamid

**Kalkulator** (IDAI hlm. 69; dosis per luas permukaan tubuh atau per kg)

| Keadaan | Dosis |
|---|---|
| Leukemia | Regimen tipikal 600 mg/m2 IV selama 30 menit, 1x/hari, 3 hari. Kemudian 600 mg/m2 IV, 1x/minggu atau 10 mg/kg, 2x seminggu (jika leukosit >3000/mm3) |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 81, tertulis "Cyclophosphamide")

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 600 mg/m2/dosis q24 jam iv | D | 100% | 100% | 75% | ½ dosis | tak ada data |

**Sediaan** (FORNAS 2025 hlm. 73; antikanker)

| Sediaan | Peresepan maksimal |
|---|---|
| Injeksi 200 mg (i.v.) | – |
| Injeksi 500 mg (i.v.) | – |
| Injeksi 1.000 mg (i.v.) | – |

**Aturan penggunaan**

- Sesuai tabel IDAI.

**Manfaat obat** (label siklofosfamid)

- Pada dewasa dan anak: limfoma maligna, mieloma multipel, leukemia, mikosis fungoides, neuroblastoma, adenokarsinoma ovarium, retinoblastoma, dan kanker payudara.
- Sindrom nefrotik lesi minimal yang terbukti biopsi pada anak yang tidak respons atau tidak toleran terhadap kortikosteroid.

**Efek samping** (label siklofosfamid)

- Tersering: neutropenia, neutropenia febril, demam, alopesia, mual, muntah, diare.
- Sistitis hemoragik, toksisitas jantung dan paru, dan keganasan sekunder (lihat Peringatan).

**Peringatan** (label siklofosfamid)

- Kontraindikasi: riwayat hipersensitivitas berat terhadap siklofosfamid atau metabolitnya; obstruksi aliran urin.
- Mielosupresi, imunosupresi, kegagalan sumsum tulang, dan infeksi berat; toksisitas saluran kemih dan ginjal (sistitis hemoragik); kardiotoksisitas; toksisitas paru; keganasan sekunder; penyakit veno-oklusif hati; toksisitas embrio-janin; infertilitas; hiponatremia.
- Pada anak praremaja, fibrosis ovarium dan gangguan fungsi gonad dapat terjadi.

**Farmakokinetik** (label siklofosfamid)

- Prodrug; volume distribusi 30–50 L; sekitar 20% terikat protein.
- Waktu paruh eliminasi 3–12 jam.
- Dimetabolisme oleh sitokrom P450 (CYP2A6, 2B6, 3A, 2C9, 2C19) menjadi 4-hidroksisiklofosfamid dan metabolit aktif lainnya.

**Farmakodinamik** (label siklofosfamid)

- Metabolit pengalkil aktifnya mengganggu pertumbuhan sel ganas yang berproliferasi cepat; mekanisme kemungkinan melibatkan ikatan silang DNA sel tumor.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Cyclophosphamide for Injection, USP (Civica), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=8627c83f-c057-495d-9f78-8b67bda97b3e

---

### 3.108 Vinkristin

**Kalkulator** (IDAI hlm. 71; dosis per luas permukaan tubuh)

| Rute | Dosis |
|---|---|
| IV | 1,5 mg/m2 IV dalam 1 menit, setiap minggu |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 91, tertulis "Vincristine")

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 1,5 mg/m2/dosis tiap minggu iv | D | 100% | 100% | 100% | tak ada data | tak ada data |

**Sediaan** (FORNAS 2025 hlm. 80; antikanker)

| Sediaan | Peresepan maksimal |
|---|---|
| Injeksi 1 mg/mL | 1,5 mg/m2 maks weekly dose 2 mg. Kecuali untuk ALL maks 3 tahun |

**Aturan penggunaan**

- Sesuai tabel IDAI dan FORNAS.
- Hanya untuk IV; fatal bila diberikan melalui rute lain (pemberian intratekal biasanya berakibat kematian). Pastikan jarum atau kateter terpasang benar sebelum penyuntikan; ekstravasasi dapat menimbulkan iritasi berat (label vinkristin).

**Manfaat obat** (label vinkristin)

- Leukemia akut; dalam kombinasi dengan agen onkolitik lain pada penyakit Hodgkin, limfoma non-Hodgkin, rabdomiosarkoma, neuroblastoma, dan tumor Wilms.

**Efek samping** (label vinkristin)

- Tersering: rambut rontok; yang paling mengganggu berasal dari sistem neuromuskular.
- Leukopenia, nyeri neuritik, dan konstipasi, biasanya singkat; kehilangan sensorik, parestesia, sulit berjalan, hilangnya refleks tendon dalam, dan atrofi otot dapat menetap selama terapi.

**Peringatan** (label vinkristin)

- Peringatan berbingkai: hanya untuk IV, fatal bila diberikan melalui rute lain; harus diberikan oleh tenaga berpengalaman.
- Kontraindikasi: bentuk demielinasi sindrom Charcot-Marie-Tooth.
- Nefropati asam urat akut; mielosupresi bila dikombinasikan dengan kemoterapi lain; tidak cukup menembus sawar darah-otak.

**Farmakokinetik** (label vinkristin)

- Penurunan kadar serum trifasik setelah suntikan IV cepat: waktu paruh awal 5 menit, tengah 2,3 jam, dan terminal 85 jam (rentang 19–155 jam).
- Hati merupakan organ ekskresi utama.

**Farmakodinamik** (label vinkristin)

- Menghambat pembentukan mikrotubulus pada gelendong mitosis sehingga pembelahan sel berhenti pada tahap metafase.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Vincristine Sulfate Injection (Hospira), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b22e4c8e-dbe1-4d4b-a026-e1812974071c

### 3.109 Dolutegravir

**Kalkulator** (IDAI hlm. 48, tertulis "Dolutegravir (Tivicay/DTG)")

| Keadaan | Dosis |
|---|---|
| Anak > 12 tahun, >40 kg | 50 mg, 1x/hari, oral |

**Sediaan** (FORNAS 2025 hlm. 62; *integrase inhibitor*)

Catatan FORNAS: disediakan oleh Program Kemenkes. Restriksi FORNAS: dapat diberikan oleh FPKTP yang memiliki kemampuan pengobatan antiretroviral dengan persyaratan memiliki SK Penunjukan sebagai unit pelayanan yang berhak memberikan obat ARV dari Dinas Kesehatan setempat.

| Sediaan | Peresepan maksimal/restriksi |
|---|---|
| Tablet 10 mg | Dapat digunakan untuk pengobatan HIV pada anak |
| Tablet 50 mg | – |

**Aturan penggunaan**

- Sesuai tabel IDAI.
- Diberikan dalam kombinasi dengan antiretroviral lain (label Tivicay).
- Tivicay (tablet salut selaput) dan Tivicay PD (tablet untuk suspensi oral) tidak dapat saling menggantikan berdasarkan miligram per miligram (label Tivicay).

**Manfaat obat** (label Tivicay)

- Pengobatan infeksi HIV-1, dikombinasikan dengan antiretroviral lain, pada dewasa dan pasien anak dengan berat badan minimal 2 kg yang belum pernah mendapat penghambat integrase.

**Efek samping** (label Tivicay)

- Tersering: sulit tidur (insomnia), kelelahan, dan sakit kepala.

**Peringatan** (label Tivicay)

- Kontraindikasi: riwayat hipersensitivitas terhadap dolutegravir; penggunaan bersama dofetilid.
- Reaksi hipersensitivitas (<1%) dengan ruam, gejala konstitusional, dan kadang disfungsi organ termasuk cedera hati; hentikan segera bila timbul.
- Hepatotoksisitas; pasien dengan hepatitis B atau C mungkin berisiko lebih tinggi mengalami peningkatan transaminase.
- Risiko efek samping atau hilangnya respons virologis akibat interaksi obat; sindrom rekonstitusi imun.

**Farmakokinetik** (label Tivicay)

- Ikatan protein plasma ≥98,9%; waktu paruh terminal sekitar 14 jam.
- Dimetabolisme terutama melalui UGT1A1 dengan kontribusi CYP3A.

**Farmakodinamik** (label Tivicay)

- Menghambat integrase HIV dengan berikatan pada situs aktif integrase dan menghambat langkah transfer untai (*strand transfer*) integrasi DNA retrovirus.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Tivicay (ViiV Healthcare), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=63df5af3-b8ac-4e76-9830-2dbb340af922

### 3.110 Lopinavir + Ritonavir

**Kalkulator** (IDAI hlm. 61)

| Keadaan | Dosis |
|---|---|
| >6 bln – 13 tahun | 230 mg/m2 LPV, 57,5 mg/m2 RTV, 2x/hari |
| 7–15 kg | 12 mg/kg LPV, 3 mg/kg RTV/dosis, 2 kali/hari |
| 15–40 kg | 10 mg/kg LPV, 5 mg/kg RTV, 2 kali/hari |
| >40 kg | 400 mg LPV, 100 mg RTV, 2 kali/hari |

**Sediaan** (FORNAS 2025 hlm. 60–62; *protease inhibitor*, KDT/FDC LPV/r)

Catatan FORNAS: disediakan oleh Program Kemenkes. Setiap sediaan dapat diberikan oleh FPKTP yang memiliki kemampuan pengobatan antiretroviral dengan persyaratan memiliki SK Penunjukan sebagai unit pelayanan yang berhak memberikan obat ARV dari Dinas Kesehatan setempat.

| Sediaan | Peresepan maksimal/restriksi |
|---|---|
| Tablet lopinavir 100 mg + ritonavir 25 mg | a) Dapat digunakan untuk pengobatan HIV pada usia ≥10 tahun; b) dapat digunakan sebagai terapi lini kedua pada anak yang gagal terapi dengan NNRTI |
| Granul lopinavir 40 mg + ritonavir 10 mg | Dapat digunakan untuk pengobatan HIV pada anak |
| Tablet lopinavir 200 mg + ritonavir 50 mg | Hanya digunakan sebagai lini kedua terapi antiretroviral |

**Aturan penggunaan**

- Sesuai tabel IDAI.
- Diberikan dalam kombinasi dengan antiretroviral lain (label Kaletra).
- Larutan oral Kaletra mengandung etanol (sekitar 42% v/v) dan propilen glikol; tidak dianjurkan sebelum usia pascamenstruasi 42 minggu dan usia pascanatal 14 hari (label Kaletra).

**Manfaat obat** (label Kaletra)

- Pengobatan infeksi HIV-1, dikombinasikan dengan antiretroviral lain, pada dewasa dan pasien anak usia 14 hari ke atas.

**Efek samping** (label Kaletra)

- Pada anak: gangguan pengecapan (disgeusia) 22%, muntah 21%, dan diare 12%.

**Peringatan** (label Kaletra)

- Kontraindikasi: hipersensitivitas bermakna klinis terhadap komponen sediaan; penggunaan bersama obat yang klirensnya sangat bergantung pada CYP3A, atau dengan penginduksi kuat CYP3A.
- Toksisitas pada neonatus prematur akibat larutan oral (etanol dan propilen glikol).
- Pankreatitis; hepatotoksisitas; pemanjangan interval QT dan PR.
- Diabetes melitus/hiperglikemia; peningkatan kolesterol total dan trigliserida; sindrom rekonstitusi imun; peningkatan perdarahan pada pasien hemofilia.

**Farmakokinetik** (label Kaletra)

- Lopinavir terikat protein plasma >98%.
- Ritonavir menghambat metabolisme lopinavir oleh CYP3A sehingga kadar lopinavir dalam plasma meningkat.

**Farmakodinamik** (label Kaletra)

- Lopinavir menghambat protease HIV-1 sehingga mencegah pembelahan poliprotein Gag-Pol dan menghasilkan partikel virus yang imatur dan tidak infeksius.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Kaletra (AbbVie), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=8290add3-4449-4e58-6c97-8fe1eec972e3

### 3.111 Milrinon

**Kalkulator** (IDAI hlm. 64)

| Keadaan | Dosis |
|---|---|
| <30 kg | 1.5 mg/kg dalam 50 ml, 2.5 ml dalam 1 jam (75 mcg/kg); kemudian 1–1.5 ml/jam (0.5–0.75 mcg/kg/mnt) |
| >30 kg | 1.5 mg/kg dalam 100 ml, 5 ml dalam 1 jam (75 mcg/kg), kemudian 2–3 ml/jam (0.5–0.75 mcg/kg/mnt) |

**Sediaan** (FORNAS 2025 hlm. 162)

Restriksi FORNAS: hanya diberikan di ruang intensif.

| Sediaan | Peresepan maksimal |
|---|---|
| Injeksi 1 mg/mL | Maks 2 hari |

**Aturan penggunaan**

- Sesuai tabel IDAI dan FORNAS.
- Belum ada pengalaman uji terkontrol untuk infus lebih dari 48 jam (label milrinon).

**Manfaat obat** (label milrinon)

- Terapi IV jangka pendek pada pasien gagal jantung dekompensasi akut.

**Efek samping** (label milrinon)

- Aritmia ventrikel 12,1% (termasuk ektopi ventrikel, takikardia ventrikel tidak menetap dan menetap, serta fibrilasi ventrikel); aritmia supraventrikel.
- Sakit kepala 2,9%; hipokalemia 0,6%; tremor 0,4%; trombositopenia 0,4%.

**Peringatan** (label milrinon)

- Kontraindikasi: hipersensitivitas terhadap milrinon.
- Penggunaan oral jangka panjang berkaitan dengan peningkatan risiko rawat inap dan kematian (termasuk kematian mendadak).
- Aritmia; tidak boleh digunakan pada penyakit katup aorta atau pulmonal obstruktif berat sebagai pengganti tindakan bedah, dan dapat memperberat obstruksi saluran keluar pada stenosis subaorta hipertrofik.
- Keamanan dan efektivitas pada anak belum ditetapkan.

**Farmakokinetik** (label milrinon)

- Volume distribusi sekitar 0,38–0,45 L/kg; waktu paruh eliminasi sekitar 2,3–2,4 jam; terikat protein plasma sekitar 70%.
- Ekskresi terutama melalui urin: 83% dalam bentuk utuh dan 12% sebagai metabolit glukuronida.

**Farmakodinamik** (label milrinon)

- Penghambat fosfodiesterase III di otot jantung dan otot polos pembuluh darah, menghasilkan efek inotropik positif dan vasodilatasi.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Milrinone Lactate Injection (Mullan Pharmaceutical), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=07dddead-22ed-004c-e063-6294a90a76fc

### 3.112 Doksorubisin

**Kalkulator** (IDAI hlm. 48; dosis per luas permukaan tubuh)

| Rute | Dosis |
|---|---|
| IV | 30 mg/m2 IV dalam 15 mnt, 1x/minggu ATAU 30 mg/m2 IV, 1x/hari selama 2–3 hari, setiap 3–4 minggu |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 82, tertulis "Doxorubicin")

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 30 mg/m2/dosis tiap minggu iv | D | 100% | 75% | 50% | tak ada data | tak ada data |

**Sediaan** (FORNAS 2025 hlm. 81–82; antikanker)

Restriksi FORNAS: pemeriksaan echocardiogram dilakukan sebelum pemberian siklus pertama dan setiap kali setelah mencapai dosis kumulatif 200 mg/m2, kecuali bila terjadi perubahan klinis (gangguan kardiologis) atau komorbiditas yang menyebabkan komplikasi kardiologis.

| Sediaan | Peresepan maksimal |
|---|---|
| Injeksi 10 mg (i.v.) | Dosis kumulatif maks (seumur hidup): 500 mg/m² |
| Injeksi 50 mg (i.v.) | – |

**Aturan penggunaan**

- Sesuai tabel IDAI dan FORNAS.
- Hanya IV; ekstravasasi dapat menyebabkan cedera jaringan berat dan nekrosis (label doksorubisin).

**Manfaat obat** (label doksorubisin)

- Leukemia limfoblastik akut, leukemia mieloblastik akut, limfoma Hodgkin dan non-Hodgkin, tumor Wilms, neuroblastoma, sarkoma jaringan lunak dan tulang, serta keganasan lain.

**Efek samping** (label doksorubisin)

- Tersering: kerontokan rambut total (alopesia).
- Mual, muntah, diare, serta nyeri atau luka di mulut.

**Peringatan** (label doksorubisin)

- Peringatan berbingkai: kardiomiopati (1–20% pada dosis kumulatif 300–500 mg/m²), keganasan sekunder (AML dan MDS), ekstravasasi dan nekrosis jaringan, serta mielosupresi berat.
- Kontraindikasi: insufisiensi miokard berat, infark miokard baru, mielosupresi berat yang menetap, gangguan hati berat, dan hipersensitivitas berat terhadap doksorubisin.
- Sindrom lisis tumor; *radiation recall*; toksisitas embrio-janin.
- Pantau fungsi jantung sebelum, selama, dan setelah terapi untuk mendeteksi kardiotoksisitas tertunda.

**Farmakokinetik** (label doksorubisin)

- Terikat protein plasma sekitar 75%.
- Waktu paruh terminal 20–48 jam.

**Farmakodinamik** (label doksorubisin)

- Efek sitotoksik diduga berkaitan dengan interkalasi basa nukleotida dan pengikatan lipid membran sel; interkalasi menghambat replikasi nukleotida serta kerja DNA polimerase dan RNA polimerase.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Doxorubicin Hydrochloride (Pfizer), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=1fd148fb-0fbc-4b6f-b790-23546fb46a71

### 3.113 Daunorubisin

**Kalkulator** (IDAI hlm. 45; dosis per luas permukaan tubuh)

| Keadaan | Dosis |
|---|---|
| Leukemia akut | 30 mg/m2/mgg IV perlahan atau 60–90 mg/m2/3 mgg |
| Dosis total maks | 500 mg/m2 |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 81, tertulis "Daunorubicin")

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 30 mg/m2/dosis tiap minggu iv | D | 100% | 100% | 100% | tak ada data | tak ada data |

**Sediaan** (FORNAS 2025 hlm. 81; antikanker)

Restriksi FORNAS: untuk leukemia akut.

| Sediaan | Peresepan maksimal |
|---|---|
| Injeksi 20 mg | – |

**Aturan penggunaan**

- Sesuai tabel IDAI.
- Harus diberikan ke dalam infus IV yang mengalir cepat; tidak boleh diberikan IM atau SC (label daunorubisin).

**Manfaat obat** (label daunorubisin)

- Induksi remisi leukemia nonlimfositik akut (mielogenik, monositik, eritroid) pada dewasa dan leukemia limfositik akut pada anak dan dewasa, dalam kombinasi dengan kemoterapi lain.

**Efek samping** (label daunorubisin)

- Toksisitas pembatas dosis: mielosupresi dan kardiotoksisitas.
- Alopesia reversibel pada sebagian besar pasien; mual dan muntah akut, biasanya ringan; mukositis 3–7 hari setelah pemberian; kadang diare dan nyeri perut.
- Ekstravasasi dapat menimbulkan nekrosis jaringan lokal berat, selulitis berat, tromboflebitis, atau indurasi yang nyeri.

**Peringatan** (label daunorubisin)

- Peringatan berbingkai: nekrosis jaringan lokal berat bila terjadi ekstravasasi; toksisitas miokard (gagal jantung kongestif) yang lebih sering bila dosis kumulatif melebihi 400–550 mg/m² pada dewasa, 300 mg/m² pada anak di atas 2 tahun, atau 10 mg/kg pada anak di bawah 2 tahun; mielosupresi berat.
- Kontraindikasi: hipersensitivitas terhadap daunorubisin.
- Pada anak, kardiotoksisitas dapat terjadi lebih sering dan pada dosis kumulatif lebih rendah.

**Farmakokinetik** (label daunorubisin)

- Terdistribusi cepat dan luas ke jaringan; kadar tertinggi di limpa, ginjal, hati, paru, dan jantung; menembus plasenta.
- Waktu paruh fase awal 45 menit dan fase terminal 18,5 jam; metabolit aktif daunorubisinol mempunyai waktu paruh 26,7 jam.
- Dimetabolisme luas di hati dan jaringan lain; 25% dosis diekskresi dalam bentuk aktif melalui urin dan sekitar 40% melalui empedu.

**Farmakodinamik** (label daunorubisin)

- Berinterkalasi di antara pasangan basa DNA dan menghambat topoisomerase II dengan menstabilkan kompleks DNA-topoisomerase II, sehingga terjadi pemutusan untai tunggal dan ganda DNA.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Daunorubicin Hydrochloride Injection (Hikma), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=227784a8-ce68-4dd4-8ac5-a65265969677

### 3.114 Karboplatin

**Kalkulator** (IDAI hlm. 57; dosis per luas permukaan tubuh)

| Rute | Dosis |
|---|---|
| IV | 300–600 mg/m2, setiap 4 minggu |

**Sediaan** (FORNAS 2025 hlm. 94; antikanker)

| Sediaan | Peresepan maksimal |
|---|---|
| Injeksi 10 mg/mL | AUC (*Area Under the Curve*) 5–6 setiap 3 minggu |

**Aturan penggunaan**

- Sesuai tabel IDAI dan FORNAS.
- Siklus berikutnya umumnya tidak diulang sebelum hitung leukosit, neutrofil, dan trombosit pulih (label karboplatin).

**Manfaat obat** (label karboplatin)

- Terapi awal karsinoma ovarium lanjut dalam kombinasi dengan kemoterapi lain, dan terapi paliatif karsinoma ovarium rekuren.

**Efek samping** (label karboplatin)

- Supresi sumsum tulang (trombositopenia, neutropenia, leukopenia, anemia), mual dan muntah, neuropati perifer, ototoksisitas, gangguan elektrolit (terutama magnesium), peningkatan enzim hati, nyeri, astenia, dan alopesia.

**Peringatan** (label karboplatin)

- Peringatan berbingkai: diberikan di bawah pengawasan dokter berpengalaman; supresi sumsum tulang terkait dosis yang dapat berat; muntah; reaksi menyerupai anafilaksis dapat terjadi dalam beberapa menit setelah pemberian.
- Kontraindikasi: riwayat alergi berat terhadap sisplatin atau senyawa platinum lain; depresi sumsum tulang berat atau perdarahan bermakna.
- Supresi sumsum tulang meningkat pada gangguan fungsi ginjal; gangguan pendengaran bermakna klinis pernah dilaporkan pada anak yang menerima dosis lebih tinggi dari anjuran bersama obat ototoksik lain.
- Keamanan dan efektivitas pada anak belum ditetapkan.

**Farmakokinetik** (label karboplatin)

- Waktu paruh plasma awal 1,1–2 jam dan pascadistribusi 2,6–5,9 jam; tidak terikat protein plasma.
- Platinum dari karboplatin terikat ireversibel pada protein plasma dan dieliminasi lambat (waktu paruh minimal 5 hari); jalur eliminasi utama adalah ekskresi ginjal.

**Farmakodinamik** (label karboplatin)

- Membentuk ikatan silang (*cross-link*) antaruntai DNA; efeknya tidak spesifik terhadap siklus sel.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Carboplatin Injection (Natco Pharma), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4c89cedc-e48b-445c-ad05-54dbe60e4fb0

### 3.115 Etoposid

**Kalkulator** (IDAI hlm. 50; dosis per luas permukaan tubuh)

| Rute | Dosis |
|---|---|
| IV | 50–60 mg/m2 IV dalam 1 jam, 1x/hari selama 5 hari, ulangi setelah 2–4 minggu |
| Oral | Dosis oral 2–3 kali dosis IV |

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 82, tertulis "Etoposide")

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 50–60 mg/m2/dosis q24 jam iv | D | 100% | 75% | 50% | tak ada | tak ada data |

**Sediaan** (FORNAS 2025 hlm. 78–79; antikanker)

Restriksi FORNAS: untuk kanker testis, *Small Cell Lung Cancer*, limfoma maligna, retinoblastoma.

| Sediaan | Peresepan maksimal |
|---|---|
| Injeksi 20 mg/mL | 100 mg/m²/hari, selama 3–5 hari |

**Aturan penggunaan**

- Sesuai tabel IDAI dan FORNAS.
- Berikan sebagai infus IV lambat selama 30–60 menit untuk mencegah hipotensi; harus diencerkan sebelum infus (label etoposid).

**Manfaat obat** (label etoposid)

- Tumor testis refrakter (kombinasi) dan terapi lini pertama kanker paru sel kecil (kombinasi).

**Efek samping** (label etoposid)

- Mielosupresi terkait dosis dan pembatas dosis (nadir granulosit hari 7–14, trombosit hari 9–16).
- Mual dan muntah (umumnya ringan sampai sedang), mukositis/esofagitis; alopesia reversibel hingga 66% pasien.
- Hipotensi sementara pada pemberian IV cepat (1–2%); reaksi menyerupai anafilaksis 0,7–2% pada pemberian IV.

**Peringatan** (label etoposid)

- Peringatan berbingkai: diberikan di bawah pengawasan dokter berpengalaman; mielosupresi berat dengan infeksi atau perdarahan dapat terjadi.
- Kontraindikasi: hipersensitivitas terhadap etoposid atau komponen sediaan.
- Tunda terapi bila trombosit <50.000/mm³ atau hitung neutrofil absolut <500/mm³.
- Angka reaksi menyerupai anafilaksis lebih tinggi pada anak yang menerima infus dengan konsentrasi lebih tinggi dari anjuran.
- Mengandung polisorbat 80; keamanan dan efektivitas pada anak belum ditetapkan.

**Farmakokinetik** (label etoposid)

- Waktu paruh distribusi sekitar 1,5 jam dan waktu paruh eliminasi terminal 4–11 jam; tidak terakumulasi pada pemberian harian 100 mg/m² selama 4–5 hari.
- Terikat protein plasma 97%; masuk ke cairan serebrospinal dalam jumlah kecil.
- Pada anak terdapat hubungan terbalik antara kadar albumin plasma dan klirens ginjal etoposid.

**Farmakodinamik** (label etoposid)

- Bekerja terutama pada fase G2 siklus sel; menimbulkan pemutusan untai DNA melalui interaksi dengan DNA topoisomerase II atau pembentukan radikal bebas.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Etoposide Injection, USP (Fresenius Kabi), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=fe870629-104d-4d67-a7c6-f53bc588121e

### 3.116 Daktinomisin

**Kalkulator** (IDAI hlm. 45)

| Keadaan | Dosis |
|---|---|
| <1 thn | 25 mcg/kg, setiap 3 minggu, IV |
| >1 thn | 45 mcg/kg, setiap 3 minggu, IV |

**Sediaan** (FORNAS 2025 hlm. 81; antikanker)

Restriksi FORNAS: dapat diberikan pada salah satu kondisi berikut: a) untuk tumor Wilms, rabdomiosarkoma pada anak, sarkoma Ewings, kanker testis non seminoma metastatik; b) untuk neoplasia trofoblastik gestasional; c) untuk *soft tissue sarcoma*, kecuali leiomyosarcoma dan angiosarcoma.

| Sediaan | Peresepan maksimal |
|---|---|
| Injeksi 0,5 mg (i.v.) | 12x pemberian |

**Aturan penggunaan**

- Sesuai tabel IDAI dan FORNAS.
- Ekstravasasi dapat menimbulkan cedera jaringan lokal berat; bila terjadi, hentikan injeksi atau infus segera (label daktinomisin).
- Turunkan dosis 50% selama radiasi bersamaan (label daktinomisin).

**Manfaat obat** (label daktinomisin)

- Pada dewasa dan anak, sebagai bagian regimen kemoterapi kombinasi multifase: tumor Wilms, rabdomiosarkoma, sarkoma Ewing, dan kanker testis nonseminoma metastatik.
- Neoplasia trofoblastik gestasional pada pasien pascamenarke.

**Efek samping** (label daktinomisin)

- Tersering: infeksi, alopesia, ruam, disfagia, kelelahan, demam, mual, muntah, anemia, neutropenia, trombositopenia, mukositis, dan hepatotoksisitas.

**Peringatan** (label daktinomisin)

- Kontraindikasi: tidak ada.
- Keganasan sekunder termasuk leukemia.
- Penyakit veno-oklusif hati berat dan fatal; faktor risiko meliputi usia di bawah 4 tahun atau radioterapi bersamaan.
- Mielosupresi berat dan fatal (nadir neutrofil hari 14–21); reaksi mukokutan berat (SJS/TEN); toksisitas ginjal; hepatotoksisitas.
- Vaksin virus hidup tidak dianjurkan sebelum atau selama terapi; potensiasi toksisitas radiasi dan *radiation recall*; toksisitas embrio-janin.

**Farmakokinetik** (label daktinomisin)

- Terkonsentrasi di sel berinti dan tidak menembus sawar darah-otak.
- Sekitar 30% dosis ditemukan dalam urin dan feses dalam satu minggu.
- Pada pasien usia ≤21 tahun, klirens sistemik cenderung meningkat seiring bertambahnya berat badan.

**Farmakodinamik** (label daktinomisin)

- Aktinomisin sitotoksik yang berikatan dengan DNA dan menghambat sintesis RNA.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Dactinomycin for Injection (XGen Pharmaceuticals DJB), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=efe03d73-eb11-45ff-a3cb-09a540ed352f

### 3.117 Kolestiramin

**Kalkulator** (IDAI hlm. 58; 1x/hari, oral)

| Usia | Dosis |
|---|---|
| <6 thn | 1 gram |
| 6–12 thn | 2–4 gram |
| >12 thn | 4 gram |

**Sediaan** (FORNAS 2025 hlm. 165)

| Sediaan | Peresepan maksimal |
|---|---|
| Serbuk 4 g | – |

**Aturan penggunaan**

- Sesuai tabel IDAI.
- Pada pasien dengan konstipasi, dosis dinaikkan bertahap untuk mengurangi risiko impaksi feses (label Questran).

**Manfaat obat** (label Questran)

- Terapi tambahan diet untuk menurunkan kolesterol serum yang tinggi pada hiperkolesterolemia primer (kolesterol LDL tinggi).
- Meredakan pruritus akibat obstruksi bilier parsial.

**Efek samping** (label Questran)

- Tersering: konstipasi.
- Lebih jarang: nyeri/rasa tidak nyaman perut, flatulensi, mual, muntah, diare, sendawa, anoreksia, steatorea, kecenderungan perdarahan akibat defisiensi vitamin K, defisiensi vitamin A dan D, asidosis hiperkloremik pada anak, osteoporosis, ruam, serta iritasi kulit, lidah, dan perianal.
- Laporan jarang obstruksi usus, termasuk dua kematian, pada pasien anak.

**Peringatan** (label Questran)

- Kontraindikasi: obstruksi bilier total ketika empedu tidak disekresi ke usus; hipersensitivitas terhadap komponennya.
- Penggunaan kronik dapat meningkatkan kecenderungan perdarahan akibat hipoprotrombinemia (defisiensi vitamin K) serta menurunkan kadar folat serum/sel darah merah.
- Dapat menimbulkan asidosis hiperkloremik, terutama pada pasien yang lebih muda dan lebih kecil.
- Dapat menimbulkan atau memperburuk konstipasi.

**Farmakokinetik** (label Questran)

- Resin tidak diserap; kompleks resin-asam empedu yang tidak larut diekskresi melalui feses.

**Farmakodinamik** (label Questran)

- Mengikat asam empedu di usus sehingga sirkulasi enterohepatik terputus; oksidasi kolesterol menjadi asam empedu meningkat dan kadar kolesterol LDL serta kolesterol serum menurun.

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Questran Powder for Oral Suspension (Par Health), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=362ddd91-a63f-4ec6-841a-75785dd208c8

### 3.118 Mometason Furoat

**Kalkulator** (IDAI hlm. 64)

| Sediaan | Dosis |
|---|---|
| Spray 50 mcg (2–12 thn) | 1 semprot/lubang hidung |
| Spray 50 mcg (>12 thn) | 2 semprot/lubang hidung |
| Krim atau salep 0.1% | oles/hari |

**Sediaan** (FORNAS 2025 hlm. 169 dan 213–214)

Restriksi FORNAS (semprot hidung): untuk pasien dengan salah satu indikasi berikut: a) rhinitis alergi (*seasonal* dan *perennial*); b) polip nasal; c) rhinosinusitis.

| Sediaan | Peresepan maksimal |
|---|---|
| Krim 0,1% | – |
| Salep 0,1% | – |
| Semprot hidung 50 mcg | – |

**Aturan penggunaan**

- Sesuai tabel IDAI.
- Titrasi ke dosis terendah yang efektif mengendalikan gejala untuk mengurangi efek sistemik; pantau pertumbuhan anak secara rutin (label mometason semprot hidung).

**Manfaat obat** (label mometason semprot hidung)

- Profilaksis gejala hidung rinitis alergi musiman pada dewasa dan anak usia 12 tahun ke atas.
- Rinosinusitis kronik dengan polip hidung pada dewasa usia 18 tahun ke atas.

**Efek samping** (label mometason semprot hidung)

- Pada uji rinitis alergi (usia ≥12 tahun): sakit kepala 26%, infeksi virus 14%, faringitis 12%, epistaksis/lendir bercampur darah 11%, batuk 7%.

**Peringatan** (label mometason semprot hidung)

- Kontraindikasi: hipersensitivitas terhadap mometason furoat atau bahan lain dalam sediaan.
- Efek lokal hidung: epistaksis, infeksi *Candida*, perforasi septum; jangan digunakan sebelum ulkus septum, bedah, atau trauma hidung sembuh.
- Glaukoma dan katarak; reaksi hipersensitivitas termasuk mengi.
- Imunosupresi dan risiko infeksi (cacar air, campak); hiperkortisisme dan supresi adrenal pada dosis di atas anjuran.
- Dapat menurunkan kecepatan pertumbuhan pada anak.

**Farmakokinetik** (label mometason semprot hidung)

- Bioavailabilitas sistemik semprot hidung sangat rendah (<1%); ikatan protein in vitro 98–99%.
- Waktu paruh eliminasi efektif setelah pemberian IV 5,8 jam; obat yang terserap diekskresi sebagai metabolit terutama melalui empedu dan sebagian kecil melalui urin.

**Farmakodinamik** (label mometason semprot hidung)

- Kortikosteroid dengan efek antiinflamasi kuat; bekerja pada berbagai sel (sel mast, eosinofil, neutrofil, makrofag, limfosit) dan mediator inflamasi (histamin, eikosanoid, leukotrien, sitokin).

**Daftar pustaka**

1. Satuan Tugas Farmasi Pediatri IDAI. *Buku Saku Dosis Obat Pediatri.* Jakarta: Ikatan Dokter Anak Indonesia; 2016. https://www.idai.or.id
2. Kementerian Kesehatan RI. *KMK Nomor HK.01.07/MENKES/1199/2025 tentang Formularium Nasional.* 2025. https://farmalkes.kemkes.go.id/en/unduh/keputusan-menteri-kesehatan-republik-indonesia-nomor-hk-01-07-menkes-1199-2025-tentang-formularium-nasional/
3. Mometasone Furoate Nasal Spray (Amneal), label DailyMed. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ff41e901-5a6f-4ad5-be8a-a68eae787e5e
