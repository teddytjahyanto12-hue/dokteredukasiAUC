"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "@/components/icons";

export type NavItem = { href: string; label: string; icon: IconName; match: string[]; dot?: boolean };

// Tautan navigasi atas dengan ikon; tautan halaman aktif diberi latar biru muda.
export function NavLinks({ items, compact }: { items: NavItem[]; compact?: boolean }) {
  const pathname = usePathname();
  return (
    <>
      {items.map((it) => {
        const active = it.match.some((m) => pathname === m || pathname.startsWith(`${m}/`));
        return (
          <Link
            key={it.href}
            href={it.href}
            aria-current={active ? "page" : undefined}
            className={`relative inline-flex items-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition ${compact ? "px-2.5 py-1.5" : "px-3 py-2"} ${
              active ? "bg-brand-soft text-brand" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <Icon name={it.icon} className={`h-4 w-4 ${it.icon === "sparkles" ? "text-amber-500" : ""}`} />
            {compact ? <><span className="sm:hidden">{it.href === "/kelas" ? "Kelas" : it.href === "/rekomendasi" ? "Rekomendasi" : it.label === "Dashboard" ? "Dashboard" : "Belajar"}</span><span className="hidden sm:inline">{it.label}</span></> : it.label}
            {it.dot && <span className="absolute right-1 top-1.5 h-1.5 w-1.5 rounded-full bg-mascot" aria-hidden />}
          </Link>
        );
      })}
    </>
  );
}
