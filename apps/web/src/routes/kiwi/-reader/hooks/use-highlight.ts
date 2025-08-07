import { useEffect } from "react";

import { atom, useAtom, useAtomValue, useSetAtom } from "@bookiwi/jotai";
import { Highlight } from "@bookiwi/supabase/types";

import { getSectionHighlights } from "../apis";
import {
  currentSectionAtom,
  highlightsAtom,
  kiwiIdAtom,
  participantIdAtom,
} from "../atoms";

import supabaseManager from "#/managers/supabase";
import userManager from "#/managers/user";

const addAtom = atom(null, (get, set, highlight: Highlight) => {
  const highlights = get(highlightsAtom);
  const currentSection = get(currentSectionAtom);
  if (highlight.sectionHref !== currentSection?.href) return;
  set(highlightsAtom, [...highlights, highlight]);
});

const deleteAtom = atom(null, (get, set, highlight: Highlight) => {
  const highlights = get(highlightsAtom);
  const currentSection = get(currentSectionAtom);
  if (highlight.sectionHref !== currentSection?.href) return;
  set(
    highlightsAtom,
    highlights.filter((h) => h.id !== highlight.id),
  );
});

const useHighlight = () => {
  const [highlights, setHighlights] = useAtom(highlightsAtom);
  const currentSection = useAtomValue(currentSectionAtom);
  const participantId = useAtomValue(participantIdAtom);
  const setHighlight = useSetAtom(addAtom);
  const deleteHighlight = useSetAtom(deleteAtom);
  const kiwiId = useAtomValue(kiwiIdAtom);

  useEffect(() => {
    if (!kiwiId || !currentSection) return;

    const fetchSectionHighlights = async () => {
      const sectionHighlights = await getSectionHighlights(
        kiwiId,
        currentSection.href,
      );
      setHighlights(sectionHighlights);
    };

    fetchSectionHighlights();
  }, [kiwiId, currentSection, setHighlights]);

  useEffect(() => {
    if (!kiwiId || userManager.isGuest) return () => {};

    const channel = supabaseManager.reader.subscribeHighlights(kiwiId, {
      onInsert: (highlight) => {
        if (highlight.participantId === participantId) return;
        setHighlight(highlight);
      },
      onDelete: (highlight) => {
        if (highlight.participantId === participantId) return;
        deleteHighlight(highlight);
      },
    });

    return () => channel.unsubscribe();
  }, [kiwiId, participantId, setHighlight, deleteHighlight]);

  return highlights;
};

export default useHighlight;
