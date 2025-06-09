import { Book, Calendar, Clock, User, Users } from "lucide-react";
import { useMemo, useCallback, memo } from "react";

import tempUser from "#/DB/users";
import { SimpleVirtualizedToc } from "#/components/virtual-toc/simple-virtualized-toc";
import { FALLBACK_IMAGE_URL } from "#/constants/kiwi";
import { Kiwi } from "#/types/kiwi";
import { formatDate, formatDateOnly } from "#/utils/format-date";

interface InformationTabProps {
  kiwi: Kiwi;
}

const InformationTab = memo(({ kiwi }: InformationTabProps) => {
  const {
    adminId,
    bookMetadata,
    createdAt,
    detailDescription,
    maxParticipants,
    coverImage,
    participants,
  } = kiwi;

  // 실제로 비용이 큰 계산만 메모이제이션
  const admin = useMemo(
    () => participants.find((participant) => participant.userId === adminId),
    [participants, adminId],
  );

  const currentParticipant = useMemo(
    () =>
      participants.find((participant) => participant.userId === tempUser.id),
    [participants],
  );

  const handleTocNavigate = useCallback((href: string) => {
    console.log("목차 네비게이션:", href);
    // TODO: 실제 구현에서는 모달을 닫고 해당 위치로 이동하는 로직 추가
  }, []);

  return (
    <div className="mb-10 space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <div className="aspect-[3/4] overflow-hidden rounded-md bg-gray-100">
            <img
              src={coverImage || FALLBACK_IMAGE_URL}
              alt="Book cover"
              className="size-full object-cover"
            />
          </div>
        </div>

        <div className="col-span-2 space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">그룹 정보</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <User size={16} className="text-muted-foreground" />
                <span>관리자: {admin?.name}</span>
              </li>
              <li className="flex items-center gap-2">
                <Users size={16} className="text-muted-foreground" />
                <span className="flex items-center gap-1">
                  <span className="font-medium text-primary">
                    {participants.length}명
                  </span>
                  <span className="text-muted-foreground">
                    {maxParticipants ? `/ ${maxParticipants}명` : ""}
                  </span>
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Book size={16} className="text-muted-foreground" />
                <span>
                  {bookMetadata.title} - {bookMetadata.author}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Calendar size={16} className="text-muted-foreground" />
                <span>생성일: {formatDateOnly(createdAt)}</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock size={16} className="text-muted-foreground" />
                <span>
                  최근 활동:{" "}
                  {currentParticipant?.lastActivityAt
                    ? formatDate(currentParticipant.lastActivityAt)
                    : ""}
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium">진행 상황</h3>
            <div className="mt-2">
              <div className="flex justify-between text-xs">
                <span>{participants[0]?.progress}% 완료</span>
              </div>
              <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${participants[0]?.progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-medium">목차</h3>

        <div className="overflow-hidden rounded-lg border border-gray-200">
          <SimpleVirtualizedToc
            toc={bookMetadata.toc}
            maxHeight={300}
            itemHeight={36}
            onNavigate={handleTocNavigate}
          />
        </div>
      </div>

      {detailDescription && (
        <div className="space-y-2">
          <h3 className="font-medium">상세 설명</h3>
          <p className="whitespace-pre-wrap text-sm text-muted-foreground">
            {detailDescription}
          </p>
        </div>
      )}
    </div>
  );
});

export default InformationTab;
