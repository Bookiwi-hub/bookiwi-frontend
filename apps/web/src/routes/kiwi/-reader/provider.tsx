import { ReactNode } from "react";

import { BookProvider } from "./book-context";
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
        <RecordProvider currentCfi={record.currentCfi}>
          {children}
        </RecordProvider>
      </SettingsProvider>
    </BookProvider>
  );
}

export default ReaderProvider;
