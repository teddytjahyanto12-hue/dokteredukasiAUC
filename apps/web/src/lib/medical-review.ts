// Urutan bagian batang tubuh artikel Tinjauan Medis (struktur penulisan ilmiah).
export const REVIEW_SECTIONS = [
  { key: "introduction", label: "Pendahuluan", hint: "Latar belakang epidemiologi atau signifikansi klinis topik." },
  { key: "pathophysiology", label: "Patofisiologi / Etiologi", hint: "Ringkasan mekanisme medis terkait." },
  { key: "diagnosis", label: "Diagnosis & Manifestasi Klinis", hint: "Kriteria diagnosis, laboratorium, atau pencitraan." },
  { key: "management", label: "Tata Laksana / Algoritma", hint: "Dosis, first-line treatment, dan penanganan komplikasi." },
  { key: "conclusion", label: "Kesimpulan / Pesan Klinis (Clinical Pearls)", hint: "Takeaway message untuk praktisi/pembaca." },
] as const;
