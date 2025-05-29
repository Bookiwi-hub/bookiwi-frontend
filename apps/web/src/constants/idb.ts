import color from "#/DB/color";
import { ParticipantIDBData, RecordIDBData } from "#/types/idb";

export enum IDBStore {
  KiwiStore = "kiwiStore",
  EpubStore = "epubStore",
  ParticipantStore = "participantStore",
  RecordStore = "recordStore",
}

export const SAMPLE_KIWI_DATA_ID = "sample-kiwi";

export const SAMPLE_EPUB_URL =
  "https://s3.amazonaws.com/moby-dick/moby-dick.epub";

export const SAMPLE_EPUB_DATA_ID = "sample-epub-data";

export const SAMPLE_PARTICIPANT_IDS = [
  "sample-kiwi-participant-0",
  "sample-kiwi-participant-1",
  "sample-kiwi-participant-2",
] as const;

export const SAMPLE_RECORD_DATA_IDS = [
  "sample-kiwi-record-data-0",
  "sample-kiwi-record-data-1",
  "sample-kiwi-record-data-2",
] as const;

export const sampleIDBParticipants: ParticipantIDBData[] = [
  {
    id: SAMPLE_PARTICIPANT_IDS[1],
    userId: "sample-kiwi-participant-1",
    name: "채종민",
    profileImage: "",
    color: color[1],
    kiwiId: SAMPLE_KIWI_DATA_ID,
    recordId: SAMPLE_RECORD_DATA_IDS[1],
  },
  {
    id: SAMPLE_PARTICIPANT_IDS[2],
    userId: "sample-kiwi-participant-2",
    name: "조현지",
    profileImage: "",
    color: color[2],
    kiwiId: SAMPLE_KIWI_DATA_ID,
    recordId: SAMPLE_RECORD_DATA_IDS[2],
  },
];

export const sampleIDBRecords: RecordIDBData[] = [
  {
    id: SAMPLE_RECORD_DATA_IDS[1],
    participantId: SAMPLE_PARTICIPANT_IDS[1],
    lastActivityAt: new Date().toISOString(),
    currentCfi: null,
    percentage: 5,
    isSinglePage: false,
    fontFamily: null,
    fontSize: null,
    lineHeight: null,
    fontWeight: null,
    bookmarks: [],
  },
  {
    id: SAMPLE_RECORD_DATA_IDS[2],
    participantId: SAMPLE_PARTICIPANT_IDS[2],
    lastActivityAt: new Date().toISOString(),
    currentCfi: null,
    percentage: 50,
    isSinglePage: false,
    fontFamily: null,
    fontSize: null,
    lineHeight: null,
    fontWeight: null,
    bookmarks: [],
  },
];
