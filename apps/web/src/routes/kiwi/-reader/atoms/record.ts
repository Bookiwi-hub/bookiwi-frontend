import { atom, participantIdAtom } from "@bookiwi/jotai";

import { updateIDBRecord } from "../utils/idb";

import { bookAtom } from "./book";

import { Bookmark, ReadingRecord } from "#/types/kiwi";

export const currentCfiAtom = atom<string | null>(null);
export const percentageAtom = atom<number | null>((get) => {
  const book = get(bookAtom);
  const currentCfi = get(currentCfiAtom);
  if (!book || !currentCfi) return null;
  const percent = Math.floor(
    book.locations.percentageFromCfi(currentCfi) * 100,
  );
  return percent;
});
export const bookmarksAtom = atom<Bookmark[]>([]);

export const recordAtom = atom<ReadingRecord, [ReadingRecord], void>(
  (get) => ({
    currentCfi: get(currentCfiAtom),
    percentage: get(percentageAtom),
    bookmarks: get(bookmarksAtom),
  }),
  (get, set, newRecord: ReadingRecord) => {
    set(currentCfiAtom, newRecord.currentCfi);
    set(bookmarksAtom, newRecord.bookmarks);
  },
);

export const setCurrentCfiAtom = atom(null, async (get, set, cfi: string) => {
  const participantId = get(participantIdAtom);
  if (!participantId) return;
  set(currentCfiAtom, cfi);
  await updateIDBRecord(get(recordAtom), participantId);
});

export const setBookmarkAtom = atom(null, async (get, set, cfi: string) => {
  const participantId = get(participantIdAtom);
  if (!participantId) return;
  const newBookmark = {
    cfi,
    createdAt: new Date().toISOString(),
  };

  set(bookmarksAtom, [...get(bookmarksAtom), newBookmark]);
  await updateIDBRecord(get(recordAtom), participantId);
});

export const removeBookmarkAtom = atom(null, async (get, set, cfi: string) => {
  const participantId = get(participantIdAtom);
  if (!participantId) return;
  set(
    bookmarksAtom,
    get(bookmarksAtom).filter((b) => b.cfi !== cfi),
  );
  await updateIDBRecord(get(recordAtom), participantId);
});
