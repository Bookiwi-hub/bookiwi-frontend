import { Bookmark } from "lucide-react";

import { useAtomValue, useSetAtom } from "@bookiwi/jotai";

import {
  bookmarksAtom,
  currentCfiAtom,
  removeBookmarkAtom,
  setBookmarkAtom,
} from "../-reader/atoms";

function BookmarkButton() {
  const currentCfi = useAtomValue(currentCfiAtom);
  const bookmarks = useAtomValue(bookmarksAtom);
  const setBookmark = useSetAtom(setBookmarkAtom);
  const removeBookmark = useSetAtom(removeBookmarkAtom);
  const isBookmarked = currentCfi
    ? bookmarks.some((bookmark) => bookmark.cfi === currentCfi)
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
