import { Link } from "@tanstack/react-router";
import { Images } from "lucide-react";
import type { ReactNode } from "react";
import { Frame } from "./Frame";
import { BulbIcon, SpotifyLogo } from "./icons";
import { toCss } from "./lights";
import { useDisplay } from "./state";
import { TRACKS } from "./tracks";

function AppIcon({
  to,
  name,
  detail,
  tileClass,
  children,
}: {
  to: "/lights" | "/spotify" | "/photos";
  name: string;
  detail: string;
  tileClass: string;
  children: ReactNode;
}) {
  return (
    <Link to={to} aria-label={`Open ${name}`} className="group flex w-[20cqw] flex-col items-center">
      <span
        className={`relative grid size-[18cqw] place-items-center overflow-hidden rounded-[4.4cqw] transition-transform duration-300 group-hover:scale-[1.04] group-active:scale-[0.96] ${tileClass}`}
      >
        {children}
      </span>
      <span className="mt-[1.6cqw] text-[2.6cqw] font-semibold tracking-tight text-foreground">{name}</span>
      <span className="max-w-full truncate text-[1.5cqw] text-muted-foreground">{detail}</span>
    </Link>
  );
}

export function HomeScreen() {
  const { lights, player, photos } = useDisplay();
  const track = TRACKS[player.index] ?? TRACKS[0]!;
  const latest = photos.items.at(-1);

  return (
    <Frame home>
      <main className="flex h-[46cqw] items-center justify-center gap-[7cqw]">
        <AppIcon
          to="/lights"
          name="Lights"
          detail={lights.on ? `${lights.brightness}% · ${lights.color.name}` : "Off"}
          tileClass={lights.on ? "tile-green" : "tile-green-off"}
        >
          <BulbIcon on={lights.on} color={toCss(lights.color)} brightness={lights.brightness} className="relative w-[11cqw]" />
        </AppIcon>

        <AppIcon
          to="/spotify"
          name="Spotify"
          detail={player.playing ? `${track.title} · ${track.artist}` : "Paused"}
          tileClass="tile-purple"
        >
          <SpotifyLogo className="relative w-[10cqw]" />
        </AppIcon>

        <AppIcon
          to="/photos"
          name="Photos"
          detail={photos.items.length ? `${photos.items.length} ${photos.items.length === 1 ? "picture" : "pictures"}` : "Drop pictures & GIFs"}
          tileClass="tile-photos"
        >
          {latest && <img src={latest.url} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-55" />}
          <Images className="relative h-auto w-[8cqw] text-glow-sunset drop-shadow-lg" strokeWidth={1.8} />
        </AppIcon>
      </main>
    </Frame>
  );
}
