import { atom } from "@bookiwi/jotai";

import { updateIDBParticipant, updateCustomStyle } from "../utils";

import { bookAtom } from "./book";

import { ParticipantIDBData } from "#/types/idb";
import { Bookmark, ReadingRecord, Settings } from "#/types/kiwi";

export const participantsAtom = atom<ParticipantIDBData[]>([]);

export const participantIdAtom = atom<string | null>(null);
export const participantUserIdAtom = atom<string | null>(null);
export const participantKiwiIdAtom = atom<string | null>(null);
export const participantNameAtom = atom<string | null>(null);
export const participantProfileImageAtom = atom<string | null>(null);
export const participantColorAtom = atom<string | null>(null);
export const participantLastActivityAtAtom = atom<string | null>(null);

// record
interface CurrentCfi {
  start: string;
  end: string;
}
export const currentCfiAtom = atom<CurrentCfi | null>(null);
export const percentageAtom = atom<number | null>((get) => {
  const book = get(bookAtom);
  const currentCfi = get(currentCfiAtom);
  if (!book || !currentCfi) return null;
  const percent = Math.floor(
    book.locations.percentageFromCfi(currentCfi.end) * 100,
  );
  return percent;
});
export const bookmarksAtom = atom<Bookmark[]>([]);

export const recordAtom = atom<ReadingRecord, [ReadingRecord], void>(
  (get) => ({
    currentCfi: get(currentCfiAtom),
    percentage: get(percentageAtom),
    bookmarks: get(bookmarksAtom),
  }),
  (get, set, newRecord: ReadingRecord) => {
    set(currentCfiAtom, newRecord.currentCfi);
    set(bookmarksAtom, newRecord.bookmarks);
  },
);

export const setCurrentCfiAtom = atom(
  null,
  async (get, set, cfi: CurrentCfi) => {
    set(currentCfiAtom, cfi);
    set(participantLastActivityAtAtom, new Date().toISOString());
    const updatedParticipant = get(participantAtom);
    if (!updatedParticipant) return;
    await updateIDBParticipant(updatedParticipant);
  },
);

export const setBookmarkAtom = atom(null, async (get, set, cfi: CurrentCfi) => {
  const createdAt = new Date().toISOString();
  const newBookmark = {
    cfi,
    createdAt,
  };

  set(bookmarksAtom, [...get(bookmarksAtom), newBookmark]);
  set(participantLastActivityAtAtom, createdAt);
  const updatedParticipant = get(participantAtom);
  if (!updatedParticipant) return;
  await updateIDBParticipant(updatedParticipant);
});

export const removeBookmarkAtom = atom(
  null,
  async (get, set, cfi: CurrentCfi) => {
    set(
      bookmarksAtom,
      get(bookmarksAtom).filter(
        (b) => b.cfi.start !== cfi.start && b.cfi.end !== cfi.end,
      ),
    );
    set(participantLastActivityAtAtom, new Date().toISOString());
    const updatedParticipant = get(participantAtom);
    if (!updatedParticipant) return;
    await updateIDBParticipant(updatedParticipant);
  },
);

// settings

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
    if (!book) return;
    book.rendition.spread(newIsSinglePage ? "none" : "auto");
    const updatedParticipant = get(participantAtom);
    if (!updatedParticipant) return;
    set(participantLastActivityAtAtom, new Date().toISOString());
    await updateIDBParticipant(updatedParticipant);
  },
);

export const setFontFamilyAtom = atom(
  null,
  async (get, set, newFontFamily: string | null) => {
    set(fontFamilyAtom, newFontFamily);
    const book = get(bookAtom);
    if (!book) return;
    const contents = book.rendition.getContents()[0];
    if (!contents) return;
    await updateCustomStyle(contents, {
      fontFamily: newFontFamily,
      fontSize: get(fontSizeAtom),
      fontWeight: get(fontWeightAtom),
      lineHeight: get(lineHeightAtom),
    });
    const updatedParticipant = get(participantAtom);
    if (!updatedParticipant) return;
    set(participantLastActivityAtAtom, new Date().toISOString());
    await updateIDBParticipant(updatedParticipant);
  },
);

export const setFontSizeAtom = atom(
  null,
  async (get, set, newFontSize: number | null) => {
    set(fontSizeAtom, newFontSize);
    const book = get(bookAtom);
    if (!book) return;
    const contents = book.rendition.getContents()[0];
    if (!contents) return;
    await updateCustomStyle(contents, {
      fontFamily: get(fontFamilyAtom),
      fontSize: newFontSize,
      fontWeight: get(fontWeightAtom),
      lineHeight: get(lineHeightAtom),
    });
    const updatedParticipant = get(participantAtom);
    if (!updatedParticipant) return;
    set(participantLastActivityAtAtom, new Date().toISOString());
    await updateIDBParticipant(updatedParticipant);
  },
);

export const setFontWeightAtom = atom(
  null,
  async (get, set, newFontWeight: number | null) => {
    set(fontWeightAtom, newFontWeight);
    const book = get(bookAtom);
    if (!book) return;
    const contents = book.rendition.getContents()[0];
    if (!contents) return;
    await updateCustomStyle(contents, {
      fontFamily: get(fontFamilyAtom),
      fontSize: get(fontSizeAtom),
      fontWeight: newFontWeight,
      lineHeight: get(lineHeightAtom),
    });
    const updatedParticipant = get(participantAtom);
    if (!updatedParticipant) return;
    set(participantLastActivityAtAtom, new Date().toISOString());
    await updateIDBParticipant(updatedParticipant);
  },
);

export const setLineHeightAtom = atom(
  null,
  async (get, set, newLineHeight: number | null) => {
    const formattedLineHeight =
      newLineHeight !== null ? Number(newLineHeight.toFixed(1)) : null;
    set(lineHeightAtom, formattedLineHeight);
    const book = get(bookAtom);
    if (!book) return;
    const contents = book.rendition.getContents()[0];
    if (!contents) return;
    await updateCustomStyle(contents, {
      fontFamily: get(fontFamilyAtom),
      fontSize: get(fontSizeAtom),
      fontWeight: get(fontWeightAtom),
      lineHeight: formattedLineHeight,
    });
    const updatedParticipant = get(participantAtom);
    if (!updatedParticipant) return;
    set(participantLastActivityAtAtom, new Date().toISOString());
    await updateIDBParticipant(updatedParticipant);
  },
);

// participant atom
export const participantAtom = atom<
  ParticipantIDBData | null,
  [ParticipantIDBData],
  void
>(
  (get) => {
    const kiwiId = get(participantKiwiIdAtom);
    const userId = get(participantUserIdAtom);
    const name = get(participantNameAtom);
    const profileImage = get(participantProfileImageAtom);
    const color = get(participantColorAtom);
    const lastActivityAt = get(participantLastActivityAtAtom);
    const record = get(recordAtom);
    const settings = get(settingsAtom);
    const id = get(participantIdAtom);

    if (
      !id ||
      !kiwiId ||
      !userId ||
      !name ||
      !profileImage ||
      !color ||
      !lastActivityAt
    )
      return null;

    const participant: ParticipantIDBData = {
      id,
      kiwiId,
      userId,
      name,
      profileImage,
      color,
      settings,
      record,
      lastActivityAt,
    };
    return participant;
  },
  (get, set, participant: ParticipantIDBData) => {
    set(participantIdAtom, participant.id);
    set(participantUserIdAtom, participant.userId);
    set(participantNameAtom, participant.name);
    set(participantProfileImageAtom, participant.profileImage);
    set(participantColorAtom, participant.color);
    set(recordAtom, participant.record);
    set(settingsAtom, participant.settings);
    set(participantLastActivityAtAtom, new Date().toISOString());
    set(participantKiwiIdAtom, participant.kiwiId);
  },
);
