import ePub, { Book, NavItem } from "@bookiwi/epubjs";

import { urlToBlob } from "./file";

import { BookDataDB } from "#/types/kiwi";

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

export const fileToBookDataDB = async (file: File): Promise<BookDataDB> => {
  const book = await fileToBook(file);
  const metadata = await getMetadata(book);
  const coverUrl = await book.coverUrl();
  const toc = await getToc(book);

  const coverImage = coverUrl ? await urlToBlob(coverUrl) : null;
  const locations = await generateLocations(book);

  const bookDataDB = {
    file,
    coverImage,
    metadata: {
      title: metadata.title,
      author: metadata.creator,
      publisher: metadata.publisher,
      toc,
      locations,
    },
  };

  return bookDataDB;
};
