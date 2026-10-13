import Image from "next/image";
import { CoverBrand } from "@/components/cover-brand";
import { OrganGlyph } from "@/components/block-art";

// Ilustrasi vektor milik proyek untuk kelas yang belum memiliki poster. Blok memakai animasi organ (art).
// Warna mengikuti maskot: kuning, hitam, dan krem.
export function CourseArt({ title, program, art, compact = false }: { title: string; program: string; art?: string | null; compact?: boolean }) {
  const productCovers: Record<string, string> = {
    "Basic Medical Science": "/brand/covers/basic-medical-science-branded.png",
    "Medical E-books": "/brand/covers/medical-ebooks-branded.png",
    "Daftar Pustaka": "/brand/covers/daftar-pustaka-branded.png",
    "Clinical Guidelines": "/brand/covers/clinical-guidelines-branded.png",
    "Review": "/brand/covers/review-branded.png",
    "ECG Challenges": "/brand/covers/ecg-challenges-branded.png",
    "Medical Cheatsheet": "/brand/covers/medical-cheatsheet-branded.png",
    "Pengolahan Data": "/brand/covers/pengolahan-data-branded.png",
    "Multivariate": "/brand/covers/multivariate-branded.png",
    "Original Research": "/brand/covers/original-research-branded.png",
    "Case Report": "/brand/covers/case-report-branded.png",
    "Narrative Literature Review": "/brand/covers/narrative-literature-review-branded.png",
    "Univariate": "/brand/covers/univariate-branded.png",
    "Systematic Review and Meta-Analysis": "/brand/covers/systematic-review-meta-analysis-branded.png",
    "Scoping Review": "/brand/covers/scoping-review-branded.png",
    "Toolkit SR-MA: Template, Guideline & Prompt AI": "/brand/covers/toolkit-srma-branded.png",
    "Bibliometric Analysis": "/brand/covers/bibliometric-analysis-branded.png",
    "SPSS": "/brand/covers/spss-branded.png",
    "RStudio": "/brand/covers/rstudio-branded.png",
    "STATA": "/brand/covers/stata-branded.png",
    "Materi UKMPPD": "/brand/covers/new-materi-ukmppd.png",
    "Publikasi Jurnal Scopus": "/brand/covers/new-publikasi-scopus.png",
    "Latihan Soal UKMPPD": "/brand/covers/new-latihan-soal-ukmppd.png",
    "Quiz": "/brand/covers/new-quiz.png",
    "Bedah": "/brand/covers/new-bedah.png",
    "Bioetik": "/brand/covers/new-bioetik.png",
    "Bivariate": "/brand/covers/new-bivariate.png",
    "Dermatologi-Venerologi": "/brand/covers/new-dermatologi.png",
    "Forensik": "/brand/covers/new-forensik.png",
    "Publikasi Jurnal": "/brand/covers/new-publikasi-jurnal.png",
    "Endokrin": "/brand/covers/new-endokrin-ukmppd.png",
    "Hematologi Onkologi": "/brand/covers/new-hematologi-onkologi.png",
    "Gastroenterologi-Hepatic": "/brand/covers/new-gastro-hepatic.png",
    "Publikasi Jurnal SINTA": "/brand/covers/new-publikasi-sinta.png",
    "Ginekologi": "/brand/covers/new-ginekologi.png",
    "Kardiologi": "/brand/covers/new-kardiologi.png",
    "Pediatric": "/brand/covers/new-pediatric.png",
    "Obstetrik": "/brand/covers/new-obstetrik.png",
    "Mata": "/brand/covers/new-mata.png",
    "Psikiatri": "/brand/covers/new-psikiatri.png",
    "Tropis": "/brand/covers/new-tropis.png",
    "Public Health": "/brand/covers/new-public-health.png",
    "Nefrologi": "/brand/covers/new-nefrologi.png",
    "THT": "/brand/covers/new-tht.png",
    "Neurologi": "/brand/covers/new-neurologi.png",
  };
  const blockCovers: Record<string, string> = {
    "tulang": "/brand/covers/blok-tulang-v3.png",
    "histologi": "/brand/covers/blok-histologi-v3.png",
    "otot": "/brand/covers/blok-otot-v3.png",
    "ikm": "/brand/covers/blok-ikm-v3.png",
    "saraf-pembuluh": "/brand/covers/blok-saraf-pembuluh-v3.png",
    "fisiologi": "/brand/covers/blok-fisiologi-v3.png",
    "siklus-hidup": "/brand/covers/blok-siklus-hidup-v3.png",
    "hematologi": "/brand/covers/blok-hematologi-v3.png",
    "biokimia": "/brand/covers/blok-biokimia-v3.png",
    "imun": "/brand/covers/blok-imun-v3.png",
    "muskuloskeletal": "/brand/covers/blok-muskuloskeletal-v3.png",
    "kardio": "/brand/covers/blok-kardio-v3.png",
    "hepatobilier": "/brand/covers/blok-hepatobilier-v3.png",
    "respirasi": "/brand/covers/blok-respirasi-v3.png",
    "reproduksi": "/brand/covers/blok-reproduksi-v3.png",
    "urogenital": "/brand/covers/blok-urogenital-v3.png",
    "gastro": "/brand/covers/blok-gastro-v3.png",
    "endokrin": "/brand/covers/blok-endokrin-v3.png",
    "saraf-jiwa": "/brand/covers/blok-saraf-jiwa-v3.png",
    "indera": "/brand/covers/blok-indera-v3.png",
    "gawat-darurat": "/brand/covers/blok-gawat-darurat-v3.png",
    "etika-forensik": "/brand/covers/blok-etika-forensik-v3.png",
  };
  const productCover = (art ? blockCovers[art] : undefined) ?? productCovers[title];
  if (productCover) return (
    <div className="relative h-full w-full overflow-hidden bg-[#faf8f2]" aria-hidden="true">
      <Image src={productCover} alt="" fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw" className="object-cover" />
    </div>
  );
  const clinical = program === "clinical-practice";
  const research = program === "medical-research";
  const books = /e-?books?/i.test(title);
  const references = /pustaka|guideline|template|toolkit/i.test(title);
  const tone = "course-art-surface text-ink";
  return (
    <div className={`course-cover relative flex h-full min-h-0 items-center overflow-hidden ${tone}`} aria-hidden="true">
      <CoverBrand />
      <svg viewBox="0 0 360 210" className="course-cover-art absolute inset-0 h-full w-full" fill="none">
        <circle cx="285" cy="90" r="100" fill="currentColor" opacity=".04" />
        <circle cx="285" cy="90" r="72" stroke="currentColor" opacity=".13" />
        <path d="M0 175H360M0 145H360M0 115H360M60 0V210M120 0V210M180 0V210M240 0V210M300 0V210" stroke="currentColor" opacity=".05" />
        {art ? <OrganGlyph art={art} /> : books ? <g stroke="currentColor" strokeWidth="3" strokeLinejoin="round" fill="none"><path d="M216 53q29-10 48 4v112q-23-12-48-3zM264 57q24-14 48-4v113q-25-9-48 3z" fill="#fffdf6" /><path d="M226 76h25M226 91h25M226 106h25M277 76h24M277 91h24M277 106h24M205 174h118" /><path d="M217 183h94" stroke="#b88d23" strokeWidth="6" /></g> : references ? <g stroke="currentColor" strokeWidth="3" strokeLinejoin="round" fill="none"><rect x="227" y="42" width="78" height="122" rx="7" fill="#fffdf6" /><path d="M217 58h-8v116h77v-7M241 66h48M241 82h48M241 98h39M241 114h45M241 130h30" /><circle cx="286" cy="147" r="21" fill="#ffd20a" stroke="#b88d23" /><path d="m278 147 6 6 11-13" /></g> : research ? <g stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M226 133V102M252 133V76M278 133V49M214 145H300" /><path d="m223 77 27-23 27-20" /><circle cx="223" cy="77" r="5" fill="currentColor" /><circle cx="250" cy="54" r="5" fill="currentColor" /><circle cx="277" cy="34" r="5" fill="currentColor" /></g>
          : clinical ? <path d="M192 102h30l12-24 15 56 16-85 16 53h42" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          : <g stroke="currentColor" strokeWidth="3"><path d="M229 28c0 42 55 60 55 102s-55 44-55 76M284 28c0 42-55 60-55 102s55 44 55 76" /><path d="M233 48h47M244 67h25M244 93h25M232 114h49M232 140h49M244 161h25M244 187h25" /></g>}
      </svg>
      {!compact && <div className={`cover-title relative z-10 p-5 ${art ? "max-w-[52%]" : "max-w-[64%]"}`}><p className="text-[10px] font-semibold uppercase tracking-[.18em] opacity-70">Dokter Edukasi</p><p className="mt-3 text-lg font-semibold leading-snug tracking-tight">{title}</p></div>}
    </div>
  );
}
