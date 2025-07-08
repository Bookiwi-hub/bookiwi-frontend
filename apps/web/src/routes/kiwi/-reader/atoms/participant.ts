import { atom } from "@bookiwi/jotai";
import { Participant } from "@bookiwi/supabase/types/response";

import { updateCustomStyle } from "../utils";

import { bookAtom } from "./book";

export const participantAtom = atom<Participant | null>(null);
export const participantsAtom = atom<Participant[]>([]);

export const participantIdAtom = atom<string | null>((get) => {
  const participant = get(participantAtom);
  if (!participant) return null;
  return participant.id;
});

export const participantInfoAtom = atom<{
  id: string;
  name: string;
  profileImage: string | null;
  color: string;
} | null>((get) => {
  const participant = get(participantAtom);
  if (!participant) return null;
  return {
    id: participant.id,
    name: participant.name,
    profileImage: participant.profileImage,
    color: participant.color,
  };
});

export const participantSettingsAtom = atom<{
  singlePage: boolean;
  fontFamily: string | null;
  fontSize: number | null;
  lineHeight: number | null;
  fontWeight: number | null;
} | null>((get) => {
  const participant = get(participantAtom);
  if (!participant) return null;
  return {
    singlePage: participant.singlePage,
    fontFamily: participant.fontFamily,
    fontSize: participant.fontSize,
    lineHeight: participant.lineHeight,
    fontWeight: participant.fontWeight,
  };
});

export const typographyAtom = atom<{
  fontFamily: string | null;
  fontSize: number | null;
  lineHeight: number | null;
  fontWeight: number | null;
} | null>((get) => {
  const participant = get(participantAtom);
  if (!participant) return null;
  return {
    fontFamily: participant.fontFamily,
    fontSize: participant.fontSize,
    lineHeight: participant.lineHeight,
    fontWeight: participant.fontWeight,
  };
});

interface CurrentCfi {
  start: string;
  end: string;
}

export const currentCfiAtom = atom<CurrentCfi | null>((get) => {
  const participant = get(participantAtom);
  if (!participant) return null;
  if (!participant.cfiStart || !participant.cfiEnd) return null;
  return {
    start: participant.cfiStart,
    end: participant.cfiEnd,
  };
});

export const percentageAtom = atom<number | null>((get) => {
  const participant = get(participantAtom);
  if (!participant) return null;
  return participant.percentage;
});

export const setCurrentCfiAtom = atom(
  null,
  async (get, set, cfi: CurrentCfi) => {
    const book = get(bookAtom);
    const participant = get(participantAtom);
    if (!book || !participant) return;
    const percent = Math.floor(book.locations.percentageFromCfi(cfi.end) * 100);
    const updatedParticipant = {
      ...participant,
      cfiStart: cfi.start,
      cfiEnd: cfi.end,
      lastActivityAt: new Date().toISOString(),
      percentage: percent,
    };
    set(participantAtom, updatedParticipant);
  },
);

export const setSinglePageAtom = atom(
  null,
  async (get, set, singlePage: boolean) => {
    const book = get(bookAtom);
    if (!book) return;
    book.rendition.spread(singlePage ? "none" : "auto");
    const participant = get(participantAtom);
    if (!participant) return;
    set(participantAtom, { ...participant, singlePage });
  },
);

export const setFontFamilyAtom = atom(
  null,
  async (get, set, fontFamily: string | null) => {
    const book = get(bookAtom);
    const participant = get(participantAtom);
    if (!book || !participant) return;
    const contents = book.rendition.getContents()[0];
    if (!contents) return;
    await updateCustomStyle(contents, {
      fontFamily,
      fontSize: participant.fontSize,
      fontWeight: participant.fontWeight,
      lineHeight: participant.lineHeight,
    });
    set(participantAtom, { ...participant, fontFamily });
  },
);

export const setFontSizeAtom = atom(
  null,
  async (get, set, fontSize: number | null) => {
    const book = get(bookAtom);
    const participant = get(participantAtom);
    if (!book || !participant) return;
    const contents = book.rendition.getContents()[0];
    if (!contents) return;
    await updateCustomStyle(contents, {
      fontFamily: participant.fontFamily,
      fontSize,
      fontWeight: participant.fontWeight,
      lineHeight: participant.lineHeight,
    });
    set(participantAtom, { ...participant, fontSize });
  },
);

export const setFontWeightAtom = atom(
  null,
  async (get, set, fontWeight: number | null) => {
    const book = get(bookAtom);
    const participant = get(participantAtom);
    if (!book || !participant) return;
    const contents = book.rendition.getContents()[0];
    if (!contents) return;
    await updateCustomStyle(contents, {
      fontFamily: participant.fontFamily,
      fontSize: participant.fontSize,
      fontWeight,
      lineHeight: participant.lineHeight,
    });
    set(participantAtom, { ...participant, fontWeight });
  },
);

export const setLineHeightAtom = atom(
  null,
  async (get, set, lineHeight: number | null) => {
    const formattedLineHeight =
      lineHeight !== null ? Number(lineHeight.toFixed(1)) : null;
    const book = get(bookAtom);
    const participant = get(participantAtom);
    if (!book || !participant) return;
    const contents = book.rendition.getContents()[0];
    if (!contents) return;
    await updateCustomStyle(contents, {
      fontFamily: participant.fontFamily,
      fontSize: participant.fontSize,
      fontWeight: participant.fontWeight,
      lineHeight: formattedLineHeight,
    });
    set(participantAtom, { ...participant, lineHeight: formattedLineHeight });
  },
);
