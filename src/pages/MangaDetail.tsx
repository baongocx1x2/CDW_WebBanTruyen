import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { mangas } from '../data/mockData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const MangaDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const manga = mangas.find(m => m.id === Number(id))
  const [quantity, setQuantity] = useState(1)

  if (!manga) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Không tìm thấy manga</h2>
        <Link
          to="/"
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700"
        >
          Quay về trang chủ
        </Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    alert('Đã thêm vào giỏ hàng!')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div>
          <img
            src={manga.coverImage}
            alt={manga.title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Info Section */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{manga.title}</h1>
          
          <div className="space-y-2">
            <p className="text-lg text-gray-600">
              <span className="font-semibold">Tác giả:</span>{' '}
              {manga.author.name}
            </p>
            <p className="text-lg text-gray-600">
              <span className="font-semibold">Thể loại:</span>{' '}
              {manga.categories.map(cat => cat.name).join(', ')}
            </p>
            <p className="text-lg text-gray-600">
              <span className="font-semibold">Tình trạng:</span>{' '}
              {manga.status === 'ongoing' ? 'Đang tiến hành' : 
               manga.status === 'completed' ? 'Đã hoàn thành' : 'Tạm ngưng'}
            </p>
            <p className="text-lg text-gray-600">
              <span className="font-semibold">Năm phát hành:</span>{' '}
              {manga.releaseYear}
            </p>
            <div className="flex items-center">
              <span className="font-semibold text-lg text-gray-600 mr-2">Đánh giá:</span>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                <span className="ml-1 text-lg text-gray-700">{manga.rating}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-b border-gray-200 py-4">
            <p className="text-2xl font-bold text-indigo-600">
              {manga.price.toLocaleString('vi-VN')} ₫
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-4 py-1 border-x border-gray-300">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700"
            >
              Thêm vào giỏ hàng
            </button>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-xl font-bold mb-2">Giới thiệu</h2>
            <p className="text-gray-600">{manga.description}</p>
          </div>

          {/* Chapters Section */}
          {manga.chapters.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Danh sách chapter</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {manga.chapters.map(chapter => (
                  <div
                    key={chapter.id}
                    className="p-3 border border-gray-200 rounded-md hover:border-indigo-600 cursor-pointer"
                  >
                    <p className="font-medium">Chapter {chapter.number}</p>
                    <p className="text-sm text-gray-500">{chapter.title}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews Section */}
          {manga.reviews.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Đánh giá</h2>
              <div className="space-y-4">
                {manga.reviews.map(review => (
                  <div
                    key={review.id}
                    className="p-4 border border-gray-200 rounded-md"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">{review.userName}</p>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <FontAwesomeIcon
                            key={i}
                            icon={faStar}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {new Date(review.date).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MangaDetail 