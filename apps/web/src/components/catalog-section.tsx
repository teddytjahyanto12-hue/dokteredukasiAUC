import Link from "next/link";
import { db } from "@/lib/db";
import type { CurrentUser } from "@/lib/auth";
import { accessibleCategoryIds, canOpen } from "@/lib/access";
import { courseStats, doneItemIds, loadCourses, studentCounts } from "@/lib/courses";
import { CourseCard } from "@/components/course-card";
import { getSettings } from "@/lib/settings";

// Katalog kelas dengan filter program (dan kata kunci). Dipakai di beranda dan halaman /kelas.
export async function CatalogSection({ user, program, q, basePath, as: Heading = "h2" }: { user: CurrentUser | null; program?: string; q?: string; basePath: string; as?: "h1" | "h2" }) {
  const [courses, tracks, allowed, done, s] = await Promise.all([
    loadCourses({ trackSlug: program, q }),
    db.track.findMany({ where: { published: true }, orderBy: { order: "asc" }, select: { slug: true, title: true } }),
    accessibleCategoryIds(user),
    doneItemIds(user?.id),
    getSettings(),
  ]);
  // Kelas induk bertanda "section" (mis. Review) tampil sebagai judul section berisi kartu kelas pilihannya.
  const sectionParents = courses.filter((c) => c.showChildrenInCatalog && c.children.length > 0);
  const childCourses = sectionParents.length ? await loadCourses({ ids: sectionParents.flatMap((p) => p.children.map((ch) => ch.id)) }) : [];
  const students = await studentCounts([...courses, ...childCourses]);
  const ready = (c: typeof courses[number]) => c.topics.some((t) => t.items.length > 0 || t.quiz?.published);
  const orderedCourses = [...courses].filter((c) => !sectionParents.includes(c)).sort((a, b) => Number(ready(b)) - Number(ready(a)));
  const sections = sectionParents.map((p) => ({ parent: p, items: childCourses.filter((c) => c.parentId === p.id) }));
  const shown = orderedCourses.length + sections.reduce((n, s) => n + s.items.length, 0);
  const href = (p?: string) => {
    const params = new URLSearchParams();
    if (p) params.set("program", p);
    if (q) params.set("q", q);
    const s = params.toString();
    return `${basePath}${s ? `?${s}` : ""}${basePath === "/" ? "#katalog" : ""}`;
  };
  const tab = (active: boolean) => `whitespace-nowrap rounded-md px-3.5 py-1.5 text-sm transition ${active ? "bg-white font-semibold text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"}`;

  return (
    <section id="katalog" className="scroll-mt-36">
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">{s.catalogEyebrow}</p>
          <Heading className="mt-1 text-3xl font-bold tracking-tight text-slate-900">{s.catalogTitle}</Heading>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600">{s.catalogSubtitle}</p>
        </div>
        <nav className="flex max-w-full flex-wrap gap-1 self-start rounded-lg border border-slate-200 bg-slate-100 p-1 lg:self-auto" aria-label="Filter program">
          <Link href={href()} className={tab(!program)}>
            Semua program
          </Link>
          {tracks.map((t) => (
            <Link key={t.slug} href={href(t.slug)} className={tab(program === t.slug)}>
              {t.title}
            </Link>
          ))}
        </nav>
      </div>

      <form action="/kelas" role="search" className="mt-5 flex max-w-xl gap-2">
        {program && <input type="hidden" name="program" value={program} />}
        <label className="sr-only" htmlFor="catalog-search">Cari kelas</label>
        <input id="catalog-search" name="q" type="search" defaultValue={q} placeholder={s.catalogSearchPlaceholder} className="input min-w-0" />
        <button type="submit" className="btn">Cari</button>
      </form>
      <div className="flex flex-wrap items-center justify-between gap-2 py-4 text-sm text-slate-500">
        <span>
          {q ? (
            <>
              Hasil pencarian “<span className="font-medium text-slate-800">{q}</span>” ·{" "}
              <Link href={basePath} className="link">
                hapus pencarian
              </Link>
            </>
          ) : (
            ""
          )}
        </span>
        <span>
          Menampilkan <span className="num font-semibold text-slate-800">{shown}</span> kelas
        </span>
      </div>

      {shown === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">{s.catalogEmptyText}</p>
      ) : (
        <div className="space-y-10">
          {orderedCourses.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {orderedCourses.map((c) => {
                const open = !!user && canOpen(allowed, c.id);
                return <CourseCard key={c.id} course={c} open={open} loggedIn={!!user} stats={courseStats(c, done, open)} students={students.get(c.id)?.total} />;
              })}
            </div>
          )}
          {sections.map(({ parent, items }) => (
            <section key={parent.id} aria-labelledby={`section-${parent.id}`}>
              <div className="mb-4 flex flex-wrap items-end justify-between gap-2 border-b border-slate-200 pb-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">{parent.track.title}</p>
                  <h3 id={`section-${parent.id}`} className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                    {parent.title}
                  </h3>
                  {parent.description && <p className="mt-1 max-w-2xl text-sm text-slate-600">{parent.description}</p>}
                </div>
                <Link href={`/kelas/${parent.id}`} className="text-sm font-semibold text-brand hover:underline">
                  Lihat semua {(parent.childLabel || "pilihan").toLowerCase()} →
                </Link>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((c) => {
                  const open = !!user && canOpen(allowed, c.id);
                  return <CourseCard key={c.id} course={c} open={open} loggedIn={!!user} stats={courseStats(c, done, open)} students={students.get(c.id)?.total} />;
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </section>
  );
}
