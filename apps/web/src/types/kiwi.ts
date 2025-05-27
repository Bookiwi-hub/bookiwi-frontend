import { BookData, Settings, ReadingRecord } from "./book";

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

export interface Member {
  id: number;
  name: string;
  avatar: string;
  progress: number;
  lastActivityAt: string;
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
