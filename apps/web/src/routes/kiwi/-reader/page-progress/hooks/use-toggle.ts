import { useCallback, useState } from "react";

import { Book } from "@bookiwi/epubjs";
import Section from "@bookiwi/epubjs/types/section";

const useToggle = (book: Book | null) => {
  const [isContentTouched, setIsContentTouched] = useState(false);

  const callbackRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node || !book) return () => {};

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

      const handleRendered = (section: Section) => {
        const iframe = section.document;
        if (iframe) {
          iframe.addEventListener("click", handleTouchAndClick);

          // Add drag detection events
          iframe.addEventListener("mousedown", handleMouseDown);
          iframe.addEventListener("mousemove", handleMouseMove);
          iframe.addEventListener("touchstart", handleTouchStart);
          iframe.addEventListener("touchmove", handleTouchMove);
        }
      };

      book.rendition.on("rendered", handleRendered);

      node.addEventListener("click", handleNodeClick);
      node.addEventListener("touchstart", handleNodeTouchStart);

      return () => {
        node.removeEventListener("click", handleNodeClick);
        node.removeEventListener("touchstart", handleNodeTouchStart);
      };
    },
    [book],
  );

  return { isContentTouched, callbackRef };
};

export default useToggle;
