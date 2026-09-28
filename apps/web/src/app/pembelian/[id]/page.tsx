import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { rupiah, tanggal } from "@/lib/format";
import { ORDER_STATUS_LABEL } from "@/lib/constants";
import { getSettings, whatsappLink } from "@/lib/settings";
import { PageHeader } from "@/components/ui";
import type { SearchParams } from "@/lib/flash";

export default async function OrderDetail({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: SearchParams }) {
  const user = await requireUser();
  const { id } = await params;
  const sp = await searchParams;
  const order = await db.order.findFirst({ where: { id, userId: user.id }, include: { package: true } });
  if (!order) notFound();
  const s = await getSettings();
  const wa = whatsappLink(
    s.adminWhatsapp,
    `Halo admin, saya ${user.name} ingin konfirmasi pembayaran pesanan ${order.code} (${order.package.name}).`,
  );

  return (
    <div className="container-page max-w-2xl py-10">
      <PageHeader title={`Pesanan ${order.code}`} back={{ href: "/pembelian", label: "Riwayat pembelian" }} />
      {sp.baru && (
        <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Pesanan dibuat. Admin sudah menerima notifikasi pesanan Anda.
        </div>
      )}
      <div className="card space-y-3">
        <Row label="Paket" value={order.package.name} />
        <Row label="Jumlah" value={rupiah(order.amount)} />
        <Row label="Tanggal" value={tanggal(order.createdAt, true)} />
        <Row label="Status" value={ORDER_STATUS_LABEL[order.status]} />
        {order.paidAt && <Row label="Dibayar" value={tanggal(order.paidAt, true)} />}
      </div>

      {order.status === "PENDING" && (
        <div className="card mt-6">
          <h2 className="h2">Langkah pembayaran</h2>
          <p className="mt-2 whitespace-pre-line text-sm text-slate-600">{s.paymentInstructions}</p>
          {wa && (
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn mt-4">
              Konfirmasi via WhatsApp
            </a>
          )}
        </div>
      )}
      {order.status === "PAID" && (
        <Link href="/belajar" className="btn mt-6">
          Mulai belajar
        </Link>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="text-right font-medium text-slate-900">{value}</span>
    </div>
  );
}
