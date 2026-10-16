import type { DoseItem } from "@/lib/dosis-obat/types";

// Teks monografi apa adanya dari dokumen: hanya *miring*, **tebal**, tautan, dan baris baru yang diolah.
export function RichText({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, i) => (
        <span key={i}>
          {i > 0 && <br />}
          {inline(line)}
        </span>
      ))}
    </>
  );
}

function inline(s: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|\*[^*\s][^*]*\*|https?:\/\/[^\s)]+)/g;
  let last = 0;
  let k = 0;
  for (const m of s.matchAll(re)) {
    const i = m.index ?? 0;
    if (i > last) out.push(s.slice(last, i));
    const t = m[0];
    if (t.startsWith("**")) out.push(<strong key={k++}>{t.slice(2, -2)}</strong>);
    else if (t.startsWith("*")) out.push(<em key={k++}>{t.slice(1, -1)}</em>);
    else
      out.push(
        <a key={k++} href={t} target="_blank" rel="noopener noreferrer" className="break-all text-brand underline">
          {t}
        </a>,
      );
    last = i + t.length;
  }
  if (last < s.length) out.push(s.slice(last));
  return out;
}

/** Tabel, daftar, atau paragraf tanpa perhitungan (sediaan, ginjal, aturan, monografi). */
export function DoseItems({ items }: { items: DoseItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((it, i) =>
        it.type === "p" ? (
          <p key={i} className="text-sm text-slate-700">
            <RichText text={it.text} />
          </p>
        ) : it.type === "list" ? (
          it.ordered ? (
            <ol key={i} className="list-decimal space-y-1.5 pl-5 text-sm text-slate-700">
              {it.items.map((x, j) => (
                <li key={j}>
                  <RichText text={x} />
                </li>
              ))}
            </ol>
          ) : (
            <ul key={i} className="list-disc space-y-1.5 pl-5 text-sm text-slate-700">
              {it.items.map((x, j) => (
                <li key={j}>
                  <RichText text={x} />
                </li>
              ))}
            </ul>
          )
        ) : (
          <div key={i} className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  {it.header.map((h, j) => (
                    <th key={j} className="px-3 py-2 font-semibold">
                      <RichText text={h} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {it.rows.map((r, j) => (
                  <tr key={j} className="align-top">
                    {r.map((c, k) => (
                      <td key={k} className="px-3 py-2 text-slate-700">
                        <RichText text={c} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ),
      )}
    </div>
  );
}
