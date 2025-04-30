import { ComponentProps, useCallback } from "react";

import { useAnnotationPane } from "../viewer/annotation/context";

import { Pane } from "./constants/type";
import { useSplitViewContext } from "./context";
import usePane from "./hooks/use-pane";

import { cn } from "#/lib/utils";

interface SplitViewGroupProps extends ComponentProps<"div"> {}

function SplitViewPaneGroup({
  children,
  className,
  ...props
}: SplitViewGroupProps) {
  const { setSplitViewWidth } = useSplitViewContext();
  const bookPane = usePane(Pane.BOOK);
  const annotationPane = usePane(Pane.ANNOTATION);
  const { isPinned } = useAnnotationPane();
  const callbackRef = useCallback(
    (el: HTMLDivElement | null) => {
      if (!el) return () => {};

      const observer = new ResizeObserver(([entry]) => {
        if (!entry) return;

        setSplitViewWidth(entry.contentRect.width ?? undefined);
        if (isPinned && annotationPane.size) {
          bookPane.setSize(entry.contentRect.width - annotationPane.size);
        }
      });

      observer.observe(el);
      return () => {
        observer.disconnect();
      };
    },
    [setSplitViewWidth, bookPane, annotationPane.size, isPinned],
  );

  return (
    <div ref={callbackRef} className={cn("flex", className)} {...props}>
      {children}
    </div>
  );
}

export default SplitViewPaneGroup;
