import { Bookmark } from "lucide-react";

import { EpubCFI } from "@bookiwi/epubjs";
import { useAtomValue, useSetAtom } from "@bookiwi/jotai";

import {
  bookmarksAtom,
  currentCfiAtom,
  currentLocationAtom,
  removeBookmarkAtom,
  setBookmarkAtom,
} from "../-reader/atoms";

interface Cfi {
  start: string;
  end: string;
}

const isCfiInRange = (cfi: Cfi, currentCfi: Cfi): boolean => {
  const cfiInstance = new EpubCFI();
  const isStartInRange =
    cfiInstance.compare(cfi.start, currentCfi.start) >= 0 &&
    cfiInstance.compare(cfi.start, currentCfi.end) <= 0;
  const isEndInRange =
    cfiInstance.compare(cfi.end, currentCfi.start) >= 0 &&
    cfiInstance.compare(cfi.end, currentCfi.end) <= 0;
  return isStartInRange || isEndInRange;
};

function BookmarkButton() {
  const currentCfi = useAtomValue(currentCfiAtom);
  const currentLocation = useAtomValue(currentLocationAtom);
  const bookmarks = useAtomValue(bookmarksAtom);
  const setBookmark = useSetAtom(setBookmarkAtom);
  const removeBookmark = useSetAtom(removeBookmarkAtom);

  const isBookmarked = currentLocation
    ? bookmarks.some((bookmark) =>
        isCfiInRange(bookmark.cfi, {
          start: currentLocation.start.cfi,
          end: currentLocation.end.cfi,
        }),
      )
    : false;

  const toggleBookmark = async () => {
    if (!currentCfi) return;

    if (isBookmarked) {
      await removeBookmark(currentCfi);
    } else {
      await setBookmark(currentCfi);
    }
  };

  return (
    <button
      type="button"
      className="flex items-center justify-center rounded-md p-2 hover:bg-gray-100"
      onClick={toggleBookmark}
      aria-label="Toggle bookmark"
      onMouseDown={(e) => e.preventDefault()}
    >
      <Bookmark
        size={22}
        fill={isBookmarked ? "currentColor" : "none"}
        className={isBookmarked ? "text-red-400" : ""}
      />
    </button>
  );
}

export default BookmarkButton;
