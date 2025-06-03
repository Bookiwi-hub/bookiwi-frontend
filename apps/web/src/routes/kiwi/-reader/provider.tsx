import { useNavigate } from "@tanstack/react-router";
import { ReactNode, useEffect } from "react";

import { Book } from "@bookiwi/epubjs";
import Section from "@bookiwi/epubjs/types/section";
import { participantIdAtom, useSetAtom } from "@bookiwi/jotai";

import { recordAtom, settingsAtom, bookAtom } from "./atoms";

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
  const setSettings = useSetAtom(settingsAtom);
  const setRecordAtom = useSetAtom(recordAtom);
  const setBookAtom = useSetAtom(bookAtom);
  const setParticipantIdAtom = useSetAtom(participantIdAtom);

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

        setBookAtom(epubBook);
      } catch (error) {
        alert("책을 가져오는데 실패했습니다. 다시 시도해주세요");
        navigate({ to: "/my-kiwis" });
      }
    };

    loadBook();

    return () => {
      epubBook.destroy();
      setBookAtom(null);
    };
  }, [
    navigate,
    epubFile,
    locations,
    setBookAtom,
    setParticipantIdAtom,
    participantId,
  ]);

  useEffect(() => {
    setParticipantIdAtom(participantId);
    setSettings(initialSettings);
    setRecordAtom(readingRecord);
  }, [
    initialSettings,
    setSettings,
    setParticipantIdAtom,
    participantId,
    readingRecord,
    setRecordAtom,
  ]);
  return children;
}

export default ReaderProvider;
