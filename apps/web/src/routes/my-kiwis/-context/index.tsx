import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { Kiwi } from "#/types/kiwi";

interface KiwisContextType {
  kiwis: Kiwi[];
  setKiwis: (kiwis: Kiwi[]) => void;
  setNewKiwi: (kiwi: Kiwi) => void;
}

const KiwisContext = createContext<KiwisContextType | undefined>(undefined);

export const useKiwis = () => {
  const context = useContext(KiwisContext);
  if (context === undefined) {
    throw new Error("useKiwis must be used within a KiwisProvider");
  }
  return context;
};

interface KiwisProviderProps {
  children: ReactNode;
  kiwis: Kiwi[];
}

export function KiwisProvider({ children, kiwis }: KiwisProviderProps) {
  const [kiwisState, setKiwisState] = useState<Kiwi[]>(kiwis);

  const setNewKiwi = useCallback(
    (kiwi: Kiwi) => {
      setKiwisState([kiwi, ...kiwisState]);
    },
    [kiwisState],
  );

  const value = useMemo(
    () => ({
      kiwis: kiwisState,
      setKiwis: setKiwisState,
      setNewKiwi,
    }),
    [kiwisState, setNewKiwi],
  );

  return (
    <KiwisContext.Provider value={value}>{children}</KiwisContext.Provider>
  );
}
