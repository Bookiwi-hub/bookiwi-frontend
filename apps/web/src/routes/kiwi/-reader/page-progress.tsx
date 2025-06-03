import { useMemo } from "react";

import { Book } from "@bookiwi/epubjs";
import {
  bookAtom,
  currentLocationAtom,
  currentSectionAtom,
  isCenterTouchedAtom,
  useAtom,
  useAtomValue,
} from "@bookiwi/jotai";

import { useRecord } from "./contexts";

import { Slider } from "#/components/ui/slider";
import { cn } from "#/lib/utils";
import { throttle } from "#/utils/throttle";
import truncate from "#/utils/truncate";

const MAX_SECTION_LENGTH = 25;

const usePage = (book: Book | null) => {
  const currentSection = useAtomValue(currentSectionAtom);
  const currentLocation = useAtomValue(currentLocationAtom);

  if (!book || !currentSection || !currentLocation)
    return { currentTocLabel: null, currentPage: null, totalPages: null };

  const currentNavItem = book.navigation.get(currentSection.href);

  const currentTocLabel = truncate(
    currentNavItem?.label || "",
    MAX_SECTION_LENGTH,
  );
  const { page: currentPage, total: totalPages } = currentLocation.start
    .displayed || { page: 0, total: 0 };

  return { currentTocLabel, currentPage, totalPages };
};

function ReaderPageProgress() {
  const book = useAtomValue(bookAtom);
  const { currentTocLabel, currentPage, totalPages } = usePage(book);
  const [isProgressBarOpen, setProgressBarOpen] = useAtom(isCenterTouchedAtom);
  const { percentage } = useRecord();

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
        <div className="flex size-full justify-between text-sm text-black">
          <div>
            <span>{currentTocLabel || "이번 챕터"}</span>
            <span>
              {currentPage && totalPages ? ` ${currentPage}/${totalPages}` : ""}
            </span>
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

export default ReaderPageProgress;
