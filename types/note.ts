export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewNoteData {
  title: string;
  content: string;
  tags: string[];
}

export interface NoteListResponse {
  notes: Note[];
  total: number;
}

export interface Category {
  id: string;
  name: string;
  count?: number;
}

