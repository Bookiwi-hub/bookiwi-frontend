import { useEffect } from "react";

import { useAtomValue } from "@bookiwi/jotai";

import { annotationsAtom, bookAtom } from "../atoms";

function Highlights() {
  const annotations = useAtomValue(annotationsAtom);
  const book = useAtomValue(bookAtom);
  useEffect(() => {
    if (!book) return () => {};
    annotations.forEach((annotation) => {
      book.rendition.annotations.highlight(
        annotation.cfi,
        undefined,
        undefined,
        undefined,
        {
          fill: annotation.color,
        },
      );
    });
    return () => {
      annotations.forEach((annotation) => {
        book.rendition.annotations.remove(annotation.cfi, "highlight");
      });
    };
  }, [annotations, book]);

  return null;
}

export default Highlights;
