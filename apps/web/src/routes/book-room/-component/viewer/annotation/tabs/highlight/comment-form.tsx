import { Send } from "lucide-react";
import { useState } from "react";

import { ParticipantType } from "#/DB/participants";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";

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
    <div className="mt-auto border-t pt-3">
      <form onSubmit={handleSubmit} className="flex gap-2">
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
  );
}

export default CommentForm;
