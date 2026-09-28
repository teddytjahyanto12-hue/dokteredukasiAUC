import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { rupiah } from "@/lib/format";
import { FIELD_LABEL, type MentoringField } from "@/lib/constants";
import { orderPackageAction } from "@/app/actions/student";
import { Flash } from "@/components/ui";
import { readFlash, type SearchParams } from "@/lib/flash";
import { activeEntitlementWhere } from "@/lib/access";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await db.package.findUnique({ where: { slug }, select: { name: true } });
  return { title: p?.name ?? "Paket" };
}

export default async function PackageDetail({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: SearchParams }) {
  const { slug } = await params;
  const { pesan, tipe } = await readFlash(searchParams);
  const pkg = await db.package.findUnique({
    where: { slug },
    include: {
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
  const [owned, pending] = user
    ? await Promise.all([
        db.entitlement.findFirst({ where: { ...activeEntitlementWhere(user.id), packageId: pkg.id } }),
        db.order.findFirst({ where: { userId: user.id, packageId: pkg.id, status: "PENDING" } }),
      ])
    : [null, null];

  return (
    <div className="container-page grid gap-8 py-10 lg:grid-cols-[1fr_340px]">
      <div>
        <Link href="/paket" className="text-sm text-slate-500 hover:text-brand">
          ← Semua paket
        </Link>
        <h1 className="h1 mt-2">{pkg.name}</h1>
        <p className="mt-2 text-slate-600">{pkg.summary}</p>
        {pkg.description && <div className="mt-6 whitespace-pre-line text-slate-700">{pkg.description}</div>}

        <h2 className="h2 mt-10">Isi paket</h2>
        <div className="mt-4 space-y-4">
          {pkg.categories.map(({ category: c }) => (
            <div key={c.id} className="card">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand">{c.track.title}</p>
              <h3 className="mt-1 font-semibold text-slate-900">{c.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{c.description}</p>
              {c.topics.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {c.topics.map((t) => (
                    <li key={t.title} className="badge">
                      {t.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          {pkg.includesMentoring && (
            <div className="card border-amber-200 bg-amber-50">
              <h3 className="font-semibold text-amber-900">Bimbingan tutor</h3>
              <p className="mt-1 text-sm text-amber-900">
                Bidang: {FIELD_LABEL[pkg.mentoringField as MentoringField] ?? "—"}. Setelah pembayaran dikonfirmasi, admin menjadwalkan sesi dan memilih tutor sesuai bidang.
              </p>
            </div>
          )}
        </div>
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="card">
          <Flash pesan={pesan} tipe={tipe} />
          <p className="muted">Harga</p>
          <p className="text-2xl font-bold text-slate-900">{rupiah(pkg.price)}</p>
          <p className="mt-1 text-sm text-slate-500">{pkg.accessDays ? `Masa akses ${pkg.accessDays} hari` : "Masa akses: menyusul"}</p>
          <div className="mt-5">
            {!user ? (
              <Link href={`/masuk?next=/paket/${pkg.slug}`} className="btn w-full">
                Masuk untuk memesan
              </Link>
            ) : user.role !== "STUDENT" ? (
              <p className="text-sm text-slate-500">Pemesanan hanya untuk akun murid.</p>
            ) : owned ? (
              <Link href="/belajar" className="btn w-full">
                Anda sudah memiliki paket ini
              </Link>
            ) : pending ? (
              <Link href={`/pembelian/${pending.id}`} className="btn w-full">
                Lihat pesanan {pending.code}
              </Link>
            ) : (
              <form action={orderPackageAction}>
                <input type="hidden" name="packageId" value={pkg.id} />
                <button className="btn w-full" type="submit">
                  Pesan paket ini
                </button>
              </form>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
