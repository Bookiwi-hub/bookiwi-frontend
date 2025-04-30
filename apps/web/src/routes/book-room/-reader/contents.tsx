import { useCallback, ComponentPropsWithoutRef, useRef } from "react";

import { useReader } from "./context";

function ReaderContents(props: ComponentPropsWithoutRef<"div">) {
  const { book } = useReader();
  const prevSize = useRef(0);

  const setViewerRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node || !book) return () => {};

      const rendition = book.renderTo(node, {
        width: "100%",
        height: "100%",
        allowScriptedContent: true, // 자바스크립트 실행 허용
      });

      rendition.display();

      const observer = new ResizeObserver(([e]) => {
        const size = e?.contentRect.width ?? 0;

        if (size !== 0 && prevSize.current !== 0) {
          rendition.resize();
        }

        prevSize.current = size;
      });

      observer.observe(node);

      return () => {
        observer.disconnect();
      };
    },
    [book],
  );

  return <div ref={setViewerRef} {...props} />;
}

export { ReaderContents };
