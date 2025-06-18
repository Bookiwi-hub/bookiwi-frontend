import { atom } from "@bookiwi/jotai";

export enum TabType {
  HIGHLIGHT = "highlight",
  HIGHLIGHT_LIST = "highlightList",
}

export const tabStateAtom = atom<TabType>(TabType.HIGHLIGHT_LIST);

export const setTabToHighlightAtom = atom(null, (get, set) => {
  set(tabStateAtom, TabType.HIGHLIGHT);
});

export const setTabToHighlightListAtom = atom(null, (get, set) => {
  set(tabStateAtom, TabType.HIGHLIGHT_LIST);
});
