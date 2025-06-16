import React from 'react'
import { Link } from 'react-router-dom'

const Terms: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(99,102,241,0.6), rgba(139,92,246,0.6)), url('/images/terms-background.jpg')",
        }}
      >
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">Điều khoản & Điều kiện</h1>
            <p className="text-lg mb-8">
              Vui lòng đọc kỹ các điều khoản dưới đây trước khi sử dụng trang web của chúng tôi.
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

      {/* Terms Content Section */}
      <section className="container mx-auto px-4 space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">1. Giới thiệu</h2>
          <p className="text-md">
            Đây là Điều khoản và Điều kiện ("Điều khoản") của trang web bán truyện tranh được vận hành bởi [Tên
            Công ty]. Bằng việc truy cập và sử dụng trang web, bạn đồng ý tuân thủ các điều khoản này.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">2. Sử dụng Trang Web</h2>
          <p className="text-md">
            Bạn cam kết sử dụng trang web với mục đích cá nhân, phi thương mại và không thực hiện bất kỳ hành
            vi vi phạm pháp luật hay gây ảnh hưởng xấu đến hệ thống.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">3. Quyền Sở Hữu Trí Tuệ</h2>
          <p className="text-md">
            Tất cả nội dung, hình ảnh và thông tin trên trang web đều thuộc quyền sở hữu của [Tên Công ty] hoặc
            các bên liên quan, và việc sao chép hay tái sử dụng phải được sự cho phép bằng văn bản.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">4. Liên kết đến Bên Thứ Ba</h2>
          <p className="text-md">
            Trang web có thể chứa các liên kết đến trang của bên thứ ba mà chúng tôi không kiểm soát. Do đó,
            chúng tôi không chịu trách nhiệm về nội dung hoặc chính sách bảo mật của những trang web đó.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">5. Thay đổi Điều Khoản</h2>
          <p className="text-md">
            [Tên Công ty] bảo lưu quyền thay đổi các điều khoản này vào bất kỳ thời điểm nào. Việc tiếp tục sử
            dụng trang web sau khi có sự thay đổi đồng nghĩa với việc bạn chấp nhận và ràng buộc bởi các điều khoản
            mới.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">6. Liên hệ</h2>
          <p className="text-md">
            Nếu bạn có bất kỳ thắc mắc nào liên quan đến các điều khoản này, vui lòng liên hệ với chúng tôi qua email:
            support@example.com.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Terms