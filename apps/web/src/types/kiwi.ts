import { NavItem } from "@bookiwi/epubjs/types/navigation";

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

export interface Metadata {
  title: string;
  author: string;
  publisher: string;
  toc: NavItem[];
  locations: string;
}

export interface BookData {
  file: File;
  coverImage: string | null;
  metadata: Metadata;
}
export interface BookDataDB {
  file: File;
  coverImage: Blob | null;
  metadata: Metadata;
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
  book: BookData;
  createdAt: string;
  adminId: number;
  activities?: ActivityProps[];
  participants: ParticipantType[];
  discussions?: DiscussionProps[];
  events?: EventProps[];
}

export interface KiwiDB extends Omit<Kiwi, "book"> {
  book: BookDataDB;
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
