import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { canAccessCategory } from "@/lib/access";
import { getSrmaConfig, toolkitCategory } from "@/lib/srma";
import { SR_SLUG } from "@/lib/srma-config";
import { SrmaToolkit } from "@/components/srma-toolkit";
import { MaterialViewer } from "@/components/material-viewer";
export const metadata = { title: "Toolkit SR-MA" };
export default async function ToolkitPage() {
  const user = await requireUser();
  const category = await toolkitCategory();
  const curriculum = await db.category.findFirst({ where: { slug: SR_SLUG, published: true } });
  const open = category && await canAccessCategory(user, category.id);
  const guides = open ? await db.topic.findMany({ where: { categoryId: category.id, published: true }, orderBy: { order: "asc" }, include: { items: { where: { published: true, type: { not: "LINK" } }, orderBy: { order: "asc" }, include: { file: true } } } }) : [];
  return <div className="container-page py-8"><div className="mb-6 flex flex-wrap items-center justify-between gap-4"><div><p className="text-sm font-semibold text-brand">Riset medis</p><h1 className="h1 mt-1">Toolkit SR-MA</h1><p className="mt-2 text-slate-600">Alat kerja riset, terpisah dari kurikulum pembelajaran.</p></div>{curriculum && <Link className="btn-secondary" href={`/kelas/${curriculum.id}`}>Buka kurikulum SR-MA</Link>}</div>{open ? <><SrmaToolkit config={await getSrmaConfig()} initialProjects={(await db.setting.findMany({ where: { key: { startsWith: `srma.project.${user.id}.` } } })).map(p => p.value)} /><div className="mt-6 space-y-4">{guides.map(g => <details className="card" key={g.id}><summary className="cursor-pointer font-semibold">{g.title}</summary><div className="mt-4 space-y-5">{g.items.map(item => <article key={item.id}><h2 className="h2 mb-3">{item.title}</h2><MaterialViewer item={item} /></article>)}</div></details>)}</div></> : <section className="card"><h2 className="h2">Toolkit tersedia untuk Intermediate dan Pro</h2><p className="mt-2 text-slate-600">Paket Basic membuka kurikulum SR-MA. Pilih Intermediate atau Pro untuk menggunakan alat kerja di sini.</p><div className="mt-4 flex flex-wrap gap-3"><Link className="btn-primary" href="/paket/paket-srma-intermediate">Lihat Intermediate</Link><Link className="btn-secondary" href="/paket/paket-srma-pro">Lihat Pro</Link></div></section>}</div>;
}
