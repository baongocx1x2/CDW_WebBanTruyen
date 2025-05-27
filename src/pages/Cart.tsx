import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext.tsx';
import { useAuth } from '../contexts/AuthContext.tsx';
import { CheckoutDetails } from '../models/Cart.ts';

const Cart: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, calculateShipping, checkout } = useCart();
  const { user } = useAuth();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutDetails, setCheckoutDetails] = useState<CheckoutDetails>({
    shippingAddress: {
      fullName: user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : '',
      phoneNumber: user?.phoneNumber || '',
      street: user?.addresses[0]?.street || '',
      city: user?.addresses[0]?.city || '',
      state: user?.addresses[0]?.state || '',
      postalCode: user?.addresses[0]?.postalCode || '',
      country: user?.addresses[0]?.country || '',
    },
    paymentMethod: 'cod',
  });

  const handleQuantityChange = async (itemId: number, newQuantity: number) => {
    try {
      await updateQuantity(itemId, newQuantity);
    } catch (err) {
      console.error('Error updating quantity:', err);
      alert('Không thể cập nhật số lượng. Vui lòng thử lại sau.');
    }
  };

  const handleRemoveItem = async (itemId: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?')) {
      try {
        await removeFromCart(itemId);
      } catch (err) {
        console.error('Error removing item:', err);
        alert('Không thể xóa sản phẩm. Vui lòng thử lại sau.');
      }
    }
  };

  const handleCheckout = async () => {
    if (!user) {
      alert('Vui lòng đăng nhập để thanh toán');
      return;
    }

    try {
      setIsCheckingOut(true);
      const shippingFee = await calculateShipping(checkoutDetails.shippingAddress);
      await checkout({
        ...checkoutDetails,
        shippingFee,
      });
      alert('Đặt hàng thành công!');
      // Redirect to order confirmation page
    } catch (err) {
      console.error('Error during checkout:', err);
      alert('Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại sau.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Giỏ hàng trống</h2>
        <p className="text-gray-600 mb-8">Bạn chưa có sản phẩm nào trong giỏ hàng.</p>
        <Link
          to="/manga"
          className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700"
        >
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Giỏ hàng</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cart.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-4 border border-gray-200 rounded-lg p-4"
              >
                <img
                  src={item.manga.coverImage}
                  alt={item.manga.title}
                  className="w-24 h-36 object-cover rounded"
                />
                <div className="flex-1">
                  <Link
                    to={`/manga/${item.manga.id}`}
                    className="text-lg font-medium hover:text-indigo-600"
                  >
                    {item.manga.title}
                  </Link>
                  <p className="text-gray-500">{item.manga.author.name}</p>
                  <p className="text-indigo-600 font-medium">
                    {item.manga.price.toLocaleString('vi-VN')} ₫
                  </p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button
                        onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 border-x border-gray-300">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {(item.manga.price * item.quantity).toLocaleString('vi-VN')} ₫
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="border border-gray-200 rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-bold">Tổng đơn hàng</h2>
            
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span>Tạm tính</span>
              <span>{cart.subtotal.toLocaleString('vi-VN')} ₫</span>
            </div>
            
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span>Phí vận chuyển</span>
              <span>{cart.shippingFee.toLocaleString('vi-VN')} ₫</span>
            </div>
            
            <div className="flex justify-between py-2 font-bold">
              <span>Tổng cộng</span>
              <span>{cart.total.toLocaleString('vi-VN')} ₫</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className={`w-full bg-indigo-600 text-white py-3 rounded-md ${
                isCheckingOut
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-indigo-700'
              }`}
            >
              {isCheckingOut ? 'Đang xử lý...' : 'Tiến hành thanh toán'}
            </button>

            <Link
              to="/manga"
              className="block text-center text-indigo-600 hover:text-indigo-700"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 