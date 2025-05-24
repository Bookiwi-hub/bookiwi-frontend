import CommentItem from "./comment-item";
import EmptyComments from "./empty-comments";

import { CommentType } from "#/DB/annotation-highlight";
import { ParticipantType } from "#/types/kiwi";

interface CommentsListProps {
  comments: CommentType[];
  currentUser: ParticipantType;
}

function CommentsList({ comments, currentUser }: CommentsListProps) {
  if (comments.length === 0) {
    return <EmptyComments />;
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          creator={comment.creator}
          text={comment.text}
          date={comment.date}
          currentUser={currentUser}
        />
      ))}
    </div>
  );
}

export default CommentsList;
