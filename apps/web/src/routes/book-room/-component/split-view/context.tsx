import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export interface PaneType {
  resize: (size: number) => void;
  size: number;
  setSize: (size: number) => void;
}

interface SplitViewContextType {
  paneMap: Map<string, PaneType>;
  registerPane(paneId: string, pane: PaneType): void;
  vertical: boolean;
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
  vertical?: boolean;
}

export function SplitViewProvider({
  children,
  vertical = false,
}: SplitViewProps) {
  // 등록된 뷰 맵 관리
  const [paneMap, setPaneMap] = useState(new Map<string, PaneType>());

  // 새 뷰 등록 함수
  const registerPane = useCallback((paneId: string, pane: PaneType) => {
    setPaneMap((map) => {
      map.set(paneId, pane);
      return new Map(map); // 새 맵 객체 생성하여 리렌더링 트리거
    });
  }, []);

  // Context value를 메모이제이션
  const contextValue = useMemo(
    () => ({ paneMap, registerPane, vertical }),
    [registerPane, paneMap, vertical],
  );

  return (
    <SplitViewContext.Provider value={contextValue}>
      {children}
    </SplitViewContext.Provider>
  );
}
