export const FAVORITES_STORAGE_KEY = 'favorite-photo-ids';

export const favoriteActionTypes = {
  TOGGLE_FAVORITE: 'TOGGLE_FAVORITE',
};

export function favoritesReducer(state, action) {
  switch (action.type) {
    case favoriteActionTypes.TOGGLE_FAVORITE: {
      const photoId = action.payload;

      if (state.includes(photoId)) {
        return state.filter((id) => id !== photoId);
      }

      return [...state, photoId];
    }
    default:
      return state;
  }
}

export function loadStoredFavorites() {
  try {
    const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);

    if (!storedFavorites) {
      return [];
    }

    const parsedFavorites = JSON.parse(storedFavorites);

    return Array.isArray(parsedFavorites) ? parsedFavorites : [];
  } catch {
    return [];
  }
}

