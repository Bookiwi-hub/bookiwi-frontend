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

import { IDBStore } from "#/constants/idb";
import idb from "#/managers/idb";
import { ReadingRecord, Bookmark } from "#/types/kiwi";

interface RecordContextType extends ReadingRecord {
  setCurrentCfi: (currentCfi: string) => Promise<void>;
  setBookmark: (bookmark: string) => Promise<void>;
  removeBookmark: (bookmark: string) => Promise<void>;
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
  participantId: string;
}

export function RecordProvider({
  children,
  readingRecord,
  participantId,
}: RecordProviderProps) {
  const { book } = useBook();
  const [currentCfiState, setCurrentCfiState] = useState(
    readingRecord.currentCfi,
  );
  const [percentageState, setPercentageState] = useState<number | null>(null);

  const [bookmarksState, setBookmarksState] = useState<Bookmark[]>(
    readingRecord.bookmarks,
  );

  // 현재 전체 레코드 상태를 참조로 유지
  const recordRef = useRef<ReadingRecord>({
    bookmarks: readingRecord.bookmarks,
    currentCfi: readingRecord.currentCfi,
    percentage: readingRecord.percentage,
  });

  const updateIDBRecord = useCallback(
    async (record: ReadingRecord) => {
      await idb.update(IDBStore.ParticipantStore, participantId, {
        record,
      });
    },
    [participantId],
  );

  const setCurrentCfi = useCallback(
    async (cfi: string) => {
      if (!book) return;
      setCurrentCfiState(cfi);
      const percent = Math.floor(book.locations.percentageFromCfi(cfi) * 100);
      setPercentageState(percent);

      recordRef.current = {
        ...recordRef.current,
        currentCfi: cfi,
        percentage: percent,
      };

      await updateIDBRecord(recordRef.current);
    },
    [book, updateIDBRecord],
  );

  const setBookmark = useCallback(
    async (newBookmarkCfi: string) => {
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

        await updateIDBRecord(recordRef.current);
      }
    },
    [bookmarksState, updateIDBRecord],
  );

  const removeBookmark = useCallback(
    async (bookmarkCfiToRemove: string) => {
      const newBookmarks = bookmarksState.filter(
        (bookmark) => bookmark.cfi !== bookmarkCfiToRemove,
      );
      setBookmarksState(newBookmarks);

      recordRef.current = {
        ...recordRef.current,
        bookmarks: newBookmarks,
      };

      await updateIDBRecord(recordRef.current);
    },
    [bookmarksState, updateIDBRecord],
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
