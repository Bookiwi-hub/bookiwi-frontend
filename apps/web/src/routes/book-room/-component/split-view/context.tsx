import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

import {
  ANNOTATION_PANE_SIZE_MIN,
  BOOK_PANE_SIZE_MIN,
} from "./constants/pane-size";
import useSplitViewPane from "./hooks/use-split-view-pane";

export interface PaneType {
  resize: (delta: number) => void;
  size?: number;
  setSize: Dispatch<SetStateAction<number | undefined>>;
}

interface SplitViewContextType {
  bookPane: PaneType;
  annotationPane: PaneType;
  splitViewWidth: number | undefined;
  setSplitViewWidth: Dispatch<SetStateAction<number | undefined>>;
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
  const [splitViewWidth, setSplitViewWidth] = useState<number | undefined>();

  const bookPane = useSplitViewPane({
    preferredSize: splitViewWidth,
    maxSize: splitViewWidth
      ? splitViewWidth - ANNOTATION_PANE_SIZE_MIN
      : undefined,
    minSize: BOOK_PANE_SIZE_MIN,
  });

  const annotationPane = useSplitViewPane({
    preferredSize: ANNOTATION_PANE_SIZE_MIN,
    maxSize: splitViewWidth ? splitViewWidth - BOOK_PANE_SIZE_MIN : undefined,
    minSize: ANNOTATION_PANE_SIZE_MIN,
  });

  const contextValue = useMemo(
    () => ({ bookPane, annotationPane, splitViewWidth, setSplitViewWidth }),
    [bookPane, annotationPane, splitViewWidth, setSplitViewWidth],
  );

  return (
    <SplitViewContext.Provider value={contextValue}>
      {children}
    </SplitViewContext.Provider>
  );
}
