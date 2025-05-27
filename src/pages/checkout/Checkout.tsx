import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCard, faMoneyBill, faWallet } from '@fortawesome/free-solid-svg-icons'

interface PaymentMethod {
  id: string
  name: string
  icon: typeof faCreditCard
  description: string
}

const Checkout: React.FC = () => {
  const navigate = useNavigate()
  const [selectedPayment, setSelectedPayment] = useState<string>('')

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'card',
      name: 'Thẻ tín dụng/ghi nợ',
      icon: faCreditCard,
      description: 'Thanh toán an toàn với Visa, Mastercard'
    },
    {
      id: 'momo',
      name: 'Ví MoMo',
      icon: faWallet,
      description: 'Thanh toán nhanh chóng qua ví MoMo'
    },
    {
      id: 'cod',
      name: 'Thanh toán khi nhận hàng',
      icon: faMoneyBill,
      description: 'Thanh toán bằng tiền mặt khi nhận hàng'
    }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement payment processing
    navigate('/order-confirmation')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Shipping Information */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Thông tin giao hàng</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Họ và tên
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Số điện thoại
              </label>
              <input
                type="tel"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Địa chỉ
              </label>
              <textarea
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </form>
        </div>

        {/* Payment Methods */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Phương thức thanh toán</h2>
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`border rounded-lg p-4 cursor-pointer ${
                  selectedPayment === method.id
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200'
                }`}
                onClick={() => setSelectedPayment(method.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <FontAwesomeIcon
                      icon={method.icon}
                      className="h-6 w-6 text-indigo-600"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">
                      {method.name}
                    </h3>
                    <p className="text-sm text-gray-500">{method.description}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <input
                      type="radio"
                      checked={selectedPayment === method.id}
                      onChange={() => setSelectedPayment(method.id)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Tổng quan đơn hàng
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Tạm tính</span>
                <span>85.000 ₫</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Phí vận chuyển</span>
                <span>20.000 ₫</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-medium">
                  <span>Tổng cộng</span>
                  <span>105.000 ₫</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!selectedPayment}
            className="mt-6 w-full bg-indigo-600 text-white py-3 px-4 rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
          >
            Xác nhận đặt hàng
          </button>
        </div>
      </div>
    </div>
  )
}

export default Checkout 