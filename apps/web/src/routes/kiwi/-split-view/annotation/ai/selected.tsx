import { useState, useRef, useEffect, memo } from "react";

import { useAtomValue } from "@bookiwi/jotai";
import { Comment, Highlight } from "@bookiwi/supabase/types";

import HighlightedText from "../highlighted-text";

import ChatForm from "./chat-form";
import ChatMessages, { ChatMessage } from "./chat-messages";

import { ScrollArea } from "#/components/ui/scroll-area";
import { askAi } from "#/routes/kiwi/-reader/apis";
import { participantInfoAtom } from "#/routes/kiwi/-reader/atoms";

interface SelectedProps {
  highlight: Highlight;
}

function Selected({ highlight }: SelectedProps) {
  const participantInfo = useAtomValue(participantInfoAtom);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const prevMessagesLengthRef = useRef<number>(messages.length);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const callAiApi = async (
    userMessage: string,
    aiMessageId: string,
  ): Promise<string> => {
    const history: { role: "user" | "assistant"; content: string }[] = messages
      .filter((m) => m.id !== aiMessageId)
      .map((m) => ({
        role:
          m.participantId === participantInfo?.id
            ? ("user" as const)
            : ("assistant" as const),
        content: m.text,
      }))
      .filter((h) => h.content && h.content.trim().length > 0);

    return askAi(userMessage, {
      highlightText: highlight.text,
      history,
    });
  };

  const handleSendMessage = async (message: Comment) => {
    // 1. 사용자 메시지를 즉시 추가
    const userMessage: ChatMessage = {
      ...message,
      id: `user-${Date.now()}`,
    };
    setMessages((prev) => [...prev, userMessage]);

    // 2. AI 응답을 위한 로딩 메시지 추가
    const aiMessageId = `ai-${Date.now()}`;
    const aiLoadingMessage: ChatMessage = {
      id: aiMessageId,
      highlightId: highlight.id,
      text: "",
      participantId: "",
      name: "",
      profileImage: null,
      color: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isLoading: true,
      isError: false,
    };
    setMessages((prev) => [...prev, aiLoadingMessage]);

    await processAiResponse(aiMessageId, message.text);
  };

  const processAiResponse = async (aiMessageId: string, userText: string) => {
    setIsLoading(true);

    try {
      // 3. AI API 호출 (대화 기록 포함)
      const aiResponse = await callAiApi(userText, aiMessageId);

      // 4. 성공 시 AI 응답으로 업데이트
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiMessageId
            ? {
                ...msg,
                text: aiResponse,
                isLoading: false,
                isError: false,
              }
            : msg,
        ),
      );
    } catch (error) {
      // 5. 오류 시 오류 메시지로 업데이트
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiMessageId
            ? {
                ...msg,
                text: "",
                isLoading: false,
                isError: true,
              }
            : msg,
        ),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = async (messageId: string) => {
    const message = messages.find((msg) => msg.id === messageId);
    if (!message) return;

    // 메시지를 로딩 상태로 변경
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? {
              ...msg,
              isLoading: true,
              isError: false,
            }
          : msg,
      ),
    );

    // 원본 사용자 메시지 찾기 (AI 메시지 바로 이전 메시지)
    const messageIndex = messages.findIndex((msg) => msg.id === messageId);
    const userMessage = messageIndex > 0 ? messages[messageIndex - 1] : null;

    if (userMessage) {
      await processAiResponse(messageId, userMessage.text);
    }
  };

  useEffect(
    () => {
      // 새 코멘트가 추가되었을 때만 스크롤을 맨 아래로 이동
      if (messages.length > prevMessagesLengthRef.current) {
        if (scrollAreaRef.current) {
          const scrollContainer = scrollAreaRef.current.querySelector(
            "[data-radix-scroll-area-viewport]",
          );
          if (scrollContainer) {
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
          }
        }
      }
      prevMessagesLengthRef.current = messages.length;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [messages],
  );

  if (!participantInfo) return null;

  return (
    <div className="flex size-full flex-col justify-between">
      <ScrollArea className="flex flex-col p-4" ref={scrollAreaRef}>
        <HighlightedText text={highlight.text} />
        <ChatMessages
          messages={messages}
          participantId={participantInfo.id}
          onRetry={handleRetry}
        />
      </ScrollArea>

      <ChatForm
        onSubmit={handleSendMessage}
        participantInfo={participantInfo}
        highlight={highlight}
        isLoading={isLoading}
      />
    </div>
  );
}

export default memo(Selected);
