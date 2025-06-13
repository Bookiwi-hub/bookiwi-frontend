import { useEffect } from "react";

import { useAtomValue } from "@bookiwi/jotai";

import { annotationsAtom, bookAtom, currentSectionAtom } from "../atoms";

import { AnnotationIDBData } from "#/types/idb";

function Highlights() {
  const annotations = useAtomValue(annotationsAtom);
  const currentSection = useAtomValue(currentSectionAtom);

  const currentSectionAnnotations = annotations.filter((annotation) => {
    if (!currentSection) return false;
    return annotation.sectionIndex === currentSection.index;
  });

  return (
    <>
      {currentSectionAnnotations.map((annotation) => (
        <Highlight key={annotation.id} annotation={annotation} />
      ))}
    </>
  );
}

function Highlight({ annotation }: { annotation: AnnotationIDBData }) {
  const book = useAtomValue(bookAtom);
  useEffect(() => {
    if (!book) return () => {};
    book.rendition.annotations.highlight(
      annotation.cfi,
      undefined,
      undefined,
      undefined,
      {
        fill: annotation.color,
      },
    );
    return () => {
      book.rendition.annotations.remove(annotation.cfi, "highlight");
    };
  }, [annotation, book]);
  return null;
}

export default Highlights;
