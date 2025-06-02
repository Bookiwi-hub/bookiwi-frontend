import { useCallback } from "react";

import { useAtom, useAtomValue, useSetAtom } from "@bookiwi/jotai";

import Annotation from "./annotation";
import { useAnnotationPane } from "./annotation/context";
import Book from "./book";
import { SplitViewSeparator } from "./split-view";
import {
  bookPaneSizeAtom,
  annotationPaneSizeAtom,
  splitViewWidthAtom,
} from "./split-view/atoms";

import Overlay from "#/components/ui/overlay";

function Viewer() {
  const { isOpen, isPinned, close } = useAnnotationPane();
  const [bookPaneSize, setBookPaneSize] = useAtom(bookPaneSizeAtom);
  const annotationPaneSize = useAtomValue(annotationPaneSizeAtom);
  const setSplitViewWidth = useSetAtom(splitViewWidthAtom);

  const callbackRef = useCallback(
    (el: HTMLDivElement | null) => {
      if (!el) return () => {};

      const observer = new ResizeObserver(([entry]) => {
        if (!entry) return;

        setSplitViewWidth(entry.contentRect.width ?? undefined);
        if (isPinned) {
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
    [setSplitViewWidth, setBookPaneSize, annotationPaneSize, isPinned],
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

      {isOpen && (
        <SplitViewSeparator
          separatorThickness={isPinned ? 4 : 2}
          className="animate-slide-in-right"
        />
      )}
      {isOpen && !isPinned && (
        <Overlay className="absolute z-10 bg-transparent " onClick={close} />
      )}

      {isOpen && (
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

export default Viewer;
