import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import { Button } from "#/components/ui/button";
import { Separator } from "#/components/ui/separator";
import { Kiwi, ParticipantType } from "#/types/kiwi";

interface ActivitiesTabProps {
  kiwi: Kiwi;
}

function ActivitiesTab({ kiwi }: ActivitiesTabProps) {
  const { activities = [], participants = [] } = kiwi;

  return (
    <div className="space-y-6">
      {/* 팀원 진도율 */}
      <div className="space-y-3">
        <h3 className="font-medium">팀원 진도율</h3>
        <div className="space-y-3 rounded-lg border p-4">
          {participants.map((participant: ParticipantType) => (
            <div key={participant.id} className="flex items-center gap-3">
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
        {activities.length === 0 ? (
          <div className="rounded-lg border border-dashed p-4 text-center">
            <p className="text-sm text-muted-foreground">
              아직 활동 내역이 없습니다.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="rounded-lg border p-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex size-8 items-center justify-center rounded-full bg-primary/20">
                      <span className="text-xs font-medium">
                        {activity.user.slice(0, 1)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{activity.user}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.action}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {activity.time}
                  </span>
                </div>
                {activity.content && (
                  <div className="mt-2 rounded bg-muted/30 p-2 text-sm">
                    {activity.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activities.length > 0 && (
          <div className="text-center">
            <Button variant="ghost" size="sm" className="text-xs">
              더 많은 활동 보기
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ActivitiesTab;
