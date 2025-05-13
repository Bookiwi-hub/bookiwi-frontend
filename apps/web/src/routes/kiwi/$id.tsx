import { createFileRoute } from "@tanstack/react-router";

import Header from "./-header";
import MobileKiwi from "./-mobile";
import { ReaderProvider } from "./-reader";
import Viewer from "./-viewer";
import ViewerProvider from "./-viewer/provider";

import { isDesktop } from "#/constants/device-type";
import { Settings, Record } from "#/types/reader";

export const Route = createFileRoute("/kiwi/$id")({
  loader: async () => {
    // 실제로는 ID를 기반으로 책 정보를 API에서 가져오는 코드
    const epubFile = "https://s3.amazonaws.com/moby-dick/moby-dick.epub";

    const savedRecord = localStorage.getItem(
      "epubjs:0.3:code.google.com.epub-samples.moby-dick-basic-record",
    );
    let record: Record = {
      lastCfi: null,
      percentage: null,
    };

    if (savedRecord) {
      record = JSON.parse(savedRecord);
    }

    const locations = localStorage.getItem(
      "epubjs:0.3:code.google.com.epub-samples.moby-dick-basic-locations",
    );

    const savedSettings = localStorage.getItem(
      "epubjs:0.3:code.google.com.epub-samples.moby-dick-basic-settings",
    );
    let initialSettings: Settings = {
      isSinglePage: false,
    };
    if (savedSettings) {
      initialSettings = JSON.parse(savedSettings);
    } else {
      localStorage.setItem(
        "epubjs:0.3:code.google.com.epub-samples.moby-dick-basic-settings",
        JSON.stringify(initialSettings),
      );
    }

    const bookTitle = "모비딕";

    return {
      epubFile,
      initialSettings,
      bookTitle,
      record,
      locations,
    };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `Book Room | ${loaderData.bookTitle}`,
      },
    ],
  }),
  component: isDesktop ? Kiwi : MobileKiwi,
});

function KiwiContent({ bookTitle }: { bookTitle: string }) {
  return (
    <main className="flex size-full flex-col overflow-hidden">
      <Header
        title={bookTitle}
        profileImage="https://github.com/shadcn.png"
        color="rgba(186, 230, 55, 1)"
      />
      <Viewer />
    </main>
  );
}

function Kiwi() {
  const { epubFile, initialSettings, bookTitle, record, locations } =
    Route.useLoaderData();
  return (
    <ReaderProvider
      epubFile={epubFile}
      initialSettings={initialSettings}
      record={record}
      locations={locations}
    >
      <ViewerProvider>
        <KiwiContent bookTitle={bookTitle} />
      </ViewerProvider>
    </ReaderProvider>
  );
}
