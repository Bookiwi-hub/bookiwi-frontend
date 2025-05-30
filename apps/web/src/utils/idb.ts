import { blobToObjectUrl } from "./file";

import idb from "#/managers/idb";
import { KiwiIDBData, ParticipantIDBData } from "#/types/idb";
import { Kiwi, Participant } from "#/types/kiwi";

export const kiwIDBDataToKiwi = async (
  kiwiIDBData: KiwiIDBData,
): Promise<Kiwi> => {
  const kiwiDataWithImages = await convertCoverImage(kiwiIDBData);
  const kiwi = await enrichKiwiWithParticipants(kiwiDataWithImages);

  return kiwi;
};

/**
 * 커버 이미지를 Object URL로 변환
 */
const convertCoverImage = async (
  kiwiItem: KiwiIDBData,
): Promise<Omit<KiwiIDBData, "coverImage"> & { coverImage: string | null }> => {
  const { coverImage } = kiwiItem;
  const coverImageObjectUrl = coverImage
    ? await blobToObjectUrl(coverImage)
    : null;

  return {
    ...kiwiItem,
    coverImage: coverImageObjectUrl,
  };
};

/**
 * 참가자 데이터를 변환
 */
const convertParticipantData = async (
  participant: ParticipantIDBData,
): Promise<Participant> => ({
  id: participant.id,
  userId: participant.userId,
  name: participant.name,
  profileImage: participant.profileImage,
  color: participant.color,
  lastActivityAt: participant.lastActivityAt,
  progress: participant.record.percentage ?? 0,
});

/**
 * 키위 데이터에 참가자 정보를 추가
 */
const enrichKiwiWithParticipants = async (
  item: Omit<KiwiIDBData, "coverImage"> & { coverImage: string | null },
): Promise<Kiwi> => {
  const storedParticipants = await idb.getByIndex<ParticipantIDBData>(
    "participantStore",
    "kiwiId",
    item.id,
  );

  const participants = await Promise.all(
    storedParticipants.map(convertParticipantData),
  );

  return {
    id: item.id,
    name: item.name,
    description: item.description,
    maxParticipants: item.maxParticipants,
    detailDescription: item.detailDescription,
    password: item.password,
    shareCode: item.shareCode,
    bookMetadata: item.bookMetadata,
    coverImage: item.coverImage,
    createdAt: item.createdAt,
    adminId: item.adminId,
    participants,
  };
};
