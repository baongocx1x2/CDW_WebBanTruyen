export interface Address {
  id: number;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface OrderHistory {
  id: number;
  orderNumber: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: {
    mangaId: number;
    quantity: number;
    price: number;
  }[];
}

export interface User {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  phoneNumber?: string;
  addresses: Address[];
  orderHistory: OrderHistory[];
  wishlist: number[]; // Array of manga IDs
  createdAt: string;
  updatedAt: string;
  role: 'user' | 'admin';
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
} 