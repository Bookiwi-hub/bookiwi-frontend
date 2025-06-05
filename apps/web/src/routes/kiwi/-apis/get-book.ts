import tempUser from "#/DB/users";
import { IDBStore } from "#/constants/idb";
import idb from "#/managers/idb";
import { EpubIDBData, KiwiIDBData, ParticipantIDBData } from "#/types/idb";

type GetBookResponse = {
  epubData: EpubIDBData;
  kiwiData: KiwiIDBData;
  participantData: ParticipantIDBData;
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

    return {
      epubData,
      kiwiData,
      participantData: currentParticipant,
    };
  } catch (error) {
    throw new Error("Failed to fetch book");
  }
};

export default getBook;
