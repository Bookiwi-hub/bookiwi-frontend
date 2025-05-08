import { useCallback } from "react";

import { useReader } from "../context";

import usePage from "./hooks/use-page";
import usePercentage from "./hooks/use-percentage";
import useToggle from "./hooks/use-toggle";

import { Slider } from "#/components/ui/slider";
import { cn } from "#/lib/utils";

function ReaderPageProgress() {
  const { book } = useReader();
  const { currentSection, page, total, callbackRef: pageRef } = usePage(book);
  const { isContentTouched, callbackRef: toggleRef } = useToggle(book);
  const { percentage, callbackRef: percentageRef } = usePercentage(book);

  const callbackRef = useCallback(
    (node: HTMLDivElement | null) => {
      pageRef(node);
      toggleRef(node);
      percentageRef(node);
    },
    [pageRef, toggleRef, percentageRef],
  );

  return (
    <div className="size-full" ref={callbackRef}>
      <div
        className={cn(
          "w-full space-y-2 px-3 transition-opacity duration-200",
          isContentTouched ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="flex size-full justify-between text-sm text-black">
          <div>
            <span>{currentSection || "이번 챕터"}</span>
            <span>{page && total ? ` ${page}/${total}` : ""}</span>
          </div>
          <span>{percentage || "계산 중입니다."}</span>
        </div>
        {percentage && <Slider className="w-full" />}
      </div>
    </div>
  );
}

export { ReaderPageProgress };
