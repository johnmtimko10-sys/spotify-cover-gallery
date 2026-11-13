export type Photo = { id: string; name: string; url: string };
type PhotoRecord = { id: string; name: string; blob: Blob; createdAt: number };

const DB_NAME = "cover-display";
const STORE = "photos";

/** Only pictures and GIFs can go on the display; anything else dropped is ignored. */
export function onlyImages(files: Iterable<File>): File[] {
  return Array.from(files).filter((f) => f.type.startsWith("image/"));
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE, { keyPath: "id" });
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function run<T>(mode: IDBTransactionMode, fn: (s: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const req = fn(db.transaction(STORE, mode).objectStore(STORE));
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function loadPhotoRecords(): Promise<PhotoRecord[]> {
  const all = await run<PhotoRecord[]>("readonly", (s) => s.getAll());
  return all.sort((a, b) => a.createdAt - b.createdAt);
}

export const savePhotoRecord = (r: PhotoRecord) => run("readwrite", (s) => s.put(r));
export const deletePhotoRecord = (id: string) => run("readwrite", (s) => s.delete(id));
