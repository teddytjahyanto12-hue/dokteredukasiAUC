import "server-only";
import { db } from "./db";

// Perhitungan laporan Fase D (Blueprint v3).
// Pendapatan = uang yang benar-benar diterima dalam periode (bayar penuh saat lunas,
// cicilan saat tiap cicilan lunas). HPP diakui proporsional terhadap uang yang diterima.
// Laba kotor = pendapatan − HPP. Fee tutor diakui saat sesi divalidasi admin.

export type Period = { key: string; label: string; from: Date | null; to: Date | null };

const WIB = 7 * 3600 * 1000;
function wibStartOfMonth(year: number, month: number) {
  return new Date(Date.UTC(year, month, 1) - WIB);
}

export function resolvePeriod(key?: string, fromStr?: string, toStr?: string): Period {
  const nowWib = new Date(Date.now() + WIB);
  const y = nowWib.getUTCFullYear();
  const m = nowWib.getUTCMonth();
  switch (key) {
    case "bulan-lalu":
      return { key, label: "Bulan lalu", from: wibStartOfMonth(y, m - 1), to: wibStartOfMonth(y, m) };
    case "tahun-ini":
      return { key, label: `Tahun ${y}`, from: wibStartOfMonth(y, 0), to: wibStartOfMonth(y + 1, 0) };
    case "semua":
      return { key, label: "Semua waktu", from: null, to: null };
    case "custom": {
      const from = fromStr ? new Date(`${fromStr}T00:00:00+07:00`) : null;
      const to = toStr ? new Date(new Date(`${toStr}T00:00:00+07:00`).getTime() + 86400000) : null;
      if ((from && Number.isNaN(from.getTime())) || (to && Number.isNaN(to.getTime()))) break;
      return { key, label: `${fromStr ?? "…"} s.d. ${toStr ?? "…"}`, from, to };
    }
  }
  return { key: "bulan-ini", label: "Bulan ini", from: wibStartOfMonth(y, m), to: wibStartOfMonth(y, m + 1) };
}

function range(p: Period) {
  if (!p.from && !p.to) return undefined;
  return { ...(p.from ? { gte: p.from } : {}), ...(p.to ? { lt: p.to } : {}) };
}

export type CashEntry = {
  date: Date;
  orderId: string;
  code: string;
  customer: string;
  packageId: string;
  service: string;
  trackSlug: string | null;
  leadSource: string | null;
  label: string;
  amount: number;
  hpp: number;
  hppKnown: boolean;
};

// Semua penerimaan uang dalam periode.
export async function cashEntries(p: Period): Promise<CashEntry[]> {
  const r = range(p);
  const [full, inst] = await Promise.all([
    db.order.findMany({
      where: { paymentPlan: "FULL", status: "PAID", ...(r ? { paidAt: r } : {}) },
      include: { user: { select: { name: true } }, package: { select: { name: true, trackSlug: true } } },
    }),
    db.orderInstallment.findMany({
      where: { status: "PAID", ...(r ? { paidAt: r } : {}) },
      include: { order: { include: { user: { select: { name: true } }, package: { select: { name: true, trackSlug: true } } } } },
    }),
  ]);
  const rows: CashEntry[] = [
    ...full.map((o) => ({
      date: o.paidAt!,
      orderId: o.id,
      code: o.code,
      customer: o.user.name,
      packageId: o.packageId,
      service: o.package.name,
      trackSlug: o.package.trackSlug,
      leadSource: o.leadSource,
      label: "Bayar penuh",
      amount: o.amount ?? 0,
      hpp: o.hpp ?? 0,
      hppKnown: o.hpp !== null,
    })),
    ...inst.map((i) => ({
      date: i.paidAt!,
      orderId: i.orderId,
      code: i.order.code,
      customer: i.order.user.name,
      packageId: i.order.packageId,
      service: i.order.package.name,
      trackSlug: i.order.package.trackSlug,
      leadSource: i.order.leadSource,
      label: i.label,
      amount: i.amount ?? 0,
      hpp: Math.round(((i.order.hpp ?? 0) * i.percent) / 100),
      hppKnown: i.order.hpp !== null,
    })),
  ];
  return rows.sort((a, b) => b.date.getTime() - a.date.getTime());
}

function group<T>(items: T[], key: (t: T) => string) {
  const m = new Map<string, T[]>();
  for (const it of items) {
    const k = key(it);
    m.set(k, [...(m.get(k) ?? []), it]);
  }
  return m;
}

const sum = (xs: number[]) => xs.reduce((s, x) => s + x, 0);
export const margin = (revenue: number, profit: number) => (revenue ? Math.round((profit / revenue) * 1000) / 10 : 0);

export async function buildReport(p: Period) {
  const r = range(p);
  const now = new Date();
  const in14 = new Date(now.getTime() + 14 * 86400000);

  const [cash, ordersCreated, packages, feeValidated, feePaid, payable, projectedSessions, tutors, mentoringOps, tasksOps, upcoming] = await Promise.all([
    cashEntries(p),
    db.order.findMany({
      where: r ? { createdAt: r } : {},
      select: { id: true, status: true, amount: true, packageId: true, leadSource: true, package: { select: { name: true, trackSlug: true } } },
    }),
    db.package.findMany({ select: { id: true, name: true, trackSlug: true } }),
    db.mentoringSession.findMany({
      where: { verifiedAt: r ?? { not: null } },
      select: { fee: true, mentoring: { select: { tutorId: true } } },
    }),
    db.payroll.findMany({ where: { status: "PAID", ...(r ? { paidAt: r } : {}) }, select: { amount: true } }),
    db.mentoringSession.aggregate({ where: { verifiedAt: { not: null }, OR: [{ payrollId: null }, { payroll: { status: "UNPAID" } }] }, _sum: { fee: true } }),
    db.mentoringSession.findMany({
      where: { verifiedAt: null, status: { in: ["SCHEDULED", "DONE", "REVISION"] }, mentoring: { status: { not: "CLOSED" } } },
      select: { mentoring: { select: { tutor: { select: { tutorProfile: { select: { rate: true } } } } } } },
    }),
    db.user.findMany({ where: { role: "TUTOR" }, select: { id: true, name: true, active: true } }),
    db.mentoring.groupBy({ by: ["status"], _count: true }),
    db.projectTask.groupBy({ by: ["status"], where: { mentoring: { status: { not: "CLOSED" } } }, _count: true }),
    db.mentoringSession.count({ where: { status: "SCHEDULED", scheduledAt: { gte: now } } }),
  ]);

  // ---------- Keuangan ----------
  const revenue = sum(cash.map((c) => c.amount));
  const hpp = sum(cash.map((c) => c.hpp));
  const grossProfit = revenue - hpp;
  const tutorFee = sum(feeValidated.map((s) => s.fee ?? 0));
  const finance = {
    revenue,
    hpp,
    grossProfit,
    grossMargin: margin(revenue, grossProfit),
    tutorFee,
    profitAfterFee: grossProfit - tutorFee,
    feePaid: sum(feePaid.map((x) => x.amount)),
    feePayable: payable._sum.fee ?? 0,
    feeProjected: sum(projectedSessions.map((s) => s.mentoring.tutor?.tutorProfile?.rate ?? 0)),
    hppMissing: cash.some((c) => !c.hppKnown),
    payments: cash.length,
  };

  // ---------- Penjualan ----------
  const nonCancelled = ordersCreated.filter((o) => o.status !== "CANCELLED");
  const paidish = ordersCreated.filter((o) => o.status === "PAID" || o.status === "PARTIAL");
  const sales = {
    created: ordersCreated.length,
    paid: ordersCreated.filter((o) => o.status === "PAID").length,
    partial: ordersCreated.filter((o) => o.status === "PARTIAL").length,
    unpaid: ordersCreated.filter((o) => o.status === "PENDING").length,
    cancelled: ordersCreated.filter((o) => o.status === "CANCELLED").length,
    avgValue: paidish.length ? Math.round(sum(paidish.map((o) => o.amount ?? 0)) / paidish.length) : 0,
  };

  // ---------- Per layanan & kategori ----------
  const cashByPkg = group(cash, (c) => c.packageId);
  const ordersByPkg = group(nonCancelled, (o) => o.packageId);
  const services = packages
    .map((p) => {
      const c = cashByPkg.get(p.id) ?? [];
      const rev = sum(c.map((x) => x.amount));
      const h = sum(c.map((x) => x.hpp));
      return { id: p.id, name: p.name, trackSlug: p.trackSlug, qty: ordersByPkg.get(p.id)?.length ?? 0, revenue: rev, hpp: h, profit: rev - h, margin: margin(rev, rev - h) };
    })
    .filter((s) => s.qty || s.revenue)
    .sort((a, b) => b.revenue - a.revenue || b.qty - a.qty);
  const categories = [...group(services, (s) => s.trackSlug ?? "lainnya")].map(([k, list]) => {
    const rev = sum(list.map((s) => s.revenue));
    const h = sum(list.map((s) => s.hpp));
    return { key: k, qty: sum(list.map((s) => s.qty)), revenue: rev, hpp: h, profit: rev - h, margin: margin(rev, rev - h) };
  });
  const topByQty = [...services].sort((a, b) => b.qty - a.qty).slice(0, 3);
  const topByRevenue = [...services].sort((a, b) => b.revenue - a.revenue).slice(0, 3);

  // ---------- Sumber pelanggan ----------
  const leadOrders = group(nonCancelled, (o) => o.leadSource ?? "UNKNOWN");
  const leadCash = group(cash, (c) => c.leadSource ?? "UNKNOWN");
  const leads = [...new Set([...leadOrders.keys(), ...leadCash.keys()])]
    .map((k) => ({ key: k, orders: leadOrders.get(k)?.length ?? 0, revenue: sum((leadCash.get(k) ?? []).map((c) => c.amount)) }))
    .sort((a, b) => b.revenue - a.revenue || b.orders - a.orders);

  // ---------- Per tutor ----------
  const tutorRows = await Promise.all(
    tutors.map(async (t) => {
      const [active, closed, sessionsValidated, tasksValidated, revisions, pending, projectOrderIds] = await Promise.all([
        db.mentoring.count({ where: { tutorId: t.id, status: "ACTIVE" } }),
        db.mentoring.count({ where: { tutorId: t.id, status: "CLOSED", ...(r ? { closedAt: r } : {}) } }),
        db.mentoringSession.count({ where: { mentoring: { tutorId: t.id }, verifiedAt: r ?? { not: null } } }),
        db.projectTask.count({ where: { mentoring: { tutorId: t.id }, validatedAt: r ?? { not: null } } }),
        // Pekerjaan yang sedang dikembalikan admin untuk revisi (task + sesi).
        Promise.all([
          db.projectTask.count({ where: { mentoring: { tutorId: t.id }, status: "REVISION" } }),
          db.mentoringSession.count({ where: { mentoring: { tutorId: t.id }, status: "REVISION" } }),
        ]).then(([a, b]) => a + b),
        Promise.all([
          db.mentoringSession.count({ where: { mentoring: { tutorId: t.id }, status: "DONE", verifiedAt: null } }),
          db.projectTask.count({ where: { mentoring: { tutorId: t.id }, status: "DONE", validatedAt: null } }),
        ]).then(([a, b]) => a + b),
        db.mentoring.findMany({ where: { tutorId: t.id, orderId: { not: null } }, select: { orderId: true } }),
      ]);
      const ids = new Set(projectOrderIds.map((x) => x.orderId!));
      const fee = sum(feeValidated.filter((s) => s.mentoring.tutorId === t.id).map((s) => s.fee ?? 0));
      const rev = sum(cash.filter((c) => ids.has(c.orderId)).map((c) => c.amount));
      return { id: t.id, name: t.name, active, closed, sessionsValidated, tasksValidated, revisions, pending, fee, revenue: rev, contribution: rev - fee };
    }),
  );

  // ---------- Operasional ----------
  const ms = (s: string) => mentoringOps.find((x) => x.status === s)?._count ?? 0;
  const ts = (s: string) => tasksOps.find((x) => x.status === s)?._count ?? 0;
  const validatedTasks = await db.projectTask.count({ where: { validatedAt: { not: null }, mentoring: { status: { not: "CLOSED" } } } });
  const operations = {
    activeProjects: ms("ACTIVE"),
    waitingTutor: ms("WAITING_ASSIGNMENT"),
    closedProjects: ms("CLOSED"),
    tasksTotal: ts("TODO") + ts("DONE") + ts("REVISION"),
    tasksValidated: validatedTasks,
    tasksPending: await db.projectTask.count({ where: { status: "DONE", validatedAt: null } }),
    tasksRevision: ts("REVISION"),
    upcomingSessions: upcoming,
  };

  // ---------- Peringatan ----------
  const yesterday = new Date(now.getTime() - 86400000);
  const [overdueSessions, expiring, waitingTutorOld, partialOrders, stalePending] = await Promise.all([
    db.mentoringSession.findMany({
      where: { status: "SCHEDULED", scheduledAt: { lt: yesterday }, mentoring: { status: { not: "CLOSED" } } },
      include: { mentoring: { select: { id: true, student: { select: { name: true } }, tutor: { select: { name: true } } } } },
      orderBy: { scheduledAt: "asc" },
      take: 20,
    }),
    db.entitlement.findMany({
      where: { revokedAt: null, expiresAt: { gte: now, lte: in14 } },
      include: { user: { select: { id: true, name: true } }, package: { select: { name: true } } },
      orderBy: { expiresAt: "asc" },
      take: 20,
    }),
    db.mentoring.findMany({
      where: { status: "WAITING_ASSIGNMENT", createdAt: { lt: new Date(now.getTime() - 2 * 86400000) } },
      include: { student: { select: { name: true } } },
      take: 20,
    }),
    db.order.findMany({
      where: { status: "PARTIAL" },
      include: { user: { select: { name: true } }, installments: { where: { status: "PENDING" }, orderBy: { seq: "asc" }, take: 1 } },
      take: 20,
    }),
    db.order.findMany({
      where: { status: "PENDING", createdAt: { lt: new Date(now.getTime() - 3 * 86400000) } },
      include: { user: { select: { name: true } }, package: { select: { name: true } } },
      take: 20,
    }),
  ]);

  return {
    finance,
    sales,
    services,
    categories,
    topByQty,
    topByRevenue,
    leads,
    tutors: tutorRows.sort((a, b) => b.revenue - a.revenue || b.sessionsValidated - a.sessionsValidated),
    operations,
    alerts: { overdueSessions, expiring, waitingTutorOld, partialOrders, stalePending },
    cash,
  };
}
