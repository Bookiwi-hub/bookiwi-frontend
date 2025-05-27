import { Book } from "@bookiwi/epubjs";

import { Settings, ReadingRecord } from "#/types/kiwi";

type GetBookResponse = {
  readingRecord: ReadingRecord;
  initialSettings: Settings;
  locations: string;
  epubFile: string;
  bookTitle: string;
};

const LOCAL_STORAGE_KEY_PREFIX =
  "epubjs:0.3:code.google.com.epub-samples.moby-dick-basic";

// Utility function to manage book record
const getReadingRecord = (): ReadingRecord => {
  const savedRecord = localStorage.getItem(
    `${LOCAL_STORAGE_KEY_PREFIX}-readingRecord`,
  );
  let readingRecord: ReadingRecord = {
    currentCfi: null,
    percentage: null,
    bookmarks: [],
  };

  if (savedRecord) {
    readingRecord = JSON.parse(savedRecord);
  } else {
    localStorage.setItem(
      `${LOCAL_STORAGE_KEY_PREFIX}-readingRecord`,
      JSON.stringify(readingRecord),
    );
  }

  return readingRecord;
};

// Utility function to manage book locations
const getBookLocations = async (epubFile: string): Promise<string> => {
  const savedLocations = localStorage.getItem(
    `${LOCAL_STORAGE_KEY_PREFIX}-locations`,
  );

  if (savedLocations) {
    return JSON.parse(savedLocations);
  }

  const book = new Book(epubFile);
  await book.ready;
  await book.locations.generate(1000);

  const locations = book.locations.save();
  localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}-locations`, locations);

  return locations;
};

// Utility function to manage book settings
const getBookSettings = (): Settings => {
  const savedSettings = localStorage.getItem(
    `${LOCAL_STORAGE_KEY_PREFIX}-settings`,
  );

  let settings: Settings = {
    isSinglePage: false,
  };

  if (savedSettings) {
    settings = JSON.parse(savedSettings);
  } else {
    localStorage.setItem(
      `${LOCAL_STORAGE_KEY_PREFIX}-settings`,
      JSON.stringify(settings),
    );
  }

  return settings;
};

// Utility function to get book information
const getBookInfo = (): { epubFile: string; bookTitle: string } => ({
  epubFile: "https://s3.amazonaws.com/moby-dick/moby-dick.epub",
  bookTitle: "모비딕",
});

const getBook = async (id: string): Promise<GetBookResponse> => {
  if (!id) {
    throw new Error("id is required");
  }

  try {
    const { epubFile, bookTitle } = getBookInfo();

    const readingRecord = getReadingRecord();
    const initialSettings = getBookSettings();
    const locations = await getBookLocations(epubFile);

    return { readingRecord, initialSettings, locations, epubFile, bookTitle };
  } catch (error) {
    throw new Error("Failed to fetch book");
  }
};

export default getBook;
