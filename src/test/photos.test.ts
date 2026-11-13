import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";
import { onlyImages } from "@/components/display/photos";
import { routeTree } from "@/routeTree.gen";

describe("Photos app", () => {
  it("has its own page at /photos", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(router.matchRoutes("/photos").at(-1)?.routeId).toBe("/photos");
    expect(router.matchRoutes("/photos").at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("accepts pictures and GIFs but ignores other dropped files", () => {
    const files = [
      new File(["a"], "a.png", { type: "image/png" }),
      new File(["b"], "b.gif", { type: "image/gif" }),
      new File(["c"], "c.pdf", { type: "application/pdf" }),
      new File(["d"], "d.mp3", { type: "audio/mpeg" }),
    ];
    expect(onlyImages(files).map((f) => f.name)).toEqual(["a.png", "b.gif"]);
  });
});
