import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { FIELD_LABEL, type MentoringField } from "@/lib/constants";
import { orderPackageAction } from "@/app/actions/student";
import { ServiceOrderForm } from "@/components/service-order-form";
import { Flash } from "@/components/ui";
import { readFlash, type SearchParams } from "@/lib/flash";
import { activeEntitlementWhere } from "@/lib/access";
import { LEAD_SOURCES, LEAD_SOURCE_LABEL } from "@/lib/installments";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await db.package.findUnique({ where: { slug }, select: { name: true, summary: true } });
  return { title: p?.name ?? "Layanan", description: p?.summary ?? undefined };
}

export default async function ServiceDetail({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: SearchParams }) {
  const { slug } = await params;
  const { pesan, tipe } = await readFlash(searchParams);
  const pkg = await db.package.findUnique({
    where: { slug },
    include: {
      benefits: { orderBy: { order: "asc" } },
      durations: { where: { active: true }, orderBy: [{ order: "asc" }, { months: "asc" }] },
      addons: { where: { active: true }, orderBy: { order: "asc" } },
      installmentRules: { orderBy: { seq: "asc" } },
      stages: { orderBy: { number: "asc" }, select: { number: true, title: true } },
      categories: {
        include: {
          category: {
            include: { track: true, topics: { where: { published: true }, orderBy: { order: "asc" }, select: { title: true } } },
          },
        },
      },
    },
  });
  if (!pkg || !pkg.active) notFound();

  const user = await getCurrentUser();
  const [owned, pending] =
    user?.role === "STUDENT"
      ? await Promise.all([
          db.entitlement.findFirst({ where: { ...activeEntitlementWhere(user.id), packageId: pkg.id } }),
          db.order.findFirst({ where: { userId: user.id, packageId: pkg.id, status: "PENDING" } }),
        ])
      : [null, null];

  const disabledReason = !user ? (
    <Link href={`/masuk?next=/paket/${pkg.slug}`} className="btn w-full">
      Masuk / daftar untuk memesan
    </Link>
  ) : user.role !== "STUDENT" ? (
    <p className="text-sm text-slate-500">Pemesanan hanya untuk akun pelanggan.</p>
  ) : owned ? (
    <Link href="/belajar" className="btn w-full">
      Layanan ini sudah dimiliki
    </Link>
  ) : pending ? (
    <Link href={`/pembelian/${pending.id}`} className="btn w-full">
      Lihat pesanan {pending.code}
    </Link>
  ) : null;

  return (
    <div className="container-page grid gap-8 py-10 lg:grid-cols-[1fr_380px]">
      <div className="min-w-0">
        <Link href="/paket" className="text-sm text-slate-500 hover:text-brand">
          ← Semua layanan
        </Link>
        <div className="mt-3 grid gap-6 md:grid-cols-[260px_1fr]">
          {pkg.posterFileId && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={`/api/berkas/${pkg.posterFileId}`} alt={`Poster ${pkg.name}`} className="w-full rounded-xl border border-slate-200 object-cover shadow-sm" />
          )}
          <div className={pkg.posterFileId ? "" : "md:col-span-2"}>
            <h1 className="h1">{pkg.name}</h1>
            {pkg.summary && <p className="mt-2 text-lg text-slate-600">{pkg.summary}</p>}
            {pkg.includesMentoring && (
              <p className="badge-warn mt-3">Termasuk bimbingan · {FIELD_LABEL[pkg.mentoringField as MentoringField] ?? ""}</p>
            )}
          </div>
        </div>

        {pkg.description && (
          <section className="mt-8">
            <h2 className="h2">Tentang layanan</h2>
            <div className="mt-2 whitespace-pre-line leading-relaxed text-slate-700">{pkg.description}</div>
          </section>
        )}

        {pkg.benefits.length > 0 && (
          <section className="mt-8">
            <h2 className="h2">Yang didapatkan</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {pkg.benefits.map((b) => (
                <li key={b.id} className="flex items-start gap-2 text-slate-700">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-mascot text-xs text-ink" aria-hidden>
                    ✓
                  </span>
                  {b.text}
                </li>
              ))}
            </ul>
          </section>
        )}

        {pkg.stages.length > 0 && (
          <section className="mt-8">
            <h2 className="h2">Tahapan layanan</h2>
            <ol className="mt-3 space-y-2">
              {pkg.stages.map((st) => (
                <li key={st.number} className="flex items-center gap-3 text-slate-700">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-soft text-sm font-bold text-brand-dark">{st.number}</span>
                  {st.title}
                </li>
              ))}
            </ol>
          </section>
        )}

        {pkg.categories.length > 0 && (
          <section className="mt-8">
            <h2 className="h2">Materi yang terbuka</h2>
            <div className="mt-3 space-y-3">
              {pkg.categories.map(({ category: c }) => (
                <div key={c.id} className="card">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand">{c.track.title}</p>
                  <h3 className="mt-1 font-semibold text-slate-900">{c.title}</h3>
                  {c.topics.length > 0 && (
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {c.topics.map((t) => (
                        <li key={t.title} className="badge">
                          {t.title}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="card">
          <Flash pesan={pesan} tipe={tipe} />
          <h2 className="h2 mb-4">Pesan layanan</h2>
          <ServiceOrderForm
            action={orderPackageAction}
            packageId={pkg.id}
            basePrice={pkg.price}
            durations={pkg.durations.map((d) => ({ id: d.id, label: d.label, price: d.price }))}
            addons={pkg.addons.map((a) => ({ id: a.id, label: a.name, price: a.price, description: a.description }))}
            canOrder={!disabledReason}
            installmentRules={
              pkg.allowInstallment
                ? pkg.installmentRules.map((r) => ({ ...r, stageTitle: pkg.stages.find((st) => st.number === r.unlocksStage)?.title }))
                : []
            }
            leadSources={LEAD_SOURCES.filter((l) => l !== "REPEAT" && l !== "TUTOR").map((l) => ({ value: l, label: LEAD_SOURCE_LABEL[l] }))}
            disabledReason={disabledReason}
          />
          {!pkg.durations.length && (
            <p className="mt-3 text-xs text-slate-500">{pkg.accessDays ? `Masa akses ${pkg.accessDays} hari` : "Masa akses seumur hidup"}</p>
          )}
        </div>
      </aside>
    </div>
  );
}
