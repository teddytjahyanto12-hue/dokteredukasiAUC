import "server-only";
import { db } from "@/lib/db";
import { CALCULATORS } from "@/lib/calculators/registry";
import { searchDrugs } from "@/lib/dosis-obat/data";

// Pencarian terpadu seluruh fitur situs: kelas/Blok, materi (bab), kalkulator, paket, dan halaman fitur.
export type SearchItem = { title: string; subtitle?: string; href: string; kind: string };
export type SearchGroup = { key: string; label: string; items: SearchItem[] };

const PAGES: { title: string; href: string; subtitle: string; keys: string[] }[] = [
  { title: "Katalog Kelas", href: "/kelas", subtitle: "Semua kelas dan Blok", keys: ["kelas", "katalog", "blok", "materi", "belajar", "course"] },
  { title: "Kalkulator Medis", href: "/kalkulator", subtitle: "Kalkulator dan skor klinis", keys: ["kalkulator", "skor", "score", "calculator", "hitung"] },
  { title: "Dosis Obat Anak", href: "/dosis-obat/anak", subtitle: "Kalkulator dosis obat anak per berat badan", keys: ["dosis", "obat", "dosis obat", "dosis anak", "pediatri", "mg/kg", "fornas", "idai"] },
  { title: "Layanan & Harga", href: "/paket", subtitle: "Paket belajar, bimbingan, dan langganan", keys: ["paket", "harga", "layanan", "beli", "langganan", "premium"] },
  { title: "Penawaran", href: "/penawaran", subtitle: "Promo dan penawaran", keys: ["penawaran", "promo", "diskon"] },
  { title: "Toolkit SR-MA", href: "/toolkit-srma", subtitle: "Alat bantu systematic review & meta-analisis", keys: ["toolkit", "srma", "sr-ma", "systematic review", "meta analisis", "meta-analisis", "deduplikasi", "screening"] },
  { title: "Pembelajaran Saya", href: "/belajar", subtitle: "Progres belajar dan kelas yang dimiliki", keys: ["pembelajaran", "progres", "dashboard", "kelas saya"] },
  { title: "Gabung Menjadi Tutor", href: "/gabung-tutor", subtitle: "Alur seleksi tutor", keys: ["tutor", "gabung", "mengajar", "rekrutmen"] },
  { title: "Program Pre-Clinical", href: "/program/pre-clinical", subtitle: "Jalur ilmu dasar kedokteran", keys: ["pre-clinical", "preklinik", "praklinik", "bms", "basic medical science"] },
  { title: "Program UKMPPD", href: "/program/ukmppd", subtitle: "Persiapan ujian kompetensi dokter", keys: ["ukmppd", "kompetensi", "ujian dokter"] },
  { title: "Program Clinical Practice", href: "/program/clinical-practice", subtitle: "EKG, cheatsheet", keys: ["clinical practice", "klinis", "ekg", "ecg", "cheatsheet", "koas"] },
  { title: "Program Medical Research", href: "/program/medical-research", subtitle: "Riset, review, pengolahan data", keys: ["medical research", "riset", "penelitian", "review", "jurnal"] },
  { title: "Masuk", href: "/masuk", subtitle: "Masuk ke akun", keys: ["masuk", "login"] },
  { title: "Daftar", href: "/daftar", subtitle: "Buat akun baru", keys: ["daftar", "register", "akun baru"] },
];

const norm = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "");
function scoreText(q: string, texts: (string | null | undefined)[]) {
  const n = norm(q);
  let best = 0;
  for (const t of texts) {
    if (!t) continue;
    const x = norm(t);
    if (x === n) best = Math.max(best, 100);
    else if (x.startsWith(n)) best = Math.max(best, 80);
    else if (x.split(/[^a-z0-9]+/).some((w) => w.startsWith(n))) best = Math.max(best, 60);
    else if (x.includes(n)) best = Math.max(best, 40);
  }
  return best;
}

export async function searchSite(qRaw: string, limit = 5): Promise<SearchGroup[]> {
  const q = qRaw.trim().slice(0, 80);
  if (q.length < 2) return [];

  const calc = CALCULATORS.filter((c) => c.status !== "soon")
    .map((c) => ({ c, s: scoreText(q, [c.title, c.short, c.field, ...c.keywords]) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map(({ c }) => ({ title: c.title, subtitle: `Kalkulator · ${c.field}`, href: `/kalkulator/${c.slug}`, kind: "kalkulator" }));

  const obat = searchDrugs(q, limit).map((d) => ({ title: d.name, subtitle: "Dosis Obat Anak", href: `/dosis-obat/anak/${d.slug}`, kind: "obat" }));

  const pages = PAGES.map((p) => ({ p, s: scoreText(q, [p.title, ...p.keys]) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map(({ p }) => ({ title: p.title, subtitle: p.subtitle, href: p.href, kind: "halaman" }));

  const [cats, topics, pkgs] = await Promise.all([
    db.category.findMany({
      where: { published: true, track: { published: true }, OR: [{ title: { contains: q } }, { code: { contains: q } }, { description: { contains: q } }] },
      select: { id: true, title: true, code: true, parent: { select: { title: true } }, track: { select: { title: true } } },
      take: limit * 3,
    }),
    db.topic.findMany({
      where: { published: true, title: { contains: q }, category: { published: true } },
      select: { id: true, title: true, category: { select: { title: true, code: true } } },
      take: limit * 3,
    }),
    db.package.findMany({
      where: { active: true, OR: [{ name: { contains: q } }, { summary: { contains: q } }] },
      select: { slug: true, name: true, summary: true },
      take: limit * 3,
    }),
  ]);

  const rank = <T,>(rows: T[], texts: (r: T) => (string | null | undefined)[]) =>
    rows.map((r) => ({ r, s: scoreText(q, texts(r)) })).sort((a, b) => b.s - a.s).slice(0, limit).map((x) => x.r);

  const kelas = rank(cats, (c) => [c.title, c.code]).map((c) => ({
    title: c.code ? `${c.title} (${c.code})` : c.title,
    subtitle: c.parent ? `Blok di ${c.parent.title}` : `Kelas · ${c.track.title}`,
    href: `/kelas/${c.id}`,
    kind: "kelas",
  }));
  const materi = rank(topics, (t) => [t.title]).map((t) => ({ title: t.title, subtitle: `Materi · ${t.category.title}`, href: `/materi/${t.id}`, kind: "materi" }));
  const paket = rank(pkgs, (p) => [p.name]).map((p) => ({ title: p.name, subtitle: p.summary ?? "Paket", href: `/paket/${p.slug}`, kind: "paket" }));

  return [
    { key: "kalkulator", label: "Kalkulator Medis", items: calc },
    { key: "obat", label: "Dosis Obat Anak", items: obat },
    { key: "kelas", label: "Kelas & Blok", items: kelas },
    { key: "materi", label: "Materi", items: materi },
    { key: "paket", label: "Paket & Layanan", items: paket },
    { key: "halaman", label: "Halaman & Fitur", items: pages },
  ].filter((g) => g.items.length > 0);
}
