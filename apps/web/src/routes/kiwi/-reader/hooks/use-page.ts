import { useAtomValue } from "@bookiwi/jotai";

import { currentLocationAtom, currentSectionAtom, navAtom } from "../atoms";
import { mapSectionHrefToNavItem } from "../utils/nav";

import truncate from "#/utils/truncate";

const MAX_SECTION_LENGTH = 25;

const usePage = () => {
  const currentSection = useAtomValue(currentSectionAtom);
  const currentLocation = useAtomValue(currentLocationAtom);
  const nav = useAtomValue(navAtom);

  if (!nav || !currentSection || !currentLocation)
    return { currentTocLabel: null, currentPage: null, totalPages: null };

  const currentNavItem = mapSectionHrefToNavItem(nav, currentSection.href);

  const currentTocLabel = truncate(
    currentNavItem?.label || "",
    MAX_SECTION_LENGTH,
  );
  const { page: currentPage, total: totalPages } = currentLocation.start
    .displayed || { page: 0, total: 0 };

  return { currentTocLabel, currentPage, totalPages };
};

export default usePage;
