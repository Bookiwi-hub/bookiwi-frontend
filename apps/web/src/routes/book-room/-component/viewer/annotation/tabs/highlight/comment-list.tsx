import CommentItem from "./comment-item";
import EmptyComments from "./empty-comments";

import { CommentType } from "#/DB/annotation-highlight";
import { ParticipantType } from "#/DB/participants";

interface CommentsListProps {
  comments: CommentType[];
  currentUser: ParticipantType;
}

function CommentsList({ comments, currentUser }: CommentsListProps) {
  if (comments.length === 0) {
    return <EmptyComments />;
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          currentUser={currentUser}
        />
      ))}
    </div>
  );
}

export default CommentsList;
