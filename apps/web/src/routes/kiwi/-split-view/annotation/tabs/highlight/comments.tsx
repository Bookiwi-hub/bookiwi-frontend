import { memo } from "react";

import { useAtomValue } from "@bookiwi/jotai";
import { Annotation } from "@bookiwi/supabase/types";

import CommentItem from "./comment-item";
import EmptyComments from "./empty-comments";

import {
  participantIdAtom,
  participantsAtom,
} from "#/routes/kiwi/-reader/atoms";

interface CommentsProps {
  comments: Annotation["comments"];
}

function Comments({ comments }: CommentsProps) {
  const participants = useAtomValue(participantsAtom);
  const participantId = useAtomValue(participantIdAtom);

  if (!participantId) return null;

  return comments.length > 0 ? (
    <div className="flex flex-col gap-4">
      {comments.map((comment) => {
        const commenter = participants.find(
          (participant) => participant.id === comment.participantId,
        );
        if (!commenter) return null;
        return (
          <CommentItem
            key={comment.id}
            text={comment.text}
            date={comment.updatedAt}
            isMine={comment.participantId === participantId}
            profileImage={commenter.profileImage}
            name={commenter.name}
            color={commenter.color}
          />
        );
      })}
    </div>
  ) : (
    <EmptyComments />
  );
}

export default memo(Comments);
