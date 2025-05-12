import { ComponentProps, memo } from "react";

import { Pane } from "./constants/type";
import usePane from "./hooks/use-pane";

import { cn } from "#/lib/utils";

interface SplitViewPaneProps extends ComponentProps<"div"> {
  pane: Pane;
  resizable?: boolean;
}

function SplitViewPane({
  children,
  className,
  pane,
  ...props
}: SplitViewPaneProps) {
  const thisPane = usePane(pane);

  return (
    <div
      id={`${pane}`}
      className={cn(className)}
      style={{
        width: thisPane.size,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export default memo(SplitViewPane);
