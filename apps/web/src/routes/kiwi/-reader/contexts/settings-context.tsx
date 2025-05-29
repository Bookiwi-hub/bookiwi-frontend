import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

import { updateCustomStyle } from "../styles";

import { useBook } from "./book-context";

import { Settings } from "#/types/kiwi";

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
  const { book } = useBook();

  const key = `${book?.key()}-settings`;

  const [isSinglePage, setIsSinglePageState] = useState(
    initialSettings.isSinglePage,
  );
  const [fontFamily, setFontFamilyState] = useState(initialSettings.fontFamily);
  const [fontSize, setFontSizeState] = useState(initialSettings.fontSize);
  const [lineHeight, setLineHeightState] = useState(initialSettings.lineHeight);
  const [fontWeight, setFontWeightState] = useState(initialSettings.fontWeight);

  const settingsRef = useRef<Settings>({
    isSinglePage: initialSettings.isSinglePage,
    fontFamily: initialSettings.fontFamily,
    fontSize: initialSettings.fontSize,
    lineHeight: initialSettings.lineHeight,
    fontWeight: initialSettings.fontWeight,
  });

  const setIsSinglePage = useCallback(
    (value: boolean) => {
      setIsSinglePageState(value);

      settingsRef.current = {
        ...settingsRef.current,
        isSinglePage: value,
      };
      localStorage.setItem(key, JSON.stringify(settingsRef.current));
      book?.rendition.spread(value ? "none" : "auto");
    },
    [key, book],
  );

  const setFontFamily = useCallback(
    async (value?: string) => {
      const contents = book?.rendition?.getContents()[0];
      if (!contents) return;
      setFontFamilyState(value ?? null);
      settingsRef.current = {
        ...settingsRef.current,
        fontFamily: value ?? null,
      };
      localStorage.setItem(key, JSON.stringify(settingsRef.current));
      await updateCustomStyle(contents, {
        fontFamily: value ?? null,
        fontSize: settingsRef.current.fontSize,
        fontWeight: settingsRef.current.fontWeight,
        lineHeight: settingsRef.current.lineHeight,
      });
    },
    [key, book],
  );

  const setFontSize = useCallback(
    async (value?: number) => {
      const contents = book?.rendition?.getContents()[0];
      if (!contents) return;
      setFontSizeState(value ?? null);
      settingsRef.current = {
        ...settingsRef.current,
        fontSize: value ?? null,
      };
      localStorage.setItem(key, JSON.stringify(settingsRef.current));
      await updateCustomStyle(contents, {
        fontSize: value ?? null,
        fontFamily: settingsRef.current.fontFamily,
        fontWeight: settingsRef.current.fontWeight,
        lineHeight: settingsRef.current.lineHeight,
      });
    },
    [key, book],
  );

  const setLineHeight = useCallback(
    async (value?: number) => {
      const contents = book?.rendition?.getContents()[0];
      if (!contents) return;

      // Only try to format the number if value is defined
      const newValue =
        value !== undefined ? Number(Number(value).toFixed(1)) : undefined;

      setLineHeightState(newValue ?? null);
      settingsRef.current = {
        ...settingsRef.current,
        lineHeight: newValue ?? null,
      };
      localStorage.setItem(key, JSON.stringify(settingsRef.current));
      await updateCustomStyle(contents, {
        fontSize: settingsRef.current.fontSize,
        fontFamily: settingsRef.current.fontFamily,
        fontWeight: settingsRef.current.fontWeight,
        lineHeight: newValue ?? null,
      });
    },
    [key, book],
  );

  const setFontWeight = useCallback(
    async (value?: number) => {
      const contents = book?.rendition?.getContents()[0];
      if (!contents) return;
      setFontWeightState(value ?? null);
      settingsRef.current = {
        ...settingsRef.current,
        fontWeight: value ?? null,
      };
      localStorage.setItem(key, JSON.stringify(settingsRef.current));
      await updateCustomStyle(contents, {
        fontSize: settingsRef.current.fontSize,
        fontFamily: settingsRef.current.fontFamily,
        fontWeight: value ?? null,
        lineHeight: settingsRef.current.lineHeight,
      });
    },
    [key, book],
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
