import { createContext, Dispatch, useContext, useMemo, useState } from "react";

export enum AnnotationPaneState {
  CLOSED,
  OPEN,
  PINNED,
}

interface AnnotationPaneContextType {
  paneState: AnnotationPaneState;
  setPaneState: Dispatch<React.SetStateAction<AnnotationPaneState>>;
  isOpen: boolean;
  isPinned: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  pin: () => void;
  unpin: () => void;
}

const AnnotationPaneContext = createContext<
  AnnotationPaneContextType | undefined
>(undefined);

export const useAnnotationPane = () => {
  const context = useContext(AnnotationPaneContext);
  if (context === undefined) {
    throw new Error(
      "useAnnotationPane must be used within a AnnotationPaneProvider",
    );
  }
  return context;
};

export function AnnotationPaneProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [paneState, setPaneState] = useState<AnnotationPaneState>(
    AnnotationPaneState.CLOSED,
  );

  const isOpen =
    paneState === AnnotationPaneState.OPEN ||
    paneState === AnnotationPaneState.PINNED;
  const isPinned = paneState === AnnotationPaneState.PINNED;

  const value = useMemo(() => {
    const open = () => setPaneState(AnnotationPaneState.OPEN);
    const close = () => setPaneState(AnnotationPaneState.CLOSED);
    const toggle = () =>
      setPaneState((prev) =>
        prev === AnnotationPaneState.CLOSED
          ? AnnotationPaneState.OPEN
          : AnnotationPaneState.CLOSED,
      );
    const pin = () => {
      if (isOpen) {
        setPaneState(AnnotationPaneState.PINNED);
      }
    };
    const unpin = () => {
      if (isPinned) {
        setPaneState(AnnotationPaneState.OPEN);
      }
    };

    return {
      paneState,
      setPaneState,
      isOpen,
      isPinned,
      open,
      close,
      toggle,
      pin,
      unpin,
    };
  }, [paneState, isOpen, isPinned]);

  return (
    <AnnotationPaneContext.Provider value={value}>
      {children}
    </AnnotationPaneContext.Provider>
  );
}
