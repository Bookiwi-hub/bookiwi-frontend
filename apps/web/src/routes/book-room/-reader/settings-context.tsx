import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { useReader } from "./context";
import { updateCustomStyle } from "./styles";
import { Settings } from "./types/settings";

interface SettingsContextType extends Settings {
  setIsSinglePage: (isSinglePage: boolean) => void;
  setFontFamily: (fontFamily?: string) => Promise<void>;
  setFontSize: (fontSize?: number) => Promise<void>;
  setLineHeight: (lineHeight?: number) => Promise<void>;
  setFontWeight: (fontWeight?: number) => Promise<void>;
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
  const [lineHeight, setLineHeightState] = useState(initialSettings.lineHeight);
  const [fontWeight, setFontWeightState] = useState(initialSettings.fontWeight);

  // Helper function to save settings to localStorage
  const saveSettings = useCallback(
    (newSettings: Partial<SettingsContextType>) => {
      const currentSettings = {
        isSinglePage,
        fontFamily,
        fontSize,
        lineHeight,
        fontWeight,
      };

      localStorage.setItem(
        key,
        JSON.stringify({ ...currentSettings, ...newSettings }),
      );
    },
    [isSinglePage, fontFamily, fontSize, lineHeight, fontWeight, key],
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
    async (value?: string) => {
      const contents = book?.rendition?.getContents()[0];
      if (!contents) return;
      setFontFamilyState(value);
      saveSettings({ fontFamily: value });
      await updateCustomStyle(contents, {
        fontFamily: value,
        fontSize,
        fontWeight,
        lineHeight,
      });
    },
    [saveSettings, fontSize, fontWeight, lineHeight, book],
  );

  const setFontSize = useCallback(
    async (value?: number) => {
      const contents = book?.rendition?.getContents()[0];
      if (!contents) return;
      setFontSizeState(value);
      saveSettings({ fontSize: value });
      await updateCustomStyle(contents, {
        fontSize: value,
        fontFamily,
        fontWeight,
        lineHeight,
      });
    },
    [saveSettings, fontFamily, fontWeight, lineHeight, book],
  );

  const setLineHeight = useCallback(
    async (value?: number) => {
      const contents = book?.rendition?.getContents()[0];
      if (!contents) return;
      setLineHeightState(value);
      saveSettings({ lineHeight: value });
      await updateCustomStyle(contents, {
        fontSize,
        fontFamily,
        fontWeight,
        lineHeight: value,
      });
    },
    [saveSettings, fontSize, fontFamily, fontWeight, book],
  );

  const setFontWeight = useCallback(
    async (value?: number) => {
      const contents = book?.rendition?.getContents()[0];
      if (!contents) return;
      setFontWeightState(value);
      saveSettings({ fontWeight: value });
      await updateCustomStyle(contents, {
        fontSize,
        fontFamily,
        fontWeight: value,
        lineHeight,
      });
    },
    [saveSettings, fontSize, fontFamily, lineHeight, book],
  );

  const value = useMemo(
    () => ({
      isSinglePage,
      setIsSinglePage,
      fontFamily,
      setFontFamily,
      fontSize,
      setFontSize,
      lineHeight,
      setLineHeight,
      fontWeight,
      setFontWeight,
    }),
    [
      isSinglePage,
      fontFamily,
      fontSize,
      lineHeight,
      fontWeight,
      setIsSinglePage,
      setFontFamily,
      setFontSize,
      setLineHeight,
      setFontWeight,
    ],
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}
