export interface Author {
  id: number;
  name: string;
  image: string;
  biography: string;
  mangaCount: number;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  count: number;
}

export interface Review {
  id: number;
  userId: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Chapter {
  id: number;
  number: number;
  title: string;
  releaseDate: string;
  pageCount: number;
}

export interface Manga {
  id: number;
  title: string;
  alternativeTitles: string[];
  description: string;
  coverImage: string;
  author: Author;
  categories: Category[];
  status: 'ongoing' | 'completed' | 'hiatus';
  releaseYear: number;
  rating: number;
  price: number;
  publisher: string;
  pages: number;
  language: string;
  reviews: Review[];
  chapters: Chapter[];
  relatedManga: number[]; // Array of manga IDs
  isNew: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
} 