import React from 'react'
import { Link } from 'react-router-dom'
import MangaCard from '../components/common/MangaCard'
import { mangas, categories, authors } from '../data/mockData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons'

const Home: React.FC = () => {
  const featuredManga = mangas.slice(0, 6)
  const newReleases = [...mangas].reverse().slice(0, 6)
  const popularAuthors = authors.slice(0, 6)

  return (
      <div className="space-y-12">
          {/* Hero Section */}
          <section
              className="relative h-96 bg-cover bg-center"
              style={{
                  backgroundImage:
                      "linear-gradient(to right, rgba(99,102,241,0.6), rgba(139,92,246,0.6)), url('/images/background.jpg')",
              }}
          >
              <div className="container mx-auto px-4 h-full flex items-center">
                  <div className="text-white max-w-2xl">
                      <h1 className="text-4xl font-bold mb-4">
                          Khám phá thế giới Manga
                      </h1>
                      <p className="text-lg mb-8">
                          Thư viện manga đa dạng với hàng nghìn tựa truyện từ nhiều thể loại khác nhau.
                      </p>
                      <Link
                          to="/manga"
                          className="bg-white text-indigo-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100"
                      >
                          Khám phá ngay
                      </Link>
                  </div>
              </div>
          </section>

          {/* Featured Manga */}
          <section className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-6">Manga nổi bật</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                  {featuredManga.map((manga) => (
                      <MangaCard key={manga.id} manga={manga}/>
                  ))}
              </div>
          </section>

          {/* New Releases */}
          <section className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-6">Mới phát hành</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                  {newReleases.map((manga) => (
                      <MangaCard key={manga.id} manga={manga}/>
                  ))}
              </div>
          </section>

          {/* Categories */}
          <section className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-6">Thể loại manga</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {categories.map((category) => (
                      <Link
                          key={category.id}
                          to={`/category/${category.id}`}
                          className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
                      >
                          <FontAwesomeIcon icon={faBook} size="2x" className="text-indigo-600 mb-2"/>
                          <h3 className="font-medium text-gray-900">{category.name}</h3>
                          <p className="text-sm text-gray-600">{category.count} truyện</p>
                      </Link>
                  ))}
              </div>
          </section>

          {/* Popular Authors */}
          <section className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-6">Tác giả nổi tiếng</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  {popularAuthors.map((author) => (
                      <div key={author.id} className="bg-white p-4 rounded-lg shadow-md text-center">
                          <img
                              src={author.image}
                              alt={author.name}
                              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                          />
                          <h3 className="font-medium text-gray-900">{author.name}</h3>
                          <p className="text-sm text-gray-600">{author.mangaCount} tác phẩm</p>
                      </div>
                  ))}
              </div>
          </section>
      </div>
  )
}

export default Home 