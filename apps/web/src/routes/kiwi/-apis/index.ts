import { NewParticipant, Participant } from "@bookiwi/supabase/types";

import supabaseManager from "#/managers/supabase";
import userManager from "#/managers/user";

export const getKiwiReader = async (kiwiId: string) => {
  const result = await supabaseManager.reader.getKiwiReader(kiwiId);

  if (userManager.isGuest) {
    const guestParticipant = userManager.getGuestParticipant();
    if (guestParticipant) {
      return {
        kiwi: result.kiwi,
        epub: result.epub,
        participants: [...result.participants, guestParticipant],
      };
    }
  }

  return result;
};

export const addParticipant = async (newParticipant: NewParticipant) => {
  if (userManager.isGuest) {
    const guestParticipant: Participant = {
      id: "guest",
      userId: newParticipant.userId,
      name: newParticipant.name,
      profileImage: newParticipant.profileImage,
      color: newParticipant.color,
      singlePage: false,
      fontFamily: null,
      fontSize: null,
      fontWeight: null,
      lineHeight: null,
      cfiStart: null,
      cfiEnd: null,
      percentage: null,
      lastActivityAt: null,
    };
    userManager.setGuestParticipant(guestParticipant);
    return;
  }
  await supabaseManager.reader.addParticipant(newParticipant);
};
