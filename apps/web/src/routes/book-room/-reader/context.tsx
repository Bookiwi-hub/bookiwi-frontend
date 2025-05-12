import { useNavigate } from "@tanstack/react-router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { Book } from "@bookiwi/epubjs";

interface ReaderContextType {
  book: Book | null;
  setBook: (book: Book | null) => void;
}

const ReaderContext = createContext<ReaderContextType | undefined>(undefined);

export const useReader = () => {
  const context = useContext(ReaderContext);
  if (context === undefined) {
    throw new Error("useReader must be used within a ReaderProvider");
  }
  return context;
};

export function ReaderProvider({ children }: { children: React.ReactNode }) {
  const [book, setBook] = useState<Book | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    // Create a new Book instance
    const epubBook = new Book("/Aesop's Fables; a new translation.epub");

    // Wait for the book to be fully loaded before setting it
    epubBook.ready
      .then(() => {
        if (mounted) {
          setBook(epubBook);
        }
      })
      .catch((error) => {
        if (mounted) {
          // eslint-disable-next-line no-alert
          alert("책을 가져오는데 실패했습니다. 다시 시도해주세요");
          // eslint-disable-next-line no-console
          console.error(error);
          navigate({ to: "/my-library" });
        }
      });

    return () => {
      mounted = false;
      epubBook.destroy();
      setBook(null);
    };
  }, [navigate]);

  const value = useMemo(
    () => ({
      book,
      setBook,
    }),
    [book, setBook],
  );

  return (
    <ReaderContext.Provider value={value}>{children}</ReaderContext.Provider>
  );
}
