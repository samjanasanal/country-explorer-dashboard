import React from "react"

function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  const getPageNumbers = () => {
  const pages = []
  const delta = 2
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
      const last = pages[pages.length - 1]
      if (last && i - last > 1) pages.push("...")
      pages.push(i)
    }
  }
  return pages
}

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 py-8">
      <button
        className={`px-4 py-2 rounded-lg font-medium transition-all ${
          currentPage === 1
            ? "bg-gray-100 dark:bg-slate-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
        onClick={handlePrevious}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        ← Previous
      </button>
      <div className="flex items-center gap-1 sm:gap-2">
        {getPageNumbers().map((page, idx) => (
          <button
            key={idx}
            className={`px-3 py-2 rounded-lg font-medium transition-all ${
              page === "..."
                ? "text-gray-600 dark:text-gray-400 cursor-default"
                : page === currentPage
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-slate-700 text-slate-900 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600"
            }`}
            onClick={() => typeof page === "number" && page !== currentPage && onPageChange(page)}
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        className={`px-4 py-2 rounded-lg font-medium transition-all ${
          currentPage === totalPages
            ? "bg-gray-100 dark:bg-slate-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        Next →
      </button>
    </div>
  )
}

export default Pagination
