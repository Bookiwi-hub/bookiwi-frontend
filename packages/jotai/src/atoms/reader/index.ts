import { atom } from "jotai";

import { Book, Location } from "@bookiwi/epubjs";
import Section from "@bookiwi/epubjs/types/section";

export const bookAtom = atom<Book>();

export const currentSectionAtom = atom<Section>();
export const currentLocationAtom = atom<Location>();
export const isCenterTouchedAtom = atom<boolean>(false);

export const toggleCenterTouchedAtom = atom(null, (get, set) => {
  set(isCenterTouchedAtom, !get(isCenterTouchedAtom));
});

interface Typography {
  fontFamily: string | null;
  fontSize: number | null;
  lineHeight: number | null;
  fontWeight: number | null;
}

interface Settings {
  isSinglePage: boolean;
  fontFamily: string | null;
  fontSize: number | null;
  lineHeight: number | null;
  fontWeight: number | null;
}

// 개별 설정 atom들
export const isSinglePageAtom = atom<boolean>(false);
export const fontFamilyAtom = atom<string | null>(null);
export const fontSizeAtom = atom<number | null>(null);
export const lineHeightAtom = atom<number | null>(null);
export const fontWeightAtom = atom<number | null>(null);

export const typographyAtom = atom<Typography, [Typography], void>(
  (get) => ({
    fontFamily: get(fontFamilyAtom),
    fontSize: get(fontSizeAtom),
    lineHeight: get(lineHeightAtom),
    fontWeight: get(fontWeightAtom),
  }),
  (get, set, newSettings: Typography) => {
    set(fontFamilyAtom, newSettings.fontFamily);
    set(fontSizeAtom, newSettings.fontSize);
    set(lineHeightAtom, newSettings.lineHeight);
    set(fontWeightAtom, newSettings.fontWeight);
  },
);

export const settingsAtom = atom<Settings, [Settings], void>(
  (get) => ({
    isSinglePage: get(isSinglePageAtom),
    fontFamily: get(fontFamilyAtom),
    fontSize: get(fontSizeAtom),
    lineHeight: get(lineHeightAtom),
    fontWeight: get(fontWeightAtom),
  }),
  (get, set, newSettings: Settings) => {
    set(isSinglePageAtom, newSettings.isSinglePage);
    set(fontFamilyAtom, newSettings.fontFamily);
    set(fontSizeAtom, newSettings.fontSize);
    set(lineHeightAtom, newSettings.lineHeight);
    set(fontWeightAtom, newSettings.fontWeight);
  },
);
