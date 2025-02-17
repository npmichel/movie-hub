import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, Star, Clock, Calendar } from 'lucide-react';
import { api } from '../../services/api';
import { favoritesService } from '../../services/favorites';
import MovieCard from '../../components/MovieCard/MovieCard';
import './MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(favoritesService.isFavorite(parseInt(id)));

  useEffect(() => {
    const fetchMovieData = async () => {
      setIsLoading(true);
      try {
        const [movieData, similarData] = await Promise.all([
          api.getMovieDetails(id),
          api.getSimilarMovies(id)
        ]);
        setMovie(movieData);
        setSimilarMovies(similarData.results.slice(0, 6));
        setIsFavorite(favoritesService.isFavorite(parseInt(id)));
      } catch (err) {
        setError(`Une erreur est survenue lors du chargement des détails du film. L'erreur est ${err}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);



  const handleToggleFavorite = () => {
    if (isFavorite) {
      favoritesService.removeFavorite(movie.id);
    } else {
      favoritesService.addFavorite(movie);
    }
    setIsFavorite(!isFavorite);
  };

  if (isLoading) {
    return <div className="movie-details-loading">Chargement...</div>;
  }

  if (error || !movie) {
    return <div className="movie-details-error">{error}</div>;
  }

  const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div className="movie-details">
      <div 
        className="movie-backdrop" 
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        <div className="backdrop-overlay">
          <div className="movie-details-content">
            <div className="movie-poster-container">
              <img src={posterUrl} alt={movie.title} className="movie-poster" />
            </div>
            <div className="movie-info-container">
              <h1 className="movie-title">{movie.title}</h1>
              
              <div className="movie-meta">
                <div className="meta-item">
                  <Star className="meta-icon" />
                  <span>{movie.vote_average.toFixed(1)}/10</span>
                </div>
                <div className="meta-item">
                  <Clock className="meta-icon" />
                  <span>{movie.runtime} min</span>
                </div>
                <div className="meta-item">
                  <Calendar className="meta-icon" />
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                </div>
                <button 
                    className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`}
                    onClick={handleToggleFavorite}
                    title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                    >
                    <Heart
                        className="meta-icon"
                        fill={isFavorite ? "#e50914" : "none"}
                        color={isFavorite ? "#e50914" : "white"}
                    />
                </button>
              </div>

              <div className="genres">
                {movie.genres.map(genre => (
                  <span key={genre.id} className="genre-tag">
                    {genre.name}
                  </span>
                ))}
              </div>

              <div className="movie-overview">
                <h2>Synopsis</h2>
                <p>{movie.overview}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {similarMovies.length > 0 && (
        <div className="similar-movies">
          <h2>Films similaires</h2>
          <div className="similar-movies-grid">
            {similarMovies.map(similarMovie => (
              <MovieCard
                key={similarMovie.id}
                movie={similarMovie}
                isFavorite={favoritesService.isFavorite(similarMovie.id)}
                onToggleFavorite={() => {}}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;