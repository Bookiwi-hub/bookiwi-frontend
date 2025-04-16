import { ComponentProps } from "react";

import { useSplitViewContext } from "./context";
import useSplitView, { UseSplitViewPrams } from "./hooks/use-split-view";

import { cn } from "#/lib/utils";

interface SplitViewItemProps extends UseSplitViewPrams, ComponentProps<"div"> {
  id: string;
}

function SplitViewItem({
  children,
  className,
  preferredSize,
  minSize,
  maxSize,
  id,
  ...props
}: SplitViewItemProps) {
  const { vertical } = useSplitViewContext();

  const { size } = useSplitView(id, {
    preferredSize,
    minSize,
    maxSize,
  });

  return (
    <div
      id={`${id}`}
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

export default SplitViewItem;
