import { useAtomValue } from "@bookiwi/jotai";

import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import { participantsAtom } from "#/routes/kiwi/-reader/atoms";

function ParticipantsPanel() {
  const participants = useAtomValue(participantsAtom);

  if (participants.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="text-sm text-muted-foreground">
          아직 참가자가 없습니다
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="mb-2 text-sm font-medium text-foreground">
        참가자 ({participants.length}명)
      </div>
      {participants.map((participant) => (
        <Participant
          key={participant.id}
          profileImage={participant.profileImage}
          name={participant.name}
          color={participant.color}
          progress={participant.record.percentage || 0}
        />
      ))}
    </div>
  );
}

interface ParticipantProps {
  profileImage: string;
  name: string;
  color: string;
  progress: number;
}

function Participant({
  profileImage,
  name,
  color,
  progress,
}: ParticipantProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-muted/30 p-3 transition-colors hover:bg-muted/50">
      <div className="relative">
        <Avatar
          className="size-10 ring-2 ring-offset-2 ring-offset-background"
          style={{ "--tw-ring-color": color } as React.CSSProperties}
        >
          <AvatarImage src={profileImage} alt={name} />
          <AvatarFallback
            className="text-sm font-medium text-white"
            style={{ backgroundColor: color }}
          >
            {name[0]?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
        {/* Online indicator */}
        <div
          className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-background"
          style={{ backgroundColor: color }}
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center justify-between">
          <span className="truncate text-sm font-medium text-foreground">
            {name}
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            {progress}%
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="relative h-full rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${Math.min(progress, 100)}%`,
              backgroundColor: color,
            }}
          >
            {/* Shine effect */}
            <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParticipantsPanel;
