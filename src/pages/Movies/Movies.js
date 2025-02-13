// src/pages/Movies/Movies.js
import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import MovieCard from '../../components/MovieCard/MovieCard';
import FilterGenre from '../../components/FilterGenre/FilterGenre';
import { api } from '../../services/api';
import { favoritesService } from '../../services/favorites';
import './Movies.css';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('popularity.desc');

  const sortOptions = [
    { value: 'popularity.desc', label: 'Popularité ⬇️' },
    { value: 'popularity.asc', label: 'Popularité ⬆️' },
    { value: 'vote_average.desc', label: 'Note ⬇️' },
    { value: 'vote_average.asc', label: 'Note ⬆️' },
    { value: 'release_date.desc', label: 'Date de sortie ⬇️' },
    { value: 'release_date.asc', label: 'Date de sortie ⬆️' }
  ];


  const fetchMovies = useCallback(async (page, searchQuery) => {
    setIsLoading(true);
    try {
      let response;
      if (searchQuery) {
        response = await api.searchMovies(searchQuery, page);
      } else {
        response = await api.getPopularMovies(page);
      }
      
      let filteredMovies = response.results;
      if (selectedGenres.length > 0) {
        filteredMovies = filteredMovies.filter(movie => 
          movie.genre_ids.some(genreId => selectedGenres.includes(genreId))
        );
      }

      setMovies(filteredMovies);
      setTotalPages(response.total_pages);
    } catch (err) {
      setError("Une erreur est survenue lors du chargement des films.");
    } finally {
      setIsLoading(false);
    }
  }, [selectedGenres]); 
  
  useEffect(() => {
    const fetchMoviesData = async () => {
      const searchQuery = searchParams.get('search');
      const page = parseInt(searchParams.get('page')) || 1;
      setCurrentPage(page);
      await fetchMovies(page, searchQuery);
    };

    fetchMoviesData();
  }, [searchParams, selectedGenres, sortBy, fetchMovies]);

 

  const handlePageChange = (newPage) => {
    setSearchParams(prev => {
      prev.set('page', newPage);
      return prev;
    });
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const renderPagination = () => {
    return (
      <div className="pagination">
        <button 
          className="pagination-button"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <ChevronLeft size={20} />
          Précédent
        </button>
        
        <span className="pagination-info">
          Page {currentPage} sur {totalPages}
        </span>
        
        <button 
          className="pagination-button"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Suivant
          <ChevronRight size={20} />
        </button>
      </div>
    );
  };

  if (isLoading) {
    return <div className="movies-loading">Chargement...</div>;
  }

  if (error) {
    return <div className="movies-error">{error}</div>;
  }

  return (
    <div className="movies-page">
      <div className={`filters-section ${showFilters ? 'show' : ''}`}>
        <div className="filters-header">
          <h2>Filtres</h2>
          <button className="toggle-filters" onClick={toggleFilters}>
            <SlidersHorizontal size={20} />
          </button>
        </div>

        <div className="filters-content">
          <div className="sort-section">
            <h3>Trier par</h3>
            <select 
              value={sortBy} 
              onChange={handleSortChange}
              className="sort-select"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <FilterGenre 
            onGenreSelect={setSelectedGenres}
            selectedGenres={selectedGenres}
          />
        </div>
      </div>

      <div className="movies-content">
        <div className="movies-grid">
          {movies.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={favoritesService.isFavorite(movie.id)}
              onToggleFavorite={() => {
                if (favoritesService.isFavorite(movie.id)) {
                  favoritesService.removeFavorite(movie.id);
                } else {
                  favoritesService.addFavorite(movie);
                }
              }}
            />
          ))}
        </div>
        {renderPagination()}
      </div>
    </div>
  );
};

export default Movies;