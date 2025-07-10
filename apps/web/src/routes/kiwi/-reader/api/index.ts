import { toast } from "sonner";

import { Participant } from "@bookiwi/supabase/types";

import supabaseManager from "#/managers/supabase";
import userManager from "#/managers/user";

export const updateParticipant = async (
  participantId: string,
  fields: Partial<Participant>,
) => {
  if (userManager.isGuest) {
    const guestParticipant = userManager.getGuestParticipant();
    if (!guestParticipant) {
      throw new Error("Guest participant not found");
    }
    userManager.setGuestParticipant({
      ...guestParticipant,
      ...fields,
    });
    return;
  }
  await supabaseManager.reader.updateParticipant(participantId, fields);
};

export const updateCfi = async (
  participantId: string,
  cfi: { start: string; end: string },
  percent: number,
  lastActivityAt: string,
) => {
  try {
    await updateParticipant(participantId, {
      cfiStart: cfi.start,
      cfiEnd: cfi.end,
      percentage: percent,
      lastActivityAt,
    });
  } catch (error) {
    toast.error("독서 기록이 저장되지 않았습니다.");
  }
};
