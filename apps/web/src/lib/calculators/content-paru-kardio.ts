// Pembahasan & materi: Paru dan Kardiologi (khusus server).
import type { CalcContent } from "./registry";

const pm = (id: string) => `https://pubmed.ncbi.nlm.nih.gov/${id}/`;

export const CONTENT_PARU_KARDIO: Record<string, CalcContent> = {
  "curb-65": {
    interpretation: [
      "Satu poin untuk: Confusion (baru), Urea >7 mmol/L, Respiratory rate ≥30/menit, Blood pressure (sistolik <90 atau diastolik ≤60 mmHg), usia ≥65 tahun.",
      "0–1: risiko rendah, umumnya rawat jalan. 2: risiko sedang, pertimbangkan rawat inap singkat atau rawat jalan dengan pengawasan. 3–5: pneumonia berat, rawat inap; nilai kebutuhan ICU terutama skor 4–5.",
      "Keputusan tempat rawat tetap mempertimbangkan saturasi oksigen, komorbid, kondisi sosial, dan kemampuan minum obat oral.",
    ],
    material: [
      { heading: "Asal skor", body: "CURB-65 dikembangkan dan divalidasi oleh Lim dkk. (Thorax 2003) dari kohort pneumonia komunitas di Inggris, Selandia Baru, dan Belanda untuk memprediksi kematian 30 hari. Pedoman BTS memakainya untuk menentukan tempat perawatan." },
      { heading: "Versi tanpa laboratorium", body: "CRB-65 menghapus urea sehingga dapat dipakai di layanan primer: 0 risiko rendah, 1–2 pertimbangkan rujukan, 3–4 rujuk segera untuk rawat inap." },
      { heading: "Konversi urea", body: "Urea 7 mmol/L setara BUN sekitar 19–20 mg/dL. Bila laboratorium melaporkan ureum (bukan BUN) dalam mg/dL, ureum 42 mg/dL kira-kira setara urea 7 mmol/L." },
    ],
    pitfalls: [
      "Urea dalam mmol/L berbeda dengan BUN dan ureum dalam mg/dL; periksa satuan laboratorium.",
      "Kriteria TD memakai sistolik <90 ATAU diastolik ≤60.",
      "CURB-65 dikembangkan untuk pneumonia komunitas dewasa, bukan pneumonia nosokomial atau anak.",
    ],
    cases: [
      { title: "Kasus 1", scenario: "Laki-laki 72 tahun, sadar, urea 9 mmol/L, RR 24, TD 110/70.", answer: "CURB-65 = 2, risiko sedang", explanation: "Urea >7 (+1) dan usia ≥65 (+1)." },
      { title: "Kasus 2", scenario: "Perempuan 55 tahun bingung, RR 32, TD 85/50, urea 10 mmol/L.", answer: "CURB-65 = 4, pneumonia berat", explanation: "Confusion, urea, RR, dan TD masing-masing +1; nilai kebutuhan ICU." },
    ],
    sources: [
      { label: "Lim WS dkk. Defining community acquired pneumonia severity on presentation to hospital. Thorax 2003;58:377-82.", url: pm("12728155") },
      { label: "British Thoracic Society. Guidelines for the management of community acquired pneumonia in adults: update 2009. Thorax 2009;64(Suppl 3):iii1-55.", url: pm("19783532") },
    ],
  },
  "berlin-ards": {
    interpretation: [
      "ARDS ditetapkan bila keempat kriteria terpenuhi: onset ≤1 minggu, opasitas bilateral, gagal napas bukan terutama karena jantung/kelebihan cairan, dan oksigenasi diukur dengan PEEP/CPAP ≥5 cmH₂O.",
      "Derajat menurut P/F: ringan 200 < P/F ≤ 300, sedang 100 < P/F ≤ 200, berat ≤ 100.",
      "Pada ketinggian >1000 m, P/F dikoreksi dengan mengalikan PB/760.",
    ],
    material: [
      { heading: "Mengapa definisi Berlin", body: "Definisi Berlin (2012) menggantikan definisi AECC 1994: istilah acute lung injury dihapus, PEEP minimal ditambahkan, dan derajat dibagi tiga. Derajat lebih berat berkaitan dengan mortalitas yang lebih tinggi." },
      { heading: "Menyingkirkan edema hidrostatik", body: "Bila tidak ada faktor risiko ARDS yang jelas, diperlukan pemeriksaan objektif seperti ekokardiografi untuk menyingkirkan edema paru kardiogenik." },
      { heading: "Perkembangan definisi", body: "Definisi global baru (2023/2024) memperluas kriteria, antara lain mengizinkan SpO₂/FiO₂ dan high-flow nasal oxygen. Kalkulator ini mengikuti definisi Berlin 2012 yang masih menjadi rujukan utama ujian." },
    ],
    pitfalls: [
      "FiO₂ dimasukkan sebagai fraksi (0,5), bukan persen (50).",
      "Derajat sedang dan berat mensyaratkan PEEP ≥5 cmH₂O invasif; CPAP non-invasif hanya diterima untuk derajat ringan.",
      "P/F rendah karena edema paru kardiogenik bukan ARDS.",
    ],
    cases: [
      { title: "Kasus 1", scenario: "Pankreatitis hari ke-3, opasitas bilateral, ekokardiografi normal, PaO₂ 90 mmHg pada FiO₂ 0,6 dan PEEP 8.", answer: "ARDS sedang (P/F 150)", explanation: "90 ÷ 0,6 = 150, di rentang 100–200, semua kriteria terpenuhi." },
      { title: "Kasus 2", scenario: "PaO₂ 70 mmHg, FiO₂ 0,8, PEEP 12, kriteria lain terpenuhi.", answer: "ARDS berat (P/F 88)", explanation: "70 ÷ 0,8 = 87,5 ≤ 100." },
    ],
    sources: [
      { label: "ARDS Definition Task Force. Acute respiratory distress syndrome: the Berlin Definition. JAMA 2012;307:2526-33.", url: pm("22797452") },
    ],
  },
  light: {
    interpretation: [
      "Cairan pleura adalah eksudat bila memenuhi minimal satu: rasio protein pleura/serum >0,5; rasio LDH pleura/serum >0,6; LDH pleura >⅔ batas atas normal LDH serum.",
      "Sensitivitas tinggi untuk eksudat, tetapi sekitar 25% transudat (terutama gagal jantung dengan diuretik) salah digolongkan sebagai eksudat.",
      "Bila klinis transudat tetapi kriteria Light menunjukkan eksudat tipis, periksa gradien albumin serum–pleura (>1,2 g/dL mendukung transudat) atau NT-proBNP.",
    ],
    material: [
      { heading: "Mengapa membedakan", body: "Transudat (gagal jantung, sirosis, sindrom nefrotik) ditangani dengan mengobati penyebab sistemik. Eksudat (infeksi, keganasan, TB, emboli paru) memerlukan pemeriksaan lanjut: hitung jenis, glukosa, pH, sitologi, kultur, ADA." },
      { heading: "Satuan", body: "Yang dinilai adalah rasio, sehingga satuan protein boleh g/dL atau g/L asalkan sama untuk pleura dan serum. LDH pleura, LDH serum, dan batas atas normal harus dalam satuan yang sama." },
      { heading: "Petunjuk tambahan", body: "Efusi parapneumonik dengan pH <7,2 atau glukosa rendah mengarah ke efusi terkomplikasi/empiema yang memerlukan drainase." },
    ],
    pitfalls: [
      "Kriteria ketiga memakai ⅔ batas atas normal LDH serum laboratorium setempat, bukan ⅔ LDH serum pasien.",
      "Cukup satu kriteria untuk eksudat.",
      "Penggunaan diuretik dapat membuat transudat tampak eksudat.",
    ],
    cases: [
      { title: "Kasus 1", scenario: "Protein pleura 4,0 / serum 6,5 g/dL; LDH pleura 300 / serum 250 U/L; batas atas LDH 220.", answer: "Eksudat (3 kriteria)", explanation: "Rasio protein 0,62; rasio LDH 1,2; 300 > 147." },
      { title: "Kasus 2", scenario: "Protein 2,0 / 7,0; LDH 90 / 200; batas atas 220.", answer: "Transudat", explanation: "Rasio 0,29 dan 0,45; 90 < 147." },
    ],
    sources: [
      { label: "Light RW dkk. Pleural effusions: the diagnostic separation of transudates and exudates. Ann Intern Med 1972;77:507-13.", url: pm("4642731") },
      { label: "Roberts ME dkk. British Thoracic Society Guideline for pleural disease. Thorax 2023;78(Suppl 3):s1-s42.", url: "https://pubmed.ncbi.nlm.nih.gov/37433578/" },
    ],
  },
  "pf-ratio": {
    interpretation: [
      "P/F = PaO₂ (mmHg) ÷ FiO₂ (fraksi). Pada udara ruangan dengan PaO₂ normal, P/F sekitar 400–500.",
      "Rentang derajat ARDS: 201–300 ringan, 101–200 sedang, ≤100 berat, hanya bila kriteria Berlin lain terpenuhi.",
      "Pada kanul nasal atau sungkup sederhana, FiO₂ hanya perkiraan sehingga P/F juga perkiraan.",
    ],
    material: [
      { heading: "Perkiraan FiO₂", body: "Udara ruangan 21%. Kanul nasal kira-kira menambah 3–4% per L/menit (mis. 3 L/menit sekitar 32%), tetapi nilai sebenarnya bergantung pola napas. Untuk perhitungan akurat dipakai FiO₂ terukur dari ventilator atau high-flow." },
      { heading: "Satuan PaO₂", body: "Bila laboratorium melaporkan kPa, kalikan 7,5 untuk mendapatkan mmHg (8 kPa = 60 mmHg)." },
      { heading: "Pemakaian lain", body: "P/F juga menjadi komponen pernapasan pada skor SOFA (mis. <400, <300, <200 dengan dukungan napas, <100 dengan dukungan napas)." },
    ],
    pitfalls: [
      "Kalkulator ini meminta FiO₂ dalam persen; kalkulator Berlin meminta fraksi.",
      "PaO₂ dalam kPa harus dikonversi ke mmHg.",
      "P/F rendah saja tidak cukup untuk diagnosis ARDS.",
    ],
    cases: [
      { title: "Kasus 1", scenario: "PaO₂ 95 mmHg, FiO₂ 40%.", answer: "P/F 238", explanation: "95 ÷ 0,40 = 237,5." },
      { title: "Kasus 2", scenario: "PaO₂ 8 kPa pada FiO₂ 50%.", answer: "P/F 120", explanation: "8 × 7,5 = 60 mmHg; 60 ÷ 0,5 = 120." },
    ],
    sources: [
      { label: "ARDS Definition Task Force. Acute respiratory distress syndrome: the Berlin Definition. JAMA 2012;307:2526-33.", url: pm("22797452") },
    ],
  },
  nyha: {
    interpretation: [
      "NYHA menilai keterbatasan fungsional dari anamnesis: I tanpa keterbatasan, II keterbatasan ringan, III keterbatasan nyata, IV keluhan saat istirahat.",
      "Kelas NYHA dapat naik dan turun mengikuti terapi, berbeda dengan stadium ACC/AHA yang tidak turun kembali.",
      "NYHA bersifat subjektif sehingga tidak menggantikan ekokardiografi atau fraksi ejeksi.",
    ],
    material: [
      { heading: "Kegunaan", body: "NYHA dipakai untuk memantau respons terapi, menentukan indikasi beberapa terapi (mis. kriteria alat atau obat tertentu dalam pedoman), dan prognosis. Pasien NYHA III–IV memiliki mortalitas lebih tinggi." },
      { heading: "Hubungan dengan stadium ACC/AHA", body: "Kelas NYHA umumnya diberikan pada pasien stadium C atau D. Pasien stadium C yang membaik dengan terapi dapat menjadi NYHA I tetapi tetap stadium C." },
      { heading: "Cara bertanya", body: "Tanyakan aktivitas spesifik: berjalan datar, naik satu lantai, mandi, atau berpakaian, dan apa yang membatasi (sesak, lelah, berdebar)." },
    ],
    pitfalls: [
      "Jangan menurunkan stadium ACC/AHA saat kelas NYHA membaik.",
      "Kelas IV ditandai keluhan saat istirahat, bukan hanya aktivitas ringan.",
      "Bedakan sesak karena jantung dari sebab lain (paru, anemia, deconditioning).",
    ],
    cases: [
      { title: "Kasus 1", scenario: "Pasien gagal jantung sesak saat berjalan 100 m di jalan datar, nyaman saat duduk.", answer: "NYHA III", explanation: "Aktivitas lebih ringan dari biasa sudah menimbulkan sesak." },
      { title: "Kasus 2", scenario: "Sesak saat naik tangga dua lantai, aktivitas harian lain tanpa keluhan.", answer: "NYHA II", explanation: "Keterbatasan ringan pada aktivitas biasa." },
    ],
    sources: [
      { label: "American Heart Association. Classes and Stages of Heart Failure (diadaptasi dari NYHA Criteria Committee, 9th ed., 1994).", url: "https://www.heart.org/en/health-topics/heart-failure/what-is-heart-failure/classes-of-heart-failure" },
      { label: "Heidenreich PA dkk. 2022 AHA/ACC/HFSA Guideline for the Management of Heart Failure. Circulation 2022;145:e895-e1032.", url: pm("35363499") },
    ],
  },
  "cha2ds2-vasc": {
    interpretation: [
      "Skor menjumlahkan: gagal jantung (1), hipertensi (1), usia ≥75 (2) atau 65–74 (1), diabetes (1), riwayat stroke/TIA/tromboemboli (2), penyakit vaskular (1), perempuan (1). Maksimal 9.",
      "Rekomendasi ESC 2020 (skor tanpa poin jenis kelamin): 0 = tidak perlu antitrombotik; 1 = pertimbangkan antikoagulan oral; ≥2 = antikoagulan oral direkomendasikan.",
      "Skor tidak menilai risiko perdarahan; stenosis mitral sedang–berat dan katup mekanik memerlukan antikoagulan tanpa memandang skor.",
    ],
    material: [
      { heading: "Perempuan sebagai pengubah risiko", body: "Jenis kelamin perempuan menambah 1 poin tetapi lebih tepat dianggap pengubah risiko: perempuan tanpa faktor risiko lain (skor 1) memiliki risiko rendah seperti laki-laki skor 0. Karena itu ambang terapi pada perempuan bergeser 1 poin." },
      { heading: "Perkembangan ESC 2024", body: "Pedoman ESC 2024 beralih ke CHA₂DS₂-VA yang menghapus komponen jenis kelamin. Kalkulator ini mengikuti CHA₂DS₂-VASc dari ESC 2020 yang masih banyak dipakai dan diujikan." },
      { heading: "Risiko perdarahan", body: "Nilai faktor risiko perdarahan yang dapat dimodifikasi (hipertensi tidak terkontrol, obat NSAID/antiplatelet, alkohol, labilitas INR) dengan skor seperti HAS-BLED; skor perdarahan tinggi bukan alasan menghentikan antikoagulan, melainkan alasan memperbaiki faktor risiko." },
    ],
    pitfalls: [
      "Usia ≥75 bernilai 2, bukan 1; stroke/TIA juga 2.",
      "Penyakit vaskular berarti IMA lama, penyakit arteri perifer, atau plak aorta, bukan hipertensi.",
      "Pada katup mekanik atau stenosis mitral sedang–berat, skor ini tidak dipakai untuk menentukan antikoagulan.",
    ],
    cases: [
      { title: "Kasus 1", scenario: "Laki-laki 70 tahun dengan hipertensi dan AF.", answer: "Skor 2 → antikoagulan oral direkomendasikan", explanation: "Usia 65–74 (1) + hipertensi (1) = 2." },
      { title: "Kasus 2", scenario: "Perempuan 50 tahun dengan AF, tanpa faktor lain.", answer: "Skor 1 (hanya jenis kelamin) → risiko rendah", explanation: "Setara laki-laki skor 0; antitrombotik tidak direkomendasikan." },
    ],
    sources: [
      { label: "Hindricks G dkk. 2020 ESC Guidelines for the diagnosis and management of atrial fibrillation. Eur Heart J 2021;42:373-498.", url: pm("32860505") },
      { label: "Van Gelder IC dkk. 2024 ESC Guidelines for the management of atrial fibrillation. Eur Heart J 2024;45:3314-414.", url: pm("39210723"), note: "Perpindahan ke CHA₂DS₂-VA" },
    ],
  },
  "hf-stages": {
    interpretation: [
      "A: berisiko tanpa kelainan struktural dan tanpa gejala. B: kelainan struktural/fungsional atau penanda tanpa gejala (pre-heart failure). C: gejala gagal jantung sedang atau pernah ada. D: gejala berat refrakter dengan perawatan berulang meski terapi optimal.",
      "Stadium ditentukan oleh baris paling berat yang pernah terpenuhi dan tidak turun kembali.",
      "Kerangka ini mengklasifikasikan, bukan mendiagnosis: sesak tanpa kelainan jantung perlu dicari penyebab lain.",
    ],
    material: [
      { heading: "Tujuan stadium", body: "Stadium menekankan pencegahan: mengendalikan faktor risiko pada stadium A, memulai terapi yang mencegah progresi pada stadium B (mis. ACEi/ARB dan beta bloker pada EF turun), terapi pengubah prognosis pada stadium C, dan evaluasi terapi lanjut atau paliatif pada stadium D." },
      { heading: "Penanda stadium B", body: "Pedoman 2022 memasukkan peningkatan natriuretik peptida atau troponin persisten tanpa sebab lain, serta bukti tekanan pengisian meningkat, sebagai bukti stadium B." },
      { heading: "Stadium D", body: "Terapi optimal berarti obat sesuai pedoman sudah dititrasi ke dosis target atau batas toleransi. Rujukan untuk transplantasi, alat bantu ventrikel, atau paliatif sebaiknya tidak ditunda." },
    ],
    pitfalls: [
      "Pasien stadium C yang bebas gejala setelah terapi tetap stadium C.",
      "Hipertensi tanpa kelainan jantung adalah stadium A, bukan B.",
      "Kelas NYHA berbeda dari stadium ACC/AHA dan dapat naik turun.",
    ],
    cases: [
      { title: "Kasus 1", scenario: "Diabetes dan hipertensi, ekokardiografi normal, tanpa keluhan.", answer: "Stadium A", explanation: "Berisiko tanpa kelainan struktural." },
      { title: "Kasus 2", scenario: "Riwayat IMA dengan EF 35%, tidak pernah sesak.", answer: "Stadium B", explanation: "Ada kelainan fungsional tanpa gejala gagal jantung." },
    ],
    sources: [
      { label: "Heidenreich PA dkk. 2022 AHA/ACC/HFSA Guideline for the Management of Heart Failure. Circulation 2022;145:e895-e1032.", url: pm("35363499") },
    ],
  },
  killip: {
    interpretation: [
      "PNPK SKA 2026 Tabel 19: kelas I tidak terdapat ronki maupun S3; II gagal jantung dengan S3 dan ronki basah pada setengah lapangan paru; III edema paru dengan ronki basah di seluruh lapangan paru; IV syok kardiogenik (TD sistolik <90 mmHg dan tanda hipoperfusi jaringan).",
      "Mortalitas 30 hari tanpa reperfusi 6%, 17%, 38%, dan 67% untuk kelas I–IV; dengan reperfusi 2,8%, 8,8%, dan 14,4% untuk kelas I–III. Killip juga menjadi salah satu variabel skor GRACE.",
      "Bila temuan campuran, pakai kelas tertinggi yang terpenuhi dan nilai ulang bila kondisi berubah.",
    ],
    material: [
      { heading: "Asal klasifikasi", body: "Killip dan Kimball (1967) membagi pasien infark di unit perawatan koroner menjadi empat kelas berdasarkan tanda gagal jantung dan menunjukkan perbedaan mortalitas yang besar antarkelas." },
      { heading: "Pemakaian saat ini", body: "PNPK Tata Laksana Sindrom Koroner Akut 2026 (KMK HK.01.07/MENKES/876/2026, menggantikan KMK 675/2019) memakai kelas Killip untuk stratifikasi risiko mortalitas 30 hari dan sebagai variabel skor GRACE." },
      { heading: "Syok kardiogenik", body: "Kelas IV: TD sistolik <90 mmHg dengan tanda hipoperfusi jaringan. Pada SKA-NEST, PNPK 2026 memasukkan ketidakstabilan hemodinamik atau syok kardiogenik ke kriteria risiko sangat tinggi yang harus menjalani strategi invasif segera." },
    ],
    pitfalls: [
      "Killip berlaku pada infark miokard akut, bukan gagal jantung kronik.",
      "Hipotensi tanpa tanda hipoperfusi belum tentu kelas IV.",
      "Ronki basah di seluruh lapangan paru adalah kelas III, bukan II.",
    ],
    cases: [
      { title: "Kasus 1", scenario: "STEMI anterior, ronki basah di kedua basal paru dan S3.", answer: "Killip II", explanation: "S3 dan ronki basah pada setengah lapangan paru." },
      { title: "Kasus 2", scenario: "STEMI inferior, TD 80/50, akral dingin, urine sedikit.", answer: "Killip IV", explanation: "Syok kardiogenik." },
    ],
    sources: [
      { label: "Killip T, Kimball JT. Treatment of myocardial infarction in a coronary care unit: a two year experience with 250 patients. Am J Cardiol 1967;20:457-64.", url: pm("6059183") },
      { label: "Kementerian Kesehatan RI. KMK HK.01.07/MENKES/876/2026 tentang Pedoman Nasional Pelayanan Klinis Tata Laksana Sindrom Koroner Akut (ditetapkan 10 Agustus 2026), Tabel 19 hal. 57.", url: "https://kemkes.go.id/app_asset/file_content_download/17871313946a857602a07b55.82527160.pdf" },
    ],
  },
};
