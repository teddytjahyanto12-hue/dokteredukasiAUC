import Link from "next/link";
import { requirePermission } from "@/lib/auth";
import { loadPaths } from "@/lib/paths";
import { savePathAction } from "@/app/actions/paths";
import { Empty, Field, Flash, PageHeader } from "@/components/ui";
import { readFlash, type SearchParams } from "@/lib/flash";

export const metadata = { title: "Jalur belajar" };

export default async function AdminPaths({ searchParams }: { searchParams: SearchParams }) {
  await requirePermission("admin.content");
  const { pesan, tipe } = await readFlash(searchParams);
  const paths = await loadPaths({ publishedOnly: false });
  return (
    <>
      <PageHeader title="Jalur belajar" subtitle="Rangkaian kelas berurutan yang tampil di halaman /jalur. Kelas diambil dari Konten materi (kategori)." />
      <Flash pesan={pesan} tipe={tipe} />
      {paths.length === 0 ? (
        <Empty>Belum ada jalur belajar.</Empty>
      ) : (
        <ul className="card divide-y divide-slate-100">
          {paths.map((p) => (
            <li key={p.id} className="flex flex-wrap items-center justify-between gap-2 py-3 first:pt-0 last:pb-0">
              <div>
                <Link href={`/admin/jalur/${p.id}`} className="link">
                  {p.title}
                </Link>
                {!p.published && <span className="badge ml-2">Belum ditampilkan</span>}
                <p className="text-xs text-slate-500">{p.steps.length} kelas</p>
              </div>
              <Link href={`/admin/jalur/${p.id}`} className="btn-secondary btn-sm">
                Kelola
              </Link>
            </li>
          ))}
        </ul>
      )}

      <form action={savePathAction} className="card mt-6 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
        <Field label="Jalur baru" hint="Mis. Jalur Systematic Review dari nol">
          <input className="input" name="title" required />
        </Field>
        <button className="btn" type="submit">
          Buat jalur
        </button>
      </form>
    </>
  );
}
