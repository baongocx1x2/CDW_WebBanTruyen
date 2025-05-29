import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { authors, mangas } from '../data/mockData';

const AuthorDetail: React.FC = () => {
  // Lấy ID tác giả từ URL
  const { id } = useParams<{ id: string }>();
  const authorId = Number(id);

  // Tìm tác giả theo id
  const author = authors.find((a) => a.id === authorId);

  if (!author) {
    return (
      <div className="container mx-auto py-10">
        <h2 className="text-2xl font-bold text-gray-800">Tác giả không tồn tại.</h2>
      </div>
    );
  }

  // Lọc các truyện thuộc tác giả đó
  const authorMangas = mangas.filter((m) => m.author.id === authorId);

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Thông tin Tác giả */}
      <div className="flex flex-col md:flex-row items-start md:items-center">
        <img
          src={author.image || 'https://via.placeholder.com/150'}
          alt={author.name}
          className="w-32 h-32 rounded-full object-cover mr-6"
        />
        <div className="mt-4 md:mt-0">
          <h1 className="text-3xl font-bold text-gray-800">{author.name}</h1>
          <p className="text-gray-600 mt-2">{author.biography}</p>
          <p className="mt-1 text-gray-500">{author.mangaCount} tác phẩm</p>
        </div>
      </div>

      {/* Danh sách các tác phẩm của tác giả */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Các tác phẩm</h2>
        {authorMangas.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {authorMangas.map((manga) => (
              <div key={manga.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <img
                  src={manga.coverImage}
                  alt={manga.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{manga.title}</h3>
                  <p className="text-gray-600 mt-2">
                    {manga.description.substring(0, 60)}...
                  </p>
                  <Link
                    to={`/manga/${manga.id}`}
                    className="mt-2 inline-block text-indigo-600 hover:underline"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">Chưa có tác phẩm nào của tác giả này.</p>
        )}
      </div>
    </div>
  );
};

export default AuthorDetail;