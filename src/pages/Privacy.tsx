import React from 'react'
import { Link } from 'react-router-dom'

const Privacy: React.FC = () => {
    return (
        <div className="space-y-12">
            {/* Hero Section */}
            <section
                className="relative h-96 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, rgba(99,102,241,0.6), rgba(139,92,246,0.6)), url('/images/privacy-background.jpg')",
                }}
            >
                <div className="container mx-auto px-4 h-full flex items-center">
                    <div className="text-white max-w-2xl">
                        <h1 className="text-4xl font-bold mb-4">Chính sách Bảo mật</h1>
                        <p className="text-lg mb-8">
                            Vui lòng đọc kỹ chính sách bảo mật dưới đây để hiểu cách chúng tôi thu thập,
                            sử dụng và bảo vệ thông tin của bạn.
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

            {/* Privacy Content Section */}
            <section className="container mx-auto px-4 space-y-8">
                <div>
                    <h2 className="text-2xl font-bold mb-4">1. Thu thập thông tin</h2>
                    <p className="text-md">
                        Chúng tôi thu thập thông tin khi bạn đăng ký tài khoản, mua hàng hoặc tương tác với website.
                        Những thông tin này bao gồm nhưng không giới hạn: tên, email, địa chỉ và các dữ liệu liên quan đến hành vi truy cập.
                    </p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-4">2. Sử dụng thông tin</h2>
                    <p className="text-md">
                        Thông tin của bạn được sử dụng để cải thiện trải nghiệm, cá nhân hóa dịch vụ và thông báo các chương trình khuyến mại mới.
                        Chúng tôi cam kết không sử dụng thông tin của bạn cho mục đích thương mại mà không có sự đồng ý.
                    </p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-4">3. Bảo mật thông tin</h2>
                    <p className="text-md">
                        Chúng tôi áp dụng các biện pháp bảo mật nghiêm ngặt nhằm bảo vệ thông tin của bạn khỏi sự truy cập trái phép,
                        mất mát hoặc rò rỉ dữ liệu.
                    </p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-4">4. Chia sẻ thông tin</h2>
                    <p className="text-md">
                        Chúng tôi cam kết không bán, cho thuê hoặc chuyển giao thông tin cá nhân của bạn cho bên thứ ba,
                        trừ khi thực hiện theo yêu cầu của pháp luật hoặc có sự đồng ý rõ ràng từ bạn.
                    </p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-4">5. Liên hệ</h2>
                    <p className="text-md">
                        Nếu có bất kỳ thắc mắc nào về chính sách này, vui lòng liên hệ qua địa chỉ email: privacy@example.com.
                    </p>
                </div>
            </section>
        </div>
    )
}

export default Privacy