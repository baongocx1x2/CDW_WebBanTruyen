import { Manga, Author, Category } from '../models/types'

export const authors: Author[] = [
  {
    id: 1,
    name: 'Eiichiro Oda',
    image: 'https://via.placeholder.com/150',
    biography: 'Tác giả của One Piece',
    mangaCount: 1
  },
  {
    id: 2,
    name: 'Masashi Kishimoto',
    image: 'https://via.placeholder.com/150',
    biography: 'Tác giả của Naruto',
    mangaCount: 2
  },
  {
    id: 3,
    name: 'Tite Kubo',
    image: 'https://via.placeholder.com/150',
    biography: 'Tác giả của Bleach',
    mangaCount: 1
  }
]

export const categories: Category[] = [
  { id: 1, name: 'Hành động', count: 150 },
  { id: 2, name: 'Phiêu lưu', count: 120 },
  { id: 3, name: 'Hài hước', count: 100 },
  { id: 4, name: 'Drama', count: 80 },
  { id: 5, name: 'Fantasy', count: 90 },
  { id: 6, name: 'Romance', count: 70 }
]

export const mangas: Manga[] = [
  {
    id: 1,
    title: 'One Piece',
    description: 'Câu chuyện về cuộc phiêu lưu của Monkey D. Luffy và băng hải tặc Mũ Rơm',
    coverImage: 'https://via.placeholder.com/300x400',
    price: 30000,
    rating: 4.9,
    author: authors[0],
    categories: [categories[0], categories[1]],
    status: 'ongoing',
    releaseYear: 1999,
    chapters: [
      { id: 1, number: 1, title: 'Romance Dawn' },
      { id: 2, number: 2, title: 'They Call Him Straw Hat Luffy' }
    ],
    reviews: [
      {
        id: 1,
        userName: 'OnePieceFan',
        rating: 5,
        comment: 'Tuyệt vời!',
        date: '2024-03-15'
      }
    ]
  },
  {
    id: 2,
    title: 'Naruto',
    description: 'Câu chuyện về Naruto Uzumaki và hành trình trở thành Hokage',
    coverImage: 'https://via.placeholder.com/300x400',
    price: 25000,
    rating: 4.8,
    author: authors[1],
    categories: [categories[0], categories[4]],
    status: 'completed',
    releaseYear: 1999,
    chapters: [
      { id: 1, number: 1, title: 'Uzumaki Naruto' },
      { id: 2, number: 2, title: 'Konohamaru!' }
    ],
    reviews: [
      {
        id: 1,
        userName: 'NarutoFan',
        rating: 5,
        comment: 'Siêu phẩm!',
        date: '2024-03-14'
      }
    ]
  },
  {
    id: 3,
    title: 'Bleach',
    description: 'Câu chuyện về Ichigo Kurosaki và hành trình làm Thần Chết',
    coverImage: 'https://via.placeholder.com/300x400',
    price: 28000,
    rating: 4.7,
    author: authors[2],
    categories: [categories[0], categories[4]],
    status: 'completed',
    releaseYear: 2001,
    chapters: [
      { id: 1, number: 1, title: 'Death & Strawberry' },
      { id: 2, number: 2, title: 'Starter' }
    ],
    reviews: [
      {
        id: 1,
        userName: 'BleachFan',
        rating: 4,
        comment: 'Rất hay!',
        date: '2024-03-13'
      }
    ]
  }
] 