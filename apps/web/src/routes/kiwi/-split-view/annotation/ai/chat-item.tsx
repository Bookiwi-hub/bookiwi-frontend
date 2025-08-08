import { Bot, User, RotateCcw } from "lucide-react";
import { memo } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import { Button } from "#/components/ui/button";
import { cn } from "#/lib/utils";
import { formatDate } from "#/utils/format-date";

interface ChatItemProps {
  text: string;
  date: string;
  isUser: boolean;
  profileImage?: string | null;
  name?: string;
  color?: string;
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
}

function ChatItem({
  text,
  date,
  isUser,
  profileImage,
  name,
  color,
  isLoading = false,
  isError = false,
  onRetry,
}: ChatItemProps) {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className="flex max-w-[85%]">
        {!isUser && (
          <div className="mr-2 shrink-0">
            <Avatar className="size-10">
              <AvatarImage
                src="/images/icon.webp"
                alt="키위 AI"
                className="object-contain p-1"
              />
              <AvatarFallback className="bg-blue-100 text-xs text-blue-600">
                <Bot size={14} />
              </AvatarFallback>
            </Avatar>
          </div>
        )}

        <div className="flex flex-col">
          {!isUser && (
            <span className="mb-1 text-xs font-medium text-foreground/80">
              키위새 AI
            </span>
          )}
          <div
            className={cn(
              "rounded-lg p-3 shadow-sm",
              isUser
                ? "rounded-tr-none bg-accent"
                : "rounded-tl-none bg-blue-50 dark:bg-blue-900/20",
              isLoading && "animate-pulse",
            )}
            style={{
              borderBottom: (() => {
                if (isUser && color) return `3px solid ${color}`;
                if (!isUser) return "3px solid black";
                return undefined;
              })(),
            }}
          >
            <p className="whitespace-pre-wrap text-sm text-foreground">
              {(() => {
                if (isLoading) return "AI가 생각 중 입니다...";
                if (isError) return "답변을 받지 못했습니다. ";
                return text;
              })()}
            </p>
            {isError && onRetry && (
              <div className="mt-2">
                <Button
                  onClick={onRetry}
                  size="sm"
                  variant="outline"
                  className="h-8 text-xs"
                >
                  <RotateCcw size={12} className="mr-1" />
                  다시 시도
                </Button>
              </div>
            )}
            {!isLoading && !isError && (
              <span className="mt-1 block text-right text-xs text-muted-foreground">
                {formatDate(date)}
              </span>
            )}
          </div>
        </div>

        {isUser && (
          <div className="ml-2 shrink-0">
            <Avatar className="size-7">
              <AvatarImage src={profileImage ?? undefined} />
              <AvatarFallback className="text-xs">
                {name?.charAt(0) || <User size={14} />}
              </AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(ChatItem);
