import { useNavigate } from "@tanstack/react-router";
import { ReactNode, useEffect } from "react";

import { Book } from "@bookiwi/epubjs";
import Section from "@bookiwi/epubjs/types/section";
import { Provider, createStore } from "@bookiwi/jotai";

import {
  bookAtom,
  currentSectionAtom,
  currentLocationAtom,
  isCenterTouchedAtom,
  participantAtom,
  kiwiAtom,
  navAtom,
  sectionsAtom,
  currentViewAtom,
  selectionAtom,
  initialCfiAtom,
  initialIsSinglePageAtom,
  participantsAtom,
  annotationsTotalAtom,
  selectedAnnotationAtom,
  highlightClickedAtom,
} from "../atoms";

import {
  AnnotationIDBData,
  EpubIDBData,
  KiwiIDBData,
  ParticipantIDBData,
} from "#/types/idb";

interface ReaderProviderProps {
  children: ReactNode;
  currentParticipant: ParticipantIDBData;
  epubData: EpubIDBData;
  kiwiData: KiwiIDBData;
  participantsData: ParticipantIDBData[];
  annotationsData: AnnotationIDBData[];
}
const readerStore = createStore();

function ReaderProvider({
  children,
  epubData,
  kiwiData,
  participantsData,
  annotationsData,
  currentParticipant,
}: ReaderProviderProps) {
  const navigate = useNavigate();

  useEffect(() => {
    // Create a new Book instance
    const epubBook = new Book(epubData.file);

    // Wait for the book to be fully loaded before setting it
    const loadBook = async () => {
      try {
        await epubBook.ready;

        // 책 내용 검색 기능을 위한 코드
        epubBook.locations.load(epubData.locations);
        const sections: Section[] = [];
        epubBook.spine.each((section: Section) => {
          section.load(epubBook.load.bind(epubBook));
          sections.push(section);
        });
        readerStore.set(sectionsAtom, sections);

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
  }, [navigate, epubData, currentParticipant]);

  readerStore.set(
    initialIsSinglePageAtom,
    currentParticipant.settings.isSinglePage,
  );
  readerStore.set(initialCfiAtom, currentParticipant.record.currentCfi);
  readerStore.set(participantsAtom, participantsData);
  readerStore.set(bookAtom, null);
  readerStore.set(isCenterTouchedAtom, false);
  readerStore.set(kiwiAtom, kiwiData);

  readerStore.set(annotationsTotalAtom, annotationsData);
  readerStore.set(participantAtom, currentParticipant);
  readerStore.set(currentSectionAtom, undefined);
  readerStore.set(currentLocationAtom, undefined);
  readerStore.set(currentViewAtom, undefined);
  readerStore.set(navAtom, kiwiData.bookMetadata.toc);
  readerStore.set(selectionAtom, null);
  readerStore.set(selectedAnnotationAtom, null);
  readerStore.set(highlightClickedAtom, false);

  return <Provider store={readerStore}>{children}</Provider>;
}

export default ReaderProvider;
