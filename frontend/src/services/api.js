import axios from 'axios';

/**
 * Base URL empty in dev: Vite proxies /api and /uploads to Express.
 * For production build, set VITE_API_URL to your API origin.
 */
const baseURL = (import.meta.env.VITE_API_URL ?? '').replace(/\/+$/, '');

const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const useAdmin = config.admin === true;
  const token = localStorage.getItem(useAdmin ? 'pharma_admin_token' : 'pharma_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

/** Full URL for uploaded images (relative paths from API). */
export function mediaUrl(path) {
  if (!path) return '/placeholder-product.svg';
  if (path.startsWith('http')) return path;
  const origin = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');
  return `${origin}${path}`;
}
