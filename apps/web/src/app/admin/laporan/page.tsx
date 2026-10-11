import Link from "next/link";
import { requirePermission } from "@/lib/auth";
import { hasPermission } from "@/lib/permissions";
import { buildReport, feeOwed, resolvePeriod } from "@/lib/reports";
import { rupiah, tanggal } from "@/lib/format";
import { LEAD_SOURCE_LABEL } from "@/lib/installments";
import { Empty, Flash, PageHeader, Stat } from "@/components/ui";
import { getSettings } from "@/lib/settings";
import { smtpConfigured } from "@/lib/email";
import { sendReportNowAction } from "@/app/actions/admin";
import { readFlash, type SearchParams } from "@/lib/flash";

export const metadata = { title: "Laporan & performa" };

const PERIODS = [
  ["bulan-ini", "Bulan ini"],
  ["bulan-lalu", "Bulan lalu"],
  ["tahun-ini", "Tahun ini"],
  ["semua", "Semua"],
] as const;

const SCHEDULE_LABEL: Record<string, string> = {
  mingguan: "Mingguan - tiap Senin 07.00 WIB",
  bulanan: "Bulanan - tiap tanggal 1 pukul 07.00 WIB",
  keduanya: "Mingguan (Senin 07.00 WIB) dan bulanan (tanggal 1 pukul 07.00 WIB)",
};

const TRACK_LABEL: Record<string, string> = {
  "pre-clinical": "Pre-Clinical",
  "clinical-practice": "Clinical Practice",
  "medical-research": "Medical Research",
  lainnya: "Lainnya",
};

// Batang horizontal satu seri (pendapatan per layanan). Nilai tertulis di ujung batang;
// tooltip lewat title. Satu seri → tanpa legenda; tabel di bawahnya sebagai tampilan data.
function RevenueBars({ rows }: { rows: { name: string; revenue: number; qty: number }[] }) {
  const max = Math.max(...rows.map((r) => r.revenue), 1);
  return (
    <ul className="space-y-2" aria-label="Pendapatan per layanan">
      {rows.map((r) => (
        <li key={r.name} className="grid grid-cols-[minmax(0,180px)_minmax(0,1fr)_auto] items-center gap-3 text-sm" title={`${r.name}: ${rupiah(r.revenue)} · ${r.qty} order`}>
          <span className="truncate text-slate-600">{r.name}</span>
          <span className="block min-w-0">
            <span className="block h-3 rounded-r bg-mascot" style={{ width: `${Math.max((r.revenue / max) * 100, r.revenue ? 1.5 : 0)}%` }} />
          </span>
          <span className="text-xs text-slate-700">{rupiah(r.revenue)}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function ReportsPage({ searchParams }: { searchParams: SearchParams }) {
  const me = await requirePermission("admin.reports");
  const finance = hasPermission(me, "admin.finance");
  const { pick, pesan, tipe } = await readFlash(searchParams);
  const settings = await getSettings();
  const period = resolvePeriod(pick("periode"), pick("dari"), pick("sampai"));
  const rep = await buildReport(period);
  const owed = hasPermission(me, "admin.finance") ? await feeOwed() : null;
  const qs = `periode=${period.key}${pick("dari") ? `&dari=${pick("dari")}` : ""}${pick("sampai") ? `&sampai=${pick("sampai")}` : ""}`;
  const money = (v: number) => (finance ? rupiah(v) : "-");
  const a = rep.alerts;
  const alertCount = a.overdueSessions.length + a.expiring.length + a.waitingTutorOld.length + a.partialOrders.length + a.stalePending.length;

  return (
    <>
      <PageHeader title="Laporan & performa" subtitle={`Periode: ${period.label}. Pendapatan dihitung dari uang yang diterima (bayar penuh & cicilan).`} />

      {/* Filter periode — satu baris di atas semua angka */}
      <form className="mb-6 flex flex-wrap items-end gap-2">
        {PERIODS.map(([k, label]) => (
          <Link key={k} href={`/admin/laporan?periode=${k}`} className={period.key === k ? "btn btn-sm" : "btn-secondary btn-sm"}>
            {label}
          </Link>
        ))}
        <input type="hidden" name="periode" value="custom" />
        <label className="text-xs text-slate-500">
          Dari
          <input className="input mt-1" type="date" name="dari" defaultValue={pick("dari")} />
        </label>
        <label className="text-xs text-slate-500">
          Sampai
          <input className="input mt-1" type="date" name="sampai" defaultValue={pick("sampai")} />
        </label>
        <button className="btn-secondary btn-sm" type="submit">
          Terapkan
        </button>
      </form>

      <Flash pesan={pesan} tipe={tipe} />

      {finance && (
        <section className="card mb-8 text-sm">
          <h2 className="font-semibold">Laporan otomatis ke email</h2>
          <p className="mt-1 text-slate-600">
            Jadwal: <b>{SCHEDULE_LABEL[settings.reportEmailSchedule] ?? "Tidak dikirim"}</b>
            {!smtpConfigured() && " · Akun pengirim email (SMTP) belum diatur, jadi email belum benar-benar terkirim."}{" "}
            <Link className="text-brand underline" href="/admin/pengaturan">
              Ubah di Pengaturan situs
            </Link>
          </p>
          <form className="mt-3 flex flex-wrap gap-2">
            <button className="btn-secondary btn-sm" formAction={sendReportNowAction.bind(null, "weekly")}>
              Kirim laporan minggu lalu sekarang
            </button>
            <button className="btn-secondary btn-sm" formAction={sendReportNowAction.bind(null, "monthly")}>
              Kirim laporan bulan lalu sekarang
            </button>
          </form>
        </section>
      )}

      {finance && (
        <section className="mb-8">
          <h2 className="h2 mb-3">Keuangan</h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Stat label={`Pendapatan diterima (${rep.finance.payments} pembayaran)`} value={rupiah(rep.finance.revenue)} />
            <Stat label="HPP" value={rupiah(rep.finance.hpp)} />
            <Stat label={`Laba kotor · margin ${rep.finance.grossMargin}%`} value={rupiah(rep.finance.grossProfit)} />
            <Stat label="Laba setelah fee tutor tervalidasi" value={rupiah(rep.finance.profitAfterFee)} />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Stat label="Fee tutor tervalidasi (periode)" value={rupiah(rep.finance.tutorFee)} />
            <Stat label="Fee tutor payable (belum dibayar, saat ini)" value={rupiah(rep.finance.feePayable)} href="/admin/payroll" />
            <Stat label="Fee tutor dibayar (periode)" value={rupiah(rep.finance.feePaid)} />
            <Stat label="Fee projected (sesi belum tervalidasi)" value={`± ${rupiah(rep.finance.feeProjected)}`} />
          </div>
          {rep.finance.hppMissing && (
            <p className="mt-3 text-xs text-amber-700">Sebagian order belum punya HPP (dihitung 0). Isi HPP di halaman layanan agar laba akurat untuk order berikutnya.</p>
          )}
        </section>
      )}

      {finance && owed && (
        <section className="card mb-8">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="h2">Fee tutor terutang</h2>
              <p className="text-xs text-slate-500">Sesi Zoom & pencapaian yang sudah diverifikasi admin tetapi belum dibayar (kondisi saat ini, tidak mengikuti periode).</p>
            </div>
            <div className="flex gap-2">
              <a href={`/api/laporan/fee-terutang?${qs}`} className="btn-secondary btn-sm">
                Unduh Excel (CSV)
              </a>
              <Link href="/admin/payroll" className="btn-secondary btn-sm">
                Buat payroll
              </Link>
            </div>
          </div>
          {owed.rows.length === 0 ? (
            <Empty>Tidak ada fee terutang. Semua fee tervalidasi sudah dibayar.</Empty>
          ) : (
            <>
              <div className="mb-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <Stat label={`Total terutang (${owed.rows.length} item)`} value={rupiah(owed.total)} />
                {owed.byTutor.map((t) => (
                  <Stat key={t.tutor} label={`${t.tutor} · ${t.count} item${t.inPayroll ? ` · ${rupiah(t.inPayroll)} sudah di payroll` : ""}`} value={rupiah(t.total)} />
                ))}
              </div>
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Tutor</th>
                      <th>Jenis</th>
                      <th>Item</th>
                      <th>Murid</th>
                      <th>Layanan</th>
                      <th>Diverifikasi</th>
                      <th className="text-right">Fee</th>
                      <th>Payroll</th>
                    </tr>
                  </thead>
                  <tbody>
                    {owed.rows.map((r, i) => (
                      <tr key={`${r.mentoringId}-${r.item}-${i}`}>
                        <td>{r.tutor}</td>
                        <td className="text-xs">{r.kind}</td>
                        <td>
                          <Link href={`/bimbingan/${r.mentoringId}`} className="link">
                            {r.item}
                          </Link>
                        </td>
                        <td>{r.student}</td>
                        <td className="text-xs">{r.service}</td>
                        <td className="whitespace-nowrap text-xs">{tanggal(r.verifiedAt, true)}</td>
                        <td className="text-right">{rupiah(r.fee)}</td>
                        <td className="text-xs">{r.payroll ? `${r.payroll} (belum dibayar)` : "Belum dibuat"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </section>
      )}

      <section className="mb-8">
        <h2 className="h2 mb-3">Penjualan (order dibuat dalam periode)</h2>
        <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-6">
          <Stat label="Order dibuat" value={rep.sales.created} href="/admin/order" />
          <Stat label="Lunas" value={rep.sales.paid} />
          <Stat label="Cicilan berjalan" value={rep.sales.partial} />
          <Stat label="Belum dibayar" value={rep.sales.unpaid} />
          <Stat label="Dibatalkan" value={rep.sales.cancelled} />
          <Stat label="Rata-rata transaksi" value={money(rep.sales.avgValue)} />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="h2 mb-3">Operasional (saat ini)</h2>
        <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-6">
          <Stat label="Proyek aktif" value={rep.operations.activeProjects} href="/admin/bimbingan?status=ACTIVE" />
          <Stat label="Menunggu tutor" value={rep.operations.waitingTutor} href="/admin/bimbingan?status=WAITING_ASSIGNMENT" />
          <Stat label="Task tervalidasi / total" value={`${rep.operations.tasksValidated}/${rep.operations.tasksTotal}`} />
          <Stat label="Menunggu validasi" value={rep.operations.tasksPending} href="/admin/validasi" />
          <Stat label="Sedang revisi" value={rep.operations.tasksRevision} />
          <Stat label="Sesi akan datang" value={rep.operations.upcomingSessions} />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="h2 mb-3">Peringatan {alertCount > 0 && <span className="badge-warn ml-1">{alertCount}</span>}</h2>
        {alertCount === 0 ? (
          <Empty>Tidak ada peringatan. 👍</Empty>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {a.overdueSessions.length > 0 && (
              <div className="card">
                <p className="font-semibold">⚠️ Sesi lewat jadwal belum ditandai selesai ({a.overdueSessions.length})</p>
                <ul className="mt-2 space-y-1 text-sm">
                  {a.overdueSessions.map((s) => (
                    <li key={s.id}>
                      <Link href={`/bimbingan/${s.mentoring.id}`} className="link">
                        {s.mentoring.student.name}
                      </Link>{" "}
                      · {tanggal(s.scheduledAt, true)} · tutor {s.mentoring.tutor?.name ?? "-"}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {a.expiring.length > 0 && (
              <div className="card">
                <p className="font-semibold">⏳ Akses berakhir dalam 14 hari ({a.expiring.length})</p>
                <ul className="mt-2 space-y-1 text-sm">
                  {a.expiring.map((e) => (
                    <li key={e.id}>
                      <Link href={`/admin/pengguna/${e.user.id}`} className="link">
                        {e.user.name}
                      </Link>{" "}
                      · {e.package.name} · {tanggal(e.expiresAt)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {a.waitingTutorOld.length > 0 && (
              <div className="card">
                <p className="font-semibold">👤 Bimbingan menunggu tutor lebih dari 2 hari ({a.waitingTutorOld.length})</p>
                <ul className="mt-2 space-y-1 text-sm">
                  {a.waitingTutorOld.map((m) => (
                    <li key={m.id}>
                      <Link href={`/bimbingan/${m.id}`} className="link">
                        {m.student.name}
                      </Link>{" "}
                      · sejak {tanggal(m.createdAt)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {a.partialOrders.length > 0 && (
              <div className="card">
                <p className="font-semibold">💳 Cicilan berikutnya belum dibayar ({a.partialOrders.length})</p>
                <ul className="mt-2 space-y-1 text-sm">
                  {a.partialOrders.map((o) => (
                    <li key={o.id}>
                      <Link href={`/admin/order/${o.id}`} className="link">
                        {o.code}
                      </Link>{" "}
                      · {o.user.name} · {o.installments[0]?.label} {finance ? rupiah(o.installments[0]?.amount ?? null) : ""}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {a.stalePending.length > 0 && (
              <div className="card">
                <p className="font-semibold">🕒 Order belum dibayar lebih dari 3 hari ({a.stalePending.length})</p>
                <ul className="mt-2 space-y-1 text-sm">
                  {a.stalePending.map((o) => (
                    <li key={o.id}>
                      <Link href={`/admin/order/${o.id}`} className="link">
                        {o.code}
                      </Link>{" "}
                      · {o.user.name} · {o.package.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </section>

      <section className="mb-8 grid gap-4 lg:grid-cols-2">
        <div className="card">
          <h2 className="h2 mb-3">Terlaris (jumlah order)</h2>
          {rep.topByQty.length === 0 ? (
            <p className="muted">Belum ada order di periode ini.</p>
          ) : (
            <ol className="space-y-1 text-sm">
              {rep.topByQty.map((s, i) => (
                <li key={s.id}>
                  {i + 1}. {s.name} - {s.qty} order
                </li>
              ))}
            </ol>
          )}
        </div>
        <div className="card">
          <h2 className="h2 mb-3">Pendapatan tertinggi</h2>
          {!finance ? (
            <p className="muted">Butuh akses Angka keuangan.</p>
          ) : rep.topByRevenue.filter((s) => s.revenue).length === 0 ? (
            <p className="muted">Belum ada pembayaran di periode ini.</p>
          ) : (
            <ol className="space-y-1 text-sm">
              {rep.topByRevenue
                .filter((s) => s.revenue)
                .map((s, i) => (
                  <li key={s.id}>
                    {i + 1}. {s.name} - {rupiah(s.revenue)}
                  </li>
                ))}
            </ol>
          )}
        </div>
      </section>

      <section className="card mb-8">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="h2">Performa per layanan</h2>
          <a href={`/api/laporan/layanan?${qs}`} className="btn-secondary btn-sm">
            Unduh Excel (CSV)
          </a>
        </div>
        {rep.services.length === 0 ? (
          <Empty>Belum ada data di periode ini.</Empty>
        ) : (
          <>
            {finance && rep.services.some((s) => s.revenue) && (
              <div className="mb-5">
                <RevenueBars rows={rep.services.filter((s) => s.revenue)} />
              </div>
            )}
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Layanan</th>
                    <th className="text-right">Order</th>
                    {finance && (
                      <>
                        <th className="text-right">Pendapatan</th>
                        <th className="text-right">HPP</th>
                        <th className="text-right">Laba kotor</th>
                        <th className="text-right">Margin</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {rep.services.map((s) => (
                    <tr key={s.id}>
                      <td>
                        {s.name}
                        <p className="text-xs text-slate-500">{TRACK_LABEL[s.trackSlug ?? "lainnya"] ?? s.trackSlug}</p>
                      </td>
                      <td className="text-right">{s.qty}</td>
                      {finance && (
                        <>
                          <td className="text-right">{rupiah(s.revenue)}</td>
                          <td className="text-right">{rupiah(s.hpp)}</td>
                          <td className="text-right">{rupiah(s.profit)}</td>
                          <td className="text-right">{s.revenue ? `${s.margin}%` : "-"}</td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 overflow-x-auto">
              <p className="label">Per kategori</p>
              <table className="table">
                <tbody>
                  {rep.categories.map((c) => (
                    <tr key={c.key}>
                      <td>{TRACK_LABEL[c.key] ?? c.key}</td>
                      <td className="text-right">{c.qty} order</td>
                      {finance && (
                        <>
                          <td className="text-right">{rupiah(c.revenue)}</td>
                          <td className="text-right">laba {rupiah(c.profit)}</td>
                          <td className="text-right">{c.revenue ? `${c.margin}%` : "-"}</td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>

      <section className="card mb-8">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="h2">Performa tutor</h2>
          <a href={`/api/laporan/tutor?${qs}`} className="btn-secondary btn-sm">
            Unduh Excel (CSV)
          </a>
        </div>
        {rep.tutors.length === 0 ? (
          <Empty>Belum ada tutor.</Empty>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Tutor</th>
                  <th className="text-right">Proyek aktif</th>
                  <th className="text-right">Ditutup</th>
                  <th className="text-right">Sesi tervalidasi</th>
                  <th className="text-right">Task tervalidasi</th>
                  <th className="text-right">Menunggu validasi</th>
                  <th className="text-right">Sedang revisi</th>
                  {finance && (
                    <>
                      <th className="text-right">Fee</th>
                      <th className="text-right">Pendapatan proyek</th>
                      <th className="text-right">Kontribusi</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {rep.tutors.map((t) => (
                  <tr key={t.id}>
                    <td>
                      <Link href={`/admin/tim/${t.id}`} className="link">
                        {t.name}
                      </Link>
                    </td>
                    <td className="text-right">{t.active}</td>
                    <td className="text-right">{t.closed}</td>
                    <td className="text-right">{t.sessionsValidated}</td>
                    <td className="text-right">{t.tasksValidated}</td>
                    <td className="text-right">{t.pending}</td>
                    <td className="text-right">{t.revisions}</td>
                    {finance && (
                      <>
                        <td className="text-right">{rupiah(t.fee)}</td>
                        <td className="text-right">{rupiah(t.revenue)}</td>
                        <td className="text-right">{rupiah(t.contribution)}</td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="card mb-8">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="h2">Sumber pelanggan</h2>
          <a href={`/api/laporan/sumber?${qs}`} className="btn-secondary btn-sm">
            Unduh Excel (CSV)
          </a>
        </div>
        {rep.leads.length === 0 ? (
          <Empty>Belum ada data.</Empty>
        ) : (
          <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Sumber</th>
                <th className="text-right">Order</th>
                {finance && <th className="text-right">Pendapatan</th>}
              </tr>
            </thead>
            <tbody>
              {rep.leads.map((l) => (
                <tr key={l.key}>
                  <td>{l.key === "UNKNOWN" ? "Tidak diisi" : LEAD_SOURCE_LABEL[l.key] ?? l.key}</td>
                  <td className="text-right">{l.orders}</td>
                  {finance && <td className="text-right">{rupiah(l.revenue)}</td>}
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </section>

      {finance && (
        <section className="card">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h2 className="h2">Rincian pembayaran diterima</h2>
            <div className="flex gap-2">
              <a href={`/api/laporan/pembayaran?${qs}`} className="btn-secondary btn-sm">
                Unduh pembayaran (CSV)
              </a>
              <a href={`/api/laporan/order?${qs}`} className="btn-secondary btn-sm">
                Unduh order (CSV)
              </a>
            </div>
          </div>
          {rep.cash.length === 0 ? (
            <Empty>Belum ada pembayaran di periode ini.</Empty>
          ) : (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Tanggal</th>
                    <th>Order</th>
                    <th>Pelanggan</th>
                    <th>Layanan</th>
                    <th>Pembayaran</th>
                    <th className="text-right">Jumlah</th>
                    <th className="text-right">HPP</th>
                    <th>Bukti</th>
                  </tr>
                </thead>
                <tbody>
                  {rep.cash.slice(0, 100).map((c) => (
                    <tr key={`${c.orderId}-${c.label}`}>
                      <td className="whitespace-nowrap text-xs">{tanggal(c.date, true)}</td>
                      <td>
                        <Link href={`/admin/order/${c.orderId}`} className="link">
                          {c.code}
                        </Link>
                      </td>
                      <td>{c.customer}</td>
                      <td>{c.service}</td>
                      <td className="text-xs">{c.label}</td>
                      <td className="text-right">{rupiah(c.amount)}</td>
                      <td className="text-right">{c.hppKnown ? rupiah(c.hpp) : "-"}</td>
                      <td className="text-xs">
                        {c.proofFileId ? (
                          <a href={`/api/berkas/${c.proofFileId}`} target="_blank" rel="noopener noreferrer" className="link">
                            Lihat
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}
    </>
  );
}
