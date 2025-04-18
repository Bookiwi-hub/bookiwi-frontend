import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  Dispatch,
  SetStateAction,
} from "react";

import {
  BOOK_PANE_SIZE_MIN,
  ANNOTATION_PANE_SIZE_MIN,
} from "./constants/pane-size";
import useSplitViewPane from "./hooks/use-split-view-pane";

export interface PaneType {
  resize: (delta: number) => void;
  size: number;
  setSize: Dispatch<SetStateAction<number>>;
}

interface SplitViewContextType {
  bookPane: PaneType;
  annotationPane: PaneType;
}

const SplitViewContext = createContext<SplitViewContextType | undefined>(
  undefined,
);

export function useSplitViewContext() {
  const context = useContext(SplitViewContext);
  if (context === undefined) {
    throw new Error(
      "useSplitView must be used within a SplitView Context provider",
    );
  }
  return context;
}

interface SplitViewProps {
  children: ReactNode;
}

export function SplitViewProvider({ children }: SplitViewProps) {
  const bookPane = useSplitViewPane({
    preferredSize: window.innerWidth,
    minSize: BOOK_PANE_SIZE_MIN,
    maxSize: window.innerWidth - ANNOTATION_PANE_SIZE_MIN,
  });

  const annotationPane = useSplitViewPane({
    preferredSize: ANNOTATION_PANE_SIZE_MIN,
    minSize: ANNOTATION_PANE_SIZE_MIN,
    maxSize: window.innerWidth - BOOK_PANE_SIZE_MIN,
  });

  const contextValue = useMemo(
    () => ({ bookPane, annotationPane }),
    [bookPane, annotationPane],
  );

  return (
    <SplitViewContext.Provider value={contextValue}>
      {children}
    </SplitViewContext.Provider>
  );
}
