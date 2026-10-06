import Link from "next/link";
import { db } from "@/lib/db";
import { getSettings } from "@/lib/settings";

const TRACK_ICON: Record<string, string> = {
  "pre-clinical": "🧬",
  "clinical-practice": "🩺",
  "medical-research": "📊",
};

export default async function HomePage() {
  const [s, tracks] = await Promise.all([
    getSettings(),
    db.track.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
      include: { categories: { where: { published: true }, orderBy: { order: "asc" }, select: { title: true } } },
    }),
  ]);

  return (
    <>
      <section className="border-b border-slate-200 bg-gradient-to-b from-brand-soft/60 to-background">
        <div className="container-page py-16 sm:py-24">
          <p className="badge-brand mb-4">{s.siteName}</p>
          <h1 className="max-w-3xl text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">{s.heroTitle}</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">{s.heroSubtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/penawaran" className="btn">
              Lihat penawaran
            </Link>
            <Link href="/kelas" className="btn-secondary">
              Jelajahi kelas
            </Link>
            <Link href="/daftar" className="btn-secondary">
              Daftar gratis
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <h2 className="text-2xl font-bold text-slate-900">Tiga program utama</h2>
        <p className="mt-1 text-slate-600">Pilih program sesuai tahap pendidikan dan kebutuhan Anda.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {tracks.map((t) => (
            <Link key={t.id} href={`/program/${t.slug}`} className="card flex flex-col transition hover:-translate-y-1 hover:shadow-md">
              <span className="text-3xl" aria-hidden>
                {TRACK_ICON[t.slug] ?? "📘"}
              </span>
              <h3 className="mt-3 text-xl font-bold text-slate-900">{t.title}</h3>
              <p className="mt-2 flex-1 text-sm text-slate-600">{t.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {t.categories.map((c) => (
                  <li key={c.title} className="badge">
                    {c.title}
                  </li>
                ))}
                {t.hasMentoring && <li className="badge-warn">+ Bimbingan tutor</li>}
              </ul>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="container-page grid gap-8 py-14 md:grid-cols-4">
          {[
            ["1", "Daftar akun", "Buat akun murid di website."],
            ["2", "Pilih paket", "Materi mandiri atau paket dengan bimbingan."],
            ["3", "Bayar", "Admin mengonfirmasi dan menghubungi via WhatsApp."],
            ["4", "Mulai belajar", "Akses materi, quiz, dan jadwal bimbingan dari dashboard."],
          ].map(([n, title, text]) => (
            <div key={n}>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-brand font-bold text-white">{n}</span>
              <h3 className="mt-3 font-semibold text-slate-900">{title}</h3>
              <p className="mt-1 text-sm text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-14">
        <div className="card flex flex-col items-start justify-between gap-4 bg-slate-900 text-white sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-bold">Ingin menjadi tutor?</h2>
            <p className="mt-1 text-sm text-slate-300">Terbuka untuk jalur Clinical Practice (spesialis), Preklinik, dan Research.</p>
          </div>
          <Link href="/gabung-tutor" className="btn bg-white text-slate-900 hover:bg-slate-100">
            Lihat alur seleksi
          </Link>
        </div>
      </section>
    </>
  );
}
