import Link from "next/link";
import { db } from "@/lib/db";

type Live = { active: boolean; startsAt: Date | null; endsAt: Date | null };

// Pengumuman tampil bila aktif dan waktu sekarang berada di antara mulai & berakhir (bila diisi).
export function announcementLive(a: Live, now = new Date()) {
  return a.active && (!a.startsAt || a.startsAt <= now) && (!a.endsAt || a.endsAt > now);
}

// Banner pengumuman di beranda untuk semua pengunjung. Dikelola di Owner/Admin → Pengumuman.
export async function AnnouncementBanner() {
  const now = new Date();
  const rows = await db.announcement.findMany({
    where: { active: true, AND: [{ OR: [{ startsAt: null }, { startsAt: { lte: now } }] }, { OR: [{ endsAt: null }, { endsAt: { gt: now } }] }] },
    orderBy: [{ tone: "desc" }, { createdAt: "desc" }],
    take: 3,
  });
  if (rows.length === 0) return null;
  return (
    <section aria-label="Pengumuman" className="border-b border-slate-200">
      {rows.map((a) => {
        const important = a.tone === "PENTING";
        const external = a.linkUrl?.startsWith("http");
        return (
          <div key={a.id} className={important ? "bg-ink text-white" : "bg-mascot text-ink"}>
            <div className="container-page flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm leading-relaxed">
                <span className={`mr-2 inline-block rounded px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${important ? "bg-mascot text-ink" : "bg-ink text-mascot"}`}>{important ? "Penting" : "Info"}</span>
                <strong className="font-semibold">{a.title}</strong>
                {a.body && <span className={important ? "text-slate-200" : "text-ink/80"}> {a.body}</span>}
              </p>
              {a.linkUrl &&
                (external ? (
                  <a href={a.linkUrl} target="_blank" rel="noopener noreferrer" className={`shrink-0 text-sm font-semibold underline underline-offset-2 ${important ? "text-mascot" : "text-ink"}`}>
                    {a.linkLabel || "Lihat detail"} →
                  </a>
                ) : (
                  <Link href={a.linkUrl} className={`shrink-0 text-sm font-semibold underline underline-offset-2 ${important ? "text-mascot" : "text-ink"}`}>
                    {a.linkLabel || "Lihat detail"} →
                  </Link>
                ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
