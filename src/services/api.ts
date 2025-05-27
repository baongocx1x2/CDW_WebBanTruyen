import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Manga related API calls
export const mangaApi = {
  getFeatured: () => api.get('/manga/featured'),
  getNewReleases: () => api.get('/manga/new'),
  getMangaById: (id: string) => api.get(`/manga/${id}`),
  getRelatedManga: (id: string) => api.get(`/manga/${id}/related`),
  searchManga: (query: string) => api.get(`/manga/search?q=${query}`),
};

// Category related API calls
export const categoryApi = {
  getAll: () => api.get('/categories'),
  getMangaByCategory: (categoryId: string) => api.get(`/categories/${categoryId}/manga`),
};

// Author related API calls
export const authorApi = {
  getPopular: () => api.get('/authors/popular'),
  getAuthorById: (id: string) => api.get(`/authors/${id}`),
  getAuthorManga: (id: string) => api.get(`/authors/${id}/manga`),
};

// Cart related API calls
export const cartApi = {
  getItems: () => api.get('/cart'),
  addItem: (mangaId: number, quantity: number) => api.post('/cart', { mangaId, quantity }),
  updateItem: (itemId: number, quantity: number) => api.put(`/cart/${itemId}`, { quantity }),
  removeItem: (itemId: number) => api.delete(`/cart/${itemId}`),
  clearCart: () => api.delete('/cart'),
};

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle different error cases
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Handle unauthorized access
          localStorage.removeItem('token');
          window.location.href = '/login';
          break;
        case 404:
          // Handle not found
          console.error('Resource not found');
          break;
        default:
          // Handle other errors
          console.error('API Error:', error.response.data);
      }
    } else if (error.request) {
      // Handle network errors
      console.error('Network Error:', error.request);
    } else {
      // Handle other errors
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api; 