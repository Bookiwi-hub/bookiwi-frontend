import { Settings, Record } from "#/types/reader";

type GetBookResponse = {
  record: Record;
  initialSettings: Settings;
  locations: string | null;
  epubFile: string;
  bookTitle: string;
};

const getBook = async (id: string): Promise<GetBookResponse> => {
  if (!id) {
    throw new Error("id is required");
  }

  try {
    const epubFile = "https://s3.amazonaws.com/moby-dick/moby-dick.epub";
    const bookTitle = "모비딕";

    const savedRecord = localStorage.getItem(
      "epubjs:0.3:code.google.com.epub-samples.moby-dick-basic-record",
    );
    let record: Record = {
      currentCfi: null,
      percentage: null,
    };

    if (savedRecord) {
      record = JSON.parse(savedRecord);
    }

    const locations = localStorage.getItem(
      "epubjs:0.3:code.google.com.epub-samples.moby-dick-basic-locations",
    );

    const savedSettings = localStorage.getItem(
      "epubjs:0.3:code.google.com.epub-samples.moby-dick-basic-settings",
    );
    let initialSettings: Settings = {
      isSinglePage: false,
    };

    if (savedSettings) {
      initialSettings = JSON.parse(savedSettings);
    } else {
      localStorage.setItem(
        "epubjs:0.3:code.google.com.epub-samples.moby-dick-basic-settings",
        JSON.stringify(initialSettings),
      );
    }

    return { record, initialSettings, locations, epubFile, bookTitle };
  } catch (error) {
    throw new Error("Failed to fetch book");
  }
};

export default getBook;
