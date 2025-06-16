// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../models/User'; // Điều chỉnh lại đường dẫn nếu cần
import { authService } from '../services/authService'; // Điều chỉnh lại đường dẫn nếu cần

// Định nghĩa kiểu cho AuthContext
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    username: string;
    firstName: string;
    lastName: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

// Tạo context với giá trị mặc định undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Khi app khởi động, kiểm tra localStorage xem có token hay không và gọi API lấy thông tin user
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          console.log('Auth init: Token đã lưu trong localStorage:', token);
          // Giả sử API /users/me trả về thông tin user hiện tại
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser.data);
          console.log('Auth init: user loaded', currentUser.data);
        }
      } catch (err) {
        console.error('Error initializing auth:', err);
        localStorage.removeItem('token');
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      console.log('Attempting login with email:', email);
      const response = await authService.login(email, password);
      const { token } = response.data;
      localStorage.setItem('token', token);
      console.log('Login successful, token stored:', token);
      // Sau khi lưu token, gọi endpoint lấy thông tin user
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser.data);
      console.log('User data after login:', currentUser.data);
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Đăng nhập thất bại';
      setError(errorMsg);
      console.error('Login error:', err);
      throw err;
    }
  };

  const register = async (data: {
    email: string;
    password: string;
    username: string;
    firstName: string;
    lastName: string;
  }) => {
    try {
      setError(null);
      console.log('Attempting registration with data:', data);
      const response = await authService.register(data);
      // Giả sử backend trả về cả user và token
      const { user: registeredUser, token } = response.data;
      localStorage.setItem('token', token);
      setUser(registeredUser);
      console.log('Registration successful:', registeredUser);
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Đăng ký thất bại';
      setError(errorMsg);
      console.error('Register error:', err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      console.log('Logging out...');
      await authService.logout();
      localStorage.removeItem('token');
      setUser(null);
      console.log('Logout successful');
    } catch (err: any) {
      console.error('Error logging out:', err);
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      setError(null);
      console.log('Updating profile with data:', data);
      const response = await authService.updateProfile(data);
      setUser(response.data);
      console.log('Profile updated:', response.data);
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Cập nhật thông tin thất bại';
      setError(errorMsg);
      console.error('Update profile error:', err);
      throw err;
    }
  };

  return (
      <AuthContext.Provider
          value={{
            user,
            isLoading,
            error,
            login,
            register,
            logout,
            updateProfile,
          }}
      >
        {children}
      </AuthContext.Provider>
  );
};

// Custom hook sử dụng AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};