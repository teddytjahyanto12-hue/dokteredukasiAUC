// Membangkitkan data Dosis Obat Anak untuk website dari dokumen yang disetujui pemilik.
// Sumber: docs/dosis-obat/Rancangan_Kalkulator_Dosis_Obat_Anak.md (draf yang di-"acc").
// Keluaran: src/lib/dosis-obat/data.json. Isi tidak diubah; hanya dipecah menjadi blok dan tabel.
// Jalankan dari apps/web: npm run data:dosis-obat

import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import type { BlockKind, DoseBlock, DoseData, DoseItem, Drug, DrugRoute } from "../src/lib/dosis-obat/types";

const ROOT = path.resolve(__dirname, "..");
const SRC = path.resolve(ROOT, "../../docs/dosis-obat/Rancangan_Kalkulator_Dosis_Obat_Anak.md");
const OUT = path.resolve(ROOT, "src/lib/dosis-obat/data.json");

const md = readFileSync(SRC, "utf8").replace(/\r\n/g, "\n");
const head = md.match(/^Draf ([\d.]+), ([^(]+?) \((\d+) obat\)/m);
if (!head) throw new Error("Baris versi draf tidak ditemukan");

const start = md.indexOf("\n## 3. Monografi obat");
if (start < 0) throw new Error("Bab 3 tidak ditemukan");
const body = md.slice(start);

function kindOf(title: string): BlockKind {
  const t = title.toLowerCase();
  if (t.startsWith("kalkulator") || t.startsWith("tabel neonatus") || t === "neonatus") return "calc";
  if (t.startsWith("penyesuaian dosis")) return "renal";
  if (t === "sediaan") return "sediaan";
  if (t === "aturan penggunaan") return "aturan";
  if (t === "daftar pustaka") return "pustaka";
  if (["manfaat obat", "efek samping", "peringatan", "farmakokinetik", "farmakodinamik", "efek samping dan peringatan"].includes(t)) return "premium";
  throw new Error(`Judul blok tidak dikenal: ${title}`);
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\(.*?\)/g, " ")
    .replace(/[+–—/]/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const splitRow = (line: string) =>
  line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((c) => c.trim());

function parseDrug(no: string, name: string, lines: string[]): Drug {
  const blocks: DoseBlock[] = [];
  let cur: DoseBlock | null = null;
  let table: { header: string[]; rows: string[][] } | null = null;
  let list: { ordered: boolean; items: string[] } | null = null;

  const flush = () => {
    if (!cur) return;
    if (table) cur.items.push({ type: "table", ...table });
    if (list) cur.items.push({ type: "list", ...list });
    table = null;
    list = null;
  };

  for (const raw of lines) {
    const line = raw.replace(/\s+$/, "");
    if (!line.trim() || line.trim() === "---") {
      if (table || list) flush();
      continue;
    }
    const h = line.match(/^\*\*([^*]+)\*\*\s*(?:\((.+)\))?\s*$/);
    if (h) {
      flush();
      cur = { kind: kindOf(h[1].trim()), title: h[1].trim(), note: h[2]?.trim(), items: [] };
      blocks.push(cur);
      continue;
    }
    if (!cur) throw new Error(`${no} ${name}: teks sebelum judul blok: ${line}`);
    if (line.trim().startsWith("|")) {
      if (list) flush();
      const cells = splitRow(line);
      if (cells.every((c) => /^:?-{3,}:?$/.test(c))) continue;
      if (!table) table = { header: cells, rows: [] };
      else table.rows.push(cells);
      continue;
    }
    const li = line.match(/^(\s*)(?:[-*]|(\d+)\.)\s+(.*)$/);
    if (li) {
      if (table) flush();
      const nested = li[1].length >= 2;
      if (nested && list && list.items.length) {
        list.items[list.items.length - 1] += `\n${li[3]}`;
      } else {
        if (!list) list = { ordered: !!li[2], items: [] };
        list.items.push(li[3]);
      }
      continue;
    }
    flush();
    cur.items.push({ type: "p", text: line.trim() });
  }
  flush();

  const all = blocks.flatMap((b) => b.items);
  const sediaanText = blocks
    .filter((b) => b.kind === "sediaan")
    .flatMap((b) => b.items)
    .flatMap((it: DoseItem) => (it.type === "table" ? it.rows.map((r) => r[0]) : it.type === "list" ? it.items : [it.text]))
    .join(" \n ")
    .toLowerCase();
  const calcBlocks = blocks.filter((b) => b.kind === "calc");
  const calcText = [calcBlocks.map((b) => b.note ?? "").join(" ")]
    .concat(calcBlocks.flatMap((b) => b.items)
    .map((it) => (it.type === "table" ? [it.header.join(" "), ...it.rows.map((r) => r.join(" "))].join(" ") : it.type === "list" ? it.items.join(" ") : it.text)))
    .join(" ")
    .toLowerCase();

  const routes = new Set<DrugRoute>();
  const any = (re: RegExp) => re.test(sediaanText) || re.test(calcText);
  if (any(/\b(tablet|tab|kapsul|kaps|sirup|sir|drops|suspensi|eliksir|puyer|granul|granula|lar(utan)? oral|oral|po)\b|\bserbuk(?! (injeksi|inhalasi))\b/)) routes.add("Oral");
  if (any(/\b(injeksi|inj|infus|iv|im|sk|sc|intravena|intramuskular|subkutan)\b/)) routes.add("Injeksi");
  if (/\b(krim|salep|gel|lotio|losio|bedak)\b/.test(sediaanText) || /\b(topikal|oles)\b/.test(calcText)) routes.add("Topikal");
  if (any(/\b(supositoria|sup|enema|rektal|pr)\b/)) routes.add("Rektal");
  if (any(/\b(inhalasi|inhaler|nebul\w*|mdi|semprot hidung|nasal spray|spray|aerosol|turbuhaler|rotacap)\b/)) routes.add("Inhalasi/Hidung");
  if (any(/\b(tetes mata|salep mata|tts mata|tetes telinga|tts telinga|mata)\b/)) routes.add("Mata/Telinga");

  const usesBsa = /\/\s*(m2|m²)/i.test(calcText);
  const slug = slugify(name);
  if (!all.length) throw new Error(`${no} ${name}: kosong`);
  return { no, slug, name, routes: [...routes], usesBsa, special: /^faktor viii/i.test(name) ? "faktor-viii" : undefined, blocks };
}

const parts = body.split(/\n### (3\.\d+) (.+)\n/);
const drugs: Drug[] = [];
for (let i = 1; i < parts.length; i += 3) {
  drugs.push(parseDrug(parts[i], parts[i + 1].trim(), parts[i + 2].split("\n")));
}
const n = Number(head[3]);
if (drugs.length !== n) throw new Error(`Jumlah obat ${drugs.length} berbeda dari header (${n})`);
const slugs = new Set(drugs.map((d) => d.slug));
if (slugs.size !== drugs.length) throw new Error("Slug obat ganda");

const data: DoseData = { version: head[1], date: head[2].trim(), source: "docs/dosis-obat/Rancangan_Kalkulator_Dosis_Obat_Anak.md", drugs };
writeFileSync(OUT, JSON.stringify(data, null, 1) + "\n", "utf8");
console.log(`Draf ${data.version} (${data.date}): ${drugs.length} obat -> ${path.relative(ROOT, OUT)}`);
