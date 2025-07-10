import { useEffect } from "react";

import { useAtomValue, useSetAtom } from "@bookiwi/jotai";

import { getBookmarks } from "../api";
import { bookmarksAtom, participantIdAtom } from "../atoms";

const useBookmark = () => {
  const participantId = useAtomValue(participantIdAtom);
  const setBookmarks = useSetAtom(bookmarksAtom);

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!participantId) return;
      const bookmarks = await getBookmarks(participantId);
      setBookmarks(bookmarks);
    };
    fetchBookmarks();
  }, [participantId, setBookmarks]);
};

export default useBookmark;
