import { Bookmark as BookmarkIcon, Trash2 } from "lucide-react";

import { useAtomValue, useSetAtom } from "@bookiwi/jotai";

import {
  bookAtom,
  bookmarksAtom,
  removeBookmarkAtom,
} from "#/routes/kiwi/-reader/atoms";
import { ParticipantIDBData } from "#/types/idb";
import { formatDate } from "#/utils/format-date";

function EmptyBookmarksView() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-muted/30 py-12 text-center">
      <BookmarkIcon className="mb-3 size-12 text-muted-foreground/60" />
      <p className="text-base font-medium text-muted-foreground">
        책갈피가 없습니다.
      </p>
      <p className="mt-1 max-w-[220px] text-sm text-muted-foreground/70">
        책을 읽으면서 중요한 부분을 책갈피로 저장하세요.
      </p>
    </div>
  );
}

interface BookmarkItemProps {
  bookmark: ParticipantIDBData["record"]["bookmarks"][number];
  index: number;
  navItemLabel: string;
  percentage: number;
  onClick: (cfi: string) => void;
  onRemove: (cfi: { start: string; end: string }) => void;
}

function BookmarkItem({
  bookmark,
  index,
  navItemLabel,
  percentage,
  onClick,
  onRemove,
}: BookmarkItemProps) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <li
      className="group relative flex w-full items-start gap-3 rounded-md border border-transparent p-3 text-left transition-all hover:border-border hover:bg-accent/40"
      onClick={() => onClick(bookmark.cfi.start)}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
      role="button"
    >
      <BookmarkIcon size={18} className="mt-0.5 text-primary" />
      <div className="flex-1">
        <p className="font-medium">책갈피 {index + 1}</p>
        {navItemLabel && (
          <p className="mt-0.5 text-sm text-muted-foreground">{navItemLabel}</p>
        )}
        <p className="mt-0.5 text-sm text-muted-foreground">{percentage}%</p>

        <p className="mt-1 text-xs font-medium text-muted-foreground/70">
          {formatDate(bookmark.createdAt)}
        </p>
      </div>
      <button
        type="button"
        className="absolute right-3 top-3 rounded-full p-1 opacity-0 transition-all hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(bookmark.cfi);
        }}
        aria-label="Remove bookmark"
      >
        <Trash2 size={16} />
      </button>
    </li>
  );
}

function BookmarksPanel() {
  const book = useAtomValue(bookAtom);
  const bookmarks = useAtomValue(bookmarksAtom);
  const removeBookmark = useSetAtom(removeBookmarkAtom);

  const handleBookmarkClick = (cfi: string) => {
    if (!book) return;
    book.rendition.display(cfi);
  };

  return (
    <div className="px-1">
      <h3 className="mb-5 text-lg font-semibold">책갈피</h3>
      {bookmarks.length === 0 ? (
        <EmptyBookmarksView />
      ) : (
        <ul className="space-y-2">
          {bookmarks.map((bookmark, index) => {
            if (!book) return null;
            const spineItem = book.spine.get(bookmark.cfi.start);
            const navItem = book.navigation.get(spineItem?.href || "");
            const percentage = Math.floor(
              book.locations.percentageFromCfi(bookmark.cfi.start) * 100,
            );

            return (
              <BookmarkItem
                key={bookmark.cfi.start}
                bookmark={bookmark}
                index={index}
                navItemLabel={navItem?.label || ""}
                percentage={percentage}
                onClick={handleBookmarkClick}
                onRemove={removeBookmark}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default BookmarksPanel;
