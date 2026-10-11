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
  addStageAction,
  updateStageAction,
  deleteStageAction,
  addTaskTemplateAction,
  updateTaskTemplateAction,
  deleteTaskTemplateAction,
  saveInstallmentRulesAction,
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
          stages: { orderBy: { number: "asc" }, include: { tasks: { orderBy: { order: "asc" } } } },
          installmentRules: { orderBy: { seq: "asc" } },
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
  const ruleCount = pkg && pkg.installmentRules.length === 3 ? 3 : 2;
  const defaultRules = [
    { seq: 1, label: "Cicilan 1", percent: ruleCount === 3 ? 40 : 50, unlocksStage: 1 },
    { seq: 2, label: "Cicilan 2", percent: ruleCount === 3 ? 30 : 50, unlocksStage: 2 },
    { seq: 3, label: "Cicilan 3", percent: 30, unlocksStage: 3 },
  ];
  const ruleAt = (seq: number) => pkg?.installmentRules.find((r) => r.seq === seq) ?? defaultRules[seq - 1];

  return (
    <>
      <PageHeader
        title={pkg?.name ?? "Layanan baru"}
        subtitle="Semua isi di halaman ini tampil di website dan bisa diubah kapan saja."
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
            <option value="">-</option>
            {MENTORING_FIELDS.map((f) => (
              <option key={f} value={f}>
                {FIELD_LABEL[f]}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Kuota Zoom (khusus layanan dengan bimbingan)" hint="Jumlah tombol Zoom untuk murid, mis. 2 (Basic) atau 3 (Intermediate/Pro).">
          <input className="input" name="zoomQuota" inputMode="numeric" defaultValue={pkg?.zoomQuota ?? ""} />
        </Field>
        <Field label="Fee tutor per Zoom (Rp)" hint="Masuk payroll otomatis setelah admin memverifikasi rekaman.">
          <input className="input" name="zoomFee" inputMode="numeric" defaultValue={pkg?.zoomFee ?? ""} />
        </Field>
        <Field label="Masa berlaku Zoom & bimbingan (bulan)" hint="Dihitung sejak pembayaran disetujui, mis. 6. Kosong = tanpa batas.">
          <input className="input" name="serviceMonths" inputMode="numeric" defaultValue={pkg?.serviceMonths ?? ""} />
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
              <Empty>Tidak ada pilihan masa belajar - harga & masa akses dasar yang dipakai.</Empty>
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
                        <input className="input w-full sm:w-48" name="name" defaultValue={a.name} required />
                      </Field>
                      <Field label="Keterangan">
                        <input className="input w-full sm:w-64" name="description" defaultValue={a.description ?? ""} />
                      </Field>
                      <Field label="Tambah kuota Zoom">
                        <input className="input w-20" name="zoomCredits" inputMode="numeric" defaultValue={a.zoomCredits} />
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
                <input className="input w-full sm:w-48" name="name" required placeholder="Mis. Sesi Zoom tambahan" />
              </Field>
              <Field label="Keterangan">
                <input className="input w-full sm:w-64" name="description" />
              </Field>
              <Field label="Tambah kuota Zoom">
                <input className="input w-20" name="zoomCredits" inputMode="numeric" defaultValue={0} />
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

          {/* ---------- Tahap & checklist ---------- */}
          <section className="card mt-6">
            <h2 className="h2">6. Tahap & checklist pekerjaan</h2>
            <p className="muted mb-3">
              Saat layanan dibeli, checklist ini otomatis disalin ke proyek. Tutor menandai task selesai, admin memvalidasi. Tahap bisa dikunci oleh cicilan (bagian 7).
            </p>
            {pkg.stages.length === 0 ? (
              <Empty>Belum ada tahap.</Empty>
            ) : (
              <div className="space-y-4">
                {pkg.stages.map((st) => (
                  <div key={st.id} className="rounded-lg border border-slate-200 p-4">
                    <div className="flex flex-wrap items-end gap-2">
                      <form action={updateStageAction} className="flex flex-1 flex-wrap items-end gap-2">
                        <input type="hidden" name="packageId" value={pkg.id} />
                        <input type="hidden" name="id" value={st.id} />
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-mascot text-sm font-bold text-ink">{st.number}</span>
                        <Field label="Nama tahap">
                          <input className="input w-full sm:w-64" name="title" defaultValue={st.title} required />
                        </Field>
                        <Field label="Keterangan">
                          <input className="input w-full sm:w-64" name="description" defaultValue={st.description ?? ""} />
                        </Field>
                        <button className="btn-secondary btn-sm mb-1" type="submit">
                          Simpan
                        </button>
                      </form>
                      {st.number === pkg.stages[pkg.stages.length - 1].number && (
                        <form action={deleteStageAction}>
                          <input type="hidden" name="packageId" value={pkg.id} />
                          <input type="hidden" name="id" value={st.id} />
                          <ConfirmButton message={`Hapus tahap ${st.number} beserta checklist-nya?`} className="btn-danger btn-sm mb-1">
                            Hapus tahap
                          </ConfirmButton>
                        </form>
                      )}
                    </div>
                    <ul className="mt-3 space-y-2 border-l-2 border-brand/30 pl-4">
                      {st.tasks.map((t) => (
                        <li key={t.id} className="flex flex-wrap items-center gap-2">
                          <form action={updateTaskTemplateAction} className="flex flex-1 flex-wrap items-center gap-2">
                            <input type="hidden" name="packageId" value={pkg.id} />
                            <input type="hidden" name="id" value={t.id} />
                            <input className="input w-16" name="order" inputMode="numeric" defaultValue={t.order} aria-label="Urutan" />
                            <input className="input min-w-48 flex-1" name="title" defaultValue={t.title} required />
                            <input className="input w-28" name="fee" inputMode="numeric" defaultValue={t.fee ?? ""} placeholder="Fee (Rp)" aria-label="Fee tutor" />
                            <button className="btn-secondary btn-sm" type="submit">
                              Simpan
                            </button>
                          </form>
                          <form action={deleteTaskTemplateAction}>
                            <input type="hidden" name="packageId" value={pkg.id} />
                            <input type="hidden" name="id" value={t.id} />
                            <button className="btn-danger btn-sm" type="submit">
                              Hapus
                            </button>
                          </form>
                        </li>
                      ))}
                      {st.tasks.length === 0 && <li className="muted">Belum ada task di tahap ini.</li>}
                    </ul>
                    <form action={addTaskTemplateAction} className="mt-3 flex flex-wrap items-end gap-2 pl-4">
                      <input type="hidden" name="packageId" value={pkg.id} />
                      <input type="hidden" name="stageId" value={st.id} />
                      <Field label="Tambah task (satu per baris)">
                        <textarea className="input w-full sm:w-80" name="title" rows={2} placeholder="Mis. Judul disetujui" />
                      </Field>
                      <button className="btn btn-sm mb-1" type="submit">
                        + Task
                      </button>
                    </form>
                  </div>
                ))}
              </div>
            )}
            <form action={addStageAction} className="mt-4 grid gap-2 border-t border-slate-100 pt-4 sm:grid-cols-2">
              <input type="hidden" name="packageId" value={pkg.id} />
              <p className="font-semibold sm:col-span-2">Tambah tahap {pkg.stages.length + 1}</p>
              <Field label="Nama tahap">
                <input className="input" name="title" required placeholder="Mis. Judul & protokol" />
              </Field>
              <Field label="Keterangan (opsional)">
                <input className="input" name="description" />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Checklist task (satu per baris, opsional)">
                  <textarea className="input" name="tasks" rows={3} placeholder={"Konsultasi awal\nJudul fix\nProtokol PROSPERO"} />
                </Field>
              </div>
              <div>
                <button className="btn btn-sm" type="submit">
                  + Tambah tahap
                </button>
              </div>
            </form>
          </section>

          {/* ---------- Cicilan ---------- */}
          <form action={saveInstallmentRulesAction} className="card mt-6 space-y-4">
            <input type="hidden" name="packageId" value={pkg.id} />
            <h2 className="h2">7. Cicilan</h2>
            <p className="muted">
              Customer bisa memilih bayar penuh atau dicicil 2–3 kali. Cicilan pertama membuka layanan & tahap 1; tahap yang dibuka cicilan berikutnya tetap terkunci
              sampai cicilan itu dibayar. Total persentase harus 100%.
            </p>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="allowInstallment" defaultChecked={pkg.allowInstallment} /> Layanan ini boleh dicicil
            </label>
            <Field label="Jumlah cicilan">
              <select className="input w-40" name="count" defaultValue={ruleCount}>
                <option value={2}>2 kali</option>
                <option value={3}>3 kali</option>
              </select>
            </Field>
            <div className="grid gap-3 md:grid-cols-3">
              {[1, 2, 3].map((seq) => {
                const r = ruleAt(seq);
                return (
                  <div key={seq} className="rounded-lg border border-slate-200 p-3">
                    <p className="mb-2 text-sm font-semibold">Cicilan {seq}{seq === 3 && " (dipakai bila 3 kali)"}</p>
                    <div className="space-y-2">
                      <Field label="Label">
                        <input className="input" name={`label_${seq}`} defaultValue={r.label} />
                      </Field>
                      <Field label="Persen dari total (%)">
                        <input className="input" name={`percent_${seq}`} inputMode="numeric" defaultValue={r.percent} />
                      </Field>
                      <Field label="Membuka tahap ke-">
                        {seq === 1 ? (
                          <>
                            <input type="hidden" name="stage_1" value={1} />
                            <p className="text-sm text-slate-600">Tahap 1 (awal layanan)</p>
                          </>
                        ) : (
                          <select className="input" name={`stage_${seq}`} defaultValue={r.unlocksStage}>
                            {pkg.stages.filter((st) => st.number > 1).map((st) => (
                              <option key={st.id} value={st.number}>
                                Tahap {st.number}: {st.title}
                              </option>
                            ))}
                            {pkg.stages.filter((st) => st.number > 1).length === 0 && <option value={0}>Buat tahap 2 dulu</option>}
                          </select>
                        )}
                      </Field>
                    </div>
                  </div>
                );
              })}
            </div>
            {pkg.allowInstallment && pkg.installmentRules.length > 0 && (
              <p className="text-sm text-slate-600">
                Aktif: {pkg.installmentRules.map((r) => `${r.label} ${r.percent}% → tahap ${r.unlocksStage}`).join(" · ")}
              </p>
            )}
            <button className="btn" type="submit">
              Simpan aturan cicilan
            </button>
          </form>

          {/* ---------- Kelayakan tutor ---------- */}
          {canTutors && (
            <form action={saveEligibilityAction} className="card mt-6">
              <input type="hidden" name="packageId" value={pkg.id} />
              <h2 className="h2">8. Tutor yang berwenang & fee per layanan</h2>
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
            {pkg._count.orders > 0 && <span className="ml-3 text-xs text-slate-500">{pkg._count.orders} order - hanya akan dinonaktifkan.</span>}
          </form>
        </>
      )}
    </>
  );
}
