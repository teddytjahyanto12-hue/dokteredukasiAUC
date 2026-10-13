// Pembahasan & materi: Obstetri, Bedah, dan Anak (khusus server).
import type { CalcContent } from "./registry";

const pm = (id: string) => `https://pubmed.ncbi.nlm.nih.gov/${id}/`;

export const CONTENT_OBS_BEDAH_ANAK: Record<string, CalcContent> = {
  vbac: {
    interpretation: [
      "Lima variabel saat masuk rumah sakit: usia <40 tahun (2), riwayat persalinan pervaginam (0/1/2/4), indikasi seksio sebelumnya bukan gagal kemajuan persalinan (1), pendataran serviks (0/1/2), dan pembukaan ≥4 cm (1). Total 0–10.",
      "Pada studi asal, keberhasilan VBAC meningkat linier dari sekitar 49% (skor 0–2) sampai 95% (skor 8–10).",
      "Skor dipakai untuk konseling percobaan persalinan (TOLAC), bukan sebagai syarat mutlak.",
    ],
    material: [
      { heading: "Syarat TOLAC", body: "Umumnya satu riwayat seksio dengan insisi segmen bawah transversal, tanpa kontraindikasi persalinan pervaginam, dan fasilitas yang mampu melakukan seksio darurat serta transfusi. Insisi klasik atau riwayat ruptur uteri adalah kontraindikasi." },
      { heading: "Faktor yang meningkatkan keberhasilan", body: "Riwayat persalinan pervaginam, terutama setelah seksio, adalah prediktor terkuat. Indikasi seksio sebelumnya yang tidak berulang (mis. presentasi bokong) juga meningkatkan peluang." },
      { heading: "Risiko", body: "Risiko utama TOLAC adalah ruptur uteri (sekitar 0,5–1% pada insisi transversal rendah), lebih tinggi pada induksi persalinan dengan prostaglandin." },
    ],
    pitfalls: [
      "Riwayat persalinan pervaginam sebelum DAN sesudah seksio bernilai 4, bukan 1 + 2.",
      "Usia <40 tahun bernilai 2 poin.",
      "Skor tinggi tidak menghapus syarat fasilitas seksio darurat.",
    ],
    cases: [
      { title: "Kasus 1", scenario: "Ibu 32 tahun, satu kali seksio karena letak sungsang, pernah melahirkan pervaginam setelahnya, masuk dengan pembukaan 5 cm dan pendataran 80%.", answer: "Skor 8, peluang tertinggi", explanation: "Usia 2 + pervaginam setelah SC 2 + indikasi bukan gagal kemajuan 1 + pendataran 2 + pembukaan 1 = 8." },
      { title: "Kasus 2", scenario: "Ibu 41 tahun, seksio karena gagal kemajuan, belum pernah pervaginam, pembukaan 2 cm, pendataran 20%.", answer: "Skor 0", explanation: "Tidak ada variabel yang terpenuhi." },
    ],
    sources: [
      { label: "Flamm BL, Geiger AM. Vaginal birth after cesarean delivery: an admission scoring system. Obstet Gynecol 1997;90:907-10.", url: pm("9397100") },
    ],
  },
  "luka-bakar": {
    interpretation: [
      "Rule of Nines dewasa: kepala-leher 9%, tiap lengan 9%, badan depan 18%, badan belakang 18%, tiap tungkai 18%, perineum 1%.",
      "Hanya luka bakar derajat dua (partial thickness) dan tiga (full thickness) yang dihitung; luka bakar superfisial (derajat satu) tidak dimasukkan.",
      "Luas ≥20% TBSA pada dewasa umumnya memerlukan resusitasi cairan intravena terstruktur dan rujukan ke unit luka bakar.",
    ],
    material: [
      { heading: "Metode lain", body: "Untuk luka tersebar dipakai metode telapak tangan: telapak pasien termasuk jari sekitar 1% TBSA. Untuk anak, bagan Lund-Browder lebih akurat karena proporsi kepala lebih besar dan tungkai lebih kecil dibanding dewasa." },
      { heading: "Resusitasi cairan", body: "Rumus resusitasi memakai berat badan dan %TBSA (mis. Parkland 4 mL/kg/%TBSA; berbagai pedoman memakai 2–4 mL/kg/%TBSA). Setengah volume diberikan dalam 8 jam pertama sejak waktu kejadian, dan laju dititrasi menurut produksi urine. Kalkulator cairan akan ditambahkan setelah sumber dikonfirmasi." },
      { heading: "Kriteria rujukan", body: "Rujuk ke unit luka bakar bila luas, mengenai wajah, tangan, kaki, genitalia, perineum, atau sendi besar, luka bakar listrik atau kimia, cedera inhalasi, atau pada pasien dengan komorbid berat." },
    ],
    pitfalls: [
      "Jangan menghitung area eritema saja (derajat satu).",
      "Rule of Nines dewasa tidak cocok untuk bayi dan anak kecil.",
      "Waktu resusitasi dihitung sejak kejadian, bukan sejak tiba di rumah sakit.",
    ],
    cases: [
      { title: "Kasus 1", scenario: "Dewasa dengan luka bakar derajat dua di seluruh lengan kanan dan setengah badan depan.", answer: "18% TBSA", explanation: "Lengan kanan 9% + ½ × 18% = 18%." },
      { title: "Kasus 2", scenario: "Luka bakar derajat dua-tiga di kedua tungkai penuh dan perineum.", answer: "37% TBSA", explanation: "18 + 18 + 1 = 37%." },
    ],
    sources: [
      { label: "Wallace AB. The exposure treatment of burns. Lancet 1951;1:501-4 (Rule of Nines).", url: pm("14805109") },
      { label: "ISBI Practice Guidelines Committee. ISBI Practice Guidelines for Burn Care. Burns 2016;42:953-1021.", url: pm("27542292") },
    ],
  },
  "mid-parental": {
    interpretation: [
      "Laki-laki: (tinggi ayah + tinggi ibu + 13) ÷ 2. Perempuan: (tinggi ayah + tinggi ibu − 13) ÷ 2.",
      "Rentang target sekitar ±8,5 cm dari tinggi potensi genetik.",
      "Anak yang pertumbuhannya jauh di bawah rentang target keluarganya perlu dievaluasi meski masih di dalam persentil populasi.",
    ],
    material: [
      { heading: "Dasar", body: "Tanner dkk. (1970) menunjukkan bahwa memperhitungkan tinggi orang tua meningkatkan ketepatan penilaian tinggi anak: anak dengan orang tua pendek dapat normal walau di bawah persentil 3 populasi, dan sebaliknya." },
      { heading: "Pemakaian", body: "Dipakai pada evaluasi perawakan pendek untuk membedakan perawakan pendek familial, keterlambatan pertumbuhan konstitusional, dan kelainan patologis. Bandingkan juga kecepatan pertumbuhan dan usia tulang." },
      { heading: "Plot pada kurva", body: "Plot tinggi potensi genetik pada kurva pertumbuhan di usia dewasa, lalu bandingkan dengan jalur persentil anak." },
    ],
    pitfalls: [
      "Tanda ±13 tergantung jenis kelamin anak, bukan orang tua.",
      "Satuan harus cm.",
      "Tinggi potensi genetik adalah perkiraan; nutrisi dan penyakit kronik memengaruhi tinggi akhir.",
    ],
    cases: [
      { title: "Kasus 1", scenario: "Anak laki-laki, ayah 170 cm, ibu 155 cm.", answer: "169 cm (rentang 160,5–177,5)", explanation: "(170 + 155 + 13) ÷ 2 = 169." },
      { title: "Kasus 2", scenario: "Anak perempuan, ayah 165 cm, ibu 150 cm.", answer: "151 cm (rentang 142,5–159,5)", explanation: "(165 + 150 − 13) ÷ 2 = 151." },
    ],
    sources: [
      { label: "Tanner JM, Goldstein H, Whitehouse RH. Standards for children's height at ages 2–9 years allowing for heights of parents. Arch Dis Child 1970;45:755-62.", url: pm("5491878") },
    ],
  },
  pat: {
    interpretation: [
      "Tiga sisi dinilai dari pintu dalam waktu singkat: penampilan (TICLS), usaha napas, dan sirkulasi kulit.",
      "Kombinasi sisi abnormal memberi kesan umum: penampilan saja = disfungsi SSP/masalah sistemik; usaha napas saja = distres napas; sirkulasi saja = syok terkompensasi; penampilan + napas = gagal napas; penampilan + sirkulasi = syok dekompensasi; ketiganya = gagal kardiopulmoner.",
      "PAT adalah kesan awal, bukan diagnosis; lanjutkan penilaian primer ABCDE.",
    ],
    material: [
      { heading: "Komponen penampilan (TICLS)", body: "Tone (tonus), Interactiveness (interaksi), Consolability (dapat ditenangkan), Look/gaze (tatapan), Speech/cry (suara/tangis). Penampilan mencerminkan oksigenasi, ventilasi, dan perfusi otak." },
      { heading: "Usaha napas dan sirkulasi", body: "Usaha napas dinilai dari suara napas abnormal, posisi, retraksi, dan napas cuping hidung tanpa stetoskop. Sirkulasi kulit dinilai dari pucat, mottling, dan sianosis." },
      { heading: "Pemakaian", body: "PAT diajarkan dalam PEPP, PALS, dan APLS sebagai cara cepat menentukan urgensi sebelum menyentuh anak, sehingga anak tidak menangis dan penilaian lebih akurat." },
    ],
    pitfalls: [
      "PAT dinilai sebelum menyentuh anak.",
      "Penampilan abnormal adalah tanda paling penting dari keparahan.",
      "Sianosis adalah tanda lanjut; pucat dan mottling muncul lebih dahulu.",
    ],
    cases: [
      { title: "Kasus 1", scenario: "Anak sadar, aktif menangis, retraksi dan napas cuping hidung, kulit merah muda.", answer: "Distres napas", explanation: "Hanya usaha napas abnormal." },
      { title: "Kasus 2", scenario: "Anak lemas tidak merespons, kulit mottling, napas normal.", answer: "Syok dekompensasi", explanation: "Penampilan dan sirkulasi abnormal." },
    ],
    sources: [
      { label: "Dieckmann RA, Brownstein D, Gausche-Hill M. The pediatric assessment triangle: a novel approach for the rapid evaluation of children. Pediatr Emerg Care 2010;26:312-5.", url: pm("20386420") },
    ],
  },
  ballard: {
    interpretation: [
      "Enam kriteria maturitas neuromuskular dan enam maturitas fisik dijumlahkan (−10 sampai 50).",
      "Taksiran usia gestasi = (2 × skor + 120) ÷ 5 minggu; skor −10 = 20 minggu, 50 = 44 minggu, setiap 5 poin = 2 minggu.",
      "Kurang bulan <37 minggu, cukup bulan 37–41 minggu, lebih bulan ≥42 minggu.",
    ],
    material: [
      { heading: "Waktu pemeriksaan", body: "Ballard dkk. (1991) memperluas skor untuk bayi sangat prematur. Pada bayi <26 minggu, validitas tertinggi bila diperiksa dalam 12 jam pertama; untuk bayi ≥26 minggu skor tetap valid sampai 96 jam." },
      { heading: "Pemakaian bersama kurva pertumbuhan", body: "Usia gestasi dari Ballard dipakai bersama berat lahir untuk menentukan kesesuaian masa kehamilan (SMK, KMK, BMK) pada kurva Lubchenco atau Fenton." },
      { heading: "Keterbatasan", body: "Ketepatan sekitar ±2 minggu. Penanggalan dari USG trimester pertama lebih akurat bila tersedia; Ballard bermanfaat bila usia kehamilan tidak diketahui." },
    ],
    pitfalls: [
      "Permukaan plantar dan mata/telinga memiliki nilai −2 untuk bayi sangat prematur.",
      "Pemeriksaan neuromuskular dipengaruhi asfiksia, sedasi, atau kelainan neurologis.",
      "Rumus dibagi 5 setelah dikali 2 dan ditambah 120.",
    ],
    cases: [
      { title: "Kasus 1", scenario: "Total skor 24.", answer: "33,6 minggu, kurang bulan", explanation: "(2 × 24 + 120) ÷ 5 = 168 ÷ 5 = 33,6." },
      { title: "Kasus 2", scenario: "Total skor 40.", answer: "40 minggu, cukup bulan", explanation: "(80 + 120) ÷ 5 = 40." },
    ],
    sources: [
      { label: "Ballard JL dkk. New Ballard Score, expanded to include extremely premature infants. J Pediatr 1991;119:417-23.", url: pm("1880657") },
    ],
  },
  downes: {
    interpretation: [
      "Lima parameter (frekuensi napas, retraksi, sianosis, udara masuk, merintih) masing-masing 0–2, total 0–10.",
      "<4 distres napas ringan, 4–5 sedang, ≥6 berat (ancaman gagal napas).",
      "Penilaian diulang berkala untuk memantau respons terhadap oksigen atau CPAP.",
    ],
    material: [
      { heading: "Asal skor", body: "Downes dkk. (1970) mengembangkan skor klinis distres napas neonatus dan menghubungkannya dengan analisis gas darah. Skor ini luas dipakai di ruang perawatan neonatus di Indonesia." },
      { heading: "Penyebab distres napas neonatus", body: "Takipnea transien, sindrom gawat napas (penyakit membran hialin), aspirasi mekonium, pneumonia, pneumotoraks, dan kelainan jantung. Pemeriksaan foto toraks dan gas darah membantu menentukan penyebab." },
      { heading: "Tindak lanjut", body: "Distres ringan diobservasi dan diberi oksigen sesuai kebutuhan. Distres sedang memerlukan dukungan napas seperti CPAP. Distres berat memerlukan analisis gas darah dan persiapan ventilasi." },
    ],
    pitfalls: [
      "Sianosis yang hilang dengan oksigen bernilai 1, yang menetap bernilai 2.",
      "Merintih yang terdengar tanpa stetoskop bernilai 2.",
      "Skor Silverman-Andersen berbeda (makin tinggi juga makin berat, tetapi komponennya lain).",
    ],
    cases: [
      { title: "Kasus 1", scenario: "Bayi dengan RR 70, retraksi ringan, tanpa sianosis, udara masuk baik, tidak merintih.", answer: "Skor 2, ringan", explanation: "RR 60–80 (1) + retraksi ringan (1)." },
      { title: "Kasus 2", scenario: "RR 90, retraksi berat, sianosis hilang dengan O₂, udara masuk menurun ringan, merintih terdengar dengan stetoskop.", answer: "Skor 7, berat", explanation: "2 + 2 + 1 + 1 + 1 = 7." },
    ],
    sources: [
      { label: "Downes JJ dkk. Respiratory distress syndrome of newborn infants. I. New clinical scoring system (RDS score) with acid-base and blood-gas correlations. Clin Pediatr 1970;9:325-31.", url: pm("5419441") },
    ],
  },
  gir: {
    interpretation: [
      "GIR (mg/kg/menit) = (konsentrasi dekstrosa % × laju mL/jam) ÷ (6 × berat kg).",
      "GIR menunjukkan jumlah glukosa yang diterima bayi dan dipakai untuk menyesuaikan terapi hipoglikemia atau nutrisi parenteral.",
      "Konsensus hiperinsulinisme kongenital Inggris (2023): GIR normal neonatus 4–6 mg/kg/menit; GIR >8 mg/kg/menit mengarah ke hiperinsulinisme kongenital dan perlu evaluasi.",
    ],
    material: [
      { heading: "Asal rumus", body: "Dekstrosa x% berisi x gram per 100 mL atau 10x mg/mL. Glukosa per menit = 10x mg/mL × (laju mL/jam ÷ 60). Dibagi berat badan menghasilkan (x × laju) ÷ (6 × kg)." },
      { heading: "Menaikkan GIR", body: "GIR dinaikkan dengan menambah laju atau konsentrasi dekstrosa. Reddy dkk. (2017) menganjurkan tidak memberikan dekstrosa lebih dari 12,5% lewat vena perifer karena bahaya tromboflebitis." },
      { heading: "Pemantauan", body: "Ukur gula darah berkala setelah perubahan GIR. Pemberian dihentikan bertahap untuk mencegah hipoglikemia rebound." },
    ],
    pitfalls: [
      "Pembagi adalah 6, bukan 60, karena faktor 10 dari konsentrasi.",
      "Berat badan dalam kg, bukan gram.",
      "Hitung ulang GIR bila ada lebih dari satu sumber glukosa (mis. infus tambahan).",
    ],
    cases: [
      { title: "Kasus 1", scenario: "Bayi 3 kg mendapat D10% 10 mL/jam.", answer: "GIR 5,6 mg/kg/menit", explanation: "(10 × 10) ÷ (6 × 3) = 100 ÷ 18 = 5,56." },
      { title: "Kasus 2", scenario: "Bayi 1,5 kg mendapat D12,5% 6 mL/jam.", answer: "GIR 8,3 mg/kg/menit", explanation: "(12,5 × 6) ÷ (6 × 1,5) = 75 ÷ 9 = 8,33." },
    ],
    sources: [
      { label: "Shaikh MG dkk. Standardised practices in the networked management of congenital hyperinsulinism: a UK national collaborative consensus. Front Endocrinol 2023;14:1231043.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10646160/", note: "Rumus GIR dan rentang normal" },
      { label: "Reddy KV, Pandita A, Gupta G. Hypoglycemia: when to treat? Clin Med Insights Pediatr 2017;11:1179556517748913.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5734558/", note: "Batas dekstrosa 12,5% lewat vena perifer" },
    ],
  },
  "holliday-segar": {
    interpretation: [
      "Kebutuhan harian: 100 mL/kg untuk 10 kg pertama, 50 mL/kg untuk 10 kg berikutnya, 20 mL/kg untuk setiap kg di atas 20 kg.",
      "Per jam dipakai aturan 4-2-1: 4 mL/kg/jam (10 kg pertama), 2 mL/kg/jam (10 kg berikutnya), 1 mL/kg/jam (sisanya); hasilnya mendekati kebutuhan harian dibagi 24.",
      "Ini kebutuhan rumatan saja; defisit, kehilangan berkelanjutan, dan kondisi yang membatasi cairan harus diperhitungkan terpisah.",
    ],
    material: [
      { heading: "Asal rumus", body: "Holliday dan Segar (1957) mengaitkan kebutuhan air dengan kebutuhan kalori: kira-kira 100 mL air per 100 kkal yang dimetabolisme, dengan pengeluaran kalori bergantung berat badan." },
      { heading: "Pilihan cairan", body: "Pedoman terkini menganjurkan cairan isotonik untuk rumatan intravena anak karena risiko hiponatremia didapat di rumah sakit dengan cairan hipotonik." },
      { heading: "Tetesan infus", body: "Tetes per menit = (mL/jam × faktor tetes) ÷ 60. Infus set mikro 60 tetes/mL membuat tetes per menit sama dengan mL per jam." },
    ],
    pitfalls: [
      "Untuk 25 kg: 1000 + 500 + 20 × 5 = 1600 mL/hari, bukan 25 × 100.",
      "Kebutuhan maksimum pada anak besar umumnya dibatasi sekitar kebutuhan dewasa.",
      "Anak dengan gagal jantung, gagal ginjal, atau SIADH memerlukan pembatasan cairan.",
    ],
    cases: [
      { title: "Kasus 1", scenario: "Anak 15 kg.", answer: "1250 mL/hari; 50 mL/jam (4-2-1)", explanation: "Harian 1000 + 50 × 5 = 1250 mL. Per jam 4 × 10 + 2 × 5 = 50 mL/jam; 1250 ÷ 24 = 52 mL/jam, selisih kecil karena pembulatan aturan 4-2-1." },
      { title: "Kasus 2", scenario: "Anak 8 kg dengan infus set mikro.", answer: "800 mL/hari; 32 mL/jam = 32 tetes/menit", explanation: "Harian 8 × 100 = 800 mL; per jam 4 × 8 = 32 mL; set mikro 60 tetes/mL sehingga tetes/menit sama dengan mL/jam." },
    ],
    sources: [
      { label: "Holliday MA, Segar WE. The maintenance need for water in parenteral fluid therapy. Pediatrics 1957;19:823-32.", url: pm("13431307") },
      { label: "Feld LG dkk. Clinical Practice Guideline: Maintenance Intravenous Fluids in Children. Pediatrics 2018;142:e20183083.", url: pm("30478247"), note: "Rekomendasi cairan isotonik" },
    ],
  },
};
