import { useEffect } from "react";

import { useAtomValue, useSetAtom } from "@bookiwi/jotai";

import { annotationsAtom, bookAtom, selectedAnnotationAtom } from "../atoms";

function Highlights() {
  const annotations = useAtomValue(annotationsAtom);
  const book = useAtomValue(bookAtom);
  const setSelectedAnnotation = useSetAtom(selectedAnnotationAtom);
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
        });
      }
    });
    return () => {
      annotations.forEach((annotation) => {
        book.rendition.annotations.remove(annotation.cfi, "highlight");
      });
    };
  }, [annotations, book, setSelectedAnnotation]);

  return null;
}

export default Highlights;
