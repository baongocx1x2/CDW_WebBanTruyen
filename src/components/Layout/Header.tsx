import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faSearch } from '@fortawesome/free-solid-svg-icons';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Hàm xử lý tìm kiếm: dùng useNavigate để chuyển hướng đến trang tìm kiếm
  const handleSearch = () => {
    if (searchTerm.trim()) {
      // Chuyển hướng đến trang kết quả tìm kiếm với query được mã hóa
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-16 space-x-4">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              MangaStore
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-indigo-600">
                Trang chủ
              </Link>
              <Link to="/manga" className="text-gray-700 hover:text-indigo-600">
                Danh mục
              </Link>
              <Link to="/new-releases" className="text-gray-700 hover:text-indigo-600">
                Mới phát hành
              </Link>
            </nav>

            {/* Search Bar – hiển thị trên md trở lên */}
            <div className="flex-1 hidden md:block">
              <div className="relative">
                <input
                    type="text"
                    placeholder="Tìm kiếm theo tên..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-600"
                />
                <button
                    onClick={handleSearch}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
                </button>
              </div>
            </div>

            {/* User Controls */}
            <div className="flex items-center space-x-4">
              <Link to="/cart" className="text-gray-700 hover:text-indigo-600 relative">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {cart && cart.items.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.items.length}
                </span>
                )}
              </Link>

              {user ? (
                  <div className="relative">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600"
                    >
                      <img
                          src={user.avatar || '/default-avatar.png'}
                          alt={user.username}
                          className="w-8 h-8 rounded-full"
                      />
                      <span>{user.username}</span>
                    </button>
                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                          <Link
                              to="/profile"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Hồ sơ
                          </Link>
                          <Link
                              to="/orders"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Đơn hàng
                          </Link>
                          <button
                              onClick={logout}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Đăng xuất
                          </button>
                        </div>
                    )}
                  </div>
              ) : (
                  <div className="space-x-4">
                    <Link to="/login" className="text-gray-700 hover:text-indigo-600">
                      Đăng nhập
                    </Link>
                    <Link
                        to="/register"
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                    >
                      Đăng ký
                    </Link>
                  </div>
              )}
            </div>
          </div>
        </div>
      </header>
  );
};

export default Header;