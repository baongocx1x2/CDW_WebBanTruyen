import api from './api';
import { Manga, Chapter, Review } from '../models/Manga';

export const mangaService = {
  // Manga listing
  getFeatured: () => api.get<Manga[]>('/manga/featured'),
  getNewReleases: () => api.get<Manga[]>('/manga/new'),
  getByCategory: (categoryId: number) => api.get<Manga[]>(`/categories/${categoryId}/manga`),
  search: (query: string) => api.get<Manga[]>(`/manga/search?q=${query}`),
  
  // Single manga
  getById: (id: number) => api.get<Manga>(`/manga/${id}`),
  getRelated: (id: number) => api.get<Manga[]>(`/manga/${id}/related`),
  
  // Chapters
  getChapters: (mangaId: number) => api.get<Chapter[]>(`/manga/${mangaId}/chapters`),
  getChapter: (mangaId: number, chapterId: number) => 
    api.get<Chapter>(`/manga/${mangaId}/chapters/${chapterId}`),
  
  // Reviews
  getReviews: (mangaId: number) => api.get<Review[]>(`/manga/${mangaId}/reviews`),
  addReview: (mangaId: number, data: { rating: number; comment: string }) =>
    api.post<Review>(`/manga/${mangaId}/reviews`, data),
  updateReview: (mangaId: number, reviewId: number, data: { rating: number; comment: string }) =>
    api.put<Review>(`/manga/${mangaId}/reviews/${reviewId}`, data),
  deleteReview: (mangaId: number, reviewId: number) =>
    api.delete(`/manga/${mangaId}/reviews/${reviewId}`),
  
  // Wishlist
  addToWishlist: (mangaId: number) => api.post(`/manga/${mangaId}/wishlist`),
  removeFromWishlist: (mangaId: number) => api.delete(`/manga/${mangaId}/wishlist`),
  
  // Admin operations
  create: (data: Partial<Manga>) => api.post<Manga>('/admin/manga', data),
  update: (id: number, data: Partial<Manga>) => api.put<Manga>(`/admin/manga/${id}`, data),
  delete: (id: number) => api.delete(`/admin/manga/${id}`),
  uploadCover: (id: number, file: File) => {
    const formData = new FormData();
    formData.append('cover', file);
    return api.post(`/admin/manga/${id}/cover`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }
}; 