import Link from "next/link";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { accessibleCategoryIds, canOpen } from "@/lib/access";
import { getSettings } from "@/lib/settings";
import { courseStats, doneItemIds, loadCourses } from "@/lib/courses";
import { loadPaths } from "@/lib/paths";
import { duitkuConfigured } from "@/lib/duitku";
import { rupiah } from "@/lib/format";
import { startingPrice } from "@/lib/services";
import { CourseCard } from "@/components/course-card";

export const metadata = { title: "Penawaran" };

export default async function OfferPage() {
  const user = await getCurrentUser();
  const [s, courses, paths, packages, testimonials, faqs, allowed, done] = await Promise.all([
    getSettings(),
    loadCourses(),
    loadPaths(),
    db.package.findMany({
      where: { active: true },
      orderBy: { order: "asc" },
      include: { durations: { where: { active: true } }, addons: true, benefits: { orderBy: { order: "asc" }, take: 4 } },
    }),
    db.testimonial.findMany({ where: { published: true }, orderBy: { order: "asc" } }),
    db.faq.findMany({ where: { published: true }, orderBy: { order: "asc" } }),
    accessibleCategoryIds(user),
    doneItemIds(user?.id),
  ]);
  // Keunggulan: satu baris satu poin, format "Judul | penjelasan".
  const benefits = s.offerBenefits
    .split("\n")
    .map((l) => l.split("|").map((x) => x.trim()))
    .filter(([t]) => t);
  const stats = courses.map((c) => {
    const open = !!user && canOpen(allowed, c.id);
    return { c, open, st: courseStats(c, done, open) };
  });
  const lessonCount = stats.reduce((n, x) => n + x.st.total, 0);
  const freeCount = stats.reduce((n, x) => n + x.st.free, 0);
  // Kelas dengan materi gratis ditampilkan lebih dulu.
  const featured = [...stats].sort((a, b) => Number(b.st.free > 0) - Number(a.st.free > 0)).slice(0, 6);
  const priced = packages.filter((p) => startingPrice(p) !== null);
  const installment = packages.some((p) => p.allowInstallment);

  return (
    <>
      <section className="border-b border-slate-200 bg-white">
        <div className="container-page py-14 sm:py-20">
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-6xl">{s.offerTitle}</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">{s.offerSubtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={user ? "/kelas" : "/daftar?next=/kelas"} className="btn">
              {freeCount > 0 ? "Coba materi gratis" : "Lihat kelas"}
            </Link>
            <Link href="#harga" className="btn-secondary">
              Lihat pilihan & harga
            </Link>
          </div>
          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 text-sm text-slate-600">
            <div>
              <dt>Kelas</dt>
              <dd className="num text-3xl font-medium text-slate-900">{courses.length}</dd>
            </div>
            <div>
              <dt>Materi</dt>
              <dd className="num text-3xl font-medium text-slate-900">{lessonCount}</dd>
            </div>
            {freeCount > 0 && (
              <div>
                <dt>Materi contoh gratis</dt>
                <dd className="num text-3xl font-medium text-slate-900">{freeCount}</dd>
              </div>
            )}
            {paths.length > 0 && (
              <div>
                <dt>Jalur belajar</dt>
                <dd className="num text-3xl font-medium text-slate-900">{paths.length}</dd>
              </div>
            )}
          </dl>
        </div>
      </section>

      {benefits.length > 0 && (
        <section className="container-page py-12">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Yang Anda dapatkan</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(([title, text]) => (
              <div key={title} className="card">
                <h3 className="font-semibold text-slate-900">{title}</h3>
                {text && <p className="mt-1 text-sm text-slate-600">{text}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {featured.length > 0 && (
        <section className="container-page py-12">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Kelas pilihan</h2>
            <Link href="/kelas" className="link text-sm">
              Semua kelas →
            </Link>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map(({ c, open, st }) => (
              <CourseCard key={c.id} course={c} open={open} stats={st} />
            ))}
          </div>
        </section>
      )}

      {paths.length > 0 && (
        <section className="container-page py-12">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Tahu harus mulai dari mana</h2>
            <Link href="/jalur" className="link text-sm">
              Semua jalur belajar →
            </Link>
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {paths.slice(0, 3).map((p) => (
              <Link key={p.id} href={`/jalur/${p.slug}`} className="card transition hover:shadow-md">
                <span className="badge">{p.steps.length} kelas</span>
                <h3 className="mt-2 font-semibold text-slate-900">{p.title}</h3>
                {p.summary && <p className="mt-1 text-sm text-slate-600">{p.summary}</p>}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section id="harga" className="border-y border-slate-200 bg-white">
        <div className="container-page py-12">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Pilihan layanan & harga</h2>
          <p className="mt-1 text-slate-600">Pilih sesuai kebutuhan. Rincian masa belajar dan add-on ada di halaman tiap layanan.</p>
          {priced.length === 0 ? (
            <p className="mt-6 text-sm text-slate-500">
              Harga sedang disiapkan.{" "}
              <Link href="/paket" className="link">
                Lihat daftar layanan
              </Link>
              .
            </p>
          ) : (
            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {priced.map((p) => (
                <div key={p.id} className="card flex flex-col">
                  <h3 className="font-semibold text-slate-900">{p.name}</h3>
                  {p.summary && <p className="mt-1 text-sm text-slate-600">{p.summary}</p>}
                  <p className="num mt-3 text-xl font-medium text-slate-900">Mulai {rupiah(startingPrice(p))}</p>
                  <ul className="mt-3 flex-1 space-y-1 text-sm text-slate-700">
                    {p.benefits.map((b) => (
                      <li key={b.id} className="flex gap-2">
                        <span className="text-brand" aria-hidden>
                          ✓
                        </span>
                        {b.text}
                      </li>
                    ))}
                    {p.includesMentoring && <li className="text-slate-600">Termasuk bimbingan tutor</li>}
                    {p.allowInstallment && <li className="text-slate-600">Bisa dicicil</li>}
                  </ul>
                  <Link href={`/paket/${p.slug}`} className="btn mt-4 justify-center">
                    Lihat & pesan
                  </Link>
                </div>
              ))}
            </div>
          )}
          <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Cara pembayaran</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {duitkuConfigured() && <li>Bayar online (virtual account, QRIS, e-wallet) — akses langsung aktif.</li>}
              <li>Bayar manual: invoice dikirim ke WhatsApp admin, lalu admin memberi nomor rekening dan mengaktifkan akses Anda.</li>
              {installment && <li>Layanan tertentu bisa dicicil 2–3 kali.</li>}
            </ul>
          </div>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="container-page py-12">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Kata mereka</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.id} className="card">
                <blockquote className="text-sm text-slate-700">“{t.quote}”</blockquote>
                <figcaption className="mt-3 text-sm font-semibold text-slate-900">
                  {t.name}
                  {t.role && <span className="block text-xs font-normal text-slate-500">{t.role}</span>}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {faqs.length > 0 && (
        <section className="container-page max-w-3xl py-12">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Pertanyaan umum</h2>
          <div className="mt-6 space-y-2">
            {faqs.map((f) => (
              <details key={f.id} className="card py-3">
                <summary className="cursor-pointer font-medium text-slate-900">{f.question}</summary>
                <p className="mt-2 whitespace-pre-line text-sm text-slate-600">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      <section className="container-page py-14 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900">Mulai belajar hari ini</h2>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href={user ? "/kelas" : "/daftar?next=/kelas"} className="btn">
            {user ? "Buka kelas" : "Daftar gratis"}
          </Link>
          <Link href="/paket" className="btn-secondary">
            Lihat layanan
          </Link>
        </div>
      </section>
    </>
  );
}
