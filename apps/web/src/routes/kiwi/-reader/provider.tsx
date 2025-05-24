import { ReactNode } from "react";

import {
  BookProvider,
  SettingsProvider,
  RecordProvider,
  ReadingProvider,
} from "./contexts";

import { Settings, ReadingRecord } from "#/types/book";

interface ReaderProviderProps {
  children: ReactNode;
  epubFile: string;
  locations: string;
  initialSettings: Settings;
  readingRecord: ReadingRecord;
}

function ReaderProvider({
  children,
  epubFile,
  locations,
  initialSettings,
  readingRecord,
}: ReaderProviderProps) {
  return (
    <BookProvider epubFile={epubFile} locations={locations}>
      <SettingsProvider initialSettings={initialSettings}>
        <RecordProvider readingRecord={readingRecord}>
          <ReadingProvider>{children}</ReadingProvider>
        </RecordProvider>
      </SettingsProvider>
    </BookProvider>
  );
}

export default ReaderProvider;
