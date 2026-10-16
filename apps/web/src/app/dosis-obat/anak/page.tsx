import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { rupiah } from "@/lib/format";
import { hasCalculatorPremium, premiumOffer } from "@/lib/calculators/access";
import { DOSE_VERSION, DRUGS } from "@/lib/dosis-obat/data";
import { DOSE_DISCLAIMER } from "@/lib/dosis-obat/disclaimer";
import { DrugList } from "@/components/dosis-obat/drug-list";

export const metadata = {
  title: "Kalkulator Dosis Obat Anak",
  description: "Dosis obat anak per berat badan dari Buku Saku Dosis Obat Pediatri IDAI dan sediaan FORNAS 2025.",
};
export const dynamic = "force-dynamic";

export default async function DosisAnakPage() {
  const user = await getCurrentUser();
  const [premium, offer] = await Promise.all([hasCalculatorPremium(user), premiumOffer()]);
  return (
    <div className="container-page py-10">
      <Link href="/dosis-obat" className="text-sm text-slate-500 hover:text-brand">← Dosis Obat</Link>
      <p className="eyebrow mt-4">Dosis Obat</p>
      <h1 className="h1 mt-2">Kalkulator Dosis Obat Anak</h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        {DOSE_VERSION.count} obat. Dosis dari Buku Saku Dosis Obat Pediatri IDAI 2016 dan FORNAS 2025, sediaan dari FORNAS 2025. Kalkulator dosis gratis; manfaat, efek samping, peringatan, farmakokinetik, dan farmakodinamik untuk pelanggan Premium.
      </p>
      <div className={`mt-6 flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between ${premium ? "border-emerald-200 bg-emerald-50" : "border-ink bg-brand-soft"}`}>
        {premium ? (
          <p className="text-sm font-semibold text-emerald-800">Premium aktif: monografi lengkap setiap obat terbuka.</p>
        ) : (
          <>
            <p className="text-sm text-slate-800">
              <span className="font-semibold">Kalkulator Medis Premium{offer.price ? ` ${rupiah(offer.price)}/${offer.label}` : ""}:</span> buka monografi lengkap setiap obat beserta semua kalkulator medis.
            </p>
            {offer.available && <Link href={offer.href} className="btn btn-sm shrink-0">Berlangganan Premium</Link>}
          </>
        )}
      </div>
      <p className="mt-3 text-sm text-slate-600">{DOSE_DISCLAIMER}</p>
      <div className="mt-8">
        <DrugList drugs={DRUGS} />
      </div>
      <p className="mt-10 text-xs text-slate-500">Versi data: draf {DOSE_VERSION.version}, {DOSE_VERSION.date}.</p>
    </div>
  );
}
