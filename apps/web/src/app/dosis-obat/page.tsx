import Link from "next/link";
import { DOSE_VERSION } from "@/lib/dosis-obat/data";
import { DOSE_DISCLAIMER } from "@/lib/dosis-obat/disclaimer";

export const metadata = {
  title: "Dosis Obat",
  description: "Kalkulator dosis obat berdasarkan berat badan dengan sumber IDAI dan FORNAS 2025.",
};

const OPTIONS = [
  { href: "/dosis-obat/anak", title: "Kalkulator Dosis Obat Anak", text: `${DOSE_VERSION.count} obat. Dosis per berat badan dari Buku Saku Dosis Obat Pediatri IDAI dan FORNAS 2025.`, ready: true },
  { href: null, title: "Kalkulator Dosis Obat Dewasa", text: "Sedang disusun.", ready: false },
  { href: null, title: "Kalkulator Dosis Obat Kegawatdaruratan", text: "Sedang disusun.", ready: false },
];

export default function DosisObatPage() {
  return (
    <div className="container-page py-10">
      <p className="eyebrow">Dosis Obat</p>
      <h1 className="h1 mt-2">Dosis Obat</h1>
      <p className="mt-2 max-w-2xl text-slate-600">Pilih kalkulator dosis sesuai kelompok pasien.</p>
      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {OPTIONS.map((o) => (
          <li key={o.title}>
            {o.ready && o.href ? (
              <Link href={o.href} className="card block h-full transition hover:border-ink">
                <h2 className="h2">{o.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{o.text}</p>
                <span className="btn btn-sm mt-4">Buka</span>
              </Link>
            ) : (
              <div className="card h-full opacity-70" aria-disabled>
                <span className="badge">Segera hadir</span>
                <h2 className="h2 mt-2">{o.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{o.text}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
      <p className="mt-8 max-w-3xl text-sm text-slate-600">{DOSE_DISCLAIMER}</p>
    </div>
  );
}
