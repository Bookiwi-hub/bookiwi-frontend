import { CommentType } from "#/DB/annotation-highlight";
import { ParticipantType } from "#/DB/participants";
import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import { cn } from "#/lib/utils";

interface CommentItemProps {
  comment: CommentType;
  currentUser: ParticipantType;
}

function CommentItem({ comment, currentUser }: CommentItemProps) {
  const isCurrentUser = comment.creator.id === currentUser.id;

  return (
    <div className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
      <div className="flex max-w-[85%]">
        {!isCurrentUser && (
          <div className="mr-2 shrink-0">
            <Avatar className="size-7">
              <AvatarImage src={comment.creator.profileImage} />
              <AvatarFallback className="text-xs">
                {comment.creator.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
        )}

        <div className="flex flex-col">
          {!isCurrentUser && (
            <span className="mb-1 text-xs font-medium text-foreground/80">
              {comment.creator.name}
            </span>
          )}
          <div
            className={cn(
              "rounded-lg bg-accent p-3 shadow-sm",
              isCurrentUser ? "rounded-tr-none" : "rounded-tl-none",
            )}
            style={{
              borderBottom: `3px solid ${comment.creator.color}`,
            }}
          >
            <p className="text-sm text-foreground">{comment.text}</p>
            <span className="mt-1 block text-right text-xs text-muted-foreground">
              {comment.date}
            </span>
          </div>
        </div>

        {isCurrentUser && (
          <div className="ml-2 shrink-0">
            <Avatar className="size-7">
              <AvatarImage src={comment.creator.profileImage} />
              <AvatarFallback>{comment.creator.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentItem;
