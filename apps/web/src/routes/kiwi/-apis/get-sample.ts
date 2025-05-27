import { Book } from "@bookiwi/epubjs";

import { Settings, ReadingRecord } from "#/types/kiwi";

type GetBookResponse = {
  readingRecord: ReadingRecord;
  initialSettings: Settings;
  locations: string;
  epubFile: File;
  bookTitle: string;
};

const getSample = async (): Promise<GetBookResponse> => {
  try {
    const response = await fetch(
      "https://s3.amazonaws.com/moby-dick/moby-dick.epub",
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch EPUB file: ${response.status} ${response.statusText}`,
      );
    }

    // Response를 Blob으로 변환한 후 File 객체로 생성
    const blob = await response.blob();
    const epubFile = new File([blob], "moby-dick.epub", {
      type: "application/epub+zip",
    });

    const book = new Book(epubFile);
    await book.ready;
    await book.locations.generate(3000);

    const locations = book.locations.save();

    return {
      readingRecord: {
        currentCfi: null,
        percentage: null,
        bookmarks: [],
      },
      initialSettings: { isSinglePage: false },
      locations,
      epubFile,
      bookTitle: "Moby Dick",
    };
  } catch (error) {
    throw new Error(
      `Failed to fetch book: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
};

export default getSample;
