import Link from "next/link";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { tanggal } from "@/lib/format";
import { markNotificationsReadAction } from "@/app/actions/student";
import { Empty, PageHeader } from "@/components/ui";

export const metadata = { title: "Notifikasi" };

export default async function NotificationsPage() {
  const user = await requireUser();
  const items = await db.notification.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" }, take: 100 });
  const unread = items.some((n) => !n.readAt);
  return (
    <div className="container-page max-w-3xl py-10">
      <PageHeader
        title="Notifikasi"
        actions={
          unread ? (
            <form action={markNotificationsReadAction}>
              <button className="btn-secondary btn-sm" type="submit">
                Tandai semua dibaca
              </button>
            </form>
          ) : null
        }
      />
      {items.length === 0 ? (
        <Empty>Belum ada notifikasi.</Empty>
      ) : (
        <ul className="space-y-2">
          {items.map((n) => (
            <li key={n.id} className={`card py-3 ${n.readAt ? "" : "border-brand/40 bg-brand-soft/30"}`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900">{n.title}</p>
                  {n.body && <p className="text-sm text-slate-600">{n.body}</p>}
                  {n.link && (
                    <Link href={n.link} className="link text-sm">
                      Buka
                    </Link>
                  )}
                </div>
                <span className="shrink-0 text-xs text-slate-500">{tanggal(n.createdAt, true)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
