import { createFileRoute } from "@tanstack/react-router";

import getBook from "./-apis/get-book";
import Header from "./-header";
import MobileKiwi from "./-mobile";
import { ReaderProvider } from "./-reader";
import Viewer from "./-viewer";
import ViewerProvider from "./-viewer/provider";

import { isDesktop } from "#/constants/device-type";

export const Route = createFileRoute("/kiwi/$id")({
  loader: async ({ params }) => {
    const result = await getBook(params.id);
    return result;
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `Kiwi | ${loaderData.kiwiTitle}`,
      },
    ],
  }),
  component: isDesktop ? Kiwi : MobileKiwi,
});

function Kiwi() {
  const {
    epubFile,
    initialSettings,
    kiwiTitle,
    readingRecord,
    locations,
    participantId,
  } = Route.useLoaderData();
  return (
    <ReaderProvider
      epubFile={epubFile}
      initialSettings={initialSettings}
      readingRecord={readingRecord}
      locations={locations}
      participantId={participantId}
    >
      <ViewerProvider>
        <KiwiContent kiwiTitle={kiwiTitle} />
      </ViewerProvider>
    </ReaderProvider>
  );
}

function KiwiContent({ kiwiTitle }: { kiwiTitle: string }) {
  return (
    <main className="flex size-full flex-col overflow-hidden">
      <Header
        title={kiwiTitle}
        profileImage="https://github.com/shadcn.png"
        color="rgba(186, 230, 55, 1)"
      />
      <Viewer />
    </main>
  );
}
