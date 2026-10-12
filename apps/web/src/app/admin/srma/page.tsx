import Link from "next/link";
import { SrmaReviewDocuments } from "@/components/srma-review-documents";
import { requirePermission } from "@/lib/auth";
import { getSrmaConfig } from "@/lib/srma";
import { db } from "@/lib/db";
import { SR_SLUG, TOOLKIT_SLUG } from "@/lib/srma-config";
import { saveSrmaConfig, resolveSrmaReport } from "@/app/actions/srma";
import { SrmaAdminLibrary } from "@/components/srma-admin-library";
import { Field, Flash, PageHeader } from "@/components/ui";
import { readFlash, type SearchParams } from "@/lib/flash";
export default async function AdminSrma({ searchParams }: { searchParams: SearchParams }) {
  await requirePermission("admin.content");
  const config = await getSrmaConfig(), flash = await readFlash(searchParams);
  const category = await db.category.findFirst({ where: { slug: SR_SLUG } });
  const toolkit = await db.category.findFirst({ where: { slug: TOOLKIT_SLUG } });
  return <><PageHeader title="Pembelajaran dan Toolkit SR-MA" subtitle="Ubah modul, materi, video, kuis, panduan, dan pustaka dari panel admin." back={{ href: "/admin/konten", label: "Konten materi" }} /><Flash pesan={flash.pesan} tipe={flash.tipe} /><SrmaReviewDocuments /><section className="card mb-6"><h2 className="h2">Kurikulum pembelajaran</h2><p className="mt-2 text-sm text-slate-600">Daftar modul mengikuti topik kelas. Video, teks, PDF, tautan, urutan, publikasi, dan kuis dikelola pada masing-masing topik. Konten awal merupakan kerangka yang perlu disesuaikan dengan materi pengajar.</p>{category && <Link className="btn-primary mt-4" href={`/admin/konten/kategori/${category.id}`}>Kelola modul SR-MA</Link>}{toolkit && <Link className="btn-secondary ml-3 mt-4" href={`/admin/konten/kategori/${toolkit.id}`}>Kelola panduan Toolkit</Link>}</section><form action={saveSrmaConfig} className="space-y-6"><section className="card"><h2 className="h2 mb-4">Alat dan petunjuk penggunaan</h2><div className="space-y-4">{config.tools.map(t => <details key={t.id} className="rounded-xl border p-4"><summary className="cursor-pointer font-semibold">{t.title}</summary><div className="mt-3 space-y-3"><Field label="Nama alat"><input className="input" name={`${t.id}.title`} defaultValue={t.title} required maxLength={150} /></Field><Field label="Deskripsi singkat"><textarea className="input" name={`${t.id}.description`} defaultValue={t.description} rows={2} /></Field><Field label="Cara menggunakan"><textarea className="input" name={`${t.id}.help`} defaultValue={t.help} rows={4} /></Field><label className="flex gap-2 text-sm"><input type="checkbox" name={`${t.id}.published`} defaultChecked={t.published} />Tampilkan alat</label></div></details>)}</div></section><section className="card"><Field label="Pertanyaan Idea Board, satu pertanyaan per baris"><textarea className="input" name="questions" rows={6} defaultValue={config.questions.join("\n")} required /></Field></section><section className="card"><h2 className="h2 mb-4">FAQ</h2><SrmaAdminLibrary name="faq" initial={config.faq} /></section><section className="card"><h2 className="h2 mb-4">Template, guideline, dan prompt</h2><p className="mb-4 text-sm text-slate-500">Tulis kerangka sendiri atau isi tautan berkas milik pengajar. DOCX dihasilkan dari isi yang disimpan. Kelompok dapat diisi Template naskah, Guideline, atau Prompt AI.</p><SrmaAdminLibrary name="templates" initial={config.templates} /></section><button className="btn-primary">Simpan konten Toolkit</button></form><SrmaReports /></>;
}

async function SrmaReports() {
  const rows = await db.setting.findMany({ where: { key: { startsWith: "srma.report." } }, take: 200 });
  const reports = rows.map(row => ({ key: row.key, ...JSON.parse(row.value) as { itemId: string; title: string; body: string; date: string; resolved: boolean } })).filter(r => !r.resolved).sort((a, b) => b.date.localeCompare(a.date));
  return <section className="card mt-6"><h2 className="h2">Laporan masalah materi</h2>{reports.length ? <div className="mt-4 space-y-4">{reports.map(r => <article className="rounded-xl border p-4" key={r.key}><p className="font-semibold">{r.title}</p><p className="mt-1 text-xs text-slate-500">{r.date}</p><p className="mt-3 whitespace-pre-line text-sm">{r.body}</p><form action={resolveSrmaReport} className="mt-3"><input type="hidden" name="key" value={r.key} /><button className="btn-secondary btn-sm">Tandai ditangani</button></form></article>)}</div> : <p className="mt-3 text-sm text-slate-500">Tidak ada laporan yang menunggu penanganan.</p>}</section>;
}



