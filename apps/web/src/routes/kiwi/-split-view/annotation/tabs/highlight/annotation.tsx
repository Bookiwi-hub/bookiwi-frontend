import { useRef, useEffect } from "react";

import { useAtomValue } from "@bookiwi/jotai";

import CommentForm from "./comment-form";
import Comments from "./comments";
import HighlightedText from "./highlighted-text";

import { primaryColor } from "#/DB/color";
import { ScrollArea } from "#/components/ui/scroll-area";
import {
  participantColorAtom,
  participantsAtom,
} from "#/routes/kiwi/-reader/atoms/participants";
import { AnnotationIDBData } from "#/types/idb";

interface CommentProps {
  annotation: AnnotationIDBData;
}
function Annotation({ annotation }: CommentProps) {
  const { comments } = annotation;
  const participantColor = useAtomValue(participantColorAtom);
  const participants = useAtomValue(participantsAtom);
  const highlighter = participants.find(
    (participant) => participant.id === annotation.participantId,
  );

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const handleCommentSubmit = (commentText: string) => {
    const currentDate = new Date().toISOString();
    if (!currentDate) return;
    console.log(commentText);
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]",
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, []);

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

export default Annotation;
