import { color } from "#/DB/color";
import tempUser from "#/DB/users";
import {
  IDBStore,
  SAMPLE_EPUB_DATA_ID,
  SAMPLE_EPUB_URL,
  SAMPLE_KIWI_DATA_ID,
  SAMPLE_PARTICIPANT_IDS,
  sampleIDBParticipants,
} from "#/constants/idb";
import idb from "#/managers/idb";
import { EpubIDBData, KiwiIDBData, ParticipantIDBData } from "#/types/idb";
import { Kiwi } from "#/types/kiwi";
import { fileToBookInfo } from "#/utils/epubjs";
import { kiwIDBDataToKiwi } from "#/utils/idb";

const addSampleKiwi = async (): Promise<Kiwi> => {
  try {
    const response = await fetch(SAMPLE_EPUB_URL);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch EPUB file: ${response.status} ${response.statusText}`,
      );
    }

    const blob = await response.blob();
    const epubFile = new File([blob], "moby-dick.epub", {
      type: "application/epub+zip",
    });

    const bookInfo = await fileToBookInfo(epubFile);

    const sampleKiwiIDBData: KiwiIDBData = {
      id: SAMPLE_KIWI_DATA_ID,
      name: "Sample Kiwi",
      description: "키위를 체험해보세요",
      maxParticipants: 3,
      detailDescription: "키위를 체험해보세요",
      password: null,
      shareCode: "예시 키위는 공유할 수 없습니다.",
      createdAt: new Date().toISOString(),
      coverImage: bookInfo.coverImageBlob,
      bookMetadata: {
        title: bookInfo.title,
        author: bookInfo.author,
        publisher: bookInfo.publisher,
        toc: bookInfo.toc,
      },
      adminId: tempUser.id,
      epubId: SAMPLE_EPUB_DATA_ID,
      participantIds: [...SAMPLE_PARTICIPANT_IDS],
    };

    const sampleEpubIDBData: EpubIDBData = {
      id: SAMPLE_EPUB_DATA_ID,
      kiwiId: SAMPLE_KIWI_DATA_ID,
      file: epubFile,
      locations: bookInfo.locations,
    };

    const sampleParticipantIDBData: ParticipantIDBData = {
      id: SAMPLE_PARTICIPANT_IDS[0],
      kiwiId: SAMPLE_KIWI_DATA_ID,
      userId: tempUser.id,
      name: tempUser.name,
      profileImage: tempUser.profileImage,
      color: color[0]!,
      record: {
        currentCfi: null,
        percentage: null,
        bookmarks: [],
      },
      settings: {
        isSinglePage: false,
        fontFamily: null,
        fontSize: null,
        lineHeight: null,
        fontWeight: null,
      },
      lastActivityAt: new Date().toISOString(),
    };

    await idb.add(IDBStore.KiwiStore, sampleKiwiIDBData);
    await idb.add(IDBStore.EpubStore, sampleEpubIDBData);
    await idb.add(IDBStore.ParticipantStore, sampleParticipantIDBData);
    sampleIDBParticipants.forEach(async (participant) => {
      await idb.add(IDBStore.ParticipantStore, participant);
    });
    const sampleKiwi = await kiwIDBDataToKiwi(sampleKiwiIDBData);

    return sampleKiwi;
  } catch (error) {
    throw new Error(
      `Failed to fetch book: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
};

export default addSampleKiwi;
