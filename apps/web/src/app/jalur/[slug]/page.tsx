import Link from "next/link";
import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { accessibleCategoryIds, canOpen } from "@/lib/access";
import { courseStats, doneItemIds, lessonHref } from "@/lib/courses";
import { loadPaths } from "@/lib/paths";
import { ProgressBar } from "@/components/ui";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [p] = await loadPaths({ slug });
  return { title: p?.title ?? "Jalur belajar" };
}

export default async function PathPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [path] = await loadPaths({ slug });
  if (!path) notFound();
  const user = await getCurrentUser();
  const [allowed, done] = await Promise.all([accessibleCategoryIds(user), doneItemIds(user?.id)]);
  const rows = path.steps.map((s) => {
    const open = !!user && canOpen(allowed, s.categoryId);
    return { step: s, open, st: courseStats(s.category, done, open) };
  });
  const total = rows.reduce((n, r) => n + r.st.total, 0);
  const doneCount = rows.reduce((n, r) => n + r.st.done, 0);
  const pct = total ? Math.round((doneCount / total) * 100) : 0;
  // Langkah berikutnya: kelas pertama yang belum selesai.
  const current = rows.find((r) => !r.st.completed);

  return (
    <div className="container-page max-w-4xl py-8">
      <nav className="text-sm text-slate-500">
        <Link href="/jalur" className="hover:text-brand">
          Jalur belajar
        </Link>
      </nav>
      <h1 className="h1 mt-2">{path.title}</h1>
      {path.summary && <p className="mt-2 text-lg text-slate-600">{path.summary}</p>}
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="badge">
          {rows.length} kelas · {total} materi
        </span>
      </div>
      {path.description && <p className="mt-4 whitespace-pre-line text-slate-700">{path.description}</p>}

      {user && doneCount > 0 && (
        <div className="card mt-6">
          <p className="text-sm font-semibold text-slate-900">Progres jalur</p>
          <div className="mt-2 flex items-center gap-3">
            <ProgressBar value={pct} />
            <span className="text-xs text-slate-500">{pct}%</span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            {doneCount} dari {total} materi · {rows.filter((r) => r.st.completed).length} dari {rows.length} kelas selesai
          </p>
        </div>
      )}

      <ol className="mt-8 space-y-4">
        {rows.map(({ step, open, st }, i) => {
          const c = step.category;
          const isCurrent = current?.step.id === step.id;
          const target = st.next ?? st.first;
          return (
            <li key={step.id} className={`card ${isCurrent ? "border-brand ring-1 ring-brand" : ""}`}>
              <div className="flex gap-4">
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold ${st.completed ? "bg-mascot text-ink" : "bg-slate-100 text-slate-700"}`}
                  aria-label={`Langkah ${i + 1}`}
                >
                  {st.completed ? "✓" : i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand">
                    {c.track.title}
                    {isCurrent && doneCount > 0 ? " · langkah saat ini" : ""}
                  </p>
                  <h2 className="mt-0.5 text-lg font-bold text-slate-900">
                    <Link href={`/kelas/${c.id}`} className="hover:text-brand">
                      {c.title}
                    </Link>
                  </h2>
                  {step.note && <p className="mt-1 text-sm text-slate-600">{step.note}</p>}
                  <p className="mt-1 text-xs text-slate-500">
                    {c.topics.length} topik · {st.total} materi
                    {!open && st.free > 0 ? ` · ${st.free} materi gratis` : ""}
                    {!open && st.free === 0 ? " · berbayar" : ""}
                  </p>
                  {st.started && (
                    <div className="mt-3 flex items-center gap-3">
                      <ProgressBar value={st.pct} />
                      <span className="text-xs text-slate-500">{st.pct}%</span>
                    </div>
                  )}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {user && target && !st.completed && (open || st.free > 0) && (
                      <Link href={lessonHref(target)} className={isCurrent ? "btn btn-sm" : "btn-secondary btn-sm"}>
                        {open ? (st.started ? "Lanjutkan" : "Mulai") : "Coba materi gratis"}
                      </Link>
                    )}
                    <Link href={`/kelas/${c.id}`} className="btn-secondary btn-sm">
                      Lihat kelas
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
      {rows.length === 0 && <p className="mt-8 text-sm text-slate-500">Kelas untuk jalur ini sedang disusun.</p>}
    </div>
  );
}
