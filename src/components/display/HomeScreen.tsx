import { useNavigate } from "@tanstack/react-router";
import { Power } from "lucide-react";
import type { MouseEvent } from "react";
import { Frame } from "./Frame";
import { BulbIcon, NextIcon, PlayPauseIcon, PrevIcon, SpotifyLogo } from "./icons";
import { toCss } from "./lights";
import { useDisplay } from "./state";
import { TRACKS } from "./tracks";

function TileWave({ tone }: { tone: "green" | "purple" }) {
  const cls = tone === "green" ? "fill-glow-green/15" : "fill-glow-purple/15";
  return (
    <svg className="pointer-events-none absolute inset-x-0 bottom-0 h-[30%] w-full" viewBox="0 0 400 120" preserveAspectRatio="none" aria-hidden>
      <path d="M0 20 C 120 10, 180 90, 260 70 S 360 20, 400 0 L400 120 L0 120 Z" className={cls} />
    </svg>
  );
}

const stop = (fn: () => void) => (e: MouseEvent) => {
  e.stopPropagation();
  fn();
};

export function HomeScreen() {
  const navigate = useNavigate();
  const { lights, player } = useDisplay();
  const track = TRACKS[player.index] ?? TRACKS[0]!;
  const progress = (player.elapsed / track.duration) * 100;

  return (
    <Frame>
      <main className="mt-[5cqw] flex justify-center gap-[5.6cqw]">
        <div
          role="link"
          tabIndex={0}
          aria-label="Open Lights"
          onClick={() => navigate({ to: "/lights" })}
          onKeyDown={(e) => e.key === "Enter" && navigate({ to: "/lights" })}
          className={`relative flex h-[31.5cqw] w-[32.5cqw] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[2.6cqw] transition-all duration-500 hover:scale-[1.015] active:scale-[0.98] ${
            lights.on ? "tile-green" : "tile-green-off"
          }`}
        >
          {lights.on && <TileWave tone="green" />}
          <button
            type="button"
            onClick={stop(() => lights.setOn(!lights.on))}
            aria-label={lights.on ? "Turn lights off" : "Turn lights on"}
            className={`absolute right-[1.6cqw] top-[1.6cqw] z-10 grid size-[4cqw] place-items-center rounded-full transition-colors ${
              lights.on ? "bg-glow-green text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            <Power className="h-auto w-[2cqw]" strokeWidth={2.6} />
          </button>
          <div className="relative -mt-[1cqw]">
            <BulbIcon on={lights.on} color={toCss(lights.color)} brightness={lights.brightness} />
          </div>
          <span className={`relative mt-[0.8cqw] text-[3.6cqw] font-semibold tracking-tight transition-colors duration-500 ${lights.on ? "text-foreground" : "text-off"}`}>
            Lights
          </span>
          <span className="relative text-[1.5cqw] text-muted-foreground">
            {lights.on ? `${lights.brightness}% · ${lights.color.name}` : "Off"}
          </span>
        </div>

        <div
          role="link"
          tabIndex={0}
          aria-label="Open Spotify"
          onClick={() => navigate({ to: "/spotify" })}
          onKeyDown={(e) => e.key === "Enter" && navigate({ to: "/spotify" })}
          className="tile-purple relative flex h-[31.5cqw] w-[32.5cqw] cursor-pointer flex-col items-center overflow-hidden rounded-[2.6cqw] px-[2.4cqw] pt-[2.6cqw] transition-transform duration-500 hover:scale-[1.015] active:scale-[0.98]"
        >
          <TileWave tone="purple" />
          <div className="relative">
            <SpotifyLogo />
          </div>
          <div className="relative mt-[2cqw] flex w-full items-center justify-between px-[4cqw] text-foreground">
            <button type="button" onClick={stop(player.prev)} aria-label="Previous track" className="p-[0.6cqw] transition-transform active:scale-90">
              <PrevIcon className="w-[3cqw]" />
            </button>
            <button type="button" onClick={stop(player.toggle)} aria-label={player.playing ? "Pause" : "Play"} className="p-[0.6cqw] transition-transform active:scale-90">
              <PlayPauseIcon playing={player.playing} className="w-[3.6cqw]" />
            </button>
            <button type="button" onClick={stop(player.next)} aria-label="Next track" className="p-[0.6cqw] transition-transform active:scale-90">
              <NextIcon className="w-[3cqw]" />
            </button>
          </div>
          <div className="relative mt-[1.8cqw] h-[0.18cqw] w-full rounded-full bg-track-line">
            <div className="h-full rounded-full bg-foreground/80 transition-[width] duration-1000 ease-linear" style={{ width: `${progress}%` }} />
          </div>
          <div className="relative mt-[1.6cqw] text-center">
            <p className="max-w-[26cqw] truncate text-[2cqw] font-bold leading-tight text-foreground">{track.title}</p>
            <p className="mt-[0.3cqw] text-[1.75cqw] text-muted-foreground">{track.artist}</p>
          </div>
        </div>
      </main>
    </Frame>
  );
}
