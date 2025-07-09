import { atom } from "@bookiwi/jotai";
import { MyKiwi } from "@bookiwi/supabase/types";

export const kiwiDetailModalOpenAtom = atom<boolean>(false);
export const selectedKiwiAtom = atom<MyKiwi | null>(null);
export const openKiwiDetailModalAtom = atom(null, (get, set, kiwi: MyKiwi) => {
  set(kiwiDetailModalOpenAtom, true);
  set(selectedKiwiAtom, kiwi);
});
