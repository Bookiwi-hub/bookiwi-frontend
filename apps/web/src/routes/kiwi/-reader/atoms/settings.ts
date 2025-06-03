import {
  atom,
  isSinglePageAtom,
  fontFamilyAtom,
  fontSizeAtom,
  lineHeightAtom,
  fontWeightAtom,
  settingsAtom,
  participantIdAtom,
  bookAtom,
} from "@bookiwi/jotai";

import { updateCustomStyle } from "../styles";
import { updateIDBSettings } from "../utils/idb";

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
    set(lineHeightAtom, newLineHeight);
    const participantId = get(participantIdAtom);
    const book = get(bookAtom);
    if (!participantId || !book) return;
    const contents = book.rendition.getContents()[0];
    if (!contents) return;
    await updateCustomStyle(contents, {
      fontFamily: get(fontFamilyAtom),
      fontSize: get(fontSizeAtom),
      fontWeight: get(fontWeightAtom),
      lineHeight: newLineHeight,
    });
    await updateIDBSettings(get(settingsAtom), participantId);
  },
);
