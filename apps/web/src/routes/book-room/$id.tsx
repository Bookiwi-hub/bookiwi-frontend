import { createFileRoute } from "@tanstack/react-router";

import Header from "./-component/header";
import { SplitViewProvider } from "./-component/split-view";
import Viewer from "./-component/viewer";
import { AnnotationPaneProvider } from "./-component/viewer/annotation/context";
import MobileBookRoom from "./-mobile";
import { ReaderProvider } from "./-reader";
import { SettingsProvider } from "./-reader/settings-context";
import { Settings } from "./-reader/types/settings";

import { isDesktop } from "#/constants/device-type";

export const Route = createFileRoute("/book-room/$id")({
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
  component: isDesktop ? BookRoom : MobileBookRoom,
});

function BookRoomContent({ bookTitle }: { bookTitle: string }) {
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

function BookRoom() {
  const { epubFile, initialSettings, bookTitle } = Route.useLoaderData();
  return (
    <ReaderProvider epubFile={epubFile}>
      <SettingsProvider initialSettings={initialSettings}>
        <SplitViewProvider>
          <AnnotationPaneProvider>
            <BookRoomContent bookTitle={bookTitle} />
          </AnnotationPaneProvider>
        </SplitViewProvider>
      </SettingsProvider>
    </ReaderProvider>
  );
}
