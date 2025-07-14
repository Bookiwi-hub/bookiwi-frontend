import { colors } from "@bookiwi/color";
import {
  CommentTable,
  EpubTable,
  HighlightTable,
  KiwiTable,
  ParticipantTable,
} from "@bookiwi/supabase/types";

export const GUEST_USER = {
  id: "guest-user-id",
  name: "Guest",
  email: "guest@bookiwi.com",
  profileImage: null,
};

export const SAMPLE_KIWI_ID = "sample-kiwi";

export const SAMPLE_EPUB_URL =
  "https://pbuelbzwhrjnsjwevqgx.supabase.co/storage/v1/object/public/epub//sample.epub";

export const SAMPLE_EPUB_ID = "sample-epub-data";
export const SAMPLE_EPUB_COVER_IMAGE =
  "https://pbuelbzwhrjnsjwevqgx.supabase.co/storage/v1/object/public/cover//sample.webp";
export const SAMPLE_EPUB_LOCATIONS = `["epubcfi(/30/4!/4/2,/2/1:0,/12/1:222)","epubcfi(/30/4!/4/2,/12/1:223,/26/1:214)","epubcfi(/30/4!/4/2,/26/1:215,/40/1:109)","epubcfi(/30/4!/4/2,/40/1:110,/52/1:104)","epubcfi(/30/4!/4/2,/52/1:105,/66/1:133)","epubcfi(/30/4!/4/2,/66/1:134,/82/1:60)","epubcfi(/30/4!/4/2,/82/1:61,/100/1:233)","epubcfi(/30/4!/4/2,/100/1:234,/116/1:27)","epubcfi(/30/4!/4/2,/116/1:28,/148/1:91)","epubcfi(/30/4!/4/2,/148/1:92,/170/1:59)","epubcfi(/30/4!/4,/2/170/1:60,/4/4/4/2/8/1:5)","epubcfi(/30/6!/4/4,/2[About_this_digital_edition]/1:0,/12[ws-contributor]/2/44/1:7)","epubcfi(/30/6!/4/4,/12[ws-contributor]/2/44/1:8,/18/8[cite_note-4]/4/1:50)"]`;
export const SAMPLE_EPUB_NAV = [
  { label: "표지", subitems: [] },
  { label: "운수 좋은 날", subitems: [] },
  { label: "정보", subitems: [] },
];
export const SAMPLE_EPUB_TITLE = "운수 좋은 날";
export const SAMPLE_EPUB_AUTHOR = "현진건";
export const SAMPLE_EPUB_PUBLISHER = "wikipedia";
export const SAMPLE_KIWI_NAME = "운수 좋은 날";
export const SAMPLE_KIWI_DESCRIPTION = "예시 키위로 체험해 보세요.";
export const SAMPLE_KIWI_DETAIL_DESCRIPTION =
  "운수 좋은 날로 키위를 체험하세요";

export const SAMPLE_PARTICIPANT_IDS = [
  "sample-kiwi-participant-0",
  "sample-kiwi-participant-1",
] as const;

// 키위 데이터
export const sampleIDBKiwis: KiwiTable = {
  id: SAMPLE_KIWI_ID,
  epub_id: SAMPLE_EPUB_ID,
  name: SAMPLE_KIWI_NAME,
  description: SAMPLE_KIWI_DESCRIPTION,
  max_participants: 10,
  detail_description: SAMPLE_KIWI_DETAIL_DESCRIPTION,
  password: null,
  share_code: "sample-share-code",
  created_at: new Date().toISOString(),
};

// 전자책 데이터
export const sampleIDBEpubs: EpubTable = {
  id: SAMPLE_EPUB_ID,
  file: SAMPLE_EPUB_URL,
  locations: SAMPLE_EPUB_LOCATIONS,
  cover_image: SAMPLE_EPUB_COVER_IMAGE,
  title: SAMPLE_EPUB_TITLE,
  author: SAMPLE_EPUB_AUTHOR,
  publisher: SAMPLE_EPUB_PUBLISHER,
  nav: SAMPLE_EPUB_NAV,
};

export const GUEST_PARTICIPANT_ID = "guest";

// 참가자 데이터
export const sampleIDBParticipants: ParticipantTable[] = [
  {
    id: SAMPLE_PARTICIPANT_IDS[0],
    kiwi_id: SAMPLE_KIWI_ID,
    user_id: "sample-kiwi-participant-0",
    name: "채종민",
    profile_image: "",
    color: colors[1],
    single_page: false,
    font_family: null,
    font_size: null,
    font_weight: null,
    line_height: null,
    cfi_start: null,
    cfi_end: null,
    percentage: 5,
    last_activity_at: new Date().toISOString(),
  },
  {
    id: SAMPLE_PARTICIPANT_IDS[1],
    kiwi_id: SAMPLE_KIWI_ID,
    user_id: "sample-kiwi-participant-1",
    name: "조현지",
    profile_image: "",
    color: colors[2],
    single_page: false,
    font_family: null,
    font_size: null,
    font_weight: null,
    line_height: null,
    cfi_start: null,
    cfi_end: null,
    percentage: 50,
    last_activity_at: new Date().toISOString(),
  },
];

// 하이라이트 데이터
export const sampleIDBHighlights: HighlightTable[] = [
  {
    id: "sample-kiwi-highlight-0",
    participant_id: SAMPLE_PARTICIPANT_IDS[0],
    cfi: "epubcfi(/30/4!/4/2/8,/1:101,/1:141)",
    text: "다섯 푼이 찰깍하고 손바닥에 떨어질 제 거의 눈물을 흘릴 만큼 기뻤었다.",
    color: colors[1],
    section_href: "c0_unsu_joh_eun_nal.xhtml",
    created_at: "2025-06-18T02:10:37.225Z",
    updated_at: "2025-06-18T02:10:37.225Z",
    kiwi_id: SAMPLE_KIWI_ID,
  },
  {
    id: "sample-kiwi-highlight-1",
    participant_id: SAMPLE_PARTICIPANT_IDS[1],
    cfi: "epubcfi(/30/4!/4/2/14,/1:0,/1:139)",
    text: "“에이, 오라질 년, 조롱복은 할 수가 없어, 못 먹어 병, 먹어서 병, 어쩌란 말이야! 왜 눈을 바루 뜨지 못해!”하고 김 첨지는 앓는 이의 뺨을 한 번 후려갈겼다. 홉뜬 눈은 조금 바루어졌건만 이슬이 맺히었다. 김 첨지의 눈시울도 뜨끈뜨끈하였다.",
    color: colors[2],
    section_href: "c0_unsu_joh_eun_nal.xhtml",
    created_at: "2025-06-19T02:10:37.225Z",
    updated_at: "2025-06-19T02:10:37.225Z",
    kiwi_id: SAMPLE_KIWI_ID,
  },
];

// 댓글 데이터
export const sampleIDBComments: CommentTable[] = [
  {
    id: "sample-kiwi-comment-0",
    highlight_id: "sample-kiwi-highlight-0",
    participant_id: SAMPLE_PARTICIPANT_IDS[0],
    text: "찰깍이라는 표현이 너무 좋다.\n요즘은 동전을 쓰지 않아서 그런지, 한 문장만으로도 시대 분위기가 확 느껴져.\n옛날 사람들의 절박함이 한순간에 와닿는다.",
    created_at: "2025-06-18T02:10:37.225Z",
    updated_at: "2025-06-18T02:10:37.225Z",
  },
  {
    id: "sample-kiwi-comment-1",
    highlight_id: "sample-kiwi-highlight-0",
    participant_id: SAMPLE_PARTICIPANT_IDS[1],
    text: "그 작은 동전 소리 하나에 울컥하는 마음이 전해지는 게 너무 찡하다.\n내 첫 월급 받은 날도 생각이 나",
    created_at: "2025-06-19T02:10:37.225Z",
    updated_at: "2025-06-19T02:10:37.225Z",
  },
  {
    id: "sample-kiwi-comment-2",
    highlight_id: "sample-kiwi-highlight-1",
    participant_id: SAMPLE_PARTICIPANT_IDS[1],
    text: "“조롱복”이라는 단어가 좀 생소한데, 이건 ‘죽을 복도 없다’는 뜻",
    created_at: "2025-06-19T02:10:37.225Z",
    updated_at: "2025-06-19T02:10:37.225Z",
  },
  {
    id: "sample-kiwi-comment-3",
    highlight_id: "sample-kiwi-highlight-1",
    participant_id: SAMPLE_PARTICIPANT_IDS[0],
    text: "때리고 울고, 결국 다 병든 사람들. 누구 하나 선하지도, 악하지도 않아. 그냥 다 지는 중.",
    created_at: "2025-06-20T02:10:37.225Z",
    updated_at: "2025-06-20T02:10:37.225Z",
  },
];
