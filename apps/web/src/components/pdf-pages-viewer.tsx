"use client";
import { useEffect, useRef, useState } from "react";

export function PdfPagesViewer({ fileId, count, title }: { fileId: string; count: number; title: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const [full, setFull] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (!full) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setFull(false); };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = previous; document.removeEventListener("keydown", onKey); };
  }, [full]);
  function toggleFull() { setFull(p => !p); }
  function changePage(next: number) { setPage(next); setError(false); setLoaded(false); }
  return <div ref={box} className={`${full ? "fixed inset-0 z-[100] flex flex-col rounded-none" : "rounded-xl"} overflow-hidden border border-slate-200 bg-slate-100`}>
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-white p-3">
      <button type="button" className="btn-secondary btn-sm" disabled={page === 1} onClick={() => changePage(page - 1)}>← Sebelumnya</button>
      <label className="flex items-center gap-2 text-sm">Halaman<select aria-label="Halaman materi" className="rounded border px-2 py-1" value={page} onChange={event => changePage(Number(event.target.value))}>{Array.from({ length: count }, (_, i) => <option key={i} value={i + 1}>{i + 1}</option>)}</select> / {count}</label>
      <button type="button" className="btn-secondary btn-sm" disabled={page === count} onClick={() => changePage(page + 1)}>Berikutnya →</button>
      <select aria-label="Perbesar materi" className="rounded border px-2 py-1 text-sm" value={zoom} onChange={event => setZoom(Number(event.target.value))}><option value={100}>Pas lebar</option><option value={125}>125%</option><option value={150}>150%</option><option value={200}>200%</option></select>
      <button type="button" className="btn-secondary btn-sm" onClick={toggleFull}>{full ? "Tutup layar penuh" : "Layar penuh"}</button>
    </div>
    <div className={`${full ? "min-h-0 flex-1" : "max-h-[80vh]"} overflow-auto p-2 sm:p-4`}>
      {!loaded && !error && <p role="status" className="py-3 text-center text-sm">Memuat halaman materi…</p>}
      {error && <p role="alert" className="py-4 text-center text-sm text-red-700">Halaman belum dapat dimuat. <button type="button" className="link" onClick={() => { setError(false); setLoaded(false); }}>Coba lagi</button></p>}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {!error && <img key={page} src={`/api/materi-pdf/${fileId}/${page}`} alt={`${title}, halaman ${page}`} draggable={false} onContextMenu={event => event.preventDefault()} onLoad={() => setLoaded(true)} onError={() => setError(true)} className="max-w-none bg-white shadow-sm" style={{ width: `${zoom}%` }} />}
    </div>
  </div>;
}
