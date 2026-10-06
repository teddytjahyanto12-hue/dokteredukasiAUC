import Link from "next/link";
import { getCurrentUser, homeFor } from "@/lib/auth";
import { getSettings } from "@/lib/settings";
import { db } from "@/lib/db";
import { ROLE_LABEL, type Role } from "@/lib/constants";
import { learningStreak } from "@/lib/streak";
import { logoutAction } from "@/app/actions/auth";
import { Icon } from "@/components/icons";
import { NavLinks, type NavItem } from "@/components/nav-links";

// Nama situs dipecah menjadi wordmark (dua kata pertama) dan baris kecil di bawahnya (sisanya).
export function splitSiteName(name: string) {
  const words = name.trim().split(/\s+/);
  return { main: words.slice(0, 2).join(" "), sub: words.slice(2).join(" ") };
}

// Top bar: (1) logo & wordmark + pencarian, (2) tiga tautan berikon, (3) streak & profil.
export async function SiteHeader() {
  const [user, settings] = await Promise.all([getCurrentUser(), getSettings()]);
  const [unread, streak] = await Promise.all([
    user ? db.notification.count({ where: { userId: user.id, readAt: null } }) : 0,
    user?.role === "STUDENT" ? learningStreak(user.id) : null,
  ]);
  const { main, sub } = splitSiteName(settings.siteName);
  const home = user ? homeFor(user) : "/masuk?next=/belajar";
  const items: NavItem[] = [
    { href: "/kelas", label: "Katalog Kursus", icon: "book", match: ["/kelas", "/materi", "/quiz", "/jalur", "/program"] },
    { href: "/rekomendasi", label: "Tes Rekomendasi", icon: "sparkles", match: ["/rekomendasi"] },
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
      <div className="mx-auto flex h-[72px] w-full max-w-[1400px] items-center gap-4 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand text-base font-bold text-white">DE</span>
          <span className="hidden leading-none sm:block">
            <span className="block font-[family-name:var(--font-fraunces),Georgia,serif] text-xl font-bold tracking-tight text-slate-900">{main}</span>
            {sub && <span className="mt-0.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-brand">{sub}</span>}
          </span>
        </Link>

        <form action="/kelas" className="group relative hidden md:block">
          <Icon name="search" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            name="q"
            type="search"
            aria-label="Cari kelas"
            placeholder="Cari kelas…"
            className="h-9 w-12 cursor-pointer rounded-full bg-slate-100 pl-9 pr-2 text-sm text-transparent outline-none transition-all placeholder:text-transparent focus:w-56 focus:cursor-text focus:bg-white focus:text-slate-900 focus:ring-2 focus:ring-brand/30 focus:placeholder:text-slate-400"
          />
        </form>

        <nav className="hidden flex-1 items-center gap-1 lg:flex">
          <NavLinks items={items} />
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-3">
          {user ? (
            <>
              {streak && (
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-2.5 py-1.5 text-sm font-semibold text-amber-700" title="Streak belajar: hari berturut-turut Anda menyelesaikan materi atau quiz">
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
                <span className="hidden leading-tight xl:block">
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
      <nav className="flex gap-1 overflow-x-auto px-3 pb-2 lg:hidden">
        <NavLinks items={items} compact />
      </nav>
    </header>
  );
}
