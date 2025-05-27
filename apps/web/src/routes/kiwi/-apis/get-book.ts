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
    const bookData = (await idb.get("bookData", id)) as BookData;
    const kiwiDB = (await idb.get("kiwis", bookData.kiwiId)) as KiwiDB;

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
