import { ComponentPropsWithoutRef } from "react";

import { cn } from "#/lib/utils";

interface OverlayProps extends ComponentPropsWithoutRef<"div"> {}

function Overlay({ className, ...props }: OverlayProps) {
  return (
    <div
      className={cn("fixed inset-0 z-10 bg-black/30", className)}
      {...props}
    />
  );
}

export default Overlay;
