"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/icons";

type Item = { title: string; subtitle?: string; href: string; kind: string };
type Group = { key: string; label: string; items: Item[] };

// Kotak pencarian seluruh situs dengan saran langsung saat mengetik.
// variant "header": melebar saat fokus; variant "page": selalu lebar (halaman /cari).
export function SiteSearch({ variant = "header", initial = "" }: { variant?: "header" | "page"; initial?: string }) {
  const router = useRouter();
  const [q, setQ] = useState(initial);
  const [groups, setGroups] = useState<Group[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [loading, setLoading] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const flat = useMemo(() => groups.flatMap((g) => g.items), [groups]);

  useEffect(() => {
    const term = q.trim();
    if (term.length < 2) {
      setGroups([]);
      return;
    }
    const ctl = new AbortController();
    setLoading(true);
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/cari?q=${encodeURIComponent(term)}`, { signal: ctl.signal });
        const data = (await res.json()) as { groups: Group[] };
        setGroups(data.groups);
        setActive(-1);
      } catch {
        /* dibatalkan atau gagal: abaikan */
      } finally {
        setLoading(false);
      }
    }, 180);
    return () => {
      clearTimeout(t);
      ctl.abort();
    };
  }, [q]);

  useEffect(() => {
    const close = (e: MouseEvent) => box.current && !box.current.contains(e.target as Node) && setOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  function go(href: string) {
    setOpen(false);
    router.push(href);
  }
  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") { e.preventDefault(); setOpen(true); setActive((a) => Math.min(a + 1, flat.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, -1)); }
    else if (e.key === "Escape") setOpen(false);
    else if (e.key === "Enter") {
      e.preventDefault();
      if (active >= 0 && flat[active]) go(flat[active].href);
      else if (q.trim()) go(`/cari?q=${encodeURIComponent(q.trim())}`);
    }
  }

  const header = variant === "header";
  const showList = open && q.trim().length >= 2;
  let idx = -1;
  return (
    <div ref={box} className={`relative ${header ? "" : "w-full max-w-2xl"}`}>
      <Icon name="search" className={`pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 ${header ? "text-slate-400" : "text-slate-500"}`} />
      <input
        type="search"
        value={q}
        onChange={(e) => { setQ(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKey}
        role="combobox"
        aria-expanded={showList}
        aria-controls="site-search-list"
        aria-autocomplete="list"
        aria-label="Cari di Dokter Edukasi"
        placeholder="Cari kelas, materi, kalkulator, paket…"
        className={
          header
            ? "h-9 w-12 cursor-pointer rounded-full bg-slate-100 pl-9 pr-2 text-sm text-transparent outline-none transition-all placeholder:text-transparent focus:w-72 focus:cursor-text focus:bg-white focus:text-slate-900 focus:ring-2 focus:ring-brand/30 focus:placeholder:text-slate-400"
            : "input h-12 pl-10 text-base"
        }
      />
      {showList && (
        <div id="site-search-list" role="listbox" className={`absolute z-40 mt-2 max-h-[70vh] overflow-auto rounded-xl border border-slate-200 bg-white p-2 shadow-xl ${header ? "left-0 w-[min(92vw,26rem)]" : "left-0 right-0"}`}>
          {loading && groups.length === 0 && <p className="px-3 py-2 text-sm text-slate-500">Mencari…</p>}
          {!loading && groups.length === 0 && <p className="px-3 py-2 text-sm text-slate-500">Tidak ada hasil untuk &ldquo;{q.trim()}&rdquo;.</p>}
          {groups.map((g) => (
            <div key={g.key} className="py-1">
              <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">{g.label}</p>
              {g.items.map((it) => {
                idx += 1;
                const i = idx;
                return (
                  <button
                    key={it.href}
                    type="button"
                    role="option"
                    aria-selected={active === i}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(it.href)}
                    className={`block w-full rounded-lg px-3 py-2 text-left ${active === i ? "bg-brand-soft" : "hover:bg-slate-50"}`}
                  >
                    <span className="block text-sm font-medium text-slate-900">{it.title}</span>
                    {it.subtitle && <span className="block truncate text-xs text-slate-500">{it.subtitle}</span>}
                  </button>
                );
              })}
            </div>
          ))}
          {groups.length > 0 && (
            <button type="button" onClick={() => go(`/cari?q=${encodeURIComponent(q.trim())}`)} className="mt-1 block w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-brand hover:bg-slate-50">
              Lihat semua hasil untuk &ldquo;{q.trim()}&rdquo;
            </button>
          )}
        </div>
      )}
    </div>
  );
}
