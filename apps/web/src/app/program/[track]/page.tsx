import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { accessibleCategoryIds, canOpen } from "@/lib/access";
import { DISPLAY_TYPE_LABEL } from "@/lib/constants";
import { rupiah } from "@/lib/format";
import { startingPrice } from "@/lib/services";

export async function generateMetadata({ params }: { params: Promise<{ track: string }> }) {
  const { track } = await params;
  const t = await db.track.findUnique({ where: { slug: track }, select: { title: true } });
  return { title: t?.title ?? "Program" };
}

export default async function TrackPage({ params }: { params: Promise<{ track: string }> }) {
  const { track: slug } = await params;
  const track = await db.track.findUnique({
    where: { slug },
    include: {
      categories: {
        where: { published: true },
        orderBy: { order: "asc" },
        include: {
          topics: {
            where: { published: true },
            orderBy: { order: "asc" },
            include: { _count: { select: { items: { where: { published: true } } } }, quiz: { select: { id: true } } },
          },
        },
      },
    },
  });
  if (!track || !track.published) notFound();

  const user = await getCurrentUser();
  const allowed = await accessibleCategoryIds(user);
  const packages = await db.package.findMany({ where: { active: true, trackSlug: slug }, orderBy: { order: "asc" }, include: { durations: { where: { active: true } }, addons: true } });

  return (
    <div className="container-page py-10">
      <p className="badge-brand">Program</p>
      <h1 className="h1 mt-3">{track.title}</h1>
      <p className="mt-2 max-w-2xl text-slate-600">{track.description}</p>

      <div className="mt-10 space-y-8">
        {track.categories.map((c) => {
          const open = user ? canOpen(allowed, c.id) : false;
          return (
            <section key={c.id} className="card">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{c.title}</h2>
                  <p className="mt-1 text-sm text-slate-600">{c.description}</p>
                </div>
                <span className="badge shrink-0">{DISPLAY_TYPE_LABEL[c.displayType as keyof typeof DISPLAY_TYPE_LABEL] ?? c.displayType}</span>
              </div>
              {c.topics.length === 0 ? (
                <p className="mt-4 text-sm text-slate-500">Materi sedang disiapkan.</p>
              ) : (
                <ul className="mt-4 divide-y divide-slate-100">
                  {c.topics.map((t) => (
                    <li key={t.id} className="flex items-center justify-between gap-3 py-3">
                      <div>
                        <p className="font-medium text-slate-800">{t.title}</p>
                        <p className="text-xs text-slate-500">
                          {t._count.items} materi{t.quiz ? " · ada quiz" : ""}
                        </p>
                      </div>
                      {user ? (
                        <Link href={`/materi/${t.id}`} className={open ? "btn btn-sm" : "btn-secondary btn-sm"}>
                          {open ? "Buka" : "Lihat pratinjau"}
                        </Link>
                      ) : (
                        <Link href={`/masuk?next=/materi/${t.id}`} className="btn-secondary btn-sm">
                          Masuk untuk membuka
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </div>

      {track.hasMentoring && (
        <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
          Jalur ini menyediakan <strong>bimbingan</strong>: setelah pembayaran, admin menjadwalkan sesi dan memilih tutor sesuai bidang Anda.
        </div>
      )}

      {packages.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-slate-900">Layanan {track.title}</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {packages.map((p) => (
              <Link key={p.id} href={`/paket/${p.slug}`} className="card transition hover:shadow-md">
                <h3 className="font-semibold text-slate-900">{p.name}</h3>
                <p className="mt-1 text-sm text-slate-600">{p.summary}</p>
                <p className="mt-3 font-bold text-brand">{startingPrice(p) !== null ? `Mulai ${rupiah(startingPrice(p))}` : "Harga segera diumumkan"}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
