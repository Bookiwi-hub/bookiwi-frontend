import { useEffect } from "react";

import { useAtomValue, useSetAtom } from "@bookiwi/jotai";

import {
  annotationsAtom,
  bookAtom,
  currentViewAtom,
  selectedAnnotationAtom,
  setHighlightClickedAtom,
} from "../atoms";

function Highlights() {
  const book = useAtomValue(bookAtom);
  const annotations = useAtomValue(annotationsAtom);
  const setSelectedAnnotation = useSetAtom(selectedAnnotationAtom);
  const setHighlightClicked = useSetAtom(setHighlightClickedAtom);
  const currentView = useAtomValue(currentViewAtom);

  useEffect(() => {
    if (!currentView?.contents || !book) return () => {};
    annotations.forEach((annotation) => {
      const highlight = book.rendition.annotations.highlight(
        annotation.cfi,
        undefined,
        undefined,
        undefined,
        {
          fill: annotation.color,
        },
      );

      const highlightElement = highlight?.mark?.element;

      const handleClick = () => {
        setSelectedAnnotation(annotation);
        setHighlightClicked(true);
      };
      if (highlightElement) {
        highlightElement.addEventListener("click", handleClick);
      }
    });

    return () => {
      annotations.forEach((annotation) => {
        book.rendition.annotations.remove(annotation.cfi, "highlight");
      });
    };
  }, [
    currentView,
    annotations,
    book,
    setHighlightClicked,
    setSelectedAnnotation,
  ]);

  return null;
}

export default Highlights;
