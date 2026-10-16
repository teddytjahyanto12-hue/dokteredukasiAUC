"use client";

import { useState } from "react";
import {
  bsaMosteller,
  computeDose,
  factorVIII,
  findDoses,
  findImplicitPerKgDay,
  fmt,
  fmtRange,
  parseNum,
  toMl,
  type DoseMatch,
  type DoseResult,
  type Range,
  type Strength,
} from "@/lib/dosis-obat/dose";
import type { DoseBlock, DoseItem } from "@/lib/dosis-obat/types";
import { RichText } from "@/components/dosis-obat/rich-text";

type Props = { blocks: DoseBlock[]; usesBsa: boolean; special?: "faktor-viii"; strengths: Strength[] };

const PER_LABEL: Record<string, string> = { jam: "per jam", menit: "per menit", minggu: "per minggu", bulan: "per bulan" };

/** Angka dari isian (menerima koma desimal). */
function num(v: string): number | null {
  const t = v.trim().replace(",", ".");
  if (!t) return null;
  const n = Number(t);
  return Number.isFinite(n) && n > 0 ? n : null;
}

type Route = "oral" | "injeksi" | "lain";
/** Rute baris dosis dari teks (label baris + sel); null bila tidak tertulis. */
function rowRoute(text: string): Route | null {
  const t = ` ${text.toLowerCase()} `;
  const oral = /\b(po|oral|per oral|p\.o\.)\b/.test(t);
  const inj = /\b(iv|im|sk|sc|intravena|intramuskular|subkutan|injeksi|infus|drip)\b/.test(t);
  const other = /\b(rektal|supositoria|topikal|oles|inhalasi|nebul\w*|tetes mata|nasal|semprot|intraartikular)\b/.test(t);
  if (other && !oral && !inj) return "lain";
  if (oral && !inj) return "oral";
  if (inj && !oral) return "injeksi";
  return null;
}
/** Jenis sediaan cair dari namanya. */
function strengthRoute(label: string): Route {
  const t = label.toLowerCase();
  if (/injeksi|infus|vial|ampul/.test(t)) return "injeksi";
  if (/sirup|drops|suspensi|larutan oral|eliksir|tetes oral|granul/.test(t)) return "oral";
  return "lain";
}

/** Sel tabel neonatus berisi angka saja, satuannya ada di judul kolom ("Dosis (mg/kg)"). */
function neonatalMatch(header: string, cell: string, intervalCell?: string): DoseMatch | null {
  const h = header.match(/\((mg|mcg|U|IU)\/kg\)/i);
  const c = cell.trim().match(/^(\d+(?:[.,]\d+)?)(?:\s*[–-]\s*(\d+(?:[.,]\d+)?))?$/);
  if (!h || !c) return null;
  const a = parseNum(c[1]);
  const b = c[2] ? parseNum(c[2]) : a;
  const iv = intervalCell?.trim().match(/^(\d+)(?:\s*[–-]\s*(\d+))?$/);
  const m: DoseMatch = { raw: `${cell.trim()} ${h[1]}/kg`, dose: [a, b], unit: h[1] === "U" ? "IU" : h[1], basis: "kg", per: "kali" };
  if (iv) {
    const r: Range = [Number(iv[1]), Number(iv[2] ?? iv[1])];
    if (r[0] >= 4 && r[1] <= 48) m.intervalH = r;
  }
  return m;
}

export function DoseCalculator({ blocks, usesBsa, special, strengths }: Props) {
  const [bb, setBb] = useState("");
  const [tb, setTb] = useState("");
  const [target, setTarget] = useState("");
  const [kadar, setKadar] = useState("0");
  const [sIdx, setSIdx] = useState(strengths.length ? "0" : "");
  const weight = num(bb);
  const height = num(tb);
  const bsa = weight && height ? bsaMosteller(weight, height) : null;
  const strength = sIdx === "" ? null : strengths[Number(sIdx)] ?? null;
  const f8 = special === "faktor-viii" && weight ? factorVIII(weight, Number(target.replace(",", ".")), Number(kadar.replace(",", "."))) : null;

  return (
    <div className="space-y-6">
      <section className="card">
        <h2 className="h2">Data pasien</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <label className="block">
            <span className="label">Berat badan (kg)</span>
            <input className="input mt-1" inputMode="decimal" placeholder="mis. 12,5" value={bb} onChange={(e) => setBb(e.target.value)} aria-describedby="bb-help" />
            <span id="bb-help" className="mt-1 block text-xs text-slate-500">Dosis per kg dikalikan dengan berat badan ini.</span>
          </label>
          {usesBsa && (
            <label className="block">
              <span className="label">Tinggi badan (cm), untuk dosis per m²</span>
              <input className="input mt-1" inputMode="decimal" placeholder="mis. 90" value={tb} onChange={(e) => setTb(e.target.value)} />
              <span className="mt-1 block text-xs text-slate-500">
                {bsa ? <>Luas permukaan tubuh (Mosteller) = <b className="num">{fmt(bsa)} m²</b></> : "Luas permukaan tubuh dihitung dengan rumus Mosteller: √(TB × BB / 3600)."}
              </span>
            </label>
          )}
          {special === "faktor-viii" && (
            <>
              <label className="block">
                <span className="label">Target kadar FVIII plasma (%)</span>
                <input className="input mt-1" inputMode="decimal" placeholder="mis. 50" value={target} onChange={(e) => setTarget(e.target.value)} />
              </label>
              <label className="block">
                <span className="label">Kadar FVIII pasien (%)</span>
                <input className="input mt-1" inputMode="decimal" value={kadar} onChange={(e) => setKadar(e.target.value)} />
              </label>
            </>
          )}
          {strengths.length > 0 && (
            <label className="block">
              <span className="label">Konversi ke mL dengan sediaan</span>
              <select className="input mt-1" value={sIdx} onChange={(e) => setSIdx(e.target.value)}>
                {strengths.map((s, i) => (
                  <option key={s.label} value={String(i)}>
                    {s.label} ({fmt(s.perMl)} {s.unit}/mL)
                  </option>
                ))}
                <option value="">Tanpa konversi mL</option>
              </select>
            </label>
          )}
        </div>
        {special === "faktor-viii" && (
          <div className="mt-4 rounded-lg border border-ink bg-brand-soft p-3 text-sm" aria-live="polite">
            <p className="text-slate-700">FVIII (unit) = BB (kg) × (target kadar plasma − kadar FVIII pasien) × 0,5</p>
            <p className="mt-1 text-base font-semibold text-slate-900">
              {f8 ? <>Kebutuhan FVIII: <span className="num">{fmt(f8)} unit</span></> : "Isi berat badan, target kadar, dan kadar pasien (target harus lebih tinggi)."}
            </p>
          </div>
        )}
        {!weight && <p className="mt-3 text-sm text-slate-500">Isi berat badan untuk menampilkan hasil hitung di bawah setiap dosis.</p>}
      </section>

      {blocks.map((b, i) => (
        <section key={i} className="card">
          <h2 className="h2">{b.title}</h2>
          {b.note && <p className="mt-1 text-sm text-slate-500"><RichText text={b.note} /></p>}
          <div className="mt-4 space-y-4">
            {b.items.map((it, j) => (
              <CalcItem key={j} item={it} implicit={/per kg per hari/i.test(b.note ?? "")} weight={weight} bsa={bsa} strength={strength} usesBsa={usesBsa} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function CalcItem({ item, implicit, weight, bsa, strength, usesBsa }: { item: DoseItem; implicit: boolean; weight: number | null; bsa: number | null; strength: Strength | null; usesBsa: boolean }) {
  if (item.type === "p") return <p className="text-sm text-slate-700"><RichText text={item.text} /></p>;
  if (item.type === "list")
    return (
      <ul className="list-disc space-y-1.5 pl-5 text-sm text-slate-700">
        {item.items.map((x, k) => (
          <li key={k}><RichText text={x} /></li>
        ))}
      </ul>
    );
  const { header, rows } = item;
  const ivCol = header.findIndex((h) => /^interval \(jam\)/i.test(h));
  return (
    <div className="space-y-3">
      {rows.map((r, k) => (
        <div key={k} className="rounded-lg border border-slate-200 p-3">
          <p className="text-sm font-semibold text-slate-900"><RichText text={`${header[0] ? `${header[0]}: ` : ""}${r[0]}`} /></p>
          <dl className="mt-2 space-y-2">
            {r.slice(1).map((cell, c) => {
              const col = c + 1;
              const h = header[col] ?? "";
              if (col === ivCol) return null;
              const isSource = /^sumber$/i.test(h);
              const neo = neonatalMatch(h, cell, ivCol >= 0 ? r[ivCol] : undefined);
              const matches = isSource ? [] : neo ? [neo] : implicit && !/keterangan/i.test(h) ? findImplicitPerKgDay(cell) : findDoses(cell);
              return (
                <div key={c}>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{h}</dt>
                  <dd className={`text-sm ${isSource ? "text-slate-500" : "text-slate-800"}`}>
                    <RichText text={cell} />
                    {neo && ivCol >= 0 && <span className="text-slate-500"> · interval {r[ivCol]} jam</span>}
                    {matches.length > 0 && (
                      <ul className="mt-1.5 space-y-1" aria-live="polite">
                        {matches.map((m, x) => (
                          <ResultLine key={x} m={m} weight={weight} bsa={bsa} strength={strength && compatible(rowRoute(`${r[0]} ${cell}`), strength) ? strength : null} usesBsa={usesBsa} />
                        ))}
                      </ul>
                    )}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      ))}
    </div>
  );
}

/** Konversi mL hanya bila rute baris sesuai jenis sediaan (misalnya dosis rektal tidak dikonversi ke sirup). */
function compatible(route: Route | null, s: Strength): boolean {
  const sr = strengthRoute(s.label);
  if (route === "lain") return false;
  if (route === null) return true;
  return sr === route;
}

function ResultLine({ m, weight, bsa, strength, usesBsa }: { m: DoseMatch; weight: number | null; bsa: number | null; strength: Strength | null; usesBsa: boolean }) {
  const head = (
    <span className="num font-medium text-slate-700">
      {m.raw}
      {m.implicit ? " (mg/kg/hari, sesuai judul tabel)" : ""}
    </span>
  );
  if (!weight) return null;
  if (m.basis === "m2" && !bsa)
    return (
      <li className="rounded-md bg-slate-50 px-2.5 py-1.5 text-xs text-slate-600">
        {head} → {usesBsa ? "isi tinggi badan untuk menghitung dosis per m²." : "perlu luas permukaan tubuh."}
      </li>
    );
  const r = computeDose(m, weight, bsa ?? undefined);
  if (!r) return null;
  const parts = describe(r, strength);
  return (
    <li className="rounded-md bg-brand-soft px-2.5 py-1.5 text-sm">
      {head} × {m.basis === "m2" ? `LPT ${fmt(bsa!)} m²` : `${fmt(weight)} kg`} →{" "}
      {parts.map((p, i) => (
        <span key={i}>
          {i > 0 && <span className="text-slate-400"> · </span>}
          <b className="num text-slate-900">{p.value}</b> {p.label}
          {p.ml && <span className="text-slate-600"> (= {p.ml})</span>}
          {p.capped && <span className="badge-warn ml-1">dibatasi {r.match.max?.raw}</span>}
        </span>
      ))}
    </li>
  );
}

function describe(r: DoseResult, s: Strength | null) {
  const ml = (v: Range) => {
    if (!s) return undefined;
    const a = toMl(v[0], r.unit, s);
    const b = toMl(v[1], r.unit, s);
    if (a === null || b === null) return undefined;
    return `${fmtRange([a, b], "mL")} ${s.label}`;
  };
  const out: { value: string; label: string; ml?: string; capped?: boolean }[] = [];
  if (r.rate) out.push({ value: fmtRange(r.rate.value, r.unit), label: PER_LABEL[r.rate.per] ?? "", ml: ml(r.rate.value) });
  if (r.plain) out.push({ value: fmtRange(r.plain, r.unit), label: "per pemberian (sesuai teks)", ml: ml(r.plain), capped: r.cappedDose });
  if (r.perDose) out.push({ value: fmtRange(r.perDose, r.unit), label: "per kali", ml: ml(r.perDose), capped: r.cappedDose });
  if (r.perDay) out.push({ value: fmtRange(r.perDay, r.unit), label: "per hari", capped: r.cappedDay });
  return out;
}
