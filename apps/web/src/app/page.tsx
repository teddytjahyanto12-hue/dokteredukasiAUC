import Image from "next/image";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { getSettings } from "@/lib/settings";
import { db } from "@/lib/db";
import { CatalogSection } from "@/components/catalog-section";
import { AnnouncementBanner } from "@/components/announcement-banner";
import { Icon, type IconName } from "@/components/icons";
import { readFlash, type SearchParams } from "@/lib/flash";

export default async function HomePage({ searchParams }: { searchParams: SearchParams }) {
  const { pick } = await readFlash(searchParams);
  const [s, user, tracks] = await Promise.all([getSettings(), getCurrentUser(), db.track.findMany({ where: { published: true }, orderBy: { order: "asc" }, select: { slug: true, title: true } })]);
  const notes = new Map(s.homeProgramNotes.split("\n").map((line) => line.split("|").map((x) => x.trim())).filter((x) => x.length >= 2).map(([slug, note]) => [slug, note]));
  const steps = s.homeSteps.split("\n").map((line) => line.split("|").map((x) => x.trim())).filter((x) => x.length >= 2).slice(0, 4);
  const programs: { label: string; note: string; slug: string; icon: IconName; color: string }[] = [
    { label: tracks.find((t) => t.slug === "pre-clinical")?.title ?? "Pre-Clinical", note: notes.get("pre-clinical") ?? "", slug: "pre-clinical", icon: "book", color: "bg-mascot text-ink" },
    { label: tracks.find((t) => t.slug === "ukmppd")?.title ?? "UKMPPD", note: notes.get("ukmppd") ?? "Persiapan ujian kompetensi dokter", slug: "ukmppd", icon: "cap", color: "bg-mascot text-ink" },
    { label: tracks.find((t) => t.slug === "clinical-practice")?.title ?? "Clinical Practice", note: notes.get("clinical-practice") ?? "", slug: "clinical-practice", icon: "shield", color: "bg-mascot text-ink" },
    { label: tracks.find((t) => t.slug === "medical-research")?.title ?? "Medical Research", note: notes.get("medical-research") ?? "", slug: "medical-research", icon: "trending", color: "bg-mascot text-ink" },
  ];
  return (
    <>
      <AnnouncementBanner />
      <section className="academy-hero border-b border-slate-200">
        <div className="container-page academy-hero-grid">
          <div className="academy-hero-copy">
            <p className="eyebrow">{s.siteName}</p>
            <h1 className="mt-4 max-w-2xl text-[2.15rem] font-extrabold leading-[1.14] tracking-tight text-slate-900 sm:text-5xl xl:text-[2.75rem]">{s.heroTitle}</h1>
            <p className="mt-5 max-w-xl whitespace-pre-line text-base leading-relaxed text-slate-600">{s.heroSubtitle}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="#katalog" className="btn px-5">Jelajahi kelas <Icon name="arrow" /></Link>
            </div>
            <p className="mt-5 flex items-center gap-2 text-xs leading-relaxed text-slate-500"><Icon name="checkCircle" className="h-4 w-4 text-brand" />Belajar bertahap, pantau progres dari akun.</p>
          </div>
          <div className="academy-mascot" aria-hidden="true"><Image src="/brand/mascot-cutout.png" alt="" width={1024} height={1024} priority /></div>
          <div className="academy-journey rounded-2xl border border-slate-300 bg-white p-5 sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-4"><p className="eyebrow">{s.homeJourneyEyebrow}</p><Icon name="cap" className="h-6 w-6 text-brand" /></div>
            <h2 className="text-2xl font-semibold text-slate-900">{s.homeJourneyTitle}</h2>
            <div className="mt-6 space-y-3">
              {programs.map((p) => <Link key={p.slug} href={`/kelas?program=${p.slug}`} className="journey-option group flex items-center gap-3 rounded-xl border border-slate-300 bg-white p-4 transition hover:border-ink"><span className={`grid h-11 w-11 shrink-0 place-items-center rounded-lg ${p.color}`}><Icon name={p.icon} className="h-5 w-5" /></span><span className="min-w-0 flex-1"><span className="block text-sm font-semibold text-slate-900">{p.label}</span><span className="mt-1 block text-xs text-slate-500">{p.note}</span></span><Icon name="arrow" className="h-6 w-6 shrink-0 rounded-md bg-slate-100 p-1 text-ink group-hover:bg-mascot" /></Link>)}
            </div>
          </div>
        </div>
      </section>
      <div className="container-page py-12 sm:py-16"><CatalogSection user={user} program={pick("program")} basePath="/" /></div>
      <section className="border-y border-slate-200 bg-white">
        <div className="container-page py-12"><p className="eyebrow">{s.homeStepsEyebrow}</p><h2 className="mt-2 text-2xl font-semibold">{s.homeStepsTitle}</h2>
          <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(([title, text], i) => <div key={`${title}-${i}`} className="border-t border-slate-200 pt-5"><span className="num text-sm text-brand">{String(i + 1).padStart(2, "0")}</span><h3 className="mt-3 font-semibold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p></div>)}
          </div>
        </div>
      </section>
    </>
  );
}
