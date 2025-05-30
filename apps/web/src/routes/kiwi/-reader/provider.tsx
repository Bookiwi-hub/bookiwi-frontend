import { ReactNode } from "react";

import {
  BookProvider,
  SettingsProvider,
  RecordProvider,
  ReadingProvider,
} from "./contexts";

import { Settings, ReadingRecord } from "#/types/kiwi";

interface ReaderProviderProps {
  children: ReactNode;
  epubFile: File;
  locations: string;
  initialSettings: Settings;
  readingRecord: ReadingRecord;
  participantId: string;
}

function ReaderProvider({
  children,
  epubFile,
  locations,
  initialSettings,
  readingRecord,
  participantId,
}: ReaderProviderProps) {
  return (
    <BookProvider epubFile={epubFile} locations={locations}>
      <SettingsProvider
        initialSettings={initialSettings}
        participantId={participantId}
      >
        <RecordProvider
          readingRecord={readingRecord}
          participantId={participantId}
        >
          <ReadingProvider>{children}</ReadingProvider>
        </RecordProvider>
      </SettingsProvider>
    </BookProvider>
  );
}

export default ReaderProvider;
