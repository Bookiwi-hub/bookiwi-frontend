import { ComponentProps, memo, useEffect } from "react";

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
  resizable = true,
  ...props
}: SplitViewPaneProps) {
  const thisPane = usePane(pane);

  useEffect(() => {
    thisPane.resizable = resizable;
  }, [thisPane, resizable]);

  return (
    <div
      id={`${pane}`}
      className={cn("", thisPane.size && "shrink-0", className)}
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
