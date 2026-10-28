// Menampilkan teks artikel dari kolom isian admin: baris kosong = paragraf baru,
// baris diawali "- " atau "• " = butir, baris diawali "1. " = daftar bernomor,
// baris diawali "### " = subjudul kecil (tebal) di dalam bagian.
function Block({ lines }: { lines: string[] }) {
  if (lines.every((l) => /^[-•]\s+/.test(l))) {
    return (
      <ul className="list-disc space-y-1.5 pl-5">
        {lines.map((l, k) => <li key={k}>{l.replace(/^[-•]\s+/, "")}</li>)}
      </ul>
    );
  }
  if (lines.every((l) => /^\d+[.)]\s+/.test(l))) {
    return (
      <ol className="list-decimal space-y-1.5 pl-5">
        {lines.map((l, k) => <li key={k}>{l.replace(/^\d+[.)]\s+/, "")}</li>)}
      </ol>
    );
  }
  return <p className="whitespace-pre-line">{lines.join("\n")}</p>;
}

export function ArticleText({ text, className = "" }: { text: string; className?: string }) {
  const blocks = text.replace(/\r\n/g, "\n").split(/\n\s*\n/).map((b) => b.split("\n").map((l) => l.trim()).filter(Boolean)).filter((l) => l.length > 0);
  return (
    <div className={`space-y-4 ${className}`}>
      {blocks.map((lines, i) => {
        if (!lines[0].startsWith("### ")) return <Block key={i} lines={lines} />;
        const rest = lines.slice(1);
        return (
          <div key={i} className="space-y-2">
            <h3 className="font-sans text-lg font-bold text-slate-900">{lines[0].slice(4)}</h3>
            {rest.length > 0 && <Block lines={rest} />}
          </div>
        );
      })}
    </div>
  );
}
