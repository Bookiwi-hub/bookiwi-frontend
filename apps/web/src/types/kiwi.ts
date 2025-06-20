import { NavItem } from "@bookiwi/epubjs/types/navigation";

export interface Participant {
  id: string;
  userId: string;
  name: string;
  profileImage: string;
  progress: number;
  color: string;
  lastActivityAt: string;
}

export interface Kiwi {
  id: string;
  name: string;
  description: string;
  maxParticipants: number | null;
  detailDescription: string;
  password: string | null;
  shareCode: string;
  bookMetadata: BookMetadata;
  coverImage: string | null;
  createdAt: string;
  adminId: string;
  participants: Participant[];
}

export interface Settings {
  isSinglePage: boolean;
  fontFamily: string | null;
  fontSize: number | null;
  lineHeight: number | null;
  fontWeight: number | null;
}

export interface Bookmark {
  cfi: { start: string; end: string };
  createdAt: string;
}

export interface ReadingRecord {
  currentCfi: { start: string; end: string } | null;
  percentage: number | null;
  bookmarks: Bookmark[];
}

export interface BookMetadata {
  title: string;
  author: string;
  publisher: string;
  toc: NavItem[];
}

export interface AnnotationComment {
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  participantId: string;
}
