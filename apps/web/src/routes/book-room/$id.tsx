import { createFileRoute } from "@tanstack/react-router";

import Annotation from "./-component/annotation";
import Header from "./-component/header";
import Reader from "./-component/reader";
import {
  SplitViewItem,
  SplitViewProvider,
  SplitViewGroup,
} from "./-component/split-view";
import { ReaderProvider } from "./-reader";

import bookRooms from "#/DB/book-room";

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
  component: BookRoom,
});

function BookRoomContent() {
  const { bookRoom } = Route.useLoaderData();
  const bookTitle = bookRoom?.name || "Alice's Adventures in Wonderland";

  return (
    <main className="flex size-full flex-col overflow-hidden">
      <Header
        title={bookTitle}
        profileImage="https://github.com/shadcn.png"
        color="green"
      />
      <SplitViewGroup>
        <SplitViewItem id="reader" preferredSize={500}>
          <Reader />
        </SplitViewItem>
        <SplitViewItem id="annotation" preferredSize={500}>
          <Annotation />
        </SplitViewItem>
      </SplitViewGroup>
    </main>
  );
}

function BookRoom() {
  return (
    <ReaderProvider>
      <SplitViewProvider>
        <BookRoomContent />
      </SplitViewProvider>
    </ReaderProvider>
  );
}
