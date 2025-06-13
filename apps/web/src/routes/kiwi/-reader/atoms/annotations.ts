import { atom } from "@bookiwi/jotai";

import { AnnotationIDBData } from "#/types/idb";
import { AnnotationComment } from "#/types/kiwi";

export const annotationsAtom = atom<AnnotationIDBData[]>([]);

export const annotationIdAtom = atom<string | null>(null);
export const annotationKiwiIdAtom = atom<string | null>(null);
export const annotationCfiAtom = atom<string | null>(null);
export const annotationColorAtom = atom<string | null>(null);
export const annotationParticipantIdAtom = atom<string | null>(null);
export const annotationSectionIndexAtom = atom<number | null>(null);
export const annotationCreatedAtAtom = atom<string | null>(null);
export const annotationUpdatedAtAtom = atom<string | null>(null);
export const annotationCommentsAtom = atom<AnnotationComment[]>([]);

export const annotationAtom = atom<
  AnnotationIDBData | null,
  [AnnotationIDBData],
  void
>(
  (get) => {
    const annotationId = get(annotationIdAtom);
    const annotationKiwiId = get(annotationKiwiIdAtom);
    const annotationCfi = get(annotationCfiAtom);
    const annotationColor = get(annotationColorAtom);
    const annotationParticipantId = get(annotationParticipantIdAtom);
    const annotationSectionIndex = get(annotationSectionIndexAtom);
    const annotationCreatedAt = get(annotationCreatedAtAtom);
    const annotationUpdatedAt = get(annotationUpdatedAtAtom);
    const annotationComments = get(annotationCommentsAtom);
    if (
      !annotationId ||
      !annotationKiwiId ||
      !annotationCfi ||
      !annotationColor ||
      !annotationParticipantId ||
      !annotationSectionIndex ||
      !annotationCreatedAt ||
      !annotationUpdatedAt
    ) {
      return null;
    }

    const annotation: AnnotationIDBData = {
      id: annotationId,
      kiwiId: annotationKiwiId,
      cfi: annotationCfi,
      color: annotationColor,
      participantId: annotationParticipantId,
      sectionIndex: annotationSectionIndex,
      createdAt: annotationCreatedAt,
      updatedAt: annotationUpdatedAt,
      comments: annotationComments,
    };
    return annotation;
  },
  (get, set, newAnnotation: AnnotationIDBData) => {
    set(annotationIdAtom, newAnnotation.id);
    set(annotationKiwiIdAtom, newAnnotation.kiwiId);
    set(annotationCfiAtom, newAnnotation.cfi);
    set(annotationColorAtom, newAnnotation.color);
    set(annotationParticipantIdAtom, newAnnotation.participantId);
    set(annotationSectionIndexAtom, newAnnotation.sectionIndex);
    set(annotationCreatedAtAtom, newAnnotation.createdAt);
    set(annotationUpdatedAtAtom, newAnnotation.updatedAt);
    set(annotationCommentsAtom, newAnnotation.comments);
  },
);
