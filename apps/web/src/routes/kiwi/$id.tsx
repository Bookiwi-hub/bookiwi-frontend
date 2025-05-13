import { createFileRoute } from "@tanstack/react-router";

import Header from "./-header";
import MobileKiwi from "./-mobile";
import { BookProvider, SettingsProvider } from "./-reader";
import Viewer from "./-viewer";
import { AnnotationPaneProvider } from "./-viewer/annotation/context";
import { SplitViewProvider } from "./-viewer/split-view";

import { isDesktop } from "#/constants/device-type";
import { Settings } from "#/types/settings";

export const Route = createFileRoute("/kiwi/$id")({
  loader: async () => {
    // 실제로는 ID를 기반으로 책 정보를 API에서 가져오는 코드
    const epubFile = "https://s3.amazonaws.com/moby-dick/moby-dick.epub";
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

    return { epubFile, initialSettings, bookTitle };
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
  const { epubFile, initialSettings, bookTitle } = Route.useLoaderData();
  return (
    <BookProvider epubFile={epubFile}>
      <SettingsProvider initialSettings={initialSettings}>
        <SplitViewProvider>
          <AnnotationPaneProvider>
            <KiwiContent bookTitle={bookTitle} />
          </AnnotationPaneProvider>
        </SplitViewProvider>
      </SettingsProvider>
    </BookProvider>
  );
}
