import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { accessibleCategoryIds, canOpen } from "@/lib/access";
import { ITEM_TYPE_LABEL, type ItemType } from "@/lib/constants";
import { MaterialViewer } from "@/components/material-viewer";
import { toggleItemDoneAction } from "@/app/actions/student";
import { Empty } from "@/components/ui";
import type { SearchParams } from "@/lib/flash";

const ICON: Record<string, string> = { SLIDES: "🖼️", PDF: "📄", VIDEO: "🎬", LINK: "🔗", TEXT: "📝" };

export default async function TopicPage({ params, searchParams }: { params: Promise<{ topicId: string }>; searchParams: SearchParams }) {
  const user = await requireUser();
  const { topicId } = await params;
  const sp = await searchParams;
  const topic = await db.topic.findUnique({
    where: { id: topicId },
    include: {
      category: { include: { track: true, packages: { include: { package: true } } } },
      items: { where: { published: true }, orderBy: { order: "asc" }, include: { file: true } },
      quiz: { include: { _count: { select: { questions: true } } } },
    },
  });
  if (!topic || !topic.published) notFound();

  const allowed = await accessibleCategoryIds(user);
  const categoryOpen = canOpen(allowed, topic.categoryId);
  const done = new Set(
    (await db.itemProgress.findMany({ where: { userId: user.id, itemId: { in: topic.items.map((i) => i.id) } }, select: { itemId: true } })).map((p) => p.itemId),
  );
  const visible = topic.items.filter((i) => categoryOpen || i.isFree);
  const selectedId = typeof sp.item === "string" ? sp.item : visible.find((i) => i.type !== "LINK")?.id;
  const selected = visible.find((i) => i.id === selectedId && i.type !== "LINK");
  const links = visible.filter((i) => i.type === "LINK");
  const offers = topic.category.packages.map((p) => p.package).filter((p) => p.active);

  return (
    <div className="container-page py-8">
      <nav className="text-sm text-slate-500">
        <Link href={`/program/${topic.category.track.slug}`} className="hover:text-brand">
          {topic.category.track.title}
        </Link>{" "}
        / {topic.category.title}
      </nav>
      <h1 className="h1 mt-2">{topic.title}</h1>
      {topic.description && <p className="mt-1 text-slate-600">{topic.description}</p>}

      {!categoryOpen && (
        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          Materi ini termasuk dalam paket berbayar{visible.length ? "; Anda sedang melihat bagian gratis" : ""}.{" "}
          {offers.length > 0 && (
            <>
              Tersedia di:{" "}
              {offers.map((p, i) => (
                <span key={p.id}>
                  {i > 0 && ", "}
                  <Link href={`/paket/${p.slug}`} className="font-semibold underline">
                    {p.name}
                  </Link>
                </span>
              ))}
            </>
          )}
        </div>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-2">
          {topic.items.length === 0 && <Empty>Materi topik ini sedang disiapkan.</Empty>}
          {topic.items
            .filter((i) => i.type !== "LINK")
            .map((i) => {
              const open = categoryOpen || i.isFree;
              const active = selected?.id === i.id;
              return open ? (
                <Link
                  key={i.id}
                  href={`/materi/${topic.id}?item=${i.id}`}
                  className={`flex items-start gap-2 rounded-lg border px-3 py-2 text-sm ${active ? "border-brand bg-brand-soft/50" : "border-slate-200 bg-white hover:bg-slate-50"}`}
                >
                  <span aria-hidden>{ICON[i.type]}</span>
                  <span className="flex-1">
                    {i.title}
                    {i.isFree && !categoryOpen && <span className="badge-brand ml-2">Gratis</span>}
                  </span>
                  {done.has(i.id) && <span title="Selesai">✅</span>}
                </Link>
              ) : (
                <div key={i.id} className="flex items-start gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-400">
                  <span aria-hidden>🔒</span>
                  <span>{i.title}</span>
                </div>
              );
            })}
          {topic.quiz && topic.quiz.published && (
            <Link
              href={`/quiz/${topic.id}`}
              className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold ${categoryOpen ? "border-amber-300 bg-amber-50 text-amber-900" : "border-slate-200 bg-slate-50 text-slate-400"}`}
            >
              {categoryOpen ? "📝" : "🔒"} {topic.quiz.title} ({topic.quiz._count.questions} soal)
            </Link>
          )}
        </aside>

        <section className="min-w-0 space-y-6">
          {selected && (
            <article className="card">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand">{ITEM_TYPE_LABEL[selected.type as ItemType]}</p>
                  <h2 className="text-lg font-bold text-slate-900">{selected.title}</h2>
                </div>
                <form action={toggleItemDoneAction}>
                  <input type="hidden" name="itemId" value={selected.id} />
                  <button className={done.has(selected.id) ? "btn-secondary btn-sm" : "btn btn-sm"} type="submit">
                    {done.has(selected.id) ? "Batalkan tanda selesai" : "Tandai selesai"}
                  </button>
                </form>
              </div>
              {selected.description && <p className="mb-4 text-sm text-slate-600">{selected.description}</p>}
              <MaterialViewer item={selected} />
              {selected.sourceNote && <p className="mt-3 text-xs text-slate-500">Sumber: {selected.sourceNote}</p>}
            </article>
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

          {!selected && links.length === 0 && visible.length === 0 && topic.items.length > 0 && (
            <Empty>Pilih paket yang sesuai untuk membuka materi ini.</Empty>
          )}
        </section>
      </div>
    </div>
  );
}
