import Link from "next/link";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { getSettings } from "@/lib/settings";
import { CatalogSection } from "@/components/catalog-section";
import { Icon, type IconName } from "@/components/icons";
import { readFlash, type SearchParams } from "@/lib/flash";

const BENEFIT_ICONS: IconName[] = ["play", "file", "checkCircle", "users"];

export default async function HomePage({ searchParams }: { searchParams: SearchParams }) {
  const { pick } = await readFlash(searchParams);
  const [s, user, courseCount, lessonCount, buyers, bases, poster] = await Promise.all([
    getSettings(),
    getCurrentUser(),
    db.category.count({ where: { published: true, track: { published: true } } }),
    db.item.count({ where: { published: true, type: { not: "LINK" }, topic: { published: true, category: { published: true } } } }),
    db.entitlement.findMany({ where: { revokedAt: null, user: { role: "STUDENT" } }, distinct: ["userId"], select: { userId: true } }),
    db.category.aggregate({ where: { published: true }, _sum: { studentBase: true } }),
    db.category.findFirst({ where: { published: true, posterFileId: { not: null } }, orderBy: { order: "asc" }, select: { posterFileId: true } }),
  ]);
  // Poin keunggulan diambil dari Pengaturan situs (format "Judul | penjelasan"); yang tampil hanya judulnya.
  const benefits = s.offerBenefits
    .split("\n")
    .map((l) => l.split("|")[0].trim())
    .filter(Boolean)
    .slice(0, 4);
  // Angka di bawah ini dihitung dari data website, bukan angka promosi.
  const students = (bases._sum.studentBase ?? 0) + buyers.length;
  const stats = [
    [courseCount.toLocaleString("id-ID"), "Kelas tersedia"],
    [lessonCount.toLocaleString("id-ID"), "Materi belajar"],
    ...(students > 0 ? [[`${students.toLocaleString("id-ID")}`, "Dokter & mahasiswa"]] : []),
  ];

  return (
    <>
      <section className="border-b border-slate-200 bg-white">
        <div className="container-page grid items-center gap-10 py-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:py-20">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-brand">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
              {s.siteName}
            </p>
            <h1 className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.4rem]">{s.heroTitle}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">{s.heroSubtitle}</p>

            {benefits.length > 0 && (
              <ul className="mt-7 grid gap-x-8 gap-y-3 text-sm text-slate-700 sm:grid-cols-2">
                {benefits.map((b, i) => (
                  <li key={b} className="flex items-center gap-2.5">
                    <Icon name={BENEFIT_ICONS[i % BENEFIT_ICONS.length]} className="h-4 w-4 text-brand" />
                    {b}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/rekomendasi" className="btn px-5 py-3">
                <Icon name="sparkles" className="h-4 w-4" />
                Ikuti Tes Rekomendasi Belajar
                <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <Link href="#katalog" className="btn-secondary px-5 py-3">
                Jelajahi Katalog Kursus
              </Link>
            </div>

            <dl className="mt-10 flex flex-wrap gap-y-4 border-t border-slate-200 pt-6">
              {stats.map(([value, label], i) => (
                <div key={label} className={`pr-8 ${i > 0 ? "border-l border-slate-200 pl-8" : ""}`}>
                  <dd className="num text-xl font-semibold text-slate-900">{value}</dd>
                  <dt className="mt-0.5 text-xs text-slate-500">{label}</dt>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-700 to-slate-900">
            {poster?.posterFileId && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={`/api/berkas/${poster.posterFileId}`} alt="" className="aspect-[6/5] w-full object-cover" />
            )}
            <div className={`${poster?.posterFileId ? "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent pt-16" : "flex aspect-[6/5] flex-col justify-end"} p-6`}>
              <p className="text-xs font-medium text-sky-200">Pre-Klinik · Stase Klinik · Riset Ilmiah</p>
              <p className="mt-1.5 text-xl font-semibold text-white">Modul Pembelajaran Klinis & Riset Kedokteran</p>
              <p className="mt-1.5 max-w-md text-sm leading-relaxed text-slate-200">Dilengkapi pemutar video, materi PDF ringkasan, latihan soal, dan pemantauan progres belajar mandiri.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container-page py-12">
        <CatalogSection user={user} program={pick("program")} basePath="/" />
      </div>

      <section className="border-y border-slate-200 bg-white">
        <div className="container-page grid gap-8 py-14 md:grid-cols-4">
          {[
            ["1", "Daftar akun", "Buat akun murid di website."],
            ["2", "Pilih kelas atau layanan", "Coba materi contoh gratis, lalu pilih layanan yang sesuai."],
            ["3", "Bayar", "Bayar online atau kirim invoice ke WhatsApp admin."],
            ["4", "Mulai belajar", "Akses materi, quiz, dan jadwal bimbingan dari dashboard."],
          ].map(([n, title, text]) => (
            <div key={n}>
              <span className="num grid h-9 w-9 place-items-center rounded-full bg-brand font-semibold text-white">{n}</span>
              <h3 className="mt-3 font-semibold text-slate-900">{title}</h3>
              <p className="mt-1 text-sm text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
