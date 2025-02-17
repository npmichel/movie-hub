import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { favoritesService } from '../../services/favorites';
import { favoritesEvents } from '../../services/favoritesEvents';
import ImageTransition from '../ImageTransition/ImageTransition';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = React.useState(
      favoritesService.isFavorite(movie.id)
    );

    const imageUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder-movie.png';

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      favoritesService.removeFavorite(movie.id);
    } else {
      favoritesService.addFavorite(movie);
    }
    setIsFavorite(!isFavorite);
    favoritesEvents.emit();
  };

  return (
    <div className="movie-card" onClick={handleClick}>
      <div className="movie-poster">
        <div className="image-container">
          <ImageTransition src={imageUrl} alt={movie.title} />
        </div>
        <div className="favorite-container">
          <button 
            className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`}
            onClick={handleFavoriteClick}
            title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          >
            <Heart
              size={20}
              fill={isFavorite ? "#e50914" : "none"}
              color={isFavorite ? "#e50914" : "white"}
            />
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-meta">
          <span className="movie-year">
            {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
          </span>
          <span className="movie-rating">
            ★ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;