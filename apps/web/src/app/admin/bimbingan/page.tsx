import { requirePermission } from "@/lib/auth";
import Link from "next/link";
import { db } from "@/lib/db";
import { tanggal } from "@/lib/format";
import { FIELD_LABEL, MENTORING_STATUS, MENTORING_STATUS_LABEL, type MentoringField } from "@/lib/constants";
import { Empty, PageHeader, ProgressBar } from "@/components/ui";
import { readFlash, type SearchParams } from "@/lib/flash";

export const metadata = { title: "Bimbingan" };

export default async function AdminMentoring({ searchParams }: { searchParams: SearchParams }) {
  await requirePermission("admin.mentoring");
  const { pick } = await readFlash(searchParams);
  const status = pick("status");
  const list = await db.mentoring.findMany({
    where: status ? { status } : {},
    orderBy: [{ status: "desc" }, { createdAt: "desc" }],
    include: {
      student: { select: { name: true } },
      tutor: { select: { name: true } },
      package: { select: { name: true } },
      _count: { select: { sessions: { where: { status: "DONE", verifiedAt: null } } } },
    },
  });

  return (
    <>
      <PageHeader title="Bimbingan" subtitle="Tugaskan tutor sesuai bidang, pantau sesi Zoom & progres, verifikasi sesi untuk payroll." />
      <div className="mb-4 flex flex-wrap gap-2">
        <Link href="/admin/bimbingan" className={!status ? "btn btn-sm" : "btn-secondary btn-sm"}>
          Semua
        </Link>
        {MENTORING_STATUS.map((s) => (
          <Link key={s} href={`/admin/bimbingan?status=${s}`} className={status === s ? "btn btn-sm" : "btn-secondary btn-sm"}>
            {MENTORING_STATUS_LABEL[s]}
          </Link>
        ))}
      </div>
      {list.length === 0 ? (
        <Empty>Tidak ada bimbingan.</Empty>
      ) : (
        <div className="card overflow-x-auto p-0">
          <table className="table">
            <thead>
              <tr>
                <th>Murid</th>
                <th>Bidang</th>
                <th>Tutor</th>
                <th>Status</th>
                <th>Progres</th>
                <th>Perlu verifikasi</th>
                <th>Dibuat</th>
              </tr>
            </thead>
            <tbody>
              {list.map((m) => (
                <tr key={m.id}>
                  <td>
                    <Link href={`/bimbingan/${m.id}`} className="link">
                      {m.student.name}
                    </Link>
                    <p className="text-xs text-slate-500">{m.package?.name ?? "Manual"}</p>
                  </td>
                  <td>{FIELD_LABEL[m.field as MentoringField] ?? m.field}</td>
                  <td>{m.tutor?.name ?? <span className="badge-warn">Belum ada</span>}</td>
                  <td>
                    <span className="badge">{MENTORING_STATUS_LABEL[m.status]}</span>
                  </td>
                  <td className="min-w-28">
                    <ProgressBar value={m.progress} />
                  </td>
                  <td>{m._count.sessions > 0 ? <span className="badge-warn">{m._count.sessions} sesi</span> : "-"}</td>
                  <td>{tanggal(m.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
