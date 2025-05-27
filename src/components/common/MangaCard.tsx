import React from 'react'
import { Link } from 'react-router-dom'
import { Manga } from '../../models/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

interface MangaCardProps {
  manga: Manga
}

const MangaCard: React.FC<MangaCardProps> = ({ manga }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/manga/${manga.id}`}>
        <img
          src={manga.coverImage}
          alt={manga.title}
          className="w-full h-64 object-cover"
        />
      </Link>
      <div className="p-4">
        <Link
          to={`/manga/${manga.id}`}
          className="text-lg font-semibold text-gray-900 hover:text-indigo-600"
        >
          {manga.title}
        </Link>
        <p className="text-sm text-gray-600 mt-1">{manga.author.name}</p>
        <div className="flex items-center mt-2">
          <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-1" />
          <span className="text-sm text-gray-700">{manga.rating}</span>
        </div>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-indigo-600 font-medium">
            {manga.price.toLocaleString('vi-VN')} ₫
          </span>
          <span className={`text-sm px-2 py-1 rounded ${
            manga.status === 'ongoing'
              ? 'bg-green-100 text-green-800'
              : manga.status === 'completed'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {manga.status === 'ongoing'
              ? 'Đang tiến hành'
              : manga.status === 'completed'
              ? 'Hoàn thành'
              : 'Tạm ngưng'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default MangaCard 