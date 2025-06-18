/* eslint-disable jsx-a11y/no-static-element-interactions */
import { memo, useState } from "react";

import { useAtomValue, useSetAtom } from "@bookiwi/jotai";

import {
  isAnnotationPinnedAtom,
  resizeAnnotationPaneAtom,
  resizeBookPaneAtom,
} from "./atoms";

import Overlay from "#/components/ui/overlay";
import { Separator } from "#/components/ui/separator";
import { cn } from "#/lib/utils";

interface SplitViewSeparatorProps {
  separatorThickness?: number;
  className?: string;
}

function SplitViewSeparator({
  separatorThickness = 4,
  className,
}: SplitViewSeparatorProps) {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);

  const resizeBookPane = useSetAtom(resizeBookPaneAtom);
  const resizeAnnotationPane = useSetAtom(resizeAnnotationPaneAtom);
  const isAnnotationPinned = useAtomValue(isAnnotationPinnedAtom);

  const handleMouseDown = () => {
    setActive(true);

    const handleMouseMove = (e: MouseEvent) => {
      const delta = e.movementX;

      if (isAnnotationPinned) resizeBookPane(delta);
      resizeAnnotationPane(-delta);
    };

    const handleMouseUp = () => {
      setHover(false);
      setActive(false);

      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      className={cn(
        "relative z-30 flex items-center justify-center",
        "cursor-ew-resize",
        className,
      )}
      style={{
        width: separatorThickness,
        marginInline: -separatorThickness / 2,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseDown={handleMouseDown}
    >
      <Separator
        orientation="vertical"
        className={cn(
          "pointer-events-none size-full",
          (hover || active) && "bg-primary/30",
        )}
      />
      {active && <Overlay className="z-30 !bg-transparent" />}
    </div>
  );
}

export default memo(SplitViewSeparator);
