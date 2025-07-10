import {
  Bookmark,
  Comment,
  Highlight,
  NewComment,
  NewHighlight,
  Participant,
} from "@bookiwi/supabase/types";

import supabaseManager from "#/managers/supabase";
import userManager from "#/managers/user";

export const updateGuestParticipant = (fields: Partial<Participant>) => {
  const guestParticipant = userManager.getGuestParticipant();
  if (!guestParticipant) {
    throw new Error("Guest participant not found");
  }
  userManager.setGuestParticipant({
    ...guestParticipant,
    ...fields,
  });
};

export const addGuestHighlight = (newHighlight: NewHighlight) => {
  const participant = userManager.getGuestParticipant();
  const userHighlights = userManager.getGuestHighlights();
  if (!participant) throw new Error("Guest participant not found");
  const highlightId = `${newHighlight.participantId}-${newHighlight.cfi}-${newHighlight.createdAt}`;
  const addedHighlight: Highlight = {
    ...newHighlight,
    id: highlightId,
    commentCount: 0,
    name: participant.name,
    profileImage: participant.profileImage,
  };
  userManager.setGuestHighlights([...userHighlights, addedHighlight]);
  return { id: highlightId };
};

export const removeGuestHighlight = (id: string) => {
  userManager.setGuestHighlights(
    userManager.getGuestHighlights().filter((h) => h.id !== id),
  );
  return { id };
};

export const getGuestSectionHighlights = async (
  kiwiId: string,
  sectionHref: string,
) => {
  const sectionHighlights = await supabaseManager.reader.getSectionHighlights(
    kiwiId,
    sectionHref,
  );
  const userHighlights = userManager.getGuestHighlights();
  const guestSectionHighlights = userHighlights.filter(
    (h) => h.sectionHref === sectionHref,
  );
  return [...sectionHighlights, ...guestSectionHighlights];
};

export const getGuestHighlights = async (kiwiId: string) => {
  const highlights = await supabaseManager.reader.getHighlights(kiwiId);

  const userHighlights = userManager.getGuestHighlights();
  return [...highlights, ...userHighlights];
};

export const addGuestComment = (newComment: NewComment) => {
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
};

export const getGuestHighlightComments = async (highlightId: string) => {
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
};

export const addGuestBookmark = (newBookmark: Bookmark) => {
  userManager.setGuestBookmarks([
    ...userManager.getGuestBookmarks(),
    newBookmark,
  ]);
};

export const removeGuestBookmark = ({
  cfiStart,
  cfiEnd,
}: {
  cfiStart: string;
  cfiEnd: string;
}) => {
  userManager.setGuestBookmarks(
    userManager
      .getGuestBookmarks()
      .filter((b) => b.cfiStart !== cfiStart || b.cfiEnd !== cfiEnd),
  );
};

export const getGuestBookmarks = () => {
  const userBookmarks = userManager.getGuestBookmarks();
  return userBookmarks;
};
