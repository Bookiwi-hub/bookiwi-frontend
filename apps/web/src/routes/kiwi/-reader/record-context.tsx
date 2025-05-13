import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { useBook } from "./book-context";

import { Record } from "#/types/reader";

interface RecordContextType extends Record {
  setLastCfi: (lastCfi: string) => void;
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
  lastCfi: string | null;
}

export function RecordProvider({ children, lastCfi }: RecordProviderProps) {
  const { book } = useBook();
  const [lastCfiState, setLastCfiState] = useState(lastCfi);
  const [percentageState, setPercentageState] = useState<number | null>(null);

  const key = book?.key();

  const setLastCfi = useCallback(
    (cfi: string) => {
      if (!book) return;
      setLastCfiState(cfi);
      const percent = Math.floor(book.locations.percentageFromCfi(cfi) * 100);
      setPercentageState(percent);
      localStorage.setItem(
        `${key}-record`,
        JSON.stringify({
          lastCfi: cfi,
          percentage: percent,
        }),
      );
    },
    [key, book],
  );

  const value = useMemo(
    () => ({
      lastCfi: lastCfiState,
      setLastCfi,
      percentage: percentageState,
    }),
    [lastCfiState, setLastCfi, percentageState],
  );

  return (
    <RecordContext.Provider value={value}>{children}</RecordContext.Provider>
  );
}
