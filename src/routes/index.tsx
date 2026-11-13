import { createFileRoute } from "@tanstack/react-router";
import { HomeScreen } from "@/components/display/HomeScreen";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Spotify Cover Display" },
      { name: "description", content: "Glowing smart display with Lights and Spotify apps." },
      { property: "og:title", content: "Spotify Cover Display" },
      { property: "og:description", content: "Glowing smart display with Lights and Spotify apps." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomeScreen,
});
