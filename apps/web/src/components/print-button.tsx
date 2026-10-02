"use client";

export function PrintButton({ label = "Cetak / simpan PDF" }: { label?: string }) {
  return (
    <button type="button" className="btn print:hidden" onClick={() => window.print()}>
      {label}
    </button>
  );
}
