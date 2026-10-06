import { db } from "@/lib/db";
import { requirePermission } from "@/lib/auth";
import { smtpConfigured } from "@/lib/email";
import { tanggal } from "@/lib/format";
import { Empty, PageHeader } from "@/components/ui";

export const metadata = { title: "Email" };

const KIND_LABEL: Record<string, string> = {
  RECEIPT: "Kwitansi",
  NEW_CUSTOMER: "Pelanggan baru",
  NEW_ORDER: "Order baru",
  NOTIFICATION: "Notifikasi",
  REPORT: "Laporan berkala",
};

export default async function EmailPage() {
  await requirePermission("admin.settings");
  const logs = await db.emailLog.findMany({ orderBy: { createdAt: "desc" }, take: 200 });
  const configured = smtpConfigured();

  return (
    <>
      <PageHeader title="Email" subtitle="Status pengiriman email otomatis: kwitansi pelanggan, pemberitahuan pelanggan & order baru." />
      <section className={`card mb-6 ${configured ? "border-emerald-200" : "border-amber-200 bg-amber-50"}`}>
        <h2 className="h2">Pengirim email (SMTP)</h2>
        {configured ? (
          <p className="mt-1 text-sm text-emerald-800">
            Aktif — dikirim dari <strong>{process.env.MAIL_FROM || process.env.SMTP_USER}</strong> melalui {process.env.SMTP_HOST}.
          </p>
        ) : (
          <div className="mt-1 space-y-2 text-sm text-amber-900">
            <p>Belum diatur, jadi email belum benar-benar dikirim (tetap tercatat di bawah sebagai “tidak dikirim”).</p>
            <p>
              Isi di file <code>apps/web/.env</code> lalu jalankan ulang website. Contoh untuk Gmail (pakai App Password, bukan sandi biasa):
            </p>
            <pre className="overflow-x-auto rounded-lg bg-white p-3 text-xs text-slate-700">{`SMTP_HOST="smtp.gmail.com"
SMTP_PORT="465"
SMTP_USER="emailanda@gmail.com"
SMTP_PASS="app-password-16-huruf"
MAIL_FROM="Dokter Edukasi <emailanda@gmail.com>"
APP_URL="http://localhost:3000"`}</pre>
          </div>
        )}
      </section>

      {logs.length === 0 ? (
        <Empty>Belum ada email.</Empty>
      ) : (
        <div className="card overflow-x-auto p-0">
          <table className="table">
            <thead>
              <tr>
                <th>Waktu</th>
                <th>Jenis</th>
                <th>Kepada</th>
                <th>Subjek</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((l) => (
                <tr key={l.id}>
                  <td className="whitespace-nowrap text-xs">{tanggal(l.createdAt, true)}</td>
                  <td className="text-xs">{KIND_LABEL[l.kind] ?? l.kind}</td>
                  <td className="text-xs">{l.to}</td>
                  <td>{l.subject}</td>
                  <td className="text-xs">
                    {l.status === "SENT" ? (
                      <span className="badge-brand">Terkirim</span>
                    ) : l.status === "SKIPPED" ? (
                      <span className="badge">Tidak dikirim</span>
                    ) : (
                      <span className="badge-warn">Gagal</span>
                    )}
                    {l.status === "FAILED" && <p className="mt-1 max-w-xs text-red-700">{l.error}</p>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
