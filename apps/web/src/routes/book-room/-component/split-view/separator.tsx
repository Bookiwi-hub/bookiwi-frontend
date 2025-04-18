/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from "react";

import { useSplitViewContext } from "./context";

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

  const { bookPane, annotationPane } = useSplitViewContext();

  const handleMouseDown = () => {
    setActive(true);

    const handleMouseMove = (e: MouseEvent) => {
      const delta = e.movementX;

      if (bookPane.resizable) bookPane.resize(delta);
      if (annotationPane.resizable) annotationPane.resize(-delta);
    };

    const handleMouseUp = () => {
      setHover(false);
      setActive(false);

      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    // 전역 이벤트 리스너 등록
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      className={cn(
        "relative z-30 shrink-0 flex items-center justify-center",
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
      {/* 구분선 시각적 표시 */}
      <Separator
        orientation="vertical"
        className={cn(
          "pointer-events-none size-full",
          (hover || active) && "bg-primary/30",
        )}
      />
      {/* 드래그 중일 때 전체 화면에 투명 오버레이 추가 (다른 요소의 이벤트 차단) */}
      {active && <Overlay className="z-30 !bg-transparent" />}
    </div>
  );
}

export default SplitViewSeparator;
