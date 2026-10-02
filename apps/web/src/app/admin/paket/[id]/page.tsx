import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { requirePermission } from "@/lib/auth";
import { hasPermission } from "@/lib/permissions";
import { FEE_BASIS, FEE_BASIS_LABEL, FIELD_LABEL, MENTORING_FIELDS, type MentoringField } from "@/lib/constants";
import { rupiah } from "@/lib/format";
import { ELIGIBILITY_LABEL } from "@/lib/services";
import { deletePackageAction } from "@/app/actions/admin";
import {
  addAddonAction,
  addBenefitAction,
  addDurationAction,
  deleteAddonAction,
  deleteBenefitAction,
  deleteDurationAction,
  saveEligibilityAction,
  saveServiceAction,
  updateAddonAction,
  updateBenefitAction,
  updateDurationAction,
} from "@/app/actions/services";
import { ConfirmButton } from "@/components/confirm-button";
import { Empty, Field, Flash, PageHeader } from "@/components/ui";
import { readFlash, type SearchParams } from "@/lib/flash";

export default async function AdminServiceEdit({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: SearchParams }) {
  const me = await requirePermission("admin.packages");
  const finance = hasPermission(me, "admin.finance");
  const canTutors = hasPermission(me, "admin.tutors");
  const { id } = await params;
  const { pesan, tipe } = await readFlash(searchParams);
  const isNew = id === "baru";
  const pkg = isNew
    ? null
    : await db.package.findUnique({
        where: { id },
        include: {
          categories: true,
          benefits: { orderBy: { order: "asc" } },
          durations: { orderBy: [{ order: "asc" }, { months: "asc" }] },
          addons: { orderBy: { order: "asc" } },
          eligibilities: true,
          _count: { select: { orders: true } },
        },
      });
  if (!isNew && !pkg) notFound();
  const [tracks, tutors] = await Promise.all([
    db.track.findMany({ orderBy: { order: "asc" }, include: { categories: { orderBy: { order: "asc" } } } }),
    canTutors && pkg
      ? db.user.findMany({ where: { role: "TUTOR" }, orderBy: { name: "asc" }, include: { tutorProfile: { select: { field: true, rate: true } } } })
      : Promise.resolve([]),
  ]);
  const selected = new Set(pkg?.categories.map((c) => c.categoryId));
  const elig = new Map(pkg?.eligibilities.map((e) => [e.tutorId, e]));

  return (
    <>
      <PageHeader
        title={pkg?.name ?? "Layanan baru"}
        subtitle="Semua isi di halaman ini tampil di website dan bisa Anda ubah kapan saja."
        back={{ href: "/admin/paket", label: "Semua layanan" }}
        actions={
          pkg && (
            <Link href={`/paket/${pkg.slug}`} target="_blank" className="btn-secondary btn-sm">
              Lihat di website ↗
            </Link>
          )
        }
      />
      <Flash pesan={pesan} tipe={tipe} />

      {/* ---------- Data utama ---------- */}
      <form action={saveServiceAction} className="card grid gap-4 sm:grid-cols-2">
        {pkg && <input type="hidden" name="id" value={pkg.id} />}
        <h2 className="h2 sm:col-span-2">1. Data utama layanan</h2>
        <Field label="Nama layanan">
          <input className="input" name="name" defaultValue={pkg?.name} required />
        </Field>
        <Field label="Alamat halaman (slug)" hint="Kosongkan untuk dibuat otomatis dari nama.">
          <input className="input" name="slug" defaultValue={pkg?.slug} />
        </Field>
        <Field label="Kelompok di katalog">
          <select className="input" name="trackSlug" defaultValue={pkg?.trackSlug ?? ""}>
            <option value="">Lainnya</option>
            {tracks.map((t) => (
              <option key={t.id} value={t.slug}>
                {t.title}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Urutan tampil">
          <input className="input" name="order" inputMode="numeric" defaultValue={pkg?.order ?? 0} />
        </Field>

        <div className="grid gap-4 sm:col-span-2 sm:grid-cols-[200px_1fr]">
          <div>
            <p className="label">Poster layanan</p>
            {pkg?.posterFileId ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={`/api/berkas/${pkg.posterFileId}`} alt="Poster" className="aspect-[4/5] w-full rounded-lg border border-slate-200 object-cover" />
            ) : (
              <div className="grid aspect-[4/5] w-full place-items-center rounded-lg border border-dashed border-slate-300 text-xs text-slate-400">Belum ada poster</div>
            )}
          </div>
          <div className="space-y-3">
            <Field label={pkg?.posterFileId ? "Ganti poster" : "Unggah poster"} hint="Gambar PNG/JPG/WEBP. Disarankan rasio 4:5 (mis. 1080×1350) agar rapi di katalog.">
              <input className="input" type="file" name="poster" accept="image/png,image/jpeg,image/webp" />
            </Field>
            {pkg?.posterFileId && (
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="removePoster" /> Hapus poster
              </label>
            )}
            <Field label="Ringkasan singkat (tampil di kartu katalog)">
              <input className="input" name="summary" defaultValue={pkg?.summary ?? ""} />
            </Field>
          </div>
        </div>

        <div className="sm:col-span-2">
          <Field label="Deskripsi layanan" hint="Boleh beberapa paragraf. Baris baru tetap tampil sebagai baris baru.">
            <textarea className="input" name="description" rows={6} defaultValue={pkg?.description ?? ""} />
          </Field>
        </div>

        <Field label="Harga dasar (Rp)" hint="Dipakai hanya bila layanan TIDAK punya pilihan masa belajar. Kosong = harga segera diumumkan.">
          <input className="input" name="price" inputMode="numeric" defaultValue={pkg?.price ?? ""} />
        </Field>
        <Field label="Masa akses dasar (hari)" hint="Dipakai hanya bila tidak ada pilihan masa belajar. Kosong = tanpa batas.">
          <input className="input" name="accessDays" inputMode="numeric" defaultValue={pkg?.accessDays ?? ""} />
        </Field>
        {finance && (
          <Field label="HPP layanan (Rp, internal)" hint="Tidak tampil di website. Untuk laporan laba.">
            <input className="input" name="hpp" inputMode="numeric" defaultValue={pkg?.hpp ?? ""} />
          </Field>
        )}
        <Field label="Link SOP / instruksi kerja (untuk tutor)" hint="Hanya terlihat oleh tutor yang ditugaskan pada layanan ini.">
          <input className="input" name="sopUrl" defaultValue={pkg?.sopUrl ?? ""} placeholder="https://" />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Catatan SOP untuk tutor (opsional)">
            <textarea className="input" name="sopNote" rows={2} defaultValue={pkg?.sopNote ?? ""} />
          </Field>
        </div>

        <fieldset className="sm:col-span-2">
          <legend className="label">Materi yang terbuka setelah membeli layanan ini</legend>
          <div className="grid gap-4 md:grid-cols-3">
            {tracks.map((t) => (
              <div key={t.id} className="rounded-lg border border-slate-200 p-3">
                <p className="mb-2 text-sm font-semibold">{t.title}</p>
                {t.categories.map((c) => (
                  <label key={c.id} className="flex items-center gap-2 py-0.5 text-sm">
                    <input type="checkbox" name="categoryIds" value={c.id} defaultChecked={selected.has(c.id)} /> {c.title}
                  </label>
                ))}
              </div>
            ))}
          </div>
        </fieldset>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="includesMentoring" defaultChecked={pkg?.includesMentoring ?? false} /> Termasuk bimbingan tutor
        </label>
        <Field label="Bidang bimbingan">
          <select className="input" name="mentoringField" defaultValue={pkg?.mentoringField ?? ""}>
            <option value="">—</option>
            {MENTORING_FIELDS.map((f) => (
              <option key={f} value={f}>
                {FIELD_LABEL[f]}
              </option>
            ))}
          </select>
        </Field>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="active" defaultChecked={pkg?.active ?? true} /> Tampilkan di website & bisa dipesan
        </label>
        <div className="sm:col-span-2">
          <button className="btn" type="submit">
            {pkg ? "Simpan data utama" : "Buat layanan"}
          </button>
        </div>
      </form>

      {pkg && (
        <>
          {/* ---------- Benefit ---------- */}
          <section className="card mt-6">
            <h2 className="h2">2. Benefit bagi customer</h2>
            <p className="muted mb-3">Ditampilkan sebagai daftar centang di halaman layanan.</p>
            {pkg.benefits.length === 0 ? (
              <Empty>Belum ada benefit.</Empty>
            ) : (
              <ul className="space-y-2">
                {pkg.benefits.map((b) => (
                  <li key={b.id} className="flex flex-wrap items-center gap-2">
                    <form action={updateBenefitAction} className="flex flex-1 flex-wrap items-center gap-2">
                      <input type="hidden" name="packageId" value={pkg.id} />
                      <input type="hidden" name="id" value={b.id} />
                      <input className="input w-16" name="order" inputMode="numeric" defaultValue={b.order} aria-label="Urutan" />
                      <input className="input min-w-48 flex-1" name="text" defaultValue={b.text} required />
                      <button className="btn-secondary btn-sm" type="submit">
                        Simpan
                      </button>
                    </form>
                    <form action={deleteBenefitAction}>
                      <input type="hidden" name="packageId" value={pkg.id} />
                      <input type="hidden" name="id" value={b.id} />
                      <button className="btn-danger btn-sm" type="submit">
                        Hapus
                      </button>
                    </form>
                  </li>
                ))}
              </ul>
            )}
            <form action={addBenefitAction} className="mt-4 grid gap-2 border-t border-slate-100 pt-4">
              <input type="hidden" name="packageId" value={pkg.id} />
              <Field label="Tambah benefit" hint="Satu benefit per baris; bisa menambah beberapa sekaligus.">
                <textarea className="input" name="text" rows={3} placeholder={"Akses materi selama masa belajar\nKonsultasi via Zoom\nTemplate siap pakai"} />
              </Field>
              <div>
                <button className="btn btn-sm" type="submit">
                  + Tambah benefit
                </button>
              </div>
            </form>
          </section>

          {/* ---------- Masa belajar ---------- */}
          <section className="card mt-6">
            <h2 className="h2">3. Pilihan masa waktu belajar & harga</h2>
            <p className="muted mb-3">
              Customer memilih salah satu saat memesan. Harga di sini menggantikan harga dasar. Matikan “Aktif” untuk menyembunyikan tanpa menghapus.
            </p>
            {pkg.durations.length === 0 ? (
              <Empty>Tidak ada pilihan masa belajar — harga & masa akses dasar yang dipakai.</Empty>
            ) : (
              <div className="space-y-2">
                {pkg.durations.map((d) => (
                  <div key={d.id} className="flex flex-wrap items-end gap-2 rounded-lg border border-slate-200 p-3">
                    <form action={updateDurationAction} className="flex flex-1 flex-wrap items-end gap-2">
                      <input type="hidden" name="packageId" value={pkg.id} />
                      <input type="hidden" name="id" value={d.id} />
                      <Field label="Label">
                        <input className="input w-32" name="label" defaultValue={d.label} />
                      </Field>
                      <Field label="Bulan">
                        <input className="input w-20" name="months" inputMode="numeric" defaultValue={d.months} required />
                      </Field>
                      <Field label="Harga (Rp)">
                        <input className="input w-36" name="price" inputMode="numeric" defaultValue={d.price ?? ""} placeholder="menyusul" />
                      </Field>
                      {finance && (
                        <Field label="HPP (Rp)">
                          <input className="input w-32" name="hpp" inputMode="numeric" defaultValue={d.hpp ?? ""} />
                        </Field>
                      )}
                      <Field label="Urutan">
                        <input className="input w-16" name="order" inputMode="numeric" defaultValue={d.order} />
                      </Field>
                      <label className="flex items-center gap-1 pb-2 text-sm">
                        <input type="checkbox" name="active" defaultChecked={d.active} /> Aktif
                      </label>
                      <button className="btn-secondary btn-sm mb-1" type="submit">
                        Simpan
                      </button>
                    </form>
                    <form action={deleteDurationAction}>
                      <input type="hidden" name="packageId" value={pkg.id} />
                      <input type="hidden" name="id" value={d.id} />
                      <ConfirmButton message={`Hapus pilihan ${d.label}?`} className="btn-danger btn-sm mb-1">
                        Hapus
                      </ConfirmButton>
                    </form>
                  </div>
                ))}
              </div>
            )}
            <form action={addDurationAction} className="mt-4 flex flex-wrap items-end gap-2 border-t border-slate-100 pt-4">
              <input type="hidden" name="packageId" value={pkg.id} />
              <Field label="Lama (bulan)">
                <input className="input w-24" name="months" inputMode="numeric" required placeholder="12" />
              </Field>
              <Field label="Label (opsional)">
                <input className="input w-36" name="label" placeholder="12 bulan" />
              </Field>
              <Field label="Harga (Rp)">
                <input className="input w-36" name="price" inputMode="numeric" />
              </Field>
              {finance && (
                <Field label="HPP (Rp)">
                  <input className="input w-32" name="hpp" inputMode="numeric" />
                </Field>
              )}
              <button className="btn btn-sm mb-1" type="submit">
                + Tambah pilihan
              </button>
            </form>
          </section>

          {/* ---------- Add-on ---------- */}
          <section className="card mt-6">
            <h2 className="h2">4. Paket add-on (opsional)</h2>
            <p className="muted mb-3">Tambahan yang bisa dicentang customer saat memesan; harganya ditambahkan ke total.</p>
            {pkg.addons.length === 0 ? (
              <Empty>Belum ada add-on.</Empty>
            ) : (
              <div className="space-y-2">
                {pkg.addons.map((a) => (
                  <div key={a.id} className="flex flex-wrap items-end gap-2 rounded-lg border border-slate-200 p-3">
                    <form action={updateAddonAction} className="flex flex-1 flex-wrap items-end gap-2">
                      <input type="hidden" name="packageId" value={pkg.id} />
                      <input type="hidden" name="id" value={a.id} />
                      <Field label="Nama add-on">
                        <input className="input w-48" name="name" defaultValue={a.name} required />
                      </Field>
                      <Field label="Keterangan">
                        <input className="input w-64" name="description" defaultValue={a.description ?? ""} />
                      </Field>
                      <Field label="Harga (Rp)">
                        <input className="input w-32" name="price" inputMode="numeric" defaultValue={a.price ?? ""} placeholder="menyusul" />
                      </Field>
                      {finance && (
                        <Field label="HPP (Rp)">
                          <input className="input w-28" name="hpp" inputMode="numeric" defaultValue={a.hpp ?? ""} />
                        </Field>
                      )}
                      <Field label="Urutan">
                        <input className="input w-16" name="order" inputMode="numeric" defaultValue={a.order} />
                      </Field>
                      <label className="flex items-center gap-1 pb-2 text-sm">
                        <input type="checkbox" name="active" defaultChecked={a.active} /> Aktif
                      </label>
                      <button className="btn-secondary btn-sm mb-1" type="submit">
                        Simpan
                      </button>
                    </form>
                    <form action={deleteAddonAction}>
                      <input type="hidden" name="packageId" value={pkg.id} />
                      <input type="hidden" name="id" value={a.id} />
                      <ConfirmButton message={`Hapus add-on ${a.name}?`} className="btn-danger btn-sm mb-1">
                        Hapus
                      </ConfirmButton>
                    </form>
                  </div>
                ))}
              </div>
            )}
            <form action={addAddonAction} className="mt-4 flex flex-wrap items-end gap-2 border-t border-slate-100 pt-4">
              <input type="hidden" name="packageId" value={pkg.id} />
              <Field label="Nama add-on">
                <input className="input w-48" name="name" required placeholder="Mis. Sesi Zoom tambahan" />
              </Field>
              <Field label="Keterangan">
                <input className="input w-64" name="description" />
              </Field>
              <Field label="Harga (Rp)">
                <input className="input w-32" name="price" inputMode="numeric" />
              </Field>
              {finance && (
                <Field label="HPP (Rp)">
                  <input className="input w-28" name="hpp" inputMode="numeric" />
                </Field>
              )}
              <button className="btn btn-sm mb-1" type="submit">
                + Tambah add-on
              </button>
            </form>
          </section>

          {/* ---------- Kelayakan tutor ---------- */}
          {canTutors && (
            <form action={saveEligibilityAction} className="card mt-6">
              <input type="hidden" name="packageId" value={pkg.id} />
              <h2 className="h2">5. Tutor yang berwenang & fee per layanan</h2>
              <p className="muted mb-3">
                Hanya tutor Primary/Backup yang muncul saat menugaskan bimbingan layanan ini. Fee di sini dipakai saat sesi divalidasi (kosong = rate umum tutor).
              </p>
              {tutors.length === 0 ? (
                <Empty>Belum ada akun tutor.</Empty>
              ) : (
                <div className="overflow-x-auto">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Tutor</th>
                        <th>Kelayakan</th>
                        <th>Fee (Rp)</th>
                        <th>Jenis fee</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tutors.map((t) => {
                        const e = elig.get(t.id);
                        return (
                          <tr key={t.id}>
                            <td>
                              {t.name}
                              <p className="text-xs text-slate-500">
                                {FIELD_LABEL[t.tutorProfile?.field as MentoringField] ?? "-"} · rate umum {rupiah(t.tutorProfile?.rate ?? null)}
                              </p>
                            </td>
                            <td>
                              <select className="input" name={`level_${t.id}`} defaultValue={e?.level ?? "NONE"}>
                                {["NONE", "PRIMARY", "BACKUP"].map((l) => (
                                  <option key={l} value={l}>
                                    {ELIGIBILITY_LABEL[l]}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <input className="input w-32" name={`fee_${t.id}`} inputMode="numeric" defaultValue={e?.fee ?? ""} />
                            </td>
                            <td>
                              <select className="input" name={`basis_${t.id}`} defaultValue={e?.feeBasis ?? ""}>
                                <option value="">Ikuti profil tutor</option>
                                {FEE_BASIS.map((f) => (
                                  <option key={f} value={f}>
                                    {FEE_BASIS_LABEL[f]}
                                  </option>
                                ))}
                              </select>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
              <button className="btn mt-4" type="submit">
                Simpan kelayakan tutor
              </button>
            </form>
          )}

          <form action={deletePackageAction} className="mt-8">
            <input type="hidden" name="id" value={pkg.id} />
            <ConfirmButton message="Hapus layanan ini? Layanan yang sudah punya order hanya dinonaktifkan.">Hapus layanan</ConfirmButton>
            {pkg._count.orders > 0 && <span className="ml-3 text-xs text-slate-500">{pkg._count.orders} order — hanya akan dinonaktifkan.</span>}
          </form>
        </>
      )}
    </>
  );
}
