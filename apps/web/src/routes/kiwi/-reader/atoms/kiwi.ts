import { atom } from "@bookiwi/jotai";

import { KiwiIDBData } from "#/types/idb";

export const kiwiAtom = atom<KiwiIDBData | null>(null);
