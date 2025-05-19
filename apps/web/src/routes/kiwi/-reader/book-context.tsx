import { useNavigate } from "@tanstack/react-router";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Book } from "@bookiwi/epubjs";
import Section from "@bookiwi/epubjs/types/section";

interface BookContextType {
  book: Book | null;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const useBook = () => {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error("useBook must be used within a BookProvider");
  }
  return context;
};

interface BookProviderProps {
  children: ReactNode;
  epubFile: string;
  locations: string;
}

export function BookProvider({
  children,
  epubFile,
  locations,
}: BookProviderProps) {
  const [book, setBook] = useState<Book | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    // Create a new Book instance
    const epubBook = new Book(epubFile);
    // "/Alice's Adventures in Wonderland.epub"

    // Wait for the book to be fully loaded before setting it
    const loadBook = async () => {
      try {
        await epubBook.ready;

        // 책 내용 검색 기능을 위한 코드
        epubBook.locations.load(locations);
        epubBook.spine.each((section: Section) =>
          section.load(epubBook.load.bind(epubBook)),
        );

        if (mounted) {
          setBook(epubBook);
        }
      } catch (error) {
        if (mounted) {
          // eslint-disable-next-line no-alert
          alert("책을 가져오는데 실패했습니다. 다시 시도해주세요");
          // eslint-disable-next-line no-console
          console.error(error);
          navigate({ to: "/my-kiwis" });
        }
      }
    };

    loadBook();

    return () => {
      mounted = false;
      epubBook.destroy();
      setBook(null);
    };
  }, [navigate, epubFile, locations]);

  const value = useMemo(
    () => ({
      book,
    }),
    [book],
  );

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}
