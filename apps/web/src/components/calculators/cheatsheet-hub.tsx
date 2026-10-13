"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CALCULATORS, FIELDS, type CalcMeta } from "@/lib/calculators/registry";
import { getFavorites, getRecent } from "@/components/calculators/calc-ui";
import { Icon } from "@/components/icons";

function matches(c: CalcMeta, q: string) {
  if (!q) return true;
  const hay = [c.title, c.short, c.field, c.summary, ...c.keywords].join(" ").toLowerCase();
  return q.toLowerCase().split(/\s+/).every((w) => hay.includes(w));
}

function Card({ c, premium }: { c: CalcMeta; premium: boolean }) {
  const soon = c.status === "soon";
  const body = (
    <div className={`calculator-choice card h-full transition ${soon ? "opacity-60" : "hover:-translate-y-0.5 hover:border-slate-400"}`}>
      <p>
        <span className="badge">{c.field}</span>
        {c.access === "free" ? <span className="badge-brand">Gratis</span> : <span className="badge-brand">{premium ? "Premium" : "🔒 Premium"}</span>}
        {soon ? <span className="badge">Segera hadir</span> : c.status === "validated" ? <span className="badge">Tervalidasi</span> : <span className="badge-warn">Draf</span>}
      </p>
      <h3 className="mt-2 font-semibold text-slate-900">{c.title}</h3>
      <p className="mt-1 text-sm text-slate-600">{c.summary}</p>
    </div>
  );
  return soon ? <div aria-disabled>{body}</div> : <Link href={`/kalkulator/${c.slug}`} className="calculator-link block">{body}</Link>;
}

export function CheatsheetHub({ premium, delayMs = 0 }: { premium: boolean; delayMs?: number }) {
  const [q, setQ] = useState("");
  const [field, setField] = useState<string>("");
  const [recent, setRecent] = useState<string[]>([]);
  const [favs, setFavs] = useState<string[]>([]);
  useEffect(() => {
    setRecent(getRecent());
    setFavs(getFavorites());
  }, []);

  const list = useMemo(
    () =>
      CALCULATORS.filter((c) => (!field || c.field === field) && matches(c, q.trim())).sort(
        (a, b) => Number(a.status === "soon") - Number(b.status === "soon"),
      ),
    [q, field],
  );
  const pick = (slugs: string[]) => slugs.map((s) => CALCULATORS.find((c) => c.slug === s && c.status !== "soon")).filter((c): c is CalcMeta => !!c);
  const favList = pick(favs);
  const recentList = pick(recent);

  return (
    <div>
      <div className="relative max-w-xl">
        <Icon name="search" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Cari skor, singkatan, atau kondisi (mis. koma, hamil, sepsis)"
          aria-label="Cari kalkulator"
          className="input h-12 pl-10 text-base"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter bidang">
        {["", ...FIELDS].map((f) => (
          <button key={f || "semua"} type="button" onClick={() => setField(f)} aria-pressed={field === f}
            className={`min-h-11 rounded-lg border-2 px-3 py-2 text-sm font-bold transition ${field === f ? "border-ink bg-ink text-white" : "border-slate-400 bg-white text-slate-800 hover:border-ink"}`}>
            {f || "Semua bidang"}
          </button>
        ))}
      </div>

      {!q && !field && (favList.length > 0 || recentList.length > 0) && (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {favList.length > 0 && (
            <div>
              <p className="eyebrow">Favorit</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {favList.map((c) => <Link key={c.slug} href={`/kalkulator/${c.slug}`} className="btn-secondary btn-sm">★ {c.short}</Link>)}
              </div>
            </div>
          )}
          {recentList.length > 0 && (
            <div>
              <p className="eyebrow">Terakhir dipakai</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {recentList.map((c) => <Link key={c.slug} href={`/kalkulator/${c.slug}`} className="btn-secondary btn-sm">{c.short}</Link>)}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((c, i) => (
          <div key={c.slug} className="km-card-in" style={{ animationDelay: `${delayMs + Math.min(i, 12) * 40}ms` }}>
            <Card c={c} premium={premium} />
          </div>
        ))}
      </div>
      {list.length === 0 && <p className="mt-8 text-sm text-slate-500">Tidak ada kalkulator yang cocok. Coba kata lain.</p>}
    </div>
  );
}
