import { toast } from "sonner";

import { NewHighlight } from "@bookiwi/supabase/types";

import {
  addGuestHighlight,
  getGuestHighlights,
  getGuestSectionHighlights,
  removeGuestHighlight,
} from "./guest";

import supabaseManager from "#/managers/supabase";
import userManager from "#/managers/user";

export const getSectionHighlights = async (
  kiwiId: string,
  sectionHref: string,
) => {
  try {
    if (userManager.isGuest) {
      const sectionHighlights = await getGuestSectionHighlights(
        kiwiId,
        sectionHref,
      );
      return sectionHighlights;
    }

    const sectionHighlights = await supabaseManager.reader.getSectionHighlights(
      kiwiId,
      sectionHref,
    );

    return sectionHighlights;
  } catch (error) {
    toast.error("하이라이트 정보를 불러오는데 실패했습니다.");
    return [];
  }
};

export const getHighlights = async (kiwiId: string) => {
  if (userManager.isGuest) {
    const highlights = await getGuestHighlights(kiwiId);
    return highlights;
  }
  const highlights = await supabaseManager.reader.getHighlights(kiwiId);
  return highlights;
};

export const addHighlight = async (newHighlight: NewHighlight) => {
  try {
    if (userManager.isGuest) {
      const result = await addGuestHighlight(newHighlight);
      return result;
    }
    const result = await supabaseManager.reader.addHighlight(newHighlight);
    return result;
  } catch (error) {
    toast.error("하이라이트 추가에 실패했습니다.");
    return { id: null };
  }
};

export const removeHighlight = async (id: string) => {
  try {
    if (userManager.isGuest) {
      const result = await removeGuestHighlight(id);
      return result;
    }
    const result = await supabaseManager.reader.removeHighlight(id);
    return result;
  } catch (error) {
    toast.error("하이라이트 삭제에 실패했습니다.");
    return { id: null };
  }
};
