import { NewKiwi } from "@bookiwi/supabase/types";

import {
  clearGuestSampleKiwi,
  createGuestSampleKiwi,
  getGuestSampleKiwi,
} from "./guest";

import supabaseManager from "#/managers/supabase";
import userManager from "#/managers/user";

export const getMyKiwis = async (userId: string) => {
  try {
    if (userManager.isGuest) {
      const guestSampleKiwi = await getGuestSampleKiwi();
      return guestSampleKiwi;
    }
    const myKiwis = await supabaseManager.kiwi.getMyKiwis(userId);
    return myKiwis;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching kiwis:", error);
    throw error;
  }
};

export const createKiwi = async (newKiwi: NewKiwi) => {
  try {
    const result = await supabaseManager.kiwi.createKiwi(newKiwi);
    return result;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error creating kiwi:", error);
    throw error;
  }
};

export const createSampleKiwi = async (userId: string) => {
  try {
    if (userManager.isGuest) {
      await createGuestSampleKiwi();
      return;
    }
    await supabaseManager.kiwi.createSampleKiwi(userId);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error creating sample kiwi:", error);
    throw error;
  }
};

export const deleteKiwi = async (kiwiId: string) => {
  try {
    await supabaseManager.kiwi.deleteKiwi(kiwiId);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error deleting kiwi:", error);
    throw error;
  }
};

export const deleteParticipant = async (participantId: string) => {
  try {
    if (userManager.isGuest) {
      await clearGuestSampleKiwi();
      return;
    }
    await supabaseManager.kiwi.deleteParticipant(participantId);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error deleting participant:", error);
    throw error;
  }
};

export const deleteUserKiwi = async (userId: string, kiwiId: string) => {
  try {
    await supabaseManager.kiwi.deleteUserKiwi(userId, kiwiId);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error deleting user kiwi:", error);
    throw error;
  }
};

export const getKiwiByShareCode = async (shareCode: string) => {
  try {
    const kiwi = await supabaseManager.kiwi.getKiwiByShareCode(shareCode);
    return kiwi;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error getting kiwi by share code:", error);
    throw error;
  }
};
