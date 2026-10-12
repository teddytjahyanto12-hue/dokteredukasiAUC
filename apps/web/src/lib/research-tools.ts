export type Reference = { id: string; title: string; authors: string[]; year: string; doi: string; abstract: string; journal: string; decision: "" | "include" | "maybe" | "exclude"; reason: string };
export function normalizeDoi(value: string) { return value.trim().toLowerCase().replace(/^https?:\/\/(dx\.)?doi\.org\//, "").replace(/^doi:\s*/, "").replace(/[.\s]+$/, ""); }
const clean = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
export function parseReferences(text: string): Reference[] {
  const lines = text.replace(/\r\n?/g, "\n").split("\n");
  const out: Reference[] = [];
  let fields: Record<string, string[]> = {}, last = "";
  const flush = () => {
    if (!Object.keys(fields).length) return;
    const first = (...keys: string[]) => keys.map(k => fields[k]?.join(" ")).find(Boolean) ?? "";
    const title = first("TI", "T1", "CT");
    const doi = [...(fields.DO ?? []), ...(fields.LID ?? []), ...(fields.AID ?? [])].map(s => normalizeDoi(s.replace(/\s*\[doi\].*$/i, ""))).find(s => /^10\.\d{4,9}\//.test(s)) ?? "";
    if (title) out.push({ id: `ref-${out.length + 1}`, title, authors: fields.AU ?? fields.A1 ?? fields.FAU ?? [], year: first("PY", "Y1", "DP").match(/\d{4}/)?.[0] ?? "", doi, abstract: first("AB", "N2"), journal: first("JO", "JF", "T2", "JT"), decision: "", reason: "" });
    fields = {}; last = "";
  };
  for (const line of lines) {
    const m = line.match(/^([A-Z0-9]{2,4})\s*-\s?(.*)$/);
    if (m) {
      if (m[1] === "TY" || m[1] === "PMID") flush();
      if (m[1] === "ER") { flush(); continue; }
      last = m[1]; (fields[last] ??= []).push(m[2]);
    } else if (!line.trim()) { if (fields.PMID) flush(); }
    else if (/^\s+/.test(line) && last) fields[last][fields[last].length - 1] += " " + line.trim();
  }
  flush();
  return out;
}
export function deduplicateReferences(refs: Reference[]) {
  const unique: Reference[] = [], duplicates: { kept: Reference; removed: Reference }[] = [];
  const dois = new Map<string, Reference>(), titles = new Map<string, Reference | null>();
  for (const r of refs) {
    const key = r.title && r.year && r.authors[0] ? `${clean(r.title)}|${r.year}|${clean(r.authors[0])}` : "";
    const fallback = key ? titles.get(key) : undefined;
    const kept = (r.doi && dois.get(r.doi)) || (fallback && (!r.doi || !fallback.doi) ? fallback : undefined);
    if (kept) {
      duplicates.push({ kept: { ...kept }, removed: r });
      if (!kept.abstract && r.abstract) kept.abstract = r.abstract;
      if (!kept.doi && r.doi) { kept.doi = r.doi; dois.set(r.doi, kept); }
    } else {
      const copy = { ...r, id: `ref-${unique.length + 1}` }; unique.push(copy);
      if (copy.doi) dois.set(copy.doi, copy);
      if (key) {
        const prior = titles.get(key);
        if (!titles.has(key)) titles.set(key, copy);
        else if (!prior || (prior.doi && copy.doi && prior.doi !== copy.doi)) titles.set(key, null);
      }
    }
  }
  return { unique, duplicates };
}
export function referencesRis(refs: Reference[]) {
  const safe = (s: string) => s.replace(/[\r\n]+/g, " ");
  return refs.map(r => ["TY  - JOUR", `TI  - ${safe(r.title)}`, ...r.authors.map(a => `AU  - ${safe(a)}`), r.year && `PY  - ${r.year}`, r.doi && `DO  - ${safe(r.doi)}`, r.journal && `JO  - ${safe(r.journal)}`, r.abstract && `AB  - ${safe(r.abstract)}`, "ER  - "].filter(Boolean).join("\n")).join("\n\n");
}
export function screeningCsv(refs: Reference[]) {
  const quote = (s: string) => `"${(/^[=+@-]/.test(s) ? "'" + s : s).replace(/"/g, '""')}"`;
  return "title,authors,year,doi,decision,reason\r\n" + refs.map(r => [r.title, r.authors.join("; "), r.year, r.doi, r.decision, r.reason].map(quote).join(",")).join("\r\n");
}
export function continuousEffect(n1: number, mean1: number, sd1: number, n2: number, mean2: number, sd2: number) {
  if (![n1, mean1, sd1, n2, mean2, sd2].every(Number.isFinite) || !Number.isInteger(n1) || !Number.isInteger(n2) || n1 < 2 || n2 < 2 || sd1 <= 0 || sd2 <= 0) throw Error("n harus bilangan bulat ≥ 2 dan SD harus positif.");
  const pooled = Math.sqrt(((n1 - 1) * sd1 ** 2 + (n2 - 1) * sd2 ** 2) / (n1 + n2 - 2));
  const md = mean1 - mean2, d = md / pooled, correction = 1 - 3 / (4 * (n1 + n2 - 2) - 1);
  return { md, seMD: Math.sqrt(sd1 ** 2 / n1 + sd2 ** 2 / n2), pooled, cohenD: d, hedgesG: correction * d };
}
export function changeSd(pre: number, post: number, correlation: number) {
  if (![pre, post, correlation].every(Number.isFinite) || pre < 0 || post < 0 || correlation < -1 || correlation > 1) throw Error("SD tidak boleh negatif dan korelasi harus di antara -1 dan 1.");
  return Math.sqrt(Math.max(0, pre ** 2 + post ** 2 - 2 * correlation * pre * post));
}
