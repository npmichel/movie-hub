import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './MovieCarousel.css';

const MovieCarousel = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === movies.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [movies.length]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? movies.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === movies.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  if (!movies || movies.length === 0) return null;

  const movie = movies[currentIndex];
  const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

  return (
    <div className="movie-carousel">
      <div className="carousel-content">
        <img 
          src={backdropUrl} 
          alt={movie.title} 
          className="carousel-backdrop" 
        />
        <div className="carousel-overlay">
          <div className="carousel-info">
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
            <button 
              className="watch-button"
              onClick={() => handleMovieClick(movie.id)}
            >
              Plus d'informations
            </button>
          </div>
        </div>
        <button 
          className="carousel-control left"
          onClick={handlePrevious}
        >
          <ChevronLeft size={30} />
        </button>
        <button 
          className="carousel-control right"
          onClick={handleNext}
        >
          <ChevronRight size={30} />
        </button>
      </div>
      <div className="carousel-indicators">
        {movies.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieCarousel;