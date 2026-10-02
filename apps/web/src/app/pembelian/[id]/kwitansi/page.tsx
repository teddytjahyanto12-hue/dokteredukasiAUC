import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { hasPermission } from "@/lib/permissions";
import { loadOrderForReceipt, orderSummary } from "@/lib/receipts";
import { getSettings } from "@/lib/settings";
import { rupiah, tanggal } from "@/lib/format";
import { ORDER_STATUS_LABEL } from "@/lib/constants";
import { PrintButton } from "@/components/print-button";

export const metadata = { title: "Kwitansi" };

// Kwitansi yang bisa dicetak / disimpan sebagai PDF dari browser.
export default async function ReceiptPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await params;
  const o = await loadOrderForReceipt(id);
  if (!o) notFound();
  if (o.userId !== user.id && !hasPermission(user, "admin.orders")) notFound();
  if (o.status !== "PAID" && o.status !== "PARTIAL") {
    return (
      <div className="container-page max-w-2xl py-10">
        <p className="muted">Kwitansi tersedia setelah pembayaran dikonfirmasi admin.</p>
        <Link href={`/pembelian/${o.id}`} className="link">
          Kembali ke pesanan
        </Link>
      </div>
    );
  }
  const s = await getSettings();
  const sum = orderSummary(o);
  const paidInstallments = o.installments.filter((i) => i.status === "PAID");

  return (
    <div className="container-page max-w-2xl py-10 print:max-w-none print:py-0">
      <div className="mb-4 flex flex-wrap justify-between gap-2 print:hidden">
        <Link href={o.userId === user.id ? `/pembelian/${o.id}` : `/admin/order/${o.id}`} className="text-sm text-slate-500 hover:text-brand">
          ← Kembali
        </Link>
        <PrintButton />
      </div>
      <article className="card print:border-0 print:shadow-none">
        <header className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <p className="text-lg font-bold text-brand">{s.siteName}</p>
            <h1 className="text-2xl font-bold">Kwitansi pembayaran</h1>
          </div>
          <div className="text-right text-sm">
            <p className="font-semibold">{o.code}</p>
            <p className="text-slate-500">Status: {ORDER_STATUS_LABEL[o.status]}</p>
          </div>
        </header>

        <section className="grid gap-4 py-4 text-sm sm:grid-cols-2">
          <div>
            <p className="text-slate-500">Diterima dari</p>
            <p className="font-semibold">{sum.customer}</p>
            <p>{sum.email}</p>
            <p>{sum.phone}</p>
          </div>
          <div className="sm:text-right">
            <p className="text-slate-500">Tanggal order</p>
            <p>{tanggal(o.createdAt, true)}</p>
            {o.paidAt && (
              <>
                <p className="mt-2 text-slate-500">Lunas</p>
                <p>{tanggal(o.paidAt, true)}</p>
              </>
            )}
          </div>
        </section>

        <table className="table">
          <thead>
            <tr>
              <th>Rincian</th>
              <th className="text-right">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {o.package.name}
                {o.durationLabel && <span className="block text-xs text-slate-500">Masa belajar {o.durationLabel}</span>}
              </td>
              <td className="text-right">{rupiah(o.basePrice ?? o.amount)}</td>
            </tr>
            {o.addons.map((a) => (
              <tr key={a.id}>
                <td>Add-on: {a.name}</td>
                <td className="text-right">{rupiah(a.price)}</td>
              </tr>
            ))}
            {o.discount !== null && (
              <tr>
                <td>Diskon</td>
                <td className="text-right">− {rupiah(o.discount)}</td>
              </tr>
            )}
            <tr>
              <td className="font-bold">Total</td>
              <td className="text-right font-bold">{rupiah(o.amount)}</td>
            </tr>
          </tbody>
        </table>

        {o.paymentPlan === "INSTALLMENT" ? (
          <section className="mt-6">
            <h2 className="h2 mb-2">Pembayaran cicilan</h2>
            <table className="table">
              <tbody>
                {o.installments.map((i) => (
                  <tr key={i.id}>
                    <td>
                      {i.label} ({i.percent}%)
                      {i.paidAt && <span className="block text-xs text-slate-500">Dibayar {tanggal(i.paidAt, true)}{i.paymentRef ? ` · ref ${i.paymentRef}` : ""}</span>}
                    </td>
                    <td className="text-right">{rupiah(i.amount)}</td>
                    <td className="text-right">{i.status === "PAID" ? "Lunas" : "Belum dibayar"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-right text-sm">
              Total dibayar: <strong>{rupiah(paidInstallments.reduce((t, i) => t + (i.amount ?? 0), 0))}</strong>
            </p>
          </section>
        ) : (
          o.paymentRef && <p className="mt-4 text-sm text-slate-600">Referensi pembayaran: {o.paymentRef}</p>
        )}

        <p className="mt-8 text-xs text-slate-500">Kwitansi ini dibuat otomatis oleh {s.siteName} dan sah tanpa tanda tangan.</p>
      </article>
    </div>
  );
}
