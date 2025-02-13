// src/pages/Movies/Movies.js
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, SlidersHorizontal, Film } from 'lucide-react';
import MovieCard from '../../components/MovieCard/MovieCard';
import GenreFilter from '../../components/GenreFilter/GenreFilter';
import Loading from '../../components/Loading/Loading';
import { api } from '../../services/api';
import './Movies.css';

const SORT_OPTIONS = [
  { value: 'popularity.desc', label: 'Popularité descendante' },
  { value: 'popularity.asc', label: 'Popularité ascendante' },
  { value: 'vote_average.desc', label: 'Note descendante' },
  { value: 'vote_average.asc', label: 'Note ascendante' },
  { value: 'release_date.desc', label: 'Date de sortie récente' },
  { value: 'release_date.asc', label: 'Date de sortie ancienne' }
];

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await api.getMovieGenres();
        setGenres(data.genres || []);
      } catch (err) {
        console.error('Erreur lors du chargement des genres:', err);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const page = parseInt(searchParams.get('page')) || 1;
        const searchQuery = searchParams.get('search');
        
        let response;
        if (searchQuery) {
          response = await api.searchMovies(searchQuery, page);
        } else {
          response = await api.getMovies(page, sortBy);
        }

        let filteredMovies = response.results;
        if (selectedGenres.length > 0) {
          filteredMovies = filteredMovies.filter(movie =>
            movie.genre_ids.some(genreId => selectedGenres.includes(genreId))
          );
        }

        setMovies(filteredMovies);
        setTotalPages(response.total_pages);
        setCurrentPage(page);
      } catch (err) {
        setError("Une erreur est survenue lors du chargement des films.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [searchParams, selectedGenres, sortBy]);


    // Filtrer les films en fonction des genres sélectionnés
    const filteredMovies = movies.filter(movie => {
      if (selectedGenres.length === 0) return true;
      return movie.genre_ids.some(genreId => selectedGenres.includes(genreId));
    });


  const handlePageChange = (newPage) => {
    setSearchParams(prev => {
      prev.set('page', newPage);
      return prev;
    });
  };


  if (isLoading) return <Loading />;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="movies-page">
      {/* Sidebar avec les filtres */}
      <div className={`filters-sidebar ${showFilters ? 'show' : ''}`}>
        <div className="filters-content">
          <div className="sort-section">
            <h3>Trier par</h3>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              {SORT_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="genre-section">
            <h3>Genres</h3>
            <GenreFilter
              genres={genres}
              selectedGenres={selectedGenres}
              onGenreSelect={setSelectedGenres}
            />
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="movies-content">
        <div className="movies-header">
          <h2>Films</h2>
          <button 
            className="toggle-filters-button"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal size={20} />
            Filtres
          </button>
        </div>

        {/* État vide ou grille de films */}
        {filteredMovies.length > 0 ? (
          <>
            <div className="movies-grid">
              {filteredMovies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

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
          </>
        ) : (
          <div className="empty-state">
            <div className="empty-state-content">
              <Film size={64} />
              <h3>Aucun film trouvé</h3>
              <p>
                Aucun film ne correspond aux genres sélectionnés. 
                Essayez de modifier vos filtres ou de sélectionner d'autres genres.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies;