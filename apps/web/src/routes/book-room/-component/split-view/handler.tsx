import { useState } from "react";

import { SplitViewType, useSplitViewContext } from "./context";

import { cn } from "#/lib/utils";

interface SplitViewHandlerProps {
  viewKeys: [string, string];
}

/**
 * 구분선(Sash)의 크기 (픽셀)
 */
const SASH_SIZE = 4;

function SplitViewHandler({ viewKeys }: SplitViewHandlerProps) {
  // 호버 및 활성 상태 관리
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);

  const { viewMap, vertical } = useSplitViewContext();

  // viewKeys로 viewMap에서 view 객체들을 찾음
  const views = viewKeys
    .map((key) => viewMap.get(key))
    .filter(Boolean) as SplitViewType[];

  // 모든 뷰가 visible하고 resize 함수가 있을 때만 활성화
  const enabled = views.every((v) => v.visible && v.resize);

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={cn(
        "relative z-30 shrink-0",
        !enabled && "pointer-events-none", // 모바일이거나 비활성화 시 이벤트 무시
        vertical ? "cursor-ns-resize" : "cursor-ew-resize", // 수직/수평에 따른 커서 스타일
      )}
      style={{
        // 수직/수평에 따른 크기 설정
        [vertical ? "height" : "width"]: SASH_SIZE,
        [vertical ? "marginBlock" : "marginInline"]: -SASH_SIZE / 2, // 마진을 음수로 설정하여 겹치는 효과
      }}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      onMouseDown={() => {
        setActive(true);

        /**
         * 마우스 드래그 중 이벤트 핸들러
         * 마우스 이동에 따라 연결된 뷰들의 크기를 조절
         *
         * @param {MouseEvent} e - 마우스 이벤트 객체
         */
        function handleMouseMove(e: MouseEvent) {
          // 수직/수평에 따른 마우스 이동 거리 계산
          const delta = vertical ? e.movementY : e.movementX;

          // 연결된 모든 뷰에 크기 변경 적용
          // 첫 번째 뷰는 양수로, 두 번째 뷰는 음수로 적용 (서로 반대 방향)
          views.forEach((v, i) => {
            v.resize?.(delta * (-1) ** i);
          });
        }

        // 전역 이벤트 리스너 등록
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", function handleMouseUp() {
          // mousedown 상태에서는 mouseleave가 발생하지 않으므로 여기서 처리
          setHover(false);
          setActive(false);

          // 이벤트 리스너 정리
          window.removeEventListener("mousemove", handleMouseMove);
          window.removeEventListener("mouseup", handleMouseUp);
        });
      }}
    >
      {/* 구분선 시각적 표시 */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 border-black/10 transition-[background-color]",
          // 수직/수평에 따른 위치 및 스타일 조정
          vertical
            ? "top-1/2 -translate-y-1/2 border-b" // 수직 구분선 (가로 줄)
            : "left-1/2 -translate-x-1/2 border-r", // 수평 구분선 (세로 줄)
          // 호버나 활성 상태일 때 강조 스타일
          (hover || active) && "bg-primary/90 size-full border-none",
        )}
      />
      {/* 드래그 중일 때 전체 화면에 투명 오버레이 추가 (다른 요소의 이벤트 차단) */}
      {/* {active && <Overlay className="!bg-transparent" />} */}
    </div>
  );
}

export default SplitViewHandler;
