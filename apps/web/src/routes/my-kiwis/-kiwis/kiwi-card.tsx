import { Link } from "@tanstack/react-router";
import { Clock, Users } from "lucide-react";
import { memo, useCallback, useState } from "react";

import KiwiDetailModal from "./kiwi-detail-modal";

import { Button } from "#/components/ui/button";
import { Card, CardTitle, CardDescription } from "#/components/ui/card";
import { Kiwi } from "#/types/kiwi";

interface KiwiCardProps {
  kiwi: Kiwi;
}

function KiwiCard({ kiwi }: KiwiCardProps) {
  const [openDetail, setOpenDetail] = useState(false);
  const fallbackImageUrl =
    "https://placehold.co/300x400/e2e8f0/64748b?text=No+Cover";

  const { name, description, coverImage, participants, bookDataId } = kiwi;

  // useCallback을 사용하여 카드 클릭 핸들러 메모이제이션
  const handleCardClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // 버튼 클릭했을 때 모달 열리지 않도록
    if (!(e.target as HTMLElement).closest(".read-button")) {
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
        className="group relative flex h-[420px] w-full max-w-[280px] cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200/50 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all hover:border-slate-300 hover:shadow-[0_8px_16px_rgba(0,0,0,0.12)]"
        onClick={handleCardClick}
      >
        {/* 이미지 영역 */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={coverImage || fallbackImageUrl}
            alt="Book cover"
            className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = fallbackImageUrl;
            }}
          />
          {/* 진행률 표시 - 미니멀 디자인 */}
          <div className="absolute inset-x-0 bottom-0 p-3 text-xs font-medium">
            <div className="flex items-center justify-between pb-2">
              <span className="text-white [text-shadow:_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000,_1px_1px_0_#000,_0_0_8px_rgba(0,0,0,0.5)]">
                {participants[0]?.progress}% 읽음
              </span>
              <div className="flex items-center gap-1 text-white [text-shadow:_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000,_1px_1px_0_#000,_0_0_8px_rgba(0,0,0,0.5)]">
                <Users size={12} />
                <span>{participants.length}명 참여중</span>
              </div>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-white/20 backdrop-blur-sm">
              <div
                className="h-full rounded-full bg-primary shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                style={{ width: `${participants[0]?.progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* 콘텐츠 영역 */}
        <div className="flex flex-1 flex-col p-4">
          <div className="flex-1">
            <CardTitle className="mb-2 line-clamp-2 text-lg font-semibold mobile:text-base">
              {name}
            </CardTitle>
            <CardDescription className="mb-3 line-clamp-3 text-sm text-muted-foreground mobile:text-xs">
              {description === "" ? "-" : description}
            </CardDescription>
          </div>

          {/* 하단 정보 */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock size={12} />
              <span>마지막 활동: {participants[0]?.lastActivityAt}</span>
            </div>
          </div>
        </div>

        {/* 바로 읽으러 가기 버튼 */}
        <div className="p-4 pt-0">
          <Link
            to="/kiwi/$id"
            params={{ id: bookDataId }}
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              className="w-full bg-primary/90 text-white backdrop-blur-sm hover:bg-primary"
              variant="secondary"
            >
              입장하기
            </Button>
          </Link>
        </div>
      </Card>

      {/* 상세 정보 모달 */}
      {openDetail && (
        <KiwiDetailModal
          kiwi={kiwi}
          isOpen={openDetail}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}

export default memo(KiwiCard);
