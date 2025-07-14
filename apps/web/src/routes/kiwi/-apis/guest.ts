import {
  EpubTable,
  GetKiwiReaderResponse,
  KiwiTable,
  NewParticipant,
  ParticipantTable,
} from "@bookiwi/supabase/types";

import {
  GUEST_PARTICIPANT_ID,
  SAMPLE_EPUB_ID,
  SAMPLE_KIWI_ID,
} from "#/constants/guest";
import idb, { IDBStore } from "#/managers/idb";

export const getGuestKiwiReader = async (): Promise<GetKiwiReaderResponse> => {
  // IndexedDB에서 sample 데이터 조회
  const kiwi = await idb.get<KiwiTable>(IDBStore.Kiwis, SAMPLE_KIWI_ID);
  const epub = await idb.get<EpubTable>(IDBStore.Epubs, SAMPLE_EPUB_ID);
  const participants = await idb.getByIndex<ParticipantTable>(
    IDBStore.Participants,
    "kiwi_id",
    SAMPLE_KIWI_ID,
  );

  // 데이터가 없으면 먼저 생성
  if (!kiwi || !epub) {
    throw new Error("Sample kiwi or epub not found");
  }

  // GetKiwiReaderResponse 타입에 맞게 데이터 변환
  const response: GetKiwiReaderResponse = {
    kiwi: {
      id: kiwi.id,
      name: kiwi.name,
      description: kiwi.description,
      maxParticipants: kiwi.max_participants,
      detailDescription: kiwi.detail_description,
      password: kiwi.password,
      shareCode: kiwi.share_code,
      createdAt: kiwi.created_at,
    },
    epub: {
      id: epub.id,
      file: epub.file,
      locations: epub.locations,
      coverImage: epub.cover_image,
      title: epub.title,
      author: epub.author,
      publisher: epub.publisher,
      nav: epub.nav,
    },
    participants: participants.map((participant) => ({
      id: participant.id,
      userId: participant.user_id,
      name: participant.name,
      profileImage: participant.profile_image,
      color: participant.color,
      singlePage: participant.single_page,
      fontFamily: participant.font_family,
      fontSize: participant.font_size,
      fontWeight: participant.font_weight,
      lineHeight: participant.line_height,
      cfiStart: participant.cfi_start,
      cfiEnd: participant.cfi_end,
      percentage: participant.percentage,
      lastActivityAt: participant.last_activity_at,
    })),
  };

  return response;
};

export const addGuestParticipant = async (newParticipant: NewParticipant) => {
  const guestParticipant: ParticipantTable = {
    id: GUEST_PARTICIPANT_ID,
    user_id: newParticipant.userId,
    kiwi_id: SAMPLE_KIWI_ID,
    name: newParticipant.name,
    profile_image: newParticipant.profileImage,
    color: newParticipant.color,
    single_page: false,
    font_family: null,
    font_size: null,
    font_weight: null,
    line_height: null,
    cfi_start: null,
    cfi_end: null,
    percentage: null,
    last_activity_at: null,
  };

  await idb.add(IDBStore.Participants, guestParticipant);
};
