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
            className={`relative inline-flex items-center whitespace-nowrap rounded-lg font-medium transition ${
              compact ? "min-w-0 flex-1 flex-col gap-0.5 px-1 py-1.5 text-[11px] md:flex-none md:flex-row md:gap-2 md:px-2.5 md:text-sm" : "gap-1.5 px-2.5 py-2 text-sm"
            } ${
              active ? "bg-ink font-semibold text-white" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <Icon name={it.icon} className={`h-4 w-4 ${it.icon === "sparkles" ? "text-current" : ""}`} />
            {compact ? <><span className="md:hidden">{it.href === "/kelas" ? "Kelas" : it.href === "/rekomendasi" ? "Rekomendasi" : it.href === "/kalkulator" ? "Kalkulator" : it.label === "Dashboard" ? "Dashboard" : "Belajar"}</span><span className="hidden md:inline">{it.label}</span></> : it.label}
            {it.dot && <span className="absolute right-1 top-1.5 h-1.5 w-1.5 rounded-full bg-mascot" aria-hidden />}
          </Link>
        );
      })}
    </>
  );
}
