import { DISCLAIMER, type CalcContent, type CalcMeta, type CalcSource } from "@/lib/calculators/registry";

// Pembahasan & materi di bawah kalkulator (khusus Premium; halaman hanya merender bagian ini untuk pelanggan).
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="card">
      <h2 className="h2 mb-3">{title}</h2>
      {children}
    </section>
  );
}

export function LearnSections({ content }: { content: CalcContent }) {
  return (
    <div className="mt-10 space-y-6">
      <p className="eyebrow">Pembahasan & materi</p>
      <Section title="Interpretasi">
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
          {content.interpretation.map((t) => <li key={t}>{t}</li>)}
        </ul>
      </Section>

      <Section title="Materi ringkas">
        <div className="space-y-4">
          {content.material.map((m) => (
            <div key={m.heading}>
              <h3 className="font-semibold text-slate-900">{m.heading}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-700">{m.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Jebakan ujian & catatan klinis">
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
          {content.pitfalls.map((t) => <li key={t}>{t}</li>)}
        </ul>
      </Section>

      <Section title="Latihan kasus">
        <div className="space-y-3">
          {content.cases.map((c) => (
            <details key={c.title} className="group rounded-lg border border-slate-200 p-4">
              <summary className="cursor-pointer list-none">
                <p className="font-semibold text-slate-900">{c.title}</p>
                <p className="mt-1 text-sm text-slate-700">{c.scenario}</p>
                <p className="mt-2 text-xs font-semibold text-brand group-open:hidden">Hitung dulu, lalu klik untuk melihat jawaban</p>
              </summary>
              <div className="mt-3 border-t border-slate-100 pt-3 text-sm">
                <p className="font-semibold text-slate-900">Jawaban: {c.answer}</p>
                <p className="mt-1 text-slate-700">{c.explanation}</p>
              </div>
            </details>
          ))}
        </div>
      </Section>
    </div>
  );
}

/** Sumber dan disclaimer selalu tampil untuk semua pengguna. */
export function SourcesAndDisclaimer({ meta, sources }: { meta: CalcMeta; sources: CalcSource[] }) {
  return (
    <div className="mt-6 space-y-6">
      <Section title="Sumber">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700">
          {sources.map((s) => (
            <li key={s.label}>
              {s.url ? <a href={s.url} target="_blank" rel="noopener noreferrer" className="link">{s.label}</a> : s.label}
              {s.note && <span className="text-slate-500"> · {s.note}</span>}
            </li>
          ))}
        </ol>
      </Section>
      <section className="rounded-xl border border-amber-300 bg-amber-50 p-5 text-sm text-amber-900">
        <p className="font-semibold">
          {meta.validation
            ? `Tervalidasi oleh ${meta.validation.doctor} pada ${meta.validation.date} (dokumen validasi versi ${meta.validation.docVersion}).`
            : `Status: draf versi ${meta.version ?? "0"}, belum divalidasi dokter.`}
        </p>
        <p className="mt-2">{DISCLAIMER}</p>
      </section>
    </div>
  );
}
