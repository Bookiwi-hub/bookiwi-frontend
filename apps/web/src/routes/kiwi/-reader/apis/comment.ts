import { toast } from "sonner";

import { Comment, NewComment } from "@bookiwi/supabase/types";

import supabaseManager from "#/managers/supabase";
import userManager from "#/managers/user";

export const addComment = async (newComment: NewComment) => {
  try {
    if (userManager.isGuest) {
      const userComments = userManager.getGuestComments();
      const participant = userManager.getGuestParticipant();
      if (!participant) throw new Error("Guest participant not found");
      const commentId = `${newComment.highlightId}-${newComment.createdAt}`;
      const createdComment: Comment = {
        ...newComment,
        id: commentId,
        name: participant.name,
        profileImage: participant.profileImage,
        color: participant.color,
      };
      userManager.setGuestComments([...userComments, createdComment]);
      return { id: commentId };
    }
    return await supabaseManager.reader.addHighlightComment(newComment);
  } catch (error) {
    toast.error("댓글 작성에 실패했습니다.");
    return { id: null };
  }
};

export const getHighlightComments = async (highlightId: string) => {
  if (userManager.isGuest) {
    const guestUserHighlights = userManager.getGuestHighlights();
    const guestUserHighlight = guestUserHighlights.find(
      (highlight) => highlight.id === highlightId,
    );
    const userComments = userManager.getGuestComments();
    const guestHighlightComments = userComments.filter(
      (comment) => comment.highlightId === highlightId,
    );
    if (guestUserHighlight) {
      return guestHighlightComments;
    }
    const highlightComments =
      await supabaseManager.reader.getHighlightComments(highlightId);
    return [...highlightComments, ...guestHighlightComments];
  }
  return supabaseManager.reader.getHighlightComments(highlightId);
};
