"use client";

import { useEffect, useState } from "react";

// Animasi pembuka Kalkulator Medis (sekali per sesi, lewat cookie sesi "km_intro").
// Urutan: tirai gelap → logo DE muncul dari blur → garis EKG → logo berdenyut → iris menutup ke tengah.
const TOTAL_MS = 2500;
const EXIT_MS = 1900;

function markSeen() {
  try {
    document.cookie = "km_intro=1; path=/; SameSite=Lax";
  } catch {
    /* abaikan */
  }
}

export function KalkulatorIntro() {
  const [phase, setPhase] = useState<"play" | "exit" | "done">("play");

  useEffect(() => {
    markSeen();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("done");
      return;
    }
    const t1 = setTimeout(() => setPhase("exit"), EXIT_MS);
    const t2 = setTimeout(() => setPhase("done"), TOTAL_MS);
    const skip = (e: KeyboardEvent) => e.key === "Escape" && setPhase("done");
    window.addEventListener("keydown", skip);
    document.documentElement.style.overflow = "hidden";
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("keydown", skip);
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (phase === "done") document.documentElement.style.overflow = "";
  }, [phase]);

  if (phase === "done") return null;
  return (
    <div
      role="presentation"
      onClick={() => setPhase("done")}
      className={`km-intro fixed inset-0 z-[60] flex cursor-pointer flex-col items-center justify-center bg-ink ${phase === "exit" ? "km-intro-exit" : ""}`}
    >
      <div className="relative flex flex-col items-center">
        <span aria-hidden className="km-bloom absolute left-1/2 top-[44px] h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full" />
        <svg aria-hidden viewBox="0 0 600 120" className="absolute left-1/2 top-[44px] w-[min(92vw,640px)] -translate-x-1/2 -translate-y-1/2 overflow-visible">
          <path
            className="km-ecg"
            d="M0 60 H96 L108 50 L120 60 H150 L162 30 L176 98 L190 10 L206 106 L218 60 H252 M348 60 H392 L408 44 L424 60 H600"
            fill="none"
            stroke="var(--mascot)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="km-mark relative grid h-[88px] w-[88px] place-items-center rounded-2xl bg-mascot text-3xl font-bold text-ink shadow-[0_0_40px_rgba(255,210,10,0.45)]">
          DE
        </span>
        <p className="km-word mt-8 text-sm font-semibold uppercase text-mascot">Kalkulator Medis</p>
        <p className="km-sub mt-2 text-xs text-white/60">Dokter Edukasi Academy</p>
      </div>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setPhase("done");
        }}
        className="absolute bottom-6 right-6 rounded-lg px-3 py-1.5 text-xs font-medium text-white/70 hover:bg-white/10 hover:text-white"
      >
        Lewati
      </button>
    </div>
  );
}
