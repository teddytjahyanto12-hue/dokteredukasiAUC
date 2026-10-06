import "server-only";
import { db } from "./db";
import { hasPermission, parsePermissions } from "./permissions";
import { appUrl, emailLayout, emailParagraph, emailRows, sendEmail, smtpConfigured } from "./email";
import { getSettings } from "./settings";
import { buildReport, resolvePeriod, type Period } from "./reports";
import { rupiah } from "./format";

// Laporan berkala lewat email — murni perhitungan sistem dari database (tanpa AI).
// Mingguan: Senin 07.00 WIB untuk Senin–Minggu sebelumnya. Bulanan: tanggal 1 pukul 07.00 WIB
// untuk bulan sebelumnya. Bila server sedang mati pada jadwalnya, laporan dikirim saat server
// menyala kembali. Setiap periode hanya dikirim satu kali (dikunci lewat tabel Setting).

export type ReportKind = "weekly" | "monthly";

const WIB = 7 * 3600 * 1000;
const SEND_HOUR = 7;
const ymd = (d: Date) => d.toISOString().slice(0, 10);

// Periode terakhir yang sudah selesai + waktu paling awal laporannya boleh dikirim.
export function lastCompletedPeriod(kind: ReportKind, now = new Date()): { period: Period; lockKey: string; dueAt: Date; query: string } {
  const nowWib = new Date(now.getTime() + WIB);
  if (kind === "weekly") {
    const today = Date.UTC(nowWib.getUTCFullYear(), nowWib.getUTCMonth(), nowWib.getUTCDate());
    const thisMonday = today - ((nowWib.getUTCDay() + 6) % 7) * 86400000;
    const from = ymd(new Date(thisMonday - 7 * 86400000));
    const to = ymd(new Date(thisMonday - 86400000));
    const fmt = (t: number) => new Date(t).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
    return {
      period: { ...resolvePeriod("custom", from, to), label: `${fmt(thisMonday - 7 * 86400000)} – ${fmt(thisMonday - 86400000)}` },
      lockKey: `reportSent:weekly:${from}`,
      dueAt: new Date(thisMonday + SEND_HOUR * 3600000 - WIB),
      query: `periode=custom&dari=${from}&sampai=${to}`,
    };
  }
  const period = resolvePeriod("bulan-lalu");
  const monthStart = period.to!;
  const label = new Date(period.from!.getTime() + WIB).toLocaleDateString("id-ID", { month: "long", year: "numeric", timeZone: "UTC" });
  return {
    period: { ...period, label },
    lockKey: `reportSent:monthly:${ymd(new Date(period.from!.getTime() + WIB)).slice(0, 7)}`,
    dueAt: new Date(monthStart.getTime() + SEND_HOUR * 3600000),
    query: `periode=custom&dari=${ymd(new Date(period.from!.getTime() + WIB))}&sampai=${ymd(new Date(monthStart.getTime() + WIB - 86400000))}`,
  };
}

// Penerima: owner + admin yang punya akses Laporan DAN Angka keuangan, plus email tambahan di Pengaturan.
export async function reportRecipients() {
  const staff = await db.user.findMany({
    where: { role: { in: ["OWNER", "ADMIN"] }, active: true },
    select: { email: true, role: true, permissions: true },
  });
  const allowed = staff.filter((u) => {
    const who = { role: u.role, permissions: parsePermissions(u.permissions) };
    return hasPermission(who, "admin.reports") && hasPermission(who, "admin.finance");
  });
  const s = await getSettings();
  const extra = s.reportEmailTo
    .split(/[,;\s]+/)
    .map((e) => e.trim().toLowerCase())
    .filter((e) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e));
  return [...new Set([...allowed.map((u) => u.email.toLowerCase()), ...extra])];
}

const heading = (t: string) => `<h2 style="margin:20px 0 8px;font-size:15px;color:#0f766e">${t}</h2>`;

export async function sendPeriodicReport(kind: ReportKind, opts: { force?: boolean } = {}) {
  const { period, lockKey, query } = lastCompletedPeriod(kind);
  const to = await reportRecipients();
  if (!to.length) return { sent: 0, skipped: "Tidak ada penerima." };

  if (!opts.force) {
    // Kunci periode: gagal bila sudah pernah dikirim (kunci unik), sehingga tidak terkirim ganda.
    try {
      await db.setting.create({ data: { key: lockKey, value: new Date().toISOString() } });
    } catch {
      return { sent: 0, skipped: "Sudah dikirim." };
    }
  }

  const s = await getSettings();
  const rep = await buildReport(period);
  const f = rep.finance;
  const a = rep.alerts;
  const title = `${kind === "weekly" ? "Laporan mingguan" : "Laporan bulanan"} — ${period.label}`;

  const sections: [string, [string, string][]][] = [
    [
      "Keuangan",
      [
        [`Pendapatan diterima (${f.payments} pembayaran)`, rupiah(f.revenue)],
        ["HPP", rupiah(f.hpp)],
        [`Laba kotor (margin ${f.grossMargin}%)`, rupiah(f.grossProfit)],
        ["Fee tutor tervalidasi", rupiah(f.tutorFee)],
        ["Laba setelah fee tutor", rupiah(f.profitAfterFee)],
        ["Fee tutor dibayar (periode)", rupiah(f.feePaid)],
        ["Fee tutor belum dibayar (saat ini)", rupiah(f.feePayable)],
      ],
    ],
    [
      "Penjualan",
      [
        ["Order dibuat", String(rep.sales.created)],
        ["Lunas", String(rep.sales.paid)],
        ["Cicilan berjalan", String(rep.sales.partial)],
        ["Belum dibayar", String(rep.sales.unpaid)],
        ["Dibatalkan", String(rep.sales.cancelled)],
        ["Rata-rata transaksi", rupiah(rep.sales.avgValue)],
      ],
    ],
    [
      "Layanan dengan pendapatan tertinggi",
      rep.topByRevenue.filter((x) => x.revenue > 0).map((x) => [`${x.name} (${x.qty} order)`, rupiah(x.revenue)] as [string, string]),
    ],
    [
      "Operasional (saat ini)",
      [
        ["Proyek aktif", String(rep.operations.activeProjects)],
        ["Menunggu tutor", String(rep.operations.waitingTutor)],
        ["Task menunggu validasi", String(rep.operations.tasksPending)],
        ["Task sedang revisi", String(rep.operations.tasksRevision)],
        ["Sesi terjadwal mendatang", String(rep.operations.upcomingSessions)],
      ],
    ],
    [
      "Perlu perhatian (saat ini)",
      [
        ["Sesi lewat jadwal", String(a.overdueSessions.length)],
        ["Akses berakhir ≤ 14 hari", String(a.expiring.length)],
        ["Bimbingan menunggu tutor > 2 hari", String(a.waitingTutorOld.length)],
        ["Order dengan cicilan berikutnya", String(a.partialOrders.length)],
        ["Order belum dibayar > 3 hari", String(a.stalePending.length)],
      ],
    ],
  ];
  const filled = sections.filter(([, rows]) => rows.length);
  const intro = `Ringkasan otomatis untuk periode ${period.label}. Pendapatan dihitung dari uang yang benar-benar diterima.`;
  const note = f.hppMissing ? "Catatan: sebagian order belum punya HPP (dihitung 0), sehingga laba bisa terlihat lebih besar." : "";
  const html = emailLayout(
    s.siteName,
    title,
    emailParagraph(intro) + filled.map(([h, rows]) => heading(h) + emailRows(rows)).join("") + (note ? `<div style="margin-top:16px">${emailParagraph(note)}</div>` : ""),
    { label: "Buka laporan lengkap", url: appUrl(`/admin/laporan?${query}`) },
  );
  const text = [intro, ...filled.flatMap(([h, rows]) => ["", h.toUpperCase(), ...rows.map(([k, v]) => `${k}: ${v}`)]), note ? `\n${note}` : "", "", appUrl(`/admin/laporan?${query}`)].join("\n");

  let sent = 0;
  for (const email of to) {
    if (await sendEmail({ to: email, subject: `${title} — ${s.siteName}`, html, text, kind: "REPORT" })) sent++;
  }
  return { sent, total: to.length, label: period.label };
}

// Dipanggil berkala oleh penjadwal: kirim laporan yang sudah jatuh tempo dan belum terkirim.
export async function runReportSchedule(now = new Date()) {
  if (!smtpConfigured()) return [];
  const s = await getSettings();
  const kinds: ReportKind[] = s.reportEmailSchedule === "mingguan" ? ["weekly"] : s.reportEmailSchedule === "bulanan" ? ["monthly"] : s.reportEmailSchedule === "keduanya" ? ["weekly", "monthly"] : [];
  const results = [];
  for (const kind of kinds) {
    if (now < lastCompletedPeriod(kind, now).dueAt) continue;
    results.push({ kind, ...(await sendPeriodicReport(kind)) });
  }
  return results;
}
