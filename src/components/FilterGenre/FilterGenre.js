import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import './FilterGenre.css';

const FilterGenre = ({ onGenreSelect, selectedGenres = [] }) => {
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await api.getMovieGenres();
        setGenres(response.genres);
      } catch (error) {
        console.error('Erreur lors du chargement des genres:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGenres();
  }, []);

  const handleGenreClick = (genreId) => {
    if (selectedGenres.includes(genreId)) {
      onGenreSelect(selectedGenres.filter(id => id !== genreId));
    } else {
      onGenreSelect([...selectedGenres, genreId]);
    }
  };

  if (isLoading) {
    return <div className="genres-loading">Chargement des genres...</div>;
  }

  return (
    <div className="genre-filter">
      <h3>Genres</h3>
      <div className="genre-tags">
        {genres.map(genre => (
          <button
            key={genre.id}
            className={`genre-tag ${selectedGenres.includes(genre.id) ? 'active' : ''}`}
            onClick={() => handleGenreClick(genre.id)}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterGenre;