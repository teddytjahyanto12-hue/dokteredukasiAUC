import Link from "next/link";
import { db } from "@/lib/db";
import { requirePermission } from "@/lib/auth";
import { rupiah } from "@/lib/format";
import { startingPrice } from "@/lib/services";
import { Empty, Flash, PageHeader } from "@/components/ui";
import { readFlash, type SearchParams } from "@/lib/flash";

export const metadata = { title: "Layanan" };

export default async function AdminServices({ searchParams }: { searchParams: SearchParams }) {
  await requirePermission("admin.packages");
  const { pesan, tipe } = await readFlash(searchParams);
  const services = await db.package.findMany({
    orderBy: [{ trackSlug: "asc" }, { order: "asc" }],
    include: {
      durations: true,
      addons: true,
      _count: { select: { benefits: true, orders: true, eligibilities: true } },
    },
  });
  return (
    <>
      <PageHeader
        title="Layanan"
        subtitle="Buat dan atur layanan yang dijual di website: poster, deskripsi, benefit, harga, pilihan masa belajar, dan add-on."
        actions={
          <Link href="/admin/paket/baru" className="btn btn-sm">
            + Layanan baru
          </Link>
        }
      />
      <Flash pesan={pesan} tipe={tipe} />
      {services.length === 0 ? (
        <Empty>Belum ada layanan.</Empty>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((s) => {
            const from = startingPrice(s);
            const missingPrice = s.durations.filter((d) => d.active).some((d) => d.price === null) || (!s.durations.length && s.price === null);
            return (
              <Link key={s.id} href={`/admin/paket/${s.id}`} className="card flex gap-4 transition hover:shadow-md">
                {s.posterFileId ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={`/api/berkas/${s.posterFileId}`} alt="" className="h-28 w-[90px] shrink-0 rounded-lg object-cover" />
                ) : (
                  <div className="grid h-28 w-[90px] shrink-0 place-items-center rounded-lg border border-dashed border-slate-300 text-center text-[10px] text-slate-400">
                    Tanpa poster
                  </div>
                )}
                <div className="min-w-0">
                  <p className="font-semibold text-slate-900">{s.name}</p>
                  <p className="text-xs text-slate-500">{s.trackSlug ?? "Lainnya"}</p>
                  <p className="mt-1 text-sm">{from !== null ? `Mulai ${rupiah(from)}` : "Harga belum diisi"}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {s.durations.filter((d) => d.active).length} pilihan masa · {s.addons.filter((a) => a.active).length} add-on · {s._count.benefits} benefit ·{" "}
                    {s._count.eligibilities} tutor
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {s.active ? <span className="badge-brand">Tampil</span> : <span className="badge">Disembunyikan</span>}
                    {s.includesMentoring && <span className="badge-warn">Bimbingan</span>}
                    {missingPrice && <span className="badge-warn">Ada harga kosong</span>}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
