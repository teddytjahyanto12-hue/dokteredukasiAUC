import { db } from "@/lib/db";

export async function SrmaReviewDocuments() {
  const row = await db.setting.findUnique({ where: { key: "srma.reviewDocuments" } });
  if (!row) return null;
  const docs = JSON.parse(row.value) as { title: string; fileId: string }[];
  return <section className="card mb-6"><h2 className="h2">Dokumen untuk revisi</h2><p className="mt-2 text-sm text-slate-600">Unduh isian kurikulum dan Toolkit untuk disusun ulang. Dokumen ini memuat kunci kuis dan tersedia melalui panel admin.</p><div className="mt-4 flex flex-wrap gap-3">{docs.map(doc => <a key={doc.fileId} href={`/api/berkas/${doc.fileId}`} className="btn-secondary" download>{doc.title} · DOCX</a>)}</div></section>;
}
