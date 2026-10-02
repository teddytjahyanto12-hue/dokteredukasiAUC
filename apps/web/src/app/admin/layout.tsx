import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { ADMIN_PAGES, hasPermission } from "@/lib/permissions";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser(["OWNER", "ADMIN"]);
  // Menu hanya menampilkan fitur yang dicentang owner (owner melihat semua).
  const nav = ADMIN_PAGES.filter((p) => hasPermission(user, p.key) && p.key !== "admin.tutors").map((p) => [p.href, p.label] as const);
  if (user.role === "OWNER" || hasPermission(user, "admin.tutors")) nav.splice(5, 0, ["/admin/tim", user.role === "OWNER" ? "Tim & hak akses" : "Data tutor"]);
  return (
    <div className="container-page grid gap-6 py-8 lg:grid-cols-[210px_1fr]">
      <aside>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{user.role === "OWNER" ? "Owner" : "Admin"}</p>
        <nav className="flex gap-1 overflow-x-auto lg:flex-col">
          {nav.map(([href, label]) => (
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
