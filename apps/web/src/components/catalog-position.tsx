"use client";

import { useLayoutEffect } from "react";

// Simpan posisi sebelum meninggalkan katalog, termasuk navigasi dokumen biasa.
export function CatalogPosition({ catalogKey }: { catalogKey: string }) {
  useLayoutEffect(() => {
    const catalog = document.getElementById("katalog");
    const key = `dea:catalog-position:${catalogKey}`;
    let frame = 0;
    try {
      const raw = sessionStorage.getItem(key);
      if (raw) {
        sessionStorage.removeItem(key);
        const saved = JSON.parse(raw);
        if (Number.isFinite(saved.y) && saved.y >= 0 && Date.now() - saved.time < 30 * 60 * 1000) {
          const restore = () => {
            const card = typeof saved.card === "string" ? document.getElementById(saved.card) : null;
            const top = card && Number.isFinite(saved.offset) ? window.scrollY + card.getBoundingClientRect().top - saved.offset : saved.y;
            window.scrollTo({ top, behavior: "instant" });
          };
          restore();
          frame = requestAnimationFrame(() => { frame = requestAnimationFrame(restore); });
        }
      }
    } catch { /* Penyimpanan browser opsional. */ }
    const save = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest("a") : null;
      if (!link || !catalog?.contains(link) || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || link.target === "_blank") return;
      const card = link.closest("article[id]");
      try { sessionStorage.setItem(key, JSON.stringify({ y: window.scrollY, card: card?.id, offset: card?.getBoundingClientRect().top, time: Date.now() })); } catch { /* Browser tetap dapat bernavigasi. */ }
    };
    document.addEventListener("click", save, true);
    return () => { document.removeEventListener("click", save, true); cancelAnimationFrame(frame); };
  }, [catalogKey]);
  return null;
}
