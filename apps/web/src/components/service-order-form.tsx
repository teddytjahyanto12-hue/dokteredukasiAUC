"use client";

import { useMemo, useState } from "react";

type Option = { id: string; label: string; price: number | null; description?: string | null };
type Rule = { seq: number; label: string; percent: number; unlocksStage: number; stageTitle?: string };

function rp(v: number | null) {
  if (v === null) return "Harga menyusul";
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(v);
}

// Pilihan masa belajar + add-on dengan total yang langsung terlihat.
// Total final tetap dihitung ulang di server saat order dibuat.
export function ServiceOrderForm({
  action,
  packageId,
  basePrice,
  durations,
  addons,
  canOrder,
  disabledReason,
  installmentRules = [],
  leadSources = [],
}: {
  action: (form: FormData) => void | Promise<void>;
  packageId: string;
  basePrice: number | null;
  durations: Option[];
  addons: Option[];
  canOrder: boolean;
  disabledReason?: React.ReactNode;
  installmentRules?: Rule[];
  leadSources?: { value: string; label: string }[];
}) {
  const [durationId, setDurationId] = useState(durations[0]?.id ?? "");
  const [picked, setPicked] = useState<string[]>([]);
  const [plan, setPlan] = useState<"FULL" | "INSTALLMENT">("FULL");

  const total = useMemo(() => {
    const base = durations.length ? durations.find((d) => d.id === durationId)?.price ?? null : basePrice;
    const parts = [base, ...addons.filter((a) => picked.includes(a.id)).map((a) => a.price)];
    return parts.some((p) => p === null) ? null : parts.reduce<number>((s, p) => s + (p as number), 0);
  }, [durationId, picked, durations, addons, basePrice]);

  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="packageId" value={packageId} />

      {durations.length > 0 && (
        <fieldset>
          <legend className="label">Pilih masa waktu belajar</legend>
          <div className="grid gap-2">
            {durations.map((d) => (
              <label
                key={d.id}
                className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg border px-3 py-2 text-sm ${
                  durationId === d.id ? "border-brand bg-brand-soft/40" : "border-slate-200"
                }`}
              >
                <span className="flex items-center gap-2">
                  <input type="radio" name="durationId" value={d.id} checked={durationId === d.id} onChange={() => setDurationId(d.id)} />
                  {d.label}
                </span>
                <span className="font-semibold">{rp(d.price)}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {addons.length > 0 && (
        <fieldset>
          <legend className="label">Tambahkan add-on (opsional)</legend>
          <div className="grid gap-2">
            {addons.map((a) => (
              <label key={a.id} className="flex cursor-pointer items-start justify-between gap-3 rounded-lg border border-slate-200 px-3 py-2 text-sm">
                <span className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    name="addonIds"
                    value={a.id}
                    className="mt-1"
                    checked={picked.includes(a.id)}
                    onChange={(e) => setPicked((p) => (e.target.checked ? [...p, a.id] : p.filter((x) => x !== a.id)))}
                  />
                  <span>
                    {a.label}
                    {a.description && <span className="block text-xs text-slate-500">{a.description}</span>}
                  </span>
                </span>
                <span className="shrink-0 font-semibold">+ {rp(a.price)}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <div className="flex items-baseline justify-between border-t border-slate-100 pt-4">
        <span className="text-sm text-slate-600">Total</span>
        <span className="text-2xl font-bold text-slate-900">{rp(total)}</span>
      </div>

      {installmentRules.length > 0 && (
        <fieldset>
          <legend className="label">Cara bayar</legend>
          <div className="grid grid-cols-2 gap-2">
            {(["FULL", "INSTALLMENT"] as const).map((p) => (
              <label
                key={p}
                className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm ${plan === p ? "border-brand bg-brand-soft/40" : "border-slate-200"}`}
              >
                <input type="radio" name="plan" value={p} checked={plan === p} onChange={() => setPlan(p)} />
                {p === "FULL" ? "Bayar penuh" : `Cicil ${installmentRules.length}x`}
              </label>
            ))}
          </div>
          {plan === "INSTALLMENT" && (
            <ol className="mt-3 space-y-1 rounded-lg bg-slate-50 p-3 text-sm">
              {schedule(total, installmentRules).map((r) => (
                <li key={r.seq} className="flex justify-between gap-3">
                  <span>
                    {r.label} ({r.percent}%)
                    <span className="block text-xs text-slate-500">
                      {r.seq === 1 ? "Saat mulai — membuka layanan & tahap 1" : `Sebelum tahap ${r.unlocksStage}${r.stageTitle ? ` (${r.stageTitle})` : ""}`}
                    </span>
                  </span>
                  <span className="font-semibold">{rp(r.amount)}</span>
                </li>
              ))}
            </ol>
          )}
        </fieldset>
      )}

      {leadSources.length > 0 && (
        <label className="block">
          <span className="label">Tahu layanan ini dari (opsional)</span>
          <select className="input" name="leadSource" defaultValue="">
            <option value="">—</option>
            {leadSources.map((l) => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </select>
        </label>
      )}

      {canOrder ? (
        <button className="btn w-full" type="submit">
          Pesan layanan ini
        </button>
      ) : (
        disabledReason
      )}
    </form>
  );
}

// Sama dengan splitInstallments di server: sisa pembulatan masuk cicilan terakhir.
function schedule(total: number | null, rules: Rule[]) {
  const sorted = [...rules].sort((a, b) => a.seq - b.seq);
  let used = 0;
  return sorted.map((r, i) => {
    if (total === null) return { ...r, amount: null as number | null };
    const amount = i === sorted.length - 1 ? total - used : Math.round((total * r.percent) / 100);
    used += amount;
    return { ...r, amount: amount as number | null };
  });
}
