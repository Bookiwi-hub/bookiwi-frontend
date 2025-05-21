import { useCallback } from "react";

import { Rendition } from "@bookiwi/epubjs";

import { ReaderContents } from "../../-reader";

/**
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

function MobileBook() {
  const handleRenditionReady = useCallback((rendition: Rendition) => {
    rendition.on("rendered", (_rendition: Rendition, iframe: Window) => {
      if (!iframe || !iframe.document) {
        return;
      }

      const doc = iframe.document;

      const clickHandler = createIframeClickHandler(rendition);

      // 기존 이벤트 제거
      doc.removeEventListener("click", clickHandler);

      // 클릭 이벤트 등록
      doc.addEventListener("click", clickHandler);
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
