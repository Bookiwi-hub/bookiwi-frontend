import { createFileRoute } from "@tanstack/react-router";

import Header from "./-component/header";
import { SplitViewProvider } from "./-component/split-view";
import Viewer from "./-component/viewer";
import { AnnotationPaneProvider } from "./-component/viewer/annotation/context";
import MobileBookRoom from "./-mobile";
import { ReaderProvider } from "./-reader";

import bookRooms from "#/DB/book-room";
import { isDesktop } from "#/constants/device-type";

interface BookRoomData {
  id: string;
  name: string;
  description: string;
  image: string;
  lastActivityAt: string;
}

export const Route = createFileRoute("/book-room/$id")({
  loader: async ({ params }) => {
    // 실제로는 ID를 기반으로 책 정보를 API에서 가져오는 코드
    const bookRoom = bookRooms.find(
      (room: BookRoomData) => room.id === params.id,
    );
    return { bookRoom };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `Book Room | ${loaderData.bookRoom?.name}`,
      },
    ],
  }),
  component: isDesktop ? BookRoom : MobileBookRoom,
});

function BookRoomContent() {
  const { bookRoom } = Route.useLoaderData();
  const bookTitle = bookRoom?.name || "Alice's Adventures in Wonderland";

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
  return (
    <ReaderProvider>
      <SplitViewProvider>
        <AnnotationPaneProvider>
          <BookRoomContent />
        </AnnotationPaneProvider>
      </SplitViewProvider>
    </ReaderProvider>
  );
}
