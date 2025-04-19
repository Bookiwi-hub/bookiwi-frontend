import { useState } from "react";

import CommentForm from "./comment-form";
import CommentsList from "./comment-list";
import HighlightedText from "./highlighted-text";

import { highlightData } from "#/DB/annotation-highlight";
import { participants } from "#/DB/participants";

function Highlight() {
  const [currentHighlight, setCurrentHighlight] = useState(highlightData);
  const currentUser = participants[0]!;

  const handleCommentSubmit = (commentText: string) => {
    const currentDate = new Date().toISOString().split("T")[0];
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

  return (
    <div className="flex h-full flex-col justify-between p-4">
      <div className="flex flex-col gap-4">
        <HighlightedText
          color={currentHighlight.creator.color}
          text={currentHighlight.text}
          page={currentHighlight.page}
          date={currentHighlight.date}
        />
        <CommentsList
          comments={currentHighlight.comments}
          currentUser={currentUser}
        />
      </div>
      <CommentForm onSubmit={handleCommentSubmit} currentUser={currentUser} />
    </div>
  );
}

export default Highlight;
