import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { hasPermission } from "@/lib/permissions";
import { buildReport, cashEntries, resolvePeriod } from "@/lib/reports";
import { LEAD_SOURCE_LABEL } from "@/lib/installments";
import { ORDER_STATUS_LABEL } from "@/lib/constants";

// Ekspor laporan sebagai CSV (dibuka langsung oleh Excel / Google Sheets).

function csv(rows: (string | number | null | undefined)[][]) {
  const cell = (v: string | number | null | undefined) => {
    const s = v === null || v === undefined ? "" : String(v);
    return /[",;\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  // BOM agar Excel membaca UTF-8; pemisah ; agar cocok dengan Excel berbahasa Indonesia.
  return "﻿" + rows.map((r) => r.map(cell).join(";")).join("\r\n");
}

const wib = (d: Date | null) => (d ? new Date(d.getTime() + 7 * 3600 * 1000).toISOString().slice(0, 16).replace("T", " ") : "");

export async function GET(req: Request, { params }: { params: Promise<{ jenis: string }> }) {
  const user = await getCurrentUser();
  if (!user || !hasPermission(user, "admin.reports")) return new NextResponse("Tidak diizinkan.", { status: 403 });
  const finance = hasPermission(user, "admin.finance");
  const { jenis } = await params;
  const url = new URL(req.url);
  const period = resolvePeriod(url.searchParams.get("periode") ?? undefined, url.searchParams.get("dari") ?? undefined, url.searchParams.get("sampai") ?? undefined);
  const m = (v: number | null) => (finance ? v ?? "" : "");
  let rows: (string | number | null | undefined)[][];

  if (jenis === "pembayaran" || jenis === "order") {
    if (!finance) return new NextResponse("Butuh akses Angka keuangan.", { status: 403 });
  }

  if (jenis === "pembayaran") {
    const cash = await cashEntries(period);
    rows = [["Tanggal (WIB)", "Kode order", "Pelanggan", "Layanan", "Pembayaran", "Jumlah", "HPP", "Sumber"]];
    for (const c of cash) rows.push([wib(c.date), c.code, c.customer, c.service, c.label, c.amount, c.hppKnown ? c.hpp : "", LEAD_SOURCE_LABEL[c.leadSource ?? ""] ?? ""]);
  } else if (jenis === "order") {
    const r = period.from || period.to ? { ...(period.from ? { gte: period.from } : {}), ...(period.to ? { lt: period.to } : {}) } : undefined;
    const orders = await db.order.findMany({
      where: r ? { createdAt: r } : {},
      orderBy: { createdAt: "desc" },
      include: { user: true, package: true, addons: true },
    });
    rows = [["Dibuat (WIB)", "Kode", "Pelanggan", "Email", "WhatsApp", "Layanan", "Masa belajar", "Add-on", "Diskon", "Total", "HPP", "Cara bayar", "Status", "Lunas (WIB)", "Sumber"]];
    for (const o of orders) {
      rows.push([
        wib(o.createdAt),
        o.code,
        o.user.name,
        o.user.email,
        o.user.phone,
        o.package.name,
        o.durationLabel,
        o.addons.map((a) => a.name).join(", "),
        o.discount,
        o.amount,
        o.hpp,
        o.paymentPlan === "INSTALLMENT" ? "Cicilan" : "Penuh",
        ORDER_STATUS_LABEL[o.status] ?? o.status,
        wib(o.paidAt),
        LEAD_SOURCE_LABEL[o.leadSource ?? ""] ?? "",
      ]);
    }
  } else {
    const rep = await buildReport(period);
    if (jenis === "layanan") {
      rows = [["Layanan", "Kategori", "Order", "Pendapatan", "HPP", "Laba kotor", "Margin %"]];
      for (const s of rep.services) rows.push([s.name, s.trackSlug ?? "lainnya", s.qty, m(s.revenue), m(s.hpp), m(s.profit), finance ? s.margin : ""]);
    } else if (jenis === "tutor") {
      rows = [["Tutor", "Proyek aktif", "Ditutup", "Sesi tervalidasi", "Task tervalidasi", "Menunggu validasi", "Sedang revisi", "Fee", "Pendapatan proyek", "Kontribusi"]];
      for (const t of rep.tutors) rows.push([t.name, t.active, t.closed, t.sessionsValidated, t.tasksValidated, t.pending, t.revisions, m(t.fee), m(t.revenue), m(t.contribution)]);
    } else if (jenis === "sumber") {
      rows = [["Sumber", "Order", "Pendapatan"]];
      for (const l of rep.leads) rows.push([l.key === "UNKNOWN" ? "Tidak diisi" : LEAD_SOURCE_LABEL[l.key] ?? l.key, l.orders, m(l.revenue)]);
    } else {
      return new NextResponse("Jenis laporan tidak dikenal.", { status: 404 });
    }
  }

  const filename = `laporan-${jenis}-${period.key}.csv`;
  return new NextResponse(csv(rows), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
