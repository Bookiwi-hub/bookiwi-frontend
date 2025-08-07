import { useEffect } from "react";

import { useAtom, useAtomValue } from "@bookiwi/jotai";

import { getSectionHighlights } from "../apis";
import {
  currentSectionAtom,
  highlightsAtom,
  kiwiIdAtom,
  participantIdAtom,
} from "../atoms";

import supabaseManager from "#/managers/supabase";
import userManager from "#/managers/user";

const useHighlight = () => {
  const [highlights, setHighlights] = useAtom(highlightsAtom);
  const currentSection = useAtomValue(currentSectionAtom);
  const participantId = useAtomValue(participantIdAtom);
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
    if (!kiwiId || !currentSection || userManager.isGuest) return () => {};

    const channel = supabaseManager.reader.subscribeHighlights(kiwiId, {
      onInsert: (highlight) => {
        if (highlight.participantId === participantId) return;
        if (highlight.sectionHref !== currentSection.href) return;
        setHighlights((prev) => [...prev, highlight]);
      },
      onDelete: (highlight) => {
        if (highlight.participantId === participantId) return;
        if (highlight.sectionHref !== currentSection.href) return;
        setHighlights((prev) => prev.filter((h) => h.id !== highlight.id));
      },
    });

    return () => channel.unsubscribe();
  }, [kiwiId, currentSection, setHighlights, participantId]);

  return highlights;
};

export default useHighlight;
