import { useEffect } from "react";

import { useAtomValue, useSetAtom } from "@bookiwi/jotai";

import {
  bookAtom,
  currentViewAtom,
  selectedHighlightAtom,
  setHighlightClickedAtom,
  typographyAtom,
} from "../atoms";
import { useHighlight } from "../hooks";

function Highlights() {
  const book = useAtomValue(bookAtom);
  const highlights = useHighlight();
  const setSelectedHighlight = useSetAtom(selectedHighlightAtom);
  const setHighlightClicked = useSetAtom(setHighlightClickedAtom);
  const currentView = useAtomValue(currentViewAtom);
  const typography = useAtomValue(typographyAtom);

  useEffect(() => {
    if (!currentView?.contents || !book) return () => {};
    highlights.forEach((highlight) => {
      const highlightItem = book.rendition.annotations.highlight(
        highlight.cfi,
        undefined,
        undefined,
        undefined,
        {
          fill: highlight.color,
        },
      );

      const highlightElement = highlightItem?.mark?.element;

      const handleClick = () => {
        setSelectedHighlight(highlight);
        setHighlightClicked(true);
      };
      if (highlightElement) {
        highlightElement.addEventListener("click", handleClick);
      }
    });

    return () => {
      highlights.forEach((highlight) => {
        book.rendition.annotations.remove(highlight.cfi, "highlight");
      });
    };
  }, [
    currentView,
    highlights,
    book,
    setSelectedHighlight,
    setHighlightClicked,
    typography,
  ]);

  return null;
}

export default Highlights;
