import { atom } from "jotai";

import { Location } from "@bookiwi/epubjs";
import Section from "@bookiwi/epubjs/types/section";

export const currentSectionAtom = atom<Section>();
export const currentLocationAtom = atom<Location>();
export const isProgressBarOpenAtom = atom<boolean>(false);

export const toggleProgressBarAtom = atom(null, (get, set) => {
  set(isProgressBarOpenAtom, !get(isProgressBarOpenAtom));
});
