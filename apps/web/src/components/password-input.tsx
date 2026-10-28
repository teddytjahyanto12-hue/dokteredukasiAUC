"use client";

import { useState } from "react";

// Kolom kata sandi dengan tombol mata di kanan: tertutup saat diketik, bisa dilihat bila diklik.
export function PasswordInput(props: Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input {...props} type={show ? "text" : "password"} className={`${props.className ?? "input"} pr-11`} />
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        className="absolute inset-y-0 right-0 grid w-11 place-items-center rounded-r-lg text-slate-500 hover:text-slate-900"
        aria-label={show ? "Sembunyikan kata sandi" : "Lihat kata sandi"}
        aria-pressed={show}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0" />
          <circle cx="12" cy="12" r="3" />
          {show && <path d="m2 2 20 20" />}
        </svg>
      </button>
    </div>
  );
}
