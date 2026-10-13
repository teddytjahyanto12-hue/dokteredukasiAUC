"use client";

import { useEffect, useState } from "react";

const RECENT_KEY = "de_calc_recent";
const FAV_KEY = "de_calc_fav";

function readList(key: string): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(key) ?? "[]");
    return Array.isArray(v) ? v.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}
function writeList(key: string, list: string[]) {
  try {
    localStorage.setItem(key, JSON.stringify(list));
  } catch {
    /* penyimpanan perangkat tidak tersedia: abaikan */
  }
}

export const getRecent = () => readList(RECENT_KEY);
export const getFavorites = () => readList(FAV_KEY);

/** Mencatat kalkulator yang dibuka ke daftar "Terakhir dipakai" di perangkat. */
export function RecentMark({ slug }: { slug: string }) {
  useEffect(() => {
    writeList(RECENT_KEY, [slug, ...readList(RECENT_KEY).filter((s) => s !== slug)].slice(0, 6));
  }, [slug]);
  return null;
}

export function FavoriteButton({ slug }: { slug: string }) {
  const [fav, setFav] = useState(false);
  useEffect(() => setFav(readList(FAV_KEY).includes(slug)), [slug]);
  function toggle() {
    const list = readList(FAV_KEY);
    const next = list.includes(slug) ? list.filter((s) => s !== slug) : [slug, ...list];
    writeList(FAV_KEY, next);
    setFav(next.includes(slug));
  }
  return (
    <button type="button" onClick={toggle} aria-pressed={fav} className="btn-secondary btn-sm">
      <span aria-hidden className={fav ? "text-amber-500" : "text-slate-400"}>★</span>
      {fav ? "Favorit" : "Tambah ke favorit"}
    </button>
  );
}

export function CopyButton({ text, disabled }: { text: string; disabled?: boolean }) {
  const [done, setDone] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 1800);
    } catch {
      setDone(false);
    }
  }
  return (
    <button type="button" onClick={copy} disabled={disabled || !text} className="btn btn-sm">
      {done ? "Tersalin" : "Salin hasil"}
    </button>
  );
}

/** Ringkasan hasil yang menempel di bawah layar HP, agar hasil terlihat tanpa menggulir. */
export function MobileResultBar({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-20 border-t border-ink bg-white px-4 py-3 pr-40 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] lg:hidden print:hidden" aria-hidden>
      {children}
    </div>
  );
}

/** Pengganti panel "Cara menghitung" bagi pengguna yang belum berlangganan. */
export function LockedSteps() {
  return (
    <div className="card mt-4 border-dashed">
      <h2 className="h2">🔒 Cara menghitung</h2>
      <p className="mt-2 text-sm text-slate-600">Langkah perhitungan dengan angka yang diisi tersedia untuk pelanggan Kalkulator Medis Premium.</p>
    </div>
  );
}

/** Tombol pilihan berbentuk kartu untuk input skor. */
export function Choice({ selected, onClick, title, hint, value }: { selected: boolean; onClick: () => void; title: string; hint?: string; value?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex w-full items-start gap-3 rounded-lg border px-3 py-2.5 text-left transition ${
        selected ? "border-ink bg-brand-soft" : "border-slate-200 bg-white hover:border-slate-400"
      }`}
    >
      {value !== undefined && (
        <span className={`num grid h-7 w-7 shrink-0 place-items-center rounded-md text-sm font-semibold ${selected ? "bg-ink text-mascot" : "bg-slate-100 text-slate-700"}`}>{value}</span>
      )}
      <span>
        <span className="block text-sm font-semibold text-slate-900">{title}</span>
        {hint && <span className="mt-0.5 block text-xs text-slate-500">{hint}</span>}
      </span>
    </button>
  );
}
