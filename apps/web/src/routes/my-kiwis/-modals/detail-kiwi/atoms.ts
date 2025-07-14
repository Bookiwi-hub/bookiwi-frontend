import { atom } from "@bookiwi/jotai";
import { MyKiwi } from "@bookiwi/supabase/types";

export const selectedKiwiAtom = atom<MyKiwi | null>(null);
