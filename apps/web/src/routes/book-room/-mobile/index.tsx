import { useLoaderData } from "@tanstack/react-router";

import { ReaderProvider } from "../-reader";
import { SettingsProvider } from "../-reader/settings-context";

import MobileHeader from "./header";
import MobileMenu from "./menu";
import MobileViewer from "./viewer";

function MobileBookRoomContent() {
  return (
    <div className="size-full">
      <MobileHeader />
      <MobileViewer />
      <MobileMenu />
    </div>
  );
}

function MobileBookRoom() {
  const { epubFile, initialSettings } = useLoaderData({
    from: "/book-room/$id",
  });
  return (
    <ReaderProvider epubFile={epubFile}>
      <SettingsProvider initialSettings={initialSettings}>
        <MobileBookRoomContent />
      </SettingsProvider>
    </ReaderProvider>
  );
}

export default MobileBookRoom;
