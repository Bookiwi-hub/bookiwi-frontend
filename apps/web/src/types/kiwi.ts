import { NavItem } from "@bookiwi/epubjs/types/navigation";

import { User } from "./user";

export interface Settings {
  isSinglePage: boolean;
  fontFamily?: string;
  fontSize?: number;
  lineHeight?: number;
  fontWeight?: number;
}

export interface BookmarkItem {
  cfi: string;
  timestamp: number;
}

export interface ReadingRecord {
  currentCfi: string | null;
  percentage: number | null;
  bookmarks: BookmarkItem[];
}

export interface BookMetadata {
  title: string;
  author: string;
  publisher: string;
  toc: NavItem[];
}

export interface BookData {
  id: string;
  kiwiId: string;
  file: File;
  locations: string;
}

export interface ParticipantType {
  id: number;
  name: string;
  profileImage: string;
  progress: number;
  color: string;
  lastActivityAt: string;
  readingRecord: ReadingRecord;
  settings: Settings;
}

export interface Kiwi {
  id: string;
  name: string;
  description: string;
  maxParticipants: number;
  detailDescription?: string;
  password: string | null;
  shareCode: string;
  bookMetadata: BookMetadata;
  bookDataId: string;
  coverImage: string | null;
  createdAt: string;
  admin: User;
  activities?: ActivityProps[];
  participants: ParticipantType[];
  discussions?: DiscussionProps[];
  events?: EventProps[];
}

export interface KiwiDB extends Omit<Kiwi, "coverImage"> {
  coverImage: Blob | null;
}

export interface DiscussionProps {
  id: string;
  title: string;
  comments: number;
  lastActive: string;
}

export interface EventProps {
  id: string;
  title: string;
  date: string;
  time: string;
  participants: number;
}

export interface ActivityProps {
  id: string;
  user: string;
  action: string;
  content: string;
  time: string;
}
