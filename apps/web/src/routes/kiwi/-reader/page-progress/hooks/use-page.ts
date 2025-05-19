import { Book } from "@bookiwi/epubjs";

import { useReading } from "../../reading-context";

import truncate from "#/utils/truncate";

const MAX_SECTION_LENGTH = 25;

const usePage = (book: Book | null) => {
  const { currentLocation } = useReading();
  const currentSection =
    book?.navigation &&
    currentLocation?.start.href &&
    book.navigation.get(currentLocation.start.href);
  const currentSectionLabel =
    currentSection && truncate(currentSection?.label || "", MAX_SECTION_LENGTH);
  const { page: currentPage, total: totalPages } = currentLocation?.start
    .displayed || { page: 0, total: 0 };

  return { currentSectionLabel, currentPage, totalPages };
};

export default usePage;
