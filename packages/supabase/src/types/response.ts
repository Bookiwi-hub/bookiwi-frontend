export interface User {
  id: string;
  name: string;
  email: string;
  profileImage: string;
}

// User와 Kiwi 간의 다대다 관계를 위한 중간 테이블 (Junction Table)
export interface UserKiwi {
  userId: string; // User.id 참조
  kiwiId: string; // Kiwi.id 참조
  role: "admin" | "participant" | "shared";
  joinedAt: string; // 가입일 - 중요한 추적 정보
  isActive: boolean;
}

interface NavItem {
  label: string;
  subitems?: Array<NavItem>;
}

export interface Kiwi {
  id: string;
  epubId: string;
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
  nav: { label: string; subitems?: Array<NavItem> }[];
}

export interface Participant {
  id: string;
  kiwiId: string;
  userId: string;
  name: string;
  profileImage: string;
  color: string;
  settings: {
    singlePage: boolean;
    fontFamily: string | null;
    fontSize: number | null;
    fontWeight: number | null;
    lineHeight: number | null;
  };
  record: {
    cfi: { start: string; end: string } | null;
    percentage: number | null;
    bookmarks: { cfi: { start: string; end: string }; createdAt: string }[];
  };
  last_activity_at: string;
}

export interface Highlight {
  id: string;
  participantId: string;
  cfi: string;
  text: string;
  color: string;
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
