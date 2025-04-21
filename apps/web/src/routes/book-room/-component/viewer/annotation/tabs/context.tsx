import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

export enum TabType {
  HIGHLIGHT = "highlight",
  HIGHLIGHT_LIST = "highlightList",
}

interface AnnotationTabContextType {
  tabState: TabType;
  setTabState: Dispatch<SetStateAction<TabType>>;
  highlightId: number;
  setHighlightId: Dispatch<SetStateAction<number>>;
}

const AnnotationTabContext = createContext<
  AnnotationTabContextType | undefined
>(undefined);

export const useAnnotationTab = () => {
  const context = useContext(AnnotationTabContext);
  if (context === undefined) {
    throw new Error(
      "useAnnotationTab must be used within a AnnotationTabProvider",
    );
  }
  return context;
};

export function AnnotationTabProvider({ children }: { children: ReactNode }) {
  const [tabState, setTabState] = useState<TabType>(TabType.HIGHLIGHT);
  const [highlightId, setHighlightId] = useState<number>(0);

  const value = useMemo(
    () => ({
      tabState,
      setTabState,
      highlightId,
      setHighlightId,
    }),
    [tabState, highlightId],
  );

  return (
    <AnnotationTabContext.Provider value={value}>
      {children}
    </AnnotationTabContext.Provider>
  );
}
