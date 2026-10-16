"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { DrugRoute } from "@/lib/dosis-obat/types";

type Item = { slug: string; name: string; routes: DrugRoute[]; hasCalc: boolean };
const ROUTES: DrugRoute[] = ["Oral", "Injeksi", "Topikal", "Rektal", "Inhalasi/Hidung", "Mata/Telinga"];

const norm = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "");

// Daftar obat anak: pencarian nama generik, filter rute, dan pengelompokan abjad.
export function DrugList({ drugs }: { drugs: Item[] }) {
  const [q, setQ] = useState("");
  const [route, setRoute] = useState<DrugRoute | "">("");
  const list = useMemo(() => {
    const n = norm(q.trim());
    return drugs.filter((d) => (!n || norm(d.name).includes(n)) && (!route || d.routes.includes(route)));
  }, [drugs, q, route]);
  const groups = useMemo(() => {
    const m = new Map<string, Item[]>();
    for (const d of list) {
      const k = norm(d.name)[0]?.toUpperCase() ?? "#";
      m.set(k, [...(m.get(k) ?? []), d]);
    }
    return [...m.entries()];
  }, [list]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <label className="block flex-1">
          <span className="label">Cari nama generik</span>
          <input className="input mt-1" type="search" placeholder="mis. parasetamol, amoksisilin" value={q} onChange={(e) => setQ(e.target.value)} />
        </label>
        <label className="block sm:w-56">
          <span className="label">Rute</span>
          <select className="input mt-1" value={route} onChange={(e) => setRoute(e.target.value as DrugRoute | "")}>
            <option value="">Semua rute</option>
            {ROUTES.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </label>
      </div>
      <p className="mt-3 text-sm text-slate-500" aria-live="polite">{list.length} obat</p>
      {groups.length === 0 ? (
        <p className="mt-6 text-sm text-slate-600">Obat tidak ditemukan. Coba nama generik lain.</p>
      ) : (
        <div className="mt-4 space-y-6">
          {groups.map(([letter, items]) => (
            <section key={letter}>
              <h2 className="text-sm font-bold text-slate-400">{letter}</h2>
              <ul className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((d) => (
                  <li key={d.slug}>
                    <Link href={`/dosis-obat/anak/${d.slug}`} className="flex h-full flex-col rounded-lg border border-slate-200 bg-white px-3 py-2.5 transition hover:border-ink">
                      <span className="font-semibold text-slate-900">{d.name}</span>
                      <span className="mt-1 flex flex-wrap gap-1">
                        {d.routes.map((r) => (
                          <span key={r} className="rounded bg-slate-100 px-1.5 py-0.5 text-[11px] font-medium text-slate-600">{r}</span>
                        ))}
                        {!d.hasCalc && <span className="rounded bg-amber-50 px-1.5 py-0.5 text-[11px] font-medium text-amber-700">Dosis di aturan penggunaan</span>}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
