import color from "./color";

import { Participant } from "#/types/kiwi";

export const participants: Participant[] = [
  {
    id: "sample-participant-0",
    userId: "sample-participant-0",
    name: "KIWI",
    profileImage: "https://github.com/shadcn.png",
    color: color[0]!,
    lastActivityAt: new Date("2025-05-23"),
    progress: 0,
  },
  {
    id: "sample-participant-1",
    userId: "sample-participant-1",
    name: "조현지",
    profileImage: "",
    color: color[1]!,
    lastActivityAt: new Date("2025-05-23"),
    progress: 0,
  },
  {
    id: "sample-participant-2",
    userId: "sample-participant-2",
    name: "임진조",
    profileImage: "",
    color: color[2]!,
    lastActivityAt: new Date("2025-05-23"),
    progress: 0,
  },
  {
    id: "sample-participant-3",
    userId: "sample-participant-3",
    name: "홍서하",
    profileImage: "",
    color: color[3]!,
    lastActivityAt: new Date("2025-05-23"),
    progress: 0,
  },
  {
    id: "sample-participant-4",
    userId: "sample-participant-4",
    name: "한상우",
    profileImage: "",
    color: color[4]!,
    lastActivityAt: new Date("2025-05-23"),
    progress: 0,
  },
  {
    id: "sample-participant-5",
    userId: "sample-participant-5",
    name: "채종민",
    profileImage: "",
    color: color[5]!,
    lastActivityAt: new Date("2025-05-23"),
    progress: 0,
  },
];
