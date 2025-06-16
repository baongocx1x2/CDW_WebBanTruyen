// src/components/Login.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LoginCredentials } from '../../models/types';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, error } = useAuth();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [showPwd, setShowPwd] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting login with credentials:", credentials);
    setLoading(true);
    try {
      await login(credentials.email, credentials.password);
      console.log("Login successful. Navigating to home.");
      navigate('/');
    } catch (err) {
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Chào mừng trở lại
          </h1>

          {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded">
                {error}
              </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-1">
                Email
              </label>
              <input
                  id="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={credentials.email}
                  onChange={(e) =>
                      setCredentials({ ...credentials, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-gray-700 mb-1">
                Mật khẩu
              </label>
              <input
                  id="password"
                  type={showPwd ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={credentials.password}
                  onChange={(e) =>
                      setCredentials({ ...credentials, password: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPwd ? 'Ẩn' : 'Hiện'}
              </button>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-indigo-600" />
                <span className="ml-2 text-gray-700">Ghi nhớ đăng nhập</span>
              </label>
              <Link to="/forgot-password" className="text-indigo-600 hover:text-indigo-800">
                Quên mật khẩu?
              </Link>
            </div>

            <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center items-center py-2 rounded-lg text-white font-medium ${
                    loading
                        ? 'bg-indigo-300 cursor-not-allowed'
                        : 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800'
                }`}
            >
              {loading && (
                  <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                  >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
              )}
              {loading ? 'Đang xử lý...' : 'Đăng nhập'}
            </button>
          </form>

          <p className="text-center text-gray-600">
            Chưa có tài khoản?{' '}
            <Link to="/register" className="text-indigo-600 hover:text-indigo-800">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
  );
};

export default Login;