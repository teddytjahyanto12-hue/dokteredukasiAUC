import Link from "next/link";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { accessibleCategoryIds, canOpen } from "@/lib/access";
import { courseStats, doneItemIds, LEVEL_LABEL, LEVELS, loadCourses } from "@/lib/courses";
import { CourseCard } from "@/components/course-card";
import { Empty } from "@/components/ui";
import { readFlash, type SearchParams } from "@/lib/flash";

export const metadata = { title: "Kelas" };

export default async function CoursesPage({ searchParams }: { searchParams: SearchParams }) {
  const { pick } = await readFlash(searchParams);
  const program = pick("program");
  const level = (LEVELS as readonly string[]).includes(pick("tingkat") ?? "") ? pick("tingkat") : undefined;
  const user = await getCurrentUser();
  const [courses, tracks, allowed, done] = await Promise.all([
    loadCourses({ trackSlug: program, level }),
    db.track.findMany({ where: { published: true }, orderBy: { order: "asc" }, select: { slug: true, title: true } }),
    accessibleCategoryIds(user),
    doneItemIds(user?.id),
  ]);
  const href = (p?: string, l?: string) => {
    const q = new URLSearchParams();
    if (p) q.set("program", p);
    if (l) q.set("tingkat", l);
    const s = q.toString();
    return s ? `/kelas?${s}` : "/kelas";
  };

  return (
    <div className="container-page py-10">
      <h1 className="h1">Kelas</h1>
      <p className="mt-2 max-w-2xl text-slate-600">Semua kelas yang tersedia. Buka halaman kelas untuk melihat silabus dan mencoba materi contoh gratis.</p>

      {/* Filter — satu baris di atas daftar */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <Link href={href(undefined, level)} className={!program ? "btn btn-sm" : "btn-secondary btn-sm"}>
          Semua program
        </Link>
        {tracks.map((t) => (
          <Link key={t.slug} href={href(t.slug, level)} className={program === t.slug ? "btn btn-sm" : "btn-secondary btn-sm"}>
            {t.title}
          </Link>
        ))}
        <span className="mx-1 hidden h-5 w-px bg-slate-200 sm:block" />
        <Link href={href(program)} className={!level ? "btn btn-sm" : "btn-secondary btn-sm"}>
          Semua tingkat
        </Link>
        {LEVELS.map((l) => (
          <Link key={l} href={href(program, l)} className={level === l ? "btn btn-sm" : "btn-secondary btn-sm"}>
            {LEVEL_LABEL[l]}
          </Link>
        ))}
      </div>

      {courses.length === 0 ? (
        <div className="mt-8">
          <Empty>Belum ada kelas untuk pilihan ini.</Empty>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => {
            const open = !!user && canOpen(allowed, c.id);
            return <CourseCard key={c.id} course={c} open={open} stats={courseStats(c, done, open)} />;
          })}
        </div>
      )}
    </div>
  );
}
