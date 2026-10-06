import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { accessibleCategoryIds, canOpen } from "@/lib/access";
import { courseStats, doneItemIds, LEVEL_LABEL } from "@/lib/courses";
import { loadPaths } from "@/lib/paths";
import { Empty, ProgressBar } from "@/components/ui";

export const metadata = { title: "Jalur belajar" };

export default async function PathsPage() {
  const user = await getCurrentUser();
  const [paths, allowed, done] = await Promise.all([loadPaths(), accessibleCategoryIds(user), doneItemIds(user?.id)]);

  return (
    <div className="container-page py-10">
      <h1 className="h1">Jalur belajar</h1>
      <p className="mt-2 max-w-2xl text-slate-600">Rangkaian kelas yang disusun berurutan, supaya Anda tahu harus mulai dari mana dan apa langkah berikutnya.</p>

      {paths.length === 0 ? (
        <div className="mt-8">
          <Empty>
            Jalur belajar sedang disusun. Sementara itu, lihat{" "}
            <Link href="/kelas" className="link">
              semua kelas
            </Link>
            .
          </Empty>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {paths.map((p) => {
            const stats = p.steps.map((s) => courseStats(s.category, done, !!user && canOpen(allowed, s.categoryId)));
            const total = stats.reduce((n, s) => n + s.total, 0);
            const doneCount = stats.reduce((n, s) => n + s.done, 0);
            const pct = total ? Math.round((doneCount / total) * 100) : 0;
            return (
              <Link key={p.id} href={`/jalur/${p.slug}`} className="card flex flex-col transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex flex-wrap gap-1.5">
                  {p.level && <span className="badge">{LEVEL_LABEL[p.level] ?? p.level}</span>}
                  <span className="badge">
                    {p.steps.length} kelas · {total} materi
                  </span>
                </div>
                <h2 className="mt-3 text-lg font-bold text-slate-900">{p.title}</h2>
                {p.summary && <p className="mt-1 text-sm text-slate-600">{p.summary}</p>}
                <ol className="mt-3 flex-1 space-y-1 text-sm text-slate-700">
                  {p.steps.map((s, i) => (
                    <li key={s.id}>
                      {i + 1}. {s.category.title}
                    </li>
                  ))}
                </ol>
                {doneCount > 0 && (
                  <div className="mt-4 flex items-center gap-3">
                    <ProgressBar value={pct} />
                    <span className="text-xs text-slate-500">{pct}%</span>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
