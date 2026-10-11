import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { accessibleCategoryIds, canOpen } from "@/lib/access";
import { ITEM_TYPE_LABEL, type ItemType } from "@/lib/constants";
import { rupiah } from "@/lib/format";
import { startingPrice } from "@/lib/services";
import { MaterialViewer } from "@/components/material-viewer";
import { completeAndNextAction, toggleItemDoneAction } from "@/app/actions/student";
import { Icon } from "@/components/icons";
import { ProgressBar } from "@/components/ui";
import type { SearchParams } from "@/lib/flash";

const ICON: Record<string, string> = { SLIDES: "🖼️", PDF: "📄", VIDEO: "🎬", LINK: "🔗", TEXT: "📝" };

// Ruang belajar: materi di kanan, kurikulum seluruh kelas di kiri.
// Murid yang belum membeli tetap bisa membuka materi bertanda gratis; sisanya tampil terkunci
// dengan ajakan membeli. Isi materi terkunci tidak pernah dikirim ke browser.
export default async function TopicPage({ params, searchParams }: { params: Promise<{ topicId: string }>; searchParams: SearchParams }) {
  const user = await requireUser();
  const { topicId } = await params;
  const sp = await searchParams;
  const topic = await db.topic.findUnique({
    where: { id: topicId },
    include: {
      category: {
        include: {
          track: true,
          packages: { include: { package: { include: { durations: { where: { active: true } }, addons: true } } } },
          parent: { select: { id: true, title: true, packages: { include: { package: { include: { durations: { where: { active: true } }, addons: true } } } } } },
          // Kurikulum seluruh kelas untuk daftar di samping (tanpa isi materi).
          topics: {
            where: { published: true },
            orderBy: { order: "asc" },
            select: {
              id: true,
              title: true,
              items: { where: { published: true }, orderBy: { order: "asc" }, select: { id: true, title: true, type: true, isFree: true } },
              quiz: { select: { title: true, published: true, isFree: true, _count: { select: { questions: true } } } },
            },
          },
        },
      },
      items: { where: { published: true }, orderBy: { order: "asc" }, include: { file: true } },
    },
  });
  if (!topic || !topic.published) notFound();

  const allowed = await accessibleCategoryIds(user);
  const categoryOpen = canOpen(allowed, topic.categoryId);
  const syllabus = topic.category.topics;
  const lessons = syllabus.flatMap((t) => t.items.filter((i) => i.type !== "LINK"));
  const done = new Set((await db.itemProgress.findMany({ where: { userId: user.id, itemId: { in: lessons.map((i) => i.id) } }, select: { itemId: true } })).map((p) => p.itemId));
  const pct = lessons.length ? Math.round((lessons.filter((i) => done.has(i.id)).length / lessons.length) * 100) : 0;

  const here = topic.items.filter((i) => i.type !== "LINK");
  const canSee = (i: { isFree: boolean }) => categoryOpen || i.isFree;
  const requested = typeof sp.item === "string" ? here.find((i) => i.id === sp.item) : undefined;
  // Tanpa pilihan: materi pertama yang bisa dibuka; bila tidak ada, materi pertama (tampil terkunci).
  const current = requested ?? here.find(canSee) ?? here[0];
  const selected = current && canSee(current) ? current : undefined;
  const locked = current && !canSee(current) ? current : undefined;
  // Riwayat "Terakhir dibuka" di dashboard: catat materi yang benar-benar dapat dibuka.
  if (selected) {
    await db.lessonView.upsert({
      where: { userId_itemId: { userId: user.id, itemId: selected.id } },
      update: { viewedAt: new Date() },
      create: { userId: user.id, itemId: selected.id },
    });
  }
  const babNo = syllabus.findIndex((t) => t.id === topic.id) + 1;
  const topicCode = topic.category.code && babNo > 0 ? `${topic.category.code}.${babNo}` : null;
  const links = topic.items.filter((i) => i.type === "LINK" && canSee(i));
  // Blok: tawarkan paket Blok ini dan paket kelas induknya (mis. Paket Blok Komplit).
  const offers = [...topic.category.packages, ...(topic.category.parent?.packages ?? [])].map((p) => p.package).filter((p) => p.active);
  const freeLeft = lessons.filter((i) => i.isFree && !done.has(i.id)).length;

  return (
    <div className="container-page py-8">
      <nav className="text-sm text-slate-500">
        <Link href={`/kelas?program=${topic.category.track.slug}`} className="hover:text-brand">
          {topic.category.track.title}
        </Link>{" "}
        /{" "}
        {topic.category.parent && (
          <>
            <Link href={`/kelas/${topic.category.parent.id}`} className="hover:text-brand">
              {topic.category.parent.title}
            </Link>{" "}
            /{" "}
          </>
        )}
        <Link href={`/kelas/${topic.categoryId}`} className="hover:text-brand">
          {topic.category.title}
        </Link>
      </nav>
      {topicCode && <p className="num mt-3 text-sm font-semibold text-brand">{topicCode}</p>}
      <h1 className={`h1 ${topicCode ? "mt-1" : "mt-2"}`}>{topic.title}</h1>
      {topic.description && <p className="mt-1 text-slate-600">{topic.description}</p>}

      <div className="mt-6 grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside id="kurikulum-kelas" className="order-2 scroll-mt-36 lg:order-1">
          <div className="rounded-2xl border border-slate-200 bg-white lg:sticky lg:top-36 lg:max-h-[calc(100vh-10rem)] lg:overflow-y-auto">
            <div className="border-b border-slate-200 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-brand">Kurikulum Kelas</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{topic.category.title}</p>
              <div className="mt-3 flex items-center gap-3">
                <ProgressBar value={pct} />
                <span className="num text-xs text-slate-500">{pct}%</span>
              </div>
              {!categoryOpen && (
                <p className="mt-2 text-xs text-slate-500">
                  Kelas ini belum dibeli. Materi bertanda <span className="font-semibold text-brand">Gratis</span> bisa dibuka; yang bergembok terbuka setelah membeli.
                </p>
              )}
            </div>
            <ol>
              {syllabus.map((t, idx) => (
                <li key={t.id} className="border-b border-slate-100 last:border-0">
                  <Link href={`/materi/${t.id}`} className={`block px-4 pt-3 text-sm font-semibold ${t.id === topic.id ? "text-slate-900" : "text-slate-600 hover:text-brand"}`}>
                    {topic.category.code && <span className="num mr-1.5 text-xs text-brand">{topic.category.code}.{idx + 1}</span>}
                    {topic.category.parent ? t.title : `${idx + 1}. ${t.title}`}
                  </Link>
                  <ul className="pb-2 pt-1">
                    {t.items
                      .filter((i) => i.type !== "LINK")
                      .map((i) => {
                        const open = canSee(i);
                        const active = current?.id === i.id;
                        return (
                          <li key={i.id}>
                            <Link
                              href={`/materi/${t.id}?item=${i.id}`}
                              aria-current={active ? "true" : undefined}
                              className={`flex items-start gap-2 border-l-2 px-4 py-3 text-sm ${active ? "border-brand bg-brand-soft font-medium text-slate-900" : open ? "border-transparent text-slate-700 hover:bg-slate-50" : "border-transparent text-slate-500 hover:bg-slate-50"}`}
                            >
                              <span className="w-5 shrink-0 text-center" aria-hidden>
                                {done.has(i.id) ? "✅" : open ? ICON[i.type] : "🔒"}
                              </span>
                              <span className="min-w-0 flex-1">{i.title}</span>
                              {i.isFree && !categoryOpen && <span className="shrink-0 text-xs font-semibold text-brand">Gratis</span>}
                            </Link>
                          </li>
                        );
                      })}
                    {t.quiz?.published &&
                      (categoryOpen || t.quiz.isFree ? (
                        <li>
                          <Link href={`/quiz/${t.id}`} className="flex items-start gap-2 px-4 py-2 text-sm font-medium text-amber-800 hover:bg-amber-50">
                            <span className="w-5 shrink-0 text-center" aria-hidden>
                              ✍️
                            </span>
                            {t.quiz.title} ({t.quiz._count.questions} soal)
                          </Link>
                        </li>
                      ) : (
                        <li className="flex items-start gap-2 px-4 py-2 text-sm text-slate-400">
                          <span className="w-5 shrink-0 text-center" aria-hidden>
                            🔒
                          </span>
                          {t.quiz.title} ({t.quiz._count.questions} soal)
                        </li>
                      ))}
                    {t.items.length === 0 && !t.quiz && <li className="px-4 py-2 text-xs text-slate-400">Sedang disiapkan.</li>}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </aside>

        <section className="order-1 min-w-0 space-y-6 lg:order-2">
          <a href="#kurikulum-kelas" className="btn-secondary w-full lg:hidden"><Icon name="book" />Lihat kurikulum kelas · {pct}% selesai</a>
          {selected && (
            <article className="card sm:p-7">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand">
                    {ITEM_TYPE_LABEL[selected.type as ItemType]}
                    {selected.isFree && !categoryOpen ? " · materi contoh gratis" : ""}
                  </p>
                  <h2 className="text-lg font-bold text-slate-900">{selected.title}</h2>
                </div>
                <form className="flex flex-wrap gap-2">
                  <input type="hidden" name="itemId" value={selected.id} />
                  <button className="btn-secondary btn-sm" formAction={toggleItemDoneAction}>
                    {done.has(selected.id) ? "Batalkan tanda selesai" : "Tandai selesai"}
                  </button>
                  <button className="btn btn-sm" formAction={completeAndNextAction}>
                    {done.has(selected.id) ? "Materi berikutnya →" : "Selesai & lanjut →"}
                  </button>
                </form>
              </div>
              {selected.description && <p className="mb-4 text-sm text-slate-600">{selected.description}</p>}
              <MaterialViewer item={selected} />
              {selected.sourceNote && <p className="mt-3 text-xs text-slate-500">Sumber: {selected.sourceNote}</p>}
            </article>
          )}

          {locked && <Paywall title={locked.title} type={ITEM_TYPE_LABEL[locked.type as ItemType]} offers={offers} courseId={topic.categoryId} freeLeft={freeLeft} />}

          {!current && (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">Materi topik ini sedang disiapkan. Pilih topik lain dari kurikulum.</div>
          )}

          {!categoryOpen && selected && offers.length > 0 && lessons.some((i) => !i.isFree) && (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-5 py-4">
              <p className="text-sm text-slate-600">
                Ini materi contoh gratis. <span className="font-medium text-slate-900">{lessons.filter((i) => !i.isFree).length} materi lain</span> terbuka setelah membeli.
              </p>
              <Link href={offers.length === 1 ? `/paket/${offers[0].slug}` : `/kelas/${topic.categoryId}`} className="btn btn-sm">
                Buka seluruh kelas
              </Link>
            </div>
          )}

          {links.length > 0 && (
            <div className="card">
              <h2 className="h2 mb-3">Tautan sumber</h2>
              <ul className="divide-y divide-slate-100">
                {links.map((l) => (
                  <li key={l.id} className="py-3">
                    <a href={l.url ?? "#"} target="_blank" rel="noopener noreferrer" className="link">
                      {l.title} ↗
                    </a>
                    {l.description && <p className="mt-0.5 text-sm text-slate-600">{l.description}</p>}
                    {l.sourceNote && <p className="text-xs text-slate-500">{l.sourceNote}</p>}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

type Offer = { id: string; slug: string; name: string; summary: string | null } & Parameters<typeof startingPrice>[0];

// Panel materi terkunci: menjelaskan kenapa terkunci dan layanan mana yang membukanya.
function Paywall({ title, type, offers, courseId, freeLeft }: { title: string; type: string; offers: Offer[]; courseId: string; freeLeft: number }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-6 sm:p-10">
      <div className="mx-auto max-w-lg text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-slate-100 text-xl" aria-hidden>
          🔒
        </span>
        <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">{type} · terkunci</p>
        <h2 className="mt-1 text-xl font-bold text-slate-900">{title}</h2>
        <p className="mt-2 text-sm text-slate-600">Materi ini terbuka setelah membeli layanan yang memuat kelas ini.{freeLeft > 0 ? ` Masih ada ${freeLeft} materi gratis yang bisa dibuka dari kurikulum.` : ""}</p>
      </div>
      {offers.length > 0 ? (
        <ul className="mx-auto mt-6 max-w-lg space-y-3">
          {offers.map((p) => {
            const price = startingPrice(p);
            return (
              <li key={p.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 px-4 py-3">
                <div className="min-w-0">
                  <p className="font-medium text-slate-900">{p.name}</p>
                  <p className="num text-sm text-slate-600">{price !== null ? `Mulai ${rupiah(price)}` : "Harga segera diumumkan"}</p>
                </div>
                <Link href={`/paket/${p.slug}`} className="btn btn-sm">
                  Beli untuk membuka
                  <Icon name="arrow" className="h-3.5 w-3.5" />
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="mt-6 text-center text-sm text-slate-500">Layanan untuk kelas ini belum tersedia. Hubungi admin.</p>
      )}
      <p className="mt-6 text-center">
        <Link href={`/kelas/${courseId}`} className="link text-sm">
          Lihat kurikulum lengkap
        </Link>
      </p>
    </article>
  );
}
