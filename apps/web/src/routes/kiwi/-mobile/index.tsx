import { useLoaderData } from "@tanstack/react-router";

import { ReaderProvider } from "../-reader";
import { SettingsProvider } from "../-reader/settings-context";

import MobileHeader from "./header";
import MobileViewer from "./viewer";

function MobileKiwiContent() {
  return (
    <div className="size-full">
      <MobileHeader />
      <MobileViewer />
    </div>
  );
}

function MobileKiwi() {
  const { epubFile, initialSettings } = useLoaderData({
    from: "/kiwi/$id",
  });
  return (
    <ReaderProvider epubFile={epubFile}>
      <SettingsProvider initialSettings={initialSettings}>
        <MobileKiwiContent />
      </SettingsProvider>
    </ReaderProvider>
  );
}

export default MobileKiwi;
