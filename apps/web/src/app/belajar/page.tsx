import Link from "next/link";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { activeEntitlementWhere } from "@/lib/access";
import { getSettings } from "@/lib/settings";
import { courseInclude, courseStats, doneItemIds, lessonHref } from "@/lib/courses";
import { learningStreak } from "@/lib/streak";
import { tanggal } from "@/lib/format";
import { FIELD_LABEL, MENTORING_STATUS_LABEL, type MentoringField } from "@/lib/constants";
import { Icon, type IconName } from "@/components/icons";
import { ProgressBar } from "@/components/ui";

export const metadata = { title: "Pembelajaran Saya" };

export default async function StudentDashboard() {
  const user = await requireUser();
  const [s, entitlements, mentorings, pendingOrders, done, streak, quiz] = await Promise.all([
    getSettings(),
    db.entitlement.findMany({
      where: activeEntitlementWhere(user.id),
      orderBy: { startsAt: "desc" },
      include: { package: { select: { name: true, categories: { select: { categoryId: true } } } } },
    }),
    db.mentoring.findMany({ where: { studentId: user.id }, orderBy: { createdAt: "desc" }, include: { tutor: { select: { name: true } } } }),
    db.order.findMany({
      where: { userId: user.id, status: { in: ["PENDING", "PARTIAL"] } },
      include: { package: { select: { name: true } }, installments: { where: { status: "PENDING" }, orderBy: { seq: "asc" }, take: 1 } },
    }),
    doneItemIds(user.id),
    learningStreak(user.id),
    db.quizAttempt.aggregate({ where: { userId: user.id }, _avg: { score: true }, _count: true }),
  ]);

  // Kelas saya = kelas dari layanan aktif + kelas lain yang sudah mulai dipelajari (mis. materi gratis).
  const ownedIds = new Set(entitlements.flatMap((e) => e.package.categories.map((c) => c.categoryId)));
  const startedCats = done.size
    ? await db.category.findMany({ where: { published: true, topics: { some: { items: { some: { id: { in: [...done] } } } } } }, select: { id: true } })
    : [];
  const ids = [...new Set([...ownedIds, ...startedCats.map((c) => c.id)])];
  const courses = ids.length ? await db.category.findMany({ where: { id: { in: ids }, published: true }, orderBy: [{ track: { order: "asc" } }, { order: "asc" }], include: courseInclude }) : [];
  const rows = courses
    .map((c) => ({ c, open: ownedIds.has(c.id), st: courseStats(c, done, ownedIds.has(c.id)) }))
    // Yang sedang berjalan lebih dulu, lalu yang belum mulai, lalu yang selesai.
    .sort((a, b) => Number(a.st.completed) - Number(b.st.completed) || Number(b.st.started) - Number(a.st.started));
  const lessonTitle = new Map(courses.flatMap((c) => c.topics.flatMap((t) => t.items.map((i) => [i.id, i.title] as const))));

  const stats: { label: string; value: string; note: string; icon: IconName; tone: string }[] = [
    { label: "Kelas Diikuti", value: `${rows.length} Kelas`, note: `${rows.filter((r) => r.st.started && !r.st.completed).length} sedang berjalan`, icon: "book", tone: "text-brand" },
    { label: "Materi Selesai", value: `${done.size} Sesi`, note: "Video, slide & PDF", icon: "checkCircle", tone: "text-success" },
    { label: "Rata-rata Quiz", value: quiz._count ? `${Math.round(quiz._avg.score ?? 0)}%` : "—", note: quiz._count ? `${quiz._count} quiz dikerjakan` : "Belum ada quiz dikerjakan", icon: "trending", tone: "text-brand" },
    { label: "Kelas Selesai", value: `${rows.filter((r) => r.st.completed).length}`, note: "Semua materi ditandai selesai", icon: "award", tone: "text-amber-500" },
  ];

  return (
    <div className="container-page py-10">
      <section className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-9 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">Dashboard Pelajar · {s.siteName}</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Selamat Datang, {user.name}</h1>
          <p className="mt-3 max-w-xl text-slate-600">Lanjutkan pencapaian target belajar Anda. Konsistensi belajar harian mempercepat penguasaan materi.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/pembelian" className="btn-secondary btn-sm">
              Riwayat pembelian
            </Link>
            <Link href="/akun" className="btn-secondary btn-sm">
              Akun
            </Link>
          </div>
        </div>
        <div className="shrink-0 rounded-xl border border-slate-200 bg-slate-50 p-5">
          <div className="flex items-center gap-3">
            <Icon name="flame" className={`h-8 w-8 ${streak.days ? "text-orange-500" : "text-slate-300"}`} fill />
            <div>
              <p className="text-sm text-slate-500">Streak Belajar</p>
              <p className="text-xl font-semibold text-slate-900">{streak.days ? `${streak.days} Hari Berturut-turut` : "Mulai hari ini"}</p>
            </div>
          </div>
          <ol className="mt-4 flex gap-2.5 border-t border-slate-200 pt-4">
            {streak.week.map((d) => (
              <li key={d.label} className="text-center" title={d.done ? "Belajar" : d.future ? "Belum tiba" : "Tidak belajar"}>
                <span className={`grid h-7 w-7 place-items-center rounded-md ${d.done ? "bg-brand text-white" : "bg-slate-200 text-slate-400"}`}>
                  <Icon name="check" className="h-3.5 w-3.5" />
                </span>
                <span className="mt-1 block text-[11px] text-slate-500">{d.label}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {pendingOrders.length > 0 && (
        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
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

      <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((x) => (
          <div key={x.label} className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="flex items-start justify-between">
              <p className="text-sm text-slate-500">{x.label}</p>
              <Icon name={x.icon} className={`h-5 w-5 ${x.tone}`} />
            </div>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 tabular-nums">{x.value}</p>
            <p className="mt-1.5 text-xs text-slate-500">{x.note}</p>
          </div>
        ))}
      </section>

      <section className="mt-12">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Kursus yang Sedang Dipelajari</h2>
            <p className="mt-1 text-sm text-slate-500">Lanjutkan materi terakhir Anda untuk menjaga ritme belajar harian.</p>
          </div>
          <Link href="/kelas" className="text-sm font-semibold text-brand hover:underline">
            + Ambil Kursus Baru
          </Link>
        </div>

        {rows.length === 0 ? (
          <p className="mt-5 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
            Belum ada kelas.{" "}
            <Link href="/rekomendasi" className="link">
              Ikuti tes rekomendasi
            </Link>{" "}
            atau{" "}
            <Link href="/kelas" className="link">
              jelajahi katalog
            </Link>
            .
          </p>
        ) : (
          <div className="mt-5 grid gap-6 lg:grid-cols-2">
            {rows.map(({ c, open, st }) => {
              const target = st.next ?? st.first;
              return (
                <article key={c.id} className="rounded-xl border border-slate-200 bg-white p-6">
                  <div className="flex gap-4">
                    {c.posterFileId ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={`/api/berkas/${c.posterFileId}`} alt="" className="h-20 w-20 shrink-0 rounded-lg object-cover sm:h-24 sm:w-24" />
                    ) : (
                      <div className="h-20 w-20 shrink-0 rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 sm:h-24 sm:w-24" aria-hidden />
                    )}
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-brand">{c.track.title}</p>
                      <h3 className="mt-1 text-lg font-semibold leading-snug text-slate-900">
                        <Link href={`/kelas/${c.id}`} className="hover:text-brand">
                          {c.title}
                        </Link>
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">{c.instructor ?? (open ? "Akses penuh" : "Materi contoh gratis")}</p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between text-sm">
                    <span className="text-slate-600">Progres Kursus</span>
                    <span className="num font-semibold text-brand">
                      {st.pct}% ({st.done}/{st.total} sesi)
                    </span>
                  </div>
                  <div className="mt-2">
                    <ProgressBar value={st.pct} />
                  </div>

                  <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{st.completed ? "Status:" : "Materi berikutnya:"}</p>
                    <p className="mt-0.5 truncate text-sm font-medium text-slate-800">
                      {st.completed ? "Semua materi selesai" : st.next ? lessonTitle.get(st.next.id) : open ? "Materi sedang disiapkan" : "Buka seluruh kelas untuk melanjutkan"}
                    </p>
                  </div>

                  <div className="mt-5 border-t border-slate-100 pt-5">
                    {target && (open || st.next) ? (
                      <Link href={lessonHref(target)} className="btn w-full py-2.5">
                        <Icon name="play" className="h-3.5 w-3.5" fill />
                        {st.completed ? "Buka Lagi" : st.started ? "Lanjutkan Belajar" : "Mulai Belajar"}
                      </Link>
                    ) : (
                      <Link href={`/kelas/${c.id}`} className="btn-secondary w-full py-2.5">
                        {open ? "Lihat kelas" : "Lihat cara membuka seluruh kelas"}
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Layanan Aktif</h2>
        {entitlements.length === 0 ? (
          <p className="mt-3 text-sm text-slate-500">
            Belum ada layanan aktif.{" "}
            <Link href="/paket" className="link">
              Lihat layanan
            </Link>
            .
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white">
            {entitlements.map((e) => (
              <li key={e.id} className="flex flex-wrap items-center justify-between gap-2 px-5 py-3 text-sm">
                <span className="font-medium text-slate-800">{e.package.name}</span>
                <span className="text-slate-500">{e.expiresAt ? `Berlaku s.d. ${tanggal(e.expiresAt)}` : "Tanpa batas waktu"}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Bimbingan 1-on-1</h2>
        {mentorings.length === 0 ? (
          <p className="mt-3 text-sm text-slate-500">
            Belum ada bimbingan.{" "}
            <Link href="/paket" className="link">
              Lihat layanan bimbingan
            </Link>
            .
          </p>
        ) : (
          <div className="mt-4 grid gap-6 lg:grid-cols-2">
            {mentorings.map((m) => (
              <Link key={m.id} href={`/bimbingan/${m.id}`} className="rounded-xl border border-slate-200 bg-white p-6 transition hover:border-slate-300">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-slate-900">{FIELD_LABEL[m.field as MentoringField] ?? m.field}</h3>
                  <span className="text-xs font-medium text-slate-500">{MENTORING_STATUS_LABEL[m.status]}</span>
                </div>
                <p className="mt-1 text-sm text-slate-600">Tutor: {m.tutor?.name ?? "sedang dipilih admin"}</p>
                <div className="mt-3 flex items-center gap-3">
                  <ProgressBar value={m.progress} />
                  <span className="num text-xs text-slate-500">{m.progress}%</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
