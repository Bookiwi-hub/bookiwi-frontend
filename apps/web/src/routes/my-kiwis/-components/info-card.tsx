import { Book, Users } from "lucide-react";

import { MyKiwi } from "@bookiwi/supabase/types";

import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import { Card, CardContent } from "#/components/ui/card";
import { FALLBACK_IMAGE_URL } from "#/constants/kiwi";

function InfoCard({ kiwi }: { kiwi: MyKiwi }) {
  const { name, bookMetadata, participants, admin } = kiwi;
  const participantsCount = participants.length;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* 커버 이미지 */}
          <div className="aspect-[3/4] w-20 shrink-0 overflow-hidden rounded-md">
            <img
              src={bookMetadata.coverImage || FALLBACK_IMAGE_URL}
              alt="Book cover"
              className="size-full object-contain"
              onError={(e) => {
                e.currentTarget.src = FALLBACK_IMAGE_URL;
              }}
            />
          </div>

          {/* 키위 정보 */}
          <div className="flex-1 space-y-3">
            <div>
              <h3 className="text-lg font-semibold">{name}</h3>
              <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <Book size={14} />
                <span>{bookMetadata.title}</span>
                {bookMetadata.author && (
                  <>
                    <span>·</span>
                    <span>{bookMetadata.author}</span>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Users size={14} className="text-muted-foreground" />
                <span>{participantsCount}명 참여중</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">
                  관리자: {admin.name}
                </span>
              </div>
            </div>

            {/* 참여자 아바타들 */}
            {participantsCount > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">참여자:</span>
                <div className="flex -space-x-2">
                  {participants.map((participant) => (
                    <Avatar
                      key={participant.userId}
                      className="size-6 border-2 border-white bg-slate-400"
                    >
                      <AvatarImage
                        src={participant.profileImage || undefined}
                      />
                      <AvatarFallback className="text-xs">
                        {participant.name[0]}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {participantsCount > 5 && (
                    <div className="flex size-6 items-center justify-center rounded-full border-2 border-white bg-muted text-xs">
                      +{participantsCount - 5}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default InfoCard;
