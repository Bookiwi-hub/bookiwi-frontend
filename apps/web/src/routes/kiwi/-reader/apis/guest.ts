import {
  Bookmark,
  Comment,
  CommentTable,
  Highlight,
  HighlightTable,
  NewComment,
  NewHighlight,
  Participant,
  ParticipantTable,
} from "@bookiwi/supabase/types";

import { GUEST_PARTICIPANT_ID } from "#/constants/guest";
import idb, { IDBStore } from "#/managers/idb";
import supabaseManager from "#/managers/supabase";
import userManager from "#/managers/user";

// 타입 변환 헬퍼 함수
const convertParticipantToTableFields = (
  fields: Partial<Participant>,
): Partial<ParticipantTable> => {
  const fieldMapping: Record<keyof Participant, keyof ParticipantTable> = {
    id: "id",
    userId: "user_id",
    name: "name",
    profileImage: "profile_image",
    color: "color",
    singlePage: "single_page",
    fontFamily: "font_family",
    fontSize: "font_size",
    fontWeight: "font_weight",
    lineHeight: "line_height",
    cfiStart: "cfi_start",
    cfiEnd: "cfi_end",
    percentage: "percentage",
    lastActivityAt: "last_activity_at",
  };

  const updateFields: Partial<ParticipantTable> = {};

  Object.entries(fields).forEach(([key, value]) => {
    if (value !== undefined) {
      const dbField = fieldMapping[key as keyof Participant];
      if (dbField) {
        (updateFields as any)[dbField] = value;
      }
    }
  });

  return updateFields;
};

export const updateGuestParticipant = async (fields: Partial<Participant>) => {
  // Participant 타입의 필드를 ParticipantTable 타입의 필드로 변환
  const updateFields = convertParticipantToTableFields(fields);

  // IndexedDB에서 참가자 정보 업데이트
  const updatedParticipant = await idb.update(
    IDBStore.Participants,
    GUEST_PARTICIPANT_ID,
    updateFields,
  );

  if (!updatedParticipant) {
    throw new Error("Failed to update guest participant");
  }
};

export const addGuestHighlight = async (
  newHighlight: NewHighlight,
): Promise<{ id: string }> => {
  // 고유한 ID 생성 (participantId-cfi-createdAt 조합)
  const highlightId = `${newHighlight.participantId}-${newHighlight.cfi}-${newHighlight.createdAt}`;

  // NewHighlight를 HighlightTable 타입으로 변환
  const highlightData: HighlightTable = {
    id: highlightId,
    kiwi_id: newHighlight.kiwiId,
    participant_id: newHighlight.participantId,
    cfi: newHighlight.cfi,
    text: newHighlight.text,
    color: newHighlight.color,
    section_href: newHighlight.sectionHref,
    created_at: newHighlight.createdAt,
    updated_at: newHighlight.updatedAt,
  };

  // IndexedDB에 하이라이트 추가
  await idb.add(IDBStore.Highlights, highlightData);

  return { id: highlightId };
};

export const removeGuestHighlight = async (
  id: string,
): Promise<{ id: string }> => {
  // IndexedDB에서 하이라이트 삭제
  await idb.remove(IDBStore.Highlights, id);

  return { id };
};

export const getGuestSectionHighlights = async (
  kiwiId: string,
  sectionHref: string,
): Promise<Highlight[]> => {
  // section_href 인덱스를 사용하여 해당 섹션의 하이라이트 조회
  const highlightTables = await idb.getByIndex<HighlightTable>(
    IDBStore.Highlights,
    "section_href",
    sectionHref,
  );

  // 각 하이라이트에 대해 participant 정보와 댓글 개수를 가져와서 Highlight 타입으로 변환
  const highlights = await Promise.all(
    highlightTables.map(async (highlightTable) => {
      // participant 정보 가져오기
      const participant = await idb.get<ParticipantTable>(
        IDBStore.Participants,
        highlightTable.participant_id,
      );

      // 댓글 개수 가져오기
      const comments = await idb.getByIndex<CommentTable>(
        IDBStore.Comments,
        "highlight_id",
        highlightTable.id,
      );

      // HighlightTable을 Highlight 타입으로 변환
      const highlight: Highlight = {
        id: highlightTable.id,
        cfi: highlightTable.cfi,
        sectionHref: highlightTable.section_href,
        text: highlightTable.text,
        color: highlightTable.color,
        participantId: highlightTable.participant_id,
        name: participant?.name || "Unknown",
        profileImage: participant?.profile_image || null,
        createdAt: highlightTable.created_at,
        updatedAt: highlightTable.updated_at,
        commentCount: comments.length,
      };

      return highlight;
    }),
  );

  return highlights;
};

export const getGuestHighlights = async (kiwiId: string) => {
  const highlights = await supabaseManager.reader.getHighlights(kiwiId);

  const userHighlights = userManager.getGuestHighlights();
  return [...highlights, ...userHighlights];
};

export const addGuestComment = (newComment: NewComment) => {
  const userComments = userManager.getGuestComments();
  const participant = userManager.getGuestParticipant();
  if (!participant) throw new Error("Guest participant not found");
  const commentId = `${newComment.highlightId}-${newComment.createdAt}`;
  const createdComment: Comment = {
    ...newComment,
    id: commentId,
    name: participant.name,
    profileImage: participant.profileImage,
    color: participant.color,
  };
  userManager.setGuestComments([...userComments, createdComment]);
  return { id: commentId };
};

export const getGuestHighlightComments = async (highlightId: string) => {
  const guestUserHighlights = userManager.getGuestHighlights();
  const guestUserHighlight = guestUserHighlights.find(
    (highlight) => highlight.id === highlightId,
  );
  const userComments = userManager.getGuestComments();
  const guestHighlightComments = userComments.filter(
    (comment) => comment.highlightId === highlightId,
  );
  if (guestUserHighlight) {
    return guestHighlightComments;
  }
  const highlightComments =
    await supabaseManager.reader.getHighlightComments(highlightId);
  return [...highlightComments, ...guestHighlightComments];
};

export const addGuestBookmark = (newBookmark: Bookmark) => {
  userManager.setGuestBookmarks([
    ...userManager.getGuestBookmarks(),
    newBookmark,
  ]);
};

export const removeGuestBookmark = ({
  cfiStart,
  cfiEnd,
}: {
  cfiStart: string;
  cfiEnd: string;
}) => {
  userManager.setGuestBookmarks(
    userManager
      .getGuestBookmarks()
      .filter((b) => b.cfiStart !== cfiStart || b.cfiEnd !== cfiEnd),
  );
};

export const getGuestBookmarks = () => {
  const userBookmarks = userManager.getGuestBookmarks();
  return userBookmarks;
};
