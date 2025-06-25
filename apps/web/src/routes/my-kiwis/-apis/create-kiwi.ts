import { CreateKiwi } from "../-modals/create-kiwi/types";

import tempUser from "#/DB/users";
import idb, { IDBStore } from "#/managers/idb";
import { EpubIDBData, KiwiIDBData } from "#/types/idb";
import { fileToBookInfo } from "#/utils/epubjs";

export const createKiwi = async (newKiwi: CreateKiwi) => {
  const bookInfo = await fileToBookInfo(newKiwi.file!);

  // 공유 코드 생성 (실제로는 API에서 받아와야 함)
  const generatedShareCode = `KIWI-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  const generatedKiwiId = Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase();
  const generatedEpubId = Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase();

  const kiwiIDBData: KiwiIDBData = {
    id: generatedKiwiId,
    name: newKiwi.kiwiName,
    description: newKiwi.kiwiDescription,
    maxParticipants: newKiwi.maxParticipants,
    detailDescription: newKiwi.kiwiDetailDescription,
    password: newKiwi.password,
    shareCode: generatedShareCode,
    createdAt: new Date().toISOString(),
    coverImage: bookInfo.coverImageBlob,
    bookMetadata: {
      title: bookInfo.title,
      author: bookInfo.author,
      publisher: bookInfo.publisher,
      toc: bookInfo.toc,
    },
    epubId: generatedEpubId,
    adminId: tempUser.id,
    participantIds: [],
  };

  const epubIDBData: EpubIDBData = {
    id: generatedEpubId,
    kiwiId: generatedKiwiId,
    file: bookInfo.file,
    locations: bookInfo.locations,
  };

  await idb.add(IDBStore.KiwiStore, kiwiIDBData);
  await idb.add(IDBStore.EpubStore, epubIDBData);
  return kiwiIDBData;
};
