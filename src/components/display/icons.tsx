import type { CSSProperties } from "react";

export function BulbIcon({
  on,
  color,
  brightness = 100,
  className = "w-[17cqw]",
}: {
  on: boolean;
  color: string;
  brightness?: number;
  className?: string;
}) {
  const b = brightness / 100;
  const rayStyle: CSSProperties = on
    ? { stroke: color, opacity: 0.35 + b * 0.65 }
    : { stroke: "var(--off)" };
  const bodyStyle: CSSProperties = on
    ? { fill: `color-mix(in oklab, ${color} ${Math.round(15 + (1 - b) * 30)}%, var(--foreground))` }
    : { fill: "var(--off)" };
  const glow: CSSProperties = on
    ? {
        filter: `drop-shadow(0 0 ${6 + b * 22}px color-mix(in oklab, ${color} ${Math.round(30 + b * 50)}%, transparent))`,
      }
    : {};
  return (
    <svg viewBox="0 0 220 220" className={`${className} transition-all duration-500`} style={glow} aria-hidden>
      <g strokeWidth="11" strokeLinecap="round" className="transition-all duration-500" style={rayStyle}>
        <line x1="110" y1="8" x2="110" y2="34" />
        <line x1="40" y1="44" x2="58" y2="60" />
        <line x1="180" y1="44" x2="162" y2="60" />
        <line x1="12" y1="113" x2="36" y2="113" />
        <line x1="184" y1="113" x2="208" y2="113" />
      </g>
      <g className="transition-all duration-500" style={bodyStyle}>
        <path d="M110 56c-30 0-52 23-52 51 0 18 9 31 19 42 7 8 11 15 11 24h44c0-9 4-16 11-24 10-11 19-24 19-42 0-28-22-51-52-51Z" />
        <rect x="86" y="180" width="48" height="9" rx="4.5" />
        <rect x="88" y="193" width="44" height="9" rx="4.5" />
        <rect x="94" y="206" width="32" height="9" rx="4.5" />
      </g>
    </svg>
  );
}

export function SpotifyLogo({ className = "w-[11.5cqw]" }: { className?: string }) {
  return (
    <svg viewBox="-2 -2 172 172" className={`${className} overflow-visible`} aria-label="Spotify">
      <circle cx="84" cy="84" r="84" className="fill-spotify" />
      <g fill="none" strokeLinecap="round" className="stroke-spotify-foreground">
        <path d="M36 62c32-10 70-8 98 8" strokeWidth="14" />
        <path d="M41 88c27-8 59-6 84 8" strokeWidth="11.5" />
        <path d="M47 112c22-6 46-4 66 6" strokeWidth="9.5" />
      </g>
    </svg>
  );
}

export function PrevIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`fill-current ${className ?? ""}`} aria-hidden>
      <rect x="3" y="3" width="3.2" height="18" rx="1" />
      <path d="M21 4.2v15.6c0 .9-1 1.4-1.7.9L8.4 12.9a1.1 1.1 0 0 1 0-1.8L19.3 3.3c.7-.5 1.7 0 1.7.9Z" />
    </svg>
  );
}

export function NextIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`fill-current ${className ?? ""}`} aria-hidden>
      <rect x="17.8" y="3" width="3.2" height="18" rx="1" />
      <path d="M3 4.2v15.6c0 .9 1 1.4 1.7.9l10.9-7.8a1.1 1.1 0 0 0 0-1.8L4.7 3.3C4 2.8 3 3.3 3 4.2Z" />
    </svg>
  );
}

export function PlayPauseIcon({ playing, className }: { playing: boolean; className?: string }) {
  return playing ? (
    <svg viewBox="0 0 24 24" className={`fill-current ${className ?? ""}`} aria-hidden>
      <rect x="4" y="2" width="5.5" height="20" rx="1.4" />
      <rect x="14.5" y="2" width="5.5" height="20" rx="1.4" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" className={`fill-current ${className ?? ""}`} aria-hidden>
      <path d="M5 3.6v16.8c0 1.1 1.2 1.8 2.2 1.2l13.6-8.4a1.4 1.4 0 0 0 0-2.4L7.2 2.4C6.2 1.8 5 2.5 5 3.6Z" />
    </svg>
  );
}
