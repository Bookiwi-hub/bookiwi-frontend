import { memo } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import { cn } from "#/lib/utils";
import { formatDate } from "#/utils/format-date";

interface CommentItemProps {
  text: string;
  date: string;
  isMine: boolean;
  profileImage: string;
  name: string;
  color: string;
}

function CommentItem({
  text,
  date,
  isMine,
  profileImage,
  name,
  color,
}: CommentItemProps) {
  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div className="flex max-w-[85%]">
        {!isMine && (
          <div className="mr-2 shrink-0">
            <Avatar className="size-7">
              <AvatarImage src={profileImage} />
              <AvatarFallback className="text-xs">
                {name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
        )}

        <div className="flex flex-col">
          {!isMine && (
            <span className="mb-1 text-xs font-medium text-foreground/80">
              {name}
            </span>
          )}
          <div
            className={cn(
              "rounded-lg bg-accent p-3 shadow-sm",
              isMine ? "rounded-tr-none" : "rounded-tl-none",
            )}
            style={{
              borderBottom: `3px solid ${color}`,
            }}
          >
            <p className="whitespace-pre-wrap text-sm text-foreground">
              {text}
            </p>
            <span className="mt-1 block text-right text-xs text-muted-foreground">
              {formatDate(date)}
            </span>
          </div>
        </div>

        {isMine && (
          <div className="ml-2 shrink-0">
            <Avatar className="size-7">
              <AvatarImage src={profileImage} />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(CommentItem);
