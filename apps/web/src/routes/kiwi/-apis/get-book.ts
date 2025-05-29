import tempUser from "#/DB/users";
import { IDBStore } from "#/constants/idb";
import idb from "#/managers/idb";
import {
  EpubIDBData,
  KiwiIDBData,
  ParticipantIDBData,
  RecordIDBData,
} from "#/types/idb";
import { ReadingRecord, Settings } from "#/types/kiwi";

type GetBookResponse = {
  readingRecord: ReadingRecord;
  initialSettings: Settings;
  locations: string;
  epubFile: File;
  kiwiTitle: string;
};

const getBook = async (id: string): Promise<GetBookResponse> => {
  if (!id) {
    throw new Error("id is required");
  }

  try {
    const kiwiData = await idb.get<KiwiIDBData>(IDBStore.KiwiStore, id);

    if (!kiwiData) {
      throw new Error("Kiwi data not found");
    }
    const epubData = await idb.get<EpubIDBData>(
      IDBStore.EpubStore,
      kiwiData.epubId,
    );

    if (!epubData) {
      throw new Error("Epub data not found");
    }

    const participants = await idb.getByIndex<ParticipantIDBData>(
      IDBStore.ParticipantStore,
      "kiwiId",
      epubData.kiwiId,
    );

    const currentParticipant = participants.find(
      (participant) => participant.userId === tempUser.id,
    );

    if (!currentParticipant) {
      throw new Error("Current participant not found");
    }

    const recordData = await idb.get<RecordIDBData>(
      IDBStore.RecordStore,
      currentParticipant.recordId,
    );

    if (!recordData) {
      throw new Error("Record data not found");
    }

    return {
      locations: epubData.locations,
      epubFile: epubData.file,
      readingRecord: {
        currentCfi: recordData.currentCfi,
        percentage: recordData.percentage,
        bookmarks: recordData.bookmarks,
      },
      initialSettings: {
        isSinglePage: recordData.isSinglePage,
        fontFamily: recordData.fontFamily,
        fontSize: recordData.fontSize,
        lineHeight: recordData.lineHeight,
        fontWeight: recordData.fontWeight,
      },
      kiwiTitle: kiwiData.name,
    };
  } catch (error) {
    throw new Error("Failed to fetch book");
  }
};

export default getBook;
