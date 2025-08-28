import { useMemo, useState } from "react";

import { useAtomValue } from "@bookiwi/jotai";

import { bookAtom, isCenterTouchedAtom, percentageAtom } from "../atoms";

import { Slider } from "#/components/ui/slider";
import { throttle } from "#/utils/throttle";

function ReaderPageProgress() {
  const isProgressBarOpen = useAtomValue(isCenterTouchedAtom);

  if (!isProgressBarOpen) return null;

  return <ProgressBar />;
}

function ProgressBar() {
  const book = useAtomValue(bookAtom);
  const storedPercentage = useAtomValue(percentageAtom);
  const [percentage, setPercentage] = useState(storedPercentage);

  const throttledDisplay = useMemo(() => {
    if (!book) return null;
    return throttle((value: number) => {
      const cfi = book.locations.cfiFromPercentage(value / 100);
      book.rendition.display(cfi);
    }, 200);
  }, [book]);

  const handleChangeSlider = (value: number[]) => {
    if (!book || value[0] === undefined || !throttledDisplay) return;
    throttledDisplay(value[0]);
    setPercentage(value[0]);
  };

  return (
    <div className="size-full">
      <div className="w-full space-y-2 bg-zinc-50 px-3 pt-2 transition-opacity duration-200">
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
