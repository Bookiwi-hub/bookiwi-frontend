import { useCallback, useState } from "react";

import { Book, Location } from "@bookiwi/epubjs";
import Section from "@bookiwi/epubjs/types/section";

import truncate from "#/utils/truncate";

const MAX_SECTION_LENGTH = 25;

const usePage = (book: Book | null) => {
  const [page, setPage] = useState<number | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [currentSection, setCurrentSection] = useState<string>("");

  const callbackRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node || !book) return;
      book.rendition.on("rendered", (section: Section) => {
        const current = book.navigation && book.navigation.get(section.href);

        setCurrentSection(truncate(current?.label || "", MAX_SECTION_LENGTH));
      });

      book.rendition.on("relocated", (location: Location) => {
        const { page: currentPage, total: totalPages } =
          location.start.displayed;
        setPage(currentPage);
        setTotal(totalPages);
      });
    },
    [book],
  );

  return { currentSection, page, total, callbackRef };
};

export default usePage;
