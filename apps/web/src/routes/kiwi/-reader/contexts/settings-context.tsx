import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { updateCustomStyle } from "../styles";

import { useBook } from "./book-context";

import { Settings } from "#/types/reader";

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
      setFontFamilyState(value);
      settingsRef.current = {
        ...settingsRef.current,
        fontFamily: value,
      };
      localStorage.setItem(key, JSON.stringify(settingsRef.current));
      await updateCustomStyle(contents, {
        fontFamily: value,
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
      setFontSizeState(value);
      settingsRef.current = {
        ...settingsRef.current,
        fontSize: value,
      };
      localStorage.setItem(key, JSON.stringify(settingsRef.current));
      await updateCustomStyle(contents, {
        fontSize: value,
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

      setLineHeightState(newValue);
      settingsRef.current = {
        ...settingsRef.current,
        lineHeight: newValue,
      };
      localStorage.setItem(key, JSON.stringify(settingsRef.current));
      await updateCustomStyle(contents, {
        fontSize: settingsRef.current.fontSize,
        fontFamily: settingsRef.current.fontFamily,
        fontWeight: settingsRef.current.fontWeight,
        lineHeight: newValue,
      });
    },
    [key, book],
  );

  const setFontWeight = useCallback(
    async (value?: number) => {
      const contents = book?.rendition?.getContents()[0];
      if (!contents) return;
      setFontWeightState(value);
      settingsRef.current = {
        ...settingsRef.current,
        fontWeight: value,
      };
      localStorage.setItem(key, JSON.stringify(settingsRef.current));
      await updateCustomStyle(contents, {
        fontSize: settingsRef.current.fontSize,
        fontFamily: settingsRef.current.fontFamily,
        fontWeight: value,
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

  useEffect(() => {
    const handleRendered = async () => {
      const contents = book?.rendition.getContents()[0];
      if (!contents) return;
      await updateCustomStyle(contents, {
        fontSize,
        fontFamily,
        fontWeight,
        lineHeight,
      });
    };

    book?.rendition?.on("rendered", handleRendered);

    return () => {
      book?.rendition?.off("rendered", handleRendered);
    };
  }, [fontSize, fontFamily, fontWeight, lineHeight, book]);

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}
