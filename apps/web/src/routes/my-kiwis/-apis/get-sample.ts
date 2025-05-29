import { Book } from "@bookiwi/epubjs";

import color from "#/DB/color";
import tempUser from "#/DB/users";
import {
  initialReadingRecord,
  initialSettings,
  sampleParticipants,
  SAMPLE_KIWI_BOOK_DATA_ID,
  SAMPLE_KIWI_ID,
  SAMPLE_KIWI_URL,
} from "#/constants/kiwi";
import idb from "#/managers/idb";
import { BookData, BookMetadata, Kiwi, KiwiDB } from "#/types/kiwi";
import { fileToBookInfo } from "#/utils/epubjs";
import { blobToObjectUrl } from "#/utils/file";
import { formatDateOnly } from "#/utils/format-date";

const addSampleKiwi = async (): Promise<Kiwi> => {
  try {
    const response = await fetch(SAMPLE_KIWI_URL);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch EPUB file: ${response.status} ${response.statusText}`,
      );
    }

    const blob = await response.blob();
    const epubFile = new File([blob], "moby-dick.epub", {
      type: "application/epub+zip",
    });

    const book = new Book(epubFile);
    await book.ready;
    await book.locations.generate(3000);

    const locations = book.locations.save();

    const bookData: BookData = {
      id: SAMPLE_KIWI_BOOK_DATA_ID,
      kiwiId: SAMPLE_KIWI_ID,
      file: epubFile,
      locations,
    };

    const bookInfo = await fileToBookInfo(epubFile);

    const bookMetadata: BookMetadata = {
      title: bookInfo.title,
      author: bookInfo.author,
      publisher: bookInfo.publisher,
      toc: bookInfo.toc,
    };

    const sampleKiwiDB: KiwiDB = {
      id: SAMPLE_KIWI_ID,
      name: "Sample Kiwi",
      description: "키위를 체험해보세요",
      maxParticipants: 3,
      detailDescription: "키위를 체험해보세요",
      password: null,
      shareCode: "예시 키위는 공유할 수 없습니다.",
      createdAt: formatDateOnly(new Date()),
      admin: {
        id: "kiwi",
        name: "키위",
        email: "kiwi@kiwi.com",
        profileImage: "https://github.com/shadcn.png",
      },
      bookMetadata,
      bookDataId: SAMPLE_KIWI_BOOK_DATA_ID,
      participants: [
        {
          userId: tempUser.id,
          name: tempUser.name,
          profileImage: tempUser.profileImage,
          progress: 0,
          color: color[0]!,
          lastActivityAt: "2025-05-23",
          readingRecord: initialReadingRecord,
          settings: initialSettings,
        },
        ...sampleParticipants,
      ],
      coverImage: bookInfo.coverImageBlob,
    };

    await idb.put("kiwis", sampleKiwiDB);
    await idb.put("bookData", bookData);

    const sampleKiwi: Kiwi = {
      ...sampleKiwiDB,
      coverImage: bookInfo.coverImageObjectUrl,
    };

    return sampleKiwi;
  } catch (error) {
    throw new Error(
      `Failed to fetch book: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
};

const getSampleKiwi = async (): Promise<Kiwi | undefined> => {
  try {
    // 기존 sample-kiwi 데이터 확인
    const existingSampleKiwi = await idb.get<KiwiDB>("kiwis", SAMPLE_KIWI_ID);

    if (!existingSampleKiwi) {
      const newSampleKiwi = await addSampleKiwi();
      return newSampleKiwi;
    }

    const coverImageObjectUrl = existingSampleKiwi.coverImage
      ? await blobToObjectUrl(existingSampleKiwi.coverImage)
      : null;

    const sampleKiwi: Kiwi = {
      ...existingSampleKiwi,
      coverImage: coverImageObjectUrl,
    };

    return sampleKiwi;
  } catch (error) {
    throw new Error(
      `Failed to fetch book: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
};

export default getSampleKiwi;
