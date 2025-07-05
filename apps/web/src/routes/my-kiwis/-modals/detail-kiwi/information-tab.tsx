import { Book, Calendar, Clock, User, Users } from "lucide-react";

import { NavItem } from "@bookiwi/epubjs/types/navigation";

import { FALLBACK_IMAGE_URL } from "#/constants/kiwi";
import userManager from "#/managers/user";
import { Kiwi } from "#/types/kiwi";
import { formatDate, formatDateOnly } from "#/utils/format-date";

interface InformationTabProps {
  kiwi: Kiwi;
}

function InformationTab({ kiwi }: InformationTabProps) {
  const {
    adminId,
    bookMetadata,
    createdAt,
    detailDescription,
    maxParticipants,
    coverImage,
    participants,
  } = kiwi;

  const admin = participants.find(
    (participant) => participant.userId === adminId,
  );

  const currentParticipant = participants.find(
    (participant) => participant.userId === userManager.userId,
  );

  return (
    <div className="mb-10 space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <div className="aspect-[3/4] overflow-hidden rounded-md">
            <img
              src={coverImage || FALLBACK_IMAGE_URL}
              alt="Book cover"
              className="size-full object-contain"
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
                <span>
                  {currentParticipant?.progress
                    ? `${currentParticipant?.progress}% 완료`
                    : "0% 완료"}
                </span>
              </div>
              <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{
                    width: currentParticipant
                      ? `${currentParticipant?.progress}%`
                      : "0%",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <h3 className="font-medium">목차</h3>
        <ul className="max-h-60 overflow-y-auto pr-1">
          {bookMetadata.toc.map((item, index) => (
            <TocItem key={item.id} tocItem={item} numbering={`${index + 1}`} />
          ))}
        </ul>
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
}

interface TocItemProps {
  tocItem: NavItem;
  numbering: string;
}
function TocItem({ tocItem, numbering }: TocItemProps) {
  return (
    <li className="py-1">
      <div className="group flex items-center gap-2 rounded-md px-2 py-1 transition-colors hover:bg-muted">
        <span className="flex size-5 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
          {numbering}
        </span>
        <span className="text-sm group-hover:text-primary">
          {tocItem.label}
        </span>
      </div>
      {tocItem.subitems && tocItem.subitems.length > 0 && (
        <ul className="ml-7 mt-1 space-y-0.5 border-l border-muted pl-2">
          {tocItem.subitems.map((subitem, index) => (
            <TocItem
              key={subitem.id}
              tocItem={subitem}
              numbering={`${numbering}.${index + 1}`}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default InformationTab;
