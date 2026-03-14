function PhotoCard({ photo, isFavorite, onToggleFavorite }) {
  return (
    <article className="group relative overflow-hidden rounded-3xl bg-white shadow-lg shadow-gray-200/50 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-200/40 hover:-translate-y-2">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={`https://picsum.photos/id/${photo.id}/600/400`}
          alt={`Photo by ${photo.author}`}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-2">
              Photographer
            </p>
            <h2 className="text-xl font-bold text-gray-900 leading-tight">
              {photo.author}
            </h2>
            <div className="mt-3 flex items-center text-sm text-gray-500">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Photo ID: {photo.id}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onToggleFavorite(photo.id)}
            aria-label={isFavorite ? 'Remove from favourites' : 'Add to favourites'}
            className={`group/btn relative flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300 ${
              isFavorite
                ? 'border-rose-200 bg-gradient-to-br from-rose-50 to-pink-50 text-rose-500 shadow-lg shadow-rose-200/50'
                : 'border-gray-200 bg-white text-gray-400 hover:border-indigo-200 hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-500 hover:shadow-lg hover:shadow-indigo-200/50'
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              fill={isFavorite ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth={isFavorite ? '0' : '2'}
              className="h-6 w-6 transition-transform duration-300 group-hover/btn:scale-110"
              aria-hidden="true"
            >
              {isFavorite ? (
                <path d="M12 20.25c-4.97-3.4-8.25-6.49-8.25-10.3A4.95 4.95 0 0 1 8.7 5a4.7 4.7 0 0 1 3.3 1.45A4.7 4.7 0 0 1 15.3 5a4.95 4.95 0 0 1 4.95 4.95c0 3.81-3.28 6.9-8.25 10.3Z" />
              ) : (
                <path d="M12 20.25c-4.97-3.4-8.25-6.49-8.25-10.3A4.95 4.95 0 0 1 8.7 5a4.7 4.7 0 0 1 3.3 1.45A4.7 4.7 0 0 1 15.3 5a4.95 4.95 0 0 1 4.95 4.95c0 3.81-3.28 6.9-8.25 10.3Z" />
              )}
            </svg>
            {isFavorite && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full animate-ping"></div>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

export default PhotoCard;

