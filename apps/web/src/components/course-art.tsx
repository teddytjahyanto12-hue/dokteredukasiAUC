import { OrganGlyph } from "@/components/block-art";

// Ilustrasi vektor milik proyek untuk kelas yang belum memiliki poster. Blok memakai animasi organ (art).
// Warna mengikuti maskot: kuning, hitam, dan krem.
export function CourseArt({ title, program, art, compact = false }: { title: string; program: string; art?: string | null; compact?: boolean }) {
  const clinical = program === "clinical-practice";
  const research = program === "medical-research";
  const tone = art ? "bg-mascot text-ink" : research ? "bg-[#f1ece0] text-ink" : clinical ? "bg-ink text-mascot" : "bg-mascot text-ink";
  return (
    <div className={`relative flex h-full min-h-0 items-center overflow-hidden ${tone}`} aria-hidden="true">
      <svg viewBox="0 0 360 210" className="absolute inset-0 h-full w-full" fill="none">
        <circle cx="285" cy="90" r="100" fill="currentColor" opacity=".04" />
        <circle cx="285" cy="90" r="72" stroke="currentColor" opacity=".13" />
        <path d="M0 175H360M0 145H360M0 115H360M60 0V210M120 0V210M180 0V210M240 0V210M300 0V210" stroke="currentColor" opacity=".05" />
        {art ? <OrganGlyph art={art} /> : research ? <g stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M226 133V102M252 133V76M278 133V49M214 145H300" /><path d="m223 77 27-23 27-20" /><circle cx="223" cy="77" r="5" fill="currentColor" /><circle cx="250" cy="54" r="5" fill="currentColor" /><circle cx="277" cy="34" r="5" fill="currentColor" /></g>
          : clinical ? <path d="M192 102h30l12-24 15 56 16-85 16 53h42" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          : <g stroke="currentColor" strokeWidth="3"><path d="M229 28c0 42 55 60 55 102s-55 44-55 76M284 28c0 42-55 60-55 102s55 44 55 76" /><path d="M233 48h47M244 67h25M244 93h25M232 114h49M232 140h49M244 161h25M244 187h25" /></g>}
      </svg>
      {!compact && <div className={`relative z-10 p-5 ${art ? "max-w-[52%]" : "max-w-[64%]"}`}><p className="text-[10px] font-semibold uppercase tracking-[.18em] opacity-70">Dokter Edukasi</p><p className="mt-3 text-lg font-semibold leading-snug tracking-tight">{title}</p></div>}
    </div>
  );
}
