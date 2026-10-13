"use client";

import { useEffect, useState } from "react";
import { computeHpl, hplCopyText, tanggalIndo, type HplInput, type HplMethod, type HplResult } from "@/lib/calculators/hpl";
import { Choice, CopyButton, LockedSteps, MobileResultBar } from "@/components/calculators/calc-ui";

const METHODS: { id: HplMethod; title: string; hint: string }[] = [
  { id: "hpht", title: "HPHT", hint: "Hari pertama haid terakhir" },
  { id: "usg", title: "USG", hint: "Usia kehamilan saat USG" },
  { id: "embrio", title: "Transfer embrio", hint: "Kehamilan hasil IVF" },
];

function localToday() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function HplCalculator({ premium }: { premium: boolean }) {
  const [method, setMethod] = useState<HplMethod>("hpht");
  const [today, setToday] = useState("");
  const [hpht, setHpht] = useState("");
  const [usgDate, setUsgDate] = useState("");
  const [usgWeeks, setUsgWeeks] = useState("");
  const [usgDays, setUsgDays] = useState("0");
  const [transferDate, setTransferDate] = useState("");
  const [embryoDay, setEmbryoDay] = useState<3 | 5>(5);
  useEffect(() => setToday(localToday()), []);

  let input: HplInput | null = null;
  if (today) {
    if (method === "hpht" && hpht) input = { method, hpht, today };
    if (method === "usg" && usgDate && usgWeeks !== "") input = { method, usgDate, usgWeeks: Number(usgWeeks), usgDays: Number(usgDays || 0), today };
    if (method === "embrio" && transferDate) input = { method, transferDate, embryoDay, today };
  }
  let r: HplResult | null = null;
  let error = "";
  if (input) {
    try {
      r = computeHpl(input);
    } catch (e) {
      error = e instanceof Error ? e.message : "Input tidak valid";
    }
  }
  const copy = r ? hplCopyText(r, method) : "";

  return (
    <div className="grid gap-6 pb-16 lg:grid-cols-[1fr_340px] lg:pb-0">
      <MobileResultBar>
        <p className="text-xs text-slate-500">Hasil</p>
        <p className="truncate text-sm font-semibold text-slate-900">
          {r ? `HPL ${tanggalIndo(r.hpl)}${r.gaDays >= 0 ? ` · UK ${r.gaWeeks} mgg ${r.gaRemDays} hr` : ""}` : error || "Isi tanggal untuk melihat hasil"}
        </p>
      </MobileResultBar>
      <div className="space-y-6">
        <fieldset className="card">
          <legend className="sr-only">Metode</legend>
          <h2 className="h2">Dasar perhitungan</h2>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {METHODS.map((m) => (
              <Choice key={m.id} title={m.title} hint={m.hint} selected={method === m.id} onClick={() => setMethod(m.id)} />
            ))}
          </div>
        </fieldset>

        <div className="card space-y-4">
          {method === "hpht" && (
            <label className="block">
              <span className="label">Hari pertama haid terakhir (HPHT)</span>
              <input type="date" className="input max-w-xs" value={hpht} onChange={(e) => setHpht(e.target.value)} />
              <span className="mt-1 block text-xs text-slate-500">Dapat diandalkan bila HPHT diingat pasti dan siklus teratur sekitar 28 hari.</span>
            </label>
          )}
          {method === "usg" && (
            <>
              <label className="block">
                <span className="label">Tanggal USG</span>
                <input type="date" className="input max-w-xs" value={usgDate} onChange={(e) => setUsgDate(e.target.value)} />
              </label>
              <div>
                <span className="label">Usia kehamilan menurut USG</span>
                <div className="flex items-center gap-2">
                  <input type="number" inputMode="numeric" min={4} max={42} className="input w-24" value={usgWeeks} onChange={(e) => setUsgWeeks(e.target.value)} aria-label="Minggu" />
                  <span className="text-sm text-slate-600">minggu</span>
                  <input type="number" inputMode="numeric" min={0} max={6} className="input w-20" value={usgDays} onChange={(e) => setUsgDays(e.target.value)} aria-label="Hari" />
                  <span className="text-sm text-slate-600">hari</span>
                </div>
                <span className="mt-1 block text-xs text-slate-500">USG trimester pertama (CRL, sampai 13 6/7 minggu) paling akurat.</span>
              </div>
            </>
          )}
          {method === "embrio" && (
            <>
              <label className="block">
                <span className="label">Tanggal transfer embrio</span>
                <input type="date" className="input max-w-xs" value={transferDate} onChange={(e) => setTransferDate(e.target.value)} />
              </label>
              <div>
                <span className="label">Umur embrio saat transfer</span>
                <div className="grid max-w-md gap-2 sm:grid-cols-2">
                  <Choice title="Hari ke-5 (blastokista)" hint="HPL = transfer + 261 hari" selected={embryoDay === 5} onClick={() => setEmbryoDay(5)} />
                  <Choice title="Hari ke-3" hint="HPL = transfer + 263 hari" selected={embryoDay === 3} onClick={() => setEmbryoDay(3)} />
                </div>
              </div>
            </>
          )}
          <label className="block border-t border-slate-100 pt-4">
            <span className="label">Usia kehamilan dihitung pada tanggal</span>
            <input type="date" className="input max-w-xs" value={today} onChange={(e) => setToday(e.target.value)} />
            <span className="mt-1 block text-xs text-slate-500">Bawaan: hari ini. Ubah untuk menghitung usia kehamilan pada tanggal lain.</span>
          </label>
        </div>
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="card border-ink" aria-live="polite">
          <p className="eyebrow">Hasil</p>
          {error ? (
            <p className="mt-3 text-sm text-red-700">{error}</p>
          ) : !r ? (
            <p className="mt-3 text-sm text-slate-600">Isi tanggal di sebelah kiri. Hasil muncul otomatis.</p>
          ) : (
            <>
              <p className="mt-2 text-sm text-slate-500">HPL</p>
              <p className="text-2xl font-semibold text-slate-900">{tanggalIndo(r.hpl)}</p>
              <p className="mt-3 text-sm text-slate-500">Usia kehamilan</p>
              {r.gaDays >= 0 ? (
                <p className="num text-2xl font-semibold text-slate-900">
                  {r.gaWeeks} mgg {r.gaRemDays} hr
                </p>
              ) : (
                <p className="text-sm text-amber-800">Tanggal acuan berada setelah tanggal penghitungan.</p>
              )}
              <ul className="mt-3 space-y-1 text-sm text-slate-700">
                {r.trimester && <li>Trimester {r.trimester}</li>}
                {r.gaDays >= 0 && <li>{r.termLabel}</li>}
                <li>{r.daysToHpl >= 0 ? `${r.daysToHpl} hari menuju HPL` : `HPL terlewati ${-r.daysToHpl} hari`}</li>
                {r.naegele && (
                  <li>
                    Naegele manual: {tanggalIndo(r.naegele)}
                    {r.naegeleDiff ? ` (selisih ${r.naegeleDiff > 0 ? "+" : ""}${r.naegeleDiff} hari)` : " (sama)"}
                  </li>
                )}
              </ul>
              <p className="mt-4 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">{copy}</p>
            </>
          )}
          <div className="mt-4">
            <CopyButton text={copy} disabled={!r} />
          </div>
        </div>

        {premium ? (
        <div className="card mt-4">
          <h2 className="h2">Cara menghitung</h2>
          <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-slate-700">
            {method === "hpht" && (
              <>
                <li>HPL = HPHT + 280 hari{r && hpht ? `: ${tanggalIndo(hpht)} + 280 hari = ${tanggalIndo(r.hpl)}` : "."}</li>
                <li>Naegele manual: tanggal + 7, bulan − 3, tahun + 1 (HPHT Januari–Maret: tahun tetap){r?.naegele ? ` = ${tanggalIndo(r.naegele)}` : "."}</li>
              </>
            )}
            {method === "usg" && (
              <li>
                HPL = tanggal USG + (280 − UK saat USG dalam hari)
                {r && usgDate ? `: ${tanggalIndo(usgDate)} + (280 − ${Number(usgWeeks) * 7 + Number(usgDays || 0)}) hari = ${tanggalIndo(r.hpl)}` : "."}
              </li>
            )}
            {method === "embrio" && <li>HPL = tanggal transfer + {embryoDay === 5 ? 261 : 263} hari{r ? ` = ${tanggalIndo(r.hpl)}` : "."}</li>}
            <li>Usia kehamilan = tanggal penghitungan − (HPL − 280 hari){r && r.gaDays >= 0 ? ` = ${r.gaDays} hari = ${r.gaWeeks} minggu ${r.gaRemDays} hari` : "."}</li>
          </ol>
        </div>
        ) : (
          <LockedSteps />
        )}
      </aside>
    </div>
  );
}
