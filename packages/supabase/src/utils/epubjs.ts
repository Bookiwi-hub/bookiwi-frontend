import ePub, { Book } from "@bookiwi/epubjs";

import { NavItem } from "../types/response";

const urlToFile = async (url: string, filename?: string) => {
  const response = await fetch(url);
  const blob = await response.blob();
  const name = filename || url.split("/").pop() || "downloaded-file";

  return new File([blob], name, { type: blob.type });
};

const fileToBook = async (file: File) => {
  const data = await file.arrayBuffer();
  return ePub(data);
};

const generateLocations = async (book: Book) => {
  await book.ready;
  await book.locations.generate(1000);
  return book.locations.save();
};

const getMetadata = async (book: Book) => {
  await book.ready;
  return book.loaded.metadata;
};

const getNav = async (book: Book): Promise<NavItem[]> => {
  await book.ready;
  const navigation = await book.loaded.navigation;
  const nav: NavItem[] = navigation.toc.map((item) => ({
    label: item.label,
    subitems: item.subitems?.map((subitem) => ({
      label: subitem.label,
    })),
  }));
  return nav;
};

export const fileToEpubInfo = async (file: File) => {
  const book = await fileToBook(file);
  const metadata = await getMetadata(book);
  const nav = await getNav(book);
  const locations = await generateLocations(book);
  const coverUrl = await book.coverUrl();
  const coverImageFile = coverUrl ? await urlToFile(coverUrl) : null;

  return {
    locations,
    nav,
    title: metadata.title,
    author: metadata.creator,
    publisher: metadata.publisher,
    coverImage: coverImageFile,
  };
};
