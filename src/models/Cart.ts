import { Manga } from './Manga';

export interface CartItem {
  id: number;
  manga: Manga;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
}

export interface CheckoutDetails {
  shippingAddress: {
    fullName: string;
    phoneNumber: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: 'cod' | 'credit_card' | 'bank_transfer';
  note?: string;
}

export interface Order extends Cart {
  id: number;
  orderNumber: string;
  userId: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  checkoutDetails: CheckoutDetails;
  createdAt: string;
  updatedAt: string;
} 