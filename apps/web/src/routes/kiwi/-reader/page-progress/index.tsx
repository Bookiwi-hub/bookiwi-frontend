import { useCallback, useMemo } from "react";

import { useBook } from "../book-context";
import { useRecord } from "../record-context";

import usePage from "./hooks/use-page";
import useToggle from "./hooks/use-toggle";

import { Slider } from "#/components/ui/slider";
import { cn } from "#/lib/utils";
import { throttle } from "#/utils/throttle";

function ReaderPageProgress() {
  const { book } = useBook();
  const {
    currentSectionLabel,
    page,
    total,
    callbackRef: pageRef,
  } = usePage(book);
  const { isContentTouched, callbackRef: toggleRef } = useToggle(book);
  const { percentage } = useRecord();

  const callbackRef = useCallback(
    (node: HTMLDivElement | null) => {
      pageRef(node);
      toggleRef(node);
    },
    [pageRef, toggleRef],
  );

  const throttledDisplay = useMemo(() => {
    if (!book) return null;
    return throttle((value: number) => {
      if (!book || !value) return;
      const cfi = book.locations.cfiFromPercentage(value / 100);
      book.rendition.display(cfi);
    }, 200);
  }, [book]);

  const handleChangeSlider = (value: number[]) => {
    if (!book || !value[0] || !throttledDisplay) return;
    throttledDisplay(value[0]);
  };

  return (
    <div className="size-full" ref={callbackRef}>
      <div
        className={cn(
          "w-full space-y-2 px-3 pt-2 transition-opacity duration-200 bg-zinc-50",
          isContentTouched ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="flex size-full justify-between text-sm text-black">
          <div>
            <span>{currentSectionLabel || "이번 챕터"}</span>
            <span>{page && total ? ` ${page}/${total}` : ""}</span>
          </div>
          <span>{`${percentage}%`}</span>
        </div>
        {percentage !== null && (
          <Slider
            className="w-full"
            value={[percentage]}
            onValueChange={handleChangeSlider}
          />
        )}
      </div>
    </div>
  );
}

export { ReaderPageProgress };
