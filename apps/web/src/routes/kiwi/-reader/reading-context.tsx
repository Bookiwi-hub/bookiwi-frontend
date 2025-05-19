import { createContext, ReactNode, useContext, useMemo, useState } from "react";

interface ReadingContextType {
  currentSectionHref: string;
  setCurrentSectionHref: (currentSectionHref: string) => void;
}

const ReadingContext = createContext<ReadingContextType | undefined>(undefined);

export const useReading = () => {
  const context = useContext(ReadingContext);
  if (context === undefined) {
    throw new Error("useReading must be used within a ReadingProvider");
  }
  return context;
};

interface ReadingProviderProps {
  children: ReactNode;
}

export function ReadingProvider({ children }: ReadingProviderProps) {
  const [currentSectionHref, setCurrentSectionHref] = useState<string>("");

  const value = useMemo(
    () => ({
      currentSectionHref,
      setCurrentSectionHref,
    }),
    [currentSectionHref, setCurrentSectionHref],
  );

  return (
    <ReadingContext.Provider value={value}>{children}</ReadingContext.Provider>
  );
}
