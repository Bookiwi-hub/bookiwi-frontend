import { useLoaderData } from "@tanstack/react-router";

import { ReaderProvider } from "../-reader";
import { SettingsProvider } from "../-reader/settings-context";

import MobileHeader from "./header";
import MobileMenu from "./menu";
import MobileViewer from "./viewer";

function MobileKiwiContent() {
  return (
    <div className="size-full">
      <MobileHeader />
      <MobileViewer />
      <MobileMenu />
    </div>
  );
}

function MobileKiwi() {
  const { epubFile, initialSettings, record, locations } = useLoaderData({
    from: "/kiwi/$id",
  });
  return (
    <ReaderProvider
      epubFile={epubFile}
      initialSettings={initialSettings}
      record={record}
      locations={locations}
    >
      <SettingsProvider initialSettings={initialSettings}>
        <MobileKiwiContent />
      </SettingsProvider>
    </ReaderProvider>
  );
}

export default MobileKiwi;
