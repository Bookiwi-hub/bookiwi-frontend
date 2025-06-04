import { atom } from "@bookiwi/jotai";

import { updateCustomStyle } from "../styles";
import { updateIDBSettings } from "../utils/idb";

import { bookAtom } from "./book";
import { participantIdAtom } from "./kiwi";

import { Settings } from "#/types/kiwi";

export const isSinglePageAtom = atom<boolean>(false);
export const fontFamilyAtom = atom<string | null>(null);
export const fontSizeAtom = atom<number | null>(null);
export const lineHeightAtom = atom<number | null>(null);
export const fontWeightAtom = atom<number | null>(null);

type Typography = Omit<Settings, "isSinglePage">;

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

export const setIsSinglePageAtom = atom(
  null,
  async (get, set, newIsSinglePage: boolean) => {
    set(isSinglePageAtom, newIsSinglePage);
    const book = get(bookAtom);
    const participantId = get(participantIdAtom);
    if (!participantId || !book) return;
    book.rendition.spread(newIsSinglePage ? "none" : "auto");
    await updateIDBSettings(get(settingsAtom), participantId);
  },
);

export const setFontFamilyAtom = atom(
  null,
  async (get, set, newFontFamily: string | null) => {
    set(fontFamilyAtom, newFontFamily);
    const participantId = get(participantIdAtom);
    const book = get(bookAtom);
    if (!participantId || !book) return;
    const contents = book.rendition.getContents()[0];
    if (!contents) return;
    await updateCustomStyle(contents, {
      fontFamily: newFontFamily,
      fontSize: get(fontSizeAtom),
      fontWeight: get(fontWeightAtom),
      lineHeight: get(lineHeightAtom),
    });
    await updateIDBSettings(get(settingsAtom), participantId);
  },
);

export const setFontSizeAtom = atom(
  null,
  async (get, set, newFontSize: number | null) => {
    set(fontSizeAtom, newFontSize);
    const participantId = get(participantIdAtom);
    const book = get(bookAtom);
    if (!participantId || !book) return;
    const contents = book.rendition.getContents()[0];
    if (!contents) return;
    await updateCustomStyle(contents, {
      fontFamily: get(fontFamilyAtom),
      fontSize: newFontSize,
      fontWeight: get(fontWeightAtom),
      lineHeight: get(lineHeightAtom),
    });
    await updateIDBSettings(get(settingsAtom), participantId);
  },
);

export const setFontWeightAtom = atom(
  null,
  async (get, set, newFontWeight: number | null) => {
    set(fontWeightAtom, newFontWeight);
    const participantId = get(participantIdAtom);
    const book = get(bookAtom);
    if (!participantId || !book) return;
    const contents = book.rendition.getContents()[0];
    if (!contents) return;
    await updateCustomStyle(contents, {
      fontFamily: get(fontFamilyAtom),
      fontSize: get(fontSizeAtom),
      fontWeight: newFontWeight,
      lineHeight: get(lineHeightAtom),
    });
    await updateIDBSettings(get(settingsAtom), participantId);
  },
);

export const setLineHeightAtom = atom(
  null,
  async (get, set, newLineHeight: number | null) => {
    const formattedLineHeight =
      newLineHeight !== null ? Number(newLineHeight.toFixed(1)) : null;
    set(lineHeightAtom, formattedLineHeight);
    const participantId = get(participantIdAtom);
    const book = get(bookAtom);
    if (!participantId || !book) return;
    const contents = book.rendition.getContents()[0];
    if (!contents) return;
    await updateCustomStyle(contents, {
      fontFamily: get(fontFamilyAtom),
      fontSize: get(fontSizeAtom),
      fontWeight: get(fontWeightAtom),
      lineHeight: formattedLineHeight,
    });
    await updateIDBSettings(get(settingsAtom), participantId);
  },
);
