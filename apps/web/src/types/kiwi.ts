export interface BookProps {
  title: string;
  author: string;
  cover: string;
}

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
}

export interface Kiwi {
  id: string;
  name: string;
  description: string;
  image: string;
  lastActivityAt: string;
  detailDescription?: string;
  isPrivate?: boolean;
  memberCount?: number;
  progress?: number;
  book?: BookProps;
  discussions?: DiscussionProps[];
  events?: EventProps[];
  activities?: ActivityProps[];
  createdAt?: string;
  admin?: string;
  members?: Member[];
}
