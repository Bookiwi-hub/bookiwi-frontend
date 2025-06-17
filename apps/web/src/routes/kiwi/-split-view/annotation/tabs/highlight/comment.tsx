import { useRef, useEffect } from "react";

import CommentForm from "./comment-form";
import CommentsList from "./comment-list";
import HighlightedText from "./highlighted-text";

import { ScrollArea } from "#/components/ui/scroll-area";
import { AnnotationIDBData } from "#/types/idb";

interface CommentProps {
  selectedAnnotation: AnnotationIDBData;
}
function Comment({ selectedAnnotation }: CommentProps) {
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
          color={selectedAnnotation?.color ?? ""}
          text={selectedAnnotation?.text ?? ""}
          page={selectedAnnotation?.sectionIndex ?? 0}
          date={selectedAnnotation?.updatedAt ?? ""}
          creatorName={selectedAnnotation?.participantId ?? ""}
        />
        <CommentsList comments={[]} />
      </ScrollArea>

      <CommentForm
        onSubmit={handleCommentSubmit}
        participantColor={selectedAnnotation?.color ?? ""}
      />
    </div>
  );
}

export default Comment;
