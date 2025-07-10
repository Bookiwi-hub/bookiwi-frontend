export interface UserTable {
  id: string;
  name: string;
  email: string;
  profile_image: string | null;
}

// User와 Kiwi 간의 다대다 관계를 위한 중간 테이블 (Junction Table)
export interface UserKiwiTable {
  user_id: string; // User.id 참조
  kiwi_id: string; // Kiwi.id 참조
  admin: boolean;
  participated: boolean;
  joined_at: string; // 가입일 - 중요한 추적 정보
  is_active: boolean;
}

export interface KiwiTable {
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

interface NavItem {
  label: string;
  subitems?: Array<NavItem>;
}

export interface EpubTable {
  id: string;
  file: string;
  locations: string;
  cover_image: string | null;
  title: string;
  author: string;
  publisher: string;
  nav: NavItem[];
}

export interface ParticipantTable {
  id: string;
  kiwi_id: string;
  user_id: string;
  name: string;
  profile_image: string | null;
  color: string;
  single_page: boolean;
  font_family: string | null;
  font_size: number | null;
  font_weight: number | null;
  line_height: number | null;
  cfi_start: string | null;
  cfi_end: string | null;
  percentage: number | null;
  last_activity_at: string | null;
}

export interface BookmarkTable {
  participant_id: string;
  cfi_start: string;
  cfi_end: string;
  created_at: string;
}

export interface HighlightTable {
  id: string;
  kiwi_id: string;
  participant_id: string;
  cfi: string;
  text: string;
  color: string;
  section_href: string;
  created_at: string;
  updated_at: string;
}

export interface CommentTable {
  id: string;
  highlight_id: string;
  participant_id: string;
  text: string;
  created_at: string;
  updated_at: string;
}
