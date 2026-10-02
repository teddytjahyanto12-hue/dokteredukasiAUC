import { requirePermission } from "@/lib/auth";
import { hasPermission } from "@/lib/permissions";
import Link from "next/link";
import { db } from "@/lib/db";
import { rupiah, tanggal } from "@/lib/format";
import { getSettings } from "@/lib/settings";
import { Empty, PageHeader, Stat } from "@/components/ui";

export const metadata = { title: "Admin" };

export default async function AdminHome() {
  const me = await requirePermission("admin.dashboard");
  const [pendingOrders, waitingMentoring, students, tutors, unverified, notifications, settings] = await Promise.all([
    db.order.findMany({ where: { status: { in: ["PENDING", "PARTIAL"] } }, orderBy: { createdAt: "desc" }, take: 8, include: { user: true, package: true } }),
    db.mentoring.count({ where: { status: "WAITING_ASSIGNMENT" } }),
    db.user.count({ where: { role: "STUDENT" } }),
    db.user.count({ where: { role: "TUTOR", active: true } }),
    db.mentoringSession.count({ where: { status: "DONE", verifiedAt: null } }).then(async (n) => n + (await db.projectTask.count({ where: { status: "DONE", validatedAt: null } }))),
    db.notification.findMany({ where: { userId: me.id, readAt: null }, orderBy: { createdAt: "desc" }, take: 5 }),
    getSettings(),
  ]);
  const finance = hasPermission(me, "admin.finance");
  const money = finance
    ? await Promise.all([
        db.order.aggregate({ where: { status: "PAID" }, _sum: { amount: true }, _count: true }),
        db.mentoringSession.aggregate({ where: { verifiedAt: { not: null }, OR: [{ payrollId: null }, { payroll: { status: "UNPAID" } }] }, _sum: { fee: true } }),
        db.mentoringSession.aggregate({ where: { verifiedAt: { not: null }, payroll: { status: "PAID" } }, _sum: { fee: true } }),
        db.mentoringSession.count({ where: { verifiedAt: null, status: { in: ["SCHEDULED", "DONE", "REVISION"] }, mentoring: { status: { not: "CLOSED" } } } }),
      ])
    : null;
  const setupMissing = [!settings.adminWhatsapp && "nomor WhatsApp admin", !settings.tutorFormUrl && "tautan Google Form tutor"].filter(Boolean);

  return (
    <>
      <PageHeader title="Ringkasan" subtitle="Pantau order, bimbingan, dan tutor." />
      {setupMissing.length > 0 && (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          Lengkapi {setupMissing.join(" dan ")} di{" "}
          <Link href="/admin/pengaturan" className="font-semibold underline">
            Pengaturan situs
          </Link>
          .
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <Stat label="Order menunggu" value={pendingOrders.length} href="/admin/order?status=PENDING" />
        <Stat label="Bimbingan perlu tutor" value={waitingMentoring} href="/admin/bimbingan?status=WAITING_ASSIGNMENT" />
        <Stat label="Task/sesi menunggu validasi" value={unverified} href="/admin/validasi" />
        <Stat label="Murid" value={students} href="/admin/pengguna" />
        <Stat label="Tutor aktif" value={tutors} href="/admin/tim" />
      </div>
      {money && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Stat label={`Penjualan lunas (${money[0]._count} order)`} value={rupiah(money[0]._sum.amount ?? 0)} href="/admin/order?status=PAID" />
          <Stat label="Fee tutor payable (belum dibayar)" value={rupiah(money[1]._sum.fee ?? 0)} href="/admin/payroll" />
          <Stat label="Fee tutor sudah dibayar" value={rupiah(money[2]._sum.fee ?? 0)} href="/admin/payroll" />
          <Stat label="Sesi projected (belum tervalidasi)" value={money[3]} />
        </div>
      )}

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <section>
          <h2 className="h2 mb-3">Order menunggu pembayaran / cicilan</h2>
          {pendingOrders.length === 0 ? (
            <Empty>Tidak ada order menunggu.</Empty>
          ) : (
            <ul className="space-y-2">
              {pendingOrders.map((o) => (
                <li key={o.id}>
                  <Link href={`/admin/order/${o.id}`} className="card flex items-center justify-between gap-3 py-3 transition hover:shadow-md">
                    <div>
                      <p className="font-medium">{o.user.name}</p>
                      <p className="text-xs text-slate-500">
                        {o.package.name} · {o.code}
                      </p>
                    </div>
                    <div className="text-right text-sm">
                      {finance && <p>{rupiah(o.amount)}</p>}
                      <p className="text-xs text-slate-500">{tanggal(o.createdAt, true)}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
        <section>
          <h2 className="h2 mb-3">Notifikasi terbaru</h2>
          {notifications.length === 0 ? (
            <Empty>Tidak ada notifikasi baru.</Empty>
          ) : (
            <ul className="space-y-2">
              {notifications.map((n) => (
                <li key={n.id} className="card py-3">
                  <p className="font-medium">{n.title}</p>
                  {n.body && <p className="text-sm text-slate-600">{n.body}</p>}
                  {n.link && (
                    <Link href={n.link} className="link text-sm">
                      Buka
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          )}
          <Link href="/notifikasi" className="link mt-2 inline-block text-sm">
            Semua notifikasi
          </Link>
        </section>
      </div>
    </>
  );
}
