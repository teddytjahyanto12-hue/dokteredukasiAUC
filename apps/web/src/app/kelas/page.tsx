import Link from "next/link";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { accessibleCategoryIds, canOpen } from "@/lib/access";
import { courseStats, doneItemIds, loadCourses, studentCounts } from "@/lib/courses";
import { CourseCard } from "@/components/course-card";
import { Empty } from "@/components/ui";
import { readFlash, type SearchParams } from "@/lib/flash";

export const metadata = { title: "Kelas" };

export default async function CoursesPage({ searchParams }: { searchParams: SearchParams }) {
  const { pick } = await readFlash(searchParams);
  const program = pick("program");
  const user = await getCurrentUser();
  const [courses, tracks, allowed, done] = await Promise.all([
    loadCourses({ trackSlug: program }),
    db.track.findMany({ where: { published: true }, orderBy: { order: "asc" }, select: { slug: true, title: true } }),
    accessibleCategoryIds(user),
    doneItemIds(user?.id),
  ]);
  const students = await studentCounts(courses);
  const href = (p?: string) => (p ? `/kelas?program=${p}` : "/kelas");

  return (
    <div className="container-page py-10">
      <h1 className="h1">Kelas</h1>
      <p className="mt-2 max-w-2xl text-slate-600">Semua kelas yang tersedia. Buka halaman kelas untuk melihat silabus dan mencoba materi contoh gratis.</p>

      {/* Filter — satu baris di atas daftar */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <Link href={href()} className={!program ? "btn btn-sm" : "btn-secondary btn-sm"}>
          Semua program
        </Link>
        {tracks.map((t) => (
          <Link key={t.slug} href={href(t.slug)} className={program === t.slug ? "btn btn-sm" : "btn-secondary btn-sm"}>
            {t.title}
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
            return <CourseCard key={c.id} course={c} open={open} stats={courseStats(c, done, open)} students={students.get(c.id)?.total} />;
          })}
        </div>
      )}
    </div>
  );
}
