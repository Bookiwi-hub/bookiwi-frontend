import { atom } from "@bookiwi/jotai";

import {
  addIDBAnnotation,
  removeIDBAnnotation,
  updateIDBAnnotation,
} from "../api/idb";

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

export const removeAnnotationAtom = atom(null, async (get, set, id: string) => {
  const annotations = get(annotationsTotalAtom);
  set(
    annotationsTotalAtom,
    annotations.filter((a) => a.id !== id),
  );
  await removeIDBAnnotation(id);
});

export const annotationsAtom = atom((get) => {
  const annotations = get(annotationsTotalAtom);
  const currentSection = get(currentSectionAtom);
  if (!currentSection) return [];
  return annotations.filter((a) => a.sectionHref === currentSection.href);
});

export const selectedAnnotationAtom = atom<AnnotationIDBData | null>(null);

export const updateAnnotationAtom = atom(
  null,
  async (get, set, annotation: AnnotationIDBData) => {
    const id = await updateIDBAnnotation(annotation);
    const annotations = get(annotationsTotalAtom);
    set(
      annotationsTotalAtom,
      annotations.map((a) => (a.id === id ? annotation : a)),
    );
    set(selectedAnnotationAtom, annotation);
  },
);
