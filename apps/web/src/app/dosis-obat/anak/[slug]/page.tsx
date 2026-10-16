import Link from "next/link";
import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { hasCalculatorPremium, premiumOffer } from "@/lib/calculators/access";
import { DOSE_VERSION, findDrug, freeBlocks, premiumBlocks, strengthsOf } from "@/lib/dosis-obat/data";
import { DOSE_DISCLAIMER } from "@/lib/dosis-obat/disclaimer";
import { DoseCalculator } from "@/components/dosis-obat/dose-calculator";
import { DoseItems, RichText } from "@/components/dosis-obat/rich-text";
import { PremiumGate } from "@/components/calculators/premium-gate";
import type { DoseBlock } from "@/lib/dosis-obat/types";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = findDrug(slug);
  return d ? { title: `Dosis ${d.name} (Anak)`, description: `Kalkulator dosis ${d.name} per berat badan, sediaan FORNAS 2025, dan sumber.` } : { title: "Dosis Obat Anak" };
}

function Block({ b }: { b: DoseBlock }) {
  return (
    <section className="card">
      <h2 className="h2">{b.title}</h2>
      {b.note && (
        <p className="mt-1 text-sm text-slate-500">
          <RichText text={b.note} />
        </p>
      )}
      <div className="mt-4">
        <DoseItems items={b.items} />
      </div>
    </section>
  );
}

export default async function DrugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const drug = findDrug(slug);
  if (!drug) notFound();
  const user = await getCurrentUser();
  const [premium, offer] = await Promise.all([hasCalculatorPremium(user), premiumOffer()]);

  const free = freeBlocks(drug);
  const calc = free.filter((b) => b.kind === "calc");
  const after = (k: DoseBlock["kind"]) => free.filter((b) => b.kind === k);
  const path = `/dosis-obat/anak/${slug}`;

  return (
    <div className="container-page py-10">
      <Link href="/dosis-obat/anak" className="text-sm text-slate-500 hover:text-brand">← Dosis Obat Anak</Link>
      <div className="mt-4">
        <p>
          {drug.routes.map((r) => (
            <span key={r} className="badge">{r}</span>
          ))}
          <span className="badge-warn">Draf {DOSE_VERSION.version}, belum divalidasi dokter</span>
        </p>
        <h1 className="h1 mt-2">{drug.name}</h1>
        <p className="mt-1 text-slate-600">Kalkulator dosis anak per berat badan beserta sediaan FORNAS 2025.</p>
      </div>

      <div className="mt-8 space-y-6">
        {calc.length > 0 ? (
          <DoseCalculator blocks={calc} usesBsa={drug.usesBsa} special={drug.special} strengths={strengthsOf(drug)} />
        ) : (
          <section className="card border-dashed">
            <h2 className="h2">Dosis</h2>
            <p className="mt-2 text-sm text-slate-600">Obat ini tidak memiliki tabel kalkulator karena dosis di sumber tidak dapat dihitung per berat badan dengan jelas. Lihat aturan penggunaan di bawah.</p>
          </section>
        )}
        {after("renal").map((b, i) => <Block key={`r${i}`} b={b} />)}
        {after("sediaan").map((b, i) => <Block key={`s${i}`} b={b} />)}
        {after("aturan").map((b, i) => <Block key={`a${i}`} b={b} />)}

        {premium ? (
          premiumBlocks(drug).map((b, i) => <Block key={`p${i}`} b={b} />)
        ) : (
          <PremiumGate
            offer={offer}
            loggedIn={!!user}
            nextPath={path}
            title="Buka monografi lengkap obat ini"
            reason={`Manfaat obat, efek samping, peringatan, farmakokinetik, dan farmakodinamik ${drug.name} tersedia untuk pelanggan Kalkulator Medis Premium.`}
          />
        )}

        {after("pustaka").map((b, i) => <Block key={`d${i}`} b={b} />)}
      </div>

      <p className="mt-8 text-sm text-slate-600">{DOSE_DISCLAIMER}</p>
    </div>
  );
}
