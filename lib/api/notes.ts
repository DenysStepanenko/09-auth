import api from './api';

export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateNoteData {
  title: string;
  content: string;
  tags: string[];
}

export interface UpdateNoteData {
  title?: string;
  content?: string;
  tags?: string[];
}

export const notesApi = {
  // Get all notes with optional filters
  getNotes: async (params?: { 
    search?: string; 
    page?: number; 
    perPage?: number; 
    tag?: string 
  }) => {
    const response = await api.get('/notes', { params });
    return response.data;
  },

  // Get single note by ID
  getNote: async (id: string): Promise<Note> => {
    const response = await api.get(`/notes/${id}`);
    return response.data;
  },

  // Create new note
  createNote: async (data: CreateNoteData): Promise<Note> => {
    const response = await api.post('/notes', data);
    return response.data;
  },

  // Update existing note
  updateNote: async (id: string, data: UpdateNoteData): Promise<Note> => {
    const response = await api.patch(`/notes/${id}`, data);
    return response.data;
  },

  // Delete note
  deleteNote: async (id: string): Promise<void> => {
    await api.delete(`/notes/${id}`);
  },

  // Get all tags
  getTags: async (): Promise<string[]> => {
    const response = await api.get('/notes/tags');
    return response.data;
  },
};

