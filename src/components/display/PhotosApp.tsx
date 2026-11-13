import { ChevronLeft, ChevronRight, ImagePlus, Maximize, Minimize, Plus, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type DragEvent } from "react";
import { BackButton, Frame } from "./Frame";
import type { Photo } from "./photos";
import { useDisplay } from "./state";

function useDropZone(onFiles: (files: FileList) => void) {
  const [dragging, setDragging] = useState(false);
  const props = {
    onDragOver: (e: DragEvent) => {
      e.preventDefault();
      setDragging(true);
    },
    onDragLeave: (e: DragEvent) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setDragging(false);
    },
    onDrop: (e: DragEvent) => {
      e.preventDefault();
      setDragging(false);
      if (e.dataTransfer.files.length) onFiles(e.dataTransfer.files);
    },
  };
  return { dragging, props };
}

function DropOverlay({ show }: { show: boolean }) {
  return (
    <div
      className={`pointer-events-none absolute inset-[1.2cqw] z-40 grid place-items-center rounded-[2.4cqw] border-[0.3cqw] border-dashed border-glow-green bg-background/70 backdrop-blur-sm transition-opacity duration-200 ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex flex-col items-center gap-[1cqw] text-glow-green">
        <ImagePlus className="h-auto w-[6cqw]" strokeWidth={1.8} />
        <span className="text-[2.4cqw] font-semibold">Drop to show on the display</span>
      </div>
    </div>
  );
}

function PhotoViewer({
  photos,
  id,
  onBack,
  onSelect,
  onFiles,
}: {
  photos: Photo[];
  id: string;
  onBack: () => void;
  onSelect: (id: string) => void;
  onFiles: (files: FileList) => void;
}) {
  const index = Math.max(0, photos.findIndex((p) => p.id === id));
  const photo = photos[index]!;
  const [fill, setFill] = useState(true);
  const [controls, setControls] = useState(true);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const { dragging, props } = useDropZone(onFiles);

  const poke = useCallback(() => {
    setControls(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setControls(false), 2500);
  }, []);

  const step = useCallback(
    (d: number) => {
      const next = photos[(index + d + photos.length) % photos.length];
      if (next) onSelect(next.id);
    },
    [photos, index, onSelect],
  );

  useEffect(() => {
    poke();
    return () => clearTimeout(timer.current);
  }, [poke]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onBack();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onBack, step]);

  const chrome = `transition-opacity duration-300 ${controls ? "opacity-100" : "pointer-events-none opacity-0"}`;
  const roundBtn =
    "grid size-[4.8cqw] place-items-center rounded-full border border-border bg-background/50 text-foreground backdrop-blur-md transition hover:bg-background/75 active:scale-95";

  return (
    <Frame bare>
      <div {...props} onPointerMove={poke} onClick={poke} className={`absolute inset-0 bg-background ${controls ? "" : "cursor-none"}`}>
        {!fill && <img src={photo.url} alt="" aria-hidden className="absolute inset-0 h-full w-full scale-110 object-cover opacity-50 blur-3xl" />}
        <img
          key={photo.id}
          src={photo.url}
          alt={photo.name}
          className={`cover-in absolute inset-0 h-full w-full ${fill ? "object-cover" : "object-contain"}`}
        />

        <BackButton onClick={onBack} label="Back to photos" hidden={!controls} />

        <div className={`absolute right-[2cqw] top-[2cqw] z-30 flex items-center gap-[1cqw] ${chrome}`}>
          {photos.length > 1 && (
            <span className="rounded-full border border-border bg-background/50 px-[1.4cqw] py-[0.6cqw] text-[1.4cqw] tabular-nums text-foreground backdrop-blur-md">
              {index + 1} / {photos.length}
            </span>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setFill((f) => !f);
              poke();
            }}
            aria-label={fill ? "Show whole picture" : "Fill the screen"}
            className={roundBtn}
          >
            {fill ? <Minimize className="h-auto w-[2.2cqw]" /> : <Maximize className="h-auto w-[2.2cqw]" />}
          </button>
        </div>

        {photos.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
                poke();
              }}
              aria-label="Previous picture"
              className={`absolute left-[2cqw] top-1/2 z-30 -translate-y-1/2 ${roundBtn} ${chrome}`}
            >
              <ChevronLeft className="h-auto w-[2.8cqw]" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
                poke();
              }}
              aria-label="Next picture"
              className={`absolute right-[2cqw] top-1/2 z-30 -translate-y-1/2 ${roundBtn} ${chrome}`}
            >
              <ChevronRight className="h-auto w-[2.8cqw]" />
            </button>
          </>
        )}
        <DropOverlay show={dragging} />
      </div>
    </Frame>
  );
}

export function PhotosApp() {
  const { photos } = useDisplay();
  const [viewing, setViewing] = useState<string | null>(null);
  const input = useRef<HTMLInputElement>(null);

  const addFiles = useCallback(
    (files: FileList) => {
      const ids = photos.add(files);
      if (ids[0]) setViewing(ids[0]);
    },
    [photos],
  );
  const { dragging, props } = useDropZone(addFiles);
  const back = useCallback(() => setViewing(null), []);

  const picker = (
    <input
      ref={input}
      type="file"
      accept="image/*"
      multiple
      hidden
      onChange={(e) => {
        if (e.target.files?.length) addFiles(e.target.files);
        e.target.value = "";
      }}
    />
  );

  const current = viewing && photos.items.some((p) => p.id === viewing) ? viewing : null;
  if (current) {
    return (
      <>
        {picker}
        <PhotoViewer photos={photos.items} id={current} onBack={back} onSelect={setViewing} onFiles={addFiles} />
      </>
    );
  }

  return (
    <Frame title="Photos">
      {picker}
      <main {...props} className="relative mx-auto mt-[3cqw] h-[38cqw] w-[92cqw]">
        {photos.items.length === 0 ? (
          <button
            type="button"
            onClick={() => input.current?.click()}
            className="panel flex h-full w-full flex-col items-center justify-center gap-[1.4cqw] rounded-[2.6cqw] border-[0.25cqw] border-dashed border-foreground/25 transition-colors hover:border-glow-green/70"
          >
            <span className="grid size-[9cqw] place-items-center rounded-full bg-glow-green/15 text-glow-green">
              <ImagePlus className="h-auto w-[4.6cqw]" strokeWidth={1.8} />
            </span>
            <span className="text-[3cqw] font-semibold tracking-tight text-foreground">Drop pictures or GIFs here</span>
            <span className="text-[1.7cqw] text-muted-foreground">They'll fill the whole screen · or tap to choose files</span>
          </button>
        ) : (
          <div className="flex h-full flex-col">
            <div className="mb-[1.4cqw] flex items-center justify-between">
              <h1 className="text-[2.6cqw] font-semibold tracking-tight text-foreground">
                Photos <span className="text-muted-foreground">· {photos.items.length}</span>
              </h1>
              <span className="text-[1.5cqw] text-muted-foreground">Tap one to show it full screen</span>
            </div>
            <ul className="grid min-h-0 flex-1 auto-rows-min grid-cols-4 gap-[1.4cqw] overflow-y-auto pb-[1cqw] pr-[0.4cqw]">
              <li>
                <button
                  type="button"
                  onClick={() => input.current?.click()}
                  aria-label="Add pictures"
                  className="flex aspect-[1320/750] w-full flex-col items-center justify-center gap-[0.6cqw] rounded-[1.4cqw] border-[0.2cqw] border-dashed border-foreground/25 text-muted-foreground transition-colors hover:border-glow-green/70 hover:text-glow-green"
                >
                  <Plus className="h-auto w-[3cqw]" />
                  <span className="text-[1.4cqw] font-medium">Add</span>
                </button>
              </li>
              {photos.items.map((p) => (
                <li key={p.id} className="group relative">
                  <button
                    type="button"
                    onClick={() => setViewing(p.id)}
                    aria-label={`Show ${p.name} full screen`}
                    className="block aspect-[1320/750] w-full overflow-hidden rounded-[1.4cqw] border border-border transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <img src={p.url} alt={p.name} className="h-full w-full object-cover" />
                  </button>
                  <button
                    type="button"
                    onClick={() => photos.remove(p.id)}
                    aria-label={`Remove ${p.name}`}
                    className="absolute right-[0.8cqw] top-[0.8cqw] grid size-[3cqw] place-items-center rounded-full bg-background/70 text-foreground opacity-0 backdrop-blur transition-opacity hover:bg-destructive group-hover:opacity-100 focus-visible:opacity-100"
                  >
                    <X className="h-auto w-[1.6cqw]" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <DropOverlay show={dragging} />
      </main>
    </Frame>
  );
}
