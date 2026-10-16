import "server-only";
import raw from "./data.json";
import { parseStrength, type Strength } from "./dose";
import type { DoseBlock, DoseData, Drug, DrugRoute } from "./types";

// Data Dosis Obat Anak hanya dibaca di server. Blok premium (manfaat, efek samping, peringatan,
// farmakokinetik, farmakodinamik) tidak pernah dikirim ke browser pengguna non-Premium.
const DATA = raw as DoseData;

export const DOSE_VERSION = { version: DATA.version, date: DATA.date, count: DATA.drugs.length };

export type DrugSummary = { slug: string; name: string; routes: DrugRoute[]; hasCalc: boolean };

const collator = new Intl.Collator("id", { sensitivity: "base" });

export const DRUGS: DrugSummary[] = DATA.drugs
  .map((d) => ({ slug: d.slug, name: d.name, routes: d.routes, hasCalc: d.blocks.some((b) => b.kind === "calc") }))
  .sort((a, b) => collator.compare(a.name, b.name));

export const findDrug = (slug: string): Drug | undefined => DATA.drugs.find((d) => d.slug === slug);

/** Blok yang boleh tampil untuk semua pengunjung (kalkulator, ginjal, sediaan, aturan, pustaka). */
export const freeBlocks = (d: Drug): DoseBlock[] => d.blocks.filter((b) => b.kind !== "premium");
export const premiumBlocks = (d: Drug): DoseBlock[] => d.blocks.filter((b) => b.kind === "premium");

/** Kekuatan sediaan cair/injeksi dari tabel sediaan FORNAS, untuk konversi mg → mL. */
export function strengthsOf(d: Drug): Strength[] {
  const out: Strength[] = [];
  const seen = new Set<string>();
  for (const b of d.blocks) {
    if (b.kind !== "sediaan") continue;
    for (const it of b.items) {
      if (it.type !== "table") continue;
      for (const r of it.rows) {
        const s = parseStrength(r[0]);
        if (s && !seen.has(s.label)) {
          seen.add(s.label);
          out.push(s);
        }
      }
    }
  }
  return out;
}

export function searchDrugs(q: string, limit = 5): DrugSummary[] {
  const n = q.trim().toLowerCase();
  if (n.length < 2) return [];
  const scored = DRUGS.map((d) => {
    const x = d.name.toLowerCase();
    const s = x === n ? 100 : x.startsWith(n) ? 80 : x.split(/[^a-z0-9]+/).some((w) => w.startsWith(n)) ? 60 : x.includes(n) ? 40 : 0;
    return { d, s };
  }).filter((x) => x.s > 0);
  return scored.sort((a, b) => b.s - a.s).slice(0, limit).map((x) => x.d);
}
