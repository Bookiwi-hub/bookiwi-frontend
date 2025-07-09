import { atom } from "@bookiwi/jotai";
import { Participant } from "@bookiwi/supabase/types/response";

import { updateCustomStyle } from "../utils";

import { bookAtom } from "./book";

import supabaseManager from "#/managers/supabase";

export const participantsAtom = atom<Participant[]>([]);

// Individual participant property atoms (primitive atoms)
export const participantIdAtom = atom<string | null>(null);
export const participantUserIdAtom = atom<string | null>(null);
export const participantNameAtom = atom<string | null>(null);
export const participantProfileImageAtom = atom<string | null>(null);
export const participantColorAtom = atom<string | null>(null);
export const participantSinglePageAtom = atom<boolean>(false);
export const participantFontFamilyAtom = atom<string | null>(null);
export const participantFontSizeAtom = atom<number | null>(null);
export const participantFontWeightAtom = atom<number | null>(null);
export const participantLineHeightAtom = atom<number | null>(null);
export const participantCfiStartAtom = atom<string | null>(null);
export const participantCfiEndAtom = atom<string | null>(null);
export const participantPercentageAtom = atom<number | null>(null);
export const participantLastActivityAtAtom = atom<string | null>(null);

// Combined participant atom
export const participantAtom = atom<Participant | null>((get) => {
  const id = get(participantIdAtom);
  const userId = get(participantUserIdAtom);
  const name = get(participantNameAtom);
  const profileImage = get(participantProfileImageAtom);
  const color = get(participantColorAtom);
  const singlePage = get(participantSinglePageAtom);
  const fontFamily = get(participantFontFamilyAtom);
  const fontSize = get(participantFontSizeAtom);
  const fontWeight = get(participantFontWeightAtom);
  const lineHeight = get(participantLineHeightAtom);
  const cfiStart = get(participantCfiStartAtom);
  const cfiEnd = get(participantCfiEndAtom);
  const percentage = get(participantPercentageAtom);
  const lastActivityAt = get(participantLastActivityAtAtom);

  // Return null if essential fields are missing
  if (!id || !userId || !name || !color) return null;

  return {
    id,
    userId,
    name,
    profileImage,
    color,
    singlePage,
    fontFamily,
    fontSize,
    fontWeight,
    lineHeight,
    cfiStart,
    cfiEnd,
    percentage,
    lastActivityAt,
  };
});

// Setter atom to update all participant properties at once
export const setParticipantAtom = atom(
  null,
  (get, set, participant: Participant) => {
    set(participantIdAtom, participant.id);
    set(participantUserIdAtom, participant.userId);
    set(participantNameAtom, participant.name);
    set(participantProfileImageAtom, participant.profileImage);
    set(participantColorAtom, participant.color);
    set(participantSinglePageAtom, participant.singlePage);
    set(participantFontFamilyAtom, participant.fontFamily);
    set(participantFontSizeAtom, participant.fontSize);
    set(participantFontWeightAtom, participant.fontWeight);
    set(participantLineHeightAtom, participant.lineHeight);
    set(participantCfiStartAtom, participant.cfiStart);
    set(participantCfiEndAtom, participant.cfiEnd);
    set(participantPercentageAtom, participant.percentage);
    set(participantLastActivityAtAtom, participant.lastActivityAt);
  },
);

export const participantInfoAtom = atom<{
  id: string;
  name: string;
  profileImage: string | null;
  color: string;
} | null>((get) => {
  const id = get(participantIdAtom);
  const name = get(participantNameAtom);
  const profileImage = get(participantProfileImageAtom);
  const color = get(participantColorAtom);

  if (!id || !name || !color) return null;

  return {
    id,
    name,
    profileImage,
    color,
  };
});

export const typographyAtom = atom<{
  fontFamily: string | null;
  fontSize: number | null;
  lineHeight: number | null;
  fontWeight: number | null;
} | null>((get) => {
  const fontFamily = get(participantFontFamilyAtom);
  const fontSize = get(participantFontSizeAtom);
  const lineHeight = get(participantLineHeightAtom);
  const fontWeight = get(participantFontWeightAtom);

  return {
    fontFamily,
    fontSize,
    lineHeight,
    fontWeight,
  };
});

export const participantSettingsAtom = atom<{
  singlePage: boolean;
  fontFamily: string | null;
  fontSize: number | null;
  lineHeight: number | null;
  fontWeight: number | null;
} | null>((get) => {
  const singlePage = get(participantSinglePageAtom);
  const fontFamily = get(participantFontFamilyAtom);
  const fontSize = get(participantFontSizeAtom);
  const lineHeight = get(participantLineHeightAtom);
  const fontWeight = get(participantFontWeightAtom);

  return {
    singlePage,
    fontFamily,
    fontSize,
    lineHeight,
    fontWeight,
  };
});

export interface Cfi {
  start: string;
  end: string;
}

export const currentCfiAtom = atom<Cfi | null>((get) => {
  const cfiStart = get(participantCfiStartAtom);
  const cfiEnd = get(participantCfiEndAtom);
  if (!cfiStart || !cfiEnd) return null;
  return {
    start: cfiStart,
    end: cfiEnd,
  };
});

// Legacy atom for backward compatibility
export const percentageAtom = atom<number | null>((get) =>
  get(participantPercentageAtom),
);

// Action atoms
export const setCurrentCfiAtom = atom(null, async (get, set, cfi: Cfi) => {
  const book = get(bookAtom);
  const participantId = get(participantIdAtom);
  if (!book || !participantId) return;
  const percent = Math.floor(book.locations.percentageFromCfi(cfi.end) * 100);
  const lastActivityAt = new Date().toISOString();
  set(participantCfiStartAtom, cfi.start);
  set(participantCfiEndAtom, cfi.end);
  set(participantPercentageAtom, percent);
  set(participantLastActivityAtAtom, lastActivityAt);
  await supabaseManager.reader.updateParticipant(participantId, {
    cfiStart: cfi.start,
    cfiEnd: cfi.end,
    percentage: percent,
    lastActivityAt,
  });
});

export const setSinglePageAtom = atom(
  null,
  async (get, set, singlePage: boolean) => {
    const book = get(bookAtom);
    const participantId = get(participantIdAtom);
    if (!book || !participantId) return;
    book.rendition.spread(singlePage ? "none" : "auto");
    set(participantSinglePageAtom, singlePage);
    await supabaseManager.reader.updateParticipant(participantId, {
      singlePage,
    });
  },
);

export const setFontFamilyAtom = atom(
  null,
  async (get, set, fontFamily: string | null) => {
    const book = get(bookAtom);
    const participantId = get(participantIdAtom);
    if (!book || !participantId) return;
    const contents = book.rendition.getContents()[0];
    if (!contents) return;

    const fontSize = get(participantFontSizeAtom);
    const fontWeight = get(participantFontWeightAtom);
    const lineHeight = get(participantLineHeightAtom);

    await updateCustomStyle(contents, {
      fontFamily,
      fontSize,
      fontWeight,
      lineHeight,
    });
    set(participantFontFamilyAtom, fontFamily);
    await supabaseManager.reader.updateParticipant(participantId, {
      fontFamily,
    });
  },
);

export const setFontSizeAtom = atom(
  null,
  async (get, set, fontSize: number | null) => {
    const book = get(bookAtom);
    const participantId = get(participantIdAtom);
    if (!book || !participantId) return;
    const contents = book.rendition.getContents()[0];
    if (!contents) return;

    const fontFamily = get(participantFontFamilyAtom);
    const fontWeight = get(participantFontWeightAtom);
    const lineHeight = get(participantLineHeightAtom);

    await updateCustomStyle(contents, {
      fontFamily,
      fontSize,
      fontWeight,
      lineHeight,
    });
    set(participantFontSizeAtom, fontSize);
    await supabaseManager.reader.updateParticipant(participantId, {
      fontSize,
    });
  },
);

export const setFontWeightAtom = atom(
  null,
  async (get, set, fontWeight: number | null) => {
    const book = get(bookAtom);
    const participantId = get(participantIdAtom);
    if (!book || !participantId) return;
    const contents = book.rendition.getContents()[0];
    if (!contents) return;

    const fontFamily = get(participantFontFamilyAtom);
    const fontSize = get(participantFontSizeAtom);
    const lineHeight = get(participantLineHeightAtom);

    await updateCustomStyle(contents, {
      fontFamily,
      fontSize,
      fontWeight,
      lineHeight,
    });
    set(participantFontWeightAtom, fontWeight);
    await supabaseManager.reader.updateParticipant(participantId, {
      fontWeight,
    });
  },
);

export const setLineHeightAtom = atom(
  null,
  async (get, set, lineHeight: number | null) => {
    const formattedLineHeight =
      lineHeight !== null ? Number(lineHeight.toFixed(1)) : null;
    const book = get(bookAtom);
    const participantId = get(participantIdAtom);
    if (!book || !participantId) return;
    const contents = book.rendition.getContents()[0];
    if (!contents) return;

    const fontFamily = get(participantFontFamilyAtom);
    const fontSize = get(participantFontSizeAtom);
    const fontWeight = get(participantFontWeightAtom);

    await updateCustomStyle(contents, {
      fontFamily,
      fontSize,
      fontWeight,
      lineHeight: formattedLineHeight,
    });
    set(participantLineHeightAtom, formattedLineHeight);
    await supabaseManager.reader.updateParticipant(participantId, {
      lineHeight: formattedLineHeight,
    });
  },
);
