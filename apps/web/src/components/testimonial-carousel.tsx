"use client";

import { useEffect, useState } from "react";

type Item = { id: string; name: string; role: string | null; quote: string };

// Kartu testimoni bergantian di atas tombol WhatsApp. Bisa ditutup (tersimpan selama sesi peramban).
export function TestimonialCarousel({ items }: { items: Item[] }) {
  const [i, setI] = useState(0);
  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    try {
      setHidden(sessionStorage.getItem("dea-testimoni-tutup") === "1");
    } catch {
      setHidden(false);
    }
  }, []);
  useEffect(() => {
    if (items.length < 2) return;
    const t = setInterval(() => setI((v) => (v + 1) % items.length), 7000);
    return () => clearInterval(t);
  }, [items.length]);
  if (hidden) return null;
  const t = items[i % items.length];
  return (
    <figure className="relative w-[min(300px,calc(100vw-2rem))] rounded-2xl border border-slate-200 bg-white p-4 pr-8 text-left shadow-xl" aria-live="polite">
      <button
        type="button"
        onClick={() => {
          setHidden(true);
          try {
            sessionStorage.setItem("dea-testimoni-tutup", "1");
          } catch {}
        }}
        className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700"
        aria-label="Tutup testimoni"
      >
        ×
      </button>
      <p className="text-[11px] font-bold uppercase tracking-wide text-brand">Testimoni</p>
      <blockquote className="mt-1 line-clamp-4 text-sm leading-relaxed text-slate-700">“{t.quote}”</blockquote>
      <figcaption className="mt-2 text-xs">
        <span className="font-semibold text-slate-900">{t.name}</span>
        {t.role && <span className="text-slate-500"> · {t.role}</span>}
      </figcaption>
      {items.length > 1 && (
        <div className="mt-2 flex gap-1" aria-hidden>
          {items.map((x, k) => (
            <span key={x.id} className={`h-1.5 rounded-full transition-all ${k === i % items.length ? "w-4 bg-ink" : "w-1.5 bg-slate-300"}`} />
          ))}
        </div>
      )}
    </figure>
  );
}
