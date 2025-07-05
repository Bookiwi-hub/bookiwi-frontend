import { Link } from "@tanstack/react-router";
import { Clock, Users } from "lucide-react";
import { memo } from "react";

import { useSetAtom } from "@bookiwi/jotai";

import { openKiwiDetailModalAtom } from "../-modals/detail-kiwi/atoms";

import { Button } from "#/components/ui/button";
import { Card, CardTitle, CardDescription } from "#/components/ui/card";
import { FALLBACK_IMAGE_URL } from "#/constants/kiwi";
import userManager from "#/managers/user";
import { Kiwi } from "#/types/kiwi";
import { formatDate } from "#/utils/format-date";

interface KiwiCardProps {
  kiwi: Kiwi;
}

function KiwiCard({ kiwi }: KiwiCardProps) {
  const openKiwiDetailModal = useSetAtom(openKiwiDetailModalAtom);
  const { name, description, coverImage, participants, id } = kiwi;
  const participantsCount = participants.length;
  const currentParticipant = participants.find(
    (participant) => participant.userId === userManager.userId,
  );
  const progress = currentParticipant?.progress || 0;
  const lastActivityAt = currentParticipant?.lastActivityAt
    ? formatDate(currentParticipant.lastActivityAt)
    : "";

  return (
    <CardUI
      key={id}
      id={id}
      name={name}
      description={description}
      coverImage={coverImage || ""}
      progress={progress}
      participantsCount={participantsCount}
      lastActivityAt={lastActivityAt}
      onClick={() => openKiwiDetailModal(kiwi)}
    />
  );
}

interface CardUIProps {
  name: string;
  description: string;
  coverImage: string;
  progress: number;
  participantsCount: number;
  lastActivityAt: string;
  id: string;
  onClick: () => void;
}

function CardUI({
  name,
  description,
  coverImage,
  progress,
  participantsCount,
  lastActivityAt,
  id,
  onClick,
}: CardUIProps) {
  return (
    <Card
      className="group relative flex h-96 w-full max-w-72 cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200/50 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all hover:border-slate-300 hover:shadow-[0_8px_16px_rgba(0,0,0,0.12)]"
      onClick={onClick}
    >
      {/* 이미지 영역 */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={coverImage || FALLBACK_IMAGE_URL}
          alt="Book cover"
          className="size-full object-contain transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = FALLBACK_IMAGE_URL;
          }}
        />
        {/* 진행률 표시 - 미니멀 디자인 */}
        <div className="absolute inset-x-0 bottom-0 p-3 text-xs font-medium">
          <div className="flex items-center justify-between pb-2">
            <span className="text-white [text-shadow:_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000,_1px_1px_0_#000,_0_0_8px_rgba(0,0,0,0.5)]">
              {progress}% 읽음
            </span>
            <div className="flex items-center gap-1 text-white [text-shadow:_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000,_1px_1px_0_#000,_0_0_8px_rgba(0,0,0,0.5)]">
              <Users size={12} />
              <span>{participantsCount}명 참여중</span>
            </div>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-white/20 backdrop-blur-sm">
            <div
              className="h-full rounded-full bg-primary shadow-[0_0_8px_rgba(255,255,255,0.3)]"
              style={{ width: `${progress}%` }}
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
            <span>마지막 활동: {lastActivityAt}</span>
          </div>
        </div>
      </div>

      {/* 바로 읽으러 가기 버튼 */}
      <div className="p-4 pt-0">
        <Link
          to="/kiwi/$id"
          params={{ id }}
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
  );
}

export default memo(KiwiCard);
