import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Clock, X, Trash2 } from 'lucide-react';
import { api } from '../../services/api';
import { searchService } from '../../services/searchService';
import './SearchMovie.css';

const SearchMovie = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Charger l'historique au montage
    setHistory(searchService.getSearchHistory());

    // Gestionnaire de clic en dehors du dropdown
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const fetchSuggestions = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.searchMovies(query, 1);
      setSuggestions(response.results.slice(0, 5));
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowDropdown(true);

    // Debounce les appels API
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 300);
  };

  const handleSearch = (term) => {
    if (!term.trim()) return;
    
    searchService.addToHistory(term);
    setHistory(searchService.getSearchHistory());
    setShowDropdown(false);
    setSearchTerm('');
    navigate(`/movies?search=${encodeURIComponent(term)}`);
  };

  const handleHistoryItemClick = (term) => {
    setSearchTerm(term);
    handleSearch(term);
  };

  const handleRemoveFromHistory = (e, term) => {
    e.stopPropagation();
    searchService.removeFromHistory(term);
    setHistory(searchService.getSearchHistory());
  };

  const handleClearHistory = (e) => {
    e.stopPropagation();
    searchService.clearHistory();
    setHistory([]);
  };

  return (
    <div className="search-container" ref={searchRef}>
      <div className="search-input-container">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setShowDropdown(true)}
          placeholder="Rechercher un film..."
          className="search-input"
        />
        {searchTerm && (
          <button
            className="clear-search"
            onClick={() => {
              setSearchTerm('');
              setSuggestions([]);
            }}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {showDropdown && (
        <div className="search-dropdown">
          {/* Suggestions de films */}
          {suggestions.length > 0 && (
            <div className="suggestions-section">
              <h3>Suggestions</h3>
              {suggestions.map(movie => (
                <div
                  key={movie.id}
                  className="suggestion-item"
                  onClick={() => handleSearch(movie.title)}
                >
                  <img
                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w92${movie.poster_path}` : '/placeholder-movie.png'}
                    alt={movie.title}
                    className="suggestion-poster"
                  />
                  <div className="suggestion-info">
                    <span className="suggestion-title">{movie.title}</span>
                    <span className="suggestion-year">
                      {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Historique des recherches */}
          {history.length > 0 && (
            <div className="history-section">
              <div className="history-header">
                <h3>Recherches récentes</h3>
                <button className="clear-history" onClick={handleClearHistory}>
                  <Trash2 size={16} />
                </button>
              </div>
              {history.map((term, index) => (
                <div
                  key={index}
                  className="history-item"
                  onClick={() => handleHistoryItemClick(term)}
                >
                  <Clock size={16} />
                  <span>{term}</span>
                  <button
                    className="remove-history-item"
                    onClick={(e) => handleRemoveFromHistory(e, term)}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {isLoading && (
            <div className="search-loading">
              Recherche en cours...
            </div>
          )}

          {!isLoading && searchTerm && suggestions.length === 0 && (
            <div className="no-results">
              Aucun résultat trouvé pour "{searchTerm}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchMovie;