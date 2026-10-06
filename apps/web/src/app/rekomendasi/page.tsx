import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { accessibleCategoryIds, canOpen } from "@/lib/access";
import { courseStats, doneItemIds, lessonHref, loadCourses, studentCounts } from "@/lib/courses";
import { Icon } from "@/components/icons";
import { Pathfinder, type PathfinderCourse } from "@/components/pathfinder";

export const metadata = { title: "Tes Rekomendasi" };

// Tes rekomendasi: 4 pertanyaan → kelas yang paling sesuai dari kelas yang benar-benar ada,
// dengan skor kesesuaian berbasis aturan (bukan AI) dan roadmap 4 pekan dari topik kelas itu.
export default async function RecommendationPage() {
  const user = await getCurrentUser();
  const [courses, tracks, allowed, done] = await Promise.all([
    loadCourses(),
    db.track.findMany({ where: { published: true }, orderBy: { order: "asc" }, select: { slug: true, title: true, description: true, hasMentoring: true } }),
    accessibleCategoryIds(user),
    doneItemIds(user?.id),
  ]);
  const students = await studentCounts(courses);
  const mentoring = new Map(tracks.map((t) => [t.slug, t.hasMentoring]));
  const data: PathfinderCourse[] = courses.map((c) => {
    const open = !!user && canOpen(allowed, c.id);
    const st = courseStats(c, done, open);
    const target = st.next ?? st.first;
    const lesson = target && (open || st.free > 0) ? lessonHref(target) : `/kelas/${c.id}`;
    return {
      id: c.id,
      title: c.title,
      description: c.description,
      trackSlug: c.track.slug,
      trackTitle: c.track.title,
      hasMentoring: mentoring.get(c.track.slug) ?? false,
      topics: c.topics.map((t) => t.title),
      lessons: st.total,
      quizzes: st.quizzes,
      hasVideo: c.topics.some((t) => t.items.some((i) => i.type === "VIDEO")),
      free: st.free,
      posterFileId: c.posterFileId,
      durationText: c.durationText,
      students: students.get(c.id)?.total ?? 0,
      startHref: user || lesson.startsWith("/kelas") ? lesson : `/masuk?next=${encodeURIComponent(lesson)}`,
    };
  });

  return (
    <div className="container-page py-12">
      <header className="mx-auto max-w-3xl text-center">
        <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-brand">
          <Icon name="sparkles" className="h-4 w-4 text-amber-500" />
          Sistem Rekomendasi Personal
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Temukan Jalur Pembelajaran Medis Sesuai Kebutuhan Anda</h1>
        <p className="mt-4 text-lg text-slate-600">Jawab 4 pertanyaan singkat untuk mendapatkan rekomendasi kelas dan roadmap langkah demi langkah yang dipersonalisasi.</p>
      </header>
      <div className="mt-12">
        <Pathfinder courses={data} tracks={tracks.map(({ slug, title, description }) => ({ slug, title, description }))} />
      </div>
    </div>
  );
}
