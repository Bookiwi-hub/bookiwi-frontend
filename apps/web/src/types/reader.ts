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

export interface Record {
  currentCfi: string | null;
  percentage: number | null;
  bookmarks: BookmarkItem[];
}

export interface Metadata {
  title: string;
  author: string;
  publisher: string;
  locations: string;
}

export interface StoreData {
  id: string;
  file: File;
  coverImage: string | null;
  metadata: Metadata;
  record: Record;
  settings: Settings;
}
