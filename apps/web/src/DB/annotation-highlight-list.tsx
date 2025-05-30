import { participants } from "./participants";

import { Participant } from "#/types/kiwi";

export interface HighlightListType {
  id: number;
  text: string;
  page: number;
  date: string;
  creator: Participant;
  totalComments: number;
}
export const highlightList: HighlightListType[] = [
  {
    id: 1,
    text: "이것은 책에서 하이라이트된 문장입니다. 중요한 개념이나 인상적인 구절을 표시하는데 사용됩니다. 이것은 책에서 하이라이트된 문장입니다. 중요한 개념이나 인상적인 구절을 표시하는데 사용됩니다. 이것은 책에서 하이라이트된 문장입니다. 중요한 개념이나 인상적인 구절을 표시하는데 사용됩니다. 이것은 책에서 하이라이트된 문장입니다. 중요한 개념이나 인상적인 구절을 표시하는데 사용됩니다.이것은 책에서 하이라이트된 문장입니다. 중요한 개념이나 인상적인 구절을 표시하는데 사용됩니다. 이것은 책에서 하이라이트된 문장입니다. 중요한 개념이나 인상적인 구절을 표시하는데 사용됩니다.이것은 책에서 하이라이트된 문장입니다. 중요한 개념이나 인상적인 구절을 표시하는데 사용됩니다. 이것은 책에서 하이라이트된 문장입니다. 중요한 개념이나 인상적인 구절을 표시하는데 사용됩니다.",
    page: 42,
    date: "2023-08-15T09:30:00.000Z",
    creator: participants[0]!,
    totalComments: 4,
  },
  {
    id: 2,
    text: "두 번째 하이라이트된 문장입니다. 중요한 부분을 표시했습니다.",
    page: 56,
    date: "2023-09-20T14:30:00.000Z",
    creator: participants[1]!,
    totalComments: 2,
  },
  {
    id: 3,
    text: "세 번째 하이라이트된 문장입니다. 특별히 메모해 둘 필요가 있는 내용입니다.",
    page: 78,
    date: "2023-10-05T09:15:00.000Z",
    creator: participants[2]!,
    totalComments: 0,
  },
  {
    id: 4,
    text: "네 번째 하이라이트된 문장입니다. 이론적 배경을 설명하는 중요한 부분입니다.",
    page: 103,
    date: "2023-10-18T11:20:00.000Z",
    creator: participants[0]!,
    totalComments: 1,
  },
  {
    id: 5,
    text: "다섯 번째 하이라이트입니다. 저자의 주요 주장을 담고 있는 문장입니다.",
    page: 121,
    date: "2023-11-01T10:15:00.000Z",
    creator: participants[1]!,
    totalComments: 3,
  },
  {
    id: 6,
    text: "여섯 번째 하이라이트입니다. 이 부분은 핵심 개념을 설명하고 있습니다.",
    page: 145,
    date: "2023-11-10T16:45:00.000Z",
    creator: participants[2]!,
    totalComments: 2,
  },
  {
    id: 7,
    text: "일곱 번째 하이라이트된 부분입니다. 역사적 배경에 대한 중요한 설명이 담겨있습니다.",
    page: 167,
    date: "2023-11-22T09:30:00.000Z",
    creator: participants[0]!,
    totalComments: 5,
  },
  {
    id: 8,
    text: "여덟 번째 하이라이트입니다. 주요 인물의 성격을 분석하는 구절입니다.",
    page: 189,
    date: "2023-12-05T14:20:00.000Z",
    creator: participants[1]!,
    totalComments: 1,
  },
  {
    id: 9,
    text: "아홉 번째 하이라이트입니다. 이 부분은 작품의 주제를 잘 드러내고 있습니다.",
    page: 210,
    date: "2023-12-15T11:30:00.000Z",
    creator: participants[2]!,
    totalComments: 4,
  },
  {
    id: 10,
    text: "열 번째 하이라이트입니다. 작가의 독특한 문체가 돋보이는 문장입니다.",
    page: 235,
    date: "2023-12-28T13:45:00.000Z",
    creator: participants[0]!,
    totalComments: 2,
  },
  {
    id: 11,
    text: "열한 번째 하이라이트입니다. 이 구절은 작품의 결말을 암시합니다.",
    page: 252,
    date: "2024-01-10T10:00:00.000Z",
    creator: participants[1]!,
    totalComments: 3,
  },
  {
    id: 12,
    text: "열두 번째 하이라이트입니다. 철학적 질문을 던지는 중요한 부분입니다.",
    page: 278,
    date: "2024-01-22T15:30:00.000Z",
    creator: participants[2]!,
    totalComments: 6,
  },
  {
    id: 13,
    text: "열세 번째 하이라이트입니다. 책의 핵심 메시지를 담고 있는 문장입니다.",
    page: 301,
    date: "2024-02-05T09:15:00.000Z",
    creator: participants[0]!,
    totalComments: 2,
  },
  {
    id: 14,
    text: "열네 번째 하이라이트입니다. 등장인물의 내적 갈등이 드러나는 부분입니다.",
    page: 325,
    date: "2024-02-18T11:45:00.000Z",
    creator: participants[1]!,
    totalComments: 1,
  },
  {
    id: 15,
    text: "열다섯 번째 하이라이트입니다. 작품의 마지막 부분에서 중요한 의미를 담고 있습니다.",
    page: 348,
    date: "2024-02-29T14:00:00.000Z",
    creator: participants[2]!,
    totalComments: 4,
  },
];
