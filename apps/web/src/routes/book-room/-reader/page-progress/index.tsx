import { useCallback } from "react";

import { useReader } from "../context";

import usePageInfo from "./hooks/use-page-info";
import useToggle from "./hooks/use-toggle";

import { Slider } from "#/components/ui/slider";
import { cn } from "#/lib/utils";

function ReaderPageProgress() {
  const { book } = useReader();
  const { page, total, callbackRef: pageRef } = usePageInfo(book);
  const { isContentTouched, callbackRef: toggleRef } = useToggle(book);
  const callbackRef = useCallback(
    (node: HTMLDivElement | null) => {
      pageRef(node);
      toggleRef(node);
    },
    [pageRef, toggleRef],
  );

  return (
    <div className="size-full" ref={callbackRef}>
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
