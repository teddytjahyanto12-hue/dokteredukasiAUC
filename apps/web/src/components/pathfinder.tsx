"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Icon, type IconName } from "@/components/icons";
import { CourseArt } from "@/components/course-art";

export type PathfinderCourse = {
  id: string;
  title: string;
  description: string | null;
  trackSlug: string;
  trackTitle: string;
  topics: string[];
  lessons: number;
  quizzes: number;
  hasVideo: boolean;
  free: number;
  posterFileId: string | null;
  durationText: string | null;
  students: number;
  startHref: string;
};
export type PathfinderTrack = { slug: string; title: string; description: string | null };

const STAGES = [
  ["preklinik", "Mahasiswa Pre-Klinik (S.Ked)"],
  ["koas", "Dokter Muda / Koas"],
  ["dokter", "Dokter Umum / Puskesmas / IGD"],
  ["residen", "Residen / Peneliti Kedokteran"],
] as const;
// Program yang paling dekat dengan tiap jenjang (dipakai sebagai nilai tambah, bukan penentu).
const STAGE_TRACK: Record<string, string> = { preklinik: "pre-clinical", koas: "clinical-practice", dokter: "clinical-practice", residen: "medical-research" };
const HOURS = [
  ["santai", "1 – 3 Jam", "Santai & Mandiri"],
  ["bertahap", "4 – 7 Jam", "Ideal Bertahap"],
  ["intensif", "8+ Jam", "Intensif Cepat"],
] as const;
const FORMATS = [
  ["video", "Video + PDF Handout"],
  ["quiz", "Latihan soal & kuis"],
] as const;

function Choice({ active, onClick, children, className = "" }: { active: boolean; onClick: () => void; children: React.ReactNode; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex w-full items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left text-sm transition ${
        active ? "border-brand bg-brand-soft text-slate-900" : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
      } ${className}`}
    >
      <span className="min-w-0">{children}</span>
      {active && <Icon name="check" className="h-4 w-4 text-brand" />}
    </button>
  );
}

function Question({ n, icon, title, children }: { n: number; icon: IconName; title: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="flex items-center gap-2.5 text-base font-semibold text-slate-900">
        <Icon name={icon} className="h-5 w-5 text-brand" />
        {n}. {title}
      </legend>
      <div className="mt-3">{children}</div>
    </fieldset>
  );
}

export function Pathfinder({ courses, tracks, copy }: { courses: PathfinderCourse[]; tracks: PathfinderTrack[]; copy: { disclaimer: string; empty: string } }) {
  const [stage, setStage] = useState<string>("");
  const [target, setTarget] = useState<string>("");
  const [hours, setHours] = useState<string>("");
  const [format, setFormat] = useState<string>("");
  const answered = [stage, target, hours, format].filter(Boolean).length;

  const result = useMemo(() => {
    if (!stage || !target || !hours || !format) return null;
    const available = courses.filter((c) => c.lessons > 0 || c.quizzes > 0);
    if (!available.length) return null;
    const scored = available.map((c) => {
      const reasons: string[] = [];
      let score = 40;
      if (c.trackSlug === target) {
        score += 35;
        reasons.push(`termasuk program ${c.trackTitle} yang dipilih sebagai target`);
      }
      if (STAGE_TRACK[stage] === c.trackSlug) {
        score += 12;
        reasons.push(`sesuai dengan jenjang ${STAGES.find(([k]) => k === stage)?.[1]}`);
      }
      if (format === "video" && c.hasVideo) {
        score += 6;
        reasons.push("menyediakan materi video");
      }
      if (format === "quiz" && c.quizzes > 0) {
        score += 8;
        reasons.push(`memiliki ${c.quizzes} kuis latihan`);
      }
      if (c.lessons > 0) score += 5;
      return { c, score: Math.min(98, score), reasons };
    });
    scored.sort((a, b) => b.score - a.score || b.c.lessons - a.c.lessons);
    const best = scored[0];
    // Roadmap 4 pekan: topik kelas dibagi rata; pekan tanpa topik diisi pengulangan mandiri.
    const per = Math.max(1, Math.ceil(best.c.topics.length / 4));
    const weeks = [0, 1, 2, 3].map((w) => best.c.topics.slice(w * per, (w + 1) * per).join(" · ") || (w === 3 ? "Ulang materi & kerjakan ulang kuis" : "Pendalaman & latihan mandiri"));
    return { ...best, weeks, others: scored.slice(1, 3) };
  }, [stage, target, hours, format, courses]);

  const pace = HOURS.find(([k]) => k === hours);

  return (
    <div className="grid items-start gap-8 lg:grid-cols-2">
      <form className="space-y-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8" onSubmit={(e) => e.preventDefault()}>
        <div className="border-b border-slate-100 pb-5">
          <div className="flex items-center justify-between gap-3 text-sm"><p className="font-semibold text-slate-900">Preferensi belajar</p><span className="text-slate-500" aria-live="polite">{answered} dari 4 terisi</span></div>
          <progress className="mt-3 h-1.5 w-full accent-[#7a5a00]" value={answered} max={4} aria-label="Kelengkapan preferensi" />
        </div>
        <Question n={1} icon="cap" title="Jenjang Pendidikan Medis Saat Ini">
          <div className="grid gap-3 sm:grid-cols-2">
            {STAGES.map(([k, label]) => (
              <Choice key={k} active={stage === k} onClick={() => setStage(k)}>
                {label}
              </Choice>
            ))}
          </div>
        </Question>

        <Question n={2} icon="target" title="Target Pencapaian Utama">
          <div className="space-y-3">
            {tracks.map((t) => (
              <Choice key={t.slug} active={target === t.slug} onClick={() => setTarget(t.slug)}>
                <span className="block font-semibold text-slate-900">{t.title}</span>
                {t.description && <span className="mt-0.5 block text-sm text-slate-500">{t.description}</span>}
              </Choice>
            ))}
          </div>
        </Question>

        <Question n={3} icon="clock" title="Alokasi Waktu Belajar Setiap Pekan">
          <div className="grid grid-cols-3 gap-3">
            {HOURS.map(([k, label, note]) => (
              <button
                key={k}
                type="button"
                onClick={() => setHours(k)}
                aria-pressed={hours === k}
                className={`rounded-lg border px-2 py-3 text-center text-sm transition ${hours === k ? "border-brand bg-brand-soft" : "border-slate-200 hover:border-slate-300"}`}
              >
                <span className="num block font-semibold text-slate-900">{label}</span>
                <span className="mt-0.5 block text-xs text-slate-500">{note}</span>
              </button>
            ))}
          </div>
        </Question>

        <Question n={4} icon="book" title="Format Belajar Favorit">
          <div className="grid gap-3 sm:grid-cols-2">
            {FORMATS.map(([k, label]) => (
              <Choice key={k} active={format === k} onClick={() => setFormat(k)}>
                {label}
              </Choice>
            ))}
          </div>
        </Question>
      </form>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 lg:sticky lg:top-36" aria-live="polite">
        {!result ? (
          <div className="py-10 text-center">
            <Icon name="sparkles" className="mx-auto h-8 w-8 text-amber-500" />
            <p className="mt-3 font-semibold text-slate-900">Rekomendasi muncul di sini</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">{answered === 4 ? "Materi kelas sedang disiapkan. Jelajahi katalog untuk melihat pilihan program." : copy.empty}</p>
            {answered === 4 && <Link href="/kelas" className="btn-secondary mt-4">Lihat katalog</Link>}
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-brand">Pilihan kelas</p>
                <p className="mt-1 text-sm text-slate-500">Berdasarkan jenjang, target, dan format belajar yang dipilih</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="num text-4xl font-semibold leading-none text-brand">{result.score}%</p>
                <p className="mt-1 text-xs font-medium text-brand">Skor rekomendasi</p>
              </div>
            </div>

            <div className="mt-6 flex gap-5">
              {result.c.posterFileId ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={`/api/berkas/${result.c.posterFileId}`} alt="" className="h-28 w-36 shrink-0 rounded-lg object-cover" />
              ) : (
                <div className="hidden h-28 w-28 shrink-0 overflow-hidden rounded-lg sm:block"><CourseArt title={result.c.title} program={result.c.trackSlug} compact /></div>
              )}
              <div className="min-w-0">
                <p className="text-sm text-slate-500">{result.c.trackTitle}</p>
                <h2 className="mt-1 text-xl font-semibold leading-snug text-slate-900" style={{ fontFamily: "inherit" }}>
                  {result.c.title}
                </h2>
                {result.c.description && <p className="mt-1.5 line-clamp-2 text-sm text-slate-500">{result.c.description}</p>}
                <p className="mt-2 text-sm text-slate-500">
                  {[result.c.students ? `${result.c.students.toLocaleString("id-ID")} murid` : null, result.c.durationText, `${result.c.topics.length} topik`, `${result.c.lessons} materi`].filter(Boolean).join("  ·  ")}
                </p>
              </div>
            </div>

            <p className="mt-3 text-xs leading-relaxed text-slate-500">{copy.disclaimer}</p>
            <p className="mt-6 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-700">
              <span className="font-semibold text-slate-900">Mengapa kelas ini tepat:</span>{" "}
              {result.reasons.length ? `Kelas ini ${result.reasons.join(", ")}.` : "Ini kelas yang paling mendekati pilihan dari kelas yang tersedia saat ini."}
              {result.c.lessons === 0 && " Materinya masih disiapkan."}
            </p>

            <p className="mt-7 text-sm font-semibold uppercase tracking-[0.08em] text-slate-700">Usulan rencana belajar · 4 pekan</p>
            <p className="mt-1 text-xs text-slate-500">
              Ritme {pace?.[1].replace(/\s/g, "")} per pekan ({pace?.[2].toLowerCase()}).
            </p>
            <ol className="mt-3 space-y-2">
              {result.weeks.map((w, i) => (
                <li key={i} className="flex items-stretch rounded-lg border border-slate-200 bg-slate-50 text-sm">
                  <span className="w-24 shrink-0 border-r border-slate-200 px-3 py-3 font-semibold text-brand">Pekan {i + 1}</span>
                  <span className="min-w-0 px-4 py-3 text-slate-800">{w}</span>
                </li>
              ))}
            </ol>

            <div className="mt-7 flex flex-wrap gap-3 border-t border-slate-200 pt-6">
              <Link href={result.c.startHref} className="btn px-5 py-2.5">
                <Icon name="play" className="h-3.5 w-3.5" fill />
                Mulai belajar
              </Link>
              <Link href={`/kelas/${result.c.id}`} className="btn-secondary px-5 py-2.5">
                Lihat Kurikulum
              </Link>
            </div>

            {result.others.length > 0 && (
              <p className="mt-5 text-sm text-slate-500">
                Pilihan lain:{" "}
                {result.others.map((o, i) => (
                  <span key={o.c.id}>
                    {i > 0 && "  ·  "}
                    <Link href={`/kelas/${o.c.id}`} className="link">
                      {o.c.title}
                    </Link>{" "}
                    <span className="num">({o.score}%)</span>
                  </span>
                ))}
              </p>
            )}
          </>
        )}
      </section>
    </div>
  );
}
