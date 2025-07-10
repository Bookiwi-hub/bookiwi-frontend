import { memo } from "react";

import { useAtomValue } from "@bookiwi/jotai";
import { Comment } from "@bookiwi/supabase/types";

import CommentItem from "./comment-item";
import EmptyComments from "./empty-comments";

import { participantIdAtom } from "#/routes/kiwi/-reader/atoms";

interface CommentsProps {
  comments: Comment[];
}

function Comments({ comments }: CommentsProps) {
  const participantId = useAtomValue(participantIdAtom);

  if (!participantId) return null;

  return comments.length > 0 ? (
    <div className="flex flex-col gap-4">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          text={comment.text}
          date={comment.updatedAt}
          isMine={comment.participantId === participantId}
          profileImage={comment.profileImage}
          name={comment.name}
          color={comment.color}
        />
      ))}
    </div>
  ) : (
    <EmptyComments />
  );
}

export default memo(Comments);
