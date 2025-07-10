import { useEffect } from "react";

import { useAtomValue, useSetAtom } from "@bookiwi/jotai";

import { bookmarksAtom, participantIdAtom } from "../atoms";

import supabaseManager from "#/managers/supabase";

const useBookmark = () => {
  const participantId = useAtomValue(participantIdAtom);
  const setBookmarks = useSetAtom(bookmarksAtom);

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!participantId) return;
      const bookmarks =
        await supabaseManager.reader.getBookmarks(participantId);
      setBookmarks(bookmarks);
    };
    fetchBookmarks();
  }, [participantId, setBookmarks]);
};

export default useBookmark;
