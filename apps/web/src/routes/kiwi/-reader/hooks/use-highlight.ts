import { useEffect } from "react";

import { useAtom, useAtomValue } from "@bookiwi/jotai";

import { getSectionHighlights } from "../apis";
import { currentSectionAtom, highlightsAtom, kiwiIdAtom } from "../atoms";

import supabaseManager from "#/managers/supabase";

const useHighlight = () => {
  const [highlights, setHighlights] = useAtom(highlightsAtom);
  const currentSection = useAtomValue(currentSectionAtom);
  const kiwiId = useAtomValue(kiwiIdAtom);

  useEffect(() => {
    if (!kiwiId || !currentSection) return () => {};

    const fetchSectionHighlights = async () => {
      const sectionHighlights = await getSectionHighlights(
        kiwiId,
        currentSection.href,
      );
      setHighlights(sectionHighlights);
    };

    fetchSectionHighlights();

    const channel = supabaseManager.reader.subscribeToHighlights(
      kiwiId,
      currentSection.href,
      {
        onInsert: (highlight) => setHighlights((prev) => [...prev, highlight]),
        onDelete: (highlight) =>
          setHighlights((prev) => prev.filter((h) => h.id !== highlight.id)),
      },
    );

    return () => channel.unsubscribe();
  }, [kiwiId, currentSection, setHighlights]);

  return highlights;
};

export default useHighlight;
