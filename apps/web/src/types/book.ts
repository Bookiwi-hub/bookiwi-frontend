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
