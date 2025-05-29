import React from 'react';
import { Link } from 'react-router-dom';
import MangaCard from '../components/common/MangaCard';
import { mangas, categories } from '../data/mockData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const Manga: React.FC = () => {
    return (
        <div className="space-y-12">
            {/* Hero Section */}
            <section className="relative h-80 bg-gradient-to-r from-indigo-600 to-purple-600">
                <div className="container mx-auto px-4 h-full flex items-center">
                    <div className="text-white max-w-2xl">
                        <h1 className="text-4xl font-bold mb-4">Bộ sưu tập Manga</h1>
                        <p className="text-lg mb-8">
                            Khám phá kho truyện tranh đa dạng với hàng trăm tựa truyện nổi bật.
                        </p>
                    </div>
                </div>
            </section>

            {/* Filters */}
            <section className="container mx-auto px-4">
                <h2 className="text-2xl font-bold mb-6">Lọc theo thể loại</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            to={`/category/${category.id}`}
                            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
                        >
                            <FontAwesomeIcon icon={faFilter} size="2x" className="text-indigo-600 mb-2" />
                            <h3 className="font-medium text-gray-900">{category.name}</h3>
                            <p className="text-sm text-gray-600">{category.count} truyện</p>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Manga List */}
            <section className="container mx-auto px-4">
                <h2 className="text-2xl font-bold mb-6">Danh sách Manga</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {mangas.map((manga) => (
                        <MangaCard key={manga.id} manga={manga} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Manga;