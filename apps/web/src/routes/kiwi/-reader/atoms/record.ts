import {
  atom,
  bookmarksAtom,
  currentCfiAtom,
  participantIdAtom,
  recordAtom,
} from "@bookiwi/jotai";

import { updateIDBRecord } from "../utils/idb";

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
