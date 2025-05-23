import ePub, { Book, NavItem } from "@bookiwi/epubjs";

// import { urlToBlob } from "./file";
import { urlToBase64 } from "./file";

import { StoreData } from "#/types/reader";

/**
 * 파일을 EPUB 객체로 변환하는 함수
 * @param {File} file - 변환할 파일 객체
 * @returns {Promise<Book>} EPUB 객체를 반환
 */
export const fileToBook = async (file: File) => {
  const data = await file.arrayBuffer();
  return ePub(data);
};

export const generateLocations = async (book: Book) => {
  await book.ready;
  await book.locations.generate(1000);
  return book.locations.save();
};

export const getMetadata = async (book: Book) => {
  await book.ready;
  return book.loaded.metadata;
};

export const getBookKey = async (book: Book) => {
  await book.ready;
  return book.key();
};

export const getToc = async (book: Book): Promise<NavItem[]> => {
  await book.ready;
  const navigation = await book.loaded.navigation;
  return navigation.toc;
};

export const addToIndexedDB = async (file: File): Promise<StoreData> => {
  const book = await fileToBook(file);
  const metadata = await getMetadata(book);
  const coverUrl = await book.coverUrl();
  const toc = await getToc(book);

  // indexDB 적용할 때 코드
  // const coverBlob = coverUrl ? await urlToBlob(coverUrl) : null;

  const coverImage = coverUrl ? await urlToBase64(coverUrl) : null;
  const locations = await generateLocations(book);
  const key = await getBookKey(book);
  const storeData = {
    id: key,
    file,
    coverImage,
    metadata: {
      title: metadata.title,
      author: metadata.creator,
      publisher: metadata.publisher,
      toc,
      locations,
    },
    record: {
      currentCfi: null,
      percentage: null,
      bookmarks: [],
    },
    settings: {
      isSinglePage: false,
    },
  };

  // 후에 indexDB 적용 코드로 바꿔야 함.
  localStorage.setItem(key, JSON.stringify(storeData));

  return storeData;
};
