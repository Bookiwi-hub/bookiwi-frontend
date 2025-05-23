import { Book, Calendar, Clock, User, Users } from "lucide-react";

import { Kiwi } from "#/types/kiwi";

interface InformationTabProps {
  kiwi: Kiwi;
}

function InformationTab({ kiwi }: InformationTabProps) {
  const {
    admin,
    book,
    createdAt,
    lastActivityAt,
    detailDescription,
    progress = 0,
    memberCount = 0,
    members = [],
  } = kiwi;

  const fallbackImageUrl =
    "https://placehold.co/300x400/e2e8f0/64748b?text=No+Cover";

  return (
    <div className="mb-10 space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <div className="aspect-[3/4] overflow-hidden rounded-md bg-gray-100">
            <img
              src={book.coverImage || fallbackImageUrl}
              alt="Book cover"
              className="size-full object-cover"
            />
          </div>
        </div>

        <div className="col-span-2 space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">그룹 정보</h3>
            <ul className="space-y-2 text-sm">
              {admin && (
                <li className="flex items-center gap-2">
                  <User size={16} className="text-muted-foreground" />
                  <span>관리자: {admin}</span>
                </li>
              )}
              <li className="flex items-center gap-2">
                <Users size={16} className="text-muted-foreground" />
                <span className="flex items-center gap-1">
                  <span className="font-medium text-primary">
                    {members.length}명
                  </span>
                  <span className="text-muted-foreground">
                    / {memberCount}명
                  </span>
                </span>
              </li>
              {book && (
                <li className="flex items-center gap-2">
                  <Book size={16} className="text-muted-foreground" />
                  <span>
                    {book.title} - {book.author}
                  </span>
                </li>
              )}
              {createdAt && (
                <li className="flex items-center gap-2">
                  <Calendar size={16} className="text-muted-foreground" />
                  <span>생성일: {createdAt}</span>
                </li>
              )}
              <li className="flex items-center gap-2">
                <Clock size={16} className="text-muted-foreground" />
                <span>최근 활동: {lastActivityAt}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium">진행 상황</h3>
            <div className="mt-2">
              <div className="flex justify-between text-xs">
                <span>{progress}% 완료</span>
              </div>
              <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <h3 className="font-medium">목차</h3>

        {book.toc.map((item, index) => (
          <div key={item.id}>
            <span>{index + 1}.</span>
            <span>{item.label}</span>
            {/* <span>{item.subitems.length}</span> */}
          </div>
        ))}
      </div>

      {detailDescription && (
        <div className="space-y-2">
          <h3 className="font-medium">그룹 소개</h3>
          <p className="text-sm text-muted-foreground">{detailDescription}</p>
        </div>
      )}
    </div>
  );
}

export default InformationTab;
