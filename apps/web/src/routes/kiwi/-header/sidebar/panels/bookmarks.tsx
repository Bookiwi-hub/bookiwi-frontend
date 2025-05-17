import { Bookmark, Trash2 } from "lucide-react";
import { useState } from "react";

import { useBook, useRecord } from "#/routes/kiwi/-reader";

function BookmarksPanel() {
  const { book } = useBook();
  const { bookmarks, removeBookmark } = useRecord();
  const [hoveredBookmark, setHoveredBookmark] = useState<string | null>(null);

  const handleBookmarkClick = (cfi: string) => {
    if (!book) return;
    book.rendition.display(cfi);
  };

  return (
    <div>
      <h3 className="mb-4 text-lg font-medium">책갈피</h3>
      {bookmarks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <Bookmark className="mb-2 size-10 text-gray-400" />
          <p className="text-gray-500">책갈피가 없습니다.</p>
          <p className="text-sm text-gray-400">
            책을 읽으면서 중요한 부분을 책갈피로 저장하세요.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {bookmarks.map((cfi, index) => (
            <li key={cfi} className="relative">
              <button
                type="button"
                className="flex w-full items-start gap-2 rounded-md p-2 text-left transition-colors hover:bg-accent/50"
                onClick={() => handleBookmarkClick(cfi)}
                onMouseEnter={() => setHoveredBookmark(cfi)}
                onMouseLeave={() => setHoveredBookmark(null)}
              >
                <Bookmark size={16} className="mt-1 text-primary" />
                <div>
                  <p className="font-medium">책갈피 {index + 1}</p>
                  <p className="text-sm text-muted-foreground">
                    {/* {pageNumber} 페이지 · {percentage}% */}
                  </p>
                </div>
              </button>
              {hoveredBookmark === cfi && (
                <button
                  type="button"
                  className="absolute right-2 top-2 p-1 text-gray-500 hover:text-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeBookmark(cfi);
                  }}
                  aria-label="Remove bookmark"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookmarksPanel;
