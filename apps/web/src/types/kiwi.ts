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
  lastActivityAt: string;
  detailDescription?: string;
  password: string | null;
  shareCode: string;
  book: BookData;
  discussions?: DiscussionProps[];
  events?: EventProps[];
  activities?: ActivityProps[];
  createdAt: string;
  admin: {
    id: number;
    name: string;
  };
  participants: ParticipantType[];
}
