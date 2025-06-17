import { memo, useEffect, useRef } from "react";

import { useAtomValue, useSetAtom } from "@bookiwi/jotai";

import CommentForm from "./comment-form";
import Comments from "./comments";
import HighlightedText from "./highlighted-text";

import { primaryColor } from "#/DB/color";
import { ScrollArea } from "#/components/ui/scroll-area";
import {
  updateAnnotationAtom,
  participantColorAtom,
  participantIdAtom,
  participantsAtom,
  navAtom,
} from "#/routes/kiwi/-reader/atoms";
import { AnnotationIDBData } from "#/types/idb";

interface CommentProps {
  annotation: AnnotationIDBData;
}
function Annotation({ annotation }: CommentProps) {
  const { comments } = annotation;
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const prevCommentsLengthRef = useRef<number>(comments.length);
  const participantColor = useAtomValue(participantColorAtom);
  const participants = useAtomValue(participantsAtom);
  const participantId = useAtomValue(participantIdAtom);
  const updateAnnotation = useSetAtom(updateAnnotationAtom);
  const navItem = useAtomValue(navAtom);
  useEffect(() => {
    // 새 코멘트가 추가되었을 때만 스크롤을 맨 아래로 이동
    if (comments.length > prevCommentsLengthRef.current) {
      if (scrollAreaRef.current) {
        const scrollContainer = scrollAreaRef.current.querySelector(
          "[data-radix-scroll-area-viewport]",
        );
        if (scrollContainer) {
          scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
      }
    }
    prevCommentsLengthRef.current = comments.length;
  }, [comments]);

  if (!participantId) return null;
  const highlighter = participants.find(
    (participant) => participant.id === annotation.participantId,
  );

  const handleCommentSubmit = (commentText: string) => {
    const currentDate = new Date().toISOString();
    const newComment = {
      id: comments.length.toString(),
      text: commentText,
      createdAt: currentDate,
      updatedAt: currentDate,
      participantId,
    };
    const updatedAnnotation: AnnotationIDBData = {
      ...annotation,
      comments: [...comments, newComment],
    };
    updateAnnotation(updatedAnnotation);
  };

  return (
    <div className="flex size-full flex-col justify-between">
      <ScrollArea className="flex flex-col p-4" ref={scrollAreaRef}>
        <HighlightedText
          color={annotation.color}
          text={annotation.text}
          date={annotation.updatedAt}
          creatorName={highlighter?.name ?? ""}
        />
        <Comments comments={comments} />
      </ScrollArea>

      <CommentForm
        onSubmit={handleCommentSubmit}
        participantColor={participantColor ?? primaryColor}
      />
    </div>
  );
}

export default memo(Annotation);
