import { ParticipantType, participants } from "./participants";

export interface CommentType {
  id: number;
  text: string;
  date: string;
  creator: ParticipantType;
}

export interface HighlightType {
  id: number;
  text: string;
  page: number;
  date: string;
  creator: ParticipantType;
  comments: CommentType[];
}

export const highlightData: HighlightType = {
  id: 1,
  text: "이것은 책에서 하이라이트된 문장입니다. 중요한 개념이나 인상적인 구절을 표시하는데 사용됩니다. 이것은 책에서 하이라이트된 문장입니다. 중요한 개념이나 인상적인 구절을 표시하는데 사용됩니다. 이것은 책에서 하이라이트된 문장입니다. 중요한 개념이나 인상적인 구절을 표시하는데 사용됩니다. 이것은 책에서 하이라이트된 문장입니다. 중요한 개념이나 인상적인 구절을 표시하는데 사용됩니다.이것은 책에서 하이라이트된 문장입니다. 중요한 개념이나 인상적인 구절을 표시하는데 사용됩니다. 이것은 책에서 하이라이트된 문장입니다. 중요한 개념이나 인상적인 구절을 표시하는데 사용됩니다.이것은 책에서 하이라이트된 문장입니다. 중요한 개념이나 인상적인 구절을 표시하는데 사용됩니다. 이것은 책에서 하이라이트된 문장입니다. 중요한 개념이나 인상적인 구절을 표시하는데 사용됩니다.",
  page: 42,
  date: "2023-08-15",
  creator: participants[0]!,
  comments: [
    {
      id: 0,
      text: "엄청 좋은 내용이네요.",
      date: "2023-08-15",
      creator: participants[0]!,
    },
    {
      id: 1,
      text: "이 부분이 책의 핵심 내용을 잘 설명하고 있습니다.",
      date: "2023-08-16",
      creator: participants[1]!,
    },
    {
      id: 2,
      text: "나중에 다시 읽어볼 필요가 있는 부분이네요.",
      date: "2023-08-17",
      creator: participants[2]!,
    },
    {
      id: 3,
      text: "저도 동의합니다. 이 개념이 전체 책의 주제와 잘 연결되는 것 같아요.",
      date: "2023-08-18",
      creator: participants[3]!,
    },
  ],
};
