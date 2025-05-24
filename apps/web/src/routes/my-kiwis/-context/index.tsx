import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
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
}

export function KiwisProvider({ children }: KiwisProviderProps) {
  const [kiwis, setKiwis] = useState<Kiwi[]>([]);

  const setNewKiwi = useCallback(
    (kiwi: Kiwi) => {
      setKiwis([...kiwis, kiwi]);
    },
    [kiwis],
  );

  useEffect(() => {}, []);

  const value = useMemo(
    () => ({
      kiwis,
      setKiwis,
      setNewKiwi,
    }),
    [kiwis, setNewKiwi],
  );

  return (
    <KiwisContext.Provider value={value}>{children}</KiwisContext.Provider>
  );
}
