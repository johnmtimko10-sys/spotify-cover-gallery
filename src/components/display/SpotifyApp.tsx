import * as SliderPrimitive from "@radix-ui/react-slider";
import { Repeat, Shuffle } from "lucide-react";
import { Frame } from "./Frame";
import { NextIcon, PlayPauseIcon, PrevIcon, SpotifyLogo } from "./icons";
import { useDisplay } from "./state";
import { TRACKS, fmt } from "./tracks";

function Equalizer({ playing }: { playing: boolean }) {
  return (
    <span className="flex h-[1.6cqw] items-end gap-[0.25cqw]" aria-hidden>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`eq-bar w-[0.35cqw] rounded-full bg-spotify ${playing ? "" : "[animation-play-state:paused]"}`}
          style={{ animationDelay: `${i * -0.25}s` }}
        />
      ))}
    </span>
  );
}

export function SpotifyApp() {
  const { player } = useDisplay();
  const track = TRACKS[player.index] ?? TRACKS[0]!;

  return (
    <Frame title="Spotify">
      <main className="mx-auto mt-[3cqw] grid w-[92cqw] grid-cols-[30cqw_1fr_25cqw] items-center gap-[3cqw]">
        {/* Album cover */}
        <div className="relative aspect-square w-full">
          <img
            src={track.cover}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full scale-105 rounded-[2cqw] object-cover opacity-70 blur-2xl"
          />
          <img
            key={track.cover}
            src={track.cover}
            alt={`${track.album} album cover`}
            width={816}
            height={816}
            className="cover-in relative h-full w-full rounded-[2cqw] border border-border object-cover"
          />
        </div>

        {/* Now playing */}
        <section className="flex min-w-0 flex-col">
          <div className="flex items-center gap-[1cqw] text-[1.4cqw] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            <SpotifyLogo className="w-[2.2cqw]" />
            Now playing
          </div>
          <h1 className="mt-[1.4cqw] truncate text-[4.4cqw] font-bold leading-none tracking-tight text-foreground">
            {track.title}
          </h1>
          <p className="mt-[0.8cqw] truncate text-[2.2cqw] text-foreground/85">{track.artist}</p>
          <p className="truncate text-[1.6cqw] text-muted-foreground">{track.album}</p>

          <SliderPrimitive.Root
            value={[player.elapsed]}
            max={track.duration}
            step={1}
            onValueChange={([v]) => v !== undefined && player.seek(v)}
            aria-label="Song position"
            className="group relative mt-[2.6cqw] flex h-[2.4cqw] w-full touch-none select-none items-center"
          >
            <SliderPrimitive.Track className="relative h-[0.5cqw] w-full grow overflow-hidden rounded-full bg-track-line">
              <SliderPrimitive.Range className="absolute h-full rounded-full bg-foreground group-hover:bg-spotify" />
            </SliderPrimitive.Track>
            <SliderPrimitive.Thumb className="block size-[1.8cqw] rounded-full bg-foreground shadow-lg" />
          </SliderPrimitive.Root>
          <div className="flex justify-between text-[1.4cqw] tabular-nums text-muted-foreground">
            <span>{fmt(player.elapsed)}</span>
            <span>-{fmt(track.duration - player.elapsed)}</span>
          </div>

          <div className="mt-[1.6cqw] flex items-center justify-between text-foreground">
            <button
              type="button"
              onClick={() => player.setShuffle(!player.shuffle)}
              aria-label="Shuffle"
              aria-pressed={player.shuffle}
              className={`p-[0.6cqw] transition-colors ${player.shuffle ? "text-spotify" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Shuffle className="h-auto w-[2.4cqw]" strokeWidth={2.4} />
            </button>
            <button type="button" onClick={player.prev} aria-label="Previous track" className="p-[0.6cqw] transition-transform active:scale-90">
              <PrevIcon className="w-[3.2cqw]" />
            </button>
            <button
              type="button"
              onClick={player.toggle}
              aria-label={player.playing ? "Pause" : "Play"}
              className="play-button grid size-[7cqw] place-items-center rounded-full bg-spotify text-spotify-foreground transition-transform hover:scale-105 active:scale-95"
            >
              <PlayPauseIcon playing={player.playing} className={`w-[2.8cqw] ${player.playing ? "" : "translate-x-[0.2cqw]"}`} />
            </button>
            <button type="button" onClick={player.next} aria-label="Next track" className="p-[0.6cqw] transition-transform active:scale-90">
              <NextIcon className="w-[3.2cqw]" />
            </button>
            <button
              type="button"
              onClick={() => player.setRepeat(!player.repeat)}
              aria-label="Repeat song"
              aria-pressed={player.repeat}
              className={`p-[0.6cqw] transition-colors ${player.repeat ? "text-spotify" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Repeat className="h-auto w-[2.4cqw]" strokeWidth={2.4} />
            </button>
          </div>
        </section>

        {/* Queue */}
        <section className="panel-purple flex h-[38cqw] flex-col rounded-[2.4cqw] p-[1.8cqw]">
          <h2 className="mb-[1.2cqw] text-[1.8cqw] font-semibold text-foreground">Queue</h2>
          <ul className="flex flex-col gap-[0.8cqw]">
            {TRACKS.map((t, i) => {
              const current = i === player.index;
              return (
                <li key={t.title}>
                  <button
                    type="button"
                    onClick={() => player.playIndex(i)}
                    aria-current={current}
                    className={`flex w-full items-center gap-[1.2cqw] rounded-[1.2cqw] p-[0.7cqw] text-left transition-colors ${
                      current ? "bg-foreground/10" : "hover:bg-foreground/5"
                    }`}
                  >
                    <img src={t.cover} alt="" width={816} height={816} loading="lazy" className="size-[5cqw] shrink-0 rounded-[0.7cqw] object-cover" />
                    <span className="min-w-0 flex-1">
                      <span className={`block truncate text-[1.6cqw] font-semibold ${current ? "text-spotify" : "text-foreground"}`}>{t.title}</span>
                      <span className="block truncate text-[1.3cqw] text-muted-foreground">{t.artist}</span>
                    </span>
                    {current ? <Equalizer playing={player.playing} /> : <span className="text-[1.3cqw] tabular-nums text-muted-foreground">{fmt(t.duration)}</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </Frame>
  );
}
