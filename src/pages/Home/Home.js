// src/pages/Home/Home.js
import React, { useState, useEffect } from 'react';
import MovieCarousel from '../../components/MovieCarousel/MovieCarousel';
import MovieCard from '../../components/MovieCard/MovieCard';
import { api } from '../../services/api';
import './Home.css';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [trendingData, popularData] = await Promise.all([
          api.getTrendingMovies(),
          api.getPopularMovies()
        ]);

        setTrendingMovies(trendingData.results.slice(0, 5));
        setPopularMovies(popularData.results);
      } catch (err) {
        setError("Une erreur est survenue lors du chargement des films.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (isLoading) {
    return <div className="loading">Chargement...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="home">
      {trendingMovies.length > 0 && (
        <section className="trending-section">
          <MovieCarousel movies={trendingMovies} />
        </section>
      )}

      <section className="popular-section">
        <h2>Films Populaires</h2>
        <div className="movies-grid">
          {popularMovies.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={false} // À implémenter avec le système de favoris
              onToggleFavorite={() => {}} // À implémenter avec le système de favoris
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;