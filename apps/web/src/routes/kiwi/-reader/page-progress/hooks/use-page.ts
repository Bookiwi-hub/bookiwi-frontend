import { useCallback, useState } from "react";

import { Book, Location } from "@bookiwi/epubjs";

import { useReading } from "../../reading-context";

import truncate from "#/utils/truncate";

const MAX_SECTION_LENGTH = 25;

const usePage = (book: Book | null) => {
  const [page, setPage] = useState<number | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const { currentSectionHref } = useReading();
  const currentSection =
    book?.navigation && book.navigation.get(currentSectionHref);
  const currentSectionLabel =
    currentSection && truncate(currentSection?.label || "", MAX_SECTION_LENGTH);

  const callbackRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node || !book) return;

      book.rendition.on("relocated", (location: Location) => {
        const { page: currentPage, total: totalPages } =
          location.start.displayed;
        setPage(currentPage);
        setTotal(totalPages);
      });
    },
    [book],
  );

  return { currentSectionLabel, page, total, callbackRef };
};

export default usePage;
