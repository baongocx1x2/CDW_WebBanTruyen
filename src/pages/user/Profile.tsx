import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser,
  faEnvelope,
  faPhone,
  faLock,
  faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons'

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'info' | 'security' | 'addresses'>('info')

  // Mock user data - replace with actual user data from context/API
  const [userData, setUserData] = useState({
    firstName: 'Nguyễn',
    lastName: 'Văn A',
    email: 'nguyenvana@example.com',
    phone: '0123456789',
    addresses: [
      {
        id: 1,
        fullName: 'Nguyễn Văn A',
        phone: '0123456789',
        street: '123 Đường ABC',
        city: 'Hà Nội',
        state: 'Hoàn Kiếm',
        postalCode: '100000',
        country: 'Việt Nam',
        isDefault: true
      }
    ]
  })

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement profile update logic
  }

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement password change logic
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Quản lý tài khoản</h1>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('info')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'info'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Thông tin cá nhân
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'security'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FontAwesomeIcon icon={faLock} className="mr-2" />
              Bảo mật
            </button>
            <button
              onClick={() => setActiveTab('addresses')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'addresses'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
              Địa chỉ
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'info' && (
          <form onSubmit={handleUpdateProfile} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Họ
                </label>
                <input
                  type="text"
                  value={userData.lastName}
                  onChange={(e) =>
                    setUserData({ ...userData, lastName: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tên
                </label>
                <input
                  type="text"
                  value={userData.firstName}
                  onChange={(e) =>
                    setUserData({ ...userData, firstName: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                Email
              </label>
              <input
                type="email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                <FontAwesomeIcon icon={faPhone} className="mr-2" />
                Số điện thoại
              </label>
              <input
                type="tel"
                value={userData.phone}
                onChange={(e) =>
                  setUserData({ ...userData, phone: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <button
                type="submit"
                className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cập nhật thông tin
              </button>
            </div>
          </form>
        )}

        {activeTab === 'security' && (
          <form onSubmit={handleChangePassword} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mật khẩu hiện tại
              </label>
              <input
                type="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mật khẩu mới
              </label>
              <input
                type="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Xác nhận mật khẩu mới
              </label>
              <input
                type="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <button
                type="submit"
                className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Đổi mật khẩu
              </button>
            </div>
          </form>
        )}

        {activeTab === 'addresses' && (
          <div className="space-y-6">
            {userData.addresses.map((address) => (
              <div
                key={address.id}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium">
                      {address.fullName}
                      {address.isDefault && (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Mặc định
                        </span>
                      )}
                    </h3>
                    <p className="text-gray-500 mt-1">{address.phone}</p>
                    <p className="text-gray-500 mt-1">
                      {address.street}, {address.city}
                    </p>
                    <p className="text-gray-500">
                      {address.state}, {address.country} {address.postalCode}
                    </p>
                  </div>
                  <div className="space-x-2">
                    <button className="text-indigo-600 hover:text-indigo-900">
                      Sửa
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <button className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              + Thêm địa chỉ mới
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile 