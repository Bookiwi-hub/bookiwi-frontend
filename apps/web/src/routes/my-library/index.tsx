import { createFileRoute } from "@tanstack/react-router";

import Header from "./-components/header";
import Library from "./-components/library";

import bookRooms from "#/DB/book-room";

export const Route = createFileRoute("/my-library/")({
  head: () => ({
    meta: [
      {
        title: "Bookiwi | 내 키위 컬렉션",
      },
    ],
  }),
  component: MyLibrary,
});

function MyLibrary() {
  return (
    <div className="flex size-full flex-col">
      <Header />
      <main className="size-full bg-white p-6 mobile:p-4">
        <Library bookRooms={bookRooms} />
      </main>
    </div>
  );
}
