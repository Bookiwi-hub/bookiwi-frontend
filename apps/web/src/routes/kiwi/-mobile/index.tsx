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
  const { epubData, kiwiData, participantsData, annotationsData } =
    useLoaderData({
      from: "/kiwi/$id",
    });

  return (
    <ReaderProvider
      epubData={epubData}
      kiwiData={kiwiData}
      participantsData={participantsData}
      annotationsData={annotationsData}
    >
      <MobileKiwiContent />
    </ReaderProvider>
  );
}

export default MobileKiwi;
