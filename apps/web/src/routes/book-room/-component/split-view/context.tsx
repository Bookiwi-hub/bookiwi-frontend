import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export interface SplitViewType {
  key: string;
  resize?: (size: number) => void;
}

interface SplitViewContextType {
  viewMap: Map<string, SplitViewType>;
  registerView(key: string, view: SplitViewType): void;
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
  const [viewMap, setViewMap] = useState(new Map<string, SplitViewType>());

  // 새 뷰 등록 함수
  const registerView = useCallback((key: string, view: SplitViewType) => {
    setViewMap((map) => {
      map.set(key, view);
      return new Map(map); // 새 맵 객체 생성하여 리렌더링 트리거
    });
  }, []);

  // Context value를 메모이제이션
  const contextValue = useMemo(
    () => ({ viewMap, registerView, vertical }),
    [registerView, viewMap, vertical],
  );

  return (
    <SplitViewContext.Provider value={contextValue}>
      {children}
    </SplitViewContext.Provider>
  );
}
