import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { getSettings } from "@/lib/settings";
import { CatalogSection } from "@/components/catalog-section";
import { Icon, type IconName } from "@/components/icons";
import { readFlash, type SearchParams } from "@/lib/flash";

export default async function HomePage({ searchParams }: { searchParams: SearchParams }) {
  const { pick } = await readFlash(searchParams);
  const [s, user] = await Promise.all([getSettings(), getCurrentUser()]);
  const programs: { label: string; note: string; slug: string; icon: IconName; color: string }[] = [
    { label: "Pre-Clinical", note: "Fondasi ilmu kedokteran", slug: "pre-clinical", icon: "book", color: "bg-sky-50 text-sky-800" },
    { label: "Clinical Practice", note: "Pembelajaran praktik klinis", slug: "clinical-practice", icon: "shield", color: "bg-indigo-50 text-indigo-800" },
    { label: "Medical Research", note: "Riset dan penulisan ilmiah", slug: "medical-research", icon: "trending", color: "bg-teal-50 text-teal-800" },
  ];
  return (
    <>
      <section className="border-b border-slate-200 bg-white">
        <div className="container-page grid items-center gap-10 py-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:py-16">
          <div>
            <p className="eyebrow">{s.siteName}</p>
            <h1 className="mt-4 max-w-2xl text-[2.15rem] font-semibold leading-[1.14] tracking-tight text-slate-900 sm:text-5xl">{s.heroTitle}</h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600">{s.heroSubtitle}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="#katalog" className="btn px-5">Jelajahi kelas <Icon name="arrow" /></Link>
              <Link href="/rekomendasi" className="btn-secondary px-5"><Icon name="sparkles" /> Bantu pilih kelas</Link>
            </div>
            <p className="mt-5 flex items-center gap-2 text-xs leading-relaxed text-slate-500"><Icon name="checkCircle" className="h-4 w-4 text-brand" />Belajar bertahap, pantau progres dari akun Anda.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-7">
            <div className="mb-5 flex items-center justify-between gap-4"><p className="eyebrow">Ruang untuk berkembang</p><Icon name="cap" className="h-6 w-6 text-brand" /></div>
            <h2 className="text-2xl font-semibold text-slate-900">Di setiap tahap perjalanan Anda.</h2>
            <div className="mt-6 space-y-3">
              {programs.map((p) => <Link key={p.slug} href={`/kelas?program=${p.slug}`} className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-sky-300"><span className={`grid h-11 w-11 shrink-0 place-items-center rounded-lg ${p.color}`}><Icon name={p.icon} className="h-5 w-5" /></span><span className="min-w-0 flex-1"><span className="block text-sm font-semibold text-slate-900">{p.label}</span><span className="mt-1 block text-xs text-slate-500">{p.note}</span></span><Icon name="arrow" className="h-4 w-4 text-slate-400 group-hover:text-brand" /></Link>)}
            </div>
          </div>
        </div>
      </section>
      <div className="container-page py-12 sm:py-16"><CatalogSection user={user} program={pick("program")} basePath="/" /></div>
      <section className="border-y border-slate-200 bg-white">
        <div className="container-page py-12"><p className="eyebrow">Langkah berikutnya</p><h2 className="mt-2 text-2xl font-semibold">Mulai dari kelas yang Anda butuhkan.</h2>
          <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {[["01", "Temukan kelas", "Jelajahi katalog atau gunakan rekomendasi kelas."], ["02", "Lihat kurikulum", "Periksa topik dan ketersediaan materi gratis."], ["03", "Pilih akses", "Pelajari pilihan layanan dan ketentuannya."], ["04", "Mulai belajar", "Buka materi dan pantau progres dari akun Anda."]].map(([n, title, text]) => <div key={n} className="border-t border-slate-200 pt-5"><span className="num text-sm text-brand">{n}</span><h3 className="mt-3 font-semibold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p></div>)}
          </div>
        </div>
      </section>
    </>
  );
}
