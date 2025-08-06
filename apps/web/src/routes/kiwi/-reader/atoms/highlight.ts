import { atom } from "@bookiwi/jotai";
import { Highlight, NewHighlight } from "@bookiwi/supabase/types";

import { addHighlight, removeHighlight } from "../apis";

import { participantInfoAtom } from "./participant";

export const highlightsAtom = atom<Highlight[]>([]);

export const selectedHighlightAtom = atom<Highlight | null>(null);

export const setSelectedHighlightAtom = atom(
  null,
  (get, set, highlight: Highlight | null) => {
    set(selectedHighlightAtom, highlight);
  },
);

export const addHighlightAtom = atom(
  null,
  async (get, set, highlight: NewHighlight) => {
    const participant = get(participantInfoAtom);
    if (!participant) return;
    const { id } = await addHighlight(highlight);
    if (!id) return;
    const newHighlight: Highlight = {
      ...highlight,
      id,
      commentCount: 0,
      name: participant.name,
      profileImage: participant.profileImage,
    };
    set(highlightsAtom, [...get(highlightsAtom), newHighlight]);
    set(setSelectedHighlightAtom, newHighlight);
  },
);

export const removeHighlightAtom = atom(null, async (get, set, id: string) => {
  const { id: removedId } = await removeHighlight(id);
  if (!removedId) return;
  const highlights = get(highlightsAtom);
  set(
    highlightsAtom,
    highlights.filter((highlight) => highlight.id !== removedId),
  );
  set(setSelectedHighlightAtom, null);
});
