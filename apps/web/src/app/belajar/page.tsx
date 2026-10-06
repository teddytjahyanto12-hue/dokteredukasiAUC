import Link from "next/link";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { activeEntitlementWhere } from "@/lib/access";
import { tanggal } from "@/lib/format";
import { FIELD_LABEL, MENTORING_STATUS_LABEL, type MentoringField } from "@/lib/constants";
import { Empty, PageHeader, ProgressBar } from "@/components/ui";

export const metadata = { title: "Dashboard Murid" };

export default async function StudentDashboard() {
  const user = await requireUser();
  const [entitlements, mentorings, pendingOrders, doneIds] = await Promise.all([
    db.entitlement.findMany({
      where: activeEntitlementWhere(user.id),
      orderBy: { startsAt: "desc" },
      include: {
        package: {
          include: {
            categories: {
              include: {
                category: {
                  include: {
                    track: { select: { title: true, slug: true } },
                    topics: { where: { published: true }, orderBy: { order: "asc" }, include: { items: { where: { published: true, type: { not: "LINK" } }, orderBy: { order: "asc" }, select: { id: true } } } },
                  },
                },
              },
            },
          },
        },
      },
    }),
    db.mentoring.findMany({ where: { studentId: user.id }, orderBy: { createdAt: "desc" }, include: { tutor: { select: { name: true } } } }),
    db.order.findMany({
      where: { userId: user.id, status: { in: ["PENDING", "PARTIAL"] } },
      include: { package: { select: { name: true } }, installments: { where: { status: "PENDING" }, orderBy: { seq: "asc" }, take: 1 } },
    }),
    db.itemProgress.findMany({ where: { userId: user.id }, select: { itemId: true } }),
  ]);
  const done = new Set(doneIds.map((d) => d.itemId));

  // Satu kategori bisa muncul di beberapa paket; tampilkan sekali saja.
  const categories = new Map<string, (typeof entitlements)[number]["package"]["categories"][number]["category"]>();
  for (const e of entitlements) for (const pc of e.package.categories) categories.set(pc.category.id, pc.category);

  return (
    <div className="container-page py-10">
      <PageHeader
        title={`Halo, ${user.name.split(" ")[0]}`}
        subtitle="Materi dan bimbingan Anda."
        actions={
          <>
            <Link href="/pembelian" className="btn-secondary btn-sm">
              Riwayat pembelian
            </Link>
            <Link href="/akun" className="btn-secondary btn-sm">
              Akun
            </Link>
          </>
        }
      />

      {pendingOrders.length > 0 && (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          Tagihan menunggu pembayaran:{" "}
          {pendingOrders.map((o, i) => (
            <span key={o.id}>
              {i > 0 && ", "}
              <Link href={`/pembelian/${o.id}`} className="font-semibold underline">
                {o.package.name} ({o.code}){o.installments[0] ? ` — ${o.installments[0].label}` : ""}
              </Link>
            </span>
          ))}
        </div>
      )}

      <section>
        <h2 className="h2 mb-3">Paket aktif</h2>
        {entitlements.length === 0 ? (
          <Empty>
            Belum ada paket aktif.{" "}
            <Link href="/paket" className="link">
              Pilih paket
            </Link>{" "}
            untuk mulai belajar.
          </Empty>
        ) : (
          <div className="flex flex-wrap gap-2">
            {entitlements.map((e) => (
              <span key={e.id} className="badge-brand">
                {e.package.name} · {e.expiresAt ? `s.d. ${tanggal(e.expiresAt)}` : "tanpa batas waktu"}
              </span>
            ))}
          </div>
        )}
      </section>

      {categories.size > 0 && (
        <section className="mt-10">
          <h2 className="h2 mb-3">Kelas saya</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[...categories.values()].map((c) => {
              const lessons = c.topics.flatMap((t) => t.items.map((i) => ({ id: i.id, topicId: t.id })));
              const itemIds = lessons.map((l) => l.id);
              const doneCount = itemIds.filter((id) => done.has(id)).length;
              const pct = itemIds.length ? Math.round((doneCount / itemIds.length) * 100) : 0;
              const next = lessons.find((l) => !done.has(l.id));
              return (
                <div key={c.id} className="card flex flex-col">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand">{c.track.title}</p>
                  <h3 className="mt-1 font-semibold text-slate-900">
                    <Link href={`/kelas/${c.id}`} className="hover:text-brand">
                      {c.title}
                    </Link>
                  </h3>
                  <div className="mt-3 flex items-center gap-3">
                    <ProgressBar value={pct} />
                    <span className="text-xs text-slate-500">{pct}%</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    {doneCount} dari {itemIds.length} materi selesai · {c.topics.length} topik
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {next ? (
                      <Link href={`/materi/${next.topicId}?item=${next.id}`} className="btn btn-sm">
                        {doneCount ? "Lanjutkan belajar" : "Mulai belajar"}
                      </Link>
                    ) : (
                      itemIds.length > 0 && <span className="badge-brand">Selesai</span>
                    )}
                    <Link href={`/kelas/${c.id}`} className="btn-secondary btn-sm">
                      Lihat silabus
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <section className="mt-10">
        <h2 className="h2 mb-3">Bimbingan</h2>
        {mentorings.length === 0 ? (
          <Empty>Belum ada bimbingan. Bimbingan tersedia pada paket Clinical Practice dan Medical Research.</Empty>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {mentorings.map((m) => (
              <Link key={m.id} href={`/bimbingan/${m.id}`} className="card transition hover:shadow-md">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-slate-900">{FIELD_LABEL[m.field as MentoringField] ?? m.field}</h3>
                  <span className="badge">{MENTORING_STATUS_LABEL[m.status]}</span>
                </div>
                <p className="mt-1 text-sm text-slate-600">Tutor: {m.tutor?.name ?? "sedang dipilih admin"}</p>
                <div className="mt-3 flex items-center gap-3">
                  <ProgressBar value={m.progress} />
                  <span className="text-xs text-slate-500">{m.progress}%</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
