import { NavItem } from "@bookiwi/epubjs/types/navigation";

export interface KiwiIDBData {
  id: string;
  name: string;
  description: string;
  maxParticipants: number;
  detailDescription: string;
  password: string | null;
  shareCode: string;
  createdAt: string;
  coverImage: Blob | null;
  bookMetadata: {
    title: string;
    author: string;
    publisher: string;
    toc: NavItem[];
  };
  epubId: string;
  adminId: string;
  participantIds: string[];
}

export interface EpubIDBData {
  id: string;
  kiwiId: string;
  file: File;
  locations: string;
}

export interface ParticipantIDBData {
  id: string;
  kiwiId: string;
  userId: string;
  name: string;
  profileImage: string;
  color: string;
  recordId: string;
}

export interface RecordIDBData {
  id: string;
  participantId: string;
  lastActivityAt: string;
  currentCfi: string | null;
  percentage: number | null;
  isSinglePage: boolean;
  fontFamily: string | null;
  fontSize: number | null;
  lineHeight: number | null;
  fontWeight: number | null;
  bookmarks: { cfi: string; createdAt: string }[];
}
