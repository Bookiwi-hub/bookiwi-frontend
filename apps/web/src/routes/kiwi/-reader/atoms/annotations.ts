import { atom } from "@bookiwi/jotai";

import { addIDBAnnotation } from "../utils";

import { AnnotationIDBData } from "#/types/idb";

export const annotationsAtom = atom<AnnotationIDBData[]>([]);

export const addAnnotationAtom = atom(
  null,
  async (get, set, annotation: AnnotationIDBData) => {
    const annotations = get(annotationsAtom);
    set(annotationsAtom, [...annotations, annotation]);
    await addIDBAnnotation(annotation);
  },
);
