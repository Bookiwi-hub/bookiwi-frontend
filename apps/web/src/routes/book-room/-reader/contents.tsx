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
    },
    [book],
  );

  return <div ref={setViewerRef} {...props} />;
}

export { ReaderContents };
