import { Bookmark, Trash2 } from "lucide-react";
import { useState } from "react";

import { useBook, useRecord } from "#/routes/kiwi/-reader";
import { formatDate } from "#/utils/format-date";

function BookmarksPanel() {
  const { book } = useBook();
  const { bookmarks, removeBookmark } = useRecord();
  const [hoveredBookmark, setHoveredBookmark] = useState<string | null>(null);

  const handleBookmarkClick = (cfi: string) => {
    if (!book) return;
    book.rendition.display(cfi);
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return formatDate(date.toISOString());
  };

  return (
    <div className="px-1">
      <h3 className="mb-5 text-lg font-semibold">책갈피</h3>
      {bookmarks.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg bg-muted/30 py-12 text-center">
          <Bookmark className="mb-3 size-12 text-muted-foreground/60" />
          <p className="text-base font-medium text-muted-foreground">
            책갈피가 없습니다.
          </p>
          <p className="mt-1 max-w-[220px] text-sm text-muted-foreground/70">
            책을 읽으면서 중요한 부분을 책갈피로 저장하세요.
          </p>
        </div>
      ) : (
        <ul className="space-y-2">
          {bookmarks.map((bookmark, index) => {
            const spineItem = book?.spine.get(bookmark.cfi);
            const navItem = book?.navigation.get(spineItem?.href || "");

            return (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events
              <li
                key={bookmark.cfi}
                className="relative flex w-full items-start gap-3 rounded-md border border-transparent p-3 text-left transition-all hover:border-border hover:bg-accent/40"
                onClick={() => handleBookmarkClick(bookmark.cfi)}
                onMouseEnter={() => setHoveredBookmark(bookmark.cfi)}
                onMouseLeave={() => setHoveredBookmark(null)}
                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                role="button"
              >
                <Bookmark size={18} className="mt-0.5 text-primary" />
                <div className="flex-1">
                  <p className="font-medium">책갈피 {index + 1}</p>
                  {navItem?.label && (
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {navItem.label}
                    </p>
                  )}
                  {bookmark.timestamp && (
                    <p className="mt-1 text-xs font-medium text-muted-foreground/70">
                      {formatTimestamp(bookmark.timestamp)}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  className={`absolute right-3 top-3 rounded-full p-1 transition-all ${
                    hoveredBookmark === bookmark.cfi
                      ? "opacity-100 hover:bg-destructive/10 hover:text-destructive"
                      : "opacity-0"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeBookmark(bookmark.cfi);
                  }}
                  aria-label="Remove bookmark"
                >
                  <Trash2 size={16} />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default BookmarksPanel;
