import color from "./color";

export interface Participant {
  id: number;
  name: string;
  profileImage: string;
  color: string;
}

export const participants: Participant[] = [
  {
    id: 0,
    name: "KIWI",
    profileImage: "https://github.com/shadcn.png",
    color: color[0]!,
  },
  {
    id: 1,
    name: "조현지",
    profileImage: "",
    color: color[1]!,
  },
  {
    id: 2,
    name: "임진조",
    profileImage: "",
    color: color[2]!,
  },
  {
    id: 3,
    name: "홍서하",
    profileImage: "",
    color: color[3]!,
  },
  {
    id: 4,
    name: "한상우",
    profileImage: "",
    color: color[4]!,
  },
  {
    id: 5,
    name: "채종민",
    profileImage: "",
    color: color[5]!,
  },
];
