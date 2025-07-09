import { atom } from "@bookiwi/jotai";
import { Highlight, NewHighlight } from "@bookiwi/supabase/types";

import supabaseManager from "#/managers/supabase";

export const highlightsAtom = atom<Highlight[]>([]);

export const selectedHighlightAtom = atom<Highlight | null>(null);

export const addHighlightAtom = atom(
  null,
  async (get, set, highlight: NewHighlight) => {
    const { id } = await supabaseManager.reader.addHighlight(highlight);
    console.log(id);
    // set(annotationsTotalAtom, [...get(annotationsTotalAtom), { ...highlight, id }]);
    // const annotations = get(annotationsTotalAtom);

    // set(annotationsTotalAtom, [...annotations, annotation]);
  },
);
