import { createContext, Dispatch, useContext, useMemo, useState } from "react";

export enum AnnotationViewState {
  CLOSED,
  OPEN,
  PINNED,
}

interface AnnotationViewContextType {
  viewState: AnnotationViewState;
  setViewState: Dispatch<React.SetStateAction<AnnotationViewState>>;
  isOpen: boolean;
  isPinned: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  pin: () => void;
  unpin: () => void;
}

const AnnotationViewContext = createContext<
  AnnotationViewContextType | undefined
>(undefined);

export const useAnnotationView = () => {
  const context = useContext(AnnotationViewContext);
  if (context === undefined) {
    throw new Error(
      "useAnnotationView must be used within a AnnotationViewProvider",
    );
  }
  return context;
};

export function AnnotationViewProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [viewState, setViewState] = useState<AnnotationViewState>(
    AnnotationViewState.CLOSED,
  );

  const isOpen =
    viewState === AnnotationViewState.OPEN ||
    viewState === AnnotationViewState.PINNED;
  const isPinned = viewState === AnnotationViewState.PINNED;

  const value = useMemo(() => {
    const open = () => setViewState(AnnotationViewState.OPEN);
    const close = () => setViewState(AnnotationViewState.CLOSED);
    const toggle = () =>
      setViewState((prev) =>
        prev === AnnotationViewState.CLOSED
          ? AnnotationViewState.OPEN
          : AnnotationViewState.CLOSED,
      );
    const pin = () => {
      if (isOpen) {
        setViewState(AnnotationViewState.PINNED);
      }
    };
    const unpin = () => {
      if (isPinned) {
        setViewState(AnnotationViewState.OPEN);
      }
    };

    return {
      viewState,
      setViewState,
      isOpen,
      isPinned,
      open,
      close,
      toggle,
      pin,
      unpin,
    };
  }, [viewState, isOpen, isPinned]);

  return (
    <AnnotationViewContext.Provider value={value}>
      {children}
    </AnnotationViewContext.Provider>
  );
}
