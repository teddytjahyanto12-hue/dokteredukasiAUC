// Pembahasan & materi kalkulator hasil keputusan pemilik 12 Okt 2026 (khusus server).
import type { CalcContent } from "./registry";

const PNPK_HT = "https://keslan.kemkes.go.id/unduhan/fileunduhan1780387327_362636.pdf";
const JUKNIS_TB = "https://p2.kemkes.go.id/wp-content/uploads/2025/12/Buku-Petunjuk-Teknis-Penatalaksanaan-Tuberkulosis-Sensitif-Obat-di-Indonesia_FINAL.pdf";

export const CONTENT_TAMBAHAN: Record<string, CalcContent> = {
  imunisasi: {
    interpretation: [
      "Kalkulator menampilkan isi satu kolom usia pada tabel Jadwal Imunisasi Anak Usia 0–18 Tahun Rekomendasi IDAI 2024: imunisasi primer, booster, kejar (catch-up), di daerah endemis, dan untuk anak risiko tinggi.",
      "Cara membaca kolom menurut tabel: kolom '2 bulan' berarti mulai usia 2 bulan (60 hari) sampai 2 bulan 29 hari (89 hari).",
    ],
    material: [
      { heading: "Hepatitis B dan polio", body: "Vaksin HB diberikan sebelum 24 jam setelah lahir dan setelah vitamin K1 bila berat lahir ≥2000 g; bila <2000 g dan ibu HBsAg negatif, pada usia 1 bulan atau saat pulang dari fasilitas kesehatan. Bayi dari ibu HBsAg positif mendapat HB dan HBIg di paha berbeda dalam 24 jam. Polio: bOPV saat pulang, 3 dosis bOPV usia 2, 3, 4 bulan, dan sedikitnya 2 kali IPV (usia 4 dan 9 bulan)." },
      { heading: "PCV dan rotavirus", body: "IDAI: PCV primer usia 2, 4, 6 bulan dan booster 12–15 bulan (3p+1); program nasional memakai 2, 3, dan 12 bulan (2p+1). Rotavirus pentavalen 3 dosis usia 6–12 pekan, jarak 4–10 pekan, dosis ketiga maksimal usia 32 pekan; monovalen 2 dosis usia 6–12 pekan, jarak minimal 4 pekan, maksimal usia 24 pekan." },
      { heading: "Influenza dan MR/MMR", body: "Influenza mulai usia 6 bulan; anak <9 tahun mendapat 2 dosis primer berjarak 4 pekan, ≥9 tahun cukup 1 dosis, lalu diulang setahun sekali. MR usia 9 bulan, dosis kedua MR/MMR usia 15–18 bulan, dosis ketiga melalui BIAS SD kelas 1 atau usia 5–7 tahun." },
      { heading: "Program BIAS", body: "DTP: booster usia 18 bulan, 5–7 tahun, dan 10–18 tahun atau mengikuti BIAS (kelas 1 DT/DTPa, kelas 2 dan 5 Td/Tdap); Td booster setiap 10 tahun." },
    ],
    pitfalls: [
      "Kolom kuning (kejar) berlaku bila imunisasi belum diberikan, bukan untuk semua anak.",
      "Rotavirus memiliki batas usia maksimal pemberian.",
      "Jadwal IDAI dapat berbeda dari jadwal program nasional (mis. PCV 2p+1).",
    ],
    cases: [
      { title: "Kasus 1", scenario: "Bayi usia 2 bulan 10 hari, imunisasi lahir lengkap.", answer: "HB 1, polio 1, DTP 1, Hib 1, PCV 1, rotavirus 1", explanation: "Kolom 2 bulan pada tabel IDAI 2024." },
      { title: "Kasus 2", scenario: "Anak usia 9 bulan tinggal di Bali.", answer: "MR, influenza, dan JE dosis 1", explanation: "JE pada kolom 9 bulan berlaku di daerah endemis." },
    ],
    sources: [
      { label: "Kaswandani N dkk (Satgas Imunisasi IDAI). Jadwal Imunisasi Anak Usia 0–18 Tahun Rekomendasi Ikatan Dokter Anak Indonesia Tahun 2024. Sari Pediatri 2025;26(5):328-36, tabel hal. 335.", url: "https://saripediatri.org/index.php/sari-pediatri/article/view/2843" },
    ],
  },
  kpsp: {
    interpretation: [
      "Jumlah jawaban 'Ya' 9 atau 10: perkembangan sesuai tahapannya (S). 7 atau 8: meragukan (M). 6 atau kurang: ada kemungkinan penyimpangan (P).",
      "Umur dihitung dari selisih tanggal pemeriksaan dan tanggal lahir. Sisa ≥16 hari dibulatkan ke atas menjadi 1 bulan (contoh buku: 3 bulan 16 hari menjadi 4 bulan). Bila umur tidak sama dengan kelompok umur formulir, pakai formulir umur lebih muda yang terdekat.",
      "Anak <2 tahun yang lahir pada usia kehamilan <38 minggu memakai umur koreksi: umur dikurangi (40 − usia kehamilan) minggu.",
    ],
    material: [
      { heading: "Formulir dan jadwal", body: "Formulir KPSP tersedia untuk umur 3, 6, 9, 12, 15, 18, 21, 24, 30, 36, 42, 48, 54, 60, 66, dan 72 bulan; sasaran anak 3–72 bulan. Jadwal skrining rutin pada umur 6, 9, 18, 24, 36, 48, 60, dan 72 bulan. Bila orang tua datang dengan keluhan di luar umur skrining, pakai KPSP umur skrining yang lebih muda." },
      { heading: "Cara bertanya", body: "Tanyakan satu per satu berurutan; setiap pertanyaan hanya dijawab 'Ya' atau 'Tidak'. 'Ya' bila anak bisa, pernah, sering, atau kadang-kadang melakukannya; 'Tidak' bila belum pernah, tidak pernah, atau ibu/pengasuh tidak tahu. Rinci jawaban 'Tidak' menurut aspek gerak kasar, gerak halus, bicara dan bahasa, serta sosialisasi dan kemandirian." },
      { heading: "Tindak lanjut", body: "S: puji, edukasi stimulasi, skrining ulang tiap 3 bulan (<24 bulan) atau 6 bulan (24–72 bulan). M: stimulasi dan intervensi dini pada aspek yang tertinggal, cari penyakit penyebab, evaluasi ulang setelah 2 minggu; bila tetap M setelah evaluasi kedua tanpa kemajuan, rujuk. P: rujuk ke rumah sakit dengan menuliskan jenis dan jumlah penyimpangan." },
      { heading: "Formulir resmi", body: "Kalkulator ini tidak memuat butir pertanyaan KPSP. Pakai formulir KPSP pada Buku Bagan SDIDTK sesuai umur yang ditampilkan, lalu masukkan jumlah jawaban 'Ya'." },
    ],
    pitfalls: [
      "Umur 3 bulan 16 hari dibulatkan menjadi 4 bulan, tetapi formulir yang dipakai tetap 3 bulan.",
      "Umur koreksi prematur hanya dipakai sampai umur 2 tahun.",
      "'Tidak tahu' dihitung sebagai jawaban 'Tidak'.",
    ],
    cases: [
      { title: "Kasus 1", scenario: "Lahir 10 Januari 2024, diperiksa 1 Oktober 2024; 8 jawaban 'Ya'.", answer: "Formulir 9 bulan; meragukan (M)", explanation: "Umur 8 bulan 21 hari dibulatkan menjadi 9 bulan; 8 jawaban 'Ya' = M." },
      { title: "Kasus 2", scenario: "Lahir 1 Januari 2025 pada 32 minggu, diperiksa 10 Juni 2025; 5 jawaban 'Ya'.", answer: "Formulir 3 bulan; kemungkinan penyimpangan (P)", explanation: "Umur 5 bulan 9 hari dikurangi 8 minggu (2 bulan) = 3 bulan 9 hari." },
    ],
    sources: [
      { label: "Kementerian Kesehatan RI. Pedoman Pelaksanaan Stimulasi, Deteksi, dan Intervensi Dini Tumbuh Kembang Anak di Tingkat Pelayanan Kesehatan Dasar (revisi 23 Agustus 2022): perhitungan umur dan umur koreksi (hal. 117), KPSP, interpretasi, dan intervensi (hal. 117–120).", url: "https://pdfcoffee.com/buku-pedoman-sdidtk-revisi-23082022-pdf-free.html", note: "PDF dari pemilik; salinan resmi Kemenkes tidak ditemukan daring" },
      { label: "Kementerian Kesehatan RI. Buku Bagan SDIDTK (revisi 22 Agustus 2022): formulir KPSP per umur.", url: "https://apgpaud.org/wp-content/uploads/2023/02/BUKU-BAGAN-SDIDTK-revisi-22082022.pdf" },
    ],
  },
  asma: {
    interpretation: [
      "Tabel 10.3 PPK FKTP 2022 membagi asma bronkial dewasa menjadi intermiten, persisten ringan, persisten sedang, dan persisten berat berdasarkan gejala siang, gejala malam, dan faal paru (APE atau VEP1 serta variabilitas APE).",
      "Intermiten: gejala <1 kali/minggu, malam ≤2 kali sebulan, APE ≥80%, variabilitas <20%. Persisten ringan: >1 kali/minggu tetapi <1 kali/hari, malam >2 kali sebulan, APE ≥80%, variabilitas 20–30%. Persisten sedang: gejala harian, malam >1 kali seminggu, APE 60–80%, variabilitas >30%. Persisten berat: gejala kontinyu, malam sering, APE ≤60%, variabilitas >30%.",
      "Kalkulator memakai komponen dengan derajat paling berat sebagai derajat akhir; aturan ini ditambahkan penyusun karena tabel tidak menuliskan cara menggabungkan komponen.",
    ],
    material: [
      { heading: "Diagnosis", body: "PPK FKTP 2022: diagnosis ditegakkan dari anamnesis, pemeriksaan fisik, dan pemeriksaan penunjang, yaitu kenaikan rasio APE ≥15% sebelum dan sesudah inhalasi salbutamol. Gejala khas: lebih dari satu gejala (mengi, sesak, dada berat), memburuk malam atau dini hari, bervariasi, dan dipicu infeksi virus, latihan, alergen, perubahan cuaca, atau iritan." },
      { heading: "Pemeriksaan fisik", body: "Pemeriksaan fisik sering normal; temuan tersering adalah mengi ekspirasi. Mengi dapat tidak terdengar pada eksaserbasi berat (silent chest)." },
      { heading: "Spirometri", body: "Bila spirometri tersedia, penilaian faal paru memakai VEP1." },
    ],
    pitfalls: [
      "Variabilitas APE >30% tercantum pada persisten sedang dan berat.",
      "Klasifikasi derajat berbeda dengan penilaian kontrol asma (Tabel 10.4).",
      "Mengi yang tidak terdengar pada sesak berat bisa berarti silent chest, bukan perbaikan.",
    ],
    cases: [
      { title: "Kasus 1", scenario: "Gejala 2–3 kali/minggu, terbangun malam 3 kali sebulan, APE 85%, variabilitas 25%.", answer: "Persisten ringan", explanation: "Semua komponen sesuai persisten ringan." },
      { title: "Kasus 2", scenario: "Gejala mingguan, malam jarang, APE 70%.", answer: "Persisten sedang", explanation: "Komponen faal paru (60–80%) paling berat." },
    ],
    sources: [
      { label: "Kementerian Kesehatan RI. KMK HK.01.07/MENKES/1186/2022 tentang Panduan Praktik Klinis bagi Dokter di Fasilitas Pelayanan Kesehatan Tingkat Pertama: Asma Bronkial (Asma Stabil), Tabel 10.3 (hal. 447–448). KMK 1936/2022 (perubahan) tidak mengubah bab ini.", url: "https://www.komunitasbelajar.id/p/kmk-nomor-hk0107menkes11862022-tentang.html", note: "PDF dari pemilik; naskah resmi regulasi.bkpk.kemkes.go.id tidak dapat dijangkau" },
    ],
  },
  "asma-kontrol": {
    interpretation: [
      "Tabel 10.4 PPK FKTP 2022, penilaian klinis 4 minggu terakhir: gejala harian >2 kali/minggu, keterbatasan aktivitas, gejala malam/terbangun, butuh pelega >2 kali/minggu, dan fungsi paru <80% prediksi atau nilai terbaik.",
      "Terkontrol bila tidak ada gambaran tersebut; terkontrol sebagian bila terdapat gambaran; tidak terkontrol bila tiga atau lebih gambaran. Eksaserbasi pada minggu mana pun membuat asma tidak terkontrol.",
    ],
    material: [
      { heading: "Risiko masa depan", body: "Gambaran yang berhubungan dengan risiko lebih parah: kontrol klinis buruk, jumlah eksaserbasi per tahun, riwayat perawatan karena asma, pajanan asap rokok, dan penggunaan obat dosis tinggi." },
      { heading: "Tindak lanjut", body: "PPK FKTP 2022: pasien disarankan mengidentifikasi dan mengendalikan faktor pencetus; perlu perencanaan pengobatan jangka panjang dan pengobatan serangan akut sesuai Tabel 10.5." },
      { heading: "Catatan tabel", body: "Tabel menulis terkontrol sebagian sebagai 'terdapat salah satu gejala' dan tidak terkontrol sebagai 'tiga atau lebih'. Kalkulator menggolongkan dua gambaran sebagai terkontrol sebagian. Fungsi paru dinilai tanpa bronkodilator dan tidak dipakai pada anak 5 tahun atau lebih muda." },
    ],
    pitfalls: [
      "Satu eksaserbasi dalam minggu yang dinilai sudah berarti tidak terkontrol.",
      "Fungsi paru dinilai tanpa pemberian bronkodilator.",
      "Penilaian kontrol memakai periode 4 minggu terakhir.",
    ],
    cases: [
      { title: "Kasus 1", scenario: "Gejala harian 3 kali/minggu dan memakai pelega 3 kali/minggu.", answer: "Terkontrol sebagian", explanation: "Dua gambaran." },
      { title: "Kasus 2", scenario: "Gejala harian sering, terbangun malam, APE 70%.", answer: "Tidak terkontrol", explanation: "Tiga gambaran." },
    ],
    sources: [
      { label: "Kementerian Kesehatan RI. KMK HK.01.07/MENKES/1186/2022 (PPK FKTP), Tabel 10.4 Penilaian derajat kontrol asma (hal. 449).", url: "https://www.komunitasbelajar.id/p/kmk-nomor-hk0107menkes11862022-tentang.html", note: "PDF dari pemilik" },
    ],
  },
  aria: {
    interpretation: [
      "ARIA 2008 Tabel 4: intermiten bila gejala <4 hari/minggu atau <4 minggu berturut-turut; persisten bila >4 hari/minggu dan >4 minggu berturut-turut.",
      "Ringan bila tidak ada gangguan tidur, gangguan aktivitas harian/santai/olahraga, gangguan sekolah/kerja, dan gejala tidak mengganggu. Sedang-berat bila satu atau lebih dampak tersebut ada.",
    ],
    material: [
      { heading: "Hubungan dengan asma", body: "ARIA 2008 merekomendasikan pasien rinitis alergi persisten dievaluasi untuk asma melalui riwayat, pemeriksaan fisik, dan bila memungkinkan pemeriksaan obstruksi saluran napas." },
      { heading: "Saluran napas atas dan bawah", body: "ARIA 2008 juga merekomendasikan pasien asma dievaluasi untuk rinitis, dan strategi terapi gabungan untuk saluran napas atas dan bawah dipertimbangkan dari sisi efikasi dan keamanan." },
      { heading: "Istilah", body: "ARIA memperkenalkan istilah intermiten dan persisten. Klasifikasi ini tidak dapat dipertukarkan dengan istilah musiman dan perenial karena tidak mewakili kelompok penyakit yang sama." },
    ],
    pitfalls: [
      "Persisten mensyaratkan >4 hari/minggu DAN >4 minggu; intermiten cukup salah satu.",
      "Satu dampak saja sudah menggolongkan ke sedang-berat.",
      "Rinitis alergi persisten perlu dievaluasi untuk asma.",
    ],
    cases: [
      { title: "Kasus 1", scenario: "Bersin dan hidung tersumbat 2 hari/minggu, tidak mengganggu aktivitas.", answer: "Intermiten ringan", explanation: "<4 hari/minggu, tanpa dampak." },
      { title: "Kasus 2", scenario: "Gejala setiap hari selama 2 bulan, sering terbangun malam.", answer: "Persisten sedang-berat", explanation: ">4 hari/minggu dan >4 minggu; ada gangguan tidur." },
    ],
    sources: [
      { label: "Bousquet J dkk. Allergic Rhinitis and its Impact on Asthma (ARIA) 2008 update (in collaboration with the World Health Organization, GA2LEN and AllerGen). Allergy 2008;63 Suppl 86:8-160, Tabel 4 (hal. 14) dan rekomendasi 8 (hal. 11).", url: "https://doi.org/10.1111/j.1398-9995.2007.01620.x" },
    ],
  },
  ekg: {
    interpretation: [
      "Bazett membagi QT dengan akar kuadrat RR; Fridericia membagi dengan akar pangkat tiga RR. Keduanya masih bergantung pada laju jantung, terutama pada laju tinggi.",
      "AHA/ACCF/HRS 2009 menganjurkan koreksi QT dengan fungsi regresi linear, bukan Bazett, dan mencantumkan metode yang dipakai. Kalkulator memakai rumus linear Framingham: QTc = QT + 0,154 × (1 − RR), RR dalam detik.",
      "Batas praktis dewasa: QT terkoreksi memanjang bila ≥460 ms pada perempuan atau ≥450 ms pada laki-laki; memendek bila ≤390 ms.",
    ],
    material: [
      { heading: "Laju jantung dari kertas EKG", body: "Pada kecepatan kertas standar 25 mm/detik, satu kotak kecil 1 mm = 0,04 detik. Laju jantung = 60 ÷ RR (detik) = 1500 ÷ jumlah kotak kecil = 300 ÷ jumlah kotak besar." },
      { heading: "Kapan tidak dikoreksi", body: "Koreksi QT tidak dianjurkan bila variabilitas RR besar, misalnya pada fibrilasi atrium, atau bila akhir gelombang T tidak dapat ditentukan dengan andal. QT juga memanjang pada gangguan konduksi ventrikel sehingga perlu penyesuaian durasi QRS." },
      { heading: "Pemeriksaan visual", body: "Pernyataan AHA/ACCF/HRS menegaskan pemanjangan QT yang dilaporkan algoritme komputer perlu divalidasi secara visual." },
      { heading: "Cakupan", body: "Kalkulator ini menghitung laju dan QTc. Interpretasi irama, sumbu, hipertrofi, dan iskemia tidak dicakup karena batas angkanya terdapat di bagian pernyataan AHA yang belum diverifikasi (Part III, V, VI)." },
    ],
    pitfalls: [
      "Bazett mengoreksi berlebih pada laju cepat dan kurang pada laju lambat.",
      "Batas QT memanjang berbeda menurut jenis kelamin.",
      "Jangan menghitung QTc pada fibrilasi atrium dengan RR sangat bervariasi.",
    ],
    cases: [
      { title: "Kasus 1", scenario: "Laki-laki, QT 400 ms, laju 75 kali/menit.", answer: "QTc linear 431 ms: normal", explanation: "RR 0,8 detik; Bazett 447 ms, Fridericia 431 ms, linear 400 + 154 × 0,2 = 431 ms." },
      { title: "Kasus 2", scenario: "Perempuan, QT 480 ms, RR 1000 ms.", answer: "QTc 480 ms: memanjang", explanation: "Pada RR 1 detik semua rumus memberi nilai sama dengan QT; batas perempuan ≥460 ms." },
    ],
    sources: [
      { label: "Rautaharju PM dkk. AHA/ACCF/HRS Recommendations for the Standardization and Interpretation of the Electrocardiogram Part IV: The ST Segment, T and U Waves, and the QT Interval. Circulation 2009;119:e241-e250, bagian QT Correction for Rate dan batas QT memanjang/memendek.", url: "https://doi.org/10.1161/CIRCULATIONAHA.108.191096" },
      { label: "Sagie A dkk. An improved method for adjusting the QT interval for heart rate (the Framingham Heart Study). Am J Cardiol 1992;70:797-801.", url: "https://pubmed.ncbi.nlm.nih.gov/1519533/", note: "Rumus QTLC = QT + 0,154 (1 − RR)" },
      { label: "Kligfield P dkk. Recommendations for the Standardization and Interpretation of the Electrocardiogram Part I. Circulation 2007;115:1306-1324.", url: "https://doi.org/10.1161/CIRCULATIONAHA.106.180200", note: "Kecepatan kertas 25 mm/detik" },
    ],
  },
  "koreksi-natrium": {
    interpretation: [
      "Pedoman Eropa 2014 (rekomendasi 6.1): hiponatremia ringan 130–135, sedang 125–129, dan berat (profound) <125 mmol/L.",
      "Gejala berat (muntah, distres kardiorespirasi, somnolen dalam, kejang, koma GCS ≤8): NaCl 3% 150 mL dalam 20 menit, diulang dua kali atau sampai natrium naik 5 mmol/L (7.1.1). Gejala sedang (mual tanpa muntah, bingung, nyeri kepala): satu kali 150 mL, target kenaikan 5 mmol/L per 24 jam (7.2.1).",
      "Batas kenaikan: 10 mmol/L pada 24 jam pertama dan tambahan 8 mmol/L tiap 24 jam berikutnya sampai natrium 130 mmol/L (7.1.2.4, 7.2.1.6, 7.4.1.4).",
    ],
    material: [
      { heading: "Rumus Adrogué–Madias", body: "Perubahan natrium serum setelah 1 L infus = (Na infus − Na serum) ÷ (cairan tubuh total + 1). Cairan tubuh total = berat badan × 0,6 (laki-laki), 0,5 (perempuan), 0,5 (laki-laki lansia), 0,45 (perempuan lansia). Pedoman mengingatkan kenaikan nyata dapat melebihi hasil hitungan. Bila ada kalium dalam infus, kalium ikut dijumlahkan dengan natrium infus." },
      { heading: "Kandungan cairan", body: "NaCl 3% mengandung sekitar 513 mmol/L natrium dan NaCl 0,9% 154 mmol/L. Estimasi volume per 1 mmol/L di kalkulator memakai perkiraan linear dari hasil per liter." },
      { heading: "Dosis berbasis berat", body: "Pada komposisi tubuh yang sangat menyimpang, pedoman menyarankan mempertimbangkan 2 mL/kg NaCl 3% sebagai pengganti volume tetap 150 mL." },
      { heading: "Perbedaan dengan cara lama", body: "Cara lama menghitung defisit natrium sampai 140 mmol/L dengan laju 0,5–1 mmol/L per jam dapat menaikkan 12–24 mmol/L per hari, melebihi batas 10 mmol/L pada pedoman saat ini." },
    ],
    pitfalls: [
      "Batas 10 mmol/L per 24 jam adalah batas atas, bukan target.",
      "Koreksi hipokalemia ikut menaikkan natrium serum.",
      "Hiponatremia yang tidak diketahui lamanya dianggap kronik.",
    ],
    cases: [
      { title: "Kasus 1", scenario: "Laki-laki 60 kg, Na 120 mmol/L, kejang.", answer: "NaCl 3% 150 mL dalam 20 menit, ulangi sampai Na naik 5 mmol/L", explanation: "Gejala berat. Estimasi Adrogué–Madias: (513 − 120) ÷ (36 + 1) = 10,6 mmol/L per liter NaCl 3%." },
      { title: "Kasus 2", scenario: "Perempuan 50 kg, Na 128 mmol/L, bingung dan nyeri kepala.", answer: "NaCl 3% 150 mL sekali dalam 20 menit", explanation: "Gejala sedang; target kenaikan 5 mmol/L per 24 jam." },
    ],
    sources: [
      { label: "Spasovski G dkk. Clinical practice guideline on diagnosis and treatment of hyponatraemia. Eur J Endocrinol 2014;170(3):G1-G47: Tabel 5 (hal. G10), 6.1 (G17), 7.1 dan rumus Adrogué–Madias (G27–G28), 7.2 (G32), 7.4 (G33).", url: "https://doi.org/10.1530/EJE-13-1020" },
      { label: "Sahay M, Sahay R. Hyponatremia: a practical approach. Indian J Endocrinol Metab 2014;18(6):760-771.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4192979/", note: "NaCl 3% = 513 mEq/L" },
      { label: "Tzamaloukas AH dkk. Principles of management of severe hyponatremia. J Am Heart Assoc 2013;2:e005199.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3603260/", note: "NaCl 0,9% = 154 mEq/L" },
    ],
  },
  "koreksi-kalium": {
    interpretation: [
      "Kardalas dkk. (2018): kalium normal 3,5–5,0 mEq/L; hipokalemia berat dan mengancam jiwa bila <2,5 mEq/L.",
      "Tabel 3: ringan 3,0–3,4 mEq/L (kalium oral 72 mmol/hari atau IV 75 mmol/hari); sedang 2,5–2,9 mEq/L (oral 96 mmol/hari atau IV 100 mmol/hari); berat <2,5 mEq/L atau bergejala (KCl 40 mmol dalam 1 L NaCl 0,9%, kecepatan standar 10 mmol/jam, maksimum 20 mmol/jam).",
      "Jalur IV dipilih pada kalium <2,5 mEq/L atau pada mual, muntah berat, atau gangguan abdomen; kalium 2,5–3,5 mEq/L mungkin cukup diganti per oral.",
    ],
    material: [
      { heading: "Perkiraan defisit", body: "Setiap penurunan kalium serum 1 mEq/L mencerminkan defisit sekitar 200–400 mEq, tetapi perkiraan ini dapat lebih atau kurang dari defisit sebenarnya." },
      { heading: "Magnesium", body: "Lebih dari 50% hipokalemia bermakna disertai defisiensi magnesium, yang membuat hipokalemia sulit dikoreksi. Periksa dan koreksi magnesium; bila hipomagnesemia, beri MgSO4 50% 4 mL (8 mmol) dalam 10 mL NaCl 0,9% selama 20 menit sebelum infus KCl pertama." },
      { heading: "Pemantauan dan cairan", body: "EKG dianjurkan untuk semua pasien hipokalemia; pada pemberian IV pantau EKG kontinu dan kalium berkala. NaCl 0,9% adalah cairan pilihan karena glukosa 5% dapat memindahkan kalium ke dalam sel (catatan Tabel 3 sumber menyebut glukosa 5% boleh dipakai). Pada gangguan ginjal, ganti dengan sangat hati-hati." },
      { heading: "Jenis sumber", body: "Kalkulator ini memakai ulasan klinis Kardalas 2018, bukan pedoman nasional. Pedoman PAPDI tidak tersedia daring untuk diverifikasi." },
    ],
    pitfalls: [
      "Hipokalemia bergejala atau dengan perubahan EKG diperlakukan sebagai berat walau kadar ≥2,5 mEq/L.",
      "Hipomagnesemia yang tidak dikoreksi membuat kalium sulit naik.",
      "Kecepatan KCl IV maksimum 20 mmol/jam.",
    ],
    cases: [
      { title: "Kasus 1", scenario: "Kalium 3,2 mEq/L, tanpa gejala, dapat minum obat.", answer: "Kalium oral 72 mmol/hari", explanation: "Hipokalemia ringan menurut Tabel 3." },
      { title: "Kasus 2", scenario: "Kalium 2,3 mEq/L dengan kelemahan otot.", answer: "KCl 40 mmol dalam 1 L NaCl 0,9%, 10 mmol/jam", explanation: "Hipokalemia berat: jalur IV dengan EKG kontinu; periksa magnesium." },
    ],
    sources: [
      { label: "Kardalas E dkk. Hypokalemia: a clinical update. Endocr Connect 2018;7(4):R135-R146, Tabel 3 dan bagian terapi.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5881435/" },
    ],
  },
  ikterus: {
    interpretation: [
      "Ambang fototerapi diambil dari Tabel Suplemen 1 (tanpa faktor risiko neurotoksisitas selain usia gestasi) atau Tabel Suplemen 2 (dengan faktor risiko), menurut usia gestasi dan umur bayi dalam jam.",
      "Ambang transfusi tukar dari Tabel Suplemen 3 atau 4. Ambang eskalasi perawatan = ambang transfusi tukar − 2 mg/dL (KAS 17).",
      "Faktor risiko neurotoksisitas: usia gestasi <38 minggu; albumin <3,0 g/dL; penyakit hemolitik isoimun, defisiensi G6PD, atau kondisi hemolitik lain; sepsis; atau ketidakstabilan klinis bermakna dalam 24 jam terakhir.",
    ],
    material: [
      { heading: "Cara memakai TSB", body: "Pakai bilirubin serum total; jangan dikurangi bilirubin direk atau terkonjugasi. Bila bilirubin direk/terkonjugasi melebihi 50% TSB, konsultasikan ke ahli." },
      { heading: "Bayi <24 jam", body: "Bayi berumur kurang dari 24 jam dengan TSB pada atau di atas ambang fototerapi kemungkinan mengalami proses hemolitik dan perlu dievaluasi untuk penyakit hemolitik." },
      { heading: "Batas penggunaan", body: "AAP 2022 menyatakan ambangnya berbasis opini ahli dan tidak disusun untuk negara berpendapatan rendah dan menengah yang sumber daya skrining, pemantauan, dan terapinya mungkin tidak tersedia. Sesuaikan dengan pedoman dan fasilitas setempat." },
      { heading: "Setelah tabel berakhir", body: "Pada beberapa usia gestasi, tabel berhenti lebih awal karena ambang sudah tetap; catatan kaki tabel menyebut ambang sama setelah jam tersebut (mis. ≥40 minggu: 21,8 mg/dL mulai jam ke-96)." },
    ],
    pitfalls: [
      "Usia gestasi <38 minggu sudah diperhitungkan dalam tabel; jangan dicentang sebagai faktor risiko tambahan.",
      "Umur bayi dihitung dalam jam sejak lahir, bukan hari.",
      "Ambang eskalasi perawatan adalah 2 mg/dL di bawah ambang transfusi tukar.",
    ],
    cases: [
      { title: "Kasus 1", scenario: "Bayi 40 minggu, umur 48 jam, TSB 15 mg/dL, tanpa faktor risiko.", answer: "Di bawah ambang fototerapi (17,0)", explanation: "Tabel Suplemen 1 ≥40 minggu, hari 2 jam 0 = 17,0 mg/dL." },
      { title: "Kasus 2", scenario: "Bayi 36 minggu dengan inkompatibilitas ABO hemolitik, umur 72 jam, TSB 16 mg/dL.", answer: "Di atas ambang fototerapi (15,4)", explanation: "Tabel Suplemen 2, 36 minggu dengan faktor risiko, hari 3 jam 0 = 15,4 mg/dL." },
    ],
    sources: [
      { label: "Kemper AR dkk. Clinical Practice Guideline Revision: Management of Hyperbilirubinemia in the Newborn Infant 35 or More Weeks of Gestation. Pediatrics 2022;150(3):e2022058859, Gambar 2–6, KAS 10 dan 17, Tabel Suplemen 1–4.", url: "https://doi.org/10.1542/peds.2022-058859" },
    ],
  },
  "tekanan-darah-anak": {
    interpretation: [
      "AAP 2017 Tabel 3, umur 1 sampai <13 tahun: normal <P90; meningkat ≥P90 sampai <P95 atau 120/80 sampai <P95 (mana yang lebih rendah); hipertensi derajat 1 ≥P95 sampai <P95 + 12 mmHg atau 130/80 sampai 139/89 (mana yang lebih rendah); derajat 2 ≥P95 + 12 mmHg atau ≥140/90 (mana yang lebih rendah).",
      "Umur ≥13 tahun memakai ambang dewasa: normal <120/<80; meningkat 120–129/<80; derajat 1 130/80–139/89; derajat 2 ≥140/90 mmHg.",
      "Persentil diambil dari Tabel 4 (laki-laki) dan Tabel 5 (perempuan) menurut umur dan tinggi badan; sistolik dan diastolik dinilai terpisah dan kategori akhir mengikuti yang lebih tinggi.",
    ],
    material: [
      { heading: "Diagnosis", body: "AAP 2017: diagnosis hipertensi ditegakkan bila TD hasil auskultasi ≥P95 pada 3 kunjungan berbeda. Alat osilometri boleh dipakai untuk skrining; bila TD tampak tinggi, konfirmasi dengan auskultasi." },
      { heading: "Tabel skrining", body: "Tabel 6 AAP 2017 memuat nilai skrining sederhana (P90 pada persentil tinggi 5) untuk menyaring anak yang perlu evaluasi lebih lanjut, misalnya laki-laki 1 tahun 98/52 mmHg. Tabel ini hanya untuk skrining, bukan klasifikasi." },
      { heading: "ABPM", body: "ABPM dianjurkan untuk konfirmasi bila TD berada pada kategori meningkat selama 1 tahun atau lebih, atau hipertensi derajat 1 pada 3 kunjungan." },
      { heading: "Bayi <1 tahun", body: "AAP 2017 merujuk data neonatus (Dionne dkk.) dan kurva Second Task Force 1987 untuk bayi; kalkulator ini tidak mencakup umur <1 tahun." },
    ],
    pitfalls: [
      "Umur ≥13 tahun tidak memakai persentil, tetapi ambang dewasa.",
      "Ambang yang dipakai adalah yang lebih rendah antara persentil dan ambang dewasa (mis. 120/80).",
      "Satu kali pengukuran belum cukup untuk diagnosis hipertensi.",
    ],
    cases: [
      { title: "Kasus 1", scenario: "Laki-laki 8 tahun, TB 128 cm, TD 108/70 mmHg.", answer: "TD meningkat (elevated)", explanation: "Kolom tinggi terdekat 127 cm: P90 diastolik 70, sehingga diastolik 70 masuk kategori meningkat; sistolik di bawah P90 109." },
      { title: "Kasus 2", scenario: "Perempuan 5 tahun, TB 110 cm, TD 118/60 mmHg.", answer: "Hipertensi derajat 1", explanation: "Kolom 111,5 cm: sistolik P95 110 dan P95 + 12 = 122; 118 berada di antaranya." },
    ],
    sources: [
      { label: "Flynn JT dkk. Clinical Practice Guideline for Screening and Management of High Blood Pressure in Children and Adolescents. Pediatrics 2017;140(3):e20171904, Tabel 3–6 (versi online yang sudah dikoreksi).", url: "https://publications.aap.org/pediatrics/article/140/3/e20171904/38358/Clinical-Practice-Guideline-for-Screening-and" },
      { label: "Koreksi: Pediatrics 2017;140:e20173035 dan Pediatrics 2018;142(3):e20181739 (tidak mengubah Tabel 4–5).", url: "https://doi.org/10.1542/peds.2018-1739" },
    ],
  },
  "gizi-buruk": {
    interpretation: [
      "Fase stabilisasi (Tabel 17, tanpa edema): F-75 11 ml/kgBB tiap 2 jam pada hari 1–2, 16 ml/kgBB tiap 3 jam pada hari 3–5, dan 22 ml/kgBB tiap 4 jam mulai hari 6; total 130 ml/kgBB/hari. Bila edema berat, cairan 100 ml/kgBB/hari.",
      "Fase transisi: F-75 diganti F-100 dengan volume yang sama selama 2 hari; hari ke-3 F-100 dinaikkan 10 ml per kali sampai balita tidak mampu menghabiskan (biasanya sekitar 200 ml/kgBB/hari).",
      "Fase rehabilitasi (Tabel 3): F-100 150–220 ml/kgBB/hari dibagi 6 kali, volume per kali dibulatkan ke kelipatan 5 ml.",
    ],
    material: [
      { heading: "Kebutuhan zat gizi per fase (Tabel 18)", body: "Stabilisasi: energi 80–100 kkal/kgBB/hari, protein 1–1,5 g/kgBB/hari, cairan 130 ml/kgBB/hari atau 100 ml/kgBB/hari bila edema berat. Transisi: 100–150 kkal, 2–3 g protein, 150 ml cairan per kgBB/hari. Rehabilitasi: 150–220 kkal, 4–6 g protein, 150–200 ml cairan per kgBB/hari." },
      { heading: "Tanda bahaya gagal jantung", body: "Bila napas naik 5 kali/menit dan nadi naik 25 kali/menit menetap pada 2 kali pemeriksaan berjarak 4 jam: kurangi volume menjadi 100 ml/kgBB/hari tiap dua jam, lalu naikkan bertahap 115 ml/kgBB/hari selama 24 jam, 130 ml/kgBB/hari selama 48 jam, kemudian tambah 10 ml tiap kali makan." },
      { heading: "Kenaikan berat badan", body: "Setelah fase transisi: kurang bila <5 g/kgBB/hari (perlu penilaian ulang lengkap), sedang 5–10 g/kgBB/hari, baik >10 g/kgBB/hari." },
      { heading: "Catatan Tabel 3", body: "Kalkulator memakai nilai Tabel 3 apa adanya. Pada beberapa baris, angka tabel sedikit berbeda dari hitungan 220 ml/kgBB (mis. BB 5,4 kg tertulis 1.200 ml/hari, sedangkan 220 × 5,4 = 1.188 ml)." },
    ],
    pitfalls: [
      "Tabel 17 hanya untuk balita tanpa edema.",
      "Fase stabilisasi tidak boleh melebihi 100 kkal/kgBB/hari.",
      "Pakai NGT bila balita menghabiskan F-75 kurang dari 80% dalam dua kali pemberian.",
    ],
    cases: [
      { title: "Kasus 1", scenario: "Balita 5 kg tanpa edema, hari pertama perawatan.", answer: "F-75 55 ml tiap 2 jam", explanation: "11 ml/kgBB × 5 kg; 12 kali sehari = 660 ml (sekitar 130 ml/kgBB/hari)." },
      { title: "Kasus 2", scenario: "Balita 6 kg pada fase rehabilitasi.", answer: "F-100 150–220 ml per kali, 6 kali sehari", explanation: "Tabel 3: 900–1.320 ml/hari." },
    ],
    sources: [
      { label: "Kementerian Kesehatan RI. Pedoman Pencegahan dan Tatalaksana Gizi Buruk pada Balita. Jakarta: Kemenkes; 2019 (Repositori Kemenkes, ISBN 978-602-416-525-3): Tabel 3 hal. 43, Tabel 17 hal. 60, Fase Transisi hal. 62, Tabel 18 hal. 64.", url: "https://repository.kemkes.go.id/book/186" },
    ],
  },
  "antropometri-who": {
    interpretation: [
      "Permenkes 2/2020 lampiran hal. 14: BB/U <−3 SD berat badan sangat kurang; −3 sampai <−2 SD kurang; −2 sampai +1 SD normal; >+1 SD risiko berat badan lebih.",
      "PB/U atau TB/U <−3 SD sangat pendek; −3 sampai <−2 SD pendek; −2 sampai +3 SD normal; >+3 SD tinggi.",
      "BB/PB atau BB/TB dan IMT/U (0–60 bulan): <−3 SD gizi buruk; −3 sampai <−2 SD gizi kurang; −2 sampai +1 SD gizi baik; >+1 sampai +2 SD berisiko gizi lebih; >+2 sampai +3 SD gizi lebih; >+3 SD obesitas.",
    ],
    material: [
      { heading: "Cara menghitung z-score", body: "Z-score dihitung dengan metode LMS WHO: z = [(nilai ÷ M)^L − 1] ÷ (L × S), memakai nilai L, M, S tabel WHO Child Growth Standards untuk jenis kelamin, umur (bulan), atau panjang/tinggi (per 0,1 cm). Untuk BB/U, BB/PB, BB/TB, dan IMT/U, nilai di luar ±3 SD dihitung dengan jarak antara 2 SD dan 3 SD sesuai metode WHO." },
      { heading: "Umur dan cara ukur", body: "Permenkes 2/2020: umur dihitung dalam bulan penuh. Panjang badan dipakai untuk umur 0–24 bulan (terlentang); bila diukur berdiri ditambah 0,7 cm. Tinggi badan dipakai untuk umur di atas 24 bulan (berdiri); bila diukur terlentang dikurangi 0,7 cm." },
      { heading: "Indeks mana yang dipakai", body: "BB/U tidak dipakai untuk menggolongkan anak gemuk dan perlu dikonfirmasi dengan BB/PB, BB/TB, atau IMT/U. Diagnosis gizi buruk dan gizi kurang memakai BB/PB atau BB/TB. IMT/U lebih sensitif untuk penapisan gizi lebih dan obesitas." },
      { heading: "Batas kalkulator", body: "Kalkulator ini untuk anak 0–60 bulan (WHO Child Growth Standards). Anak 5–18 tahun memakai IMT/U WHO Reference 2007 yang belum tersedia di kalkulator ini." },
    ],
    pitfalls: [
      "Anak 0–24 bulan yang diukur berdiri perlu koreksi +0,7 cm.",
      "Umur memakai bulan penuh, bukan pembulatan ke atas.",
      "Status gizi buruk ditentukan dari BB/PB atau BB/TB, bukan BB/U.",
    ],
    cases: [
      { title: "Kasus 1", scenario: "Laki-laki 30 bulan, BB 10 kg, TB 85 cm (berdiri).", answer: "BB/U kurang, TB/U pendek, BB/TB gizi baik", explanation: "Tabel WHO umur 30 bulan: BB −2 SD 10,5 kg dan −3 SD 9,4 kg; TB −2 SD 85,1 cm. BB/TB −1,95." },
      { title: "Kasus 2", scenario: "Perempuan 9 bulan, BB 6 kg, PB 66 cm (terlentang).", answer: "BB/PB −2,25: gizi kurang", explanation: "BB/PB di antara −3 dan −2 SD." },
    ],
    sources: [
      { label: "Kementerian Kesehatan RI. Peraturan Menteri Kesehatan Nomor 2 Tahun 2020 tentang Standar Antropometri Anak (Berita Negara 2020 No. 7): Pasal 4 dan lampiran hal. 12–15.", url: "https://www.peraturan.go.id/files/bn7-2020.pdf" },
      { label: "World Health Organization. WHO child growth standards: length/height-for-age, weight-for-age, weight-for-length, weight-for-height and body mass index-for-age: methods and development. Geneva: WHO; 2006, Bab 7 (hal. 301–304).", url: "https://www.who.int/publications/i/item/924154693X" },
      { label: "World Health Organization. Child growth standards: tabel z-score (L, M, S) BB/U, PB/TB/U, BB/PB, BB/TB, dan IMT/U.", url: "https://www.who.int/tools/child-growth-standards/standards", note: "Data tabel diunduh 12 Oktober 2026" },
    ],
  },
  kalori: {
    interpretation: [
      "PNPK DM 2026 hal. 20: berat badan ideal (BBI) dihitung dengan rumus Broca yang dimodifikasi, 90% × (TB − 100) kg; untuk pria dengan TB <160 cm dan wanita <150 cm, BBI = (TB − 100) kg. Normal bila BB dalam BBI ±10%, kurus bila kurang dari BBI − 10%, gemuk bila lebih dari BBI + 10%.",
      "Pada BB kurang, kebutuhan energi dihitung dengan BB aktual; pada BB normal atau lebih dengan BBI.",
      "PNPK DM 2026 hal. 21: rumus praktis 25–30 kkal/kg BB/hari untuk aktivitas rendah, 30–35 untuk aktivitas sedang, dan 35–40 untuk aktivitas tinggi, tanpa dikalikan faktor aktivitas maupun faktor stres.",
    ],
    material: [
      { heading: "BBI menurut IMT", body: "PNPK DM 2026 juga memberi cara BBI = TB (m)² × 22 kg/m². Kalkulator menampilkannya sebagai pembanding." },
      { heading: "Cara lain di PNPK", body: "Kebutuhan energi juga dapat diperkirakan dengan rumus Harris-Benedict yang dikoreksi faktor aktivitas (ringan 1,3; sedang 1,5; berat 1,7) dan faktor stres. Kalkulator ini memakai rumus praktis karena konstanta rumus perempuan pada naskah PNPK (665) berbeda dari rumus Harris-Benedict asli (655) dan belum dikonfirmasi." },
      { heading: "Ulkus diabetik", body: "Pada pasien DM dengan ulkus, PNPK DM 2026 menyebut kebutuhan energi 30–35 kkal/kg BB/hari." },
      { heading: "Perbedaan dengan cara lama", body: "Cara yang banyak beredar dari pedoman PERKENI (kalori basal 25 kkal/kg untuk wanita dan 30 kkal/kg untuk pria, lalu dikoreksi usia, aktivitas, dan berat badan) tidak dipakai di sini karena naskah PERKENI tidak dapat diakses untuk verifikasi. Kalkulator mengikuti PNPK Kemenkes 2026." },
    ],
    pitfalls: [
      "Pria <160 cm dan wanita <150 cm tidak dikalikan 90%.",
      "Pasien kurus memakai BB aktual, bukan BBI.",
      "Rumus praktis sudah mencakup aktivitas; jangan dikalikan lagi dengan faktor aktivitas.",
    ],
    cases: [
      { title: "Kasus 1", scenario: "Pria 170 cm, 70 kg, aktivitas sedang.", answer: "1.890–2.205 kkal/hari", explanation: "BBI 90% × 70 = 63 kg; BB 70 > 69,3 (gemuk) sehingga pakai BBI; 30–35 × 63." },
      { title: "Kasus 2", scenario: "Wanita 145 cm, 40 kg, aktivitas rendah.", answer: "1.000–1.200 kkal/hari", explanation: "TB <150 cm: BBI = 45 kg; BB 40 < 40,5 (kurus) sehingga pakai BB aktual; 25–30 × 40." },
    ],
    sources: [
      { label: "Kementerian Kesehatan RI. KMK HK.01.07/MENKES/302/2026 tentang Pedoman Nasional Pelayanan Klinis Tatalaksana Diabetes Melitus Tipe 2 Dewasa (ditetapkan 17 April 2026), hal. 20–22.", url: "https://keslan.kemkes.go.id/unduhan/fileunduhan1777518085_672976.pdf" },
    ],
  },
  "gangguan-dengar": {
    interpretation: [
      "WHO World Report on Hearing 2021, Tabel 1.3: derajat ditentukan dari ambang dengar rata-rata 500, 1000, 2000, dan 4000 Hz pada telinga yang lebih baik.",
      "Normal <20 dB; ringan 20 sampai <35; sedang 35 sampai <50; sedang-berat 50 sampai <65; berat 65 sampai <80; sangat berat 80 sampai <95; tuli total ≥95 dB.",
      "Unilateral: telinga yang lebih baik <20 dB dan telinga yang lebih buruk ≥35 dB.",
    ],
    material: [
      { heading: "Perubahan dari sistem lama", body: "Sistem WHO yang direvisi menurunkan batas awal gangguan dengar ringan dari 26 dB menjadi 20 dB, membagi derajat menjadi ringan sampai total, dan menambahkan kategori unilateral." },
      { heading: "Batas penggunaan", body: "WHO menyatakan klasifikasi ini untuk keperluan epidemiologis pada dewasa. Rata-rata nada murni tidak boleh menjadi satu-satunya penentu disabilitas atau pemberian alat bantu dengar dan implan koklea." },
      { heading: "Indeks Fletcher", body: "Sebagian praktik di Indonesia memakai rata-rata 3 frekuensi (indeks Fletcher). Kalkulator ini mengikuti WHO 2021 yang memakai 4 frekuensi, sehingga hasilnya dapat berbeda." },
    ],
    pitfalls: [
      "Derajat ditentukan dari telinga yang LEBIH BAIK, bukan yang lebih buruk.",
      "WHO memakai 4 frekuensi termasuk 4000 Hz.",
      "Batas ringan kini 20 dB, bukan 26 dB.",
    ],
    cases: [
      { title: "Kasus 1", scenario: "Kanan 30/35/40/45 dB; kiri 20/25/30/35 dB.", answer: "27,5 dB: ringan", explanation: "Rata-rata kiri 27,5 lebih baik daripada kanan 37,5." },
      { title: "Kasus 2", scenario: "Kanan 10/10/15/15 dB; kiri 40/45/50/55 dB.", answer: "Gangguan dengar unilateral", explanation: "Telinga lebih baik 12,5 dB (<20) dan telinga lain 47,5 dB (≥35)." },
    ],
    sources: [
      { label: "World Health Organization. World report on hearing. Geneva: WHO; 2021, Tabel 1.3 (hal. 38).", url: "https://iris.who.int/handle/10665/339913" },
    ],
  },
  bishop: {
    interpretation: [
      "Lima komponen pemeriksaan dalam: pembukaan (0–3), pendataran (0–3), penurunan kepala/station (0–3), konsistensi (0–2), dan posisi serviks (0–2). Total 0–13.",
      "NICE NG207 memakai ambang ≤6 dan >6 untuk memilih metode induksi: skor ≤6 ditawarkan dinoprostone atau misoprostol oral dosis rendah (25 mikrogram) atau dipertimbangkan metode mekanis; skor >6 ditawarkan amniotomi dan infus oksitosin.",
      "Menurut NICE NG207, skor ≥8 umumnya menandakan serviks siap berdilatasi dan peluang persalinan spontan atau respons terhadap induksi tinggi.",
    ],
    material: [
      { heading: "Asal skor", body: "Bishop (1964) menyusun skor pelvik untuk induksi elektif dari lima temuan pemeriksaan dalam. Tabel poin yang dipakai di sini sama dengan Tabel 1 pada Sinha dkk. (2024), yang merujuk skor asli Bishop." },
      { heading: "Pedoman di Indonesia", body: "PNPK induksi persalinan dari POGI tidak ditemukan dalam bentuk daring yang dapat diverifikasi. PNPK Pertumbuhan Janin Terhambat POGI 2016 memakai skor pelvik dengan batas <5 dan >5 untuk konteks berbeda (pemilihan cara persalinan pada PJT), sehingga tidak dipakai sebagai ambang umum di kalkulator ini." },
      { heading: "Penilaian ulang", body: "NICE NG207 menganjurkan menilai ulang kesejahteraan ibu dan janin serta skor Bishop pada interval yang sesuai dengan metode induksi yang dipakai." },
    ],
    pitfalls: [
      "Konsistensi dan posisi bernilai maksimal 2, bukan 3.",
      "Station −1 dan 0 sama-sama bernilai 2.",
      "Skor tidak menggantikan penilaian indikasi dan kontraindikasi induksi.",
    ],
    cases: [
      { title: "Kasus 1", scenario: "Pembukaan 1 cm, pendataran 40%, station −2, konsistensi sedang, posisi tengah.", answer: "Skor 5: serviks belum siap", explanation: "1 + 1 + 1 + 1 + 1 = 5 (≤6), sehingga NICE menganjurkan pematangan serviks farmakologis atau mekanis." },
      { title: "Kasus 2", scenario: "Pembukaan 3 cm, pendataran 60%, station 0, lunak, anterior.", answer: "Skor 10: serviks siap", explanation: "2 + 2 + 2 + 2 + 2 = 10 (>6), sehingga ditawarkan amniotomi dan infus oksitosin." },
    ],
    sources: [
      { label: "National Institute for Health and Care Excellence. Inducing labour (NICE guideline NG207), 2021: rekomendasi 1.2 dan definisi Bishop score.", url: "https://www.nice.org.uk/guidance/ng207/chapter/Recommendations" },
      { label: "Bishop EH. Pelvic scoring for elective induction. Obstet Gynecol 1964;24:266-268.", url: "https://pubmed.ncbi.nlm.nih.gov/14199536/" },
      { label: "Sinha P, Gupta M, Meena S. Comparing transvaginal ultrasound measurements of cervical length to Bishop score in predicting cesarean section following induction of labor. Cureus 2024;16(2):e54335, Tabel 1.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10945042/", note: "Tabel poin komponen Bishop" },
    ],
  },
  "cairan-dewasa": {
    interpretation: [
      "NICE CG174 1.4.1: bila pasien hanya memerlukan cairan IV rumatan, batasi resep awal pada 25–30 mL/kg/hari air, sekitar 1 mmol/kg/hari kalium, natrium, dan klorida, serta sekitar 50–100 g/hari glukosa.",
      "NICE CG174 1.4.3: pertimbangkan cairan lebih sedikit (misalnya 20–25 mL/kg/hari) pada pasien lansia atau frail, gangguan ginjal atau gagal jantung, dan malnutrisi berisiko sindrom refeeding.",
      "NICE CG174 1.4.4: resep lebih dari 2,5 L per hari meningkatkan risiko hiponatremia.",
    ],
    material: [
      { heading: "Pasien obesitas", body: "NICE CG174 1.4.2: sesuaikan resep dengan berat badan ideal, pakai volume per kg batas bawah (jarang perlu lebih dari 3 L per hari), dan minta bantuan ahli bila IMT lebih dari 40 kg/m²." },
      { heading: "Kalium", body: "Resep kalium berbasis berat badan dibulatkan ke cairan siap pakai yang tersedia. NICE menyatakan kalium tidak boleh ditambahkan ke kantong cairan IV karena berbahaya." },
      { heading: "Contoh regimen NICE", body: "NICE CG174 1.4.4 menyebut contoh 25–30 mL/kg/hari natrium klorida 0,18% dalam glukosa 4% dengan kalium 27 mmol/L pada hari pertama; regimen lain dapat dipakai untuk mencapai kebutuhan yang sama." },
      { heading: "Bedanya dengan anak", body: "Aturan Holliday-Segar (4-2-1) adalah untuk anak. Untuk dewasa, kalkulator ini memakai mL/kg/hari NICE CG174." },
    ],
    pitfalls: [
      "Ini kebutuhan rumatan saja: belum mencakup defisit, kehilangan berkelanjutan, atau resusitasi.",
      "Glukosa 50–100 g/hari hanya membatasi ketosis kelaparan, bukan memenuhi kebutuhan nutrisi.",
      "Pada obesitas, isi berat badan ideal, bukan berat badan aktual.",
    ],
    cases: [
      { title: "Kasus 1", scenario: "Dewasa 60 kg tanpa komorbid, puasa, hanya butuh rumatan.", answer: "1.500–1.800 mL/hari (63–75 mL/jam)", explanation: "25–30 mL/kg × 60 kg; Na/K/Cl sekitar 60 mmol/hari." },
      { title: "Kasus 2", scenario: "Lansia frail 50 kg dengan gagal jantung.", answer: "1.000–1.250 mL/hari", explanation: "Kelompok cairan lebih sedikit: 20–25 mL/kg × 50 kg." },
    ],
    sources: [
      { label: "National Institute for Health and Care Excellence. Intravenous fluid therapy in adults in hospital (Clinical guideline CG174), rekomendasi 1.4.1–1.4.5.", url: "https://www.nice.org.uk/guidance/cg174/chapter/Recommendations" },
    ],
  },
  alvarado: {
    interpretation: [
      "Delapan butir: nyeri berpindah (1), anoreksia (1), mual (1), nyeri tekan kuadran kanan bawah (2), nyeri lepas (1), peningkatan suhu (1), leukositosis (2), dan pergeseran ke kiri (1). Total 10.",
      "Gambar 1 Ohle dkk. (2011) membagi skor menjadi 1–4 (pulang), 5–6 (observasi/rawat), dan 7–10 (pembedahan).",
      "WSES 2020 menganjurkan skor klinis untuk menyingkirkan apendisitis dan menemukan pasien risiko menengah yang perlu pencitraan, tetapi tidak menganjurkan Alvarado untuk memastikan apendisitis pada dewasa.",
    ],
    material: [
      { heading: "Kinerja skor", body: "Tinjauan sistematis Ohle dkk. (2011) menyimpulkan ambang 5 baik untuk menyingkirkan apendisitis (sensitivitas gabungan 99%), sedangkan ambang 7 untuk memastikan diagnosis berkinerja kurang (spesifisitas keseluruhan 81%). Skor terkalibrasi baik pada laki-laki, tetapi memprediksi berlebih pada perempuan di semua strata dan pada anak di strata menengah dan tinggi." },
      { heading: "Anak", body: "WSES 2020: pada anak, Alvarado dan Pediatric Appendicitis Score berguna untuk menyingkirkan apendisitis, tetapi diagnosis tidak dianjurkan hanya berdasarkan skor klinis." },
      { heading: "Ambang laboratorium", body: "Gambar 1 Ohle 2011 dan WSES 2020 tidak mencantumkan angka batas suhu, leukosit, atau hitung jenis. Kalkulator ini mengikuti nama kriteria pada sumber tersebut; batas angka mengikuti rujukan laboratorium setempat." },
    ],
    pitfalls: [
      "Nyeri tekan kuadran kanan bawah dan leukositosis masing-masing bernilai 2.",
      "Skor tinggi bukan diagnosis pasti; kombinasikan dengan pemeriksaan klinis dan USG.",
      "Skor rendah tetap perlu edukasi tanda bahaya dan evaluasi ulang bila keluhan berlanjut.",
    ],
    cases: [
      { title: "Kasus 1", scenario: "Nyeri berpindah, anoreksia, nyeri tekan kanan bawah, leukositosis.", answer: "Skor 6: probabilitas sedang", explanation: "1 + 1 + 2 + 2 = 6, strata observasi/rawat." },
      { title: "Kasus 2", scenario: "Semua butir positif kecuali mual.", answer: "Skor 9: probabilitas tinggi", explanation: "10 − 1 = 9, strata pembedahan." },
    ],
    sources: [
      { label: "Ohle R, O'Reilly F, O'Brien KK, Fahey T, Dimitrov BD. The Alvarado score for predicting acute appendicitis: a systematic review. BMC Med 2011;9:139, Gambar 1.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3299622/" },
      { label: "Di Saverio S dkk. Diagnosis and treatment of acute appendicitis: 2020 update of the WSES Jerusalem guidelines. World J Emerg Surg 2020;15:27, Statement dan Rekomendasi 1.2–1.5.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7386163/" },
      { label: "Alvarado A. A practical score for the early diagnosis of acute appendicitis. Ann Emerg Med 1986;15:557-564.", url: "https://pubmed.ncbi.nlm.nih.gov/3963537/", note: "Artikel asli" },
    ],
  },
  dehidrasi: {
    interpretation: [
      "Bagan MTBS 2022 untuk balita sakit umur 2 bulan sampai 5 tahun: diare dehidrasi berat bila ada ≥2 tanda berikut: letargi atau tidak sadar, mata cekung, tidak bisa minum atau malas minum, cubitan kulit perut kembali sangat lambat.",
      "Diare dehidrasi ringan/sedang bila ada ≥2 tanda: rewel/mudah marah, mata cekung, haus dan minum dengan lahap, cubitan kulit perut kembali lambat.",
      "Bila tidak cukup tanda untuk kedua klasifikasi tersebut: diare tanpa dehidrasi.",
    ],
    material: [
      { heading: "Rencana Terapi A", body: "Penanganan di rumah: cairan tambahan (oralit 50–100 mL setiap buang air besar untuk umur sampai 1 tahun; 100–200 mL untuk umur 1–5 tahun), tablet zinc 10 hari berturut-turut, lanjutkan pemberian makan, dan ajari kapan harus kembali." },
      { heading: "Rencana Terapi B", body: "Oralit di klinik selama 3 jam sebanyak berat badan (kg) × 75 mL. Bila berat badan tidak diketahui, bagan memberi panduan menurut umur. Setelah 3 jam nilai ulang, klasifikasikan kembali, dan mulai beri makan." },
      { heading: "Rencana Terapi C", body: "Cairan IV segera: Ringer Laktat (atau NaCl) 100 mL/kg. Bayi (>28 hari sampai <12 bulan): 30 mL/kg dalam 1 jam lalu 70 mL/kg dalam 5 jam. Anak (12 bulan sampai 5 tahun): 30 mL/kg dalam 30 menit lalu 70 mL/kg dalam 2½ jam. Ulangi 30 mL/kg pertama sekali lagi bila nadi sangat lemah atau tidak teraba. Bila infus tidak tersedia, bagan memberi alur rujukan atau oralit lewat pipa orogastrik 20 mL/kg/jam selama 6 jam." },
    ],
    pitfalls: [
      "Mata cekung termasuk dalam kedua kelompok tanda; klasifikasi ditentukan oleh jumlah tanda di tiap kelompok.",
      "Satu tanda berat saja belum memenuhi klasifikasi berat menurut bagan; nilai ulang dengan cermat.",
      "Bila ada klasifikasi berat lain, bagan menganjurkan rujuk segera dengan ASI dan oralit selama perjalanan.",
    ],
    cases: [
      { title: "Kasus 1", scenario: "Anak 2 tahun 12 kg, rewel, mata cekung, haus, cubitan kulit kembali segera.", answer: "Dehidrasi ringan/sedang; oralit 900 mL dalam 3 jam", explanation: "3 tanda ringan/sedang; 12 × 75 = 900 mL (Rencana Terapi B)." },
      { title: "Kasus 2", scenario: "Bayi 8 bulan 7 kg, letargi, mata cekung, malas minum, cubitan kulit sangat lambat.", answer: "Dehidrasi berat; RL 210 mL dalam 1 jam lalu 490 mL dalam 5 jam", explanation: "4 tanda berat; 30 × 7 dan 70 × 7 (Rencana Terapi C bayi)." },
    ],
    sources: [
      { label: "Kementerian Kesehatan RI. Buku Bagan Manajemen Terpadu Balita Sakit (MTBS) 2022: klasifikasi diare (hal. 4) dan Rencana Terapi A, B, C (hal. 24–25). Salinan PDF di situs Puskesmas Kediri, Dinas Kesehatan Kabupaten Lombok Barat.", url: "https://puskesmaskediri-dikes.lombokbaratkab.go.id/media/KDT_2022_Bagan_MTBS_ok_rev.pdf" },
    ],
  },
  hipertensi: {
    interpretation: [
      "PNPK Tata Laksana Hipertensi Dewasa 2026 mendefinisikan hipertensi sebagai TD sistolik ≥140 mmHg dan/atau diastolik ≥90 mmHg pada pengukuran di klinik.",
      "Tabel 2 PNPK 2026 (mengutip ESC 2024) membagi tekanan darah menjadi tidak meningkat, meningkat (elevated), dan hipertensi, dengan ambang berbeda untuk TD klinik, TD rumah, dan ABPM.",
      "TD klinik: tidak meningkat <120/70; meningkat 120/70 sampai <140/90; hipertensi ≥140/90 mmHg. TD rumah dan ABPM siang: hipertensi ≥135/85; ABPM 24 jam ≥130/80; ABPM malam ≥120/70 mmHg.",
    ],
    material: [
      { heading: "Perubahan dari PNPK 2021", body: "PNPK 2021 (KMK 4634/2021) memakai kategori optimal, normal, normal-tinggi, dan hipertensi derajat 1–3. PNPK 2026 (KMK HK.01.07/MENKES/303/2026) menggantinya dan pada Tabel 2 memakai kategori ESC 2024. Teks rekomendasi Tabel 1 PNPK 2026 masih menyebut istilah lama, sehingga kalkulator ini mengikuti Tabel 2 yang memuat angka ambang." },
      { heading: "Cara mengukur yang benar", body: "Ukur setelah duduk tenang, manset sesuai ukuran lengan, lengan setinggi jantung, dan ambil rata-rata beberapa pengukuran. Pengukuran di rumah dan ABPM membantu mengenali hipertensi jas putih dan hipertensi terselubung." },
      { heading: "Skrining", body: "PNPK 2026 merekomendasikan skrining hipertensi untuk semua orang dewasa ≥18 tahun, dengan hasil pengukuran dicatat di rekam medis." },
    ],
    pitfalls: [
      "Ambang TD rumah lebih rendah (≥135/85) daripada TD klinik (≥140/90).",
      "Kategori ditentukan oleh sistolik ATAU diastolik; cukup salah satu melewati ambang.",
      "Satu kali pengukuran tinggi belum cukup untuk diagnosis; konfirmasi dengan pengukuran ulang atau di luar klinik.",
    ],
    cases: [
      { title: "Kasus 1", scenario: "TD klinik rata-rata 145/88 mmHg.", answer: "Hipertensi", explanation: "Sistolik 145 ≥140 sudah cukup walau diastolik <90." },
      { title: "Kasus 2", scenario: "TD rumah rata-rata 128/82 mmHg.", answer: "TD meningkat (elevated)", explanation: "Untuk TD rumah, meningkat 120/70 sampai <135/85; nilai ini belum mencapai 135/85." },
    ],
    sources: [
      { label: "Kementerian Kesehatan RI. KMK HK.01.07/MENKES/303/2026 tentang Pedoman Nasional Pelayanan Klinis Tata Laksana Hipertensi Dewasa (ditetapkan 17 April 2026), Tabel 1–2 hal. 9.", url: PNPK_HT },
      { label: "McEvoy JW dkk. 2024 ESC Guidelines for the management of elevated blood pressure and hypertension. Eur Heart J 2024;45:3912-4018.", url: "https://pubmed.ncbi.nlm.nih.gov/39210715/", note: "Sumber Tabel 2 PNPK 2026" },
    ],
  },
  "skor-tb-anak": {
    interpretation: [
      "Delapan parameter: kontak TB (0/2/3), uji tuberkulin atau IGRA (0/3), berat badan/status gizi (0/1/2), demam ≥2 pekan (1), batuk kronik ≥2 pekan (1), pembesaran KGB (1), pembengkakan tulang/sendi (1), dan rontgen toraks (0/1). Maksimal 13.",
      "Menurut Gambar 8 Juknis 2025: skor ≥6 = TBC terdiagnosis klinis.",
      "Skor <6 tetap TBC klinis bila ada kontak ATAU uji tuberkulin/IGRA positif DAN rontgen toraks sugestif; bila tidak, evaluasi diagnosis banding dan observasi.",
    ],
    material: [
      { heading: "Kapan skoring dipakai", body: "Juknis 2025 menempatkan TCM (tes cepat molekuler) sebagai pemeriksaan utama. Skoring dipakai bila TCM negatif atau tidak dapat dilakukan, dan tersedia rontgen toraks dan/atau uji tuberkulin/IGRA. Bila TCM positif, pasien adalah TBC terkonfirmasi bakteriologis." },
      { heading: "Gejala sugestif", body: "Alur dimulai dari anak dengan satu atau lebih gejala: batuk >2 minggu, demam >2 minggu, berat badan turun atau tidak naik dalam 2 bulan sebelumnya, atau malaise. Anak <2 tahun, dengan HIV, atau gizi buruk termasuk kelompok risiko tinggi yang langsung diperiksa TCM." },
      { heading: "Perubahan dari juknis lama", body: "Pada Tabel 14 Juknis 2025, batuk kronik dinilai bila ≥2 pekan (juknis lama ≥3 minggu), dan IGRA dapat dipakai sebagai alternatif uji tuberkulin." },
    ],
    pitfalls: [
      "Uji tuberkulin positif bernilai 3, bukan 1.",
      "Gizi buruk klinis bernilai 2; BB/TB <90% atau BB/U <80% bernilai 1.",
      "Skoring tidak dipakai bila TCM sudah positif; diagnosisnya terkonfirmasi bakteriologis.",
    ],
    cases: [
      { title: "Kasus 1", scenario: "Kontak serumah BTA positif, Mantoux 12 mm, batuk 3 minggu, rontgen normal, gizi baik.", answer: "Skor 7: TBC klinis", explanation: "Kontak terkonfirmasi 3 + tuberkulin positif 3 + batuk 1 = 7." },
      { title: "Kasus 2", scenario: "Laporan keluarga ada yang batuk lama (tidak terkonfirmasi), Mantoux negatif, BB/TB 85%, rontgen sugestif TB.", answer: "Skor 4, tetapi TBC klinis menurut alur", explanation: "Kontak 2 + gizi 1 + rontgen 1 = 4 (<6). Ada kontak dan rontgen sugestif sehingga tetap TBC klinis menurut Gambar 8." },
    ],
    sources: [
      { label: "Kementerian Kesehatan RI. Petunjuk Teknis Penatalaksanaan Tuberkulosis Sensitif Obat di Indonesia, 2025 (Kepdirjen P2 HK.02.02/C/5401/2025): Tabel 14 Sistem Skoring pada Anak (hal. 113) dan Gambar 8 Alur Diagnosis (hal. 111).", url: JUKNIS_TB },
    ],
  },
};
