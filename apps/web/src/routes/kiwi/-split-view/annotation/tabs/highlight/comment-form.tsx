import { Send } from "lucide-react";
import { useState } from "react";

import { Button } from "#/components/ui/button";
import { Textarea } from "#/components/ui/textarea";
import { Participant } from "#/types/kiwi";

interface CommentFormProps {
  onSubmit: (commentText: string) => void;
  currentUser: Participant;
}

function CommentForm({ onSubmit, currentUser }: CommentFormProps) {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    onSubmit(newComment);
    setNewComment("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.stopPropagation();
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (newComment.trim()) {
        handleSubmit(e as unknown as React.FormEvent);
      }
    }
  };

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    target.style.height = "36px";
    target.style.height = `${Math.min(target.scrollHeight, 210)}px`;
    if (target.scrollHeight > 210) {
      target.style.overflowY = "auto";
    } else {
      target.style.overflowY = "hidden";
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 border-t p-3"
    >
      <Textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="코멘트를 입력하세요..."
        className="h-9 min-h-9 resize-none overflow-hidden px-3 py-2"
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        autoFocus
      />
      <Button
        type="submit"
        variant="outline"
        size="icon"
        disabled={!newComment.trim()}
        style={{
          backgroundColor: newComment.trim() ? currentUser.color : "",
        }}
        className="h-full"
      >
        <Send size={16} />
      </Button>
    </form>
  );
}

export default CommentForm;
