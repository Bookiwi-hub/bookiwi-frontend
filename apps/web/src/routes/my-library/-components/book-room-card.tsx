import { Clock } from "lucide-react";
import { memo, useCallback, useState } from "react";

import BookRoomDetail from "./BookRoomDetail";
import CardDropdown from "./card-dropdown";

import {
  Card,
  CardFooter,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "#/components/ui/card";
import { BookRoom } from "#/types/book-room";

interface BookRoomCardProps {
  bookRoom: BookRoom;
}

function BookRoomCard({ bookRoom }: BookRoomCardProps) {
  const [openDetail, setOpenDetail] = useState(false);
  const fallbackImageUrl =
    "https://placehold.co/300x400/e2e8f0/64748b?text=No+Cover";

  const { name, description, image, lastActivityAt, progress = 0 } = bookRoom;

  // useCallback을 사용하여 카드 클릭 핸들러 메모이제이션
  const handleCardClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // 드롭다운 클릭했을 때 모달 열리지 않도록
    if (!(e.target as HTMLElement).closest(".dropdown-trigger")) {
      setOpenDetail(true);
    }
  }, []);

  // 모달 닫기 핸들러 메모이제이션
  const handleCloseModal = useCallback(() => {
    setOpenDetail(false);
  }, []);

  return (
    <>
      <Card
        className="w-64 cursor-pointer transition-all hover:shadow-md mobile:w-full"
        onClick={handleCardClick}
      >
        <CardHeader className="relative mobile:p-3">
          <CardDropdown />
          <CardTitle className="text-lg mobile:text-base">{name}</CardTitle>
          <CardDescription className="mobile:text-xs">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="mobile:p-3 mobile:pt-0">
          {/* Book cover image */}
          <div className="aspect-[4/5] overflow-hidden rounded-md bg-gray-100">
            <img
              src={image || fallbackImageUrl}
              alt="Book cover"
              className="size-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = fallbackImageUrl;
              }}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 border-t bg-muted/20 p-3">
          <div className="flex w-full items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock size={12} />
              <span>{lastActivityAt}</span>
            </div>
            <span>{progress}% 완료</span>
          </div>
          {/* 진행률 바 */}
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${progress}%` }}
            />
          </div>
        </CardFooter>
      </Card>

      {/* 상세 정보 모달 - 직접 BookRoomDetail 사용 */}
      {openDetail && (
        <BookRoomDetail
          bookRoom={bookRoom}
          isOpen={openDetail}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}

export default memo(BookRoomCard);
