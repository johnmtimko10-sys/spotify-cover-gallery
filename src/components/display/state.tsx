import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { TRACKS } from "./tracks";
import { LIGHT_PRESETS, type LightColor } from "./lights";
import { deletePhotoRecord, loadPhotoRecords, onlyImages, savePhotoRecord, type Photo } from "./photos";

type DisplayState = {
  lights: {
    on: boolean;
    brightness: number;
    color: LightColor;
    setOn: (v: boolean) => void;
    setBrightness: (v: number) => void;
    setColor: (c: LightColor) => void;
  };
  player: {
    playing: boolean;
    index: number;
    elapsed: number;
    shuffle: boolean;
    repeat: boolean;
    toggle: () => void;
    next: () => void;
    prev: () => void;
    playIndex: (i: number) => void;
    seek: (s: number) => void;
    setShuffle: (v: boolean) => void;
    setRepeat: (v: boolean) => void;
  };
  photos: {
    items: Photo[];
    /** Adds the pictures/GIFs among `files` and returns their new ids. */
    add: (files: Iterable<File>) => string[];
    remove: (id: string) => void;
  };
};

const Ctx = createContext<DisplayState | null>(null);

export function DisplayProvider({ children }: { children: ReactNode }) {
  const [on, setOn] = useState(true);
  const [brightness, setBrightness] = useState(80);
  const [color, setColor] = useState<LightColor>(LIGHT_PRESETS[2]!);

  const [playing, setPlaying] = useState(true);
  const [index, setIndex] = useState(0);
  const [elapsed, setElapsed] = useState(48);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const [photoItems, setPhotoItems] = useState<Photo[]>([]);
  const photoRef = useRef(photoItems);
  photoRef.current = photoItems;

  // Saved photos live in the browser so they survive a reload.
  useEffect(() => {
    let cancelled = false;
    loadPhotoRecords()
      .then((recs) => {
        if (cancelled) return;
        const loaded = recs.map((r) => ({ id: r.id, name: r.name, url: URL.createObjectURL(r.blob) }));
        setPhotoItems((cur) => [...loaded, ...cur.filter((c) => !loaded.some((l) => l.id === c.id))]);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const addPhotos = useCallback((files: Iterable<File>) => {
    const now = Date.now();
    const added = onlyImages(files).map((file, i) => ({
      id: crypto.randomUUID(),
      name: file.name,
      url: URL.createObjectURL(file),
      file,
      createdAt: now + i,
    }));
    setPhotoItems((cur) => [...cur, ...added.map(({ id, name, url }) => ({ id, name, url }))]);
    for (const a of added) savePhotoRecord({ id: a.id, name: a.name, blob: a.file, createdAt: a.createdAt }).catch(() => {});
    return added.map((a) => a.id);
  }, []);

  const removePhoto = useCallback((id: string) => {
    const hit = photoRef.current.find((p) => p.id === id);
    if (hit) URL.revokeObjectURL(hit.url);
    setPhotoItems((cur) => cur.filter((p) => p.id !== id));
    deletePhotoRecord(id).catch(() => {});
  }, []);

  const pickNext = useCallback(
    (i: number) => {
      if (shuffle && TRACKS.length > 1) {
        let n = i;
        while (n === i) n = Math.floor(Math.random() * TRACKS.length);
        return n;
      }
      return (i + 1) % TRACKS.length;
    },
    [shuffle],
  );

  const duration = TRACKS[index]?.duration ?? 1;

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setElapsed((e) => {
        if (e + 1 < duration) return e + 1;
        if (!repeat) setIndex((i) => pickNext(i));
        return 0;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [playing, duration, repeat, pickNext]);

  const value = useMemo<DisplayState>(
    () => ({
      lights: { on, brightness, color, setOn, setBrightness, setColor },
      player: {
        playing,
        index,
        elapsed,
        shuffle,
        repeat,
        toggle: () => setPlaying((p) => !p),
        next: () => {
          setIndex((i) => pickNext(i));
          setElapsed(0);
        },
        prev: () => {
          if (elapsed > 3) return setElapsed(0);
          setIndex((i) => (i - 1 + TRACKS.length) % TRACKS.length);
          setElapsed(0);
        },
        playIndex: (i) => {
          setIndex(i);
          setElapsed(0);
          setPlaying(true);
        },
        seek: (s) => setElapsed(Math.max(0, Math.min(duration - 1, Math.round(s)))),
        setShuffle,
        setRepeat,
      },
      photos: { items: photoItems, add: addPhotos, remove: removePhoto },
    }),
    [on, brightness, color, playing, index, elapsed, shuffle, repeat, pickNext, duration, photoItems, addPhotos, removePhoto],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useDisplay() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useDisplay must be used inside DisplayProvider");
  return v;
}
