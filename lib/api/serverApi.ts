import axios from 'axios';
import { cookies } from 'next/headers';
import { User } from '@/types/user';

const baseURL = 'https://notehub-api.goit.study';

const createServerApi = async () => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');
  
  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      ...(sessionCookie && { Cookie: `session=${sessionCookie.value}` }),
    },
  });
};

// Server-side auth API
export const serverAuthApi = {
  getSession: async (): Promise<User | null> => {
    try {
      const api = await createServerApi();
      const response = await api.get('/auth/session');
      return response.data || null;
    } catch (error) {
      return null;
    }
  },
};

// Server-side user API
export const serverUserApi = {
  getMe: async (): Promise<User | null> => {
    try {
      const api = await createServerApi();
      const response = await api.get('/users/me');
      return response.data;
    } catch (error) {
      return null;
    }
  },
};

// Server-side notes API
export const serverNotesApi = {
  getNotes: async (params?: { search?: string; page?: number; perPage?: number; tag?: string }) => {
    try {
      const api = await createServerApi();
      const response = await api.get('/notes', { params });
      return response.data;
    } catch (error) {
      return [];
    }
  },

  getNote: async (id: string) => {
    try {
      const api = await createServerApi();
      const response = await api.get(`/notes/${id}`);
      return response.data;
    } catch (error) {
      return null;
    }
  },
};

