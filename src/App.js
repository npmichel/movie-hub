import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Movies from './pages/Movies/Movies';
import MovieDetails from './pages/MovieDetails/MovieDetails';
import Favorites from './pages/Favorites/Favorites';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import PageTransition from './components/PageTransition/PageTransition';
import './App.css';

// Composant de contenu avec animations
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          } 
        />
        <Route 
          path="/movies" 
          element={
            <PageTransition>
              <Movies />
            </PageTransition>
          } 
        />
        <Route 
          path="/movie/:id" 
          element={
            <PageTransition>
              <MovieDetails />
            </PageTransition>
          } 
        />
        <Route 
          path="/favorites" 
          element={
            <PageTransition>
              <Favorites />
            </PageTransition>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <AnimatedRoutes />
          </main>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;