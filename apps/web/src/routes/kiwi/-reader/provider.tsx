import { useNavigate } from "@tanstack/react-router";
import { ReactNode, useEffect } from "react";

import { Book } from "@bookiwi/epubjs";
import Section from "@bookiwi/epubjs/types/section";
import {
  bookAtom,
  participantIdAtom,
  settingsAtom,
  useSetAtom,
} from "@bookiwi/jotai";

import { RecordProvider } from "./contexts";

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
  const setSettings = useSetAtom(settingsAtom);
  const navigate = useNavigate();
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
  }, [initialSettings, setSettings, setParticipantIdAtom, participantId]);
  return (
    <RecordProvider readingRecord={readingRecord} participantId={participantId}>
      {children}
    </RecordProvider>
  );
}

export default ReaderProvider;
