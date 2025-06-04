import { useNavigate } from "@tanstack/react-router";
import { ReactNode, useEffect, useMemo } from "react";

import { Book } from "@bookiwi/epubjs";
import Section from "@bookiwi/epubjs/types/section";
import { Provider, createStore } from "@bookiwi/jotai";

import {
  recordAtom,
  settingsAtom,
  bookAtom,
  currentSectionAtom,
  currentLocationAtom,
  isCenterTouchedAtom,
  participantIdAtom,
} from "./atoms";

import { Settings, ReadingRecord } from "#/types/kiwi";

interface ReaderProviderProps {
  children: ReactNode;
  epubFile: File;
  locations: string;
  initialSettings: Settings;
  readingRecord: ReadingRecord;
  participantId: string;
}

function ReaderProvider({
  children,
  epubFile,
  locations,
  initialSettings,
  readingRecord,
  participantId,
}: ReaderProviderProps) {
  const navigate = useNavigate();

  // 리더 전용 store 생성
  const store = useMemo(() => {
    const readerStore = createStore();
    // 초기값 설정
    readerStore.set(bookAtom, null);
    readerStore.set(isCenterTouchedAtom, false);
    readerStore.set(settingsAtom, initialSettings);
    readerStore.set(recordAtom, readingRecord);
    readerStore.set(participantIdAtom, participantId);
    readerStore.set(currentSectionAtom, undefined);
    readerStore.set(currentLocationAtom, undefined);
    return readerStore;
  }, [initialSettings, readingRecord, participantId]);

  useEffect(() => {
    // Create a new Book instance
    const epubBook = new Book(epubFile);

    // Wait for the book to be fully loaded before setting it
    const loadBook = async () => {
      try {
        await epubBook.ready;

        // 책 내용 검색 기능을 위한 코드
        epubBook.locations.load(locations);
        epubBook.spine.each((section: Section) =>
          section.load(epubBook.load.bind(epubBook)),
        );

        store.set(bookAtom, epubBook);
      } catch (error) {
        alert("책을 가져오는데 실패했습니다. 다시 시도해주세요");
        navigate({ to: "/my-kiwis" });
      }
    };

    loadBook();

    return () => {
      epubBook.destroy();
    };
  }, [navigate, epubFile, locations, store]);

  return <Provider store={store}>{children}</Provider>;
}

export default ReaderProvider;
