// Struktur data Dosis Obat Anak. Data dibangkitkan dari dokumen yang disetujui pemilik
// (docs/dosis-obat/Rancangan_Kalkulator_Dosis_Obat_Anak.md) oleh scripts/build-dosis-obat-data.ts.

export type DoseItem =
  | { type: "table"; header: string[]; rows: string[][] }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "p"; text: string };

/**
 * calc = kalkulator dosis; renal = penyesuaian dosis pada penyakit ginjal; sediaan = FORNAS;
 * aturan = aturan penggunaan; premium = manfaat, efek samping, peringatan, farmakokinetik, farmakodinamik;
 * pustaka = daftar pustaka.
 */
export type BlockKind = "calc" | "renal" | "sediaan" | "aturan" | "premium" | "pustaka";

export type DoseBlock = { kind: BlockKind; title: string; note?: string; items: DoseItem[] };

export type DrugRoute = "Oral" | "Injeksi" | "Topikal" | "Rektal" | "Inhalasi/Hidung" | "Mata/Telinga";

export type Drug = {
  no: string;
  slug: string;
  name: string;
  routes: DrugRoute[];
  /** Ada dosis per luas permukaan tubuh (perlu tinggi badan). */
  usesBsa: boolean;
  /** Rumus khusus (misalnya faktor VIII dari FORNAS). */
  special?: "faktor-viii";
  blocks: DoseBlock[];
};

export type DoseData = { version: string; date: string; source: string; drugs: Drug[] };
