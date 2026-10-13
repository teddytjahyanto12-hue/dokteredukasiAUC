"use client";

import { useState } from "react";
import type { Field, Tone, Values } from "@/lib/calculators/engine";
import { DEFS } from "@/lib/calculators/defs";
import { Choice, CopyButton, LockedSteps, MobileResultBar } from "@/components/calculators/calc-ui";

const TONE: Record<Tone, string> = { ok: "text-emerald-700", warn: "text-amber-700", bad: "text-red-700", info: "text-slate-700" };
const COLS = { 1: "", 2: "sm:grid-cols-2", 3: "sm:grid-cols-3" } as const;

// Kumpulkan field menjadi kartu: setiap "heading" membuka kartu baru.
function groups(fields: Field[]) {
  const out: { heading?: { label: string; hint?: string }; fields: Field[] }[] = [];
  for (const f of fields) {
    if (f.type === "heading") out.push({ heading: { label: f.label, hint: f.hint }, fields: [] });
    else {
      if (!out.length) out.push({ fields: [] });
      out[out.length - 1].fields.push(f);
    }
  }
  return out;
}

function FieldInput({ f, v, set }: { f: Exclude<Field, { type: "heading" }>; v: Values; set: (id: string, val: string | boolean | undefined) => void }) {
  if (f.type === "number") {
    return (
      <label className="block">
        <span className="label">
          {f.label}
          {f.optional && <span className="font-normal text-slate-400"> (opsional)</span>}
        </span>
        <span className="flex items-center gap-2">
          <input
            type="text"
            inputMode="decimal"
            className="input max-w-[14rem]"
            value={(v[f.id] as string) ?? ""}
            placeholder={f.placeholder}
            onChange={(e) => set(f.id, e.target.value)}
          />
          {f.unit && <span className="text-sm text-slate-500">{f.unit}</span>}
        </span>
        {f.hint && <span className="mt-1 block text-xs text-slate-500">{f.hint}</span>}
      </label>
    );
  }
  if (f.type === "date") {
    return (
      <label className="block">
        <span className="label">{f.label}</span>
        <input type="date" className="input max-w-xs" value={(v[f.id] as string) ?? ""} onChange={(e) => set(f.id, e.target.value)} />
        {f.hint && <span className="mt-1 block text-xs text-slate-500">{f.hint}</span>}
      </label>
    );
  }
  if (f.type === "check") {
    const on = v[f.id] === true;
    return (
      <Choice
        selected={on}
        onClick={() => set(f.id, on ? undefined : true)}
        title={f.label}
        hint={f.hint}
        value={f.points !== undefined ? (on ? `+${f.points}` : "0") : on ? "✓" : " "}
      />
    );
  }
  return (
    <fieldset>
      <legend className="label">
        {f.label}
        {f.optional && <span className="font-normal text-slate-400"> (opsional)</span>}
      </legend>
      {f.hint && <p className="-mt-0.5 mb-2 text-xs text-slate-500">{f.hint}</p>}
      <div className={`grid gap-2 ${COLS[f.columns ?? 2]}`}>
        {f.options.map((o) => (
          <Choice
            key={o.value}
            selected={v[f.id] === o.value}
            onClick={() => set(f.id, v[f.id] === o.value ? undefined : o.value)}
            title={o.label}
            hint={o.hint}
            value={o.points !== undefined ? String(o.points) : undefined}
          />
        ))}
      </div>
    </fieldset>
  );
}

type Seg = { kind: "checks"; fields: Extract<Field, { type: "check" }>[] } | { kind: "single"; field: Exclude<Field, { type: "heading" | "check" }> };
// Kelompokkan butir centang yang berurutan menjadi satu blok; field lain berdiri sendiri.
function segments(fields: Field[]): Seg[] {
  const out: Seg[] = [];
  for (const f of fields) {
    if (f.type === "heading") continue;
    if (f.type === "check") {
      const last = out[out.length - 1];
      if (last && last.kind === "checks") last.fields.push(f);
      else out.push({ kind: "checks", fields: [f] });
    } else out.push({ kind: "single", field: f });
  }
  return out;
}

export function GenericCalculator({ slug, premium }: { slug: string; premium: boolean }) {
  const def = DEFS[slug];
  const [v, setV] = useState<Values>({});
  if (!def) return null;
  const set = (id: string, val: string | boolean | undefined) => setV((s) => ({ ...s, [id]: val }));
  const r = def.compute(v);
  const ok = r.status === "ok" ? r : null;
  const msg = r.status === "ok" ? "" : r.message;

  return (
    <div className="grid gap-6 pb-16 lg:grid-cols-[1fr_340px] lg:pb-0">
      <MobileResultBar>
        <div className="flex items-center gap-3">
          <span className="num text-2xl font-semibold text-slate-900">{ok ? ok.value : "–"}</span>
          <span className="min-w-0 text-xs leading-tight">
            <span className={`block truncate font-semibold ${ok ? TONE[ok.tone] : "text-slate-500"}`}>{ok ? ok.label : msg}</span>
          </span>
        </div>
      </MobileResultBar>

      <div className="space-y-6">
        {(() => {
          let n = 0;
          return groups(def.fields).map((g, i) => (
            <section key={i} className="card">
              {g.heading && (
                <div className="mb-4">
                  <h2 className="h2">{g.heading.label}</h2>
                  {g.heading.hint && <p className="mt-1 text-xs text-slate-500">{g.heading.hint}</p>}
                </div>
              )}
              <div className="divide-y divide-slate-100">
                {segments(g.fields).map((seg, j) => {
                  n += 1;
                  return (
                    <div key={j} className="py-4 first:pt-0 last:pb-0">
                      {seg.kind === "checks" ? (
                        <fieldset>
                          <legend className="label flex items-baseline gap-2">
                            <span className="num text-xs text-slate-400">{n}.</span>
                            {g.heading ? "Centang yang sesuai" : "Kriteria: centang yang ada"}
                          </legend>
                          <p className="-mt-0.5 mb-2 text-xs text-slate-500">Butir yang tidak dicentang dianggap tidak ada.</p>
                          <div className="grid gap-2">
                            {seg.fields.map((f) => <FieldInput key={f.id} f={f} v={v} set={set} />)}
                          </div>
                        </fieldset>
                      ) : (
                        <div className="flex gap-2">
                          <span className="num mt-0.5 text-xs text-slate-400">{n}.</span>
                          <div className="min-w-0 flex-1"><FieldInput f={seg.field} v={v} set={set} /></div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ));
        })()}
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="card border-ink" aria-live="polite">
          <p className="eyebrow">Hasil</p>
          {!ok ? (
            <p className={`mt-3 text-sm ${r.status === "error" ? "text-red-700" : "text-slate-600"}`}>{msg}</p>
          ) : (
            <>
              <p className="mt-2 flex items-baseline gap-2">
                <span className="num text-4xl font-semibold text-slate-900">{ok.value}</span>
                {ok.unit && <span className="text-sm text-slate-500">{ok.unit}</span>}
              </p>
              <p className={`mt-2 text-sm font-semibold ${TONE[ok.tone]}`}>{ok.label}</p>
              {ok.lines && ok.lines.length > 0 && (
                <ul className="mt-3 space-y-1 text-sm text-slate-700">
                  {ok.lines.map((l) => <li key={l}>{l}</li>)}
                </ul>
              )}
              <p className="mt-4 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">{ok.copy}</p>
            </>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            <CopyButton text={ok?.copy ?? ""} disabled={!ok} />
            <button type="button" className="btn-secondary btn-sm" onClick={() => setV({})}>Ulangi</button>
          </div>
        </div>
        {premium ? (
          <div className="card mt-4">
            <h2 className="h2">Cara menghitung</h2>
            {ok ? (
              <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-slate-700">
                {ok.steps.map((s, i) => <li key={i}>{s}</li>)}
              </ol>
            ) : (
              <p className="mt-2 text-sm text-slate-600">Langkah perhitungan muncul setelah isian lengkap.</p>
            )}
          </div>
        ) : (
          <LockedSteps />
        )}
      </aside>
    </div>
  );
}
