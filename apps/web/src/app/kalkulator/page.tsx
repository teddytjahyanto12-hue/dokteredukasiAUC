import Link from "next/link";
import { cookies } from "next/headers";
import { KalkulatorIntro } from "@/components/calculators/kalkulator-intro";
import { getCurrentUser } from "@/lib/auth";
import { rupiah } from "@/lib/format";
import { CheatsheetHub } from "@/components/calculators/cheatsheet-hub";
import { DISCLAIMER } from "@/lib/calculators/registry";
import { hasCalculatorPremium, premiumOffer } from "@/lib/calculators/access";

export const metadata = {
  title: "Kalkulator Medis",
  description: "Kalkulator dan skor klinis dengan pembahasan dan materi di satu halaman: GCS, HPL dan usia kehamilan, dan lainnya.",
};
export const dynamic = "force-dynamic";

export default async function KalkulatorPage() {
  const user = await getCurrentUser();
  const [premium, offer, jar] = await Promise.all([hasCalculatorPremium(user), premiumOffer(), cookies()]);
  const intro = !jar.get("km_intro");
  return (
    <>
    {intro && <KalkulatorIntro />}
    <div className={`container-page py-10 ${intro ? "km-settle" : ""}`}>
      <section className="calculator-summary">
      <p className="eyebrow">Kalkulator Medis</p>
      <h1 className="h1 mt-2">Kalkulator Medis</h1>
      <p className="calculator-description mt-2 max-w-2xl text-slate-600">
        Kalkulator dan skor klinis yang cepat dipakai. Pelanggan Premium mendapat pembahasan, materi ringkas, dan latihan kasus langsung di halaman kalkulator.
      </p>

      <div className={`calculator-offer mt-6 flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between ${premium ? "border-emerald-200 bg-emerald-50" : "border-ink bg-brand-soft"}`}>
        {premium ? (
          <p className="text-sm font-semibold text-emerald-800">Premium aktif: semua kalkulator beserta pembahasan dan materinya terbuka.</p>
        ) : (
          <>
            <p className="text-sm text-slate-800">
              <span className="font-semibold">Premium{offer.price ? ` ${rupiah(offer.price)}/${offer.label}` : ""}:</span> semua kalkulator + pembahasan & materi.
            </p>
            {offer.available && <Link href={offer.href} className="btn btn-sm shrink-0">Berlangganan Premium</Link>}
          </>
        )}
      </div>

      <p className="calculator-disclaimer mt-3 text-sm text-slate-600">{DISCLAIMER}</p>
      </section>
      <div className="calculator-tools mt-8">
        <CheatsheetHub premium={premium} delayMs={intro ? 2000 : 0} />
      </div>
    </div>
    </>
  );
}
