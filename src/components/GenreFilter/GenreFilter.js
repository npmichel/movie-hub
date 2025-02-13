import React from 'react';
import './GenreFilter.css';

const GenreFilter = ({ genres, selectedGenres, onGenreSelect }) => {
  const handleGenreClick = (genreId) => {
    if (selectedGenres.includes(genreId)) {
      onGenreSelect(selectedGenres.filter(id => id !== genreId));
    } else {
      onGenreSelect([...selectedGenres, genreId]);
    }
  };

  return (
    <div className="genre-filter">
      <div className="genre-tags">
        {genres.map(genre => (
          <button
            key={genre.id}
            onClick={() => handleGenreClick(genre.id)}
            className={`genre-tag ${selectedGenres.includes(genre.id) ? 'active' : ''}`}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreFilter;