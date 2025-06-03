import { ReactNode, useEffect } from "react";

import { settingsAtom, useSetAtom } from "@bookiwi/jotai";

import { BookProvider, RecordProvider } from "./contexts";

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
  const setSettings = useSetAtom(settingsAtom);
  useEffect(() => {
    setSettings(initialSettings);
  }, [initialSettings, setSettings]);
  return (
    <BookProvider
      epubFile={epubFile}
      locations={locations}
      participantId={participantId}
    >
      <RecordProvider
        readingRecord={readingRecord}
        participantId={participantId}
      >
        {children}
      </RecordProvider>
    </BookProvider>
  );
}

export default ReaderProvider;
