import api from './api.ts';
import { User, AuthResponse } from '../models/User.ts';

export const authService = {
  // Authentication
  login: (email: string, password: string) =>
    api.post<AuthResponse>('/auth/login', { email, password }),
  
  register: (data: {
    email: string;
    password: string;
    username: string;
    firstName: string;
    lastName: string;
  }) => api.post<AuthResponse>('/auth/register', data),
  
  logout: () => api.post('/auth/logout'),
  
  refreshToken: (refreshToken: string) =>
    api.post<AuthResponse>('/auth/refresh-token', { refreshToken }),
  
  // Password management
  forgotPassword: (email: string) =>
    api.post('/auth/forgot-password', { email }),
  
  resetPassword: (token: string, newPassword: string) =>
    api.post('/auth/reset-password', { token, newPassword }),
  
  changePassword: (currentPassword: string, newPassword: string) =>
    api.post('/auth/change-password', { currentPassword, newPassword }),
  
  // User profile
  getCurrentUser: () => api.get<User>('/users/me'),
  
  updateProfile: (data: Partial<User>) =>
    api.put<User>('/users/me', data),
  
  updateAvatar: (file: File) => {
    const formData = new FormData();
    formData.append('avatar', file);
    return api.post('/users/me/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  
  // Address management
  addAddress: (address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    isDefault?: boolean;
  }) => api.post('/users/me/addresses', address),
  
  updateAddress: (addressId: number, address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    isDefault?: boolean;
  }) => api.put(`/users/me/addresses/${addressId}`, address),
  
  deleteAddress: (addressId: number) =>
    api.delete(`/users/me/addresses/${addressId}`),
  
  setDefaultAddress: (addressId: number) =>
    api.put(`/users/me/addresses/${addressId}/default`),
  
  // Admin operations
  getAllUsers: () => api.get<User[]>('/admin/users'),
  getUserById: (id: number) => api.get<User>(`/admin/users/${id}`),
  updateUser: (id: number, data: Partial<User>) =>
    api.put<User>(`/admin/users/${id}`, data),
  deleteUser: (id: number) => api.delete(`/admin/users/${id}`),
}; 