import { memo } from "react";

import { useAtomValue } from "@bookiwi/jotai";

import CommentItem from "./comment-item";
import EmptyComments from "./empty-comments";

import {
  participantIdAtom,
  participantsAtom,
} from "#/routes/kiwi/-reader/atoms/participants";
import { AnnotationIDBData } from "#/types/idb";

interface CommentsProps {
  comments: AnnotationIDBData["comments"];
}

function Comments({ comments }: CommentsProps) {
  const participants = useAtomValue(participantsAtom);
  const participantId = useAtomValue(participantIdAtom);

  return comments.length > 0 ? (
    comments.map((comment) => {
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
    })
  ) : (
    <EmptyComments />
  );
}

export default memo(Comments);
