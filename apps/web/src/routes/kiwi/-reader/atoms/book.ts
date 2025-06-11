import { Book, Location, NavItem } from "@bookiwi/epubjs";
import IframeView from "@bookiwi/epubjs/types/managers/iframe";
import Section from "@bookiwi/epubjs/types/section";
import { atom } from "@bookiwi/jotai";

export const bookAtom = atom<Book | null>(null);

export const currentSectionAtom = atom<Section>();
export const currentLocationAtom = atom<Location>();
export const currentViewAtom = atom<IframeView>();
export const navAtom = atom<NavItem[]>();
export const sectionsAtom = atom<Section[]>([]);
export const isCenterTouchedAtom = atom<boolean>(false);
export const selectionAtom = atom<{ selection: Selection } | null>(null);

export const initialCfiAtom = atom<string | null>(null);
export const initialIsSinglePageAtom = atom<boolean>(false);

export const toggleCenterTouchedAtom = atom(null, (get, set) => {
  set(isCenterTouchedAtom, !get(isCenterTouchedAtom));
});
