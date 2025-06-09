import { useMemo } from "react";

import { useAtom, useAtomValue } from "@bookiwi/jotai";

import { bookAtom, isCenterTouchedAtom, percentageAtom } from "./atoms";

import { Slider } from "#/components/ui/slider";
import { cn } from "#/lib/utils";
import { throttle } from "#/utils/throttle";

function ReaderPageProgress() {
  const book = useAtomValue(bookAtom);
  const [isProgressBarOpen, setProgressBarOpen] = useAtom(isCenterTouchedAtom);
  const percentage = useAtomValue(percentageAtom);

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
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className="size-full" onClick={() => setProgressBarOpen(true)}>
      <div
        className={cn(
          "w-full space-y-2 px-3 pt-2 transition-opacity duration-200 bg-zinc-50",
          isProgressBarOpen ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="flex size-full justify-end text-sm text-black">
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

export default ReaderPageProgress;
