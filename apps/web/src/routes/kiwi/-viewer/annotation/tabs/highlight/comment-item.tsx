import { memo } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import { cn } from "#/lib/utils";
import { ParticipantType } from "#/types/kiwi";
import { formatDate } from "#/utils/format-date";

interface CommentItemProps {
  creator: ParticipantType;
  text: string;
  date: string;
  currentUser: ParticipantType;
}

function CommentItem({ creator, text, date, currentUser }: CommentItemProps) {
  const isCurrentUser = creator.id === currentUser.id;
  const formattedDate = formatDate(date);

  return (
    <div className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
      <div className="flex max-w-[85%]">
        {!isCurrentUser && (
          <div className="mr-2 shrink-0">
            <Avatar className="size-7">
              <AvatarImage src={creator.profileImage} />
              <AvatarFallback className="text-xs">
                {creator.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
        )}

        <div className="flex flex-col">
          {!isCurrentUser && (
            <span className="mb-1 text-xs font-medium text-foreground/80">
              {creator.name}
            </span>
          )}
          <div
            className={cn(
              "rounded-lg bg-accent p-3 shadow-sm",
              isCurrentUser ? "rounded-tr-none" : "rounded-tl-none",
            )}
            style={{
              borderBottom: `3px solid ${creator.color}`,
            }}
          >
            <p className="whitespace-pre-wrap text-sm text-foreground">
              {text}
            </p>
            <span className="mt-1 block text-right text-xs text-muted-foreground">
              {formattedDate}
            </span>
          </div>
        </div>

        {isCurrentUser && (
          <div className="ml-2 shrink-0">
            <Avatar className="size-7">
              <AvatarImage src={currentUser.profileImage} />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(CommentItem);
