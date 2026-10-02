import { db } from "@/lib/db";
import { requirePermission } from "@/lib/auth";
import { AUDIT_ACTION_LABEL } from "@/lib/audit";
import { tanggal } from "@/lib/format";
import { Empty, PageHeader } from "@/components/ui";
import { readFlash, type SearchParams } from "@/lib/flash";

export const metadata = { title: "Activity log" };

export default async function AuditPage({ searchParams }: { searchParams: SearchParams }) {
  await requirePermission("admin.audit");
  const { pick } = await readFlash(searchParams);
  const action = pick("aksi");
  const q = pick("q")?.trim();
  const logs = await db.auditLog.findMany({
    where: {
      ...(action ? { action } : {}),
      ...(q ? { OR: [{ summary: { contains: q } }, { actorName: { contains: q } }] } : {}),
    },
    orderBy: { createdAt: "desc" },
    take: 300,
  });

  return (
    <>
      <PageHeader title="Activity log" subtitle="Riwayat perubahan penting: siapa, kapan, dan apa. Catatan tidak dapat dihapus dari aplikasi." />
      <form className="mb-4 flex flex-wrap gap-2">
        <input className="input max-w-xs" name="q" defaultValue={q} placeholder="Cari nama atau keterangan" />
        <select className="input max-w-[260px]" name="aksi" defaultValue={action ?? ""}>
          <option value="">Semua aktivitas</option>
          {Object.entries(AUDIT_ACTION_LABEL).map(([k, v]) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </select>
        <button className="btn-secondary" type="submit">
          Filter
        </button>
      </form>
      {logs.length === 0 ? (
        <Empty>Belum ada aktivitas tercatat.</Empty>
      ) : (
        <div className="card overflow-x-auto p-0">
          <table className="table">
            <thead>
              <tr>
                <th>Waktu</th>
                <th>Oleh</th>
                <th>Aktivitas</th>
                <th>Keterangan</th>
                <th>Perubahan</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((l) => (
                <tr key={l.id}>
                  <td className="whitespace-nowrap text-xs">{tanggal(l.createdAt, true)}</td>
                  <td>{l.actorName}</td>
                  <td className="text-xs">{AUDIT_ACTION_LABEL[l.action] ?? l.action}</td>
                  <td>{l.summary}</td>
                  <td className="max-w-xs break-words text-xs text-slate-500">
                    {l.before && <div>Sebelum: {l.before}</div>}
                    {l.after && <div>Sesudah: {l.after}</div>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
