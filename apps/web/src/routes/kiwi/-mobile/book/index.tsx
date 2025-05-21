import { useCallback } from "react";

import { Rendition } from "@bookiwi/epubjs";

import { ReaderContents } from "../../-reader";

/**
 * 클릭 이벤트 처리
 * EventListener는 (event) 하나만 받는 함수를 요구하는데
 * rendition 객체도 같이 사용해야 하기 때문에 클로저를 통해 함수 생성
 * 참조도 같으니 메모리 누수 없음
 */
function createIframeClickHandler(rendition: Rendition) {
  return function iframeClickHandler(e: MouseEvent) {
    const { clientX } = e;
    const width = window.innerWidth;

    if (clientX < width / 3) {
      rendition.prev();
    } else if (clientX > (2 * width) / 3) {
      rendition.next();
    } else {
      rendition.spread("none");
    }
  };
}
// 스와이프 이벤트 처리
function createIframeTouchHandler(rendition: Rendition) {
  let touchStartX = 0;
  let touchStartY = 0;

  return {
    onTouchStart(e: TouchEvent) {
      const touch = e.touches[0];
      if (!touch) return;
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
    },
    onTouchEnd(e: TouchEvent) {
      const touch = e.changedTouches[0];
      if (!touch) return;
      const dx = touch.clientX - touchStartX;
      const dy = touch.clientY - touchStartY;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);

      // 스와이프 판정 기준 (가로 30px 이상, 세로 이동보다 가로 이동이 큼)
      if (absDx > 30 && absDx > absDy) {
        if (dx > 0) {
          rendition.prev();
        } else {
          rendition.next();
        }
      } else if (absDx < 10 && absDy < 10) {
        rendition.spread("none");
      }
    },
  };
}

function MobileBook() {
  const handleRenditionReady = useCallback((rendition: Rendition) => {
    rendition.on("rendered", (_rendition: Rendition, iframe: Window) => {
      if (!iframe || !iframe.document) {
        return;
      }

      const doc = iframe.document;

      const clickHandler = createIframeClickHandler(rendition);
      const touchHandler = createIframeTouchHandler(rendition);

      // 기존 이벤트 제거
      doc.removeEventListener("click", clickHandler);
      doc.removeEventListener("touchstart", touchHandler.onTouchStart);
      doc.removeEventListener("touchend", touchHandler.onTouchEnd);

      // 클릭 이벤트 등록
      doc.addEventListener("click", clickHandler);
      doc.addEventListener("touchstart", touchHandler.onTouchStart);
      doc.addEventListener("touchend", touchHandler.onTouchEnd);
    });
  }, []);

  return (
    <section className="relative flex size-full flex-col">
      <ReaderContents
        className="size-full"
        onRenditionReady={handleRenditionReady}
      />
    </section>
  );
}

export default MobileBook;
