import { useCallback, ComponentPropsWithoutRef } from "react";

import { useBook } from "./book-context";
import {
  useObserver,
  useKeydown,
  useRendered,
  useRelocated,
  useRender,
} from "./hooks";
import { defaultStyle } from "./styles";

function ReaderContents(props: ComponentPropsWithoutRef<"div">) {
  const { book } = useBook();
  const render = useRender();
  const handleRendered = useRendered();
  const handleRelocated = useRelocated();
  const handleKeyDown = useKeydown();
  const observer = useObserver();

  const setViewerRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node || !book) return () => {};

      const rendition = render(node, book);

      globalThis.addEventListener("keydown", handleKeyDown);
      rendition.on("keydown", handleKeyDown);

      // 기본 스타일 적용
      rendition.themes.default(defaultStyle);

      // 책 이동 시 이벤트 등록(현재 위치 업데이트)
      rendition.on("relocated", handleRelocated);

      // 책 섹션 렌더링 완료 시 이벤트 등록(커스텀 스타일 적용 및 섹션 업데이트)
      rendition.on("rendered", handleRendered);

      // 책 크기 변경 시 이벤트 등록(책 크기 재조정)
      observer.observe(node);

      return () => {
        observer.disconnect();
        globalThis.removeEventListener("keydown", handleKeyDown);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [book],
  );

  return <div ref={setViewerRef} {...props} />;
}

export default ReaderContents;
