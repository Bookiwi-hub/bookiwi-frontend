import { atom } from "@bookiwi/jotai";
import { Annotation } from "@bookiwi/supabase/types";

import { currentSectionAtom } from "./book";

export const annotationsTotalAtom = atom<Annotation[]>([]);

export const removeAnnotationAtom = atom(null, async (get, set, id: string) => {
  const annotations = get(annotationsTotalAtom);
  set(
    annotationsTotalAtom,
    annotations.filter((a) => a.id !== id),
  );
  // await removeIDBAnnotation(id);
});

export const annotationsAtom = atom((get) => {
  const annotations = get(annotationsTotalAtom);
  const currentSection = get(currentSectionAtom);
  if (!currentSection) return [];
  return annotations.filter((a) => a.sectionHref === currentSection.href);
});

export const selectedAnnotationAtom = atom<Annotation | null>(null);

export const updateAnnotationAtom = atom(
  null,
  async (get, set, annotation: Annotation) => {
    // const id = await updateIDBAnnotation(annotation);
    const annotations = get(annotationsTotalAtom);
    set(
      annotationsTotalAtom,
      annotations.map((a) => (a.id === annotation.id ? annotation : a)),
    );
    set(selectedAnnotationAtom, annotation);
  },
);
