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

import { IDBStore } from "#/constants/idb";
import idb from "#/managers/idb";
import { Settings } from "#/types/kiwi";

interface SettingsContextType extends Settings {
  setIsSinglePage: (isSinglePage: boolean) => void;
  setFontFamily: (fontFamily: string | null) => Promise<void>;
  setFontSize: (fontSize: number | null) => Promise<void>;
  setLineHeight: (lineHeight: number | null) => Promise<void>;
  setFontWeight: (fontWeight: number | null) => Promise<void>;
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
  participantId: string;
}
export function SettingsProvider({
  children,
  initialSettings,
  participantId,
}: SettingsProviderProps) {
  const { book } = useBook();

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

  const updateIDBSettings = useCallback(
    async (settings: Settings) => {
      await idb.update(IDBStore.ParticipantStore, participantId, {
        settings,
      });
    },
    [participantId],
  );
  const setIsSinglePage = useCallback(
    async (value: boolean) => {
      setIsSinglePageState(value);

      settingsRef.current = {
        ...settingsRef.current,
        isSinglePage: value,
      };
      book?.rendition.spread(value ? "none" : "auto");
      await updateIDBSettings(settingsRef.current);
    },
    [book, updateIDBSettings],
  );

  const setFontFamily = useCallback(
    async (value: string | null) => {
      const contents = book?.rendition?.getContents()[0];
      if (!contents) return;
      setFontFamilyState(value);
      settingsRef.current = {
        ...settingsRef.current,
        fontFamily: value,
      };

      await updateCustomStyle(contents, {
        fontFamily: value,
        fontSize: settingsRef.current.fontSize,
        fontWeight: settingsRef.current.fontWeight,
        lineHeight: settingsRef.current.lineHeight,
      });
      await updateIDBSettings(settingsRef.current);
    },
    [book, updateIDBSettings],
  );

  const setFontSize = useCallback(
    async (value: number | null) => {
      const contents = book?.rendition?.getContents()[0];
      if (!contents) return;
      setFontSizeState(value);
      settingsRef.current = {
        ...settingsRef.current,
        fontSize: value,
      };
      await updateCustomStyle(contents, {
        fontSize: value,
        fontFamily: settingsRef.current.fontFamily,
        fontWeight: settingsRef.current.fontWeight,
        lineHeight: settingsRef.current.lineHeight,
      });
      await updateIDBSettings(settingsRef.current);
    },
    [book, updateIDBSettings],
  );

  const setLineHeight = useCallback(
    async (value: number | null) => {
      const contents = book?.rendition?.getContents()[0];
      if (!contents) return;

      // Only try to format the number if value is defined
      const newValue = value !== null ? Number(Number(value).toFixed(1)) : null;

      setLineHeightState(newValue ?? null);
      settingsRef.current = {
        ...settingsRef.current,
        lineHeight: newValue ?? null,
      };

      await updateCustomStyle(contents, {
        fontSize: settingsRef.current.fontSize,
        fontFamily: settingsRef.current.fontFamily,
        fontWeight: settingsRef.current.fontWeight,
        lineHeight: newValue ?? null,
      });
      await updateIDBSettings(settingsRef.current);
    },
    [book, updateIDBSettings],
  );

  const setFontWeight = useCallback(
    async (value: number | null) => {
      const contents = book?.rendition?.getContents()[0];
      if (!contents) return;
      setFontWeightState(value);
      settingsRef.current = {
        ...settingsRef.current,
        fontWeight: value,
      };
      await updateCustomStyle(contents, {
        fontSize: settingsRef.current.fontSize,
        fontFamily: settingsRef.current.fontFamily,
        fontWeight: value,
        lineHeight: settingsRef.current.lineHeight,
      });
      await updateIDBSettings(settingsRef.current);
    },
    [book, updateIDBSettings],
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
