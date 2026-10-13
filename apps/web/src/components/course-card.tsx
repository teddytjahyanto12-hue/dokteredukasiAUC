import Link from "next/link";
import { lessonHref, muridLabel, type Course } from "@/lib/courses";
import { Icon } from "@/components/icons";
import { CourseArt } from "@/components/course-art";

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
  const hasResources = course.topics.some((t) => t.items.length > 0 || t.quiz?.published);
  const target = stats.next ?? stats.first;
  // Tamu diarahkan login dulu; materi gratis tetap wajib login.
  // Belum membeli & tanpa materi gratis: tetap masuk ke ruang belajar; materi pertama tampil terkunci dengan ajakan membeli.
  const firstAny = course.topics.flatMap((t) => t.items.filter((i) => i.type !== "LINK").map((i) => ({ id: i.id, topicId: t.id })))[0];
  const firstFree = course.topics.flatMap(t => t.items.filter(i => i.type !== "LINK" && i.isFree).map(i => ({ id: i.id, topicId: t.id })))[0];
  const freeHref = firstFree ? (loggedIn ? lessonHref(firstFree) : `/masuk?next=${encodeURIComponent(lessonHref(firstFree))}`) : detail;
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
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:border-mascot">
      <Link href={detail} className="relative block" aria-label={`Lihat kelas ${course.title}`}>
        {course.posterFileId ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={`/api/berkas/${course.posterFileId}`} alt="" className="aspect-[16/9] w-full object-cover" />
        ) : (
          <div className="aspect-[16/9]"><CourseArt title={course.title} program={course.track.slug} art={course.artKey} /></div>
        )}

      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs"><span className="font-semibold text-brand">{course.track.title}</span>{!hasResources && <span className="text-slate-500">Segera hadir</span>}</div>
        {meta.length > 0 && <p className="mt-2 text-xs text-slate-500">{meta.join("  ·  ")}</p>}
        {course.code && <p className="num mt-2 text-xs font-semibold text-brand">{course.code}</p>}
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

        {hasResources ? <dl className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-slate-100 pt-4">
          {[
            course.children.length ? [course.children.length, (course.childLabel || "Blok").toLowerCase()] : [course.topics.length, "topik"],
            [stats.total, "materi"],
            [stats.quizzes, "kuis"],
          ].filter(([n]) => Number(n) > 0).map(([n, unit]) => (
            <div key={unit} className="flex gap-1 text-sm text-slate-700">
              <dt className="order-2">{unit}</dt><dd className="num font-semibold">{n}</dd>
            </div>
          ))}
        </dl> : <p className="mt-4 border-t border-slate-100 pt-4 text-sm text-slate-500">Materi kelas sedang disiapkan.</p>}

        <div className="mt-auto pt-4">
          {stats.started && (
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Progres Belajar</span>
                <span className="num font-semibold text-brand">{stats.pct}%</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div className={`h-full rounded-full ${stats.pct === 100 ? "bg-success" : "bg-mascot"}`} style={{ width: `${stats.pct}%` }} />
              </div>
            </div>
          )}
          {course.children.length > 0 && !(stats.started && target) ? (
            // Kelas induk berisi Blok: arahkan ke halaman kelas untuk melihat kurikulum Blok.
            <div className="flex flex-col gap-3">
              <Link href={detail} className="btn w-full">
                Lihat Kelas
                <Icon name="arrow" className="h-3.5 w-3.5" />
              </Link>
              {startAt && !open && stats.free > 0 && <a href={freeHref} className="py-1 text-center text-sm font-medium text-slate-600 hover:text-brand">Coba materi gratis</a>}
            </div>
          ) : stats.started && target ? (
            <Link href={lesson} className="btn w-full">
              <Icon name="play" className="h-3.5 w-3.5" fill />
              {stats.completed ? "Buka Lagi" : "Lanjutkan Belajar"} ({stats.done}/{stats.total})
            </Link>
          ) : (
            <div className="flex flex-col gap-3">
              {startAt && stats.free > 0 && !open ? <a href={freeHref} className="btn w-full">Coba materi gratis<Icon name="arrow" className="h-3.5 w-3.5" /></a> : <Link href={startAt ? start : detail} className={startAt ? "btn w-full" : "btn-secondary w-full"}>{startAt ? "Mulai belajar" : "Lihat kelas"}<Icon name="arrow" className="h-3.5 w-3.5" /></Link>}
              {startAt && <Link href={detail} className="py-1 text-center text-sm font-medium text-slate-600 hover:text-brand">Lihat kurikulum</Link>}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

