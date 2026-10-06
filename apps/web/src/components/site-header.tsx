import Link from "next/link";
import { getCurrentUser, homeFor } from "@/lib/auth";
import { getSettings } from "@/lib/settings";
import { db } from "@/lib/db";
import { logoutAction } from "@/app/actions/auth";

// Top bar: (1) wordmark, (2) tautan teks ringkas, (3) notifikasi & profil.
const NAV = [
  ["/kelas", "Katalog kelas"],
  ["/jalur", "Jalur belajar"],
  ["/paket", "Bimbingan & layanan"],
  ["/penawaran", "Penawaran"],
] as const;

export async function SiteHeader() {
  const [user, settings] = await Promise.all([getCurrentUser(), getSettings()]);
  const unread = user ? await db.notification.count({ where: { userId: user.id, readAt: null } }) : 0;

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white print:hidden">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-slate-900">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-brand text-sm text-white">DE</span>
          <span className="hidden font-[family-name:var(--font-fraunces),Georgia,serif] text-lg font-semibold tracking-tight sm:inline">{settings.siteName}</span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 lg:flex">
          {NAV.map(([href, label]) => (
            <Link key={href} href={href} className="hover:text-brand">
              {label}
            </Link>
          ))}
          {user?.role === "STUDENT" && (
            <Link href="/belajar" className="hover:text-brand">
              Pembelajaran saya
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link href="/notifikasi" className="relative rounded-lg px-2 py-1 text-sm text-slate-600 hover:bg-slate-100" title="Notifikasi">
                🔔
                {unread > 0 && (
                  <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
                    {unread}
                  </span>
                )}
              </Link>
              <Link href={homeFor(user)} className="btn-secondary btn-sm" title="Buka dashboard">
                {user.name.split(" ")[0]}
              </Link>
              <form action={logoutAction}>
                <button className="btn-secondary btn-sm" type="submit">
                  Keluar
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/masuk" className="btn-secondary btn-sm">
                Masuk
              </Link>
              <Link href="/daftar" className="btn btn-sm">
                Daftar
              </Link>
            </>
          )}
        </div>
      </div>
      <nav className="container-page flex gap-5 overflow-x-auto pb-2 text-sm font-medium text-slate-600 lg:hidden">
        {NAV.map(([href, label]) => (
          <Link key={href} href={href} className="whitespace-nowrap hover:text-brand">
            {label}
          </Link>
        ))}
        {user?.role === "STUDENT" && (
          <Link href="/belajar" className="whitespace-nowrap hover:text-brand">
            Pembelajaran saya
          </Link>
        )}
      </nav>
    </header>
  );
}
