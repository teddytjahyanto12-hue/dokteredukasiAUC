import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { TUTOR_PAGES, hasPermission } from "@/lib/permissions";

export default async function TutorLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser(["TUTOR"]);
  // Menu sesuai fitur yang dicentang owner untuk tutor ini.
  const pages = TUTOR_PAGES.filter((p) => hasPermission(user, p.key));
  return (
    <div className="container-page py-8">
      <nav className="mb-6 flex flex-wrap gap-2 text-sm">
        {pages.map((p) => (
          <Link key={p.href} href={p.href} className="btn-secondary btn-sm">
            {p.label}
          </Link>
        ))}
        <Link href="/akun" className="btn-secondary btn-sm">
          Akun
        </Link>
      </nav>
      {pages.length === 0 ? <p className="muted">Owner belum memberikan akses fitur apa pun ke akun ini.</p> : children}
    </div>
  );
}
