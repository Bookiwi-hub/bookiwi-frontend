export enum Step {
  One,
  Two,
  Three,
  Four,
}

export interface CreateKiwi {
  kiwiName: string;
  kiwiDescription: string;
  kiwiDetailDescription: string;
  maxParticipants: number;
  password: string | null;
  file: File | null;
  shareCode: string;
}
