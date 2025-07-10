import { toast } from "sonner";

import { Highlight, NewHighlight } from "@bookiwi/supabase/types";

import supabaseManager from "#/managers/supabase";
import userManager from "#/managers/user";

export const getSectionHighlights = async (
  kiwiId: string,
  sectionHref: string,
) => {
  try {
    const sectionHighlights = await supabaseManager.reader.getSectionHighlights(
      kiwiId,
      sectionHref,
    );
    if (userManager.isGuest) {
      const userHighlights = userManager.getGuestHighlights();
      const guestSectionHighlights = userHighlights.filter(
        (h) => h.sectionHref === sectionHref,
      );
      return [...sectionHighlights, ...guestSectionHighlights];
    }

    return sectionHighlights;
  } catch (error) {
    toast.error("하이라이트 정보를 불러오는데 실패했습니다.");
    return [];
  }
};

export const getHighlights = async (kiwiId: string) => {
  const highlights = await supabaseManager.reader.getHighlights(kiwiId);
  if (userManager.isGuest) {
    const userHighlights = userManager.getGuestHighlights();
    return [...highlights, ...userHighlights];
  }
  return highlights;
};

export const addHighlight = async (newHighlight: NewHighlight) => {
  try {
    if (userManager.isGuest) {
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
    }
    const { id } = await supabaseManager.reader.addHighlight(newHighlight);
    return { id };
  } catch (error) {
    toast.error("하이라이트 추가에 실패했습니다.");
    return { id: null };
  }
};

export const removeHighlight = async (id: string) => {
  try {
    if (userManager.isGuest) {
      userManager.setGuestHighlights(
        userManager.getGuestHighlights().filter((h) => h.id !== id),
      );
      return { id };
    }
    return await supabaseManager.reader.removeHighlight(id);
  } catch (error) {
    toast.error("하이라이트 삭제에 실패했습니다.");
    return { id: null };
  }
};
