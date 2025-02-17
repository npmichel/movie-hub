import React, { useState, useEffect } from 'react';
import MovieCarousel from '../../components/MovieCarousel/MovieCarousel';
import MovieCard from '../../components/MovieCard/MovieCard';
import GenreFilter from '../../components/GenreFilter/GenreFilter';
import Loading from '../../components/Loading/Loading';
import { api } from '../../services/api';
import './Home.css';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [genresData, trendingData, popularData] = await Promise.all([
          api.getMovieGenres(),
          api.getTrendingMovies(),
          api.getPopularMovies()
        ]);

        setGenres(genresData.genres || []);
        setTrendingMovies(trendingData.results.slice(0, 5));
        setPopularMovies(popularData.results);
      } catch (err) {
        setError("Une erreur est survenue lors du chargement des données.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredMovies = popularMovies.filter(movie => {
    if (selectedGenres.length === 0) return true;
    return movie.genre_ids.some(genreId => selectedGenres.includes(genreId));
  });

  if (isLoading) return <Loading />;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="home">
      {trendingMovies.length > 0 && (
        <section className="trending-section">
          <MovieCarousel movies={trendingMovies} />
        </section>
      )}

      <section className="popular-section">
        <div className="section-header">
          <h2>Films Populaires</h2>
          {genres.length > 0 && (
            <div className="filters-container">
              <GenreFilter
                genres={genres}
                selectedGenres={selectedGenres}
                onGenreSelect={setSelectedGenres}
              />
            </div>
          )}
        </div>

        <div className="movies-grid">
          {filteredMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;