import { toast } from "sonner";

import { NewComment } from "@bookiwi/supabase/types";

import { addGuestComment, getGuestHighlightComments } from "./guest";

import supabaseManager from "#/managers/supabase";
import userManager from "#/managers/user";

export const addComment = async (newComment: NewComment) => {
  try {
    if (userManager.isGuest) {
      const result = await addGuestComment(newComment);
      return result;
    }
    const result = await supabaseManager.reader.addHighlightComment(newComment);
    return result;
  } catch (error) {
    toast.error("댓글 작성에 실패했습니다.");
    return { id: null };
  }
};

export const getHighlightComments = async (highlightId: string) => {
  if (userManager.isGuest) {
    const comments = await getGuestHighlightComments(highlightId);
    return comments;
  }
  const comments =
    await supabaseManager.reader.getHighlightComments(highlightId);
  return comments;
};
