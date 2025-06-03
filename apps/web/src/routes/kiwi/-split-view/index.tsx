import { useCallback } from "react";

import { useAtom, useAtomValue, useSetAtom } from "@bookiwi/jotai";

import Annotation from "./annotation";
import {
  bookPaneSizeAtom,
  annotationPaneSizeAtom,
  splitViewWidthAtom,
  isAnnotationOpenAtom,
  isAnnotationPinnedAtom,
  closeAnnotationPaneAtom,
} from "./atoms";
import Book from "./book";
import SplitViewSeparator from "./separator";

import Overlay from "#/components/ui/overlay";

function SplitView() {
  const isAnnotationOpen = useAtomValue(isAnnotationOpenAtom);
  const isAnnotationPinned = useAtomValue(isAnnotationPinnedAtom);
  const closeAnnotationPane = useSetAtom(closeAnnotationPaneAtom);

  const [bookPaneSize, setBookPaneSize] = useAtom(bookPaneSizeAtom);
  const annotationPaneSize = useAtomValue(annotationPaneSizeAtom);
  const setSplitViewWidth = useSetAtom(splitViewWidthAtom);

  const callbackRef = useCallback(
    (el: HTMLDivElement | null) => {
      if (!el) return () => {};

      const observer = new ResizeObserver(([entry]) => {
        if (!entry) return;

        setSplitViewWidth(entry.contentRect.width ?? undefined);
        if (isAnnotationPinned) {
          setBookPaneSize(entry.contentRect.width - annotationPaneSize);
        } else {
          setBookPaneSize(entry.contentRect.width);
        }
      });

      observer.observe(el);
      return () => {
        observer.disconnect();
      };
    },
    [
      setSplitViewWidth,
      setBookPaneSize,
      annotationPaneSize,
      isAnnotationPinned,
    ],
  );

  return (
    <div ref={callbackRef} className="relative flex min-h-0 flex-1 justify-end">
      <div
        className="absolute inset-0 z-0 transition-all duration-200"
        style={{
          width: bookPaneSize,
        }}
      >
        <Book />
      </div>

      {isAnnotationOpen && (
        <SplitViewSeparator
          separatorThickness={isAnnotationPinned ? 4 : 2}
          className="animate-slide-in-right"
        />
      )}
      {isAnnotationOpen && !isAnnotationPinned && (
        <Overlay
          className="absolute z-10 bg-transparent "
          onClick={closeAnnotationPane}
        />
      )}

      {isAnnotationOpen && (
        <div
          className="z-20 animate-slide-in-right bg-white shadow-2xl"
          style={{
            width: annotationPaneSize,
          }}
        >
          <Annotation />
        </div>
      )}
    </div>
  );
}

export default SplitView;
