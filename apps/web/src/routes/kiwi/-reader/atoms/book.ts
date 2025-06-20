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
export const selectionObjectAtom = atom<{ selection: Selection | null } | null>(
  null,
);
export const selectionAtom = atom<Selection | null, [Selection | null], void>(
  (get) => {
    const selectionObject = get(selectionObjectAtom);
    return selectionObject?.selection ?? null;
  },
  (get, set, selection: Selection | null) => {
    set(selectionObjectAtom, { selection });
  },
);

export const initialCfiAtom = atom<{ start: string; end: string } | null>(null);
export const initialIsSinglePageAtom = atom<boolean>(false);

export const toggleCenterTouchedAtom = atom(null, (get, set) => {
  const selection = get(selectionAtom);
  const highlightClicked = get(highlightClickedAtom);
  if (!selection || selection.toString().trim() === "") {
    if (!highlightClicked) {
      set(isCenterTouchedAtom, !get(isCenterTouchedAtom));
    }
  }
});

export const highlightClickedAtom = atom<boolean>(false);

export const setHighlightClickedAtom = atom(
  null,
  (get, set, clicked: boolean) => {
    set(highlightClickedAtom, clicked);
    set(isCenterTouchedAtom, false);
  },
);
