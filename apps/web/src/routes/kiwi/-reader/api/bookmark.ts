import { toast } from "sonner";

import { Bookmark } from "@bookiwi/supabase/types";

import supabaseManager from "#/managers/supabase";
import userManager from "#/managers/user";

export const addBookmark = async (newBookmark: Bookmark) => {
  try {
    if (userManager.isGuest) {
      userManager.setGuestBookmarks([
        ...userManager.getGuestBookmarks(),
        newBookmark,
      ]);
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
      userManager.setGuestBookmarks(
        userManager
          .getGuestBookmarks()
          .filter((b) => b.cfiStart !== cfiStart || b.cfiEnd !== cfiEnd),
      );
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
      const userBookmarks = userManager.getGuestBookmarks();
      return userBookmarks;
    }
    return await supabaseManager.reader.getBookmarks(participantId);
  } catch (error) {
    toast.error("북마크 정보를 불러오는데 실패했습니다.");
    return [];
  }
};
