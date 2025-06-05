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
  const { epubData, kiwiData, participantData } = useLoaderData({
    from: "/kiwi/$id",
  });

  return (
    <ReaderProvider
      epubData={epubData}
      kiwiData={kiwiData}
      participantData={participantData}
    >
      <MobileKiwiContent />
    </ReaderProvider>
  );
}

export default MobileKiwi;
