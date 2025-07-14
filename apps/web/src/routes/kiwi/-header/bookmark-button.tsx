import { Bookmark } from "lucide-react";

import { EpubCFI } from "@bookiwi/epubjs";
import { useAtomValue, useSetAtom } from "@bookiwi/jotai";

import {
  bookmarksAtom,
  Cfi,
  currentCfiAtom,
  currentLocationAtom,
  removeBookmarkAtom,
  addBookmarkAtom,
} from "../-reader/atoms";

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
  const addBookmark = useSetAtom(addBookmarkAtom);
  const removeBookmark = useSetAtom(removeBookmarkAtom);

  const isBookmarked = currentLocation
    ? bookmarks.some((bookmark) =>
        isCfiInRange(
          { start: bookmark.cfiStart, end: bookmark.cfiEnd },
          {
            start: currentLocation.start.cfi,
            end: currentLocation.end.cfi,
          },
        ),
      )
    : false;

  const toggleBookmark = async () => {
    if (!currentCfi) return;
    if (isBookmarked) {
      await removeBookmark(currentCfi);
    } else {
      await addBookmark(currentCfi);
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
