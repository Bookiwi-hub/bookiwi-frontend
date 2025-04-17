import { ComponentProps } from "react";

import { useSplitViewContext } from "./context";
import useSplitViewPane, {
  UseSplitViewPaneParams,
} from "./hooks/use-split-view-pane";

import { cn } from "#/lib/utils";

interface SplitViewPaneProps
  extends UseSplitViewPaneParams,
    ComponentProps<"div"> {
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
}: SplitViewPaneProps) {
  const { vertical } = useSplitViewContext();

  const { size } = useSplitViewPane(paneId, {
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
