const SEARCH_HISTORY_KEY = 'moviehub_search_history';

export const searchService = {
  // Gérer l'historique des recherches
  getSearchHistory: () => {
    try {
      const history = localStorage.getItem(SEARCH_HISTORY_KEY);
      return history ? JSON.parse(history) : [];
    } catch {
      return [];
    }
  },

  addToHistory: (searchTerm) => {
    try {
      const history = searchService.getSearchHistory();
      // Éviter les doublons et garder les 10 dernières recherches
      const newHistory = [
        searchTerm,
        ...history.filter(term => term !== searchTerm)
      ].slice(0, 10);
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
    } catch (error) {
      console.error('Erreur lors de l\'ajout à l\'historique:', error);
    }
  },

  clearHistory: () => {
    localStorage.removeItem(SEARCH_HISTORY_KEY);
  },

  removeFromHistory: (searchTerm) => {
    try {
      const history = searchService.getSearchHistory();
      const newHistory = history.filter(term => term !== searchTerm);
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'historique:', error);
    }
  }
};