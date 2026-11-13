import { createFileRoute } from "@tanstack/react-router";
import { CoverDisplay } from "@/components/display/CoverDisplay";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Spotify Cover Display" },
      { name: "description", content: "Glowing smart display with a lights toggle and Spotify playback controls." },
      { property: "og:title", content: "Spotify Cover Display" },
      { property: "og:description", content: "Glowing smart display with a lights toggle and Spotify playback controls." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <CoverDisplay />
    </div>
  );
}
