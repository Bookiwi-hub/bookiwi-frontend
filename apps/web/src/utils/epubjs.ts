import ePub, { Book } from "@bookiwi/epubjs";

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
