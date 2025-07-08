export interface User {
  id: string;
  name: string;
  email: string;
  profileImage: string;
}

export interface NavItem {
  label: string;
  subitems?: Array<NavItem>;
}

export interface MyKiwi {
  id: string;
  name: string;
  description: string;
  detailDescription: string;
  maxParticipants: number | null;
  password: string | null;
  shareCode: string;
  bookMetadata: {
    coverImage: string | null;
    title: string;
    author: string;
    publisher: string;
    nav: NavItem[];
  };
  createdAt: string;
  admin: User;
  participants: {
    id: string;
    userId: string;
    name: string;
    profileImage: string;
    progress: number;
    color: string;
    lastActivityAt: string;
  }[];
}

export interface Kiwi {
  id: string;
  name: string;
  description: string;
  maxParticipants: number;
  detailDescription: string;
  password: string | null;
  shareCode: string;
  createdAt: string;
}

export interface Epub {
  id: string;
  file: string;
  locations: string;
  coverImage: string | null;
  title: string;
  author: string;
  publisher: string;
  nav: NavItem[];
}

export interface Participant {
  id: string;
  userId: string;
  name: string;
  profileImage: string | null;
  color: string;
  singlePage: boolean;
  fontFamily: string | null;
  fontSize: number | null;
  fontWeight: number | null;
  lineHeight: number | null;
  cfiStart: string | null;
  cfiEnd: string | null;
  percentage: number | null;
  lastActivityAt: string | null;
}

export interface Bookmark {
  id: string;
  cfiStart: string | null;
  cfiEnd: string | null;
  createdAt: string;
}

export interface Highlight {
  id: string;
  participantId: string;
  color: string;
  cfi: string;
  text: string;
  sectionHref: string;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  highlightId: string;
  participantId: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

export interface Annotation {
  id: string;
  cfi: string;
  text: string;
  color: string;
  participantId: string;
  createdAt: string;
  updatedAt: string;
  sectionHref: string;
  comments: {
    id: string;
    text: string;
    createdAt: string;
    updatedAt: string;
    participantId: string;
  }[];
}

export interface GetKiwiReaderResponse {
  kiwi: Kiwi;
  epub: Epub;
  participants: Participant[];
  annotations: Annotation[];
}
