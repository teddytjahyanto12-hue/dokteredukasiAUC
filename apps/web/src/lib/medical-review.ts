// Bagian isi artikel Tinjauan Medis disimpan sebagai JSON [{ title, body }] dan bebas diatur admin.
export type ReviewSection = { title: string; body: string };

// Usulan judul bagian untuk artikel baru (struktur penulisan ilmiah); admin boleh mengubah, menghapus, atau menambah.
export const DEFAULT_SECTION_TITLES = [
  "Pendahuluan",
  "Patofisiologi / Etiologi",
  "Diagnosis & Manifestasi Klinis",
  "Tata Laksana / Algoritma",
  "Kesimpulan / Pesan Klinis (Clinical Pearls)",
];

export function parseSections(raw: string | null | undefined): ReviewSection[] {
  try {
    const value = JSON.parse(raw || "[]");
    if (!Array.isArray(value)) return [];
    return value
      .map((s) => ({ title: String(s?.title ?? "").trim(), body: String(s?.body ?? "").trim() }))
      .filter((s) => s.title || s.body);
  } catch {
    return [];
  }
}
