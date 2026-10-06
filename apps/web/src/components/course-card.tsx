import Link from "next/link";
import { muridLabel, type Course } from "@/lib/courses";
import { ProgressBar } from "@/components/ui";

type Stats = { total: number; pct: number; free: number; started: boolean; completed: boolean };

// Kartu kelas untuk katalog, jalur belajar, dan halaman penawaran.
export function CourseCard({ course, stats, open, students }: { course: Course; stats: Stats; open: boolean; students?: number }) {
  return (
    <Link href={`/kelas/${course.id}`} className="card group flex flex-col overflow-hidden p-0 transition hover:border-slate-300">
      {course.posterFileId ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={`/api/berkas/${course.posterFileId}`} alt="" className="aspect-[16/9] w-full object-cover" />
      ) : (
        <div className="grid aspect-[16/9] w-full place-items-center bg-slate-100 text-3xl" aria-hidden>
          📘
        </div>
      )}
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">{course.track.title}</p>
        <h3 className="mt-1.5 font-[family-name:var(--font-fraunces),Georgia,serif] text-lg font-semibold leading-snug text-slate-900 group-hover:text-brand">{course.title}</h3>
        {course.description && <p className="mt-1 line-clamp-2 text-sm text-slate-600">{course.description}</p>}
        <div className="mt-3 flex flex-wrap gap-x-1.5 gap-y-1">
          {!!students && <span className="badge">{muridLabel(students)}</span>}
          <span className="badge">{stats.total} materi</span>
          {course.durationText && <span className="badge">{course.durationText}</span>}
          {!open && stats.free > 0 && <span className="badge-brand">{stats.free} materi gratis</span>}
          {stats.completed && <span className="badge-brand">Selesai</span>}
        </div>
        {stats.started && (
          <div className="mt-3 flex items-center gap-3">
            <ProgressBar value={stats.pct} />
            <span className="num text-xs text-slate-500">{stats.pct}%</span>
          </div>
        )}
      </div>
    </Link>
  );
}
