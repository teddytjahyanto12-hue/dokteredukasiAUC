// Pembahasan & materi: Umum dan Penyakit Dalam (khusus server).
import type { CalcContent } from "./registry";

const pm = (id: string) => `https://pubmed.ncbi.nlm.nih.gov/${id}/`;

export const CONTENT_UMUM_PD: Record<string, CalcContent> = {
  imt: {
    interpretation: [
      "IMT = berat (kg) dibagi kuadrat tinggi (m). Batas Asia-Pasifik lebih rendah daripada batas global karena risiko metabolik populasi Asia meningkat pada IMT lebih rendah.",
      "Kategori Asia-Pasifik: kurang <18,5; normal 18,5–22,9; berat badan lebih/berisiko 23–24,9; obesitas I 25–29,9; obesitas II ≥30.",
      "IMT tidak membedakan otot dan lemak; lengkapi dengan lingkar pinggang untuk menilai obesitas sentral.",
    ],
    material: [
      { heading: "Mengapa batas Asia berbeda", body: "Laporan WHO Western Pacific tahun 2000 menyatakan populasi Asia memiliki persentase lemak tubuh lebih tinggi pada IMT yang sama dan risiko diabetes serta penyakit kardiovaskular meningkat pada IMT lebih rendah. Karena itu kategori berat badan lebih dimulai dari 23 dan obesitas dari 25." },
      { heading: "Keterbatasan", body: "IMT kurang tepat pada atlet bermassa otot besar, lansia dengan sarkopenia, ibu hamil, dan pasien dengan edema atau asites. Untuk anak dan remaja dipakai IMT menurut umur (z-score), bukan kategori dewasa." },
      { heading: "Pemakaian klinis", body: "IMT dipakai untuk skrining status gizi, menghitung dosis tertentu, dan stratifikasi risiko (mis. komponen STOP-BANG memakai IMT >35). Catat juga tren berat badan karena penurunan tanpa sengaja lebih bermakna daripada satu nilai IMT." },
    ],
    pitfalls: [
      "Tinggi harus diubah ke meter sebelum dikuadratkan (170 cm = 1,70 m), bukan dibagi 100 setelah dikuadratkan.",
      "Soal yang menyebut \"populasi Asia\" atau \"Indonesia\" memakai batas Asia-Pasifik; batas WHO global (25 berat lebih, 30 obesitas) berbeda.",
      "Jangan memakai kategori dewasa untuk anak <18 tahun.",
    ],
    cases: [
      { title: "Kasus 1", scenario: "Laki-laki 40 tahun, BB 70 kg, TB 168 cm.", answer: "IMT 24,8 kg/m², berat badan lebih/berisiko", explanation: "1,68² = 2,8224; 70 ÷ 2,8224 = 24,8. Menurut batas Asia-Pasifik masuk 23–24,9." },
      { title: "Kasus 2", scenario: "Perempuan 25 tahun, BB 45 kg, TB 160 cm.", answer: "IMT 17,6 kg/m², berat badan kurang", explanation: "1,60² = 2,56; 45 ÷ 2,56 = 17,6 (<18,5)." },
    ],
    sources: [
      { label: "WHO Regional Office for the Western Pacific. The Asia-Pacific perspective: redefining obesity and its treatment. 2000.", url: "https://iris.who.int/handle/10665/206936", note: "Batas IMT Asia-Pasifik" },
    ],
  },
  map: {
    interpretation: [
      "MAP mencerminkan tekanan perfusi rata-rata organ. Pada frekuensi jantung normal, diastole lebih lama sehingga MAP mendekati DBP + ⅓ tekanan nadi.",
      "Pada syok septik yang memerlukan vasopresor, target awal MAP adalah 65 mmHg (Surviving Sepsis Campaign 2021).",
      "Rumus perkiraan kurang akurat pada takikardia berat; pengukuran invasif (arteri line) menampilkan MAP langsung.",
    ],
    material: [
      { heading: "Rumus", body: "MAP = DBP + (SBP − DBP)/3, atau (SBP + 2 × DBP)/3. Contoh TD 120/80: 80 + 40/3 = 93 mmHg." },
      { heading: "Mengapa 65 mmHg", body: "Di bawah ambang autoregulasi, aliran darah ke ginjal, otak, dan jantung menurun. Target 65 mmHg dipakai sebagai titik awal pada syok septik, kemudian disesuaikan dengan tanda perfusi seperti produksi urine, kesadaran, dan laktat." },
      { heading: "Pemakaian lain", body: "MAP dipakai untuk menghitung tekanan perfusi serebral (CPP = MAP − TIK) pada cedera otak dan sebagai bagian dari skor SOFA kardiovaskular (MAP <70 mmHg)." },
    ],
    pitfalls: [
      "MAP bukan rata-rata sederhana (SBP + DBP)/2.",
      "MAP normal tidak menyingkirkan hipoperfusi; tetap nilai laktat, CRT, dan urine.",
      "Pada soal SOFA, ambang kardiovaskular adalah MAP <70 mmHg, berbeda dengan target resusitasi 65 mmHg.",
    ],
    cases: [
      { title: "Kasus 1", scenario: "Pasien sepsis dengan TD 84/46 mmHg setelah resusitasi cairan.", answer: "MAP 59 mmHg, di bawah target 65", explanation: "46 + (84 − 46)/3 = 46 + 12,7 = 58,7 mmHg; pertimbangkan vasopresor sesuai protokol." },
      { title: "Kasus 2", scenario: "TD 150/90 mmHg.", answer: "MAP 110 mmHg", explanation: "90 + 60/3 = 110 mmHg." },
    ],
    sources: [
      { label: "Evans L dkk. Surviving Sepsis Campaign: international guidelines 2021. Crit Care Med 2021;49:e1063.", url: pm("34605781"), note: "Target MAP 65 mmHg" },
    ],
  },
  qsofa: {
    interpretation: [
      "Satu poin untuk masing-masing: laju napas ≥22/menit, perubahan status mental, dan TD sistolik ≤100 mmHg. Skor ≥2 menandai risiko luaran buruk pada pasien dengan dugaan infeksi.",
      "qSOFA bukan definisi sepsis. Sepsis-3 mendefinisikan sepsis sebagai disfungsi organ yang mengancam jiwa akibat respons tubuh terhadap infeksi, diukur dengan kenaikan SOFA ≥2.",
      "Surviving Sepsis Campaign 2021 tidak menganjurkan qSOFA dipakai sendirian sebagai alat skrining sepsis dibanding SIRS, NEWS, atau MEWS.",
    ],
    material: [
      { heading: "Asal skor", body: "qSOFA diperkenalkan bersama definisi Sepsis-3 (2016) sebagai penilaian cepat di luar ICU tanpa pemeriksaan laboratorium. Skor ini diturunkan dari data rekam medis untuk memprediksi kematian di rumah sakit atau rawat ICU ≥3 hari." },
      { heading: "Kelebihan dan kekurangan", body: "Spesifisitas tinggi untuk luaran buruk tetapi sensitivitas rendah, sehingga skor <2 tidak menyingkirkan sepsis. Karena itu pedoman terbaru menganjurkan kombinasi dengan penilaian klinis dan skor lain." },
      { heading: "Langkah berikutnya", body: "Pada qSOFA ≥2 dengan dugaan infeksi: periksa laktat dan fungsi organ (SOFA), ambil kultur, berikan antibiotik dan resusitasi cairan sesuai protokol sepsis." },
    ],
    pitfalls: [
      "Ambang TD adalah sistolik ≤100 (bukan <90) dan laju napas ≥22 (bukan >20 seperti SIRS).",
      "qSOFA ≥2 tanpa infeksi bukan sepsis; qSOFA hanya dipakai pada dugaan infeksi.",
      "Perubahan mental didefinisikan sebagai GCS <15.",
    ],
    cases: [
      { title: "Kasus 1", scenario: "Pneumonia, RR 26/menit, GCS 14, TD 110/70 mmHg.", answer: "qSOFA 2, risiko tinggi", explanation: "RR ≥22 (+1) dan GCS <15 (+1); TD sistolik >100 (0)." },
      { title: "Kasus 2", scenario: "ISK, RR 20/menit, sadar penuh, TD 95/60 mmHg.", answer: "qSOFA 1", explanation: "Hanya TD sistolik ≤100 yang terpenuhi; tetap nilai klinis dan laktat." },
    ],
    sources: [
      { label: "Singer M dkk. The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3). JAMA 2016;315:801-10.", url: pm("26903338") },
      { label: "Evans L dkk. Surviving Sepsis Campaign 2021. Crit Care Med 2021;49:e1063.", url: pm("34605781"), note: "Rekomendasi tentang qSOFA sebagai skrining" },
    ],
  },
  sirs: {
    interpretation: [
      "SIRS terpenuhi bila ≥2 dari: suhu >38 °C atau <36 °C; nadi >90/menit; RR >20/menit atau PaCO₂ <32 mmHg; leukosit >12.000, <4.000/mm³, atau batang >10%.",
      "Menurut konsensus 1992, SIRS dengan infeksi = sepsis. Sepsis-3 (2016) mengganti definisi tersebut dengan disfungsi organ (SOFA).",
      "SIRS sangat sensitif tetapi tidak spesifik; dapat positif pada trauma, luka bakar, pankreatitis, dan pascaoperasi.",
    ],
    material: [
      { heading: "Konsensus 1992", body: "ACCP/SCCM memperkenalkan istilah SIRS untuk respons inflamasi sistemik terhadap berbagai cedera, infeksi maupun non-infeksi. Istilah sepsis berat dan syok septik juga berasal dari konsensus ini." },
      { heading: "Posisi saat ini", body: "Walau definisi sepsis berubah, kriteria SIRS masih dipakai sebagai alat skrining di banyak rumah sakit dan muncul dalam soal ujian. Pedoman Surviving Sepsis 2021 menyebut SIRS sebagai salah satu pilihan skrining bersama NEWS dan MEWS." },
      { heading: "Kaitan dengan skor lain", body: "Kriteria RR >20 dan nadi >90 juga menjadi bagian skor lain (mis. PERC, sepsis anak memakai ambang sesuai usia)." },
    ],
    pitfalls: [
      "Ambang SIRS RR >20 berbeda dengan qSOFA RR ≥22.",
      "Leukosit normal tidak meniadakan kriteria leukosit bila batang >10%.",
      "Kriteria SIRS anak memakai ambang sesuai usia, bukan ambang dewasa.",
    ],
    cases: [
      { title: "Kasus 1", scenario: "Suhu 38,6 °C, nadi 110/menit, RR 18/menit, leukosit 9.000.", answer: "SIRS terpenuhi (2 kriteria)", explanation: "Suhu >38 dan nadi >90 masing-masing satu kriteria." },
      { title: "Kasus 2", scenario: "Suhu 37,2 °C, nadi 96/menit, RR 18/menit, leukosit 11.000, batang 6%.", answer: "1 kriteria, SIRS tidak terpenuhi", explanation: "Hanya nadi >90." },
    ],
    sources: [
      { label: "Bone RC dkk. ACCP/SCCM Consensus Conference: definitions for sepsis and organ failure. Chest 1992;101:1644-55.", url: pm("1303622") },
    ],
  },
  agd: {
    interpretation: [
      "Langkah: (1) cek konsistensi data, (2) tentukan asidemia/alkalemia dari pH, (3) tentukan gangguan primer dari pCO₂ dan HCO₃⁻, (4) nilai kompensasi yang diharapkan, (5) hitung anion gap pada asidosis metabolik, (6) hitung rasio delta bila anion gap tinggi.",
      "Kompensasi tidak pernah mengembalikan pH sepenuhnya ke normal; pH normal dengan pCO₂ dan HCO₃⁻ abnormal mengarah ke gangguan campuran.",
      "Nilai rujukan dipakai: pH 7,35–7,45; pCO₂ 35–45 mmHg; HCO₃⁻ 22–26 mEq/L; anion gap sekitar 8–12 mEq/L (tergantung laboratorium).",
    ],
    material: [
      { heading: "Rumus kompensasi", body: "Asidosis metabolik (Winter): pCO₂ harapan = 1,5 × HCO₃⁻ + 8 ± 2. Alkalosis metabolik: pCO₂ naik sekitar 0,7 mmHg per kenaikan 1 mEq/L HCO₃⁻. Asidosis respiratorik: HCO₃⁻ naik 1 (akut) atau 4 (kronik) per kenaikan pCO₂ 10 mmHg. Alkalosis respiratorik: HCO₃⁻ turun 2 (akut) atau 4 (kronik) per penurunan pCO₂ 10 mmHg." },
      { heading: "Anion gap", body: "AG = Na⁺ − (Cl⁻ + HCO₃⁻). Albumin adalah anion utama yang tidak terukur; setiap penurunan albumin 1 g/dL di bawah 4 menurunkan AG sekitar 2,5, sehingga AG perlu dikoreksi pada hipoalbuminemia. Penyebab asidosis AG tinggi antara lain ketoasidosis, asidosis laktat, gagal ginjal, dan keracunan (metanol, etilen glikol, salisilat)." },
      { heading: "Rasio delta", body: "Rasio delta = (AG − 12) ÷ (24 − HCO₃⁻). Nilai <1 menunjukkan asidosis AG normal bersamaan, 1–2 asidosis AG tinggi murni, >2 alkalosis metabolik bersamaan." },
    ],
    pitfalls: [
      "Jangan menentukan gangguan primer dari pCO₂ atau HCO₃⁻ saja; mulai dari pH.",
      "Lupa mengoreksi anion gap pada albumin rendah membuat asidosis AG tinggi terlewat.",
      "pH normal tidak selalu berarti normal: periksa apakah pCO₂ dan HCO₃⁻ bergeser berlawanan arah.",
    ],
    cases: [
      { title: "Kasus 1: ketoasidosis", scenario: "pH 7,20; pCO₂ 25; HCO₃⁻ 10; Na 135; Cl 100.", answer: "Asidosis metabolik AG tinggi dengan kompensasi sesuai", explanation: "Winter: 1,5 × 10 + 8 = 23 ± 2 (21–25), pCO₂ 25 sesuai. AG = 135 − 110 = 25. Rasio delta = 13 ÷ 14 = 0,93: cenderung disertai asidosis AG normal." },
      { title: "Kasus 2: PPOK", scenario: "pH 7,33; pCO₂ 60; HCO₃⁻ 31.", answer: "Asidosis respiratorik, pola kronik", explanation: "HCO₃⁻ harapan akut 26, kronik 32; nilai 31 lebih dekat ke kronik." },
    ],
    sources: [
      { label: "Berend K, de Vries APJ, Gans ROB. Physiological approach to assessment of acid–base disturbances. N Engl J Med 2014;371:1434-45.", url: pm("25295502") },
    ],
  },
  egfr: {
    interpretation: [
      "eGFR CKD-EPI 2021 tidak memakai koefisien ras dan direkomendasikan untuk dewasa ≥18 tahun.",
      "Kategori GFR KDIGO: G1 ≥90, G2 60–89, G3a 45–59, G3b 30–44, G4 15–29, G5 <15 mL/menit/1,73 m². Kategori albuminuria: A1 <30, A2 30–300, A3 >300 mg/g.",
      "Diagnosis PGK memerlukan kelainan yang menetap >3 bulan. G1 atau G2 tanpa penanda kerusakan ginjal bukan PGK.",
      "CrCl Cockcroft-Gault (mL/menit, tidak dinormalisasi luas permukaan tubuh) masih dipakai di banyak label obat untuk penyesuaian dosis.",
    ],
    material: [
      { heading: "Persamaan CKD-EPI 2021", body: "eGFR = 142 × min(Scr/κ, 1)^α × max(Scr/κ, 1)^−1,200 × 0,9938^usia × 1,012 (perempuan); κ 0,7 (perempuan) atau 0,9 (laki-laki), α −0,241 (perempuan) atau −0,302 (laki-laki). Kreatinin dalam mg/dL; µmol/L dibagi 88,4." },
      { heading: "Matriks risiko KDIGO", body: "Risiko progresivitas dan komplikasi meningkat dari rendah (G1–G2 A1), sedang, tinggi, sampai sangat tinggi (mis. G3b A2 ke atas, semua G4–G5). Kategori ini menentukan frekuensi pemantauan dan kebutuhan rujukan ke nefrolog." },
      { heading: "Kapan eGFR tidak akurat", body: "Kreatinin dipengaruhi massa otot, diet, dan beberapa obat. eGFR tidak valid pada gangguan ginjal akut (kreatinin belum stabil), massa otot ekstrem, amputasi, atau kehamilan. Pertimbangkan cystatin C atau pengukuran klirens bila perlu." },
    ],
    pitfalls: [
      "eGFR tidak dipakai pada AKI karena kreatinin belum mencapai keadaan stabil.",
      "Kategori G hanya satu bagian; staging lengkap KDIGO menyertakan kategori albuminuria (A).",
      "Cockcroft-Gault memakai berat badan dan menghasilkan mL/menit, sedangkan CKD-EPI menghasilkan mL/menit/1,73 m².",
    ],
    cases: [
      { title: "Kasus 1", scenario: "Laki-laki 60 tahun, kreatinin 1,5 mg/dL, ACR 50 mg/g.", answer: "eGFR sekitar 53 → G3a, A2: risiko tinggi", explanation: "Scr/κ = 1,67; 142 × 1,67^−1,2 × 0,9938^60 ≈ 53. G3a dengan A2 berada di kotak risiko tinggi KDIGO." },
      { title: "Kasus 2", scenario: "Perempuan 30 tahun, kreatinin 0,7 mg/dL.", answer: "eGFR sekitar 119 → G1", explanation: "Scr/κ = 1, sehingga kedua suku kreatinin bernilai 1; 142 × 0,9938^30 × 1,012 ≈ 119. Tanpa penanda kerusakan ginjal bukan PGK." },
    ],
    sources: [
      { label: "Inker LA dkk. New creatinine- and cystatin C–based equations to estimate GFR without race. N Engl J Med 2021;385:1737-49.", url: pm("34554658") },
      { label: "Cockcroft DW, Gault MH. Prediction of creatinine clearance from serum creatinine. Nephron 1976;16:31-41.", url: pm("1244564") },
      { label: "KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of CKD. Kidney Int 2024;105(4S):S117-S314.", url: "https://kdigo.org/guidelines/ckd-evaluation-and-management/", note: "Kategori G/A dan matriks risiko" },
    ],
  },
};
