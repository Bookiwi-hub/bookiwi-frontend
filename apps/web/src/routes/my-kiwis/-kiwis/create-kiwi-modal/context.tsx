import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useMemo,
  useReducer,
} from "react";

import {
  initialState,
  createKiwiReducer,
  CreateKiwiAction,
  CreateKiwiState,
} from "./reducer";

interface CreateKiwiContextType {
  state: CreateKiwiState;
  dispatch: Dispatch<CreateKiwiAction>;
}

const CreateKiwiContext = createContext<CreateKiwiContextType | undefined>(
  undefined,
);

export const useCreateKiwi = () => {
  const context = useContext(CreateKiwiContext);
  if (context === undefined) {
    throw new Error("useCreateKiwi must be used within a CreateKiwiProvider");
  }
  return context;
};

interface CreateKiwiProviderProps {
  children: ReactNode;
}

export function CreateKiwiProvider({ children }: CreateKiwiProviderProps) {
  const [state, dispatch] = useReducer(createKiwiReducer, initialState);

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <CreateKiwiContext.Provider value={value}>
      {children}
    </CreateKiwiContext.Provider>
  );
}
