const FAVORITES_KEY = 'moviehub_favorites';

export const favoritesService = {
  // Récupérer tous les favoris
  getFavorites: () => {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  },

  // Ajouter un film aux favoris
  addFavorite: (movie) => {
    const favorites = favoritesService.getFavorites();
    if (!favorites.some(f => f.id === movie.id)) {
      const updatedFavorites = [...favorites, {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
        release_date: movie.release_date
      }];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
      return updatedFavorites;
    }
    return favorites;
  },

  // Retirer un film des favoris
  removeFavorite: (movieId) => {
    const favorites = favoritesService.getFavorites();
    const updatedFavorites = favorites.filter(f => f.id !== movieId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    return updatedFavorites;
  },

  // Vérifier si un film est dans les favoris
  isFavorite: (movieId) => {
    const favorites = favoritesService.getFavorites();
    return favorites.some(f => f.id === movieId);
  }
};