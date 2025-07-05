import { atom } from "@bookiwi/jotai";
import { Kiwi } from "@bookiwi/supabase/types/response";

export const kiwiDetailModalOpenAtom = atom<boolean>(false);
export const selectedKiwiAtom = atom<Kiwi | null>(null);
export const openKiwiDetailModalAtom = atom(null, (get, set, kiwi: Kiwi) => {
  set(kiwiDetailModalOpenAtom, true);
  set(selectedKiwiAtom, kiwi);
});
