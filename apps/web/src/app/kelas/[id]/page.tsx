import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { accessibleCategoryIds, canOpen } from "@/lib/access";
import { courseInclude, courseStats, doneItemIds, lessonHref, LEVEL_LABEL } from "@/lib/courses";
import { ITEM_TYPE_LABEL, type ItemType } from "@/lib/constants";
import { rupiah } from "@/lib/format";
import { startingPrice } from "@/lib/services";
import { ProgressBar } from "@/components/ui";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const c = await db.category.findUnique({ where: { id }, select: { title: true } });
  return { title: c?.title ?? "Kelas" };
}

export default async function CoursePage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { id } = await params;
  const finished = (await searchParams).selesai === "1";
  const course = await db.category.findUnique({ where: { id }, include: courseInclude });
  if (!course || !course.published) notFound();

  const user = await getCurrentUser();
  const [allowed, done, packages, paths] = await Promise.all([
    accessibleCategoryIds(user),
    doneItemIds(user?.id),
    db.package.findMany({
      where: { active: true, categories: { some: { categoryId: id } } },
      orderBy: { order: "asc" },
      include: { durations: { where: { active: true } }, addons: true },
    }),
    db.learningPath.findMany({ where: { published: true, steps: { some: { categoryId: id } } }, orderBy: { order: "asc" }, select: { slug: true, title: true } }),
  ]);
  const open = !!user && canOpen(allowed, course.id);
  const st = courseStats(course, done, open);
  const outcomes = (course.outcomes ?? "").split("\n").map((x) => x.trim()).filter(Boolean);
  const target = st.next ?? st.first;
  // Tamu diarahkan login dulu; materi gratis tetap wajib login.
  const go = (href: string) => (user ? href : `/masuk?next=${encodeURIComponent(href)}`);

  return (
    <div className="container-page py-8">
      <nav className="text-sm text-slate-500">
        <Link href="/kelas" className="hover:text-brand">
          Kelas
        </Link>{" "}
        /{" "}
        <Link href={`/kelas?program=${course.track.slug}`} className="hover:text-brand">
          {course.track.title}
        </Link>
      </nav>

      {finished && (
        <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {st.completed ? "Selamat, semua materi kelas ini sudah Anda selesaikan." : open ? "Anda sudah sampai di materi terakhir. Masih ada materi yang belum ditandai selesai." : "Materi contoh gratis sudah habis. Buka seluruh kelas lewat layanan di samping."}
        </div>
      )}

      <div className="mt-3 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0">
          <h1 className="h1">{course.title}</h1>
          {course.description && <p className="mt-2 text-slate-600">{course.description}</p>}
          <div className="mt-4 flex flex-wrap gap-2">
            {course.level && <span className="badge">Tingkat: {LEVEL_LABEL[course.level] ?? course.level}</span>}
            <span className="badge">
              {course.topics.length} topik · {st.total} materi{st.quizzes ? ` · ${st.quizzes} quiz` : ""}
            </span>
            {course.durationText && <span className="badge">{course.durationText}</span>}
            {course.instructor && <span className="badge">Pengajar: {course.instructor}</span>}
          </div>

          {outcomes.length > 0 && (
            <section className="card mt-6">
              <h2 className="h2 mb-3">Yang akan Anda pelajari</h2>
              <ul className="grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
                {outcomes.map((o) => (
                  <li key={o} className="flex gap-2">
                    <span className="text-brand" aria-hidden>
                      ✓
                    </span>
                    {o}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="mt-8">
            <h2 className="h2 mb-3">Silabus</h2>
            {course.topics.length === 0 && <p className="text-sm text-slate-500">Materi kelas ini sedang disiapkan.</p>}
            <ol className="space-y-3">
              {course.topics.map((t, idx) => {
                const lessons = t.items.filter((i) => i.type !== "LINK");
                const links = t.items.length - lessons.length;
                return (
                  <li key={t.id} className="card p-0">
                    <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
                      <h3 className="font-semibold text-slate-900">
                        {idx + 1}. {t.title}
                      </h3>
                      <span className="shrink-0 text-xs text-slate-500">
                        {lessons.filter((i) => done.has(i.id)).length}/{lessons.length} selesai
                      </span>
                    </div>
                    <ul className="divide-y divide-slate-100 text-sm">
                      {lessons.map((i) => {
                        const can = open || i.isFree;
                        const row = (
                          <>
                            <span className="w-5 shrink-0 text-center" aria-hidden>
                              {done.has(i.id) ? "✅" : can ? "▶" : "🔒"}
                            </span>
                            <span className="min-w-0 flex-1">{i.title}</span>
                            {i.isFree && !open && <span className="badge-brand shrink-0">Gratis</span>}
                            <span className="shrink-0 text-xs text-slate-400">{ITEM_TYPE_LABEL[i.type as ItemType] ?? i.type}</span>
                          </>
                        );
                        return (
                          <li key={i.id}>
                            {can ? (
                              <Link href={go(lessonHref({ topicId: t.id, id: i.id }))} className="flex items-center gap-2 px-4 py-2.5 hover:bg-slate-50">
                                {row}
                              </Link>
                            ) : (
                              <div className="flex items-center gap-2 px-4 py-2.5 text-slate-400">{row}</div>
                            )}
                          </li>
                        );
                      })}
                      {t.quiz?.published && (
                        <li className="flex items-center gap-2 px-4 py-2.5 text-slate-600">
                          <span className="w-5 shrink-0 text-center" aria-hidden>
                            {open ? "📝" : "🔒"}
                          </span>
                          {open ? (
                            <Link href={`/quiz/${t.id}`} className="link">
                              {t.quiz.title}
                            </Link>
                          ) : (
                            <span className="text-slate-400">{t.quiz.title}</span>
                          )}
                        </li>
                      )}
                      {links > 0 && <li className="px-4 py-2.5 text-xs text-slate-500">+ {links} tautan sumber</li>}
                      {t.items.length === 0 && !t.quiz && <li className="px-4 py-2.5 text-slate-500">Sedang disiapkan.</li>}
                    </ul>
                  </li>
                );
              })}
            </ol>
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          <div className="card p-0 overflow-hidden">
            {course.posterFileId && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={`/api/berkas/${course.posterFileId}`} alt={`Poster ${course.title}`} className="aspect-[16/9] w-full object-cover" />
            )}
            <div className="p-5">
              {user && (open || st.started) && (
                <>
                  <p className="text-sm font-semibold text-slate-900">Progres Anda</p>
                  <div className="mt-2 flex items-center gap-3">
                    <ProgressBar value={st.pct} />
                    <span className="text-xs text-slate-500">{st.pct}%</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    {st.done} dari {st.total} materi selesai
                  </p>
                </>
              )}
              {open ? (
                target ? (
                  <Link href={lessonHref(target)} className="btn mt-4 w-full justify-center">
                    {st.completed ? "Buka lagi kelas ini" : st.started ? "Lanjutkan belajar" : "Mulai belajar"}
                  </Link>
                ) : (
                  <p className="mt-3 text-sm text-slate-500">Materi sedang disiapkan.</p>
                )
              ) : (
                <>
                  <p className="text-sm text-slate-600">
                    {st.free > 0 ? `Kelas ini punya ${st.free} materi contoh gratis. Coba dulu sebelum membeli.` : "Kelas ini termasuk dalam layanan berbayar."}
                  </p>
                  {st.free > 0 && target && (
                    <Link href={go(lessonHref(target))} className="btn mt-4 w-full justify-center">
                      {user ? (st.started ? "Lanjutkan materi gratis" : "Coba materi gratis") : "Daftar/masuk untuk coba gratis"}
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>

          {!open && packages.length > 0 && (
            <div className="card">
              <h2 className="text-sm font-semibold text-slate-900">Buka seluruh kelas lewat</h2>
              <ul className="mt-3 space-y-2">
                {packages.map((p) => (
                  <li key={p.id}>
                    <Link href={`/paket/${p.slug}`} className="block rounded-lg border border-slate-200 px-3 py-2 text-sm hover:border-brand">
                      <span className="font-medium text-slate-900">{p.name}</span>
                      <span className="block text-xs text-brand">{startingPrice(p) !== null ? `Mulai ${rupiah(startingPrice(p))}` : "Harga segera diumumkan"}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {paths.length > 0 && (
            <div className="card">
              <h2 className="text-sm font-semibold text-slate-900">Bagian dari jalur belajar</h2>
              <ul className="mt-2 space-y-1 text-sm">
                {paths.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/jalur/${p.slug}`} className="link">
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
