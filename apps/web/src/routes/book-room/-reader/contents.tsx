import { useEffect, useRef, ComponentPropsWithoutRef } from "react";

import { useReader } from "./context";

function ReaderContents(props: ComponentPropsWithoutRef<"div">) {
  const viewerRef = useRef<HTMLDivElement>(null);
  const { book } = useReader();

  useEffect(() => {
    if (!viewerRef.current || !book) return;

    // Render the book in the viewer
    book.renderTo(viewerRef.current, {
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
  }, [book]);

  return <div ref={viewerRef} {...props} />;
}

export { ReaderContents };
