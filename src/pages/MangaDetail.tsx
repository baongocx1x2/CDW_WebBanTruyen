import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Manga } from '../models/Manga.ts';
import { mangaService } from '../services/mangaService.ts';
import { useCart } from '../contexts/CartContext.tsx';

const MangaDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [manga, setManga] = useState<Manga | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchManga = async () => {
      try {
        setIsLoading(true);
        const response = await mangaService.getById(Number(id));
        setManga(response.data);
      } catch (err) {
        setError('Có lỗi xảy ra khi tải thông tin manga. Vui lòng thử lại sau.');
        console.error('Error fetching manga:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchManga();
    }
  }, [id]);

  const handleAddToCart = async () => {
    try {
      if (manga) {
        await addToCart(manga.id, quantity);
        alert('Đã thêm vào giỏ hàng thành công!');
      }
    } catch (err) {
      alert('Có lỗi xảy ra khi thêm vào giỏ hàng. Vui lòng thử lại sau.');
      console.error('Error adding to cart:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !manga) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error || 'Không tìm thấy manga'}</p>
        <Link
          to="/"
          className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Quay về trang chủ
        </Link>
      </div>
    );
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
                    className="p-3 border border-gray-200 rounded-md hover:border-indigo-600"
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
                          <svg
                            key={i}
                            className={`h-5 w-5 ${
                              i < review.rating
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
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
  );
};

export default MangaDetail; 