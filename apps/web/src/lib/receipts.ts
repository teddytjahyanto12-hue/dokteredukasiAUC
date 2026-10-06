import "server-only";
import { db } from "./db";
import { getSettings } from "./settings";
import { rupiah, tanggal } from "./format";
import { appUrl, emailLayout, emailParagraph, emailRows, sendEmail } from "./email";

// Ringkasan order yang dipakai bersama oleh kwitansi email, halaman kwitansi,
// dan template konfirmasi WhatsApp — agar isinya selalu sama.

export async function loadOrderForReceipt(orderId: string) {
  return db.order.findUnique({
    where: { id: orderId },
    include: { user: true, package: true, addons: true, installments: { orderBy: { seq: "asc" } } },
  });
}
type OrderFull = NonNullable<Awaited<ReturnType<typeof loadOrderForReceipt>>>;

export function orderSummary(o: OrderFull) {
  const nextDue = o.installments.find((i) => i.status !== "PAID");
  const paidInstallments = o.installments.filter((i) => i.status === "PAID");
  return {
    code: o.code,
    customer: o.user.name,
    email: o.user.email,
    phone: o.user.phone ?? "-",
    service: o.package.name,
    duration: o.durationLabel ?? "-",
    addons: o.addons.length ? o.addons.map((a) => a.name).join(", ") : "-",
    plan: o.paymentPlan === "INSTALLMENT" ? `Cicilan ${o.installments.length}x` : "Langsung lunas",
    total: rupiah(o.amount),
    // Nominal yang sedang ditagih: cicilan berikutnya, atau total bila bayar penuh.
    due: nextDue ? `${nextDue.label} ${rupiah(nextDue.amount)}` : o.status === "PAID" ? "Lunas" : rupiah(o.amount),
    paidSoFar: o.paymentPlan === "INSTALLMENT" ? paidInstallments.reduce((s, i) => s + (i.amount ?? 0), 0) : o.status === "PAID" ? o.amount ?? 0 : 0,
    nextDue,
  };
}

// Nomor invoice pembayaran manual: satu per order, atau per cicilan bila dicicil.
export function invoiceNo(o: { code: string }, seq?: number | null) {
  return `INV-${o.code.replace(/^DE-/, "")}${seq ? `-C${seq}` : ""}`;
}

// Mengisi template WhatsApp dari Pengaturan situs dengan data order.
export function fillWaTemplate(template: string, siteName: string, o: OrderFull) {
  const s = orderSummary(o);
  const vars: Record<string, string> = {
    situs: siteName,
    nama: s.customer,
    email: s.email,
    whatsapp: s.phone,
    kode_order: s.code,
    layanan: s.service,
    masa_belajar: s.duration,
    addon: s.addons,
    cara_bayar: s.plan,
    total: s.total,
    tagihan: s.due,
    no_invoice: invoiceNo(o, s.nextDue?.seq),
    paket: s.service,
    biaya: s.total,
    catatan: o.customerNote?.trim() || "-",
  };
  return template.replace(/\{([a-z_]+)\}/g, (m, k: string) => vars[k] ?? m);
}

// Kwitansi pembayaran ke email pelanggan. seq = cicilan yang baru dibayar (bila cicilan).
export async function sendReceipt(orderId: string, opts: { seq?: number; force?: boolean } = {}) {
  const settings = await getSettings();
  if (!opts.force && settings.sendReceiptEmail !== "ya") return false;
  const o = await loadOrderForReceipt(orderId);
  if (!o) return false;
  const s = orderSummary(o);
  const inst = opts.seq ? o.installments.find((i) => i.seq === opts.seq) : null;
  const paidNow = inst ? inst.amount : o.amount;
  const paidAt = inst?.paidAt ?? o.paidAt;
  const receiptNo = inst ? `${o.code}-C${inst.seq}` : o.code;

  const rows: [string, string][] = [
    ["No. kwitansi", receiptNo],
    ["Nama", s.customer],
    ["Email", s.email],
    ["Layanan", s.service],
    ["Masa belajar", s.duration],
    ["Add-on", s.addons],
    ...(o.discount ? ([["Diskon", `− ${rupiah(o.discount)}`]] as [string, string][]) : []),
    ["Total layanan", s.total],
    ["Cara bayar", s.plan],
    [inst ? `Dibayar (${inst.label})` : "Dibayar", rupiah(paidNow)],
    ["Tanggal bayar", tanggal(paidAt, true)],
    ...(inst?.paymentRef || o.paymentRef ? ([["Referensi", inst?.paymentRef ?? o.paymentRef ?? ""]] as [string, string][]) : []),
  ];
  if (o.paymentPlan === "INSTALLMENT") {
    rows.push(["Total sudah dibayar", rupiah(s.paidSoFar)]);
    rows.push(["Tagihan berikutnya", s.nextDue ? `${s.nextDue.label} ${rupiah(s.nextDue.amount)}` : "Lunas"]);
  }
  const intro = inst
    ? `Terima kasih, ${s.customer}. Pembayaran ${inst.label} untuk layanan ${s.service} sudah kami terima.`
    : `Terima kasih, ${s.customer}. Pembayaran layanan ${s.service} sudah kami terima dan akses Anda sudah aktif.`;
  const html = emailLayout(settings.siteName, `Kwitansi pembayaran ${receiptNo}`, emailParagraph(intro) + emailRows(rows), {
    label: "Lihat kwitansi & mulai belajar",
    url: appUrl(`/pembelian/${o.id}/kwitansi`),
  });
  const text = `${intro}\n\n${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nKwitansi: ${appUrl(`/pembelian/${o.id}/kwitansi`)}`;
  return sendEmail({ to: o.user.email, subject: `Kwitansi pembayaran ${receiptNo} — ${settings.siteName}`, html, text, kind: "RECEIPT", orderId: o.id });
}
