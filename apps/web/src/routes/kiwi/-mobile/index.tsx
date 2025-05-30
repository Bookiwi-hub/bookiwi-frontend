import { useLoaderData } from "@tanstack/react-router";

import { ReaderProvider } from "../-reader";

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
  const { epubFile, initialSettings, readingRecord, locations, participantId } =
    useLoaderData({
      from: "/kiwi/$id",
    });

  return (
    <ReaderProvider
      epubFile={epubFile}
      initialSettings={initialSettings}
      readingRecord={readingRecord}
      locations={locations}
      participantId={participantId}
    >
      <MobileKiwiContent />
    </ReaderProvider>
  );
}

export default MobileKiwi;
