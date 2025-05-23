import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useMemo,
  useReducer,
} from "react";

import { initialState, kiwiReducer, KiwiAction, KiwiState } from "./reducer";

interface KiwiContextType {
  state: KiwiState;
  dispatch: Dispatch<KiwiAction>;
}

const KiwiContext = createContext<KiwiContextType | undefined>(undefined);

export const useCreateKiwi = () => {
  const context = useContext(KiwiContext);
  if (context === undefined) {
    throw new Error("useCreateKiwi must be used within a KiwiProvider");
  }
  return context;
};

interface KiwiProviderProps {
  children: ReactNode;
}

export function KiwiProvider({ children }: KiwiProviderProps) {
  const [state, dispatch] = useReducer(kiwiReducer, initialState);

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <KiwiContext.Provider value={value}>{children}</KiwiContext.Provider>;
}
