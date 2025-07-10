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

interface Settings {
  singlePage: boolean;
  fontFamily: string | null;
  fontSize: number | null;
  fontWeight: number | null;
  lineHeight: number | null;
}

export const updateSettings = async (
  participantId: string,
  settings: Partial<Settings>,
) => {
  try {
    await updateParticipant(participantId, settings);
  } catch (error) {
    toast.error("설정 정보가 저장되지 않았습니다.");
  }
};

export const updateSinglePage = async (
  participantId: string,
  singlePage: boolean,
) => {
  await updateSettings(participantId, {
    singlePage,
  });
};

export const updateFontFamily = async (
  participantId: string,
  fontFamily: string | null,
) => {
  await updateSettings(participantId, {
    fontFamily,
  });
};

export const updateFontSize = async (
  participantId: string,
  fontSize: number | null,
) => {
  await updateSettings(participantId, {
    fontSize,
  });
};

export const updateFontWeight = async (
  participantId: string,
  fontWeight: number | null,
) => {
  await updateSettings(participantId, {
    fontWeight,
  });
};

export const updateLineHeight = async (
  participantId: string,
  lineHeight: number | null,
) => {
  await updateSettings(participantId, {
    lineHeight,
  });
};
