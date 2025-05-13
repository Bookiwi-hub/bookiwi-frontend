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
  setCurrentCfi: (currentCfi: string) => void;
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
  currentCfi: string | null;
}

export function RecordProvider({ children, currentCfi }: RecordProviderProps) {
  const { book } = useBook();
  const [currentCfiState, setCurrentCfiState] = useState(currentCfi);
  const [percentageState, setPercentageState] = useState<number | null>(null);

  const key = book?.key();

  const setCurrentCfi = useCallback(
    (cfi: string) => {
      if (!book) return;
      setCurrentCfiState(cfi);
      const percent = Math.floor(book.locations.percentageFromCfi(cfi) * 100);
      setPercentageState(percent);
      localStorage.setItem(
        `${key}-record`,
        JSON.stringify({
          currentCfi: cfi,
          percentage: percent,
        }),
      );
    },
    [key, book],
  );

  const value = useMemo(
    () => ({
      currentCfi: currentCfiState,
      setCurrentCfi,
      percentage: percentageState,
    }),
    [currentCfiState, setCurrentCfi, percentageState],
  );

  return (
    <RecordContext.Provider value={value}>{children}</RecordContext.Provider>
  );
}
