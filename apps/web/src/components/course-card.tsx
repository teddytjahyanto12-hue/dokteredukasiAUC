import Link from "next/link";
import { LEVEL_LABEL, type Course } from "@/lib/courses";
import { ProgressBar } from "@/components/ui";

type Stats = { total: number; pct: number; free: number; started: boolean; completed: boolean };

// Kartu kelas untuk katalog, jalur belajar, dan halaman penawaran.
export function CourseCard({ course, stats, open }: { course: Course; stats: Stats; open: boolean }) {
  return (
    <Link href={`/kelas/${course.id}`} className="card flex flex-col overflow-hidden p-0 transition hover:-translate-y-0.5 hover:shadow-md">
      {course.posterFileId ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={`/api/berkas/${course.posterFileId}`} alt="" className="aspect-[16/9] w-full object-cover" />
      ) : (
        <div className="grid aspect-[16/9] w-full place-items-center bg-gradient-to-br from-brand-soft to-white text-3xl" aria-hidden>
          📘
        </div>
      )}
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand">{course.track.title}</p>
        <h3 className="mt-1 font-semibold text-slate-900">{course.title}</h3>
        {course.description && <p className="mt-1 line-clamp-2 text-sm text-slate-600">{course.description}</p>}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {course.level && <span className="badge">{LEVEL_LABEL[course.level] ?? course.level}</span>}
          <span className="badge">{stats.total} materi</span>
          {course.durationText && <span className="badge">{course.durationText}</span>}
          {!open && stats.free > 0 && <span className="badge-brand">{stats.free} materi gratis</span>}
          {stats.completed && <span className="badge-brand">Selesai</span>}
        </div>
        {stats.started && (
          <div className="mt-3 flex items-center gap-3">
            <ProgressBar value={stats.pct} />
            <span className="text-xs text-slate-500">{stats.pct}%</span>
          </div>
        )}
      </div>
    </Link>
  );
}
