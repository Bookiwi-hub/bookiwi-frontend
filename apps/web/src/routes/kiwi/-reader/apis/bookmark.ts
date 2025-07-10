import { toast } from "sonner";

import { Bookmark } from "@bookiwi/supabase/types";

import {
  addGuestBookmark,
  getGuestBookmarks,
  removeGuestBookmark,
} from "./guest";

import supabaseManager from "#/managers/supabase";
import userManager from "#/managers/user";

export const addBookmark = async (newBookmark: Bookmark) => {
  try {
    if (userManager.isGuest) {
      addGuestBookmark(newBookmark);
      return;
    }
    await supabaseManager.reader.addBookmark(newBookmark);
  } catch (error) {
    toast.error("북마크 추가에 실패했습니다.");
  }
};

export const removeBookmark = async ({
  participantId,
  cfiStart,
  cfiEnd,
}: {
  participantId: string;
  cfiStart: string;
  cfiEnd: string;
}) => {
  try {
    if (userManager.isGuest) {
      removeGuestBookmark({ cfiStart, cfiEnd });
      return;
    }
    await supabaseManager.reader.removeBookmark({
      participantId,
      cfiStart,
      cfiEnd,
    });
  } catch (error) {
    toast.error("북마크 삭제에 실패했습니다.");
  }
};

export const getBookmarks = async (participantId: string) => {
  try {
    if (userManager.isGuest) {
      const bookmarks = getGuestBookmarks();
      return bookmarks;
    }
    const bookmarks = await supabaseManager.reader.getBookmarks(participantId);
    return bookmarks;
  } catch (error) {
    toast.error("북마크 정보를 불러오는데 실패했습니다.");
    return [];
  }
};
