import { Kiwi } from "#/types/kiwi";
// 샘플 키위 데이터 - 예시 목적으로만 사용
export const sampleKiwi: Kiwi = {
  id: "sample-kiwi",
  name: "예시 키위(모비딕)",
  description: "들어와 키위를 체험해보세요!",
  shareCode: "sample-kiwi",
  createdAt: "2024-01-01",
  admin: {
    id: "kiwi",
    name: "키위",
    email: "kiwi@kiwi.com",
    profileImage: "https://github.com/shadcn.png",
  },
  bookMetadata: {
    title: "모비딕",
    author: "허먼 멜빌",
    publisher: "허먼 멜빌",
    toc: [],
  },
  bookDataId: "sample-book-data",
  coverImage: "/images/moby-dick-cover.jpg",
  maxParticipants: 3,
  password: null,
  participants: [
    {
      id: 0,
      name: "KIWI",
      profileImage: "https://github.com/shadcn.png",
      color: "rgba(186, 230, 55)",
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
  ],
};
