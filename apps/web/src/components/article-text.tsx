// Menampilkan teks artikel dari kolom isian admin: baris kosong = paragraf baru,
// baris diawali "- " atau "• " = butir, baris diawali "1. " = daftar bernomor.
export function ArticleText({ text, className = "" }: { text: string; className?: string }) {
  const blocks = text.replace(/\r\n/g, "\n").split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  return (
    <div className={`space-y-4 ${className}`}>
      {blocks.map((b, i) => {
        const lines = b.split("\n").map((l) => l.trim()).filter(Boolean);
        if (lines.every((l) => /^[-•]\s+/.test(l))) {
          return (
            <ul key={i} className="list-disc space-y-1.5 pl-5">
              {lines.map((l, k) => <li key={k}>{l.replace(/^[-•]\s+/, "")}</li>)}
            </ul>
          );
        }
        if (lines.every((l) => /^\d+[.)]\s+/.test(l))) {
          return (
            <ol key={i} className="list-decimal space-y-1.5 pl-5">
              {lines.map((l, k) => <li key={k}>{l.replace(/^\d+[.)]\s+/, "")}</li>)}
            </ol>
          );
        }
        return <p key={i} className="whitespace-pre-line">{b}</p>;
      })}
    </div>
  );
}
