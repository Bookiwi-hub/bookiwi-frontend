import { NewParticipant } from "@bookiwi/supabase/types";

import { addGuestParticipant, getGuestKiwiReader } from "./guest";

import supabaseManager from "#/managers/supabase";
import userManager from "#/managers/user";

export const getKiwiReader = async (kiwiId: string) => {
  if (userManager.isGuest) {
    const result = await getGuestKiwiReader();
    return result;
  }
  const result = await supabaseManager.reader.getKiwiReader(kiwiId);
  return result;
};

export const addParticipant = async (newParticipant: NewParticipant) => {
  if (userManager.isGuest) {
    await addGuestParticipant(newParticipant);
    return;
  }
  await supabaseManager.reader.addParticipant(newParticipant);
};
