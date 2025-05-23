import { Calendar, MessageSquare, Users } from "lucide-react";

import { Button } from "#/components/ui/button";
import { Separator } from "#/components/ui/separator";
import { Kiwi } from "#/types/kiwi";

interface DiscussionsTabProps {
  kiwi: Kiwi;
}

function DiscussionsTab({ kiwi }: DiscussionsTabProps) {
  const { discussions = [], events = [] } = kiwi;

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="font-medium">진행 중인 토론</h3>

        {discussions.length === 0 ? (
          <div className="rounded-lg border border-dashed p-4 text-center">
            <p className="text-sm text-muted-foreground">
              아직 진행 중인 토론이 없습니다.
            </p>
          </div>
        ) : (
          discussions.map((discussion) => (
            <div
              key={discussion.id}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="size-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">{discussion.title}</p>
                  <p className="text-xs text-muted-foreground">
                    댓글 {discussion.comments}개 • {discussion.lastActive}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-xs">
                참여
              </Button>
            </div>
          ))
        )}
      </div>

      <Separator />

      <div className="space-y-3">
        <h3 className="font-medium">다가오는 이벤트</h3>

        {events.length === 0 ? (
          <div className="rounded-lg border border-dashed p-4 text-center">
            <p className="text-sm text-muted-foreground">
              예정된 이벤트가 없습니다.
            </p>
          </div>
        ) : (
          events.map((event) => (
            <div key={event.id} className="rounded-lg border p-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Calendar className="size-5 text-primary" />
                    <p className="text-sm font-medium">{event.title}</p>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    <p>
                      {event.date} {event.time}
                    </p>
                    <p className="mt-1 flex items-center gap-1">
                      <Users className="size-3" />
                      <span>{event.participants}명 참여 예정</span>
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="text-xs">
                  알림 설정
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="rounded-lg border border-dashed p-4 text-center">
        <p className="text-sm font-medium">
          새 토론이나 이벤트를 만들고 싶으신가요?
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          그룹에 참여하여 새로운 주제를 시작하세요.
        </p>
      </div>
    </div>
  );
}

export default DiscussionsTab;
