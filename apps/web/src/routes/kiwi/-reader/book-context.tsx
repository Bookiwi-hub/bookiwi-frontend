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
  locations: string | null;
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
        if (locations) {
          epubBook.locations.load(locations);
        } else {
          await epubBook.locations.generate(1000);
          localStorage.setItem(
            `${epubBook.key()}-locations`,
            epubBook.locations.save(),
          );
        }

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
