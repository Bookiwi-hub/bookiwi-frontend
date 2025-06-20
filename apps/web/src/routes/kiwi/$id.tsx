import { createFileRoute } from "@tanstack/react-router";

import getBook from "./-apis/get-book";
import Header from "./-header";
import MobileKiwi from "./-mobile";
import { ReaderProvider } from "./-reader";
import SplitView from "./-split-view";

import { Toaster } from "#/components/ui/sonner";
import { isDesktop } from "#/constants/device-type";

export const Route = createFileRoute("/kiwi/$id")({
  loader: async ({ params }) => {
    const result = await getBook(params.id);
    return result;
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `Kiwi | ${loaderData.kiwiData.name}`,
      },
    ],
  }),
  component: isDesktop ? Kiwi : MobileKiwi,
});

function Kiwi() {
  const { epubData, kiwiData, participantsData, annotationsData } =
    Route.useLoaderData();
  return (
    <ReaderProvider
      epubData={epubData}
      kiwiData={kiwiData}
      participantsData={participantsData}
      annotationsData={annotationsData}
    >
      <KiwiContent />
    </ReaderProvider>
  );
}

function KiwiContent() {
  return (
    <>
      <main className="flex size-full select-none flex-col overflow-hidden">
        <Header />
        <SplitView />
      </main>
      <Toaster />
    </>
  );
}
