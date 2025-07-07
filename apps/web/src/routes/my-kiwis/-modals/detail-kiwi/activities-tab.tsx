import { MyKiwi } from "@bookiwi/supabase/types/response";

import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import { Separator } from "#/components/ui/separator";

interface ActivitiesTabProps {
  kiwi: MyKiwi;
}

function ActivitiesTab({ kiwi }: ActivitiesTabProps) {
  const { participants } = kiwi;

  return (
    <div className="space-y-6">
      {/* 팀원 진도율 */}
      <div className="space-y-3">
        <h3 className="font-medium">팀원 진도율</h3>
        <div className="space-y-3 rounded-lg border p-4">
          {participants.map((participant) => (
            <div key={participant.userId} className="flex items-center gap-3">
              <Avatar className="size-8">
                <AvatarImage src={participant.profileImage} />
                <AvatarFallback>{participant.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-1 items-center gap-3">
                <span className="min-w-20 text-sm">{participant.name}</span>
                <div className="flex-1">
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${participant.progress}%` }}
                    />
                  </div>
                </div>
                <span className="min-w-12 text-right text-sm tabular-nums text-muted-foreground">
                  {participant.progress}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <h3 className="font-medium">최근 활동</h3>
        <div className="rounded-lg border border-dashed p-4 text-center">
          <p className="text-sm text-muted-foreground">
            아직 활동 내역이 없습니다.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ActivitiesTab;
