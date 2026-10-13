import { fmt, incomplete, invalid, num, outOfRange, scoreCalc, sel, type CalcDef, type Option } from "../engine";

// Bishop score: tabel poin Bishop (Obstet Gynecol 1964) sesuai Sinha dkk. 2024 Tabel 1;
// ambang keputusan mengikuti NICE NG207 (2021) rekomendasi 1.2 dan definisi istilah.
const opt = (labels: string[]): Option[] => labels.map((label, i) => ({ value: String(i), label, points: i }));
export const bishop = scoreCalc({
  slug: "bishop",
  title: "Bishop score",
  max: 13,
  items: [
    { kind: "select", id: "dil", label: "Pembukaan serviks", options: opt(["Tertutup (0 cm)", "1–2 cm", "3–4 cm", "≥5 cm"]) },
    { kind: "select", id: "eff", label: "Pendataran serviks", options: opt(["0–30%", "40–50%", "60–70%", "≥80%"]) },
    { kind: "select", id: "sta", label: "Penurunan kepala (station)", options: opt(["−3", "−2", "−1 sampai 0", "+1 sampai +2"]) },
    { kind: "select", id: "kon", label: "Konsistensi serviks", options: opt(["Keras (firm)", "Sedang (medium)", "Lunak (soft)"]) },
    { kind: "select", id: "pos", label: "Posisi serviks", options: opt(["Posterior", "Tengah (mid position)", "Anterior"]) },
  ],
  bands: [
    { min: 0, max: 6, label: "Skor ≤6: serviks belum siap", tone: "warn", advice: "NICE NG207: tawarkan induksi dengan dinoprostone atau misoprostol oral dosis rendah, atau pertimbangkan metode mekanis (mis. kateter balon)." },
    { min: 7, max: 7, label: "Skor >6", tone: "info", advice: "NICE NG207: tawarkan induksi dengan amniotomi dan infus oksitosin intravena." },
    { min: 8, max: 13, label: "Skor ≥8: serviks siap", tone: "ok", advice: "NICE NG207: skor ≥8 umumnya menandakan serviks siap berdilatasi; skor >6 ditawarkan amniotomi dan infus oksitosin." },
  ],
  note: () => ["Pemilihan metode tetap mempertimbangkan indikasi, riwayat seksio, kondisi janin, dan ketersediaan fasilitas."],
});

// Cairan rumatan IV dewasa: NICE CG174 rekomendasi 1.4.1–1.4.4.
const SETS: Option[] = [{ value: "20", label: "Makro 20 tetes/mL" }, { value: "15", label: "Makro 15 tetes/mL" }, { value: "60", label: "Mikro 60 tetes/mL" }];
export const cairanDewasa: CalcDef = {
  slug: "cairan-dewasa",
  fields: [
    { type: "number", id: "bb", label: "Berat badan", unit: "kg", hint: "Pada obesitas, isi berat badan ideal (NICE CG174 1.4.2)." },
    { type: "select", id: "grp", label: "Kelompok pasien", columns: 1, options: [
      { value: "std", label: "Dewasa tanpa kondisi khusus (25–30 mL/kg/hari)" },
      { value: "low", label: "Lansia atau frail, gangguan ginjal, gagal jantung, atau malnutrisi berisiko refeeding (20–25 mL/kg/hari)" },
    ] },
    { type: "select", id: "set", label: "Infus set (opsional, untuk tetesan)", optional: true, options: SETS, columns: 3 },
  ],
  compute(v) {
    const w = num(v, "bb"), g = sel(v, "grp");
    if (w === null || !g) return incomplete("Isi berat badan dan kelompok pasien.");
    const e = outOfRange("Berat badan", w, 20, 250, "kg");
    if (e) return invalid(e);
    const [lo, hi] = g === "low" ? [20, 25] : [25, 30];
    const dLo = lo * w, dHi = hi * w;
    const steps = [
      `Air: ${lo}–${hi} mL/kg/hari × ${fmt(w, 1)} kg = ${fmt(dLo, 0)}–${fmt(dHi, 0)} mL/hari`,
      `Per jam (dibagi 24): ${fmt(dLo / 24, 1)}–${fmt(dHi / 24, 1)} mL/jam`,
      `Natrium, kalium, klorida: sekitar 1 mmol/kg/hari = sekitar ${fmt(w, 0)} mmol/hari masing-masing`,
      "Glukosa: sekitar 50–100 g/hari untuk membatasi ketosis kelaparan (bukan pemenuhan nutrisi)",
    ];
    const lines = [
      `Na⁺, K⁺, Cl⁻ masing-masing sekitar ${fmt(w, 0)} mmol/hari; glukosa 50–100 g/hari.`,
      "Ini resep awal untuk rumatan saja; resep berikutnya dipandu pemantauan klinis dan elektrolit.",
    ];
    if (dHi > 2500) lines.push("Lebih dari 2,5 L per hari meningkatkan risiko hiponatremia (NICE CG174 1.4.4).");
    if (dHi > 3000) lines.push("Pada obesitas, total cairan jarang perlu lebih dari 3 L per hari (NICE CG174 1.4.2).");
    const s = sel(v, "set");
    let tpm = "";
    if (s) {
      const tLo = (dLo / 24) * +s / 60, tHi = (dHi / 24) * +s / 60;
      steps.push(`Tetesan = mL/jam × ${s} ÷ 60 = ${fmt(tLo, 0)}–${fmt(tHi, 0)} tetes/menit`);
      lines.unshift(`${fmt(tLo, 0)}–${fmt(tHi, 0)} tetes/menit dengan infus set ${s} tetes/mL (bila diberikan merata 24 jam).`);
      tpm = `, ${fmt(tLo, 0)}–${fmt(tHi, 0)} tetes/menit (set ${s})`;
    }
    return {
      status: "ok", value: `${fmt(dLo, 0)}–${fmt(dHi, 0)}`, unit: "mL/hari", label: `${fmt(dLo / 24, 0)}–${fmt(dHi / 24, 0)} mL/jam`,
      tone: dHi > 2500 ? "warn" : "info", lines, steps,
      copy: `Cairan rumatan dewasa (NICE CG174) BB ${fmt(w, 1)} kg: ${fmt(dLo, 0)}–${fmt(dHi, 0)} mL/hari (${fmt(dLo / 24, 0)}–${fmt(dHi / 24, 0)} mL/jam)${tpm}; Na/K/Cl ~${fmt(w, 0)} mmol/hari`,
    };
  },
};

// Skor Alvarado: poin dan strata sesuai Ohle dkk., BMC Med 2011, Gambar 1.
export const alvarado = scoreCalc({
  slug: "alvarado",
  title: "Skor Alvarado",
  max: 10,
  items: [
    { kind: "check", id: "mig", label: "Nyeri berpindah ke kuadran kanan bawah", points: 1 },
    { kind: "check", id: "ano", label: "Anoreksia", points: 1 },
    { kind: "check", id: "nau", label: "Mual atau muntah", points: 1 },
    { kind: "check", id: "ten", label: "Nyeri tekan kuadran kanan bawah", points: 2 },
    { kind: "check", id: "reb", label: "Nyeri lepas (rebound)", points: 1 },
    { kind: "check", id: "tem", label: "Peningkatan suhu tubuh", points: 1 },
    { kind: "check", id: "leu", label: "Leukositosis", points: 2 },
    { kind: "check", id: "shi", label: "Pergeseran ke kiri (shift to the left) hitung jenis leukosit", points: 1 },
  ],
  bands: [
    { min: 0, max: 4, label: "Skor 1–4: probabilitas rendah", tone: "ok", advice: "Strata Ohle 2011: pulang (discharge) dengan edukasi tanda bahaya." },
    { min: 5, max: 6, label: "Skor 5–6: probabilitas sedang", tone: "warn", advice: "Strata Ohle 2011: observasi atau rawat; WSES 2020 menganjurkan pencitraan pada risiko menengah." },
    { min: 7, max: 10, label: "Skor 7–10: probabilitas tinggi", tone: "bad", advice: "Strata Ohle 2011: pertimbangkan pembedahan; konsultasikan ke bedah." },
  ],
  note: () => ["WSES 2020: skor klinis berguna untuk menyingkirkan apendisitis, tetapi Alvarado tidak dianjurkan sebagai satu-satunya dasar untuk memastikan apendisitis pada dewasa."],
});

// Derajat dehidrasi anak 2 bulan–5 tahun: Bagan MTBS 2022 (Kemenkes), klasifikasi diare dan Rencana Terapi A/B/C.
export const dehidrasi: CalcDef = {
  slug: "dehidrasi",
  fields: [
    { type: "select", id: "umur", label: "Umur anak", options: [{ value: "bayi", label: "2 bulan sampai <12 bulan" }, { value: "anak", label: "12 bulan sampai 5 tahun" }] },
    { type: "number", id: "bb", label: "Berat badan", unit: "kg", optional: true, hint: "Opsional, untuk menghitung jumlah cairan." },
    { type: "heading", label: "Tanda dehidrasi (MTBS 2022)" },
    { type: "select", id: "ku", label: "Keadaan umum", columns: 1, options: [
      { value: "baik", label: "Baik, sadar" }, { value: "rewel", label: "Rewel atau mudah marah" }, { value: "letargi", label: "Letargi atau tidak sadar" },
    ] },
    { type: "select", id: "mata", label: "Mata", options: [{ value: "normal", label: "Tidak cekung" }, { value: "cekung", label: "Cekung" }] },
    { type: "select", id: "minum", label: "Saat diberi minum", columns: 1, options: [
      { value: "biasa", label: "Minum biasa, tidak haus" }, { value: "haus", label: "Haus, minum dengan lahap" }, { value: "malas", label: "Tidak bisa minum atau malas minum" },
    ] },
    { type: "select", id: "turgor", label: "Cubitan kulit perut kembali", columns: 1, options: [
      { value: "cepat", label: "Segera" }, { value: "lambat", label: "Lambat (lipatan kulit masih sempat terlihat)" }, { value: "sangat", label: "Sangat lambat (>2 detik)" },
    ] },
  ],
  compute(v) {
    const umur = sel(v, "umur"), ku = sel(v, "ku"), mata = sel(v, "mata"), minum = sel(v, "minum"), turgor = sel(v, "turgor");
    if (!umur || !ku || !mata || !minum || !turgor) return incomplete("Pilih umur dan keempat tanda dehidrasi.");
    const w = num(v, "bb");
    if (w !== null) {
      const e = outOfRange("Berat badan", w, 2, 30, "kg");
      if (e) return invalid(e);
    }
    const berat = [ku === "letargi", mata === "cekung", minum === "malas", turgor === "sangat"];
    const ringan = [ku === "rewel", mata === "cekung", minum === "haus", turgor === "lambat"];
    const nb = berat.filter(Boolean).length, nr = ringan.filter(Boolean).length;
    // Tanda yang hanya ada di kelompok berat (mata cekung ada di kedua kelompok).
    const khususBerat = [ku === "letargi", minum === "malas", turgor === "sangat"].filter(Boolean).length;
    const cermat = "Terdapat tanda dehidrasi berat, tetapi bagan mensyaratkan ≥2 tanda untuk klasifikasi berat. Nilai ulang dengan cermat.";
    const steps = [
      `Tanda dehidrasi berat terpenuhi: ${nb} dari 4 (letargi/tidak sadar, mata cekung, tidak bisa/malas minum, cubitan kulit sangat lambat)`,
      `Tanda dehidrasi ringan/sedang terpenuhi: ${nr} dari 4 (rewel/mudah marah, mata cekung, haus/minum lahap, cubitan kulit lambat)`,
    ];
    const bayi = umur === "bayi";
    if (nb >= 2) {
      steps.push("≥2 tanda berat → Diare dehidrasi berat → Rencana Terapi C");
      const lines = [
        `Ringer Laktat (atau NaCl bila tidak tersedia) total 100 mL/kg: 30 mL/kg dalam ${bayi ? "1 jam" : "30 menit"}, lalu 70 mL/kg dalam ${bayi ? "5 jam" : "2½ jam"}. Ulangi 30 mL/kg pertama sekali lagi bila nadi sangat lemah atau tidak teraba.`,
        "Bila ada klasifikasi berat lain: rujuk segera; bila masih bisa minum, beri ASI dan oralit selama perjalanan.",
        `Periksa ulang setiap 15–30 menit; beri oralit sekitar 5 mL/kg/jam begitu anak bisa minum; klasifikasikan ulang setelah ${bayi ? "6 jam (bayi)" : "3 jam (anak)"}.`,
      ];
      if (w !== null) {
        steps.push(`30 mL/kg × ${fmt(w, 1)} = ${fmt(30 * w, 0)} mL; 70 mL/kg × ${fmt(w, 1)} = ${fmt(70 * w, 0)} mL`);
        lines.unshift(`Untuk ${fmt(w, 1)} kg: ${fmt(30 * w, 0)} mL dalam ${bayi ? "1 jam" : "30 menit"}, lalu ${fmt(70 * w, 0)} mL dalam ${bayi ? "5 jam" : "2½ jam"}.`);
      }
      return { status: "ok", value: "Berat", label: "Diare dehidrasi berat: Rencana Terapi C", tone: "bad", lines, steps, copy: `Diare dehidrasi berat (MTBS 2022, ${nb} tanda berat): Rencana Terapi C${w !== null ? `, RL ${fmt(30 * w, 0)} mL lalu ${fmt(70 * w, 0)} mL` : ""}` };
    }
    if (nr >= 2) {
      steps.push("≥2 tanda ringan/sedang → Diare dehidrasi ringan/sedang → Rencana Terapi B");
      const lines = [
        "Oralit di klinik selama 3 jam: berat badan (kg) × 75 mL; boleh lebih bila anak menginginkan. Beri tablet zinc 10 hari.",
        "Setelah 3 jam: nilai ulang, klasifikasikan kembali, lalu pilih rencana terapi yang sesuai.",
      ];
      if (w !== null) {
        steps.push(`Oralit 3 jam pertama = ${fmt(w, 1)} × 75 = ${fmt(75 * w, 0)} mL`);
        lines.unshift(`Oralit 3 jam pertama untuk ${fmt(w, 1)} kg: ${fmt(75 * w, 0)} mL.`);
      }
      if (khususBerat) lines.push(cermat);
      return { status: "ok", value: "Ringan/sedang", label: "Diare dehidrasi ringan/sedang: Rencana Terapi B", tone: "warn", lines, steps, copy: `Diare dehidrasi ringan/sedang (MTBS 2022): Rencana Terapi B${w !== null ? `, oralit ${fmt(75 * w, 0)} mL dalam 3 jam` : ""}` };
    }
    steps.push("Tidak cukup tanda → Diare tanpa dehidrasi → Rencana Terapi A");
    const lines = [
      `Rencana Terapi A: cairan tambahan di rumah, oralit ${bayi ? "50–100 mL (umur sampai 1 tahun)" : "100–200 mL (umur 1–5 tahun)"} setiap kali buang air besar; tablet zinc 10 hari; lanjutkan makan; ajari kapan harus kembali.`,
    ];
    if (khususBerat) lines.push(cermat);
    return { status: "ok", value: "Tanpa dehidrasi", label: "Diare tanpa dehidrasi: Rencana Terapi A", tone: "ok", lines, steps, copy: "Diare tanpa dehidrasi (MTBS 2022): Rencana Terapi A" };
  },
};

// Kebutuhan energi pasien DM tipe 2 dewasa: PNPK DM 2026 (KMK HK.01.07/MENKES/302/2026) hal. 20–21.
const AKTIVITAS: Record<string, [number, number, string]> = { rendah: [25, 30, "rendah"], sedang: [30, 35, "sedang"], tinggi: [35, 40, "tinggi"] };
export const kalori: CalcDef = {
  slug: "kalori",
  fields: [
    { type: "select", id: "sex", label: "Jenis kelamin", options: [{ value: "L", label: "Laki-laki" }, { value: "P", label: "Perempuan" }] },
    { type: "number", id: "tb", label: "Tinggi badan", unit: "cm" },
    { type: "number", id: "bb", label: "Berat badan aktual", unit: "kg" },
    { type: "select", id: "akt", label: "Tingkat aktivitas", columns: 3, options: [
      { value: "rendah", label: "Rendah" }, { value: "sedang", label: "Sedang" }, { value: "tinggi", label: "Tinggi" },
    ] },
  ],
  compute(v) {
    const sex = sel(v, "sex"), tb = num(v, "tb"), bb = num(v, "bb"), akt = sel(v, "akt");
    if (!sex || tb === null || bb === null || !akt) return incomplete("Isi jenis kelamin, tinggi, berat, dan aktivitas.");
    const e = outOfRange("Tinggi badan", tb, 120, 220, "cm") ?? outOfRange("Berat badan", bb, 25, 250, "kg");
    if (e) return invalid(e);
    const pendek = (sex === "L" && tb < 160) || (sex === "P" && tb < 150);
    const bbi = (pendek ? 1 : 0.9) * (tb - 100);
    const status = bb < bbi * 0.9 ? "kurus" : bb > bbi * 1.1 ? "gemuk" : "normal";
    const dipakai = status === "kurus" ? bb : bbi;
    const [lo, hi] = AKTIVITAS[akt];
    const steps = [
      pendek ? `BBI (Broca dimodifikasi, ${sex === "L" ? "pria <160 cm" : "wanita <150 cm"}) = (${fmt(tb, 1)} − 100) × 1 = ${fmt(bbi, 1)} kg` : `BBI (Broca dimodifikasi) = 90% × (${fmt(tb, 1)} − 100) = ${fmt(bbi, 1)} kg`,
      `Status berat: BB ${fmt(bb, 1)} kg dibanding BBI ±10% (${fmt(bbi * 0.9, 1)}–${fmt(bbi * 1.1, 1)} kg) → ${status}`,
      status === "kurus" ? `BB kurang: perhitungan memakai BB aktual ${fmt(bb, 1)} kg` : `BB ${status}: perhitungan memakai BBI ${fmt(bbi, 1)} kg`,
      `Aktivitas ${AKTIVITAS[akt][2]}: ${lo}–${hi} kkal/kg/hari × ${fmt(dipakai, 1)} kg = ${fmt(lo * dipakai, 0)}–${fmt(hi * dipakai, 0)} kkal/hari`,
    ];
    return {
      status: "ok", value: `${fmt(lo * dipakai, 0)}–${fmt(hi * dipakai, 0)}`, unit: "kkal/hari", label: `BBI ${fmt(bbi, 1)} kg; status berat ${status}`, tone: "info",
      lines: [
        "Rumus praktis (rule of thumb) PNPK DM 2026 tidak perlu dikalikan faktor aktivitas fisik maupun faktor stres metabolik.",
        `Alternatif BBI menurut IMT 22: ${fmt(22 * (tb / 100) ** 2, 1)} kg.`,
      ],
      steps,
      copy: `Kebutuhan energi (PNPK DM 2026): ${fmt(lo * dipakai, 0)}–${fmt(hi * dipakai, 0)} kkal/hari (BBI ${fmt(bbi, 1)} kg, status ${status}, aktivitas ${AKTIVITAS[akt][2]})`,
    };
  },
};

// Derajat gangguan dengar dewasa: WHO World Report on Hearing 2021, Tabel 1.3 (rata-rata 500, 1000, 2000, 4000 Hz di telinga yang lebih baik).
const FREQ = ["500", "1000", "2000", "4000"];
const GRADES: [number, string, "ok" | "info" | "warn" | "bad"][] = [
  [20, "Pendengaran normal (<20 dB)", "ok"], [35, "Gangguan dengar ringan (20 sampai <35 dB)", "info"], [50, "Gangguan dengar sedang (35 sampai <50 dB)", "warn"],
  [65, "Gangguan dengar sedang-berat (50 sampai <65 dB)", "warn"], [80, "Gangguan dengar berat (65 sampai <80 dB)", "bad"], [95, "Gangguan dengar sangat berat (80 sampai <95 dB)", "bad"],
  [Infinity, "Tuli total (≥95 dB)", "bad"],
];
export const gangguanDengar: CalcDef = {
  slug: "gangguan-dengar",
  fields: [
    { type: "heading", label: "Telinga kanan", hint: "Ambang dengar hantaran udara dari audiogram (dB HL)." },
    ...FREQ.map((f) => ({ type: "number" as const, id: `ka${f}`, label: `Kanan ${f} Hz`, unit: "dB" })),
    { type: "heading", label: "Telinga kiri" },
    ...FREQ.map((f) => ({ type: "number" as const, id: `ki${f}`, label: `Kiri ${f} Hz`, unit: "dB" })),
  ],
  compute(v) {
    const ka = FREQ.map((f) => num(v, `ka${f}`)), ki = FREQ.map((f) => num(v, `ki${f}`));
    if ([...ka, ...ki].some((x) => x === null)) return incomplete("Isi ambang dengar keempat frekuensi untuk kedua telinga.");
    const bad = [...ka, ...ki].find((x) => x! < -10 || x! > 130);
    if (bad !== undefined) return invalid("Ambang dengar harus −10 sampai 130 dB.");
    const avg = (a: (number | null)[]) => a.reduce<number>((s, x) => s + (x ?? 0), 0) / 4;
    const rKa = avg(ka), rKi = avg(ki);
    const better = Math.min(rKa, rKi), worse = Math.max(rKa, rKi);
    const [, label, tone] = GRADES.find(([max]) => better < max)!;
    const unilateral = better < 20 && worse >= 35;
    const steps = [
      `Kanan: (${ka.map((x) => fmt(x!, 0)).join(" + ")}) ÷ 4 = ${fmt(rKa, 1)} dB`,
      `Kiri: (${ki.map((x) => fmt(x!, 0)).join(" + ")}) ÷ 4 = ${fmt(rKi, 1)} dB`,
      `Telinga yang lebih baik: ${rKa <= rKi ? "kanan" : "kiri"} (${fmt(better, 1)} dB) → ${label}`,
    ];
    if (unilateral) steps.push(`Telinga yang lebih baik <20 dB dan yang lebih buruk ${fmt(worse, 1)} dB (≥35) → gangguan dengar unilateral`);
    return {
      status: "ok", value: fmt(better, 1), unit: "dB (telinga lebih baik)", label: unilateral ? "Gangguan dengar unilateral" : label, tone: unilateral ? "warn" : tone,
      lines: [
        `Rata-rata kanan ${fmt(rKa, 1)} dB; kiri ${fmt(rKi, 1)} dB.`,
        "WHO: klasifikasi ini untuk dewasa dan keperluan epidemiologis; tidak dipakai sebagai satu-satunya dasar menilai disabilitas atau memberi alat bantu dengar.",
      ],
      steps,
      copy: `Derajat gangguan dengar (WHO 2021): ${unilateral ? "unilateral" : label}; rata-rata 4 frekuensi kanan ${fmt(rKa, 1)} dB, kiri ${fmt(rKi, 1)} dB`,
    };
  },
};
