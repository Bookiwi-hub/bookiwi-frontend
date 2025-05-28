import idb from "#/managers/indexed-db";
import { Settings, ReadingRecord, BookData, KiwiDB } from "#/types/kiwi";

type GetBookResponse = {
  readingRecord: ReadingRecord;
  initialSettings: Settings;
  locations: string;
  epubFile: File;
  bookTitle: string;
};

const getBook = async (id: string): Promise<GetBookResponse> => {
  if (!id) {
    throw new Error("id is required");
  }

  try {
    const kiwiDB = (await idb.get("kiwis", id)) as KiwiDB;
    const bookData = (await idb.get("bookData", kiwiDB.bookDataId)) as BookData;

    return {
      locations: bookData.locations,
      epubFile: bookData.file,
      readingRecord: kiwiDB.participants[0]?.readingRecord ?? {
        currentCfi: null,
        percentage: null,
        bookmarks: [],
      },
      initialSettings: kiwiDB.participants[0]?.settings ?? {
        isSinglePage: false,
      },
      bookTitle: kiwiDB.bookMetadata.title,
    };
  } catch (error) {
    throw new Error("Failed to fetch book");
  }
};

export default getBook;
