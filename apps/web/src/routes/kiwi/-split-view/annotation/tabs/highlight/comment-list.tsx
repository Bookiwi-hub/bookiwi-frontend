import CommentItem from "./comment-item";
import EmptyComments from "./empty-comments";

import { CommentType } from "#/DB/annotation-highlight";

interface CommentsListProps {
  comments: CommentType[];
}

function CommentsList({ comments }: CommentsListProps) {
  if (comments.length === 0) {
    return <EmptyComments />;
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          text={comment.text}
          date={comment.date}
          isMine={false}
          profileImage={comment.creator.profileImage}
          name={comment.creator.name}
          color={comment.creator.color}
        />
      ))}
    </div>
  );
}

export default CommentsList;
