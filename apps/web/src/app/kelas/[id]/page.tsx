import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { SR_SLUG, TOOLKIT_SLUG } from "@/lib/srma-config";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { accessibleCategoryIds, canOpen } from "@/lib/access";
import { courseInclude, courseStats, doneItemIds, lessonHref, muridLabel, studentCounts, withBlockTopics } from "@/lib/courses";
import { ITEM_TYPE_LABEL, type ItemType } from "@/lib/constants";
import { rupiah } from "@/lib/format";
import { startingPrice } from "@/lib/services";
import { ProgressBar } from "@/components/ui";
import { CourseArt } from "@/components/course-art";
import { getSrmaProgression } from "@/lib/srma-progression";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const c = await db.category.findUnique({ where: { id }, select: { title: true } });
  return { title: c?.title ?? "Kelas" };
}

export default async function CoursePage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { id } = await params;
  const finished = (await searchParams).selesai === "1";
  const raw = await db.category.findUnique({ where: { id }, include: { ...courseInclude, parent: { select: { id: true, title: true } } } });
  if (!raw || !raw.published) notFound();
  if (raw.slug === TOOLKIT_SLUG) redirect("/toolkit-srma");
  const course = withBlockTopics(raw);
  const blocks = raw.children; // terisi bila ini kelas induk (mis. Basic Medical Science, Review)
  const childLabel = raw.childLabel || "Blok";
  const isBlok = childLabel === "Blok";

  const user = await getCurrentUser();
  const [allowed, done, packages, paths] = await Promise.all([
    accessibleCategoryIds(user),
    doneItemIds(user?.id),
    db.package.findMany({
      // Blok: tampilkan juga paket kelas induknya (mis. Paket Blok Komplit).
      where: { active: true, categories: { some: { categoryId: { in: raw.parentId ? [id, raw.parentId] : [id] } } } },
      orderBy: { order: "asc" },
      include: { durations: { where: { active: true } }, addons: true },
    }),
    db.learningPath.findMany({ where: { published: true, steps: { some: { categoryId: id } } }, orderBy: { order: "asc" }, select: { slug: true, title: true } }),
  ]);
  const open = !!user && canOpen(allowed, course.id);
  const students = (await studentCounts([course])).get(course.id)?.total ?? 0;
  const st = courseStats(course, done, open);
  const outcomes = (course.outcomes ?? "").split("\n").map((x) => x.trim()).filter(Boolean);
  const progression = await getSrmaProgression(user, course.id);
  const reachable = course.topics.filter(t => !progression?.locked.has(t.id)).flatMap(t => t.items.filter(i => i.type !== "LINK" && (open || i.isFree)).map(i => ({ ...i, topicId: t.id })));
  const target = progression ? reachable.find(i => !done.has(i.id)) ?? reachable[0] : st.next ?? st.first;
  const hasResources = course.topics.some((t) => t.items.length > 0 || t.quiz?.published);
  const chapterCurriculum = course.slug === SR_SLUG && course.topics.some(t => t.id.startsWith("dea-srma-chapter-group-"));
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
        {raw.parent && (
          <>
            {" "}
            /{" "}
            <Link href={`/kelas/${raw.parent.id}`} className="hover:text-brand">
              {raw.parent.title}
            </Link>
          </>
        )}
      </nav>

      {finished && (
        <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {st.completed ? "Selamat, semua materi kelas ini sudah selesai." : open ? "Sudah sampai di materi terakhir. Masih ada materi yang belum ditandai selesai." : "Materi contoh gratis sudah habis. Buka seluruh kelas lewat layanan di samping."}
        </div>
      )}

      <div className="mt-3 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0">
          {course.code && <p className="num text-sm font-semibold text-brand">{course.code}</p>}
          <h1 className="h1">{course.title}</h1>
          {course.slug === SR_SLUG && <div className="mt-4 rounded-xl border border-mascot bg-brand-soft p-4"><p className="text-sm">Pelajari modul di kurikulum. Gunakan Toolkit saat mulai mengerjakan riset.</p><Link className="btn-secondary btn-sm mt-3" href="/toolkit-srma">Buka Toolkit SR-MA →</Link><p className="mt-2 text-xs text-slate-600">Toolkit termasuk dalam paket Intermediate dan Pro.</p></div>}
          {!hasResources && <p className="mt-4 rounded-lg border border-mascot bg-brand-soft p-4 text-sm text-ink"><strong>Segera hadir.</strong> Materi kelas ini sedang disiapkan. Gambaran kelas dapat dilihat terlebih dahulu.</p>}
          {course.description && <p className="mt-2 text-slate-600">{course.description}</p>}
          <div className="mt-4 flex flex-wrap gap-2">
            {students > 0 && <span className="badge">{muridLabel(students)}</span>}
            {hasResources && <span className="badge">{[blocks.length ? `${blocks.length} ${childLabel.toLowerCase()}` : course.topics.length ? `${course.topics.length} ${chapterCurriculum ? "kelompok" : raw.parentId ? "bab" : "topik"}` : null, st.total ? `${st.total} materi` : null, st.quizzes ? `${st.quizzes} kuis` : null].filter(Boolean).join(" · ")}</span>}
            {course.durationText && <span className="badge">{course.durationText}</span>}
            {course.instructor && <span className="badge">Pengajar: {course.instructor}</span>}
          </div>

          {outcomes.length > 0 && (
            <section className="card mt-6">
              <h2 className="h2 mb-3">Yang akan dipelajari</h2>
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

          {blocks.length > 0 && (
            <section className="mt-8">
              <h2 className="h2 mb-1">{isBlok ? "Kurikulum Blok" : `${childLabel} ${course.title}`}</h2>
              <p className="mb-4 text-sm leading-relaxed text-slate-600">
                {isBlok
                  ? `${blocks.length} Blok tahap akademik (preklinik). Setiap Blok terbagi per Bab dan setiap Bab memiliki kuis. Bab 1 beserta satu materi dan kuisnya dapat dicoba gratis.`
                  : `${blocks.length} ${childLabel.toLowerCase()} kelas. Pilih salah satu untuk melihat Bab, materi, dan kuisnya.`}
              </p>
              <ol className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {blocks.map((b, idx) => {
                  const bOpen = !!user && canOpen(allowed, b.id);
                  const lessons = b.topics.flatMap((t) => t.items.filter((i) => i.type !== "LINK"));
                  const quizzes = b.topics.filter((t) => t.quiz?.published).length;
                  return (
                    <li key={b.id}>
                      <Link href={`/kelas/${b.id}`} className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:border-mascot">
                        <div className="aspect-[16/9]">
                          <CourseArt title={isBlok ? `Blok ${idx + 1}` : b.title} program={course.track.slug} art={b.artKey} />
                        </div>
                        <div className="flex flex-1 flex-col p-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">
                            {b.code ? <span className="num">{b.code}</span> : null}
                            {b.code ? " · " : ""}
                            {isBlok ? `Blok ${idx + 1}` : course.title}
                          </p>
                          <h3 className="mt-1 font-semibold leading-snug text-slate-900 group-hover:text-brand">{b.title}</h3>
                          <p className="mt-auto pt-3 text-xs text-slate-500">
                            {[b.topics.length ? `${b.topics.length} bab` : null, lessons.length ? `${lessons.length} materi` : null, quizzes ? `${quizzes} kuis` : null].filter(Boolean).join(" · ") || "Materi sedang disiapkan"}
                            {bOpen ? " · Terbuka" : ""}
                          </p>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </section>
          )}

          {blocks.length === 0 && <section className="mt-8">
            <h2 className="h2 mb-1">Kurikulum</h2>
            {chapterCurriculum && <div className="my-4 rounded-2xl border-2 border-ink bg-brand-soft p-5"><p className="font-bold">Dari telaah sistematik hingga meta-analisis</p><p className="mt-1 text-sm text-slate-700">22 bab PDF · 8 kelompok belajar · 80 soal latihan</p><p className="mt-2 text-sm text-slate-600">Lulus kuis setiap kelompok dengan nilai minimal 80 untuk membuka kelompok berikutnya. Bila belum lulus, pelajari kembali bab yang tersedia dan ulangi kuis. Bab 01 dan kuis kelompok pertama dapat dicoba gratis setelah masuk.</p><div className="mt-4 flex flex-wrap gap-2"><a className="btn-secondary btn-sm" href="#bagian-systematic-review">I. Telaah sistematik · Bab 01–11</a><a className="btn-secondary btn-sm" href="#bagian-meta-analisis">II. Meta-analisis · Bab 12–22</a></div></div>}
            <p className="mb-4 text-sm leading-relaxed text-slate-600">{!hasResources ? "Kurikulum akan dilengkapi saat materi tersedia." : progression ? "Materi dibuka berurutan berdasarkan kelulusan kuis. Akses paket tetap berlaku." : open ? "Semua materi sudah terbuka." : "Masuk untuk mencoba materi bertanda Gratis. Akses materi lainnya mengikuti layanan yang dipilih."}</p>
            {course.topics.length === 0 && <p className="text-sm text-slate-500">Materi kelas ini sedang disiapkan.</p>}
            <ol className="space-y-3">
              {course.topics.map((t, idx) => {
                const lessons = t.items.filter((i) => i.type !== "LINK");
                const links = t.items.length - lessons.length;
                const prerequisite = progression?.locked.get(t.id);
                return (
                  <li key={t.id} className="card p-0">
                    {chapterCurriculum && (t.id === "dea-srma-chapter-group-1" || t.id === "dea-srma-chapter-group-5") && <div id={t.id.endsWith("-1") ? "bagian-systematic-review" : "bagian-meta-analisis"} className="scroll-mt-36 rounded-t-xl bg-ink px-4 py-4 text-white"><p className="text-xs font-semibold uppercase tracking-wider text-mascot">{t.id.endsWith("-1") ? "Bagian I · Bab 01–11" : "Bagian II · Bab 12–22"}</p><h3 className="mt-1 text-lg font-bold">{t.id.endsWith("-1") ? "Telaah Sistematik" : "Meta-analisis"}</h3></div>}
                    <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
                      <h3 className="font-semibold text-slate-900">
                        {chapterCurriculum && <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-brand">Kelompok {idx + 1} · {lessons.length} bab PDF · 10 soal</span>}
                        {raw.code && <span className="num mr-2 text-sm text-brand">{raw.code}.{idx + 1}</span>}
                        {raw.parentId ? t.title : `${idx + 1}. ${t.title}`}
                      </h3>
                      {user && lessons.length > 0 && <span className="shrink-0 text-xs text-slate-500">
                        {lessons.filter((i) => done.has(i.id)).length}/{lessons.length} selesai
                      </span>}
                    </div>
                    {chapterCurriculum && t.description && <p className="border-b border-slate-100 px-4 py-3 text-sm text-slate-600">{t.description}</p>}
                    {prerequisite && <p className="border-b border-slate-100 bg-amber-50 px-4 py-3 text-sm text-amber-900">🔒 Lulus {prerequisite.quiz?.title || "kuis kelompok sebelumnya"} dengan nilai minimal 80 untuk membuka kelompok ini.</p>}
                    {progression?.passed.has(t.id) && <p className="px-4 py-2 text-sm font-semibold text-emerald-700">✓ Kuis kelompok lulus</p>}
                    <ul className="divide-y divide-slate-100 text-sm">
                      {lessons.map((i) => {
                        const can = (open || i.isFree) && !prerequisite;
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
                            <Link href={go(lessonHref({ topicId: t.id, id: i.id }))} className={`flex items-center gap-2 px-4 py-2.5 hover:bg-slate-50 ${can ? "" : "text-slate-400"}`}>
                              {row}
                            </Link>
                          </li>
                        );
                      })}
                      {t.quiz?.published && (
                        <li className="flex items-center gap-2 px-4 py-2.5 text-slate-600">
                          <span className="w-5 shrink-0 text-center" aria-hidden>
                            {(open || t.quiz.isFree) && !prerequisite ? "📝" : "🔒"}
                          </span>
                          {(open || t.quiz.isFree) && !prerequisite ? (
                            <Link href={go(`/quiz/${t.id}`)} className="link">
                              {t.quiz.title}
                              {t.quiz.isFree && !open && <span className="badge-brand ml-2">Gratis</span>}
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
          </section>}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-36 lg:self-start">
          <div className="card p-0 overflow-hidden">
            {course.posterFileId ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={`/api/berkas/${course.posterFileId}`} alt={`Poster ${course.title}`} className="aspect-[16/9] w-full object-cover" />
            ) : <div className="aspect-[16/9]"><CourseArt title={course.title} program={course.track.slug} art={course.artKey} /></div>}
            <div className="p-5">
              {user && (open || st.started) && (
                <>
                  <p className="text-sm font-semibold text-slate-900">Progres belajar</p>
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
                    {!hasResources ? "Materi belum tersedia untuk mulai belajar." : st.free > 0 ? `Tersedia ${st.free} materi gratis. Masuk untuk mencoba sebelum memilih layanan.` : "Lihat pilihan layanan dan cakupan akses di bawah."}
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
              {blocks.length > 0 && isBlok && <p className="mt-3 text-xs leading-relaxed text-slate-500">Ingin satu Blok saja? Pilih Blok di kurikulum untuk melihat paket per Blok.</p>}
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
