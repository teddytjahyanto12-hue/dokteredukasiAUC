import Link from "next/link";

// Pesan singkat setelah aksi (dibaca dari query ?pesan=...&tipe=error).
export function Flash({ pesan, tipe }: { pesan?: string; tipe?: string }) {
  if (!pesan) return null;
  const error = tipe === "error";
  return (
    <div
      role={error ? "alert" : "status"}
      className={`mb-4 rounded-lg border px-4 py-3 text-sm ${
        error ? "border-red-200 bg-red-50 text-red-800" : "border-emerald-200 bg-emerald-50 text-emerald-800"
      }`}
    >
      {pesan}
    </div>
  );
}

export function PageHeader({ title, subtitle, back, actions }: { title: string; subtitle?: string; back?: { href: string; label: string }; actions?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {back && (
          <Link href={back.href} className="mb-2 inline-block text-sm text-slate-500 hover:text-brand">
            ← {back.label}
          </Link>
        )}
        <h1 className="h1">{title}</h1>
        {subtitle && <p className="mt-1 text-slate-600">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function Empty({ children }: { children: React.ReactNode }) {
  return <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-500">{children}</div>;
}

export function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-slate-500">{hint}</span>}
    </label>
  );
}

export function Stat({ label, value, href }: { label: string; value: React.ReactNode; href?: string }) {
  const inner = (
    <div className="card h-full">
      <p className="muted">{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
  return href ? (
    <Link href={href} className="block transition hover:-translate-y-0.5">
      {inner}
    </Link>
  ) : (
    inner
  );
}

export function ProgressBar({ value }: { value: number }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100" aria-label={`Progres ${v}%`}>
      <div className="h-full rounded-full bg-brand" style={{ width: `${v}%` }} />
    </div>
  );
}
