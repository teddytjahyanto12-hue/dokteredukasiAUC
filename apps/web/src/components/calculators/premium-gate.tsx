import Link from "next/link";
import { rupiah } from "@/lib/format";
import { PREMIUM_BENEFITS } from "@/lib/calculators/premium";

type Offer = { href: string; available: boolean; price: number | null; label: string };

// Ajakan berlangganan Kalkulator Medis Premium (tampil bila pengguna belum berlangganan).
export function PremiumGate({ offer, loggedIn, title, reason, nextPath }: { offer: Offer; loggedIn: boolean; title: string; reason: string; nextPath: string }) {
  const harga = offer.price ? `${rupiah(offer.price)} / ${offer.label}` : "Harga segera diumumkan";
  return (
    <section className="rounded-xl border-2 border-ink bg-brand-soft p-6">
      <p className="eyebrow">🔒 Kalkulator Medis Premium</p>
      <h2 className="h2 mt-2">{title}</h2>
      <p className="mt-1 text-sm text-slate-700">{reason}</p>
      <ul className="mt-4 space-y-1.5 text-sm text-slate-800">
        {PREMIUM_BENEFITS.map((b) => (
          <li key={b} className="flex gap-2">
            <span aria-hidden className="text-success">✓</span>
            {b}
          </li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <p className="num text-xl font-semibold text-slate-900">{harga}</p>
        {offer.available ? (
          <Link href={offer.href} className="btn">Berlangganan sekarang</Link>
        ) : (
          <span className="text-sm text-slate-600">Paket belum dibuka.</span>
        )}
        {!loggedIn && (
          <Link href={`/masuk?next=${encodeURIComponent(nextPath)}`} className="btn-secondary">Sudah berlangganan? Masuk</Link>
        )}
      </div>
    </section>
  );
}
