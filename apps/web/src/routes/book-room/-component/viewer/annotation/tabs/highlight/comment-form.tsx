import { Send } from "lucide-react";
import { useState } from "react";

import { ParticipantType } from "#/DB/participants";
import { Button } from "#/components/ui/button";
import { Textarea } from "#/components/ui/textarea";

interface CommentFormProps {
  onSubmit: (commentText: string) => void;
  currentUser: ParticipantType;
}

function CommentForm({ onSubmit, currentUser }: CommentFormProps) {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    onSubmit(newComment);
    setNewComment("");
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
        className="min-h-9 resize-none px-3 py-2"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (newComment.trim()) {
              handleSubmit(e);
            }
          }
        }}
        style={{
          height: "36px",
          overflow: "hidden",
        }}
        onInput={(e) => {
          const target = e.target as HTMLTextAreaElement;
          target.style.height = "36px";
          target.style.height = `${Math.min(target.scrollHeight, 210)}px`;
          if (target.scrollHeight > 210) {
            target.style.overflowY = "auto";
          } else {
            target.style.overflowY = "hidden";
          }
        }}
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
  );
}

export default CommentForm;
