import { useNavigate } from "@tanstack/react-router";
import { ReactNode, useEffect } from "react";

import { Book } from "@bookiwi/epubjs";
import Section from "@bookiwi/epubjs/types/section";
import { Provider, createStore } from "@bookiwi/jotai";
import { Epub, Kiwi, Participant } from "@bookiwi/supabase/types";

import {
  bookAtom,
  currentSectionAtom,
  currentLocationAtom,
  isCenterTouchedAtom,
  kiwiAtom,
  navAtom,
  sectionsAtom,
  currentViewAtom,
  selectionAtom,
  initialCfiAtom,
  initialIsSinglePageAtom,
  selectedHighlightAtom,
  highlightClickedAtom,
  setParticipantAtom,
  highlightsAtom,
  otherParticipantsAtom,
  epubAtom,
} from "../atoms";

interface ReaderProviderProps {
  children: ReactNode;
  currentParticipant: Participant;
  epub: Epub;
  kiwi: Kiwi;
  otherParticipants: Participant[];
}
const readerStore = createStore();

function ReaderProvider({
  children,
  epub,
  kiwi,
  otherParticipants,
  currentParticipant,
}: ReaderProviderProps) {
  const navigate = useNavigate();

  useEffect(() => {
    // Create a new Book instance
    const epubBook = new Book(epub.file);

    // Wait for the book to be fully loaded before setting it
    const loadBook = async () => {
      try {
        await epubBook.ready;

        // 책 내용 검색 기능을 위한 코드
        epubBook.locations.load(epub.locations);
        const sections: Section[] = [];
        epubBook.spine.each((section: Section) => {
          section.load(epubBook.load.bind(epubBook));
          sections.push(section);
        });
        const navigation = await epubBook.loaded.navigation;
        readerStore.set(sectionsAtom, sections);
        readerStore.set(navAtom, navigation.toc);
        readerStore.set(bookAtom, epubBook);
      } catch (error) {
        alert("책을 가져오는데 실패했습니다. 다시 시도해주세요");
        navigate({ to: "/my-kiwis" });
      }
    };

    loadBook();

    return () => {
      epubBook.destroy();
    };
  }, [navigate, epub, currentParticipant]);

  // initial values
  readerStore.set(initialIsSinglePageAtom, currentParticipant.singlePage);
  if (currentParticipant.cfiStart && currentParticipant.cfiEnd) {
    readerStore.set(initialCfiAtom, {
      start: currentParticipant.cfiStart,
      end: currentParticipant.cfiEnd,
    });
  } else {
    readerStore.set(initialCfiAtom, null);
  }

  // book
  readerStore.set(bookAtom, null);
  readerStore.set(epubAtom, epub);

  // kiwi
  readerStore.set(kiwiAtom, kiwi);
  readerStore.set(setParticipantAtom, currentParticipant);
  readerStore.set(otherParticipantsAtom, otherParticipants);
  readerStore.set(highlightsAtom, []);

  // reading
  readerStore.set(currentSectionAtom, undefined);
  readerStore.set(currentLocationAtom, undefined);
  readerStore.set(currentViewAtom, undefined);

  // interaction
  readerStore.set(isCenterTouchedAtom, false);
  readerStore.set(selectionAtom, null);
  readerStore.set(selectedHighlightAtom, null);
  readerStore.set(highlightClickedAtom, false);

  return <Provider store={readerStore}>{children}</Provider>;
}

export default ReaderProvider;
