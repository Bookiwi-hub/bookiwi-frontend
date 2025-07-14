import { atom } from "@bookiwi/jotai";
import { MyKiwi } from "@bookiwi/supabase/types";

export const targetKiwiAtom = atom<MyKiwi | null>(null);
