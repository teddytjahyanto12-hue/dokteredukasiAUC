import "server-only";
import { createHash, timingSafeEqual } from "node:crypto";
import { db } from "./db";
import { appUrl } from "./email";
import { markInstallmentPaid, markOrderPaid } from "./orders";
import { notifyStaff } from "./notify";
import { rupiah } from "./format";

// Pembayaran online Duitku (halaman bayar Duitku POP: customer memilih VA/QRIS/e-wallet di sana).
// Atur di .env: DUITKU_MERCHANT_CODE, DUITKU_API_KEY, DUITKU_ENV (sandbox | production).
// Order dilunasi HANYA dari callback bertanda tangan sah atau dari cek status langsung ke Duitku —
// tidak pernah dari parameter URL saat customer kembali ke website.

const EXPIRY_MINUTES = 24 * 60;

export function duitkuConfigured() {
  return !!process.env.DUITKU_MERCHANT_CODE && !!process.env.DUITKU_API_KEY;
}
export function duitkuSandbox() {
  return process.env.DUITKU_ENV !== "production";
}

function endpoints() {
  // DUITKU_BASE_URL hanya untuk uji lokal dengan server tiruan.
  const override = process.env.DUITKU_BASE_URL?.replace(/\/$/, "");
  if (override) return { invoice: `${override}/api/merchant/createInvoice`, status: `${override}/webapi/api/merchant/transactionStatus` };
  return duitkuSandbox()
    ? { invoice: "https://api-sandbox.duitku.com/api/merchant/createInvoice", status: "https://sandbox.duitku.com/webapi/api/merchant/transactionStatus" }
    : { invoice: "https://api-prod.duitku.com/api/merchant/createInvoice", status: "https://passport.duitku.com/webapi/api/merchant/transactionStatus" };
}

const hash = (algo: "md5" | "sha256", text: string) => createHash(algo).update(text).digest("hex");
function sameSignature(a: string, b: string) {
  const x = Buffer.from(a.toLowerCase());
  const y = Buffer.from(b.toLowerCase());
  return x.length === y.length && timingSafeEqual(x, y);
}

export class DuitkuError extends Error {}

// Tagihan yang sedang jatuh tempo untuk sebuah order (dihitung server).
export async function dueFor(orderId: string) {
  const order = await db.order.findUnique({
    where: { id: orderId },
    include: { user: true, package: true, installments: { orderBy: { seq: "asc" } } },
  });
  if (!order || (order.status !== "PENDING" && order.status !== "PARTIAL")) return null;
  if (order.paymentPlan === "INSTALLMENT") {
    const next = order.installments.find((i) => i.status !== "PAID");
    if (!next || !next.amount) return null;
    return { order, seq: next.seq as number | null, amount: next.amount, label: `${order.package.name} — ${next.label}` };
  }
  if (!order.amount) return null;
  return { order, seq: null as number | null, amount: order.amount, label: order.package.name };
}

// Membuat (atau memakai ulang) tagihan Duitku untuk tagihan yang jatuh tempo; mengembalikan URL bayar.
export async function createDuitkuPayment(orderId: string) {
  if (!duitkuConfigured()) throw new DuitkuError("Pembayaran online belum diaktifkan.");
  const due = await dueFor(orderId);
  if (!due) throw new DuitkuError("Tidak ada tagihan yang perlu dibayar.");

  const reusable = await db.paymentAttempt.findFirst({
    where: { orderId, installmentSeq: due.seq, amount: due.amount, status: "PENDING", paymentUrl: { not: null }, expiresAt: { gt: new Date(Date.now() + 5 * 60000) } },
    orderBy: { createdAt: "desc" },
  });
  if (reusable?.paymentUrl) return reusable.paymentUrl;

  const merchantCode = process.env.DUITKU_MERCHANT_CODE!;
  const merchantOrderId = `${due.order.code}-${due.seq ?? "F"}-${Date.now().toString(36)}`.slice(0, 50);
  const attempt = await db.paymentAttempt.create({
    data: { orderId, installmentSeq: due.seq, merchantOrderId, amount: due.amount, expiresAt: new Date(Date.now() + EXPIRY_MINUTES * 60000) },
  });

  const timestamp = Date.now().toString();
  let data: { paymentUrl?: string; reference?: string; statusCode?: string; statusMessage?: string; Message?: string };
  try {
    const res = await fetch(endpoints().invoice, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-duitku-signature": hash("sha256", merchantCode + timestamp + process.env.DUITKU_API_KEY),
        "x-duitku-timestamp": timestamp,
        "x-duitku-merchantcode": merchantCode,
      },
      body: JSON.stringify({
        paymentAmount: due.amount,
        merchantOrderId,
        productDetails: due.label.slice(0, 255),
        email: due.order.user.email,
        phoneNumber: due.order.user.phone ?? "",
        customerVaName: due.order.user.name.slice(0, 20),
        callbackUrl: appUrl("/api/duitku/callback"),
        returnUrl: appUrl(`/api/duitku/kembali?order=${orderId}`),
        expiryPeriod: EXPIRY_MINUTES,
      }),
      signal: AbortSignal.timeout(20000),
    });
    data = await res.json().catch(() => ({}));
    if (!res.ok || !data.paymentUrl) throw new DuitkuError(data.statusMessage || data.Message || `Duitku menolak permintaan (HTTP ${res.status}).`);
  } catch (e) {
    await db.paymentAttempt.update({ where: { id: attempt.id }, data: { status: "FAILED" } });
    throw e instanceof DuitkuError ? e : new DuitkuError("Tidak dapat menghubungi Duitku. Coba lagi sebentar.");
  }
  await db.paymentAttempt.update({ where: { id: attempt.id }, data: { reference: data.reference, paymentUrl: data.paymentUrl } });
  return data.paymentUrl;
}

// Melunasi order dari satu percobaan bayar. Aman dipanggil berulang (callback + cek status bisa bersamaan).
async function settle(attemptId: string, info: { reference?: string | null; paymentCode?: string | null }) {
  const claimed = await db.paymentAttempt.updateMany({
    where: { id: attemptId, status: { not: "PAID" } },
    data: { status: "PAID", paidAt: new Date(), reference: info.reference ?? undefined, paymentCode: info.paymentCode ?? undefined },
  });
  if (claimed.count === 0) return;
  const a = await db.paymentAttempt.findUniqueOrThrow({ where: { id: attemptId }, include: { order: true } });
  const paymentRef = `DUITKU ${a.reference ?? a.merchantOrderId}`;
  try {
    if (a.installmentSeq === null) {
      const r = await markOrderPaid(a.orderId, { paymentRef });
      if (r.alreadyPaid) throw new Error("Order sudah lunas sebelumnya.");
    } else {
      await markInstallmentPaid(a.orderId, a.installmentSeq, { paymentRef });
    }
    await db.order.update({ where: { id: a.orderId }, data: { paymentMethod: "DUITKU" } });
    await notifyStaff(["admin.orders", "admin.finance"], {
      title: "Pembayaran online diterima",
      body: `Order ${a.order.code} dibayar lewat Duitku dan sudah dikonfirmasi otomatis.`,
      rows: [
        ["Jumlah", rupiah(a.amount)],
        ["Referensi Duitku", a.reference ?? "-"],
      ],
      link: `/admin/order/${a.orderId}`,
      orderId: a.orderId,
    });
  } catch (e) {
    // Uang sudah diterima tetapi order tidak bisa dilunasi otomatis (mis. sudah ditandai admin) — minta staf memeriksa.
    await notifyStaff(["admin.orders", "admin.finance"], {
      title: "Pembayaran online perlu diperiksa",
      body: `Duitku melaporkan pembayaran ${rupiah(a.amount)} untuk order ${a.order.code}, tetapi order tidak dapat dikonfirmasi otomatis: ${e instanceof Error ? e.message : "kesalahan tidak dikenal"}`,
      link: `/admin/order/${a.orderId}`,
      orderId: a.orderId,
    });
  }
}

// Callback server-ke-server dari Duitku (form-urlencoded).
export async function handleDuitkuCallback(p: Record<string, string>) {
  if (!duitkuConfigured()) return { ok: false, status: 503, message: "Belum diaktifkan" };
  const { merchantCode = "", amount = "", merchantOrderId = "", resultCode = "", reference, paymentCode, signature = "" } = p;
  const expected = hash("md5", merchantCode + amount + merchantOrderId + process.env.DUITKU_API_KEY);
  if (merchantCode !== process.env.DUITKU_MERCHANT_CODE || !sameSignature(signature, expected)) return { ok: false, status: 400, message: "Bad signature" };
  const attempt = await db.paymentAttempt.findUnique({ where: { merchantOrderId } });
  if (!attempt) return { ok: false, status: 404, message: "Unknown order" };
  if (Number(amount) !== attempt.amount) return { ok: false, status: 400, message: "Amount mismatch" };
  if (resultCode === "00") await settle(attempt.id, { reference, paymentCode });
  else if (attempt.status === "PENDING") await db.paymentAttempt.update({ where: { id: attempt.id }, data: { status: "FAILED", reference: reference ?? undefined } });
  return { ok: true, status: 200, message: "OK" };
}

// Menanyakan status langsung ke Duitku untuk semua percobaan yang masih menunggu.
// Dipakai saat customer kembali dari halaman bayar (callback tidak bisa menjangkau localhost).
export async function syncOrderPayments(orderId: string) {
  if (!duitkuConfigured()) return;
  const merchantCode = process.env.DUITKU_MERCHANT_CODE!;
  const pending = await db.paymentAttempt.findMany({ where: { orderId, status: "PENDING", reference: { not: null } } });
  for (const a of pending) {
    try {
      const res = await fetch(endpoints().status, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ merchantCode, merchantOrderId: a.merchantOrderId, signature: hash("md5", merchantCode + a.merchantOrderId + process.env.DUITKU_API_KEY) }),
        signal: AbortSignal.timeout(15000),
      });
      const d: { statusCode?: string; amount?: string | number; reference?: string } = await res.json().catch(() => ({}));
      if (d.statusCode === "00" && Number(d.amount) === a.amount) await settle(a.id, { reference: d.reference });
      else if (d.statusCode === "02") await db.paymentAttempt.update({ where: { id: a.id }, data: { status: "FAILED" } });
      else if (a.expiresAt < new Date()) await db.paymentAttempt.update({ where: { id: a.id }, data: { status: "EXPIRED" } });
    } catch {
      // Abaikan; akan dicoba lagi pada kunjungan berikutnya atau lewat callback.
    }
  }
}
