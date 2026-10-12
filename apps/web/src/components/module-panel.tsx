"use client";
import { useState } from "react";
export function ModulePanel({ simplified, children }: { simplified: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return <aside id="kurikulum-kelas" className={simplified ? "order-1 scroll-mt-36" : "order-2 scroll-mt-36 lg:order-1"}>{simplified && <button className="btn-secondary mb-3 w-full lg:hidden" aria-expanded={open} aria-controls="daftar-modul-srma" onClick={() => setOpen(!open)}>Daftar Modul {open ? "▴" : "▾"}</button>}<div id="daftar-modul-srma" className={simplified && !open ? "hidden lg:block" : "block"}>{children}</div></aside>;
}
