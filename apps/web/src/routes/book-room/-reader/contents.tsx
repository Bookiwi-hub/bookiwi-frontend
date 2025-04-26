import { useCallback, ComponentPropsWithoutRef } from "react";

import { useReader } from "./context";

function ReaderContents(props: ComponentPropsWithoutRef<"div">) {
  const { book } = useReader();

  const setViewerRef = useCallback(
    (node: HTMLDivElement | null) => {
      // DOM 요소가 없거나 book이 없으면 아무것도 하지 않음
      if (!node || !book) return;

      // Render the book in the viewer
      book.renderTo(node, {
        width: "100%",
        height: "100%",
        allowScriptedContent: true,
      });

      // Display the first page
      book.rendition.display();

      // eslint-disable-next-line
      return () => {
        // 컴포넌트 언마운트 시 rendition 정리
        if (book && book.rendition) {
          try {
            book.rendition.destroy();
          } catch (e) {
            console.error("Error destroying rendition:", e);
          }
        }
      };
    },
    [book], // book이 변경될 때만 콜백 재생성
  );

  return <div ref={setViewerRef} {...props} />;
}

export { ReaderContents };
