// src/components/Navbar/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import SearchMovie from '../SearchMovie/SearchMovie';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">
          <Link to="/" className="logo">
            MovieHub
          </Link>
        </div>

        <div className="navbar-links">
          <Link to="/" className="nav-link">Accueil</Link>
          <Link to="/movies" className="nav-link">Films</Link>
          <Link to="/favorites" className="nav-link">Favoris</Link>
        </div>
        <div className="search-section">
          <SearchMovie />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;