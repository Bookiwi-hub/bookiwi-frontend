import { Send } from "lucide-react";
import { useState } from "react";

import { Comment, Highlight } from "@bookiwi/supabase/types";

import { Button } from "#/components/ui/button";
import { Textarea } from "#/components/ui/textarea";

interface ChatFormProps {
  onSubmit: (message: Comment) => void;
  participantInfo: {
    id: string;
    name: string;
    profileImage: string | null;
    color: string;
  };
  highlight: Highlight;
  isLoading?: boolean;
}

function ChatForm({
  onSubmit,
  participantInfo,
  highlight,
  isLoading = false,
}: ChatFormProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const newMessage: Comment = {
      id: "",
      highlightId: highlight.id,
      text: message,
      participantId: participantInfo.id,
      name: participantInfo.name,
      profileImage: participantInfo.profileImage,
      color: participantInfo.color,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSubmit(newMessage);
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.stopPropagation();
    if (e.nativeEvent.isComposing) return;

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (message.trim() && !isLoading) {
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
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="AI에게 질문해보세요..."
        className="h-9 min-h-9 resize-none overflow-hidden px-3 py-2"
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        autoFocus
        disabled={isLoading}
        ref={(e) => {
          if (e) {
            e.focus();
          }
        }}
      />
      <Button
        type="submit"
        variant="outline"
        size="icon"
        disabled={!message.trim() || isLoading}
        style={{
          backgroundColor:
            message.trim() && !isLoading ? participantInfo.color : "",
        }}
        className="h-full"
      >
        <Send size={16} />
      </Button>
    </form>
  );
}

export default ChatForm;
