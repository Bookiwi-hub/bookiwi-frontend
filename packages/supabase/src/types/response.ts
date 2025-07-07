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
