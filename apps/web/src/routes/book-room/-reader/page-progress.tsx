import { useState, useCallback } from "react";

import { Contents } from "@bookiwi/epubjs";

import { useReader } from "./context";
import usePageInfo from "./hooks/use-page-info";

import { Slider } from "#/components/ui/slider";
import { cn } from "#/lib/utils";

function ReaderPageProgress() {
  const { page, total } = usePageInfo();

  const [isContentTouched, setIsContentTouched] = useState(false);
  const { book } = useReader();

  const setRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node || !book) return () => {};

      let iframe: Document | undefined;

      // Track if user is dragging
      let isDragging = false;
      const handleMouseDown = () => {
        isDragging = false;
      };
      const handleMouseMove = () => {
        isDragging = true;
      };
      const handleTouchStart = () => {
        isDragging = false;
      };
      const handleTouchMove = () => {
        isDragging = true;
      };

      const handleNodeClick = () => setIsContentTouched(true);
      const handleNodeTouchStart = () => setIsContentTouched(true);
      const handleTouchAndClick = (e: MouseEvent | TouchEvent) => {
        // Check if there's any text selected
        const target = e.currentTarget as Document;
        const selection = target.getSelection();

        // Only toggle if not dragging and no text is selected
        if (!isDragging && (!selection || selection.toString().trim() === "")) {
          setIsContentTouched((prev) => !prev);
        }

        // Reset the dragging state
        isDragging = false;
      };

      // After the book is rendered, the iframe will be available
      book.rendition.on("rendered", () => {
        const contents = book.rendition.getContents() as unknown as Contents[];
        iframe = contents[0]?.document;
        if (iframe) {
          iframe.addEventListener("click", handleTouchAndClick);

          // Add drag detection events
          iframe.addEventListener("mousedown", handleMouseDown);
          iframe.addEventListener("mousemove", handleMouseMove);
          iframe.addEventListener("touchstart", handleTouchStart);
          iframe.addEventListener("touchmove", handleTouchMove);
        }
      });

      node.addEventListener("click", handleNodeClick);
      node.addEventListener("touchstart", handleNodeTouchStart);

      const removeEventListeners = () => {
        if (iframe) {
          iframe.removeEventListener("click", handleTouchAndClick);
          iframe.removeEventListener("mousedown", handleMouseDown);
          iframe.removeEventListener("mousemove", handleMouseMove);
          iframe.removeEventListener("touchstart", handleTouchStart);
          iframe.removeEventListener("touchmove", handleTouchMove);
        }
        node.removeEventListener("click", handleNodeClick);
        node.removeEventListener("touchstart", handleNodeTouchStart);
      };

      return () => {
        removeEventListeners();
      };
    },
    [book],
  );

  return (
    <div className="size-full" ref={setRef}>
      <div
        className={cn(
          "w-full space-y-2 px-3 transition-opacity duration-200",
          isContentTouched ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="size-full text-center text-black">
          {page && total ? `${page}/${total}` : "페이지를 계산할 수 없습니다"}
        </div>
        {page && total && <Slider className="w-full" />}
      </div>
    </div>
  );
}

export { ReaderPageProgress };
