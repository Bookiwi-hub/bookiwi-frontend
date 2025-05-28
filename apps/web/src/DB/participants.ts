import color from "./color";

import { ParticipantType } from "#/types/kiwi";

export const participants: ParticipantType[] = [
  {
    userId: "sample-participant-0",
    name: "KIWI",
    profileImage: "https://github.com/shadcn.png",
    color: color[0]!,
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
    userId: "sample-participant-1",
    name: "조현지",
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
    userId: "sample-participant-2",
    name: "임진조",
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
  {
    userId: "sample-participant-3",
    name: "홍서하",
    profileImage: "",
    color: color[3]!,
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
    userId: "sample-participant-4",
    name: "한상우",
    profileImage: "",
    color: color[4]!,
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
    userId: "sample-participant-5",
    name: "채종민",
    profileImage: "",
    color: color[5]!,
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
