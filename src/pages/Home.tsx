import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Manga } from '../models/Manga.ts';
import { mangaService } from '../services/mangaService.ts';
import { Carousel, Row, Col, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faBook } from '@fortawesome/free-solid-svg-icons';

interface Author {
  id: number;
  name: string;
  image: string;
  mangaCount: number;
}

interface Category {
  id: number;
  name: string;
  count: number;
}

const Home: React.FC = () => {
  const [featuredManga, setFeaturedManga] = useState<Manga[]>([]);
  const [newReleases, setNewReleases] = useState<Manga[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [popularAuthors, setPopularAuthors] = useState<Author[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [featuredResponse, newReleasesResponse, categoriesResponse, authorsResponse] = await Promise.all([
          mangaService.getFeatured(),
          mangaService.getNewReleases(),
          mangaService.getCategories(),
          mangaService.getPopularAuthors()
        ]);
        setFeaturedManga(featuredResponse.data);
        setNewReleases(newReleasesResponse.data);
        setCategories(categoriesResponse.data);
        setPopularAuthors(authorsResponse.data);
      } catch (err) {
        setError('Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.');
        console.error('Error fetching home data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Thử lại
        </button>
      </div>
    );
  }

  const renderRatingStars = (rating: number) => {
    const stars: JSX.Element[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesomeIcon key={i} icon={faStar} className="text-warning" />);
    }

    if (hasHalfStar) {
      stars.push(<FontAwesomeIcon key="half" icon={faStarHalfAlt} className="text-warning" />);
    }

    return stars;
  };

  const MangaCard: React.FC<{ manga: Manga }> = ({ manga }) => (
    <Card className="manga-card h-100">
      <Card.Img variant="top" src={manga.coverImage} alt={manga.title} />
      <Card.Body>
        <span className="category-badge mb-2">{manga.category}</span>
        <Card.Title>{manga.title}</Card.Title>
        <div className="rating mb-2">
          {renderRatingStars(manga.rating)}
          <span className="ms-1">{manga.rating}</span>
        </div>
        <p className="price mb-2">{manga.price.toLocaleString('vi-VN')} đ</p>
        <Button variant="primary" className="w-100">Thêm vào giỏ</Button>
      </Card.Body>
    </Card>
  );

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative h-96">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600">
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
        </div>
      </section>

      {/* Featured Manga */}
      <section>
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Manga nổi bật</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {featuredManga.map((manga) => (
              <Link
                key={manga.id}
                to={`/manga/${manga.id}`}
                className="group"
              >
                <div className="aspect-w-2 aspect-h-3 mb-2">
                  <img
                    src={manga.coverImage}
                    alt={manga.title}
                    className="object-cover rounded-lg group-hover:opacity-75 transition-opacity"
                  />
                </div>
                <h3 className="font-medium text-gray-900 group-hover:text-indigo-600">
                  {manga.title}
                </h3>
                <p className="text-sm text-gray-500">{manga.author.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Releases */}
      <section>
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Mới phát hành</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {newReleases.map((manga) => (
              <Link
                key={manga.id}
                to={`/manga/${manga.id}`}
                className="group"
              >
                <div className="aspect-w-2 aspect-h-3 mb-2">
                  <img
                    src={manga.coverImage}
                    alt={manga.title}
                    className="object-cover rounded-lg group-hover:opacity-75 transition-opacity"
                  />
                </div>
                <h3 className="font-medium text-gray-900 group-hover:text-indigo-600">
                  {manga.title}
                </h3>
                <p className="text-sm text-gray-500">{manga.author.name}</p>
                <p className="text-sm text-indigo-600 font-medium">
                  {manga.price.toLocaleString('vi-VN')} ₫
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="mb-5">
        <h2 className="mb-4">Thể loại manga</h2>
        <Row xs={2} md={3} lg={6} className="g-3">
          {categories.map(category => (
            <Col key={category.id}>
              <Link to={`/category/${category.id}`} className="text-decoration-none">
                <Card className="h-100 text-center">
                  <Card.Body>
                    <FontAwesomeIcon icon={faBook} size="2x" className="mb-2" />
                    <Card.Title>{category.name}</Card.Title>
                    <Card.Text className="text-muted">{category.count} truyện</Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </section>

      {/* Popular Authors Section */}
      <section className="mb-5">
        <h2 className="mb-4">Tác giả nổi tiếng</h2>
        <Row xs={2} md={3} lg={6} className="g-4">
          {popularAuthors.map(author => (
            <Col key={author.id}>
              <Card className="h-100 text-center">
                <Card.Img
                  variant="top"
                  src={author.image}
                  className="rounded-circle p-3"
                  alt={author.name}
                />
                <Card.Body>
                  <Card.Title>{author.name}</Card.Title>
                  <Card.Text className="text-muted">{author.mangaCount} tác phẩm</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    </div>
  );
};

export default Home; 