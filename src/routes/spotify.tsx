import { createFileRoute } from "@tanstack/react-router";
import { SpotifyApp } from "@/components/display/SpotifyApp";

export const Route = createFileRoute("/spotify")({
  head: () => ({
    meta: [
      { title: "Spotify · Cover Display" },
      { name: "description", content: "Now playing with album cover, song info, skip controls and queue." },
      { property: "og:title", content: "Spotify · Cover Display" },
      { property: "og:description", content: "Now playing with album cover, song info, skip controls and queue." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SpotifyApp,
});
