import { memo, useEffect, useRef } from "react";

import { useAtomValue, useSetAtom } from "@bookiwi/jotai";
import { Annotation, Comment, Highlight } from "@bookiwi/supabase/types";

import CommentForm from "./comment-form";
import Comments from "./comments";
import HighlightedText from "./highlighted-text";

import { ScrollArea } from "#/components/ui/scroll-area";
import {
  updateAnnotationAtom,
  participantInfoAtom,
  participantsAtom,
  navAtom,
} from "#/routes/kiwi/-reader/atoms";

interface CommentProps {
  highlight: Highlight;
}
function AnnotationTab({ highlight }: CommentProps) {
  // const { comments } = highlight;
  const comments = [] as Comment[];

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const prevCommentsLengthRef = useRef<number>(comments.length);
  const participantInfo = useAtomValue(participantInfoAtom);
  const participants = useAtomValue(participantsAtom);
  const updateAnnotation = useSetAtom(updateAnnotationAtom);
  const navItems = useAtomValue(navAtom);
  const annotationNav = navItems?.find(
    (item) => item.href === highlight.sectionHref,
  );
  const sectionLabel = annotationNav?.label;

  useEffect(
    () => {
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
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      // comments
    ],
  );

  if (!participantInfo) return null;
  const highlighter = participants.find(
    (participant) => participant.id === highlight.participantId,
  );

  const handleCommentSubmit = (commentText: string) => {
    const currentDate = new Date().toISOString();
    const newComment = {
      id: comments.length.toString(),
      text: commentText,
      createdAt: currentDate,
      updatedAt: currentDate,
      participantId: participantInfo.id,
    };
    const updatedAnnotation: Annotation = {
      ...highlight,
      comments: [...comments, newComment],
    };
    updateAnnotation(updatedAnnotation);
  };

  return (
    <div className="flex size-full flex-col justify-between">
      <ScrollArea className="flex flex-col p-4" ref={scrollAreaRef}>
        <HighlightedText
          color={highlight.color}
          text={highlight.text}
          date={highlight.updatedAt}
          creatorName={highlighter?.name ?? ""}
          sectionLabel={sectionLabel}
        />
        <Comments comments={comments} />
      </ScrollArea>

      <CommentForm
        onSubmit={handleCommentSubmit}
        participantColor={participantInfo.color}
      />
    </div>
  );
}

export default memo(AnnotationTab);
