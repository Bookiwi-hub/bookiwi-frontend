import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { useReader } from "./context";
import { DefaultNumber, Settings } from "./types/settings";

interface SettingsContextType extends Settings {
  setIsSinglePage: (isSinglePage: boolean) => void;
  setFontFamily: (fontFamily: string) => void;
  setFontSize: (fontSize: DefaultNumber) => void;
  setParagraphSpacing: (paragraphSpacing: DefaultNumber) => void;
  setFontWeight: (fontWeight: DefaultNumber) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
interface SettingsProviderProps {
  children: ReactNode;
  initialSettings: Settings;
}
export function SettingsProvider({
  children,
  initialSettings,
}: SettingsProviderProps) {
  const { book } = useReader();

  const key = `${book?.key()}-settings`;

  const [isSinglePage, setIsSinglePageState] = useState(
    initialSettings.isSinglePage,
  );
  const [fontFamily, setFontFamilyState] = useState(initialSettings.fontFamily);
  const [fontSize, setFontSizeState] = useState(initialSettings.fontSize);
  const [paragraphSpacing, setParagraphSpacingState] = useState(
    initialSettings.paragraphSpacing,
  );
  const [fontWeight, setFontWeightState] = useState(initialSettings.fontWeight);

  // Helper function to save settings to localStorage
  const saveSettings = useCallback(
    (newSettings: Partial<SettingsContextType>) => {
      const currentSettings = {
        isSinglePage,
        fontFamily,
        fontSize,
        paragraphSpacing,
        fontWeight,
      };

      localStorage.setItem(
        key,
        JSON.stringify({ ...currentSettings, ...newSettings }),
      );
    },
    [isSinglePage, fontFamily, fontSize, paragraphSpacing, fontWeight, key],
  );

  // Custom setter functions that update both state and localStorage
  const setIsSinglePage = useCallback(
    (value: boolean) => {
      setIsSinglePageState(value);
      saveSettings({ isSinglePage: value });
    },
    [saveSettings],
  );

  const setFontFamily = useCallback(
    (value: string) => {
      setFontFamilyState(value);
      saveSettings({ fontFamily: value });
    },
    [saveSettings],
  );

  const setFontSize = useCallback(
    (value: DefaultNumber) => {
      setFontSizeState(value);
      saveSettings({ fontSize: value });
    },
    [saveSettings],
  );

  const setParagraphSpacing = useCallback(
    (value: DefaultNumber) => {
      setParagraphSpacingState(value);
      saveSettings({ paragraphSpacing: value });
    },
    [saveSettings],
  );

  const setFontWeight = useCallback(
    (value: DefaultNumber) => {
      setFontWeightState(value);
      saveSettings({ fontWeight: value });
    },
    [saveSettings],
  );

  const value = useMemo(
    () => ({
      isSinglePage,
      setIsSinglePage,
      fontFamily,
      setFontFamily,
      fontSize,
      setFontSize,
      paragraphSpacing,
      setParagraphSpacing,
      fontWeight,
      setFontWeight,
    }),
    [
      isSinglePage,
      fontFamily,
      fontSize,
      paragraphSpacing,
      fontWeight,
      setIsSinglePage,
      setFontFamily,
      setFontSize,
      setParagraphSpacing,
      setFontWeight,
    ],
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}
