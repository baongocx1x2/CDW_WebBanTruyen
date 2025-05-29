import React from 'react';
import { Link } from 'react-router-dom';
import { Manga } from '../../models/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface MangaCardProps {
  manga: Manga;
}

// Hàm trả về lớp style dựa vào trạng thái của manga
const getStatusStyle = (status: string) => {
  switch (status) {
    case 'ongoing':
      return 'bg-green-100 text-green-800';
    case 'completed':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Hàm trả về nhãn dựa vào trạng thái của manga
const getStatusLabel = (status: string) => {
  switch (status) {
    case 'ongoing':
      return 'Đang tiến hành';
    case 'completed':
      return 'Hoàn thành';
    default:
      return 'Tạm ngưng';
  }
};

const MangaCard: React.FC<MangaCardProps> = ({ manga }) => {
  return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <Link to={`/manga/${manga.id}`}>
          <img
              src={manga.coverImage}
              alt={manga.title}
              className="w-full h-64 object-cover"
              loading="lazy"
          />
        </Link>
        <div className="p-4">
          <Link
              to={`/manga/${manga.id}`}
              className="text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-colors"
          >
            {manga.title}
          </Link>
          <p className="text-sm text-gray-600 mt-1">{manga.author.name}</p>
          <div className="flex items-center mt-2">
            <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-1" />
            <span className="text-sm text-gray-700">{manga.rating.toFixed(1)}</span>
          </div>
          {/* Chỉnh layout giá tiền và tiến độ */}
          <div className="mt-2">
            {/* Giá tiền */}
            <span className="block text-indigo-600 font-medium">
            {manga.price.toLocaleString('vi-VN')} ₫
          </span>
            {/* Nhãn trạng thái */}
            <span
                className={`inline-block mt-1 text-sm px-2 py-1 rounded ${getStatusStyle(
                    manga.status
                )}`}
            >
            {getStatusLabel(manga.status)}
          </span>
          </div>
        </div>
      </div>
  );
};

export default MangaCard;