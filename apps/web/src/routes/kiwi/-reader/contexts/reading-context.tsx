import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

import { Location } from "@bookiwi/epubjs";
import Section from "@bookiwi/epubjs/types/section";

interface ReadingContextType {
  currentSection: Section | null;
  currentLocation: Location | null;
  isProgressBarOpen: boolean;
  setCurrentLocation: Dispatch<SetStateAction<Location | null>>;
  setCurrentSection: Dispatch<SetStateAction<Section | null>>;
  setProgressBarOpen: Dispatch<SetStateAction<boolean>>;
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
  const [currentSection, setCurrentSection] = useState<Section | null>(null);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [isProgressBarOpen, setProgressBarOpen] = useState(false);

  const value = useMemo(
    () => ({
      currentSection,
      setCurrentSection,
      currentLocation,
      setCurrentLocation,
      isProgressBarOpen,
      setProgressBarOpen,
    }),
    [currentSection, currentLocation, isProgressBarOpen],
  );

  return (
    <ReadingContext.Provider value={value}>{children}</ReadingContext.Provider>
  );
}
