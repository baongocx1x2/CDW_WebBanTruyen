import api from './api';
import { Cart, CartItem, Order, CheckoutDetails } from '../models/Cart';

export const cartService = {
  // Cart operations
  getCart: () => api.get<Cart>('/cart'),
  
  addToCart: (mangaId: number, quantity: number = 1) =>
    api.post<Cart>('/cart/items', { mangaId, quantity }),
  
  updateQuantity: (itemId: number, quantity: number) =>
    api.put<Cart>(`/cart/items/${itemId}`, { quantity }),
  
  removeFromCart: (itemId: number) =>
    api.delete(`/cart/items/${itemId}`),
  
  clearCart: () => api.delete('/cart'),
  
  // Checkout process
  calculateShipping: (address: CheckoutDetails['shippingAddress']) =>
    api.post<{ shippingFee: number }>('/cart/shipping', address),
  
  checkout: (checkoutDetails: CheckoutDetails) =>
    api.post<Order>('/orders', checkoutDetails),
  
  // Order management
  getOrders: () => api.get<Order[]>('/orders'),
  
  getOrder: (orderId: number) => api.get<Order>(`/orders/${orderId}`),
  
  cancelOrder: (orderId: number) =>
    api.post(`/orders/${orderId}/cancel`),
  
  // Admin order operations
  getAllOrders: () => api.get<Order[]>('/admin/orders'),
  
  updateOrderStatus: (orderId: number, status: Order['status']) =>
    api.put(`/admin/orders/${orderId}/status`, { status }),
  
  // Payment processing
  processPayment: (orderId: number, paymentDetails: {
    method: CheckoutDetails['paymentMethod'];
    token?: string; // For credit card payments
  }) => api.post(`/orders/${orderId}/payment`, paymentDetails),
  
  // Shipping tracking
  getShippingStatus: (orderId: number) =>
    api.get(`/orders/${orderId}/shipping`),
}; 