import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { REVIEW_SECTIONS } from "@/lib/medical-review";
import { ArticleText } from "@/components/article-text";

type Props = { params: Promise<{ slug: string }> };

const fullDate = (d: Date | null) => (d ? new Intl.DateTimeFormat("id-ID", { dateStyle: "long", timeZone: "Asia/Jakarta" }).format(d) : "-");

async function load(slug: string) {
  const r = await db.medicalReview.findUnique({ where: { slug } });
  return r?.published ? r : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = await load((await params).slug);
  if (!r) return { title: "Tinjauan Medis" };
  return { title: r.title, description: r.abstract?.replace(/^[-•]\s+/gm, "").slice(0, 160) ?? undefined };
}

// Artikel gaya jurnal: header di tengah, kotak abstrak, batang tubuh bertahap, pustaka kecil di bawah.
export default async function MedicalReviewArticle({ params }: Props) {
  const r = await load((await params).slug);
  if (!r) notFound();
  const sections = REVIEW_SECTIONS.filter((s) => r[s.key]);
  return (
    <article className="container-page py-10 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <Link href="/tinjauan-medis" className="text-sm text-slate-500 hover:text-slate-900">
          ← Semua Tinjauan Medis
        </Link>
        <header className="mt-6 border-b border-slate-200 pb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
            {r.category ? `${r.category} | ` : ""}Tinjauan Medis
          </p>
          <h1 className="mt-4 font-serif text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">{r.title}</h1>
          <p className="mt-4 text-sm text-slate-600">
            {r.author && (
              <>
                Oleh: <span className="font-semibold text-slate-800">{r.author}</span> |{" "}
              </>
            )}
            Diterbitkan: {fullDate(r.publishedAt)}
          </p>
        </header>

        {r.abstract && (
          <section aria-labelledby="abstrak" className="mt-8 rounded-2xl border border-sky-100 bg-sky-50/70 p-5 sm:p-6">
            <h2 id="abstrak" className="text-sm font-bold uppercase tracking-wide text-sky-900">Abstract</h2>
            <ArticleText text={r.abstract} className="mt-3 text-[15px] leading-relaxed text-slate-800" />
          </section>
        )}

        <div className="mt-10 space-y-10 font-serif text-[17px] leading-[1.8] text-slate-800">
          {sections.map((s) => (
            <section key={s.key} aria-labelledby={`bag-${s.key}`}>
              <h2 id={`bag-${s.key}`} className="mb-3 font-sans text-xl font-bold text-slate-900">{s.label}</h2>
              <ArticleText text={r[s.key]!} />
            </section>
          ))}
        </div>

        {r.references && (
          <section aria-labelledby="pustaka" className="mt-12 border-t border-slate-200 pt-6">
            <h2 id="pustaka" className="text-sm font-bold uppercase tracking-wide text-slate-700">Daftar Pustaka</h2>
            <ArticleText text={r.references.split("\n").filter((l) => l.trim()).join("\n")} className="mt-3 break-words text-xs leading-relaxed text-slate-600" />
          </section>
        )}
      </div>
    </article>
  );
}
