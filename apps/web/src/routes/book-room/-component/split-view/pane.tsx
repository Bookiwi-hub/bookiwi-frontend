import { ComponentProps } from "react";

import { useSplitViewContext } from "./context";
import useSplitView, { UseSplitViewPrams } from "./hooks/use-split-view-pane";

import { cn } from "#/lib/utils";

interface SplitViewItemProps extends UseSplitViewPrams, ComponentProps<"div"> {
  paneId: string;
}

function SplitViewPane({
  children,
  className,
  preferredSize,
  minSize,
  maxSize,
  paneId,
  ...props
}: SplitViewItemProps) {
  const { vertical } = useSplitViewContext();

  const { size } = useSplitView(paneId, {
    preferredSize,
    minSize,
    maxSize,
  });

  return (
    <div
      id={`${paneId}`}
      className={cn("", size && "shrink-0", className)}
      style={{
        [vertical ? "height" : "width"]: size,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export default SplitViewPane;
