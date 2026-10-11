import Link from "next/link";
import { db } from "@/lib/db";
import { requirePermission } from "@/lib/auth";
import { tanggal } from "@/lib/format";
import { FIELD_LABEL, MENTORING_STATUS_LABEL, type MentoringField } from "@/lib/constants";
import { toggleAcceptingAction } from "@/app/actions/tutor";
import { Empty, PageHeader, ProgressBar, Stat } from "@/components/ui";

export const metadata = { title: "Panel Tutor" };

export default async function TutorHome() {
  const user = await requirePermission("tutor.clients");
  const [profile, clients, upcoming] = await Promise.all([
    db.tutorProfile.findUnique({
      where: { userId: user.id },
      include: {
        trackAccess: {
          include: {
            track: {
              include: {
                categories: { where: { published: true }, orderBy: { order: "asc" }, include: { topics: { where: { published: true }, orderBy: { order: "asc" } } } },
              },
            },
          },
        },
      },
    }),
    db.mentoring.findMany({
      where: { tutorId: user.id },
      orderBy: [{ status: "asc" }, { updatedAt: "desc" }],
      include: {
        student: { select: { name: true } },
        sessions: { where: { status: "SCHEDULED", scheduledAt: { gte: new Date() } }, orderBy: { scheduledAt: "asc" }, take: 1 },
        _count: { select: { messages: true } },
      },
    }),
    db.mentoringSession.count({ where: { mentoring: { tutorId: user.id }, status: "SCHEDULED", scheduledAt: { gte: new Date() } } }),
  ]);
  const active = clients.filter((c) => c.status === "ACTIVE").length;

  return (
    <>
      <PageHeader
        title={`Halo, ${user.name.split(" ")[0]}`}
        subtitle={profile ? `Bidang: ${FIELD_LABEL[profile.field as MentoringField] ?? profile.field}` : "Profil tutor belum dilengkapi admin."}
        actions={
          profile && (
            <form action={toggleAcceptingAction}>
              <button className={profile.acceptingClients ? "btn-secondary btn-sm" : "btn btn-sm"} type="submit">
                {profile.acceptingClients ? "Status: menerima klien baru (ubah)" : "Status: tidak menerima klien (ubah)"}
              </button>
            </form>
          )
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Klien aktif" value={active} />
        <Stat label="Total klien" value={clients.length} />
        <Stat label="Sesi akan datang" value={upcoming} />
      </div>

      <section className="mt-8">
        <h2 className="h2 mb-3">Klien saya</h2>
        {clients.length === 0 ? (
          <Empty>Belum ada klien yang ditugaskan admin.</Empty>
        ) : (
          <div className="card overflow-x-auto p-0">
            <table className="table">
              <thead>
                <tr>
                  <th>Klien</th>
                  <th>Bidang / judul</th>
                  <th>Status</th>
                  <th>Progres</th>
                  <th>Sesi berikutnya</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <Link href={`/bimbingan/${c.id}`} className="link">
                        {c.student.name}
                      </Link>
                      <p className="text-xs text-slate-500">{c._count.messages} pesan</p>
                    </td>
                    <td>
                      {FIELD_LABEL[c.field as MentoringField] ?? c.field}
                      {c.title && <p className="text-xs text-slate-500">{c.title}</p>}
                    </td>
                    <td>
                      <span className="badge">{MENTORING_STATUS_LABEL[c.status]}</span>
                    </td>
                    <td className="min-w-32">
                      <ProgressBar value={c.progress} />
                      <span className="text-xs text-slate-500">{c.progress}%</span>
                    </td>
                    <td>{c.sessions[0] ? `${tanggal(c.sessions[0].scheduledAt, true)} WIB` : "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="mt-8">
        <h2 className="h2 mb-3">Materi yang dapat diakses</h2>
        {!profile || profile.trackAccess.length === 0 ? (
          <Empty>Admin belum memberikan akses materi.</Empty>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {profile.trackAccess.map(({ track }) => (
              <div key={track.id} className="card">
                <h3 className="font-semibold">{track.title}</h3>
                {track.categories.map((c) => (
                  <div key={c.id} className="mt-3">
                    <p className="text-sm font-medium text-slate-700">{c.title}</p>
                    <ul className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-sm">
                      {c.topics.map((t) => (
                        <li key={t.id}>
                          <Link href={`/materi/${t.id}`} className="link">
                            {t.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
