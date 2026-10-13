// Pembahasan & materi: THT dan Neurologi (khusus server).
import type { CalcContent } from "./registry";

const pm = (id: string) => `https://pubmed.ncbi.nlm.nih.gov/${id}/`;

export const CONTENT_THT_NEURO: Record<string, CalcContent> = {
  centor: {
    interpretation: [
      "Kriteria Centor (demam >38 °C, tanpa batuk, KGB servikal anterior nyeri/membesar, pembengkakan/eksudat tonsil) ditambah koreksi usia McIsaac: 3–14 tahun +1, 15–44 tahun 0, ≥45 tahun −1.",
      "Makin tinggi skor makin besar kemungkinan faringitis streptokokus grup A (GAS). Skor rendah membantu menghindari antibiotik yang tidak perlu.",
      "Skor tidak menggantikan kultur/tes antigen cepat bila hasilnya akan mengubah tata laksana.",
    ],
    material: [
      { heading: "Mengapa penting", body: "Sebagian besar faringitis disebabkan virus. Antibiotik hanya bermanfaat pada faringitis GAS untuk mempercepat penyembuhan dan mencegah komplikasi seperti demam rematik dan abses peritonsil." },
      { heading: "Strategi menurut skor", body: "Skor 0–1: tidak perlu tes dan antibiotik. Skor 2–3: lakukan kultur atau tes antigen cepat dan berikan antibiotik bila positif. Skor ≥4: kultur/tes cepat dan pertimbangkan antibiotik empiris (McIsaac 1998)." },
      { heading: "Pilihan antibiotik", body: "Bila GAS terbukti, penisilin atau amoksisilin tetap menjadi pilihan utama; alternatif pada alergi penisilin mengikuti pedoman setempat." },
    ],
    pitfalls: [
      "Lupa koreksi usia: pasien ≥45 tahun dikurangi 1 poin.",
      "Batuk mengurangi kemungkinan GAS; kriteria yang dihitung adalah TIDAK ADA batuk.",
      "Skor McIsaac tidak divalidasi untuk anak <3 tahun.",
    ],
    cases: [
      { title: "Kasus 1", scenario: "Anak 8 tahun, demam 38,5 °C, tidak batuk, tonsil eksudatif, KGB servikal anterior nyeri.", answer: "Skor 5", explanation: "Usia 3–14 (+1) dan keempat kriteria (+4); kultur/tes cepat dan pertimbangkan antibiotik." },
      { title: "Kasus 2", scenario: "Dewasa 50 tahun, nyeri tenggorok, batuk, demam 38,2 °C, tonsil normal.", answer: "Skor 0", explanation: "Usia ≥45 (−1) dan demam (+1); tidak perlu antibiotik." },
    ],
    sources: [
      { label: "McIsaac WJ dkk. A clinical score to reduce unnecessary antibiotic use in patients with sore throat. CMAJ 1998;158:75-83.", url: pm("9475915") },
    ],
  },
  nose: {
    interpretation: [
      "Lima butir dinilai 0–4, dijumlahkan, lalu dikali 5 sehingga rentang 0–100.",
      "Kelas Lipan & Most: ringan 5–25, sedang 30–50, berat 55–75, ekstrem 80–100. Skor 30 paling baik membedakan pasien dengan dan tanpa obstruksi hidung.",
      "NOSE mengukur keluhan subjektif dan kualitas hidup, bukan derajat anatomis sumbatan.",
    ],
    material: [
      { heading: "Kegunaan", body: "NOSE dikembangkan dan divalidasi oleh Stewart dkk. (2004) untuk menilai obstruksi hidung, terutama sebelum dan sesudah septoplasti atau operasi katup hidung. Selisih skor dipakai menilai hasil terapi." },
      { heading: "Penyebab obstruksi", body: "Deviasi septum, hipertrofi konka, kolaps katup hidung, rinitis alergi, polip, dan tumor. Pemeriksaan rinoskopi/endoskopi tetap diperlukan untuk mencari penyebab." },
      { heading: "Menilai perubahan", body: "Bandingkan skor sebelum dan sesudah terapi pada pasien yang sama; perubahan kelas keparahan lebih mudah dikomunikasikan kepada pasien." },
    ],
    pitfalls: [
      "Jumlah mentah (maks 20) harus dikali 5.",
      "Periode yang dinilai adalah satu bulan terakhir.",
      "Skor tinggi tidak menentukan lokasi sumbatan.",
    ],
    cases: [
      { title: "Kasus 1", scenario: "Butir dinilai 3, 3, 2, 2, 3.", answer: "Skor 65, berat", explanation: "Jumlah 13 × 5 = 65 (rentang 55–75)." },
      { title: "Kasus 2", scenario: "Butir dinilai 1, 1, 1, 0, 1.", answer: "Skor 20, ringan", explanation: "Jumlah 4 × 5 = 20." },
    ],
    sources: [
      { label: "Stewart MG dkk. Development and validation of the Nasal Obstruction Symptom Evaluation (NOSE) scale. Otolaryngol Head Neck Surg 2004;130:157-63.", url: pm("14990910") },
      { label: "Lipan MJ, Most SP. Development of a severity classification system for subjective nasal obstruction. JAMA Facial Plast Surg 2013;15:358-61.", url: pm("23846399") },
    ],
  },
  rsi: {
    interpretation: [
      "Sembilan butir gejala dinilai 0–5 (maks 45). RSI >13 dianggap abnormal dan mengarah ke refluks laringofaring (LPR).",
      "RSI menilai gejala; diagnosis LPR didukung temuan laringoskopi (mis. Reflux Finding Score) dan respons terapi.",
      "Gejala LPR sering tanpa heartburn, berbeda dengan GERD klasik.",
    ],
    material: [
      { heading: "Refluks laringofaring", body: "LPR adalah aliran balik isi lambung sampai laring dan faring. Keluhan khas: suara serak, sering berdeham, rasa mengganjal, lendir di tenggorok, dan batuk kronik." },
      { heading: "Pemakaian RSI", body: "Belafsky dkk. (2002) memvalidasi RSI sebagai instrumen sembilan butir yang mudah diisi sendiri oleh pasien. Skor dipakai untuk skrining dan memantau respons terapi (perubahan gaya hidup, PPI)." },
      { heading: "Diagnosis banding", body: "Keluhan serupa dapat disebabkan rinitis dengan post-nasal drip, penggunaan suara berlebih, merokok, atau keganasan laring; serak menetap >3–4 minggu memerlukan pemeriksaan laring." },
    ],
    pitfalls: [
      "Ambang abnormal adalah >13 (bukan ≥13).",
      "RSI rendah tidak menyingkirkan LPR; RSI tinggi tidak memastikan.",
      "Serak lama pada perokok perlu laringoskopi, bukan hanya terapi empiris.",
    ],
    cases: [
      { title: "Kasus 1", scenario: "Jumlah skor 18 dengan keluhan serak dan sering berdeham.", answer: "RSI 18, mengarah LPR", explanation: "18 > 13." },
      { title: "Kasus 2", scenario: "Jumlah skor 9.", answer: "RSI 9, tidak mengarah", explanation: "9 ≤ 13." },
    ],
    sources: [
      { label: "Belafsky PC, Postma GN, Koufman JA. Validity and reliability of the reflux symptom index (RSI). J Voice 2002;16:274-7.", url: pm("12150380") },
    ],
  },
  paradise: {
    interpretation: [
      "Kriteria frekuensi: ≥7 episode dalam 1 tahun, ≥5 episode per tahun selama 2 tahun, atau ≥3 episode per tahun selama 3 tahun.",
      "Setiap episode harus terdokumentasi dengan minimal satu: suhu >38,3 °C, adenopati servikal, eksudat tonsil, atau tes GAS positif.",
      "Memenuhi kriteria berarti tonsilektomi dapat dipertimbangkan; observasi tetap merupakan pilihan yang sah.",
    ],
    material: [
      { heading: "Dasar bukti", body: "Paradise dkk. (1984) menunjukkan manfaat tonsilektomi pada anak dengan infeksi tenggorok berulang yang berat dan terdokumentasi. Pedoman tonsilektomi AAO-HNS (2019) memakai kriteria ini sebagai dasar rekomendasi." },
      { heading: "Faktor yang mengubah keputusan", body: "Alergi atau intoleransi antibiotik multipel, PFAPA, riwayat abses peritonsil, dan gangguan napas saat tidur dapat menjadi indikasi meski kriteria frekuensi belum terpenuhi." },
      { heading: "Dokumentasi", body: "Catat suhu, temuan tonsil, KGB, dan hasil tes GAS setiap episode. Tanpa dokumentasi, keputusan operasi menjadi lemah." },
    ],
    pitfalls: [
      "Frekuensi saja tidak cukup; dokumentasi setiap episode wajib.",
      "Ambang suhu dokumentasi adalah >38,3 °C.",
      "Kriteria Paradise tidak berlaku untuk indikasi obstruksi jalan napas atau OSA.",
    ],
    cases: [
      { title: "Kasus 1", scenario: "Anak dengan 6 episode tahun ini dan 6 episode tahun lalu, semua terdokumentasi demam 38,8 °C.", answer: "Memenuhi kriteria", explanation: "≥5 episode per tahun selama 2 tahun dengan dokumentasi." },
      { title: "Kasus 2", scenario: "8 episode tahun ini, tetapi tanpa catatan suhu atau pemeriksaan.", answer: "Belum memenuhi", explanation: "Dokumentasi tidak lengkap." },
    ],
    sources: [
      { label: "Paradise JL dkk. Efficacy of tonsillectomy for recurrent throat infection in severely affected children. N Engl J Med 1984;310:674-83.", url: pm("6700642") },
      { label: "Mitchell RB dkk. Clinical Practice Guideline: Tonsillectomy in Children (Update). Otolaryngol Head Neck Surg 2019;160(1_suppl):S1-S42.", url: pm("30798778") },
    ],
  },
  "stop-bang": {
    interpretation: [
      "Delapan butir ya/tidak: Snoring, Tired, Observed apnea, Pressure, BMI >35, Age >50, Neck >40 cm, Gender laki-laki.",
      "Risiko OSA: 0–2 rendah, 3–4 sedang, 5–8 tinggi.",
      "Skor tinggi menandakan perlunya pemeriksaan tidur (polisomnografi) dan antisipasi jalan napas sulit saat anestesi.",
    ],
    material: [
      { heading: "Asal skor", body: "Chung dkk. (2008) mengembangkan kuesioner STOP untuk pasien pra-bedah dan menambahkan BANG untuk meningkatkan sensitivitas. Kini dipakai luas di klinik anestesi dan layanan primer." },
      { heading: "Mengapa OSA penting", body: "OSA tidak terdiagnosis berkaitan dengan hipertensi resisten, aritmia, kecelakaan lalu lintas akibat kantuk, serta komplikasi perioperatif seperti desaturasi dan intubasi sulit." },
      { heading: "Langkah berikutnya", body: "Skor sedang–tinggi: rujuk untuk polisomnografi atau pemeriksaan tidur di rumah. Tata laksana OSA meliputi penurunan berat badan, posisi tidur, CPAP, atau alat oral." },
    ],
    pitfalls: [
      "Ambang BMI adalah >35 dan usia >50.",
      "Lingkar leher diukur setinggi kartilago tiroid.",
      "Skor rendah tidak sepenuhnya menyingkirkan OSA bila gejala khas.",
    ],
    cases: [
      { title: "Kasus 1", scenario: "Laki-laki 55 tahun, mendengkur keras, hipertensi, lingkar leher 43 cm.", answer: "Skor 5, risiko tinggi", explanation: "Snoring, Pressure, Age, Neck, Gender." },
      { title: "Kasus 2", scenario: "Perempuan 40 tahun, sering lelah siang hari saja.", answer: "Skor 1, risiko rendah", explanation: "Hanya Tired." },
    ],
    sources: [
      { label: "Chung F dkk. STOP questionnaire: a tool to screen patients for obstructive sleep apnea. Anesthesiology 2008;108:812-21.", url: pm("18431116") },
      { label: "Chung F dkk. High STOP-Bang score indicates a high probability of obstructive sleep apnoea. Br J Anaesth 2012;108:768-75.", url: pm("22401881"), note: "Ambang risiko rendah/sedang/tinggi" },
    ],
  },
  siriraj: {
    interpretation: [
      "Skor = (2,5 × kesadaran) + (2 × muntah) + (2 × nyeri kepala dalam 2 jam) + (0,1 × diastolik) − (3 × penanda ateroma) − 12.",
      ">1 mengarah perdarahan intraserebral supratentorial; <−1 mengarah infark; −1 sampai 1 meragukan sehingga perlu CT scan.",
      "Pada studi validasi, akurasi keseluruhan sekitar 90%, tetapi skor tetap tidak boleh menjadi dasar trombolisis atau antikoagulan.",
    ],
    material: [
      { heading: "Latar belakang", body: "Poungvarin dkk. (1991) mengembangkan skor ini di Rumah Sakit Siriraj, Bangkok, untuk tempat tanpa CT scan. Skor dibuat dari analisis diskriminan terhadap 13 variabel klinis pada pasien stroke akut supratentorial." },
      { heading: "Komponen", body: "Kesadaran: sadar 0, somnolen/stupor 1, semikoma/koma 2. Muntah dan nyeri kepala dalam 2 jam: ya 1, tidak 0. Penanda ateroma: diabetes, angina, atau klaudikasio intermiten (satu atau lebih) = 1." },
      { heading: "Batasan", body: "Tidak berlaku untuk perdarahan subaraknoid dan stroke infratentorial. Di era CT yang tersedia luas, skor terutama berguna untuk pendidikan dan triase di fasilitas terbatas." },
    ],
    pitfalls: [
      "Tanda pada penanda ateroma negatif (−3); jangan dijumlahkan positif.",
      "Diastolik dikalikan 0,1, bukan dijumlahkan langsung.",
      "Nilai tepat −1 atau 1 masuk kategori meragukan.",
    ],
    cases: [
      { title: "Kasus 1", scenario: "Stupor, muntah, nyeri kepala, diastolik 120, tanpa penanda ateroma.", answer: "Skor 6,5 → perdarahan", explanation: "2,5 + 2 + 2 + 12 − 0 − 12 = 6,5." },
      { title: "Kasus 2", scenario: "Sadar, tanpa muntah dan nyeri kepala, diastolik 90, diabetes.", answer: "Skor −6 → infark", explanation: "0 + 0 + 0 + 9 − 3 − 12 = −6." },
    ],
    sources: [
      { label: "Poungvarin N dkk. Siriraj stroke score and validation study to distinguish supratentorial intracerebral haemorrhage from infarction. BMJ 1991;302:1565-7.", url: pm("1855041") },
    ],
  },
  nihss: {
    interpretation: [
      "Lima belas butir dengan total 0–42; makin tinggi makin berat defisitnya.",
      "Kategori yang lazim dipakai: 0 tanpa defisit terukur, 1–4 ringan, 5–15 sedang, 16–20 sedang–berat, 21–42 berat.",
      "NIHSS dinilai serial: saat masuk, sebelum dan sesudah terapi reperfusi, dan bila ada perburukan.",
    ],
    material: [
      { heading: "Aturan penilaian", body: "Nilai apa yang dilakukan pasien, bukan apa yang diperkirakan dapat dilakukan. Catat respons pertama, jangan melatih pasien, dan nilai butir secara berurutan." },
      { heading: "Butir UN", body: "Butir motorik, ataksia, dan disartria dapat ditulis UN (tidak dapat diuji) pada amputasi, fusi sendi, atau intubasi. Butir UN tidak dijumlahkan dan alasannya dicatat." },
      { heading: "Hubungan dengan terapi", body: "NIHSS dipakai untuk menilai derajat, memperkirakan oklusi pembuluh besar (skor tinggi), dan menentukan kandidat trombolisis atau trombektomi bersama waktu onset dan pencitraan." },
    ],
    pitfalls: [
      "Ataksia hanya dinilai bila tidak sebanding dengan kelemahan; pasien yang tidak dapat bergerak dinilai 0.",
      "Afasia global atau koma memengaruhi beberapa butir; ikuti petunjuk khusus pada butir 1b, 1c, dan 9.",
      "Lengan diangkat 10 detik, tungkai 5 detik.",
    ],
    cases: [
      { title: "Kasus 1", scenario: "Sadar, menjawab benar, paresis wajah parsial (2), lengan kanan drift (1), afasia ringan (1), selebihnya normal.", answer: "NIHSS 4, ringan", explanation: "2 + 1 + 1 = 4." },
      { title: "Kasus 2", scenario: "Deviasi paksa (2), hemianopia komplet (2), wajah komplet (3), lengan dan tungkai kiri tanpa gerak (4 + 4), neglect berat (2), disartria berat (2).", answer: "NIHSS 19, sedang–berat", explanation: "Jumlah butir abnormal = 19." },
    ],
    sources: [
      { label: "Brott T dkk. Measurements of acute cerebral infarction: a clinical examination scale. Stroke 1989;20:864-70.", url: pm("2749846") },
      { label: "Kwah LK, Diong J. National Institutes of Health Stroke Scale (NIHSS). J Physiother 2014;60:61.", url: pm("24856948"), note: "Kategori derajat yang lazim" },
      { label: "NIH Stroke Scale, formulir resmi NINDS.", url: "https://www.ninds.nih.gov/health-information/stroke/assess-and-treat/nih-stroke-scale" },
    ],
  },
  abcd2: {
    interpretation: [
      "Usia ≥60 (1), TD ≥140/90 (1), kelemahan satu sisi (2) atau gangguan bicara tanpa kelemahan (1), durasi ≥60 menit (2) atau 10–59 menit (1), diabetes (1). Maksimal 7.",
      "Risiko stroke 2 hari pada studi validasi: rendah 0–3 (sekitar 1,0%), sedang 4–5 (4,1%), tinggi 6–7 (8,1%).",
      "Pedoman terkini menekankan evaluasi segera semua TIA (pencitraan otak dan pembuluh, EKG), tidak hanya berdasarkan skor.",
    ],
    material: [
      { heading: "Asal skor", body: "Johnston dkk. (2007) menggabungkan skor California dan ABCD menjadi ABCD² dan memvalidasinya pada empat kohort di Amerika Serikat dan Inggris." },
      { heading: "Keterbatasan", body: "ABCD² tidak memasukkan temuan pencitraan, fibrilasi atrium, atau stenosis karotis yang dapat meningkatkan risiko meski skor rendah. Karena itu pasien skor rendah tetap memerlukan pemeriksaan penyebab." },
      { heading: "Pencegahan sekunder", body: "Tata laksana TIA meliputi antiplatelet (dual antiplatelet jangka pendek pada TIA risiko tinggi sesuai pedoman), statin, kontrol tekanan darah, dan antikoagulan bila ada AF." },
    ],
    pitfalls: [
      "Kelemahan satu sisi bernilai 2, gangguan bicara tanpa kelemahan bernilai 1; tidak dijumlahkan keduanya.",
      "TD diukur saat pemeriksaan pertama setelah TIA.",
      "Gejala yang masih berlangsung bukan TIA; tangani sebagai stroke akut.",
    ],
    cases: [
      { title: "Kasus 1", scenario: "Laki-laki 68 tahun, TD 160/95, kelemahan lengan kanan 30 menit, tidak diabetes.", answer: "ABCD² 5, risiko sedang", explanation: "Usia 1 + TD 1 + kelemahan 2 + durasi 10–59 menit 1 = 5." },
      { title: "Kasus 2", scenario: "Perempuan 50 tahun, bicara pelo 5 menit, TD 130/80.", answer: "ABCD² 1, risiko rendah", explanation: "Hanya gangguan bicara (1)." },
    ],
    sources: [
      { label: "Johnston SC dkk. Validation and refinement of scores to predict very early stroke risk after transient ischaemic attack. Lancet 2007;369:283-92.", url: pm("17258668") },
    ],
  },
  four: {
    interpretation: [
      "Empat komponen (Eye, Motor, Brainstem, Respiration) masing-masing 0–4, total 0–16; makin rendah makin buruk.",
      "FOUR dapat dinilai pada pasien terintubasi karena tidak memakai respons verbal, dan menilai refleks batang otak serta pola napas.",
      "Skor 0 pada semua komponen memerlukan evaluasi kematian batang otak sesuai protokol.",
    ],
    material: [
      { heading: "Keunggulan dibanding GCS", body: "Wijdicks dkk. (2005) mengembangkan FOUR untuk mengatasi keterbatasan GCS pada pasien terintubasi dan untuk mendeteksi sindrom terkunci (locked-in) melalui gerak mata sesuai perintah." },
      { heading: "Cara menilai mata", body: "Skor E4 bila pasien membuka mata dan mengikuti jari atau berkedip sesuai perintah. Bila kelopak tertutup, buka dan minta pasien mengikuti jari." },
      { heading: "Pola napas", body: "Pada pasien tidak terintubasi dinilai pola napas teratur, Cheyne-Stokes, atau tidak teratur. Pada pasien terintubasi dinilai apakah ada usaha napas di atas laju ventilator." },
    ],
    pitfalls: [
      "Respons motorik E/M/B/R berbeda dari GCS; M4 adalah tanda jempol, kepal, atau 'peace' sesuai perintah.",
      "Tidak ada kategori derajat baku; laporkan total dan rinciannya (mis. E3 M2 B4 R2).",
      "Mioklonus status umum bernilai M0.",
    ],
    cases: [
      { title: "Kasus 1", scenario: "Terintubasi, mata terbuka tidak mengikuti (3), melokalisasi nyeri (3), refleks pupil dan kornea ada (4), napas di atas laju ventilator (1).", answer: "FOUR 11 (E3 M3 B4 R1)", explanation: "3 + 3 + 4 + 1 = 11." },
      { title: "Kasus 2", scenario: "Mata tetap tertutup dengan nyeri (0), ekstensi (1), satu pupil lebar terfiksasi (3), napas tidak teratur tanpa intubasi (2).", answer: "FOUR 6 (E0 M1 B3 R2)", explanation: "0 + 1 + 3 + 2 = 6." },
    ],
    sources: [
      { label: "Wijdicks EF dkk. Validation of a new coma scale: the FOUR score. Ann Neurol 2005;58:585-93.", url: pm("16178024") },
    ],
  },
};
