import { createFileRoute } from "@tanstack/react-router";
import { PhotosApp } from "@/components/display/PhotosApp";

export const Route = createFileRoute("/photos")({
  head: () => ({
    meta: [
      { title: "Photos · Cover Display" },
      { name: "description", content: "Drop pictures or GIFs onto the display and show them full screen." },
      { property: "og:title", content: "Photos · Cover Display" },
      { property: "og:description", content: "Drop pictures or GIFs onto the display and show them full screen." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PhotosApp,
});
