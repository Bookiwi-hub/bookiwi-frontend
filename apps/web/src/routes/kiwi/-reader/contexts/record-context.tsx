import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
  useRef,
} from "react";

import { useBook } from "./book-context";

import { ReadingRecord, Bookmark } from "#/types/kiwi";

interface RecordContextType extends ReadingRecord {
  setCurrentCfi: (currentCfi: string) => void;
  setBookmark: (bookmark: string) => void;
  removeBookmark: (bookmark: string) => void;
}

const RecordContext = createContext<RecordContextType | undefined>(undefined);

export const useRecord = () => {
  const context = useContext(RecordContext);
  if (context === undefined) {
    throw new Error("useRecord must be used within a RecordProvider");
  }
  return context;
};

interface RecordProviderProps {
  children: ReactNode;
  readingRecord: ReadingRecord;
}

export function RecordProvider({
  children,
  readingRecord,
}: RecordProviderProps) {
  const { book } = useBook();
  const [currentCfiState, setCurrentCfiState] = useState(
    readingRecord.currentCfi,
  );
  const [percentageState, setPercentageState] = useState<number | null>(null);

  // // Convert legacy string[] bookmarks to BookmarkItem[] if needed
  // const initialBookmarks = Array.isArray(readingRecord.bookmarks)
  //   ? readingRecord.bookmarks.map(
  //       (bookmark) =>
  //         typeof bookmark === "string"
  //           ? { cfi: bookmark, createdAt:  } // Convert string to BookmarkItem
  //           : bookmark, // Already a BookmarkItem
  //     )
  //   : [];

  const [bookmarksState, setBookmarksState] = useState<Bookmark[]>(
    readingRecord.bookmarks,
  );
  const key = `${book?.key()}-readingRecord`;

  // 현재 전체 레코드 상태를 참조로 유지
  const recordRef = useRef<ReadingRecord>({
    bookmarks: readingRecord.bookmarks,
    currentCfi: readingRecord.currentCfi,
    percentage: readingRecord.percentage,
  });

  const setCurrentCfi = useCallback(
    (cfi: string) => {
      if (!book) return;
      setCurrentCfiState(cfi);
      const percent = Math.floor(book.locations.percentageFromCfi(cfi) * 100);
      setPercentageState(percent);

      recordRef.current = {
        ...recordRef.current,
        currentCfi: cfi,
        percentage: percent,
      };

      localStorage.setItem(key, JSON.stringify(recordRef.current));
    },
    [key, book],
  );

  const setBookmark = useCallback(
    (newBookmarkCfi: string) => {
      // Check if this bookmark CFI already exists
      const exists = bookmarksState.some(
        (bookmark) => bookmark.cfi === newBookmarkCfi,
      );

      if (!exists) {
        const newBookmarkItem: Bookmark = {
          cfi: newBookmarkCfi,
          createdAt: new Date().toISOString(),
        };

        const newBookmarks = [...bookmarksState, newBookmarkItem];
        setBookmarksState(newBookmarks);

        recordRef.current = {
          ...recordRef.current,
          bookmarks: newBookmarks,
        };

        localStorage.setItem(key, JSON.stringify(recordRef.current));
      }
    },
    [bookmarksState, key],
  );

  const removeBookmark = useCallback(
    (bookmarkCfiToRemove: string) => {
      const newBookmarks = bookmarksState.filter(
        (bookmark) => bookmark.cfi !== bookmarkCfiToRemove,
      );
      setBookmarksState(newBookmarks);

      recordRef.current = {
        ...recordRef.current,
        bookmarks: newBookmarks,
      };

      localStorage.setItem(key, JSON.stringify(recordRef.current));
    },
    [key, bookmarksState],
  );

  const value = useMemo(
    () => ({
      currentCfi: currentCfiState,
      setCurrentCfi,
      percentage: percentageState,
      bookmarks: bookmarksState,
      setBookmark,
      removeBookmark,
    }),
    [
      currentCfiState,
      setCurrentCfi,
      percentageState,
      bookmarksState,
      setBookmark,
      removeBookmark,
    ],
  );

  return (
    <RecordContext.Provider value={value}>{children}</RecordContext.Provider>
  );
}
