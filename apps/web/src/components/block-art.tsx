// Ilustrasi organ beranimasi untuk setiap Blok Basic Medical Science (vektor milik proyek).
// Digambar di ruang koordinat lokal sekitar (0,0) dengan jangkauan ±70; CourseArt menempatkannya di kanan kartu.
// Animasi didefinisikan di globals.css (kelas ba-*) dan dimatikan saat prefers-reduced-motion.
import type { CSSProperties, ReactNode } from "react";

const d = (s: number): CSSProperties => ({ animationDelay: `${s}s` });

const GLYPHS: Record<string, ReactNode> = {
  tulang: (
    <g className="ba-float">
      <g transform="rotate(-28)" fill="currentColor" opacity=".85">
        <rect x="-46" y="-8" width="92" height="16" rx="8" />
        <circle cx="-50" cy="-10" r="12" />
        <circle cx="-50" cy="10" r="12" />
        <circle cx="50" cy="-10" r="12" />
        <circle cx="50" cy="10" r="12" />
      </g>
    </g>
  ),
  otot: (
    <g>
      <path d="M-70 0H-52M52 0H70" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <g className="ba-contract">
        <ellipse cx="0" cy="0" rx="54" ry="24" fill="currentColor" opacity=".8" />
        <path d="M-30 -18V18M-15 -22V22M0 -24V24M15 -22V22M30 -18V18" stroke="white" strokeWidth="2" opacity=".55" />
      </g>
    </g>
  ),
  "saraf-pembuluh": (
    <g stroke="currentColor" strokeLinecap="round" fill="none">
      <circle cx="-38" cy="-18" r="12" fill="currentColor" opacity=".85" stroke="none" />
      <path d="M-46 -27l-14-14M-30 -28l4-18M-48 -12l-18 2M-38 -6l-4 14" strokeWidth="3" />
      <path className="ba-flow" d="M-26 -18C0 -18 10 -30 34 -26S62 -12 66 -6" strokeWidth="3" />
      <path className="ba-flow" style={d(0.4)} d="M-66 32C-44 18 -22 46 0 32S44 18 66 32" strokeWidth="6" opacity=".55" />
    </g>
  ),
  fisiologi: (
    <g>
      <circle r="46" fill="currentColor" opacity=".12" />
      <circle r="46" stroke="currentColor" strokeWidth="3" fill="none" />
      <circle r="16" fill="currentColor" opacity=".45" />
      <circle r="6" fill="currentColor" />
      <ellipse cx="-24" cy="20" rx="10" ry="5" fill="currentColor" opacity=".5" transform="rotate(-25 -24 20)" />
      <g className="ba-spin">
        <circle r="60" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 7" fill="none" opacity=".6" />
        <circle cx="60" cy="0" r="4" fill="currentColor" />
        <circle cx="-60" cy="0" r="4" fill="currentColor" />
      </g>
    </g>
  ),
  histologi: (
    <g>
      <g fill="currentColor" opacity=".18" stroke="currentColor" strokeWidth="1.5">
        {[
          [0, 0],
          [26, 0],
          [-26, 0],
          [13, 22],
          [-13, 22],
          [13, -22],
          [-13, -22],
        ].map(([x, y]) => (
          <path key={`${x}${y}`} transform={`translate(${x} ${y})`} d="M0-15L13-7.5V7.5L0 15L-13 7.5V-7.5Z" />
        ))}
      </g>
      <g fill="currentColor">
        {[
          [0, 0],
          [26, 0],
          [-26, 0],
          [13, 22],
          [-13, 22],
          [13, -22],
          [-13, -22],
        ].map(([x, y]) => (
          <circle key={`n${x}${y}`} cx={x} cy={y} r="3.5" />
        ))}
      </g>
      <g className="ba-float" style={d(0.6)} stroke="currentColor" strokeWidth="4" fill="none">
        <circle cx="30" cy="-18" r="20" />
        <path d="M44 -4l18 18" strokeLinecap="round" />
      </g>
    </g>
  ),
  biokimia: (
    <g className="ba-spin" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none">
      <path d="M0-26L22.5-13V13L0 26L-22.5 13V-13Z" />
      <path d="M-15 -8.5V8.5M15 -8.5V8.5M0 17" opacity=".6" />
      <path d="M0-26V-46M22.5 13L40 23M-22.5 13L-40 23" />
      <circle cx="0" cy="-52" r="6" fill="currentColor" />
      <circle cx="45" cy="26" r="6" fill="currentColor" />
      <circle cx="-45" cy="26" r="6" fill="currentColor" />
    </g>
  ),
  ikm: (
    <g fill="currentColor">
      {[-38, 0, 38].map((x, i) => (
        <g key={x} className="ba-float" style={d(i * 0.4)} opacity={i === 1 ? 0.95 : 0.6}>
          <circle cx={x} cy={-22} r={i === 1 ? 12 : 10} />
          <path d={`M${x - 20} 30C${x - 20} 2 ${x + 20} 2 ${x + 20} 30Z`} />
        </g>
      ))}
      <path d="M-60 44H60" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity=".5" />
    </g>
  ),
  "siklus-hidup": (
    <g>
      <g className="ba-spin" stroke="currentColor" strokeWidth="3.5" fill="none" strokeLinecap="round">
        <path d="M0-44A44 44 0 0 1 44 0" />
        <path d="M44 0A44 44 0 0 1 0 44" />
        <path d="M0 44A44 44 0 0 1 -44 0" />
        <path d="M-44 0A44 44 0 0 1 0 -44" />
        <path d="M38 -8L44 0L52 -6M8 38L0 44L6 52M-38 8L-44 0L-52 6M-8 -38L0 -44L-6 -52" />
      </g>
      <circle r="9" fill="currentColor" className="ba-pulse" />
      <circle r="20" fill="currentColor" opacity=".15" />
    </g>
  ),
  hematologi: (
    <g fill="currentColor">
      {[
        [-50, -18, 0],
        [-10, -30, 0.5],
        [24, -8, 1],
        [-30, 22, 1.5],
        [12, 30, 2],
      ].map(([x, y, s]) => (
        <g key={`${x}${y}`} className="ba-drift" style={d(s)}>
          <ellipse cx={x} cy={y} rx="16" ry="10" opacity=".85" />
          <ellipse cx={x} cy={y} rx="7" ry="3.5" fill="white" opacity=".45" />
        </g>
      ))}
      <circle cx="52" cy="18" r="9" opacity=".35" />
    </g>
  ),
  imun: (
    <g>
      <path d="M-62 -34L-38 -42L-14 -34V-8C-14 10 -26 22 -38 28C-50 22 -62 10 -62 -8Z" fill="currentColor" opacity=".25" stroke="currentColor" strokeWidth="3" className="ba-pulse" />
      <g className="ba-spin" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <circle cx="24" cy="4" r="22" fill="currentColor" opacity=".8" stroke="none" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <g key={a} transform={`rotate(${a} 24 4)`}>
            <path d="M24 -18V-30" />
            <circle cx="24" cy="-33" r="4" fill="currentColor" />
          </g>
        ))}
      </g>
    </g>
  ),
  muskuloskeletal: (
    <g fill="currentColor">
      <g transform="rotate(-150)">
        <rect x="0" y="-7" width="62" height="14" rx="7" opacity=".85" />
      </g>
      <circle r="12" opacity=".95" />
      <g className="ba-swing">
        <rect x="0" y="-6" width="58" height="12" rx="6" opacity=".7" />
      </g>
    </g>
  ),
  kardio: (
    <g>
      <path className="ba-pulse" d="M0 34C-44 6 -50 -28 -24 -36C-11 -40 0 -31 0 -22C0 -31 11 -40 24 -36C50 -28 44 6 0 34Z" fill="currentColor" opacity=".85" />
      <path className="ba-flow" d="M-70 50H-30L-22 38L-14 58L-6 30L2 50H70" stroke="currentColor" strokeWidth="3" fill="none" strokeLinejoin="round" />
    </g>
  ),
  respirasi: (
    <g>
      <path d="M0 -56V-26M0 -26L-12 -18M0 -26L12 -18" stroke="currentColor" strokeWidth="5" strokeLinecap="round" fill="none" />
      <g className="ba-breathe" fill="currentColor" opacity=".8">
        <path d="M-12 -20C-34 -20 -52 6 -50 34C-49 46 -24 46 -12 34Z" />
        <path d="M12 -20C34 -20 52 6 50 34C49 46 24 46 12 34Z" />
      </g>
    </g>
  ),
  gastro: (
    <g stroke="currentColor" strokeLinecap="round" fill="none">
      <path d="M-30 -52C-30 -26 -46 -6 -28 12C-6 32 30 18 26 -10C24 -24 6 -22 0 -36L-6 -52" strokeWidth="5" />
      <path d="M-30 -52C-30 -26 -46 -6 -28 12C-6 32 30 18 26 -10C24 -24 6 -22 0 -36L-6 -52Z" fill="currentColor" opacity=".25" stroke="none" />
      <path className="ba-flow" d="M24 2C46 6 56 22 40 32S-4 30 -10 44S30 58 58 50" strokeWidth="5" />
    </g>
  ),
  hepatobilier: (
    <g fill="currentColor">
      <path d="M-58 -8C-54 -34 16 -40 52 -20C62 -12 42 10 10 20C-22 30 -58 16 -58 -8Z" opacity=".85" />
      <ellipse cx="8" cy="26" rx="7" ry="11" opacity=".55" />
      <circle cx="8" cy="40" r="4" className="ba-drip" />
      <circle cx="8" cy="40" r="4" className="ba-drip" style={d(1)} />
    </g>
  ),
  endokrin: (
    <g fill="currentColor">
      <path d="M-22 -36C-48 -36 -48 30 -22 30C-10 30 -6 16 -4 6H4C6 16 10 30 22 30C48 30 48 -36 22 -36C8 -36 6 -14 4 -6H-4C-6 -14 -8 -36 -22 -36Z" opacity=".8" />
      {[-46, -14, 18, 48].map((x, i) => (
        <circle key={x} cx={x} cy={46} r="4" className="ba-rise" style={d(i * 0.6)} />
      ))}
    </g>
  ),
  urogenital: (
    <g>
      <g fill="currentColor" opacity=".85" className="ba-pulse">
        <path d="M-26 -42C-52 -42 -56 10 -30 16C-16 20 -14 4 -20 -6C-24 -14 -14 -18 -14 -28C-14 -36 -18 -42 -26 -42Z" />
        <path d="M26 -42C52 -42 56 10 30 16C16 20 14 4 20 -6C24 -14 14 -18 14 -28C14 -36 18 -42 26 -42Z" />
      </g>
      <path className="ba-flow" d="M-18 4C-10 24 -8 36 -6 46M18 4C10 24 8 36 6 46" stroke="currentColor" strokeWidth="3" fill="none" />
      <ellipse cx="0" cy="54" rx="16" ry="9" fill="currentColor" opacity=".45" />
    </g>
  ),
  reproduksi: (
    <g className="ba-float">
      <path d="M-30 -22C-10 -12 10 -12 30 -22C25 2 15 22 8 30V44H-8V30C-15 22 -25 2 -30 -22Z" fill="currentColor" opacity=".8" />
      <path d="M-30 -22C-40 -30 -46 -34 -52 -26M30 -22C40 -30 46 -34 52 -26" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="-56" cy="-18" r="8" fill="currentColor" opacity=".55" className="ba-pulse" />
      <circle cx="56" cy="-18" r="8" fill="currentColor" opacity=".55" className="ba-pulse" style={d(0.6)} />
    </g>
  ),
  "saraf-jiwa": (
    <g>
      <path d="M-4 -44C-30 -50 -56 -30 -52 -4C-58 18 -36 42 -10 36C-6 40 -4 40 -4 36ZM4 -44C30 -50 56 -30 52 -4C58 18 36 42 10 36C6 40 4 40 4 36Z" fill="currentColor" opacity=".25" stroke="currentColor" strokeWidth="3" />
      <path d="M-40 -20C-28 -24 -24 -10 -14 -16M-44 10C-30 4 -22 18 -12 10M40 -20C28 -24 24 -10 14 -16M44 10C30 4 22 18 12 10" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {[
        [-26, -30, 0],
        [30, -4, 0.5],
        [-20, 22, 1],
        [22, 26, 1.5],
      ].map(([x, y, s]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="5" fill="currentColor" className="ba-spark" style={d(s)} />
      ))}
    </g>
  ),
  indera: (
    <g className="ba-blink">
      <path d="M-58 0C-28 -38 28 -38 58 0C28 38 -28 38 -58 0Z" fill="currentColor" opacity=".15" stroke="currentColor" strokeWidth="3.5" />
      <circle r="18" fill="currentColor" opacity=".55" />
      <circle r="8" fill="currentColor" />
      <circle cx="-5" cy="-6" r="3" fill="white" />
    </g>
  ),
  "gawat-darurat": (
    <g>
      <g className="ba-pulse" fill="currentColor">
        <path d="M-10 -52H10V-38H24V-18H10V-4H-10V-18H-24V-38H-10Z" opacity=".85" />
      </g>
      <path className="ba-flow" d="M-70 24H-36L-28 12L-20 24H-12L-6 50L2 -6L10 34L16 24H70" stroke="currentColor" strokeWidth="3.5" fill="none" strokeLinejoin="round" />
    </g>
  ),
  "etika-forensik": (
    <g stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" fill="none">
      <path d="M0 -44V44M-24 44H24" />
      <g className="ba-tilt">
        <path d="M-50 -30H50" />
        <path d="M-50 -30L-62 0M-50 -30L-38 0M50 -30L38 0M50 -30L62 0" strokeWidth="2" />
        <path d="M-66 0H-34C-36 12 -64 12 -66 0ZM34 0H66C64 12 36 12 34 0Z" fill="currentColor" opacity=".7" stroke="none" />
      </g>
      <circle cx="0" cy="-44" r="5" fill="currentColor" stroke="none" />
    </g>
  ),
};

export const BLOCK_ART_KEYS = Object.keys(GLYPHS);

export function OrganGlyph({ art }: { art: string }) {
  const glyph = GLYPHS[art];
  return glyph ? <g transform="translate(272 105)">{glyph}</g> : null;
}
