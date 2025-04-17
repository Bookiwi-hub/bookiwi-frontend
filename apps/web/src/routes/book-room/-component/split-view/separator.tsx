/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from "react";

import { useSplitViewContext } from "./context";

import Overlay from "#/components/ui/overlay";
import { Separator } from "#/components/ui/separator";
import { cn } from "#/lib/utils";

interface SplitViewSeparatorProps {
  prevPaneId: string;
  currentPaneId: string;
  separatorThickness?: number;
}

function SplitViewSeparator({
  prevPaneId,
  currentPaneId,
  separatorThickness = 4,
}: SplitViewSeparatorProps) {
  // 호버 및 활성 상태 관리
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);

  const { paneMap, vertical } = useSplitViewContext();

  // viewKeys로 viewMap에서 view 객체들을 찾음
  const panes = [paneMap.get(prevPaneId), paneMap.get(currentPaneId)];

  const handleMouseDown = () => {
    setActive(true);

    const handleMouseMove = (e: MouseEvent) => {
      // 수직/수평에 따른 마우스 이동 거리 계산
      const delta = vertical ? e.movementY : e.movementX;

      // 연결된 모든 뷰에 크기 변경 적용
      // 첫 번째 뷰는 양수로, 두 번째 뷰는 음수로 적용 (서로 반대 방향)
      panes.forEach((p, i) => {
        p?.resize(delta * (-1) ** i);
      });
    };

    const handleMouseUp = () => {
      // mousedown 상태에서는 mouseleave가 발생하지 않으므로 여기서 처리
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
        vertical ? "cursor-ns-resize" : "cursor-ew-resize", // 수직/수평에 따른 커서 스타일
      )}
      style={{
        // 수직/수평에 따른 크기 설정
        [vertical ? "height" : "width"]: separatorThickness,
        [vertical ? "marginBlock" : "marginInline"]: -separatorThickness / 2, // 마진을 음수로 설정하여 겹치는 효과
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseDown={handleMouseDown}
    >
      {/* 구분선 시각적 표시 */}
      <Separator
        orientation={vertical ? "horizontal" : "vertical"}
        className={cn(
          "pointer-events-none size-full",
          (hover || active) && "bg-primary/30",
        )}
      />
      {/* 드래그 중일 때 전체 화면에 투명 오버레이 추가 (다른 요소의 이벤트 차단) */}
      {active && <Overlay className="!bg-transparent" />}
    </div>
  );
}

export default SplitViewSeparator;
