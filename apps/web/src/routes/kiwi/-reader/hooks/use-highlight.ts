import { useEffect } from "react";

import { useAtom, useAtomValue } from "@bookiwi/jotai";

import { getSectionHighlights } from "../apis";
import { currentSectionAtom, highlightsAtom, kiwiIdAtom } from "../atoms";

const useHighlight = () => {
  const [highlights, setHighlights] = useAtom(highlightsAtom);
  const currentSection = useAtomValue(currentSectionAtom);
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

  return highlights;
};

export default useHighlight;
