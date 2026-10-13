import { CoverBrand } from "@/components/cover-brand";
import Link from "next/link";
import { lessonHref, muridLabel } from "@/lib/courses";
import { Icon } from "@/components/icons";
import { CourseArt } from "@/components/course-art";

type LearningCourse = {
  id: string;
  code: string | null;
  title: string;
  description: string | null;
  posterFileId: string | null;
  artKey: string | null;
  parentId: string | null;
  childLabel: string | null;
  track: { slug: string; title: string };
  topics: unknown[];
  children: unknown[];
};

type Stats = {
  total: number;
  done: number;
  pct: number;
  quizzes: number;
  minutes: number;
  started: boolean;
  completed: boolean;
  next: { id: string; topicId: string } | null;
  first: { id: string; topicId: string } | null;
};

// Kartu kelas model katalog untuk dashboard murid: poster dengan label program, jumlah murid,
// judul & deskripsi, tiga angka ringkas (total menit materi, jumlah bab/blok, sesi), progres, dan tombol aksi.
// Rating/ulasan sengaja tidak ditampilkan sampai fitur ulasan murid tersedia.
export function LearningCard({ course, stats, open, students }: { course: LearningCourse; stats: Stats; open: boolean; students?: number }) {
  const detail = `/kelas/${course.id}`;
  const target = stats.next ?? stats.first;
  const units = course.children.length
    ? { n: course.children.length, label: course.childLabel || "Blok" }
    : { n: course.topics.length, label: course.parentId ? "Bab" : "Modul" };
  const sessions = stats.total + stats.quizzes;
  const cols: [string, string][] = [
    [stats.minutes ? `${stats.minutes.toLocaleString("id-ID")} Menit` : "-", "Durasi materi"],
    [`${units.n} ${units.label}`, "Bertahap"],
    [`${sessions} Sesi`, "Materi & Kuis"],
  ];

  return (
    <article className="academy-course-card flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:border-mascot">
      <Link href={detail} className="relative block" aria-label={`Lihat kelas ${course.title}`}>
        {course.posterFileId ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={`/api/berkas/${course.posterFileId}`} alt="" className="aspect-[16/9] w-full object-cover" />
        ) : (
          <div className="aspect-[16/9]">
            <CourseArt title={course.title} program={course.track.slug} art={course.artKey} />
          </div>
        )}
        <span className="absolute bottom-2 left-2 rounded-md bg-ink/80 px-2 py-1 text-xs font-semibold text-white">{course.track.title}</span>
        {open && <span className="absolute bottom-2 right-2 rounded-md bg-mascot px-2 py-1 text-xs font-semibold text-ink">Akses penuh</span>}
        {course.posterFileId && <CoverBrand />}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        {(course.code || !!students) && (
          <p className="text-xs text-slate-500">
            {course.code && <span className="num font-semibold text-brand">{course.code}</span>}
            {course.code && !!students ? " · " : ""}
            {!!students && muridLabel(students)}
          </p>
        )}
        <h3 className="mt-1 line-clamp-2 text-lg font-semibold leading-snug text-brand-dark">
          <Link href={detail} className="hover:underline">
            {course.title}
          </Link>
        </h3>
        {course.description && <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">{course.description}</p>}

        <dl className="mt-4 grid grid-cols-3 divide-x divide-slate-100 border-y border-slate-100 py-3 text-center">
          {cols.map(([value, label]) => (
            <div key={label} className="px-1">
              <dd className="text-sm font-semibold text-slate-900">{value}</dd>
              <dt className="text-xs text-slate-500">{label}</dt>
            </div>
          ))}
        </dl>

        <div className="mt-auto pt-4">
          {(open || stats.started) && stats.total > 0 && (
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
          {stats.started && target ? (
            <Link href={lessonHref(target)} className="btn w-full">
              <Icon name="play" className="h-3.5 w-3.5" fill />
              {stats.completed ? "Buka Lagi" : "Lanjutkan Belajar"} ({stats.done}/{stats.total})
            </Link>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <Link href={detail} className="btn-secondary px-2">
                Lihat Kurikulum
              </Link>
              {target ? (
                <Link href={lessonHref(target)} className="btn px-2">
                  Mulai Modul <Icon name="arrow" className="h-3.5 w-3.5" />
                </Link>
              ) : (
                <Link href={detail} className="btn px-2">
                  Lihat Kelas
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
