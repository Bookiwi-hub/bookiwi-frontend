import { useEffect } from "react";

import { useAtomValue, useSetAtom } from "@bookiwi/jotai";

import {
  annotationsAtom,
  bookAtom,
  isCenterTouchedAtom,
  selectedAnnotationAtom,
  setHighlightClickedAtom,
} from "../atoms";

function Highlights() {
  const annotations = useAtomValue(annotationsAtom);
  const book = useAtomValue(bookAtom);
  const setSelectedAnnotation = useSetAtom(selectedAnnotationAtom);
  const setHighlightClicked = useSetAtom(setHighlightClickedAtom);
  const setIsCenterTouched = useSetAtom(isCenterTouchedAtom);
  useEffect(() => {
    if (!book) return () => {};
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
    annotations,
    book,
    setSelectedAnnotation,
    setHighlightClicked,
    setIsCenterTouched,
  ]);

  return null;
}

export default Highlights;
