import { ComponentProps, useCallback } from "react";

import { useSetAtom, useAtomValue } from "@bookiwi/jotai";

import { useAnnotationPane } from "../annotation/context";

import {
  annotationPaneSizeAtom,
  bookPaneSizeAtom,
  splitViewWidthAtom,
} from "./atoms";

import { cn } from "#/lib/utils";

interface SplitViewGroupProps extends ComponentProps<"div"> {}

function SplitViewPaneGroup({
  children,
  className,
  ...props
}: SplitViewGroupProps) {
  const setSplitViewWidth = useSetAtom(splitViewWidthAtom);
  const setBookPaneSize = useSetAtom(bookPaneSizeAtom);
  const annotationPaneSize = useAtomValue(annotationPaneSizeAtom);

  const { isPinned } = useAnnotationPane();
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
    <div ref={callbackRef} className={cn("flex", className)} {...props}>
      {children}
    </div>
  );
}

export default SplitViewPaneGroup;
