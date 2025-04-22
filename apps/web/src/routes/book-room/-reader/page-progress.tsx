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
    if (!book) return;

    // Track if user is dragging
    let isDragging = false;

    const handleTouchAndClick = () => {
      if (!isDragging) {
        setIsContentTouched((prev) => !prev);
      }
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
    book.rendition.on("rendered", () => {
      const contents = book.rendition.getContents() as unknown as Contents[];
      const iframe = contents[0]?.document;
      if (iframe) {
        iframe.addEventListener("click", handleTouchAndClick);

        // Add drag detection events
        iframe.addEventListener("mousedown", handleMouseDown);
        iframe.addEventListener("mousemove", handleMouseMove);
        iframe.addEventListener("touchstart", handleTouchStart);
        iframe.addEventListener("touchmove", handleTouchMove);
      }
    });

    // eslint-disable-next-line consistent-return
    return () => {
      if (book) {
        const contents = book.rendition.getContents() as unknown as Contents[];
        const iframe = contents[0]?.document;
        if (iframe) {
          iframe.removeEventListener("click", handleTouchAndClick);

          // Remove drag detection events
          iframe.removeEventListener("mousedown", handleMouseDown);
          iframe.removeEventListener("mousemove", handleMouseMove);
          iframe.removeEventListener("touchstart", handleTouchStart);
          iframe.removeEventListener("touchmove", handleTouchMove);
        }
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
