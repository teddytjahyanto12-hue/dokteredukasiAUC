import { incomplete, sel, yes, type CalcDef, type Option, type Tone } from "../engine";

// Asma bronkial dewasa: PPK FKTP KMK HK.01.07/MENKES/1186/2022, Tabel 10.3 (hal. 447–448) dan Tabel 10.4 (hal. 449).
const DERAJAT: [string, Tone][] = [["Intermiten", "ok"], ["Persisten ringan", "warn"], ["Persisten sedang", "bad"], ["Persisten berat", "bad"]];
const opt = (labels: string[]): Option[] => labels.map((label, i) => ({ value: String(i), label }));

export const asma: CalcDef = {
  slug: "asma",
  fields: [
    { type: "select", id: "gejala", label: "Gejala (siang)", columns: 1, options: opt(["Bulanan: <1 kali/minggu, tanpa gejala di luar serangan, serangan singkat", "Mingguan: >1 kali/minggu tetapi <1 kali/hari, serangan dapat mengganggu aktivitas dan tidur", "Harian: gejala setiap hari, serangan mengganggu aktivitas dan tidur, butuh bronkodilator setiap hari", "Kontinyu: gejala terus-menerus, sering kambuh, aktivitas fisik terbatas"]) },
    { type: "select", id: "malam", label: "Gejala malam", columns: 2, options: opt(["≤2 kali sebulan", ">2 kali sebulan", ">1 kali seminggu", "Sering"]) },
    { type: "select", id: "faal", label: "Faal paru (APE atau VEP1 % prediksi/nilai terbaik)", columns: 3, optional: true, hint: "Bila spirometri tersedia, pakai VEP1.", options: [
      { value: "0", label: "≥80%" }, { value: "2", label: "60–80%" }, { value: "3", label: "≤60%" },
    ] },
    { type: "select", id: "var", label: "Variabilitas APE", columns: 3, optional: true, options: [
      { value: "0", label: "<20%" }, { value: "1", label: "20–30%" }, { value: "2", label: ">30%" },
    ] },
  ],
  compute(v) {
    const g = sel(v, "gejala"), m = sel(v, "malam"), f = sel(v, "faal"), va = sel(v, "var");
    if (!g || !m) return incomplete("Pilih gejala siang dan gejala malam.");
    const komponen: [string, number][] = [["Gejala", +g], ["Gejala malam", +m]];
    if (f) komponen.push(["Faal paru", +f]);
    // Variabilitas >30% tercantum pada derajat persisten sedang dan berat; diberi derajat minimal persisten sedang.
    if (va) komponen.push(["Variabilitas APE", +va === 2 ? 2 : +va]);
    const k = Math.max(...komponen.map(([, x]) => x));
    const [label, tone] = DERAJAT[k];
    return {
      status: "ok", value: label, label: `Asma ${label.toLowerCase()}`, tone,
      lines: [
        "Derajat ditentukan oleh komponen dengan derajat paling berat (aturan penyusun; Tabel 10.3 PPK FKTP tidak menuliskan aturan penggabungan).",
        "Diagnosis klinis asma pada PPK FKTP: kenaikan rasio APE ≥15% sebelum dan sesudah inhalasi salbutamol.",
      ],
      steps: komponen.map(([n, x]) => `${n}: ${DERAJAT[x][0]}`).concat(`Derajat akhir (komponen paling berat): ${label}`),
      copy: `Asma ${label.toLowerCase()} (PPK FKTP 2022 Tabel 10.3)`,
    };
  },
};

const KONTROL: [string, string][] = [
  ["harian", "Gejala harian >2 kali/minggu"],
  ["aktivitas", "Keterbatasan aktivitas"],
  ["malam", "Gejala malam atau terbangun"],
  ["pelega", "Butuh pelega/inhaler >2 kali/minggu"],
  ["faal", "Fungsi paru (APE atau VEP1, tanpa bronkodilator) <80% prediksi atau nilai terbaik"],
];
export const asmaKontrol: CalcDef = {
  slug: "asma-kontrol",
  fields: [
    { type: "heading", label: "Penilaian klinis 4 minggu terakhir", hint: "Fungsi paru tidak dinilai pada anak 5 tahun atau lebih muda." },
    ...KONTROL.map(([id, label]) => ({ type: "check" as const, id, label })),
    { type: "check", id: "eksaserbasi", label: "Eksaserbasi dalam minggu yang dinilai" },
  ],
  compute(v) {
    const ada = KONTROL.filter(([id]) => yes(v, id));
    const n = ada.length;
    const eks = yes(v, "eksaserbasi");
    const [label, tone]: [string, Tone] = eks || n >= 3 ? ["Tidak terkontrol", "bad"] : n >= 1 ? ["Terkontrol sebagian", "warn"] : ["Terkontrol", "ok"];
    return {
      status: "ok", value: label, label: `${n} dari 5 gambaran kontrol yang terganggu`, tone,
      lines: [
        "Tabel 10.4 PPK FKTP: terkontrol bila tidak ada gambaran; terkontrol sebagian bila terdapat gambaran; tidak terkontrol bila tiga atau lebih gambaran. Dua gambaran digolongkan terkontrol sebagian (tabel hanya menulis 'salah satu' dan 'tiga atau lebih').",
        ...(eks ? ["Menurut definisi, eksaserbasi pada minggu mana pun membuat asma tidak terkontrol."] : []),
        "Risiko masa depan meningkat dengan kontrol klinis buruk, eksaserbasi berulang, riwayat rawat karena asma, pajanan asap rokok, dan penggunaan obat dosis tinggi.",
      ],
      steps: [...ada.map(([, l]) => `Ada: ${l}`), ...(eks ? ["Ada eksaserbasi"] : []), `Jumlah gambaran = ${n} → ${label}`],
      copy: `Kontrol asma (PPK FKTP 2022 Tabel 10.4): ${label} (${n}/5 gambaran${eks ? ", ada eksaserbasi" : ""})`,
    };
  },
};

// Rinitis alergi: ARIA 2008 (Bousquet dkk., Allergy 2008;63 Suppl 86:8-160), Tabel 4 (hal. 14).
const GANGGU: [string, string][] = [
  ["tidur", "Gangguan tidur"],
  ["aktivitas", "Gangguan aktivitas harian, santai, dan/atau olahraga"],
  ["sekolah", "Gangguan sekolah atau kerja"],
  ["mengganggu", "Gejala terasa mengganggu (troublesome)"],
];
export const aria: CalcDef = {
  slug: "aria",
  fields: [
    { type: "select", id: "lama", label: "Lama gejala", columns: 1, options: [
      { value: "int", label: "<4 hari/minggu ATAU <4 minggu berturut-turut" },
      { value: "per", label: ">4 hari/minggu DAN >4 minggu berturut-turut" },
    ] },
    { type: "heading", label: "Dampak gejala" },
    ...GANGGU.map(([id, label]) => ({ type: "check" as const, id, label })),
  ],
  compute(v) {
    const lama = sel(v, "lama");
    if (!lama) return incomplete("Pilih lama gejala.");
    const ada = GANGGU.filter(([id]) => yes(v, id));
    const berat = ada.length > 0;
    const label = `${lama === "per" ? "Persisten" : "Intermiten"} ${berat ? "sedang-berat" : "ringan"}`;
    return {
      status: "ok", value: label, label: "Rinitis alergi menurut ARIA 2008", tone: berat ? "warn" : "ok",
      lines: [
        "Ringan: tidak ada gangguan tidur, aktivitas, sekolah/kerja, dan gejala tidak mengganggu. Sedang-berat: satu atau lebih dampak tersebut.",
        ...(lama === "per" ? ["ARIA 2008: pasien rinitis alergi persisten perlu dievaluasi untuk asma."] : []),
      ],
      steps: [`Lama gejala → ${lama === "per" ? "persisten" : "intermiten"}`, ada.length ? `Dampak: ${ada.map(([, l]) => l.toLowerCase()).join("; ")} → sedang-berat` : "Tanpa dampak → ringan"],
      copy: `Rinitis alergi ${label.toLowerCase()} (ARIA 2008)`,
    };
  },
};
