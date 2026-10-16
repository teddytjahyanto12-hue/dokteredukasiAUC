# Kalkulator Dosis Obat Anak

Draf 0.9, 16 Oktober 2026 (58 obat). Materi untuk ditinjau pemilik; belum diterapkan di website.

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

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 90)

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 15–25 mg/kg/dosis q8 jam po | D | 50% | 100% | 100% | tak ada data | tak ada data |

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

**Penyesuaian dosis pada penyakit ginjal** (IDAI hlm. 90; tertulis "Spironolactione")

| Dosis normal | Dosis (D)/Interval (I) | LFG >50 | LFG 10–50 | LFG <10 | HD | PD |
|---|---|---|---|---|---|---|
| 6,25–25 mg/dosis q12 jam po | I | q6–12 jam | q6–12 jam | q8–24 jam | Tak ada data | Tak ada data |

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
| PO | 0,1–0,2 mg/kg/dosis q4 jam po | IDAI hlm. 86 (tabel ginjal, kolom dosis normal) |

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
| Injeksi 10 mg/mL (i.m./s.k./i.v.) | Infus per 24 jam |

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
| 10 mg/kg/dosis q12–24 jam po | D | 75% | 50% | 25% | dosis | tak ada data |

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
| 5–7,5 mg/kg/dosis q8 jam iv | D, I | 60–90% | 30–70% | 20–30% | dosis penuh sesudah dialisis | 15–20 mg/L/hari |

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
| IV | Tidak cocok | 20–30 mg dalam 2 dosis (maksimal 1,2cg) |

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

Catatan FORNAS:

- Direkonstitusi sesaat sebelum digunakan untuk mencegah hilangnya efikasi asam klavulanat, disimpan dalam lemari pendingin, dan digunakan tidak lebih dari 7 hari setelah direkonstitusi (hlm. 24).
- Direkonstitusi sesaat sebelum disuntikkan untuk mencegah hilangnya efikasi asam klavulanat (hlm. 25).

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
| 25 mg/kg/dosis q24 jam po | I | q24 jam | q24–36 jam | q48 jam | dosis sesudah dialisis | dosis untuk dialisis LFG <10 |

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

**Kalkulator berat badan**

| Rute | Dosis | Sumber |
|---|---|---|
| IV, PR | 0,1–0,4 mg/kg/dosis | IDAI hlm. 81 (tabel ginjal, kolom dosis normal) |

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
