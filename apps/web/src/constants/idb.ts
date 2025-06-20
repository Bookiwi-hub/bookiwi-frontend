import { color } from "#/constants/color";
import { ParticipantIDBData } from "#/types/idb";

export enum IDBStore {
  KiwiStore = "kiwiStore",
  EpubStore = "epubStore",
  ParticipantStore = "participantStore",
  AnnotationStore = "annotationStore",
}

export const SAMPLE_KIWI_DATA_ID = "sample-kiwi";

export const SAMPLE_EPUB_URL = "/sample.epub";

export const SAMPLE_EPUB_DATA_ID = "sample-epub-data";

export const SAMPLE_KIWI_NAME = "운수 좋은 날";
export const SAMPLE_KIWI_DESCRIPTION = "예시 키위로 체험해 보세요.";
export const SAMPLE_KIWI_DETAIL_DESCRIPTION =
  "운수 좋은 날로 키위를 체험하세요";

export const SAMPLE_PARTICIPANT_IDS = [
  "sample-kiwi-participant-0",
  "sample-kiwi-participant-1",
  "sample-kiwi-participant-2",
] as const;

export const sampleIDBParticipants: ParticipantIDBData[] = [
  {
    id: SAMPLE_PARTICIPANT_IDS[1],
    userId: "sample-kiwi-participant-1",
    name: "채종민",
    profileImage: "",
    color: color[1],
    kiwiId: SAMPLE_KIWI_DATA_ID,
    record: {
      currentCfi: null,
      percentage: 5,
      bookmarks: [],
    },
    settings: {
      isSinglePage: false,
      fontFamily: null,
      fontSize: null,
      lineHeight: null,
      fontWeight: null,
    },
    lastActivityAt: new Date().toISOString(),
  },
  {
    id: SAMPLE_PARTICIPANT_IDS[2],
    userId: "sample-kiwi-participant-2",
    name: "조현지",
    profileImage: "",
    color: color[2],
    kiwiId: SAMPLE_KIWI_DATA_ID,
    record: {
      currentCfi: null,
      percentage: 50,
      bookmarks: [],
    },
    settings: {
      isSinglePage: false,
      fontFamily: null,
      fontSize: null,
      lineHeight: null,
      fontWeight: null,
    },
    lastActivityAt: new Date().toISOString(),
  },
];
