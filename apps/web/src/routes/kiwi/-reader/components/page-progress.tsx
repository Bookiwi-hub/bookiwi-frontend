import { useMemo, useState, useCallback } from "react";

import { useAtom, useAtomValue } from "@bookiwi/jotai";

import { bookAtom, isCenterTouchedAtom, percentageAtom } from "../atoms";

import { Slider } from "#/components/ui/slider";
import { cn } from "#/lib/utils";
import { throttle } from "#/utils/throttle";

function ReaderPageProgress() {
  const book = useAtomValue(bookAtom);
  const [isProgressBarOpen, setProgressBarOpen] = useAtom(isCenterTouchedAtom);
  const percentage = useAtomValue(percentageAtom);
  const [localPercentage, setLocalPercentage] = useState<number | null>(null);

  // 작은 책에서의 부드러운 슬라이더 동작을 위한 로직
  const { sliderStep, totalLocations } = useMemo(() => {
    if (!book?.locations) return { sliderStep: 1, totalLocations: 0 };

    const total = book.locations.length();
    // 총 위치가 100개 미만인 경우 더 세밀한 스텝 사용
    const step = total < 100 ? 100 / total : 1;

    return {
      sliderStep: Math.max(0.1, step),
      totalLocations: total,
    };
  }, [book?.locations]);

  const throttledDisplay = useMemo(() => {
    if (!book) return null;
    return throttle((value: number) => {
      // 작은 책의 경우 가장 가까운 실제 위치로 스냅
      let targetPercentage = value / 100;

      if (totalLocations < 100) {
        const locationIndex = Math.round(targetPercentage * totalLocations);
        targetPercentage = locationIndex / totalLocations;
      }

      const cfi = book.locations.cfiFromPercentage(targetPercentage);
      book.rendition.display(cfi);
    }, 150);
  }, [book, totalLocations]);

  const handleChangeSlider = useCallback(
    (value: number[]) => {
      if (!book || !value[0] || !throttledDisplay) return;

      const newValue = value[0];
      setLocalPercentage(newValue);
      throttledDisplay(newValue);
    },
    [book, throttledDisplay],
  );

  // 로컬 퍼센티지가 있으면 우선 사용, 없으면 실제 퍼센티지 사용
  const displayPercentage = localPercentage ?? percentage;

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className="size-full" onClick={() => setProgressBarOpen(true)}>
      <div
        className={cn(
          "w-full space-y-2 px-3 pt-2 transition-opacity duration-200 bg-zinc-50",
          isProgressBarOpen ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="flex size-full items-center justify-end text-sm text-black">
          <span>{`${Math.round(displayPercentage || 0)}%`}</span>
        </div>
        {displayPercentage !== null && (
          <Slider
            className="w-full"
            value={[displayPercentage]}
            onValueChange={handleChangeSlider}
            step={sliderStep}
            min={0}
            max={100}
          />
        )}
      </div>
    </div>
  );
}

export default ReaderPageProgress;
