import { Bookmark } from "lucide-react";

import { useRecord } from "../-reader";

function BookmarkButton() {
  const { currentCfi, bookmarks, setBookmark, removeBookmark } = useRecord();
  const isBookmarked = currentCfi ? bookmarks.includes(currentCfi) : false;

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
