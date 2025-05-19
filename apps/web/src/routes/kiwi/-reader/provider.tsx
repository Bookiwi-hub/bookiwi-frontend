import { ReactNode } from "react";

import { BookProvider } from "./book-context";
import { ReadingProvider } from "./reading-context";
import { RecordProvider } from "./record-context";
import { SettingsProvider } from "./settings-context";

import { Settings, Record } from "#/types/reader";

interface ReaderProviderProps {
  children: ReactNode;
  epubFile: string;
  locations: string;
  initialSettings: Settings;
  record: Record;
}

function ReaderProvider({
  children,
  epubFile,
  locations,
  initialSettings,
  record,
}: ReaderProviderProps) {
  return (
    <BookProvider epubFile={epubFile} locations={locations}>
      <SettingsProvider initialSettings={initialSettings}>
        <RecordProvider record={record}>
          <ReadingProvider>{children}</ReadingProvider>
        </RecordProvider>
      </SettingsProvider>
    </BookProvider>
  );
}

export default ReaderProvider;
