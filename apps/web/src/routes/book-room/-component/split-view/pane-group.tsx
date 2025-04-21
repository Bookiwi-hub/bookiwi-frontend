import { ComponentProps } from "react";

import { cn } from "#/lib/utils";

interface SplitViewGroupProps extends ComponentProps<"div"> {}

function SplitViewPaneGroup({
  children,
  className,
  ...props
}: SplitViewGroupProps) {
  return (
    <div className={cn("flex", className)} {...props}>
      {children}
    </div>
  );
}

export default SplitViewPaneGroup;
