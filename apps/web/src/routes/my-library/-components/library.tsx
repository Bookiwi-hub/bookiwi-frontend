import { Plus } from "lucide-react";

import BookRoomCard from "./book-room-card";
import LinkInput from "./link-input";

import { Button } from "#/components/ui/button";
import { BookRoom } from "#/types/book-room";

interface LibraryProps {
  bookRooms: BookRoom[];
}

export default function Library({ bookRooms }: LibraryProps) {
  return (
    <div className="w-full">
      {bookRooms.length === 0 ? (
        <Button
          variant="outline"
          className="flex min-h-[300px] w-full flex-col items-center justify-center gap-4 border border-dashed bg-transparent transition-colors hover:border-primary hover:bg-primary/5"
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            <Plus size={20} />
            <span>새로운 키위 만들기</span>
          </div>
          <p className="text-sm text-muted-foreground">
            책을 선택하고 함께 읽을 수 있는 새로운 키위를 만들어보세요.
          </p>
        </Button>
      ) : (
        <>
          <div className="mb-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">내 키위 컬렉션</h2>
              <Button className="flex items-center gap-2">
                <Plus size={20} />새 키위 만들기
              </Button>
            </div>
            <LinkInput />
          </div>
          <div className="grid grid-cols-1 justify-items-center gap-4 px-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {bookRooms.map((bookRoom) => (
              <BookRoomCard key={bookRoom.id} bookRoom={bookRoom} />
            ))}
          </div>
        </>
      )}

      {/* <CreateBookRoomModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateBookRoom={onCreateBookRoom}
      /> */}
    </div>
  );
}
