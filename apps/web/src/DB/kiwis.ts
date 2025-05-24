import { participants } from "./participants";

import { Kiwi } from "#/types/kiwi";

// 샘플 키위 데이터 - 예시 목적으로만 사용
const sampleKiwi: Kiwi = {
  id: "sample-kiwi",
  name: "예시 키위(모비딕)",
  description: "들어와 키위를 체험해보세요!",
  shareCode: "sample-kiwi",
  createdAt: "2024-01-01",
  admin: {
    id: participants[0]!.id,
    name: participants[0]!.name,
  },
  book: {
    file: new File([], "moby-dick.epub"),
    coverImage: "/images/moby-dick-cover.jpg",
    metadata: {
      title: "모비딕",
      author: "허먼 멜빌",
      publisher: "허먼 멜빌",
      toc: [],
      locations: "",
    },
  },
  lastActivityAt: "오늘",
  maxParticipants: 3,
  password: null,
  participants: [participants[0]!],
};

export default sampleKiwi;
