import { color } from "#/constants/color";
import { AnnotationIDBData, ParticipantIDBData } from "#/types/idb";

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
] as const;

export const sampleIDBParticipants: ParticipantIDBData[] = [
  {
    id: SAMPLE_PARTICIPANT_IDS[0],
    userId: "sample-kiwi-participant-0",
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
    id: SAMPLE_PARTICIPANT_IDS[1],
    userId: "sample-kiwi-participant-1",
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

export const sampleIDBAnnotations: AnnotationIDBData[] = [
  {
    id: "sample-kiwi-annotation-0",
    kiwiId: SAMPLE_KIWI_DATA_ID,
    cfi: "epubcfi(/30/4!/4/2/8,/1:101,/1:141)",
    text: "다섯 푼이 찰깍하고 손바닥에 떨어질 제 거의 눈물을 흘릴 만큼 기뻤었다.",
    color: color[1],
    participantId: SAMPLE_PARTICIPANT_IDS[0],
    createdAt: "2025-06-18T02:10:37.225Z",
    updatedAt: "2025-06-18T02:10:37.225Z",
    sectionHref: "c0_unsu_joh_eun_nal.xhtml",
    comments: [
      {
        id: "sample-kiwi-comment-0",
        text: "찰깍이라는 표현이 너무 좋다.\n요즘은 동전을 쓰지 않아서 그런지, 한 문장만으로도 시대 분위기가 확 느껴져.\n옛날 사람들의 절박함이 한순간에 와닿는다.",
        participantId: SAMPLE_PARTICIPANT_IDS[0],
        createdAt: "2025-06-18T02:10:37.225Z",
        updatedAt: "2025-06-18T02:10:37.225Z",
      },
      {
        id: "sample-kiwi-comment-1",
        text: "그 작은 동전 소리 하나에 울컥하는 마음이 전해지는 게 너무 찡하다./n 내 첫 월급 받은 날도 생각이 나",
        participantId: SAMPLE_PARTICIPANT_IDS[1],
        createdAt: "2025-06-19T02:10:37.225Z",
        updatedAt: "2025-06-19T02:10:37.225Z",
      },
    ],
  },
  {
    id: "sample-kiwi-annotation-1",
    kiwiId: SAMPLE_KIWI_DATA_ID,
    cfi: "epubcfi(/30/4!/4/2/14,/1:0,/1:139)",
    text: "“에이, 오라질 년, 조롱복은 할 수가 없어, 못 먹어 병, 먹어서 병, 어쩌란 말이야! 왜 눈을 바루 뜨지 못해!”하고 김 첨지는 앓는 이의 뺨을 한 번 후려갈겼다. 홉뜬 눈은 조금 바루어졌건만 이슬이 맺히었다. 김 첨지의 눈시울도 뜨끈뜨끈하였다.",
    color: color[2],
    participantId: SAMPLE_PARTICIPANT_IDS[1],
    createdAt: "2025-06-19T02:10:37.225Z",
    updatedAt: "2025-06-19T02:10:37.225Z",
    sectionHref: "c0_unsu_joh_eun_nal.xhtml",
    comments: [
      {
        id: "sample-kiwi-comment-2",
        text: "“조롱복”이라는 단어가 좀 생소한데, 이건 ‘죽을 복도 없다’는 뜻",
        participantId: SAMPLE_PARTICIPANT_IDS[1],
        createdAt: "2025-06-19T02:10:37.225Z",
        updatedAt: "2025-06-19T02:10:37.225Z",
      },
      {
        id: "sample-kiwi-comment-3",
        text: "때리고 울고, 결국 다 병든 사람들. 누구 하나 선하지도, 악하지도 않아. 그냥 다 지는 중.",
        participantId: SAMPLE_PARTICIPANT_IDS[0],
        createdAt: "2025-06-20T02:10:37.225Z",
        updatedAt: "2025-06-20T02:10:37.225Z",
      },
    ],
  },
];
