import React, { useState, useEffect } from 'react';
import { Heart, Trash2 } from 'lucide-react';
import MovieCard from '../../components/MovieCard/MovieCard';
import { favoritesService } from '../../services/favorites';
import { favoritesEvents } from '../../services/favoritesEvents';
import './Favorites.css';


const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [sortOrder, setSortOrder] = useState('recent');

  const loadFavorites = () => {
    const favoriteMovies = favoritesService.getFavorites();
    setFavorites(favoriteMovies);
  };

  useEffect(() => {
    // Charger les favoris initialement
    loadFavorites();

    // S'abonner aux changements des favoris
    const unsubscribe = favoritesEvents.subscribe(() => {
      loadFavorites();
    });

    // Nettoyer l'abonnement quand le composant est démonté
    return () => unsubscribe();
  }, []);


  const handleClearAll = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer tous vos favoris ?')) {
      localStorage.removeItem('moviehub_favorites');
      setFavorites([]);
      favoritesEvents.emit(); // Notifier les autres composants
    }
  };

  const sortFavorites = (movies) => {
    switch (sortOrder) {
      case 'title':
        return [...movies].sort((a, b) => a.title.localeCompare(b.title));
      case 'rating':
        return [...movies].sort((a, b) => b.vote_average - a.vote_average);
      case 'recent':
      default:
        return movies;
    }
  };

  const sortedFavorites = sortFavorites(favorites);

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <div className="favorites-title">
          <Heart className="title-icon" size={24} />
          <h1>Mes Films Favoris</h1>
          <span className="favorites-count">({favorites.length})</span>
        </div>

        {favorites.length > 0 && (
          <div className="favorites-actions">
            <select
              className="sort-select"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="recent">Ajoutés récemment</option>
              <option value="title">Titre</option>
              <option value="rating">Note</option>
            </select>

            <button className="clear-all-button" onClick={handleClearAll}>
              <Trash2 size={18} />
              Tout supprimer
            </button>
          </div>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="no-favorites">
          <Heart size={48} />
          <p>Vous n'avez pas encore de films favoris</p>
          <p className="sub-text">
            Explorez notre catalogue et ajoutez des films à vos favoris en cliquant sur le cœur
          </p>
        </div>
      ) : (
        <div className="favorites-grid">
            {sortedFavorites.map(movie => (
            <MovieCard
                key={movie.id}
                movie={movie}
            />
            ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;