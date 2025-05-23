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

import { Record, BookmarkItem } from "#/types/book";

interface RecordContextType extends Record {
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
  record: Record;
}

export function RecordProvider({ children, record }: RecordProviderProps) {
  const { book } = useBook();
  const [currentCfiState, setCurrentCfiState] = useState(record.currentCfi);
  const [percentageState, setPercentageState] = useState<number | null>(null);

  // Convert legacy string[] bookmarks to BookmarkItem[] if needed
  const initialBookmarks = Array.isArray(record.bookmarks)
    ? record.bookmarks.map(
        (bookmark) =>
          typeof bookmark === "string"
            ? { cfi: bookmark, timestamp: Date.now() } // Convert string to BookmarkItem
            : bookmark, // Already a BookmarkItem
      )
    : [];

  const [bookmarksState, setBookmarksState] =
    useState<BookmarkItem[]>(initialBookmarks);
  const key = `${book?.key()}-record`;

  // 현재 전체 레코드 상태를 참조로 유지
  const recordRef = useRef<Record>({
    bookmarks: initialBookmarks,
    currentCfi: record.currentCfi,
    percentage: null,
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
        const newBookmarkItem: BookmarkItem = {
          cfi: newBookmarkCfi,
          timestamp: Date.now(),
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
