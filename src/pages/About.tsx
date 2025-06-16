import React from 'react'
import { Link } from 'react-router-dom'

const About: React.FC = () => {
    return (
        <div className="space-y-12">
            {/* Hero Section */}
            <section
                className="relative h-96 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, rgba(99,102,241,0.6), rgba(139,92,246,0.6)), url('/images/about-background.jpg')",
                }}
            >
                <div className="container mx-auto px-4 h-full flex items-center">
                    <div className="text-white max-w-2xl">
                        <h1 className="text-4xl font-bold mb-4">Giới thiệu</h1>
                        <p className="text-lg mb-8">
                            Chúng tôi là nhà cung cấp truyện tranh chất lượng, đem đam mê manga đến với cộng đồng.
                        </p>
                        <Link
                            to="/"
                            className="bg-white text-indigo-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100"
                        >
                            Về trang chủ
                        </Link>
                    </div>
                </div>
            </section>

            {/* About Content Section */}
            <section className="container mx-auto px-4">
                <h2 className="text-2xl font-bold mb-6">Về chúng tôi</h2>
                <p className="text-md mb-4">
                    Website của chúng tôi được hình thành từ niềm đam mê truyện tranh manga, với mục tiêu mang đến cho bạn
                    những bộ truyện độc đáo và chất lượng. Từ nghệ thuật tinh tế cho đến những câu chuyện sống động,
                    chúng tôi luôn nỗ lực để tạo nên một trải nghiệm đọc truyện thật sự đặc biệt.
                </p>
            </section>

            {/* Vision & Mission Section */}
            <section className="container mx-auto px-4">
                <h2 className="text-2xl font-bold mb-6">Tầm nhìn & Sứ mệnh</h2>
                <p className="text-md mb-4">
                    Chúng tôi tin rằng manga không chỉ đơn giản là một loại hình giải trí mà còn là nghệ thuật và cảm xúc.
                    Sứ mệnh của chúng tôi là tạo ra một không gian nơi người hâm mộ manga có thể cùng nhau chia sẻ đam mê
                    và khám phá những tác phẩm xuất sắc.
                </p>
            </section>

            {/* Team Section */}
            <section className="container mx-auto px-4">
                <h2 className="text-2xl font-bold mb-6">Đội ngũ của chúng tôi</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="bg-white p-4 rounded-lg shadow-md text-center">
                        <img
                            src="/images/team/member1.jpg"
                            alt="Trưởng nhóm"
                            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                        />
                        <h3 className="font-medium text-gray-900">Trưởng nhóm</h3>
                        <p className="text-sm text-gray-600">Sáng lập & Quản lý dự án</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md text-center">
                        <img
                            src="/images/team/member2.jpg"
                            alt="Nhà phát triển"
                            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                        />
                        <h3 className="font-medium text-gray-900">Nhà phát triển</h3>
                        <p className="text-sm text-gray-600">Kiến trúc sư phần mềm</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md text-center">
                        <img
                            src="/images/team/member3.jpg"
                            alt="Chuyên gia nội dung"
                            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                        />
                        <h3 className="font-medium text-gray-900">Chuyên gia Nội dung</h3>
                        <p className="text-sm text-gray-600">Biên tập & Quản trị nội dung</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About