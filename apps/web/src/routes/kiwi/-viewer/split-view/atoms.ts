import { atom } from "@bookiwi/jotai";

import { clamp } from "#/utils";

export const ANNOTATION_PANE_SIZE_MIN = 350;
export const BOOK_PANE_SIZE_MIN = 500;

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
