import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://notehub-api.goit.study';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default api;
