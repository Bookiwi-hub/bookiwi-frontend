import { useEffect } from "react";

import { useAtomValue, useSetAtom } from "@bookiwi/jotai";

import {
  annotationsAtom,
  bookAtom,
  highlightClickedAtom,
  selectedAnnotationAtom,
} from "../atoms";

function Highlights() {
  const annotations = useAtomValue(annotationsAtom);
  const book = useAtomValue(bookAtom);
  const setSelectedAnnotation = useSetAtom(selectedAnnotationAtom);
  const setHighlightClicked = useSetAtom(highlightClickedAtom);
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
      if (highlightElement) {
        highlightElement.addEventListener("click", () => {
          setSelectedAnnotation(annotation);
          setHighlightClicked(true);
        });
      }
    });
    return () => {
      annotations.forEach((annotation) => {
        book.rendition.annotations.remove(annotation.cfi, "highlight");
      });
    };
  }, [annotations, book, setSelectedAnnotation, setHighlightClicked]);

  return null;
}

export default Highlights;
