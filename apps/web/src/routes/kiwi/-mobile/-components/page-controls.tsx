import { ReactNode, useCallback, useRef } from "react";

import { useReader } from "../../-reader/context";

interface PageControlsProps {
  children: ReactNode;
}

/**
 * 모바일용 페이지 컨트롤 컴포넌트
 * - 왼쪽 화면 클릭: 이전 페이지
 * - 오른쪽 화면 클릭: 다음 페이지
 * - 중앙 영역: 터치 이벤트 통과 (프로그레스 바용)
 * - 스와이프 기능: 좌우 스와이프로 페이지 이동
 */
function PageControls({ children }: PageControlsProps) {
  const { book } = useReader();
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  // 이전 페이지로 이동
  const goToPrevPage = useCallback(() => {
    if (book && book.rendition) {
      book.rendition.prev();
    }
  }, [book]);

  // 다음 페이지로 이동
  const goToNextPage = useCallback(() => {
    if (book && book.rendition) {
      book.rendition.next();
    }
  }, [book]);

  // 터치 시작 시 좌표 저장
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches && e.touches.length > 0) {
      const touch = e.touches[0];
      if (touch) {
        touchStartX.current = touch.clientX;
        touchStartY.current = touch.clientY;
      }
    }
  }, []);

  // 터치 종료 시 스와이프 동작 실행
  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      // 시작 좌표가 없으면 처리하지 않음
      if (!touchStartX.current || !touchStartY.current) return;

      if (e.changedTouches && e.changedTouches.length > 0) {
        const touch = e.changedTouches[0];
        if (!touch) return;

        const touchEndX = touch.clientX;
        const touchEndY = touch.clientY;

        // 수평/수직 이동 거리 계산
        const diffX = touchStartX.current - touchEndX;
        const diffY = touchStartY.current - touchEndY;

        // 스와이프 최소 거리 (픽셀)
        const minSwipeDistance = 50;

        // 수평 스와이프가 수직보다 클 때만 스와이프로 인식
        if (
          Math.abs(diffX) > Math.abs(diffY) &&
          Math.abs(diffX) > minSwipeDistance
        ) {
          // 왼쪽으로 스와이프: 다음 페이지
          if (diffX > 0) {
            goToNextPage();
          }
          // 오른쪽으로 스와이프: 이전 페이지
          else {
            goToPrevPage();
          }
        }
      }

      // 터치 좌표 초기화
      touchStartX.current = null;
      touchStartY.current = null;
    },
    [goToNextPage, goToPrevPage],
  );

  return (
    <div
      className="relative size-full overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 페이지 컨트롤 영역 - 좌우 영역만 배치 */}
      <div className="pointer-events-none absolute inset-0 z-10">
        {/* 왼쪽 영역 - 이전 페이지 */}
        <button
          type="button"
          className="pointer-events-auto absolute left-0 top-0 h-full w-1/3 cursor-pointer bg-transparent"
          onClick={goToPrevPage}
          onMouseDown={(e) => e.preventDefault()}
          aria-label="이전 페이지"
          tabIndex={-1}
        />

        {/* 오른쪽 영역 - 다음 페이지 */}
        <button
          type="button"
          className="pointer-events-auto absolute right-0 top-0 h-full w-1/3 cursor-pointer bg-transparent"
          onClick={goToNextPage}
          onMouseDown={(e) => e.preventDefault()}
          aria-label="다음 페이지"
          tabIndex={-1}
        />
      </div>

      {/* 실제 컨텐츠 영역 */}
      <div className="size-full overflow-hidden">{children}</div>
    </div>
  );
}

export { PageControls };
