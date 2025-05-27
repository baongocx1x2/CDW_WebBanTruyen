import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
  faCog,
  faList
} from '@fortawesome/free-solid-svg-icons'

const ReadManga: React.FC = () => {
  const { mangaId, chapterId } = useParams()
  const [currentPage, setCurrentPage] = useState(1)
  const [showSettings, setShowSettings] = useState(false)
  const [readingMode, setReadingMode] = useState<'vertical' | 'horizontal'>('vertical')

  // Mock data - replace with actual API call
  const chapterPages = [
    'https://via.placeholder.com/800x1200',
    'https://via.placeholder.com/800x1200',
    'https://via.placeholder.com/800x1200'
  ]

  const totalPages = chapterPages.length

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Top Navigation */}
      <div className="fixed top-0 left-0 right-0 bg-gray-800 z-50">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <button className="text-gray-400 hover:text-white">
              <FontAwesomeIcon icon={faList} className="mr-2" />
              Danh sách chương
            </button>
            <div className="text-center">
              <span className="text-sm">
                Trang {currentPage} / {totalPages}
              </span>
            </div>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="text-gray-400 hover:text-white"
            >
              <FontAwesomeIcon icon={faCog} />
            </button>
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="fixed top-12 right-4 bg-gray-800 rounded-lg shadow-lg p-4 z-50">
          <h3 className="text-sm font-medium mb-2">Chế độ đọc</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                checked={readingMode === 'vertical'}
                onChange={() => setReadingMode('vertical')}
                className="text-indigo-600"
              />
              <span className="ml-2 text-sm">Cuộn dọc</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                checked={readingMode === 'horizontal'}
                onChange={() => setReadingMode('horizontal')}
                className="text-indigo-600"
              />
              <span className="ml-2 text-sm">Lật ngang</span>
            </label>
          </div>
        </div>
      )}

      {/* Reader Content */}
      <div className="pt-12 pb-16">
        {readingMode === 'vertical' ? (
          <div className="space-y-4">
            {chapterPages.map((page, index) => (
              <div key={index} className="flex justify-center">
                <img
                  src={page}
                  alt={`Page ${index + 1}`}
                  className="max-w-full h-auto"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-screen">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="fixed left-4 top-1/2 transform -translate-y-1/2 text-4xl text-gray-400 hover:text-white disabled:opacity-50"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <img
              src={chapterPages[currentPage - 1]}
              alt={`Page ${currentPage}`}
              className="max-w-full h-auto"
            />
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="fixed right-4 top-1/2 transform -translate-y-1/2 text-4xl text-gray-400 hover:text-white disabled:opacity-50"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="text-gray-400 hover:text-white disabled:opacity-50"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
              Trang trước
            </button>
            <div className="text-center">
              <input
                type="number"
                min={1}
                max={totalPages}
                value={currentPage}
                onChange={(e) => {
                  const page = parseInt(e.target.value)
                  if (page >= 1 && page <= totalPages) {
                    setCurrentPage(page)
                  }
                }}
                className="w-16 text-center bg-gray-700 border border-gray-600 rounded px-2 py-1"
              />
              <span className="ml-2">/ {totalPages}</span>
            </div>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="text-gray-400 hover:text-white disabled:opacity-50"
            >
              Trang sau
              <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReadManga 