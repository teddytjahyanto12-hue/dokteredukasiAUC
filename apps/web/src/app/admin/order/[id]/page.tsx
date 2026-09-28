import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { rupiah, tanggal } from "@/lib/format";
import { ORDER_STATUS_LABEL } from "@/lib/constants";
import { getSettings, whatsappLink } from "@/lib/settings";
import { cancelOrderAction, markOrderPaidAction } from "@/app/actions/admin";
import { ConfirmButton } from "@/components/confirm-button";
import { Field, Flash, PageHeader } from "@/components/ui";
import { readFlash, type SearchParams } from "@/lib/flash";

export default async function AdminOrderDetail({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: SearchParams }) {
  const { id } = await params;
  const { pesan, tipe } = await readFlash(searchParams);
  const order = await db.order.findUnique({
    where: { id },
    include: { user: true, package: true, entitlements: true, mentorings: { select: { id: true } } },
  });
  if (!order) notFound();
  const s = await getSettings();
  const wa = order.user.phone
    ? whatsappLink(
        order.user.phone.replace(/^0/, "62"),
        `Halo ${order.user.name}, terima kasih telah memesan ${order.package.name} (${order.code}) di ${s.siteName}.`,
      )
    : null;

  return (
    <>
      <PageHeader title={`Order ${order.code}`} back={{ href: "/admin/order", label: "Semua order" }} />
      <Flash pesan={pesan} tipe={tipe} />
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="card space-y-2 text-sm">
          <p>
            <span className="text-slate-500">Status:</span> <strong>{ORDER_STATUS_LABEL[order.status]}</strong>
          </p>
          <p>
            <span className="text-slate-500">Paket:</span> {order.package.name}
          </p>
          <p>
            <span className="text-slate-500">Jumlah:</span> {rupiah(order.amount)}
          </p>
          <p>
            <span className="text-slate-500">Dibuat:</span> {tanggal(order.createdAt, true)}
          </p>
          {order.paidAt && (
            <p>
              <span className="text-slate-500">Lunas:</span> {tanggal(order.paidAt, true)}
            </p>
          )}
          {order.paymentRef && (
            <p>
              <span className="text-slate-500">Referensi:</span> {order.paymentRef}
            </p>
          )}
          {order.note && (
            <p>
              <span className="text-slate-500">Catatan:</span> {order.note}
            </p>
          )}
          <hr className="my-3 border-slate-100" />
          <p className="font-semibold">Murid</p>
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

        {order.status === "PENDING" && (
          <div className="space-y-6">
            <form action={markOrderPaidAction} className="card space-y-3">
              <input type="hidden" name="orderId" value={order.id} />
              <h2 className="h2">Konfirmasi pembayaran</h2>
              <p className="text-sm text-slate-600">
                Setelah ditandai lunas, akses paket langsung aktif{order.package.includesMentoring ? " dan bimbingan dibuat (menunggu tutor)" : ""}. Murid mendapat notifikasi.
              </p>
              <Field label="Jumlah dibayar (Rp)" hint="Kosongkan bila sama dengan harga paket.">
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
            <form action={cancelOrderAction} className="card space-y-3">
              <input type="hidden" name="orderId" value={order.id} />
              <h2 className="h2">Batalkan order</h2>
              <Field label="Alasan (opsional)">
                <input className="input" name="note" />
              </Field>
              <ConfirmButton message="Batalkan order ini?">Batalkan order</ConfirmButton>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
