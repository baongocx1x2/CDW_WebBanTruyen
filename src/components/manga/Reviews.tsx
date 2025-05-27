import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faUser } from '@fortawesome/free-solid-svg-icons'
import { Review } from '../../models/types'

interface ReviewsProps {
  mangaId: number
  reviews: Review[]
}

const Reviews: React.FC<ReviewsProps> = ({ mangaId, reviews }) => {
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [hoveredStar, setHoveredStar] = useState<number | null>(null)

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement review submission logic
    console.log('Submit review:', { mangaId, rating, comment })
  }

  return (
    <div className="space-y-8">
      {/* Review Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium mb-4">Viết đánh giá</h3>
        <form onSubmit={handleSubmitReview} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Đánh giá của bạn
            </label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(null)}
                  className="text-2xl focus:outline-none"
                >
                  <FontAwesomeIcon
                    icon={faStar}
                    className={`${
                      star <= (hoveredStar || rating)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nhận xét của bạn
            </label>
            <textarea
              id="comment"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Chia sẻ cảm nghĩ của bạn về truyện..."
            />
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Gửi đánh giá
          </button>
        </form>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium">
          Đánh giá ({reviews.length})
        </h3>
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <FontAwesomeIcon icon={faUser} className="text-gray-500" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-medium text-gray-900">
                    {review.userName}
                  </h4>
                  <span className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString('vi-VN')}
                  </span>
                </div>
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, index) => (
                    <FontAwesomeIcon
                      key={index}
                      icon={faStar}
                      className={`${
                        index < review.rating
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      } text-sm`}
                    />
                  ))}
                </div>
                <p className="mt-2 text-sm text-gray-700">{review.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Reviews 