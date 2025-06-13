import { atom } from "@bookiwi/jotai";

import { addIDBAnnotation } from "../utils";

import { currentSectionAtom } from "./book";

import { AnnotationIDBData } from "#/types/idb";

export const annotationsTotalAtom = atom<AnnotationIDBData[]>([]);

export const addAnnotationAtom = atom(
  null,
  async (get, set, annotation: AnnotationIDBData) => {
    const annotations = get(annotationsTotalAtom);
    set(annotationsTotalAtom, [...annotations, annotation]);
    await addIDBAnnotation(annotation);
  },
);

export const annotationsAtom = atom((get) => {
  const annotations = get(annotationsTotalAtom);
  const currentSection = get(currentSectionAtom);
  if (!currentSection) return [];
  return annotations.filter((a) => a.sectionIndex === currentSection.index);
});
