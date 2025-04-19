import { MessageSquare, Send } from "lucide-react";
import { useState } from "react";

import { highlightData } from "#/DB/annotation-highlight";

function Highlight() {
  // Mock data for highlighted text and comments with user information
  // In a real implementation, this would come from a state management system or API
  const [currentHighlight, setCurrentHighlight] = useState(highlightData);

  // Current user info - DB와 동일한 값으로 설정
  const currentUser = {
    id: "currentUser",
    name: "KIWI",
    profileImg: "https://github.com/shadcn.png",
    color: "rgba(186, 230, 55, 1)",
  };

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
          participant: currentUser,
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
          className="mb-2 rounded-md border p-3"
          style={{
            backgroundColor: currentHighlight.creator.color,
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
                const isCurrentUser = comment.participant.id === currentUser.id;

                return (
                  <div
                    key={comment.id}
                    className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
                  >
                    <div className="flex max-w-[85%]">
                      {!isCurrentUser && (
                        <div className="mr-2 shrink-0">
                          <img
                            src={
                              comment.participant.profileImg ||
                              `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.participant.id}`
                            }
                            alt={comment.participant.name}
                            className="size-8 rounded-full"
                          />
                        </div>
                      )}

                      <div className="flex flex-col">
                        {!isCurrentUser && (
                          <span className="mb-1 text-xs font-medium text-gray-700">
                            {comment.participant.name}
                          </span>
                        )}
                        <div
                          className={`rounded-lg p-3 ${
                            isCurrentUser
                              ? "rounded-tr-none"
                              : "rounded-tl-none"
                          }`}
                          style={{
                            backgroundColor: comment.participant.color,
                          }}
                        >
                          <p className="text-sm text-gray-900">
                            {comment.text}
                          </p>
                          <span className="mt-1 block text-right text-xs text-gray-600">
                            {comment.date}
                          </span>
                        </div>
                      </div>

                      {isCurrentUser && (
                        <div className="ml-2 shrink-0">
                          <img
                            src={
                              comment.participant.profileImg ||
                              `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.participant.id}`
                            }
                            alt={comment.participant.name}
                            className="size-8 rounded-full"
                          />
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
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="코멘트를 입력하세요..."
            className="flex-1 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!newComment.trim()}
            className="rounded-md bg-blue-500 p-2 text-white hover:bg-blue-600 disabled:bg-gray-300"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Highlight;
