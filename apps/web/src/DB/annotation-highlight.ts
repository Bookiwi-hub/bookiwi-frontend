export const highlightData = {
  id: 1,
  text: "이것은 책에서 하이라이트된 문장입니다. 중요한 개념이나 인상적인 구절을 표시하는데 사용됩니다.",
  page: 42,
  date: "2023-08-15",
  creator: {
    id: "currentUser",
    name: "KIWI",
    profileImg: "https://github.com/shadcn.png",
    color: "rgba(186, 230, 55, 1)",
  },
  comments: [
    {
      id: 1,
      text: "이 부분이 책의 핵심 내용을 잘 설명하고 있습니다.",
      date: "2023-08-16",
      participant: {
        id: "currentUser",
        name: "KIWI",
        profileImg: "https://github.com/shadcn.png",
        color: "rgba(186, 230, 55, 1)",
      },
    },
    {
      id: 2,
      text: "나중에 다시 읽어볼 필요가 있는 부분이네요.",
      date: "2023-08-17",
      participant: {
        id: "user2",
        name: "조현지",
        profileImg: "",
        color: "rgba(252, 165, 165, 1)",
      },
    },
    {
      id: 3,
      text: "저도 동의합니다. 이 개념이 전체 책의 주제와 잘 연결되는 것 같아요.",
      date: "2023-08-18",
      participant: {
        id: "user1",
        name: "임진조",
        profileImg: "",
        color: "rgba(147, 197, 253, 1)",
      },
    },
  ],
};
