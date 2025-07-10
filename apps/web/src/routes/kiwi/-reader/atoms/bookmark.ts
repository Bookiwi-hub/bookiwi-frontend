import { atom } from "@bookiwi/jotai";
import { Bookmark } from "@bookiwi/supabase/types";

import { participantIdAtom } from "./participant";

import supabaseManager from "#/managers/supabase";

export const bookmarksAtom = atom<Bookmark[]>([]);

export const addBookmarkAtom = atom(
  null,
  async (get, set, { start, end }: { start: string; end: string }) => {
    const participantId = get(participantIdAtom);
    if (!participantId) return;
    const newBookmark: Bookmark = {
      participantId,
      cfiStart: start,
      cfiEnd: end,
      createdAt: new Date().toISOString(),
    };
    set(bookmarksAtom, [...get(bookmarksAtom), newBookmark]);
    await supabaseManager.reader.addBookmark(newBookmark);
  },
);

export const removeBookmarkAtom = atom(
  null,
  async (get, set, { start, end }: { start: string; end: string }) => {
    const participantId = get(participantIdAtom);
    if (!participantId) return;
    set(
      bookmarksAtom,
      get(bookmarksAtom).filter(
        (bookmark) => bookmark.cfiStart !== start && bookmark.cfiEnd !== end,
      ),
    );
    await supabaseManager.reader.removeBookmark({
      participantId,
      cfiStart: start,
      cfiEnd: end,
    });
  },
);
