const BASE_URL = 'https://api.themoviedb.org/3';

const TOKEN = process.env.REACT_APP_TMDB_TOKEN;

if (!TOKEN) {
  console.error('⚠️ Le token TMDB n\'est pas défini dans les variables d\'environnement');
}


const OPTIONS = {
  headers: {
    'accept': 'application/json',
    'Authorization': `Bearer ${TOKEN}`
  }
};

export const api = {
  // Films populaires
  getPopularMovies: async (page = 1) => {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/popular?language=fr-FR&page=${page}`,
        OPTIONS
      );
      if (!response.ok) {
        throw new Error('Erreur réseau');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur getPopularMovies:', error);
      throw error;
    }
  },


    // Méthode pour obtenir les films avec tri
    getMovies: async (page = 1, sortBy = 'popularity.desc') => {
      try {
        const response = await fetch(
          `${BASE_URL}/discover/movie?language=fr-FR&page=${page}&sort_by=${sortBy}`,
          OPTIONS
        );
        
        if (!response.ok) {
          throw new Error('Erreur réseau');
        }
        
        return await response.json();
      } catch (error) {
        console.error('Erreur getMovies:', error);
        throw error;
      }
    },

  // Méthode pour récupérer les genres

  getMovieGenres: async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/genre/movie/list?language=fr-FR`,
        OPTIONS
      );
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des genres');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erreur getMovieGenres:', error);
      throw error;
    }
  },

  // Films tendance
  getTrendingMovies: async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/trending/movie/week?language=fr-FR`,
        OPTIONS
      );
      if (!response.ok) {
        throw new Error('Erreur réseau');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur getTrendingMovies:', error);
      throw error;
    }
  },

  // Recherche de films
  searchMovies: async (query, page = 1) => {
    try {
      const response = await fetch(
        `${BASE_URL}/search/movie?language=fr-FR&query=${encodeURIComponent(query)}&page=${page}`,
        OPTIONS
      );
      if (!response.ok) {
        throw new Error('Erreur réseau');
      }
      return response.json();
    } catch (error) {
      console.error('Erreur searchMovies:', error);
      throw error;
    }
  },

  // Détails d'un film
  getMovieDetails: async (movieId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/${movieId}?language=fr-FR`,
        OPTIONS
      );
      if (!response.ok) {
        throw new Error('Erreur réseau');
      }
      return response.json();
    } catch (error) {
      console.error('Erreur getMovieDetails:', error);
      throw error;
    }
  },

  // Films similaires
  getSimilarMovies: async (movieId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/${movieId}/similar?language=fr-FR&page=1`,
        OPTIONS
      );
      if (!response.ok) {
        throw new Error('Erreur réseau');
      }
      return response.json();
    } catch (error) {
      console.error('Erreur getSimilarMovies:', error);
      throw error;
    }
  },
};