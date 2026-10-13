import Link from "next/link";
import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { findCalculator } from "@/lib/calculators/registry";
import { CONTENT } from "@/lib/calculators/content";
import { hasCalculatorPremium, premiumOffer } from "@/lib/calculators/access";
import { LearnSections, SourcesAndDisclaimer } from "@/components/calculators/learn-sections";
import { PremiumGate } from "@/components/calculators/premium-gate";
import { FavoriteButton, RecentMark } from "@/components/calculators/calc-ui";
import { GcsCalculator } from "@/components/calculators/gcs-calculator";
import { HplCalculator } from "@/components/calculators/hpl-calculator";
import { GenericCalculator } from "@/components/calculators/generic-calculator";
import { DEFS } from "@/lib/calculators/defs";

// Komponen kalkulator per slug. Kalkulator baru cukup didaftarkan di sini dan di registry.
const WIDGETS: Record<string, (premium: boolean) => React.ReactNode> = {
  gcs: (premium) => <GcsCalculator premium={premium} />,
  hpl: (premium) => <HplCalculator premium={premium} />,
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = findCalculator(slug);
  return c ? { title: `Kalkulator ${c.title}`, description: c.summary } : { title: "Kalkulator Medis" };
}

export default async function CalculatorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = findCalculator(slug);
  const content = CONTENT[slug];
  const widget = WIDGETS[slug] ?? (DEFS[slug] ? (premium: boolean) => <GenericCalculator slug={slug} premium={premium} /> : undefined);
  if (!meta || meta.status === "soon" || !content || !widget) notFound();

  const user = await getCurrentUser();
  const [premium, offer] = await Promise.all([hasCalculatorPremium(user), premiumOffer()]);
  // Gratis: kalkulator standar (tanpa pembahasan). Premium: semua kalkulator + pembahasan & materi.
  const canUse = premium || meta.access === "free";
  const path = `/kalkulator/${slug}`;

  return (
    <div className="container-page py-10">
      {canUse && <RecentMark slug={slug} />}
      <Link href="/kalkulator" className="text-sm text-slate-500 hover:text-brand">← Kalkulator Medis</Link>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p>
            <span className="badge">{meta.field}</span>
            {meta.access === "free" ? <span className="badge-brand">Gratis (standar)</span> : <span className="badge-brand">Premium</span>}
            {meta.status === "validated" ? <span className="badge">Tervalidasi</span> : <span className="badge-warn">Draf, belum divalidasi</span>}
          </p>
          <h1 className="h1 mt-2">{meta.title}</h1>
          <p className="mt-1 text-slate-600">{meta.summary}</p>
        </div>
        {canUse && <FavoriteButton slug={slug} />}
      </div>

      <div className="mt-8">
        {canUse ? (
          widget(premium)
        ) : (
          <PremiumGate
            offer={offer}
            loggedIn={!!user}
            nextPath={path}
            title="Kalkulator ini khusus pelanggan Premium"
            reason={`${meta.title} beserta pembahasannya terbuka dengan Kalkulator Medis Premium.`}
          />
        )}
      </div>

      {premium ? (
        <LearnSections content={content} />
      ) : (
        canUse && (
          <div className="mt-10">
            <PremiumGate
              offer={offer}
              loggedIn={!!user}
              nextPath={path}
              title="Buka pembahasan & materi di halaman ini"
              reason="Versi gratis berisi kalkulator standar. Interpretasi, cara menghitung, materi ringkas, jebakan ujian, dan latihan kasus tersedia untuk pelanggan Premium."
            />
          </div>
        )
      )}

      <SourcesAndDisclaimer meta={meta} sources={content.sources} />
    </div>
  );
}
