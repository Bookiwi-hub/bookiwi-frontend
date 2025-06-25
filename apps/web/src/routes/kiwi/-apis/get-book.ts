import idb, { IDBStore } from "#/managers/idb";
import {
  AnnotationIDBData,
  EpubIDBData,
  KiwiIDBData,
  ParticipantIDBData,
} from "#/types/idb";

type GetBookResponse = {
  epubData: EpubIDBData;
  kiwiData: KiwiIDBData;
  participantsData: ParticipantIDBData[];
  annotationsData: AnnotationIDBData[];
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

    const participantsData = await idb.getByIndex<ParticipantIDBData>(
      IDBStore.ParticipantStore,
      "kiwiId",
      id,
    );
    if (!participantsData) {
      throw new Error("Current participant not found");
    }

    const annotationsData = await idb.getByIndex<AnnotationIDBData>(
      IDBStore.AnnotationStore,
      "kiwiId",
      id,
    );
    if (!annotationsData) {
      throw new Error("Annotations data not found");
    }

    return {
      epubData,
      kiwiData,
      participantsData,
      annotationsData,
    };
  } catch (error) {
    throw new Error("Failed to fetch book");
  }
};

export default getBook;
