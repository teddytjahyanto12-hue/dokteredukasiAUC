import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { requirePermission } from "@/lib/auth";
import { rupiah, tanggal } from "@/lib/format";
import { ORDER_STATUS_LABEL } from "@/lib/constants";
import { LEAD_SOURCE_LABEL } from "@/lib/installments";
import { getSettings, whatsappLink } from "@/lib/settings";
import { cancelOrderAction, markInstallmentPaidAction, markOrderPaidAction, resendReceiptAction } from "@/app/actions/admin";
import { ConfirmButton } from "@/components/confirm-button";
import { Field, Flash, PageHeader } from "@/components/ui";
import { readFlash, type SearchParams } from "@/lib/flash";

function Line({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <p>
      <span className="text-slate-500">{label}:</span> {children}
    </p>
  );
}

export default async function AdminOrderDetail({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: SearchParams }) {
  await requirePermission("admin.orders");
  const { id } = await params;
  const { pesan, tipe } = await readFlash(searchParams);
  const order = await db.order.findUnique({
    where: { id },
    include: {
      user: true,
      package: true,
      addons: true,
      installments: { orderBy: { seq: "asc" } },
      mentorings: { select: { id: true } },
    },
  });
  if (!order) notFound();
  const emails = await db.emailLog.findMany({ where: { orderId: order.id }, orderBy: { createdAt: "desc" }, take: 10 });
  const attempts = await db.paymentAttempt.findMany({ where: { orderId: order.id }, orderBy: { createdAt: "desc" }, take: 10 });
  const createdBy = order.createdById ? await db.user.findUnique({ where: { id: order.createdById }, select: { name: true } }) : null;
  const s = await getSettings();
  const next = order.installments.find((i) => i.status !== "PAID");
  const wa = order.user.phone
    ? whatsappLink(
        order.user.phone.replace(/^0/, "62"),
        `Halo ${order.user.name}, terima kasih telah memesan ${order.package.name} (${order.code}) di ${s.siteName}.${
          next ? ` Tagihan berikutnya: ${next.label} sebesar ${rupiah(next.amount)}.` : ""
        }`,
      )
    : null;
  const isInstallment = order.paymentPlan === "INSTALLMENT";

  return (
    <>
      <PageHeader title={`Order ${order.code}`} back={{ href: "/admin/order", label: "Semua order" }} />
      <Flash pesan={pesan} tipe={tipe} />
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="card space-y-2 text-sm">
          <Line label="Status">
            <strong>{ORDER_STATUS_LABEL[order.status]}</strong>
          </Line>
          <Line label="Layanan">{order.package.name}</Line>
          {order.durationLabel && (
            <Line label="Masa belajar">
              {order.durationLabel} ({rupiah(order.basePrice)})
            </Line>
          )}
          {order.addons.map((a) => (
            <Line key={a.id} label="Add-on">
              {a.name} ({rupiah(a.price)})
            </Line>
          ))}
          {order.discount !== null && <Line label="Diskon">− {rupiah(order.discount)}</Line>}
          <Line label="Total">{rupiah(order.amount)}</Line>
          <Line label="Cara bayar">{isInstallment ? `Cicilan ${order.installments.length}x` : "Bayar penuh"}</Line>
          {order.leadSource && <Line label="Sumber pelanggan">{LEAD_SOURCE_LABEL[order.leadSource] ?? order.leadSource}</Line>}
          <Line label="Dibuat">
            {tanggal(order.createdAt, true)}
            {createdBy ? ` · diinput oleh ${createdBy.name}` : " · dipesan pelanggan di website"}
          </Line>
          {order.paidAt && <Line label="Lunas">{tanggal(order.paidAt, true)}</Line>}
          {order.paymentRef && <Line label="Referensi">{order.paymentRef}</Line>}
          {order.note && <Line label="Catatan">{order.note}</Line>}
          <hr className="my-3 border-slate-100" />
          <p className="font-semibold">Pelanggan</p>
          <p>
            <Link href={`/admin/pengguna/${order.user.id}`} className="link">
              {order.user.name}
            </Link>{" "}
            · {order.user.email}
          </p>
          <p>WhatsApp: {order.user.phone ?? "-"}</p>
          {wa && (
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-secondary btn-sm mt-2">
              Hubungi via WhatsApp
            </a>
          )}
          {order.mentorings.map((m) => (
            <p key={m.id}>
              <Link href={`/bimbingan/${m.id}`} className="link">
                Buka bimbingan dari order ini →
              </Link>
            </p>
          ))}
        </div>

        <div className="space-y-6">
          {isInstallment && (
            <section className="card">
              <h2 className="h2 mb-3">Jadwal cicilan</h2>
              <ol className="space-y-3">
                {order.installments.map((i) => (
                  <li key={i.id} className="rounded-lg border border-slate-200 p-3 text-sm">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-semibold">
                        {i.label} · {i.percent}% · {rupiah(i.amount)}
                      </span>
                      <span className={i.status === "PAID" ? "badge-brand" : "badge-warn"}>{i.status === "PAID" ? "Lunas" : "Belum dibayar"}</span>
                    </div>
                    <p className="text-xs text-slate-500">
                      {i.seq === 1 ? "Membuka layanan & tahap 1" : `Membuka tahap ${i.unlocksStage}`}
                      {i.paidAt && ` · dibayar ${tanggal(i.paidAt, true)}`}
                      {i.paymentRef && ` · ref ${i.paymentRef}`}
                    </p>
                    {order.status !== "CANCELLED" && next?.id === i.id && (
                      <form action={markInstallmentPaidAction} className="mt-3 flex flex-wrap items-end gap-2">
                        <input type="hidden" name="orderId" value={order.id} />
                        <input type="hidden" name="seq" value={i.seq} />
                        <Field label="Referensi transfer">
                          <input className="input w-56" name="paymentRef" placeholder="No. transfer / bank" />
                        </Field>
                        <ConfirmButton message={`Konfirmasi ${i.label} sudah dibayar?`} className="btn btn-sm mb-1">
                          Konfirmasi lunas
                        </ConfirmButton>
                      </form>
                    )}
                  </li>
                ))}
              </ol>
            </section>
          )}

          {!isInstallment && order.status === "PENDING" && (
            <form action={markOrderPaidAction} className="card space-y-3">
              <input type="hidden" name="orderId" value={order.id} />
              <h2 className="h2">Konfirmasi pembayaran</h2>
              <p className="text-sm text-slate-600">
                Setelah ditandai lunas, akses layanan langsung aktif{order.package.includesMentoring ? " dan bimbingan dibuat (menunggu tutor)" : ""}. Pelanggan mendapat
                notifikasi.
              </p>
              <Field label="Jumlah dibayar (Rp)" hint="Kosongkan bila sama dengan total.">
                <input className="input" name="amount" inputMode="numeric" defaultValue={order.amount ?? ""} />
              </Field>
              <Field label="Referensi pembayaran (opsional)">
                <input className="input" name="paymentRef" placeholder="No. transfer / bank" />
              </Field>
              <Field label="Catatan (opsional)">
                <input className="input" name="note" />
              </Field>
              <button className="btn" type="submit">
                Tandai lunas & aktifkan akses
              </button>
            </form>
          )}

          {attempts.length > 0 && (
            <section className="card space-y-2">
              <h2 className="h2">Pembayaran online (Duitku)</h2>
              <ul className="text-xs text-slate-600">
                {attempts.map((p) => (
                  <li key={p.id}>
                    {tanggal(p.createdAt, true)} · {p.installmentSeq ? `Cicilan ${p.installmentSeq}` : "Bayar penuh"} · {rupiah(p.amount)} ·{" "}
                    <span className={p.status === "PAID" ? "text-emerald-700" : p.status === "PENDING" ? "text-amber-700" : "text-slate-500"}>
                      {{ PAID: "berhasil", PENDING: "menunggu pembayaran", FAILED: "gagal/dibatalkan", EXPIRED: "kedaluwarsa" }[p.status] ?? p.status}
                    </span>
                    {p.reference && ` · ref ${p.reference}`}
                    {p.paymentCode && ` · ${p.paymentCode}`}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {(order.status === "PAID" || order.status === "PARTIAL") && (
            <section className="card space-y-3">
              <h2 className="h2">Kwitansi</h2>
              <div className="flex flex-wrap gap-2">
                <Link href={`/pembelian/${order.id}/kwitansi`} className="btn-secondary btn-sm">
                  Lihat / cetak kwitansi
                </Link>
                <form action={resendReceiptAction}>
                  <input type="hidden" name="orderId" value={order.id} />
                  <button className="btn btn-sm" type="submit">
                    Kirim ulang kwitansi ke email
                  </button>
                </form>
              </div>
              {emails.length > 0 && (
                <ul className="text-xs text-slate-600">
                  {emails.map((e) => (
                    <li key={e.id}>
                      {tanggal(e.createdAt, true)} · {e.subject} ·{" "}
                      <span className={e.status === "SENT" ? "text-emerald-700" : "text-amber-700"}>
                        {e.status === "SENT" ? "terkirim" : e.status === "SKIPPED" ? "tidak dikirim (SMTP belum diatur)" : `gagal: ${e.error}`}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

          {order.status === "PENDING" && (
            <form action={cancelOrderAction} className="card space-y-3">
              <input type="hidden" name="orderId" value={order.id} />
              <h2 className="h2">Batalkan order</h2>
              <Field label="Alasan (opsional)">
                <input className="input" name="note" />
              </Field>
              <ConfirmButton message="Batalkan order ini?">Batalkan order</ConfirmButton>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
