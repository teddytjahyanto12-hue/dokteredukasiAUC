"use client";

import { useMemo, useState } from "react";

type Opt = { id: string; label: string; price: number | null };
type Service = {
  id: string;
  name: string;
  price: number | null;
  durations: Opt[];
  addons: Opt[];
  installments: { seq: number; label: string; percent: number; unlocksStage: number }[];
};

function rp(v: number | null) {
  if (v === null) return "Harga menyusul";
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(v);
}

// Form input penjualan oleh admin. Total final dihitung ulang di server.
export function SaleForm({
  action,
  services,
  students,
  leadSources,
  canDiscount,
}: {
  action: (form: FormData) => void | Promise<void>;
  services: Service[];
  students: { id: string; label: string }[];
  leadSources: { value: string; label: string }[];
  canDiscount: boolean;
}) {
  const [serviceId, setServiceId] = useState(services[0]?.id ?? "");
  const svc = services.find((s) => s.id === serviceId);
  const [durationId, setDurationId] = useState(svc?.durations[0]?.id ?? "");
  const [picked, setPicked] = useState<string[]>([]);
  const [discount, setDiscount] = useState("");
  const [plan, setPlan] = useState("FULL");
  const [customer, setCustomer] = useState<"existing" | "new">(students.length ? "existing" : "new");

  const total = useMemo(() => {
    if (!svc) return null;
    const base = svc.durations.length ? svc.durations.find((d) => d.id === durationId)?.price ?? null : svc.price;
    const parts = [base, ...svc.addons.filter((a) => picked.includes(a.id)).map((a) => a.price)];
    if (parts.some((p) => p === null)) return null;
    return (parts as number[]).reduce((s, p) => s + p, 0) - (Number(discount.replace(/\D/g, "")) || 0);
  }, [svc, durationId, picked, discount]);

  function chooseService(id: string) {
    setServiceId(id);
    const s = services.find((x) => x.id === id);
    setDurationId(s?.durations[0]?.id ?? "");
    setPicked([]);
    setPlan("FULL");
  }

  return (
    <form action={action} className="card grid gap-5">
      <fieldset className="grid gap-3">
        <legend className="h2 mb-2">1. Pelanggan</legend>
        <div className="flex gap-4 text-sm">
          <label className="flex items-center gap-2">
            <input type="radio" checked={customer === "existing"} onChange={() => setCustomer("existing")} disabled={!students.length} /> Pelanggan terdaftar
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" checked={customer === "new"} onChange={() => setCustomer("new")} /> Pelanggan baru
          </label>
        </div>
        {customer === "existing" ? (
          <select className="input" name="studentId" required defaultValue="">
            <option value="" disabled>
              Pilih pelanggan
            </option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            <input className="input" name="name" placeholder="Nama lengkap" required />
            <input className="input" name="phone" placeholder="No. WhatsApp" />
            <input className="input" type="email" name="email" placeholder="Email (untuk login)" required />
            <input className="input" name="password" placeholder="Kata sandi awal (min. 6)" minLength={6} required autoComplete="new-password" />
          </div>
        )}
      </fieldset>

      <fieldset className="grid gap-3">
        <legend className="h2 mb-2">2. Layanan</legend>
        <select className="input" name="packageId" value={serviceId} onChange={(e) => chooseService(e.target.value)}>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
        {svc && svc.durations.length > 0 && (
          <div className="grid gap-2 sm:grid-cols-2">
            {svc.durations.map((d) => (
              <label key={d.id} className={`flex items-center justify-between rounded-lg border px-3 py-2 text-sm ${durationId === d.id ? "border-brand bg-brand-soft/40" : "border-slate-200"}`}>
                <span className="flex items-center gap-2">
                  <input type="radio" name="durationId" value={d.id} checked={durationId === d.id} onChange={() => setDurationId(d.id)} /> {d.label}
                </span>
                <span>{rp(d.price)}</span>
              </label>
            ))}
          </div>
        )}
        {svc && svc.addons.length > 0 && (
          <div className="grid gap-2">
            {svc.addons.map((a) => (
              <label key={a.id} className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-sm">
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="addonIds"
                    value={a.id}
                    checked={picked.includes(a.id)}
                    onChange={(e) => setPicked((p) => (e.target.checked ? [...p, a.id] : p.filter((x) => x !== a.id)))}
                  />
                  {a.label}
                </span>
                <span>+ {rp(a.price)}</span>
              </label>
            ))}
          </div>
        )}
      </fieldset>

      <fieldset className="grid gap-3 sm:grid-cols-2">
        <legend className="h2 mb-2 sm:col-span-2">3. Pembayaran</legend>
        {canDiscount && (
          <label className="block">
            <span className="label">Diskon (Rp, opsional)</span>
            <input className="input" name="discount" inputMode="numeric" value={discount} onChange={(e) => setDiscount(e.target.value)} />
          </label>
        )}
        <label className="block">
          <span className="label">Cara bayar</span>
          <select className="input" name="plan" value={plan} onChange={(e) => setPlan(e.target.value)}>
            <option value="FULL">Bayar penuh</option>
            {svc && svc.installments.length > 0 && <option value="INSTALLMENT">Cicil {svc.installments.length}x</option>}
          </select>
        </label>
        <label className="block">
          <span className="label">Sumber pelanggan</span>
          <select className="input" name="leadSource" defaultValue="WHATSAPP">
            {leadSources.map((l) => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="label">Catatan (opsional)</span>
          <input className="input" name="note" />
        </label>
        {plan === "INSTALLMENT" && svc && (
          <ol className="space-y-1 rounded-lg bg-slate-50 p-3 text-sm sm:col-span-2">
            {svc.installments.map((r, i, all) => {
              const amount =
                total === null ? null : i === all.length - 1 ? total - all.slice(0, -1).reduce((s, x) => s + Math.round((total * x.percent) / 100), 0) : Math.round((total * r.percent) / 100);
              return (
                <li key={r.seq} className="flex justify-between">
                  <span>
                    {r.label} ({r.percent}%) · {r.seq === 1 ? "membuka layanan & tahap 1" : `membuka tahap ${r.unlocksStage}`}
                  </span>
                  <span className="font-semibold">{rp(amount)}</span>
                </li>
              );
            })}
          </ol>
        )}
      </fieldset>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <span className="text-lg">
          Total: <strong>{rp(total)}</strong>
        </span>
        <button className="btn" type="submit" disabled={!svc}>
          Buat penjualan
        </button>
      </div>
    </form>
  );
}
