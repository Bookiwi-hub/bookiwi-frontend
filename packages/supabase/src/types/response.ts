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

export interface NavItem {
  label: string;
  subitems?: Array<NavItem>;
}

export interface Kiwi {
  id: string;
  name: string;
  description: string;
  detailDescription: string;
  maxParticipants: number | null;
  password: string | null;
  shareCode: string;
  bookMetadata: {
    title: string;
    author: string;
    publisher: string;
    nav: NavItem[];
  };
  coverImage: string | null;
  createdAt: string;
  adminId: string;
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
