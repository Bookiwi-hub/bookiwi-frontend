import { useRef, useEffect } from "react";

import CommentForm from "./comment-form";
import CommentItem from "./comment-item";
import EmptyComments from "./empty-comments";
import HighlightedText from "./highlighted-text";

import { ScrollArea } from "#/components/ui/scroll-area";
import { AnnotationIDBData } from "#/types/idb";

interface CommentProps {
  annotation: AnnotationIDBData;
}
function Annotation({ annotation }: CommentProps) {
  const { comments } = annotation;
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
          color={annotation?.color ?? ""}
          text={annotation?.text ?? ""}
          page={annotation?.sectionIndex ?? 0}
          date={annotation?.updatedAt ?? ""}
          creatorName={annotation?.participantId ?? ""}
        />
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              text={comment.text}
              date={comment.updatedAt}
              isMine={false}
              profileImage={comment.participantId}
              name={comment.participantId}
              color={annotation?.color ?? ""}
            />
          ))
        ) : (
          <EmptyComments />
        )}
      </ScrollArea>

      <CommentForm
        onSubmit={handleCommentSubmit}
        participantColor={annotation?.color ?? ""}
      />
    </div>
  );
}

export default Annotation;
