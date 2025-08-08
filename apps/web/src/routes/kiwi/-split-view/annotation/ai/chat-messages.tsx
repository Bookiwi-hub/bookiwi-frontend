import { memo } from "react";

import { Comment } from "@bookiwi/supabase/types";

import ChatItem from "./chat-item";
import EmptyChat from "./empty-chat";

export interface ChatMessage extends Comment {
  isLoading?: boolean;
  isError?: boolean;
}

interface ChatMessagesProps {
  messages: ChatMessage[];
  participantId: string;
  onRetry?: (messageId: string) => void;
}

function ChatMessages({ messages, participantId, onRetry }: ChatMessagesProps) {
  if (messages.length === 0) {
    return <EmptyChat />;
  }

  return (
    <div className="flex flex-col gap-4">
      {messages.map((message, index) => (
        <ChatItem
          key={message.id || `temp-${index}`}
          text={message.text}
          date={message.createdAt}
          profileImage={message.profileImage}
          name={message.name}
          color={message.color}
          isUser={message.participantId === participantId}
          isLoading={message.isLoading || false}
          isError={message.isError || false}
          onRetry={
            message.isError &&
            message.participantId !== participantId &&
            onRetry
              ? () => onRetry(message.id)
              : undefined
          }
        />
      ))}
    </div>
  );
}

export default memo(ChatMessages);
