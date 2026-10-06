import Link from "next/link";
import { lessonHref, muridLabel, type Course } from "@/lib/courses";
import { Icon } from "@/components/icons";

type Stats = {
  total: number;
  done: number;
  pct: number;
  free: number;
  quizzes: number;
  started: boolean;
  completed: boolean;
  next: { id: string; topicId: string } | null;
  first: { id: string; topicId: string } | null;
};

// Kartu kelas: gambar dengan label program, metadata teks polos, pengajar, tiga angka ringkas,
// progres belajar, dan tombol aksi. Dipakai di beranda, katalog, dan halaman penawaran.
export function CourseCard({ course, stats, open, students, loggedIn }: { course: Course; stats: Stats; open: boolean; students?: number; loggedIn: boolean }) {
  const detail = `/kelas/${course.id}`;
  const target = stats.next ?? stats.first;
  // Tamu diarahkan login dulu; materi gratis tetap wajib login.
  // Belum membeli & tanpa materi gratis: tetap masuk ke ruang belajar; materi pertama tampil terkunci dengan ajakan membeli.
  const firstAny = course.topics.flatMap((t) => t.items.filter((i) => i.type !== "LINK").map((i) => ({ id: i.id, topicId: t.id })))[0];
  const startAt = target ?? firstAny;
  const start = startAt ? (loggedIn ? lessonHref(startAt) : `/masuk?next=${encodeURIComponent(lessonHref(startAt))}`) : detail;
  const lesson = target ? (loggedIn ? lessonHref(target) : `/masuk?next=${encodeURIComponent(lessonHref(target))}`) : detail;
  const meta = [students ? muridLabel(students) : null, course.durationText, !open && stats.free > 0 ? `${stats.free} materi gratis` : null].filter(Boolean);
  const initials = (course.instructor ?? "")
    .replace(/^(dr\.?|drg\.?|prof\.?)\s+/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white">
      <Link href={detail} className="relative block">
        {course.posterFileId ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={`/api/berkas/${course.posterFileId}`} alt="" className="aspect-[16/10] w-full object-cover" />
        ) : (
          <div className="aspect-[16/10] w-full bg-gradient-to-br from-slate-700 to-slate-900" aria-hidden />
        )}
        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-2.5 pt-8 text-xs font-semibold text-white">{course.track.title}</span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        {meta.length > 0 && <p className="text-xs text-slate-500">{meta.join("  ·  ")}</p>}
        <h3 className="mt-2 line-clamp-2 text-lg font-semibold leading-snug text-slate-900">
          <Link href={detail} className="hover:text-brand">
            {course.title}
          </Link>
        </h3>
        {course.description && <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">{course.description}</p>}

        {course.instructor && (
          <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-slate-100 text-[11px] font-semibold text-slate-600">{initials || "dr"}</span>
            <span className="min-w-0 truncate text-sm font-medium text-slate-800">{course.instructor}</span>
          </div>
        )}

        <dl className="mt-4 grid grid-cols-3 divide-x divide-slate-100 border-t border-slate-100 pt-4 text-center">
          {[
            [course.topics.length, "Topik", "Bertahap"],
            [stats.total, "Materi", "Video & PDF"],
            [stats.quizzes, "Quiz", "Latihan"],
          ].map(([n, unit, note]) => (
            <div key={unit}>
              <dt className="text-sm font-semibold text-slate-800">
                <span className="num">{n}</span> {unit}
              </dt>
              <dd className="mt-0.5 text-xs text-slate-400">{note}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto pt-4">
          {stats.started && (
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Progres Belajar</span>
                <span className="num font-semibold text-brand">{stats.pct}%</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div className={`h-full rounded-full ${stats.pct === 100 ? "bg-success" : "bg-brand"}`} style={{ width: `${stats.pct}%` }} />
              </div>
            </div>
          )}
          {stats.started && target ? (
            <Link href={lesson} className="btn w-full">
              <Icon name="play" className="h-3.5 w-3.5" fill />
              {stats.completed ? "Buka Lagi" : "Lanjutkan Belajar"} ({stats.done}/{stats.total})
            </Link>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Link href={detail} className="inline-flex items-center justify-center rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200">
                Lihat Kurikulum
              </Link>
              <Link href={start} className="btn">
                Mulai Modul
                <Icon name="arrow" className="h-3.5 w-3.5" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
