import { createFileRoute } from "@tanstack/react-router";
import { LightsApp } from "@/components/display/LightsApp";

export const Route = createFileRoute("/lights")({
  head: () => ({
    meta: [
      { title: "Lights · Cover Display" },
      { name: "description", content: "Turn your lights on or off and set their brightness and color." },
      { property: "og:title", content: "Lights · Cover Display" },
      { property: "og:description", content: "Turn your lights on or off and set their brightness and color." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LightsApp,
});
