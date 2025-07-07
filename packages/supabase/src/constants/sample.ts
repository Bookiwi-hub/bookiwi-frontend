import { colors } from "@bookiwi/color";

import {
  HighlightTable,
  KiwiTable,
  ParticipantTable,
  CommentTable,
} from "../types/database";

export const SAMPLE_KIWI_DATA_ID = "sample-kiwi";

export const SAMPLE_EPUB_ID = "ef1ece1b-05d5-4e89-abfc-f9f2a882e1b3";

export const SAMPLE_KIWI_NAME = "운수 좋은 날";
export const SAMPLE_KIWI_DESCRIPTION = "예시 키위로 체험해 보세요.";
export const SAMPLE_KIWI_DETAIL_DESCRIPTION =
  "운수 좋은 날로 키위를 체험하세요";

export const SAMPLE_KIWI_INFO: Omit<
  KiwiTable,
  "share_code" | "created_at" | "id"
> = {
  name: SAMPLE_KIWI_NAME,
  description: SAMPLE_KIWI_DESCRIPTION,
  detail_description: SAMPLE_KIWI_DETAIL_DESCRIPTION,
  max_participants: 10,
  password: null,
  epub_id: SAMPLE_EPUB_ID,
};

export const sampleParticipants: Omit<ParticipantTable, "id" | "kiwi_id">[] = [
  {
    user_id: "e1b3eab1-6750-4a01-a020-156693aecf12",
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
    last_activity_at: null,
  },
  {
    user_id: "d70e7a0e-3a35-4d94-b300-e19968ec1b55",
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
    last_activity_at: null,
  },
];

export const sampleHighlights: Omit<
  HighlightTable,
  "id" | "kiwi_id" | "participant_id" | "created_at" | "updated_at"
>[] = [
  {
    cfi: "epubcfi(/30/4!/4/2/8,/1:101,/1:141)",
    text: "다섯 푼이 찰깍하고 손바닥에 떨어질 제 거의 눈물을 흘릴 만큼 기뻤었다.",
    color: colors[1],
    section_href: "c0_unsu_joh_eun_nal.xhtml",
  },
  {
    cfi: "epubcfi(/30/4!/4/2/14,/1:0,/1:139)",
    text: "“에이, 오라질 년, 조롱복은 할 수가 없어, 못 먹어 병, 먹어서 병, 어쩌란 말이야! 왜 눈을 바루 뜨지 못해!”하고 김 첨지는 앓는 이의 뺨을 한 번 후려갈겼다. 홉뜬 눈은 조금 바루어졌건만 이슬이 맺히었다. 김 첨지의 눈시울도 뜨끈뜨끈하였다.",
    color: colors[2],
    section_href: "c0_unsu_joh_eun_nal.xhtml",
  },
];

export const sampleComments: Omit<
  CommentTable,
  "id" | "highlight_id" | "created_at" | "updated_at" | "participant_id"
>[] = [
  {
    text: "찰깍이라는 표현이 너무 좋다.\n요즘은 동전을 쓰지 않아서 그런지, 한 문장만으로도 시대 분위기가 확 느껴져.\n옛날 사람들의 절박함이 한순간에 와닿는다.",
  },
  {
    text: "그 작은 동전 소리 하나에 울컥하는 마음이 전해지는 게 너무 찡하다./n 내 첫 월급 받은 날도 생각이 나",
  },

  {
    text: "“조롱복”이라는 단어가 좀 생소한데, 이건 ‘죽을 복도 없다’는 뜻",
  },
  {
    text: "때리고 울고, 결국 다 병든 사람들. 누구 하나 선하지도, 악하지도 않아. 그냥 다 지는 중.",
  },
];
