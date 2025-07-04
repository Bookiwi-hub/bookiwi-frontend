export interface User {
  id: string;
  name: string;
  email: string;
  profile_image: string;
}

// User와 Kiwi 간의 다대다 관계를 위한 중간 테이블 (Junction Table)
export interface UserKiwi {
  user_id: string; // User.id 참조
  kiwi_id: string; // Kiwi.id 참조
  role: "admin" | "participant" | "shared";
  joined_at: string; // 가입일 - 중요한 추적 정보
  is_active: boolean;
}

interface NavItem {
  label: string;
  subitems?: Array<NavItem>;
}

export interface Kiwi {
  id: string;
  epub_id: string;
  name: string;
  description: string;
  max_participants: number;
  detail_description: string;
  password: string | null;
  share_code: string;
  created_at: string;
}

export interface Epub {
  id: string;
  file: string;
  locations: string;
  cover_image: string | null;
  title: string;
  author: string;
  publisher: string;
  nav: { label: string; subitems?: Array<NavItem> }[];
}

export interface Participant {
  id: string;
  kiwi_id: string;
  user_id: string;
  name: string;
  profile_image: string;
  color: string;
  settings: {
    single_page: boolean;
    font_family: string | null;
    font_size: number | null;
    font_weight: number | null;
    line_height: number | null;
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
  participant_id: string;
  cfi: string;
  text: string;
  color: string;
  section_href: string;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: string;
  highlight_id: string;
  participant_id: string;
  text: string;
  created_at: string;
  updated_at: string;
}
