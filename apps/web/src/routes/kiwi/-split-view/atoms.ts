import { atom } from "@bookiwi/jotai";

import { clamp } from "#/utils";

export const ANNOTATION_PANE_SIZE_MIN = 350;
export const BOOK_PANE_SIZE_MIN = 500;

export enum AnnotationPaneState {
  CLOSED,
  OPEN,
  PINNED,
}

// split view
export const splitViewWidthAtom = atom<number>();
export const bookPaneSizeAtom = atom<number>();
export const annotationPaneSizeAtom = atom<number>(ANNOTATION_PANE_SIZE_MIN);

export const resizeBookPaneAtom = atom(null, (get, set, delta: number) => {
  set(bookPaneSizeAtom, (prevSize) => {
    if (prevSize) {
      const splitViewWidth = get(splitViewWidthAtom);
      return clamp(
        prevSize + delta,
        BOOK_PANE_SIZE_MIN,
        splitViewWidth
          ? splitViewWidth - ANNOTATION_PANE_SIZE_MIN
          : Number.POSITIVE_INFINITY,
      );
    }
    return prevSize;
  });
});

export const resizeAnnotationPaneAtom = atom(
  null,
  (get, set, delta: number) => {
    set(annotationPaneSizeAtom, (prevSize) => {
      if (prevSize) {
        const splitViewWidth = get(splitViewWidthAtom);
        return clamp(
          prevSize + delta,
          ANNOTATION_PANE_SIZE_MIN,
          splitViewWidth
            ? splitViewWidth - BOOK_PANE_SIZE_MIN
            : Number.POSITIVE_INFINITY,
        );
      }
      return prevSize;
    });
  },
);

// annotation pane state
export const annotationPaneStateAtom = atom<AnnotationPaneState>(
  AnnotationPaneState.PINNED,
);

export const isAnnotationOpenAtom = atom((get) => {
  const state = get(annotationPaneStateAtom);
  return (
    state === AnnotationPaneState.OPEN || state === AnnotationPaneState.PINNED
  );
});

export const isAnnotationPinnedAtom = atom((get) => {
  const state = get(annotationPaneStateAtom);
  return state === AnnotationPaneState.PINNED;
});

export const openAnnotationPaneAtom = atom(null, (get, set) => {
  set(annotationPaneStateAtom, AnnotationPaneState.OPEN);
});

export const closeAnnotationPaneAtom = atom(null, (get, set) => {
  set(annotationPaneStateAtom, AnnotationPaneState.CLOSED);
});

export const toggleAnnotationPaneAtom = atom(null, (get, set) => {
  set(annotationPaneStateAtom, (prevState) =>
    prevState === AnnotationPaneState.CLOSED
      ? AnnotationPaneState.OPEN
      : AnnotationPaneState.CLOSED,
  );
});

export const pinAnnotationPaneAtom = atom(null, (get, set) => {
  set(annotationPaneStateAtom, AnnotationPaneState.PINNED);
});

export const unpinAnnotationPaneAtom = atom(null, (get, set) => {
  set(annotationPaneStateAtom, AnnotationPaneState.OPEN);
});
