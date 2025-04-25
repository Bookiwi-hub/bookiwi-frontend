import { Plus } from "lucide-react";
import { useState } from "react";

import BookRoomCard from "./book-room-card";
import CreateBookRoomModal from "./create-book-room-modal";

import { Button } from "#/components/ui/button";
import { BookRoom } from "#/types/book-room";

interface LibraryProps {
  bookRooms: BookRoom[];
  onCreateBookRoom: (data: {
    name: string;
    description: string;
    image?: string;
  }) => Promise<void>;
}

export default function Library({ bookRooms, onCreateBookRoom }: LibraryProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="w-full">
      {bookRooms.length === 0 ? (
        <Button
          variant="outline"
          onClick={() => setIsCreateModalOpen(true)}
          className="flex min-h-[300px] w-full flex-col items-center justify-center gap-4 border border-dashed bg-transparent transition-colors hover:border-primary hover:bg-primary/5"
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            <Plus size={20} />
            <span>새로운 북룸 만들기</span>
          </div>
          <p className="text-sm text-muted-foreground">
            함께 읽고 토론할 수 있는 새로운 북룸을 만들어보세요.
          </p>
        </Button>
      ) : (
        <>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-2xl font-bold">나의 북룸</h2>
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2"
            >
              <Plus size={20} />새 북룸 만들기
            </Button>
          </div>
          <div className="grid grid-cols-1 justify-items-center gap-3 px-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {bookRooms.map((bookRoom) => (
              <BookRoomCard key={bookRoom.id} bookRoom={bookRoom} />
            ))}
          </div>
        </>
      )}

      <CreateBookRoomModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateBookRoom={onCreateBookRoom}
      />
    </div>
  );
}
