import { useCallback, useState } from "react";

import { Book } from "@bookiwi/epubjs";

const usePageInfo = (book: Book | null) => {
  const [page, setPage] = useState<number | null>(null);
  const [total, setTotal] = useState<number | null>(null);

  const callbackRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node || !book) return;
      const updateLocation = () => {
        if (
          book.rendition.location &&
          book.rendition.location.start.displayed
        ) {
          const { page: currentPage, total: totalPages } =
            book.rendition.location.start.displayed;
          setPage(currentPage);
          setTotal(totalPages);
        }
      };

      updateLocation();

      book.rendition.on("locationChanged", updateLocation);
    },
    [book],
  );

  return { page, total, callbackRef };
};

export default usePageInfo;
