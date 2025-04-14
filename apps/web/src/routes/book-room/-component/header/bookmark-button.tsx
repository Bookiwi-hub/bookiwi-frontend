import { Bookmark } from "lucide-react";
import { useState } from "react";

function BookmarkButton() {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  return (
    <button
      type="button"
      className="flex items-center justify-center rounded-md p-2 hover:bg-gray-100"
      onClick={toggleBookmark}
      aria-label="Toggle bookmark"
    >
      <Bookmark size={22} fill={isBookmarked ? "currentColor" : "none"} />
    </button>
  );
}

export default BookmarkButton;
