import Image from "next/image";
import Link from "next/link";
import { getCurrentUser, homeFor } from "@/lib/auth";
import { getSettings } from "@/lib/settings";
import { db } from "@/lib/db";
import { ROLE_LABEL, type Role } from "@/lib/constants";
import { learningStreak } from "@/lib/streak";
import { logoutAction } from "@/app/actions/auth";
import { Icon } from "@/components/icons";
import { NavLinks, type NavItem } from "@/components/nav-links";
import { SiteSearch } from "@/components/site-search";

// Top bar: (1) logo & wordmark + pencarian, (2) tiga tautan berikon, (3) streak & profil.
export async function SiteHeader() {
  const [user, settings] = await Promise.all([getCurrentUser(), getSettings()]);
  const [unread, streak] = await Promise.all([
    user ? db.notification.count({ where: { userId: user.id, readAt: null } }) : 0,
    user?.role === "STUDENT" ? learningStreak(user.id) : null,
  ]);
  const home = user ? homeFor(user) : "/masuk?next=/belajar";
  const items: NavItem[] = [
    { href: "/kelas", label: "Katalog Kelas", icon: "book", match: ["/kelas", "/materi", "/quiz", "/jalur", "/program"] },
    { href: "/kalkulator", label: "Kalkulator Medis", icon: "calculator", match: ["/kalkulator"] },
    { href: "/dosis-obat", label: "Dosis Obat", icon: "pill", match: ["/dosis-obat"] },
    {
      href: !user || user.role === "STUDENT" ? (user ? "/belajar" : home) : home,
      label: !user || user.role === "STUDENT" ? "Pembelajaran Saya" : "Dashboard",
      icon: "award",
      match: ["/belajar", "/admin", "/tutor-panel", "/pembelian", "/bimbingan"],
      dot: !!streak && !streak.activeToday,
    },
  ];
  const initials = user
    ? user.name
        .replace(/^(dr\.?|drg\.?)\s+/i, "")
        .split(/\s+/)
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase() ?? "")
        .join("")
    : "";

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white print:hidden">
      <div className="mx-auto flex h-[72px] w-full max-w-[1400px] items-center gap-2 px-4 sm:gap-3 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <span className="brand-emblem" aria-hidden="true"><Image src="/brand/identity.png" alt="" width={1536} height={1024} unoptimized /><span className="sr-only">DE</span></span>
          <span className="hidden leading-none sm:block">
            <span className="block font-sans text-base font-bold tracking-tight text-slate-900">{settings.siteName}</span>
            {settings.siteTagline && <span className="mt-1 block text-[11px] font-semibold tracking-[0.04em] text-brand">{settings.siteTagline}</span>}
          </span>
        </Link>

        <div className="hidden md:block">
          <SiteSearch />
        </div>
        <Link href="/cari" className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-500 md:hidden" aria-label="Cari">
          <Icon name="search" className="h-4 w-4" />
        </Link>

        <nav className="hidden flex-1 items-center gap-1 xl:flex">
          <NavLinks items={items} />
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
          {user ? (
            <>
              {streak && (
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-2.5 py-1.5 text-sm font-semibold text-amber-700" title="Streak belajar: hari berturut-turut menyelesaikan materi atau kuis">
                  <Icon name="flame" className="h-4 w-4 text-orange-500" fill />
                  <span className="num">{streak.days}</span> Hari
                </span>
              )}
              <Link href="/notifikasi" className="relative rounded-lg px-1.5 py-1 text-sm text-slate-600 hover:bg-slate-100" title="Notifikasi">
                🔔
                {unread > 0 && <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">{unread}</span>}
              </Link>
              <Link href={home} className="flex items-center gap-2.5" title="Buka dashboard">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-slate-800 text-xs font-bold text-white">{initials}</span>
                <span className="hidden leading-tight 2xl:block">
                  <span className="block max-w-[160px] truncate text-sm font-semibold text-slate-900">{user.name}</span>
                  <span className="block text-xs text-slate-500">{ROLE_LABEL[user.role as Role] ?? user.role}</span>
                </span>
              </Link>
              <form action={logoutAction}>
                <button className="rounded-lg px-2 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-900" type="submit">
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
      <nav className="flex justify-between gap-1 px-3 pb-2 md:justify-start xl:hidden" aria-label="Navigasi utama">
        <NavLinks items={items} compact />
      </nav>
    </header>
  );
}
