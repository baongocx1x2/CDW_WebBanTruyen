import React, { useState } from 'react';
import MangaCard from '../components/common/MangaCard';
import { mangas, categories } from '../data/mockData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const Manga: React.FC = () => {
    // Sử dụng state để lưu thể loại được chọn. "all" nghĩa là hiển thị tất cả manga.
    const [selectedCategory, setSelectedCategory] = useState<number | 'all'>('all');

    // Nếu chọn "all", hiển thị tất cả manga, nếu không, lọc dựa trên id của thể loại.
    const filteredMangas =
        selectedCategory === 'all'
            ? mangas
            : mangas.filter((manga) =>
                manga.categories.some((cat) => cat.id === selectedCategory)
            );

    return (
        <div className="space-y-16">
            {/* Hero Section */}
            <section
                className="relative h-96 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, rgba(99,102,241,0.7), rgba(139,92,246,0.7)), url('/images/manga-hero.jpg')",
                }}
            >
                <div className="container mx-auto px-4 h-full flex items-center">
                    <div className="text-white max-w-xl">
                        <h1 className="text-5xl font-extrabold mb-4">Bộ sưu tập Manga</h1>
                        <p className="text-xl mb-6">
                            Khám phá kho truyện tranh đa dạng từ hành động, phiêu lưu, drama và nhiều thể loại khác.
                        </p>
                    </div>
                </div>
            </section>

            {/* Filters Section với thanh cuộn ngang */}
            <section className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8">Lọc theo thể loại</h2>
                <div className="flex space-x-4 overflow-x-auto pb-4">
                    {/* Nút "Tất cả" */}
                    <button
                        onClick={() => setSelectedCategory('all')}
                        className={`flex-shrink-0 bg-white w-40 p-4 rounded-lg shadow-md transition-transform transform ${
                            selectedCategory === 'all' ? 'border-2 border-indigo-600' : ''
                        } text-center`}
                    >
                        <FontAwesomeIcon icon={faFilter} size="2x" className="text-indigo-600 mb-2" />
                        <h3 className="font-semibold text-lg text-gray-900">Tất cả</h3>
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`flex-shrink-0 bg-white w-40 p-4 rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105 text-center ${
                                selectedCategory === category.id ? 'border-2 border-indigo-600' : ''
                            }`}
                        >
                            <FontAwesomeIcon icon={faFilter} size="2x" className="text-indigo-600 mb-2" />
                            <h3 className="font-semibold text-lg text-gray-900">{category.name}</h3>
                            <p className="text-sm text-gray-600">{category.count} truyện</p>
                        </button>
                    ))}
                </div>
            </section>

            {/* Manga List Section */}
            <section className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8">Danh sách Manga</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                    {filteredMangas.length > 0 ? (
                        filteredMangas.map((manga) => <MangaCard key={manga.id} manga={manga} />)
                    ) : (
                        <p className="text-gray-600">Không có manga nào với thể loại được chọn.</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Manga;