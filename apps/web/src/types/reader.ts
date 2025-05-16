export interface Settings {
  isSinglePage: boolean;
  fontFamily?: string;
  fontSize?: number;
  lineHeight?: number;
  fontWeight?: number;
}

export interface Record {
  currentCfi: string | null;
  percentage: number | null;
}
