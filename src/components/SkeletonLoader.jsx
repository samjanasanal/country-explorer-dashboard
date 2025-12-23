function SkeletonLoader({ count = 12 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-md animate-pulse">
          <div className="h-48 bg-gray-300 dark:bg-slate-700"></div>
          <div className="p-5 space-y-4">
            <div className="h-6 bg-gray-300 dark:bg-slate-700 rounded w-3/4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-300 dark:bg-slate-700 rounded"></div>
              <div className="h-4 bg-gray-300 dark:bg-slate-700 rounded w-5/6"></div>
              <div className="h-4 bg-gray-300 dark:bg-slate-700 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SkeletonLoader
