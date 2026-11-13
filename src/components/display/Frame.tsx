import { Link } from "@tanstack/react-router";
import { LayoutGrid, Lightbulb, Wifi } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { SpotifyLogo } from "./icons";

function useClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function StatusBar({ title }: { title?: string }) {
  const now = useClock();
  const time = now ? now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }) : "7:42 PM";
  const date = now
    ? now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
    : "Sat, Apr 26";

  return (
    <header className="relative z-10 flex items-center justify-between px-[2cqw] pt-[2.4cqw]">
      <div className="flex items-center gap-[2.6cqw]">
        <span className="text-[2.6cqw] font-semibold tracking-tight text-foreground">{time}</span>
        <span className="h-[2.2cqw] w-px bg-muted-foreground/60" />
        <span className="text-[1.9cqw] text-muted-foreground">{title ?? date}</span>
      </div>
      <div className="flex items-center gap-[4cqw]">
        <Wifi className="h-auto w-[3.4cqw] text-foreground" strokeWidth={3} aria-label="Wi-Fi" />
        <div className="flex items-center gap-[0.8cqw]">
          <div className="relative flex h-[1.9cqw] w-[3.4cqw] items-center rounded-[0.45cqw] border-[0.2cqw] border-foreground p-[0.2cqw]">
            <div className="h-full w-[78%] rounded-[0.2cqw] bg-glow-green" />
            <span className="absolute -right-[0.55cqw] h-[0.8cqw] w-[0.3cqw] rounded-r-sm bg-foreground" />
          </div>
          <span className="text-[1.9cqw] font-medium text-foreground">78%</span>
        </div>
      </div>
    </header>
  );
}

function BackgroundWaves() {
  const green = { stopColor: "var(--glow-green)" };
  const purple = { stopColor: "var(--glow-purple)" };
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1320 750" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="bg-green" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" style={{ ...green, stopOpacity: 0.28 }} />
          <stop offset="0.6" style={{ ...green, stopOpacity: 0.05 }} />
          <stop offset="1" style={{ ...green, stopOpacity: 0 }} />
        </linearGradient>
        <linearGradient id="bg-purple" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0" style={{ ...purple, stopOpacity: 0.55 }} />
          <stop offset="0.5" style={{ ...purple, stopOpacity: 0.12 }} />
          <stop offset="1" style={{ ...purple, stopOpacity: 0 }} />
        </linearGradient>
        <filter id="bg-blur">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      <g className="wave-drift">
        <path d="M-150 120 C 100 60, 260 330, 620 340 S 1100 330, 1500 420 L1500 900 L-150 900 Z" fill="url(#bg-green)" />
        <path d="M-150 450 C 150 330, 420 340, 720 370 S 1150 400, 1500 330 L1500 900 L-150 900 Z" fill="url(#bg-green)" opacity="0.7" />
      </g>
      <g className="wave-drift" style={{ animationDelay: "-7s" }} filter="url(#bg-blur)">
        <path d="M520 900 C 820 700, 1080 380, 1500 120 L1500 900 Z" fill="url(#bg-purple)" opacity="0.6" />
        <path d="M760 900 C 980 690, 1160 520, 1500 360 L1500 900 Z" fill="url(#bg-purple)" />
        <path d="M760 900 C 980 690, 1160 520, 1500 360" fill="none" strokeWidth="4" className="stroke-glow-purple/60" />
      </g>
    </svg>
  );
}

const tabBase =
  "flex h-[4.6cqw] items-center gap-[0.8cqw] rounded-full px-[1.8cqw] text-[1.5cqw] font-medium transition-all duration-300";

function Dock() {
  return (
    <nav className="absolute inset-x-0 bottom-[2cqw] z-20 flex justify-center">
      <div className="dock flex items-center gap-[0.6cqw] rounded-full p-[0.6cqw]">
        <Link
          to="/"
          className={tabBase}
          activeOptions={{ exact: true }}
          activeProps={{ className: "bg-foreground/15 text-foreground" }}
          inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
        >
          <LayoutGrid className="h-auto w-[2.2cqw]" />
          Home
        </Link>
        <Link
          to="/lights"
          className={tabBase}
          activeProps={{ className: "bg-glow-green/20 text-glow-green" }}
          inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
        >
          <Lightbulb className="h-auto w-[2.2cqw]" />
          Lights
        </Link>
        <Link
          to="/spotify"
          className={tabBase}
          activeProps={{ className: "bg-glow-purple/25 text-foreground" }}
          inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
        >
          <SpotifyLogo className="w-[2.2cqw]" />
          Spotify
        </Link>
      </div>
    </nav>
  );
}

export function Frame({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="relative aspect-[1320/750] w-[min(100vw,calc(100vh*1.76))] overflow-hidden display-bg font-sans [container-type:inline-size]">
        <BackgroundWaves />
        <StatusBar title={title} />
        <div className="app-enter relative z-10">{children}</div>
        <Dock />
      </div>
    </div>
  );
}
