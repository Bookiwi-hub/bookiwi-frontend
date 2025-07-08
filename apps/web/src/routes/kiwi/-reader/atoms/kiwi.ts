import { atom } from "@bookiwi/jotai";
import { Kiwi } from "@bookiwi/supabase/types/response";

export const kiwiAtom = atom<Kiwi | null>(null);
export const kiwiIdAtom = atom<string | null>((get) => {
  const kiwi = get(kiwiAtom);
  if (!kiwi) return null;
  return kiwi.id;
});
