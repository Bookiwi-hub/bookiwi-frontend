import { atom } from "@bookiwi/jotai";

export enum TabType {
  COMMENT = "comment",
  AI = "ai",
}

export const tabStateAtom = atom<TabType>(TabType.COMMENT);

export const setTabToCommentAtom = atom(null, (get, set) => {
  set(tabStateAtom, TabType.COMMENT);
});

export const setTabToAiChatAtom = atom(null, (get, set) => {
  set(tabStateAtom, TabType.AI);
});
