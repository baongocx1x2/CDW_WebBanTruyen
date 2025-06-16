import React from 'react'
import { Link } from 'react-router-dom'

const Shipping: React.FC = () => {
    return (
        <div className="space-y-12">
            {/* Hero Section */}
            <section
                className="relative h-96 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, rgba(99,102,241,0.6), rgba(139,92,246,0.6)), url('/images/shipping-background.jpg')",
                }}
            >
                <div className="container mx-auto px-4 h-full flex items-center">
                    <div className="text-white max-w-2xl">
                        <h1 className="text-4xl font-bold mb-4">Chính sách Vận chuyển</h1>
                        <p className="text-lg mb-8">
                            Tìm hiểu các điều khoản về vận chuyển để nhận thông tin về thời gian, phí và quy trình giao hàng.
                        </p>
                        <Link
                            to="/"
                            className="bg-white text-indigo-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100"
                        >
                            Trang Chủ
                        </Link>
                    </div>
                </div>
            </section>

            {/* Shipping Content Section */}
            <section className="container mx-auto px-4 space-y-8">
                <div>
                    <h2 className="text-2xl font-bold mb-4">1. Phương thức giao hàng</h2>
                    <p className="text-md">
                        Chúng tôi hợp tác với nhiều đơn vị vận chuyển uy tín để đảm bảo sản phẩm được giao đúng hạn và an toàn.
                    </p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-4">2. Thời gian giao hàng</h2>
                    <p className="text-md">
                        Thời gian giao hàng dự kiến từ 3 đến 7 ngày làm việc, tùy thuộc vào địa chỉ giao hàng và địa điểm của bạn.
                    </p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-4">3. Phí vận chuyển</h2>
                    <p className="text-md">
                        Phí vận chuyển được tính dựa trên trọng lượng sản phẩm và khoảng cách giao hàng. Chúng tôi luôn cố gắng đưa ra mức phí
                        hợp lý nhất cho khách hàng.
                    </p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-4">4. Chính sách đổi trả hàng</h2>
                    <p className="text-md">
                        Nếu sản phẩm gặp lỗi do nhà sản xuất hoặc không đúng với mô tả, bạn có thể yêu cầu đổi trả hoặc hoàn tiền trong vòng 7 ngày kể từ khi nhận hàng.
                    </p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-4">5. Liên hệ</h2>
                    <p className="text-md">
                        Mọi thắc mắc liên quan đến vận chuyển xin vui lòng liên hệ qua email: shipping@example.com.
                    </p>
                </div>
            </section>
        </div>
    )
}

export default Shipping