import { atom } from "@bookiwi/jotai";

import { Kiwi } from "#/types/kiwi";

export const kiwiDetailModalOpenAtom = atom<boolean>(false);
export const selectedKiwiAtom = atom<Kiwi | null>(null);
export const openKiwiDetailModalAtom = atom(null, (get, set, kiwi: Kiwi) => {
  set(kiwiDetailModalOpenAtom, true);
  set(selectedKiwiAtom, kiwi);
});
