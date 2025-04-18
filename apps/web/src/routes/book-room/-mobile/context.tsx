import {
  createContext,
  Dispatch,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export enum MobileState {
  BOOK,
  MENU,
  TOC,
  SEARCH,
  BOOKMARKS,
  ANNOTATION,
  SETTING,
  PARTICIPANTS,
}

export type DrawerType =
  | MobileState.TOC
  | MobileState.SEARCH
  | MobileState.BOOKMARKS
  | MobileState.SETTING
  | MobileState.PARTICIPANTS
  | MobileState.ANNOTATION;

interface MobileContextType {
  state: MobileState;
  setState: Dispatch<React.SetStateAction<MobileState>>;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
  openDrawer: (type: DrawerType) => void;
  closeDrawer: () => void;
}

const MobileContext = createContext<MobileContextType | undefined>(undefined);

export const useMobileContext = () => {
  const context = useContext(MobileContext);
  if (context === undefined) {
    throw new Error("useMobileContext must be used within a MobileContext");
  }
  return context;
};

export function MobileContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<MobileState>(MobileState.BOOK);

  const openMenu = useCallback(() => setState(MobileState.MENU), []);
  const closeMenu = useCallback(() => setState(MobileState.BOOK), []);
  const toggleMenu = useCallback(
    () =>
      setState((prev) =>
        prev === MobileState.MENU ? MobileState.BOOK : MobileState.MENU,
      ),
    [],
  );
  const openDrawer = useCallback((type: DrawerType) => setState(type), []);
  const closeDrawer = useCallback(() => setState(MobileState.BOOK), []);

  const value = useMemo(
    () => ({
      state,
      setState,
      openMenu,
      closeMenu,
      toggleMenu,
      openDrawer,
      closeDrawer,
    }),
    [state, openMenu, closeMenu, toggleMenu, openDrawer, closeDrawer],
  );

  return (
    <MobileContext.Provider value={value}>{children}</MobileContext.Provider>
  );
}
