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

const isCfiInRange = (
  cfi: string,
  startCfi: string,
  endCfi: string,
): boolean => {
  const cfiInstance = new EpubCFI();
  return (
    cfiInstance.compare(cfi, startCfi) >= 0 &&
    cfiInstance.compare(cfi, endCfi) <= 0
  );
};

function BookmarkButton() {
  const currentCfi = useAtomValue(currentCfiAtom);
  const currentLocation = useAtomValue(currentLocationAtom);
  const bookmarks = useAtomValue(bookmarksAtom);
  const setBookmark = useSetAtom(setBookmarkAtom);
  const removeBookmark = useSetAtom(removeBookmarkAtom);

  const isBookmarked = currentLocation
    ? bookmarks.some((bookmark) =>
        isCfiInRange(
          bookmark.cfi.start,
          currentLocation.start.cfi,
          currentLocation.end.cfi,
        ),
      )
    : false;

  const toggleBookmark = () => {
    if (!currentCfi) return;

    if (isBookmarked) {
      removeBookmark(currentCfi);
    } else {
      setBookmark(currentCfi);
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
