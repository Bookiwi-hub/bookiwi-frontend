import { useCallback, useState } from "react";

import { Book } from "@bookiwi/epubjs";

const usePercentage = (book: Book | null) => {
  const [percentage, setPercentage] = useState<number | null>(null);

  const callbackRef = useCallback(
    async (node: HTMLDivElement | null) => {
      if (!node || !book) return;

      const stored = localStorage.getItem(`${book.key()}-locations`);
      if (stored) {
        book.locations.load(stored);
      } else {
        await book.locations.generate(1000);
        localStorage.setItem(`${book.key()}-locations`, book.locations.save());
      }

      const updatePercentage = () => {
        if (
          book.rendition.location &&
          book.rendition.location.start.displayed
        ) {
          const { cfi } = book.rendition.location.start;

          const currentPercentage = Math.floor(
            book.locations.percentageFromCfi(cfi) * 100,
          );
          setPercentage(currentPercentage);
        }
      };
      updatePercentage();

      book.rendition.on("relocated", updatePercentage);
    },
    [book],
  );

  return { percentage, setPercentage, callbackRef };
};

export default usePercentage;
