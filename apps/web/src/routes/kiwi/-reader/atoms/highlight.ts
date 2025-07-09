import { atom } from "@bookiwi/jotai";
import { Highlight, NewHighlight } from "@bookiwi/supabase/types";

import { participantInfoAtom } from "./participant";

import supabaseManager from "#/managers/supabase";

export const highlightsAtom = atom<Highlight[]>([]);

export const selectedHighlightAtom = atom<Highlight | null>(null);

export const addHighlightAtom = atom(
  null,
  async (get, set, highlight: NewHighlight) => {
    const participant = get(participantInfoAtom);
    if (!participant) return;
    const { id } = await supabaseManager.reader.addHighlight(highlight);
    const newHighlight: Highlight = {
      ...highlight,
      id,
      commentCount: 0,
      name: participant.name,
      profileImage: participant.profileImage,
    };
    set(highlightsAtom, [...get(highlightsAtom), newHighlight]);
    set(selectedHighlightAtom, newHighlight);
  },
);

export const removeHighlightAtom = atom(null, async (get, set, id: string) => {
  const highlights = get(highlightsAtom);
  set(
    highlightsAtom,
    highlights.filter((highlight) => highlight.id !== id),
  );
});
