import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthResponse } from '../models/User.ts';
import { authService } from '../services/authService.ts';

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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser.data);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
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
      const response = await authService.login(email, password);
      const { user, token } = response.data;
      localStorage.setItem('token', token);
      setUser(user);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Đăng nhập thất bại');
      throw error;
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
      const response = await authService.register(data);
      const { user, token } = response.data;
      localStorage.setItem('token', token);
      setUser(user);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Đăng ký thất bại');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      localStorage.removeItem('token');
      setUser(null);
    } catch (error: any) {
      console.error('Error logging out:', error);
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      setError(null);
      const response = await authService.updateProfile(data);
      setUser(response.data);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Cập nhật thông tin thất bại');
      throw error;
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 