import { Book, Location } from "@bookiwi/epubjs";
import Section from "@bookiwi/epubjs/types/section";
import { atom } from "@bookiwi/jotai";

export const bookAtom = atom<Book | null>(null);

export const currentSectionAtom = atom<Section>();
export const currentLocationAtom = atom<Location>();
export const isCenterTouchedAtom = atom<boolean>(false);

export const toggleCenterTouchedAtom = atom(null, (get, set) => {
  set(isCenterTouchedAtom, !get(isCenterTouchedAtom));
});
