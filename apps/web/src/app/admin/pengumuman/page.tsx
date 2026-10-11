import Link from "next/link";
import { db } from "@/lib/db";
import { requirePermission } from "@/lib/auth";
import { tanggal, toWibInput } from "@/lib/format";
import { deleteAnnouncementAction, saveAnnouncementAction } from "@/app/actions/announcements";
import { ConfirmButton } from "@/components/confirm-button";
import { Empty, Field, Flash, PageHeader } from "@/components/ui";
import { readFlash, type SearchParams } from "@/lib/flash";
import { announcementLive } from "@/components/announcement-banner";

export const metadata = { title: "Pengumuman" };

type Row = {
  id?: string;
  title?: string;
  body?: string | null;
  linkUrl?: string | null;
  linkLabel?: string | null;
  tone?: string;
  active?: boolean;
  startsAt?: Date | null;
  endsAt?: Date | null;
};

function AnnouncementFields({ a }: { a: Row }) {
  return (
    <>
      {a.id && <input type="hidden" name="id" value={a.id} />}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Field label="Judul">
            <input className="input" name="title" defaultValue={a.title} required placeholder="Mis. Materi Blok 12 Kardiovaskuler sudah tersedia" />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Isi (opsional)">
            <textarea className="input" name="body" rows={2} defaultValue={a.body ?? ""} />
          </Field>
        </div>
        <Field label="Tautan (opsional)" hint="Mis. /kelas atau https://...">
          <input className="input" name="linkUrl" defaultValue={a.linkUrl ?? ""} />
        </Field>
        <Field label="Teks tombol tautan">
          <input className="input" name="linkLabel" defaultValue={a.linkLabel ?? ""} placeholder="Lihat detail" />
        </Field>
        <Field label="Mulai tampil (WIB, opsional)">
          <input className="input" type="datetime-local" name="startsAt" defaultValue={a.startsAt ? toWibInput(a.startsAt) : ""} />
        </Field>
        <Field label="Berhenti tampil (WIB, opsional)">
          <input className="input" type="datetime-local" name="endsAt" defaultValue={a.endsAt ? toWibInput(a.endsAt) : ""} />
        </Field>
        <Field label="Jenis">
          <select className="input" name="tone" defaultValue={a.tone ?? "INFO"}>
            <option value="INFO">Info (kuning)</option>
            <option value="PENTING">Penting (hitam)</option>
          </select>
        </Field>
        <label className="flex items-center gap-2 self-end pb-2 text-sm">
          <input type="checkbox" name="active" defaultChecked={a.active ?? true} /> Aktif
        </label>
      </div>
    </>
  );
}

export default async function AdminAnnouncements({ searchParams }: { searchParams: SearchParams }) {
  await requirePermission("admin.settings");
  const { pesan, tipe } = await readFlash(searchParams);
  const rows = await db.announcement.findMany({ orderBy: { createdAt: "desc" }, include: { createdBy: { select: { name: true } } } });

  return (
    <>
      <PageHeader
        title="Pengumuman"
        subtitle="Banner di beranda untuk semua pengunjung (tamu, murid, tutor). Hanya pengumuman aktif dan dalam jadwal yang tampil."
        actions={
          <Link href="/" className="btn-secondary btn-sm">
            Lihat beranda
          </Link>
        }
      />
      <Flash pesan={pesan} tipe={tipe} />

      <form action={saveAnnouncementAction} className="card mb-6 space-y-3">
        <h2 className="h2">Pengumuman baru</h2>
        <AnnouncementFields a={{}} />
        <button className="btn" type="submit">
          Simpan & tampilkan
        </button>
      </form>

      <section className="card">
        <h2 className="h2 mb-3">Semua pengumuman</h2>
        {rows.length === 0 && <Empty>Belum ada pengumuman.</Empty>}
        <ul className="space-y-4">
          {rows.map((a) => (
            <li key={a.id} className="rounded-lg border border-slate-200 p-4">
              <p className="mb-3 text-xs text-slate-500">
                <span className={announcementLive(a) ? "font-semibold text-success" : "font-semibold text-slate-500"}>{announcementLive(a) ? "Sedang tampil" : a.active ? "Di luar jadwal" : "Nonaktif"}</span>
                {" · "}dibuat {tanggal(a.createdAt, true)}
                {a.createdBy ? ` oleh ${a.createdBy.name}` : ""}
              </p>
              <form action={saveAnnouncementAction} className="space-y-3">
                <AnnouncementFields a={a} />
                <button className="btn-secondary btn-sm" type="submit">
                  Simpan perubahan
                </button>
              </form>
              <form action={deleteAnnouncementAction} className="mt-2">
                <input type="hidden" name="id" value={a.id} />
                <ConfirmButton message={`Hapus pengumuman "${a.title}"?`} className="btn-danger btn-sm">
                  Hapus
                </ConfirmButton>
              </form>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
