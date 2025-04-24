import BookRoomCard from "./book-room-card";

import { BookRoom } from "#/types/book-room";

function Library({ bookRooms }: { bookRooms: BookRoom[] }) {
  if (bookRooms.length === 0) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 p-12 text-center">
        <div className="mb-4 text-muted-foreground">
          아직 생성된 그룹이 없습니다
        </div>
      </div>
    );
  }

  return (
    <section className="flex flex-wrap gap-10 mobile:grid mobile:grid-cols-2 mobile:gap-4 mobile:pb-20">
      {bookRooms.map((bookRoom) => (
        <BookRoomCard key={bookRoom.id} bookRoom={bookRoom} />
      ))}
    </section>
  );
}

export default Library;
