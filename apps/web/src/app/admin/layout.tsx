import Link from "next/link";
import { requireUser } from "@/lib/auth";

const NAV = [
  ["/admin", "Ringkasan"],
  ["/admin/order", "Order"],
  ["/admin/bimbingan", "Bimbingan"],
  ["/admin/pengguna", "Pengguna & tutor"],
  ["/admin/konten", "Konten materi"],
  ["/admin/paket", "Paket"],
  ["/admin/payroll", "Payroll tutor"],
  ["/admin/pengaturan", "Pengaturan situs"],
] as const;

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireUser(["ADMIN"]);
  return (
    <div className="container-page grid gap-6 py-8 lg:grid-cols-[210px_1fr]">
      <aside>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Admin Master</p>
        <nav className="flex gap-1 overflow-x-auto lg:flex-col">
          {NAV.map(([href, label]) => (
            <Link key={href} href={href} className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-white hover:text-brand">
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
