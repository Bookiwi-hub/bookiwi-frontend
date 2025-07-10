import { useEffect } from "react";
import { toast } from "sonner";

import { useAtom, useAtomValue } from "@bookiwi/jotai";

import { currentSectionAtom, highlightsAtom, kiwiIdAtom } from "../atoms";

import supabaseManager from "#/managers/supabase";

const useHighlight = () => {
  const [highlights, setHighlights] = useAtom(highlightsAtom);
  const currentSection = useAtomValue(currentSectionAtom);
  const kiwiId = useAtomValue(kiwiIdAtom);

  useEffect(() => {
    if (!kiwiId || !currentSection) return;
    const getSectionHighlights = async () => {
      try {
        const sectionHighlights =
          await supabaseManager.reader.getSectionHighlights(
            kiwiId,
            currentSection.href,
          );
        setHighlights(sectionHighlights);
      } catch (error) {
        toast.error("하이라이트 정보를 불러오는데 실패했습니다.");
      }
    };
    getSectionHighlights();
  }, [kiwiId, currentSection, setHighlights]);

  return highlights;
};

export default useHighlight;
