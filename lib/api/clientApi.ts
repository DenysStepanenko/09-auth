import api from './api';
import { User, LoginCredentials, RegisterCredentials, UpdateUserData } from '@/types/user';

// Auth API
export const authApi = {
  login: async (credentials: LoginCredentials): Promise<User> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  register: async (credentials: RegisterCredentials): Promise<User> => {
    const response = await api.post('/auth/register', credentials);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },

  getSession: async (): Promise<User | null> => {
    try {
      const response = await api.get('/auth/session');
      return response.data || null;
    } catch (error) {
      return null;
    }
  },
};

// User API
export const userApi = {
  getMe: async (): Promise<User> => {
    const response = await api.get('/users/me');
    return response.data;
  },

  updateMe: async (data: UpdateUserData): Promise<User> => {
    const response = await api.patch('/users/me', data);
    return response.data;
  },
};

