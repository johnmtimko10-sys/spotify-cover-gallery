import { useEffect, useState } from "react";

type Track = { title: string; artist: string; duration: number };

const TRACKS: Track[] = [
  { title: "FE!N", artist: "Travis Scott", duration: 191 },
  { title: "HIGHEST IN THE ROOM", artist: "Travis Scott", duration: 175 },
  { title: "goosebumps", artist: "Travis Scott", duration: 243 },
  { title: "SICKO MODE", artist: "Travis Scott", duration: 312 },
];

function useClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function StatusBar() {
  const now = useClock();
  const time = now
    ? now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
    : "7:42 PM";
  const date = now
    ? now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
    : "Sat, Apr 26";

  return (
    <header className="relative z-10 flex items-center justify-between px-[2cqw] pt-[2.4cqw]">
      <div className="flex items-center gap-[2.6cqw]">
        <span className="text-[2.6cqw] font-semibold tracking-tight text-foreground">{time}</span>
        <span className="h-[2.2cqw] w-px bg-muted-foreground/60" />
        <span className="text-[1.9cqw] text-muted-foreground">{date}</span>
      </div>
      <div className="flex items-center gap-[4cqw]">
        <svg viewBox="0 0 24 24" className="w-[3.4cqw] fill-foreground" aria-label="Wi-Fi">
          <path d="M12 20.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
          <path d="M12 12.5c-2 0-3.8.8-5.1 2.1l1.8 1.8a4.7 4.7 0 0 1 6.6 0l1.8-1.8A7.2 7.2 0 0 0 12 12.5Z" />
          <path d="M12 7.5c-3.4 0-6.4 1.4-8.7 3.6l1.8 1.8a9.8 9.8 0 0 1 13.8 0l1.8-1.8A12.4 12.4 0 0 0 12 7.5Z" />
          <path d="M12 2.5C7.2 2.5 2.9 4.4-.3 7.5l1.8 1.8a14.9 14.9 0 0 1 21 0l1.8-1.8A17.4 17.4 0 0 0 12 2.5Z" transform="translate(0 .5) scale(.97) translate(.37 0)" />
        </svg>
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
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1320 750"
      preserveAspectRatio="none"
      aria-hidden
    >
      <g className="wave-drift">
        <path
          d="M0 110 C 220 90, 260 300, 600 330 S 1000 300, 1320 360 L1320 750 L0 750 Z"
          className="fill-glow-green/10"
        />
        <path
          d="M0 420 C 200 300, 420 330, 700 360 S 1100 380, 1320 300 L1320 750 L0 750 Z"
          className="fill-glow-green/10"
        />
      </g>
      <g className="wave-drift" style={{ animationDelay: "-7s" }}>
        <path
          d="M700 750 C 900 600, 1100 500, 1320 380 L1320 750 Z"
          className="fill-glow-purple/25"
        />
        <path
          d="M500 750 C 800 640, 1050 360, 1320 160 L1320 750 Z"
          className="fill-glow-purple/10"
        />
      </g>
    </svg>
  );
}

function TileWave({ tone }: { tone: "green" | "purple" }) {
  const cls = tone === "green" ? "fill-glow-green/15" : "fill-glow-purple/15";
  return (
    <svg
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[30%] w-full"
      viewBox="0 0 400 120"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path d="M0 20 C 120 10, 180 90, 260 70 S 360 20, 400 0 L400 120 L0 120 Z" className={cls} />
    </svg>
  );
}

function BulbIcon({ on }: { on: boolean }) {
  const ray = on ? "stroke-glow-green" : "stroke-off";
  return (
    <svg viewBox="0 0 220 220" className={`w-[17cqw] transition-all duration-500 ${on ? "bulb-glow" : ""}`} aria-hidden>
      <g strokeWidth="11" strokeLinecap="round" className={`${ray} transition-colors duration-500`}>
        <line x1="110" y1="8" x2="110" y2="34" />
        <line x1="40" y1="44" x2="58" y2="60" />
        <line x1="180" y1="44" x2="162" y2="60" />
        <line x1="12" y1="113" x2="36" y2="113" />
        <line x1="184" y1="113" x2="208" y2="113" />
      </g>
      <path
        d="M110 56c-30 0-52 23-52 51 0 18 9 31 19 42 7 8 11 15 11 24h44c0-9 4-16 11-24 10-11 19-24 19-42 0-28-22-51-52-51Z"
        className={`${on ? "fill-foreground" : "fill-off"} transition-colors duration-500`}
      />
      <g className={`${on ? "fill-foreground" : "fill-off"} transition-colors duration-500`}>
        <rect x="86" y="180" width="48" height="9" rx="4.5" />
        <rect x="88" y="193" width="44" height="9" rx="4.5" />
        <rect x="94" y="206" width="32" height="9" rx="4.5" />
      </g>
    </svg>
  );
}

function SpotifyLogo() {
  return (
    <svg viewBox="0 0 168 168" className="w-[11.5cqw]" aria-label="Spotify">
      <circle cx="84" cy="84" r="84" className="fill-spotify" />
      <g fill="none" strokeLinecap="round" className="stroke-spotify-foreground">
        <path d="M36 62c32-10 70-8 98 8" strokeWidth="14" />
        <path d="M41 88c27-8 59-6 84 8" strokeWidth="11.5" />
        <path d="M47 112c22-6 46-4 66 6" strokeWidth="9.5" />
      </g>
    </svg>
  );
}

function fmt(s: number) {
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

export function CoverDisplay() {
  const [lightsOn, setLightsOn] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [trackIdx, setTrackIdx] = useState(0);
  const [elapsed, setElapsed] = useState(48);
  const track = TRACKS[trackIdx];

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setElapsed((e) => {
        if (e + 1 >= track.duration) {
          setTrackIdx((i) => (i + 1) % TRACKS.length);
          return 0;
        }
        return e + 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [playing, track.duration]);

  const skip = (dir: 1 | -1) => {
    if (dir === -1 && elapsed > 3) return setElapsed(0);
    setTrackIdx((i) => (i + dir + TRACKS.length) % TRACKS.length);
    setElapsed(0);
  };

  const progress = (elapsed / track.duration) * 100;

  return (
    <div className="relative aspect-[1320/750] w-[min(100vw,calc(100vh*1.76))] overflow-hidden display-bg font-sans [container-type:inline-size]">
      <BackgroundWaves />
      <StatusBar />

      <main className="relative z-10 mt-[5.5cqw] flex justify-center gap-[5.6cqw]">
        {/* Lights tile */}
        <button
          type="button"
          onClick={() => setLightsOn((v) => !v)}
          aria-pressed={lightsOn}
          className={`relative flex h-[31.5cqw] w-[32.5cqw] flex-col items-center justify-center overflow-hidden rounded-[2.6cqw] transition-all duration-500 active:scale-[0.98] ${
            lightsOn ? "tile-green" : "tile-green-off"
          }`}
        >
          {lightsOn && <TileWave tone="green" />}
          <div className="relative -mt-[1cqw]">
            <BulbIcon on={lightsOn} />
          </div>
          <span
            className={`relative mt-[0.8cqw] text-[3.6cqw] font-semibold tracking-tight transition-colors duration-500 ${
              lightsOn ? "text-foreground" : "text-off"
            }`}
          >
            Lights
          </span>
        </button>

        {/* Spotify tile */}
        <section className="tile-purple relative flex h-[31.5cqw] w-[32.5cqw] flex-col items-center overflow-hidden rounded-[2.6cqw] px-[2.4cqw] pt-[2.6cqw]">
          <TileWave tone="purple" />
          <div className="relative">
            <SpotifyLogo />
          </div>

          <div className="relative mt-[2cqw] flex w-full items-center justify-between px-[4cqw]">
            <button type="button" onClick={() => skip(-1)} aria-label="Previous track" className="p-[0.6cqw] transition-transform active:scale-90">
              <svg viewBox="0 0 24 24" className="w-[3cqw] fill-foreground">
                <rect x="3" y="3" width="3.2" height="18" rx="1" />
                <path d="M21 4.2v15.6c0 .9-1 1.4-1.7.9L8.4 12.9a1.1 1.1 0 0 1 0-1.8L19.3 3.3c.7-.5 1.7 0 1.7.9Z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause" : "Play"}
              className="p-[0.6cqw] transition-transform active:scale-90"
            >
              {playing ? (
                <svg viewBox="0 0 24 24" className="w-[3.6cqw] fill-foreground">
                  <rect x="4" y="2" width="5.5" height="20" rx="1.4" />
                  <rect x="14.5" y="2" width="5.5" height="20" rx="1.4" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="w-[3.6cqw] fill-foreground">
                  <path d="M5 3.6v16.8c0 1.1 1.2 1.8 2.2 1.2l13.6-8.4a1.4 1.4 0 0 0 0-2.4L7.2 2.4C6.2 1.8 5 2.5 5 3.6Z" />
                </svg>
              )}
            </button>
            <button type="button" onClick={() => skip(1)} aria-label="Next track" className="p-[0.6cqw] transition-transform active:scale-90">
              <svg viewBox="0 0 24 24" className="w-[3cqw] fill-foreground">
                <rect x="17.8" y="3" width="3.2" height="18" rx="1" />
                <path d="M3 4.2v15.6c0 .9 1 1.4 1.7.9l10.9-7.8a1.1 1.1 0 0 0 0-1.8L4.7 3.3C4 2.8 3 3.3 3 4.2Z" />
              </svg>
            </button>
          </div>

          <div
            className="group relative mt-[1.8cqw] h-[0.18cqw] w-full rounded-full bg-track-line"
            title={`${fmt(elapsed)} / ${fmt(track.duration)}`}
          >
            <div
              className="h-full rounded-full bg-foreground/80 transition-[width] duration-1000 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="relative mt-[1.6cqw] text-center">
            <p className="max-w-[26cqw] truncate text-[2cqw] font-bold leading-tight text-foreground">{track.title}</p>
            <p className="mt-[0.3cqw] text-[1.75cqw] text-muted-foreground">{track.artist}</p>
          </div>
        </section>
      </main>
    </div>
  );
}
