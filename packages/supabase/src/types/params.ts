export interface NewParticipant {
  kiwiId: string;
  userId: string;
  name: string;
  profileImage: string | null;
  color: string;
}

export interface NewHighlight {
  kiwiId: string;
  participantId: string;
  cfi: string;
  text: string;
  color: string;
  sectionHref: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewKiwi {
  userId: string;
  name: string;
  description: string;
  detailDescription: string;
  maxParticipants: number;
  password: string | null;
  file: File;
}
