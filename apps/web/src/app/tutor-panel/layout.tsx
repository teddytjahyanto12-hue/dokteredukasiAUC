import Link from "next/link";
import { requireUser } from "@/lib/auth";

export default async function TutorLayout({ children }: { children: React.ReactNode }) {
  await requireUser(["TUTOR"]);
  return (
    <div className="container-page py-8">
      <nav className="mb-6 flex flex-wrap gap-2 text-sm">
        <Link href="/tutor-panel" className="btn-secondary btn-sm">
          Klien saya
        </Link>
        <Link href="/tutor-panel/pendapatan" className="btn-secondary btn-sm">
          Pendapatan & payroll
        </Link>
        <Link href="/akun" className="btn-secondary btn-sm">
          Akun
        </Link>
      </nav>
      {children}
    </div>
  );
}
