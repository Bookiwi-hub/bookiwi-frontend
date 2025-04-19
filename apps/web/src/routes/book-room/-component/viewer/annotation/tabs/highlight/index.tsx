import { MessageSquare, Send } from "lucide-react";
import { useState } from "react";

import { highlightData } from "#/DB/annotation-highlight";
import { participants } from "#/DB/participants";
import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { cn } from "#/lib/utils";

function Highlight() {
  const [currentHighlight, setCurrentHighlight] = useState(highlightData);

  const currentUser = participants[0]!;

  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const currentDate = new Date().toISOString().split("T")[0];
    if (!currentDate) return;

    const updatedHighlight = {
      ...currentHighlight,
      comments: [
        ...currentHighlight.comments,
        {
          id: currentHighlight.comments.length + 1,
          text: newComment,
          date: currentDate,
          creator: currentUser,
        },
      ],
    };

    setCurrentHighlight(updatedHighlight);
    setNewComment("");
  };

  return (
    <div className="flex h-full flex-col justify-between p-4">
      <div className="flex flex-col gap-4">
        {/* Highlighted text section */}
        <div
          className="mb-2 rounded-md bg-gray-50 p-3 shadow-sm"
          style={{
            borderBottom: `4px solid ${currentHighlight.creator.color}`,
          }}
        >
          <p className="text-sm font-bold text-gray-900">
            &ldquo;{currentHighlight.text}&rdquo;
          </p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-gray-700">
              Page {currentHighlight.page}
            </span>
            <span className="text-xs text-gray-700">
              {currentHighlight.date}
            </span>
          </div>
        </div>

        {/* Comments section - chat style */}
        <div>
          {currentHighlight.comments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <MessageSquare className="mb-2 size-8 text-gray-400" />
              <p className="text-sm text-gray-600">코멘트가 없습니다.</p>
              <p className="text-xs text-gray-500">
                하이라이트에 대한 생각이나 느낌을 코멘트로 남겨보세요.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {currentHighlight.comments.map((comment) => {
                const isCurrentUser = comment.creator.id === currentUser.id;

                return (
                  <div
                    key={comment.id}
                    className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
                  >
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
                            isCurrentUser
                              ? "rounded-tr-none"
                              : "rounded-tl-none",
                          )}
                          style={{
                            borderBottom: `3px solid ${comment.creator.color}`,
                          }}
                        >
                          <p className="text-sm text-foreground">
                            {comment.text}
                          </p>
                          <span className="mt-1 block text-right text-xs text-muted-foreground">
                            {comment.date}
                          </span>
                        </div>
                      </div>

                      {isCurrentUser && (
                        <div className="ml-2 shrink-0">
                          <Avatar className="size-7">
                            <AvatarImage src={comment.creator.profileImage} />
                            <AvatarFallback>
                              {comment.creator.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Comment input */}
      <div className="mt-auto border-t pt-3">
        <form onSubmit={handleCommentSubmit} className="flex gap-2">
          <Input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="코멘트를 입력하세요..."
            className="flex-1"
          />
          <Button
            type="submit"
            variant="outline"
            size="icon"
            disabled={!newComment.trim()}
            style={{
              backgroundColor: newComment.trim() ? currentUser.color : "",
            }}
          >
            <Send size={16} />
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Highlight;
