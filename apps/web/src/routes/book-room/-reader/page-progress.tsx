/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect } from "react";

import { Contents } from "@bookiwi/epubjs";

import { useReader } from "./context";
import usePageInfo from "./hooks/use-page-info";

import { Slider } from "#/components/ui/slider";
import { cn } from "#/lib/utils";

function ReaderPageProgress() {
  const { page, total } = usePageInfo();

  const [isContentTouched, setIsContentTouched] = useState(false);
  const { book } = useReader();

  useEffect(() => {
    if (!book || !book.rendition) return;

    // Track if user is dragging
    let isDragging = false;
    const cleanupFunctions: Array<() => void> = [];

    const handleTouchAndClick = (e: MouseEvent | TouchEvent) => {
      // Check if there's any text selected
      const iframe = e.currentTarget as Document;
      const selection = iframe.getSelection();

      // Only toggle if not dragging and no text is selected
      if (!isDragging && (!selection || selection.toString().trim() === "")) {
        setIsContentTouched((prev) => !prev);
      }

      // Reset the dragging state
      isDragging = false;
    };

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

    // After the book is rendered, the iframe will be available
    const handleRendered = () => {
      try {
        // Contents[] 타입으로 명시적 캐스팅
        const contents =
          book.rendition.getContents() as unknown as Array<Contents>;
        if (contents && contents.length > 0) {
          const iframe = contents[0]?.document;
          if (iframe) {
            iframe.addEventListener("click", handleTouchAndClick);
            iframe.addEventListener("mousedown", handleMouseDown);
            iframe.addEventListener("mousemove", handleMouseMove);
            iframe.addEventListener("touchstart", handleTouchStart);
            iframe.addEventListener("touchmove", handleTouchMove);

            // 정리 함수 등록
            cleanupFunctions.push(() => {
              if (iframe) {
                try {
                  iframe.removeEventListener("click", handleTouchAndClick);
                  iframe.removeEventListener("mousedown", handleMouseDown);
                  iframe.removeEventListener("mousemove", handleMouseMove);
                  iframe.removeEventListener("touchstart", handleTouchStart);
                  iframe.removeEventListener("touchmove", handleTouchMove);
                } catch (e) {
                  console.error("Error removing event listeners:", e);
                }
              }
            });
          }
        }
      } catch (e) {
        console.error("Error handling rendered event:", e);
      }
    };

    // 이벤트 리스너 등록
    try {
      book.rendition.on("rendered", handleRendered);
    } catch (e) {
      console.error("Error adding rendered event listener:", e);
    }

    // 이미 렌더링된 상태라면 한번 실행
    try {
      const contents = book.rendition.getContents();
      if (contents && Array.isArray(contents) && contents.length > 0) {
        handleRendered();
      }
    } catch (e) {
      console.error("Error checking initial contents:", e);
    }

    // Cleanup
    // eslint-disable-next-line
    return () => {
      // 등록된 모든 이벤트 리스너 제거
      cleanupFunctions.forEach((cleanup) => {
        try {
          cleanup();
        } catch (e) {
          console.error("Error executing cleanup function:", e);
        }
      });

      // 렌더링 이벤트 제거
      try {
        if (
          book &&
          book.rendition &&
          typeof book.rendition.off === "function"
        ) {
          book.rendition.off("rendered", handleRendered);
        }
      } catch (e) {
        console.error("Error removing rendered event:", e);
      }
    };
  }, [book]);

  return (
    <div
      className="size-full"
      onClick={() => setIsContentTouched(true)}
      onTouchStart={() => setIsContentTouched(true)}
    >
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
