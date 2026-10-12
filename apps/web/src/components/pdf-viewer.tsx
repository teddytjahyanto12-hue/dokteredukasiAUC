"use client";

import { useEffect, useRef, useState } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist";

// Render locally in the page so browsers without a built-in PDF plugin also work.
export function PdfViewer({ src, title }: { src: string; title: string }) {
  const container = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [page, setPage] = useState(1);
  const [width, setWidth] = useState(0);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!container.current) return;
    const observer = new ResizeObserver(([entry]) => setWidth(Math.floor(entry.contentRect.width)));
    observer.observe(container.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let disposed = false;
    let task: ReturnType<typeof import("pdfjs-dist")["getDocument"]> | undefined;
    setPdf(null);
    setPage(1);
    setBusy(true);
    setError("");
    void import("pdfjs-dist").then(async lib => {
      if (disposed) return;
      lib.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.mjs";
      task = lib.getDocument({ url: src, standardFontDataUrl: "/pdfjs/standard_fonts/" });
      const loaded = await task.promise;
      if (!disposed) setPdf(loaded);
    }).catch(() => {
      if (!disposed) { setBusy(false); setError("PDF belum dapat dimuat. Coba muat ulang atau buka berkas melalui Layar penuh."); }
    });
    return () => { disposed = true; if (task) void task.destroy(); };
  }, [src]);

  useEffect(() => {
    if (!pdf || !width || !canvas.current) return;
    let disposed = false;
    let render: ReturnType<Awaited<ReturnType<PDFDocumentProxy["getPage"]>>["render"]> | undefined;
    setBusy(true);
    setError("");
    void pdf.getPage(page).then(async pdfPage => {
      if (disposed || !canvas.current) return;
      const base = pdfPage.getViewport({ scale: 1 });
      const viewport = pdfPage.getViewport({ scale: width / base.width });
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const target = canvas.current;
      target.width = Math.ceil(viewport.width * ratio);
      target.height = Math.ceil(viewport.height * ratio);
      target.style.width = "100%";
      target.style.height = `${viewport.height}px`;
      render = pdfPage.render({ canvas: target, viewport, transform: [ratio, 0, 0, ratio, 0, 0] });
      await render.promise;
      if (!disposed) setBusy(false);
    }).catch(() => {
      if (!disposed) { setBusy(false); setError("Halaman belum dapat ditampilkan. Coba halaman lain atau buka Layar penuh."); }
    });
    return () => { disposed = true; render?.cancel(); };
  }, [pdf, page, width]);

  return <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-white px-3 py-3">
      <button type="button" className="btn-secondary btn-sm" disabled={!pdf || page <= 1} onClick={() => setPage(p => p - 1)} aria-label="Halaman PDF sebelumnya">← Sebelumnya</button>
      <label className="flex items-center gap-2 text-sm">Halaman <select aria-label="Halaman PDF" className="rounded border border-slate-300 bg-white px-2 py-1" value={page} disabled={!pdf} onChange={event => setPage(Number(event.target.value))}>{Array.from({ length: pdf?.numPages || 1 }, (_, i) => <option key={i} value={i + 1}>{i + 1}</option>)}</select><span>/ {pdf?.numPages || "…"}</span></label>
      <button type="button" className="btn-secondary btn-sm" disabled={!pdf || page >= pdf.numPages} onClick={() => setPage(p => p + 1)} aria-label="Halaman PDF berikutnya">Berikutnya →</button>
    </div>
    <div className="max-h-[80vh] overflow-y-auto p-2 sm:p-4">
      <div ref={container} className="relative min-h-48 w-full bg-white shadow-sm" aria-busy={busy}>
        {busy && !error && <p role="status" className="absolute inset-x-0 top-6 bg-white/90 p-3 text-center text-sm text-slate-600">Memuat halaman PDF…</p>}
        {error && <p role="alert" className="p-6 text-sm text-red-700">{error}</p>}
        <canvas ref={canvas} role="img" aria-label={`${title}, halaman ${page}`} className={error ? "hidden" : "block w-full"} />
      </div>
    </div>
  </div>;
}
