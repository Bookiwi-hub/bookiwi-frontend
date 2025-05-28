import color from "#/DB/color";
import { ReadingRecord, Settings } from "#/types/kiwi";

export const initialSettings: Settings = {
  isSinglePage: false,
};

export const initialReadingRecord: ReadingRecord = {
  currentCfi: null,
  percentage: null,
  bookmarks: [],
};

export const SAMPLE_KIWI_ID = "sample-kiwi";

export const SAMPLE_KIWI_URL =
  "https://s3.amazonaws.com/moby-dick/moby-dick.epub";

export const SAMPLE_KIWI_BOOK_DATA_ID = "sample-book-data";

export const sampleParticipants = [
  {
    userId: "sample-user-1",
    name: "비트겐슈타인",
    profileImage: "",
    color: color[1]!,
    lastActivityAt: "2025-05-23",
    progress: 0,
    readingRecord: {
      currentCfi: null,
      percentage: null,
      bookmarks: [],
    },
    settings: {
      isSinglePage: false,
    },
  },
  {
    userId: "sample-user-2",
    name: "키르케고르",
    profileImage: "",
    color: color[2]!,
    lastActivityAt: "2025-05-23",
    progress: 0,
    readingRecord: {
      currentCfi: null,
      percentage: null,
      bookmarks: [],
    },
    settings: {
      isSinglePage: false,
    },
  },
];
