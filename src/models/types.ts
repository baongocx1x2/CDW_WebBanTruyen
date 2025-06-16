export interface Author {
  id: number
  name: string
  image: string
  biography: string
  mangaCount: number
}

export interface Category {
  id: number
  name: string
  count: number
}

export interface Chapter {
  id: number
  number: number
  title: string
}

export interface Review {
  id: number
  userName: string
  rating: number
  comment: string
  date: string
}

export interface Manga {
  id: number
  title: string
  description: string
  coverImage: string
  price: number
  rating: number
  author: Author
  categories: Category[]
  status: 'ongoing' | 'completed' | 'hiatus'
  releaseYear: number
  chapters: Chapter[]
  reviews: Review[]
}

export interface CartItem {
  id: number
  manga: Manga
  quantity: number
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  shippingFee: number
  total: number
}

export interface User {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  avatar?: string
  phoneNumber?: string
  addresses: Address[]
}

export interface Address {
  id: number
  fullName: string
  phoneNumber: string
  street: string
  city: string
  state: string
  postalCode: string
  country: string
  isDefault: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

// src/models/types.ts
// src/models/types.ts
export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

// Tạo 1 kiểu riêng cho form đăng ký có trường confirmPassword
export interface RegisterFormData extends RegisterData {
  confirmPassword: string;
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

export class RegisterFormData {
}