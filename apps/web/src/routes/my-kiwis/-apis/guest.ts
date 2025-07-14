/* eslint-disable no-console */
import {
  EpubTable,
  KiwiTable,
  MyKiwi,
  ParticipantTable,
} from "@bookiwi/supabase/types";

import {
  SAMPLE_KIWI_ID,
  SAMPLE_EPUB_ID,
  sampleIDBKiwis,
  sampleIDBEpubs,
  sampleIDBParticipants,
  sampleIDBHighlights,
  sampleIDBComments,
  GUEST_USER,
} from "#/constants/guest";
import idb, { IDBStore } from "#/managers/idb";

export const createGuestSampleKiwi = async () => {
  try {
    // 1. 기존 sample 키위가 있는지 확인
    const existingKiwi = await idb.get(IDBStore.Kiwis, SAMPLE_KIWI_ID);
    if (existingKiwi) {
      return existingKiwi;
    }

    // 2. 전자책 데이터 저장
    await idb.put(IDBStore.Epubs, sampleIDBEpubs);

    // 3. 키위 데이터 저장
    await idb.put(IDBStore.Kiwis, sampleIDBKiwis);

    // 4. 참가자 데이터 저장
    await Promise.all(
      sampleIDBParticipants.map(async (participant) => {
        await idb.put(IDBStore.Participants, participant);
      }),
    );

    // 5. 하이라이트 데이터 저장
    await Promise.all(
      sampleIDBHighlights.map(async (highlight) => {
        await idb.put(IDBStore.Highlights, highlight);
      }),
    );

    // 6. 댓글 데이터 저장
    await Promise.all(
      sampleIDBComments.map(async (comment) => {
        await idb.put(IDBStore.Comments, comment);
      }),
    );

    // 생성된 키위 반환
    const createdKiwi = await idb.get(IDBStore.Kiwis, SAMPLE_KIWI_ID);
    return createdKiwi;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error creating sample kiwi:", error);
    throw error;
  }
};

export const getGuestSampleKiwi = async (): Promise<MyKiwi[]> => {
  try {
    // IndexedDB에서 sample 데이터 조회
    const kiwi: KiwiTable | undefined = await idb.get(
      IDBStore.Kiwis,
      SAMPLE_KIWI_ID,
    );
    const epub: EpubTable | undefined = await idb.get(
      IDBStore.Epubs,
      SAMPLE_EPUB_ID,
    );
    const participants: ParticipantTable[] = await idb.getByIndex(
      IDBStore.Participants,
      "kiwi_id",
      SAMPLE_KIWI_ID,
    );

    // 키위가 존재하지 않으면 먼저 생성
    if (!kiwi || !epub || !participants) {
      return [];
    }

    // MyKiwi 타입에 맞게 데이터 변환
    const myKiwi: MyKiwi = {
      id: kiwi.id,
      name: kiwi.name,
      description: kiwi.description,
      detailDescription: kiwi.detail_description,
      maxParticipants: kiwi.max_participants,
      password: kiwi.password,
      shareCode: kiwi.share_code,
      bookMetadata: {
        coverImage: epub.cover_image,
        title: epub.title,
        author: epub.author,
        publisher: epub.publisher,
        nav: epub.nav,
      },
      createdAt: kiwi.created_at,
      admin: {
        id: GUEST_USER.id,
        name: GUEST_USER.name,
        email: GUEST_USER.email,
        profileImage: GUEST_USER.profileImage,
      },
      participants: participants.map((participant) => ({
        id: participant.id,
        userId: participant.user_id,
        name: participant.name,
        profileImage: participant.profile_image,
        percentage: participant.percentage,
        color: participant.color,
        lastActivityAt: participant.last_activity_at,
      })),
    };

    return [myKiwi];
  } catch (error) {
    console.error("Error getting guest sample kiwi:", error);
    throw error;
  }
};

/**
 * 특정 키위의 모든 관련 데이터 조회
 */
export const getKiwiData = async (kiwiId: string) => {
  try {
    const kiwi = await idb.get(IDBStore.Kiwis, kiwiId);
    if (!kiwi) {
      throw new Error(`Kiwi with id ${kiwiId} not found`);
    }

    const participants = await idb.getByIndex(
      IDBStore.Participants,
      "kiwi_id",
      kiwiId,
    );
    const highlights = await idb.getByIndex(
      IDBStore.Highlights,
      "kiwi_id",
      kiwiId,
    );
    const epub = await idb.get(IDBStore.Epubs, (kiwi as any).epub_id);

    // 각 하이라이트의 댓글 조회
    const highlightIds = (highlights as any[]).map((h: any) => h.id);
    const allComments = [];
    const commentPromises = highlightIds.map(async (highlightId: string) => {
      const comments = await idb.getByIndex(
        IDBStore.Comments,
        "highlight_id",
        highlightId,
      );
      return comments;
    });
    const commentResults = await Promise.all(commentPromises);
    allComments.push(...commentResults.flat());

    // 각 참가자의 북마크 조회
    const participantIds = (participants as any[]).map((p: any) => p.id);
    const allBookmarks = [];
    const bookmarkPromises = participantIds.map(
      async (participantId: string) => {
        const bookmarks = await idb.getByIndex(
          IDBStore.Bookmarks,
          "participant_id",
          participantId,
        );
        return bookmarks;
      },
    );
    const bookmarkResults = await Promise.all(bookmarkPromises);
    allBookmarks.push(...bookmarkResults.flat());

    return {
      kiwi,
      epub,
      participants,
      highlights,
      comments: allComments,
      bookmarks: allBookmarks,
    };
  } catch (error) {
    console.error("Error getting kiwi data:", error);
    throw error;
  }
};

/**
 * sample 키위 데이터 삭제
 */
export const clearGuestSampleKiwi = async () => {
  try {
    // 역순으로 삭제 (참조 무결성 고려)

    // 1. 댓글 삭제
    await Promise.all(
      sampleIDBComments.map(async (comment) => {
        await idb.remove(IDBStore.Comments, comment.id);
      }),
    );

    // 2. 하이라이트 삭제
    await Promise.all(
      sampleIDBHighlights.map(async (highlight) => {
        await idb.remove(IDBStore.Highlights, highlight.id);
      }),
    );

    // 3. 참가자 삭제
    await Promise.all(
      sampleIDBParticipants.map(async (participant) => {
        await idb.remove(IDBStore.Participants, participant.id);
      }),
    );

    // 4. 키위 삭제
    await idb.remove(IDBStore.Kiwis, SAMPLE_KIWI_ID);

    // 5. 전자책 삭제
    await idb.remove(IDBStore.Epubs, SAMPLE_EPUB_ID);

    console.log("Sample kiwi cleared successfully!");
  } catch (error) {
    console.error("Error clearing sample kiwi:", error);
    throw error;
  }
};
