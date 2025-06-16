// src/api.ts
import axios from 'axios';

// Định nghĩa URL backend. Nếu cần, điều chỉnh tại đây.
const API_BASE_URL = 'http://localhost:8080';

// Tạo axios instance với cấu hình mặc định
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor để gắn token JWT vào mọi request nếu có token trong localStorage
api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`;
        // Bạn có thể bật log debug nếu cần:
        // console.debug("Request with JWT:", token);
      }
      return config;
    },
    (error) => {
      console.error("Request error:", error);
      return Promise.reject(error);
    }
);

export default api;