import cover1 from "@/assets/cover-1.jpg";
import cover2 from "@/assets/cover-2.jpg";
import cover3 from "@/assets/cover-3.jpg";
import cover4 from "@/assets/cover-4.jpg";

export type Track = { title: string; artist: string; album: string; duration: number; cover: string };

export const TRACKS: Track[] = [
  { title: "FE!N", artist: "Travis Scott", album: "UTOPIA", duration: 191, cover: cover1 },
  { title: "HIGHEST IN THE ROOM", artist: "Travis Scott", album: "JACKBOYS", duration: 175, cover: cover2 },
  { title: "goosebumps", artist: "Travis Scott", album: "Birds in the Trap", duration: 243, cover: cover3 },
  { title: "SICKO MODE", artist: "Travis Scott", album: "ASTROWORLD", duration: 312, cover: cover4 },
];

export function fmt(s: number) {
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}
