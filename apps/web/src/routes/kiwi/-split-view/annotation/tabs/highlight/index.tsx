import { useState, useRef, useEffect } from "react";

// import { useAnnotationTab } from "../context";

import { useAtomValue } from "@bookiwi/jotai";

import CommentForm from "./comment-form";
import CommentsList from "./comment-list";
import HighlightedText from "./highlighted-text";

import { highlightData } from "#/DB/annotation-highlight";
import { participants } from "#/DB/participants";
import { ScrollArea } from "#/components/ui/scroll-area";
import { selectedAnnotationAtom } from "#/routes/kiwi/-reader/atoms/annotations";

function Highlight() {
  // const { highlightId } = useAnnotationTab();

  const [currentHighlight, setCurrentHighlight] = useState(highlightData);
  const currentUser = participants[0]!;
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const selectedAnnotation = useAtomValue(selectedAnnotationAtom);

  const handleCommentSubmit = (commentText: string) => {
    const currentDate = new Date().toISOString();
    if (!currentDate) return;

    const updatedHighlight = {
      ...currentHighlight,
      comments: [
        ...currentHighlight.comments,
        {
          id: currentHighlight.comments.length + 1,
          text: commentText,
          date: currentDate,
          creator: currentUser,
        },
      ],
    };

    setCurrentHighlight(updatedHighlight);
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
  }, [selectedAnnotation?.comments]);

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
        <CommentsList comments={[]} currentUser={currentUser} />
      </ScrollArea>

      <CommentForm onSubmit={handleCommentSubmit} currentUser={currentUser} />
    </div>
  );
}

export default Highlight;
