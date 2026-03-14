import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import useFetchPhotos from '../hooks/useFetchPhotos';
import {
  FAVORITES_STORAGE_KEY,
  favoriteActionTypes,
  favoritesReducer,
  loadStoredFavorites,
} from '../reducers/favoritesReducer';
import PhotoCard from './PhotoCard';

function Gallery() {
  const { photos, loading, error } = useFetchPhotos();
  const [searchTerm, setSearchTerm] = useState('');
  const [favoriteIds, dispatch] = useReducer(
    favoritesReducer,
    [],
    loadStoredFavorites,
  );

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const handleToggleFavorite = useCallback((photoId) => {
    dispatch({
      type: favoriteActionTypes.TOGGLE_FAVORITE,
      payload: photoId,
    });
  }, []);

  const filteredPhotos = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return photos;
    }

    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(normalizedSearch),
    );
  }, [photos, searchTerm]);

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <header className="mb-12">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Photo Gallery
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover beautiful photography and curate your personal collection of favorites
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                id="search"
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search by author name..."
                className="w-full pl-12 pr-4 py-4 text-lg border-0 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg shadow-gray-200/50 text-gray-900 placeholder-gray-400 outline-none transition-all duration-300 focus:bg-white focus:shadow-xl focus:shadow-indigo-200/40"
              />
            </div>
          </div>
        </header>

        {loading ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl bg-white/60 backdrop-blur-sm shadow-xl shadow-gray-200/30">
            <div className="relative">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600"></div>
              <div className="absolute inset-0 h-16 w-16 animate-spin rounded-full border-4 border-purple-100 border-b-purple-600 animation-delay-150"></div>
            </div>
            <p className="mt-6 text-lg font-medium text-gray-600">Loading amazing photos...</p>
            <p className="mt-2 text-sm text-gray-400">This should only take a moment</p>
          </div>
        ) : null}

        {!loading && error ? (
          <div className="rounded-3xl bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 p-8 text-center shadow-lg">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-red-800 mb-2">Oops! Something went wrong</h3>
            <p className="text-red-600">{error}</p>
          </div>
        ) : null}

        {!loading && !error ? (
          filteredPhotos.length > 0 ? (
            <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredPhotos.map((photo) => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  isFavorite={favoriteIds.includes(photo.id)}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </section>
          ) : (
            <div className="rounded-3xl bg-white/60 backdrop-blur-sm p-16 text-center shadow-xl">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No photos found</h3>
              <p className="text-gray-500">Try adjusting your search terms to find what you're looking for</p>
            </div>
          )
        ) : null}
      </div>
    </main>
  );
}

export default Gallery;
