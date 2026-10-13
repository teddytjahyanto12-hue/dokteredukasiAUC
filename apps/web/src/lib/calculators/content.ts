// Pembahasan, materi, latihan, dan sumber tiap kalkulator.
// Dipisah dari registry.ts agar teks Premium tidak ikut terbawa ke JavaScript browser:
// berkas ini hanya boleh diimpor oleh komponen server, skrip, dan tes.
import type { CalcContent } from "./registry";
import { CONTENT_UMUM_PD } from "./content-umum-pd";
import { CONTENT_PARU_KARDIO } from "./content-paru-kardio";
import { CONTENT_THT_NEURO } from "./content-tht-neuro";
import { CONTENT_OBS_BEDAH_ANAK } from "./content-obs-bedah-anak";
import { CONTENT_TAMBAHAN } from "./content-tambahan";

const BASE: Record<string, CalcContent> = {
  gcs: {
    interpretation: [
      "Laporkan ketiga komponen (contoh E3 V4 M5), bukan hanya angka total. Komponen memberi gambaran klinis yang lebih jelas dan lebih andal daripada total.",
      "Total 3–15. Klasifikasi derajat cedera kepala yang lazim dipakai: ringan 13–15, sedang 9–12, berat 3–8.",
      "Bila satu komponen tidak dapat dinilai, tulis NT (not testable) dan jangan laporkan total, karena total menjadi rendah semu dan bisa menyesatkan.",
      "Nilai tren lebih penting daripada satu kali pengukuran. Penurunan pada komponen motorik umumnya perlu ditanggapi lebih cepat.",
    ],
    pitfalls: [
      "Pasien terintubasi: verbal ditulis NT (bukan 1). Penulisan VT/V1 dan total rendah sering menjadi jebakan soal.",
      "Respons motorik yang dinilai adalah respons TERBAIK dari anggota gerak mana pun, bukan yang terburuk.",
      "Bedakan fleksi normal (cepat, menjauhi rangsang) dari fleksi abnormal/dekortikasi (lambat, stereotipik). Melokalisasi berarti tangan melewati klavikula ke arah rangsang.",
      "Rangsang tekanan yang dianjurkan: ujung jari, otot trapezius, atau takik supraorbita. Menggosok sternum tidak dianjurkan.",
      "Anak di bawah 5 tahun memakai Paediatric GCS (respons verbal dan motorik dimodifikasi), bukan skala dewasa.",
      "Pemakaian sedasi, hipoksia, hipotensi, dan hipoglikemia dapat menurunkan skor; koreksi dulu bila memungkinkan dan catat kondisinya.",
    ],
    cases: [
      {
        title: "Kasus 1: Kecelakaan motor",
        scenario: "Laki-laki 25 tahun pasca kecelakaan. Mata terbuka saat dipanggil, menjawab dengan kalimat tetapi salah menyebut tempat dan waktu, tangan menepis tekanan pada trapezius sampai melewati klavikula.",
        answer: "E3 V4 M5 = GCS 12 (sedang)",
        explanation: "Membuka mata terhadap suara = E3. Kalimat utuh dengan disorientasi = V4 (bingung). Tangan menuju rangsang di atas klavikula = melokalisasi, M5. Total 12 termasuk sedang.",
      },
      {
        title: "Kasus 2: Pasien terintubasi di ICU",
        scenario: "Pasien terintubasi tanpa sedasi. Mata terbuka spontan dan dapat mengangkat dua jari bila diminta.",
        answer: "E4 V(NT) M6, total tidak dilaporkan",
        explanation: "Verbal tidak dapat dinilai karena intubasi, sehingga ditulis NT. Total tidak dilaporkan agar tidak tampak lebih berat dari kenyataan.",
      },
      {
        title: "Kasus 3: Penurunan kesadaran",
        scenario: "Perempuan 60 tahun. Mata tidak terbuka walau ditekan ujung jarinya, hanya mengerang, kedua lengan meluruskan saat diberi tekanan supraorbita.",
        answer: "E1 V2 M2 = GCS 5 (berat)",
        explanation: "Tidak membuka mata = E1. Erangan = V2 (suara). Lengan ekstensi = M2. Total 5 termasuk berat; pertimbangkan pengamanan jalan napas.",
      },
    ],
    sources: [
      { label: "Teasdale G, Jennett B. Assessment of coma and impaired consciousness. A practical scale. Lancet 1974;2:81–84.", url: "https://pubmed.ncbi.nlm.nih.gov/4136544/", note: "Sumber asli skala" },
      { label: "Glasgow Coma Scale, situs resmi: What is GCS", url: "https://www.glasgowcomascale.org/what-is-gcs/", note: "Komponen dan istilah terbaru" },
      { label: "Glasgow Coma Scale, situs resmi: Structured Assessment (GCS Aid)", url: "https://www.glasgowcomascale.org/gcs-aid/", note: "Teasdale dkk., Nursing Times 2014;110:12–16" },
      { label: "Glasgow Coma Scale, situs resmi: FAQ", url: "https://www.glasgowcomascale.org/faq/", note: "Aturan NT, klasifikasi derajat, Paediatric GCS, frekuensi observasi NICE CG176" },
      { label: "Teasdale G, dkk. The Glasgow Coma Scale at 40 years: standing the test of time. Lancet Neurol 2014;13:844–854.", url: "https://pubmed.ncbi.nlm.nih.gov/25030516/" },
    ],
    material: [
      {
        heading: "Apa yang dinilai",
        body: "GCS dijelaskan Teasdale dan Jennett pada 1974 untuk mengomunikasikan tingkat kesadaran pasien dengan cedera otak akut. Skala menilai tiga respons: membuka mata, verbal, dan motorik. GCS dapat dipakai untuk gangguan kesadaran dari sebab apa pun; pada lesi fokal seperti stroke, penilaian defisit fokal tetap diperlukan.",
      },
      {
        heading: "Langkah penilaian",
        body: "Periksa dulu faktor yang dapat mengganggu penilaian (bahasa, gangguan pendengaran, intubasi, sedasi, cedera lain). Amati respons spontan, lalu beri rangsang suara (memanggil atau memberi perintah), dan bila belum ada respons beri rangsang tekanan: ujung jari terlebih dahulu, kemudian trapezius atau takik supraorbita. Catat respons terbaik pada tiap komponen.",
      },
      {
        heading: "Pemantauan cedera kepala (NICE CG176)",
        body: "Observasi tiap 30 menit sampai GCS 15. Setelah GCS 15: tiap 30 menit selama 2 jam, tiap 1 jam selama 4 jam, lalu tiap 2 jam. Penilaian ulang segera oleh dokter bila GCS turun 1 poin dan menetap minimal 30 menit (penurunan motorik lebih diperhatikan), atau turun 3 poin atau lebih pada mata atau verbal, atau 2 poin atau lebih pada motorik.",
      },
      {
        heading: "Anak (Paediatric GCS)",
        body: "Skala dewasa dipakai tanpa modifikasi pada anak di atas 5 tahun. Pada anak lebih kecil dipakai Paediatric GCS (Adelaide) dengan skor total normal yang diharapkan: lahir 9, usia 6 bulan 10, 6–12 bulan 11, 1–2 tahun 12, 2–5 tahun 13, di atas 5 tahun 14.",
      },
    ],
  },
  hpl: {
    interpretation: [
      "Secara konvensi, HPL adalah 280 hari (40 minggu) setelah hari pertama haid terakhir (HPHT). Cara ini mengasumsikan siklus teratur 28 hari dengan ovulasi hari ke-14.",
      "USG trimester pertama (sampai 13 6/7 minggu) adalah cara paling akurat untuk menetapkan atau mengonfirmasi usia kehamilan.",
      "Trimester: pertama sampai 13 6/7 minggu, kedua 14 0/7 sampai 27 6/7 minggu, ketiga mulai 28 0/7 minggu.",
      "Kategori setelah 37 minggu: early term 37 0/7–38 6/7, full term 39 0/7–40 6/7, late term 41 0/7–41 6/7, postterm mulai 42 0/7 minggu.",
      "Kehamilan tanpa USG yang mengonfirmasi atau merevisi HPL sebelum 22 0/7 minggu dianggap penanggalannya kurang optimal.",
    ],
    pitfalls: [
      "Aturan Naegele manual (+7 hari, −3 bulan, +1 tahun) dapat berbeda 1–3 hari dari HPHT + 280 hari karena panjang bulan tidak sama. Pada soal, ikuti cara yang diminta.",
      "Untuk HPHT bulan Januari–Maret, tahun tidak bertambah (cukup +9 bulan). Kesalahan menambah tahun sering terjadi.",
      "HPHT yang tidak diingat dengan pasti atau siklus tidak teratur membuat perhitungan dari HPHT tidak dapat diandalkan; gunakan USG.",
      "HPL diubah mengikuti USG trimester pertama bila selisihnya lebih dari 7 hari (sebelum 9 0/7 minggu: lebih dari 5 hari). Batas untuk trimester kedua dan ketiga berbeda.",
      "Kehamilan hasil IVF memakai tanggal transfer embrio: embrio hari ke-5 HPL = transfer + 261 hari, embrio hari ke-3 = transfer + 263 hari.",
    ],
    cases: [
      {
        title: "Kasus 1: HPHT di awal tahun",
        scenario: "HPHT 10 Januari 2026. Hitung HPL dengan aturan Naegele.",
        answer: "17 Oktober 2026",
        explanation: "10 + 7 = 17; Januari − 3 bulan = Oktober; karena HPHT bulan Januari, tahun tetap 2026. HPHT + 280 hari juga jatuh pada 17 Oktober 2026.",
      },
      {
        title: "Kasus 2: Naegele berbeda dengan 280 hari",
        scenario: "HPHT 1 Maret 2026. Bandingkan Naegele dengan HPHT + 280 hari.",
        answer: "Naegele 8 Desember 2026; HPHT + 280 hari 6 Desember 2026",
        explanation: "Naegele memberi 8 Desember 2026, sedangkan 280 hari jatuh pada 6 Desember 2026 (selisih 2 hari) karena jumlah hari per bulan tidak sama.",
      },
      {
        title: "Kasus 3: Dari USG",
        scenario: "USG tanggal 1 Juni 2026 menunjukkan usia kehamilan 10 minggu 2 hari (CRL). Berapa HPL?",
        answer: "26 Desember 2026",
        explanation: "Sisa kehamilan = 280 − (10 × 7 + 2) = 208 hari. 1 Juni 2026 + 208 hari = 26 Desember 2026.",
      },
    ],
    sources: [
      { label: "ACOG Committee Opinion No. 700: Methods for Estimating the Due Date (2017)", url: "https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2017/05/methods-for-estimating-the-due-date", note: "HPL 280 hari, ketepatan USG, batas revisi, IVF" },
      { label: "ACOG Committee Opinion No. 579: Definition of Term Pregnancy (2013)", url: "https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2013/11/definition-of-term-pregnancy", note: "Early, full, late, dan postterm; rata-rata 280 hari" },
      { label: "Darwish NA dkk. Modified Naegele's rule for determination of the expected date of delivery irrespective of the cycle length. Med J Cairo Univ 1994;62(1):39-47 (arsip WHO EMRO IMEMR).", url: "https://applications.emro.who.int/imemrf/med_j_cairo_univ_1994_62_1_39.pdf", note: "Aturan Naegele: HPHT + 7 hari − 3 bulan + 1 tahun, berdasar siklus ideal 28 hari" },
    ],
    material: [
      {
        heading: "Konsep usia kehamilan",
        body: "Usia kehamilan dihitung dari hari pertama haid terakhir (HPHT), bukan dari hari pembuahan. Rata-rata kehamilan tunggal berlangsung 40 minggu (280 hari) dari HPHT sampai HPL. HPL ditetapkan sedini mungkin, didiskusikan dengan pasien, dan dicatat jelas di rekam medis; perubahan berikutnya hanya pada keadaan yang jarang.",
      },
      {
        heading: "Ketepatan penanggalan dengan USG",
        body: "USG trimester pertama (CRL, sampai 13 6/7 minggu) memiliki ketepatan sekitar ±5–7 hari. Pada 14 0/7–21 6/7 minggu sekitar ±7–10 hari, 22 0/7–27 6/7 minggu sekitar ±10–14 hari, dan trimester ketiga sekitar ±21–30 hari, sehingga USG trimester ketiga paling tidak andal untuk menentukan usia kehamilan.",
      },
      {
        heading: "Kapan HPL diubah mengikuti USG",
        body: "HPL diganti mengikuti USG bila selisih dengan HPHT melebihi: 5 hari (USG sebelum 9 0/7 minggu), 7 hari (sampai 15 6/7 minggu), 10 hari (16 0/7–21 6/7 minggu), 14 hari (22 0/7–27 6/7 minggu), atau 21 hari (USG pertama pada trimester ketiga). Kehamilan tanpa USG konfirmasi sebelum 22 0/7 minggu dianggap penanggalannya kurang optimal.",
      },
      {
        heading: "Istilah setelah 37 minggu",
        body: "Early term 37 0/7–38 6/7 minggu, full term 39 0/7–40 6/7 minggu, late term 41 0/7–41 6/7 minggu, dan postterm mulai 42 0/7 minggu. Luaran neonatus paling baik pada kehamilan tanpa komplikasi yang lahir 39 0/7–40 6/7 minggu.",
      },
    ],
  },
};

export const CONTENT: Record<string, CalcContent> = { ...BASE, ...CONTENT_UMUM_PD, ...CONTENT_PARU_KARDIO, ...CONTENT_THT_NEURO, ...CONTENT_OBS_BEDAH_ANAK, ...CONTENT_TAMBAHAN };
