import { useCallback, useState } from "react";

import { Book } from "@bookiwi/epubjs";

const usePercentage = (book: Book | null) => {
  const [percentage, setPercentage] = useState<string>("");

  const callbackRef = useCallback(
    async (node: HTMLDivElement | null) => {
      if (!node || !book) return;
      await book.locations.generate(1600);

      const updatePercentage = () => {
        if (
          book.rendition.location &&
          book.rendition.location.start.displayed
        ) {
          const { cfi } = book.rendition.location.start;

          const currentPercentage = Math.floor(
            book.locations.percentageFromCfi(cfi) * 100,
          );
          setPercentage(`${currentPercentage}%`);
        }
      };
      updatePercentage();

      book.rendition.on("locationChanged", updatePercentage);
    },
    [book],
  );

  return { percentage, setPercentage, callbackRef };
};

export default usePercentage;
