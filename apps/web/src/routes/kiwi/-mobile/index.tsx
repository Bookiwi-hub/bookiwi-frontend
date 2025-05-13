import { useLoaderData } from "@tanstack/react-router";

import { BookProvider } from "../-reader";
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
  const { epubFile, initialSettings } = useLoaderData({
    from: "/kiwi/$id",
  });
  return (
    <BookProvider epubFile={epubFile}>
      <SettingsProvider initialSettings={initialSettings}>
        <MobileKiwiContent />
      </SettingsProvider>
    </BookProvider>
  );
}

export default MobileKiwi;
