"use client";

import { useState } from "react";
import { GCS_COMPONENTS, GCS_SEVERITY_LABEL, computeGcs, gcsCopyText, type GcsInput, type GcsValue } from "@/lib/calculators/gcs";
import { Choice, CopyButton, LockedSteps, MobileResultBar } from "@/components/calculators/calc-ui";

const EMPTY: GcsInput = { eye: null, verbal: null, motor: null };
const TONE = { ringan: "text-emerald-700", sedang: "text-amber-700", berat: "text-red-700" } as const;

export function GcsCalculator({ premium }: { premium: boolean }) {
  const [input, setInput] = useState<GcsInput>(EMPTY);
  const r = computeGcs(input);
  const set = (key: keyof GcsInput, v: GcsValue) => setInput((s) => ({ ...s, [key]: s[key] === v ? null : v }));

  return (
    <div className="grid gap-6 pb-16 lg:grid-cols-[1fr_340px] lg:pb-0">
      <MobileResultBar>
        <div className="flex items-center gap-3">
          <span className="num text-2xl font-semibold text-slate-900">{r.total ?? "–"}</span>
          <span className="min-w-0 text-xs leading-tight">
            <span className="num block truncate text-slate-700">{r.notation}</span>
            <span className={`block truncate font-semibold ${r.severity ? TONE[r.severity] : "text-slate-500"}`}>
              {r.severity ? `GCS ${r.severity}` : r.hasNT && r.complete ? "Total tidak dilaporkan" : "Hasil GCS"}
            </span>
          </span>
        </div>
      </MobileResultBar>
      <div className="space-y-6">
        {GCS_COMPONENTS.map((c) => (
          <fieldset key={c.key} className="card">
            <legend className="sr-only">{c.title}</legend>
            <div className="mb-3 flex items-baseline justify-between gap-3">
              <h2 className="h2">{c.title}</h2>
              <span className="num text-sm text-slate-500">{c.code}{input[c.key] ?? "?"}</span>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {c.options.map((o) => (
                <Choice key={o.value} value={String(o.value)} title={o.label} hint={o.hint} selected={input[c.key] === o.value} onClick={() => set(c.key, o.value)} />
              ))}
              <Choice value="NT" title="Tidak dapat dinilai" hint={c.ntHint} selected={input[c.key] === "NT"} onClick={() => set(c.key, "NT")} />
            </div>
          </fieldset>
        ))}
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="card border-ink" aria-live="polite">
          <p className="eyebrow">Hasil</p>
          {!r.complete ? (
            <p className="mt-3 text-sm text-slate-600">Pilih respons mata, verbal, dan motorik. Hasil muncul otomatis.</p>
          ) : r.total === null ? (
            <>
              <p className="num mt-2 text-3xl font-semibold text-slate-900">{r.notation}</p>
              <p className="mt-2 text-sm text-amber-800">Total tidak dilaporkan karena ada komponen NT. Gunakan komponen yang dapat dinilai untuk memantau tren.</p>
            </>
          ) : (
            <>
              <p className="mt-2 flex items-baseline gap-2">
                <span className="num text-5xl font-semibold text-slate-900">{r.total}</span>
                <span className="text-sm text-slate-500">/ 15</span>
              </p>
              <p className="num mt-1 text-slate-700">{r.notation}</p>
              <p className={`mt-2 text-sm font-semibold ${TONE[r.severity!]}`}>Derajat {GCS_SEVERITY_LABEL[r.severity!].toLowerCase()}</p>
            </>
          )}
          {r.complete && <p className="mt-4 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">{gcsCopyText(r)}</p>}
          <div className="mt-4 flex flex-wrap gap-2">
            <CopyButton text={gcsCopyText(r)} disabled={!r.complete} />
            <button type="button" className="btn-secondary btn-sm" onClick={() => setInput(EMPTY)}>Ulangi</button>
          </div>
        </div>

        {premium ? (
        <div className="card mt-4">
          <h2 className="h2">Cara menghitung</h2>
          <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-slate-700">
            {GCS_COMPONENTS.map((c) => {
              const v = input[c.key];
              const opt = c.options.find((o) => o.value === v);
              return (
                <li key={c.key}>
                  {c.code} = {v === null ? "belum dipilih" : v === "NT" ? "NT (tidak dapat dinilai)" : `${v} (${opt?.label.toLowerCase()})`}
                </li>
              );
            })}
            <li>
              {r.total !== null
                ? `Total = ${GCS_COMPONENTS.map((c) => input[c.key]).join(" + ")} = ${r.total}`
                : r.hasNT
                  ? "Total tidak dijumlahkan karena ada komponen NT."
                  : "Total = E + V + M (3–15)."}
            </li>
            <li>Derajat: 13–15 ringan, 9–12 sedang, 3–8 berat.</li>
          </ol>
        </div>
        ) : (
          <LockedSteps />
        )}
      </aside>
    </div>
  );
}
