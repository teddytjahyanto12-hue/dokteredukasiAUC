import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { rupiah, tanggal } from "@/lib/format";
import { ORDER_STATUS_LABEL } from "@/lib/constants";
import { getSettings, whatsappLink } from "@/lib/settings";
import { fillWaTemplate, loadOrderForReceipt } from "@/lib/receipts";
import { Flash, PageHeader } from "@/components/ui";
import type { SearchParams } from "@/lib/flash";
import { duitkuConfigured, duitkuSandbox } from "@/lib/duitku";
import { checkPaymentAction, payOnlineAction } from "@/app/actions/student";

export default async function OrderDetail({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: SearchParams }) {
  const user = await requireUser();
  const { id } = await params;
  const sp = await searchParams;
  const order = await db.order.findFirst({ where: { id, userId: user.id }, include: { package: true, addons: true, installments: { orderBy: { seq: "asc" } } } });
  if (!order) notFound();
  const s = await getSettings();
  const next = order.installments.find((i) => i.status !== "PAID");
  const full = await loadOrderForReceipt(order.id);
  // Pesan konfirmasi dari template di Pengaturan situs: identitas pelanggan + layanan + tagihan.
  const wa = full ? whatsappLink(s.adminWhatsapp, fillWaTemplate(s.waConfirmTemplate, s.siteName, full)) : null;
  const awaiting = order.status === "PENDING" || order.status === "PARTIAL";
  const online = duitkuConfigured();
  const pendingOnline = online ? await db.paymentAttempt.count({ where: { orderId: order.id, status: "PENDING", reference: { not: null } } }) : 0;
  const pesan = typeof sp.pesan === "string" ? sp.pesan : undefined;

  return (
    <div className="container-page max-w-2xl py-10">
      <PageHeader title={`Pesanan ${order.code}`} back={{ href: "/pembelian", label: "Riwayat pembelian" }} />
      {sp.baru && (
        <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Pesanan dibuat. Admin sudah menerima notifikasi pesanan Anda.
        </div>
      )}
      <Flash pesan={pesan} tipe={typeof sp.tipe === "string" ? sp.tipe : undefined} />
      {sp.bayar === "cek" && (
        <div className={`mb-4 rounded-lg border px-4 py-3 text-sm ${awaiting && pendingOnline ? "border-amber-200 bg-amber-50 text-amber-800" : "border-emerald-200 bg-emerald-50 text-emerald-800"}`}>
          {awaiting && pendingOnline
            ? "Pembayaran belum kami terima. Bila Anda sudah membayar, tunggu sebentar lalu tekan “Cek status pembayaran”."
            : awaiting
              ? "Status pembayaran sudah diperbarui."
              : "Pembayaran diterima. Terima kasih — akses Anda sudah aktif."}
        </div>
      )}
      <div className="card space-y-3">
        <Row label="Layanan" value={order.package.name} />
        {order.durationLabel && <Row label={`Masa belajar ${order.durationLabel}`} value={rupiah(order.basePrice)} />}
        {order.addons.map((a) => (
          <Row key={a.id} label={`Add-on: ${a.name}`} value={rupiah(a.price)} />
        ))}
        {order.discount !== null && <Row label="Diskon" value={`− ${rupiah(order.discount)}`} />}
        <Row label="Total" value={rupiah(order.amount)} />
        <Row label="Tanggal" value={tanggal(order.createdAt, true)} />
        <Row label="Status" value={ORDER_STATUS_LABEL[order.status]} />
        {order.paidAt && <Row label="Dibayar" value={tanggal(order.paidAt, true)} />}
      </div>

      {order.installments.length > 0 && (
        <div className="card mt-6">
          <h2 className="h2 mb-3">Jadwal cicilan</h2>
          <ol className="space-y-2 text-sm">
            {order.installments.map((i) => (
              <li key={i.id} className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 px-3 py-2">
                <span>
                  {i.label} ({i.percent}%)
                  <span className="block text-xs text-slate-500">{i.seq === 1 ? "Membuka layanan & tahap 1" : `Membuka tahap ${i.unlocksStage}`}</span>
                </span>
                <span className="text-right">
                  <span className="block font-semibold">{rupiah(i.amount)}</span>
                  <span className={i.status === "PAID" ? "badge-brand" : "badge-warn"}>{i.status === "PAID" ? "Lunas" : "Belum dibayar"}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {awaiting && (
        <div className="card mt-6">
          <h2 className="h2">Langkah pembayaran{next ? ` — ${next.label} (${rupiah(next.amount)})` : ""}</h2>
          {online && (
            <div className="mt-4 rounded-lg border border-slate-200 p-4">
              <p className="text-sm font-semibold text-slate-900">Bayar online — otomatis terkonfirmasi</p>
              <p className="mt-1 text-xs text-slate-500">Virtual account bank, QRIS, e-wallet, atau kartu melalui Duitku. Akses langsung aktif setelah pembayaran berhasil.</p>
              <form className="mt-3 flex flex-wrap gap-2">
                <button className="btn" formAction={payOnlineAction.bind(null, order.id)}>
                  Bayar sekarang {rupiah(next ? next.amount : order.amount)}
                </button>
                {pendingOnline > 0 && (
                  <button className="btn-secondary" formAction={checkPaymentAction.bind(null, order.id)}>
                    Cek status pembayaran
                  </button>
                )}
              </form>
              {duitkuSandbox() && <p className="mt-2 text-xs text-amber-700">Mode uji coba (sandbox): belum memakai uang sungguhan.</p>}
            </div>
          )}
          {online && <p className="mt-5 text-sm font-semibold text-slate-900">Atau transfer manual</p>}
          <p className="mt-2 whitespace-pre-line text-sm text-slate-600">{s.paymentInstructions}</p>
          {wa ? (
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn mt-4 bg-[#25D366] hover:bg-[#1ebe5b]">
              Konfirmasi pembayaran ke admin via WhatsApp
            </a>
          ) : (
            <p className="mt-4 text-sm text-slate-500">Nomor WhatsApp admin belum diatur. Hubungi admin melalui kontak yang tersedia.</p>
          )}
          <p className="mt-2 text-xs text-slate-500">Pesan berisi identitas Anda, kode order, layanan, dan nominal tagihan. Lampirkan bukti transfer di WhatsApp.</p>
        </div>
      )}
      {(order.status === "PAID" || order.status === "PARTIAL") && (
        <Link href={`/pembelian/${order.id}/kwitansi`} className="btn-secondary mt-6 mr-2">
          Lihat kwitansi
        </Link>
      )}
      {(order.status === "PAID" || order.status === "PARTIAL") && (
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
